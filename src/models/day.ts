export interface Day {
  date: Date;
  state: 'done' | 'idle' | 'missed';
}

export const findStreak = (days: Day[]) => {
  const firstIdle = days.findIndex(day => day.state === 'idle');
  const lastDone = days.findLastIndex(day => day.state === 'done');
  const firstMissed = days.findLastIndex(day => day.state === 'missed');

  if (firstMissed === -1) return lastDone + 1;
  if (firstMissed > lastDone) return 0;
  if (firstIdle === -1) return lastDone + 1;

  return lastDone - firstMissed;
};
