"use client";

import { useActionState, useState, useRef, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { register, type AuthState } from "../actions";

export default function RegisterForm() {
  const [state, action, pending] = useActionState<AuthState, FormData>(
    register,
    undefined,
  );

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [role, setRole] = useState("student");
  const formRef = useRef<HTMLFormElement>(null);

  const mismatch = confirm.length > 0 && password !== confirm;
  const canSubmit = !pending && !mismatch;

  /* Shake form on server error */
  useEffect(() => {
    if (state && !state.ok && formRef.current) {
      formRef.current.classList.remove("animate-shake");
      void formRef.current.offsetWidth; // reflow
      formRef.current.classList.add("animate-shake");
    }
  }, [state]);

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
    <form ref={formRef} action={action} className="space-y-4">
      <div className="border border-[--color-border] bg-[--color-bg-panel] px-4 py-3 text-xs text-[--color-text-muted] leading-relaxed">
        Вкажіть достовірні дані — адміністратор перевіряє їх перед підтвердженням.
        Після реєстрації ви зможете змінити П.І.Б., взвод та пароль у особистому кабінеті
        (крім електронної пошти).
      </div>

      <label className="block">
        <div className="text-[11px] uppercase tracking-widest text-[--color-text-muted] mb-1.5">
          П.І.Б. <span className="text-[--color-danger]">*</span>
        </div>
        <input
          name="full_name"
          type="text"
          required
          autoFocus
          placeholder="Прізвище Ім'я По батькові"
          className="w-full bg-[--color-bg] border border-[--color-border-strong] px-3 py-2.5 text-[--color-text] outline-none focus:border-[--color-accent] placeholder:text-[--color-text-dim]"
        />
        <p className="text-xs text-[--color-text-dim] mt-1.5">
          Вказуйте справжнє П.І.Б. — без цього адміністратор не зможе підтвердити заявку.
        </p>
      </label>
      <Field label="E-mail" name="email" type="email" required />

      {/* Пароль */}
      <PasswordField
        label="Пароль"
        name="password"
        show={showPass}
        onToggle={() => setShowPass((v) => !v)}
        required
        minLength={8}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* Підказка щодо пароля */}
      <div className="text-xs text-[--color-text-dim] leading-relaxed -mt-1 px-0.5">
        Пароль має містити не менше 8 символів,{" "}
        <span className="text-[--color-text-muted]">лише латинські літери</span>{" "}
        (a–z, A–Z), цифри та спеціальні символи (!@#$%^&* тощо).
        Кирилицю та пробіли не використовувати.
      </div>

      {/* Підтвердження пароля */}
      <PasswordField
        label="Повторіть пароль"
        name="confirm_password"
        show={showConfirm}
        onToggle={() => setShowConfirm((v) => !v)}
        required
        minLength={8}
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        error={mismatch ? "Паролі не збігаються" : undefined}
      />

      {/* Роль */}
      <label className="block">
        <div className="text-[11px] uppercase tracking-widest text-[--color-text-muted] mb-1.5">
          Роль
        </div>
        <select
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full bg-[--color-bg] border border-[--color-border-strong] px-3 py-2.5 text-[--color-text] outline-none focus:border-[--color-accent]"
        >
          <option value="student">Студент</option>
          <option value="teacher">Викладач (НПП)</option>
        </select>
        <p className="text-xs text-[--color-text-dim] mt-1.5">
          Роль підтверджується адміністратором після перевірки.
        </p>
      </label>

      {/* Взвод — тільки для студентів, обов'язкове */}
      {role === "student" && (
        <label className="block">
          <div className="text-[11px] uppercase tracking-widest text-[--color-text-muted] mb-1.5">
            Навчальний взвод <span className="text-[--color-danger]">*</span>
          </div>
          <input
            name="platoon"
            type="text"
            required
            placeholder="Наприклад: 201, В-3, 1/2…"
            maxLength={20}
            className="w-full bg-[--color-bg] border border-[--color-border-strong] px-3 py-2.5 text-[--color-text] outline-none focus:border-[--color-accent] placeholder:text-[--color-text-dim]"
          />
        </label>
      )}

      {state && !state.ok && (
        <div className="border border-[--color-danger] bg-[--color-danger]/10 text-sm px-3 py-2">
          {state.error}
        </div>
      )}

      <button
        type="submit"
        disabled={!canSubmit}
        className="w-full bg-[--color-accent] text-[--color-bg] py-3 text-sm uppercase tracking-widest font-semibold hover:bg-[--color-accent-hover] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {pending && (
          <span className="h-4 w-4 rounded-full border-2 border-[--color-bg]/40 border-t-[--color-bg] animate-spin" />
        )}
        {pending ? "Надсилання…" : "Зареєструватись"}
      </button>
    </form>
  );
}

/* ─── shared components ─── */

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
  error,
  ...props
}: {
  label: string;
  show: boolean;
  onToggle: () => void;
  error?: string;
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
          className={`w-full bg-[--color-bg] border px-3 py-2.5 pr-10 text-[--color-text] outline-none focus:border-[--color-accent] placeholder:text-[--color-text-dim] ${
            error
              ? "border-[--color-danger]"
              : "border-[--color-border-strong]"
          }`}
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
      {error && (
        <p className="text-xs text-[--color-danger] mt-1">{error}</p>
      )}
    </label>
  );
}
