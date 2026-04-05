export interface PostMetadata {
    title: string;
    date: string;
    tags: string[];
    slug: string;
    featured?: boolean;
    excerpt?: string;
    readingTime?: number;
    aiGenerated?: boolean;
}

export interface Post extends PostMetadata {
    content: string;
    excerpt: string;
    readingTime: number;
}

export interface PostIndex {
    metadata: PostMetadata;
    filename: string;
}

