import type { BaseValidation } from 'valibot';

import { useStore } from '@tanstack/react-form';

import { useFieldContext } from './FormContext';

export default function TextField({ placeholder }: { placeholder: string }) {
  const field = useFieldContext<string>();

  const errors = useStore(field.store, state => state.meta.errors);

  const getErrorType = (error: BaseValidation<any, any, any>): string => {
    if (error.type === 'min_length') return 'Too short';
    return 'Invalid value';
  };

  return (
    <div className="flex flex-col gap-1">
      <input
        className="border border-border px-2 py-1 outline-none focus-within:border-primary"
        placeholder={placeholder}
        value={field.state.value}
        onChange={e => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
      />
      {errors.map(error => (
        <div key={error} className="text-sm text-destructive">
          {getErrorType(error)}
        </div>
      ))}
    </div>
  );
}
