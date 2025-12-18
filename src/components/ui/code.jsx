'use client';

import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';
import { cn } from '@/lib/utils';

const CodeIcon = forwardRef(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
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
                <motion.polyline
                    points="16 18 22 12 16 6"
                    variants={{
                        normal: { x: 0 },
                        animate: {
                            x: [0, 3, 0],
                            transition: {
                                duration: 0.6,
                                ease: "easeInOut",
                                repeat: Infinity
                            }
                        }
                    }}
                    animate={controls}
                    initial="normal"
                />
                <motion.polyline
                    points="8 6 2 12 8 18"
                    variants={{
                        normal: { x: 0 },
                        animate: {
                            x: [0, -3, 0],
                            transition: {
                                duration: 0.6,
                                ease: "easeInOut",
                                repeat: Infinity
                            }
                        }
                    }}
                    animate={controls}
                    initial="normal"
                />
            </svg>
        </div>
    );
});

CodeIcon.displayName = 'CodeIcon';

export { CodeIcon };
