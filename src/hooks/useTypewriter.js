import { useState, useEffect } from 'react';

const useTypewriter = (fullText) => {
    const [text, setText] = useState('');

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
                if (charIndex < currentFullText.length) {
                    // Show random char first (Glitch effect)
                    const randomChar = chars[Math.floor(Math.random() * chars.length)];
                    setText(currentFullText.slice(0, charIndex) + randomChar);

                    // Quick flip to real char
                    setTimeout(() => {
                        setText(currentFullText.slice(0, charIndex + 1));
                        charIndex++;
                        if (!isDeleting) { // Ensure we didn't switch state mid-timeout
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
    }, [fullText]);

    return text;
};

export default useTypewriter;
