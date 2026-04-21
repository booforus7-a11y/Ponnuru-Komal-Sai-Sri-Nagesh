import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Music, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const TRACKS = [
  {
    id: 1,
    title: 'VOID_WALKER_BETA',
    artist: 'AI_G_01',
    url: 'https://actions.google.com/sounds/v1/science_fiction/glitchy_electronics_ambience.ogg',
    color: '#0ff'
  },
  {
    id: 2,
    title: 'CIRCUIT_BENT_CORE',
    artist: 'AI_G_02',
    url: 'https://actions.google.com/sounds/v1/science_fiction/interstellar_ambient_loop.ogg',
    color: '#f0f'
  },
  {
    id: 3,
    title: 'DATA_SPIRIT_ALPHA',
    artist: 'AI_G_03',
    url: 'https://actions.google.com/sounds/v2/scifi/scifi_hum_loop.ogg', 
    color: '#ff0'
  }
];

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Audio play failed, user interaction required"));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(p || 0);
    }
  };

  return (
    <div className="bg-black/40 border-2 border-neon-cyan/20 p-6 backdrop-blur-md relative overflow-hidden group">
      {/* Visualizer Mock */}
      <div className="flex items-end gap-1 h-12 mb-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              height: isPlaying ? [10, Math.random() * 40 + 10, 10] : 10
            }}
            transition={{
              repeat: Infinity,
              duration: 0.5 + Math.random(),
              ease: "easeInOut"
            }}
            className="w-1 bg-neon-cyan/50"
            style={{ backgroundColor: isPlaying ? currentTrack.color : '#333' }}
          />
        ))}
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-zinc-900 border border-neon-cyan/30 flex items-center justify-center relative">
          <Music className={`w-8 h-8 ${isPlaying ? 'text-neon-cyan' : 'text-zinc-600'}`} style={{ color: isPlaying ? currentTrack.color : undefined }} />
          {isPlaying && (
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
               className="absolute inset-0 border-2 border-dashed border-neon-cyan/20 rounded-full scale-125"
             />
          )}
        </div>
        <div>
          <h3 className="font-vt323 text-2xl text-white tracking-widest uppercase">
            {currentTrack.title}
          </h3>
          <p className="text-neon-cyan/60 text-xs font-mono lowercase">::{currentTrack.artist}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1 bg-zinc-800 mb-6 relative">
        <motion.div 
          className="absolute top-0 left-0 h-full bg-neon-cyan shadow-[0_0_10px_#0ff]"
          style={{ width: `${progress}%`, backgroundColor: currentTrack.color }}
        />
      </div>

      <div className="flex items-center justify-between">
        <button onClick={prevTrack} className="text-neon-cyan/60 hover:text-neon-cyan transition-colors">
          <SkipBack className="w-6 h-6" />
        </button>
        <button 
          onClick={togglePlay}
          className="w-12 h-12 rounded-full border-2 border-neon-cyan flex items-center justify-center text-neon-cyan hover:bg-neon-cyan hover:text-black transition-all shadow-[0_0_15px_rgba(0,255,255,0.2)]"
        >
          {isPlaying ? <Pause className="fill-current" /> : <Play className="fill-current translate-x-0.5" />}
        </button>
        <button onClick={nextTrack} className="text-neon-cyan/60 hover:text-neon-cyan transition-colors">
          <SkipForward className="w-6 h-6" />
        </button>
      </div>

      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={nextTrack}
        loop={false}
      />

      {/* Aesthetic Glitch Elements */}
      <div className="absolute top-2 right-2 flex gap-1">
        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        <Volume2 className="w-4 h-4 text-zinc-700" />
      </div>
    </div>
  );
}
