import React, { useState, useEffect } from 'react';
import { Apple, Search, Sun, Moon, Palette } from 'lucide-react';

const Header = () => {
    const [time, setTime] = useState(new Date());
    const [inverted, setInverted] = useState(false);

    const toggleTheme = () => {
        setInverted(!inverted);
        document.documentElement.classList.toggle('theme-inverted');
    };

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const getTimeInfo = (date, timeZone) => {
        const options = { timeZone, hour: 'numeric', minute: '2-digit', hour12: true };
        const timeString = new Intl.DateTimeFormat('en-US', options).format(date);
        // Get 24h hour for day/night logic
        const hour24 = parseInt(new Intl.DateTimeFormat('en-US', { timeZone, hour: 'numeric', hour12: false }).format(date), 10);
        const isDay = hour24 >= 6 && hour24 < 18;
        return { timeString, isDay };
    };

    const india = getTimeInfo(time, 'Asia/Kolkata');
    const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const local = getTimeInfo(time, localTimeZone);

    return (
        <header className="fixed top-0 left-0 w-full bg-mac-window border-b-2 border-mac-border z-50 flex items-center px-2 h-8 font-retro text-sm select-none shadow-retro">
            <div className="flex items-center gap-4">
                <a href="Ajin-S-Resume.docx" download className="hover:bg-mac-blue hover:text-white px-2 py-1 rounded-sm transition-colors flex items-center justify-center" title="Download Resume">
                    <img src="retro-computer-adaptive.png" alt="Retro Computer Icon" className="w-6 h-6 object-contain theme-adaptive" />
                </a>
            </div>

            <nav className="flex-1 ml-4 hidden md:block">
                <button
                    onClick={toggleTheme}
                    className="p-1.5 hover:bg-mac-border hover:text-white transition-colors cursor-pointer flex items-center justify-center border border-mac-border rounded-sm bg-white/50"
                    title="Invert Theme"
                >
                    <Palette size={16} />
                </button>
            </nav>
            <div className="flex items-center gap-3 px-2 ml-auto text-xs font-mono whitespace-nowrap">
                <div className="flex items-center gap-1">
                    <span className="font-bold text-gray-600">IN</span>
                    {india.isDay ? <Sun size={12} className="text-orange-500" /> : <Moon size={12} className="text-blue-500" />}
                    <span>{india.timeString}</span>
                </div>
                <div className="w-[1px] h-3 bg-gray-400"></div>
                <div className="flex items-center gap-1">
                    <span className="font-bold text-gray-600">LOC</span>
                    {local.isDay ? <Sun size={12} className="text-orange-500" /> : <Moon size={12} className="text-blue-500" />}
                    <span>{local.timeString}</span>
                </div>
                <div className="w-[1px] h-3 bg-gray-400 mx-1"></div>
                <Search size={16} className="cursor-pointer" />
            </div>
        </header>
    );
};

export default Header;
