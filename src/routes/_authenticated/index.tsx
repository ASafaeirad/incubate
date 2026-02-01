/* eslint-disable @eslint-react/no-children-prop */
import { createFileRoute } from '@tanstack/react-router';
import { api } from '#convex/api';
import { useAppForm } from '#lib/form';
import { Button } from '#ui/Button/Button';
import { useMutation, useQuery } from 'convex/react';
import * as v from 'valibot';

export const Route = createFileRoute('/_authenticated/')({
  component: RouteComponent,
});

function RouteComponent() {
  const createSlot = useMutation(api.slots.create);
  const slots = useQuery(api.slots.list);
  const removeSlot = useMutation(api.slots.remove);
  const form = useAppForm({
    defaultValues: { name: '' },
    validators: {
      onChange: v.object({ name: v.pipe(v.string(), v.minLength(1, 'No')) }),
    },
    onSubmit: async ({ value, formApi }) => {
      try {
        await createSlot({ name: value.name });
        formApi.reset();
      } catch (error) {
        console.error('Failed to create slot:', error);
      }
    },
  });

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <div className="flex gap-2">
        {slots?.map(slot => (
          <div
            className="flex flex-col gap-2 border border-border p-2"
            key={slot._id.toString()}
          >
            <span className="flex items-center px-2 py-1">{slot.name}</span>
            <Button onClick={() => removeSlot({ id: slot._id })}>Delete</Button>
          </div>
        ))}
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
      </div>
    </div>
  );
}
