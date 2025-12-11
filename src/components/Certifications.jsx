import React from 'react';
import { Award, ExternalLink, Calendar, Shield, Code } from 'lucide-react';

const Certifications = () => {
    const certs = [
        {
            category: "Professional Certifications",
            items: [
                {
                    title: "DSCI Certified Ransomware Rapid Responder",
                    issuer: "Data Security Council of India",
                    date: "Aug 2025",
                    id: "BEN-19092503",
                    icon: Shield,
                    link: "https://www.credly.com/badges/ac23c6ec-921b-40ab-bf8b-e99691fb66af/linked_in_profile"
                },
                {
                    title: "Certified Penetration Testing",
                    issuer: "Red Team Hacker Academy, Kochi",
                    date: "Sept 2023",
                    id: "RTXSTU112405977",
                    icon: Shield,
                    link: "RedTeam-CPT-Certificate.pdf"
                },
                {
                    title: "EyeDotNet Ethical Hacking Internship Program",
                    issuer: "EyeDotNet",
                    date: "June 2024",
                    icon: Award,
                    link: "Course_Completion_Certificate (4).pdf"
                },
                {
                    title: "CEH v11: Fileless Malware, Malware Analysis & Countermeasures",
                    issuer: "Skillsoft",
                    date: "March 2023",
                    icon: Shield,
                    link: "https://skillsoft.digitalbadges.skillsoft.com/5adc6bcb-55c9-4319-ac4a-54837c511fbb#acc.oTgV7mPE"
                },
                {
                    title: "Configuring Cloud Security",
                    issuer: "Skillsoft",
                    date: "May 2023",
                    icon: Shield,
                    link: "https://skillsoft.digitalbadges.skillsoft.com/d68b20eb-2720-46cf-b7dc-b2603ee28378#acc.79m8pJ4F"
                },
                {
                    title: "Digital Forensic Techniques & Investigative Approaches",
                    issuer: "Skillsoft",
                    date: "May 2023",
                    icon: Shield,
                    link: "https://skillsoft.digitalbadges.skillsoft.com/118b70fd-6544-478d-919f-95e83ff0d3f5#acc.48h2YeJO"
                }
            ]
        },
        {
            category: "Vendor Certifications",
            items: [
                {
                    title: "FCF - Fortinet Certified Fundamentals in Cybersecurity",
                    issuer: "Fortinet",
                    date: "May 2024",
                    icon: Award,
                    link: "Fortinet cyber security2.0.png"
                },
                {
                    title: "Getting Started in CyberSecurity 2.0",
                    issuer: "Fortinet Self-Paced",
                    date: "",
                    icon: Award,
                    link: "Fortinet cyber security2.0.png"
                },
                {
                    title: "CPENT V2AI",
                    issuer: "Ec-Council",
                    date: "Ongoing",
                    icon: Shield
                }
            ]
        },
        {
            category: "Community Training",
            items: [
                {
                    title: "Try Hack Me | OWASP Top 10 | Blue Team Exercises",
                    issuer: "Try Hack Me",
                    date: "",
                    icon: Code
                },
                {
                    title: "Solidity & Smart Contract Development (Beginner)",
                    issuer: "LearnWeb3.io, Patrick Collins, CryptoZombies",
                    date: "",
                    icon: Code
                }
            ]
        },
        {
            category: "Workshop Participation",
            items: [
                {
                    title: "ANRF-Sponsored Workshop: \"Cloud with Internet of Things (CloudIoT-2025)\"",
                    issuer: "Bennett University",
                    date: "July 28 - Aug 1, 2025",
                    details: [
                        "Featured participant in Bennett University magazine covering Cloud IoT innovations",
                        "Hands-on training with AWS fundamentals, IoT sensors, edge processing, and AI-driven applications"
                    ],
                    icon: Calendar
                }
            ]
        }
    ];

    // Need to define Code icon if used or import it.
    // I'll stick to icons imported above. I'll replace Code with Shield or Award if not imported.
    // Actually I should import Code from lucide-react.

    return (
        <section className="py-20 border-b-2 border-mac-border border-dashed bg-white" id="certifications">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex items-center gap-3 mb-12">
                    <Award className="w-8 h-8 text-black" />
                    <h2 className="text-3xl md:text-4xl font-bold font-neuebit tracking-wide">CERTIFICATIONS & TRAINING</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {certs.map((cat, idx) => (
                        <div key={idx} className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6 rounded-md hover-lift transition-all duration-200">
                            <h3 className="text-xl font-bold mb-6 font-mono bg-black text-white inline-block px-3 py-1">
                                {cat.category}
                            </h3>
                            <div className="space-y-6">
                                {cat.items.map((item, itemIdx) => (
                                    <div key={itemIdx} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                                        <div className="flex justify-between items-start gap-4">
                                            <div>
                                                <h4 className="font-bold text-lg leading-tight mb-1">{item.title}</h4>
                                                <p className="text-sm font-mono text-gray-600 mb-1">{item.issuer}</p>
                                                {item.date && (
                                                    <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
                                                        <Calendar size={12} />
                                                        {item.date}
                                                    </div>
                                                )}
                                                {item.id && (
                                                    <p className="text-xs text-gray-500 font-mono mt-1">ID: {item.id}</p>
                                                )}
                                                {item.details && (
                                                    <ul className="list-disc list-inside mt-2 text-sm text-gray-700 space-y-1">
                                                        {item.details.map((detail, dIdx) => (
                                                            <li key={dIdx}>{detail}</li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                            {/* Link placeholder */}
                                            {item.link ? (
                                                <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-600 transition-colors" title="View Certificate">
                                                    <ExternalLink size={18} />
                                                </a>
                                            ) : (
                                                <div className="w-[18px]"></div> /* Spacer if no link */
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Certifications;
