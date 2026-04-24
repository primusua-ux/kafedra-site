import { BookOpen, FileText, Calendar, Users, ClipboardList, Library, ChevronRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import Link from "next/link";

export const metadata = { title: "Студенту" };

const sections = [
  { icon: BookOpen, title: "Навчальні дисципліни", desc: "Повний перелік дисциплін з описом та кількістю годин.", href: "/students/disciplines" },
  { icon: ClipboardList, title: "Тематичні плани", desc: "Плани занять за модулями та темами.", href: "/students/plans" },
  { icon: FileText, title: "Методичні матеріали", desc: "Конспекти лекцій, методичні вказівки, роздаткові матеріали.", href: "/students/materials" },
  { icon: Library, title: "Навчальна література", desc: "Підручники, посібники, нормативні документи.", href: "/students/library" },
  { icon: Calendar, title: "Розклад занять", desc: "Поточний розклад та календарний план.", href: "/students/schedule" },
  { icon: Users, title: "Науково-педагогічні працівники", desc: "Склад кафедри, контакти, дисципліни.", href: "/students/staff" },
];

export default function StudentsPage() {
  return (
    <>
      <PageHero
        eyebrow="Розділ 03 · Закритий"
        title="Студенту"
        description="Матеріали, дисципліни, розклади та відомості про НПП кафедри. Доступ за авторизацією."
        icon={<BookOpen className="h-6 w-6" />}
      />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((s) => (
            <Link
              key={s.title}
              href={s.href}
              className="group relative flex flex-col border border-[--color-border] bg-[--color-bg-panel] p-6 hover:border-[--color-accent] hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(201,162,74,0.08)]"
            >
              <div className="absolute top-0 right-0 h-[2px] w-10 bg-[--color-accent] group-hover:w-full" style={{ transition: "width 0.8s cubic-bezier(0.22,1,0.36,1)" }} />
              <s.icon className="h-7 w-7 text-[--color-accent] mb-4 group-hover:scale-110" style={{ transition: "transform 0.6s ease" }} />
              <h3 className="text-lg font-bold mb-2">{s.title}</h3>
              <p className="text-sm text-[--color-text-muted] flex-1">{s.desc}</p>
              <div className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[--color-accent] group-hover:gap-3">
                Відкрити
                <ChevronRight className="h-3 w-3" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 border border-[--color-border] bg-[--color-bg-panel] p-6 text-sm text-[--color-text-muted]">
          Розділи будуть наповнюватися поетапно. Якщо вам потрібен доступ до
          конкретних матеріалів — зверніться до куратора групи або викладача
          дисципліни.
        </div>
      </section>
    </>
  );
}
