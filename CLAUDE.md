# CLAUDE.md — Astro Blog Boilerplate

## What this is

A reusable, production-ready **blog/content-site boilerplate**: Astro + Keystatic (git-based CMS)
+ Tailwind CSS v4, optimized for SEO and LLM discoverability (JSON-LD, sitemap, RSS, llms.txt,
AI-crawler-friendly robots.txt). It deploys to Vercel as static HTML with only the Keystatic
admin (`/keystatic`) running serverless.

This repo is a **template, not a product**. Its purpose: clone it, rebrand it, replace the
sample content, and ship a new site in under an hour.

## What we're doing here (current mission)

Modernizing it for 2026 and making it Claude-ready. See `PLAN.md` for the full roadmap.
Highlights: upgrade Astro 5 → 6 (Keystatic caps us below 7) / React 19 / ESLint 10 / TS 6,
fix template gaps (missing
og-image, hardcoded placeholders), and harden the "use this boilerplate" workflow below.
The build currently passes on Astro 5.16 — don't break it; upgrade incrementally.

## How to use this boilerplate for a new site

When the user says "use this boilerplate to create X":

1. Copy the repo into a fresh directory (degit-style — no `.git` history):
   `git clone --depth 1 https://github.com/luxilla8/astro-boilerplate-blog-simple <new-site> && rm -rf <new-site>/.git && git -C <new-site> init`
2. Rename in `package.json` (`name`, `description`), then `npm install`.
3. Set the production URL in `astro.config.mjs` (`site:`).
4. Rebrand: edit `src/content/site-settings.yaml` (name, tagline, description, author,
   socials) and `src/content/navigation.yaml`. `src/config/site.ts` reads these — edit the
   YAML, not the TS, unless adding new fields.
5. Restyle: swap the `--color-primary-*` scale and fonts in `src/styles/global.css` (`@theme` block).
6. Replace content: delete sample posts in `src/content/blog/`, rewrite `src/content/pages/`
   (home, about, contact, services), update `src/content/authors/default.yaml`, and adjust
   categories/tags to fit the new site's topics.
7. Replace assets: `public/favicon.svg` and add `public/og-image.png` (1200×630).
8. Verify: `npm run build && npm run lint` must pass; spot-check `/`, `/blog`, `/rss.xml`,
   `/llms.txt`, and dark mode via `npm run dev`.
9. Deploy: push to GitHub, import in Vercel (zero config).

Grep for `example.com` and `Your Name` before shipping — nothing placeholder may survive.

## Stack

- **Astro** (static output, Vercel adapter) — routing in `src/pages/`
- **Keystatic** — CMS config in `keystatic.config.ts`; content lives in `src/content/` as
  Markdoc (`.mdoc`) + YAML; schemas in `src/content.config.ts` (Astro 5 glob loaders)
- **Tailwind v4** — no config file; design tokens in `src/styles/global.css` via `@theme`
- **React** — only used by the Keystatic admin UI, not by site pages

## Map

| Path | Purpose |
|---|---|
| `src/config/site.ts` | Runtime site config, assembled from CMS singletons |
| `src/content/site-settings.yaml` | Editable brand/SEO/feature settings (source of truth) |
| `src/components/BaseHead.astro` | All meta/OG/JSON-LD head logic |
| `src/layouts/` | `BaseLayout`, `BlogPost`, `Page` |
| `src/pages/blog/` | Paginated index, post pages, category/tag archives |
| `src/pages/{rss.xml,robots.txt,llms.txt}.ts` | Feed + discovery endpoints |
| `keystatic.config.ts` | CMS collections: blog, pages, authors, categories, tags + singletons |
| `CHANGELOG.md` | Detailed log of the Feb 2026 modernization pass |

## Commands

```bash
npm run dev        # localhost:4321 (+ /keystatic admin)
npm run build      # production build (must pass before any commit)
npm run lint       # ESLint flat config
```

## Conventions

- Content-driven config: site identity comes from Keystatic singletons, never hardcode it
  in components.
- Every page must render without client-side JS (Keystatic admin is the only exception).
- Dark mode: every new component needs `dark:` variants — this has regressed before.
- New content types = update both `keystatic.config.ts` AND `src/content.config.ts`.
- Use Node 24 locally (Vercel serverless runtime); Node 25 builds warn but work.
