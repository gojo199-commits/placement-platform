'use client';

import { ReactNode } from 'react';

interface BackgroundContainerProps {
    children: ReactNode;
}

export default function BackgroundContainer({ children }: BackgroundContainerProps) {
    return (
        <div className="relative min-h-screen">
            {/* Background is inherited from body (bg-main.jpg in globals.css) */}
            {/* This container is transparent to preserve your original background */}

            {/* Animation overlays and content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}
