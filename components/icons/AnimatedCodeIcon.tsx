'use client';

import { motion } from 'framer-motion';
import { ICON_CONFIG, IconSize } from './iconConfig';

interface AnimatedCodeIconProps {
    size?: IconSize | number;
    isHovered?: boolean;
}

export function AnimatedCodeIcon({ size = 'lg', isHovered = false }: AnimatedCodeIconProps) {
    const iconSize = typeof size === 'number' ? size : ICON_CONFIG.sizes[size];
    const timing = ICON_CONFIG.timings.code;
    const colors = ICON_CONFIG.colors;

    return (
        <motion.svg
            width={iconSize}
            height={iconSize}
            viewBox="0 0 48 48"
            fill="none"
            style={{ filter: `drop-shadow(0 0 8px ${colors.glowSoft})` }}
        >
            {/* Left bracket < */}
            <motion.path
                d="M18 12L8 24L18 36"
                stroke={colors.primary}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                animate={{
                    scale: isHovered ? [1, 1.15, 1] : [1, 1.05, 1],
                    x: isHovered ? [-2, 0, -2] : 0,
                }}
                transition={{
                    duration: timing,
                    repeat: Infinity,
                    ease: ICON_CONFIG.easing.smooth,
                }}
            />

            {/* Right bracket > */}
            <motion.path
                d="M30 12L40 24L30 36"
                stroke={colors.primary}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                animate={{
                    scale: isHovered ? [1, 1.15, 1] : [1, 1.05, 1],
                    x: isHovered ? [2, 0, 2] : 0,
                }}
                transition={{
                    duration: timing,
                    repeat: Infinity,
                    ease: ICON_CONFIG.easing.smooth,
                    delay: 0.2,
                }}
            />

            {/* Blinking cursor */}
            <motion.line
                x1="24"
                y1="16"
                x2="24"
                y2="32"
                stroke={colors.white}
                strokeWidth="2.5"
                strokeLinecap="round"
                animate={{
                    opacity: [0, 1, 1, 0],
                }}
                transition={{
                    duration: isHovered ? 0.5 : 0.8,
                    repeat: Infinity,
                    times: [0, 0.1, 0.9, 1],
                }}
            />

            {/* Code line indicators (visible on hover) */}
            <motion.g
                animate={{
                    opacity: isHovered ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
            >
                <motion.line
                    x1="20"
                    y1="20"
                    x2="28"
                    y2="20"
                    stroke={colors.secondary}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    animate={{ scaleX: [0, 1, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
                />
                <motion.line
                    x1="21"
                    y1="24"
                    x2="27"
                    y2="24"
                    stroke={colors.accent}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    animate={{ scaleX: [0, 1, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: 0.5 }}
                />
                <motion.line
                    x1="19"
                    y1="28"
                    x2="29"
                    y2="28"
                    stroke={colors.secondary}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    animate={{ scaleX: [0, 1, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: 0.8 }}
                />
            </motion.g>

            {/* Glow effect */}
            <motion.circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke={colors.primary}
                strokeWidth="0.5"
                animate={{
                    opacity: isHovered ? [0.3, 0.6, 0.3] : [0.1, 0.3, 0.1],
                    scale: isHovered ? [1, 1.1, 1] : 1,
                }}
                transition={{
                    duration: timing * 1.5,
                    repeat: Infinity,
                }}
                style={{ filter: `blur(2px)` }}
            />
        </motion.svg>
    );
}
