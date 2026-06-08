'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [trailPos, setTrailPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      const isClickable =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.style.cursor === 'pointer' ||
        window.getComputedStyle(target).cursor === 'pointer';
      setIsHovering(!!isClickable);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Trail follows with lag
  useEffect(() => {
    const timeout = setTimeout(() => {
      setTrailPos(mousePos);
    }, 80);
    return () => clearTimeout(timeout);
  }, [mousePos]);

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed pointer-events-none z-[99999] rounded-full"
        animate={{
          x: mousePos.x - 4,
          y: mousePos.y - 4,
          scale: isClicking ? 0.6 : 1,
        }}
        transition={{ type: 'spring', stiffness: 800, damping: 35, mass: 0.3 }}
        style={{
          width: 8,
          height: 8,
          background: isHovering ? '#00ff88' : '#00f5ff',
          boxShadow: isHovering
            ? '0 0 10px rgba(0,255,136,0.8)'
            : '0 0 10px rgba(0,245,255,0.8)',
        }}
      />

      {/* Outer ring */}
      <motion.div
        className="fixed pointer-events-none z-[99998] rounded-full"
        animate={{
          x: trailPos.x - 18,
          y: trailPos.y - 18,
          scale: isHovering ? 1.6 : isClicking ? 0.8 : 1,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        style={{
          width: 36,
          height: 36,
          border: isHovering
            ? '1px solid rgba(0,255,136,0.6)'
            : '1px solid rgba(0,245,255,0.4)',
          boxShadow: isHovering
            ? '0 0 15px rgba(0,255,136,0.3)'
            : '0 0 10px rgba(0,245,255,0.2)',
        }}
      />
    </>
  );
}
