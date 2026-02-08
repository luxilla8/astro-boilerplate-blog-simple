# Changelog

All notable changes to `astro-boilerplate-blog-simple` are documented in this file.

## [Unreleased] - 2026-02-08

### Priority 1: Fix broken things

These changes address critical issues that would prevent someone from successfully
deploying or trusting the boilerplate.

---

#### 1. Replaced `@astrojs/node` adapter with `@astrojs/vercel`

**Files changed:**
- `astro.config.mjs` — swapped `node` import/adapter for `vercel`
- `package.json` — removed `@astrojs/node`, added `@astrojs/vercel`
- `vercel.json` — simplified to `{ "framework": "astro" }` only

**Why:** The boilerplate claims to be "static-first" and recommends Vercel as the
deployment target, but it was configured with `@astrojs/node` in standalone mode.
This meant the production deployment would spin up a full Node.js server for every
request — the opposite of static. The Vercel adapter is the correct choice because
it understands Vercel's build output API, automatically routes static assets to the
CDN edge, and only creates serverless functions for routes that genuinely need
server-side rendering (like the Keystatic admin UI).

The `vercel.json` was also overspecified. It included `installCommand`,
`buildCommand`, and `outputDirectory` fields that are unnecessary when the Vercel
adapter is handling the build output. Vercel auto-detects Astro projects and the
adapter writes directly to `.vercel/output/`. The extra fields created a risk of
the manual config conflicting with the adapter's output structure.

---

#### 2. Changed output mode from `'server'` to static (Astro 5 default)

**Files changed:**
- `astro.config.mjs` — removed `output: 'server'`
- `src/pages/index.astro` — removed `export const prerender = true`
- `src/pages/[...slug].astro` — removed `export const prerender = true`
- `src/pages/blog/index.astro` — removed `export const prerender = true`
- `src/pages/blog/[...slug].astro` — removed `export const prerender = true`
- `src/pages/blog/category/[category].astro` — removed `export const prerender = true`
- `src/pages/blog/tag/[tag].astro` — removed `export const prerender = true`
- `src/pages/llms.txt.ts` — removed `export const prerender = true`
- `src/pages/robots.txt.ts` — removed `export const prerender = true`

**Why:** The previous configuration set `output: 'server'` globally, then every
single page file individually opted back into static rendering with
`export const prerender = true`. This is backwards. A blog is fundamentally a
static site — the content doesn't change between requests.

In Astro 5, the default output mode is `'static'`, which means all pages are
pre-rendered at build time unless they explicitly opt out with
`export const prerender = false`. By removing the `output: 'server'` directive
and letting Astro use its default, every page is statically generated automatically.
The per-page `prerender = true` lines become redundant and were removed.

The only route that needs server-side rendering is the Keystatic admin UI at
`/keystatic`, which the `keystatic()` integration handles internally — it
automatically marks its own routes as `prerender = false`.

**Result:** The build now produces static HTML files served from Vercel's CDN edge
(fast, cacheable, zero cold starts) with a single serverless function only for the
Keystatic CMS admin panel. This is exactly what "static-first" means.

---

#### 3. Added RSS feed endpoint (`/rss.xml`)

**Files changed:**
- `package.json` — added `@astrojs/rss` dependency
- `src/pages/rss.xml.ts` — new file

**Why:** The `BaseHead.astro` component already included a `<link>` tag pointing
to `/rss.xml`:

```html
<link rel="alternate" type="application/rss+xml" title="..." href="/rss.xml" />
```

But no `/rss.xml` route existed. This is a broken contract — RSS readers and search
engines that discover the link in the HTML `<head>` would get a 404. Worse, Google
Search Console would flag it as a crawl error.

The new endpoint uses Astro's official `@astrojs/rss` package, which generates a
valid RSS 2.0 XML feed. It:
- Reads all blog posts from the content collection
- Filters out drafts
- Sorts by publication date (newest first)
- Includes title, description, publication date, and permalink for each post
- Uses `siteConfig` for the feed title and description (consistent with the rest
  of the site)

The feed is pre-rendered at build time as a static `.xml` file — no serverless
function needed.

---

#### 4. Removed broken `SearchAction` from JSON-LD structured data

**Files changed:**
- `src/components/BaseHead.astro` — removed `potentialAction` block from WebSite schema

