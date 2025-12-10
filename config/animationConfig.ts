export const ANIMATION_CONFIG = {
    // Timing
    durations: {
        heroEntry: 2800,
        whereEntry: 800,
        careersEntry: 1200,
        ascendEntry: 1300,
        sectionReveal: 800,
        hover: 300,
        click: 150,
        buttonPulse: 2000,
    },

    // Easing functions
    easings: {
        bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
        snappy: 'cubic-bezier(0.4, 0, 0.2, 1)',
        elastic: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },

    // Particles
    particles: {
        desktop: {
            count: 25,
            speed: 1,
            size: { min: 3, max: 7 },
            opacity: { min: 0.2, max: 0.4 },
        },
        mobile: {
            count: 12,
            speed: 0.6,
            size: { min: 2, max: 5 },
            opacity: { min: 0.15, max: 0.3 },
        },
    },

    // Light rays
    lightRays: {
        count: 8,
        speed: 12000,
        opacity: 0.08,
        width: 2,
    },

    // Colors
    colors: {
        primary: '#1a1a2e',
        accent: '#ffc300',
        accentRGB: '255, 195, 0',
        glowIntensity: 0.6,
        // White particles for premium luxury feel
        particleColor: '#ffffff',
        particleRGB: '255, 255, 255',
    },

    // Scroll behavior
    scroll: {
        navbarBlurThreshold: 50,
        parallaxMultiplier: 0.3,
        sectionRevealThreshold: 0.2,
    },

    // Magnetic effect
    magnetic: {
        radius: 100,
        strength: 0.3,
    },
};
