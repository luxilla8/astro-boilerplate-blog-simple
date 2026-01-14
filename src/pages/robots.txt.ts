import type { APIRoute } from 'astro';

export const prerender = true;

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = site?.href || 'https://example.com/';

  const content = `# Robots.txt for ${siteUrl}
# This file tells search engines and AI crawlers what they can access

# Allow all crawlers by default
User-agent: *
Allow: /
Disallow: /keystatic/
Disallow: /api/

# Explicitly allow major AI crawlers
# These crawlers power AI search and assistants

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: CCBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: Anthropic-AI
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Bingbot
Allow: /

User-agent: PerplexityBot
Allow: /

# Sitemap location
Sitemap: ${siteUrl}sitemap-index.xml

# LLM-specific discovery file
# See: https://llmstxt.org/
# Location: ${siteUrl}llms.txt
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
