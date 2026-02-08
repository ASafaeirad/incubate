import { useAuthActions } from '@convex-dev/auth/react';
import { api } from '#convex/api';
import { isErr } from '#lib/result';
import { Avatar } from '#ui/Avatar/Avatar';
import { Button } from '#ui/Button/Button';
import { useMutation, useQuery } from 'convex/react';
import { useEffect } from 'react';

export function Header() {
  const { signOut } = useAuthActions();
  const profileResult = useQuery(api.profile.getProfile);
  const createProfile = useMutation(api.profile.createProfile);

  useEffect(() => {
    if (!profileResult) return;
    if (isErr(profileResult) && profileResult.error === 'Not Found') {
      void createProfile();
    }
  }, [profileResult, createProfile]);
  if (!profileResult) return null;
  if (isErr(profileResult)) return <div>Error: {profileResult.error}</div>;
  const profile = profileResult.value;

  return (
    <header className="flex items-center justify-end gap-2 border-b border-border p-4">
      <Avatar src={profile.avatar} fallback={profile.name.at(0) ?? 'U'}>
        {profile.level}
      </Avatar>
      <Button className="align-self-end" size="sm" onClick={signOut}>
        Log out
      </Button>
    </header>
  );
}
