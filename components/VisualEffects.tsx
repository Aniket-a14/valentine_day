"use client";

import dynamic from 'next/dynamic';

const GiftWrapper = dynamic(() => import("./GiftWrapper"), { ssr: false });
const NoiseOverlay = dynamic(() => import("./NoiseOverlay"), { ssr: false });
const CursorTrail = dynamic(() => import("./CursorTrail"), { ssr: false });

export default function VisualEffects() {
    return (
        <>
            <div id="ribbon-back-portal" className="absolute top-0 left-0 w-full h-full pointer-events-none z-0" />
            <div id="ribbon-front-portal" className="absolute top-0 left-0 w-full h-full pointer-events-none z-[60]" />
            <GiftWrapper />
            <NoiseOverlay />
            <CursorTrail />
        </>
    );
}
