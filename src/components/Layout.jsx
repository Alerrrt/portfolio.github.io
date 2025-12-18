import React, { useState, useEffect } from 'react';
import Header from './Header';
import { WINDOW_TITLE_JOKES } from '../constants';

const Layout = ({ children }) => {
    const [title, setTitle] = useState('Namaste');

    useEffect(() => {
        const randomJoke = WINDOW_TITLE_JOKES[Math.floor(Math.random() * WINDOW_TITLE_JOKES.length)];
        setTitle(randomJoke);
    }, []);

    return (
        <div className="min-h-screen bg-pattern font-retro flex flex-col">
            <Header />
            <main className="flex-1 mt-12 p-4 md:p-8 max-w-6xl mx-auto w-full">
                <div className="bg-mac-window border-2 border-mac-border shadow-retro p-6 min-h-[80vh] relative">
                    <div className="absolute top-0 left-0 w-full h-6 bg-gradient-to-b from-white to-gray-200 border-b-2 border-mac-border flex items-center px-2">
                        <div className="w-3 h-3 border border-mac-border bg-white mr-1 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"></div>
                        <div className="flex-1 text-center font-bold text-sm tracking-wide">{title}</div>
                        <div className="w-3 h-3 border border-mac-border bg-white ml-1 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"></div>
                    </div>
                    <div className="mt-8">
                        {children}
                    </div>
                </div>
            </main>
            {/* Footer removed and moved to Header */}
        </div>
    );
};

export default Layout;
