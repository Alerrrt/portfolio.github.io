'use client';

import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';
import { cn } from '@/lib/utils';

const AwardIcon = forwardRef(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
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
                <motion.circle
                    cx="12" cy="8" r="7"
                    variants={{
                        normal: { rotate: 0 },
                        animate: {
                            rotate: [0, -10, 10, -10, 0],
                            transition: {
                                duration: 1,
                                ease: "easeInOut",
                                repeat: Infinity
                            }
                        }
                    }}
                    style={{ originX: 0.5, originY: 0.5 }}
                    animate={controls}
                    initial="normal"
                />
                <motion.polyline
                    points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"
                    variants={{
                        normal: { y: 0 },
                        animate: {
                            y: [0, 2, 0],
                            transition: {
                                duration: 1,
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

AwardIcon.displayName = 'AwardIcon';

export { AwardIcon };
