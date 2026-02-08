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
    draft: z.boolean().optional().default(false),
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
  }),
});

export const collections = { blog, categories, tags, pages };
