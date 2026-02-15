import { getAuthUserId } from '@convex-dev/auth/server';
import { err, isErr, ok } from '#lib/result';
import { v } from 'convex/values';

import type { Id } from './_generated/dataModel';
import type { QueryCtx } from './_generated/server';

import { mutation, query } from './_generated/server';
import { getUserIdFromCtx } from './auth';
import { getProfileFromCtx } from './profile';

export type RoutineState = 'achieve' | 'active' | 'broken' | 'incubating';

export interface Routine {
  id: Id<'routines'>;
  name: string;
  state: RoutineState;
}

const toRoutine = (routine: {
  _id: Id<'routines'>;
  name: string;
  state: RoutineState;
}): Routine => {
  return {
    id: routine._id,
    name: routine.name,
    state: routine.state,
  };
};

export const getRoutinesFromContext = async (ctx: QueryCtx) => {
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

    const routines = await getRoutinesFromContext(ctx);
    if (isErr(routines)) return routines;

    if (profile.value.routines <= routines.value.length)
      return err('No routines available');

    const id = await ctx.db.insert('routines', {
      name: args.name,
      userId: profile.value.userId,
      state: 'incubating',
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
  handler: getRoutinesFromContext,
});