**Why:** The WebSite schema included a `SearchAction` that told search engines
the site has a search feature at `/search?q={query}`:

```json
{
  "potentialAction": {
    "type": "SearchAction",
    "target": {
      "type": "EntryPoint",
      "urlTemplate": "https://example.com/search?q={search_term_string}"
    }
  }
}
```

No `/search` page exists in this boilerplate. This structured data actively
misleads search engines — Google may attempt to display a sitelinks search box
in search results that would lead users to a 404. Google Search Console would
also flag this as a structured data error during validation.

The `SearchAction` was removed entirely. If a search feature is added in the
future, the structured data should be re-added at that time to match the actual
implementation.

---

#### 5. Added MIT LICENSE file

**Files added:**
- `LICENSE` — MIT license text

**Why:** The README states "MIT License" in its license section, but no `LICENSE`
file existed in the repository. This matters for two reasons:

1. **Legal clarity.** Without an actual license file, the code is technically
   "all rights reserved" regardless of what the README says. Open source
   contributors and users need the full license text to understand their rights.

2. **GitHub recognition.** GitHub parses the `LICENSE` file to display the license
   badge on the repository page and in search results. Without the file, the repo
   appears as "No license" which discourages adoption.

---

---

### Priority 2: Modernize for Astro 5

These changes bring the boilerplate in line with current Astro 5 conventions and
reduce code duplication.

---

#### 6. Migrated content config to Astro 5 format with `glob()` loaders

**Files changed:**
- `src/content/config.ts` — deleted (legacy Astro 4 location)
- `src/content.config.ts` — new file (Astro 5 location)
- 7 files across `src/pages/` and `src/components/` — removed `.replace(/\.mdoc$/, '')` calls

**Why:** Astro 4 kept the content config at `src/content/config.ts` using
`type: 'content'` and `type: 'data'` collection definitions. Astro 5 introduced
the Content Layer API with `glob()` loaders and moved the config to
`src/content.config.ts`.

The old approach relied on magic: Astro inferred file types and loading behavior
from the `type` field. The new `glob()` loader is explicit — you specify the file
pattern and base directory. This makes it immediately clear what files each
collection reads from and how IDs are generated.

Key details:
- Each collection now uses `glob({ pattern, base, generateId })` with explicit
  file patterns (`**/*.mdoc` for content, `**/*.yaml` for data)
- A shared `generateId` function strips file extensions from entry IDs, ensuring
  clean URLs (`/blog/hello-world` instead of `/blog/hello-world.mdoc`)
- All 9 occurrences of `.replace(/\.mdoc$/, '')` across pages and components were
  removed since IDs no longer carry file extensions
- Content files remain in `src/content/` — only the config moved

---

#### 7. Upgraded from Tailwind CSS v3 to v4 with `@tailwindcss/vite`

**Files changed:**
- `package.json` — removed `@astrojs/tailwind`, `tailwindcss` v3, `@tailwindcss/typography` v0.5; added `tailwindcss` v4, `@tailwindcss/vite`, `@tailwindcss/typography` v0.5 (as plugin)
- `astro.config.mjs` — replaced `tailwind()` integration with `tailwindcss()` vite plugin
- `tailwind.config.mjs` — deleted entirely
- `src/styles/global.css` — rewritten with v4 syntax
- `src/layouts/BlogPost.astro` — replaced `theme()` function calls with CSS `var()` references

**Why:** Tailwind CSS v4 is a ground-up rewrite that moves configuration from
JavaScript to CSS. The old stack used three separate pieces:

1. `@astrojs/tailwind` — an Astro integration that wired up Tailwind via PostCSS
2. `tailwind.config.mjs` — JavaScript config defining colors, fonts, plugins
3. `@tailwind base/components/utilities` directives in CSS

The new stack is simpler:

1. `@tailwindcss/vite` — a single Vite plugin (no Astro-specific wrapper needed)
2. `@theme {}` block in CSS — design tokens defined alongside the styles they affect
3. `@import "tailwindcss"` — one import replaces three directives

Benefits for boilerplate users:
- **One fewer config file.** No `tailwind.config.mjs` to understand or maintain.
  Brand colors and fonts are defined right in `global.css` where you can see them.
- **Faster builds.** Tailwind v4's Rust-based engine (Oxide) is significantly faster
  than v3's JavaScript PostCSS pipeline.
