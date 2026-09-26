"use server";

import { cookies } from "next/headers";
import { savePondRecord } from "@/lib/pond/db";
import { isPhoenixDate, phoenixToday } from "@/lib/pond/dates";
import { parseDay, toSaveInput } from "@/lib/pond/day";
import {
  gateToken,
  isPondUnlocked,
  POND_COOKIE,
  pondCookieOptions,
  safeEqual,
} from "@/lib/pond/gate";
import {
  PRODUCT_IDS,
  type MemoryUpdate,
  type ProductId,
  type SaveDayInput,
  type SaveResult,
} from "@/lib/pond/types";

export async function unlockPond(
  passphrase: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const expected = process.env.POND_PASSPHRASE;
  if (!expected) return { ok: false, error: "This log isn’t available." };
  const typed = typeof passphrase === "string" ? passphrase : "";
  if (!safeEqual(typed, expected)) {
    return { ok: false, error: "That passphrase didn’t match." };
  }
  const jar = await cookies();
  jar.set(POND_COOKIE, gateToken(expected), pondCookieOptions());
  return { ok: true };
}

function cleanUpdates(value: unknown): MemoryUpdate[] {
  if (!Array.isArray(value)) return [];
  const updates: MemoryUpdate[] = [];
  for (const entry of value) {
    if (!entry || typeof entry !== "object") continue;
    const product = (entry as { product?: unknown }).product;
    if (typeof product !== "string" || !PRODUCT_IDS.includes(product as ProductId)) {
      continue;
    }
    const update: MemoryUpdate = { product: product as ProductId };
    if ("amount" in entry) {
      const amount = (entry as { amount?: unknown }).amount;
      if (amount == null) update.amount = null;
      else if (typeof amount === "string") update.amount = amount.trim().slice(0, 80) || null;
      else continue;
    }
    if ("interval_days" in entry) {
      const interval = (entry as { interval_days?: unknown }).interval_days;
      if (interval == null) update.interval_days = null;
      else if (
        typeof interval === "number" &&
        Number.isInteger(interval) &&
        interval > 0 &&
        interval <= 365
      ) {
        update.interval_days = interval;
      } else {
        continue;
      }
    }
    updates.push(update);
  }
  return updates;
}

function sanitize(input: SaveDayInput): SaveDayInput | null {
  if (!input || typeof input !== "object") return null;
  const day = parseDay({
    phoenix_date: input.phoenix_date,
    clarity: input.clarity,
    color: input.color,
    string_algae: input.string_algae,
    debris: input.debris,
    chlorine: input.chlorine,
    nitrate: input.nitrate,
    nitrite: input.nitrite,
    alkalinity: input.alkalinity,
    ph: input.ph,
    phosphate: input.phosphate,
    phosphate_band: input.phosphate_band,
    product_status: input.product_status,
    steps_advised: [],
    steps_taken: input.steps_taken,
    note: input.note,
  });
  if (!day || !isPhoenixDate(day.phoenix_date) || day.phoenix_date > phoenixToday()) {
    return null;
  }
  return toSaveInput(day, cleanUpdates(input.memory_updates));
}

export async function savePondDay(input: SaveDayInput): Promise<SaveResult> {
  if (!(await isPondUnlocked())) {
    return { ok: false, temporary: false, error: "Unlock the log first." };
  }
  const clean = sanitize(input);
  if (!clean) {
    return { ok: false, temporary: false, error: "That day isn’t valid." };
  }
  try {
    const memory = await savePondRecord(clean);
    return { ok: true, memory };
  } catch (err) {
    console.error("pond save", err instanceof Error ? err.message : "error");
    return { ok: false, temporary: true, error: "Save didn’t land." };
  }
}
