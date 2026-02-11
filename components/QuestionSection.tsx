"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import { Heart } from "lucide-react";
import content from "@/app/content.json";
import useSound from "@/hooks/use-sound";

interface QuestionSectionProps {
    onAccept: () => void;
}

const NO_PHRASES = content.no_phrases;

export default function QuestionSection({ onAccept }: QuestionSectionProps) {
    const [noCount, setNoCount] = useState(0);
    const [yesHover, setYesHover] = useState(false);
    const { playClick, playHover, playSuccess } = useSound();
    const [isShaking, setIsShaking] = useState(false);

    const handleYesClick = () => {
        // Trigger sound immediately
        playSuccess();

        // Stagger the heavy heavy animation/state change to prioritize audio thread
        setTimeout(() => {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { x: 0.5, y: 0.6 },
                colors: ['#be185d', '#f472b6', '#ffffff']
            });
            onAccept();
        }, 50);
    };

    const handleNoClick = () => {
        playClick();
        setNoCount(noCount + 1);
    };

    const getNoButtonText = () => {
        return NO_PHRASES[Math.min(noCount, NO_PHRASES.length - 1)];
    };

    const isNoGone = noCount >= NO_PHRASES.length;

    const triggerShake = () => {
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 400);
    };

    const handleNoInteraction = () => {
        handleNoClick();
        triggerShake();
    }

    return (
        <div className="z-10 text-center max-w-xl w-full mx-auto flex flex-col items-center gap-12 animate-in fade-in zoom-in duration-1000">

            {/* Icon: Soft, floating, comforting */}
            <div className="relative mb-4">
                <div className={`w-28 h-28 bg-white/30 backdrop-blur-2xl rounded-full shadow-[0_8px_32px_rgba(236,72,153,0.1)] flex items-center justify-center relative z-10 animate-float-slow border border-white/40 transition-all duration-700 ${yesHover ? "scale-105 shadow-[0_12px_48px_rgba(236,72,153,0.2)]" : "scale-100"}`}>
                    <Heart
                        className={`w-12 h-12 transition-all duration-700 leading-none ${yesHover ? "text-rose-500 fill-rose-500 scale-110" : "text-rose-400 fill-rose-100"}`}
                        strokeWidth={1.5}
                    />
                </div>
                {/* Glow behind */}
                <div className="absolute inset-0 bg-rose-200 blur-3xl opacity-20 rounded-full animate-pulse-soft"></div>
            </div>

            {/* Typography: Warm & Romantic */}
            <h1 className="text-4xl md:text-6xl font-romantic text-rose-500 tracking-wider leading-[1.2] py-2 animate-breathe max-w-lg mx-auto drop-shadow-[0_2px_10px_rgba(251,113,133,0.1)]">
                Will you be my Valentine?
            </h1>

            {/* Actions: Comfy Buttons */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-12 mt-8 w-full min-h-[160px]">

                {/* Comfy YES Button - Elegant & Focused */}
                <button
                    onClick={handleYesClick}
                    onMouseEnter={() => { setYesHover(true); playHover(); }}
                    onMouseLeave={() => setYesHover(false)}
                    className="btn-comfy-primary py-4 px-16 text-2xl md:py-6 md:px-24 md:text-3xl font-elegant italic min-w-[200px] md:min-w-[340px] flex items-center justify-center gap-4 z-20"
                >
                    Yes <Heart className={`w-6 h-6 md:w-8 md:h-8 transition-all duration-700 ${yesHover ? "fill-white scale-110" : "fill-rose-100"}`} />
                </button>

                {/* Gentle NO Button */}
                {!isNoGone && (
                    <button
                        onMouseEnter={handleNoInteraction}
                        onClick={handleNoInteraction}
                        className={`btn-comfy-secondary w-[150px] whitespace-nowrap py-3 px-4 text-lg font-elegant italic opacity-40 hover:opacity-100 transition-all duration-200 ${isShaking ? "animate-shake bg-rose-100/20 border-rose-200" : ""}`}
                        style={{
                            transform: `scale(${Math.max(1 - noCount * 0.15, 0)})`,
                            opacity: Math.max(1 - noCount * 0.15, 0),
                        }}
                    >
                        {getNoButtonText()}
                    </button>
                )}
            </div>

            {/* Footer: Static at bottom */}
            <div className="mt-32 flex justify-center opacity-20 hover:opacity-60 transition-opacity duration-1000 z-10">
                <p className="font-elegant italic text-rose-800 text-xs tracking-[0.3em] flex items-center gap-4 bg-white/5 backdrop-blur-xl px-12 py-4 rounded-full border border-white/10 pointer-events-auto hover:bg-white/10 transition-all">
                    MADE WITH <Heart className="w-3 h-3 fill-rose-800/40" /> FOR YOU
                </p>
            </div>
        </div>
    );
}
