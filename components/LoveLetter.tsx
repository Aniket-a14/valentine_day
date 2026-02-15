"use client";

import { useState, useEffect, useRef } from "react";
import { Heart, MailOpen, X } from "lucide-react";
import useSound from "@/hooks/use-sound";
import content from "@/app/content.json";

const LETTER_CONTENT = content.letter.join("\n");

export default function LoveLetter() {
    const [isOpen, setIsOpen] = useState(false);
    const [typedText, setTypedText] = useState("");
    const { startWriting, stopWriting } = useSound();

    // Manage writing sound
    useEffect(() => {
        const isTyping = isOpen && typedText.length < LETTER_CONTENT.length;
        if (isTyping) {
            startWriting();
        } else {
            stopWriting();
        }
    }, [isOpen, typedText.length, startWriting, stopWriting]);

    useEffect(() => {
        if (!isOpen) {
            setTypedText("");
            return;
        }

        if (typedText.length >= LETTER_CONTENT.length) return;

        const timeout = setTimeout(() => {
            setTypedText(LETTER_CONTENT.slice(0, typedText.length + 1));
        }, 40); // Slightly faster typing

        return () => clearTimeout(timeout);
    }, [isOpen, typedText]);

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

                    <div className="font-elegant text-rose-900/80 text-lg md:text-xl leading-loose whitespace-pre-wrap min-h-[300px]">
                        {typedText}
                        {typedText.length < LETTER_CONTENT.length && (
                            <span className="inline-block w-2 h-5 bg-rose-400 ml-1 animate-pulse align-middle"></span>
                        )}
                    </div>

                    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-pink-200 to-rose-200 rounded-full blur-2xl opacity-50 pointer-events-none"></div>
                </div>
            )}
        </div>
    );
}
