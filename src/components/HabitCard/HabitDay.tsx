import { cn } from '#lib/cn';
import { isToday } from 'date-fns';

import type { Day } from './HabitCard';

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
        'bg-foreground': isToday(day.date) && day.state === 'idle',
      })}
    />
  );
};
