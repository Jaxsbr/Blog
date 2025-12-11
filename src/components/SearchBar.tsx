import { useState } from 'react';

interface SearchBarProps {
    onSearch: (query: string) => void;
    placeholder?: string;
}

export function SearchBar({ onSearch, placeholder = 'Search posts...' }: SearchBarProps) {
    const [query, setQuery] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(query);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        onSearch(newQuery);
    };

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder={placeholder}
                className="search-input"
            />
        </form>
    );
}

