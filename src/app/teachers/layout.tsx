import { redirect } from "next/navigation";
import { getProfile } from "@/lib/supabase/getProfile";

export default async function TeachersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getProfile();
  if (!data) redirect("/login?redirect=/teachers");

  const { profile } = data;
  if (!profile) redirect("/pending");
  if (profile.status !== "approved") redirect("/pending");
  if (profile.role !== "teacher" && profile.role !== "admin") {
    redirect("/students"); // студент — відправляємо на свій розділ
  }

  return <>{children}</>;
}
