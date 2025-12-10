'use client';

import { motion } from 'framer-motion';
import { ICON_CONFIG, IconSize } from './iconConfig';

interface AnimatedTargetIconProps {
    size?: IconSize | number;
    isHovered?: boolean;
}

export function AnimatedTargetIcon({ size = 'lg', isHovered = false }: AnimatedTargetIconProps) {
    const iconSize = typeof size === 'number' ? size : ICON_CONFIG.sizes[size];
    const timing = ICON_CONFIG.timings.target;
    const colors = ICON_CONFIG.colors;

    return (
        <motion.svg
            width={iconSize}
            height={iconSize}
            viewBox="0 0 48 48"
            fill="none"
            style={{ filter: `drop-shadow(0 0 8px ${colors.glowSoft})` }}
        >
            {/* Outer ring */}
            <motion.circle
                cx="24"
                cy="24"
                r="18"
                stroke={colors.primary}
                strokeWidth="2"
                fill="none"
                animate={{
                    scale: isHovered ? [1, 1.05, 1] : 1,
                }}
                transition={{
                    duration: timing,
                    repeat: Infinity,
                }}
            />

            {/* Middle ring */}
            <motion.circle
                cx="24"
                cy="24"
                r="12"
                stroke={colors.secondary}
                strokeWidth="2"
                fill="none"
                animate={{
                    scale: isHovered ? [1, 1.08, 1] : [1, 1.03, 1],
                }}
                transition={{
                    duration: timing * 0.8,
                    repeat: Infinity,
                    delay: 0.2,
                }}
            />

            {/* Inner ring */}
            <motion.circle
                cx="24"
                cy="24"
                r="6"
                stroke={colors.primary}
                strokeWidth="2"
                fill="none"
                animate={{
                    scale: isHovered ? [1, 1.1, 1] : [1, 1.05, 1],
                }}
                transition={{
                    duration: timing * 0.6,
                    repeat: Infinity,
                    delay: 0.4,
                }}
            />

            {/* Bullseye center with pulse */}
            <motion.circle
                cx="24"
                cy="24"
                r="3"
                fill={colors.primary}
                animate={{
                    scale: isHovered ? [1, 1.4, 1] : [1, 1.2, 1],
                    opacity: [0.8, 1, 0.8],
                }}
                transition={{
                    duration: timing * 0.5,
                    repeat: Infinity,
                }}
            />

            {/* Ripple rings expanding outward */}
            {[0, 1, 2].map((i) => (
                <motion.circle
                    key={i}
                    cx="24"
                    cy="24"
                    r="8"
                    fill="none"
                    stroke={colors.accent}
                    strokeWidth="1"
                    animate={{
                        r: [8, 22, 8],
                        opacity: [0.6, 0, 0.6],
                    }}
                    transition={{
                        duration: timing,
                        repeat: Infinity,
                        delay: i * (timing / 3),
                    }}
                />
            ))}

            {/* Crosshair lines (visible on hover) */}
            <motion.g
                animate={{
                    opacity: isHovered ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
            >
                <motion.line
                    x1="24"
                    y1="4"
                    x2="24"
                    y2="14"
                    stroke={colors.white}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    animate={{ y1: [4, 6, 4] }}
                    transition={{ duration: 1, repeat: Infinity }}
                />
                <motion.line
                    x1="24"
                    y1="34"
                    x2="24"
                    y2="44"
                    stroke={colors.white}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    animate={{ y2: [44, 42, 44] }}
                    transition={{ duration: 1, repeat: Infinity }}
                />
                <motion.line
                    x1="4"
                    y1="24"
                    x2="14"
                    y2="24"
                    stroke={colors.white}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    animate={{ x1: [4, 6, 4] }}
                    transition={{ duration: 1, repeat: Infinity }}
                />
                <motion.line
                    x1="34"
                    y1="24"
                    x2="44"
                    y2="24"
                    stroke={colors.white}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    animate={{ x2: [44, 42, 44] }}
                    transition={{ duration: 1, repeat: Infinity }}
                />
            </motion.g>

            {/* Center glow */}
            <motion.circle
                cx="24"
                cy="24"
                r="8"
                fill={colors.primary}
                animate={{
                    opacity: isHovered ? [0.2, 0.4, 0.2] : [0.1, 0.2, 0.1],
                }}
                transition={{
                    duration: timing * 0.5,
                    repeat: Infinity,
                }}
                style={{ filter: 'blur(4px)' }}
            />
        </motion.svg>
    );
}
