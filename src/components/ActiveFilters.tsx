interface ActiveFiltersProps {
    searchQuery: string;
    selectedTags: string[];
    resultCount: number;
    totalCount: number;
    onRemoveTag: (tag: string) => void;
    onClearAll: () => void;
}

export function ActiveFilters({
    searchQuery,
    selectedTags,
    resultCount,
    totalCount,
    onRemoveTag,
    onClearAll,
}: ActiveFiltersProps) {
    const hasFilters = searchQuery.trim() !== '' || selectedTags.length > 0;

    if (!hasFilters) {
        return null;
    }

    return (
        <div className="active-filters">
            <div className="filter-info">
                <span className="result-count">
                    Showing {resultCount} of {totalCount} post{totalCount !== 1 ? 's' : ''}
                </span>
            </div>
            <div className="filter-chips">
                {searchQuery.trim() && (
                    <div className="filter-chip">
                        <span className="filter-label">Search:</span>
                        <span className="filter-value">"{searchQuery}"</span>
                        <button
                            type="button"
                            className="filter-remove"
                            onClick={() => onRemoveTag('__search__')}
                            aria-label="Clear search"
                        >
                            ×
                        </button>
                    </div>
                )}
                {selectedTags.map((tag) => (
                    <div key={tag} className="filter-chip">
                        <span className="filter-value">{tag}</span>
                        <button
                            type="button"
                            className="filter-remove"
                            onClick={() => onRemoveTag(tag)}
                            aria-label={`Remove ${tag} filter`}
                        >
                            ×
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    className="clear-all-filters"
                    onClick={onClearAll}
                >
                    Clear all
                </button>
            </div>
        </div>
    );
}

