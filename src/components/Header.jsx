import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Apple, Palette } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { SearchIcon as Search } from '@/components/ui/search';
import { SunIcon as Sun } from '@/components/ui/sun';
import { MoonIcon as Moon } from '@/components/ui/moon';
import useTime from '../hooks/useTime';

const Header = () => {
    const [inverted, setInverted] = useState(false);
    const [showBanner, setShowBanner] = useState(false);
    const { getTimeInfo } = useTime();

    useEffect(() => {
        const interval = setInterval(() => {
            setShowBanner(true);
            setTimeout(() => setShowBanner(false), 2500);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const toggleTheme = () => {
        setInverted(!inverted);
        document.documentElement.classList.toggle('theme-inverted');
    };

    const india = getTimeInfo('Asia/Kolkata');

    return (
        <header className="fixed top-0 left-0 w-full bg-mac-window border-b-2 border-mac-border z-50 flex items-center px-2 h-8 font-retro text-sm select-none shadow-retro">
            <div className="flex items-center gap-3">
                <a href="Ajin-S-Resume.docx" download className="hover:bg-mac-blue hover:text-white px-1 py-1 rounded-sm transition-colors flex items-center justify-center group" title="Download Resume">
                    <img src="retro-floppy.png" alt="Download Resume" className="w-8 h-8 object-contain group-hover:invert" />
                </a>
                <AnimatePresence>
                    {showBanner && (
                        <motion.div
                            initial={{ opacity: 0, x: -20, scale: 0.8 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: -20, scale: 0.8 }}
                            transition={{ duration: 0.4, ease: "backOut" }}
                            className="hidden md:block bg-mac-window text-black text-[10px] px-2 py-1 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-mono whitespace-nowrap overflow-hidden"
                        >
                            &lt;- Click to download resume
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <nav className="flex-1 ml-4 hidden md:flex items-center justify-center gap-4">
                <div className="flex items-center gap-4 text-xs font-mono ml-4">
                    {/* Contact info remains here */}
                    <span>Bengaluru, India</span>
                    <span>|</span>
                    <a href="mailto:ajinisadev@proton.me" className="hover:underline">ajinisadev@proton.me</a>
                    <span>|</span>
                    <a href="https://www.linkedin.com/in/ajin-s-763b94226/" target="_blank" rel="noopener noreferrer" className="hover:underline text-[rgb(255,97,26)]">LinkedIn</a>
                    <span>|</span>
                    <a href="https://x.com/Homelanderr827" target="_blank" rel="noopener noreferrer" className="hover:underline text-[rgb(255,97,26)]">Twitter/X</a>
                </div>
            </nav>
            <div className="flex items-center gap-3 px-2 ml-auto text-xs font-mono whitespace-nowrap">
                <ThemeToggle toggled={inverted} onToggle={toggleTheme} />
                <div className="flex items-center gap-1">
                    <span className="font-bold text-gray-600">IN</span>
                    {india.isDay ? <Sun size={12} className="text-orange-500" /> : <Moon size={12} className="text-blue-500" />}
                    <span>{india.timeString}</span>
                </div>
                <div className="w-[1px] h-3 bg-gray-400"></div>

                <Search size={16} className="cursor-pointer" />
            </div>
        </header>
    );
};

export default Header;
