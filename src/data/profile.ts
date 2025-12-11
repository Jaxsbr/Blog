export interface Profile {
    name: string;
    role: string;
    bio: string;
    skills: string[];
    links: {
        github?: string;
        linkedin?: string;
        resume?: string;
        email?: string;
    };
}

export const profile: Profile = {
    name: 'Jacobus Brink',
    role: 'Senior Full-Stack Engineer',
    bio: 'Building AI-powered solutions through API integration, RAG systems, and full-stack development. Currently upskilling in AI integration capabilities while maintaining expertise in modern web technologies and cloud infrastructure.',
    skills: [
        'TypeScript',
        'React',
        'Node.js',
        '.NET',
        'AI/LLM Integration',
        'RAG Systems',
        'Vector Databases',
        'AWS',
        'GraphQL',
        'PostgreSQL',
    ],
    links: {
        github: 'https://github.com/Jaxsbr',
        linkedin: 'https://linkedin.com/in/jacobusbrink',
        resume: '/resume.pdf',
        email: 'jacobus.brink@example.com',
    },
};

