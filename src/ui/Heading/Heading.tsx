import type { VariantProps } from 'class-variance-authority';

import { useRender } from '@base-ui/react';
import { cn } from '#lib/cn';
import { cva } from 'class-variance-authority';

const headingVariants = cva('font-bold text-foreground', {
  variants: {
    level: {
      h1: 'text-2xl',
      h2: 'text-xl',
      h3: 'text-lg',
      h4: 'text-base',
    },
    variant: {
      default: 'text-foreground',
      muted: 'text-muted-foreground',
      primary: 'text-primary',
      destructive: 'text-destructive',
    },
  },
  defaultVariants: {
    level: 'h2',
    variant: 'default',
  },
});

export type HeadingProps = useRender.ComponentProps<'h1'> &
  VariantProps<typeof headingVariants>;

export function Heading({
  className,
  variant = 'default',
  level = 'h2',
  ...props
}: HeadingProps) {
  return useRender({
    defaultTagName: level!,
    props: {
      className: cn(headingVariants({ level, variant }), className),
      ...props,
    },
    state: {
      slot: 'heading',
      variant,
    },
  });
}
