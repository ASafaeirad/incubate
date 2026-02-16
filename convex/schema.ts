import { authTables } from '@convex-dev/auth/server';
import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

const appTables = {
  routines: defineTable({
    name: v.string(),
    userId: v.id('users'),
    state: v.union(
      v.literal('incubating'),
      v.literal('active'),
      v.literal('broken'),
      v.literal('achieve'),
    ),
    currentStreak: v.number(),
    lastCompletion: v.nullable(v.number()),
    createdAt: v.number(),
    timezone: v.string(),
  }).index('by_user', ['userId']),
  completions: defineTable({
    routineId: v.id('routines'),
    userId: v.id('users'),
    completedAt: v.number(),
    dayStartTimestamp: v.number(), // Unix timestamp of day start in user's timezone
  })
    .index('by_routine', ['routineId'])
    .index('by_routine_day', ['routineId', 'dayStartTimestamp']),
};

const profileTables = {
  profiles: defineTable({
    name: v.string(),
    experience: v.number(),
    userId: v.id('users'),
    avatar: v.nullable(v.string()),
    timezone: v.string(),
  }).index('by_user', ['userId']),
  xp_transactions: defineTable({
    userId: v.id('users'),
    amount: v.number(),
    source: v.union(
      v.literal('daily_completion'),
      v.literal('incubation_complete'),
      v.literal('recovery_bonus'),
      v.literal('retroactive'),
    ),
    timestamp: v.number(),
    metadata: v.optional(
      v.object({
        routineId: v.optional(v.id('routines')),
        streakDays: v.optional(v.number()),
        previousStreak: v.optional(v.number()),
      }),
    ),
  })
    .index('by_user', ['userId'])
    .index('by_user_timestamp', ['userId', 'timestamp']),
};

export default defineSchema({
  ...authTables,
  ...appTables,
  ...profileTables,
});
