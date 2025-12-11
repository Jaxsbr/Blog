import { Link } from 'react-router-dom';
import type { PostMetadata } from '../types/Post';
import { formatDate } from '../utils/posts';

interface FeaturedPostsProps {
    posts: PostMetadata[];
    maxPosts?: number;
}

export function FeaturedPosts({ posts, maxPosts = 5 }: FeaturedPostsProps) {
    const recentPosts = posts.slice(0, maxPosts);

    if (recentPosts.length === 0) {
        return null;
    }

    return (
        <div className="featured-posts">
            <h3>Recent Posts</h3>
            <ul className="featured-list">
                {recentPosts.map((post) => (
                    <li key={post.slug}>
                        <Link to={`/post/${post.slug}`}>
                            <span className="featured-title">{post.title}</span>
                            <time className="featured-date">{formatDate(post.date)}</time>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

