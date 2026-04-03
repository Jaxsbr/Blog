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
    role: 'Senior Product Engineer',
    bio: 'I build systems that make engineering teams dramatically more effective — autonomous build workflows, MCP-integrated knowledge tools, and compound engineering practices. I also make games for fun.',
    skills: [
        'TypeScript',
        'React',
        'Node.js',
        'MCP',
        'Agent Orchestration',
        'Compound Engineering',
        'SQLite',
        'AWS',
        'GitHub Actions',
        '.NET',
    ],
    links: {
        github: 'https://github.com/Jaxsbr',
        linkedin: 'https://www.linkedin.com/in/jacobrink/',
    },
};

