'use client';

import { motion } from 'framer-motion';
import { ANIMATION_CONFIG } from '@/config/animationConfig';

export default function LightRays() {
    const rays = Array.from({ length: ANIMATION_CONFIG.lightRays.count });

    return (
        <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
            {rays.map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute"
                    style={{
                        left: `${(i / ANIMATION_CONFIG.lightRays.count) * 100}%`,
                        width: `${ANIMATION_CONFIG.lightRays.width}px`,
                        height: '200%',
                        background: `linear-gradient(to bottom, 
              transparent 0%, 
              rgba(${ANIMATION_CONFIG.colors.accentRGB}, ${ANIMATION_CONFIG.lightRays.opacity}) 50%, 
              transparent 100%)`,
                    }}
                    animate={{
                        y: ['-100%', '-200%'],
                    }}
                    transition={{
                        duration: ANIMATION_CONFIG.lightRays.speed / 1000,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: i * (ANIMATION_CONFIG.lightRays.speed / ANIMATION_CONFIG.lightRays.count / 1000),
                    }}
                />
            ))}
        </div>
    );
}
