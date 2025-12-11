import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PostList } from '../components/PostList';
import { TagFilter } from '../components/TagFilter';
import type { PostMetadata } from '../types/Post';
import { fetchPostList } from '../utils/posts';
import { filterPostsByTag } from '../utils/search';

export function TagPage() {
    const { tag } = useParams<{ tag: string }>();
    const [allPosts, setAllPosts] = useState<PostMetadata[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<PostMetadata[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPostList()
            .then((posts) => {
                setAllPosts(posts);
                if (tag) {
                    const filtered = filterPostsByTag(posts, decodeURIComponent(tag));
                    setFilteredPosts(filtered);
                } else {
                    setFilteredPosts(posts);
                }
            })
            .catch((error) => {
                console.error('Failed to load posts', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [tag]);

    if (loading) {
        return <div className="loading">Loading posts...</div>;
    }

    return (
        <div className="tag-page">
            <div className="container">
                <div className="page-header">
                    <Link to="/" className="back-link">
                        ← All Posts
                    </Link>
                    <h2>
                        Posts tagged with: <span className="tag-name">{tag}</span>
                    </h2>
                    <p className="post-count">{filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''}</p>
                </div>

                <div className="home-layout">
                    <aside className="sidebar">
                        <TagFilter posts={allPosts} />
                    </aside>
                    <main className="main-content">
                        <PostList posts={filteredPosts} />
                    </main>
                </div>
            </div>
        </div>
    );
}

