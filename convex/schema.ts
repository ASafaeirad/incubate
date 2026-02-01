import { authTables } from '@convex-dev/auth/server';
import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

const appTables = {
  slots: defineTable({
    name: v.string(),
    userId: v.id('users'),
  }).index('by_user', ['userId']),
};

export default defineSchema({
  ...authTables,
  ...appTables,
});
