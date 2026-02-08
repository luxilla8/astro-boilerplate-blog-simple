import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com', // Replace with your production URL
  adapter: vercel({
    imageService: true,
  }),
  image: {
    domains: [],        // Add allowed remote image domains here
    remotePatterns: [],  // Or use patterns like { protocol: 'https', hostname: '**.example.com' }
  },
  integrations: [
    react(),
    markdoc(),
    keystatic(),
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
