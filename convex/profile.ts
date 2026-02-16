import { getAuthUserId } from '@convex-dev/auth/server';
import { err, isErr, ok } from '#lib/result';
import { toProfile } from '#models/profile';

import type { MutationCtx, QueryCtx } from './_generated/server';

import { mutation, query } from './_generated/server';

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
      timezone: 'UTC',
    });
    const profile = await ctx.db.get('profiles', id);
    if (!profile) return err('Convex bug: profile not found');

    return ok(toProfile(profile));
  },
});

export const getProfileFromCtx = async (ctx: MutationCtx | QueryCtx) => {
  const userId = await getAuthUserId(ctx);
  if (!userId) return err('Not authenticated');

  const profile = await ctx.db
    .query('profiles')
    .withIndex('by_user', q => q.eq('userId', userId))
    .first();
  if (!profile) return err('Not Found');

  return ok(toProfile(profile));
};

export async function increaseUserXp(
  ctx: MutationCtx,
  params: {
    amount: number;
  },
) {
  const { amount } = params;
  const profileResult = await getProfileFromCtx(ctx);
  if (isErr(profileResult)) return profileResult;
  const profile = profileResult.value;

  const newTotalXP = profile.experience + amount;
  await ctx.db.patch('profiles', profile.id, { experience: newTotalXP });
  return ok({ profileId: profile.id, experience: newTotalXP });
}

export const get = query({
  args: {},
  handler: getProfileFromCtx,
});
