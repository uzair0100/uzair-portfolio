import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import CountUp from "./CountUp";
import { DURATION, EASE } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export default function Preloader() {
  const [done, setDone] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={reducedMotion ? { opacity: 0 } : { y: "-100%" }}
          transition={reducedMotion ? { duration: 0.3 } : { duration: DURATION.page, ease: EASE.exit }}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-[#0f0f12]"
        >
          <div className="text-center">
            <div className="font-display text-7xl font-bold text-white md:text-9xl">
              <CountUp
                to={100}
                duration={reducedMotion ? 0.5 : 1.2}
                onEnd={() => setTimeout(() => setDone(true), reducedMotion ? 0 : 150)}
                className="bg-gradient-to-r from-violet to-cyan bg-clip-text text-transparent"
              />
              <span className="text-violet">%</span>
            </div>
            <p className="mt-4 text-xs uppercase tracking-[0.4em] text-white/40">
              Uzair Younis · Portfolio
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
