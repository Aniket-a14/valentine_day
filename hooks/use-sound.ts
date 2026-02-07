"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import content from "@/app/content.json";

// Hook to play sounds
export default function useSound() {
    const [isMuted, setIsMuted] = useState(false);

    // Create refs for audio objects
    const clickRef = useRef<HTMLAudioElement | null>(null);
    const hoverRef = useRef<HTMLAudioElement | null>(null);
    const successRef = useRef<HTMLAudioElement | null>(null);
    const typeRef = useRef<HTMLAudioElement | null>(null);
    // Store array of tear sounds
    const tearRefs = useRef<HTMLAudioElement[]>([]);

    // Initialize audio objects on mount
    useEffect(() => {
        clickRef.current = new Audio(content.audio.click);
        hoverRef.current = new Audio(content.audio.hover);
        successRef.current = new Audio(content.audio.success);
        typeRef.current = new Audio(content.audio.type);

        // Load multiple tear sounds
        if (Array.isArray(content.audio.tear)) {
            tearRefs.current = content.audio.tear.map(url => {
                const audio = new Audio(url);
                audio.load();
                return audio;
            });
        }

        // Preload singles
        clickRef.current.load();
        hoverRef.current.load();
        successRef.current.load();
        typeRef.current.load();

        // Volume settings
        if (hoverRef.current) hoverRef.current.volume = 0.2;
        if (clickRef.current) clickRef.current.volume = 0.5;
        if (successRef.current) successRef.current.volume = 0.4;
        if (typeRef.current) typeRef.current.volume = 0.4; // Mac keyboard volume

    }, []);

    const playSound = useCallback((audioRef: React.MutableRefObject<HTMLAudioElement | null>, volume = 0.5, duration?: number) => {
        if (isMuted || !audioRef.current) return;

        // Clone the node to allow overlapping sounds (polyphony)
        const sound = audioRef.current.cloneNode() as HTMLAudioElement;
        sound.volume = volume;
        sound.play().catch(() => { });

        // Enforce max duration if specified
        if (duration) {
            setTimeout(() => {
                sound.pause();
            }, duration);
        }
    }, [isMuted]);

    const playClick = useCallback(() => playSound(clickRef, 0.5), [playSound]);
    const playHover = useCallback(() => playSound(hoverRef, 0.2), [playSound]);
    const playSuccess = useCallback(() => {
        if (isMuted || !successRef.current) return;
        // Don't clone for Success - we want absolute lowest latency for the big moment
        successRef.current.currentTime = 0;
        successRef.current.volume = 0.9;
        successRef.current.play().catch(() => { });
    }, [isMuted]);

    const startWriting = useCallback(() => {
        if (isMuted || !typeRef.current) return;
        typeRef.current.loop = true;
        typeRef.current.volume = 0.9;
        typeRef.current.play().catch(() => { });
    }, [isMuted]);

    const stopWriting = useCallback(() => {
        if (!typeRef.current) return;
        typeRef.current.pause();
        typeRef.current.currentTime = 0;
    }, []);

    const playTear = useCallback(() => {
        if (isMuted || tearRefs.current.length === 0) return;
        const randomIndex = Math.floor(Math.random() * tearRefs.current.length);
        const originalAudio = tearRefs.current[randomIndex];

        // Clone for polyphony
        const sound = originalAudio.cloneNode() as HTMLAudioElement;
        sound.volume = 0.5;
        sound.play().catch(() => { });

        // Stop after 800ms to ensure the rip usage is heard but doesn't linger too long
        setTimeout(() => {
            sound.pause();
        }, 800);
    }, [isMuted]);

    const toggleMute = () => setIsMuted(!isMuted);

    return { playClick, playHover, playSuccess, playTear, startWriting, stopWriting, isMuted, toggleMute };
}
