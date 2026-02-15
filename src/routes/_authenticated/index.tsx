import { createFileRoute } from '@tanstack/react-router';
import { api } from '#convex/api';
import { useAppForm } from '#lib/form';
import { isErr } from '#lib/result';
import { Button } from '#ui/Button/Button';
import { useMutation, useQuery } from 'convex/react';
import * as v from 'valibot';

export const Route = createFileRoute('/_authenticated/')({
  component: RouteComponent,
});

function RouteComponent() {
  const removeRoutine = useMutation(api.routines.remove);
  const routinesResult = useQuery(api.routines.list);
  const profileResult = useQuery(api.profile.get);

  if (!profileResult) {
    return <div>Loading...</div>;
  }

  if (isErr(profileResult)) {
    return <div>Error loading profile: {profileResult.error}</div>;
  }

  if (!routinesResult) {
    return <div>Loading...</div>;
  }

  if (isErr(routinesResult)) {
    return <div>Error loading routines: {routinesResult.error}</div>;
  }

  const routines = routinesResult.value;
  const profile = profileResult.value;

  const isRoutineAvailable = profile.routines > routines.length;

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <div className="flex gap-2">
        {routines.map(routine => (
          <div
            className="flex flex-col gap-2 border border-border p-2"
            key={routine.id}
          >
            <span className="flex items-center px-2 py-1">{routine.name}</span>
            <Button onClick={() => removeRoutine({ id: routine.id })}>
              Delete
            </Button>
          </div>
        ))}
        {isRoutineAvailable && <NewRoutine />}
      </div>
    </div>
  );
}

function NewRoutine() {
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
      className="flex flex-col gap-2 border border-border p-2"
    >
      <form.AppField
        name="name"
        children={field => <field.TextField placeholder="Name" />}
      />
      <form.AppForm>
        <form.SubmitButton>Create Routine</form.SubmitButton>
      </form.AppForm>
    </form>
  );
}
