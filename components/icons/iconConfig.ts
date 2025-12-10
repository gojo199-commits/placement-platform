// Icon configuration with enhanced color palette and timing variations
export const ICON_CONFIG = {
    // Color palette - Rich Brown
    colors: {
        primary: '#8B4513',           // Saddle brown
        secondary: '#A0522D',         // Sienna
        accent: '#CD853F',            // Peru (lighter brown)
        glow: 'rgba(139, 69, 19, 0.6)', // Brown glow
        glowSoft: 'rgba(139, 69, 19, 0.3)',
        white: '#ffffff',             // Particles/sparkles
        gradient: 'linear-gradient(135deg, #8B4513 0%, #A0522D 50%, #CD853F 100%)',
    },

    // Size presets
    sizes: {
        sm: 24,   // Secondary use
        md: 32,   // Default
        lg: 48,   // Feature cards
        xl: 64,   // Hero sections
    },

    // Staggered animation timings (in seconds)
    timings: {
        code: 2,        // Fast, energetic
        brain: 3.5,     // Thoughtful, slower
        trophy: 2.2,    // Celebratory
        target: 3,      // Focused
        trend: 1.8,     // Dynamic, quick
        orbit: 4,       // Cosmic, slow
        book: 2.5,      // Steady page turn
    },

    // Animation easing curves
    easing: {
        smooth: [0.25, 0.46, 0.45, 0.94] as const,
        bounce: [0.68, -0.55, 0.265, 1.55] as const,
        gentle: [0.4, 0, 0.2, 1] as const,
    },
};

export type IconSize = keyof typeof ICON_CONFIG.sizes;
