/**
 * Development-only testing utilities
 * These components help test loading states and lazy images
 * 
 * Usage: Import and use in development mode only
 */

import { useState } from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import { LazyImage } from './LazyImage';

/**
 * Test component to demonstrate loading states
 * Add this temporarily to a page to test loading spinners
 */
export function LoadingStateTest() {
    const [showLoading, setShowLoading] = useState(false);

    const simulateLoading = () => {
        setShowLoading(true);
        setTimeout(() => setShowLoading(false), 3000);
    };

    return (
        <div style={{ padding: '2rem', border: '1px solid var(--border-color)', borderRadius: '8px', margin: '2rem 0' }}>
            <h3>Loading State Test</h3>
            <button onClick={simulateLoading} style={{ marginBottom: '1rem' }}>
                Simulate Loading (3 seconds)
            </button>
            {showLoading && <LoadingSpinner message="Loading test content..." />}
        </div>
    );
}

/**
 * Test component with multiple lazy-loaded images
 * Useful for testing lazy loading behavior
 */
export function LazyImageTest() {
    const testImages = [
        'https://contenthub-static.grammarly.com/blog/wp-content/uploads/2017/11/how-to-write-a-blog-post.jpeg',
        'https://picsum.photos/800/400?random=2',
        'https://picsum.photos/800/400?random=3',
        'https://picsum.photos/800/400?random=4',
        'https://picsum.photos/800/400?random=5',
        'https://picsum.photos/800/400?random=6',
    ];

    return (
        <div style={{ padding: '2rem', border: '1px solid var(--border-color)', borderRadius: '8px', margin: '2rem 0' }}>
            <h3>Lazy Image Test</h3>
            <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>
                Scroll down to see images load as they enter the viewport.
                Open Network tab to see images loading on-demand.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                {testImages.map((src, index) => (
                    <div key={index} style={{ minHeight: '500px', padding: '1rem', background: 'var(--bg-secondary)' }}>
                        <h4>Section {index + 1}</h4>
                        <p style={{ marginBottom: '1rem' }}>Scroll to see this image load:</p>
                        <LazyImage
                            src={src}
                            alt={`Test image ${index + 1}`}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

/**
 * Console helper to monitor lazy image loading
 * Run this in browser console to see when images load
 */
export const lazyImageMonitor = `
// Paste this in browser console to monitor lazy image loading
(function() {
    const images = document.querySelectorAll('.lazy-image');
    console.log(\`Found \${images.length} lazy images\`);
    
    images.forEach((img, i) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    console.log(\`✅ Image \${i + 1} entered viewport: \${img.src}\`);
                }
            });
        }, { rootMargin: '50px' });
        
        if (img.parentElement) {
            observer.observe(img.parentElement);
        }
    });
    
    // Also listen for load events
    document.addEventListener('load', (e) => {
        if (e.target && e.target.classList && e.target.classList.contains('lazy-image')) {
            console.log(\`🖼️ Image loaded: \${e.target.src}\`);
        }
    }, true);
    
    console.log('Lazy image monitor active. Scroll to see images load.');
})();
`;

