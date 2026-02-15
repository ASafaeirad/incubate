import { getAuthUserId } from '@convex-dev/auth/server';
import { err, ok } from '#lib/result';

import type { Doc, Id } from './_generated/dataModel';
import type { QueryCtx } from './_generated/server';

import { mutation, query } from './_generated/server';

export interface Profile {
  userId: Id<'users'>;
  id: Id<'profiles'>;
  name: string;
  experience: number;
  level: number;
  routines: number;
  avatar?: string;
}

function toProfile(data: Doc<'profiles'>): Profile {
  const { name, experience, avatar } = data;
  const level = Math.floor(experience / 100) + 1;
  return {
    id: data._id,
    userId: data.userId,
    name,
    experience,
    level,
    routines: level + 1,
    avatar: avatar ?? undefined,
  };
}

export const create = mutation({
  args: {},
  handler: async ctx => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return err('Not authenticated');

    const user = await ctx.db.get('users', userId);
    if (!user) return err('Convex auth bug: user not found');

    const id = await ctx.db.insert('profiles', {
      userId,
      name: user.name ?? 'Anonymous',
      experience: 0,
      avatar: user.image ?? null,
    });
    const profile = await ctx.db.get('profiles', id);
    if (!profile) return err('Convex bug: profile not found');

    return ok(toProfile(profile));
  },
});

export const getProfileFromCtx = async (ctx: QueryCtx) => {
  const userId = await getAuthUserId(ctx);
  if (!userId) return err('Not authenticated');

  const profile = await ctx.db
    .query('profiles')
    .withIndex('by_user', q => q.eq('userId', userId))
    .first();
  if (!profile) return err('Not Found');

  return ok(toProfile(profile));
};

export const get = query({
  args: {},
  handler: getProfileFromCtx,
});
