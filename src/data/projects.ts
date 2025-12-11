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
        name: 'JFDocSearch - RAG Documentation Tool',
        description: 'MCP (Model Context Protocol) tool enabling semantic search across documentation using vector databases. Built with Qdrant for embeddings and natural language querying.',
        techStack: ['TypeScript', 'Qdrant', 'MCP', 'RAG', 'Vector Search'],
        status: 'learning',
        githubUrl: 'https://github.com/Jaxsbr/JFDocSearch',
    },
    {
        name: 'Personal Knowledge Blog',
        description: 'Modern blog platform built with React and TypeScript, featuring markdown support, search, and tag filtering. Serves as both a content platform and portfolio piece.',
        techStack: ['React', 'TypeScript', 'Vite', 'Markdown'],
        status: 'active',
        githubUrl: 'https://github.com/Jaxsbr/Blog',
    },
    {
        name: 'Neon Arcade Portfolio',
        description: 'Interactive portfolio website with cyberpunk aesthetic, featuring game showcases and animated effects. Complete rebuild with modern web technologies.',
        techStack: ['HTML5', 'CSS3', 'JavaScript', 'Canvas API'],
        status: 'maintained',
        githubUrl: 'https://github.com/Jaxsbr/Jaxsbr.github.io',
        demoUrl: 'https://jaxsbr.github.io',
    },
    {
        name: 'CuteDefense - Tower Defense Game',
        description: 'Complete tower defense game built with HTML5 Canvas, featuring wave-based gameplay, tower upgrades, and resource management systems.',
        techStack: ['JavaScript', 'HTML5 Canvas', 'Game Development'],
        status: 'completed',
        githubUrl: 'https://github.com/Jaxsbr/CuteDefense',
    },
];

