export type ProjectStatus = 'active' | 'learning' | 'maintained' | 'completed' | 'experimental';

export interface Project {
    name: string;
    description: string;
    techStack: string[];
    status: ProjectStatus;
    githubUrl?: string;
    demoUrl?: string;
    thumbnail?: string;
}

export const featuredProjects: Project[] = [
    {
        name: 'mustard',
        description: 'Personal knowledge graph — MCP server, CLI, and TUI. SQLite-backed with full-text search and context retrieval via graph traversal.',
        techStack: ['TypeScript', 'MCP', 'SQLite', 'Node.js'],
        status: 'active',
        githubUrl: 'https://github.com/Jaxsbr/mustard',
    },
    {
        name: 'local_lense',
        description: 'Production-ready RAG documentation search tool. Indexes local docs into Qdrant vector DB for semantic search, with MCP integration for Cursor.',
        techStack: ['TypeScript', 'Qdrant', 'RAG', 'MCP', 'Docker'],
        status: 'completed',
        githubUrl: 'https://github.com/Jaxsbr/local_lense',
    },
    {
        name: 'flow-mo',
        description: 'YAML-source-of-truth diagram editor with VS Code extension. Drag, connect, and edit flowcharts with React Flow.',
        techStack: ['React', 'TypeScript', 'VS Code', 'YAML'],
        status: 'active',
        githubUrl: 'https://github.com/Jaxsbr/flow-mo',
    },
    {
        name: 'math-practice',
        description: 'Shipped educational math game for kids aged 6-12. Six operation paths with star-based progression and adventure map UI.',
        techStack: ['React', 'TypeScript', 'Vite'],
        status: 'completed',
        githubUrl: 'https://github.com/Jaxsbr/math-practice',
        demoUrl: 'https://jaxsbr.github.io/math-practice/',
    },
];
