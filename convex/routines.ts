import { getAuthUserId } from '@convex-dev/auth/server';
import { err, isErr, ok } from '#lib/result';
import {
  calculateStreakUpdate,
  isCompletedIncubation,
  toRoutine,
} from '#models/routine';
import { calculateDailyCompletionXP } from '#models/xp';
import { v } from 'convex/values';
import { startOfDay } from 'date-fns';

import type { Id } from './_generated/dataModel';
import type { QueryCtx } from './_generated/server';

import { mutation, query } from './_generated/server';
import { getUserIdFromCtx } from './auth';
import { getProfileFromCtx } from './profile';
import { checkAndAwardIncubationBonus, logXpTransaction } from './xp';

export const getRoutine = async (
  ctx: QueryCtx,
  params: { routineId: Id<'routines'> },
) => {
  const userIdResult = await getUserIdFromCtx(ctx);
  if (isErr(userIdResult)) return userIdResult;
  const userId = userIdResult.value;

  const routine = await ctx.db.get('routines', params.routineId);
  if (!routine) return err('Routine not found');
  if (routine.userId !== userId) return err('Unauthorized');

  return ok(toRoutine(routine));
};

export const getRoutines = async (ctx: QueryCtx) => {
  const userId = await getUserIdFromCtx(ctx);
  if (isErr(userId)) return userId;

  const routines = await ctx.db
    .query('routines')
    .withIndex('by_user', q => q.eq('userId', userId.value))
    .collect();

  return ok(routines.map(toRoutine));
};

export const create = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const profile = await getProfileFromCtx(ctx);
    if (isErr(profile)) return profile;

    const routines = await getRoutines(ctx);
    if (isErr(routines)) return routines;

    if (profile.value.routines <= routines.value.length)
      return err('No routines available');

    const id = await ctx.db.insert('routines', {
      name: args.name,
      userId: profile.value.userId,
      state: 'incubating',
      currentStreak: 0,
      lastCompletion: null,
      createdAt: Date.now(),
    });

    return ok(id);
  },
});

export const remove = mutation({
  args: {
    id: v.id('routines'),
  },
  handler: async (ctx, { id }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error('Not authenticated');

    return ctx.db.delete('routines', id);
  },
});

export const list = query({
  args: {},
  handler: getRoutines,
});

export const complete = mutation({
  args: {
    routineId: v.id('routines'),
  },
  handler: async (ctx, { routineId }) => {
    const routineResult = await getRoutine(ctx, { routineId });
    if (isErr(routineResult)) return routineResult;
    const routine = routineResult.value;

    const profileResult = await getProfileFromCtx(ctx);
    if (isErr(profileResult)) return profileResult;
    const profile = profileResult.value;
    const { userId } = profile;

    const now = Date.now();
    const dayStartTimestamp = startOfDay(now).getTime();

    const existingCompletion = await ctx.db
      .query('completions')
      .withIndex('by_routine_day', q =>
        q.eq('routineId', routineId).eq('dayStartTimestamp', dayStartTimestamp),
      )
      .first();
    if (existingCompletion) return err('Already completed today');

    const { newStreak, newState } = calculateStreakUpdate(routine);

    await ctx.db.insert('completions', {
      routineId,
      userId,
      completedAt: now,
      dayStartTimestamp,
    });

    await ctx.db.patch('routines', routineId, {
      lastCompletion: now,
      currentStreak: newStreak,
      state: newState,
    });

    await logXpTransaction(ctx, {
      userId,
      amount: calculateDailyCompletionXP(newStreak),
      source: 'daily_completion',
      metadata: {
        routineId,
        streakDays: newStreak,
      },
    });

    if (routine.state === 'incubating' && isCompletedIncubation(newStreak)) {
      await checkAndAwardIncubationBonus(ctx, { routine, profile });
    }
  },
});
