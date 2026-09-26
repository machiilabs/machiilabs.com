import { NextResponse } from "next/server";
import { isPhoenixDate, phoenixToday } from "@/lib/pond/dates";
import { setPondPhoto, uploadPondPhoto } from "@/lib/pond/db";
import { isPondUnlocked } from "@/lib/pond/gate";

export const dynamic = "force-dynamic";

const MAX_BYTES = 1_572_864;

function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) {
    return NextResponse.json({ ok: false }, { status: 403 });
  }
  if (!(await isPondUnlocked())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const date = String(form.get("date") ?? "");
  const file = form.get("file");
  if (!isPhoenixDate(date) || date > phoenixToday() || !(file instanceof File)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (file.size <= 0 || file.size > MAX_BYTES) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  if (bytes.length < 3 || bytes[0] !== 0xff || bytes[1] !== 0xd8 || bytes[2] !== 0xff) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  try {
    await uploadPondPhoto(`${date}.jpg`, bytes);
    await setPondPhoto(date, `${date}.jpg`);
  } catch (err) {
    console.error("pond photo", err instanceof Error ? err.message : "error");
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  return NextResponse.json({ ok: true, photo_path: `${date}.jpg` });
}
