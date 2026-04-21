import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'motion/react';

interface Point {
  x: number;
  y: number;
}

const GRID_SIZE = 20;
const INITIAL_SNAKE: Point[] = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];
const INITIAL_DIRECTION = { x: 0, y: -1 };

export default function SnakeGame({ onScoreChange }: { onScoreChange: (score: number) => void }) {
  const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Point>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<Point>(INITIAL_DIRECTION);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(150);
  const gameLoopRef = useRef<number | null>(null);

  const generateFood = useCallback((currentSnake: Point[]) => {
    let newFood: Point;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(generateFood(INITIAL_SNAKE));
    setGameOver(false);
    setScore(0);
    setSpeed(150);
    onScoreChange(0);
  };

  const moveSnake = useCallback(() => {
    if (gameOver) return;

    setSnake(prevSnake => {
      const head = prevSnake[0];
      const newHead = {
        x: (head.x + direction.x + GRID_SIZE) % GRID_SIZE,
        y: (head.y + direction.y + GRID_SIZE) % GRID_SIZE,
      };

      // Check collision
      if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        setGameOver(true);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Check food
      if (newHead.x === food.x && newHead.y === food.y) {
        const newScore = score + 10;
        setScore(newScore);
        onScoreChange(newScore);
        setFood(generateFood(newSnake));
        setSpeed(prev => Math.max(50, prev - 2));
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameOver, score, onScoreChange, generateFood]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp': if (direction.y === 0) setDirection({ x: 0, y: -1 }); break;
        case 'ArrowDown': if (direction.y === 0) setDirection({ x: 0, y: 1 }); break;
        case 'ArrowLeft': if (direction.x === 0) setDirection({ x: -1, y: 0 }); break;
        case 'ArrowRight': if (direction.x === 0) setDirection({ x: 1, y: 0 }); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    if (!gameOver) {
      gameLoopRef.current = window.setInterval(moveSnake, speed);
    }
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [moveSnake, speed, gameOver]);

  return (
    <div className="relative w-full aspect-square bg-black border-4 border-neon-cyan/30 flex items-center justify-center overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 grid grid-cols-20 grid-rows-20 opacity-10 pointer-events-none">
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => (
          <div key={i} className="border-[0.5px] border-neon-cyan" />
        ))}
      </div>

      {/* Snake and Food */}
      <div className="relative w-full h-full grid grid-cols-20 grid-rows-20 shadow-[0_0_20px_rgba(0,255,255,0.1)]">
        {snake.map((segment, i) => (
          <div
            key={i}
            className={`absolute w-[5%] h-[5%] ${i === 0 ? 'bg-neon-cyan z-10 shadow-[0_0_10px_#0ff]' : 'bg-neon-cyan/50'}`}
            style={{
              left: `${segment.x * 5}%`,
              top: `${segment.y * 5}%`,
              transition: 'left 0.1s linear, top 0.1s linear'
            }}
          />
        ))}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 0.5 }}
          className="absolute w-[5%] h-[5%] bg-neon-magenta shadow-[0_0_15px_#f0f] rounded-full"
          style={{
            left: `${food.x * 5}%`,
            top: `${food.y * 5}%`,
          }}
        />
      </div>

      {gameOver && (
        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-20 backdrop-blur-sm">
          <h2 className="text-4xl text-neon-magenta glitch-text font-vt323 mb-4">SYSTEM_FAILURE</h2>
          <p className="text-neon-cyan mb-6">FINAL_SCORE: {score}</p>
          <button
            onClick={resetGame}
            className="px-6 py-2 border-2 border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black transition-colors font-vt323 text-xl"
          >
            REBOOT_CONSOLE
          </button>
        </div>
      )}
    </div>
  );
}
