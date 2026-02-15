"use strict";
"use client";

import { useEffect, useRef } from "react";

// Pre-render heart for performance
const HEART_SIZE = 40;
let cachedHeart: HTMLCanvasElement | null = null;

const getCachedHeart = () => {
    if (cachedHeart) return cachedHeart;
    const canvas = document.createElement("canvas");
    canvas.width = HEART_SIZE;
    canvas.height = HEART_SIZE;
    const ctx = canvas.getContext("2d");
    if (ctx) {
        ctx.font = `${HEART_SIZE - 10}px serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("❤️", HEART_SIZE / 2, HEART_SIZE / 2);
    }
    cachedHeart = canvas;
    return canvas;
};

export default function CursorTrail() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<HeartParticle[]>([]);
    const poolRef = useRef<HeartParticle[]>([]);
    const requestRef = useRef<number>(null);
    const activeRef = useRef(false);

    useEffect(() => {
        if (window.matchMedia("(pointer: coarse)").matches) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { alpha: true });
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

        const spawnParticle = (x: number, y: number) => {
            let p = poolRef.current.pop();
            if (p) {
                p.init(x, y);
            } else {
                p = new HeartParticle(x, y);
            }
            particlesRef.current.push(p);

            if (!activeRef.current) {
                activeRef.current = true;
                requestRef.current = requestAnimationFrame(animate);
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (Math.random() > 0.4) {
                spawnParticle(e.clientX, e.clientY);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            const heartImg = getCachedHeart();

            for (let i = particlesRef.current.length - 1; i >= 0; i--) {
                const p = particlesRef.current[i];
                p.update();
                p.draw(ctx, heartImg);

                if (p.life <= 0) {
                    particlesRef.current.splice(i, 1);
                    poolRef.current.push(p);
                }
            }

            if (particlesRef.current.length > 0) {
                requestRef.current = requestAnimationFrame(animate);
            } else {
                activeRef.current = false;
            }
        };

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
    x: number = 0;
    y: number = 0;
    size: number = 0;
    speedX: number = 0;
    speedY: number = 0;
    life: number = 0;
    rotation: number = 0;

    constructor(x: number, y: number) {
        this.init(x, y);
    }

    init(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 15 + 10;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * -1 - 1;
        this.life = 1.0;
        this.rotation = Math.random() * Math.PI * 2;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.speedY += 0.05; // Gravity
        this.life -= 0.02;
        this.size *= 0.98;
    }

    draw(ctx: CanvasRenderingContext2D, img: HTMLCanvasElement) {
        ctx.globalAlpha = this.life;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.drawImage(img, -this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
    }
}
