import type { Profile } from '#models/profile';
import type { Routine } from '#models/routine';

import { getIncubationCompleteXp } from '#models/xp';

import type { Id } from './_generated/dataModel';
import type { MutationCtx } from './_generated/server';

import { increaseUserXp } from './profile';

type XPSource =
  | 'daily_completion'
  | 'incubation_complete'
  | 'recovery_bonus'
  | 'retroactive';

export async function logXpTransaction(
  ctx: MutationCtx,
  params: {
    userId: Id<'users'>;
    amount: number;
    source: XPSource;
    metadata?: {
      routineId?: Id<'routines'>;
      streakDays?: number;
      previousStreak?: number;
    };
  },
) {
  await ctx.db.insert('xp_transactions', {
    userId: params.userId,
    amount: params.amount,
    source: params.source,
    timestamp: Date.now(),
    metadata: params.metadata,
  });
  return increaseUserXp(ctx, { amount: params.amount });
}

export async function checkAndAwardIncubationBonus(
  ctx: MutationCtx,
  params: {
    routine: Routine;
    profile: Profile;
  },
) {
  const { routine } = params;
  const { userId } = routine;
  const routineId = routine.id;

  const existingTransaction = await ctx.db
    .query('xp_transactions')
    .withIndex('by_user', q => q.eq('userId', userId))
    .filter(q =>
      q.and(
        q.eq(q.field('source'), 'incubation_complete'),
        q.eq(q.field('metadata.routineId'), routineId),
      ),
    )
    .first();

  if (existingTransaction) return;
  const amount = getIncubationCompleteXp();

  await logXpTransaction(ctx, {
    userId,
    amount,
    source: 'incubation_complete',
    metadata: {
      routineId,
    },
  });
}
