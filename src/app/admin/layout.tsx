import { redirect } from "next/navigation";
import { getProfile } from "@/lib/supabase/getProfile";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getProfile();
  if (!data) redirect("/login?redirect=/admin");

  const { profile } = data;
  if (!profile || profile.role !== "admin" || profile.status !== "approved") {
    redirect("/");
  }
  return <>{children}</>;
}
