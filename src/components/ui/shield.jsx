'use client';

import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';
import { cn } from '@/lib/utils';

const ShieldIcon = forwardRef(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
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
                <motion.path
                    d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"
                    variants={{
                        normal: { scale: 1 },
                        animate: {
                            scale: [1, 1.1, 1],
                            transition: {
                                duration: 0.8,
                                ease: "easeInOut",
                                repeat: Infinity
                            }
                        }
                    }}
                    animate={controls}
                    initial="normal"
                    style={{ originX: 0.5, originY: 0.5 }}
                />
            </svg>
        </div>
    );
});

ShieldIcon.displayName = 'ShieldIcon';

export { ShieldIcon };
