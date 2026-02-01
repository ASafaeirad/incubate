import { Anonymous } from '@convex-dev/auth/providers/Anonymous';
import { convexAuth, getAuthUserId } from '@convex-dev/auth/server';

import { query } from './_generated/server';

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [Anonymous],
});

export const getUser = query({
  args: {},
  handler: async ctx => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    const user = await ctx.db.get('users', userId);
    if (!user) return null;

    return user;
  },
});
