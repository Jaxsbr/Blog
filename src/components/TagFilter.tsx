import { useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getAllTags } from '../utils/posts';
import { categorizeTags, filterTagsByQuery, getTagProminence, type TagWithCount } from '../utils/tags';
import type { PostMetadata } from '../types/Post';

interface TagFilterProps {
    posts: PostMetadata[];
    selectedTags?: string[];
    onTagToggle?: (tag: string) => void;
    showCategories?: boolean;
}

export function TagFilter({ posts, selectedTags = [], onTagToggle, showCategories = true }: TagFilterProps) {
    const { tag: activeTag } = useParams<{ tag: string }>();
    const [tagSearchQuery, setTagSearchQuery] = useState('');
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

    const allTags = getAllTags(posts);
    const maxCount = allTags.length > 0 ? Math.max(...allTags.map(t => t.count)) : 0;

    const filteredTags = useMemo(() => {
        return filterTagsByQuery(allTags, tagSearchQuery);
    }, [allTags, tagSearchQuery]);

    const categorizedTags = useMemo(() => {
        if (!showCategories || tagSearchQuery.trim()) {
            return null;
        }
        return categorizeTags(filteredTags);
    }, [filteredTags, tagSearchQuery, showCategories]);

    if (allTags.length === 0) {
        return null;
    }

    const handleTagClick = (tag: string, e: React.MouseEvent) => {
        if (onTagToggle) {
            e.preventDefault();
            onTagToggle(tag);
        }
    };

    const isActive = (tag: string) => {
        if (onTagToggle) {
            return selectedTags.includes(tag);
        }
        return activeTag === tag;
    };

    const toggleCategory = (categoryName: string) => {
        setExpandedCategories(prev => {
            const next = new Set(prev);
            if (next.has(categoryName)) {
                next.delete(categoryName);
            } else {
                next.add(categoryName);
            }
            return next;
        });
    };

    const renderTag = (tagData: TagWithCount) => {
        const { tag, count } = tagData;
        const prominence = getTagProminence(count, maxCount);
        return (
            <Link
                key={tag}
                to={onTagToggle ? '#' : `/tag/${encodeURIComponent(tag)}`}
                className={`tag tag-${prominence} ${isActive(tag) ? 'active' : ''}`}
                onClick={(e) => handleTagClick(tag, e)}
            >
                {tag} ({count})
            </Link>
        );
    };

    return (
        <div className="tag-filter">
            <h3>Filter by Tag</h3>

            {allTags.length > 10 && (
                <div className="tag-search">
                    <input
                        type="text"
                        placeholder="Search tags..."
                        value={tagSearchQuery}
                        onChange={(e) => setTagSearchQuery(e.target.value)}
                        className="tag-search-input"
                    />
                </div>
            )}

            <div className="tag-list">
                {!onTagToggle && (
                    <Link
                        to="/"
                        className={`tag ${!activeTag ? 'active' : ''}`}
                    >
                        All ({posts.length})
                    </Link>
                )}

                {categorizedTags && categorizedTags.length > 0 ? (
                    categorizedTags.map((category) => {
                        const isExpanded = expandedCategories.has(category.name);
                        return (
                            <div key={category.name} className="tag-category">
                                <button
                                    className="tag-category-header"
                                    onClick={() => toggleCategory(category.name)}
                                    aria-expanded={isExpanded}
                                >
                                    <span className="tag-category-name">{category.name}</span>
                                    <span className="tag-category-count">({category.tags.length})</span>
                                    <span className="tag-category-toggle">{isExpanded ? '−' : '+'}</span>
                                </button>
                                {isExpanded && (
                                    <div className="tag-category-tags">
                                        {category.tags.map(renderTag)}
                                    </div>
                                )}
                            </div>
                        );
                    })
                ) : (
                    filteredTags.map(renderTag)
                )}
            </div>
        </div>
    );
}

