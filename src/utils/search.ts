import type { PostMetadata } from '../types/Post';

export interface SearchablePost extends PostMetadata {
    searchText: string;
}

export function createSearchIndex(posts: PostMetadata[]): SearchablePost[] {
    return posts.map(post => ({
        ...post,
        searchText: `${post.title} ${post.tags.join(' ')}`.toLowerCase(),
    }));
}

export function searchPosts(
    posts: SearchablePost[],
    query: string
): SearchablePost[] {
    if (!query.trim()) return posts;

    const searchTerms = query.toLowerCase().trim().split(/\s+/);

    return posts.filter(post =>
        searchTerms.every(term => post.searchText.includes(term))
    );
}

export function filterPostsByTag(
    posts: PostMetadata[],
    tag: string
): PostMetadata[] {
    if (!tag) return posts;
    return posts.filter(post => post.tags.includes(tag));
}

