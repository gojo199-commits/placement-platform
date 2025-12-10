'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ANIMATION_CONFIG } from '@/config/animationConfig';
import useMousePosition from '@/hooks/useMousePosition';

export default function CustomCursor() {
    const mousePos = useMousePosition();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        setIsVisible(!isMobile);
    }, []);

    if (!isVisible) return null;

    return (
        <>
            {/* Main cursor dot */}
            <motion.div
                className="fixed pointer-events-none z-50 rounded-full"
                style={{
                    width: 8,
                    height: 8,
                    backgroundColor: ANIMATION_CONFIG.colors.accent,
                    boxShadow: `0 0 10px rgba(${ANIMATION_CONFIG.colors.accentRGB}, 0.8)`,
                }}
                animate={{
                    x: mousePos.x - 4,
                    y: mousePos.y - 4,
                }}
                transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 28,
                }}
            />

            {/* Trail circle */}
            <motion.div
                className="fixed pointer-events-none z-40 rounded-full border-2"
                style={{
                    width: 32,
                    height: 32,
                    borderColor: ANIMATION_CONFIG.colors.accent,
                    opacity: 0.3,
                }}
                animate={{
                    x: mousePos.x - 16,
                    y: mousePos.y - 16,
                }}
                transition={{
                    type: 'spring',
                    stiffness: 150,
                    damping: 15,
                }}
            />
        </>
    );
}
