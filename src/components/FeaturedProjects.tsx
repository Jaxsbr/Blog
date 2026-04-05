import { featuredProjects } from '../data/projects';
import type { Project, ProjectStatus } from '../data/projects';
import { PostCover } from './PostCover';

const statusConfig: Record<ProjectStatus, { label: string; className: string }> = {
    active: { label: 'Active', className: 'status-active' },
    learning: { label: 'Learning', className: 'status-learning' },
    maintained: { label: 'Maintained', className: 'status-maintained' },
    completed: { label: 'Complete', className: 'status-completed' },
    experimental: { label: 'Experimental', className: 'status-experimental' },
};

function ProjectCard({ project }: { project: Project }) {
    const statusInfo = statusConfig[project.status];

    return (
        <div className="project-card">
            <PostCover slug={project.name} variant="card" />
            <div className="project-card-body">
                <div className="project-title-row">
                    <h4 className="project-name">{project.name}</h4>
                    <span className={`status-badge ${statusInfo.className}`}>
                        {statusInfo.label}
                    </span>
                </div>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                    {project.techStack.map((tech) => (
                        <span key={tech} className="tech-badge">
                            {tech}
                        </span>
                    ))}
                </div>
                <div className="project-links">
                    {project.githubUrl && (
                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-link"
                        >
                            GitHub →
                        </a>
                    )}
                    {project.demoUrl && (
                        <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-link"
                        >
                            Demo →
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

export function FeaturedProjects() {
    if (featuredProjects.length === 0) {
        return null;
    }

    return (
        <div className="featured-projects">
            <h3>Featured Projects</h3>
            <div className="projects-grid">
                {featuredProjects.map((project) => (
                    <ProjectCard key={project.name} project={project} />
                ))}
            </div>
        </div>
    );
}
