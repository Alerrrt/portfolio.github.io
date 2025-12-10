import React, { useState, useEffect } from 'react';
import Header from './Header';

const Layout = ({ children }) => {
    const [title, setTitle] = useState('Namaste');

    useEffect(() => {
        const jokes = [
            "sudo make me a sandwich",
            "rm -rf / --no-preserve-root",
            "404: Sleep Not Found",
            "git push --force",
            "Compiling...",
            "I'm feeling lucky",
            "ping 8.8.8.8",
            "Searching for meaning...",
            "System.out.println('Hello')",
            "C:\\DOS\\RUN",
            "Namaste",
            "Searching for WiFi...",
            "Insert disk 2 to continue",
            "Press ANY key to panic",
            "Guru Meditation",
            "PC Load Letter",
            "It works on my machine",
            "git commit -m 'fixed stuff'",
            "chmod 777 universe",
            "while(true) { sleep(); }",
            "Ctrl+Alt+Del in progress",
            "Identifying identity...",
            "Downloading RAM...",
            "Hacking the mainframe...",
            "Establish connection...",
            "rm -rf /past/mistakes",
            "Defragmenting reality...",
            "A fatal exception has occurred",
            "Task failed successfully",
            "Reticulating splines...",
            "Buffer overflow...",
            "Blue Screen of Life",
            "Formatting C: ...",
            "Kernel panic!",
            "Undefined is not a function",
            "00101010"
        ];
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
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
            <footer className="bg-mac-gray border-t-2 border-mac-border p-4 text-center text-xs font-mono">
                <p className="mb-2">Bengaluru, India | +91 9360815103 | sajuajin8680@gmail.com</p>
                <div className="flex justify-center gap-4">
                    <a href="https://www.linkedin.com/in/ajin-s-763b94226/" target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-800">LinkedIn</a>
                    <a href="https://x.com/Homelander827" target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-800">Twitter/X</a>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
