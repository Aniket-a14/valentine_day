"use client";

import { useState, useEffect, useRef } from "react";
import { Heart, MailOpen, X } from "lucide-react";
import useSound from "@/hooks/use-sound";
import content from "@/app/content.json";

const LETTER_CONTENT = content.letter;

export default function LoveLetter() {
    const [isOpen, setIsOpen] = useState(false);
    const [typedLines, setTypedLines] = useState<string[]>([]);
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const { startWriting, stopWriting } = useSound();

    // Manage writing sound
    useEffect(() => {
        if (isOpen && currentLineIndex < LETTER_CONTENT.length) {
            startWriting();
        } else {
            stopWriting();
        }
        return () => stopWriting();
    }, [isOpen, currentLineIndex, startWriting, stopWriting]);

    useEffect(() => {
        if (!isOpen) {
            setTypedLines([]);
            setCurrentLineIndex(0);
            setCurrentCharIndex(0);
            return;
        }

        if (currentLineIndex >= LETTER_CONTENT.length) return;

        const timeout = setTimeout(() => {
            const currentLine = LETTER_CONTENT[currentLineIndex];

            if (currentCharIndex < currentLine.length) {
                // Typing current line
                setTypedLines(prev => {
                    const newLines = [...prev];
                    if (newLines[currentLineIndex] === undefined) newLines[currentLineIndex] = "";
                    newLines[currentLineIndex] += currentLine[currentCharIndex];
                    return newLines;
                });
                setCurrentCharIndex(prev => prev + 1);
            } else {
                // Move to next line
                setCurrentLineIndex(prev => prev + 1);
                setCurrentCharIndex(0);
                setTypedLines(prev => [...prev, ""]); // Prepare next line
            }
        }, 50); // Typing speed

        return () => clearTimeout(timeout);
    }, [isOpen, currentLineIndex, currentCharIndex]);

    return (
        <div className="w-full flex justify-center py-10">
            {!isOpen ? (
                <button
                    onClick={() => setIsOpen(true)}
                    className="card-comfy px-8 py-4 flex items-center gap-3 group hover:scale-105 transition-transform duration-500 bg-white/60 backdrop-blur-sm border-rose-100"
                >
                    <div className="relative">
                        <MailOpen className="w-8 h-8 text-rose-500 group-hover:animate-bounce-slow" />
                        <Heart className="w-3 h-3 text-rose-400 absolute -top-1 -right-1 animate-pulse" />
                    </div>
                    <span className="font-elegant text-xl text-rose-600 font-bold tracking-wide">Read my letter...</span>
                </button>
            ) : (
                <div className="relative w-full max-w-2xl card-comfy p-8 md:p-12 animate-in zoom-in-95 duration-700">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-4 right-4 p-2 text-rose-300 hover:text-rose-500 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <div className="font-elegant text-rose-900/80 text-lg md:text-xl leading-loose space-y-2 min-h-[300px]">
                        {typedLines.map((line, i) => (
                            <p key={i} className="min-h-[1.5em]">{line}</p>
                        ))}
                        {currentLineIndex < LETTER_CONTENT.length && (
                            <span className="inline-block w-2 h-5 bg-rose-400 ml-1 animate-pulse align-middle"></span>
                        )}
                    </div>

                    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-pink-200 to-rose-200 rounded-full blur-2xl opacity-50 pointer-events-none"></div>
                </div>
            )}
        </div>
    );
}
