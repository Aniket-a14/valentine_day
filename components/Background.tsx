import { useEffect, useState, memo } from "react";

const EMOJIS = ["☁️", "❤️", "💖", "💕", "🧸", "🌹", "🥰", "✨", "🚀", "👾", "💌", "⚡"];

interface FloatingElement {
    id: number;
    emoji: string;
    left: number;
    delay: number;
    duration: number;
    size: number;
}

const Background = memo(function Background() {
    const [elements, setElements] = useState<FloatingElement[]>([]);

    useEffect(() => {
        const count = window.innerWidth < 768 ? 15 : 25;
        const newElements = Array.from({ length: count }).map((_, i) => ({
            id: i,
            emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
            left: Math.random() * 100,
            delay: Math.random() * 15,
            duration: 20 + Math.random() * 20,
            size: Math.random() * 2 + 1.2
        }));
        setElements(newElements);
    }, []);

    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none">
            {elements.map((el) => (
                <div
                    key={el.id}
                    className="floating-element"
                    style={{
                        left: `${el.left}%`,
                        fontSize: `${el.size}rem`,
                        animationDelay: `${el.delay}s`,
                        animationDuration: `${el.duration}s`,
                        willChange: 'transform'
                    }}
                >
                    {el.emoji}
                </div>
            ))}
        </div>
    );
});

export default Background;
