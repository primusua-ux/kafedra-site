"use client";

import { useActionState, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { updateProfile, changePassword, type SettingsState } from "./actions";
import type { Profile } from "@/lib/supabase/getProfile";

export default function SettingsForm({
  profile,
  email,
}: {
  profile: Profile;
  email: string;
}) {
  return (
    <div className="space-y-10">
      <ProfileSection profile={profile} />
      <PasswordSection email={email} />
    </div>
  );
}

/* ── Редагування профілю ── */
function ProfileSection({ profile }: { profile: Profile }) {
  const [state, action, pending] = useActionState<SettingsState, FormData>(
    updateProfile,
    undefined,
  );

  return (
    <section className="border border-[--color-border] bg-[--color-bg-panel] p-6 space-y-4">
      <div className="section-title text-xs text-[--color-accent] mb-4">
        Особисті дані
      </div>

      <form action={action} className="space-y-4">
        <Field
          label="П.І.Б."
          name="full_name"
          defaultValue={profile.full_name ?? ""}
          required
          placeholder="Прізвище Ім'я По батькові"
        />

        {profile.role === "student" && (
          <Field
            label="Навчальний взвод"
            name="platoon"
            defaultValue={profile.platoon ?? ""}
            placeholder="Наприклад: 201, В-3…"
            maxLength={20}
          />
        )}

        <div>
          <div className="text-[11px] uppercase tracking-widest text-[--color-text-muted] mb-1.5">
            Електронна пошта
          </div>
          <div className="w-full bg-[--color-bg] border border-[--color-border] px-3 py-2.5 text-[--color-text-muted] text-sm select-none">
            {profile.email}
            <span className="ml-2 text-xs text-[--color-text-dim]">(не змінюється)</span>
          </div>
        </div>

        {state && (
          <div
            className={`text-sm px-3 py-2 border ${
              state.ok
                ? "border-[--color-accent-dim] text-[--color-accent]"
                : "border-[--color-danger] bg-[--color-danger]/10"
            }`}
          >
            {state.ok ? state.message : state.error}
          </div>
        )}

        <button
          type="submit"
          disabled={pending}
          className="px-6 py-2.5 bg-[--color-accent] text-[--color-bg] text-sm uppercase tracking-widest font-semibold hover:bg-[--color-accent-hover] disabled:opacity-60"
        >
          {pending ? "Збереження…" : "Зберегти"}
        </button>
      </form>
    </section>
  );
}

/* ── Зміна пароля ── */
function PasswordSection({ email: _ }: { email: string }) {
  const [state, action, pending] = useActionState<SettingsState, FormData>(
    changePassword,
    undefined,
  );
  const [show, setShow] = useState({ cur: false, next: false, confirm: false });

  return (
    <section className="border border-[--color-border] bg-[--color-bg-panel] p-6 space-y-4">
      <div className="section-title text-xs text-[--color-accent] mb-4">
        Зміна пароля
      </div>

      <form action={action} className="space-y-4">
        <PasswordField
          label="Поточний пароль"
          name="current_password"
          show={show.cur}
          onToggle={() => setShow((s) => ({ ...s, cur: !s.cur }))}
          required
        />
        <PasswordField
          label="Новий пароль (мін. 8 символів)"
          name="new_password"
          show={show.next}
          onToggle={() => setShow((s) => ({ ...s, next: !s.next }))}
          required
          minLength={8}
        />
        <PasswordField
          label="Повторіть новий пароль"
          name="confirm_password"
          show={show.confirm}
          onToggle={() => setShow((s) => ({ ...s, confirm: !s.confirm }))}
          required
          minLength={8}
        />

        <p className="text-xs text-[--color-text-dim]">
          Лише латинські літери (a–z, A–Z), цифри та спецсимволи.
        </p>

        {state && (
          <div
            className={`text-sm px-3 py-2 border ${
              state.ok
                ? "border-[--color-accent-dim] text-[--color-accent]"
                : "border-[--color-danger] bg-[--color-danger]/10"
            }`}
          >
            {state.ok ? state.message : state.error}
          </div>
        )}

        <button
          type="submit"
          disabled={pending}
          className="px-6 py-2.5 bg-[--color-bg-elevated] border border-[--color-border-strong] text-sm uppercase tracking-widest hover:border-[--color-accent] disabled:opacity-60"
        >
          {pending ? "Збереження…" : "Змінити пароль"}
        </button>
      </form>
    </section>
  );
}

/* ── Shared components ── */

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
          className="w-full bg-[--color-bg] border border-[--color-border-strong] px-3 py-2.5 pr-10 text-[--color-text] outline-none focus:border-[--color-accent]"
        />
        <button
          type="button"
          onClick={onToggle}
          tabIndex={-1}
          className="absolute inset-y-0 right-0 flex items-center px-3 text-[--color-text-muted] hover:text-[--color-accent]"
          aria-label={show ? "Приховати" : "Показати"}
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </label>
  );
}
