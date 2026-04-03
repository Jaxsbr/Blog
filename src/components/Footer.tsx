export function Footer() {
    const rssUrl = `${window.location.origin}/Blog/rss.xml`;

    return (
        <footer className="site-footer">
            <div className="container">
                <div className="footer-content">
                    <p>© {new Date().getFullYear()} Jacobus Brink</p>
                    <div className="footer-links">
                        <a href="https://jaxsbr.github.io/" className="footer-link">Home</a>
                        <a href="https://github.com/jaxsbr" className="footer-link" target="_blank" rel="noopener noreferrer">GitHub</a>
                        <a href="https://www.linkedin.com/in/jacobrink/" className="footer-link" target="_blank" rel="noopener noreferrer">LinkedIn</a>
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
                            RSS
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

