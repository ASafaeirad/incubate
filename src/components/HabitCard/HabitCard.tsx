import type { IconProps } from '@tabler/icons-react';

import { IconFlame } from '@tabler/icons-react';

import type { Day } from '#models/day';

import { cn } from '#lib/cn';
import { findStreak } from '#models/day';
import { Button } from '#ui/Button/Button';

import { HabitDay } from './HabitDay';

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
  const streak = findStreak(days);

  return (
    <div className="noise p-0 inline-full max-inline-sm">
      <div className="flex border-be border-border p-0">
        <div className="flex flex-1 flex-col gap-1 p-4">
          <div className="flex items-center justify-between">
            <h2
              className={cn('flex items-center gap-1 font-semibold', {
                'text-muted-foreground': state === 'idle',
              })}
            >
              <Icon className="block-4 inline-4" />
              <span>{title}</span>
            </h2>
            <div
              className={cn(
                'flex items-center gap-1 border px-2 py-0.5 text-xs font-semibold',
                {
                  'text-muted-foreground border-border':
                    state === 'idle' || streak === 0,
                },
                { 'text-fire': state === 'active' && streak > 0 },
              )}
            >
              <IconFlame className="block-3 inline-3" />
              <span>{streak}</span>
            </div>
          </div>
          <p className="text-disabled-foreground">{children}</p>
        </div>
        <div className="flex flex-col border-s border-border block-24 inline-20">
          <Button variant="primary" className="flex-1 border-be">
            Track
          </Button>
          <Button variant="ghost" className="flex-1">
            Skip
          </Button>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between gap-2 block-10 inline-full">
          {days.map(day => (
            <HabitDay key={day.date.getTime()} day={day} />
          ))}
        </div>
      </div>
    </div>
  );
};
