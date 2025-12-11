import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { TagPage } from './pages/TagPage';
import { PostDetail } from './components/PostDetail';
import './App.css';

function App() {
    return (
        <Router basename="/Blog">
            <div className="app">
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/tag/:tag" element={<TagPage />} />
                    <Route path="/post/:slug" element={<PostDetail />} />
                    <Route path="*" element={<div className="container"><h2>404 - Page Not Found</h2></div>} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;

