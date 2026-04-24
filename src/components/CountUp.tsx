"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  /** Фінальне число (напр. 1200) */
  end: number;
  /** Суфікс після числа (напр. "+", "%") */
  suffix?: string;
  /** Префікс перед числом */
  prefix?: string;
  /** Тривалість анімації в ms */
  duration?: number;
}

/** easeOutExpo — швидкий старт, плавний фініш */
function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export default function CountUp({
  end,
  suffix = "",
  prefix = "",
  duration = 3600,
}: CountUpProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;

        const startTime = performance.now();

        const tick = (now: number) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          setCount(Math.round(easeOutExpo(progress) * end));
          if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
}
