"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export type AuthState =
  | { ok: false; error: string }
  | { ok: true; message?: string }
  | undefined;

export async function login(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const redirectTo = String(formData.get("redirect") ?? "/");

  if (!email || !password) {
    return { ok: false, error: "Введіть e-mail і пароль." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { ok: false, error: "Невірний e-mail або пароль." };
  }

  revalidatePath("/", "layout");
  redirect(redirectTo || "/");
}

export async function register(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const fullName = String(formData.get("full_name") ?? "").trim();
  const requestedRole = String(formData.get("role") ?? "student");
  const platoon = String(formData.get("platoon") ?? "").trim();

  const confirmPassword = String(formData.get("confirm_password") ?? "");

  if (!email || !password || !fullName) {
    return { ok: false, error: "Заповніть усі поля." };
  }
  if (password.length < 8) {
    return { ok: false, error: "Пароль має містити щонайменше 8 символів." };
  }
  if (password !== confirmPassword) {
    return { ok: false, error: "Паролі не збігаються." };
  }
  if (!["student", "teacher"].includes(requestedRole)) {
    return { ok: false, error: "Невірна роль." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        requested_role: requestedRole,
        platoon: platoon || null,
      },
    },
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  return {
    ok: true,
    message:
      "Реєстрацію подано. Очікуйте підтвердження адміністратора та перевірки e-mail.",
  };
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}
