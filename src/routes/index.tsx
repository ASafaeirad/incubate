import type { Day } from '#models/day';

import { IconAssembly } from '@tabler/icons-react';
import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@triplit/react';
import { HabitCard } from '#components/HabitCard/HabitCard';
import { client } from '#lib/triplit';
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

const query = client.query('routines').Select(['description', 'id', 'title']);

function App() {
  const { results: routines, fetching } = useQuery(client, query);

  if (fetching) {
    return <div>Loading...</div>;
  }
  if (!routines) {
    return <div>No routines found</div>;
  }

  const onClick = () => {
    return client.insert('routines', {
      title: 'New Routine',
      description: 'This is a new routine',
    });
  };

  const onDelete = (id: string) => {
    return client.delete('routines', id);
  };

  return (
    <div className="flex h-screen w-screen flex-wrap items-center justify-center gap-8">
      <button
        onClick={onClick}
        type="button"
        className="rounded-sm bg-blue-500 text-white absolute top-4 right-4 px-4 py-2"
      >
        Add Routine
      </button>
      {routines.map(r => (
        <HabitCard
          key={r.id}
          state="idle"
          Icon={IconAssembly}
          days={days}
          title={r.title}
          onDelete={() => onDelete(r.id)}
        >
          {r.description}
        </HabitCard>
      ))}
    </div>
  );
}
