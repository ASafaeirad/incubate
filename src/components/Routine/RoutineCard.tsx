import type { Routine } from '#models/routine';

import { Button } from '#ui/Button/Button';

const getStateColor = (state: string) => {
  switch (state) {
    case 'incubating':
      return 'bg-muted text-muted-foreground';

    case 'active':
      return 'bg-primary text-primary-foreground';

    case 'broken':
      return 'bg-destructive-background text-destructive';

    case 'achieve':
      return 'bg-fire text-primary-foreground';

    default:
      return 'bg-muted text-muted-foreground';
  }
};

interface Props {
  routine: Routine;
  onComplete?: () => void;
  onDelete?: () => void;
}

export const RoutineCard = ({ routine, onComplete, onDelete }: Props) => {
  return (
    <div className="rounded-lg flex w-64 flex-col gap-3 border border-border p-4">
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold">{routine.name}</h3>
        <span
          className={`rounded-sm px-2 py-1 text-xs font-medium uppercase ${getStateColor(routine.state)}`}
        >
          {routine.state}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Current Streak:</span>
          <span className="font-bold text-foreground">
            {routine.currentStreak} days
          </span>
        </div>

        {routine.state === 'incubating' && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Days to Active:</span>
            <span className="font-bold text-foreground">
              {routine.daysRemaining} days
            </span>
          </div>
        )}

        {routine.completedToday && (
          <div className="rounded-sm bg-primary/10 px-3 py-2 text-center text-sm font-medium text-primary">
            ✓ Completed Today
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Button
            onClick={onComplete}
            disabled={routine.completedToday}
            className="flex-1"
          >
            {routine.completedToday ? 'Done' : 'Complete'}
          </Button>
          <Button onClick={onDelete} className="shrink-0">
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};
