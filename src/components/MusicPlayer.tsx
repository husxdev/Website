"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const playlist = [
    "/assets/music/Money Game.mp3",
];

export default function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.2);
    const [showVolume, setShowVolume] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const currentTrack = playlist[currentTrackIndex];
    const trackName = currentTrack.split('/').pop()?.replace('.mp3', '') || 'Unknown Track';

    useEffect(() => {
        audioRef.current = new Audio(currentTrack);
        audioRef.current.loop = false;
        audioRef.current.volume = volume;

        const playAudio = async () => {
            try {
                if (audioRef.current) {
                    await audioRef.current.play();
                    setIsPlaying(true);
                }
            } catch (error) {
                console.log("Autoplay prevented:", error);
            }
        };
        
        playAudio();

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, [currentTrack, volume]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.onended = nextTrack;
        }
    }, [currentTrackIndex]);

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    };

    const nextTrack = () => {
        setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
        if (isPlaying && audioRef.current) {
            audioRef.current.pause();
            setTimeout(() => audioRef.current?.play(), 0);
        }
    };

    const previousTrack = () => {
        setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
        if (isPlaying && audioRef.current) {
            audioRef.current.pause();
            setTimeout(() => audioRef.current?.play(), 0);
        }
    };

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const renderVolumeIcon = () => {
        if (volume === 0) {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM17.78 9.22a.75.75 0 10-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 001.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 101.06-1.06L20.56 12l1.72-1.72a.75.75 0 00-1.06-1.06l-1.72 1.72-1.72-1.72z" />
                </svg>
            );
        } else if (volume < 0.5) {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06z" />
                </svg>
            );
        }
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06z" />
                <path d="M16 7.404v9.192a3.001 3.001 0 002.99-1.596 6.5 6.5 0 000-6 3.001 3.001 0 00-2.99-1.596z" />
                <path d="M19 12a3.5 3.5 0 000-7 3.5 3.5 0 000 7z" />
            </svg>
        );
    };

    return (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900/50 rounded-xl border border-[#999a9e]/20 hover:border-[#999a9e]/30 transition-all duration-300">
            <button onClick={previousTrack} className="text-white/80 hover:text-white transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M9.195 18.44c1.25.713 2.805-.19 2.805-1.629v-2.34l6.945 3.968c1.25.714 2.805-.188 2.805-1.628V8.688c0-1.44-1.555-2.342-2.805-1.628L12 11.03v-2.34c0-1.44-1.555-2.343-2.805-1.629l-7.108 4.062c-1.26.72-1.26 2.536 0 3.256l7.108 4.061z" />
                </svg>
            </button>

            <button onClick={togglePlay} className="flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-300">
                <motion.div initial={false} animate={{ rotate: isPlaying ? 0 : 0 }} className="w-5 h-5 flex items-center justify-center">
                    {isPlaying ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75v13.5a.75.75 0 01-1.5 0V4.5a.75.75 0 01.75.75zm11 0a.75.75 0 01.75-.75v13.5a.75.75 0 01-1.5 0V4.5a.75.75 0 01.75.75z" clipRule="evenodd" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                        </svg>
                    )}
                </motion.div>
            </button>

            <button onClick={nextTrack} className="text-white/80 hover:text-white transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M5.055 7.06c-1.25-.714-2.805.189-2.805 1.628v8.123c0 1.44 1.555 2.342 2.805 1.628L12 14.471v2.34c0 1.44 1.555 2.342 2.805 1.628l7.108-4.061c1.26-.72 1.26-2.536 0-3.256L14.805 7.06C13.555 6.346 12 7.25 12 8.688v2.34L5.055 7.06z" />
                </svg>
            </button>

            <div className="w-[1px] h-4 bg-white/20 mx-2" />
            <span className="text-sm text-white/60 flex-grow">{trackName}</span>

            <div className="relative">
                <button
                    onClick={() => setShowVolume(!showVolume)}
                    className="text-white/80 hover:text-white p-1 rounded-lg transition-colors duration-300"
                >
                    {renderVolumeIcon()}
                </button>

                <AnimatePresence>
                    {showVolume && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, x: -16 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.95, x: -16 }}
                            className="absolute top-1/2 left-full ml-2 -translate-y-1/2 bg-zinc-800/90 rounded-lg p-2 w-32"
                        >
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={volume}
                                onChange={handleVolumeChange}
                                className="w-full accent-white/80 hover:accent-white cursor-pointer"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
