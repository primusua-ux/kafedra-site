import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import HeaderServer from "@/components/HeaderServer";
import Footer from "@/components/Footer";

const display = Rubik({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Кафедра військової підготовки — ЖВІ ім. С.П. Корольова",
    template: "%s — Кафедра військової підготовки ЖВІ",
  },
  description:
    "Кафедра військової підготовки за програмою підготовки офіцерів запасу Житомирського військового інституту імені С.П. Корольова. Вступ, навчання, методичні матеріали.",
  keywords: [
    "ЖВІ",
    "Житомирський військовий інститут",
    "Корольов",
    "кафедра військової підготовки",
    "офіцер запасу",
    "військова підготовка",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className={`${display.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <HeaderServer />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
