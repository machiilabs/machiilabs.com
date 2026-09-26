import { NextResponse } from "next/server";
import { loadPondLog, readPondPhoto } from "@/lib/pond/db";
import { POND_TIMEZONE } from "@/lib/pond/types";
import { isPondUnlocked } from "@/lib/pond/gate";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isPondUnlocked())) {
    return new NextResponse("Unlock the pond log first.", {
      status: 401,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Robots-Tag": "noindex, nofollow",
        "Cache-Control": "private, no-store",
      },
    });
  }

  try {
    const log = await loadPondLog();
    const days = [];
    for (const day of log.days) {
      let photo: string | null = null;
      if (day.photo_path) {
        const blob = await readPondPhoto(day.photo_path);
        if (blob) {
          photo = Buffer.from(await blob.arrayBuffer()).toString("base64");
        }
      }
      days.push({ ...day, photo_jpeg_base64: photo });
    }

    const body = JSON.stringify(
      {
        exported_at: new Date().toISOString(),
        timezone: POND_TIMEZONE,
        days,
        product_memory: log.memory,
      },
      null,
      2,
    );

    return new NextResponse(body, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Content-Disposition": 'attachment; filename="pond-log.json"',
        "Cache-Control": "private, no-store",
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  } catch (err) {
    console.error("pond export", err instanceof Error ? err.message : "error");
    return new NextResponse("The pond log isn’t ready yet.", {
      status: 500,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  }
}
