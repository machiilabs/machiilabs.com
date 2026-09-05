import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/admin";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function POST(request: Request) {
  let token = "";
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    try {
      const body = (await request.json()) as { token?: string };
      token = (body.token ?? "").trim();
    } catch {
      return NextResponse.json({ ok: false }, { status: 400 });
    }
  } else {
    const form = await request.formData();
    token = String(form.get("token") ?? "").trim();
  }

  if (!token || !UUID_RE.test(token)) {
    return NextResponse.json({ ok: false, error: "token" }, { status: 400 });
  }

  try {
    const supabase = createServiceClient();
    const { error } = await supabase
      .from("announcement_subscribers")
      .delete()
      .eq("unsubscribe_token", token);

    if (error) {
      console.error("unsubscribe", error.message);
      return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
    }

    // Generic success even if token unknown (no email leak)
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("unsubscribe", err);
    return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
  }
}
