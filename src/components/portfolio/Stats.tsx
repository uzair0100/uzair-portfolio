import { Briefcase, Cpu, Clock, Bot } from "lucide-react";
import { motion } from "framer-motion";
import CountUp from "./CountUp";
import { STAGGER, VIEWPORT, entranceTransition } from "@/lib/motion";

const stats = [
  { icon: Briefcase, value: 10, suffix: "+", label: "Projects Built for Clients", color: "violet" },
  { icon: Cpu, value: 5, suffix: "+", label: "Technologies Mastered", color: "cyan" },
  { icon: Clock, value: 1000, suffix: "+", label: "Hours of Development", color: "violet" },
  { icon: Bot, value: 3, suffix: "+", label: "AI Automation Workflows", color: "cyan" },
] as const;

export default function Stats() {
  return (
    <section className="relative px-6 py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4 md:gap-x-8">
        {stats.map((s, i) => {
          const Icon = s.icon;
          const color = s.color === "violet" ? "text-violet" : "text-cyan";
          const underline = s.color === "violet" ? "bg-violet" : "bg-cyan";
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={entranceTransition(i * STAGGER.default)}
              className="text-center"
            >
              <Icon className={`mx-auto mb-4 h-6 w-6 ${color}`} strokeWidth={1.5} />
              <div className="flex items-baseline justify-center font-display text-4xl font-bold text-white sm:text-5xl md:text-6xl">
                <CountUp to={s.value} duration={2} />
                <span className={color}>{s.suffix}</span>
              </div>
              <div className={`mx-auto mt-2 h-0.5 w-10 ${underline} opacity-80`} />
              <p className="mt-4 text-sm leading-[1.6] text-white/60">{s.label}</p>
            </motion.div>
          );
        })}
      </div>
      <p className="mt-14 text-center text-xs uppercase tracking-[0.3em] text-white/40">
        BS Software Engineering — FAST NUCES, Islamabad
      </p>
    </section>
  );
}
