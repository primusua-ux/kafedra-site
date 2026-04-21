import { createClient } from "./server";

export type UserRole = "student" | "teacher" | "admin";
export type UserStatus = "pending" | "approved" | "rejected";

export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  role: UserRole;
  status: UserStatus;
  created_at: string;
};

/**
 * Повертає користувача та його профіль (ролі + статус модерації).
 * Якщо користувач не авторизований — повертає null.
 */
export async function getProfile() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single<Profile>();

  return { user, profile };
}
