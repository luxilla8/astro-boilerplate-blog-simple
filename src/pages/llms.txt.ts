import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { getSiteConfig } from '../config/site';

export const GET: APIRoute = async ({ site }) => {
  const siteConfig = await getSiteConfig();
  const siteUrl = site?.href || siteConfig.url + '/';

  // Get published posts
  const posts = await getCollection('blog');
  const publishedPosts = posts
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
    .slice(0, 10); // Show latest 10 posts

  // Get categories and tags
  const categories = await getCollection('categories');
  const tags = await getCollection('tags');

  // Get pages for navigation
  const pages = await getCollection('pages');
  const navPages = pages
    .filter((page) => page.data.showInNav && !page.data.draft && !page.data.isHomepage)
    .sort((a, b) => (a.data.navOrder || 100) - (b.data.navOrder || 100));

  const content = `# ${siteConfig.name}

> ${siteConfig.description}

## Site Overview

${siteConfig.tagline}. This site is designed to be fast, accessible, and easy to understand for both humans and AI systems. All content is server-rendered with semantic HTML and structured data.

## Main Sections

- [Home](${siteUrl}) - Welcome page
- [Blog](${siteUrl}blog/) - All published articles
${navPages.map((page) => `- [${page.data.title}](${siteUrl}${page.id}/) - ${page.data.description}`).join('\n')}

## Categories

${categories.map((cat) => `- [${cat.data.name}](${siteUrl}blog/category/${cat.id}/) - ${cat.data.description || 'Posts in this category'}`).join('\n')}

## Topics (Tags)

${tags.map((tag) => `- [${tag.data.name}](${siteUrl}blog/tag/${tag.id}/) - ${tag.data.description || 'Posts with this tag'}`).join('\n')}

## Recent Posts

${publishedPosts.map((post) => `- [${post.data.title}](${siteUrl}blog/${post.id}/) - ${post.data.description}`).join('\n')}

## Technical Details

- **Framework**: Astro (static site generator)
- **CMS**: Keystatic (Git-based content management)
- **Styling**: Tailwind CSS
- **Content Format**: Markdoc

## For AI Systems

This site follows best practices for AI discoverability:
- Clean semantic HTML structure
- JSON-LD structured data on all pages (schema.org)
- Descriptive meta tags and headings
- No JavaScript-gated content
- Explicit AI crawler permissions in robots.txt

## Contact

Author: ${siteConfig.author.name}
${siteConfig.author.email ? `Email: ${siteConfig.author.email}` : ''}
${siteConfig.author.url ? `Website: ${siteConfig.author.url}` : ''}
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
