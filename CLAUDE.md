@AGENTS.md

# The Wandering Library — rules for coding agents

A community website for swapping physical books. Every book carries a digital
"journey" of legacy notes left by the readers who held it.

## Product principles (non-negotiable)

- **Minimal, beautiful, obvious.** One primary action per screen. If a feature needs
  instructions to use, it's not finished. Prefer removing UI to adding it.
- **Mobile first.** Every screen must work at 375px width.
- **Accessible.** Semantic HTML, labelled inputs, keyboard reachable, WCAG AA contrast.
- **Kind to readers.** Plain, warm language. No dark patterns.

## Stack

- Next.js (App Router, TypeScript, Server Components by default) — see AGENTS.md:
  this Next.js version differs from your training data, so read the bundled docs.
- Tailwind CSS v4 for styling. No other UI libraries without a story asking for one.
- Supabase for Postgres, auth and storage. Use the helpers in `src/lib/supabase/`.
- Vitest + Testing Library for unit tests, Playwright for end-to-end tests.

## Project layout

- `src/app/` — routes. Co-locate a `*.test.tsx` next to what it tests.
- `src/components/` — shared UI components.
- `src/lib/` — non-UI code (data access, helpers).
- `e2e/` — Playwright specs, one file per story: `e2e/story-<issue>-<slug>.spec.ts`.
- `supabase/migrations/` — SQL migrations, named `YYYYMMDDHHMMSS_<slug>.sql`.

## How to implement a story

1. Read the whole issue. The acceptance criteria are the spec; do not add scope.
   If something is ambiguous, pick the simplest reasonable reading and state it in
   the PR description under "Assumptions".
2. **Tests first.** Turn each Given/When/Then into a Playwright test, and add unit
   tests for any logic in `src/lib/`.
3. Implement the smallest change that makes the tests pass.
4. Run `npm run check` (lint, typecheck, unit tests) and `npm run build`.
   Everything must pass before you open the PR.
5. Open a PR titled `Story #<n>: <title>` whose body contains `Closes #<n>`,
   a short summary, Assumptions, and a checklist mapping each acceptance criterion
   to its test.

## Hard rules

- **Database:** every schema change is a new migration file — never edit an old one.
  Every new table must `enable row level security` with explicit policies.
  Never use the service-role key in app code.
  Migrations must be backwards compatible (add, don't rename or drop), because the
  database and the app deploy separately.
- **Secrets:** never commit secrets or `.env.local`. Only `NEXT_PUBLIC_*` variables
  may be read in client code.
- **Dependencies:** don't add a package unless the story needs it; say why in the PR.
- **Scope:** don't refactor unrelated code, and don't touch `.github/` files.
- Keep PRs small. If a story is clearly too big, implement the first slice and list
  the rest under "Follow-up stories" in the PR.
