"use client";

import { useActionState, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { login, type AuthState } from "../actions";

export default function LoginForm({ redirectTo }: { redirectTo: string }) {
  const [state, action, pending] = useActionState<AuthState, FormData>(
    login,
    undefined,
  );
  const [showPass, setShowPass] = useState(false);

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="redirect" value={redirectTo} />

      <Field label="E-mail" name="email" type="email" required autoFocus />

      <PasswordField
        label="Пароль"
        name="password"
        show={showPass}
        onToggle={() => setShowPass((v) => !v)}
        required
      />

      {state && !state.ok && (
        <div className="border border-[--color-danger] bg-[--color-danger]/10 text-sm px-3 py-2 text-[--color-text]">
          {state.error}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full bg-[--color-accent] text-[--color-bg] py-3 text-sm uppercase tracking-widest font-semibold hover:bg-[--color-accent-hover] disabled:opacity-60"
      >
        {pending ? "Вхід…" : "Увійти"}
      </button>
    </form>
  );
}

function Field({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <div className="text-[11px] uppercase tracking-widest text-[--color-text-muted] mb-1.5">
        {label}
      </div>
      <input
        {...props}
        className="w-full bg-[--color-bg] border border-[--color-border-strong] px-3 py-2.5 text-[--color-text] outline-none focus:border-[--color-accent] placeholder:text-[--color-text-dim]"
      />
    </label>
  );
}

function PasswordField({
  label,
  show,
  onToggle,
  ...props
}: {
  label: string;
  show: boolean;
  onToggle: () => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">) {
  return (
    <label className="block">
      <div className="text-[11px] uppercase tracking-widest text-[--color-text-muted] mb-1.5">
        {label}
      </div>
      <div className="relative">
        <input
          {...props}
          type={show ? "text" : "password"}
          className="w-full bg-[--color-bg] border border-[--color-border-strong] px-3 py-2.5 pr-10 text-[--color-text] outline-none focus:border-[--color-accent] placeholder:text-[--color-text-dim]"
        />
        <button
          type="button"
          onClick={onToggle}
          tabIndex={-1}
          className="absolute inset-y-0 right-0 flex items-center px-3 text-[--color-text-muted] hover:text-[--color-accent]"
          aria-label={show ? "Приховати пароль" : "Показати пароль"}
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </label>
  );
}
