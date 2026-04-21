import Link from "next/link";
import { Shield } from "lucide-react";
import RegisterForm from "./RegisterForm";

export const metadata = { title: "Реєстрація" };

export default function RegisterPage() {
  return (
    <div className="border border-[--color-border] bg-[--color-bg-panel] p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center border border-[--color-accent] corner-cut">
          <Shield className="h-5 w-5 text-[--color-accent]" />
        </div>
        <div>
          <div className="section-title text-xs text-[--color-accent]">Новий користувач</div>
          <h1 className="text-2xl font-bold">Реєстрація</h1>
        </div>
      </div>

      <RegisterForm />

      <div className="mt-6 pt-6 border-t border-[--color-border] text-sm text-[--color-text-muted]">
        Вже зареєстровані?{" "}
        <Link href="/login" className="text-[--color-accent] hover:underline">
          Увійти
        </Link>
      </div>
    </div>
  );
}
