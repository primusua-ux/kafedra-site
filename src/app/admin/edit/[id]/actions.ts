"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createServiceClient } from "@/lib/supabase/service";
import { getProfile } from "@/lib/supabase/getProfile";

async function assertAdmin() {
  const data = await getProfile();
  if (
    !data?.profile ||
    data.profile.role !== "admin" ||
    data.profile.status !== "approved"
  ) {
    throw new Error("Доступ заборонено");
  }
}

export type EditState =
  | { ok: false; error: string }
  | { ok: true; message: string }
  | undefined;

export async function adminUpdateUser(
  _prev: EditState,
  formData: FormData,
): Promise<EditState> {
  await assertAdmin();

  const id       = String(formData.get("id")           ?? "");
  const fullName = String(formData.get("full_name")     ?? "").trim();
  const platoon  = String(formData.get("platoon")       ?? "").trim();
  const role     = String(formData.get("role")          ?? "");
  const status   = String(formData.get("status")        ?? "");
  const newPass  = String(formData.get("new_password")  ?? "").trim();

  if (!id || !fullName) return { ok: false, error: "П.І.Б. є обов'язковим." };
  if (!["student", "teacher", "admin"].includes(role))
    return { ok: false, error: "Невірна роль." };
  if (!["pending", "approved", "rejected"].includes(status))
    return { ok: false, error: "Невірний статус." };

  const service = createServiceClient();

  // Оновлюємо профіль через service role (обходить RLS і тригер дозволяє)
  const { error: profileErr } = await service
    .from("profiles")
    .update({
      full_name: fullName,
      platoon:   platoon || null,
      role:      role as "student" | "teacher" | "admin",
      status:    status as "pending" | "approved" | "rejected",
    })
    .eq("id", id);

  if (profileErr) return { ok: false, error: profileErr.message };

  // Якщо задано новий пароль — скидаємо через admin API
  if (newPass) {
    if (newPass.length < 8)
      return { ok: false, error: "Пароль — мінімум 8 символів." };
    const { error: passErr } = await service.auth.admin.updateUserById(id, {
      password: newPass,
    });
    if (passErr) return { ok: false, error: passErr.message };
  }

  revalidatePath("/admin");
  redirect("/admin");
}
