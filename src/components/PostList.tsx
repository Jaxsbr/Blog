import { Link } from 'react-router-dom';
import type { PostMetadata } from '../types/Post';
import { formatDate } from '../utils/posts';

interface PostListProps {
    posts: PostMetadata[];
    showExcerpt?: boolean;
    totalCount?: number;
}

export function PostList({ posts, showExcerpt = false, totalCount: _totalCount }: PostListProps) {
    if (posts.length === 0) {
        return (
            <div className="no-posts">
                <h3>No posts found</h3>
                <p>Try adjusting your search or filter criteria.</p>
            </div>
        );
    }

    return (
        <div className="post-list">
            {posts.map((post) => {
                const visibleTags = showExcerpt ? post.tags.slice(0, 4) : post.tags;
                const remainingTags = showExcerpt && post.tags.length > 4 ? post.tags.length - 4 : 0;
                const writtenByClass = post.writtenBy === 'ai' ? 'post-item--ai' : 'post-item--human';
                const writtenByIcon = post.writtenBy === 'ai' ? '🤖 AI' : '✍️ Human';

                return (
                    <article key={post.slug} className={`post-item ${writtenByClass}`}>
                        <Link to={`/post/${post.slug}`} className="post-link">
                            <h2 className="post-title">{post.title}</h2>
                        </Link>

                        {showExcerpt && post.excerpt && (
                            <p className="post-excerpt">{post.excerpt}</p>
                        )}

                        <div className="post-meta">
                            <time dateTime={post.date}>{formatDate(post.date)}</time>
                            {post.readingTime && (
                                <span className="reading-time">{post.readingTime} min read</span>
                            )}
                            <span className="written-by-icon">{writtenByIcon}</span>
                            {post.tags.length > 0 && (
                                <div className="post-tags">
                                    {visibleTags.map((tag) => (
                                        <Link
                                            key={tag}
                                            to={`/tag/${encodeURIComponent(tag)}`}
                                            className="tag"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {tag}
                                        </Link>
                                    ))}
                                    {remainingTags > 0 && (
                                        <span className="tag-more">+{remainingTags} more</span>
                                    )}
                                </div>
                            )}
                        </div>

                        {showExcerpt && (
                            <Link to={`/post/${post.slug}`} className="read-more-link">
                                Read more →
                            </Link>
                        )}
                    </article>
                );
            })}
        </div>
    );
}

