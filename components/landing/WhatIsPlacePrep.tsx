'use client';

import { Sparkles, Users, Award, Rocket } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
    AnimatedCodeIcon,
    AnimatedBrainIcon,
    AnimatedTrendIcon,
    AnimatedTargetIcon,
    AnimatedOrbitIcon,
    ICON_CONFIG
} from "@/components/icons";

export default function WhatIsPlacePrep() {
    const benefits = [
        {
            AnimatedIcon: AnimatedTrendIcon,
            title: "Accelerate Your Career",
            description: "Get placed at top tech companies with our structured preparation approach that has helped thousands succeed."
        },
        {
            AnimatedIcon: AnimatedOrbitIcon,
            title: "Personalized Learning",
            description: "AI-powered system that adapts to your skill level and creates a customized roadmap for your success."
        },
        {
            icon: Users,
            title: "Community Support",
            description: "Join a thriving community of ambitious students preparing for placements together."
        },
        {
            icon: Award,
            title: "Industry Recognition",
            description: "Our platform is trusted by students from IITs, NITs, and top engineering colleges across India."
        }
    ];

    const stats = [
        { value: "10,000+", label: "Students Placed" },
        { value: "500+", label: "Partner Companies" },
        { value: "95%", label: "Success Rate" },
        { value: "24/7", label: "Support" }
    ];

    const offerItems = [
        { AnimatedIcon: AnimatedCodeIcon, title: "500+ Coding Problems", desc: "Curated DSA questions from FAANG and top tech companies" },
        { AnimatedIcon: AnimatedBrainIcon, title: "AI Mock Interviews", desc: "Practice with our intelligent interviewer that gives real-time feedback" },
        { AnimatedIcon: AnimatedTrendIcon, title: "Performance Analytics", desc: "Track your progress with detailed insights and improvement suggestions" },
        { AnimatedIcon: AnimatedTargetIcon, title: "Placement Roadmaps", desc: "Personalized study plans based on your target companies" }
    ];

    const [hoveredOffer, setHoveredOffer] = useState<number | null>(null);
    const [hoveredBenefit, setHoveredBenefit] = useState<number | null>(null);

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background effects with gold tint */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full filter blur-[100px]"
                    style={{ background: 'rgba(139, 69, 19, 0.08)' }} />
                <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full filter blur-[100px]"
                    style={{ background: 'rgba(160, 82, 45, 0.06)' }} />
            </div>

            <div className="container px-4 md:px-6 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    {/* Badge - completely separate above */}
                    <div className="mb-8">
                        <div
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full"
                            style={{
                                background: 'rgba(30, 27, 75, 0.85)',
                                border: '1px solid rgba(99, 102, 241, 0.4)',
                                backdropFilter: 'blur(10px)',
                                boxShadow: '0 4px 20px rgba(30, 27, 75, 0.3)',
                            }}
                        >
                            <Sparkles className="w-4 h-4" style={{ color: '#a5b4fc' }} />
                            <span style={{
                                color: '#e0e7ff',
                                fontFamily: 'system-ui, -apple-system, sans-serif',
                                fontWeight: 600,
                                letterSpacing: '0.05em',
                            }}>Why PlacePrep?</span>
                        </div>
                    </div>
                    {/* Main heading - outlines with subtle glow */}
                    <div className="mb-6">
                        <h2 className="text-3xl md:text-5xl font-black">
                            <span style={{
                                color: '#ffffff',
                                fontFamily: '"Cormorant Garamond", Georgia, serif',
                                fontWeight: 700,
                                textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                                WebkitTextStroke: '0.5px rgba(0, 0, 0, 0.2)',
                            }}>Your Ultimate</span>
                            <br />
                            <span style={{
                                color: '#ffc107',
                                fontFamily: 'var(--font-dancing), cursive',
                                fontStyle: 'italic',
                                fontWeight: 400,
                                textShadow: '0 0 20px rgba(255, 193, 7, 0.6), 0 0 40px rgba(255, 193, 7, 0.4)',
                            }}>Placement Partner</span>
                        </h2>
                    </div>
                    <div
                        className="max-w-3xl mx-auto px-6 py-4 rounded-2xl"
                        style={{
                            background: 'rgba(0, 0, 0, 0.35)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                        }}
                    >
                        <p className="text-lg leading-relaxed"
                            style={{
                                color: '#ffffff',
                                fontWeight: 500,
                            }}
                        >
                            PlacePrep is an AI-powered placement preparation platform designed to help engineering students
                            crack interviews at top tech companies. We combine cutting-edge technology with proven strategies
                            to give you the best chance at landing your dream job.
                        </p>
                    </div>
                </div>

                {/* Stats Bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-20">
                    {stats.map((stat, i) => (
                        <div key={i} className="p-6 rounded-2xl text-center transition-all hover:-translate-y-1"
                            style={{
                                background: 'rgba(255, 255, 255, 0.06)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(139, 69, 19, 0.2)',
                            }}
                        >
                            <div className="text-xl md:text-2xl font-bold mb-1"
                                style={{
                                    color: '#ffc107',
                                    textShadow: '0 0 20px rgba(255, 193, 7, 0.6), 0 0 40px rgba(255, 193, 7, 0.4)',
                                    fontFamily: 'var(--font-dancing), cursive',
                                    fontStyle: 'italic',
                                }}
                            >
                                {stat.value}
                            </div>
                            <div style={{
                                color: '#000000',
                                fontSize: '0.9rem',
                                fontWeight: 700,
                                textShadow: '0 1px 2px rgba(255, 255, 255, 0.5), 0 0 10px rgba(255, 255, 255, 0.3)'
                            }}>{stat.label}</div>
                        </div>
                    ))}
                </div>


                {/* What We Offer */}
                <div className="max-w-5xl mx-auto mb-20">
                    <div className="text-center mb-12">
                        <div
                            className="inline-block px-4 py-1.5 rounded-lg"
                            style={{
                                background: 'rgba(0, 0, 0, 0.5)',
                                backdropFilter: 'blur(15px)',
                                border: '1px solid rgba(255, 255, 255, 0.15)',
                            }}
                        >
                            <h3
                                className="text-2xl md:text-3xl font-black"
                                style={{
                                    color: '#DEB887',
                                    fontFamily: 'system-ui, -apple-system, sans-serif',
                                    textShadow: '0 2px 10px rgba(222, 184, 135, 0.3)',
                                }}
                            >
                                What We Offer
                            </h3>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {offerItems.map((item, i) => (
                            <div
                                key={i}
                                className="flex items-start gap-4 p-6 rounded-2xl transition-all group hover:-translate-y-1"
                                style={{
                                    background: 'rgba(255, 255, 255, 0.45)',
                                    backdropFilter: 'blur(20px)',
                                    border: '1px solid rgba(139, 69, 19, 0.25)',
                                }}
                                onMouseEnter={() => setHoveredOffer(i)}
                                onMouseLeave={() => setHoveredOffer(null)}
                            >
                                <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-all"
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.2) 0%, rgba(160, 82, 45, 0.1) 100%)',
                                        border: '1px solid rgba(255, 195, 0, 0.3)',
                                        boxShadow: hoveredOffer === i ? '0 4px 20px rgba(255, 195, 0, 0.4)' : '0 4px 20px rgba(255, 195, 0, 0.2)',
                                    }}
                                >
                                    <item.AnimatedIcon size="lg" isHovered={hoveredOffer === i} />
                                </div>
                                <div>
                                    <h4 className="text-xl font-black mb-2"
                                        style={{
                                            color: '#061020',
                                            fontFamily: 'system-ui, -apple-system, sans-serif',
                                            fontWeight: 900,
                                            textShadow: '0 0 15px rgba(6, 16, 32, 0.5), 0 2px 4px rgba(6, 16, 32, 0.4)',
                                            letterSpacing: '-0.02em',
                                        }}
                                    >{item.title}</h4>
                                    <p style={{ color: '#0a1628', fontSize: '1.05rem', lineHeight: 1.6, fontWeight: 600 }}>{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Benefits */}
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <div
                            className="inline-block px-6 py-3 rounded-xl"
                            style={{
                                background: 'rgba(0, 0, 0, 0.5)',
                                backdropFilter: 'blur(15px)',
                                border: '1px solid rgba(255, 255, 255, 0.15)',
                            }}
                        >
                            <h3
                                className="text-2xl md:text-3xl font-black"
                                style={{
                                    color: '#DEB887',
                                    fontFamily: 'system-ui, -apple-system, sans-serif',
                                    textShadow: '0 2px 10px rgba(222, 184, 135, 0.3)',
                                }}
                            >
                                How PlacePrep Benefits You
                            </h3>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {benefits.map((benefit, i) => (
                            <div
                                key={i}
                                className="p-8 rounded-3xl transition-all group hover:-translate-y-2"
                                style={{
                                    background: 'rgba(255, 255, 255, 0.45)',
                                    backdropFilter: 'blur(20px)',
                                    border: '1px solid rgba(139, 69, 19, 0.25)',
                                }}
                                onMouseEnter={() => setHoveredBenefit(i)}
                                onMouseLeave={() => setHoveredBenefit(null)}
                            >
                                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all"
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(255, 195, 0, 0.2) 0%, rgba(255, 215, 0, 0.1) 100%)',
                                        border: '1px solid rgba(255, 195, 0, 0.3)',
                                        boxShadow: hoveredBenefit === i ? '0 4px 20px rgba(255, 195, 0, 0.4)' : '0 4px 20px rgba(255, 195, 0, 0.2)',
                                    }}
                                >
                                    {benefit.AnimatedIcon ? (
                                        <benefit.AnimatedIcon size="xl" isHovered={hoveredBenefit === i} />
                                    ) : (
                                        <benefit.icon className="w-8 h-8" style={{ color: ICON_CONFIG.colors.primary }} />
                                    )}
                                </div>
                                <h4 className="text-2xl font-black mb-3"
                                    style={{
                                        color: '#061020',
                                        fontFamily: 'system-ui, -apple-system, sans-serif',
                                        fontWeight: 900,
                                        textShadow: '0 0 15px rgba(6, 16, 32, 0.5), 0 2px 4px rgba(6, 16, 32, 0.4)',
                                        letterSpacing: '-0.02em',
                                    }}
                                >{benefit.title}</h4>
                                <p style={{ color: '#0a1628', lineHeight: 1.7, fontSize: '1.05rem', fontWeight: 600 }}>{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center mt-16">
                    <p style={{ color: '#2d4a6f', marginBottom: '1.5rem' }}>Ready to start your placement journey?</p>
                    <Link
                        href="/register"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-lg transition-all hover:scale-105"
                        style={{
                            background: ICON_CONFIG.colors.gradient,
                            color: '#0d1b2a',
                            boxShadow: `0 0 30px ${ICON_CONFIG.colors.glow}`,
                            fontFamily: '"Cormorant Garamond", Georgia, serif',
                            fontWeight: 700,
                        }}
                    >
                        Get Started Free
                        <Rocket className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
