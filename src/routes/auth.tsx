import { useAuthActions } from '@convex-dev/auth/react';
import { createFileRoute, Navigate } from '@tanstack/react-router';
import { Button } from '#ui/Button/Button';
import { useConvexAuth } from 'convex/react';

export const Route = createFileRoute('/auth')({
  component: AuthForm,
});

function AuthForm() {
  const { signIn } = useAuthActions();
  const { isLoading, isAuthenticated } = useConvexAuth();
  const signInAnon = () => void signIn('anonymous');
  const signInGitHub = () => void signIn('github');

  if (isLoading) {
    return <div>Loading…</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex flex-col gap-4">
        <Button onClick={signInGitHub}>Sign in with GitHub</Button>
        <Button onClick={signInAnon} variant="secondary">
          Sign in anonymously
        </Button>
      </div>
    </div>
  );
}
