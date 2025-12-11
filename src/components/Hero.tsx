import { Link } from 'react-router-dom';

export function Hero() {
    return (
        <div className="hero-section">
            <div className="hero-content">
                <h1 className="hero-headline">Building AI-Powered Solutions</h1>
                <p className="hero-subtitle">
                    Creating intelligent tools and scalable infrastructure that enhance developer productivity
                    and deliver exceptional user experiences.
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

