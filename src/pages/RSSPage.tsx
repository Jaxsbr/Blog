import { useEffect, useState } from 'react';
import { fetchPostList } from '../utils/posts';
import { generateRSSFeed } from '../utils/rss';

export function RSSPage() {
    const [rssContent, setRssContent] = useState<string>('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPostList()
            .then((posts) => {
                const rss = generateRSSFeed(posts);
                setRssContent(rss);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Failed to generate RSS feed:', error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (rssContent && !loading) {
            // Set content type and serve RSS
            // For proper RSS feed serving, we'd need server-side rendering
            // For now, we'll just display it or trigger download
            // In production, this should be handled server-side
            // Note: RSS feed is generated at build time and served from /Blog/rss.xml
        }
    }, [rssContent, loading]);

    if (loading) {
        return <div className="loading">Generating RSS feed...</div>;
    }

    // For a static site, RSS should be generated at build time
    // This is a fallback that shows the RSS content
    return (
        <div className="container" style={{ padding: '2rem', maxWidth: '800px' }}>
            <h2>RSS Feed</h2>
            <p>For RSS feed support, please use: <a href="/Blog/rss.xml">/Blog/rss.xml</a></p>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>
                Note: RSS feed generation should be handled at build time for static sites.
            </p>
        </div>
    );
}

