# PLAN.md — status

**Superseded on 2026-09-15** by `docs/superpowers/plans/2026-09-15-modernize-2026.md`, which is
the task-by-task plan with exact versions, enumerated breaking changes and verification steps.

Corrections to the July 2026 roadmap that used to live here:

- Keystatic no longer caps Astro at 6. `@keystatic/astro` 6.0.0 (2026-08-18) supports Astro 5, 6 and 7.
  Target is **Astro 7**.
- TypeScript target is **5.9**, not 6 or 7: `astro check` and typescript-eslint do not support 7,
  and 6.0's default changes are not worth the churn for a template.
- Node target is **24** (floor 22.22.3 from `eslint-plugin-astro` 3).
- The July premise "build and lint pass" was wrong: lint fails on main and `astro check` had never
  been run (4 type errors). Task 0 of the new plan fixes both.
- Security headers, a smoke test and the site-standard gates were missing from the roadmap and are
  now Tasks 7 and 8.

Deferred items from the July roadmap still stand: repo rename, per-post OG image generation,
comments/analytics behind flags, view transitions where they earn their keep.
