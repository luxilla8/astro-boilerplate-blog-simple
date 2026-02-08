# Astro + Keystatic Blog Boilerplate

A modern, SEO-optimized blog starter built with [Astro](https://astro.build) and [Keystatic](https://keystatic.com). Designed for maximum search engine visibility and AI discoverability.

## Features

- **Lightning Fast** - Zero JavaScript by default, static-first architecture
- **SEO Optimized** - Meta tags, Open Graph, JSON-LD structured data, sitemaps
- **AI Discoverable** - llms.txt, semantic HTML, explicit AI crawler permissions
- **Visual CMS** - Edit content through Keystatic's intuitive interface
- **Blog Taxonomy** - Categories and tags for organizing content
- **Responsive Design** - Mobile hamburger menu, looks great on all devices
- **RSS Feed** - Auto-generated RSS 2.0 feed at `/rss.xml`
- **Easy Deployment** - One-click deploy to Vercel

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

Your site is now running at `http://localhost:4321`

### 3. Open Keystatic Admin

Visit `http://localhost:4321/keystatic` to access the content management interface.

## Creating Content

### Blog Posts

1. Go to `/keystatic` in your browser
2. Click "Blog Posts" in the sidebar
3. Click "Create" to add a new post
4. Fill in the title, description, content, and select a category
5. Save your changes

### Categories & Tags

Categories and tags help organize your content:

- **Categories**: Broad topics (e.g., "Technology", "Tutorials")
- **Tags**: Specific topics that cross categories (e.g., "JavaScript", "SEO")

Create new categories and tags in the Keystatic admin, then assign them to your posts.

## Customization

### Site Information

All site-wide configuration lives in a single file:

**`src/config/site.ts`** — site name, description, author, social links, SEO defaults, and feature flags (newsletter, analytics, comments).

Update your production URL in `astro.config.mjs`:

```js
site: 'https://yourdomain.com',
```

### Styling

This boilerplate uses **Tailwind CSS v4**. Design tokens are defined directly in CSS:

- **`src/styles/global.css`** — brand colors, fonts, and global styles

#### Changing Colors

Edit the `@theme` block in `src/styles/global.css`:

```css
@theme {
  --color-primary-500: #your-brand-color;
  --color-primary-600: #slightly-darker;
  /* ... other shades */
}
```

## Project Structure

```
├── src/
│   ├── components/        # Reusable UI components
│   ├── config/
│   │   └── site.ts        # Site-wide configuration
│   ├── content/
│   │   ├── blog/          # Blog posts (Markdoc)
│   │   ├── categories/    # Category definitions (YAML)
│   │   ├── pages/         # Static pages (Markdoc)
│   │   └── tags/          # Tag definitions (YAML)
│   ├── content.config.ts  # Content collection schemas
│   ├── layouts/           # Page layouts
│   ├── pages/             # Route pages
│   └── styles/            # Global styles
├── public/                # Static assets
├── keystatic.config.ts    # CMS configuration
├── astro.config.mjs       # Astro configuration
└── eslint.config.js       # Linting configuration
```

## SEO Features

Every page includes:

- **Meta tags** - Title, description, keywords
- **Open Graph** - Facebook/LinkedIn sharing
- **Twitter Cards** - Twitter sharing
- **JSON-LD** - Structured data for search engines
- **Canonical URLs** - Prevent duplicate content
- **Sitemap** - Auto-generated at `/sitemap-index.xml`
- **RSS Feed** - Valid RSS 2.0 at `/rss.xml`

## AI Discovery

This site is optimized for AI systems:

- **`/llms.txt`** - Human/AI-readable site overview
- **`/robots.txt`** - Explicit permissions for AI crawlers
- **Semantic HTML** - Clear document structure
- **No JS-gated content** - All content server-rendered

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Deploy (zero configuration needed)

The Vercel adapter pre-renders all pages as static HTML served from the CDN edge. Only the Keystatic admin panel runs as a serverless function.

## Commands

| Command           | Action                                       |
|-------------------|----------------------------------------------|
| `npm run dev`     | Start development server at localhost:4321   |
| `npm run build`   | Build production site                        |
| `npm run preview` | Preview build locally before deploying       |
| `npm run lint`    | Run ESLint across the project                |
| `npm run lint:fix`| Auto-fix lint issues                         |

## Tech Stack

- [Astro 5](https://astro.build) - Static site generator
- [Keystatic](https://keystatic.com) - Git-based CMS
- [Tailwind CSS 4](https://tailwindcss.com) - Utility-first CSS
- [Markdoc](https://markdoc.dev) - Content authoring
- [ESLint](https://eslint.org) - Code linting

## License

MIT License - see [LICENSE](./LICENSE) for details.

## Need Help?

- [Astro Documentation](https://docs.astro.build)
- [Keystatic Documentation](https://keystatic.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
