import { getProfile } from "@/lib/supabase/getProfile";
import Header from "./Header";

export default async function HeaderServer() {
  // Обгортаємо в try/catch — якщо env-змінні Supabase ще не задані,
  // сайт все одно відкриється без авторизації.
  try {
    const data = await getProfile();
    return (
      <Header
        user={
          data
            ? {
                email: data.user.email ?? "",
                fullName: data.profile?.full_name ?? null,
                role: data.profile?.role ?? null,
                status: data.profile?.status ?? null,
              }
            : null
        }
      />
    );
  } catch {
    return <Header user={null} />;
  }
}
