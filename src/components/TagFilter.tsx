import { Link, useParams } from 'react-router-dom';
import { getAllTags } from '../utils/posts';
import type { PostMetadata } from '../types/Post';

interface TagFilterProps {
    posts: PostMetadata[];
    selectedTags?: string[];
    onTagToggle?: (tag: string) => void;
}

export function TagFilter({ posts, selectedTags = [], onTagToggle }: TagFilterProps) {
    const { tag: activeTag } = useParams<{ tag: string }>();
    const tags = getAllTags(posts);

    if (tags.length === 0) {
        return null;
    }

    const handleTagClick = (tag: string, e: React.MouseEvent) => {
        // If onTagToggle is provided, use it for toggle behavior on Home page
        if (onTagToggle) {
            e.preventDefault();
            onTagToggle(tag);
        }
        // Otherwise, let the Link handle navigation (TagPage)
    };

    const isActive = (tag: string) => {
        if (onTagToggle) {
            return selectedTags.includes(tag);
        }
        return activeTag === tag;
    };

    return (
        <div className="tag-filter">
            <h3>Filter by Tag</h3>
            <div className="tag-list">
                {!onTagToggle && (
                    <Link
                        to="/"
                        className={`tag ${!activeTag ? 'active' : ''}`}
                    >
                        All ({posts.length})
                    </Link>
                )}
                {tags.map(({ tag, count }) => (
                    <Link
                        key={tag}
                        to={onTagToggle ? '#' : `/tag/${encodeURIComponent(tag)}`}
                        className={`tag ${isActive(tag) ? 'active' : ''}`}
                        onClick={(e) => handleTagClick(tag, e)}
                    >
                        {tag} ({count})
                    </Link>
                ))}
            </div>
        </div>
    );
}

