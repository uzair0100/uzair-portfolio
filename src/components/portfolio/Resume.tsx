import { Download } from "lucide-react";
import { motion } from "framer-motion";
import { DURATION, entranceTransition } from "@/lib/motion";

export default function Resume() {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/Uzair-Younis-Resume.pdf";
    link.download = "Uzair-Younis-Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="px-6 py-20 md:py-24">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ ...entranceTransition(0.2), duration: DURATION.section }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative"
        >
          {/* Gradient background blur */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-6 rounded-3xl bg-gradient-to-r from-violet/20 to-cyan/20 blur-3xl opacity-50"
          />

          {/* Main card */}
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent p-8 md:p-12 backdrop-blur-xl">
            {/* Decorative top accent */}
            <div className="absolute top-0 left-1/4 h-px w-1/2 bg-gradient-to-r from-transparent via-violet/30 to-transparent" />

            <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              {/* Left content */}
              <div className="flex-1">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <p className="text-xs uppercase tracking-[0.3em] text-white/40">Download CV</p>
                  <h3 className="mt-2 font-display text-3xl font-bold text-white md:text-4xl">
                    Uzair Younis
                  </h3>
                  <p className="mt-2 text-sm text-violet font-semibold">
                    Fullstack & AI Automation Engineer
                  </p>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.15, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="mt-4 max-w-md text-sm leading-relaxed text-white/60"
                >
                  Get a comprehensive view of my skills, experience, and projects. Full technical background, tech stack expertise, and proven track record of shipping AI-driven products.
                </motion.p>

                {/* Quick stats */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="mt-6 flex flex-wrap gap-6 text-xs text-white/50"
                >
                  <div>
                    <p className="text-white/40 uppercase tracking-wider">Format</p>
                    <p className="mt-1 font-semibold text-white">PDF Document</p>
                  </div>
                  <div>
                    <p className="text-white/40 uppercase tracking-wider">File Size</p>
                    <p className="mt-1 font-semibold text-white">~200 KB</p>
                  </div>
                </motion.div>
              </div>

              {/* Right side - Download button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25, duration: 0.6 }}
                viewport={{ once: true }}
                className="flex shrink-0 justify-center md:justify-end"
              >
                <motion.button
                  onClick={handleDownload}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet to-cyan px-8 py-6 text-white shadow-[0_8px_32px_rgba(166,61,64,0.35)] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:shadow-[0_16px_64px_rgba(166,61,64,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet"
                >
                  {/* Animated background shine */}
                  <div className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full" />

                  {/* Button content */}
                  <div className="relative flex items-center justify-center gap-3">
                    <Download className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1" />
                    <span className="font-display font-semibold text-sm md:text-base">
                      Download Resume
                    </span>
                  </div>
                </motion.button>
              </motion.div>
            </div>

            {/* Bottom decorative element */}
            <div className="absolute bottom-0 right-1/4 h-px w-1/2 bg-gradient-to-r from-transparent via-cyan/30 to-transparent" />
          </div>

          {/* Floating hint text - appears on hover/scroll */}
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-4 text-center text-xs text-white/40"
          >
            Click the button to download my full resume with detailed experience and skills
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
