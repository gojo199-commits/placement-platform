'use client';

import { useEffect, useRef } from 'react';
import { ANIMATION_CONFIG } from '@/config/animationConfig';

interface Particle {
    x: number;
    y: number;
    size: number;
    speedY: number;
    speedX: number;
    opacity: number;
    layer: number;
}

export default function ParticleOverlay() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animationRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const updateCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        updateCanvasSize();
        window.addEventListener('resize', updateCanvasSize);

        const isMobile = window.innerWidth < 768;
        const config = isMobile
            ? ANIMATION_CONFIG.particles.mobile
            : ANIMATION_CONFIG.particles.desktop;

        const initParticles = () => {
            particlesRef.current = [];
            for (let i = 0; i < config.count; i++) {
                const layer = Math.floor(Math.random() * 3);
                particlesRef.current.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: config.size.min + Math.random() * (config.size.max - config.size.min),
                    speedY: -(0.2 + Math.random() * 0.5) * config.speed * (layer + 1),
                    speedX: (Math.random() - 0.5) * 0.3 * config.speed,
                    opacity: config.opacity.min + Math.random() * (config.opacity.max - config.opacity.min),
                    layer,
                });
            }
        };
        initParticles();

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particlesRef.current.forEach((particle) => {
                particle.y += particle.speedY;
                particle.x += particle.speedX;

                if (particle.y < -20) {
                    particle.y = canvas.height + 20;
                    particle.x = Math.random() * canvas.width;
                }
                if (particle.x < -20) particle.x = canvas.width + 20;
                if (particle.x > canvas.width + 20) particle.x = -20;

                ctx.save();

                if (particle.layer === 0) {
                    ctx.filter = 'blur(2px)';
                } else if (particle.layer === 1) {
                    ctx.filter = 'blur(0.5px)';
                }

                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                // White particles for premium luxury feel
                ctx.fillStyle = `rgba(${ANIMATION_CONFIG.colors.particleRGB}, ${particle.opacity})`;
                ctx.fill();

                ctx.shadowBlur = particle.size * 2;
                ctx.shadowColor = ANIMATION_CONFIG.colors.particleColor;
                ctx.fill();

                ctx.restore();
            });

            animationRef.current = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener('resize', updateCanvasSize);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-10"
            style={{ mixBlendMode: 'screen' }}
        />
    );
}
