import { useMutation } from 'convex/react';
import * as v from 'valibot';

import { api } from '#convex/api';
import { useAppForm } from '#lib/form';
import { isErr } from '#lib/result';

interface NewRoutineProps {
  onCreated?: () => void;
}

export function NewRoutine({ onCreated }: NewRoutineProps) {
  const createRoutine = useMutation(api.routines.create);

  const form = useAppForm({
    defaultValues: { name: '' },
    validators: {
      onChange: v.object({ name: v.pipe(v.string(), v.minLength(1, 'No')) }),
    },
    onSubmit: async ({ value, formApi }) => {
      const result = await createRoutine({ name: value.name });

      if (isErr(result)) {
        console.error(`Error creating routine: ${result.error}`);
        return;
      }

      formApi.reset();
      onCreated?.();
    },
  });

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        void form.handleSubmit();
      }}
      className="rounded-lg flex flex-col gap-3 border border-border p-4 inline-full max-inline-md"
    >
      <h3 className="text-lg font-semibold">New routine</h3>
      <form.AppField name="name">
        {field => <field.TextField placeholder="Routine name" />}
      </form.AppField>
      <form.AppForm>
        <form.SubmitButton className="inline-full">
          Create routine
        </form.SubmitButton>
      </form.AppForm>
    </form>
  );
}
