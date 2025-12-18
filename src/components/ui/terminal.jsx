'use client';;
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

const LINE_VARIANTS = {
  normal: { opacity: 1 },
  animate: {
    opacity: [1, 0, 1],
    transition: {
      duration: 0.8,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

const TerminalIcon = forwardRef(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
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
      className={cn(className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round">
        <polyline points="4 17 10 11 4 5" />
        <motion.line
          x1="12"
          x2="20"
          y1="19"
          y2="19"
          variants={LINE_VARIANTS}
          animate={controls}
          initial="normal" />
      </svg>
    </div>
  );
});

TerminalIcon.displayName = 'TerminalIcon';

export { TerminalIcon };
