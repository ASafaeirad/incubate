import type { ProgressRootProps } from '@base-ui/react';

import { Progress } from '@base-ui/react';
import { clamp } from '@fullstacksjs/toolbox';
import { cn } from '#lib/cn';

interface ProgressBarProps extends ProgressRootProps {
  value: number;
  label?: React.ReactNode;
}

export function ProgressBar({
  value,
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
      <Progress.Track className="col-start-1 col-end-3 h-1 bg-muted">
        <Progress.Indicator className="bg-primary" />
      </Progress.Track>
      <Progress.Label>{label}</Progress.Label>
      <Progress.Value className="place-self-end" />
    </Progress.Root>
  );
}
