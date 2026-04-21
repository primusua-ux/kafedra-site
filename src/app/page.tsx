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

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-[--color-border]">
        <div className="absolute inset-0 grid-pattern opacity-60" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[--color-accent] to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 border border-[--color-accent-dim] bg-[--color-bg-panel]/60 px-3 py-1.5 text-xs uppercase tracking-[0.25em] text-[--color-accent] mb-8">
              <span className="h-1.5 w-1.5 bg-[--color-accent] rounded-full" />
              Програма підготовки офіцерів запасу
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight">
              Кафедра{" "}
              <span className="text-[--color-accent]">військової підготовки</span>
              <br />
              Житомирського військового інституту
            </h1>
            <p className="mt-6 text-lg text-[--color-text-muted] max-w-2xl">
              Готуємо офіцерів запасу Збройних Сил України — з міцною
              теоретичною базою, практичними навичками та відданістю обов’язку.
              Освіта, що формує характер.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/applicants"
                className="inline-flex items-center gap-2 bg-[--color-accent] px-6 py-3 text-sm uppercase tracking-widest font-semibold text-[--color-bg] hover:bg-[--color-accent-hover] transition-colors"
              >
                Стати курсантом
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 border border-[--color-border-strong] px-6 py-3 text-sm uppercase tracking-widest text-[--color-text] hover:border-[--color-accent] hover:text-[--color-accent] transition-colors"
              >
                Про кафедру
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-[--color-border]">
            {[
              { value: "30+", label: "Років досвіду" },
              { value: "1200+", label: "Випускників" },
              { value: "24", label: "Навчальні дисципліни" },
              { value: "100%", label: "Практична підготовка" },
            ].map((s) => (
              <div key={s.label} className="bg-[--color-bg-panel] px-6 py-8">
                <div className="text-3xl sm:text-4xl font-extrabold text-[--color-accent]">
                  {s.value}
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
        <div className="flex items-end justify-between gap-6 mb-10">
          <div>
            <div className="section-title text-xs text-[--color-accent] mb-3">
              Розділи
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold">Навігація сайтом</h2>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              href: "/about",
              icon: Target,
              title: "Про кафедру",
              desc: "Призначення, цілі, мета навчання, історія та досягнуті результати кафедри.",
            },
            {
              href: "/applicants",
              icon: GraduationCap,
              title: "Вступнику",
              desc: "Спеціальності, умови вступу, вступні випробування, терміни та перелік документів.",
            },
            {
              href: "/students",
              icon: BookOpen,
              title: "Студенту",
              desc: "Дисципліни, тематичні плани, методичні матеріали, література, розклад занять.",
              locked: true,
            },
            {
              href: "/teachers",
              icon: Users,
              title: "Викладачам",
              desc: "Завантаження методичних матеріалів, календар подій, повний розклад.",
              locked: true,
            },
          ].map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group relative border border-[--color-border] bg-[--color-bg-panel] p-6 hover:border-[--color-accent] transition-colors"
            >
              <div className="absolute top-0 right-0 h-[2px] w-10 bg-[--color-accent] group-hover:w-full transition-all duration-300" />
              <card.icon className="h-7 w-7 text-[--color-accent] mb-4" />
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-bold">{card.title}</h3>
                {card.locked && (
                  <span className="text-[9px] uppercase tracking-widest text-[--color-text-dim] border border-[--color-border-strong] px-1.5 py-0.5">
                    Вхід
                  </span>
                )}
              </div>
              <p className="text-sm text-[--color-text-muted] leading-relaxed">
                {card.desc}
              </p>
              <div className="mt-5 inline-flex items-center gap-1 text-xs uppercase tracking-widest text-[--color-accent]">
                Перейти
                <ChevronRight className="h-3 w-3" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        <div className="relative border border-[--color-accent-dim] bg-[--color-bg-panel] overflow-hidden">
          <div className="absolute inset-0 stripes opacity-60" />
          <div className="relative p-8 sm:p-12 lg:p-16 grid md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <div className="inline-flex items-center gap-2 text-[--color-accent] mb-3">
                <Award className="h-5 w-5" />
                <span className="text-xs uppercase tracking-[0.25em]">
                  Обов’язок · Честь · Відвага
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
                className="inline-flex items-center gap-2 bg-[--color-accent] px-6 py-3 text-sm uppercase tracking-widest font-semibold text-[--color-bg] hover:bg-[--color-accent-hover] transition-colors"
              >
                Умови вступу
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
