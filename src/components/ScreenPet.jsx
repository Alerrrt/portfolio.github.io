import React from 'react';

const ScreenPet = () => {
    // State
    const [sprite, setSprite] = React.useState('penguin_slide.png');
    const [facingRight, setFacingRight] = React.useState(true);

    // Refs for animation loop
    const birdPos = React.useRef({ x: -100, y: -100 });
    const targetPos = React.useRef(null);
    const state = React.useRef('INIT'); // INIT, FLY_IN, IDLE_TOP_LEFT, ROAMING, PERCHED, CODING
    const requestRef = React.useRef();

    // 1. Logic Loop
    React.useEffect(() => {
        const bird = document.getElementById('bird-container');
        const bubble = document.querySelector('.speech-bubble');

        // --- ANIMATION INTERVAL ---
        const animInterval = setInterval(() => {
            if (state.current === 'FLY_IN' || state.current === 'ROAMING') {
                // Sliding (No flapping needed, just ensure we use the slide sprite)
                setSprite('penguin_slide.png');
            }
            else if (state.current === 'PERCHED' || state.current === 'IDLE_TOP_LEFT') {
                // Sitting / Idle
                setSprite('penguin_idle.png');

                // Random look around
                if (Math.random() > 0.95) {
                    setFacingRight(prev => !prev);
                }
            }
            else if (state.current === 'CODING') {
                // Typing Animation (using placeholder frames for now if identical)
                setSprite(prev => (prev === 'penguin_code_1.png' ? 'penguin_code_2.png' : 'penguin_code_1.png'));
            }
        }, 200);

        // --- MAIN GAME LOOP ---
        const loop = () => {
            if (!bird) return;

            // STATE MACHINE
            if (state.current === 'INIT') {
                birdPos.current = { x: -100, y: window.innerHeight + 100 };
                state.current = 'FLY_IN';
                targetPos.current = { x: 20, y: 20 };
            }

            else if (state.current === 'FLY_IN') {
                moveTowardsTarget(6);
                if (hasReachedTarget()) {
                    state.current = 'IDLE_TOP_LEFT';
                    targetPos.current = null;

                    // Show Bubble Logic
                    const hasSeen = localStorage.getItem('hasSeenResumeBubble');
                    if (!hasSeen && bubble) {
                        bubble.style.display = 'block';
                        setTimeout(() => {
                            if (bubble) bubble.style.display = 'none';
                            decideNextMove(); // Start roaming after bubble hides
                        }, 5000);
                    } else {
                        setTimeout(decideNextMove, 2000);
                    }
                }
            }

            else if (state.current === 'ROAMING') {
                moveTowardsTarget(4);
                if (hasReachedTarget()) {
                    // Landed
                    state.current = 'PERCHED';
                    targetPos.current = null;

                    // Sequence: Perch (Idle) -> Code -> Roam
                    setTimeout(() => {
                        // After 2-3s of idle, start coding
                        state.current = 'CODING';

                        // Code for 4s, then fly away
                        setTimeout(() => {
                            decideNextMove();
                        }, 4000);

                    }, 2000 + Math.random() * 1000);
                }
            }
            // PERCHED & CODING states are handled by timeouts/intervals above

            // Apply transforms
            bird.style.left = `${birdPos.current.x}px`;
            bird.style.top = `${birdPos.current.y}px`;

            // Trail logic
            if ((state.current === 'FLY_IN' || state.current === 'ROAMING') && Math.random() > 0.9) {
                createTrail(birdPos.current.x, birdPos.current.y);
            }

            requestRef.current = requestAnimationFrame(loop);
        };

        requestRef.current = requestAnimationFrame(loop);

        // --- HELPERS ---
        const moveTowardsTarget = (speed) => {
            if (!targetPos.current) return;

            const dx = targetPos.current.x - birdPos.current.x;
            const dy = targetPos.current.y - birdPos.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < speed) {
                birdPos.current.x = targetPos.current.x;
                birdPos.current.y = targetPos.current.y;
            } else {
                birdPos.current.x += (dx / dist) * speed;
                birdPos.current.y += (dy / dist) * speed;
            }

            if (dx > 0) setFacingRight(true);
            if (dx < 0) setFacingRight(false);
        };

        const hasReachedTarget = () => {
            if (!targetPos.current) return true;
            const dx = targetPos.current.x - birdPos.current.x;
            const dy = targetPos.current.y - birdPos.current.y;
            return Math.sqrt(dx * dx + dy * dy) < 5;
        };

        const decideNextMove = () => {
            state.current = 'ROAMING';

            const cards = document.querySelectorAll('.project-card');
            // 70% chance to pick a card vs random spot
            const pickCard = Math.random() > 0.3 && cards.length > 0;

            if (pickCard) {
                const randomCard = cards[Math.floor(Math.random() * cards.length)];
                const rect = randomCard.getBoundingClientRect();
                targetPos.current = {
                    x: rect.left + 20 + Math.random() * (rect.width - 60),
                    y: rect.top - 45
                };
            } else {
                targetPos.current = {
                    x: Math.random() * (window.innerWidth - 100),
                    y: Math.random() * (window.innerHeight - 200)
                };
            }
        };

        return () => {
            cancelAnimationFrame(requestRef.current);
            clearInterval(animInterval);
        };
    }, []);

    const createTrail = (x, y) => {
        const trail = document.createElement('div');
        trail.className = 'pixel-trail';
        trail.style.left = `${x + 30}px`;
        trail.style.top = `${y + 30}px`;
        document.body.appendChild(trail);
        setTimeout(() => trail.remove(), 1000);
    };

    const handleBubbleClick = (e) => {
        e.stopPropagation();
        const bubble = document.querySelector('.speech-bubble');
        if (bubble) bubble.style.display = 'none';

        const link = document.createElement('a');
        link.href = 'Ajin-S-Resume.docx';
        link.download = 'Ajin-S-Resume.docx';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        localStorage.setItem('hasSeenResumeBubble', 'true');
    };

    return (
        <div id="bird-container" style={{ position: 'fixed', left: -100, top: -100, zIndex: 9999 }}>
            <div
                className="speech-bubble"
                onClick={handleBubbleClick}
                style={{ cursor: 'pointer' }}
            >
                Click to download resume
            </div>
            <img
                id="bird-actor"
                src={sprite}
                alt="Screen Pet"
                style={{
                    width: '64px',
                    transform: facingRight ? 'scaleX(1)' : 'scaleX(-1)',
                    imageRendering: 'pixelated',
                    mixBlendMode: 'multiply',
                }}
            />
        </div>
    );
};

export default ScreenPet;
