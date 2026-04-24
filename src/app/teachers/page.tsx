import { Upload, Calendar, Clock, FolderOpen, Users, BookOpenCheck, ChevronRight } from "lucide-react";
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
      </section>
    </>
  );
}
