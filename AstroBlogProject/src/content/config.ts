
import { defineCollection, z } from 'astro:content';

const projectCollection = defineCollection({
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