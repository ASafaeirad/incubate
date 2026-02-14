import type { ButtonProps } from '#ui/Button/Button';

import { Button } from '#ui/Button/Button';

import { useFormContext } from './FormContext';

export function SubmitButton({ disabled, ...props }: ButtonProps) {
  const form = useFormContext();

  return (
    <form.Subscribe selector={state => state.isSubmitting}>
      {isSubmitting => (
        <Button type="submit" disabled={isSubmitting || disabled} {...props} />
      )}
    </form.Subscribe>
  );
}
