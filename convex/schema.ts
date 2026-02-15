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
  }).index('by_user', ['userId']),
};

const profileTables = {
  profiles: defineTable({
    name: v.string(),
    experience: v.number(),
    userId: v.id('users'),
    avatar: v.nullable(v.string()),
  }).index('by_user', ['userId']),
};

export default defineSchema({
  ...authTables,
  ...appTables,
  ...profileTables,
});
