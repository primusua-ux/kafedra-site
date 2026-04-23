import { createServiceClient } from "@/lib/supabase/service";
import PageHero from "@/components/PageHero";
import { UserCog, Check, X } from "lucide-react";
import { approveUser, rejectUser, changeRole } from "./actions";
import DeleteButton from "./DeleteButton";
import type { Profile } from "@/lib/supabase/getProfile";

export const metadata = { title: "Адміністрування" };

export default async function AdminPage() {
  const supabase = createServiceClient();
  const { data: users } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<Profile[]>();

  const pending = (users ?? []).filter((u) => u.status === "pending");
  const approved = (users ?? []).filter((u) => u.status === "approved");
  const rejected = (users ?? []).filter((u) => u.status === "rejected");

  return (
    <>
      <PageHero
        eyebrow="Адміністрування"
        title="Керування користувачами"
        description="Підтвердження заявок на реєстрацію, призначення ролей, блокування доступу."
        icon={<UserCog className="h-6 w-6" />}
      />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <UsersTable title={`На модерації (${pending.length})`} users={pending} highlight />
        <UsersTable title={`Активні користувачі (${approved.length})`} users={approved} />
        {rejected.length > 0 && (
          <UsersTable title={`Відхилені (${rejected.length})`} users={rejected} danger />
        )}
      </section>
    </>
  );
}

function UsersTable({ title, users, highlight, danger }: { title: string; users: Profile[]; highlight?: boolean; danger?: boolean }) {
  return (
    <div className={`border bg-[--color-bg-panel] ${highlight ? "border-[--color-accent-dim]" : danger ? "border-[--color-danger]/40" : "border-[--color-border]"}`}>
      <div className="px-6 py-4 border-b border-[--color-border] section-title text-xs text-[--color-accent]">
        {title}
      </div>
      {users.length === 0 ? (
        <div className="p-6 text-sm text-[--color-text-muted]">Немає записів.</div>
      ) : (
        <div className="divide-y divide-[--color-border]">
          {users.map((u) => (
            <div key={u.id} className="p-4 sm:p-6 flex flex-col md:flex-row md:items-center gap-3">
              <div className="flex-1 min-w-0">
                <div className="font-semibold truncate">{u.full_name || "—"}</div>
                <div className="text-xs text-[--color-text-muted] truncate">{u.email}</div>
                {u.role === "student" && u.platoon && (
                  <div className="text-xs text-[--color-text-dim] mt-0.5">
                    Взвод: <span className="text-[--color-accent]">{u.platoon}</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="uppercase tracking-widest border border-[--color-border-strong] px-2 py-1">
                  {u.role}
                </span>
                <span className={`uppercase tracking-widest border px-2 py-1 ${
                  u.status === "approved" ? "border-[--color-accent] text-[--color-accent]" :
                  u.status === "rejected" ? "border-[--color-danger] text-[--color-danger]" :
                  "border-[--color-border-strong] text-[--color-text-muted]"
                }`}>
                  {u.status}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <form action={changeRole}>
                  <input type="hidden" name="id" value={u.id} />
                  <select
                    name="role"
                    defaultValue={u.role}
                    className="bg-[--color-bg] border border-[--color-border-strong] px-2 py-1.5 text-xs"
                  >
                    <option value="student">Студент</option>
                    <option value="teacher">Викладач</option>
                    <option value="admin">Адмін</option>
                  </select>
                  <button type="submit" className="ml-1 px-2 py-1.5 text-xs border border-[--color-border-strong] hover:border-[--color-accent]">
                    Змінити
                  </button>
                </form>
                {u.status !== "approved" && (
                  <form action={approveUser}>
                    <input type="hidden" name="id" value={u.id} />
                    <button type="submit" className="inline-flex items-center gap-1 px-3 py-1.5 bg-[--color-accent] text-[--color-bg] text-xs uppercase tracking-wider font-semibold">
                      <Check className="h-3 w-3" /> Підтвердити
                    </button>
                  </form>
                )}
                {u.status !== "rejected" && (
                  <form action={rejectUser}>
                    <input type="hidden" name="id" value={u.id} />
                    <button type="submit" className="inline-flex items-center gap-1 px-3 py-1.5 border border-[--color-border-strong] text-xs uppercase tracking-wider hover:text-[--color-danger] hover:border-[--color-danger]">
                      <X className="h-3 w-3" /> Відхилити
                    </button>
                  </form>
                )}
                <DeleteButton id={u.id} name={u.full_name || u.email} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
