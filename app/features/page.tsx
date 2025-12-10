"use client";

import { Code2, Brain, Trophy, Target, Sparkles, Zap, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const features = [
    {
        title: "AI Mock Interviews",
        description: "Practice with our advanced AI interviewer that adapts to your responses and provides real-time feedback. Get personalized tips and improve your communication skills.",
        icon: Brain,
        gradient: "from-purple-500 via-violet-500 to-indigo-500",
        iconBg: "bg-gradient-to-br from-purple-500 to-indigo-600",
        details: ["Real-time feedback", "Adaptive questioning", "Performance scoring", "Interview tips"]
    },
    {
        title: "Coding Challenges",
        description: "Master DSA with our curated list of problems from top tech companies. Practice coding problems ranging from easy to hard difficulty.",
        icon: Code2,
        gradient: "from-blue-500 via-cyan-500 to-teal-500",
        iconBg: "bg-gradient-to-br from-blue-500 to-cyan-600",
        details: ["500+ problems", "Company-wise questions", "Multiple languages", "Test cases included"]
    },
    {
        title: "Performance Analytics",
        description: "Track your progress with detailed insights and personalized improvement plans. Visualize your growth and identify areas for improvement.",
        icon: Trophy,
        gradient: "from-pink-500 via-rose-500 to-red-500",
        iconBg: "bg-gradient-to-br from-pink-500 to-rose-600",
        details: ["Progress tracking", "Skill analysis", "Weak area identification", "Growth charts"]
    },
    {
        title: "Placement Roadmap",
        description: "Get a customized study plan based on your target companies and current skill level. Follow a structured path to your dream job.",
        icon: Target,
        gradient: "from-amber-500 via-orange-500 to-red-500",
        iconBg: "bg-gradient-to-br from-amber-500 to-orange-600",
        details: ["Personalized plans", "Company targeting", "Milestone tracking", "Resource recommendations"]
    }
];

export default function FeaturesPage() {
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
                            <span className="text-sm font-medium text-white">Our Features</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            <span style={{ color: '#1a1a1a', textShadow: '0 0 20px rgba(0, 0, 0, 0.4), 0 0 40px rgba(0, 0, 0, 0.3)' }}>Everything You Need to</span> <br />
                            <span style={{ color: '#1E2A4A', fontFamily: 'Georgia, serif', textShadow: '0 0 20px rgba(30, 42, 74, 0.8), 0 0 40px rgba(30, 42, 74, 0.5)' }}>Succeed in Placements</span>
                        </h1>
                        <p className="text-white max-w-2xl mx-auto text-lg px-6 py-3 rounded-2xl bg-black/50 backdrop-blur-sm">
                            Discover all the powerful tools and features designed to help you land your dream job.
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {features.map((feature, i) => (
                            <div
                                key={i}
                                className="group relative rounded-3xl overflow-hidden"
                            >
                                {/* Card content */}
                                <div className="relative h-full p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl hover:border-white/20 transition-all duration-500">
                                    {/* Hover gradient overlay */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`} />

                                    {/* Glow effect on hover */}
                                    <div className={`absolute -inset-1 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 rounded-3xl`} />

                                    <div className="relative z-10">
                                        {/* Icon with gradient background */}
                                        <div className={`w-16 h-16 rounded-2xl ${feature.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                                            <feature.icon className="w-8 h-8 text-white" />
                                        </div>

                                        <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                                        <p className="text-gray-400 leading-relaxed mb-6">
                                            {feature.description}
                                        </p>

                                        {/* Feature details */}
                                        <ul className="space-y-2">
                                            {feature.details.map((detail, j) => (
                                                <li key={j} className="flex items-center gap-2 text-gray-300 text-sm">
                                                    <Zap className={`w-4 h-4 text-purple-400`} />
                                                    {detail}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="text-center mt-16">
                        <Link
                            href="/register"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-semibold text-lg hover:bg-gray-100 transition-all hover:scale-105"
                        >
                            Get Started Free
                            <Zap className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
}
