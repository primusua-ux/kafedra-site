"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";
import { getProfile } from "@/lib/supabase/getProfile";

export type SettingsState =
  | { ok: false; error: string }
  | { ok: true; message: string }
  | undefined;

export async function updateProfile(
  _prev: SettingsState,
  formData: FormData,
): Promise<SettingsState> {
  const data = await getProfile();
  if (!data?.profile) return { ok: false, error: "Не авторизовано." };

  const fullName = String(formData.get("full_name") ?? "").trim();
  const platoon  = String(formData.get("platoon")   ?? "").trim();

  if (!fullName) return { ok: false, error: "П.І.Б. не може бути порожнім." };

  const service = createServiceClient();
  const { error } = await service
    .from("profiles")
    .update({
      full_name: fullName,
      platoon: platoon || null,
    })
    .eq("id", data.user.id);

  if (error) return { ok: false, error: error.message };

  revalidatePath("/settings");
  revalidatePath("/", "layout");
  return { ok: true, message: "Дані успішно збережено." };
}

export async function changePassword(
  _prev: SettingsState,
  formData: FormData,
): Promise<SettingsState> {
  const data = await getProfile();
  if (!data) return { ok: false, error: "Не авторизовано." };

  const current  = String(formData.get("current_password")  ?? "");
  const next     = String(formData.get("new_password")      ?? "");
  const confirm  = String(formData.get("confirm_password")  ?? "");

  if (!current || !next) return { ok: false, error: "Заповніть усі поля." };
  if (next.length < 8)   return { ok: false, error: "Новий пароль — мінімум 8 символів." };
  if (next !== confirm)   return { ok: false, error: "Паролі не збігаються." };

  // Перевіряємо поточний пароль через повторний вхід
  const supabase = await createClient();
  const { error: signInErr } = await supabase.auth.signInWithPassword({
    email: data.user.email!,
    password: current,
  });
  if (signInErr) return { ok: false, error: "Поточний пароль невірний." };

  const { error } = await supabase.auth.updateUser({ password: next });
  if (error) return { ok: false, error: error.message };

  return { ok: true, message: "Пароль успішно змінено." };
}
