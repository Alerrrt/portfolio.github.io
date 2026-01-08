import React from 'react';
import ProjectCard from './ProjectCard';

const projects = [
    {
        title: 'One-for-All',
        description: 'Production-ready file conversion engine supporting 250+ formats with enterprise-grade security and queue-based async processing.',
        tags: ['File Conversion', 'Python/FastAPI', 'React'],
        link: 'https://github.com/Alerrrt/One-for-All',
        image: 'one-for-all-ascii.png'
    },
    {
        title: 'Neutron-ng',
        description: 'Pure CLI reconnaissance tool for penetration testers with efficient subdomain enumeration and port scanning.',
        tags: ['CLI Tool', 'Go', 'Recon'],
        link: 'https://github.com/Alerrrt/Neutron-ng',
        image: 'neutron-ascii.png'
    },
    {
        title: 'Web3 Community Building',
        description: 'Served as a Business Development Intern at 5irechain. Hosted W3K events and contributed to ecosystem growth.',
        tags: ['Business Development', 'Community', 'Web3'],
        link: 'https://x.com/a71n_cr4sh',
        image: 'web3-community-ascii.png'
    }
];

const ProjectGrid = () => {
    return (
        <section id="projects" className="py-12 border-b-2 border-mac-border border-dashed">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">Projects</h2>
                <span className="font-mono text-sm">{projects.length} Items</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                    <ProjectCard key={index} {...project} />
                ))}
            </div>
        </section>
    );
};

export default ProjectGrid;
