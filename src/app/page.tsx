import Link from "next/link";
import {
  ArrowRight,
  Target,
  GraduationCap,
  BookOpen,
  Users,
  Award,
  ChevronRight,
} from "lucide-react";
import Motion from "@/components/Motion";
import CountUp from "@/components/CountUp";

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-[--color-border]">
        <div className="absolute inset-0 grid-pattern opacity-60" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[--color-accent] to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <div className="max-w-3xl">

            {/* Badge */}
            <div className="animate-fade-in delay-100 inline-flex items-center gap-2 border border-[--color-accent-dim] bg-[--color-bg-panel]/60 px-3 py-1.5 text-xs uppercase tracking-[0.25em] text-[--color-accent] mb-8">
              <span className="h-1.5 w-1.5 bg-[--color-accent] rounded-full animate-fade-in delay-200" />
              Програма підготовки офіцерів запасу
            </div>

            {/* Title */}
            <h1 className="animate-fade-up delay-200 leading-[1.1] tracking-tight">
              <span className="block text-4xl sm:text-5xl lg:text-6xl font-extrabold">
                Кафедра{" "}
                <span className="text-[--color-accent]">військової підготовки</span>
              </span>
              <span className="block text-2xl sm:text-3xl lg:text-4xl font-semibold text-[--color-text-muted] mt-2">
                Житомирського військового інституту імені С.&nbsp;П.&nbsp;Корольова
              </span>
            </h1>

            {/* Description */}
            <p className="animate-fade-up delay-300 mt-6 text-lg text-[--color-text-muted] max-w-2xl">
              Готуємо офіцерів запасу Збройних Сил України — з міцною
              теоретичною базою, практичними навичками та відданістю обов'язку.
              Освіта, що формує характер.
            </p>

            {/* Buttons */}
            <div className="animate-fade-up delay-400 mt-10 flex flex-wrap gap-3">
              <Link
                href="/applicants"
                className="inline-flex items-center gap-2 bg-[--color-accent] px-6 py-3 text-sm uppercase tracking-widest font-semibold text-[--color-bg] hover:bg-[--color-accent-hover] hover:gap-3"
              >
                Стати студентом
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 border border-[--color-border-strong] px-6 py-3 text-sm uppercase tracking-widest text-[--color-text] hover:border-[--color-accent] hover:text-[--color-accent]"
              >
                Про кафедру
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="animate-fade-up delay-500 mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-[--color-border]">
            {[
              { end: 30,   suffix: "+", label: "Років досвіду" },
              { end: 1200, suffix: "+", label: "Випускників" },
              { end: 24,   suffix: "",  label: "Навчальні дисципліни" },
              { end: 100,  suffix: "%", label: "Практична підготовка" },
            ].map((s) => (
              <div key={s.label} className="bg-[--color-bg-panel] px-6 py-8 group hover:bg-[--color-bg-elevated]">
                <div className="text-3xl sm:text-4xl font-extrabold text-[--color-accent] group-hover:scale-105" style={{ display: "inline-block" }}>
                  <CountUp end={s.end} suffix={s.suffix} duration={3600} />
                </div>
                <div className="mt-2 text-xs uppercase tracking-widest text-[--color-text-muted]">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTIONS GRID */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <Motion variant="fade-up" className="flex items-end justify-between gap-6 mb-10">
          <div>
            <div className="section-title text-xs text-[--color-accent] mb-3">Розділи</div>
            <h2 className="text-3xl sm:text-4xl font-bold">Навігація сайтом</h2>
          </div>
        </Motion>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              href: "/about",
              icon: Target,
              title: "Про кафедру",
              desc: "Призначення, цілі, мета навчання, історія та досягнуті результати кафедри.",
              delay: 0,
            },
            {
              href: "/applicants",
              icon: GraduationCap,
              title: "Вступнику",
              desc: "Спеціальності, умови вступу, вступні випробування, терміни та перелік документів.",
              delay: 100,
            },
            {
              href: "/students",
              icon: BookOpen,
              title: "Студенту",
              desc: "Дисципліни, тематичні плани, методичні матеріали, література, розклад занять.",
              locked: true,
              delay: 200,
            },
            {
              href: "/teachers",
              icon: Users,
              title: "Викладачам",
              desc: "Завантаження методичних матеріалів, календар подій, повний розклад.",
              locked: true,
              delay: 300,
            },
          ].map((card) => (
            <Motion key={card.href} variant="fade-up" delay={card.delay}>
              <Link
                href={card.href}
                className="group relative flex flex-col h-full border border-[--color-border] bg-[--color-bg-panel] p-6 hover:border-[--color-accent] hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(201,162,74,0.08)]"
              >
                <div className="absolute top-0 right-0 h-[2px] w-10 bg-[--color-accent] group-hover:w-full" style={{ transition: "width 0.8s cubic-bezier(0.22,1,0.36,1)" }} />
                <card.icon className="h-7 w-7 text-[--color-accent] mb-4 group-hover:scale-110" style={{ transition: "transform 0.6s ease" }} />
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-bold">{card.title}</h3>
                  {card.locked && (
                    <span className="text-[9px] uppercase tracking-widest text-[--color-text-dim] border border-[--color-border-strong] px-1.5 py-0.5">
                      Вхід
                    </span>
                  )}
                </div>
                <p className="text-sm text-[--color-text-muted] leading-relaxed flex-1">
                  {card.desc}
                </p>
                <div className="mt-5 inline-flex items-center gap-1 text-xs uppercase tracking-widest text-[--color-accent] group-hover:gap-2">
                  Перейти
                  <ChevronRight className="h-3 w-3" />
                </div>
              </Link>
            </Motion>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        <Motion variant="scale-in">
          <div className="relative border border-[--color-accent-dim] bg-[--color-bg-panel] overflow-hidden">
            <div className="absolute inset-0 stripes opacity-60" />
            <div className="relative p-8 sm:p-12 lg:p-16 grid md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2">
                <div className="inline-flex items-center gap-2 text-[--color-accent] mb-3">
                  <Award className="h-5 w-5" />
                  <span className="text-xs uppercase tracking-[0.25em]">
                    Обов'язок · Честь · Відвага
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                  Готові приєднатися до лав майбутніх офіцерів запасу?
                </h2>
                <p className="mt-3 text-[--color-text-muted] max-w-2xl">
                  Ознайомтеся з умовами вступу, спеціальностями та вимогами до
                  кандидатів. Станьте частиною військової еліти України.
                </p>
              </div>
              <div className="md:text-right">
                <Link
                  href="/applicants"
                  className="inline-flex items-center gap-2 bg-[--color-accent] px-6 py-3 text-sm uppercase tracking-widest font-semibold text-[--color-bg] hover:bg-[--color-accent-hover] hover:gap-3"
                >
                  Умови вступу
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </Motion>
      </section>
    </>
  );
}
