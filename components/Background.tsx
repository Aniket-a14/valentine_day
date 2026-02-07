"use client";

import { useEffect, useState } from "react";

const EMOJIS = ["☁️", "❤️", "💖", "💕", "🧸", "🌹", "🥰", "✨", "🚀", "👩‍💻", "💻", "👾", "💌", "⚡"];

interface FloatingElement {
    id: number;
    emoji: string;
    left: number;
    delay: number;
    duration: number;
}

export default function Background() {
    const [elements, setElements] = useState<FloatingElement[]>([]);

    useEffect(() => {
        // Generate random floating elements
        const newElements = Array.from({ length: 25 }).map((_, i) => ({
            id: i,
            emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
            left: Math.random() * 100,
            delay: Math.random() * 15,
            duration: 25 + Math.random() * 20,
        }));
        setElements(newElements);
    }, []);

    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            {elements.map((el) => (
                <div
                    key={el.id}
                    className="floating-element"
                    style={{
                        left: `${el.left}%`,
                        fontSize: `${Math.random() * 2 + 1.5}rem`,
                        animationDelay: `${el.delay}s`,
                        animationDuration: `${el.duration}s`,
                    }}
                >
                    {el.emoji}
                </div>
            ))}
        </div>
    );
}
