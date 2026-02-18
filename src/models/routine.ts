import { isToday } from 'date-fns';

import type { Doc, Id } from '../../convex/_generated/dataModel';

const streakToActivate = 21;

export type RoutineState = 'achieve' | 'active' | 'broken' | 'incubating';

export interface Routine {
  id: Id<'routines'>;
  userId: Id<'users'>;
  name: string;
  state: RoutineState;
  currentStreak: number;
  completedToday: boolean;
  lastCompletion?: number;
}

export const toRoutine = (routine: Doc<'routines'>): Routine => {
  const completedToday =
    routine.lastCompletion != null && isToday(routine.lastCompletion);

  return {
    id: routine._id,
    userId: routine.userId,
    name: routine.name,
    state: routine.state,
    currentStreak: routine.currentStreak,
    lastCompletion: routine.lastCompletion ?? undefined,
    completedToday,
  };
};

export function calculateStreakUpdate(routine: Routine): {
  newStreak: number;
  newState: RoutineState;
} {
  if (routine.state === 'broken' || !routine.lastCompletion) {
    return { newStreak: 1, newState: 'incubating' };
  }

  const newStreak = routine.currentStreak + 1;

  return {
    newStreak,
    newState: isCompletedIncubation(newStreak) ? 'active' : routine.state,
  };
}

export function isCompletedIncubation(streak: number) {
  return streak === streakToActivate;
}
