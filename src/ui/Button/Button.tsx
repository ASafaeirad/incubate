import type { VariantProps } from 'class-variance-authority';

import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cn } from '#lib/cn';
import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  [
    'group/button',
    'inline-flex shrink-0 cursor-pointer items-center justify-center bg-clip-padding font-medium whitespace-nowrap transition-all select-none',
    'outline-none focus-visible:ring-1 ring-primary',
    'disabled:pointer-events-none disabled:opacity-50 border-border',
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    'hover:bg-background-hover',
  ].join(' '),
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
