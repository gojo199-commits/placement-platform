import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">

            <div className="container relative z-10 px-4 md:px-6 text-center">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-12">
                    <span style={{ color: '#0d1b2a', fontFamily: 'var(--font-cormorant), Georgia, serif', fontWeight: 700, letterSpacing: '0.02em', textShadow: '0 0 20px rgba(13, 27, 42, 0.6), 0 0 40px rgba(13, 27, 42, 0.4)' }}>Where </span>
                    <span style={{ color: '#ffc107', fontFamily: 'var(--font-dancing), cursive', fontStyle: 'italic', fontWeight: 400, textShadow: '0 0 20px rgba(255, 193, 7, 0.6), 0 0 40px rgba(255, 193, 7, 0.4)' }}>Careers </span>
                    <span style={{ color: '#0d1b2a', fontFamily: 'var(--font-cormorant), Georgia, serif', fontWeight: 700, letterSpacing: '0.02em', textShadow: '0 0 20px rgba(13, 27, 42, 0.6), 0 0 40px rgba(13, 27, 42, 0.4)' }}>Ascend</span>
                </h1>

                <div className="flex justify-center">
                    <Link
                        href="/register"
                        className="group relative px-10 py-5 rounded-full font-semibold text-xl transition-all hover:scale-105 active:scale-95"
                        style={{ backgroundColor: '#1a1a2e', color: '#ffc300' }}
                    >
                        <span style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>Let's </span>
                        <span style={{ fontFamily: 'var(--font-dancing), cursive', fontStyle: 'italic' }}>Ascend</span>
                        <ArrowRight className="inline-block ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        <div className="absolute inset-0 rounded-full blur-lg -z-10 opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: 'rgba(26, 26, 46, 0.5)' }} />
                    </Link>
                </div>
            </div>
        </div>
    );
}
