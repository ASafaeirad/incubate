import { IconPlus } from '@tabler/icons-react';
import { createFileRoute } from '@tanstack/react-router';
import { useMutation, useQuery } from 'convex/react';
import { useState } from 'react';

import { NewRoutine } from '#components/Routine/NewRoutine';
import { RoutineTableRow } from '#components/Routine/Routine';
import { api } from '#convex/api';
import { isErr } from '#lib/result';
import { Button } from '#ui/Button/Button';

export const Route = createFileRoute('/_authenticated/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [createOpen, setCreateOpen] = useState(false);

  const routinesResult = useQuery(api.routines.list);
  const profileResult = useQuery(api.profile.get);
  const completeRoutine = useMutation(api.routines.complete);
  const removeRoutine = useMutation(api.routines.remove);

  if (!profileResult || !routinesResult) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 block-full">
        <div>Loading...</div>
      </div>
    );
  }

  if (isErr(profileResult)) {
    return <div>Error loading profile: {profileResult.error}</div>;
  }

  if (isErr(routinesResult)) {
    return <div>Error loading routines: {routinesResult.error}</div>;
  }

  const routines = routinesResult.value;
  const profile = profileResult.value;

  const canCreateRoutine = profile.routines > routines.length;

  return (
    <div className="mx-auto flex flex-col gap-4 p-4 block-full inline-full max-inline-3xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-bold">Routines</h1>
        {canCreateRoutine && (
          <Button
            type="button"
            variant={createOpen ? 'secondary' : 'default'}
            onClick={() => {
              setCreateOpen(open => !open);
            }}
          >
            <IconPlus />
            {createOpen ? 'Cancel' : 'Create routine'}
          </Button>
        )}
      </div>

      {createOpen && canCreateRoutine && (
        <NewRoutine
          onCreated={() => {
            setCreateOpen(false);
          }}
        />
      )}

      <div className="rounded-lg overflow-x-auto border border-border">
        <table className="border-collapse text-sm inline-full">
          <thead>
            <tr className="border-be border-border bg-muted/50 text-start font-semibold">
              <th className="px-3 py-2 font-semibold">Name</th>
              <th className="px-3 py-2 font-semibold">State</th>
              <th className="px-3 py-2 font-semibold">Streak</th>
              <th className="px-3 py-2 font-semibold">Today</th>
              <th className="px-3 py-2 text-end font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {routines.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-3 py-8 text-center text-muted-foreground"
                >
                  No routines yet.
                  {canCreateRoutine
                    ? ' Use Create routine to add one.'
                    : ' Increase your level to unlock more slots.'}
                </td>
              </tr>
            ) : (
              routines.map(routine => (
                <RoutineTableRow
                  key={routine.id}
                  routine={routine}
                  onComplete={() => {
                    void completeRoutine({ routineId: routine.id });
                  }}
                  onDelete={() => {
                    void removeRoutine({ id: routine.id });
                  }}
                  timezone={profile.timezone}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
