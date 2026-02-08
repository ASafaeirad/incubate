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
        'group/avatar relative flex size-8 shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken dark:after:mix-blend-lighten',
        className,
      )}
    >
      <AvatarPrimitive.Image
        data-slot="avatar-image"
        className={cn(
          'aspect-square size-full rounded-full object-cover',
          className,
        )}
        {...props}
      />
      <AvatarPrimitive.Fallback
        data-slot="avatar-fallback"
        className={cn(
          'flex size-full w-full items-center justify-center overflow-hidden rounded-full bg-muted text-sm text-muted-foreground',
          className,
        )}
      >
        {fallback}
      </AvatarPrimitive.Fallback>

      {children == null ? null : (
        <span
          data-slot="avatar-badge"
          className={cn(
            'absolute right-0 bottom-0 z-10 inline-flex size-2.5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground ring-1 ring-background select-none',
            className,
          )}
        >
          {children}
        </span>
      )}
    </AvatarPrimitive.Root>
  );
}
