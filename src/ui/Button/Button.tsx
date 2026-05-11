import type { VariantProps } from 'class-variance-authority';

import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva } from 'class-variance-authority';

import { cn, join } from '#lib/cn';

const buttonVariants = cva(
  join([
    'group/button',
    'flex shrink-0 cursor-pointer items-center justify-center bg-clip-padding font-medium whitespace-nowrap transition-all select-none',
    'ring-primary outline-none focus-visible:ring-1',
    'border-border disabled:pointer-events-none disabled:opacity-50',
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:block-4 [&_svg:not([class*='size-'])]:inline-4",
    'hover:bg-background-hover',
  ]),
  {
    variants: {
      variant: {
        default: 'border hover:bg-background-hover',
        ghost: '',
        primary: 'text-primary hover:bg-background-hover',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground',
        destructive:
          'focus-visible:ring-destructive/40 bg-destructive-background text-background focus-visible:border-destructive/40 hover:bg-destructive/40',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        'default':
          "h-8 gap-1 px-2.5 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        'sm': "h-6 gap-1 px-2 text-sm has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        'icon': 'size-8 gap-1',
        'icon-sm': "size-6 [&_svg:not([class*='size-'])]:size-3",
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants>;

export function Button({
  className,
  variant = 'default',
  size = 'default',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      type={type}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
