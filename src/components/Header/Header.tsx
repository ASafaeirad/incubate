import { useAuthActions } from '@convex-dev/auth/react';
import { IconLogout } from '@tabler/icons-react';
import { api } from '#convex/api';
import { isErr } from '#lib/result';
import { getTotalXpForLevel } from '#models/xp';
import { Avatar } from '#ui/Avatar/Avatar';
import { Button } from '#ui/Button/Button';
import { ProgressBar } from '#ui/ProgressBar/ProgressBar';
import { Text } from '#ui/Text/Text';
import { useMutation, useQuery } from 'convex/react';
import { useEffect } from 'react';

export function Header() {
  const { signOut } = useAuthActions();
  const profileResult = useQuery(api.profile.get);
  const createProfile = useMutation(api.profile.create);

  useEffect(() => {
    if (!profileResult) return;
    if (isErr(profileResult) && profileResult.error === 'Not Found') {
      void createProfile();
    }
  }, [profileResult, createProfile]);

  if (!profileResult) return null;
  if (isErr(profileResult)) return <div>Error: {profileResult.error}</div>;
  const profile = profileResult.value;

  const currentXp = profile.experience;
  const nextLevelXp = getTotalXpForLevel(profile.level + 1);

  return (
    <header className="flex items-center justify-center gap-4 border-b border-border p-4">
      <div className="flex items-center gap-3">
        <Avatar src={profile.avatar} fallback={profile.name.at(0) ?? 'U'}>
          {profile.level}
        </Avatar>
        <div className="flex flex-col gap-1">
          <Text className="text-sm font-medium">Level {profile.level}</Text>
          <ProgressBar
            value={currentXp}
            min={getTotalXpForLevel(profile.level)}
            max={nextLevelXp}
            className="w-48"
            label={`${currentXp} / ${nextLevelXp}`}
          />
        </div>
        <Button className="align-self-end" onClick={signOut}>
          <IconLogout />
        </Button>
      </div>
    </header>
  );
}
