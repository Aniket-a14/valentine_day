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
 * - PERFORMANCE OPTIMIZED: Uses refs and direct DOM manipulation for the path "d" attribute 
 *   to avoid React re-renders on every animation frame.
 */

export default function GiftWrapper() {
    const { showRibbon } = useRibbon();
    const [mounted, setMounted] = useState(false);
    const [frontPortal, setFrontPortal] = useState<HTMLElement | null>(null);
    const [backPortal, setBackPortal] = useState<HTMLElement | null>(null);

    // Using refs for animation state to avoid re-renders
    const frameRef = useRef(0);
    const docHeightRef = useRef(1000);
    const isMobileRef = useRef(false);
    const requestRef = useRef<number>(null);
    const throttledUpdateRef = useRef<NodeJS.Timeout>(null);

    // DOM Refs for direct manipulation
    const backPathRef = useRef<SVGPathElement>(null);
    const backAccentPathRef = useRef<SVGPathElement>(null);
    const shadowPathRef = useRef<SVGPathElement>(null);
    const frontPathRef = useRef<SVGPathElement>(null);
    const frontSheenPathRef = useRef<SVGPathElement>(null);
    const backSVGRef = useRef<SVGSVGElement>(null);
    const frontSVGRef = useRef<SVGSVGElement>(null);

    const speedDivisor = content.settings?.ribbonSpeed ?? 8000;

    useEffect(() => {
        setMounted(true);
        isMobileRef.current = window.innerWidth < 768;
        setFrontPortal(document.getElementById('ribbon-front-portal'));
        setBackPortal(document.getElementById('ribbon-back-portal'));
    }, []);

    interface RibbonVertex {
        p: { x: number; y: number };
        nx: number;
        ny: number;
        width: number;
        depthFactor: number;
    }

    const updateGeometry = () => {
        if (!showRibbon) return;
        const h = docHeightRef.current;
        const steps = isMobileRef.current ? 40 : 120; // Reduced from 120/380
        const frame = frameRef.current;
        const baseWidth = 3.2;

        const getPath = (t: number) => {
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

        const ribbonGeometry: RibbonVertex[] = [];
        for (let i = 0; i <= steps; i++) {
            const t = i / steps;
            const p = getPath(t);
            const d = getDerivative(t);
            const len = Math.sqrt(d.x ** 2 + d.y ** 2);
            const nx = -d.y / len;
            const ny = d.x / len;

            const twist = Math.sin(t * Math.PI * 4.2 + frame) + Math.cos(t * Math.PI * 1.5 + frame * 0.5) * 0.5;
            const perspective = Math.abs(twist);
            const snz = Math.sin(twist);

            ribbonGeometry.push({
                p, nx, ny,
                width: baseWidth * perspective,
                depthFactor: snz
            });
        }

        const buildPath = (indices: number[]) => {
            if (indices.length < 2) return "";
            const left: string[] = [];
            const right: string[] = [];
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
        let curIsFront = ribbonGeometry[0].depthFactor > 0.1;

        for (let i = 0; i < ribbonGeometry.length; i++) {
            const v = ribbonGeometry[i];
            const isFront = v.depthFactor > 0.1;

            if (isFront !== curIsFront && currentRun.length > 0) {
                const p = buildPath(currentRun);
                if (curIsFront) frontPaths.push(p); else backPaths.push(p);
                currentRun = [currentRun[currentRun.length - 1]];
                curIsFront = isFront;
            }
            currentRun.push(i);
            // Optimization: Skip shadow segments to reduce path complexity
            if (i % 12 === 0) shad.push(`M ${v.p.x + 1} ${v.p.y + 2} h 0.1`);
        }

        const finalP = buildPath(currentRun);
        if (curIsFront) frontPaths.push(finalP); else backPaths.push(finalP);

        // Direct DOM update
        const backD = backPaths.join(" ");
        const frontD = frontPaths.join(" ");
        if (backPathRef.current) backPathRef.current.setAttribute('d', backD);
        if (backAccentPathRef.current) backAccentPathRef.current.setAttribute('d', backD);
        if (shadowPathRef.current) shadowPathRef.current.setAttribute('d', shad.join(" "));
        if (frontPathRef.current) frontPathRef.current.setAttribute('d', frontD);
        if (frontSheenPathRef.current) frontSheenPathRef.current.setAttribute('d', frontD);
    };

    useEffect(() => {
        if (!mounted || !showRibbon) return;

        const animate = (time: number) => {
            frameRef.current = time / speedDivisor;
            updateGeometry();
            requestRef.current = requestAnimationFrame(animate);
        };
        requestRef.current = requestAnimationFrame(animate);
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        }
    }, [mounted, showRibbon, speedDivisor]);

    useEffect(() => {
        if (!mounted || !showRibbon) return;

        const updateDocHeight = () => {
            if (throttledUpdateRef.current) return;
            throttledUpdateRef.current = setTimeout(() => {
                const main = document.getElementById('main-content');
                if (main) {
                    const rect = main.getBoundingClientRect();
                    const scrollY = window.scrollY;
                    docHeightRef.current = Math.max(document.documentElement.scrollHeight, rect.height + rect.top + scrollY + 40);
                } else {
                    docHeightRef.current = document.documentElement.scrollHeight;
                }

                // Update SVG viewBoxes directly
                if (backSVGRef.current) backSVGRef.current.setAttribute('viewBox', `0 0 100 ${docHeightRef.current}`);
                if (frontSVGRef.current) frontSVGRef.current.setAttribute('viewBox', `0 0 100 ${docHeightRef.current}`);

                throttledUpdateRef.current = null;
            }, 100);
        };

        updateDocHeight();
        const observer = new MutationObserver(updateDocHeight);
        observer.observe(document.body, { childList: true, subtree: true });

        const handleResize = () => {
            isMobileRef.current = window.innerWidth < 768;
            updateDocHeight();
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', updateDocHeight);
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', updateDocHeight);
            observer.disconnect();
            if (throttledUpdateRef.current) clearTimeout(throttledUpdateRef.current);
        };
    }, [mounted, showRibbon]);

    const CommonDefs = useMemo(() => (
        <defs>
            <linearGradient id="silk-sheen-physics" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="white" stopOpacity="0" />
                <stop offset="50%" stopColor="white" stopOpacity="0.25" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
        </defs>
    ), []);

    const BackSVG = (
        <svg
            ref={backSVGRef}
            viewBox={`0 0 100 ${docHeightRef.current}`}
            preserveAspectRatio="none"
            className="w-full h-full"
            style={{ overflow: 'visible', willChange: 'transform' }}
        >
            {CommonDefs}
            <path ref={shadowPathRef} d="" fill="none" stroke="black" strokeWidth="8" className="opacity-[0.05]" /> {/* Removed blur-3xl */}
            <path ref={backPathRef} d="" fill="#fb7185" className="opacity-95" />
            <path ref={backAccentPathRef} d="" fill="#e11d48" className="opacity-60" />
        </svg>
    );

    const FrontSVG = (
        <svg
            ref={frontSVGRef}
            viewBox={`0 0 100 ${docHeightRef.current}`}
            preserveAspectRatio="none"
            className="w-full h-full"
            style={{ overflow: 'visible', willChange: 'transform' }}
        >
            {CommonDefs}
            <path ref={frontPathRef} d="" fill="#fb7185" className="opacity-100" />
            <path ref={frontSheenPathRef} d="" fill="url(#silk-sheen-physics)" className="mix-blend-overlay opacity-30" />
        </svg>
    );

    if (!mounted || !showRibbon) return null;

    return (
        <>
            {backPortal && createPortal(BackSVG, backPortal)}
            {frontPortal && createPortal(FrontSVG, frontPortal)}
        </>
    );
}
