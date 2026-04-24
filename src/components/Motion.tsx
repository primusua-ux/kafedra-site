"use client";

import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";

type Variant = "fade-up" | "fade-in" | "fade-left" | "scale-in";

interface MotionProps {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  style?: CSSProperties;
}

const INITIAL: Record<Variant, CSSProperties> = {
  "fade-up":   { opacity: 0, transform: "translateY(28px)" },
  "fade-in":   { opacity: 0 },
  "fade-left": { opacity: 0, transform: "translateX(-24px)" },
  "scale-in":  { opacity: 0, transform: "scale(0.96)" },
};

const EASING = "cubic-bezier(0.22, 1, 0.36, 1)";

export default function Motion({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 600,
  threshold = 0.12,
  className,
  style,
}: MotionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    Object.assign(el.style, INITIAL[variant]);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const timer = setTimeout(() => {
          el.style.transition = `opacity ${duration}ms ${EASING} ${delay}ms, transform ${duration}ms ${EASING} ${delay}ms`;
          el.style.opacity = "1";
          el.style.transform = "none";
        }, 16);
        observer.unobserve(el);
        return () => clearTimeout(timer);
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [variant, delay, duration, threshold]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}

/** Stagger-контейнер: анімує дочірні елементи по черзі */
export function StaggerContainer({
  children,
  stagger = 100,
  variant = "fade-up",
  duration = 600,
  className,
}: {
  children: ReactNode[];
  stagger?: number;
  variant?: Variant;
  duration?: number;
  className?: string;
}) {
  return (
    <div className={className}>
      {(children as ReactNode[]).map((child, i) => (
        <Motion key={i} variant={variant} delay={i * stagger} duration={duration}>
          {child}
        </Motion>
      ))}
    </div>
  );
}
