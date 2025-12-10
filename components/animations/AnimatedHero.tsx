'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ANIMATION_CONFIG } from '@/config/animationConfig';
import MagneticButton from './MagneticButton';
import useReducedMotion from '@/hooks/useReducedMotion';

export default function AnimatedHero() {
    const whereRef = useRef<HTMLSpanElement>(null);
    const careersRef = useRef<HTMLSpanElement>(null);
    const ascendRef = useRef<HTMLSpanElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        if (prefersReducedMotion) {
            // Show all elements immediately without animation
            gsap.set([whereRef.current, careersRef.current, ascendRef.current, buttonRef.current], {
                opacity: 1,
                y: 0,
                scale: 1,
                filter: 'blur(0px)',
            });
            return;
        }

        const ctx = gsap.context(() => {
            // Master timeline
            const tl = gsap.timeline({ defaults: { ease: ANIMATION_CONFIG.easings.smooth } });

            // Stage 1: "Where" entrance (0 - 0.8s)
            tl.fromTo(
                whereRef.current,
                {
                    opacity: 0,
                    y: 30,
                    filter: 'blur(10px)',
                },
                {
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    duration: ANIMATION_CONFIG.durations.whereEntry / 1000,
                    ease: ANIMATION_CONFIG.easings.bounce,
                },
                0
            );

            // Stage 2: "Careers" explosive entrance (0.6 - 1.8s)
            tl.fromTo(
                careersRef.current,
                {
                    opacity: 0,
                    scale: 0.8,
                    filter: 'blur(8px)',
                },
                {
                    opacity: 1,
                    scale: 1,
                    filter: 'blur(0px)',
                    duration: ANIMATION_CONFIG.durations.careersEntry / 1000,
                    ease: ANIMATION_CONFIG.easings.elastic,
                },
                0.6
            );

            // Add glow pulse to Careers
            tl.to(
                careersRef.current,
                {
                    textShadow: `0 0 40px rgba(${ANIMATION_CONFIG.colors.accentRGB}, 0.8), 0 0 60px rgba(${ANIMATION_CONFIG.colors.accentRGB}, 0.5)`,
                    duration: 0.4,
                    yoyo: true,
                    repeat: 1,
                },
                1.0
            );

            // Stage 3: "Ascend" rising entrance (1.2 - 2.5s)
            tl.fromTo(
                ascendRef.current,
                {
                    opacity: 0,
                    y: 50,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: ANIMATION_CONFIG.durations.ascendEntry / 1000,
                    ease: ANIMATION_CONFIG.easings.smooth,
                },
                1.2
            );

            // Stage 4: Button entrance
            tl.fromTo(
                buttonRef.current,
                {
                    opacity: 0,
                    y: 30,
                    scale: 0.9,
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    ease: ANIMATION_CONFIG.easings.bounce,
                },
                2.0
            );

            // Idle animations after entrance
            tl.add(() => {
                // Continuous glow pulse on "Careers"
                gsap.to(careersRef.current, {
                    textShadow: `0 0 30px rgba(${ANIMATION_CONFIG.colors.accentRGB}, 0.7), 0 0 50px rgba(${ANIMATION_CONFIG.colors.accentRGB}, 0.4)`,
                    duration: 1.5,
                    yoyo: true,
                    repeat: -1,
                    ease: 'sine.inOut',
                });

                // Subtle float on "Ascend"
                gsap.to(ascendRef.current, {
                    y: -8,
                    duration: 2.5,
                    yoyo: true,
                    repeat: -1,
                    ease: 'sine.inOut',
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, [prefersReducedMotion]);

    return (
        <div ref={containerRef} className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4 pt-20">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-center mb-12">
                <span
                    ref={whereRef}
                    className="inline-block opacity-0"
                    style={{
                        color: '#0d1b2a',
                        fontFamily: 'var(--font-cormorant), Georgia, serif',
                        fontWeight: 700,
                        letterSpacing: '0.02em',
                        textShadow: '0 0 20px rgba(13, 27, 42, 0.6), 0 0 40px rgba(13, 27, 42, 0.4)'
                    }}
                >
                    Where{' '}
                </span>
                <span
                    ref={careersRef}
                    className="inline-block opacity-0"
                    style={{
                        color: '#ffc107',
                        fontFamily: 'var(--font-dancing), cursive',
                        fontStyle: 'italic',
                        fontWeight: 400,
                        textShadow: '0 0 20px rgba(255, 193, 7, 0.6), 0 0 40px rgba(255, 193, 7, 0.4)'
                    }}
                >
                    Careers{' '}
                </span>
                <span
                    ref={ascendRef}
                    className="inline-block opacity-0"
                    style={{
                        color: '#0d1b2a',
                        fontFamily: 'var(--font-cormorant), Georgia, serif',
                        fontWeight: 700,
                        letterSpacing: '0.02em',
                        textShadow: '0 0 20px rgba(13, 27, 42, 0.6), 0 0 40px rgba(13, 27, 42, 0.4)'
                    }}
                >
                    Ascend
                </span>
            </h1>

            <div ref={buttonRef} className="opacity-0">
                <MagneticButton />
            </div>
        </div>
    );
}
