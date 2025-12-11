import React from 'react';

const ScreenPet = () => {
    const [wingsUp, setWingsUp] = React.useState(true);
    const mousePos = React.useRef({ x: 0, y: 0 });
    const birdPos = React.useRef({ x: -100, y: -100 }); // Initial visual pos
    const isChasing = React.useRef(false);
    const requestRef = React.useRef();

    // 1. Hover/Flap Animation
    React.useEffect(() => {
        const flapInterval = setInterval(() => {
            setWingsUp(prev => !prev);
        }, 200); // Flap speed
        return () => clearInterval(flapInterval);
    }, []);

    // 2. Mouse Tracking Listener
    React.useEffect(() => {
        const handleMouseMove = (e) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // 3. Main Logic (Entry -> Chase)
    React.useEffect(() => {
        const bgTimer = setTimeout(() => {
            const bird = document.getElementById('bird-container');
            const bubble = document.querySelector('.speech-bubble');

            if (bird && bubble) {
                // Trigger Entry
                bird.classList.add('is-active-top-left');

                const handleTransitionEnd = (e) => {
                    if (e.propertyName === 'top' || e.propertyName === 'left') {
                        // Entry finished

                        // Check if user has already seen/dismissed the resume bubble
                        const hasSeenBubble = localStorage.getItem('hasSeenResumeBubble');
                        if (!hasSeenBubble) {
                            bubble.style.display = 'block';
                            // Note: We'll set the flag when they click/download.
                            // If you want it "start once" (shown once per lifetime), set it here:
                            // localStorage.setItem('hasSeenResumeBubble', 'true');
                            // But usually "only once" means "until I interact". 
                            // Re-reading user request: "popup... must only be once".
                            // I'll set it here to be safe, so it doesn't show on reload.
                            localStorage.setItem('hasSeenResumeBubble', 'true');
                        }

                        // Start Chasing Mode
                        isChasing.current = true;

                        // Get current computed position to start chase smoothly
                        const rect = bird.getBoundingClientRect();
                        birdPos.current = { x: rect.left, y: rect.top };

                        // Disable CSS transition for smooth JS movement
                        bird.style.transition = 'none';

                        startChaseLoop();
                        bird.removeEventListener('transitionend', handleTransitionEnd);
                    }
                };
                bird.addEventListener('transitionend', handleTransitionEnd);
            }
        }, 500);
        return () => clearTimeout(bgTimer);
    }, []);

    const startChaseLoop = () => {
        const loop = () => {
            const bird = document.getElementById('bird-container');
            if (!bird) return;

            // Lerp towards mouse
            const targetX = mousePos.current.x;
            const targetY = mousePos.current.y;

            // Speed factor
            const dx = targetX - birdPos.current.x;
            const dy = targetY - birdPos.current.y;

            // Move 5% of the distance per frame (smooth easing)
            birdPos.current.x += dx * 0.05;
            birdPos.current.y += dy * 0.05;

            // Apply position
            bird.style.left = `${birdPos.current.x}px`;
            bird.style.top = `${birdPos.current.y}px`;

            // Flip bird based on direction
            const birdImg = document.getElementById('bird-actor');
            if (birdImg) {
                if (dx > 0) birdImg.style.transform = 'scaleX(1)'; // Face Right
                if (dx < 0) birdImg.style.transform = 'scaleX(-1)'; // Face Left
            }

            // Create Trail (only if moving significantly)
            if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
                if (Math.random() > 0.8) { // Don't drop every frame
                    createTrail(birdPos.current.x, birdPos.current.y);
                }
            }

            requestRef.current = requestAnimationFrame(loop);
        };
        requestRef.current = requestAnimationFrame(loop);
    };

    const createTrail = (x, y) => {
        const trail = document.createElement('div');
        trail.className = 'pixel-trail';
        trail.style.left = `${x + 30}px`; // Center near bird body
        trail.style.top = `${y + 30}px`;
        document.body.appendChild(trail);

        // Remove after animation (1s)
        setTimeout(() => {
            trail.remove();
        }, 1000);
    };

    // Bubble interaction
    React.useEffect(() => {
        const bubble = document.querySelector('.speech-bubble');
        if (bubble) {
            const handleBubbleClick = (e) => {
                e.stopPropagation();
                const link = document.createElement('a');
                link.href = 'Ajin-S-Resume.docx';
                link.download = 'Ajin-S-Resume.docx';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                bubble.style.display = 'none';
            };
            bubble.addEventListener('click', handleBubbleClick);
            return () => bubble.removeEventListener('click', handleBubbleClick);
        }
    }, []);


    return (
        <div id="bird-container">
            <div className="speech-bubble">Click to download resume</div>
            <img
                id="bird-actor"
                src={wingsUp ? "bird_up.png" : "bird_down.png"}
                alt="Screen Pet"
            />
        </div>
    );
};

export default ScreenPet;
