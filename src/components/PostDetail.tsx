import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { Post } from '../types/Post';
import { fetchPost, formatDate } from '../utils/posts';

export function PostDetail() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;

        setLoading(true);
        fetchPost(slug).then((fetchedPost) => {
            if (!fetchedPost) {
                navigate('/404');
            } else {
                setPost(fetchedPost);
            }
            setLoading(false);
        });
    }, [slug, navigate]);

    if (loading) {
        return <div className="loading">Loading post...</div>;
    }

    if (!post) {
        return <div className="error">Post not found</div>;
    }

    return (
        <article className="post-detail">
            <header className="post-header">
                <h1>{post.title}</h1>
                <div className="post-meta">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span className="reading-time">{post.readingTime} min read</span>
                </div>
                {post.tags.length > 0 && (
                    <div className="post-tags">
                        {post.tags.map((tag) => (
                            <Link
                                key={tag}
                                to={`/tag/${encodeURIComponent(tag)}`}
                                className="tag"
                            >
                                {tag}
                            </Link>
                        ))}
                    </div>
                )}
            </header>

            <div className="post-content">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        code({ className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || '');
                            const isInline = !match;

                            if (!isInline && match) {
                                return (
                                    <SyntaxHighlighter
                                        style={vscDarkPlus as { [key: string]: React.CSSProperties }}
                                        language={match[1]}
                                        PreTag="div"
                                        {...(props as React.ComponentProps<typeof SyntaxHighlighter>)}
                                    >
                                        {String(children).replace(/\n$/, '')}
                                    </SyntaxHighlighter>
                                );
                            }

                            return (
                                <code className={className} {...props}>
                                    {children}
                                </code>
                            );
                        },
                    }}
                >
                    {post.content}
                </ReactMarkdown>
            </div>

            <footer className="post-footer">
                <Link to="/" className="back-link">
                    ← Back to all posts
                </Link>
            </footer>
        </article>
    );
}

