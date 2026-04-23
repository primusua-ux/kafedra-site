"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useTransition } from "react";
import { Search, X } from "lucide-react";

export default function FilterBar() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [, startTransition] = useTransition();

  const set = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(params.toString());
      if (value) {
        next.set(key, value);
      } else {
        next.delete(key);
      }
      next.delete("_"); // скидаємо пагінацію якщо є
      startTransition(() => {
        router.replace(`${pathname}?${next.toString()}`, { scroll: false });
      });
    },
    [params, pathname, router],
  );

  const clear = useCallback(() => {
    startTransition(() => {
      router.replace(pathname, { scroll: false });
    });
  }, [pathname, router]);

  const hasFilters =
    params.has("q") ||
    params.has("role") ||
    params.has("status") ||
    params.has("platoon");

  return (
    <div className="border border-[--color-border] bg-[--color-bg-panel] p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="section-title text-xs text-[--color-accent]">Пошук і фільтрація</div>
        {hasFilters && (
          <button
            onClick={clear}
            className="inline-flex items-center gap-1 text-xs text-[--color-text-muted] hover:text-[--color-danger]"
          >
            <X className="h-3 w-3" /> Скинути фільтри
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Пошук по імені / email */}
        <div className="relative sm:col-span-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[--color-text-muted]" />
          <input
            type="text"
            placeholder="Пошук за П.І.Б. або email…"
            defaultValue={params.get("q") ?? ""}
            onChange={(e) => set("q", e.target.value)}
            className="w-full bg-[--color-bg] border border-[--color-border-strong] pl-9 pr-3 py-2 text-sm text-[--color-text] outline-none focus:border-[--color-accent] placeholder:text-[--color-text-dim]"
          />
        </div>

        {/* Взвод */}
        <div className="relative">
          <input
            type="text"
            placeholder="Взвод…"
            defaultValue={params.get("platoon") ?? ""}
            onChange={(e) => set("platoon", e.target.value)}
            className="w-full bg-[--color-bg] border border-[--color-border-strong] px-3 py-2 text-sm text-[--color-text] outline-none focus:border-[--color-accent] placeholder:text-[--color-text-dim]"
          />
        </div>

        {/* Роль */}
        <select
          defaultValue={params.get("role") ?? ""}
          onChange={(e) => set("role", e.target.value)}
          className="w-full bg-[--color-bg] border border-[--color-border-strong] px-3 py-2 text-sm text-[--color-text] outline-none focus:border-[--color-accent]"
        >
          <option value="">Усі ролі</option>
          <option value="student">Студент</option>
          <option value="teacher">Викладач</option>
          <option value="admin">Адмін</option>
        </select>

        {/* Статус */}
        <select
          defaultValue={params.get("status") ?? ""}
          onChange={(e) => set("status", e.target.value)}
          className="w-full bg-[--color-bg] border border-[--color-border-strong] px-3 py-2 text-sm text-[--color-text] outline-none focus:border-[--color-accent]"
        >
          <option value="">Усі статуси</option>
          <option value="pending">На модерації</option>
          <option value="approved">Активні</option>
          <option value="rejected">Відхилені</option>
        </select>
      </div>
    </div>
  );
}
