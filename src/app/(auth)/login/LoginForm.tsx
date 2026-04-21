"use client";

import { useActionState } from "react";
import { login, type AuthState } from "../actions";

export default function LoginForm({ redirectTo }: { redirectTo: string }) {
  const [state, action, pending] = useActionState<AuthState, FormData>(
    login,
    undefined,
  );

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="redirect" value={redirectTo} />
      <Field label="E-mail" name="email" type="email" required autoFocus />
      <Field label="Пароль" name="password" type="password" required />

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
