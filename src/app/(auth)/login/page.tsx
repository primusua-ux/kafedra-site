import Link from "next/link";
import { LogIn, Shield } from "lucide-react";
import LoginForm from "./LoginForm";

export const metadata = { title: "Вхід" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const { redirect } = await searchParams;

  return (
    <div className="border border-[--color-border] bg-[--color-bg-panel] p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center border border-[--color-accent] corner-cut">
          <Shield className="h-5 w-5 text-[--color-accent]" />
        </div>
        <div>
          <div className="section-title text-xs text-[--color-accent]">Автентифікація</div>
          <h1 className="text-2xl font-bold">Вхід до системи</h1>
        </div>
      </div>

      <LoginForm redirectTo={redirect ?? "/"} />

      <div className="mt-6 pt-6 border-t border-[--color-border] text-sm text-[--color-text-muted]">
        Ще не маєте облікового запису?{" "}
        <Link href="/register" className="text-[--color-accent] hover:underline inline-flex items-center gap-1">
          Зареєструватись
          <LogIn className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}
