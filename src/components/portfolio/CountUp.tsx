import { useInView, useMotionValue, useSpring } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";
import { SPRING, VIEWPORT } from "@/lib/motion";

type Props = {
  to: number;
  from?: number;
  duration?: number;
  className?: string;
  onEnd?: () => void;
  onStart?: () => void;
  startWhen?: boolean;
  separator?: string;
};

export default function CountUp({
  to,
  from = 0,
  duration = 2,
  className = "",
  onEnd,
  onStart,
  startWhen = true,
  separator = "",
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(from);
  const hasStarted = useRef(false);
  const spring = useSpring(motionValue, SPRING.count(duration));
  const isInView = useInView(ref, VIEWPORT);

  const format = useCallback(
    (v: number) => {
      const s = Intl.NumberFormat("en-US", {
        useGrouping: !!separator,
        maximumFractionDigits: 0,
      }).format(v);
      return separator ? s.replace(/,/g, separator) : s;
    },
    [separator],
  );

  useEffect(() => {
    if (!isInView || !startWhen || hasStarted.current) return;
    hasStarted.current = true;
    onStart?.();
    motionValue.set(to);
    const t = setTimeout(() => onEnd?.(), duration * 1000);
    return () => clearTimeout(t);
  }, [isInView, startWhen, motionValue, to, duration, onEnd, onStart]);

  useEffect(() => {
    return spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = format(v);
    });
  }, [spring, format]);

  return <span ref={ref} className={className}>{format(from)}</span>;
}
