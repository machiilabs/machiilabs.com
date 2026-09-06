import { NextResponse } from "next/server";
import {
  PRODUCT_DOWNLOADS,
  type DownloadProduct,
} from "@/lib/downloads";

function isProduct(value: string | null): value is DownloadProduct {
  return value != null && value in PRODUCT_DOWNLOADS;
}

/**
 * Countable download hop: /api/download?product=flasher|skagway
 * 302 to the CDN file. Count hits in Vercel Observability (filter this path)
 * or logs for `site-download`.
 */
export async function GET(request: Request) {
  const product = new URL(request.url).searchParams.get("product");
  if (!isProduct(product)) {
    return NextResponse.json({ ok: false, error: "product" }, { status: 400 });
  }

  console.info("site-download", product);
  return NextResponse.redirect(PRODUCT_DOWNLOADS[product], 302);
}
