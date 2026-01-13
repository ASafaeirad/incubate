import { IconAssembly } from '@tabler/icons-react';
import preview from '#storybook/preview';
import { addDays } from 'date-fns';

import { HabitCard } from './HabitCard';

const meta = preview.meta({
  component: HabitCard,
  args: {
    days: [
      { date: addDays(new Date(), 0), state: 'idle' },
      { date: addDays(new Date(), 1), state: 'idle' },
      { date: addDays(new Date(), 2), state: 'idle' },
      { date: addDays(new Date(), 3), state: 'idle' },
      { date: addDays(new Date(), 4), state: 'idle' },
      { date: addDays(new Date(), 5), state: 'idle' },
      { date: addDays(new Date(), 6), state: 'idle' },
      { date: addDays(new Date(), 7), state: 'idle' },
      { date: addDays(new Date(), 8), state: 'idle' },
      { date: addDays(new Date(), 9), state: 'idle' },
      { date: addDays(new Date(), 10), state: 'idle' },
      { date: addDays(new Date(), 11), state: 'idle' },
      { date: addDays(new Date(), 12), state: 'idle' },
      { date: addDays(new Date(), 13), state: 'idle' },
    ],
    title: 'My Habit',
    Icon: IconAssembly,
    children: 'This is my habit description.',
    state: 'active',
  },
});

export const Default = meta.story();

export const HalfDone = meta.story({
  args: {
    days: [
      { date: addDays(new Date(), 0), state: 'done' },
      { date: addDays(new Date(), 1), state: 'done' },
      { date: addDays(new Date(), 2), state: 'done' },
      { date: addDays(new Date(), 3), state: 'done' },
      { date: addDays(new Date(), 4), state: 'done' },
      { date: addDays(new Date(), 5), state: 'done' },
      { date: addDays(new Date(), 6), state: 'done' },
      { date: addDays(new Date(), 7), state: 'idle' },
      { date: addDays(new Date(), 8), state: 'idle' },
      { date: addDays(new Date(), 9), state: 'idle' },
      { date: addDays(new Date(), 10), state: 'idle' },
      { date: addDays(new Date(), 11), state: 'idle' },
      { date: addDays(new Date(), 12), state: 'idle' },
      { date: addDays(new Date(), 13), state: 'idle' },
    ],
  },
});

export const AllMissed = meta.story({
  args: {
    days: [
      { date: addDays(new Date(), -14), state: 'missed' },
      { date: addDays(new Date(), -13), state: 'missed' },
      { date: addDays(new Date(), -12), state: 'missed' },
      { date: addDays(new Date(), -11), state: 'missed' },
      { date: addDays(new Date(), -10), state: 'missed' },
      { date: addDays(new Date(), -9), state: 'missed' },
      { date: addDays(new Date(), -8), state: 'missed' },
      { date: addDays(new Date(), -7), state: 'missed' },
      { date: addDays(new Date(), -6), state: 'missed' },
      { date: addDays(new Date(), -5), state: 'missed' },
      { date: addDays(new Date(), -4), state: 'missed' },
      { date: addDays(new Date(), -3), state: 'missed' },
      { date: addDays(new Date(), -2), state: 'missed' },
      { date: addDays(new Date(), -1), state: 'missed' },
      { date: addDays(new Date(), 0), state: 'idle' },
    ],
  },
});

export const MissedAfterProgress = meta.story({
  args: {
    days: [
      { date: addDays(new Date(), -7), state: 'done' },
      { date: addDays(new Date(), -6), state: 'done' },
      { date: addDays(new Date(), -5), state: 'done' },
      { date: addDays(new Date(), -4), state: 'done' },
      { date: addDays(new Date(), -3), state: 'done' },
      { date: addDays(new Date(), -2), state: 'missed' },
      { date: addDays(new Date(), -1), state: 'done' },
      { date: addDays(new Date(), 0), state: 'idle' },
      { date: addDays(new Date(), 1), state: 'idle' },
      { date: addDays(new Date(), 2), state: 'idle' },
      { date: addDays(new Date(), 3), state: 'idle' },
      { date: addDays(new Date(), 4), state: 'idle' },
      { date: addDays(new Date(), 5), state: 'idle' },
      { date: addDays(new Date(), 8), state: 'idle' },
      { date: addDays(new Date(), 9), state: 'idle' },
    ],
  },
});

export const Active = meta.story({
  args: {
    state: 'active',
  },
});
