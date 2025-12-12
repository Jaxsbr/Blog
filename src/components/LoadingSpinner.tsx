interface LoadingSpinnerProps {
    size?: 'small' | 'medium' | 'large';
    message?: string;
}

export function LoadingSpinner({ size = 'medium', message }: LoadingSpinnerProps) {
    const sizeClass = `spinner-${size}`;

    return (
        <div className="loading-spinner-container">
            <div className={`loading-spinner ${sizeClass}`}>
                <div className="spinner-circle"></div>
                <div className="spinner-circle"></div>
                <div className="spinner-circle"></div>
            </div>
            {message && <p className="loading-message">{message}</p>}
        </div>
    );
}

