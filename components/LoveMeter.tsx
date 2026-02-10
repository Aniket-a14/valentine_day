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
        <div className="w-full card-comfy flex flex-col md:flex-row items-center justify-between p-4 md:px-8 gap-4 group animate-in slide-in-from-bottom-5 duration-1000 hover:scale-[1.01] transition-transform duration-500 ease-out bg-white/40 backdrop-blur-xl border border-rose-100/50 shadow-md relative overflow-hidden">

            {/* Subtle Progress Background */}
            <div
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-rose-400 via-pink-500 to-rose-400 opacity-50 transition-all duration-1000 ease-out"
                style={{ width: `${Math.min(lovePercent, 100)}%` }}
            />

            <div className="flex items-center gap-6 z-10">
                <div className="flex items-center gap-3">
                    <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-pulse-soft" />
                    <h2 className="font-elegant italic text-rose-600 font-bold text-lg tracking-wide">Love Meter</h2>
                </div>

                {/* Number Display */}
                <div className="relative">
                    <span className="font-romantic text-4xl md:text-5xl text-rose-600 font-bold tabular-nums tracking-tight leading-none drop-shadow-sm">
                        {lovePercent}%
                    </span>
                    {/* Tiny floating hearts decoration */}
                    <Heart className="absolute -top-1 -right-3 w-3 h-3 text-pink-300 fill-pink-200 animate-bounce-slow opacity-80" />
                </div>
            </div>

            <button
                onClick={boostLove}
                className="btn-comfy-primary py-2 px-6 text-sm uppercase tracking-widest shadow-md hover:shadow-rose-300 transition-all active:scale-95 z-10"
            >
                <div className="flex items-center justify-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    <span>Boost Love</span>
                </div>
            </button>
        </div>
    );
}
