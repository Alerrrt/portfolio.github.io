import React from 'react';

const ScreenPet = () => {
    // State
    const [sprite, setSprite] = React.useState('bird_up.png'); // bird_up, bird_down, bird_sit
    const [facingRight, setFacingRight] = React.useState(true);

    // Refs for animation loop
    const birdPos = React.useRef({ x: -100, y: -100 });
    const targetPos = React.useRef(null); // {x, y} or null
    const state = React.useRef('INIT'); // INIT, FLY_IN, IDLE_TOP_LEFT, ROAMING, PERCHED
    const requestRef = React.useRef();

    // 1. Logic Loop
    React.useEffect(() => {
        const bird = document.getElementById('bird-container');
        const bubble = document.querySelector('.speech-bubble');

        // --- FLAPPING LOGIC ---
        // We toggle sprite only if moving (targetPos is not null)
        const flapInterval = setInterval(() => {
            if (state.current === 'FLY_IN' || state.current === 'ROAMING' || state.current === 'CHASING') {
                setSprite(prev => (prev === 'bird_up.png' ? 'bird_down.png' : 'bird_up.png'));
            } else if (state.current === 'PERCHED' || state.current === 'IDLE_TOP_LEFT') {
                setSprite('bird_sit.png');
            }
        }, 200);

        // --- MAIN GAME LOOP ---
        const loop = () => {
            if (!bird) return;

            // STATE MACHINE
            if (state.current === 'INIT') {
                // Initialize position off-screen
                birdPos.current = { x: -100, y: window.innerHeight + 100 };
                // Start movement to Top-Left
                state.current = 'FLY_IN';
                // Define Top-Left
                targetPos.current = { x: 20, y: 20 };

                // Show standard CSS transition is tricky with JS override. 
                // We'll do pure JS movement for consistency now.
            }

            else if (state.current === 'FLY_IN') {
                moveTowardsTarget(5); // Fast speed
                if (hasReachedTarget()) {
                    state.current = 'IDLE_TOP_LEFT';
                    targetPos.current = null;

                    // Show Bubble
                    const hasSeen = localStorage.getItem('hasSeenResumeBubble');
                    // Only show if NOT roaming. Since we are in IDLE_TOP_LEFT, we check.
                    // User said: "popup... must only be open when the bird coming to the top left corner"

                    if (!hasSeen && bubble) {
                        bubble.style.display = 'block';
                        // Hide after 5 seconds
                        setTimeout(() => {
                            if (bubble) bubble.style.display = 'none';
                            // Resume behaviors
                            decideNextMove();
                        }, 5000);
                    } else {
                        // No bubble needed, wait shorter then roam
                        setTimeout(decideNextMove, 2000);
                    }
                }
            }

            else if (state.current === 'ROAMING') {
                moveTowardsTarget(3); // Normal speed
                if (hasReachedTarget()) {
                    // Arrived at random spot or card
                    state.current = 'PERCHED';
                    targetPos.current = null;
                    // Rest for a while (2s to 6s)
                    setTimeout(decideNextMove, 3000 + Math.random() * 5000);
                }
            }
            // PERCHED state does nothing -> waits for timeout to call decideNextMove -> sets ROAMING

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

            // Facing
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
            // 60% chance to roam to a card
            // 40% chance to roam to random spot
            state.current = 'ROAMING';

            // Re-query cards in case of dynamic content (rare but safe)
            const cards = document.querySelectorAll('.project-card');
            const pickCard = Math.random() > 0.4 && cards.length > 0;

            if (pickCard) {
                const randomCard = cards[Math.floor(Math.random() * cards.length)];
                const rect = randomCard.getBoundingClientRect();

                // rect is relative to viewport, which matches our fixed position system perfectly
                // Aim for top of card
                targetPos.current = {
                    x: rect.left + 20 + Math.random() * (rect.width - 60), // Random spot on top edge
                    y: rect.top - 50 // Sit on top edge (offset for bird height)
                };
            } else {
                // Random screen spot
                targetPos.current = {
                    x: Math.random() * (window.innerWidth - 100),
                    y: Math.random() * (window.innerHeight - 200)
                };
            }
        };

        return () => {
            cancelAnimationFrame(requestRef.current);
            clearInterval(flapInterval);
            // Bubbles/timeouts might persist
        };
    }, []);

    // Helper functions need to be inside or refs
    const createTrail = (x, y) => {
        const trail = document.createElement('div');
        trail.className = 'pixel-trail';
        trail.style.left = `${x + 30}px`;
        trail.style.top = `${y + 30}px`;
        document.body.appendChild(trail);
        setTimeout(() => trail.remove(), 1000);
    };

    // Bubble Click
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
        <div id="bird-container" style={{ position: 'fixed', left: -100, top: -100 /* JS controls this */ }}>
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
                    mixBlendMode: 'multiply', // Attempt to fix white background if png isn't transparent
                }}
            />
        </div>
    );
};

export default ScreenPet;
