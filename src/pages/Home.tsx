import { useEffect, useState } from 'react';
import { PostList } from '../components/PostList';
import { SearchBar } from '../components/SearchBar';
import { TagFilter } from '../components/TagFilter';
import { FeaturedPosts } from '../components/FeaturedPosts';
import { ActiveFilters } from '../components/ActiveFilters';
import type { PostMetadata } from '../types/Post';
import { fetchPostList } from '../utils/posts';
import { createSearchIndex, searchPosts } from '../utils/search';

export function Home() {
    const [allPosts, setAllPosts] = useState<PostMetadata[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<PostMetadata[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    useEffect(() => {
        fetchPostList()
            .then((posts) => {
                setAllPosts(posts);
                setFilteredPosts(posts);
            })
            .catch((error) => {
                console.error('Failed to load posts', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    // Apply filters whenever search query or tags change
    useEffect(() => {
        let results: PostMetadata[] = allPosts;

        // Apply tag filters
        if (selectedTags.length > 0) {
            results = results.filter(post =>
                selectedTags.every(tag => post.tags.includes(tag))
            );
        }

        // Apply search filter
        if (searchQuery.trim()) {
            const searchableResults = createSearchIndex(results);
            const searched = searchPosts(searchableResults, searchQuery);
            results = searched.map(({ searchText, ...post }) => post);
        }

        setFilteredPosts(results);
    }, [allPosts, searchQuery, selectedTags]);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const handleTagToggle = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag)
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        );
    };

    const handleClearFilters = () => {
        setSearchQuery('');
        setSelectedTags([]);
    };

    const handleRemoveTag = (tag: string) => {
        if (tag === '__search__') {
            setSearchQuery('');
        } else {
            handleTagToggle(tag);
        }
    };

    const hasActiveFilters = searchQuery.trim() !== '' || selectedTags.length > 0;

    if (loading) {
        return <div className="loading">Loading posts...</div>;
    }

    return (
        <div className="home-page">
            <div className="container">
                <div className="home-layout">
                    <aside className="sidebar">
                        <FeaturedPosts posts={allPosts} />
                        <TagFilter
                            posts={allPosts}
                            selectedTags={selectedTags}
                            onTagToggle={handleTagToggle}
                        />
                    </aside>

                    <main className="main-content">
                        <div className="search-section">
                            <SearchBar
                                onSearch={handleSearch}
                                query={searchQuery}
                                onClear={() => setSearchQuery('')}
                            />
                        </div>
                        {hasActiveFilters && (
                            <ActiveFilters
                                searchQuery={searchQuery}
                                selectedTags={selectedTags}
                                resultCount={filteredPosts.length}
                                totalCount={allPosts.length}
                                onRemoveTag={handleRemoveTag}
                                onClearAll={handleClearFilters}
                            />
                        )}
                        <PostList
                            posts={filteredPosts}
                            showExcerpt
                            totalCount={allPosts.length}
                        />
                    </main>
                </div>
            </div>
        </div>
    );
}

