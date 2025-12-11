import React from 'react';

const ScreenPet = () => {
    // State
    const [sprite, setSprite] = React.useState('penguin_slide1.png');
    const [facingRight, setFacingRight] = React.useState(true);

    // Refs for animation loop
    const birdPos = React.useRef({ x: -100, y: -100 });
    const targetPos = React.useRef(null);
    const state = React.useRef('INIT'); // INIT, FLY_IN, IDLE_TOP_LEFT, ROAMING, IDLE, WORK, THUMBS_UP, JUMP
    const requestRef = React.useRef();

    // 1. Logic Loop
    React.useEffect(() => {
        const bird = document.getElementById('bird-container');
        const bubble = document.querySelector('.speech-bubble');

        // --- ANIMATION INTERVAL ---
        const animInterval = setInterval(() => {
            if (state.current === 'FLY_IN' || state.current === 'ROAMING') {
                // Sliding
                setSprite(prev => (prev === 'penguin_slide1.png' ? 'penguin_slide2.png' : 'penguin_slide1.png'));
            }
            else if (state.current === 'IDLE' || state.current === 'IDLE_TOP_LEFT') {
                // Idle Animation: Toggle between Standing and "Idle Slide" (assuming it's a breath/pose change)
                setSprite(prev => (prev === 'penguin_idle_standing.png' ? 'penguin_idle_slide.png' : 'penguin_idle_standing.png'));

                // Random look around (reduced frequency)
                if (Math.random() > 0.98) {
                    setFacingRight(prev => !prev);
                }
            }
            else if (state.current === 'WORK') {
                // Working / Coding
                setSprite(prev => (prev === 'penguin_idle_working1.png' ? 'penguin_idle_working2.png' : 'penguin_idle_working1.png'));
            }
            else if (state.current === 'THUMBS_UP') {
                setSprite('penguin_thumbsup.png');
            }
            else if (state.current === 'JUMP') {
                // Jump Animation
                setSprite(prev => (prev === 'penguin_idle_jump.png' ? 'penguin_idle_jump2.png' : 'penguin_idle_jump.png'));
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
                            decideNextMove();
                        }, 5000);
                    } else {
                        setTimeout(decideNextMove, 2000);
                    }
                }
            }

            else if (state.current === 'ROAMING') {
                moveTowardsTarget(4);
                if (hasReachedTarget()) {
                    state.current = 'IDLE';
                    targetPos.current = null;

                    // Sequence: Idle -> Work -> Thumbs Up -> Jump -> Roam
                    // 1. Idle (Rest)
                    setTimeout(() => {
                        state.current = 'WORK';

                        // 2. Work (Code)
                        setTimeout(() => {
                            state.current = 'THUMBS_UP';

                            // 3. Thumbs Up (Celeb)
                            setTimeout(() => {
                                state.current = 'JUMP';

                                // 4. Jump (Excitement)
                                setTimeout(() => {
                                    decideNextMove();
                                }, 1500); // Jump duration

                            }, 1500); // Thumbs up duration

                        }, 3500); // Work duration

                    }, 2000 + Math.random() * 1000); // Idle duration
                }
            }
            // Other states handled by timeouts/intervals above

            // Apply transforms
            bird.style.left = `${birdPos.current.x}px`;
            bird.style.top = `${birdPos.current.y}px`;

            // trails removed per user request

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
                style={{ cursor: 'pointer' }}
            >
                Click to download resume
            </div>
            <div style={{
                transform: facingRight ? 'scaleX(1)' : 'scaleX(-1)',
                display: 'inline-block',
                transition: 'transform 0.1s' // Smooth turning
            }}>
                <img
                    id="bird-actor"
                    src={sprite}
                    alt="Screen Pet"
                    className={
                        (state.current === 'FLY_IN' || state.current === 'ROAMING') ? 'penguin-anim-slide' :
                            (state.current === 'IDLE' || state.current === 'IDLE_TOP_LEFT') ? '' : // No CSS anim, sprite only
                                (state.current === 'THUMBS_UP') ? 'penguin-anim-thumbs' :
                                    (state.current === 'JUMP') ? 'penguin-anim-thumbs' : '' // Reuse bounce for jump
                    }
                    style={{
                        width: '64px',
                        imageRendering: 'pixelated',
                        mixBlendMode: 'multiply',
                        display: 'block'
                    }}
                />
            </div>
        </div>
    );
};

export default ScreenPet;