- **Native CSS.** The `@theme` block generates real CSS custom properties
  (`--color-primary-600`), so you can use `var(--color-primary-600)` anywhere in
  your CSS without Tailwind's `theme()` function.
- **Future-proof.** Tailwind v3 is in maintenance mode. v4 is where all new
  features land.

The `@tailwindcss/typography` plugin is loaded via `@plugin` directive in CSS
(v4's replacement for the `plugins` array in the JS config).

The `BlogPost.astro` component's `<style>` block used `theme('colors.primary.600')`
which doesn't exist in v4. This was replaced with `var(--color-primary-600)` — the
CSS custom property that the `@theme` block generates. The duplicate `scroll-behavior: smooth`
rule was also removed since it's already in `global.css`.

---

#### 8. Extracted duplicated SVG icons into reusable `Icon.astro` component

**Files added:**
- `src/components/Icon.astro` — 14 named icons in a single component

**Files changed:**
- `src/components/Footer.astro` — replaced 6 inline SVGs with `<Icon>` calls
- `src/components/SharePost.astro` — replaced 4 inline SVGs with `<Icon>` calls
- `src/components/BlogCard.astro` — replaced 1 inline SVG with `<Icon>` call
- `src/components/NewsletterBox.astro` — replaced 1 inline SVG with `<Icon>` call
- `src/layouts/BlogPost.astro` — replaced 1 inline SVG with `<Icon>` call
- `src/pages/index.astro` — replaced 4 inline SVGs with `<Icon>` calls
- `src/pages/blog/index.astro` — replaced 2 inline SVGs with `<Icon>` calls

**Why:** The same SVG path data was copy-pasted across multiple files:
- The right-arrow icon appeared **4 times** in 4 different files
- Twitter and LinkedIn icons appeared **twice each** (Footer + SharePost)
- 5 social media icons were defined as full `<svg>` blocks with ~3-5 lines each

This created several problems:
1. **Maintenance burden.** If you wanted to change an icon (e.g., updating the
   Twitter/X logo), you'd have to find and update it in every file.
2. **Template bloat.** The Footer alone had ~30 lines of SVG path data that made
   the component harder to read.
3. **Inconsistency risk.** Copy-pasted SVGs can drift — different `viewBox` values,
   different `class` names, different `fill`/`stroke` attributes.

The `Icon.astro` component centralizes all 14 icons into a single lookup table.
Usage is `<Icon name="twitter" />` with an optional `class` prop for sizing.
One SVG reference in the `SharePost.astro` client-side `<script>` block remains
inline because Astro components can't be used in runtime JavaScript.

---

---

---

### Priority 3: Developer experience parity

These changes bring the boilerplate's developer tooling and usability up to the
standard expected of a modern starter template.

---

#### 9. Added ESLint with flat config

**Files added:**
- `eslint.config.js` — ESLint flat config with Astro plugin

**Files changed:**
- `package.json` — added `eslint`, `eslint-plugin-astro`, `@typescript-eslint/parser`
  as devDependencies; added `lint` and `lint:fix` scripts

**Why:** A boilerplate should come with code quality tooling out of the box so
that contributors and users don't have to configure it themselves. ESLint catches
common mistakes (unused variables, duplicate imports, Astro-specific issues) before
they reach production.

The config uses ESLint's flat config format (the `eslint.config.js` convention
introduced in ESLint 9+), which is the new default and the only format that will
be supported going forward. The `eslint-plugin-astro` plugin adds rules that
understand `.astro` file syntax — things like ensuring valid client directives and
proper component structure.

The project passes lint with zero errors immediately after setup.

---

#### 10. Added GitHub Actions CI workflow

**Files added:**
- `.github/workflows/ci.yml` — CI pipeline

**Why:** Without CI, there's no automated way to verify that a pull request
doesn't break the build. This is the single most impactful DX addition for any
open-source project — it gives contributors confidence that their changes work
and gives maintainers confidence that merging is safe.

The workflow runs on every push to `main` and on every pull request targeting
`main`. It executes three checks in sequence:

1. **Lint** (`npm run lint`) — catches code quality issues
2. **Type check** (`npx astro check`) — verifies TypeScript types are correct
3. **Build** (`npm run build`) — confirms the site compiles without errors

