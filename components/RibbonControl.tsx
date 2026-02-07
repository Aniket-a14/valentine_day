"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface RibbonContextType {
    showRibbon: boolean;
    toggleRibbon: () => void;
}

const RibbonContext = createContext<RibbonContextType | undefined>(undefined);

export function RibbonProvider({ children }: { children: React.ReactNode }) {
    const [showRibbon, setShowRibbon] = useState(true);

    // Initial load from localStorage if possible
    useEffect(() => {
        const saved = localStorage.getItem("ribbon-visible");
        if (saved !== null) {
            setShowRibbon(saved === "true");
        }
    }, []);

    const toggleRibbon = () => {
        const next = !showRibbon;
        setShowRibbon(next);
        localStorage.setItem("ribbon-visible", String(next));
    };

    return (
        <RibbonContext.Provider value={{ showRibbon, toggleRibbon }}>
            {children}
        </RibbonContext.Provider>
    );
}

export function useRibbon() {
    const context = useContext(RibbonContext);
    if (!context) {
        throw new Error("useRibbon must be used within a RibbonProvider");
    }
    return context;
}

export function RibbonToggle() {
    const { showRibbon, toggleRibbon } = useRibbon();

    return (
        <div className="fixed bottom-6 left-6 z-[100] group pointer-events-auto">
            <button
                onClick={toggleRibbon}
                className={`
                    flex items-center gap-2 px-4 py-2 rounded-full 
                    bg-white/80 backdrop-blur-md border border-pink-200 
                    shadow-sm hover:shadow-md transition-all duration-300
                    text-pink-600 font-medium text-sm
                    hover:scale-105 active:scale-95
                `}
                aria-label={showRibbon ? "Hide Ribbon" : "Show Ribbon"}
            >
                <span className="text-lg">{showRibbon ? "🎀" : "🪄"}</span>
                <span className="hidden group-hover:block transition-all duration-300">
                    {showRibbon ? "Hide Ribbon" : "Show Ribbon"}
                </span>
            </button>
        </div>
    );
}
