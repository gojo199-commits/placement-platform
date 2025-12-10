'use client';

import { motion } from 'framer-motion';
import { ICON_CONFIG, IconSize } from './iconConfig';

interface AnimatedOrbitIconProps {
    size?: IconSize | number;
    isHovered?: boolean;
}

export function AnimatedOrbitIcon({ size = 'lg', isHovered = false }: AnimatedOrbitIconProps) {
    const iconSize = typeof size === 'number' ? size : ICON_CONFIG.sizes[size];
    const timing = ICON_CONFIG.timings.orbit;
    const colors = ICON_CONFIG.colors;

    return (
        <motion.svg
            width={iconSize}
            height={iconSize}
            viewBox="0 0 48 48"
            fill="none"
            style={{ filter: `drop-shadow(0 0 8px ${colors.glowSoft})` }}
        >
            {/* Outer orbit ring */}
            <motion.ellipse
                cx="24"
                cy="24"
                rx="18"
                ry="10"
                stroke={colors.primary}
                strokeWidth="1.5"
                fill="none"
                strokeDasharray="3 3"
                animate={{
                    rotate: [0, 360],
                }}
                transition={{
                    duration: timing * 2,
                    repeat: Infinity,
                    ease: 'linear',
                }}
                style={{ transformOrigin: 'center' }}
            />

            {/* Inner orbit ring */}
            <motion.ellipse
                cx="24"
                cy="24"
                rx="12"
                ry="6"
                stroke={colors.secondary}
                strokeWidth="1.5"
                fill="none"
                strokeDasharray="2 2"
                animate={{
                    rotate: [360, 0],
                }}
                transition={{
                    duration: timing * 1.5,
                    repeat: Infinity,
                    ease: 'linear',
                }}
                style={{ transformOrigin: 'center' }}
            />

            {/* Orbiting dots on outer ring */}
            {[0, 1, 2].map((i) => (
                <motion.circle
                    key={`outer-${i}`}
                    r="3"
                    fill={colors.white}
                    animate={{
                        cx: [
                            24 + 18 * Math.cos((i * 2 * Math.PI) / 3),
                            24 + 18 * Math.cos((i * 2 * Math.PI) / 3 + Math.PI),
                            24 + 18 * Math.cos((i * 2 * Math.PI) / 3),
                        ],
                        cy: [
                            24 + 10 * Math.sin((i * 2 * Math.PI) / 3),
                            24 + 10 * Math.sin((i * 2 * Math.PI) / 3 + Math.PI),
                            24 + 10 * Math.sin((i * 2 * Math.PI) / 3),
                        ],
                    }}
                    transition={{
                        duration: timing,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: i * (timing / 3),
                    }}
                    style={{
                        filter: isHovered ? `drop-shadow(0 0 4px ${colors.white})` : 'none',
                    }}
                />
            ))}

            {/* Orbiting dots on inner ring */}
            {[0, 1].map((i) => (
                <motion.circle
                    key={`inner-${i}`}
                    r="2"
                    fill={colors.accent}
                    animate={{
                        cx: [
                            24 + 12 * Math.cos((i * Math.PI) + Math.PI / 2),
                            24 + 12 * Math.cos((i * Math.PI) + Math.PI / 2 + 2 * Math.PI),
                        ],
                        cy: [
                            24 + 6 * Math.sin((i * Math.PI) + Math.PI / 2),
                            24 + 6 * Math.sin((i * Math.PI) + Math.PI / 2 + 2 * Math.PI),
                        ],
                    }}
                    transition={{
                        duration: timing * 0.7,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                />
            ))}

            {/* Center core */}
            <motion.circle
                cx="24"
                cy="24"
                r="5"
                fill={colors.primary}
                animate={{
                    scale: isHovered ? [1, 1.3, 1] : [1, 1.15, 1],
                }}
                transition={{
                    duration: timing * 0.5,
                    repeat: Infinity,
                }}
            />

            {/* Center glow ring */}
            <motion.circle
                cx="24"
                cy="24"
                r="8"
                fill="none"
                stroke={colors.primary}
                strokeWidth="2"
                animate={{
                    opacity: isHovered ? [0.4, 0.8, 0.4] : [0.2, 0.5, 0.2],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: timing * 0.4,
                    repeat: Infinity,
                }}
                style={{ filter: 'blur(2px)' }}
            />

            {/* Light trails on hover */}
            {isHovered && (
                <motion.g>
                    <motion.path
                        d="M24 6C24 6 30 14 34 18"
                        stroke={colors.glowSoft}
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        animate={{
                            opacity: [0, 0.6, 0],
                            pathLength: [0, 1, 0],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                        }}
                    />
                    <motion.path
                        d="M24 42C24 42 18 34 14 30"
                        stroke={colors.glowSoft}
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        animate={{
                            opacity: [0, 0.6, 0],
                            pathLength: [0, 1, 0],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: 0.5,
                        }}
                    />
                </motion.g>
            )}
        </motion.svg>
    );
}
