import type { IconProps } from '@tabler/icons-react';

import { cn } from '#lib/cn';
import { Button } from '#ui/Button/Button';

import { HabitDay } from './HabitDay';

export interface Day {
  date: Date;
  state: 'done' | 'idle' | 'missed';
}

interface Props {
  title: string;
  state?: 'active' | 'idle';
  days: Day[];
  Icon: React.FC<IconProps>;
  children: React.ReactNode;
}

export const HabitCard = ({
  days,
  title,
  state = 'idle',
  Icon,
  children,
}: Props) => {
  return (
    <div className="noise w-full max-w-sm p-0">
      <div className="flex border-b border-border p-0">
        <div className="flex flex-1 flex-col gap-1 p-4">
          <h2
            className={cn('flex items-center gap-1 font-semibold', {
              'text-muted-foreground': state === 'idle',
            })}
          >
            <Icon className="size-4" />
            <span>{title}</span>
          </h2>
          <p className="text-disabled-foreground">{children}</p>
        </div>
        <div className="flex h-24 w-20 flex-col border-l border-border">
          <Button variant="primary" className="flex-1 border-b">
            Track
          </Button>
          <Button className="flex-1">Skip</Button>
        </div>
      </div>
      <div className="p-4">
        <div className="flex h-10 w-full justify-between gap-2">
          {days.map(day => (
            <HabitDay key={day.date.getTime()} day={day} />
          ))}
        </div>
      </div>
    </div>
  );
};
