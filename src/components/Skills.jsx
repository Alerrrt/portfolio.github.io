import React from 'react';

const skillCategories = [
    {
        title: "Security Testing",
        skills: ["Penetration Testing (VAPT)", "OWASP Top 10", "API Security", "Burp Suite Pro", "Metasploit", "Nessus", "OSINT"]
    },
    {
        title: "Threat Detection",
        skills: ["CrowdStrike EDR", "Sentinel One", "SIEM", "SOC Operations", "Malware Analysis", "Digital Forensics"]
    },
    {
        title: "Web3 & Blockchain",
        skills: ["Smart Contract Auditing", "Solidity", "DeFi Security", "Ethereum", "IPFS"]
    },
    {
        title: "Tools & Languages",
        skills: ["Kali Linux", "Wireshark", "Python", "JavaScript", "SQL", "Bash Scripting"]
    }
];

const Skills = () => {
    return (
        <section id="skills" className="py-12 border-t-2 border-mac-border border-dashed">
            <h2 className="text-3xl font-bold mb-8">System Specs (Skills)</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skillCategories.map((category, index) => (
                    <div key={index} className="bg-mac-gray border-2 border-mac-border p-4 shadow-retro">
                        <h3 className="font-bold border-b-2 border-mac-border mb-3 pb-1">{category.title}</h3>
                        <div className="flex flex-wrap gap-2">
                            {category.skills.map(skill => (
                                <span key={skill} className="bg-white border border-gray-400 px-2 py-1 text-xs font-mono hover:bg-mac-blue hover:text-white transition-colors cursor-default">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Skills;
