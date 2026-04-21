"use client";

import { useActionState } from "react";
import { register, type AuthState } from "../actions";

export default function RegisterForm() {
  const [state, action, pending] = useActionState<AuthState, FormData>(
    register,
    undefined,
  );

  if (state?.ok) {
    return (
      <div className="border border-[--color-accent-dim] bg-[--color-bg]/60 p-6 text-sm">
        <div className="section-title text-xs text-[--color-accent] mb-2">
          Заявку прийнято
        </div>
        <p className="text-[--color-text]">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-4">
      <Field label="П.І.Б." name="full_name" required autoFocus />
      <Field label="E-mail" name="email" type="email" required />
      <Field label="Пароль (мін. 8 символів)" name="password" type="password" required minLength={8} />

      <label className="block">
        <div className="text-[11px] uppercase tracking-widest text-[--color-text-muted] mb-1.5">
          Роль
        </div>
        <select
          name="role"
          defaultValue="student"
          className="w-full bg-[--color-bg] border border-[--color-border-strong] px-3 py-2.5 text-[--color-text] outline-none focus:border-[--color-accent]"
        >
          <option value="student">Студент</option>
          <option value="teacher">Викладач (НПП)</option>
        </select>
        <p className="text-xs text-[--color-text-dim] mt-1.5">
          Роль підтверджується адміністратором після перевірки.
        </p>
      </label>

      {state && !state.ok && (
        <div className="border border-[--color-danger] bg-[--color-danger]/10 text-sm px-3 py-2">
          {state.error}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full bg-[--color-accent] text-[--color-bg] py-3 text-sm uppercase tracking-widest font-semibold hover:bg-[--color-accent-hover] disabled:opacity-60"
      >
        {pending ? "Надсилання…" : "Зареєструватись"}
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
