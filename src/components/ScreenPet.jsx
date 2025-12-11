import React from 'react';

const ScreenPet = () => {
    React.useEffect(() => {
        const timer = setTimeout(() => {
            const bird = document.getElementById('bird-container');
            if (bird) {
                bird.classList.add('is-active-top-right');
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
