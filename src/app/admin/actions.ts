"use server";

import { redirect } from "next/navigation";
import { formatMailingList } from "@/lib/mailing-list-export";
import { createServiceClient } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/supabase/auth";
import { createClient } from "@/lib/supabase/server";

export async function signOutAdmin() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function generateMailingList(): Promise<
  { ok: true; text: string; count: number } | { ok: false }
> {
  await requireAdmin();

  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from("announcement_subscribers")
      .select("email, unsubscribe_token")
      .is("unsubscribed_at", null);

    if (error || !data) {
      console.error("mailing-list export", error?.code ?? "empty");
      return { ok: false };
    }

    const text = formatMailingList(data);
    const count = text === "" ? 0 : text.split("\n").length;
    return { ok: true, text, count };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(
      "mailing-list export",
      message.includes("SUPABASE_SERVICE_ROLE_KEY") ? "config" : "server",
    );
    return { ok: false };
  }
}
