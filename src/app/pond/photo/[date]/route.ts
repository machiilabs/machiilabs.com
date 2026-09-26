import { NextResponse } from "next/server";
import { isPhoenixDate } from "@/lib/pond/dates";
import { readPondPhoto } from "@/lib/pond/db";
import { isPondUnlocked } from "@/lib/pond/gate";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  context: { params: Promise<{ date: string }> },
) {
  const { date } = await context.params;
  if (!(await isPondUnlocked()) || !isPhoenixDate(date)) {
    return new NextResponse("Not found", {
      status: 404,
      headers: { "X-Robots-Tag": "noindex, nofollow" },
    });
  }

  try {
    const blob = await readPondPhoto(`${date}.jpg`);
    if (!blob) {
      return new NextResponse("Not found", {
        status: 404,
        headers: { "X-Robots-Tag": "noindex, nofollow" },
      });
    }
    const bytes = new Uint8Array(await blob.arrayBuffer());
    return new NextResponse(bytes, {
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "private, no-store",
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  } catch (err) {
    console.error("pond photo read", err instanceof Error ? err.message : "error");
    return new NextResponse("Not found", {
      status: 404,
      headers: { "X-Robots-Tag": "noindex, nofollow" },
    });
  }
}
