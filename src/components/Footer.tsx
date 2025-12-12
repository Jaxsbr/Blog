export function Footer() {
    const rssUrl = `${window.location.origin}/Blog/rss.xml`;

    return (
        <footer className="site-footer">
            <div className="container">
                <div className="footer-content">
                    <p>© {new Date().getFullYear()} Personal Knowledge Blog. All rights reserved.</p>
                    <div className="footer-links">
                        <a href={rssUrl} className="footer-link" aria-label="RSS Feed" title="RSS Feed">
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M4 11a9 9 0 0 1 9 9" />
                                <path d="M4 4a16 16 0 0 1 16 16" />
                                <circle cx="5" cy="19" r="1" />
                            </svg>
                            RSS Feed
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

