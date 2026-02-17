import type { VariantProps } from 'class-variance-authority';

import { mergeProps, useRender } from '@base-ui/react';
import { cn } from '#lib/cn';
import { cva } from 'class-variance-authority';

const textVariants = cva('', {
  variants: {
    variant: {
      default: 'text-foreground',
      muted: 'text-muted-foreground',
      primary: 'text-primary',
      destructive: 'text-destructive',
      disabled: 'text-disabled-foreground',
    },
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'base',
    weight: 'normal',
  },
});

export type TextProps = useRender.ComponentProps<'span'> &
  VariantProps<typeof textVariants>;

export function Text({
  className,
  variant = 'default',
  size = 'base',
  weight = 'normal',
  render,
  ...props
}: TextProps) {
  return useRender({
    defaultTagName: 'span',
    props: mergeProps<'span'>(
      {
        className: cn(textVariants({ variant, size, weight }), className),
      },
      props,
    ),
    render,
    state: {
      slot: 'text',
      variant,
    },
  });
}
