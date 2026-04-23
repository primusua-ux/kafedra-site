import { createClient } from "./server";
import { createServiceClient } from "./service";

export type UserRole = "student" | "teacher" | "admin";
export type UserStatus = "pending" | "approved" | "rejected";

export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  role: UserRole;
  status: UserStatus;
  platoon: string | null;
  created_at: string;
};

/**
 * Повертає користувача та його профіль (ролі + статус модерації).
 * Якщо користувач не авторизований — повертає null.
 * Профіль читається через service role (обходить RLS) — безпечно, бо тільки на сервері.
 */
export async function getProfile() {
  // Перевіряємо сесію через anon-клієнт (валідація JWT)
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  // Читаємо профіль через service role — обходить RLS, завжди повертає актуальні дані
  const service = createServiceClient();
  const { data: profile } = await service
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single<Profile>();

  return { user, profile };
}
