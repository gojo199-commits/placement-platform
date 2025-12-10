'use client';

import { motion } from 'framer-motion';
import { ICON_CONFIG, IconSize } from './iconConfig';

interface AnimatedTrendIconProps {
    size?: IconSize | number;
    isHovered?: boolean;
}

export function AnimatedTrendIcon({ size = 'lg', isHovered = false }: AnimatedTrendIconProps) {
    const iconSize = typeof size === 'number' ? size : ICON_CONFIG.sizes[size];
    const timing = ICON_CONFIG.timings.trend;
    const colors = ICON_CONFIG.colors;

    return (
        <motion.svg
            width={iconSize}
            height={iconSize}
            viewBox="0 0 48 48"
            fill="none"
            style={{ filter: `drop-shadow(0 0 8px ${colors.glowSoft})` }}
        >
            {/* Background bars */}
            {[0, 1, 2, 3].map((i) => (
                <motion.rect
                    key={i}
                    x={10 + i * 9}
                    y={36}
                    width="6"
                    height="0"
                    fill={colors.glowSoft}
                    rx="1"
                    animate={{
                        height: [0, 8 + i * 6, 0],
                        y: [36, 28 - i * 6, 36],
                    }}
                    transition={{
                        duration: timing * 1.5,
                        repeat: Infinity,
                        delay: i * 0.2,
                    }}
                />
            ))}

            {/* Trend line with drawing animation */}
            <motion.path
                d="M8 36L16 28L26 32L40 12"
                stroke={colors.primary}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                animate={{
                    pathLength: [0, 1, 1, 0],
                    opacity: [0, 1, 1, 0],
                }}
                transition={{
                    duration: timing * 2,
                    repeat: Infinity,
                    times: [0, 0.4, 0.8, 1],
                }}
            />

            {/* Arrow head */}
            <motion.path
                d="M34 10L40 12L38 18"
                stroke={colors.primary}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                animate={{
                    opacity: [0, 1, 1, 0],
                    scale: isHovered ? [0.8, 1.2, 1, 0.8] : [0.8, 1, 1, 0.8],
                }}
                transition={{
                    duration: timing * 2,
                    repeat: Infinity,
                    times: [0, 0.4, 0.8, 1],
                }}
            />

            {/* Data points */}
            {[
                { x: 8, y: 36, delay: 0.1 },
                { x: 16, y: 28, delay: 0.25 },
                { x: 26, y: 32, delay: 0.4 },
                { x: 40, y: 12, delay: 0.55 },
            ].map((point, i) => (
                <motion.circle
                    key={i}
                    cx={point.x}
                    cy={point.y}
                    r="2.5"
                    fill={colors.white}
                    stroke={colors.primary}
                    strokeWidth="1.5"
                    animate={{
                        opacity: [0, 1, 1, 0],
                        scale: isHovered ? [0, 1.3, 1, 0] : [0, 1, 1, 0],
                    }}
                    transition={{
                        duration: timing * 2,
                        repeat: Infinity,
                        delay: point.delay * timing,
                        times: [0, 0.3, 0.8, 1],
                    }}
                />
            ))}

            {/* Arrow pulse at peak */}
            <motion.circle
                cx="40"
                cy="12"
                r="6"
                fill={colors.primary}
                animate={{
                    opacity: isHovered ? [0, 0.5, 0] : [0, 0.3, 0],
                    scale: [0.5, 1.5, 0.5],
                }}
                transition={{
                    duration: timing,
                    repeat: Infinity,
                    delay: timing * 0.5,
                }}
                style={{ filter: 'blur(3px)' }}
            />

            {/* Success indicator on hover */}
            <motion.g
                animate={{
                    opacity: isHovered ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
            >
                <motion.text
                    x="42"
                    y="10"
                    fill={colors.accent}
                    fontSize="10"
                    fontWeight="bold"
                    animate={{
                        y: [10, 6, 10],
                    }}
                    transition={{
                        duration: 0.8,
                        repeat: Infinity,
                    }}
                >
                    ↑
                </motion.text>
            </motion.g>
        </motion.svg>
    );
}
