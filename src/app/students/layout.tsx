import { redirect } from "next/navigation";
import { getProfile } from "@/lib/supabase/getProfile";

export default async function StudentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getProfile();

  // Захист на рівні сторінок. proxy.ts уже перенаправив неавторизованих,
  // але тут ми ще перевіряємо роль і статус модерації.
  if (!data) redirect("/login?redirect=/students");

  const { profile } = data;
  if (!profile) redirect("/pending");
  if (profile.status !== "approved") redirect("/pending");
  if (profile.role !== "student" && profile.role !== "teacher" && profile.role !== "admin") {
    redirect("/pending");
  }

  return <>{children}</>;
}
