"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import content from "@/app/content.json";

// Hook to play sounds with performance optimizations
export default function useSound() {
    const [isMuted, setIsMuted] = useState(false);

    // Create refs for audio objects
    const clickRef = useRef<HTMLAudioElement | null>(null);
    const successRef = useRef<HTMLAudioElement | null>(null);
    const typeRef = useRef<HTMLAudioElement | null>(null);

    // Audio Pool for hover sounds to prevent lag on rapid movements
    const hoverPoolRef = useRef<HTMLAudioElement[]>([]);
    const POOL_SIZE = 5;
    const currentHoverIdxRef = useRef(0);
    const lastHoverTimeRef = useRef(0);

    // Store array of tear sounds
    const tearRefs = useRef<HTMLAudioElement[]>([]);

    // Initialize audio objects on mount
    useEffect(() => {
        clickRef.current = new Audio(content.audio.click);
        successRef.current = new Audio(content.audio.success);
        typeRef.current = new Audio(content.audio.type);

        // Pre-initialize hover pool
        for (let i = 0; i < POOL_SIZE; i++) {
            const audio = new Audio(content.audio.hover);
            audio.volume = 0.2;
            audio.load();
            hoverPoolRef.current.push(audio);
        }

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
        successRef.current.load();
        typeRef.current.load();

        // Volume settings
        if (clickRef.current) clickRef.current.volume = 0.5;
        if (successRef.current) successRef.current.volume = 0.4;
        if (typeRef.current) typeRef.current.volume = 0.4;

    }, []);

    const playSound = useCallback((audio: HTMLAudioElement | null, volume = 0.5) => {
        if (isMuted || !audio) return;

        audio.currentTime = 0;
        audio.volume = volume;
        audio.play().catch(() => { });
    }, [isMuted]);

    const playClick = useCallback(() => playSound(clickRef.current, 0.5), [playSound, isMuted]);

    const playHover = useCallback(() => {
        if (isMuted) return;

        const now = Date.now();
        // Throttle hover sounds to 50ms to prevent audio glitches
        if (now - lastHoverTimeRef.current < 50) return;
        lastHoverTimeRef.current = now;

        const pool = hoverPoolRef.current;
        if (pool.length === 0) return;

        const audio = pool[currentHoverIdxRef.current];
        audio.currentTime = 0;
        audio.play().catch(() => { });

        currentHoverIdxRef.current = (currentHoverIdxRef.current + 1) % POOL_SIZE;
    }, [isMuted]);

    const playSuccess = useCallback(() => {
        if (isMuted || !successRef.current) return;
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
        const audio = tearRefs.current[randomIndex];

        audio.currentTime = 0;
        audio.volume = 0.5;
        audio.play().catch(() => { });

        // Stop after 800ms to ensure the rip usage is heard but doesn't linger too long
        setTimeout(() => {
            audio.pause();
        }, 800);
    }, [isMuted]);

    const toggleMute = () => setIsMuted(!isMuted);

    return { playClick, playHover, playSuccess, playTear, startWriting, stopWriting, isMuted, toggleMute };
}
