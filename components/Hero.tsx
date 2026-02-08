import React, { useEffect, useRef } from 'react';

const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const nodes: { x: number; y: number; vx: number; vy: number }[] = [];
    const numNodes = 60;

    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
      });
    }

    const draw = () => {
      if(!ctx) return;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#0a0a0a'; // Match bg
      ctx.fillRect(0, 0, width, height);

      // Draw connections
      ctx.lineWidth = 0.8;
      
      for (let i = 0; i < numNodes; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        for (let j = i + 1; j < numNodes; j++) {
          const other = nodes[j];
          const dist = Math.hypot(node.x - other.x, node.y - other.y);

          if (dist < 150) {
            ctx.strokeStyle = `rgba(226, 54, 54, ${1 - dist / 150})`; // Spidey Red
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }
        
        ctx.fillStyle = '#E23636';
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(draw);
    };

    const animId = requestAnimationFrame(draw);
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0 opacity-40" />
      <div className="relative z-10 text-center px-4">
        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-4 spidey-gradient-text drop-shadow-lg">
          With Great Power
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 font-light mb-8 max-w-2xl mx-auto">
          Comes great responsibility. Welcome to the ultimate hub for everything Spider-Man.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={() => window.location.hash = '#movies'} className="bg-spidey-red hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 shadow-[0_0_15px_rgba(226,54,54,0.5)]">
            Explore Movies
          </button>
          <button onClick={() => window.location.hash = '#community'} className="bg-transparent border-2 border-spidey-blue hover:bg-spidey-blue/20 text-spidey-blue hover:text-white font-bold py-3 px-8 rounded-full transition-all">
            Join Community
          </button>
        </div>
      </div>
      
      {/* Decorative Web Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-spidey-red opacity-20 rounded-tl-3xl"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-spidey-blue opacity-20 rounded-br-3xl"></div>
    </div>
  );
};

export default Hero;