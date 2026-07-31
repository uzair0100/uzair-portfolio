import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { GoArrowUpRight } from "react-icons/go";
import { GSAP_EASE, STAGGER, DURATION } from "@/lib/motion";

type NavLink = { label: string; href: string; ariaLabel?: string };
type NavItem = {
  label: string;
  bgColor: string;
  textColor: string;
  links: NavLink[];
};

const items: NavItem[] = [
  {
    label: "About",
    bgColor: "#1B1722",
    textColor: "#F5F5F7",
    links: [
      { label: "Background", href: "#hero" },
      { label: "Skills", href: "#tech" },
      { label: "Philosophy", href: "#fun" },
    ],
  },
  {
    label: "Projects",
    bgColor: "#2F293A",
    textColor: "#F5F5F7",
    links: [
      { label: "AI Automation Projects", href: "#projects" },
      { label: "Fullstack Applications", href: "#projects" },
      { label: "Featured Work", href: "#projects" },
    ],
  },
  {
    label: "Contact",
    bgColor: "#1B1722",
    textColor: "#F5F5F7",
    links: [
      { label: "Email", href: "mailto:uzairy099@gmail.com" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/uzair-younis-347438364/" },
      { label: "GitHub", href: "https://github.com/uzair0100" },
    ],
  },
];

export default function CardNav() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const el = navRef.current;
    if (!el) return;
    gsap.set(el, { height: 64, overflow: "hidden" });
    gsap.set(cardsRef.current, { y: 40, opacity: 0 });
    const tl = gsap.timeline({ paused: true });
    tl.to(el, {
      height: () => (window.matchMedia("(max-width: 768px)").matches ? 420 : 280),
      duration: DURATION.entrance,
      ease: GSAP_EASE.card,
    });
    tl.to(
      cardsRef.current,
      { y: 0, opacity: 1, duration: DURATION.entrance, stagger: STAGGER.default, ease: GSAP_EASE.card },
      "-=0.15",
    );
    tlRef.current = tl;
    return () => {
      tl.kill();
    };
  }, []);

  const toggle = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isOpen) {
      tl.play(0);
      setIsOpen(true);
    } else {
      tl.eventCallback("onReverseComplete", () => setIsOpen(false));
      tl.reverse();
    }
  };

  return (
    <div
      ref={navRef}
      className="fixed left-1/2 top-6 z-[99] w-[min(94vw,900px)] -translate-x-1/2 rounded-2xl border border-white/10 bg-[#0f0f12]/85 p-3 shadow-[0_10px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl"
    >
      <div className="flex h-10 items-center justify-between px-2">
        <button
          onClick={toggle}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          className="flex h-8 w-8 flex-col items-center justify-center gap-1.5"
        >
          <span
            className={`h-0.5 w-5 bg-white transition-transform ${isOpen ? "translate-y-[3px] rotate-45" : ""}`}
          />
          <span
            className={`h-0.5 w-5 bg-white transition-transform ${isOpen ? "-translate-y-[5px] -rotate-45" : ""}`}
          />
        </button>
        <span className="font-display text-sm font-bold uppercase tracking-[0.25em] text-white">
          Uzair Younis
        </span>
        <a
          href="#contact"
          className="rounded-full bg-[#111] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-violet"
        >
          Hire Me
        </a>
      </div>
      <div className="mt-3 grid gap-3 px-1 md:grid-cols-3">
        {items.map((item, idx) => (
          <div
            key={item.label}
            ref={(el) => {
              if (el) cardsRef.current[idx] = el;
            }}
            className="rounded-xl p-4"
            style={{ backgroundColor: item.bgColor, color: item.textColor }}
          >
            <h4 className="font-display text-lg font-bold">{item.label}</h4>
            <div className="mt-2 flex flex-col gap-1.5">
              {item.links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group flex items-center gap-1 text-sm text-white/70 transition-colors hover:text-violet"
                >
                  <GoArrowUpRight className="text-xs transition-transform group-hover:translate-x-0.5" />
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}