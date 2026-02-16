import { api } from '#convex/api';
import { useAppForm } from '#lib/form';
import { isErr } from '#lib/result';
import { useMutation, useQuery } from 'convex/react';
import * as v from 'valibot';

export function NewRoutine() {
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
    },
  });

  const routinesResult = useQuery(api.routines.list);

  if (!routinesResult) {
    return <div>Loading...</div>;
  }

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        void form.handleSubmit();
      }}
      className="rounded-lg flex w-64 flex-col gap-3 border border-border p-4"
    >
      <h3 className="text-lg font-semibold">New Routine</h3>
      <form.AppField
        name="name"
        children={field => <field.TextField placeholder="Routine name" />}
      />
      <form.AppForm>
        <form.SubmitButton className="w-full">Create Routine</form.SubmitButton>
      </form.AppForm>
    </form>
  );
}
