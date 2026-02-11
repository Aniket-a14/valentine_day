"use strict";
"use client";

import { useEffect, useRef } from "react";

export default function CursorTrail() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const heartsRef = useRef<HeartParticle[]>([]);
    const requestRef = useRef<number>(null);

    useEffect(() => {
        // PC Only Check: coarse pointer usually means touch/mobile
        if (window.matchMedia("(pointer: coarse)").matches) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener("resize", resize);
        resize();

        const addHeart = (x: number, y: number) => {
            heartsRef.current.push(new HeartParticle(x, y));
        };

        const handleMouseMove = (e: MouseEvent) => {
            // Throttle creation slightly
            if (Math.random() > 0.5) {
                addHeart(e.clientX, e.clientY);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);

        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);

            heartsRef.current.forEach((heart, index) => {
                heart.update();
                heart.draw(ctx);
                if (heart.life <= 0) {
                    heartsRef.current.splice(index, 1);
                }
            });

            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[100]"
        />
    );
}

class HeartParticle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    life: number;
    color: string;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 8 + 5;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.life = 1.0;
        this.color = `hsl(${Math.random() * 20 + 330}, 100%, 70%)`; // Pinks
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY; // Fall down/float
        this.speedY += 0.05; // Gravity
        this.life -= 0.02;
        this.size *= 0.96;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.life;
        ctx.font = `${this.size}px serif`;
        ctx.fillText("❤️", this.x, this.y);
        ctx.globalAlpha = 1.0;
    }
}
