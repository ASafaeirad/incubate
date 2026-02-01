import { useAuthActions } from '@convex-dev/auth/react';
import { Button } from '#ui/Button/Button';

export function Header() {
  const { signOut } = useAuthActions();

  return (
    <header className="flex justify-end border-b border-border p-4">
      <Button className="align-self-end" onClick={signOut}>
        Log out
      </Button>
    </header>
  );
}
