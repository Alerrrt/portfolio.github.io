import React from 'react';

const experiences = [
    {
        role: 'Senior Penetration Tester',
        company: 'Rev Cyber Solutions, Bengaluru',
        date: 'March 2025 – Present',
        details: [
            'Conduct 10+ full-scope Penetration tests for financial, e-commerce, and SaaS organizations.',
            'Lead VAPT operations using OWASP Top 10 and API security assessments.',
            'Execute exploitation campaigns preventing zero data exfiltration across 8+ scenarios.',
            'Deliver executive-level security training to 50+ professionals.'
        ]
    },
    {
        role: 'Cyber Security Analyst L1',
        company: 'Cyberleap India Pvt Ltd, Bengaluru',
        date: 'April 2024 – September 2024',
        details: [
            'Monitored security events using CrowdStrike EDR, achieving 98% threat detection accuracy.',
            'Configured FortiGate and Checkpoint Firewalls for secure network environment.',
            'Managed Netskope Proxy and Trend Micro DSM for endpoint security.'
        ]
    },
    {
        role: 'Cyber Security Analyst Intern',
        company: 'Eye Q Dot Net Pvt. Ltd., Mangalore',
        date: 'Previous',
        details: [
            'Assisted in SOC activities including log analysis and threat monitoring.',
            'Conducted vulnerability assessments and supported penetration testing initiatives.'
        ]
    }
];

const Experience = () => {
    return (
        <section id="experience" className="py-12">
            <h2 className="text-3xl font-bold mb-8">Professional Experience</h2>

            <div className="space-y-6">
                {experiences.map((job, index) => (
                    <article key={index} className="border-2 border-mac-border bg-white p-6 shadow-retro relative">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 border-b border-gray-200 pb-2">
                            <div>
                                <h3 className="text-xl font-bold">{job.role}</h3>
                                <div className="text-gray-600 font-mono text-sm">{job.company}</div>
                            </div>
                            <div className="font-mono text-xs text-gray-400 mt-2 md:mt-0 bg-gray-100 px-2 py-1 border border-gray-300 inline-block">{job.date}</div>
                        </div>

                        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                            {job.details.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default Experience;
