/**
 * Site Configuration
 * Centralized configuration for branding, metadata, and site-wide settings.
 * Edit these values to customize your site.
 */

export const siteConfig = {
  // Basic Info
  name: 'Astro Blog',
  tagline: 'Thoughts, tutorials, and insights on web development',
  description: 'A modern blog built with Astro and Keystatic, optimized for SEO and AI discovery.',

  // URLs
  url: 'https://astro-boilerplate-blog-simple.vercel.app', // Your production URL (no trailing slash)

  // Branding
  logo: '/favicon.svg', // Path to logo image
  ogImage: '/og-image.png', // Default Open Graph image

  // Author/Organization
  author: {
    name: 'Your Name',
    email: 'hello@example.com',
    url: 'https://astro-boilerplate-blog-simple.vercel.app/about',
  },

  // Organization (for schema.org)
  organization: {
    name: 'Astro Blog',
    logo: '/favicon.svg',
    sameAs: [
      // Add your social profiles
      // 'https://twitter.com/yourusername',
      // 'https://github.com/yourusername',
      // 'https://linkedin.com/in/yourusername',
    ],
  },

  // Social Links (displayed in footer/header)
  social: {
    twitter: '', // @username or full URL
    github: '',
    linkedin: '',
    youtube: '',
    instagram: '',
  },

  // SEO Defaults
  seo: {
    titleTemplate: '%s | Astro Blog', // %s will be replaced with page title
    defaultTitle: 'Astro Blog',
    openGraph: {
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      cardType: 'summary_large_image',
      // site: '@yourusername', // Your Twitter username
    },
  },

  // Features
  features: {
    newsletter: {
      enabled: false,
      provider: 'mailchimp', // 'mailchimp', 'convertkit', 'buttondown', etc.
      action: '', // Form action URL
    },
    comments: {
      enabled: false,
      provider: 'giscus', // 'giscus', 'disqus', etc.
    },
    analytics: {
      enabled: false,
      googleId: '', // G-XXXXXXXXXX
    },
  },

  // Navigation
  nav: {
    links: [
      { href: '/', label: 'Home' },
      { href: '/blog', label: 'Blog' },
    ],
  },
};

export type SiteConfig = typeof siteConfig;
