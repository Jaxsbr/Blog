import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import matter from 'gray-matter';
import { Buffer } from 'buffer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const postsDir = join(rootDir, 'public', 'posts');
const outputPath = join(rootDir, 'public', 'rss.xml');

// Ensure Buffer is available
if (!globalThis.Buffer) {
    (globalThis as { Buffer: typeof Buffer }).Buffer = Buffer;
}

interface PostMetadata {
    title: string;
    date: string;
    tags: string[];
    slug: string;
    excerpt?: string;
}

function createExcerpt(content: string, maxLength: number = 200): string {
    const plainText = content
        .replace(/#+\s/g, '')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/`[^`]+`/g, '')
        .replace(/\n/g, ' ')
        .trim();

    if (plainText.length <= maxLength) return plainText;
    return plainText.substring(0, maxLength).trim() + '...';
}

function normalizeTags(raw: unknown): string[] {
    if (!Array.isArray(raw)) {
        return [];
    }

    const seen = new Set<string>();
    const tags: string[] = [];

    raw.forEach((tag) => {
        if (typeof tag !== 'string') return;
        const trimmed = tag.trim();
        if (!trimmed || seen.has(trimmed)) return;
        seen.add(trimmed);
        tags.push(trimmed);
    });

    return tags;
}

function generateRSSFeed(posts: PostMetadata[]): string {
    const siteUrl = 'https://jaxsbr.github.io'; // Update with your actual domain
    const blogUrl = `${siteUrl}/Blog`;
    const rssUrl = `${blogUrl}/rss.xml`;
    const pubDate = new Date().toUTCString();

    const items = posts
        .slice(0, 20)
        .map(post => {
            const postUrl = `${blogUrl}/post/${post.slug}`;
            const pubDate = new Date(post.date).toUTCString();
            const description = post.excerpt || '';
            const title = post.title
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');

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

function main() {
    try {
        const postFiles = readdirSync(postsDir)
            .filter(file => file.endsWith('.md'))
            .map(file => {
                const filePath = join(postsDir, file);
                const content = readFileSync(filePath, 'utf-8');
                const { data, content: markdownContent } = matter(content);
                const filename = file.replace('.md', '');

                const excerpt = createExcerpt(markdownContent);

                return {
                    title: data.title || 'Untitled',
                    date: data.date || new Date().toISOString(),
                    tags: normalizeTags(data.tags),
                    slug: filename,
                    excerpt,
                };
            });

        // Sort by date (newest first)
        postFiles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        const rssContent = generateRSSFeed(postFiles);
        writeFileSync(outputPath, rssContent, 'utf-8');

        console.log(`✅ RSS feed generated: ${outputPath}`);
        console.log(`   Generated ${postFiles.length} posts`);
    } catch (error) {
        console.error('❌ Error generating RSS feed:', error);
        process.exit(1);
    }
}

main();

