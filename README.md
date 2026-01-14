# Astro + Keystatic Blog Boilerplate

A modern, SEO-optimized blog starter built with [Astro](https://astro.build) and [Keystatic](https://keystatic.com). Designed for maximum search engine visibility and AI discoverability.

## Features

- **Lightning Fast** - Zero JavaScript by default, static-first architecture
- **SEO Optimized** - Meta tags, Open Graph, JSON-LD structured data, sitemaps
- **AI Discoverable** - llms.txt, semantic HTML, explicit AI crawler permissions
- **Visual CMS** - Edit content through Keystatic's intuitive interface
- **Blog Taxonomy** - Categories and tags for organizing content
- **Responsive Design** - Looks great on all devices
- **Easy Deployment** - One-click deploy to Vercel, Netlify, or Cloudflare

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

Update these files to customize your site:

1. **`astro.config.mjs`** - Set your production URL:
   ```js
   site: 'https://yourdomain.com',
   ```

2. **`src/components/Header.astro`** - Change the site name:
   ```js
   const siteName = 'Your Site Name';
   ```

3. **`src/components/Footer.astro`** - Update footer content

4. **`src/components/BaseHead.astro`** - Customize SEO defaults

5. **`keystatic.config.ts`** - Change the CMS brand name

### Styling

This boilerplate uses Tailwind CSS. Customize your design:

- **`tailwind.config.mjs`** - Colors, fonts, and theme
- **`src/styles/global.css`** - Global styles and utilities

### Colors

The default primary color is sky blue. Change it in `tailwind.config.mjs`:

```js
colors: {
  primary: {
    500: '#your-brand-color',
    // ... other shades
  },
}
```

## Project Structure

```
├── src/
│   ├── components/        # Reusable UI components
│   ├── content/
│   │   ├── blog/          # Blog posts (Markdoc)
│   │   ├── categories/    # Category definitions (YAML)
│   │   └── tags/          # Tag definitions (YAML)
│   ├── layouts/           # Page layouts
│   ├── pages/             # Route pages
│   └── styles/            # Global styles
├── public/                # Static assets
├── keystatic.config.ts    # CMS configuration
└── astro.config.mjs       # Astro configuration
```

## SEO Features

Every page includes:

- **Meta tags** - Title, description, keywords
- **Open Graph** - Facebook/LinkedIn sharing
- **Twitter Cards** - Twitter sharing
- **JSON-LD** - Structured data for search engines
- **Canonical URLs** - Prevent duplicate content
- **Sitemap** - Auto-generated at `/sitemap-index.xml`

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

### Netlify

1. Push your code to GitHub
2. Import in [Netlify](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `dist`

### Manual Build

```bash
npm run build
npm run preview  # Test the build locally
```

The built site will be in the `dist/` folder.

## Commands

| Command           | Action                                       |
|-------------------|----------------------------------------------|
| `npm run dev`     | Start development server at localhost:4321   |
| `npm run build`   | Build production site to `./dist/`           |
| `npm run preview` | Preview build locally before deploying       |

## Tech Stack

- [Astro](https://astro.build) - Static site generator
- [Keystatic](https://keystatic.com) - Git-based CMS
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS
- [Markdoc](https://markdoc.dev) - Content authoring

## License

MIT License - feel free to use this for any project.

## Need Help?

- [Astro Documentation](https://docs.astro.build)
- [Keystatic Documentation](https://keystatic.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
