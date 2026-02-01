import { getAuthUserId } from '@convex-dev/auth/server';
import { v } from 'convex/values';

import { mutation, query } from './_generated/server';

export const create = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error('Not authenticated');

    return ctx.db.insert('slots', { name: args.name, userId });
  },
});

export const remove = mutation({
  args: {
    id: v.id('slots'),
  },
  handler: async (ctx, { id }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error('Not authenticated');

    return ctx.db.delete('slots', id);
  },
});

export const list = query({
  args: {},
  handler: async ctx => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error('Not authenticated');

    return ctx.db
      .query('slots')
      .withIndex('by_user', q => q.eq('userId', userId))
      .collect();
  },
});
