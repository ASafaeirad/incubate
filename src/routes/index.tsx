import type { Day } from '#models/day';

import { IconAssembly } from '@tabler/icons-react';
import { createFileRoute } from '@tanstack/react-router';
import { HabitCard } from '#components/HabitCard/HabitCard';
import { addDays } from 'date-fns';

export const Route = createFileRoute('/')({
  component: App,
});

const days: Day[] = [
  { date: addDays(new Date(), -10), state: 'done' },
  { date: addDays(new Date(), -9), state: 'done' },
  { date: addDays(new Date(), -8), state: 'done' },
  { date: addDays(new Date(), -7), state: 'done' },
  { date: addDays(new Date(), -6), state: 'done' },
  { date: addDays(new Date(), -5), state: 'done' },
  { date: addDays(new Date(), -4), state: 'done' },
  { date: addDays(new Date(), -3), state: 'done' },
  { date: addDays(new Date(), -2), state: 'missed' },
  { date: addDays(new Date(), -1), state: 'missed' },
  { date: new Date(), state: 'idle' },
  { date: addDays(new Date(), 1), state: 'idle' },
  { date: addDays(new Date(), 2), state: 'idle' },
  { date: addDays(new Date(), 3), state: 'idle' },
  { date: addDays(new Date(), 4), state: 'idle' },
  { date: addDays(new Date(), 5), state: 'idle' },
];

function App() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <HabitCard state="idle" Icon={IconAssembly} days={days} title="My Habit">
        This is my habit description.
      </HabitCard>
    </div>
  );
}
