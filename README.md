# The Wandering Library

Swap physical books locally, and follow each book's journey through the notes its readers leave behind.

This repo is also an experiment: **you write the story, agents do the rest.**

```
Story issue ──label "ready"──▶ 1 · Build     Claude writes tests first, then code, opens a PR
                                   │
                                   ▼
                               2 · Review    a second Claude (fresh context) reviews against
                                   │         REVIEW_RULES.md; blocking issues go back to the
                                   │         builder automatically (max 3 rounds)
                                   ▼
                               3 · Test      lint · types · unit · build · Playwright (desktop +
                                   │         mobile) · migrations on a clean Postgres
                                   ▼
                          👤 You approve + merge   (the one human gate)
                                   │
                                   ▼
                               4 · Deploy    Vercel ships the app; migrations go to
                                             staging, then production
```

Stuck? Comment `@claude <instructions>` on the issue or PR.

## Where things live

| File | What it's for |
| --- | --- |
| `CLAUDE.md` | The builder agent's rulebook: product principles, stack, hard rules |
| `.github/REVIEW_RULES.md` | What the reviewer agent blocks on |
| `.github/ISSUE_TEMPLATE/story.yml` | The story form: user story, acceptance criteria, out of scope |
| `.github/workflows/` | The four pipeline stages plus `@claude` assist |
| `SETUP.md` | One-time setup checklist (about 45 minutes) |

## Local development

```bash
cp .env.example .env.local   # add your staging Supabase URL and anon key
npm install
npm run dev                  # http://localhost:3000
npm run check                # lint + typecheck + unit tests
npm run test:e2e             # Playwright
```
