import { Link } from 'react-router-dom';
import type { PostMetadata } from '../types/Post';
import { formatDate } from '../utils/posts';

interface PostListProps {
    posts: PostMetadata[];
    showExcerpt?: boolean;
}

export function PostList({ posts, showExcerpt = false }: PostListProps) {
    if (posts.length === 0) {
        return (
            <div className="no-posts">
                <p>No posts found.</p>
            </div>
        );
    }

    return (
        <div className="post-list">
            {posts.map((post) => (
                <article key={post.slug} className="post-item">
                    <Link to={`/post/${post.slug}`} className="post-link">
                        <h2 className="post-title">{post.title}</h2>
                    </Link>

                    <div className="post-meta">
                        <time dateTime={post.date}>{formatDate(post.date)}</time>
                        {post.tags.length > 0 && (
                            <div className="post-tags">
                                {post.tags.map((tag) => (
                                    <Link
                                        key={tag}
                                        to={`/tag/${encodeURIComponent(tag)}`}
                                        className="tag"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {tag}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </article>
            ))}
        </div>
    );
}

