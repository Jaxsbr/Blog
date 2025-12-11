import { Link } from 'react-router-dom';

export function Header() {
    return (
        <header className="site-header">
            <div className="container">
                <Link to="/" className="site-title">
                    <h1>Personal Knowledge Blog</h1>
                </Link>
                <nav className="site-nav">
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                </nav>
            </div>
        </header>
    );
}

