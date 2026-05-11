import { Avatar as AvatarPrimitive } from '@base-ui/react/avatar';

import { cn } from '#lib/cn';

interface AvatarProps extends AvatarPrimitive.Image.Props {
  fallback: string;
}

export function Avatar({
  className,
  children,
  fallback,
  ...props
}: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        'group/avatar relative flex shrink-0 rounded-full select-none block-8 inline-8 after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken dark:after:mix-blend-lighten',
        className,
      )}
    >
      <AvatarPrimitive.Image
        data-slot="avatar-image"
        className={cn(
          'aspect-square rounded-full object-cover block-full inline-full',
          className,
        )}
        {...props}
      />
      <AvatarPrimitive.Fallback
        data-slot="avatar-fallback"
        className={cn(
          'flex items-center justify-center overflow-hidden rounded-full bg-muted text-sm text-muted-foreground block-full inline-full',
          className,
        )}
      >
        {fallback}
      </AvatarPrimitive.Fallback>

      {children == null ? null : (
        <span
          data-slot="avatar-badge"
          className={cn(
            'absolute inset-e-0 inset-be-0 z-10 inline-flex items-center justify-center rounded-full bg-primary text-xs text-primary-foreground ring-1 ring-background select-none block-2.5 inline-2.5',
            className,
          )}
        >
          {children}
        </span>
      )}
    </AvatarPrimitive.Root>
  );
}
