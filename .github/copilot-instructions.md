# Incubate - AI Agent Instructions

## Code Style

**Import Aliases** (defined in package.json):

```typescript
import { api } from '#convex/api'; // Convex API
import { Day } from '#models/day'; // Business logic models
import { Button } from '#ui/Button'; // UI components
import { Header } from '#components/Header'; // Feature components
import { cn } from '#lib/cn'; // Tailwind merge utility
import { Form } from '#lib/form'; // Form utilities
import { Result, ok, err, isOk, isErr } from '#lib/result/result';
```

**Tailwind CSS**: Only use color tokens defined in
[src/styles.css](src/styles.css). Use `cn()` to merge classes and `cva()` for
component variants.

**Result Pattern**: Use `ok(value)` for success, `err(error)` for failures.
Check with `isOk(result)` / `isErr(result)`. See
[src/lib/result/result.ts](src/lib/result/result.ts).

## Architecture

**Slot System**: Core concept where commitment is earned, not declared. Users
unlock habit slots by proving commitment.

**Convex Backend**: BaaS with schema in [convex/schema.ts](convex/schema.ts).
Functions are mutations/queries/actions. Import via `#convex/api`. Auth uses
Convex Auth with custom domain config.

**Routing**: TanStack Router with file-based routes in
[src/routes/](src/routes/). Protected routes use
[\_authenticated.tsx](src/routes/_authenticated.tsx) layout. Routes export
`createFileRoute()`.

**Forms**: TanStack React Form + Valibot validation. Components in
[src/lib/form/](src/lib/form/). Use `FormContext` for shared state.

**UI Components**: Base UI React (headless) + custom styling in
[src/ui/](src/ui/). Each component has `.stories.tsx` for Storybook. Example:
[src/ui/Button/Button.tsx](src/ui/Button/Button.tsx).

## Build and Test

```bash
pnpm dev              # Run Vite + Convex dev in parallel
pnpm test             # Run unit tests (.spec.ts files)
pnpm storybook:test   # Run Storybook integration tests (Playwright)
pnpm lint             # ESLint
pnpm typecheck        # TypeScript checking
pnpm build            # Type check + production build
```

## Project Conventions

**Configuration**: Never use environment variables directly. Use
[src/lib/config.ts](src/lib/config.ts) instead.

**Generated Files** (DO NOT EDIT):

- [src/routeTree.gen.ts](src/routeTree.gen.ts) - TanStack Router generates
  automatically
- [convex/\_generated/](convex/_generated/) - Convex type generation

**Spec-Driven Development**: Use the `spec-driven-development` skill for new
features. This is the required methodology.

**Data Philosophy**: Facts are stored (completions, sessions). Streaks and
misses are derived. Charts are projections, never source of truth.
