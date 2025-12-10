'use client';

import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.volume = 0.3;
            audio.loop = true;
        }
    }, []);

    const toggleMusic = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play().catch(console.error);
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <>
            {/* Audio element - using your music file */}
            <audio ref={audioRef} src="/bg-music.mp3.mp3" preload="auto" />

            {/* Floating music control button */}
            <motion.button
                onClick={toggleMusic}
                className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center"
                style={{
                    backgroundColor: 'rgba(26, 26, 46, 0.8)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 195, 0, 0.3)',
                    boxShadow: isPlaying
                        ? '0 0 20px rgba(255, 195, 0, 0.4)'
                        : '0 4px 20px rgba(0, 0, 0, 0.3)',
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3, duration: 0.5 }}
                title={isPlaying ? 'Pause Music' : 'Play Music'}
            >
                <AnimatePresence mode="wait">
                    {isPlaying ? (
                        <motion.div
                            key="playing"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 180 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Volume2 className="w-5 h-5 text-[#ffc300]" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="paused"
                            initial={{ scale: 0, rotate: 180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: -180 }}
                            transition={{ duration: 0.3 }}
                        >
                            <VolumeX className="w-5 h-5 text-gray-400" />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Pulsing ring when playing */}
                {isPlaying && (
                    <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{ border: '2px solid rgba(255, 195, 0, 0.5)' }}
                        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                )}
            </motion.button>
        </>
    );
}
