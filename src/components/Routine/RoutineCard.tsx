import type { Routine, RoutineState } from '#models/routine';

import { isNull, range } from '@fullstacksjs/toolbox';
import { IconTarget } from '@tabler/icons-react';
import { cn } from '#lib/cn';
import { isTodayInTimezone } from '#models/date';
import { Badge } from '#ui/Badge/Badge';
import { Button } from '#ui/Button/Button';
import { Card, CardContent, CardHeader } from '#ui/Card/Card';
import { Heading } from '#ui/Heading/Heading';
import { Skeleton } from '#ui/Skeleton/Skeleton';

interface Props {
  routine: Routine;
  onComplete?: () => void;
  onDelete?: () => void;
  timezone: string;
}

const iconMap: Record<RoutineState, typeof IconTarget> = {
  incubating: IconTarget,
  active: IconTarget,
  achieve: IconTarget,
  broken: IconTarget,
};

export const RoutineCard = ({
  routine,
  onComplete,
  onDelete: _onDelete,
  timezone,
}: Props) => {
  const Icon = iconMap[routine.state];
  const isCompletedToday =
    !isNull(routine.lastCompletion) &&
    isTodayInTimezone(routine.lastCompletion, timezone);

  return (
    <Card className="w-96">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <Heading level="h3">{routine.name}</Heading>
          <Badge>
            <Icon data-icon="inline-start" className="size-3" />
            {routine.state}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="grid grid-cols-7 gap-1">
          {range(21).map(i => (
            <div
              key={i}
              className={cn('h-2', {
                'bg-foreground': routine.currentStreak > i + 1,
                'bg-primary': routine.currentStreak === i + 1,
                'bg-muted': routine.currentStreak < i + 1,
              })}
            />
          ))}
        </div>
        {isCompletedToday ? (
          <div className="flex h-8 items-center justify-center bg-primary/10 text-primary">
            Completed
          </div>
        ) : (
          <Button onClick={onComplete}>Track</Button>
        )}
      </CardContent>
    </Card>
  );
};

export const RoutineCardSkeleton = () => {
  return (
    <Card className="w-96">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-5 w-16" />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="grid grid-cols-7 gap-1">
          {range(21).map(i => (
            <Skeleton key={i} className="h-2 w-full" />
          ))}
        </div>
        <Skeleton className="h-8 w-full" />
      </CardContent>
    </Card>
  );
};
