import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedDate: z.coerce.date(),
    status: z.enum(['draft', 'scheduled', 'published', 'archived']).default('published'),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    category: z.string(),
    writingType: z.string().default('essay'),
    tags: z.array(z.string()).default([]),
    readMinutes: z.number().int().positive().optional(),
    access: z.string().default('public'),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    imagePosition: z.string().optional()
  }).passthrough()
});

export const collections = { blog };
