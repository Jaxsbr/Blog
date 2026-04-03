import { Link } from 'react-router-dom';

export function Hero() {
    return (
        <div className="hero-section">
            <div className="hero-content">
                <h1 className="hero-headline">Engineering Systems That Compound</h1>
                <p className="hero-subtitle">
                    Writing about autonomous build workflows, MCP tooling, compound engineering,
                    and the craft of building software that makes teams more effective.
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

