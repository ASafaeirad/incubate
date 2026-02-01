import type { Day } from '#models/day';

import { cn } from '#lib/cn';
import { isToday } from 'date-fns';

interface Props {
  day: Day;
}

export const HabitDay = ({ day }: Props) => {
  return (
    <div
      key={day.date.getTime()}
      className={cn('flex-1', {
        'bg-primary': day.state === 'done',
        'bg-destructive-background': day.state === 'missed',
        'bg-muted': day.state === 'idle',
        'border-foreground border bg-accent':
          isToday(day.date) && day.state === 'idle',
      })}
    />
  );
};
