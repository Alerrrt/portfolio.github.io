import React from 'react';
import { ExternalLinkIcon as ExternalLink } from './ui/external-link';

const ProjectCard = ({ title, description, tags, link, asciiArt, image }) => {
    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card block group relative rounded-xl border-2 border-mac-border bg-mac-gray/50 p-4 transition-all hover:scale-[1.02] hover:shadow-mac-hard hover:border-black hover-lift h-full flex flex-col"
        >
            <div className={`h-40 bg-gray-200 mb-4 border border-mac-border border-dashed flex items-center justify-center overflow-hidden ${image ? 'p-0' : ''}`}>
                {image ? (
                    <img src={image} alt={title} className="w-full h-full object-cover object-center grayscale contrast-125" />
                ) : asciiArt ? (
                    <pre className="font-mono text-[8px] leading-[8px] sm:text-[10px] sm:leading-[10px] text-gray-800 whitespace-pre text-center select-none opacity-80">
                        {asciiArt}
                    </pre>
                ) : (
                    <span className="font-mono text-gray-400 text-sm">Image Placeholder</span>
                )}
            </div>

            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-gray-600 mb-4 flex-1 text-sm leading-relaxed">{description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag) => (
                    <span key={tag} className="text-xs font-mono border border-gray-400 px-1 bg-gray-100">{tag}</span>
                ))}
            </div>

            <span className="inline-flex items-center gap-2 text-sm font-bold border-t border-mac-border pt-4 mt-auto group-hover:text-blue-600">
                View Project <ExternalLink size={14} />
            </span>
        </a>
    );
};

export default ProjectCard;
