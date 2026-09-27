# One-time setup (about 45 minutes, £0)

Tick these off in order. Everything uses free tiers.

## 1. GitHub repo

- [ ] Create a **public** repo called `wandering-library` (public = unlimited free Actions
      minutes and free environment approvals; private works too, within 2,000 min/month).
- [ ] Push this code:
  ```bash
  git remote add origin https://github.com/<you>/wandering-library.git
  git push -u origin main
  ```
- [ ] Settings → General → Pull Requests: tick **Automatically delete head branches**.
- [ ] Create the pipeline labels: `gh auth login` then `bash scripts/setup-labels.sh`.

## 2. Claude (the agents)

- [ ] Install the **Claude GitHub App** on this repo: <https://github.com/apps/claude>.
      Its token is what lets the agents' pushes trigger CI and review.
- [ ] In the [Claude Console](https://console.anthropic.com): create an API key, and set a
      **monthly spend limit** (start at $20).
- [ ] Repo → Settings → Secrets and variables → Actions → New repository secret:
      `ANTHROPIC_API_KEY` = your key.

## 3. Supabase (two free projects: staging + production)

- [ ] Create project `wandering-library-staging` (region: London).
- [ ] Create project `wandering-library-prod` (region: London).
- [ ] For each, note from Project Settings: **Project ref**, **database password**,
      **Project URL**, and **anon public key**.
- [ ] Create a personal access token: Account → Access Tokens.
- [ ] Repo secret: `SUPABASE_ACCESS_TOKEN` = that token.
- [ ] Repo → Settings → Environments → create **staging**:
  - variable `SUPABASE_PROJECT_REF` = staging project ref
  - secret `SUPABASE_DB_PASSWORD` = staging DB password
- [ ] Create environment **production** with the same two, using the prod values.
      Under **Required reviewers**, add yourself: prod database changes then wait for your tap.

> Free projects pause after 7 days without activity. If one pauses, un-pause it from the
> Supabase dashboard; nothing is lost.

## 4. Vercel (hosting)

- [ ] At <https://vercel.com/new>, import the repo (Hobby plan, framework auto-detected).
- [ ] Project → Settings → Environment Variables:
  - **Production**: `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` from **prod**
  - **Preview** and **Development**: the same two from **staging**
- [ ] Deploy. You should see "The Wandering Library" at your `*.vercel.app` URL.

Every PR now gets a preview link from Vercel, and every merge to `main` goes live.

## 5. Protect `main` (the human gate)

Settings → Rules → Rulesets → New branch ruleset, targeting `main`:
- [ ] Require a pull request before merging, with **1 approval**
- [ ] Require status checks to pass: `checks`, `e2e`, `migrations`
      (they appear after CI has run once, so open any PR first)
- [ ] Block force pushes

## 6. First story: prove the loop

- [ ] Issues → New → **User story**, and paste:

  **User story:** As a curious visitor, I want an About page, so that I understand how
  book swapping works before I join.

  **Acceptance criteria:**
  ```
  Scenario: Visitor opens the About page from the homepage
    Given I am on the homepage
    When I select the "How it works" link
    Then I am on /about
    And I see the heading "How it works"

  Scenario: About page explains the three steps
    Given I am on /about
    Then I see three steps: "Bring a book", "Swap it", "Leave a note"
  ```

  **Out of scope:** sign-in, images, database changes.

- [ ] Add the **ready** label, then watch the Actions tab:
      Build → PR → AI review → CI → you approve → live.

## Costs to expect

| Item | Cost |
| --- | --- |
| GitHub, Vercel Hobby, Supabase Free | £0 |
| Claude API (build + review) | roughly $0.50–3 per small story |

Upgrade later: Supabase Pro ($25/month) when real users arrive; Vercel Pro ($20/month)
only if the site becomes commercial.
