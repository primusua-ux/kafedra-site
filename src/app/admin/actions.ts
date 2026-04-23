"use server";

import { revalidatePath } from "next/cache";
import { createServiceClient } from "@/lib/supabase/service";
import { getProfile } from "@/lib/supabase/getProfile";

async function assertAdmin() {
  const data = await getProfile();
  if (!data?.profile || data.profile.role !== "admin" || data.profile.status !== "approved") {
    throw new Error("Доступ заборонено");
  }
}

export async function approveUser(formData: FormData) {
  await assertAdmin();
  const id = String(formData.get("id"));
  const supabase = createServiceClient();
  await supabase.from("profiles").update({ status: "approved" }).eq("id", id);
  revalidatePath("/admin");
}

export async function rejectUser(formData: FormData) {
  await assertAdmin();
  const id = String(formData.get("id"));
  const supabase = createServiceClient();
  await supabase.from("profiles").update({ status: "rejected" }).eq("id", id);
  revalidatePath("/admin");
}

export async function changeRole(formData: FormData) {
  await assertAdmin();
  const id = String(formData.get("id"));
  const role = String(formData.get("role"));
  if (!["student", "teacher", "admin"].includes(role)) return;
  const supabase = createServiceClient();
  await supabase.from("profiles").update({ role }).eq("id", id);
  revalidatePath("/admin");
}
