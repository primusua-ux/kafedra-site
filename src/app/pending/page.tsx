import { Clock, LogOut } from "lucide-react";
import Link from "next/link";
import { signOut } from "@/app/(auth)/actions";

export const metadata = { title: "Очікування підтвердження" };

export default function PendingPage() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-24">
      <div className="border border-[--color-border] bg-[--color-bg-panel] p-10 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center border border-[--color-accent] corner-cut mb-6">
          <Clock className="h-7 w-7 text-[--color-accent]" />
        </div>
        <div className="section-title text-xs text-[--color-accent] mb-3">
          На модерації
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">
          Обліковий запис очікує підтвердження
        </h1>
        <p className="text-[--color-text-muted] mb-8 max-w-md mx-auto">
          Адміністратор кафедри перевірить ваші дані та призначить відповідну
          роль. Після підтвердження ви отримаєте доступ до закритих розділів
          сайту.
        </p>
        <div className="flex justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 border border-[--color-border-strong] px-5 py-2.5 text-sm uppercase tracking-widest hover:border-[--color-accent] hover:text-[--color-accent]"
          >
            На головну
          </Link>
          <form action={signOut}>
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-[--color-bg-elevated] border border-[--color-border-strong] px-5 py-2.5 text-sm uppercase tracking-widest hover:text-[--color-danger]"
            >
              <LogOut className="h-4 w-4" /> Вийти
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
