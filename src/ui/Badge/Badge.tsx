import type { VariantProps } from 'class-variance-authority';

import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { cn } from '#lib/cn';
import { cva } from 'class-variance-authority';

const badgeVariants = cva(
  [
    'inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1.5 overflow-hidden border border-transparent px-2 py-0.5',
    'text-sm font-medium whitespace-nowrap transition-all',
    'has-data-[icon=inline-start]:pl-1.5',
    '[&>svg]:pointer-events-none [&>svg]:size-3!',
  ].join(' '),
  {
    variants: {
      variant: {
        default: 'bg-muted',
        primary: 'bg-primary text-primary-foreground',
        destructive: 'bg-destructive-background text-background',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export type BadgeProps = useRender.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants>;

function Badge({
  className,
  variant = 'default',
  render,
  ...props
}: BadgeProps) {
  return useRender({
    defaultTagName: 'span',
    props: mergeProps<'span'>(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props,
    ),
    render,
    state: {
      slot: 'badge',
      variant,
    },
  });
}

export { Badge, badgeVariants };
