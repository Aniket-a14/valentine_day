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

    return (
        <div className="z-10 text-center max-w-xl w-full mx-auto flex flex-col items-center gap-10 animate-in fade-in zoom-in duration-1000">

            {/* Icon: Soft, floating, comforting */}
            <div className="relative mb-2">
                <div className={`w-28 h-28 bg-white/80 backdrop-blur-sm rounded-full shadow-[0_10px_40px_rgba(236,72,153,0.2)] flex items-center justify-center relative z-10 animate-bounce border border-pink-50 transition-transform duration-300 ${yesHover ? "scale-110" : "scale-100"}`}>
                    {yesHover ? (
                        <span className="text-5xl filter drop-shadow-sm">💘</span>
                    ) : (
                        <Heart className="w-12 h-12 text-rose-400 fill-rose-100 drop-shadow-sm" strokeWidth={1.5} />
                    )}
                </div>
                {/* Glow behind */}
                <div className="absolute inset-0 bg-pink-300 blur-3xl opacity-20 rounded-full animate-pulse-soft"></div>
            </div>

            {/* Typography: Warm & Romantic */}
            <h1 className="text-5xl md:text-7xl font-romantic text-rose-500 tracking-wide leading-tight drop-shadow-sm py-2 animate-breathe">
                Will you be<br />my Valentine?
            </h1>

            {/* Actions: Comfy Buttons */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-4 w-full">

                {/* Comfy YES Button - Massive & Changing Emoji */}
                <button
                    onClick={handleYesClick}
                    onMouseEnter={() => { setYesHover(true); playHover(); }}
                    onMouseLeave={() => setYesHover(false)}
                    className="btn-comfy-primary py-4 px-12 text-3xl md:py-6 md:px-20 md:text-5xl font-elegant italic min-w-[200px] md:min-w-[260px] flex items-center justify-center gap-4 animate-bounce hover:scale-105 transition-transform"
                >
                    Yes <span className="text-3xl md:text-4xl filter drop-shadow-md">{yesHover ? "💘" : "💖"}</span>
                </button>

                {/* Gentle NO Button */}
                {!isNoGone && (
                    <button
                        onMouseEnter={() => { handleNoClick(); playHover(); }}
                        onClick={handleNoClick}
                        className="btn-comfy-secondary py-3 px-8 text-lg font-elegant italic"
                        style={{
                            transform: `scale(${Math.max(1 - noCount * 0.1, 0.5)})`,
                            opacity: Math.max(1 - noCount * 0.1, 0)
                        }}
                    >
                        {getNoButtonText()}
                    </button>
                )}
            </div>

            {/* Footer: Static at bottom */}
            <div className="mt-16 flex justify-center opacity-60 hover:opacity-100 transition-opacity duration-500 z-10">
                <p className="font-elegant italic text-rose-400 text-sm tracking-widest flex items-center gap-2 bg-white/40 backdrop-blur-sm px-6 py-2 rounded-full border border-pink-100/50 shadow-sm pointer-events-auto hover:bg-white/60 transition-colors">
                    Made with <Heart className="w-4 h-4 fill-rose-300 animate-pulse" /> for my favorite person
                </p>
            </div>
        </div>
    );
}
