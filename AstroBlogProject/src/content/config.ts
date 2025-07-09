
import { defineCollection, z } from 'astro:content';

const projectCollection = defineCollection({
  schema: ({ image }) => z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
    author: z.string(),
    image: image(),
    tags: z.array(z.string()),
  }),
});

export const collections = {
  'project': projectCollection,
};
