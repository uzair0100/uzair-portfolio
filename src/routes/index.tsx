import { createFileRoute } from "@tanstack/react-router";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import Preloader from "@/components/portfolio/Preloader";
import StaggeredMenu from "@/components/portfolio/StaggeredMenu";
import Hero from "@/components/portfolio/Hero";
import BackgroundFX from "@/components/portfolio/BackgroundFX";
import Resume from "@/components/portfolio/Resume";
import TechMarquee from "@/components/portfolio/TechMarquee";
import Stats from "@/components/portfolio/Stats";
import Projects from "@/components/portfolio/Projects";
import FunFacts from "@/components/portfolio/FunFacts";
import Contact from "@/components/portfolio/Contact";
import MusicPlayer from "@/components/portfolio/MusicPlayer";
import { useLenis } from "@/hooks/use-lenis";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Uzair Younis — Fullstack & AI Automation Engineer" },
      {
        name: "description",
        content:
          "Portfolio of Uzair Younis, a software engineer building AI-driven products and full-stack platforms — from AI recruitment engines to generative content tools.",
      },
      { property: "og:title", content: "Uzair Younis — Fullstack & AI Automation Engineer" },
      {
        property: "og:description",
        content: "Fullstack & AI Automation Specialist. Shipped AI products used by real companies.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useLenis();
  const reducedMotion = usePrefersReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Disable parallax on mobile - causes layout issues
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], (reducedMotion || isMobile) ? [1, 1] : [1, 0.96]);
  const opacity = useTransform(scrollYProgress, [0, 1], (reducedMotion || isMobile) ? [1, 1] : [1, 0.5]);

  return (
    <div className="relative min-h-screen bg-[#0f0f12] text-white">
      <Preloader />
      <BackgroundFX />
      <MusicPlayer />
      <StaggeredMenu

        position="right"
        colors={["#2a1e1e", "#a63d40"]}
        accentColor="#a63d40"
        menuButtonColor="#ede6de"
        openMenuButtonColor="#1a1414"
        items={[
          { label: "Home", ariaLabel: "Go to top", link: "#hero" },
          { label: "Work", ariaLabel: "See projects", link: "#projects" },
          { label: "Stack", ariaLabel: "Tech stack", link: "#tech" },
          { label: "About", ariaLabel: "About me", link: "#fun" },
          { label: "Contact", ariaLabel: "Get in touch", link: "#contact" },
        ]}
        socialItems={[
          { label: "GitHub", link: "https://github.com/uzair0100" },
          { label: "LinkedIn", link: "https://www.linkedin.com/in/uzair-younis-347438364/" },
          { label: "Email", link: "mailto:uzairy099@gmail.com" },
        ]}
        displaySocials
        displayItemNumbering
      />

      <motion.div
        ref={heroRef}
        style={isMobile ? {} : { scale, opacity }}
        className={isMobile ? "relative z-[1]" : "sticky top-0 z-[1]"}
      >
        <Hero />
      </motion.div>

      <div className="relative z-10 rounded-t-[3rem] bg-[#0f0f12] shadow-[0_-40px_120px_rgba(0,0,0,0.6)]">
        <Resume />
        <TechMarquee />
        <Stats />
        <Projects />
        <FunFacts />
        <Contact />
      </div>
    </div>
  );
}
