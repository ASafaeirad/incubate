import { IconAssembly } from '@tabler/icons-react';
import preview from '#storybook/preview';

import { HabitCard } from './HabitCard';

const meta = preview.meta({
  component: HabitCard,
  args: {
    days: [
      { date: new Date('2024-06-01'), state: 'done' },
      { date: new Date('2024-06-02'), state: 'done' },
      { date: new Date('2024-06-03'), state: 'done' },
      { date: new Date('2024-06-04'), state: 'done' },
      { date: new Date('2024-06-05'), state: 'done' },
      { date: new Date('2024-06-06'), state: 'done' },
      { date: new Date('2024-06-07'), state: 'done' },
      { date: new Date('2024-06-08'), state: 'missed' },
      { date: new Date('2024-06-09'), state: 'missed' },
      { date: new Date('2024-06-10'), state: 'done' },
      { date: new Date(), state: 'idle' },
      { date: new Date('2024-06-12'), state: 'idle' },
      { date: new Date('2024-06-13'), state: 'idle' },
      { date: new Date('2024-06-14'), state: 'idle' },
    ],
    title: 'My Habit',
    Icon: IconAssembly,
    children: 'This is my habit description.',
    state: 'idle',
  },
});

export const Default = meta.story();

export const Active = meta.story({
  args: {
    state: 'active',
  },
});
