'use client';

import { motion } from 'framer-motion';
import { ICON_CONFIG, IconSize } from './iconConfig';

interface AnimatedTrophyIconProps {
    size?: IconSize | number;
    isHovered?: boolean;
}

export function AnimatedTrophyIcon({ size = 'lg', isHovered = false }: AnimatedTrophyIconProps) {
    const iconSize = typeof size === 'number' ? size : ICON_CONFIG.sizes[size];
    const timing = ICON_CONFIG.timings.trophy;
    const colors = ICON_CONFIG.colors;

    return (
        <motion.svg
            width={iconSize}
            height={iconSize}
            viewBox="0 0 48 48"
            fill="none"
            style={{ filter: `drop-shadow(0 0 8px ${colors.glowSoft})` }}
            animate={{
                y: isHovered ? [0, -3, 0] : [0, -1, 0],
            }}
            transition={{
                duration: timing,
                repeat: Infinity,
                ease: ICON_CONFIG.easing.gentle,
            }}
        >
            {/* Trophy cup */}
            <motion.path
                d="M16 8H32V20C32 24.4183 28.4183 28 24 28C19.5817 28 16 24.4183 16 20V8Z"
                stroke={colors.primary}
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* Left handle */}
            <motion.path
                d="M16 10H12C10 10 8 12 8 14C8 16 10 18 12 18H16"
                stroke={colors.primary}
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
            />

            {/* Right handle */}
            <motion.path
                d="M32 10H36C38 10 40 12 40 14C40 16 38 18 36 18H32"
                stroke={colors.primary}
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
            />

            {/* Stem */}
            <motion.path
                d="M24 28V34"
                stroke={colors.primary}
                strokeWidth="2.5"
                strokeLinecap="round"
            />

            {/* Base */}
            <motion.path
                d="M18 34H30V38H18V34Z"
                stroke={colors.primary}
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
            />

            {/* Shine sweep effect */}
            <motion.rect
                x="16"
                y="8"
                width="4"
                height="18"
                fill={`url(#shineGradient-trophy)`}
                animate={{
                    x: [16, 32, 16],
                }}
                transition={{
                    duration: timing,
                    repeat: Infinity,
                    ease: 'linear',
                }}
            />
            <defs>
                <linearGradient id="shineGradient-trophy" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="transparent" />
                    <stop offset="50%" stopColor="rgba(255,255,255,0.4)" />
                    <stop offset="100%" stopColor="transparent" />
                </linearGradient>
            </defs>

            {/* Sparkles */}
            {[
                { x: 12, y: 6, delay: 0 },
                { x: 36, y: 8, delay: 0.5 },
                { x: 24, y: 4, delay: 1 },
            ].map((spark, i) => (
                <motion.g key={i}>
                    <motion.circle
                        cx={spark.x}
                        cy={spark.y}
                        r="1.5"
                        fill={colors.white}
                        animate={{
                            opacity: isHovered ? [0, 1, 0] : [0, 0.7, 0],
                            scale: [0.5, 1.2, 0.5],
                        }}
                        transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            delay: spark.delay,
                        }}
                    />
                    {/* Star rays */}
                    <motion.path
                        d={`M${spark.x - 3} ${spark.y}H${spark.x + 3}M${spark.x} ${spark.y - 3}V${spark.y + 3}`}
                        stroke={colors.secondary}
                        strokeWidth="0.5"
                        animate={{
                            opacity: isHovered ? [0, 0.8, 0] : [0, 0.4, 0],
                            scale: [0.5, 1, 0.5],
                        }}
                        transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            delay: spark.delay,
                        }}
                    />
                </motion.g>
            ))}

            {/* Glow ring */}
            <motion.circle
                cx="24"
                cy="20"
                r="16"
                fill="none"
                stroke={colors.primary}
                strokeWidth="1"
                animate={{
                    opacity: isHovered ? [0.3, 0.6, 0.3] : [0.1, 0.3, 0.1],
                }}
                transition={{
                    duration: timing * 1.2,
                    repeat: Infinity,
                }}
                style={{ filter: 'blur(3px)' }}
            />
        </motion.svg>
    );
}
