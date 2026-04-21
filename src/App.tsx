import React, { useState } from 'react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';
import GlitchOverlay from './components/GlitchOverlay';
import { motion } from 'motion/react';
import { Terminal, Cpu, Database, Activity, Zap } from 'lucide-react';

export default function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const handleScoreChange = (newScore: number) => {
    setScore(newScore);
    if (newScore > highScore) setHighScore(newScore);
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden crt">
      {/* Global Scanlines Overlay */}
      <div className="scanlines" />

      {/* Main Terminal Shell */}
      <main className="relative z-10 p-4 md:p-8 max-w-6xl mx-auto h-screen flex flex-col gap-6">
        
        {/* Header / Top Bar */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-neon-cyan/30 pb-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-neon-cyan/10 border border-neon-cyan/50 animate-pulse">
              <Terminal className="w-6 h-6 text-neon-cyan" />
            </div>
            <div>
              <h1 className="text-3xl font-vt323 tracking-widest text-neon-cyan glitch-text">
                NEON_GLITCH_OS_v1.0.4
              </h1>
              <p className="text-[10px] text-neon-cyan/50 font-mono flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                SYSTEM_STATUS: STABLE // KERNEL_LOAD: 0.14
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:flex items-center gap-6 w-full md:w-auto">
            <div className="bg-black/40 border border-neon-magenta/30 p-2 px-4">
              <p className="text-[10px] text-neon-magenta uppercase tracking-tighter">Current_Data</p>
              <p className="text-xl font-vt323 text-white">{score.toString().padStart(5, '0')}</p>
            </div>
            <div className="bg-black/40 border border-neon-yellow/30 p-2 px-4">
              <p className="text-[10px] text-neon-yellow uppercase tracking-tighter">Cache_Max</p>
              <p className="text-xl font-vt323 text-white">{highScore.toString().padStart(5, '0')}</p>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start overflow-hidden py-4">
          
          {/* Side Panels - Left */}
          <aside className="hidden lg:flex lg:col-span-3 flex-col gap-6">
            <section className="bg-black/40 border border-neon-cyan/20 p-4 rounded-sm relative group overflow-hidden">
              <div className="absolute top-0 right-0 p-1 bg-neon-cyan/10">
                <Cpu className="w-3 h-3 text-neon-cyan" />
              </div>
              <h4 className="text-xs font-bold text-neon-cyan/80 mb-3 lowercase select-none">::hardware_logs</h4>
              <div className="space-y-2 font-mono text-[10px] text-neon-cyan/40 leading-tight">
                <p>MEMORY_INIT: <span className="text-neon-cyan">OK</span></p>
                <p>NPU_SYNC: <span className="text-neon-cyan">100%</span></p>
                <p>TEMP: <span className="text-neon-yellow">42.8°C</span></p>
                <p className="border-t border-neon-cyan/10 pt-1 mt-2 animate-pulse">RECEIVING_BITSTREAM...</p>
              </div>
            </section>

            <section className="bg-black/40 border border-neon-magenta/20 p-4 rounded-sm flex-1">
               <h4 className="text-xs font-bold text-neon-magenta/80 mb-3 lowercase">::global_comms</h4>
               <div className="space-y-4">
                 {[1, 2, 3].map(i => (
                   <div key={i} className="flex gap-2 text-[10px] font-mono">
                     <span className="text-neon-magenta text-opacity-50">[{new Date().toLocaleTimeString()}]</span>
                     <span className="text-white/40">USER_{Math.floor(Math.random()*9999)} disconnected...</span>
                   </div>
                 ))}
                 <div className="flex gap-2 text-[10px] font-mono text-neon-cyan animate-pulse">
                    <span>{'>'}</span>
                    <span className="bg-neon-cyan text-black px-1">INCOMING TRANSMISSION</span>
                 </div>
               </div>
            </section>
          </aside>

          {/* Main Game Center */}
          <section className="lg:col-span-6 flex flex-col gap-4">
            <div className="relative group">
               <div className="absolute -inset-1 bg-gradient-to-r from-neon-cyan to-neon-magenta opacity-20 blur-sm group-hover:opacity-40 transition-opacity" />
               <SnakeGame onScoreChange={handleScoreChange} />
               
               {/* Decorative Side Borders */}
               <div className="absolute top-0 bottom-0 -left-6 w-px bg-gradient-to-b from-transparent via-neon-cyan to-transparent opacity-30" />
               <div className="absolute top-0 bottom-0 -right-6 w-px bg-gradient-to-b from-transparent via-neon-magenta to-transparent opacity-30" />
            </div>

            <div className="flex justify-between items-center bg-black/60 p-3 border-x border-neon-cyan/20">
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-neon-cyan" />
                  <span className="text-[10px] text-neon-cyan uppercase">Control: ARROWS</span>
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-neon-magenta" />
                   <span className="text-[10px] text-neon-magenta uppercase">Goal: DATA_NODES</span>
                </div>
              </div>
              <div className="text-[10px] text-neon-yellow/60 font-mono uppercase tracking-[0.2em] animate-pulse">
                SIMULATION_ACTIVE
              </div>
            </div>
          </section>

          {/* Side Panels - Right */}
          <aside className="lg:col-span-3 flex flex-col gap-6">
            <section className="space-y-6">
               <MusicPlayer />
               
               <div className="bg-black/40 border border-neon-yellow/20 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xs font-bold text-neon-yellow/80 lowercase">::sub_systems</h4>
                    <Database className="w-4 h-4 text-neon-yellow/50" />
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-mono text-white/40 uppercase">
                        <span>Buffer_Saturation</span>
                        <span>{Math.min(100, score * 2)}%</span>
                      </div>
                      <div className="w-full h-1 bg-zinc-800">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(100, score * 2)}%` }}
                          className="h-full bg-neon-yellow shadow-[0_0_8px_#ff0]" 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-mono text-white/40 uppercase">
                        <span>Core_Stability</span>
                        <span>98.2%</span>
                      </div>
                      <div className="w-full h-1 bg-zinc-800">
                        <div className="h-full w-[98.2%] bg-neon-cyan/50" />
                      </div>
                    </div>
                  </div>
               </div>

               <div className="p-3 border-2 border-dashed border-white/5 opacity-50 text-[9px] font-mono leading-relaxed">
                  [WARNING]: SYSTEM OVERRIDE DETECTED. ALL SESSION DATA IS ENCRYPTED. 
                  PLEASE MAINTAIN HIGH SCORE TO PREVENT HARD DRIVE PURGE.
               </div>
            </section>
          </aside>

        </div>

        {/* Footer / Status Bar */}
        <footer className="mt-auto border-t border-neon-cyan/20 pt-4 flex justify-between items-center text-[10px] font-mono opacity-60">
          <div className="flex gap-4">
            <span className="text-neon-cyan">LOC: 34.0522° N, 118.2437° W</span>
            <span className="hidden md:inline">ENCRYPTION: AES-256-GCM</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1">
              <Zap className="w-3 h-3 text-neon-yellow" />
              <span>PWR_LVL: OPTIMAL</span>
            </div>
            <div className="flex items-center gap-1">
              <Activity className="w-3 h-3 text-green-500" />
              <span>THROUGHPUT: 1.2 GB/S</span>
            </div>
          </div>
        </footer>

      </main>

      {/* Aesthetic Random Glitch Pieces */}
      <div className="absolute top-1/4 left-10 w-32 h-px bg-neon-magenta/20 animate-pulse blur-sm" />
      <div className="absolute bottom-1/4 right-10 w-48 h-px bg-neon-cyan/20 animate-pulse blur-sm" />
      <div className="absolute top-10 left-1/2 w-px h-64 bg-gradient-to-b from-transparent via-neon-cyan/10 to-transparent" />
      
      <GlitchOverlay />
    </div>
  );
}
