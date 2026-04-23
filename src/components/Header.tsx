"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, LogIn, LogOut, UserCog } from "lucide-react";
import Image from "next/image";
import { signOut } from "@/app/(auth)/actions";

type NavItem = { href: string; label: string; protected?: "student" | "teacher" };

const NAV: NavItem[] = [
  { href: "/about", label: "Про кафедру" },
  { href: "/applicants", label: "Вступнику" },
  { href: "/students", label: "Студенту", protected: "student" },
  { href: "/teachers", label: "Викладачам", protected: "teacher" },
];

export type HeaderUser = {
  email: string;
  fullName: string | null;
  role: "student" | "teacher" | "admin" | null;
  status: "pending" | "approved" | "rejected" | null;
} | null;

export default function Header({ user }: { user: HeaderUser }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isAdmin = user?.role === "admin" && user?.status === "approved";

  return (
    <header className="sticky top-0 z-40 border-b border-[--color-border] bg-[--color-bg]/90 backdrop-blur supports-[backdrop-filter]:bg-[--color-bg]/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Brand */}
          <Link href="/" className="group flex items-center gap-3 shrink-0">
            <Image
              src="/logo.svg"
              alt="Логотип кафедри"
              width={44}
              height={44}
              className="h-11 w-11 object-contain"
              priority
            />
            <div className="leading-tight">
              <div className="text-[10px] sm:text-[11px] tracking-[0.25em] text-[--color-accent] uppercase">
                Кафедра ВП
              </div>
              <div className="text-sm sm:text-base font-bold text-[--color-text]">
                ЖВІ ім. С.П. Корольова
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-4 py-2 text-sm uppercase tracking-wider transition-colors ${
                    active
                      ? "text-[--color-accent]"
                      : "text-[--color-text-muted] hover:text-[--color-text]"
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute inset-x-3 -bottom-[17px] h-[2px] bg-[--color-accent]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Auth */}
          <div className="hidden lg:flex items-center gap-2">
            {user ? (
              <>
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="inline-flex items-center gap-2 border border-[--color-border-strong] px-3 py-2 text-xs uppercase tracking-wider hover:border-[--color-accent] hover:text-[--color-accent]"
                    title="Адмін-панель"
                  >
                    <UserCog className="h-4 w-4" />
                    Адмін
                  </Link>
                )}
                <div className="text-xs text-[--color-text-muted] hidden xl:block max-w-[180px] truncate">
                  {user.fullName || user.email}
                </div>
                <form action={signOut}>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 border border-[--color-border-strong] px-4 py-2 text-sm uppercase tracking-wider hover:border-[--color-danger] hover:text-[--color-danger]"
                  >
                    <LogOut className="h-4 w-4" />
                    Вийти
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 border border-[--color-border-strong] px-4 py-2 text-sm uppercase tracking-wider text-[--color-text] hover:border-[--color-accent] hover:text-[--color-accent] transition-colors"
                >
                  <LogIn className="h-4 w-4" />
                  Вхід
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 bg-[--color-accent] px-4 py-2 text-sm uppercase tracking-wider font-semibold text-[--color-bg] hover:bg-[--color-accent-hover] transition-colors"
                >
                  Реєстрація
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden inline-flex items-center justify-center h-10 w-10 border border-[--color-border-strong] text-[--color-text] hover:border-[--color-accent] hover:text-[--color-accent]"
            aria-label="Меню"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden pb-4 border-t border-[--color-border] pt-4 flex flex-col gap-1">
            {NAV.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`px-3 py-3 text-sm uppercase tracking-wider border-l-2 ${
                    active
                      ? "border-[--color-accent] text-[--color-accent] bg-[--color-bg-panel]"
                      : "border-transparent text-[--color-text-muted] hover:text-[--color-text]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            {user ? (
              <div className="pt-3 space-y-2">
                <div className="text-xs text-[--color-text-muted] px-3 truncate">
                  {user.fullName || user.email}
                </div>
                {isAdmin && (
                  <Link
                    href="/admin"
                    onClick={() => setOpen(false)}
                    className="block text-center border border-[--color-border-strong] px-4 py-2 text-sm uppercase tracking-wider"
                  >
                    Адмін-панель
                  </Link>
                )}
                <form action={signOut}>
                  <button
                    type="submit"
                    className="w-full border border-[--color-border-strong] px-4 py-2 text-sm uppercase tracking-wider hover:text-[--color-danger]"
                  >
                    Вийти
                  </button>
                </form>
              </div>
            ) : (
              <div className="flex gap-2 pt-3">
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="flex-1 text-center border border-[--color-border-strong] px-4 py-2 text-sm uppercase tracking-wider"
                >
                  Вхід
                </Link>
                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className="flex-1 text-center bg-[--color-accent] text-[--color-bg] px-4 py-2 text-sm uppercase tracking-wider font-semibold"
                >
                  Реєстрація
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
