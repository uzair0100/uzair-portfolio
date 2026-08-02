import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export default function BackgroundFX() {
  const reducedMotion = usePrefersReducedMotion();
  const spotRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Detect mobile devices
  const isMobile = typeof window !== 'undefined' && (window.innerWidth < 1024 || 'ontouchstart' in window);

  useEffect(() => {
    if (reducedMotion || isMobile) return;
    const el = spotRef.current;
    if (!el) return;
    let raf = 0;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let x = tx;
    let y = ty;
    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const tick = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      el.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(166,61,64,0.18), transparent 60%)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reducedMotion, isMobile]);

  useEffect(() => {
    // Completely disable canvas on mobile - too expensive
    if (reducedMotion || isMobile) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { 
      alpha: true,
      desynchronized: true // Better performance on some devices
    });
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999, active: false };

    type P = { x: number; y: number; vx: number; vy: number; r: number };
    let particles: P[] = [];

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      
      // Significantly reduced particle density for desktop
      const density = Math.min(60, Math.floor((w * h) / 25000));
      particles = Array.from({ length: density }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        r: Math.random() * 1.4 + 0.4,
      }));
    };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      
      for (const p of particles) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const d2 = dx * dx + dy * dy;
        if (mouse.active && d2 < 22500) {
          const f = (1 - d2 / 22500) * 0.06;
          p.vx += (dx / Math.sqrt(d2 + 0.01)) * f;
          p.vy += (dy / Math.sqrt(d2 + 0.01)) * f;
        }
        p.vx *= 0.99;
        p.vy *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;
      }
      
      // Draw lines between particles
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 12000) {
            const alpha = (1 - d2 / 12000) * 0.25;
            ctx.strokeStyle = `rgba(237,230,222,${alpha * 0.3})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      
      for (const p of particles) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const near = mouse.active && dx * dx + dy * dy < 22500;
        ctx.fillStyle = near ? "rgba(166,61,64,0.85)" : "rgba(237,230,222,0.5)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r + (near ? 0.6 : 0), 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [reducedMotion, isMobile]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-grid-fade opacity-70" />
      {!reducedMotion && !isMobile && <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />}
      <div
        className={`absolute -left-40 top-1/4 h-[520px] w-[520px] rounded-full bg-[#a63d40]/25 blur-[140px] ${reducedMotion ? "" : "animate-[float-orb_18s_ease-in-out_infinite]"}`}
      />
      <div
        className={`absolute right-[-10%] top-[10%] h-[420px] w-[420px] rounded-full bg-[#ede6de]/10 blur-[130px] ${reducedMotion ? "" : "animate-[float-orb_22s_ease-in-out_infinite_reverse]"}`}
      />
      <div
        className={`absolute bottom-[-10%] left-1/3 h-[500px] w-[500px] rounded-full bg-[#7a2a2c]/25 blur-[160px] ${reducedMotion ? "" : "animate-[float-orb_26s_ease-in-out_infinite]"}`}
      />
      {!reducedMotion && !isMobile && <div ref={spotRef} className="absolute inset-0" />}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </div>
  );
}
