import React, { useEffect, useRef } from 'react';

interface DotGridCanvasProps {
  isDarkMode?: boolean;
}

export const DotGridCanvas: React.FC<DotGridCanvasProps> = ({ isDarkMode = true }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -1000,
    y: -1000,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener('mousemove', handleMouseMove);
      parent.addEventListener('mouseleave', handleMouseLeave);
    }

    const dotSpacing = 32;
    const baseRadius = 1.4;
    const maxRadius = 4.2;
    const effectRadius = 150;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;
      const isMouseActive = mouseRef.current.active;

      // Draw subtle radial glow near cursor if active
      if (isMouseActive) {
        const gradient = ctx.createRadialGradient(
          mouseX,
          mouseY,
          0,
          mouseX,
          mouseY,
          effectRadius * 1.3
        );
        gradient.addColorStop(
          0,
          isDarkMode ? 'rgba(255, 77, 0, 0.12)' : 'rgba(255, 77, 0, 0.18)'
        );
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, effectRadius * 1.3, 0, Math.PI * 2);
        ctx.fill();
      }

      const cols = Math.ceil(width / dotSpacing) + 1;
      const rows = Math.ceil(height / dotSpacing) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * dotSpacing;
          const y = j * dotSpacing;

          let radius = baseRadius;
          let alpha = isDarkMode ? 0.18 : 0.22;
          let isOrange = false;

          if (isMouseActive) {
            const dx = x - mouseX;
            const dy = y - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < effectRadius) {
              const factor = (1 - dist / effectRadius);
              radius = baseRadius + (maxRadius - baseRadius) * factor;
              alpha = 0.25 + factor * 0.7;
              if (dist < effectRadius * 0.6) {
                isOrange = true;
              }
            }
          }

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          if (isOrange) {
            ctx.fillStyle = `rgba(255, 77, 0, ${alpha})`;
          } else {
            ctx.fillStyle = isDarkMode
              ? `rgba(255, 255, 255, ${alpha})`
              : `rgba(20, 20, 20, ${alpha})`;
          }
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (parent) {
        parent.removeEventListener('mousemove', handleMouseMove);
        parent.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDarkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-500"
    />
  );
};
