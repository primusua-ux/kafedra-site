import Link from "next/link";
import Image from "next/image";
import { MapPin, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[--color-border] bg-[--color-bg-panel] mt-24">
      <div className="stripes h-1 w-full" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/logo.svg"
                alt="Логотип кафедри"
                width={44}
                height={44}
                className="h-11 w-11 object-contain"
              />
              <div>
                <div className="text-[11px] tracking-[0.25em] text-[--color-accent] uppercase">
                  Кафедра ВП
                </div>
                <div className="font-bold">ЖВІ ім. С.П. Корольова</div>
              </div>
            </div>
            <p className="text-sm text-[--color-text-muted] max-w-md">
              Кафедра військової підготовки за програмою підготовки офіцерів
              запасу Житомирського військового інституту імені С.П. Корольова.
            </p>
          </div>

          <div>
            <div className="section-title text-xs text-[--color-accent] mb-4">
              Навігація
            </div>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-[--color-text-muted] hover:text-[--color-accent]">Про кафедру</Link></li>
              <li><Link href="/applicants" className="text-[--color-text-muted] hover:text-[--color-accent]">Вступнику</Link></li>
              <li><Link href="/students" className="text-[--color-text-muted] hover:text-[--color-accent]">Студенту</Link></li>
              <li><Link href="/teachers" className="text-[--color-text-muted] hover:text-[--color-accent]">Викладачам</Link></li>
            </ul>
          </div>

          <div>
            <div className="section-title text-xs text-[--color-accent] mb-4">
              Контакти
            </div>
            <ul className="space-y-3 text-sm text-[--color-text-muted]">
              <li className="flex gap-2">
                <MapPin className="h-4 w-4 text-[--color-accent] shrink-0 mt-0.5" />
                <span>м. Житомир, проспект Миру, 22</span>
              </li>
              <li className="flex gap-2">
                <Phone className="h-4 w-4 text-[--color-accent] shrink-0 mt-0.5" />
                <span>
                  +38 (067) 280 79 40
                  <span className="block text-xs text-[--color-text-dim]">також WhatsApp</span>
                </span>
              </li>
              <li className="flex gap-2">
                <Mail className="h-4 w-4 text-[--color-accent] shrink-0 mt-0.5" />
                <span>---</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[--color-border] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[--color-text-dim]">
          <div>© {new Date().getFullYear()} Кафедра військової підготовки ЖВІ. Усі права захищені.</div>
          <div className="uppercase tracking-widest">Житомир · Україна</div>
        </div>
      </div>
    </footer>
  );
}
