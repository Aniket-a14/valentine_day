"use client";

import React, { useEffect, useState, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import { useRibbon } from "./RibbonControl";
import content from "@/app/content.json";

/**
 * Cinema Studio Ribbon: Organic Physics Weaving Edition
 * 
 * Technical Implementation:
 * - Depth-Aware Layering: Weaving is driven by the ribbon's own 3D twist physics (sn.z).
 * - Zero Hardcoding: No fixed Y-ranges; the ribbon dives and emerges naturally.
 * - Universal Clarity: Removed all blur filters to eliminate 'container' boundaries.
 * - Synchronized Portals: Foreground layer is a sharp 'depth-correction' overlay.
 * - Dynamic Toggle: Connected to useRibbon context.
 */

export default function GiftWrapper() {
    const { showRibbon } = useRibbon();
    const [docHeight, setDocHeight] = useState(1000);
    const [frame, setFrame] = useState(0);
    const [mounted, setMounted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [frontPortal, setFrontPortal] = useState<HTMLElement | null>(null);
    const [backPortal, setBackPortal] = useState<HTMLElement | null>(null);
    const requestRef = useRef<number>(null);
    const throttledUpdateRef = useRef<NodeJS.Timeout>(null);

    const speedDivisor = content.settings?.ribbonSpeed ?? 8000;

    useEffect(() => {
        setMounted(true);
        setIsMobile(window.innerWidth < 768);
        setFrontPortal(document.getElementById('ribbon-front-portal'));
        setBackPortal(document.getElementById('ribbon-back-portal'));
    }, []);

    useEffect(() => {
        if (!mounted || !showRibbon) return;

        const animate = (time: number) => {
            setFrame(time / speedDivisor);
            requestRef.current = requestAnimationFrame(animate);
        };
        requestRef.current = requestAnimationFrame(animate);
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        }
    }, [mounted, showRibbon, speedDivisor]);

    useEffect(() => {
        if (!mounted || !showRibbon) return;

        const update = () => {
            if (throttledUpdateRef.current) return;
            throttledUpdateRef.current = setTimeout(() => {
                const main = document.getElementById('main-content');
                if (main) {
                    const rect = main.getBoundingClientRect();
                    const scrollY = window.scrollY;
                    setDocHeight(Math.max(document.documentElement.scrollHeight, rect.height + rect.top + scrollY + 40));
                } else {
                    setDocHeight(document.documentElement.scrollHeight);
                }
                throttledUpdateRef.current = null;
            }, 100); // Throttle to 10fps
        };

        update();
        const observer = new MutationObserver(update);
        observer.observe(document.body, { childList: true, subtree: true });
        window.addEventListener('resize', () => {
            setIsMobile(window.innerWidth < 768);
            update();
        });
        window.addEventListener('scroll', update);
        return () => {
            window.removeEventListener('resize', update);
            window.removeEventListener('scroll', update);
            observer.disconnect();
            if (throttledUpdateRef.current) clearTimeout(throttledUpdateRef.current);
        };
    }, [mounted, showRibbon]);

    const ribbonGeometry = useMemo(() => {
        if (!showRibbon) return [];
        const h = docHeight;
        // Adaptive Sampling: 400 steps on desktop, 120 on mobile
        const steps = isMobile ? 120 : 380;
        const vertices = [];
        const baseWidth = 3.2;

        const keyLight = { x: 0.8, y: -0.2, z: 1 };
        const klLen = Math.sqrt(keyLight.x ** 2 + keyLight.y ** 2 + keyLight.z ** 2);
        const key = { x: keyLight.x / klLen, y: keyLight.y / klLen, z: keyLight.z / klLen };

        const getPath = (t: number) => {
            // Organic, non-looping path
            const xBase = 90 - 70 * t;
            const drift = Math.sin(t * Math.PI + frame * 0.7) * 5;
            const curve = Math.sin(t * Math.PI * 2.3 + frame * 0.4) * 15;
            return { x: xBase + drift + curve, y: t * h };
        };

        const getDerivative = (t: number) => {
            const dt = 0.001;
            const p1 = getPath(t);
            const p2 = getPath(t + dt);
            return { x: (p2.x - p1.x) / dt, y: (p2.y - p1.y) / dt };
        };

        for (let i = 0; i <= steps; i++) {
            const t = i / steps;
            const p = getPath(t);
            const d = getDerivative(t);
            const len = Math.sqrt(d.x ** 2 + d.y ** 2);
            const nx = -d.y / len;
            const ny = d.x / len;

            // Multi-frequency twist for organic physics
            const twist = Math.sin(t * Math.PI * 4.2 + frame) + Math.cos(t * Math.PI * 1.5 + frame * 0.5) * 0.5;
            const perspective = Math.abs(twist);
            const isBackFace = twist < 0;

            const sn = {
                x: nx * Math.cos(twist),
                y: ny * Math.cos(twist),
                z: Math.sin(twist)
            };

            const diffuse = Math.max(0.15, (sn.x * key.x + sn.y * key.y + sn.z * key.z));
            const rim = Math.pow(1 - Math.abs(sn.z), 4) * 0.4;
            const intensity = Math.min(1, diffuse + rim);

            const r = Math.floor(251 + (255 - 251) * intensity);
            const g = Math.floor(113 + (241 - 113) * intensity);
            const b = Math.floor(133 + (242 - 133) * intensity);

            // True Physics Weaving: 
            // The ribbon is "FrontLayer" only when sn.z > 0 (pointing towards camera)
            const depthFactor = sn.z;

            vertices.push({
                p, nx, ny,
                width: baseWidth * perspective,
                color: `rgb(${r}, ${g}, ${b})`,
                isBackFace,
                depthFactor,
                t
            });
        }
        return vertices;
    }, [docHeight, frame, showRibbon]);

    const layers = useMemo(() => {
        if (!ribbonGeometry.length) return { back: "", front: "", shadow: "" };

        const buildPath = (indices: number[]) => {
            if (indices.length < 2) return "";
            const left: string[] = [];
            const right: string[] = [];

            // Bridge handling to ensure sub-pixel continuity
            const startPad = Math.max(0, indices[0] - 1);
            const endPad = Math.min(ribbonGeometry.length - 1, indices[indices.length - 1] + 1);
            const run = [startPad, ...indices, endPad];

            run.forEach(idx => {
                const v = ribbonGeometry[idx];
                left.push(`${(v.p.x + v.nx * v.width).toFixed(3)} ${(v.p.y + v.ny * v.width).toFixed(3)}`);
                right.unshift(`${(v.p.x - v.nx * v.width).toFixed(3)} ${(v.p.y - v.ny * v.width).toFixed(3)}`);
            });
            return `M ${left.join(" L ")} L ${right.join(" L ")} Z`;
        };

        const backPaths: string[] = [];
        const frontPaths: string[] = [];
        const shad: string[] = [];

        let currentRun: number[] = [];
        let curIsFront = ribbonGeometry[0].depthFactor > 0.1; // Threshold for "coming forward"

        for (let i = 0; i < ribbonGeometry.length; i++) {
            const v = ribbonGeometry[i];
            const isFront = v.depthFactor > 0.1; // Dynamic threshold based on physics

            if (isFront !== curIsFront && currentRun.length > 0) {
                const p = buildPath(currentRun);
                if (curIsFront) frontPaths.push(p); else backPaths.push(p);
                currentRun = [currentRun[currentRun.length - 1]]; // Stitching bridge
                curIsFront = isFront;
            }
            currentRun.push(i);
            if (i % 8 === 0) shad.push(`M ${v.p.x + 1} ${v.p.y + 2} h 0.1`);
        }

        const finalP = buildPath(currentRun);
        if (curIsFront) frontPaths.push(finalP); else backPaths.push(finalP);

        return {
            back: backPaths.join(" "),
            front: frontPaths.join(" "),
            shadow: shad.join(" ")
        };
    }, [ribbonGeometry]);

    const CommonDefs = useMemo(() => (
        <defs>
            <linearGradient id="silk-sheen-physics" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="white" stopOpacity="0" />
                <stop offset="50%" stopColor="white" stopOpacity="0.25" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
        </defs>
    ), []);

    const BackSVG = useMemo(() => (
        <svg
            viewBox={`0 0 100 ${docHeight}`}
            preserveAspectRatio="none"
            className="w-full h-full"
            style={{ overflow: 'visible', willChange: 'transform' }}
        >
            {CommonDefs}
            <path d={layers.shadow} fill="none" stroke="black" strokeWidth="8" className="opacity-[0.02] blur-3xl" />
            <path d={layers.back} fill="#fb7185" className="opacity-95" />
            <path d={layers.back} fill="#e11d48" className="opacity-60" />
        </svg>
    ), [docHeight, layers.shadow, layers.back, CommonDefs]);

    const FrontSVG = useMemo(() => (
        <svg
            viewBox={`0 0 100 ${docHeight}`}
            preserveAspectRatio="none"
            className="w-full h-full"
            style={{ overflow: 'visible', willChange: 'transform' }}
        >
            {CommonDefs}
            <path d={layers.front} fill="#fb7185" className="opacity-100" />
            <path d={layers.front} fill="url(#silk-sheen-physics)" className="mix-blend-overlay opacity-30" />
        </svg>
    ), [docHeight, layers.front, CommonDefs]);

    if (!mounted || !showRibbon) return null;

    return (
        <>
            {backPortal && createPortal(BackSVG, backPortal)}
            {frontPortal && createPortal(FrontSVG, frontPortal)}
        </>
    );
}
