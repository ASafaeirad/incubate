import GitHub from '@auth/core/providers/github';
import { Anonymous } from '@convex-dev/auth/providers/Anonymous';
import { convexAuth, getAuthUserId } from '@convex-dev/auth/server';
import { err, isErr, ok } from '#lib/result';

import type { QueryCtx } from './_generated/server';

import { query } from './_generated/server';

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [Anonymous, GitHub],
});

const UnauthenticatedError = 'Not authenticated';

export const getUserIdFromCtx = async (ctx: QueryCtx) => {
  const userId = await getAuthUserId(ctx);
  if (!userId) return err(UnauthenticatedError);
  return ok(userId);
};

export const getUser = query({
  args: {},
  handler: async ctx => {
    const userId = await getUserIdFromCtx(ctx);
    if (isErr(userId)) return userId;

    const user = await ctx.db.get('users', userId.value);
    if (!user) return err('Convex auth bug: user not found');

    return ok(user);
  },
});
