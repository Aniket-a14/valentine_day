"use client";

import { useRef, useState } from "react";
import confetti from "canvas-confetti";
import useSound from "@/hooks/use-sound";

interface CouponProps {
    title: string;
    description: string;
    color: string;
    index: number;
}

export default function LoveCoupon({ title, description, color, index }: CouponProps) {
    const [isRedeemed, setIsRedeemed] = useState(false);
    const { playTear, playHover } = useSound();

    // Rotation randomization for scattered look
    const rotate = useRef(Math.random() * 6 - 3).current;

    const handleRedeem = () => {
        if (isRedeemed) return;

        playTear();
        setIsRedeemed(true);

        // Fire small confetti burst
        confetti({
            particleCount: 20,
            spread: 40,
            origin: { x: 0.5, y: 0.7 }, // Approx center of screen
            colors: ['#ffffff', '#fb7185'],
            disableForReducedMotion: true
        });
    };

    return (
        <div
            className={`relative group cursor-pointer transition-all duration-500 ease-out select-none ${isRedeemed ? "opacity-50 grayscale scale-95" : "hover:-translate-y-2 hover:rotate-0"}`}
            style={{
                transform: isRedeemed ? `rotate(${rotate}deg) scale(0.95)` : `rotate(${rotate}deg)`,
                animationDelay: `${index * 100}ms`
            }}
            onClick={handleRedeem}
            onMouseEnter={playHover}
        >
            {/* Main Ticket Body */}
            <div className={`relative ${color} text-white p-6 rounded-lg shadow-md w-full max-w-[280px] h-[160px] flex flex-col justify-between overflow-hidden animate-in zoom-in duration-500 fill-mode-backwards`}>

                {/* Perforation Left */}
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[var(--background)] rounded-full"></div>
                {/* Perforation Right */}
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[var(--background)] rounded-full"></div>

                {/* Content */}
                <div className="flex flex-col items-center text-center gap-2 z-10">
                    <h3 className="font-romantic text-2xl tracking-wide drop-shadow-sm">{title}</h3>
                    <p className="font-elegant text-sm opacity-90 leading-tight">{description}</p>
                </div>

                <div className="border-t border-white/30 pt-2 flex justify-between items-end text-[10px] uppercase tracking-widest opacity-75 font-mono">
                    <span>No. {String(index + 1).padStart(3, '0')}</span>
                    <span>Valid Forever</span>
                </div>

                {/* Shine effect on hover */}
                {!isRedeemed && (
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 pointer-events-none"></div>
                )}
            </div>

            {/* Redeemed Stamp overlay */}
            {isRedeemed && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-in zoom-in duration-300">
                    <div className="border-4 border-white/80 text-white/80 font-bold text-xl uppercase tracking-widest px-4 py-2 rotate-[-15deg] rounded-lg bg-black/10 backdrop-blur-sm">
                        Redeemed
                    </div>
                </div>
            )}
        </div>
    );
}
