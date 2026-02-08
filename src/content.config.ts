import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/** Strip file extension from entry IDs so URLs stay clean (e.g. "hello-world" not "hello-world.mdoc") */
function stripExtension({ entry }: { entry: string }) {
  return entry.replace(/\.[^.]+$/, '');
}

const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/blog', generateId: stripExtension }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
    category: z.string(),
    tags: z.array(z.string()).optional().default([]),
    author: z.string().optional(),
    draft: z.boolean().optional().default(false),
    noindex: z.boolean().optional().default(false),
    canonicalUrl: z.string().optional(),
    ogImage: z.string().optional(),
  }),
});

const categories = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/categories', generateId: stripExtension }),
  schema: z.object({
    name: z.string(),
    description: z.string().optional(),
    color: z.enum(['blue', 'green', 'purple', 'orange', 'red', 'gray']).optional().default('blue'),
  }),
});

const tags = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/tags', generateId: stripExtension }),
  schema: z.object({
    name: z.string(),
    description: z.string().optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/pages', generateId: stripExtension }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
    isHomepage: z.boolean().optional().default(false),
    showInNav: z.boolean().optional().default(false),
    navOrder: z.number().optional().default(100),
    draft: z.boolean().optional().default(false),
    noindex: z.boolean().optional().default(false),
    canonicalUrl: z.string().optional(),
    ogImage: z.string().optional(),
  }),
});

const authors = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/authors', generateId: stripExtension }),
  schema: z.object({
    name: z.string(),
    bio: z.string().optional(),
    email: z.string().optional(),
    url: z.string().optional(),
    avatar: z.string().optional(),
    twitter: z.string().optional(),
    github: z.string().optional(),
    linkedin: z.string().optional(),
  }),
});

const siteSettings = defineCollection({
  loader: glob({ pattern: 'site-settings.yaml', base: './src/content', generateId: stripExtension }),
  schema: z.object({
    name: z.string(),
    tagline: z.string().optional(),
    description: z.string().optional(),
    url: z.string().optional(),
    logo: z.string().optional(),
    ogImage: z.string().optional(),
    authorName: z.string().optional(),
    authorEmail: z.string().optional(),
    authorUrl: z.string().optional(),
    twitter: z.string().optional(),
    github: z.string().optional(),
    linkedin: z.string().optional(),
    youtube: z.string().optional(),
    instagram: z.string().optional(),
    newsletterEnabled: z.boolean().optional().default(false),
    newsletterProvider: z.string().optional(),
    newsletterAction: z.string().optional(),
    analyticsEnabled: z.boolean().optional().default(false),
    analyticsGoogleId: z.string().optional(),
  }),
});

const navigation = defineCollection({
  loader: glob({ pattern: 'navigation.yaml', base: './src/content', generateId: stripExtension }),
  schema: z.object({
    links: z.array(z.object({
      label: z.string(),
      href: z.string(),
    })),
  }),
});

export const collections = { blog, authors, categories, tags, pages, siteSettings, navigation };
