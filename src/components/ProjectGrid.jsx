import React from 'react';
import ProjectCard from './ProjectCard';

const projects = [
    {
        title: 'Project Nightingale V2',
        description: 'Advanced security scanner with robust concurrency and real-time updates.',
        tags: ['Security Scanner', 'Python', 'React'],
        link: 'https://github.com/Alerrrt/Project-Nightingale-V2',
        image: '/Nigingale-ASCII.png'
    },
    {
        title: 'Web Penetration Testing',
        description: 'Comprehensive VAPT on web applications with detailed remediation guidance.',
        tags: ['VAPT', 'Burp Suite', 'OWASP'],
        link: '#'
    },
    {
        title: 'Web3 Security Research',
        description: 'Vulnerability research, public disclosures, and bug bounty programs focusing on DeFi protocols.',
        tags: ['Smart Contracts', 'Solidity', 'DeFi'],
        link: '#'
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
