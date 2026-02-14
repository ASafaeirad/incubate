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
  const removeSlot = useMutation(api.slots.remove);
  const slotsResult = useQuery(api.slots.list);
  const profileResult = useQuery(api.profile.get);

  if (!profileResult) {
    return <div>Loading...</div>;
  }

  if (isErr(profileResult)) {
    return <div>Error loading profile: {profileResult.error}</div>;
  }

  if (!slotsResult) {
    return <div>Loading...</div>;
  }

  if (isErr(slotsResult)) {
    return <div>Error loading slots: {slotsResult.error}</div>;
  }

  const slots = slotsResult.value;
  const profile = profileResult.value;

  const isSlotAvailable = profile.slots > slots.length;

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <div className="flex gap-2">
        {slots.map(slot => (
          <div
            className="flex flex-col gap-2 border border-border p-2"
            key={slot.id}
          >
            <span className="flex items-center px-2 py-1">{slot.name}</span>
            <Button onClick={() => removeSlot({ id: slot.id })}>Delete</Button>
          </div>
        ))}
        {isSlotAvailable && <NewSlot />}
      </div>
    </div>
  );
}

function NewSlot() {
  const createSlot = useMutation(api.slots.create);

  const form = useAppForm({
    defaultValues: { name: '' },
    validators: {
      onChange: v.object({ name: v.pipe(v.string(), v.minLength(1, 'No')) }),
    },
    onSubmit: async ({ value, formApi }) => {
      const result = await createSlot({ name: value.name });

      if (isErr(result)) {
        console.error(`Error creating slot: ${result.error}`);
        return;
      }

      formApi.reset();
    },
  });

  const slotsResult = useQuery(api.slots.list);

  if (!slotsResult) {
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
        <form.SubmitButton>Create Slot</form.SubmitButton>
      </form.AppForm>
    </form>
  );
}
