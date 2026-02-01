import { addDays } from 'date-fns';
import { describe, expect, it } from 'vitest';

import type { Day } from './day';

import { findStreak } from './day';

describe(findStreak, () => {
  it('calculates 0 for all idle', () => {
    const days: Day[] = [
      { date: addDays(new Date('2000-01-01'), 0), state: 'idle' },
      { date: addDays(new Date('2000-01-01'), 1), state: 'idle' },
      { date: addDays(new Date('2000-01-01'), 2), state: 'idle' },
      { date: addDays(new Date('2000-01-01'), 3), state: 'idle' },
      { date: addDays(new Date('2000-01-01'), 4), state: 'idle' },
    ];
    const streak = findStreak(days);

    expect(streak).toBe(0);
  });

  it('calculates n if the n first ones are done', () => {
    const days: Day[] = [
      { date: addDays(new Date('2000-01-01'), 0), state: 'done' },
      { date: addDays(new Date('2000-01-01'), 1), state: 'idle' },
      { date: addDays(new Date('2000-01-01'), 2), state: 'idle' },
      { date: addDays(new Date('2000-01-01'), 3), state: 'idle' },
      { date: addDays(new Date('2000-01-01'), 4), state: 'idle' },
    ];

    const streak = findStreak(days);

    expect(streak).toBe(1);

    days[1].state = 'done';

    expect(findStreak(days)).toBe(2);

    days[2].state = 'done';

    expect(findStreak(days)).toBe(3);
  });

  it('calculates streak until first missed', () => {
    const days: Day[] = [
      { date: addDays(new Date('2000-01-01'), 0), state: 'done' },
      { date: addDays(new Date('2000-01-01'), 1), state: 'done' },
      { date: addDays(new Date('2000-01-01'), 2), state: 'missed' },
      { date: addDays(new Date('2000-01-01'), 3), state: 'idle' },
      { date: addDays(new Date('2000-01-01'), 4), state: 'idle' },
    ];

    expect(findStreak(days)).toBe(0);

    days[3].state = 'done';

    expect(findStreak(days)).toBe(1);

    days[4].state = 'missed';

    expect(findStreak(days)).toBe(0);
  });

  it('calculates full streak when no idle or missed', () => {
    const days: Day[] = [
      { date: addDays(new Date('2000-01-01'), 0), state: 'done' },
      { date: addDays(new Date('2000-01-01'), 1), state: 'done' },
      { date: addDays(new Date('2000-01-01'), 2), state: 'done' },
      { date: addDays(new Date('2000-01-01'), 3), state: 'done' },
      { date: addDays(new Date('2000-01-01'), 4), state: 'done' },
    ];

    expect(findStreak(days)).toBe(5);
  });

  it('return 0 when all missed', () => {
    const days: Day[] = [
      { date: addDays(new Date('2000-01-01'), 0), state: 'missed' },
      { date: addDays(new Date('2000-01-01'), 1), state: 'idle' },
      { date: addDays(new Date('2000-01-01'), 2), state: 'idle' },
      { date: addDays(new Date('2000-01-01'), 3), state: 'idle' },
      { date: addDays(new Date('2000-01-01'), 4), state: 'idle' },
    ];

    expect(findStreak(days)).toBe(0);

    days[1].state = 'missed';

    expect(findStreak(days)).toBe(0);

    days[2].state = 'missed';

    expect(findStreak(days)).toBe(0);

    days[3].state = 'missed';

    expect(findStreak(days)).toBe(0);

    days[4].state = 'missed';

    expect(findStreak(days)).toBe(0);
  });
});
