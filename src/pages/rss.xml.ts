import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { publications, publicationRecordHref } from '../config/publications';
import { site } from '../config/site';

const escapeXml = (value: string) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&apos;');

export const GET: APIRoute = async () => {
  const essays = await getCollection('blog', ({ data }) => data.status === 'published' && !data.draft && data.access === 'public');

  const publicationItems = publications.map((item) => ({
    title: item.title,
    link: new URL(publicationRecordHref(item), site.url).toString(),
    date: new Date(`${item.date}T12:00:00Z`),
    category: item.category,
    description: item.description
  }));

  const essayItems = essays.map((item) => ({
    title: item.data.title,
    link: new URL(`/blog/${item.id.replace(/\.mdx?$/i, '')}/`, site.url).toString(),
    date: item.data.publishedDate,
    category: item.data.category,
    description: item.data.description
  }));

  const items = [...publicationItems, ...essayItems]
    .sort((a, b) => b.date.valueOf() - a.date.valueOf())
    .map((item) => `
      <item>
        <title>${escapeXml(item.title)}</title>
        <link>${escapeXml(item.link)}</link>
        <guid isPermaLink="true">${escapeXml(item.link)}</guid>
        <pubDate>${item.date.toUTCString()}</pubDate>
        <category>${escapeXml(item.category)}</category>
        <description>${escapeXml(item.description)}</description>
      </item>`)
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>${escapeXml(site.name)} Publications & Essays</title>
        <link>${site.url}/publications/</link>
        <description>${escapeXml(site.description)}</description>
        <language>en-us</language>${items}
      </channel>
    </rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' }
  });
};
