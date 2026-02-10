"use client";

import { useState } from "react";
import { Play, Music, Disc, Pause, ChevronRight } from "lucide-react";

import content from "@/app/content.json";

const SONGS = content.songs;

import useSound from "@/hooks/use-sound";


export default function MusicPlayer() {
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [isPlayerVisible, setIsPlayerVisible] = useState(false);
    const { playClick, playHover } = useSound();

    const currentSong = SONGS[currentSongIndex];

    const handleSongClick = (index: number) => {
        playClick();
        setCurrentSongIndex(index);
        setIsPlayerVisible(true);
    };

    return (
        <div className="w-full h-full flex flex-col gap-6 transition-all duration-700 ease-in-out">

            {/* Header */}
            <div className="pt-6 px-6 md:pt-8 md:px-8 flex flex-col items-center gap-1">
                <div className="flex items-center gap-2">
                    <Music className="w-5 h-5 text-rose-400 animate-bounce-slow" />
                    <span className="font-elegant font-bold text-lg text-rose-500 tracking-widest uppercase">Soundtrack For You</span>
                </div>
                <p className="text-xs font-elegant italic text-rose-400/80 animate-pulse-soft">Click a song to play</p>
            </div>

            {/* Playlist Row - Centered in remaining space */}
            <div className="flex-1 flex flex-col justify-center relative w-full group/playlist">
                <div className="flex gap-3 overflow-x-auto pb-4 pt-2 scrollbar-hide snap-x px-1">
                    {SONGS.map((song, index) => (
                        <button
                            key={index}
                            onClick={() => handleSongClick(index)}
                            onMouseEnter={playHover}
                            className={`flex-shrink-0 snap-start flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all duration-300 min-w-[100px] cursor-pointer ${currentSongIndex === index && isPlayerVisible
                                ? "bg-rose-500 border-rose-500 text-white shadow-lg scale-105"
                                : "bg-white/40 backdrop-blur-sm border-pink-200 text-rose-400 hover:bg-white/60 hover:border-pink-300 hover:scale-105 shadow-sm"
                                }`}
                        >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentSongIndex === index && isPlayerVisible ? "bg-white/20" : "bg-pink-100/50"}`}>
                                {currentSongIndex === index && isPlayerVisible ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                            </div>
                            <span className="text-xs font-medium truncate max-w-[80px]">{song.title}</span>
                        </button>
                    ))}
                    {/* Spacer for the arrow */}
                    <div className="min-w-[20px] flex-shrink-0"></div>
                </div>

                {/* Scroll Indicator Arrow */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 pointer-events-none animate-pulse-soft">
                    <div className="bg-white/60 backdrop-blur-sm p-1.5 rounded-full shadow-sm border border-pink-100">
                        <ChevronRight className="w-5 h-5 text-rose-500" />
                    </div>
                </div>
            </div>

            {/* Active Player Card - Conditionally Rendered */}
            {isPlayerVisible && (
                <div className="card-comfy p-4 flex flex-col gap-4 animate-in slide-in-from-top-10 fade-in duration-700 fill-mode-backwards">
                    {/* Song Info Header */}
                    <div className="flex items-center gap-3 border-b border-pink-100/50 pb-3">
                        <div className="w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center text-white shadow-md animate-spin-slow">
                            <Disc className="w-6 h-6" />
                        </div>
                        {/* Fake Visualizer */}
                        <div className="h-4 flex items-end gap-0.5">
                            <div className="w-1 bg-rose-400 rounded-t-full animate-[bounce_1s_infinite] h-[60%]"></div>
                            <div className="w-1 bg-rose-400 rounded-t-full animate-[bounce_1.2s_infinite] h-[100%]"></div>
                            <div className="w-1 bg-rose-400 rounded-t-full animate-[bounce_0.8s_infinite] h-[40%]"></div>
                            <div className="w-1 bg-rose-400 rounded-t-full animate-[bounce_1.1s_infinite] h-[80%]"></div>
                        </div>
                        <span className="font-romantic text-2xl text-rose-600 font-bold truncate">{currentSong.title}</span>
                        <div className="flex-1" />
                        <Play className="w-5 h-5 text-rose-300" />
                    </div>

                    {/* Video Embed */}
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-inner bg-black group">
                        <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${currentSong.id}?autoplay=1`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                        ></iframe>
                    </div>

                    {/* Quote */}
                    <div className="text-center py-2">
                        <p className="font-elegant italic text-rose-500/80 text-sm">
                            "{currentSong.quote}"
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
