/** Shared animation tokens — keep timing consistent site-wide. */

export const EASE = {
  /** Decisive entrance — expo-out */
  entrance: [0.16, 1, 0.3, 1] as const,
  /** Fast, responsive micro-interactions */
  hover: [0.4, 0, 0.2, 1] as const,
  /** Slightly snappier exits (~0.7× entrance feel) */
  exit: [0.55, 0, 1, 0.45] as const,
} as const;

export const DURATION = {
  micro: 0.18,
  hover: 0.22,
  entrance: 0.6,
  section: 0.65,
  page: 0.75,
  /** ~0.7× section entrance */
  exit: 0.42,
} as const;

export const STAGGER = {
  tight: 0.05,
  default: 0.08,
  loose: 0.1,
} as const;

export const VIEWPORT = {
  once: true as const,
  /** Fire slightly before fully in view (~85% viewport) */
  margin: "-15%" as const,
};

export const SPRING = {
  /** Cursor tilt — damped, barely perceptible overshoot */
  tilt: { stiffness: 180, damping: 28, mass: 0.85 },
  /** Scroll velocity smoothing for marquee */
  velocity: { stiffness: 400, damping: 50 },
  /** Carousel drag inertia */
  carousel: { stiffness: 120, damping: 24, mass: 0.9 },
  /** Count-up counter */
  count: (duration: number) => ({
    damping: 20 + 40 * (1 / duration),
    stiffness: 100 * (1 / duration),
  }),
} as const;

/** Framer-motion transition presets */
export const entranceTransition = (delay = 0) => ({
  duration: DURATION.entrance,
  delay,
  ease: EASE.entrance,
});

export const hoverTransition = {
  duration: DURATION.hover,
  ease: EASE.hover,
};

export const exitTransition = {
  duration: DURATION.exit,
  ease: EASE.exit,
};

/** GSAP ease strings matching the cubic-bezier tokens above */
export const GSAP_EASE = {
  entrance: "expo.out",
  exit: "power3.in",
  hover: "power2.out",
  /** CardNav height expansion */
  card: "power3.out",
} as const;
