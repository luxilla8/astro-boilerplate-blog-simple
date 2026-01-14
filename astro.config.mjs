import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com', // Replace with your production URL
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  integrations: [
    react(),
    markdoc(),
    keystatic(),
    sitemap(),
    tailwind(),
  ],
});
