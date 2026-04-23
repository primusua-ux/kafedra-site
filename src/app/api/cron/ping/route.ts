import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";

// Vercel Cron викликає цей маршрут автоматично.
// Він виконує легкий запит до Supabase щоб база не засинала.
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  // Захист: дозволяємо тільки Vercel Cron або запити з секретним токеном
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = createServiceClient();
    const { count, error } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true });

    if (error) throw error;

    const now = new Date().toISOString();
    console.log(`[cron/ping] OK at ${now}, profiles: ${count}`);

    return NextResponse.json({
      ok: true,
      timestamp: now,
      profiles: count,
    });
  } catch (err) {
    console.error("[cron/ping] Error:", err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
