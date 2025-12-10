'use client';

import { useRef, ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';
import { ANIMATION_CONFIG } from '@/config/animationConfig';

interface ScrollRevealProps {
    children: ReactNode;
    direction?: 'up' | 'down' | 'left' | 'right';
    delay?: number;
    className?: string;
}

export default function ScrollReveal({
    children,
    direction = 'up',
    delay = 0,
    className = '',
}: ScrollRevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        once: true,
        amount: ANIMATION_CONFIG.scroll.sectionRevealThreshold
    });

    const directionOffset = {
        up: { y: 50, x: 0 },
        down: { y: -50, x: 0 },
        left: { x: 50, y: 0 },
        right: { x: -50, y: 0 },
    };

    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{
                opacity: 0,
                ...directionOffset[direction],
                filter: 'blur(4px)',
            }}
            animate={isInView ? {
                opacity: 1,
                x: 0,
                y: 0,
                filter: 'blur(0px)',
            } : {}}
            transition={{
                duration: ANIMATION_CONFIG.durations.sectionReveal / 1000,
                delay,
                ease: [0.22, 1, 0.36, 1],
            }}
        >
            {children}
        </motion.div>
    );
}
