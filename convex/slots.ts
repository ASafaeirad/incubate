import { getAuthUserId } from '@convex-dev/auth/server';
import { err, isErr, ok } from '#lib/result';
import { v } from 'convex/values';

import type { Id } from './_generated/dataModel';
import type { QueryCtx } from './_generated/server';

import { mutation, query } from './_generated/server';
import { getUserIdFromCtx } from './auth';
import { getProfileFromCtx } from './profile';

export interface Slot {
  id: Id<'slots'>;
  name: string;
}

const toSlot = (slot: { _id: Id<'slots'>; name: string }): Slot => {
  return {
    id: slot._id,
    name: slot.name,
  };
};

export const getSlotsFromContext = async (ctx: QueryCtx) => {
  const userId = await getUserIdFromCtx(ctx);
  if (isErr(userId)) return userId;

  const slots = await ctx.db
    .query('slots')
    .withIndex('by_user', q => q.eq('userId', userId.value))
    .collect();

  return ok(slots.map(toSlot));
};

export const create = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const profile = await getProfileFromCtx(ctx);
    if (isErr(profile)) return profile;

    const slots = await getSlotsFromContext(ctx);
    if (isErr(slots)) return slots;

    if (profile.value.slots <= slots.value.length)
      return err('No slots available');

    const id = await ctx.db.insert('slots', {
      name: args.name,
      userId: profile.value.userId,
    });
    return ok(id);
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
  handler: getSlotsFromContext,
});
