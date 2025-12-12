import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import type { PostMetadata } from '../types/Post';
import { formatDate } from '../utils/posts';

interface RelatedPostsProps {
    currentPost: PostMetadata;
    allPosts: PostMetadata[];
    maxPosts?: number;
}

export function RelatedPosts({ currentPost, allPosts, maxPosts = 3 }: RelatedPostsProps) {
    const relatedPosts = useMemo(() => {
        // Filter out current post
        const otherPosts = allPosts.filter(post => post.slug !== currentPost.slug);

        // Calculate similarity score based on shared tags
        const postsWithScore = otherPosts.map(post => {
            const sharedTags = post.tags.filter(tag => currentPost.tags.includes(tag));
            const score = sharedTags.length;
            return { post, score, sharedTags };
        });

        // Sort by score (descending) and take top posts
        return postsWithScore
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, maxPosts)
            .map(item => item.post);
    }, [currentPost, allPosts, maxPosts]);

    if (relatedPosts.length === 0) {
        return null;
    }

    return (
        <div className="related-posts">
            <h3>Related Posts</h3>
            <div className="related-posts-list">
                {relatedPosts.map((post) => (
                    <article key={post.slug} className="related-post-item">
                        <Link to={`/post/${post.slug}`} className="related-post-link">
                            <h4 className="related-post-title">{post.title}</h4>
                        </Link>
                        <div className="related-post-meta">
                            <time dateTime={post.date}>{formatDate(post.date)}</time>
                            {post.readingTime && (
                                <span className="reading-time">{post.readingTime} min read</span>
                            )}
                        </div>
                        {post.excerpt && (
                            <p className="related-post-excerpt">{post.excerpt}</p>
                        )}
                    </article>
                ))}
            </div>
        </div>
    );
}

