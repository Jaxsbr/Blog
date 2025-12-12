import { Link } from 'react-router-dom';

export function Hero() {
    return (
        <div className="hero-section">
            <div className="hero-content">
                <h1 className="hero-headline">Adapting to Change, Building Solutions</h1>
                <p className="hero-subtitle">
                    Full-stack engineer focused on continuous learning and pragmatic upskilling. Currently exploring AI integration
                    while maintaining expertise in modern web technologies and cloud infrastructure.
                </p>
                <div className="hero-cta">
                    <a href="#projects" className="cta-button cta-primary">
                        View Projects
                    </a>
                    <Link to="/" className="cta-button cta-secondary">
                        Latest Posts
                    </Link>
                </div>
            </div>
        </div>
    );
}

