import { Progress, type ProgressRootProps } from '@base-ui/react';
import { clamp } from '@fullstacksjs/toolbox';
import { cn } from '#lib/cn';

interface ProgressBarProps extends ProgressRootProps {
  value: number;
  label?: string;
}

export function ProgressBar({
  value = 0,
  className,
  label,
  min = 0,
  max = 100,
  ...props
}: ProgressBarProps) {
  const clampedValue = clamp(value, min, max);

  return (
    <Progress.Root
      {...props}
      className={cn(
        'grid grid-cols-2 gap-1 text-sm text-muted-foreground',
        className,
      )}
      min={min}
      max={max}
      value={clampedValue}
    >
      <Progress.Track className="bg-muted col-start-1 col-end-3 h-1">
        <Progress.Indicator className="bg-primary" />
      </Progress.Track>
      <Progress.Label>{label}</Progress.Label>
      <Progress.Value className="place-self-end" />
    </Progress.Root>
  );
}
