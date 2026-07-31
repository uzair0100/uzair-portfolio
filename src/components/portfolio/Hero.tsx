import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { assets } from "@/lib/assets";
import { DURATION, entranceTransition } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export default function Hero() {
  const reducedMotion = usePrefersReducedMotion();
  const imgRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const rafRef = useRef(0);
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (reducedMotion) return;
    const el = imgRef.current;
    if (!el) return;

    // Apply will-change only while the RAF loop is active, remove on cleanup
    el.style.willChange = "transform";

    const applyTransform = () => {
      // 0.08 lerp factor = smoother, less snappy feel (more spring-like)
      current.current.x += (target.current.x - current.current.x) * 0.08;
      current.current.y += (target.current.y - current.current.y) * 0.08;
      // Reduced from 6deg to 5deg to prevent overshoot perception
      el.style.transform = `perspective(1000px) rotateY(${current.current.x * 5}deg) rotateX(${-current.current.y * 5}deg) translateZ(0)`;
      rafRef.current = requestAnimationFrame(applyTransform);
    };
    rafRef.current = requestAnimationFrame(applyTransform);

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      target.current.x = (e.clientX - r.left - r.width / 2) / r.width;
      target.current.y = (e.clientY - r.top - r.height / 2) / r.height;
    };
    const onLeave = () => {
      target.current = { x: 0, y: 0 };
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    el.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      // Release GPU layer after cleanup
      el.style.willChange = "auto";
    };
  }, [reducedMotion]);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden px-6 py-20 sm:py-28 md:px-16"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-violet/20 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full bg-cyan/15 blur-[140px]"
      />
      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 md:grid-cols-2 md:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...entranceTransition(0.15), duration: DURATION.page }}
        >
          <p className="mb-6 text-xs uppercase tracking-[0.4em] text-white/50">
            Available for work · 2026
          </p>
          <h1 className="font-display text-5xl font-bold leading-[1.05] text-white sm:text-6xl md:text-7xl lg:text-8xl">
            Software
            <br />
            Engineer
          </h1>
          <div className="mt-6 inline-flex rounded-full border border-white/[0.08] bg-white/5 px-4 py-2 backdrop-blur">
            <span className="bg-gradient-to-r from-violet to-cyan bg-clip-text text-sm font-semibold text-transparent">
              Fullstack & AI Automation Specialist
            </span>
          </div>
          <p className="mt-8 max-w-lg text-base leading-[1.6] text-white/65 md:text-lg">
            I build AI-driven products and full-stack platforms that go from
            idea to production — from AI recruitment engines to generative
            content tools used by real companies today.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="rounded-full bg-violet px-6 py-3 text-sm font-semibold text-white transition-transform duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-105 motion-reduce:hover:scale-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet"
            >
              See my work
            </a>
            <a
              href="#contact"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] hover:border-cyan hover:text-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
            >
              Get in touch
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...entranceTransition(0.35), duration: DURATION.page + 0.15 }}
          className="relative mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md"
        >
          <div
            aria-hidden
            className="absolute inset-0 -m-6 rounded-[2rem] bg-violet/25 blur-3xl"
          />
          <div
            ref={imgRef}
            className="relative overflow-hidden rounded-[2rem] border border-white/[0.06]"
            style={{
              /* Two-layer glow: tight highlight + wide diffuse for depth */
              boxShadow:
                "0 0 20px rgba(166, 61, 64, 0.45), 0 0 60px rgba(166, 61, 64, 0.22), 0 0 120px rgba(166, 61, 64, 0.08)",
            }}
          >
            <img
              src={assets.portrait}
              alt="Uzair Younis portrait"
              className="h-full w-full object-cover"
              width={600}
              height={750}
            />
          </div>
          <div className="absolute -left-2 top-6 rounded-full border border-white/[0.08] bg-[#1b1722]/80 px-4 py-2 text-xs font-medium text-white backdrop-blur-lg sm:-left-4 sm:top-8">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-violet" />
            AI Automation
          </div>
          <div className="absolute -right-1 bottom-10 rounded-full border border-white/[0.08] bg-[#1b1722]/80 px-4 py-2 text-xs font-medium text-white backdrop-blur-lg sm:-right-2 sm:bottom-12">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-cyan" />
            Fullstack Developer
          </div>
        </motion.div>
      </div>
    </section>
  );
}
