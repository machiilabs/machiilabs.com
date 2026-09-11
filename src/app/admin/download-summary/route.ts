import { NextResponse } from "next/server";
import { isAdminEmail } from "@/lib/admin";
import { loadDownloadSummary } from "@/lib/load-download-dashboard";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !isAdminEmail(user.email)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  try {
    const summary = await loadDownloadSummary();
    return NextResponse.json(summary);
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
