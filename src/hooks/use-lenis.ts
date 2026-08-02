import Lenis from "lenis";
import { useEffect } from "react";
import { usePrefersReducedMotion } from "./use-prefers-reduced-motion";

/**
 * Initializes Lenis smooth scroll once per page mount.
 * Skipped when the user prefers reduced motion OR on mobile devices.
 * Mobile devices use native smooth scroll for better performance.
 */
export function useLenis() {
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    // Disable Lenis on mobile devices - use native scroll instead
    const isMobile = window.innerWidth < 1024 || 'ontouchstart' in window;
    
    if (reducedMotion || isMobile) {
      // Enable native smooth scrolling on mobile
      document.documentElement.style.scrollBehavior = 'smooth';
      return () => {
        document.documentElement.style.scrollBehavior = '';
      };
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [reducedMotion]);
}
