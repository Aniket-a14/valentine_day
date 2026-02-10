"use client";

import { useState } from "react";
import { Heart } from "lucide-react";

import content from "@/app/content.json";

const REASONS = content.reasons;

import useSound from "@/hooks/use-sound";

// ...

export default function ReasonCard() {
    const [index, setIndex] = useState(0);
    const { playClick, playHover } = useSound();

    const nextReason = () => {
        playClick();
        setIndex((prev) => (prev + 1) % REASONS.length);
    };

    return (
        <div className="w-full h-full card-comfy flex flex-col justify-between p-6 md:p-8 animate-in slide-in-from-left-5 duration-1000 delay-200 hover:scale-[1.02] transition-transform duration-500 ease-out">

            {/* Header */}
            <div className="flex items-center gap-3">
                <Heart className="w-5 h-5 text-rose-400 fill-rose-100/50" />
                <h3 className="font-elegant font-bold text-lg text-rose-500">Why you're special</h3>
            </div>

            {/* Centered Quote */}
            <div className="flex-1 flex items-center justify-center p-4">
                <p key={index} className="font-elegant italic text-rose-600 text-xl md:text-2xl text-center leading-relaxed animate-in fade-in zoom-in duration-500">
                    "{REASONS[index]}"
                </p>
            </div>

            {/* Button */}
            <div className="flex justify-center pt-2">
                <button
                    onClick={nextReason}
                    onMouseEnter={playHover}
                    className="btn-comfy-secondary py-2 px-6 text-sm flex items-center gap-2 bg-pink-50/50 border-pink-100 hover:bg-pink-100 transition-colors rounded-full"
                >
                    Tell me more <span className="text-lg">:)</span>
                </button>
            </div>
        </div>
    );
}