It uses Node.js 20 (the current LTS) and `npm ci` for reproducible installs.
The workflow is intentionally simple — no caching tricks, no matrix builds, no
deployment steps. A boilerplate CI should demonstrate the minimum viable pipeline
that users can extend, not overwhelm with complexity.

---

#### 11. Added mobile hamburger menu to Header

**Files changed:**
- `src/components/Header.astro` — added responsive mobile menu

**Why:** The previous header rendered all navigation links in a horizontal `<ul>`
at every viewport width. On mobile screens (under 768px), this either overflowed
the screen or compressed the links into an unreadable row.

The updated header has two states:

1. **Desktop (md and above):** Links display horizontally as before — no visual
   change for existing users.
2. **Mobile (below md):** Links are hidden behind a hamburger button (☰). Tapping
   the button reveals a vertical dropdown menu below the header bar. Tapping again
   (or the ✕ icon) closes it.

Implementation details:
- The hamburger button uses `aria-expanded`, `aria-controls`, and `sr-only` label
  for screen reader accessibility.
- The menu toggles via a small inline `<script>` that swaps CSS `hidden`/`block`
  classes — no framework, no state library, no JavaScript bundle impact.
- The hamburger and close icons are inline SVGs (not `<Icon>` calls) because this
  is runtime JavaScript that can't use Astro components.
- The active page highlight works identically in both mobile and desktop views.

---

#### 12. Rewrote README to match actual project state

**Files changed:**
- `README.md` — full rewrite

**Why:** The README had drifted significantly from reality after the Priority 1
and Priority 2 changes. Specific inaccuracies that were fixed:

1. **Claimed site name was set in `Header.astro`** — it's actually in
   `src/config/site.ts`. The README told users to find `const siteName` in
   Header.astro, which doesn't exist.

2. **Referenced `tailwind.config.mjs` for colors** — this file was deleted in
   the Tailwind v4 upgrade. Colors are now in the `@theme` block in
   `src/styles/global.css`. The README showed JavaScript config syntax that
   doesn't apply anymore.

3. **Listed Netlify and Cloudflare deployment** — the project now uses
   `@astrojs/vercel` exclusively. Deploying to Netlify or Cloudflare would
   require swapping the adapter. Listing them as "one-click" options was
   misleading.

4. **Missing from project structure** — `src/config/`, `src/content/pages/`,
   `src/content.config.ts`, and `eslint.config.js` were not shown.

5. **Missing features** — RSS feed, mobile menu, lint commands, and the
   LICENSE file link were not mentioned.

6. **Build output directory** — listed `dist/` but the Vercel adapter writes
   to `.vercel/output/`. The "Manual Build" section was removed since it
   doesn't apply with the Vercel adapter.

The rewrite points users to the single `src/config/site.ts` file for all
customization, shows the correct Tailwind v4 CSS syntax for color changes,
documents the `lint` and `lint:fix` commands, and accurately describes the
Vercel-only deployment path.

---

---

---

### Priority 4: Differentiation features

These features go beyond fixing and modernizing — they add capabilities that make
this boilerplate genuinely more useful than starting from scratch.

---

#### 13. Added client-side blog search

**Files changed:**
- `src/pages/blog/index.astro` — added search input and filtering script

**Why:** A blog with more than a handful of posts needs a way to find content.
The category filter already existed, but it only works for broad topics. Search
lets users find posts by specific keywords in titles or descriptions.

The implementation is deliberately simple:

1. A search input sits in the sticky filter bar alongside the category pills.
   It has a magnifying glass icon and a divider separating it from the categories.
2. Each post (both the featured section and the grid cards) has `data-search-*`
   attributes containing the post's title and description.
3. A small `<script>` listens for `input` events and toggles `display: none` on
   posts that don't match the query. Case-insensitive substring matching.
4. When no posts match, a "No posts match your search" message appears.

This is a client-side filter, not a full-text search engine. It works because
all posts are already rendered in the HTML (static site) — no API calls, no
search index, no JavaScript framework. It handles dozens of posts well. For
hundreds of posts, you'd want something like Pagefind or Fuse.js, but that's
beyond what a boilerplate should ship.

---

#### 14. Added image performance attributes

**Files changed:**
- `src/components/BlogCard.astro` — added `decoding="async"` to lazy-loaded images
- `src/layouts/BlogPost.astro` — added `fetchpriority="high"` and `decoding="async"`
  to the hero image (LCP element)
