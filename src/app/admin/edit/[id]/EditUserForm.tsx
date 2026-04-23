"use client";

import { useActionState, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { adminUpdateUser, type EditState } from "./actions";
import type { Profile } from "@/lib/supabase/getProfile";

export default function EditUserForm({ profile }: { profile: Profile }) {
  const [state, action, pending] = useActionState<EditState, FormData>(
    adminUpdateUser,
    undefined,
  );
  const [showPass, setShowPass] = useState(false);

  return (
    <form action={action} className="space-y-5">
      <input type="hidden" name="id" value={profile.id} />

      {/* П.І.Б. */}
      <Field
        label="П.І.Б."
        name="full_name"
        defaultValue={profile.full_name ?? ""}
        required
        placeholder="Прізвище Ім'я По батькові"
      />

      {/* Email (тільки для перегляду) */}
      <div>
        <div className="text-[11px] uppercase tracking-widest text-[--color-text-muted] mb-1.5">
          Електронна пошта
        </div>
        <div className="w-full bg-[--color-bg] border border-[--color-border] px-3 py-2.5 text-[--color-text-muted] text-sm select-none">
          {profile.email}
        </div>
      </div>

      {/* Взвод */}
      <Field
        label="Навчальний взвод"
        name="platoon"
        defaultValue={profile.platoon ?? ""}
        placeholder="Наприклад: 201, В-3…"
        maxLength={20}
      />

      {/* Роль */}
      <label className="block">
        <div className="text-[11px] uppercase tracking-widest text-[--color-text-muted] mb-1.5">
          Роль
        </div>
        <select
          name="role"
          defaultValue={profile.role}
          className="w-full bg-[--color-bg] border border-[--color-border-strong] px-3 py-2.5 text-[--color-text] outline-none focus:border-[--color-accent]"
        >
          <option value="student">Студент</option>
          <option value="teacher">Викладач</option>
          <option value="admin">Адмін</option>
        </select>
      </label>

      {/* Статус */}
      <label className="block">
        <div className="text-[11px] uppercase tracking-widest text-[--color-text-muted] mb-1.5">
          Статус
        </div>
        <select
          name="status"
          defaultValue={profile.status}
          className="w-full bg-[--color-bg] border border-[--color-border-strong] px-3 py-2.5 text-[--color-text] outline-none focus:border-[--color-accent]"
        >
          <option value="pending">На модерації</option>
          <option value="approved">Активний</option>
          <option value="rejected">Відхилений</option>
        </select>
      </label>

      {/* Новий пароль (необов'язково) */}
      <div className="border-t border-[--color-border] pt-5">
        <p className="text-xs text-[--color-text-dim] mb-3">
          Залиште порожнім, щоб не змінювати пароль.
        </p>
        <label className="block">
          <div className="text-[11px] uppercase tracking-widest text-[--color-text-muted] mb-1.5">
            Новий пароль
          </div>
          <div className="relative">
            <input
              name="new_password"
              type={showPass ? "text" : "password"}
              minLength={8}
              placeholder="Мін. 8 символів, лише латиниця"
              className="w-full bg-[--color-bg] border border-[--color-border-strong] px-3 py-2.5 pr-10 text-[--color-text] outline-none focus:border-[--color-accent] placeholder:text-[--color-text-dim]"
            />
            <button
              type="button"
              onClick={() => setShowPass((v) => !v)}
              tabIndex={-1}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-[--color-text-muted] hover:text-[--color-accent]"
            >
              {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </label>
      </div>

      {/* Результат */}
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
        className="w-full bg-[--color-accent] text-[--color-bg] py-3 text-sm uppercase tracking-widest font-semibold hover:bg-[--color-accent-hover] disabled:opacity-60"
      >
        {pending ? "Збереження…" : "Зберегти зміни"}
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
