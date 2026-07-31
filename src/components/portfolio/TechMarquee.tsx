import { useScroll, useVelocity, useTransform, useSpring, useMotionValue, useAnimationFrame } from "framer-motion";
import { useEffect, useRef, ComponentType } from "react";
import {
  SiReact, SiNextdotjs, SiTypescript, SiNodedotjs, SiExpress, SiTailwindcss, SiPostgresql,
  SiPython, SiFlask, SiLangchain, SiGooglegemini, SiClaude,
  SiSupabase, SiMongodb, SiDocker,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { TbBrandOpenai } from "react-icons/tb";
import { Database, Cloud, Server, HardDrive } from "lucide-react";
import { SPRING } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type Tech = { name: string; Icon: ComponentType<{ className?: string }>; color: string };

const row1: Tech[] = [
  { name: "React", Icon: SiReact, color: "#EDE6DE" },
  { name: "Next.js", Icon: SiNextdotjs, color: "#EDE6DE" },
  { name: "TypeScript", Icon: SiTypescript, color: "#EDE6DE" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#EDE6DE" },
  { name: "Express", Icon: SiExpress, color: "#EDE6DE" },
  { name: "Tailwind", Icon: SiTailwindcss, color: "#EDE6DE" },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#EDE6DE" },
];
const row2: Tech[] = [
  { name: "Python", Icon: SiPython, color: "#EDE6DE" },
  { name: "Flask", Icon: SiFlask, color: "#EDE6DE" },
  { name: "LangChain", Icon: SiLangchain, color: "#EDE6DE" },
  { name: "Gemini", Icon: SiGooglegemini, color: "#EDE6DE" },
  { name: "OpenAI", Icon: TbBrandOpenai, color: "#EDE6DE" },
  { name: "Claude", Icon: SiClaude, color: "#EDE6DE" },
];
const row3: Tech[] = [
  { name: "Supabase", Icon: SiSupabase, color: "#EDE6DE" },
  { name: "MongoDB", Icon: SiMongodb, color: "#EDE6DE" },
  { name: "DynamoDB", Icon: Database, color: "#EDE6DE" },
  { name: "AWS EC2", Icon: Server, color: "#EDE6DE" },
  { name: "AWS S3", Icon: HardDrive, color: "#EDE6DE" },
  { name: "Amplify", Icon: Cloud, color: "#EDE6DE" },
  { name: "AWS", Icon: FaAws, color: "#EDE6DE" },
  { name: "Docker", Icon: SiDocker, color: "#EDE6DE" },
];

function Row({ items, direction = 1, speed = 40 }: { items: Tech[]; direction?: 1 | -1; speed?: number }) {
  const reducedMotion = usePrefersReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const offset = useMotionValue(0);
  const halfWidthRef = useRef(0);
  const { scrollY } = useScroll();
  const vel = useVelocity(scrollY);
  const smoothVel = useSpring(vel, SPRING.velocity);
  // Use absolute velocity so scrolling either direction boosts speed (not reverses it)
  const velBoost = useTransform(smoothVel, (v) => Math.max(0.5, Math.min(6, 1 + Math.abs(v) / 800)));

  // Reset cached width on resize to prevent drift
  useEffect(() => {
    const onResize = () => { halfWidthRef.current = 0; };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useAnimationFrame((_, delta) => {
    if (reducedMotion) return;
    const el = trackRef.current;
    if (!el) return;
    if (!halfWidthRef.current) halfWidthRef.current = el.scrollWidth / 2;
    const half = halfWidthRef.current;
    if (!half) return;
    const base = (delta / 1000) * speed;
    const boost = velBoost.get();
    const step = base * boost * direction;
    let next = offset.get() - step;
    if (next <= -half) next += half;
    if (next >= 0) next -= half;
    offset.set(next);
    el.style.transform = `translate3d(${next}px,0,0)`;
  });

  return (
    <div className="overflow-hidden py-2">
      <div ref={trackRef} className="flex w-max gap-4 whitespace-nowrap">
        {[...items, ...items].map((t, i) => {
          const Icon = t.Icon;
          return (
            <span
              key={i}
              className="group flex items-center gap-3 rounded-full border border-white/[0.08] bg-[#1a1414]/80 px-6 py-3 font-display text-base font-semibold text-white/80 transition-colors duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] hover:border-violet/60 hover:text-white"
              title={t.name}
            >
              <Icon className="h-5 w-5 text-violet transition-colors duration-200 group-hover:text-cyan" />
              <span>{t.name}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default function TechMarquee() {
  return (
    <section id="tech" className="relative overflow-x-clip py-24" aria-label="Technology stack">
      <div className="mx-auto mb-12 max-w-6xl px-6 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-white/40">The Stack</p>
        <h2 className="mt-3 font-display text-5xl font-bold text-white md:text-6xl">
          Tools I ship with
        </h2>
      </div>
      <div
        aria-hidden="true"
        className="relative space-y-4"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, #0f0f12 8%, #0f0f12 92%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, #0f0f12 8%, #0f0f12 92%, transparent 100%)",
        }}
      >
        <Row items={row1} direction={-1} />
        <Row items={row2} direction={1} />
        <Row items={row3} direction={-1} />
      </div>
    </section>
  );
}