- `src/pages/blog/index.astro` — added `loading="eager"`, `fetchpriority="high"`,
  and `decoding="async"` to the featured post image
- `astro.config.mjs` — enabled Vercel image optimization service

**Why:** The existing `<img>` tags were missing performance hints that browsers use
to prioritize loading. These attributes cost nothing to add but meaningfully
improve Core Web Vitals:

- **`fetchpriority="high"`** on hero images (the LCP candidate) tells the browser
  to prioritize downloading this image over others. Without it, the browser treats
  all images equally and may delay the hero image in favor of an off-screen image.
- **`decoding="async"`** tells the browser it doesn't need to block rendering while
  decoding the image. This prevents the main thread from stalling on large images.
- **`loading="eager"`** on above-the-fold images prevents the browser from lazy-loading
  them (which would delay LCP).

The Vercel image optimization service (`imageService: true` in the adapter config)
enables Astro's `<Image />` component to use Vercel's CDN-based image optimizer.
When users add images through the CMS, they can use `<Image />` for automatic
format conversion (WebP/AVIF), responsive sizing, and CDN caching — no local
image processing toolchain needed.

The `domains` and `remotePatterns` arrays in the `image` config are empty by
default. Users should add their image CDN domains there when they start using
remote images.

---

#### 15. Added dark mode toggle

**Files changed:**
- `src/styles/global.css` — added `@custom-variant dark` for class-based toggling,
  added dark mode prose overrides
- `src/layouts/BaseLayout.astro` — added dark mode initialization script in `<head>`,
  added `dark:` classes to `<body>`
- `src/components/Header.astro` — added dark mode toggle button with sun/moon icons,
  added `dark:` classes to all header elements
- `src/components/Icon.astro` — added `sun` and `moon` icons
- `src/components/BlogCard.astro` — added `dark:` classes for card background,
  borders, and text
- `src/pages/blog/index.astro` — added `dark:` classes to filter bar, search input,
  headings, and descriptions
- `src/pages/index.astro` — added `dark:` classes to feature cards, CTA section,
  headings, and text
- `src/layouts/BlogPost.astro` — added `dark:` classes to borders, text, and
  content dividers

**Why:** Dark mode is expected in 2026. Users of this boilerplate will want it,
and adding it after the fact is tedious because it touches every component.
Shipping it from day one means users start with a fully themed foundation.

The implementation follows the standard pattern for Astro + Tailwind:

1. **Class-based toggling.** The `@custom-variant dark` directive in CSS tells
   Tailwind to activate `dark:` utilities when `.dark` is present on an ancestor
   element (instead of the default `prefers-color-scheme` media query). This gives
   users explicit control via the toggle button.

2. **Flash prevention.** An inline `<script>` in `<head>` (before any rendering)
   checks `localStorage` for a saved preference, falling back to
   `prefers-color-scheme` if none exists. If dark mode should be active, it adds
   the `.dark` class to `<html>` immediately — before the browser paints. This
   prevents the "flash of light theme" that plagues naive dark mode implementations.

3. **Three-state logic.** The system respects the user's OS preference by default
   (via `prefers-color-scheme`). Once the user clicks the toggle, their explicit
   choice is saved to `localStorage` and takes priority over the OS setting.

4. **Prose typography.** Dark mode prose content gets its own set of CSS custom
   properties for body text, headings, links, code blocks, borders, and quotes.
   This ensures Markdoc-rendered blog content is readable in dark mode.

5. **Footer unchanged.** The footer was already designed with a dark background
   (`bg-gray-900`), so it looks correct in both modes without changes.

---

### Build verification

After all Priority 1–4 changes, the build completes successfully:

- Zero errors, zero content warnings, zero lint errors
- 20 static HTML pages pre-rendered (15 pages + 2 categories + 3 tags)
- `rss.xml`, `llms.txt`, `robots.txt`, `sitemap-index.xml` as static files
- Single serverless function (`_render.func`) for Keystatic admin only
- Clean URLs without `.mdoc` extensions
- All output written to `.vercel/output/static/` for CDN edge delivery
- ESLint passes with zero violations
- Mobile hamburger menu functional on viewports below 768px
- Dark mode toggle works with localStorage persistence and OS preference fallback
- Client-side search filters posts by title and description in real time
- Hero images use `fetchpriority="high"` for LCP optimization
