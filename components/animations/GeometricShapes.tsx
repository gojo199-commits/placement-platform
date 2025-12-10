'use client';

import { motion } from 'framer-motion';
import { ANIMATION_CONFIG } from '@/config/animationConfig';

export default function GeometricShapes() {
    const shapes = [
        { type: 'hexagon', x: '10%', y: '20%', size: 40, duration: 15 },
        { type: 'triangle', x: '85%', y: '15%', size: 30, duration: 12 },
        { type: 'hexagon', x: '15%', y: '70%', size: 35, duration: 18 },
        { type: 'triangle', x: '90%', y: '75%', size: 25, duration: 14 },
        { type: 'hexagon', x: '75%', y: '50%', size: 28, duration: 16 },
    ];

    return (
        <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
            {shapes.map((shape, i) => (
                <motion.div
                    key={i}
                    className="absolute"
                    style={{
                        left: shape.x,
                        top: shape.y,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        rotate: [0, 360],
                        opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{
                        duration: shape.duration,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: i * 2,
                    }}
                >
                    <svg
                        width={shape.size}
                        height={shape.size}
                        viewBox={shape.type === 'hexagon' ? '0 0 40 46' : '0 0 30 26'}
                    >
                        {shape.type === 'hexagon' ? (
                            <polygon
                                points="20,0 40,11.5 40,34.6 20,46.2 0,34.6 0,11.5"
                                stroke={ANIMATION_CONFIG.colors.accent}
                                strokeWidth="1"
                                fill="none"
                                opacity="0.3"
                            />
                        ) : (
                            <polygon
                                points="15,0 30,26 0,26"
                                stroke={ANIMATION_CONFIG.colors.accent}
                                strokeWidth="1"
                                fill="none"
                                opacity="0.3"
                            />
                        )}
                    </svg>
                </motion.div>
            ))}
        </div>
    );
}
