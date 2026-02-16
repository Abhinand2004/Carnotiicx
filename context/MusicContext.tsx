"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

interface Track {
    _id: string;
    title: string;
    url: string;
}

interface MusicContextType {
    isPlaying: boolean;
    togglePlay: () => void;
    currentTrack: Track | null;
    tracks: Track[];
    nextTrack: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [tracks, setTracks] = useState<Track[]>([]);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(-1);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        fetchTracks();
    }, []);

    const fetchTracks = async () => {
        try {
            const res = await fetch('/api/music');
            const data = await res.json();
            if (data.success && data.data.length > 0) {
                const shuffled = [...data.data].sort(() => Math.random() - 0.5);
                setTracks(shuffled);
                setCurrentTrackIndex(0);
            }
        } catch (error) {
            console.error('Failed to fetch tracks:', error);
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            audioRef.current = new Audio();
            audioRef.current.onended = () => {
                nextTrack();
            };
        }
    }, [tracks]);

    useEffect(() => {
        if (audioRef.current && tracks[currentTrackIndex]) {
            audioRef.current.src = tracks[currentTrackIndex].url;
            if (isPlaying) {
                audioRef.current.play().catch(e => console.error("Audio play failed:", e));
            }
        }
    }, [currentTrackIndex, tracks]);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(e => console.error("Audio play failed:", e));
            }
            setIsPlaying(!isPlaying);
        }
    };

    const nextTrack = () => {
        if (tracks.length > 0) {
            const nextIndex = (currentTrackIndex + 1) % tracks.length;
            setCurrentTrackIndex(nextIndex);
        }
    };

    return (
        <MusicContext.Provider value={{
            isPlaying,
            togglePlay,
            currentTrack: tracks[currentTrackIndex] || null,
            tracks,
            nextTrack
        }}>
            {children}
        </MusicContext.Provider>
    );
};

export const useMusic = () => {
    const context = useContext(MusicContext);
    if (context === undefined) {
        throw new Error('useMusic must be used within a MusicProvider');
    }
    return context;
};
