import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const notes = await getCollection('notes', ({ data }) => data.draft !== true);

  return rss({
    title: 'Siddhanth Methil — Notes',
    description: 'Notes on machine learning research by Siddhanth Methil.',
    site: context.site,
    items: notes
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
      .map((note) => ({
        title: note.data.title,
        description: note.data.description,
        pubDate: note.data.pubDate,
        link: `/notes/${note.id}`,
      })),
  });
}
