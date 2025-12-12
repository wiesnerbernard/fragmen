import { getAllRegistryItems } from '@/lib/registry';

export async function GET() {
  const items = getAllRegistryItems();
  const baseUrl = 'https://fragmen.dev'; // Update with your actual domain

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<?xml-stylesheet href="/rss.xsl" type="text/xsl"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Fragmen - New Utilities</title>
    <link>${baseUrl}</link>
    <description>Latest TypeScript utility functions added to Fragmen</description>
    <language>en</language>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${items
      .sort((a, b) => {
        const dateA = a.since ? new Date(a.since).getTime() : 0;
        const dateB = b.since ? new Date(b.since).getTime() : 0;
        return dateB - dateA;
      })
      .slice(0, 20)
      .map(
        item => `
    <item>
      <title>${item.name}</title>
      <link>${baseUrl}/utilities/${item.slug}</link>
      <description>${item.description}</description>
      <category>${item.category}</category>
      ${item.since ? `<pubDate>${new Date(item.since).toUTCString()}</pubDate>` : ''}
      <guid>${baseUrl}/utilities/${item.slug}</guid>
    </item>`
      )
      .join('')}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate',
    },
  });
}
