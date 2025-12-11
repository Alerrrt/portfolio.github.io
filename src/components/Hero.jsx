import React, { useState, useEffect } from 'react';
import { Terminal, Code } from 'lucide-react';

const Hero = () => {
    const [text, setText] = useState('');
    const fullText = "Hello.\nI'm Ajin";

    useEffect(() => {
        let timeout;
        let charIndex = 0;
        let isDeleting = false;
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*";

        const type = () => {
            const currentFullText = fullText;

            if (isDeleting) {
                // Deleting Phase
                if (charIndex > 0) {
                    setText(currentFullText.slice(0, charIndex - 1));
                    charIndex--;
                    timeout = setTimeout(type, 50);
                } else {
                    isDeleting = false;
                    timeout = setTimeout(type, 1000); // Pause before re-typing
                }
            } else {
                // Typing Phase with "Hacker" Scramble
                // 1. Set text to correct substring + 1 random char
                // 2. Short delay, then set to correct substring + correct char

                if (charIndex < currentFullText.length) {
                    // Show random char first (Glitch effect)
                    const randomChar = chars[Math.floor(Math.random() * chars.length)];
                    setText(currentFullText.slice(0, charIndex) + randomChar);

                    // Quick flip to real char
                    setTimeout(() => {
                        setText(currentFullText.slice(0, charIndex + 1));
                        charIndex++;
                        if (!isDeleting) { // Ensure we didn't switch state mid-timeout (unlikely but safe)
                            timeout = setTimeout(type, Math.random() * 50 + 50);
                        }
                    }, 50);
                } else {
                    // Finished typing
                    isDeleting = true;
                    timeout = setTimeout(type, 3000); // Wait before deleting
                }
            }
        };

        timeout = setTimeout(type, 1000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <section
            className="relative py-12 md:py-20 border-b-2 border-mac-border border-dashed mb-12 min-h-[600px] flex items-center overflow-hidden"
            style={{
                backgroundImage: "url('Clean.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >

            <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12 w-full px-4 z-10">
                <div className="flex-1 w-full text-center md:text-left">
                    <Terminal size={40} className="mb-4 text-black" />
                    <h1 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight min-h-[3.5em] md:min-h-[2.5em] whitespace-pre-line leading-tight text-black font-raw-pixel">
                        {text}
                        <span className="animate-pulse text-black">_</span>
                    </h1>

                    <div className="flex gap-4 justify-center md:justify-start">
                        <a href="#projects" className="bg-white text-black px-6 py-3 rounded-md font-bold hover:bg-gray-100 transition-colors flex items-center gap-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]">
                            <Terminal size={20} />
                            View Projects
                        </a>
                        <a href="mailto:sajuajin8680@gmail.com" className="bg-black text-white px-6 py-3 rounded-md font-bold hover:bg-gray-800 transition-colors flex items-center gap-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]">
                            <Code size={20} />
                            Contact Me
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
