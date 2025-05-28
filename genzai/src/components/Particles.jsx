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

    // Generate random particles
    const particles = Array.from({ length: numParticles }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 1 + Math.random() * 2,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
      alpha: 0.5 + Math.random() * 0.5,
    }));

    function draw() {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        ctx.globalAlpha = p.alpha;

        ctx.save();
        ctx.beginPath();
        const size = p.r * 2;
        const radius = size / 5; // 50% border radius
        ctx.moveTo(p.x + radius, p.y);
        ctx.arcTo(p.x + size, p.y, p.x + size, p.y + size, radius);
        ctx.arcTo(p.x + size, p.y + size, p.x, p.y + size, radius);
        ctx.arcTo(p.x, p.y + size, p.x, p.y, radius);
        ctx.arcTo(p.x, p.y, p.x + size, p.y, radius);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
        ctx.restore();
        // Move
        p.x += p.dx;
        p.y += p.dy;
        // Bounce
        if (p.x < 0 || p.x > width) p.dx *= -1;
        if (p.y < 0 || p.y > height) p.dy *= -1;
      }
      ctx.globalAlpha = 1;
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
