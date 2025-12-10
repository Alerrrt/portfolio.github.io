import React, { useState, useEffect } from 'react';
import { Terminal, Code } from 'lucide-react';

const Hero = () => {
    const [text, setText] = useState('');
    const fullText = "Hello.\nI'm Ajin";

    // Retry with a cleaner approach
    useEffect(() => {
        let timeout;
        let charIndex = 0;
        let isDeleting = false;

        const type = () => {
            const currentText = fullText.substring(0, charIndex);
            setText(currentText);

            let typeSpeed = 150; // Slower base speed (was 100)

            if (isDeleting) {
                typeSpeed /= 2; // Delete faster (75ms)
            }

            if (!isDeleting && charIndex === fullText.length) {
                typeSpeed = 3000; // Longer pause at end (3s)
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                typeSpeed = 1000; // Pause before start (1s)
            }

            if (isDeleting) {
                charIndex--;
            } else {
                charIndex++;
            }

            timeout = setTimeout(type, typeSpeed);
        };

        timeout = setTimeout(type, 1000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <section className="relative py-12 md:py-20 border-b-2 border-mac-border border-dashed mb-12 bg-white">
            {/* Dither Background Overlay */}
            <div className="absolute inset-0 bg-dither z-0"></div>

            <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12 z-10">
                <div className="flex-1 max-w-4xl overflow-hidden">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight min-h-[3.5em] md:min-h-[2.5em] whitespace-pre-line leading-tight text-black font-neuebit">
                        {text}
                        <span className="animate-pulse text-black">_</span>
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 leading-relaxed text-gray-700 font-mono">
                        Cybersecurity professional specializing in Penetration Testing and Web3. Expert in preventing cyber threats and securing websites.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <a href="#projects" className="px-6 py-3 bg-mac-gray border-2 border-black shadow-retro hover:shadow-retro-pressed active:translate-y-1 transition-all text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                            <Terminal size={18} />
                            View Projects
                        </a>
                        <a href="#contact" className="px-6 py-3 bg-white border-2 border-black shadow-retro hover:shadow-retro-pressed active:translate-y-1 transition-all text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                            <Code size={18} />
                            Contact Me
                        </a>
                    </div>
                </div>

                <div className="flex-1 flex justify-center md:justify-end">
                    <img
                        src="/hero-portrait.jpg"
                        alt="Portrait Decoration"
                        className="max-w-full h-auto object-contain max-h-[300px] md:max-h-[400px] select-none opacity-90 theme-adaptive"
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero;
