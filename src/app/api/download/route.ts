import { NextResponse } from "next/server";
import {
  PRODUCT_DOWNLOADS,
  type DownloadProduct,
} from "@/lib/downloads";
import { createServiceClient } from "@/lib/supabase/admin";

function isProduct(value: string | null): value is DownloadProduct {
  return value != null && value in PRODUCT_DOWNLOADS;
}

/**
 * Countable download hop: /api/download?product=flasher|winflasher|skagway
 * Records one row in site_download_events, then 302 to the CDN file.
 */
export async function GET(request: Request) {
  const product = new URL(request.url).searchParams.get("product");
  if (!isProduct(product)) {
    return NextResponse.json({ ok: false, error: "product" }, { status: 400 });
  }

  try {
    const supabase = createServiceClient();
    const { error } = await supabase
      .from("site_download_events")
      .insert({ product });
    if (error) {
      console.error("site-download insert", error.code, error.message);
    }
  } catch (err) {
    console.error("site-download", err instanceof Error ? err.message : err);
  }

  return NextResponse.redirect(PRODUCT_DOWNLOADS[product], 302);
}
