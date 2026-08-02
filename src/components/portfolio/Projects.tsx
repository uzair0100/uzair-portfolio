import { motion } from "framer-motion";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import { assets } from "@/lib/assets";
import {
  STAGGER,
  VIEWPORT,
  entranceTransition,
  hoverTransition,
} from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type Project = {
  title: string;
  desc: string;
  tech: string[];
  image: string;
  link?: string;
  accent: "violet" | "cyan";
  status?: string;
};

const projects: Project[] = [
  {
    title: "Dex360",
    desc: "AI marketing analyst that connects to your ad platforms and answers performance questions in plain English.",
    tech: ["React", "Node.js", "PostgreSQL", "EC2", "Claude MCP"],
    image: assets.dex360,
    link: "https://dex360.ai/",
    accent: "violet",
  },
  {
    title: "Contello",
    desc: "AI content engine that generates video, voiceover, and copy while keeping your brand voice consistent.",
    tech: ["Next.js", "Node.js", "DynamoDB", "AWS S3", "Amplify", "Gemini VEO", "OpenAI SORA"],
    image: assets.contello,
    link: "https://contello.ai/",
    accent: "violet",
  },
  {
    title: "BaseHR (AI Recruitment Platform)",
    desc: "AI hiring platform that scores every applicant against the actual job, not just keywords.",
    tech: ["React", "Express.js", "LangChain", "LangGraph", "Gemini", "Supabase", "Flask"],
    image: assets.basehr,
    link: "https://basehr.co.uk/",
    accent: "violet",
  },
  {
    title: "VOCS AI",
    desc: "Generative voice platform where users create AI singers and convert their voice into entirely new ones.",
    tech: ["MERN", "AWS EC2", "AWS S3", "Generative AI"],
    image: assets.vocs,
    link: "https://www.vocs.ai/",
    accent: "cyan",
  },
  {
    title: "Crypto Mining Application",
    desc: "Simplified crypto mining hosting platform making a technical process accessible to everyday users.",
    tech: ["MERN"],
    image: assets.crypto,
    link: "https://tiers-frontend.vercel.app/",
    accent: "cyan",
  },
  {
    title: "Federated AI Recruitment System",
    desc: "Next-generation recruitment intelligence system currently in active development.",
    tech: ["AI Automation", "In Development"],
    image: assets.federated,
    accent: "violet",
    status: "Coming Soon",
  },
];

