import { BookOpen, FileText, Calendar, Users, ClipboardList, Library } from "lucide-react";
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
              className="group border border-[--color-border] bg-[--color-bg-panel] p-6 hover:border-[--color-accent] transition-colors"
            >
              <s.icon className="h-7 w-7 text-[--color-accent] mb-4" />
              <h3 className="text-lg font-bold mb-2">{s.title}</h3>
              <p className="text-sm text-[--color-text-muted]">{s.desc}</p>
              <div className="mt-4 text-xs uppercase tracking-widest text-[--color-accent] group-hover:underline">
                Відкрити →
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
