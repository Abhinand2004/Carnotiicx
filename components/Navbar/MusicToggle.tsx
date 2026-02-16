"use client";

import React from 'react';
import { useMusic } from '@/context/MusicContext';

export default function MusicToggle() {
    const { isPlaying, togglePlay, currentTrack } = useMusic();

    return (
        <button
            onClick={togglePlay}
            className="flex items-center gap-2 group p-2 rounded-full hover:bg-gray-800 transition-colors"
            title={currentTrack ? `Now Playing: ${currentTrack.title}` : "Background Music"}
        >
            <span className={`material-symbols-outlined text-primary text-2xl ${isPlaying ? 'animate-spin-slow' : ''}`}>
                {isPlaying ? 'music_note' : 'music_off'}
            </span>
            {isPlaying && currentTrack && (
                <div className="hidden lg:block text-[10px] text-gray-400 max-w-[100px] truncate">
                    {currentTrack.title}
                </div>
            )}
        </button>
    );
}