function ProjectCard({
  p,
  index,
  innerRef,
}: {
  p: Project;
  index: number;
  innerRef?: (el: HTMLDivElement | null) => void;
}) {
  const glow = p.accent === "violet" ? "glow-violet" : "glow-cyan";

  const handleCardClick = (e: React.MouseEvent) => {
    // Stop event from propagating to carousel rail
    e.stopPropagation();
    
    if (p.link) {
      window.open(p.link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{
        ...entranceTransition(Math.min(index * STAGGER.default, 0.4)),
      }}
      whileHover={{ y: -6, transition: hoverTransition }}
      onClick={handleCardClick}
      style={{ pointerEvents: 'auto' }}
      className={`glass-panel group overflow-hidden rounded-2xl ${glow} ${p.link ? 'cursor-pointer' : ''}`}
    >
      <div
        ref={innerRef}
        data-project-card
        className="h-full transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{ transformOrigin: "center center" }}
      >
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={p.image}
            alt={p.title}
            className="h-full w-full object-cover object-top transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-105"
            loading="lazy"
            draggable={false}
            width={1200}
            height={675}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1b1722] via-transparent to-transparent" />
          
          {/* Smooth hover hint overlay - only for clickable cards */}
          {p.link && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:bg-black/30 pointer-events-none">
              <div className="flex translate-y-8 flex-col items-center gap-2 opacity-0 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:translate-y-0 group-hover:opacity-100">
                <ArrowUpRight className="h-6 w-6 text-white" />
                <span className="text-sm font-semibold text-white">View Live Demo</span>
              </div>
            </div>
          )}
          
          {p.status && (
            <span className="absolute right-3 top-3 rounded-full border border-violet/40 bg-violet/20 px-2.5 py-0.5 text-[10px] font-medium text-white backdrop-blur">
              {p.status}
            </span>
          )}
        </div>
        <div className="p-4 md:p-5">
          <h3 className="font-display text-xl font-bold text-white md:text-2xl">{p.title}</h3>
          <p className="mt-1.5 text-xs leading-[1.6] text-white/60 md:text-sm">{p.desc}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {p.tech.map((t) => (
              <span
                key={t}
                className={`rounded-full border px-2.5 py-0.5 text-[10px] ${p.accent === "violet" ? "border-violet/40 text-violet" : "border-cyan/40 text-cyan"}`}
              >
                {t}
              </span>
            ))}
          </div>
          {p.status && !p.link && (
            <div className="mt-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/60">
                {p.status}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const reducedMotion = usePrefersReducedMotion();
  const railRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dragState = useRef({ down: false, startX: 0, startScroll: 0, moved: false, lastX: 0, lastTime: 0 });
  const velocityRef = useRef(0);
  const momentumRafRef = useRef(0);
  const scrollRafRef = useRef(0);
  const activeIndexRef = useRef(0);

  const updateCardTransforms = useCallback(() => {
    const rail = railRef.current;
    if (!rail || reducedMotion) return;

    const railRect = rail.getBoundingClientRect();
    const railCenter = railRect.left + railRect.width / 2;

    cardRefs.current.forEach((card) => {
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const dist = (cardCenter - railCenter) / Math.max(rect.width, 1);
      const absDist = Math.min(Math.abs(dist), 1.2);
      const t = Math.min(absDist, 1);
      const scale = 1 - t * 0.07;
      const opacity = 1 - t * 0.3;
      const translateZ = (1 - t) * 24;
      card.style.transform = `perspective(1200px) scale(${scale}) translateZ(${translateZ}px)`;
      card.style.opacity = String(opacity);
    });
  }, [reducedMotion]);

  const scheduleTransformUpdate = useCallback(() => {
    if (scrollRafRef.current) return;
    scrollRafRef.current = requestAnimationFrame(() => {
      scrollRafRef.current = 0;
      updateCardTransforms();
    });
  }, [updateCardTransforms]);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    scheduleTransformUpdate();
    rail.addEventListener("scroll", scheduleTransformUpdate, { passive: true });
    window.addEventListener("resize", scheduleTransformUpdate, { passive: true });

    return () => {
      rail.removeEventListener("scroll", scheduleTransformUpdate);
      window.removeEventListener("resize", scheduleTransformUpdate);
      cancelAnimationFrame(scrollRafRef.current);
      cancelAnimationFrame(momentumRafRef.current);
    };
  }, [scheduleTransformUpdate]);

  const scrollToIndex = useCallback((index: number) => {
    const rail = railRef.current;
    const card = cardRefs.current[index];
    if (!rail || !card) return;
    const railRect = rail.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const delta = cardRect.left + cardRect.width / 2 - (railRect.left + railRect.width / 2);
    rail.scrollBy({ left: delta, behavior: reducedMotion ? "auto" : "smooth" });
    activeIndexRef.current = index;
  }, [reducedMotion]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const rail = railRef.current;
      if (!rail || !rail.contains(document.activeElement)) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        scrollToIndex(Math.min(activeIndexRef.current + 1, projects.length - 1));
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        scrollToIndex(Math.max(activeIndexRef.current - 1, 0));
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [scrollToIndex]);

  const applyMomentum = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    let v = velocityRef.current;

    const step = () => {
      if (Math.abs(v) < 0.4) {
        momentumRafRef.current = 0;
        scheduleTransformUpdate();
        return;
      }
      el.scrollLeft += v;
      v *= 0.94;
      velocityRef.current = v;
      scheduleTransformUpdate();
      momentumRafRef.current = requestAnimationFrame(step);
    };
    cancelAnimationFrame(momentumRafRef.current);
    momentumRafRef.current = requestAnimationFrame(step);
  }, [scheduleTransformUpdate]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // CRITICAL FIX: Don't capture pointer if clicking on a project card
    if ((e.target as Element).closest('[data-project-card]')) {
      return;
    }
    
    const el = railRef.current;
    if (!el) return;
    cancelAnimationFrame(momentumRafRef.current);
    dragState.current = {
      down: true,
      startX: e.clientX,
      startScroll: el.scrollLeft,
      moved: false,
      lastX: e.clientX,
      lastTime: performance.now(),
    };
    velocityRef.current = 0;
    el.setPointerCapture(e.pointerId);
    el.style.cursor = "grabbing";
    el.style.scrollBehavior = "auto";
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = dragState.current;
    const el = railRef.current;
    if (!s.down || !el) return;
    const now = performance.now();
    const dx = e.clientX - s.startX;
    // Only mark as moved if there's significant movement (>8px threshold)
    if (Math.abs(dx) > 8) s.moved = true;
    el.scrollLeft = s.startScroll - dx;

    const dt = now - s.lastTime;
    if (dt > 0) {
      velocityRef.current = ((s.lastX - e.clientX) / dt) * 16;
    }
    s.lastX = e.clientX;
    s.lastTime = now;
    scheduleTransformUpdate();
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = railRef.current;
    if (!el) return;
    // Release pointer capture FIRST to avoid click interception
    try {
      el.releasePointerCapture(e.pointerId);
    } catch {
      /* pointer already released */
    }
    dragState.current.down = false;
    // Reset moved flag after drag ends
    dragState.current.moved = false;
    el.style.cursor = "grab";
    el.style.scrollBehavior = reducedMotion ? "auto" : "smooth";
    if (!reducedMotion && Math.abs(velocityRef.current) > 0.5) {
      applyMomentum();
    }
  };

  return (
    <section id="projects" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-white/40">Featured Work</p>
        <h2 className="mt-3 font-display text-5xl font-bold text-white md:text-7xl">
          Products in the wild
        </h2>
        <p className="mx-auto mt-4 max-w-xl leading-[1.6] text-white/60">
          {projects.length} shipped and in-progress projects. Drag or scroll to explore.
        </p>
        
        {/* Scroll Right Indicator */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-6 flex items-center justify-center gap-2 text-white/30"
        >
          <span className="text-xs uppercase tracking-widest">Swipe</span>
          <motion.div
            animate={{ x: [0, 8, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
          </motion.div>
        </motion.div>
      </div>

      <div
        ref={railRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Featured projects"
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={(e) => {
          // Only prevent clicks if there was actual dragging movement
          // Allow clicks on the carousel itself for project cards
          if (dragState.current.moved && !(e.target as Element).closest('[data-project-card]')) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
        onFocus={() => {
          /* sync active index to nearest card on focus */
          const rail = railRef.current;
          if (!rail) return;
          const railCenter = rail.getBoundingClientRect().left + rail.offsetWidth / 2;
          let closest = 0;
          let minDist = Infinity;
          cardRefs.current.forEach((card, i) => {
            if (!card) return;
            const rect = card.getBoundingClientRect();
            const dist = Math.abs(rect.left + rect.width / 2 - railCenter);
            if (dist < minDist) {
              minDist = dist;
              closest = i;
            }
          });
          activeIndexRef.current = closest;
        }}
        className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-8 cursor-grab select-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet"
        style={{
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-x",
          overscrollBehaviorX: "contain",
          paddingLeft: "max(1.5rem, calc((100vw - 28rem) / 2))",
          paddingRight: "max(1.5rem, calc((100vw - 28rem) / 2))",
        }}
      >
        {projects.map((p, i) => (
          <div
            key={p.title}
            className="w-[80vw] max-w-[28rem] shrink-0 snap-center sm:w-[58vw] md:w-[42vw] lg:w-[28rem]"
          >
            <ProjectCard
              p={p}
              index={i}
              innerRef={(el) => {
                cardRefs.current[i] = el;
              }}
            />
          </div>
        ))}
      </div>

      <p className="mt-2 text-center text-xs uppercase tracking-[0.3em] text-white/30">
        Drag / scroll → · Arrow keys when focused
      </p>
    </section>
  );
}
