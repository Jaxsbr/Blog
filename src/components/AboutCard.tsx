import { profile } from '../data/profile';

export function AboutCard() {
    return (
        <div className="about-card">
            <div className="about-header">
                <h3 className="about-name">{profile.name}</h3>
                <p className="about-role">{profile.role}</p>
            </div>
            <p className="about-bio">{profile.bio}</p>
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
            </div>
        </div>
    );
}

