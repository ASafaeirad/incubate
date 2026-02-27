import { createFileRoute } from '@tanstack/react-router';
import { NewRoutine } from '#components/Routine/NewRoutine';
import {
  RoutineCard,
  RoutineCardSkeleton,
} from '#components/Routine/RoutineCard';
import { api } from '#convex/api';
import { isErr } from '#lib/result';
import { useMutation, useQuery } from 'convex/react';

export const Route = createFileRoute('/_authenticated/')({
  component: RouteComponent,
});

function RouteComponent() {
  const routinesResult = useQuery(api.routines.list);
  const profileResult = useQuery(api.profile.get);
  const completeRoutine = useMutation(api.routines.complete);
  const removeRoutine = useMutation(api.routines.remove);

  if (!profileResult || !routinesResult) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <RoutineCardSkeleton />
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

  const isRoutineAvailable = profile.routines > routines.length;

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <div className="flex flex-wrap gap-4">
        {routines.map(routine => (
          <RoutineCard
            key={routine.id}
            routine={routine}
            onComplete={() => completeRoutine({ routineId: routine.id })}
            onDelete={() => removeRoutine({ id: routine.id })}
            timezone={profile.timezone}
          />
        ))}
        {isRoutineAvailable && <NewRoutine />}
      </div>
    </div>
  );
}
