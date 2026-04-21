import { Upload, Calendar, Clock, FolderOpen, Users, BookOpenCheck } from "lucide-react";
import PageHero from "@/components/PageHero";
import Link from "next/link";

export const metadata = { title: "Викладачам" };

const sections = [
  { icon: Upload, title: "Завантажити матеріали", desc: "Завантаження методичних матеріалів і літератури.", href: "/teachers/upload" },
  { icon: FolderOpen, title: "Мої матеріали", desc: "Керування вашими завантаженими файлами.", href: "/teachers/materials" },
  { icon: Calendar, title: "Календар подій", desc: "Навчальний графік, сесії, стажування.", href: "/teachers/calendar" },
  { icon: Clock, title: "Повний розклад", desc: "Детальний розклад занять кафедри.", href: "/teachers/schedule" },
  { icon: BookOpenCheck, title: "Тематичні плани", desc: "Редагування планів за дисциплінами.", href: "/teachers/plans" },
  { icon: Users, title: "Студенти", desc: "Списки груп, відомості про студентів.", href: "/teachers/groups" },
];

export default function TeachersPage() {
  return (
    <>
      <PageHero
        eyebrow="Розділ 04 · Викладацький"
        title="Викладачам"
        description="Інструменти для НПП кафедри: завантаження матеріалів, керування розкладом, календар подій."
        icon={<Upload className="h-6 w-6" />}
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
      </section>
    </>
  );
}
