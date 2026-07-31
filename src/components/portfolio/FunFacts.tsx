import { useRef, MouseEvent, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { STAGGER, VIEWPORT, entranceTransition } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type Card = {
  emoji: string;
  title: string;
  text: string;
  href?: string;
  accent: "violet" | "cyan";
};

const cards: Card[] = [
  {
    emoji: "📷",
    title: "Photography Enthusiast",
    text: "Cinematic reels and visual storytelling in my spare time.",
    href: "https://www.instagram.com/wtsupjerry/",
    accent: "violet",
  },
  {
    emoji: "☕",
    title: "Coffee + Coding",
    text: "Most of my best debugging happens somewhere around the third cup.",
    accent: "cyan",
  },
  {
    emoji: "🚀",
    title: "Interested in Technology",
    text: "Always exploring what's next, from AI models to new frameworks.",
    accent: "violet",
  },
];

function TiltCard({ card, index }: { card: Card; index: number }) {
  const reducedMotion = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const rafRef = useRef(0);
  const isHovering = useRef(false);

  // RAF only runs while hovering — saves GPU compositing layers at rest
  const startTick = useCallback(() => {
    if (rafRef.current) return;
    const el = ref.current;
    if (!el) return;
    el.style.willChange = "transform";
    const tick = () => {
      if (!isHovering.current) {
        // Settle back to neutral
        current.current.x += (0 - current.current.x) * 0.08;
        current.current.y += (0 - current.current.y) * 0.08;
        const settled =
          Math.abs(current.current.x) < 0.001 && Math.abs(current.current.y) < 0.001;
        el.style.transform = `perspective(900px) rotateY(${current.current.x * 6}deg) rotateX(${-current.current.y * 6}deg) translateZ(8px)`;
        if (settled) {
          el.style.transform = "";
          el.style.willChange = "auto";
          rafRef.current = 0;
          return;
        }
      } else {
        current.current.x += (target.current.x - current.current.x) * 0.08;
        current.current.y += (target.current.y - current.current.y) * 0.08;
        el.style.transform = `perspective(900px) rotateY(${current.current.x * 6}deg) rotateX(${-current.current.y * 6}deg) translateZ(8px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current);
      const el = ref.current;
      if (el) el.style.willChange = "auto";
    };
  }, []);

  const handleMove = (e: MouseEvent) => {
    if (reducedMotion) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    target.current.x = (e.clientX - r.left - r.width / 2) / r.width;
    target.current.y = (e.clientY - r.top - r.height / 2) / r.height;
    isHovering.current = true;
    startTick();
  };

  const reset = () => {
    isHovering.current = false;
    target.current = { x: 0, y: 0 };
    // Don't stop the RAF — let it smoothly settle to neutral
  };

  const glow =
    card.accent === "violet"
      ? "hover:shadow-[0_8px_32px_rgba(166,61,64,0.35),0_20px_64px_rgba(166,61,64,0.15)]"
      : "hover:shadow-[0_8px_32px_rgba(237,230,222,0.22),0_20px_64px_rgba(237,230,222,0.1)]";

  const inner = (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={entranceTransition(index * STAGGER.loose)}
      className="h-full"
    >
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        className={`glass-panel group h-full rounded-3xl p-8 transition-shadow duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${glow}`}
      >
        <div className="text-5xl transition-transform duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-110">
          {card.emoji}
        </div>
        <h3 className="mt-6 font-display text-xl font-bold text-white">{card.title}</h3>
        <p className="mt-3 text-sm leading-[1.6] text-white/60">{card.text}</p>
        {card.href && (
          <span className="mt-4 inline-block text-xs font-semibold text-violet opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            View on Instagram →
          </span>
        )}
      </div>
    </motion.div>
  );

  return card.href ? (
    <a
      href={card.href}
      target="_blank"
      rel="noreferrer"
      className="block h-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet"
    >
      {inner}
    </a>
  ) : (
    inner
  );
}

export default function FunFacts() {
  return (
    <section id="fun" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-white/40">Off the Clock</p>
          <h2 className="mt-3 font-display text-5xl font-bold text-white md:text-7xl">
            Beyond the Code
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((c, i) => (
            <TiltCard key={c.title} card={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
