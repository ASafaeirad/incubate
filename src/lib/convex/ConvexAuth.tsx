import { ConvexAuthProvider as BaseConvexAuthProvider } from '@convex-dev/auth/react';
import { ConvexReactClient } from 'convex/react';

import { config } from '../config';

export const convexAuthClient = new ConvexReactClient(config.convexUrl);

export const ConvexAuthProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <BaseConvexAuthProvider client={convexAuthClient}>
      {children}
    </BaseConvexAuthProvider>
  );
};
