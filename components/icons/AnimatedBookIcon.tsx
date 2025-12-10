'use client';

import { motion } from 'framer-motion';
import { ICON_CONFIG, IconSize } from './iconConfig';

interface AnimatedBookIconProps {
    size?: IconSize | number;
    isHovered?: boolean;
}

export function AnimatedBookIcon({ size = 'lg', isHovered = false }: AnimatedBookIconProps) {
    const iconSize = typeof size === 'number' ? size : ICON_CONFIG.sizes[size];
    const timing = ICON_CONFIG.timings.book;
    const colors = ICON_CONFIG.colors;

    return (
        <motion.svg
            width={iconSize}
            height={iconSize}
            viewBox="0 0 48 48"
            fill="none"
            style={{ filter: `drop-shadow(0 0 8px ${colors.glowSoft})` }}
        >
            {/* Book base */}
            <motion.path
                d="M8 8V40C8 40 12 38 24 38C36 38 40 40 40 40V8C40 8 36 10 24 10C12 10 8 8 8 8Z"
                stroke={colors.primary}
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* Center spine */}
            <motion.line
                x1="24"
                y1="10"
                x2="24"
                y2="38"
                stroke={colors.primary}
                strokeWidth="2"
                strokeLinecap="round"
            />

            {/* Left page lines */}
            <motion.g>
                {[0, 1, 2, 3].map((i) => (
                    <motion.line
                        key={`left-${i}`}
                        x1="12"
                        y1={16 + i * 6}
                        x2="20"
                        y2={16 + i * 6}
                        stroke={colors.secondary}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        animate={{
                            opacity: [0.3, 1, 0.3],
                            scaleX: [0.8, 1, 0.8],
                        }}
                        transition={{
                            duration: timing,
                            repeat: Infinity,
                            delay: i * 0.2,
                        }}
                    />
                ))}
            </motion.g>

            {/* Right page lines */}
            <motion.g>
                {[0, 1, 2, 3].map((i) => (
                    <motion.line
                        key={`right-${i}`}
                        x1="28"
                        y1={16 + i * 6}
                        x2="36"
                        y2={16 + i * 6}
                        stroke={colors.secondary}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        animate={{
                            opacity: [0.3, 1, 0.3],
                            scaleX: [0.8, 1, 0.8],
                        }}
                        transition={{
                            duration: timing,
                            repeat: Infinity,
                            delay: 0.5 + i * 0.2,
                        }}
                    />
                ))}
            </motion.g>

            {/* Flipping page effect */}
            <motion.path
                d="M24 10C24 10 28 12 32 12C36 12 40 10 40 10"
                stroke={colors.accent}
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                animate={{
                    d: [
                        "M24 10C24 10 28 12 32 12C36 12 40 10 40 10",
                        "M24 10C24 10 24 14 24 14C24 14 24 10 24 10",
                        "M24 10C24 10 20 12 16 12C12 12 8 10 8 10",
                        "M24 10C24 10 24 14 24 14C24 14 24 10 24 10",
                        "M24 10C24 10 28 12 32 12C36 12 40 10 40 10",
                    ],
                    opacity: isHovered ? [0.8, 1, 0.8, 1, 0.8] : [0.4, 0.7, 0.4, 0.7, 0.4],
                }}
                transition={{
                    duration: timing * 2,
                    repeat: Infinity,
                    ease: ICON_CONFIG.easing.gentle,
                }}
            />

            {/* Knowledge particles rising */}
            {[0, 1, 2].map((i) => (
                <motion.circle
                    key={`particle-${i}`}
                    r="1.5"
                    fill={colors.white}
                    animate={{
                        cx: [16 + i * 8, 18 + i * 6, 16 + i * 8],
                        cy: [30, 6, 30],
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: timing * 1.5,
                        repeat: Infinity,
                        delay: i * 0.6,
                    }}
                />
            ))}

            {/* Glow effect on hover */}
            <motion.ellipse
                cx="24"
                cy="24"
                rx="20"
                ry="16"
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

            {/* Sparkle on top right */}
            <motion.g
                animate={{
                    opacity: isHovered ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
            >
                <motion.circle
                    cx="38"
                    cy="6"
                    r="2"
                    fill={colors.white}
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: 0.8,
                        repeat: Infinity,
                    }}
                />
            </motion.g>
        </motion.svg>
    );
}
