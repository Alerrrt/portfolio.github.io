import React, { useRef, useEffect } from 'react';

const AsciiBackground = () => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext('2d');
        const image = new Image();
        image.src = '/ascii-portrait.png';

        // Configuration
        const gridX = 10; // Horizontal spacing
        const gridY = 12; // Vertical spacing
        const safeZonePct = 0.5; // Left 40% is strictly safe (dots only). 
        // The user said "Left 50%", but often a slight overlap feels more organic. 
        // Let's stick to user request: "Left 50% ... must ONLY have faint background dots" -> 0.5

        const renderFrame = () => {
            if (!ctx || !image.complete) return;

            const width = container.offsetWidth;
            const height = container.offsetHeight;

            // Update canvas size
            if (canvas.width !== width || canvas.height !== height) {
                canvas.width = width;
                canvas.height = height;
            }

            const cols = Math.ceil(width / gridX);
            const rows = Math.ceil(height / gridY);

            // 1. Setup Offscreen Canvas for Image Sampling
            // "Right-Align: Only render the heavy 'Face' lines on the right 50% of the screen."
            // We will position the image to cover the Right 50%.

            const offscreen = document.createElement('canvas');
            offscreen.width = width;
            offscreen.height = height;
            const offCtx = offscreen.getContext('2d');

            // Logic to position image
            // We want it on the right half.
            const scaleFactor = 0.9;
            const imgAspect = image.width / image.height;

            const drawHeight = height * scaleFactor;
            const drawWidth = drawHeight * imgAspect;

            // Position: Anchored Right with some padding, Centered Vertically
            const rightPadding = width * 0.05;
            const drawX = width - drawWidth - rightPadding;
            const drawY = (height - drawHeight) / 2;

            // Draw image to offscreen context
            offCtx.drawImage(image, drawX, drawY, drawWidth, drawHeight);

            const imageData = offCtx.getImageData(0, 0, width, height).data;

            // 2. Clear Main Canvas - WHITE Background
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, width, height);

            // 3. Loop Grid
            for (let y = 0; y < rows; y++) {
                for (let x = 0; x < cols; x++) {
                    // Center of the cell
                    const px = x * gridX;
                    const py = y * gridY;

                    // Check Safe Zone
                    const isSafeZone = px < width * safeZonePct;

                    // Sample pixel
                    const pIndex = (Math.floor(py + gridY / 2) * width + Math.floor(px + gridX / 2)) * 4;

                    let brightness = 255; // Default white
                    let alpha = 0;

                    if (pIndex >= 0 && pIndex < imageData.length) {
                        const r = imageData[pIndex];
                        const g = imageData[pIndex + 1];
                        const b = imageData[pIndex + 2];
                        alpha = imageData[pIndex + 3]; // Transparency
                        brightness = (r + g + b) / 3;
                    }

                    // Logic:
                    // If Safe Zone OR Pixel is Transparent OR Pixel is Very Bright -> Draw Dot
                    const isEmpty = isSafeZone || alpha < 20 || brightness > 220;

                    if (isEmpty) {
                        // Draw Background Dot
                        // "tiny, faint dot (.) or a small circle ... in light grey (#cccccc)"
                        ctx.beginPath();
                        ctx.fillStyle = '#CCCCCC'; // Light grey
                        // Center the dot in the grid cell
                        ctx.arc(px + gridX / 2, py + gridY / 2, 1, 0, Math.PI * 2);
                        ctx.fill();
                    } else {
                        // Draw Face Line
                        // "Darker pixel = Longer/Thicker line."

                        // Normalize darkness (0 = white, 1 = black)
                        // Brightness 0 -> Darkness 1. Brightness 220 -> Darkness 0.
                        const darkness = Math.max(0, Math.min(1, (220 - brightness) / 220));

                        // Modulation
                        // Max width = gridX (minus padding)
                        // Max height = gridY (minus padding)

                        // Let's create lines.
                        // "Horizontal Line (ctx.fillRect) ... width or thickness determined by darkness"

                        const maxWidth = gridX * 0.9;
                        const minWidth = 2;

                        // Line Width based on darkness
                        const lineWidth = minWidth + (maxWidth - minWidth) * darkness;

                        // Thickness (Height) could also be modulated or fixed.
                        // Let's modulate thickness slightly too for "boldness"
                        const maxHeight = gridY * 0.6;
                        const minHeight = 1;
                        const lineHeight = minHeight + (maxHeight - minHeight) * darkness;

                        ctx.fillStyle = '#111111'; // Nearly Black ink

                        // Center the rect
                        const rx = px + (gridX - lineWidth) / 2;
                        const ry = py + (gridY - lineHeight) / 2;

                        ctx.fillRect(rx, ry, lineWidth, lineHeight);
                    }
                }
            }
        };

        image.onload = renderFrame;

        const handleResize = () => {
            renderFrame();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden bg-white z-0">
            <canvas ref={canvasRef} className="block" />
            {/* Optional: Subtle paper grain overlay? */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
            />
            {/* Subtle vignette/fade to keep corners clean */}
            <div className="absolute inset-0 pointer-events-none z-10"
                style={{
                    background: 'radial-gradient(circle at center, transparent 60%, rgba(255,255,255,0.8) 100%)'
                }}
            />
        </div>
    );
};

export default AsciiBackground;
