import {
  GraduationCap,
  FileCheck,
  Calendar,
  ClipboardList,
  UserCheck,
  HeartPulse,
  Dumbbell,
  Scale,
} from "lucide-react";
import PageHero from "@/components/PageHero";

export const metadata = {
  title: "Вступнику",
  description:
    "Умови вступу, спеціальності, вступні випробування, терміни та перелік документів для зарахування на кафедру військової підготовки ЖВІ.",
};

export default function ApplicantsPage() {
  return (
    <>
      <PageHero
        eyebrow="Розділ 02"
        title="Вступнику"
        description="Все, що потрібно знати для вступу на програму підготовки офіцерів запасу: вимоги до кандидатів, спеціальності, документи, графік та випробування."
        icon={<GraduationCap className="h-6 w-6" />}
      />

      {/* Хто може вступити */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="section-title text-xs text-[--color-accent] mb-3">
              Критерії відбору
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold">Хто може вступити</h2>
            <p className="mt-4 text-[--color-text-muted]">
              На програму підготовки офіцерів запасу зараховуються здобувачі
              вищої освіти, які відповідають встановленим вимогам.
            </p>
          </div>
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
            {[
              { icon: UserCheck, title: "Громадянство", desc: "Громадянин України." },
              { icon: GraduationCap, title: "Освіта", desc: "Студент ЗВО II–IV курсів денної форми навчання." },
              { icon: HeartPulse, title: "Стан здоров’я", desc: "Придатний до військової служби за висновком ВЛК." },
              { icon: Dumbbell, title: "Фізична підготовка", desc: "Відповідність нормативам ФП." },
              { icon: Scale, title: "Репутація", desc: "Відсутність судимості та обмежень за законодавством." },
              { icon: FileCheck, title: "Документи", desc: "Повний пакет документів, поданий у визначені терміни." },
            ].map((c) => (
              <div key={c.title} className="border border-[--color-border] bg-[--color-bg-panel] p-5">
                <c.icon className="h-6 w-6 text-[--color-accent] mb-3" />
                <h3 className="font-bold mb-1">{c.title}</h3>
                <p className="text-sm text-[--color-text-muted]">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Спеціальності */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="border border-[--color-border] bg-[--color-bg-panel]">
          <div className="p-8 border-b border-[--color-border]">
            <div className="section-title text-xs text-[--color-accent] mb-2">
              Спеціальності
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold">Військово-облікові спеціальності (ВОС)</h2>
            <p className="mt-3 text-[--color-text-muted]">
              Перелік ВОС, за якими здійснюється підготовка на кафедрі. Остаточний
              перелік уточнюється щороку.
            </p>
          </div>
          <div className="divide-y divide-[--color-border]">
            {[
              { code: "— — —", name: "Назва ВОС № 1", seats: "— місць" },
              { code: "— — —", name: "Назва ВОС № 2", seats: "— місць" },
              { code: "— — —", name: "Назва ВОС № 3", seats: "— місць" },
            ].map((v) => (
              <div
                key={v.name}
                className="p-6 flex flex-col sm:flex-row sm:items-center gap-4 hover:bg-[--color-bg-elevated] transition-colors"
              >
                <div className="text-[--color-accent] font-mono text-sm tracking-wider shrink-0 w-28">
                  {v.code}
                </div>
                <div className="flex-1 font-semibold">{v.name}</div>
                <div className="text-xs uppercase tracking-widest text-[--color-text-muted]">
                  {v.seats}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Документи + терміни */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 grid lg:grid-cols-2 gap-6">
        <div className="border border-[--color-border] bg-[--color-bg-panel] p-8">
          <ClipboardList className="h-7 w-7 text-[--color-accent] mb-4" />
          <h3 className="text-xl font-bold mb-4">Перелік документів</h3>
          <ol className="space-y-3 text-sm text-[--color-text-muted]">
            {[
              "Заява про зарахування на навчання",
              "Копія паспорта громадянина України",
              "Копія ідентифікаційного коду",
              "Довідка з ЗВО про навчання",
              "Медична довідка встановленого зразка",
              "Фотокартки 3×4 — 4 шт.",
              "Автобіографія",
              "Інші документи за запитом",
            ].map((doc, i) => (
              <li key={doc} className="flex gap-3">
                <span className="text-[--color-accent] font-mono">{String(i + 1).padStart(2, "0")}</span>
                <span>{doc}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="border border-[--color-border] bg-[--color-bg-panel] p-8">
          <Calendar className="h-7 w-7 text-[--color-accent] mb-4" />
          <h3 className="text-xl font-bold mb-4">Терміни та етапи</h3>
          <ol className="space-y-4 text-sm">
            {[
              { date: "Квітень — Травень", event: "Подача документів" },
              { date: "Травень — Червень", event: "Медичний огляд (ВЛК)" },
              { date: "Червень", event: "Перевірка фізичної підготовки" },
              { date: "Червень — Липень", event: "Вступні випробування" },
              { date: "Серпень", event: "Зарахування та оголошення наказу" },
              { date: "Вересень", event: "Початок навчання" },
            ].map((s) => (
              <li key={s.event} className="flex gap-4 pb-3 border-b border-[--color-border] last:border-0">
                <div className="w-32 shrink-0 text-[--color-accent] uppercase tracking-widest text-[11px]">
                  {s.date}
                </div>
                <div className="text-[--color-text]">{s.event}</div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
