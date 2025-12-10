"use client";

import { Users, Building2, Award, BookOpen, ArrowLeft, Target, Sparkles, Heart, Rocket } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const stats = [
    { icon: Users, value: "10,000+", label: "Students Placed", color: "from-purple-500 to-indigo-500" },
    { icon: Building2, value: "500+", label: "Partner Companies", color: "from-blue-500 to-cyan-500" },
    { icon: Award, value: "95%", label: "Success Rate", color: "from-pink-500 to-rose-500" },
    { icon: BookOpen, value: "1,000+", label: "Practice Problems", color: "from-amber-500 to-orange-500" },
];

const team = [
    { name: "Our Mission", icon: Target, description: "To democratize placement preparation and help every student land their dream job at top tech companies." },
    { name: "Our Vision", icon: Rocket, description: "To become the go-to platform for placement preparation, empowering millions of students worldwide." },
    { name: "Our Values", icon: Heart, description: "We believe in continuous learning, student success, and building a supportive community for aspiring professionals." },
];

export default function AboutPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-background text-foreground pt-24 pb-16">
                {/* Background effects removed for clean look */}

                <div className="container px-4 md:px-6 relative z-10">
                    {/* Back button */}
                    <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group">
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span>Back to Home</span>
                    </Link>

                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 border border-white/20 backdrop-blur-md mb-6">
                            <Sparkles className="w-4 h-4 text-cyan-400" />
                            <span className="text-sm font-medium text-white">About Us</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            <span style={{ color: '#1a1a1a', textShadow: '0 0 20px rgba(0, 0, 0, 0.4), 0 0 40px rgba(0, 0, 0, 0.3)' }}>Your Partner in</span> <br />
                            <span style={{ color: '#1E2A4A', fontFamily: 'Georgia, serif', textShadow: '0 0 20px rgba(30, 42, 74, 0.8), 0 0 40px rgba(30, 42, 74, 0.5)' }}>Career Success</span>
                        </h1>
                        <p className="text-white max-w-2xl mx-auto text-lg px-6 py-3 rounded-2xl bg-black/50 backdrop-blur-sm">
                            PlacePrep is dedicated to helping students achieve their career goals through comprehensive placement preparation.
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-20">
                        {stats.map((stat, i) => (
                            <div
                                key={i}
                                className="relative p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl text-center group hover:border-white/20 transition-all"
                            >
                                <div className={`w-12 h-12 mx-auto rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                                <div className="text-gray-400 text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Mission, Vision, Values */}
                    <div className="max-w-5xl mx-auto mb-20">
                        <h2 className="text-3xl font-bold text-white text-center mb-12" style={{ textShadow: '0 0 15px rgba(255,255,255,0.2)' }}>
                            What Drives Us
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {team.map((item, i) => (
                                <div
                                    key={i}
                                    className="p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl hover:border-white/20 transition-all group"
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <item.icon className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-4">{item.name}</h3>
                                    <p className="text-gray-400 leading-relaxed">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Story */}
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-white mb-8" style={{ textShadow: '0 0 15px rgba(255,255,255,0.2)' }}>
                            Our Story
                        </h2>
                        <div className="p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl">
                            <p className="text-gray-300 leading-relaxed text-lg mb-6">
                                PlacePrep was born from a simple observation: too many talented students were struggling with placement preparation due to lack of structured guidance and resources.
                            </p>
                            <p className="text-gray-300 leading-relaxed text-lg mb-6">
                                We set out to build a comprehensive platform that combines AI-powered mock interviews, curated coding challenges, and personalized learning paths to help every student succeed.
                            </p>
                            <p className="text-gray-300 leading-relaxed text-lg">
                                Today, we&apos;re proud to have helped thousands of students land their dream jobs at top companies around the world.
                            </p>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="text-center mt-16">
                        <Link
                            href="/register"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-semibold text-lg hover:bg-gray-100 transition-all hover:scale-105"
                        >
                            Join PlacePrep Today
                            <Sparkles className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
}
