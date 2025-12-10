'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ANIMATION_CONFIG } from '@/config/animationConfig';
import useMousePosition from '@/hooks/useMousePosition';

export default function MagneticButton() {
    const buttonRef = useRef<HTMLAnchorElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [buttonPos, setButtonPos] = useState({ x: 0, y: 0 });
    const mousePos = useMousePosition();

    useEffect(() => {
        if (buttonRef.current && isHovered) {
            const rect = buttonRef.current.getBoundingClientRect();
            const buttonCenter = {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2,
            };

            const distance = Math.sqrt(
                Math.pow(mousePos.x - buttonCenter.x, 2) +
                Math.pow(mousePos.y - buttonCenter.y, 2)
            );

            if (distance < ANIMATION_CONFIG.magnetic.radius) {
                const angle = Math.atan2(
                    mousePos.y - buttonCenter.y,
                    mousePos.x - buttonCenter.x
                );
                const strength = (1 - distance / ANIMATION_CONFIG.magnetic.radius) *
                    ANIMATION_CONFIG.magnetic.strength;

                setButtonPos({
                    x: Math.cos(angle) * strength * 20,
                    y: Math.sin(angle) * strength * 20,
                });
            } else {
                setButtonPos({ x: 0, y: 0 });
            }
        } else {
            setButtonPos({ x: 0, y: 0 });
        }
    }, [mousePos, isHovered]);

    return (
        <motion.div
            animate={{
                x: buttonPos.x,
                y: buttonPos.y,
            }}
            transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20,
            }}
        >
            <Link
                ref={buttonRef}
                href="/register"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative inline-flex items-center gap-2 px-10 py-5 rounded-full font-semibold text-xl overflow-hidden group"
                style={{
                    backgroundColor: ANIMATION_CONFIG.colors.primary,
                    color: ANIMATION_CONFIG.colors.accent,
                }}
            >
                {/* Breathing animation background */}
                <motion.div
                    className="absolute inset-0 -z-10"
                    animate={{
                        scale: [1, 1.02, 1],
                        opacity: [0.8, 1, 0.8],
                    }}
                    transition={{
                        duration: ANIMATION_CONFIG.durations.buttonPulse / 1000,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    style={{
                        backgroundColor: ANIMATION_CONFIG.colors.primary,
                    }}
                />

                {/* Hover glow */}
                <motion.div
                    className="absolute inset-0 rounded-full -z-10"
                    animate={{
                        opacity: isHovered ? 1 : 0,
                        boxShadow: isHovered
                            ? `0 0 40px rgba(${ANIMATION_CONFIG.colors.accentRGB}, 0.5)`
                            : `0 0 0px rgba(${ANIMATION_CONFIG.colors.accentRGB}, 0)`,
                    }}
                    transition={{ duration: 0.3 }}
                />

                {/* Particle effect on hover */}
                {isHovered && (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full">
                        {[...Array(6)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-1 h-1 rounded-full"
                                style={{
                                    backgroundColor: ANIMATION_CONFIG.colors.accent,
                                    left: '50%',
                                    bottom: '20%',
                                }}
                                initial={{ y: 0, opacity: 1, x: 0 }}
                                animate={{
                                    y: -40,
                                    x: (i - 2.5) * 12,
                                    opacity: 0,
                                }}
                                transition={{
                                    duration: 0.8,
                                    repeat: Infinity,
                                    delay: i * 0.1,
                                }}
                            />
                        ))}
                    </div>
                )}

                <span style={{ fontFamily: 'sans-serif', fontWeight: 500 }}>Let's </span>
                <span style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontWeight: 600, fontStyle: 'italic', letterSpacing: '0.03em' }}>Ascend</span>

                <motion.span
                    animate={{ x: isHovered ? 5 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ArrowRight className="w-6 h-6" />
                </motion.span>
            </Link>
        </motion.div>
    );
}
