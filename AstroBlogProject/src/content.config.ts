import { defineCollection, z } from 'astro:content';
// Add the new Astro v6 loader import
import { glob } from 'astro/loaders';

const projectCollection = defineCollection({
  // Tell Astro where the project markdown files live
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/project" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(), 
    status: z.enum(['in-progress', 'completed', 'published', 'archived']).default('completed'),
    type: z.enum(['research', 'software', 'hardware', 'experiment']).default('software'),
    stack: z.array(z.string()).optional(),
    links: z.object({
      github: z.string().url().optional(),
      demo: z.string().url().optional(),
      paper: z.string().url().optional(), 
    }).optional(),
    priority: z.number().default(99),
    image: image().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

const notesCollection = defineCollection({
  // Tell Astro where the notes markdown files live
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/notes" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  'project': projectCollection,
  'notes': notesCollection,
};