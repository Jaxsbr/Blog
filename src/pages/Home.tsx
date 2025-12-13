import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PostList } from '../components/PostList';
import { SearchBar } from '../components/SearchBar';
import { TagFilter } from '../components/TagFilter';
import { FeaturedPosts } from '../components/FeaturedPosts';
import { ActiveFilters } from '../components/ActiveFilters';
import { Hero } from '../components/Hero';
import { FeaturedProjects } from '../components/FeaturedProjects';
import { AboutCard } from '../components/AboutCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Pagination } from '../components/Pagination';
import { featuredProjects } from '../data/projects';
import type { PostMetadata } from '../types/Post';
import { fetchPostList, paginatePosts, getTotalPages } from '../utils/posts';
import { createSearchIndex, searchPosts } from '../utils/search';

const POSTS_PER_PAGE = 10;

export function Home() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [allPosts, setAllPosts] = useState<PostMetadata[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<PostMetadata[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const postsSectionRef = useRef<HTMLDivElement>(null);
    const previousPageRef = useRef<number>(1);
    const previousFiltersRef = useRef<{ searchQuery: string; selectedTags: string[] }>({
        searchQuery: '',
        selectedTags: [],
    });

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

    const getCurrentPageFromUrl = (): number => {
        const pageParam = searchParams.get('page');
        if (pageParam) {
            const page = parseInt(pageParam, 10);
            return isNaN(page) || page < 1 ? 1 : page;
        }
        return 1;
    };

    const currentPage = getCurrentPageFromUrl();

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
            results = searched.map(({ searchText: _searchText, ...post }) => post);
        }

        setFilteredPosts(results);
        
        // Check if filters actually changed
        const filtersChanged = 
            previousFiltersRef.current.searchQuery !== searchQuery ||
            JSON.stringify(previousFiltersRef.current.selectedTags.sort()) !== JSON.stringify([...selectedTags].sort());
        
        // Update ref to track current filter state
        previousFiltersRef.current = { searchQuery, selectedTags: [...selectedTags] };
        
        // Reset to page 1 when filters change (use functional form to access current params)
        if (filtersChanged) {
            setSearchParams((prev) => {
                const params = new URLSearchParams(prev);
                if (params.get('page')) {
                    params.delete('page');
                }
                return params;
            }, { replace: true });
        }
    }, [allPosts, searchQuery, selectedTags, setSearchParams]);

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

    const handlePageChange = (page: number) => {
        if (page === 1) {
            setSearchParams({}, { replace: false });
        } else {
            setSearchParams({ page: page.toString() }, { replace: false });
        }
    };

    useEffect(() => {
        if (postsSectionRef.current && currentPage !== previousPageRef.current) {
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    if (postsSectionRef.current) {
                        const offsetTop = postsSectionRef.current.offsetTop - 100;
                        window.scrollTo({ top: Math.max(0, offsetTop), behavior: 'smooth' });
                    }
                });
            });
            previousPageRef.current = currentPage;
        }
    }, [currentPage]);

    const hasActiveFilters = searchQuery.trim() !== '' || selectedTags.length > 0;

    const totalPages = getTotalPages(filteredPosts.length, POSTS_PER_PAGE);
    const validPage = totalPages > 0 ? Math.min(Math.max(1, currentPage), totalPages) : 1;
    const paginatedPosts = paginatePosts(filteredPosts, validPage, POSTS_PER_PAGE);

    useEffect(() => {
        if (totalPages > 0 && currentPage > totalPages) {
            const correctedPage = totalPages;
            if (correctedPage === 1) {
                setSearchParams({}, { replace: true });
            } else {
                setSearchParams({ page: correctedPage.toString() }, { replace: true });
            }
        }
    }, [currentPage, totalPages, setSearchParams]);

    if (loading) {
        return <LoadingSpinner message="Loading posts..." />;
    }

    return (
        <div className="home-page">
            <Hero />
            <div className="container">
                <div className="home-layout">
                    <aside className="sidebar">
                        <AboutCard />
                        <FeaturedPosts posts={allPosts} />
                        <TagFilter
                            posts={allPosts}
                            selectedTags={selectedTags}
                            onTagToggle={handleTagToggle}
                        />
                    </aside>

                    <main className="main-content">
                        {featuredProjects.length > 0 && (
                            <div id="projects">
                                <FeaturedProjects />
                            </div>
                        )}
                        <div className="search-section" ref={postsSectionRef}>
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
                            posts={paginatedPosts}
                            showExcerpt
                            totalCount={allPosts.length}
                        />
                        {totalPages > 1 && (
                            <Pagination
                                currentPage={validPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                                totalItems={filteredPosts.length}
                                itemsPerPage={POSTS_PER_PAGE}
                            />
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}

