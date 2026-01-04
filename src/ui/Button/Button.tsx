export function Button(props: React.ComponentProps<'button'>) {
  return (
    <button
      type="button"
      className="bg-elevated-background py-1 px-4"
      {...props}
    />
  );
}
