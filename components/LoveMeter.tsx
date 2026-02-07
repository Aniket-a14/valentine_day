"use client";

import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { TrendingUp, Heart } from "lucide-react";

export default function LoveMeter() {
    const [lovePercent, setLovePercent] = useState(0);

    useEffect(() => {
        // Count up animation on mount
        let start = 0;
        const end = 100;
        const duration = 2000;
        const incrementTime = duration / end;

        const timer = setInterval(() => {
            start += 1;
            setLovePercent(start);
            if (start === end) clearInterval(timer);
        }, incrementTime);

        return () => clearInterval(timer);
    }, []);

    const boostLove = () => {
        setLovePercent((prev) => prev + Math.floor(Math.random() * 50) + 10);
        // Fire confetti from bottom corners
        confetti({
            particleCount: 30,
            spread: 60,
            origin: { x: 0.1, y: 0.8 },
            colors: ['#f43f5e', '#ec4899', '#ffffff'],
            disableForReducedMotion: true
        });
        confetti({
            particleCount: 30,
            spread: 60,
            origin: { x: 0.9, y: 0.8 },
            colors: ['#f43f5e', '#ec4899', '#ffffff'],
            disableForReducedMotion: true
        });
    };

    return (
        <div className="w-full card-comfy flex items-center justify-between px-6 py-2 group animate-in slide-in-from-bottom-5 duration-1000 hover:scale-[1.02] active:scale-[0.98] transition-transform duration-500 ease-out">
            <div className="flex items-center gap-4">
                <div className="flex flex-col">
                    <span className="font-elegant italic text-pink-600 font-medium text-base tracking-wide leading-tight">Love Meter</span>
                    <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4 text-rose-400 fill-rose-400 animate-pulse-soft" />
                        <span className="font-romantic text-rose-600 text-3xl font-bold tabular-nums tracking-wide leading-none">{lovePercent}%</span>
                    </div>
                </div>
            </div>

            <button
                onClick={boostLove}
                className="btn-comfy-primary py-2 px-6 flex items-center gap-2 text-xs uppercase tracking-widest"
            >
                <TrendingUp className="w-3 h-3" />
                <span className="hidden sm:inline-block">Boost Love</span>
            </button>
        </div>
    );
}
