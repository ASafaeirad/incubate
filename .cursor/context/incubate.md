# Incubate (routine tracker)

**Product:** Habit-building game: routines move through states (`incubating` → `active` → `broken` / `achieve`), streaks, daily completions, XP/levels. Routine slots scale with profile level (`profile.routines === level`).

**Stack:** Vite + React 19, TanStack Router (file routes), Convex + `@convex-dev/auth`, TanStack Form + Valibot, Tailwind 4, pnpm.

**Run:** `pnpm dev` runs Vite and `convex dev` in parallel.

**Imports:** `#convex/api` → `convex/_generated/api.js`; shared domain in `src/models/`; UI in `src/ui/`; features in `src/components/`.

**Note:** This app uses Convex React hooks (`useQuery`, `useMutation`, `useConvexAuth`), not TanStack Start + `@convex-dev/react-query`.

Don't change `src/routeTree.gen.ts`. it's will be generated automatically.

**Typing:** Module augmentation in `maie.tsx` registers the router type for `Link`, `useNavigate`, etc.

# TanStack Form in Incubate

**Pattern:** App-wide form hook from `createFormHook` in `src/lib/form/form.tsx` — exports `useAppForm`, `withForm`, `withFieldGroup`. Re-exports live in `src/lib/form/index.ts` (import as `#lib/form`).

**Contexts:** `src/lib/form/FormContext.ts` wires `fieldContext` / `formContext` for typed field and form components.

**Registered components:** `TextField` (field), `SubmitButton` (form). Extend `fieldComponents` / `formComponents` in `form.tsx` when adding shared controls.

**Usage example:** `src/components/Routine/NewRoutine.tsx` — `useAppForm` with Valibot `validators.onChange`, `defaultValues`, `onSubmit` calling Convex `useMutation`. JSX: `form.AppField` → `field.TextField`; `form.AppForm` → `form.SubmitButton`. Standard `<form onSubmit>` prevents default and calls `form.handleSubmit()`.
