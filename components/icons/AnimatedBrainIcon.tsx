'use client';

import { motion } from 'framer-motion';
import { ICON_CONFIG, IconSize } from './iconConfig';

interface AnimatedBrainIconProps {
    size?: IconSize | number;
    isHovered?: boolean;
}

export function AnimatedBrainIcon({ size = 'lg', isHovered = false }: AnimatedBrainIconProps) {
    const iconSize = typeof size === 'number' ? size : ICON_CONFIG.sizes[size];
    const timing = ICON_CONFIG.timings.brain;
    const colors = ICON_CONFIG.colors;

    return (
        <motion.svg
            width={iconSize}
            height={iconSize}
            viewBox="0 0 48 48"
            fill="none"
            style={{ filter: `drop-shadow(0 0 10px ${colors.glowSoft})` }}
        >
            {/* Brain outline */}
            <motion.path
                d="M24 8C18 8 14 12 14 16C12 16 10 18 10 21C8 21 6 24 6 27C6 32 10 36 16 36C16 38 18 40 24 40C30 40 32 38 32 36C38 36 42 32 42 27C42 24 40 21 38 21C38 18 36 16 34 16C34 12 30 8 24 8Z"
                stroke={colors.primary}
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                animate={{
                    scale: isHovered ? [1, 1.05, 1] : 1,
                }}
                transition={{
                    duration: timing,
                    repeat: Infinity,
                    ease: ICON_CONFIG.easing.gentle,
                }}
            />

            {/* Neural pathways */}
            <motion.g>
                {/* Left pathway */}
                <motion.path
                    d="M16 20C18 22 20 24 24 24"
                    stroke={colors.secondary}
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                    animate={{
                        pathLength: [0, 1, 0],
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: timing * 0.8,
                        repeat: Infinity,
                        delay: 0,
                    }}
                />
                {/* Right pathway */}
                <motion.path
                    d="M32 20C30 22 28 24 24 24"
                    stroke={colors.secondary}
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                    animate={{
                        pathLength: [0, 1, 0],
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: timing * 0.8,
                        repeat: Infinity,
                        delay: timing * 0.3,
                    }}
                />
                {/* Center pathway */}
                <motion.path
                    d="M24 18V30"
                    stroke={colors.accent}
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                    animate={{
                        pathLength: [0, 1, 0],
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: timing * 0.6,
                        repeat: Infinity,
                        delay: timing * 0.5,
                    }}
                />
            </motion.g>

            {/* Synapse particles */}
            {[0, 1, 2, 3].map((i) => (
                <motion.circle
                    key={i}
                    r="2"
                    fill={colors.white}
                    animate={{
                        cx: [16 + i * 6, 18 + i * 4, 16 + i * 6],
                        cy: [28 - i * 2, 22 + i, 28 - i * 2],
                        opacity: isHovered ? [0, 1, 0] : [0, 0.6, 0],
                        scale: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: timing * 0.7,
                        repeat: Infinity,
                        delay: i * 0.4,
                    }}
                />
            ))}

            {/* Pulsing glow ring */}
            <motion.circle
                cx="24"
                cy="24"
                r="18"
                fill="none"
                stroke={colors.primary}
                strokeWidth="1"
                animate={{
                    scale: isHovered ? [1, 1.3, 1] : [1, 1.15, 1],
                    opacity: isHovered ? [0.4, 0.8, 0.4] : [0.2, 0.5, 0.2],
                }}
                transition={{
                    duration: timing,
                    repeat: Infinity,
                }}
                style={{ filter: 'blur(3px)' }}
            />
        </motion.svg>
    );
}
