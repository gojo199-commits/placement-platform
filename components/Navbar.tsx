"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, User, LogOut, LayoutDashboard } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
    const { data: session, status } = useSession();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Hide navbar on dashboard pages (they have their own nav)
    if (pathname.startsWith("/dashboard") || pathname.startsWith("/practice") || pathname.startsWith("/performance")) {
        return null;
    }

    const isAuthenticated = status === "authenticated";
    const userName = session?.user?.name || "User";
    const userInitial = userName.charAt(0).toUpperCase();

    return (
        <nav
            className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent"
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-600 via-yellow-600 to-amber-700 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg" style={{ boxShadow: '0 0 20px rgba(201, 169, 98, 0.4)' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                <circle cx="12" cy="12" r="10" />
                                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor" />
                            </svg>
                        </div>
                        <span className="text-2xl font-bold tracking-wide" style={{ fontFamily: 'var(--font-dancing), cursive', color: '#ffc107', textShadow: '0 0 20px rgba(255, 193, 7, 0.6), 0 0 40px rgba(255, 193, 7, 0.3)', letterSpacing: '1px' }}>
                            PlacePrep
                        </span>
                    </Link>

                    {/* Desktop Navigation - Elegant Glassmorphism */}
                    <div
                        className="hidden md:flex items-center gap-1 px-2 py-1.5 rounded-full"
                        style={{
                            background: 'rgba(255, 255, 255, 0.08)',
                            backdropFilter: 'blur(12px)',
                            WebkitBackdropFilter: 'blur(12px)',
                            border: '1px solid rgba(255, 255, 255, 0.12)',
                        }}
                    >
                        <Link href="/features" className="relative px-4 py-1.5 transition-all duration-300 rounded-full hover:bg-white/15 cursor-pointer">
                            <span style={{
                                color: '#0a0a0a',
                                fontFamily: '"Cormorant Garamond", Georgia, serif',
                                fontWeight: 600,
                                fontSize: '1rem',
                                letterSpacing: '0.5px',
                                textShadow: '0 0 8px rgba(10, 10, 10, 0.3)',
                            }}>Features</span>
                        </Link>
                        <Link href="/#topics" className="relative px-4 py-1.5 transition-all duration-300 rounded-full hover:bg-white/15 cursor-pointer">
                            <span style={{
                                color: '#0a0a0a',
                                fontFamily: '"Cormorant Garamond", Georgia, serif',
                                fontWeight: 600,
                                fontSize: '1rem',
                                letterSpacing: '0.5px',
                                textShadow: '0 0 8px rgba(10, 10, 10, 0.3)',
                            }}>Topics</span>
                        </Link>
                        <Link href="/about" className="relative px-4 py-1.5 transition-all duration-300 rounded-full hover:bg-white/15 cursor-pointer">
                            <span style={{
                                color: '#0a0a0a',
                                fontFamily: '"Cormorant Garamond", Georgia, serif',
                                fontWeight: 600,
                                fontSize: '1rem',
                                letterSpacing: '0.5px',
                                textShadow: '0 0 8px rgba(10, 10, 10, 0.3)',
                            }}>About</span>
                        </Link>
                    </div>

                    {/* Auth Buttons / User Menu */}
                    <div className="hidden md:flex items-center gap-4">
                        {isAuthenticated ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                                >
                                    {/* Profile icon with shimmer effect */}
                                    <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-[#0d1b2a] to-[#1b3a5f] flex items-center justify-center text-white font-semibold text-sm overflow-hidden"
                                        style={{ boxShadow: '0 4px 16px rgba(13, 27, 42, 0.5)' }}
                                    >
                                        {/* Shimmer animation */}
                                        <div
                                            className="absolute inset-0 animate-shimmer"
                                            style={{
                                                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                                                animation: 'shimmer 3s infinite',
                                            }}
                                        />
                                        <span className="relative z-10">{userInitial}</span>
                                    </div>
                                    <span
                                        style={{
                                            fontFamily: '"Cormorant Garamond", Georgia, serif',
                                            fontWeight: 600,
                                            fontSize: '0.95rem',
                                            color: '#ffffff',
                                            textShadow: '0 0 8px rgba(255, 255, 255, 0.7), 0 0 16px rgba(255, 255, 255, 0.4)',
                                            letterSpacing: '0.5px',
                                        }}
                                    >{userName.split(' ')[0]}</span>
                                </button>

                                {isUserMenuOpen && (
                                    <div className="absolute right-0 top-14 w-48 bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-xl">
                                        <Link
                                            href="/dashboard"
                                            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                                            onClick={() => setIsUserMenuOpen(false)}
                                        >
                                            <LayoutDashboard className="h-4 w-4" />
                                            Dashboard
                                        </Link>
                                        <Link
                                            href="/profile"
                                            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                                            onClick={() => setIsUserMenuOpen(false)}
                                        >
                                            <User className="h-4 w-4" />
                                            Profile
                                        </Link>
                                        <hr className="border-white/10" />
                                        <button
                                            onClick={() => signOut({ callbackUrl: '/' })}
                                            className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                                        >
                                            <LogOut className="h-4 w-4" />
                                            Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href="/register"
                                    className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-gray-100 transition-colors hover:scale-105 active:scale-95"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-gray-300 hover:text-white"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-20 left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 p-4 flex flex-col gap-4">
                    <a href="/#features" className="text-gray-300 hover:text-white py-2">Features</a>
                    <a href="/#topics" className="text-gray-300 hover:text-white py-2">Topics</a>
                    <a href="/#about" className="text-gray-300 hover:text-white py-2">About</a>
                    <hr className="border-white/10" />

                    {isAuthenticated ? (
                        <>
                            <div className="flex items-center gap-3 py-2">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-semibold text-sm">
                                    {userInitial}
                                </div>
                                <span className="text-white font-medium">{userName}</span>
                            </div>
                            <Link href="/dashboard" className="text-gray-300 hover:text-white py-2">Dashboard</Link>
                            <button
                                onClick={() => signOut({ callbackUrl: '/' })}
                                className="text-left text-red-400 py-2"
                            >
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="text-gray-300 hover:text-white py-2">Sign In</Link>
                            <Link href="/register" className="bg-white text-black text-center py-3 rounded-xl font-semibold">
                                Get Started
                            </Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}
