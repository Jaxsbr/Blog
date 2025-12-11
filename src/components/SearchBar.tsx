import { useState, useEffect } from 'react';

interface SearchBarProps {
    onSearch: (query: string) => void;
    query?: string;
    onClear?: () => void;
    placeholder?: string;
}

export function SearchBar({
    onSearch,
    query: controlledQuery,
    onClear,
    placeholder = 'Search posts...'
}: SearchBarProps) {
    const [internalQuery, setInternalQuery] = useState('');
    const query = controlledQuery !== undefined ? controlledQuery : internalQuery;

    useEffect(() => {
        if (controlledQuery !== undefined) {
            setInternalQuery(controlledQuery);
        }
    }, [controlledQuery]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(query);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value;
        if (controlledQuery === undefined) {
            setInternalQuery(newQuery);
        }
        onSearch(newQuery);
    };

    const handleClear = () => {
        if (controlledQuery === undefined) {
            setInternalQuery('');
        }
        onSearch('');
        onClear?.();
    };

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <div className="search-input-wrapper">
                <input
                    type="text"
                    value={query}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="search-input"
                />
                {query && (
                    <button
                        type="button"
                        className="search-clear"
                        onClick={handleClear}
                        aria-label="Clear search"
                    >
                        ×
                    </button>
                )}
            </div>
        </form>
    );
}

