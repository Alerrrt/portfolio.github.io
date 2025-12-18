'use client';

import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';
import { cn } from '@/lib/utils';

const ExternalLinkIcon = forwardRef(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
        isControlledRef.current = true;
        return {
            startAnimation: () => controls.start('animate'),
            stopAnimation: () => controls.start('normal'),
        };
    });

    const handleMouseEnter = useCallback((e) => {
        if (!isControlledRef.current) {
            controls.start('animate');
        } else {
            onMouseEnter?.(e);
        }
    }, [controls, onMouseEnter]);

    const handleMouseLeave = useCallback((e) => {
        if (!isControlledRef.current) {
            controls.start('normal');
        } else {
            onMouseLeave?.(e);
        }
    }, [controls, onMouseLeave]);

    const arrowVariants = {
        normal: { x: 0, y: 0 },
        animate: {
            x: [0, 2, 0],
            y: [0, -2, 0],
            transition: {
                duration: 0.5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse"
            }
        }
    };

    return (
        <div
            className={cn("select-none inline-flex items-center justify-center", className)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...props}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={size}
                height={size}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <motion.polyline
                    points="15 3 21 3 21 9"
                    variants={arrowVariants}
                    animate={controls}
                    initial="normal"
                />
                <motion.line
                    x1="10" y1="14" x2="21" y2="3"
                    variants={arrowVariants}
                    animate={controls}
                    initial="normal"
                />
            </svg>
        </div>
    );
});

ExternalLinkIcon.displayName = 'ExternalLinkIcon';

export { ExternalLinkIcon };
