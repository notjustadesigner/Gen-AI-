import React, { useRef, useEffect } from "react";

// Simple random particles effect using canvas
const Particles = ({ numParticles = 40, color = "#fff", style = {} }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // 8-bit grid size
    const gridSize = 6;
    const moveEveryNFrames = 10; // Slow down: move every N frames
    let frame = 0;

    // Generate random particles
    const particles = Array.from({ length: numParticles }, () => ({
      x: Math.floor((Math.random() * width) / gridSize) * gridSize,
      y: Math.floor((Math.random() * height) / gridSize) * gridSize,
      r: gridSize / 2,
      dx: Math.random() < 0.5 ? -1 : 1,
      dy: Math.random() < 0.5 ? -1 : 1,
      alpha: 0.5 + Math.random() * 0.5,
    }));

    function randomDirection() {
      // Returns -1, 0, or 1
      const dirs = [-1, 0, 1];
      return dirs[Math.floor(Math.random() * dirs.length)];
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        ctx.globalAlpha = p.alpha;

        ctx.save();
        ctx.beginPath();
        ctx.rect(p.x, p.y, gridSize, gridSize);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.restore();

        // Only move every N frames
        if (frame % moveEveryNFrames === 0) {
          // Occasionally change direction for random path
          if (Math.random() < 0.2) {
            p.dx = randomDirection() || p.dx;
            p.dy = randomDirection() || p.dy;
            // Prevent standing still
            if (p.dx === 0 && p.dy === 0) p.dx = 1;
          }
          p.x += p.dx * gridSize;
          p.y += p.dy * gridSize;
          // Snap to grid
          p.x = Math.round(p.x / gridSize) * gridSize;
          p.y = Math.round(p.y / gridSize) * gridSize;
          // Bounce
          if (p.x < 0 || p.x > width - gridSize) p.dx *= -1;
          if (p.y < 0 || p.y > height - gridSize) p.dy *= -1;
        }
      }
      ctx.globalAlpha = 1;
      frame++;
      animationId = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(animationId);
  }, [numParticles, color]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        ...style,
      }}
    />
  );
};

export default Particles;
