import { profile } from '../data/profile';

export function AboutCard() {
    return (
        <div className="about-card">
            <div className="about-header">
                <h3 className="about-name">{profile.name}</h3>
                <p className="about-role">{profile.role}</p>
            </div>
            <p className="about-bio">{profile.bio}</p>
            <div className="about-skills">
                <h4 className="skills-title">Tech Stack</h4>
                <div className="skills-list">
                    {profile.skills.map((skill) => (
                        <span key={skill} className="skill-badge">
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
            <div className="about-links">
                {profile.links.github && (
                    <a
                        href={profile.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="about-link"
                    >
                        GitHub
                    </a>
                )}
                {profile.links.linkedin && (
                    <a
                        href={profile.links.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="about-link"
                    >
                        LinkedIn
                    </a>
                )}
                {profile.links.resume && (
                    <a
                        href={profile.links.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="about-link"
                    >
                        Resume
                    </a>
                )}
                {profile.links.email && (
                    <a href={`mailto:${profile.links.email}`} className="about-link">
                        Email
                    </a>
                )}
            </div>
        </div>
    );
}

