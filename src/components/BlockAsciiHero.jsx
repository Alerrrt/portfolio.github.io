import React, { useRef, useEffect } from 'react';

const BlockAsciiHero = () => {
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
        const cellSize = 10;
        const fontName = 'monospace';

        // Character Maps
        // "Texture Pass-Through": '·' is the background.
        const bgChar = '·';
        // Density Gradient for face details (Lightest to Darkest)
        const densityChars = ' .:-=+*#%@';

        // Colors
        const colorBg = '#E5E5E5'; // Light Grey for texture
        const colorFace = '#111111'; // Dark for face details
        const canvasBgColor = '#FFFFFF';

        const renderFrame = () => {
            if (!ctx || !image.complete) return;

            // 1. Dynamic Sizing (Responsiveness)
            const width = window.innerWidth;
            const height = window.innerHeight;

            // Update Canvas Size
            if (canvas.width !== width || canvas.height !== height) {
                canvas.width = width;
                canvas.height = height;
            }

            const cols = Math.ceil(width / cellSize);
            const rows = Math.ceil(height / cellSize);

            // 2. Prepare Image Data
            const imgAspect = image.width / image.height;
            // Target Height: Let's scale it to fit nicely (e.g., 80% screen height)
            const targetHeightGrid = Math.floor(rows * 0.8);
            const targetWidthGrid = Math.floor(targetHeightGrid * imgAspect);

            // Offscreen canvas for sampling
            const offCanvas = document.createElement('canvas');
            offCanvas.width = targetWidthGrid;
            offCanvas.height = targetHeightGrid;
            const offCtx = offCanvas.getContext('2d');

            offCtx.drawImage(image, 0, 0, targetWidthGrid, targetHeightGrid);
            const imageData = offCtx.getImageData(0, 0, targetWidthGrid, targetHeightGrid).data;

            // 3. Offsets (Responsive Alignment)
            // On desktop: Right align (55-60%)
            // On mobile: Center or adjust to avoid text overlap (which is typically top/center)

            let startX;
            let startY;

            if (width < 768) {
                // Mobile: Place it at the bottom or make it a subtle background
                // "Dynamic for mobile": Let's center it at the bottom half to avoid the top text
                startX = Math.floor((cols - targetWidthGrid) / 2);
                startY = Math.floor(rows - targetHeightGrid * 1.0); // Push to bottom
                // Ensure it doesn't go off screen
                if (startY < 0) startY = 0;
            } else {
                // Desktop: Right Align
                startX = Math.floor(cols * 0.55);
                startY = Math.floor((rows - targetHeightGrid) / 2);
            }

            // 4. Global Rendering Loop
            // Clear Canvas
            ctx.fillStyle = canvasBgColor;
            ctx.fillRect(0, 0, width, height);

            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            for (let y = 0; y < rows; y++) {
                for (let x = 0; x < cols; x++) {
                    const px = x * cellSize + cellSize / 2;
                    const py = y * cellSize + cellSize / 2;

                    // Default Context (Background)
                    let char = bgChar;
                    let color = colorBg;
                    let fontWeight = '300';

                    // Check if inside Image Bounds
                    const imgX = x - startX;
                    const imgY = y - startY;

                    if (imgX >= 0 && imgX < targetWidthGrid && imgY >= 0 && imgY < targetHeightGrid) {
                        // Sample Pixel
                        const idx = (imgY * targetWidthGrid + imgX) * 4;
                        const r = imageData[idx];
                        const g = imageData[idx + 1];
                        const b = imageData[idx + 2];
                        const a = imageData[idx + 3];

                        // Texture Pass-Through Logic
                        // If Transparent OR Bright -> Keep Background
                        const brightness = (r + g + b) / 3;
                        const isWhite = brightness > 220; // High brightness threshold
                        const isTransparent = a < 50;

                        if (!isWhite && !isTransparent) {
                            // It is DARK (Face Feature)
                            // Map brightness 0-220 to density chars
                            const normalized = 1 - (brightness / 220); // 0(light) to 1(dark)
                            const charIdx = Math.floor(normalized * (densityChars.length - 1));
                            const safeIdx = Math.max(0, Math.min(densityChars.length - 1, charIdx));

                            char = densityChars[safeIdx];

                            // Visual Pop: Darkest chars get bold black
                            // Lighter detail chars get slightly softer treatment? 
                            // Let's stick to requested Colors.
                            color = colorFace;
                            fontWeight = '900'; // Bold for visibility
                        }
                    }

                    // Render Cell
                    ctx.fillStyle = color;
                    ctx.font = `${fontWeight} ${cellSize}px ${fontName}`;
                    ctx.fillText(char, px, py);
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
        </div>
    );
};

export default BlockAsciiHero;
