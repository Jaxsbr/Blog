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
    bio: 'Full-stack engineer with expertise in modern web technologies and cloud infrastructure. Continuously learning and adapting to new technologies—currently exploring AI integration as part of pragmatic upskilling. Focused on building scalable solutions and maintaining a balanced approach to professional growth.',
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
        linkedin: 'https://www.linkedin.com/in/jacobrink/',
    },
};

