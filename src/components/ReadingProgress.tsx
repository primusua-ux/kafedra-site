"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      const total = scrollHeight - clientHeight;
      setWidth(total > 0 ? Math.min((scrollTop / total) * 100, 100) : 0);
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  if (width <= 0) return null;

  return (
    <div
      className="reading-progress"
      style={{ width: `${width}%` }}
      aria-hidden
    />
  );
}
