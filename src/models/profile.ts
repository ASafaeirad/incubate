import type { Doc, Id } from '../../convex/_generated/dataModel';

import { calculateLevel } from './xp';

export interface Profile {
  userId: Id<'users'>;
  id: Id<'profiles'>;
  name: string;
  experience: number;
  level: number;
  routines: number;
  timezone: string;
  avatar?: string;
}

export function toProfile(data: Doc<'profiles'>): Profile {
  const { name, experience, avatar, timezone } = data;
  const level = calculateLevel(experience);

  return {
    id: data._id,
    userId: data.userId,
    name,
    experience,
    level,
    routines: level,
    timezone,
    avatar: avatar ?? undefined,
  };
}
