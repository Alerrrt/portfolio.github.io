'use client';

import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';
import { cn } from '@/lib/utils';

const CalendarIcon = forwardRef(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
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
                <motion.rect
                    width="18" height="18" x="3" y="4" rx="2" ry="2"
                    variants={{
                        normal: { rotate: 0 },
                        animate: {
                            rotate: [0, -5, 5, -5, 0],
                            transition: {
                                duration: 0.8,
                                ease: "easeInOut",
                                repeat: Infinity
                            }
                        }
                    }}
                    style={{ originX: 0.5, originY: 0.5 }}
                    animate={controls}
                    initial="normal"
                />
                <line x1="16" x2="16" y1="2" y2="6" />
                <line x1="8" x2="8" y1="2" y2="6" />
                <line x1="3" x2="21" y1="10" y2="10" />
            </svg>
        </div>
    );
});

CalendarIcon.displayName = 'CalendarIcon';

export { CalendarIcon };
