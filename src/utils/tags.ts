
export interface TagWithCount {
    tag: string;
    count: number;
}

export interface TagCategory {
    name: string;
    tags: TagWithCount[];
}

// Tag categorization patterns
const TAG_CATEGORIES: Record<string, string[]> = {
    'AWS Services': [
        'aws', 's3', 'lambda', 'ec2', 'rds', 'dynamodb', 'cloudformation',
        'iam', 'vpc', 'ecs', 'eks', 'api-gateway', 'cloudwatch', 'sns', 'sqs'
    ],
    'Languages': [
        'typescript', 'javascript', 'python', 'java', 'go', 'rust', 'ruby',
        'php', 'csharp', 'cpp', 'swift', 'kotlin', 'dart'
    ],
    'Frameworks & Libraries': [
        'react', 'vue', 'angular', 'nextjs', 'nestjs', 'express', 'django',
        'flask', 'spring', 'laravel', 'rails', 'svelte', 'remix'
    ],
    'Concepts & Practices': [
        'architecture', 'design-patterns', 'testing', 'tdd', 'ci-cd', 'devops',
        'microservices', 'api-design', 'security', 'performance', 'scalability',
        'clean-code', 'refactoring', 'agile', 'scrum'
    ],
    'Tools & Technologies': [
        'docker', 'kubernetes', 'terraform', 'git', 'github', 'gitlab',
        'jenkins', 'github-actions', 'graphql', 'rest', 'mongodb', 'postgresql',
        'redis', 'elasticsearch', 'kafka'
    ],
    'AI & ML': [
        'ai', 'machine-learning', 'ml', 'llm', 'openai', 'langchain',
        'vector-db', 'embeddings', 'nlp', 'deep-learning'
    ]
};

/**
 * Categorize tags into predefined groups
 */
export function categorizeTags(tags: TagWithCount[]): TagCategory[] {
    const categorized: Map<string, TagWithCount[]> = new Map();
    const uncategorized: TagWithCount[] = [];

    // Initialize categories
    Object.keys(TAG_CATEGORIES).forEach(categoryName => {
        categorized.set(categoryName, []);
    });

    // Categorize tags
    tags.forEach(({ tag, count }) => {
        const tagLower = tag.toLowerCase();
        let found = false;

        for (const [categoryName, patterns] of Object.entries(TAG_CATEGORIES)) {
            if (patterns.some(pattern => tagLower.includes(pattern.toLowerCase()))) {
                const categoryTags = categorized.get(categoryName) || [];
                categoryTags.push({ tag, count });
                categorized.set(categoryName, categoryTags);
                found = true;
                break;
            }
        }

        if (!found) {
            uncategorized.push({ tag, count });
        }
    });

    // Convert to array and filter out empty categories
    const result: TagCategory[] = Array.from(categorized.entries())
        .filter(([_, tags]) => tags.length > 0)
        .map(([name, tags]) => ({
            name,
            tags: tags.sort((a, b) => b.count - a.count)
        }))
        .sort((a, b) => {
            // Sort by total tag count in category
            const aTotal = a.tags.reduce((sum, t) => sum + t.count, 0);
            const bTotal = b.tags.reduce((sum, t) => sum + t.count, 0);
            return bTotal - aTotal;
        });

    // Add uncategorized if any
    if (uncategorized.length > 0) {
        result.push({
            name: 'Other',
            tags: uncategorized.sort((a, b) => b.count - a.count)
        });
    }

    return result;
}

/**
 * Get tag prominence level based on usage count
 */
export function getTagProminence(count: number, maxCount: number): 'high' | 'medium' | 'low' {
    if (maxCount === 0) return 'low';
    const ratio = count / maxCount;
    if (ratio >= 0.5) return 'high';
    if (ratio >= 0.2) return 'medium';
    return 'low';
}

/**
 * Filter tags by search query
 */
export function filterTagsByQuery(tags: TagWithCount[], query: string): TagWithCount[] {
    if (!query.trim()) return tags;
    const lowerQuery = query.toLowerCase();
    return tags.filter(({ tag }) => tag.toLowerCase().includes(lowerQuery));
}

