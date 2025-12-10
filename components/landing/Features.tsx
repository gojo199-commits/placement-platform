'use client';

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import {
    AnimatedBrainIcon,
    AnimatedCodeIcon,
    AnimatedTrophyIcon,
    AnimatedTargetIcon,
    ICON_CONFIG
} from "@/components/icons";

const features = [
    {
        title: "AI Mock Interviews",
        description: "Practice with our advanced AI interviewer that adapts to your responses and provides real-time feedback.",
        AnimatedIcon: AnimatedBrainIcon,
        className: "md:col-span-2",
    },
    {
        title: "Coding Challenges",
        description: "Master DSA with our curated list of problems from top tech companies.",
        AnimatedIcon: AnimatedCodeIcon,
        className: "md:col-span-1",
    },
    {
        title: "Performance Analytics",
        description: "Track your progress with detailed insights and personalized improvement plans.",
        AnimatedIcon: AnimatedTrophyIcon,
        className: "md:col-span-1",
    },
    {
        title: "Placement Roadmap",
        description: "Get a customized study plan based on your target companies and current skill level.",
        AnimatedIcon: AnimatedTargetIcon,
        className: "md:col-span-2",
    }
];

// Luxury color palette
const LUXURY = {
    cardBg: 'rgba(255, 255, 255, 0.45)',
    borderNormal: 'rgba(139, 69, 19, 0.2)',
    borderHover: 'rgba(139, 69, 19, 0.4)',
    titleGradient: 'linear-gradient(135deg, #8B4513 0%, #A0522D 50%, #CD853F 100%)',
    cardTitle: '#061020',
    description: '#0a1628',
    glowGold: 'rgba(139, 69, 19, 0.4)',
};

export default function Features() {
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);

    return (
        <section id="features" className="py-32 relative overflow-hidden">
            {/* Premium background effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full filter blur-[150px]"
                    style={{ background: 'rgba(139, 69, 19, 0.08)' }} />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full filter blur-[150px]"
                    style={{ background: 'rgba(160, 82, 45, 0.06)' }} />
            </div>

            <div className="container px-4 md:px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Premium Badge */}
                    <motion.div
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8"
                        style={{
                            background: 'rgba(139, 69, 19, 0.1)',
                            border: '1px solid rgba(139, 69, 19, 0.3)',
                            backdropFilter: 'blur(10px)',
                        }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <span style={{
                            color: ICON_CONFIG.colors.primary,
                            fontFamily: '"Cormorant Garamond", Georgia, serif',
                            fontWeight: 600,
                            letterSpacing: '1px',
                        }}>✨ Premium Features</span>
                    </motion.div>

                    {/* Main Title with Gold Gradient */}
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        <span style={{
                            color: '#0d1b2a',
                            fontFamily: '"Cormorant Garamond", Georgia, serif',
                            fontWeight: 700,
                            textShadow: '0 0 30px rgba(13, 27, 42, 0.3)',
                        }}>Everything you need to</span>
                        <br />
                        <span
                            className="bg-clip-text text-transparent"
                            style={{
                                backgroundImage: LUXURY.titleGradient,
                                fontFamily: '"Cormorant Garamond", Georgia, serif',
                                fontWeight: 700,
                            }}
                        >Crack the Interview</span>
                    </h2>

                    {/* Subtitle */}
                    <p className="max-w-2xl mx-auto text-lg"
                        style={{
                            color: LUXURY.description,
                            textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
                        }}
                    >
                        Our platform provides a comprehensive suite of tools designed to help you succeed in your placement journey.
                    </p>
                </motion.div>

                {/* Feature Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            className={`group relative ${feature.className}`}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.6,
                                delay: i * 0.15,
                                ease: [0.25, 0.46, 0.45, 0.94]
                            }}
                            onMouseEnter={() => setHoveredCard(i)}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            {/* Card Container */}
                            <div
                                className="relative h-full p-8 rounded-3xl overflow-hidden transition-all duration-500"
                                style={{
                                    background: LUXURY.cardBg,
                                    backdropFilter: 'blur(30px)',
                                    WebkitBackdropFilter: 'blur(30px)',
                                    border: `1px solid ${hoveredCard === i ? LUXURY.borderHover : LUXURY.borderNormal}`,
                                    boxShadow: hoveredCard === i
                                        ? `0 16px 48px rgba(0, 0, 0, 0.3), 0 0 30px ${LUXURY.glowGold}`
                                        : '0 8px 32px rgba(0, 0, 0, 0.2)',
                                    transform: hoveredCard === i ? 'translateY(-8px)' : 'translateY(0)',
                                }}
                            >
                                {/* Shimmer effect on hover */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                                    style={{
                                        background: 'linear-gradient(105deg, transparent 40%, rgba(255, 255, 255, 0.1) 45%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.1) 55%, transparent 60%)',
                                        animation: 'shimmer 2s infinite',
                                    }}
                                />

                                <div className="relative z-10">
                                    {/* Animated Icon */}
                                    <div
                                        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 relative overflow-hidden transition-all duration-300"
                                        style={{
                                            background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.2) 0%, rgba(160, 82, 45, 0.1) 100%)',
                                            border: '1px solid rgba(139, 69, 19, 0.3)',
                                            boxShadow: hoveredCard === i
                                                ? '0 8px 30px rgba(139, 69, 19, 0.4)'
                                                : '0 4px 20px rgba(139, 69, 19, 0.2)',
                                            transform: hoveredCard === i ? 'scale(1.1) rotate(3deg)' : 'scale(1)',
                                        }}
                                    >
                                        <feature.AnimatedIcon size="lg" isHovered={hoveredCard === i} />
                                    </div>

                                    {/* Title */}
                                    <h3
                                        className="text-2xl font-black mb-4 transition-all duration-300"
                                        style={{
                                            color: LUXURY.cardTitle,
                                            fontFamily: 'system-ui, -apple-system, sans-serif',
                                            fontWeight: 900,
                                            textShadow: '0 0 15px rgba(6, 16, 32, 0.5), 0 2px 4px rgba(6, 16, 32, 0.4)',
                                            letterSpacing: '-0.02em',
                                        }}
                                    >
                                        {feature.title}
                                    </h3>

                                    {/* Description */}
                                    <p
                                        className="leading-relaxed mb-6"
                                        style={{
                                            color: LUXURY.description,
                                            fontSize: '1.05rem',
                                            lineHeight: 1.7,
                                            fontWeight: 600,
                                        }}
                                    >
                                        {feature.description}
                                    </p>

                                    {/* Learn More Link */}
                                    <div
                                        className="flex items-center gap-2 transition-all duration-500"
                                        style={{
                                            opacity: hoveredCard === i ? 1 : 0,
                                            transform: hoveredCard === i ? 'translateY(0)' : 'translateY(8px)',
                                        }}
                                    >
                                        <span
                                            className="text-sm font-medium"
                                            style={{
                                                background: LUXURY.titleGradient,
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent',
                                            }}
                                        >
                                            Learn more
                                        </span>
                                        <ArrowRight
                                            className="w-4 h-4"
                                            style={{ color: ICON_CONFIG.colors.primary }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* CSS for shimmer animation */}
            <style jsx>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </section>
    );
}
