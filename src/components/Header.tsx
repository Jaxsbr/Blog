import { Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
    return (
        <header className="site-header">
            <div className="container">
                <Link to="/" className="site-title">
                    <h1>Jacobus Brink</h1>
                </Link>
                <nav className="site-nav">
                    <Link to="/">Home</Link>
                    <a href="https://jaxsbr.github.io/" target="_blank" rel="noopener noreferrer">Arcade</a>
                    <a href="https://github.com/jaxsbr" target="_blank" rel="noopener noreferrer">GitHub</a>
                    <ThemeToggle />
                </nav>
            </div>
        </header>
    );
}

