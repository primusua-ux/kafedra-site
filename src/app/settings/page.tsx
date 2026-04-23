import { redirect } from "next/navigation";
import { Settings } from "lucide-react";
import { getProfile } from "@/lib/supabase/getProfile";
import PageHero from "@/components/PageHero";
import SettingsForm from "./SettingsForm";

export const metadata = { title: "Налаштування профілю" };

export default async function SettingsPage() {
  const data = await getProfile();
  if (!data) redirect("/login?redirect=/settings");
  if (!data.profile) redirect("/pending");

  return (
    <>
      <PageHero
        eyebrow="Особистий кабінет"
        title="Налаштування профілю"
        description="Редагування особистих даних та зміна пароля."
        icon={<Settings className="h-6 w-6" />}
      />

      <section className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12">
        <SettingsForm profile={data.profile} email={data.user.email ?? ""} />
      </section>
    </>
  );
}
