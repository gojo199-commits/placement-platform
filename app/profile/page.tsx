"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import { User, Mail, GraduationCap, Award, BookOpen, Code2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    if (status === "loading") {
        return (
            <>
                <Navbar />
                <main className="min-h-screen pt-24 pb-16">
                    <div className="container px-4 md:px-6">
                        <div className="flex items-center justify-center min-h-[60vh]">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                        </div>
                    </div>
                </main>
            </>
        );
    }

    if (!session) {
        return null;
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-24 pb-16">
                <div className="container px-4 md:px-6 relative z-10">
                    {/* Back button */}
                    <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group">
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span>Back to Home</span>
                    </Link>

                    {/* Profile Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            <span style={{ color: '#1a1a1a', textShadow: '0 0 20px rgba(0, 0, 0, 0.4), 0 0 40px rgba(0, 0, 0, 0.3)' }}>My </span>
                            <span style={{ color: '#1E2A4A', fontFamily: 'Georgia, serif', textShadow: '0 0 20px rgba(30, 42, 74, 0.8)' }}>Profile</span>
                        </h1>
                    </div>

                    {/* Profile Card */}
                    <div className="max-w-2xl mx-auto">
                        <div className="p-8 rounded-3xl border border-white/20 bg-black/50 backdrop-blur-xl">
                            {/* Avatar */}
                            <div className="flex justify-center mb-8">
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-3xl font-bold text-white">
                                    {session.user?.name?.charAt(0).toUpperCase() || "U"}
                                </div>
                            </div>

                            {/* User Info */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                                    <User className="w-6 h-6 text-cyan-400" />
                                    <div>
                                        <p className="text-sm text-gray-400">Name</p>
                                        <p className="text-lg font-semibold text-white">{session.user?.name || "Not set"}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                                    <Mail className="w-6 h-6 text-purple-400" />
                                    <div>
                                        <p className="text-sm text-gray-400">Email</p>
                                        <p className="text-lg font-semibold text-white">{session.user?.email || "Not set"}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                                    <GraduationCap className="w-6 h-6 text-pink-400" />
                                    <div>
                                        <p className="text-sm text-gray-400">Role</p>
                                        <p className="text-lg font-semibold text-white capitalize">{(session.user as any)?.role?.toLowerCase() || "Student"}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="mt-8 pt-8 border-t border-white/10">
                                <h3 className="text-lg font-semibold text-white mb-4">Quick Stats</h3>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                                        <Code2 className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                                        <p className="text-2xl font-bold text-white">0</p>
                                        <p className="text-xs text-gray-400">Problems Solved</p>
                                    </div>
                                    <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                                        <BookOpen className="w-6 h-6 text-green-400 mx-auto mb-2" />
                                        <p className="text-2xl font-bold text-white">0</p>
                                        <p className="text-xs text-gray-400">Topics Completed</p>
                                    </div>
                                    <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                                        <Award className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                                        <p className="text-2xl font-bold text-white">0</p>
                                        <p className="text-xs text-gray-400">Achievements</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
