"use client";

import { Heart } from "lucide-react";
import Image from "next/image";
import LoveMeter from "./LoveMeter";
import MusicPlayer from "./MusicPlayer";
import ReasonCard from "./ReasonCard";
import LoveLetter from "./LoveLetter";
import LoveCoupon from "./LoveCoupon";
import content from "@/app/content.json";

export default function CelebrationSection() {
    return (
        <div className="relative z-10 mx-auto max-w-5xl px-4 md:px-6 py-12 flex flex-col items-center gap-8 md:gap-12 pb-24">

            {/* Header: Fade in down */}
            <div className="text-center space-y-6 mb-8 animate-in slide-in-from-top-10 fade-in duration-1000 ease-out">
                <h1 className="text-5xl md:text-7xl font-romantic text-pink-600 drop-shadow-md tracking-wide animate-bounce">
                    {content.celebration.header}
                </h1>
                <p className="text-xl md:text-2xl font-elegant italic text-rose-500 font-medium tracking-wide animate-pulse-soft">
                    {content.celebration.subheader}
                </p>
            </div>

            {/* Video: Scale in with delay */}
            <div className="relative group max-w-xs md:max-w-sm w-full mx-auto animate-in zoom-in fade-in duration-1000 delay-300 fill-mode-backwards animate-breathe">
                <div className="absolute -inset-4 bg-gradient-to-tr from-pink-500/30 via-rose-400/30 to-pink-500/30 rounded-[2rem] blur-2xl opacity-60 animate-pulse-soft"></div>
                <div className="relative rounded-[2rem] overflow-hidden border-2 border-white shadow-xl shadow-pink-200/50 aspect-video transform transition-transform duration-700 hover:scale-[1.01]">
                    <Image
                        alt="Happy Cat"
                        fill
                        className="object-cover"
                        src="https://media.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif"
                        unoptimized
                    />
                </div>
            </div>

            {/* Love Meter: Slide up with delay */}
            <div className="w-full max-w-5xl animate-in slide-in-from-bottom-5 fade-in duration-1000 delay-500 fill-mode-backwards">
                <LoveMeter />
            </div>

            {/* Grid: Slide up with more delay */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full animate-in slide-in-from-bottom-10 fade-in duration-1000 delay-700 fill-mode-backwards">
                <ReasonCard />
                <MusicPlayer />
            </div>

            {/* Love Coupons: Horizontal Scroll */}
            <div className="w-full max-w-5xl animate-in slide-in-from-bottom-10 fade-in duration-1000 delay-800 fill-mode-backwards space-y-8">
                <div className="text-center space-y-2">
                    <h2 className="font-romantic text-3xl md:text-5xl text-rose-500">Love Coupons</h2>
                    <p className="font-elegant italic text-pink-400">Redeem anytime, no expiration date 🎟️</p>
                </div>

                <div className="flex flex-wrap justify-center gap-6 pb-4">
                    {content.coupons.map((coupon, index) => (
                        <LoveCoupon
                            key={index}
                            index={index}
                            title={coupon.title}
                            description={coupon.description}
                            color={coupon.color}
                        />
                    ))}
                </div>
            </div>

            {/* Love Letter: Slide up last */}
            <div className="w-full animate-in slide-in-from-bottom-10 fade-in duration-1000 delay-1000 fill-mode-backwards">
                <LoveLetter />
            </div>

            {/* Footer: Static at bottom */}
            <div className="mt-12 flex justify-center opacity-60 hover:opacity-100 transition-opacity duration-500 z-10">
                <p className="font-elegant italic text-rose-400 text-sm tracking-widest flex items-center gap-2 bg-white/40 backdrop-blur-sm px-6 py-2 rounded-full border border-pink-100/50 shadow-sm hover:bg-white/60 transition-colors">
                    Made with <Heart className="w-4 h-4 fill-rose-300 animate-pulse" /> for my favorite person
                </p>
            </div>

        </div>
    );
}
