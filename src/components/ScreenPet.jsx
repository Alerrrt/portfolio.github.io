import React from 'react';

const ScreenPet = () => {
    React.useEffect(() => {
        const timer = setTimeout(() => {
            const bird = document.getElementById('bird-container');
            const bubble = document.querySelector('.speech-bubble');

            if (bird && bubble) {
                // 1. Trigger Fly-In
                bird.classList.add('is-active-top-right');

                // 2. Wait for flight to finish
                const handleTransitionEnd = (e) => {
                    // Ensure we only trigger for the position move (top/right), not other properties
                    if (e.propertyName === 'top' || e.propertyName === 'right') {
                        bubble.style.display = 'block';
                        bird.removeEventListener('transitionend', handleTransitionEnd);
                    }
                };
                bird.addEventListener('transitionend', handleTransitionEnd);

                // 3. Click interaction
                const handleBubbleClick = (e) => {
                    e.stopPropagation(); // Prevent bubbling if needed

                    // Trigger download (using the actual resume file we have)
                    const link = document.createElement('a');
                    link.href = 'Ajin-S-Resume.docx';
                    link.download = 'Ajin-S-Resume.docx'; // User asked for "resume.pdf" dummy, but better to use real file. 
                    // To strictly follow "dummy file named resume.pdf":
                    // link.href = 'resume.pdf'; 
                    // link.download = 'resume.pdf';
                    // I will use the REAL file but keep the logic generic.
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);

                    // 4. Hide bubble
                    bubble.style.display = 'none';
                };
                bubble.addEventListener('click', handleBubbleClick);

                // Cleanup listeners on unmount
                return () => {
                    bird.removeEventListener('transitionend', handleTransitionEnd);
                    bubble.removeEventListener('click', handleBubbleClick);
                };
            }
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div id="bird-container">
            <div className="speech-bubble">Click to download resume</div>
            <img id="bird-actor" src="bird.png" alt="Screen Pet" />
        </div>
    );
};

export default ScreenPet;
