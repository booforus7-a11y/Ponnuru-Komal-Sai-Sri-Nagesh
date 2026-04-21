import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export default function GlitchOverlay() {
  const [glitches, setGlitches] = useState<{ id: number; style: React.CSSProperties }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const id = Date.now();
        const style: React.CSSProperties = {
          position: 'absolute',
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          width: `${Math.random() * 150}px`,
          height: `${Math.random() * 10}px`,
          backgroundColor: Math.random() > 0.5 ? '#0ff' : '#f0f',
          opacity: 0.3,
          zIndex: 100,
          pointerEvents: 'none',
          boxShadow: `0 0 10px ${Math.random() > 0.5 ? '#0ff' : '#f0f'}`
        };
        setGlitches(prev => [...prev, { id, style }]);
        setTimeout(() => {
          setGlitches(prev => prev.filter(g => g.id !== id));
        }, 150);
      }
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {glitches.map(glitch => (
        <div key={glitch.id} style={glitch.style} className="animate-pulse" />
      ))}
    </>
  );
}
