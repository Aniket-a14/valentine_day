"use client";

import { useEffect, useRef } from "react";

interface Point {
    x: number;
    y: number;
    age: number;
    maxAge: number;
    color: string;
    size: number;
    vx: number;
    vy: number;
}

const COLORS = [
    "#f43f5e", // rose-500
    "#ec4899", // pink-500
    "#fb7185", // rose-400
    "#f472b6", // pink-400
];

export default function CursorTrail() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pointsRef = useRef<Point[]>([]);
    const requestRef = useRef<number>(null);

    const drawHeart = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, opacity: number) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.beginPath();
        ctx.scale(size / 10, size / 10);
        ctx.fillStyle = color;
        ctx.globalAlpha = opacity;

        // Heart path
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-5, -5, -10, 0, -10, 5);
        ctx.bezierCurveTo(-10, 10, -5, 15, 0, 20);
        ctx.bezierCurveTo(5, 15, 10, 10, 10, 5);
        ctx.bezierCurveTo(10, 0, 5, -5, 0, 0);

        ctx.fill();
        ctx.restore();
    };

    const animate = (time: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const currentPoints = pointsRef.current;
        for (let i = currentPoints.length - 1; i >= 0; i--) {
            const p = currentPoints[i];
            p.age++;
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.05; // Gentle gravity

            if (p.age > p.maxAge) {
                currentPoints.splice(i, 1);
                continue;
            }

            const opacity = 1 - (p.age / p.maxAge);
            drawHeart(ctx, p.x, p.y, p.size, p.color, opacity * 0.7);
        }

        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        const addPoint = (x: number, y: number) => {
            pointsRef.current.push({
                x,
                y,
                age: 0,
                maxAge: 40 + Math.random() * 20,
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
                size: 8 + Math.random() * 8,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2 - 1,
            });
            // Limit points
            if (pointsRef.current.length > 100) {
                pointsRef.current.shift();
            }
        };

        const handleMouseMove = (e: MouseEvent) => addPoint(e.clientX, e.clientY);
        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                addPoint(e.touches[0].clientX, e.touches[0].clientY);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("touchmove", handleTouchMove, { passive: true });

        requestRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("touchmove", handleTouchMove);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
            style={{ mixBlendMode: 'plus-lighter' }}
        />
    );
}
