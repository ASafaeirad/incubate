import type { IconProps } from '@tabler/icons-react';

import { isNull } from '@fullstacksjs/toolbox';
import {
  IconAlertTriangle,
  IconFlame,
  IconSparkles,
  IconTarget,
  IconTrophy,
} from '@tabler/icons-react';
import { useState } from 'react';

import type { Routine, RoutineState } from '#models/routine';

import { cn } from '#lib/cn';
import { isTodayInTimezone } from '#models/date';
import { Badge } from '#ui/Badge/Badge';
import { Button } from '#ui/Button/Button';
import { Card, CardContent, CardFooter, CardHeader } from '#ui/Card/Card';
import { Heading } from '#ui/Heading/Heading';
import { Text } from '#ui/Text/Text';

interface Props {
  routine: Routine;
  onComplete?: () => Promise<void> | void;
  onDelete?: () => Promise<void> | void;
  timezone: string;
}

const iconMap: Record<RoutineState, React.FC<IconProps>> = {
  incubating: IconSparkles,
  active: IconTarget,
  achieve: IconTrophy,
  broken: IconAlertTriangle,
};

const stateLabel: Record<RoutineState, string> = {
  incubating: 'Incubating',
  active: 'Active',
  achieve: 'Achieved',
  broken: 'Broken',
};

const badgeVariant: Record<
  RoutineState,
  'default' | 'destructive' | 'primary'
> = {
  incubating: 'default',
  active: 'default',
  achieve: 'primary',
  broken: 'destructive',
};

function useRoutineActions({ routine, timezone, onComplete, onDelete }: Props) {
  const isCompletedToday =
    !isNull(routine.lastCompletion) &&
    isTodayInTimezone(routine.lastCompletion, timezone);

  const [pending, setPending] = useState<'complete' | 'delete' | null>(null);

  const handleComplete = () => {
    if (!onComplete || isCompletedToday || pending) return;
    setPending('complete');
    void Promise.resolve(onComplete()).finally(() => {
      setPending(null);
    });
  };

  const handleDelete = () => {
    if (!onDelete || pending) return;
    setPending('delete');
    void Promise.resolve(onDelete()).finally(() => {
      setPending(null);
    });
  };

  return {
    handleComplete,
    handleDelete,
    isCompletedToday,
    pending,
    streak: routine.currentStreak,
  };
}

export const RoutineCard = ({
  routine,
  onComplete,
  onDelete,
  timezone,
}: Props) => {
  const Icon = iconMap[routine.state];
  const { handleComplete, handleDelete, isCompletedToday, pending, streak } =
    useRoutineActions({ routine, timezone, onComplete, onDelete });

  return (
    <Card size="sm" className="inline-64 min-inline-0">
      <CardHeader className="border-be border-border pbe-3">
        <div className="flex items-start justify-between gap-2 inline-full">
          <div className="flex flex-1 items-center gap-2 min-inline-0">
            <Icon className="shrink-0 text-muted-foreground block-4 inline-4" />
            <Heading level="h3" className="truncate font-semibold">
              {routine.name}
            </Heading>
          </div>
          <Badge variant={badgeVariant[routine.state]}>
            {stateLabel[routine.state]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex items-center gap-1.5">
        <IconFlame
          className={cn('shrink-0 block-4 inline-4', {
            'text-muted-foreground': streak === 0,
            'text-fire': streak > 0,
          })}
        />
        <Text weight="semibold" variant={streak === 0 ? 'muted' : 'default'}>
          {streak} day{streak === 1 ? '' : 's'}
        </Text>
        {isCompletedToday && <Text variant="muted">Done today</Text>}
      </CardContent>
      <CardFooter className="flex flex-wrap justify-end gap-2 border-bs border-border">
        {onDelete && (
          <Button
            type="button"
            variant="destructive"
            size="sm"
            disabled={pending !== null}
            onClick={handleDelete}
          >
            {pending === 'delete' ? 'Deleting…' : 'Delete'}
          </Button>
        )}
        {onComplete && (
          <Button
            type="button"
            variant="primary"
            size="sm"
            disabled={isCompletedToday || pending !== null}
            onClick={handleComplete}
          >
            {pending === 'complete' ? 'Completing…' : 'Complete'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export const RoutineTableRow = ({
  routine,
  onComplete,
  onDelete,
  timezone,
}: Props) => {
  const Icon = iconMap[routine.state];
  const { handleComplete, handleDelete, isCompletedToday, pending, streak } =
    useRoutineActions({ routine, timezone, onComplete, onDelete });

  return (
    <tr className="border-be border-border align-middle odd:bg-card hover:bg-muted/40">
      <td className="px-3 py-2 text-start max-inline-xs">
        <div className="flex items-center gap-2 min-inline-0">
          <Icon className="shrink-0 text-muted-foreground block-4 inline-4" />
          <Text weight="medium" className="truncate">
            {routine.name}
          </Text>
        </div>
      </td>
      <td className="px-3 py-2 text-start">
        <Badge variant={badgeVariant[routine.state]}>
          {stateLabel[routine.state]}
        </Badge>
      </td>
      <td className="px-3 py-2 text-start">
        <div className="flex items-center gap-1.5">
          <IconFlame
            className={cn('shrink-0 block-4 inline-4', {
              'text-muted-foreground': streak === 0,
              'text-fire': streak > 0,
            })}
          />
          <Text
            size="sm"
            weight="semibold"
            variant={streak === 0 ? 'muted' : 'default'}
            className="tabular-nums"
          >
            {streak}
          </Text>
        </div>
      </td>
      <td className="px-3 py-2 text-start">
        <Text size="sm" variant="muted">
          {isCompletedToday ? 'Done today' : '—'}
        </Text>
      </td>
      <td className="px-3 py-2 text-end">
        <div className="flex flex-wrap items-center justify-end gap-2">
          {onDelete && (
            <Button
              type="button"
              variant="destructive"
              size="sm"
              disabled={pending !== null}
              onClick={handleDelete}
            >
              {pending === 'delete' ? 'Deleting…' : 'Delete'}
            </Button>
          )}
          {onComplete && (
            <Button
              type="button"
              variant="primary"
              size="sm"
              disabled={isCompletedToday || pending !== null}
              onClick={handleComplete}
            >
              {pending === 'complete' ? 'Completing…' : 'Complete'}
            </Button>
          )}
        </div>
      </td>
    </tr>
  );
};
