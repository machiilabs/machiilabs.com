import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/admin";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: {
    email?: string;
    company?: string; // honeypot
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  // Bots fill hidden fields — pretend success
  if (body.company && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const email = (body.email ?? "").trim().toLowerCase();
  if (!email || email.length > 320 || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "email" }, { status: 400 });
  }

  try {
    const supabase = createServiceClient();

    const { error: insertError } = await supabase
      .from("announcement_subscribers")
      .insert({ email });

    if (insertError) {
      // Already on the list — same generic success (anti-enumeration)
      if (insertError.code === "23505") {
        return NextResponse.json({ ok: true });
      }
      console.error("mailing-list insert", insertError.code, insertError.message);
      return NextResponse.json({ ok: false, error: "db" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("mailing-list", message);
    if (message.includes("Missing NEXT_PUBLIC_SUPABASE_URL") || message.includes("SUPABASE_SERVICE_ROLE_KEY")) {
      return NextResponse.json({ ok: false, error: "config" }, { status: 500 });
    }
    return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
  }
}
