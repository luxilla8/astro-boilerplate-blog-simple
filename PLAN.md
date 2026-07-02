# PLAN.md — 2026 Modernization & Template-Readiness

Goal: make this repo the default starting point for any new Astro content site, referenceable
from any Claude Code session ("clone this boilerplate and build X"). Current state: build and
lint pass on Astro 5.16 / React 18 / Tailwind 4.1, but the stack is a major generation behind
(as of 2026-07: Astro 7.0, React 19.2, ESLint 10, TypeScript 6, @astrojs/vercel 11).

Work each phase to green (`npm run build && npm run lint`) and commit before starting the next.

## Phase 1 — Safe minor/patch updates (low risk, do first)

- [ ] `npm update` within current semver ranges: astro 5.18, @astrojs/rss, sitemap,
      @keystatic/* (5.1.0 / 0.5.50), tailwindcss + @tailwindcss/vite 4.3, typescript-eslint,
      eslint-plugin-astro 1.7.
- [ ] Verify: build, lint, `npm run dev` smoke test of `/`, `/blog`, `/keystatic`, dark mode.

## Phase 2 — Major upgrades (the "drastic update")

Order matters; each step is its own commit.

- [ ] **Ceiling (checked 2026-07-01)**: `@keystatic/astro` peer-deps allow `astro: 2–6` and
      React 18/19. So the target is **Astro 6 + React 19**, not Astro 7, until Keystatic ships
      Astro 7 support — re-check with `npm info @keystatic/astro peerDependencies` before each
      pass, and do NOT swap the CMS without user sign-off.
- [ ] React 18 → 19 (+ @types 19, @astrojs/react 6). Only the Keystatic admin uses React —
      blast radius is small.
- [ ] Astro 5 → 6 via the official migration guide (`npx @astrojs/upgrade`).
      Watch: content-layer/glob loader API changes, `@astrojs/markdoc` 2.x, `@astrojs/vercel`
      version compatible with Astro 6 (11.x targets Astro 7 — check its peer range).
- [ ] ESLint 9 → 10 (flat config already in place — mostly version bumps).
      Note: eslint was previously pinned to 9 for a Vercel peer-dep conflict — re-verify that's gone.
- [ ] TypeScript 5.9 → 6.
- [ ] Regenerate `package-lock.json`; confirm the deprecated `glob@10` transitive warning is gone.

## Phase 3 — Fix template gaps

- [ ] Add `public/og-image.png` (1200×630 placeholder) — currently referenced as the default
      OG image but missing, so social shares are broken out of the box.
- [ ] Pin Node: add `"engines": { "node": ">=24" }` to package.json + `.nvmrc` (24) —
      matches Vercel's serverless runtime and silences the build warning.
- [ ] Placeholder audit: grep `example.com`, `Your Name`, `yourdomain` — make sure every
      placeholder lives in exactly one obvious place (site-settings.yaml / astro.config.mjs)
      and is called out in CLAUDE.md step 3–4.
- [ ] Review `.env.example` — document every variable and where it's consumed.

## Phase 4 — Quality gates

- [ ] Add `astro check` (typechecking for .astro files) to scripts and CI.
- [ ] Update `.github/workflows/ci.yml`: Node 24 matrix, run build + lint + check.
- [ ] Add a minimal smoke test (build output assertions: index.html, rss.xml, sitemap,
      llms.txt exist and contain the site name). Keep it dependency-light — this is a
      template; every dependency is inherited by every future site.

## Phase 5 — Claude-readiness (the real deliverable)

- [ ] CLAUDE.md is the contract — keep its "How to use this boilerplate" section accurate
      as phases 1–4 change things.
- [ ] Dry run: in a FRESH Claude Code session, say "clone luxilla8/astro-boilerplate-blog-simple
      and use it to create a blog about <topic>" and verify Claude can go clone → rebrand →
      build green without extra guidance. Fix CLAUDE.md wherever it stumbled.
- [ ] Update README.md + CHANGELOG.md to reflect final 2026 state.
- [ ] Push to GitHub; optionally mark the repo as a "Template repository" in GitHub settings
      so "Use this template" works too.

## Deferred (nice-to-have, not blocking)

- Rename repo to match its ambition (e.g. `astro-boilerplate-2026`) — old name says "simple".
- OG image auto-generation per post (satori/vercel-og).
- Optional integrations behind feature flags: comments (giscus), analytics beyond GA.
- View Transitions / Astro server islands where they earn their keep.
