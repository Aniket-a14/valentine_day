"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import content from "@/app/content.json";

// Hook to play sounds with extreme performance optimizations
export default function useSound() {
    const [isMuted, setIsMuted] = useState(false);

    // Use a WeakMap or just a cache object for lazy-loaded audio
    const audioCacheRef = useRef<Record<string, HTMLAudioElement>>({});

    // State to track if a priority sound (click/success) is playing
    const isPrioritySoundPlayingRef = useRef(false);

    // Audio Pool for hover sounds - Lazy initialized
    const hoverPoolRef = useRef<HTMLAudioElement[]>([]);
    const POOL_SIZE = 3; // Reduced from 5 for memory efficiency
    const currentHoverIdxRef = useRef(0);
    const lastHoverTimeRef = useRef(0);

    const getAudio = useCallback((url: string, volume = 0.5, forceNew = false) => {
        if (audioCacheRef.current[url] && !forceNew) return audioCacheRef.current[url];

        const audio = new Audio(url);
        audio.volume = volume;
        if (!forceNew) audioCacheRef.current[url] = audio;
        return audio;
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            Object.values(audioCacheRef.current).forEach(a => {
                a.pause();
                a.src = "";
            });
            hoverPoolRef.current.forEach(a => {
                a.pause();
                a.src = "";
            });
        };
    }, []);

    const playSound = useCallback((url: string, volume = 0.5, isPriority = false) => {
        if (isMuted) return;

        const audio = getAudio(url, volume);

        if (isPriority) {
            isPrioritySoundPlayingRef.current = true;
            setTimeout(() => {
                isPrioritySoundPlayingRef.current = false;
            }, 300);
        }

        audio.currentTime = 0;
        audio.volume = volume;
        audio.play().catch(() => { });
    }, [isMuted, getAudio]);


    const playClick = useCallback(() => playSound(content.audio.click, 0.5, true), [playSound]);

    const playHover = useCallback(() => {
        if (isMuted || isPrioritySoundPlayingRef.current) return;

        const now = Date.now();
        if (now - lastHoverTimeRef.current < 80) return;
        lastHoverTimeRef.current = now;

        if (hoverPoolRef.current.length < POOL_SIZE) {
            const audio = new Audio(content.audio.hover);
            audio.volume = 0.15;
            hoverPoolRef.current.push(audio);
        }

        const audio = hoverPoolRef.current[currentHoverIdxRef.current];
        audio.currentTime = 0;
        audio.play().catch(() => { });

        currentHoverIdxRef.current = (currentHoverIdxRef.current + 1) % POOL_SIZE;
    }, [isMuted]);

    const playSuccess = useCallback(() => {
        if (isMuted) return;
        isPrioritySoundPlayingRef.current = true;

        const audio = getAudio(content.audio.success, 0.9);
        audio.currentTime = 0;
        audio.play().catch(() => { });

        setTimeout(() => {
            isPrioritySoundPlayingRef.current = false;
        }, 2000);
    }, [isMuted, getAudio]);

    const startWriting = useCallback(() => {
        if (isMuted) return;
        const audio = getAudio(content.audio.type, 0.8);
        audio.loop = true;
        audio.play().catch(() => { });
    }, [isMuted, getAudio]);

    const stopWriting = useCallback(() => {
        const audio = audioCacheRef.current[content.audio.type];
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
    }, []);

    const playTear = useCallback(() => {
        if (isMuted || !content.audio.tear) return;
        isPrioritySoundPlayingRef.current = true;

        const urls = Array.isArray(content.audio.tear) ? content.audio.tear : [content.audio.tear];
        const url = urls[Math.floor(Math.random() * urls.length)];

        // Don't cache tear sounds to keep memory low for one-offs
        const audio = new Audio(url);
        audio.volume = 0.5;
        audio.play().catch(() => { });

        setTimeout(() => {
            audio.pause();
            audio.src = ""; // Force release
            isPrioritySoundPlayingRef.current = false;
        }, 800);
    }, [isMuted]);

    const toggleMute = () => setIsMuted(!isMuted);

    return { playClick, playHover, playSuccess, playTear, startWriting, stopWriting, isMuted, toggleMute };
}
