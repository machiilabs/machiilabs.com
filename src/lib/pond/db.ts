import { createServiceClient } from "@/lib/supabase/admin";
import { advise } from "@/lib/pond/advise";
import { phoenixToday, isPhoenixDate } from "@/lib/pond/dates";
import { parseDay, parseMemory } from "@/lib/pond/day";
import {
  PRODUCT_IDS,
  type MemoryUpdate,
  type PondDay,
  type ProductMemory,
  type SaveDayInput,
} from "@/lib/pond/types";

export type PondLog = {
  today: string;
  days: PondDay[];
  memory: ProductMemory[];
};

function client() {
  return createServiceClient();
}

export async function loadPondLog(): Promise<PondLog> {
  const supabase = client();
  const [daysResult, memoryResult] = await Promise.all([
    supabase.from("pond_days").select("*").order("phoenix_date", { ascending: false }),
    supabase.from("pond_product_memory").select("product, amount, interval_days"),
  ]);
  if (daysResult.error) {
    throw new Error(daysResult.error.message);
  }
  if (memoryResult.error) {
    throw new Error(memoryResult.error.message);
  }
  const days = (daysResult.data ?? [])
    .map((row) => parseDay(row as Record<string, unknown>))
    .filter((day): day is PondDay => day != null);
  return {
    today: phoenixToday(),
    days,
    memory: parseMemory(memoryResult.data),
  };
}

export async function savePondRecord(input: SaveDayInput): Promise<ProductMemory[]> {
  const today = phoenixToday();
  if (!isPhoenixDate(input.phoenix_date) || input.phoenix_date > today) {
    throw new Error("invalid date");
  }

  const supabase = client();
  const { data: existingRow, error: existingError } = await supabase
    .from("pond_days")
    .select("*")
    .eq("phoenix_date", input.phoenix_date)
    .maybeSingle();
  if (existingError) throw new Error(existingError.message);

  const existing = existingRow
    ? parseDay(existingRow as Record<string, unknown>)
    : null;

  const { data: historyRows, error: historyError } = await supabase
    .from("pond_days")
    .select("*")
    .lt("phoenix_date", input.phoenix_date);
  if (historyError) throw new Error(historyError.message);

  const history = (historyRows ?? [])
    .map((row) => parseDay(row as Record<string, unknown>))
    .filter((day): day is PondDay => day != null);

  const memory = await loadMemory();
  const mergedMemory = applyMemory(memory, input.memory_updates);

  const draft: PondDay = {
    phoenix_date: input.phoenix_date,
    photo_path: existing?.photo_path ?? null,
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
    steps_advised: existing?.steps_advised ?? [],
    steps_taken: input.steps_taken,
    note: input.note,
  };

  let stepsAdvised = existing?.steps_advised ?? [];
  const rewriteAdvice = !existing || input.phoenix_date === today;
  if (rewriteAdvice) {
    const advice = advise({
      today: input.phoenix_date,
      hasPhoto: Boolean(draft.photo_path),
      day: draft,
      history,
      memory: mergedMemory,
    });
    stepsAdvised = advice.checklist ?? existing?.steps_advised ?? [];
  }

  const now = new Date().toISOString();
  const { error: saveError } = await supabase.from("pond_days").upsert(
    {
      phoenix_date: draft.phoenix_date,
      clarity: draft.clarity,
      color: draft.color,
      string_algae: draft.string_algae,
      debris: draft.debris,
      chlorine: draft.chlorine,
      nitrate: draft.nitrate,
      nitrite: draft.nitrite,
      alkalinity: draft.alkalinity,
      ph: draft.ph,
      phosphate: draft.phosphate,
      phosphate_band: draft.phosphate_band,
      product_status: draft.product_status,
      steps_advised: stepsAdvised,
      steps_taken: draft.steps_taken,
      note: draft.note,
      updated_at: now,
    },
    { onConflict: "phoenix_date" },
  );
  if (saveError) throw new Error(saveError.message);

  if (input.memory_updates.length > 0) {
    await writeMemory(input.memory_updates, memory);
  }
  return loadMemory();
}

async function loadMemory(): Promise<ProductMemory[]> {
  const supabase = client();
  const { data, error } = await supabase
    .from("pond_product_memory")
    .select("product, amount, interval_days");
  if (error) throw new Error(error.message);
  return parseMemory(data);
}

function applyMemory(memory: ProductMemory[], updates: MemoryUpdate[]): ProductMemory[] {
  const next = memory.map((item) => ({ ...item }));
  for (const update of updates) {
    if (!PRODUCT_IDS.includes(update.product)) continue;
    const index = next.findIndex((item) => item.product === update.product);
    const prev = index >= 0 ? next[index] : null;
    const row: ProductMemory = {
      product: update.product,
      amount: update.amount !== undefined ? update.amount : (prev?.amount ?? null),
      interval_days:
        update.interval_days !== undefined
          ? update.interval_days
          : (prev?.interval_days ?? null),
    };
    if (index >= 0) next[index] = row;
    else next.push(row);
  }
  return next;
}

async function writeMemory(updates: MemoryUpdate[], existing: ProductMemory[]) {
  const supabase = client();
  const now = new Date().toISOString();
  for (const update of updates) {
    if (!PRODUCT_IDS.includes(update.product)) continue;
    const prev = existing.find((item) => item.product === update.product);
    const amount =
      update.amount !== undefined ? blankToNull(update.amount) : (prev?.amount ?? null);
    const interval =
      update.interval_days !== undefined
        ? update.interval_days
        : (prev?.interval_days ?? null);
    const { error } = await supabase.from("pond_product_memory").upsert(
      {
        product: update.product,
        amount,
        interval_days: interval,
        updated_at: now,
      },
      { onConflict: "product" },
    );
    if (error) throw new Error(error.message);
  }
}

function blankToNull(value: string | null): string | null {
  if (value == null) return null;
  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, 80) : null;
}

export async function setPondPhoto(phoenixDate: string, photoPath: string) {
  const supabase = client();
  const { error } = await supabase.from("pond_days").upsert(
    {
      phoenix_date: phoenixDate,
      photo_path: photoPath,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "phoenix_date" },
  );
  if (error) throw new Error(error.message);
}

export async function readPondPhoto(photoPath: string): Promise<Blob | null> {
  const supabase = client();
  const { data, error } = await supabase.storage.from("pond-photos").download(photoPath);
  if (error || !data) return null;
  return data;
}

export async function uploadPondPhoto(photoPath: string, bytes: Buffer) {
  const supabase = client();
  const { error } = await supabase.storage.from("pond-photos").upload(photoPath, bytes, {
    contentType: "image/jpeg",
    upsert: true,
  });
  if (error) throw new Error(error.message);
}
