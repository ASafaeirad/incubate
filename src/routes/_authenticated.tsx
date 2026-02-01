import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router';
import { Header } from '#components/Header/Header';
import { useConvexAuth } from 'convex/react';

export const Route = createFileRoute('/_authenticated')({
  component: RouteComponent,
});

function RouteComponent() {
  const { isLoading, isAuthenticated } = useConvexAuth();

  if (isLoading) return <div>Loading…</div>;
  if (!isAuthenticated) return <Navigate to="/auth" />;

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="grow">
        <Outlet />
      </div>
    </div>
  );
}
