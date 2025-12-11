import { useEffect, useState } from 'react';
import { PostList } from '../components/PostList';
import { SearchBar } from '../components/SearchBar';
import { TagFilter } from '../components/TagFilter';
import { FeaturedPosts } from '../components/FeaturedPosts';
import type { PostMetadata } from '../types/Post';
import { fetchPostList } from '../utils/posts';
import { createSearchIndex, searchPosts, type SearchablePost } from '../utils/search';

export function Home() {
    const [allPosts, setAllPosts] = useState<PostMetadata[]>([]);
    const [searchIndex, setSearchIndex] = useState<SearchablePost[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<PostMetadata[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPostList()
            .then((posts) => {
                setAllPosts(posts);
                const index = createSearchIndex(posts);
                setSearchIndex(index);
                setFilteredPosts(posts);
            })
            .catch((error) => {
                console.error('Failed to load posts', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const handleSearch = (query: string) => {
        const results = searchPosts(searchIndex, query);
        setFilteredPosts(results);
    };

    if (loading) {
        return <div className="loading">Loading posts...</div>;
    }

    return (
        <div className="home-page">
            <div className="container">
                <div className="home-layout">
                    <aside className="sidebar">
                        <FeaturedPosts posts={allPosts} />
                        <TagFilter posts={allPosts} />
                    </aside>

                    <main className="main-content">
                        <div className="search-section">
                            <SearchBar onSearch={handleSearch} />
                        </div>
                        <PostList posts={filteredPosts} showExcerpt />
                    </main>
                </div>
            </div>
        </div>
    );
}

