import { useEffect, useState } from 'react';
import * as React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { Post } from '../types/Post';
import { fetchPost, fetchPostList, formatDate } from '../utils/posts';
import { CopyLinkButton } from './CopyLinkButton';
import { RelatedPosts } from './RelatedPosts';
import { LoadingSpinner } from './LoadingSpinner';
import { LazyImage } from './LazyImage';

export function PostDetail() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [post, setPost] = useState<Post | null>(null);
    const [allPosts, setAllPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;

        setLoading(true);
        Promise.all([
            fetchPost(slug),
            fetchPostList()
        ]).then(([fetchedPost, postsList]) => {
            if (!fetchedPost) {
                navigate('/404');
            } else {
                setPost(fetchedPost);
                // Convert PostMetadata[] to Post[] for RelatedPosts
                const postsWithContent = postsList.map(p => ({
                    ...p,
                    content: '',
                    excerpt: p.excerpt || '',
                    readingTime: p.readingTime || 0
                })) as Post[];
                setAllPosts(postsWithContent);
            }
            setLoading(false);
        });
    }, [slug, navigate]);

    if (loading) {
        return <LoadingSpinner message="Loading post..." />;
    }

    if (!post) {
        return <div className="error">Post not found</div>;
    }

    const postUrl = `${window.location.origin}${window.location.pathname}`;

    return (
        <article className="post-detail">
            <header className="post-header">
                <div className="post-header-top">
                    <h1>{post.title}</h1>
                    <CopyLinkButton url={postUrl} />
                </div>
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
                        p({ children, ...props }) {
                            // Check if paragraph only contains an image
                            const childrenArray = React.Children.toArray(children);
                            if (childrenArray.length === 1) {
                                const child = childrenArray[0];
                                if (React.isValidElement(child)) {
                                    // Check if it's an img element or has src prop (LazyImage)
                                    const isImage = child.type === 'img' ||
                                        (child.props && 'src' in child.props);
                                    if (isImage) {
                                        // Return image without paragraph wrapper to avoid nesting issues
                                        return <>{children}</>;
                                    }
                                }
                            }
                            return <p {...props}>{children}</p>;
                        },
                        img({ src, alt, ...props }) {
                            if (!src) return null;
                            return <LazyImage src={src} alt={alt || ''} className="post-content-image" />;
                        },
                    }}
                >
                    {post.content}
                </ReactMarkdown>
            </div>

            <footer className="post-footer">
                {post && allPosts.length > 0 && (
                    <RelatedPosts currentPost={post} allPosts={allPosts} />
                )}
                <Link to="/" className="back-link">
                    ← Back to all posts
                </Link>
            </footer>
        </article>
    );
}

