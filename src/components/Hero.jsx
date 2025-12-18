import React from 'react';
import { CodeIcon as Code } from '@/components/ui/code';
import { TerminalIcon as Terminal } from '@/components/ui/terminal';
import useTypewriter from '../hooks/useTypewriter';

const Hero = () => {
    const text = useTypewriter("Hello.\nI'm Ajin");
    const preRef = React.useRef(null);

    React.useEffect(() => {
        const ASCII_URLS = {
            large: '/assets/ascii_desktop.txt',
            medium: '/assets/ascii_tablet.txt',
            small: '/assets/ascii_mobile.txt'
        };

        const chooseSize = (w) => {
            if (w >= 1000) return 'large';
            if (w >= 600) return 'medium';
            return 'small';
        };

        let currentSize = null;
        let resizeTimeout = null;

        const loadAsciiForViewport = async () => {
            const size = chooseSize(window.innerWidth);
            if (size === currentSize) return;

            currentSize = size;
            const url = ASCII_URLS[size];

            try {
                const res = await fetch(url, { cache: "no-cache" });
                if (!res.ok) throw new Error('Failed to load ' + url);
                const text = await res.text();
                if (preRef.current) {
                    preRef.current.textContent = text;
                }
            } catch (err) {
                console.error('ASCII load error:', err);
                if (preRef.current) {
                    preRef.current.textContent = '';
                }
            }
        };

        const handleResize = () => {
            if (resizeTimeout) clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(loadAsciiForViewport, 180);
        };

        window.addEventListener('resize', handleResize);
        loadAsciiForViewport();

        return () => {
            window.removeEventListener('resize', handleResize);
            if (resizeTimeout) clearTimeout(resizeTimeout);
        };
    }, []);

    return (
        <section className="relative py-12 md:py-20 border-b-2 border-mac-border border-dashed mb-12 min-h-[600px] flex items-center overflow-hidden">
            {/* ASCII Background Layer */}
            <div className="absolute inset-0 z-0 flex justify-center items-center pointer-events-none select-none opacity-50">
                <div role="img" aria-label="Portrait made from ASCII characters" className="w-full max-w-[1200px] p-8 box-border flex justify-center items-center">
                    <pre
                        ref={preRef}
                        id="ascii"
                        aria-hidden="false"
                        className="m-0 p-0 whitespace-pre font-mono text-[length:clamp(8px,2.4vw,22px)] leading-[0.85] tracking-normal overflow-hidden max-w-full text-mac-text"
                        style={{
                            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, "Courier New", monospace',
                            textRendering: 'geometricPrecision',
                            WebkitFontSmoothing: 'antialiased'
                        }}
                    ></pre>
                </div>
            </div>

            <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12 w-full px-4 z-10">
                <div className="flex-1 w-full text-center md:text-left">
                    <Terminal size={40} className="mb-4 text-black" />
                    <h1 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight min-h-[3.5em] md:min-h-[2.5em] whitespace-pre-line leading-tight text-black font-hyper">
                        {text}
                        <span className="animate-pulse text-black">_</span>
                    </h1>
                    <p className="text-lg mb-8 leading-relaxed font-sphere max-w-md text-mac-text relative z-20">
                        Cybersecurity professional specializing<br />
                        in Penetration Testing and Web3.<br />
                        Expert in preventing cyber threats<br />
                        and securing websites.
                    </p>

                    <div className="flex gap-4 justify-center md:justify-start">
                        <a href="#projects" className="bg-white text-black px-6 py-3 rounded-md font-bold hover:bg-gray-100 transition-colors flex items-center gap-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]">
                            <Terminal size={20} />
                            View Projects
                        </a>
                        <a href="mailto:ajinisadev@proton.me" className="bg-black text-white px-6 py-3 rounded-md font-bold hover:bg-gray-800 transition-colors flex items-center gap-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]">
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
