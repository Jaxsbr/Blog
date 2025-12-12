import type { PostMetadata } from '../types/Post';

export function generateRSSFeed(posts: PostMetadata[]): string {
    const siteUrl = window.location.origin;
    const blogUrl = `${siteUrl}/Blog`;
    const rssUrl = `${blogUrl}/rss.xml`;
    const pubDate = new Date().toUTCString();

    const items = posts
        .slice(0, 20) // Limit to 20 most recent posts
        .map(post => {
            const postUrl = `${blogUrl}/post/${post.slug}`;
            const pubDate = new Date(post.date).toUTCString();
            const description = post.excerpt || '';
            const _content = description.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            const title = post.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

            return `    <item>
      <title>${title}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${description}]]></description>
    </item>`;
        })
        .join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Personal Knowledge Blog</title>
    <link>${blogUrl}</link>
    <description>Personal knowledge blog and portfolio</description>
    <language>en-us</language>
    <lastBuildDate>${pubDate}</lastBuildDate>
    <atom:link href="${rssUrl}" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;
}

export function downloadRSSFeed(posts: PostMetadata[]): void {
    const rssContent = generateRSSFeed(posts);
    const blob = new Blob([rssContent], { type: 'application/rss+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'rss.xml';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

