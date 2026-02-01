import { Button } from '#ui/Button/Button';

import { useFormContext } from './FormContext';

export function SubmitButton({ children }: { children: string }) {
  const form = useFormContext();

  return (
    <form.Subscribe selector={state => state.isSubmitting}>
      {isSubmitting => (
        <Button type="submit" disabled={isSubmitting}>
          {children}
        </Button>
      )}
    </form.Subscribe>
  );
}
