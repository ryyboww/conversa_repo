import type { APIRoute } from 'astro';
import { publications, publicationRecordHref } from '../config/publications';
import { site } from '../config/site';

const escapeXml = (value: string) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&apos;');

export const GET: APIRoute = () => {
  const items = [...publications]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((item) => `
      <item>
        <title>${escapeXml(item.title)}</title>
        <link>${escapeXml(new URL(publicationRecordHref(item), site.url).toString())}</link>
        <guid isPermaLink="true">${escapeXml(new URL(publicationRecordHref(item), site.url).toString())}</guid>
        <pubDate>${new Date(`${item.date}T12:00:00Z`).toUTCString()}</pubDate>
        <category>${escapeXml(item.category)}</category>
        <description>${escapeXml(item.description)}</description>
      </item>`)
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>${escapeXml(site.name)} Publications</title>
        <link>${site.url}/publications/</link>
        <description>${escapeXml(site.description)}</description>
        <language>en-us</language>${items}
      </channel>
    </rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' }
  });
};
