import { Target, Crosshair, Flag, Award, Users, Compass } from "lucide-react";
import PageHero from "@/components/PageHero";

export const metadata = {
  title: "Про кафедру",
  description:
    "Призначення, цілі, мета навчання та досягнуті результати кафедри військової підготовки ЖВІ ім. С.П. Корольова.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Розділ 01"
        title="Про кафедру"
        description="Кафедра військової підготовки за програмою підготовки офіцерів запасу Житомирського військового інституту імені С. П. Корольова — структурний підрозділ, що здійснює підготовку офіцерів запасу для Збройних Сил та інших силових відомств України."
        icon={<Target className="h-6 w-6" />}
      />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Mission */}
          <div className="lg:col-span-2 space-y-8">
            <article>
              <div className="section-title text-xs text-[--color-accent] mb-3">
                Призначення
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Формування офіцерського корпусу запасу
              </h2>
              <p className="text-[--color-text-muted] leading-relaxed">
                Кафедра здійснює військову підготовку студентів закладів вищої
                освіти та громадян, які мають вищу освіту не нижче рівня
                «бакалавр», за програмою підготовки офіцерів запасу відповідно
                до Порядку, затвердженого Кабінетом Міністрів України. Навчання
                спрямоване на здобуття військово-облікових спеціальностей,
                необхідних для виконання обов’язків за офіцерськими посадами
                в інтересах оборони держави.
              </p>
            </article>

            <article>
              <div className="section-title text-xs text-[--color-accent] mb-3">
                Мета навчання
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Підготовка компетентних військових фахівців
              </h2>
              <p className="text-[--color-text-muted] leading-relaxed">
                Головна мета — сформувати у здобувачів освіти комплекс знань,
                умінь і навичок, необхідних для ефективного виконання
                службових завдань на офіцерських посадах у будь-якій силовій
                структурі України.
              </p>
            </article>

            <article>
              <div className="section-title text-xs text-[--color-accent] mb-3">
                Принципи
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Flag, title: "Державність", desc: "Виховання патріотизму, відданості Україні та військовій присязі." },
                  { icon: Compass, title: "Системність", desc: "Поєднання фундаментальної, загальновійськової та фахової підготовки." },
                  { icon: Crosshair, title: "Практичність", desc: "Акцент на практичних заняттях, вихованні лідерських якостей та відповідальності." },
                  { icon: Award, title: "Якість", desc: "Відповідність стандартам НАТО та сучасному бойовому досвіду ЗСУ." },
                ].map((p) => (
                  <div key={p.title} className="border border-[--color-border] bg-[--color-bg-panel] p-5">
                    <p.icon className="h-6 w-6 text-[--color-accent] mb-3" />
                    <h3 className="font-bold mb-1">{p.title}</h3>
                    <p className="text-sm text-[--color-text-muted]">{p.desc}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="border border-[--color-border] bg-[--color-bg-panel] p-6">
              <div className="section-title text-xs text-[--color-accent] mb-4">
                Ключові показники
              </div>
              <dl className="space-y-4">
                {[
                  ["Рік заснування", "— — —"],
                  ["Кількість НПП", "— — —"],
                  ["Навчальних дисциплін", "24"],
                  ["Випускників", "1200+"],
                  ["Офіцерів у лавах ЗСУ", "— — —"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 pb-3 border-b border-[--color-border] last:border-0 last:pb-0">
                    <dt className="text-sm text-[--color-text-muted]">{k}</dt>
                    <dd className="text-sm font-semibold text-[--color-accent]">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="border border-[--color-accent-dim] bg-[--color-bg-panel] p-6 relative overflow-hidden">
              <div className="absolute inset-0 stripes opacity-40" />
              <div className="relative">
                <Users className="h-7 w-7 text-[--color-accent] mb-3" />
                <h3 className="font-bold mb-2">Науково-педагогічний склад</h3>
                <p className="text-sm text-[--color-text-muted]">
                  Досвідчені офіцери — ветерани бойових дій, викладачі з
                  військовими та науковими ступенями.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
