'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ANIMATION_CONFIG } from '@/config/animationConfig';
import useScrollPosition from '@/hooks/useScrollPosition';

export default function AnimatedNavbar() {
    const scrollY = useScrollPosition();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        setIsScrolled(scrollY > ANIMATION_CONFIG.scroll.navbarBlurThreshold);
    }, [scrollY]);

    const navItems = [
        { name: 'Features', href: '/features' },
        { name: 'Topics', href: '/#topics' },
        { name: 'About', href: '/about' },
    ];

    return (
        <nav
            className="fixed top-6 left-1/2 -translate-x-1/2"
            style={{ zIndex: 9999 }}
        >
            {/* Glassmorphism container */}
            <div
                className="flex items-center gap-2 rounded-full px-4 py-3"
                style={{
                    background: isScrolled
                        ? 'rgba(255, 255, 255, 0.15)'
                        : 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
                }}
            >
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className="relative px-6 py-2 rounded-full transition-all duration-300 hover:bg-white/20 cursor-pointer"
                        style={{ display: 'block' }}
                    >
                        <span
                            style={{
                                color: '#0d1b2a',
                                fontFamily: 'var(--font-cormorant), Georgia, serif',
                                fontSize: '1.15rem',
                                fontWeight: 700,
                                letterSpacing: '0.5px',
                                textShadow: '0 0 10px rgba(13, 27, 42, 0.5), 0 0 20px rgba(13, 27, 42, 0.3)',
                            }}
                        >
                            {item.name}
                        </span>
                    </Link>
                ))}
            </div>
        </nav>
    );
}
