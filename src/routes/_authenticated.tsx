import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router';
import { useConvexAuth } from 'convex/react';

import { Header } from '#components/Header/Header';

export const Route = createFileRoute('/_authenticated')({
  component: RouteComponent,
});

function RouteComponent() {
  const { isLoading, isAuthenticated } = useConvexAuth();

  if (isLoading) return null;
  if (!isAuthenticated) return <Navigate to="/auth" />;

  return (
    <div className="flex flex-col block-screen">
      <Header />
      <div className="grow">
        <Outlet />
      </div>
    </div>
  );
}
