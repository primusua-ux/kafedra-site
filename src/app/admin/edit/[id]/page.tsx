import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, UserCog } from "lucide-react";
import { getProfile } from "@/lib/supabase/getProfile";
import { createServiceClient } from "@/lib/supabase/service";
import PageHero from "@/components/PageHero";
import EditUserForm from "./EditUserForm";
import type { Profile } from "@/lib/supabase/getProfile";

type Params = Promise<{ id: string }>;

export const dynamic = "force-dynamic";
export const metadata = { title: "Редагування користувача" };

export default async function EditUserPage({ params }: { params: Params }) {
  // Перевірка прав адміна
  const me = await getProfile();
  if (
    !me?.profile ||
    me.profile.role !== "admin" ||
    me.profile.status !== "approved"
  ) {
    redirect("/");
  }

  const { id } = await params;

  const service = createServiceClient();
  const { data: profile } = await service
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single<Profile>();

  if (!profile) redirect("/admin");

  return (
    <>
      <PageHero
        eyebrow="Адміністрування"
        title={`Редагування: ${profile.full_name || profile.email}`}
        description="Зміна особистих даних, ролі, статусу та пароля користувача."
        icon={<UserCog className="h-6 w-6" />}
      />

      <section className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-sm text-[--color-text-muted] hover:text-[--color-accent] mb-8"
        >
          <ArrowLeft className="h-4 w-4" /> Назад до списку
        </Link>

        <div className="border border-[--color-border] bg-[--color-bg-panel] p-6">
          <EditUserForm profile={profile} />
        </div>
      </section>
    </>
  );
}
