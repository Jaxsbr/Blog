import matter from 'gray-matter';
import { Buffer } from 'buffer';
import type { Post, PostMetadata } from '../types/Post';

type RawPostModuleMap = Record<string, string>;

const normalizeTags = (raw: unknown): string[] => {
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
};

const normalizeWrittenBy = (raw: unknown): 'human' | 'ai' => {
    if (typeof raw !== 'string') {
        return 'human';
    }
    const normalized = raw.trim().toLowerCase();
    if (normalized === 'ai') {
        return 'ai';
    }
    return 'human';
};

export async function fetchPostList(): Promise<PostMetadata[]> {
    try {
        if (!(globalThis as unknown as { Buffer?: typeof Buffer }).Buffer) {
            (globalThis as unknown as { Buffer: typeof Buffer }).Buffer = Buffer;
        }
        const postModules = import.meta.glob<string>('../../public/posts/*.md', {
            as: 'raw',
            eager: true,
        }) as RawPostModuleMap;

        const posts: PostMetadata[] = Object.entries(postModules).map(([path, content]) => {
            const { data, content: markdownContent } = matter(content);
            const filename = path.split('/').pop()?.replace('.md', '') || '';

            const excerpt = createExcerpt(markdownContent);
            const readingTime = calculateReadingTime(markdownContent);

            return {
                title: data.title || 'Untitled',
                date: data.date || new Date().toISOString(),
                tags: normalizeTags(data.tags),
                slug: filename,
                featured: data.featured || false,
                excerpt,
                readingTime,
                writtenBy: normalizeWrittenBy(data.writtenBy),
            };
        });

        return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } catch (error) {
        console.error('Error loading post list:', error);
        return [];
    }
}

export async function fetchPost(slug: string): Promise<Post | null> {
    try {
        const basePath = (import.meta.env?.BASE_URL ?? '/').replace(/\/?$/, '/');
        const postPath = `${basePath}posts/${encodeURIComponent(slug)}.md`;
        const response = await fetch(postPath);
        if (!response.ok) return null;

        const fileContent = await response.text();
        const { data, content } = matter(fileContent);

        const excerpt = createExcerpt(content);
        const readingTime = calculateReadingTime(content);

        return {
            title: data.title || 'Untitled',
            date: data.date || new Date().toISOString(),
            tags: normalizeTags(data.tags),
            slug,
            featured: data.featured || false,
            content,
            excerpt,
            readingTime,
            writtenBy: normalizeWrittenBy(data.writtenBy),
        };
    } catch (error) {
        console.error('Error fetching post:', error);
        return null;
    }
}

function createExcerpt(content: string, maxLength: number = 200): string {
    const plainText = content
        .replace(/#+\s/g, '') // Remove markdown headers
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Replace links with text
        .replace(/`[^`]+`/g, '') // Remove inline code
        .replace(/\n/g, ' ') // Replace newlines with spaces
        .trim();

    if (plainText.length <= maxLength) return plainText;

    return plainText.substring(0, maxLength).trim() + '...';
}

function calculateReadingTime(content: string): number {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
}

export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export function getAllTags(posts: PostMetadata[]): { tag: string; count: number }[] {
    const tagCounts = new Map<string, number>();

    posts.forEach(post => {
        post.tags.forEach(tag => {
            tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
        });
    });

    return Array.from(tagCounts.entries())
        .map(([tag, count]) => ({ tag, count }))
        .sort((a, b) => b.count - a.count);
}

export function paginatePosts<T>(posts: T[], page: number, perPage: number): T[] {
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    return posts.slice(startIndex, endIndex);
}

export function getTotalPages(totalItems: number, perPage: number): number {
    return Math.ceil(totalItems / perPage);
}

