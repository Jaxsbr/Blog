import { Link, useParams } from 'react-router-dom';
import { getAllTags } from '../utils/posts';
import type { PostMetadata } from '../types/Post';

interface TagFilterProps {
    posts: PostMetadata[];
}

export function TagFilter({ posts }: TagFilterProps) {
    const { tag: activeTag } = useParams<{ tag: string }>();
    const tags = getAllTags(posts);

    if (tags.length === 0) {
        return null;
    }

    return (
        <div className="tag-filter">
            <h3>Filter by Tag</h3>
            <div className="tag-list">
                <Link
                    to="/"
                    className={`tag ${!activeTag ? 'active' : ''}`}
                >
                    All ({posts.length})
                </Link>
                {tags.map(({ tag, count }) => (
                    <Link
                        key={tag}
                        to={`/tag/${encodeURIComponent(tag)}`}
                        className={`tag ${activeTag === tag ? 'active' : ''}`}
                    >
                        {tag} ({count})
                    </Link>
                ))}
            </div>
        </div>
    );
}

