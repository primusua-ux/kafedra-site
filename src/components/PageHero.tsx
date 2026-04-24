import { ReactNode } from "react";

export default function PageHero({
  eyebrow,
  title,
  description,
  icon,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  icon?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-[--color-border]">
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[--color-accent] to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="flex items-start gap-4">
          {icon && (
            <div className="animate-scale-in hidden sm:flex h-14 w-14 items-center justify-center border border-[--color-accent] bg-[--color-bg-panel] corner-cut shrink-0">
              <div className="text-[--color-accent]">{icon}</div>
            </div>
          )}
          <div>
            <div className="animate-fade-in section-title text-xs text-[--color-accent] mb-3">
              {eyebrow}
            </div>
            <h1 className="animate-fade-up delay-100 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
              {title}
            </h1>
            {description && (
              <p className="animate-fade-up delay-200 mt-4 text-[--color-text-muted] max-w-3xl text-lg">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
