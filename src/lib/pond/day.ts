import {
  ALGAE_OPTIONS,
  CLARITY_OPTIONS,
  DEBRIS_OPTIONS,
  PHOSPHATE_BANDS,
  PRODUCT_IDS,
  type AdvisedStep,
  type AdvisedStepId,
  type DebrisLevel,
  type MemoryUpdate,
  type PhosphateBand,
  type PondDay,
  type ProductId,
  type ProductMemory,
  type ProductStatusAnswer,
  type SaveDayInput,
  type StepsTaken,
  type StringAlgae,
  type TestField,
  type WaterClarity,
} from "@/lib/pond/types";

const CLARITY = new Set<string>(CLARITY_OPTIONS.map((option) => option.id));
const ALGAE = new Set<string>(ALGAE_OPTIONS.map((option) => option.id));
const DEBRIS = new Set<string>(DEBRIS_OPTIONS.map((option) => option.id));
const BANDS = new Set<string>(PHOSPHATE_BANDS.map((option) => option.id));
const PRODUCTS = new Set<string>(PRODUCT_IDS);
const STEP_IDS = new Set<string>([
  "skim",
  "skimmer",
  "scrub",
  "backwash",
  "water_replaced",
  "test_7in1",
  "test_phosphate",
  "green_clean",
  "clarity_max",
  "phosphate_remover",
  "dechlorinator",
  "leave",
]);

export function emptySteps(): StepsTaken {
  return {
    backwash: false,
    water_replaced: false,
    scrub: false,
    skim: false,
    skimmer: false,
    left_alone: false,
    products: [],
    other: "",
  };
}

export function blankDay(phoenixDate: string): PondDay {
  return {
    phoenix_date: phoenixDate,
    photo_path: null,
    clarity: null,
    color: null,
    string_algae: null,
    debris: null,
    chlorine: null,
    nitrate: null,
    nitrite: null,
    alkalinity: null,
    ph: null,
    phosphate: null,
    phosphate_band: null,
    product_status: {},
    steps_advised: [],
    steps_taken: emptySteps(),
    note: null,
  };
}

function text(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, max);
}

function oneOf<T extends string>(value: unknown, allowed: Set<string>): T | null {
  return typeof value === "string" && allowed.has(value) ? (value as T) : null;
}

export function parseStepsTaken(value: unknown): StepsTaken {
  const raw = value && typeof value === "object" ? (value as Record<string, unknown>) : {};
  const products: StepsTaken["products"] = [];
  if (Array.isArray(raw.products)) {
    for (const entry of raw.products) {
      if (!entry || typeof entry !== "object") continue;
      const product = oneOf<ProductId>(
        (entry as { product?: unknown }).product,
        PRODUCTS,
      );
      const amount = text((entry as { amount?: unknown }).amount, 80);
      if (!product || !amount) continue;
      if (products.some((item) => item.product === product)) continue;
      products.push({ product, amount });
    }
  }
  return {
    backwash: raw.backwash === true,
    water_replaced: raw.water_replaced === true,
    scrub: raw.scrub === true,
    skim: raw.skim === true,
    skimmer: raw.skimmer === true,
    left_alone: raw.left_alone === true,
    products,
    other: text(raw.other, 500) ?? "",
  };
}

export function parseStepsAdvised(value: unknown): AdvisedStep[] {
  if (!Array.isArray(value)) return [];
  const steps: AdvisedStep[] = [];
  for (const entry of value) {
    if (!entry || typeof entry !== "object") continue;
    const id = (entry as { id?: unknown }).id;
    if (typeof id !== "string" || !STEP_IDS.has(id)) continue;
    const label = text((entry as { label?: unknown }).label, 120);
    if (!label) continue;
    const detail = text((entry as { detail?: unknown }).detail, 400) ?? undefined;
    const product = oneOf<ProductId>(
      (entry as { product?: unknown }).product,
      PRODUCTS,
    );
    const amount = text((entry as { amount?: unknown }).amount, 80) ?? undefined;
    const step: AdvisedStep = {
      id: id as AdvisedStepId,
      label,
    };
    if (detail) step.detail = detail;
    if (product) step.product = product;
    if (amount) step.amount = amount;
    steps.push(step);
  }
  return steps;
}

function parseStatus(value: unknown): PondDay["product_status"] {
  if (!value || typeof value !== "object") return {};
  const status: PondDay["product_status"] = {};
  for (const product of PRODUCT_IDS) {
    const answer = (value as Record<string, unknown>)[product];
    if (answer === "still_active" || answer === "finished") {
      status[product] = answer;
    }
  }
  return status;
}

export function parseDay(row: Record<string, unknown>): PondDay | null {
  const phoenixDate = typeof row.phoenix_date === "string" ? row.phoenix_date.slice(0, 10) : "";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(phoenixDate)) return null;
  return {
    phoenix_date: phoenixDate,
    photo_path: text(row.photo_path, 200),
    clarity: oneOf<WaterClarity>(row.clarity, CLARITY),
    color: text(row.color, 80),
    string_algae: oneOf<StringAlgae>(row.string_algae, ALGAE),
    debris: oneOf<DebrisLevel>(row.debris, DEBRIS),
    chlorine: text(row.chlorine, 40),
    nitrate: text(row.nitrate, 40),
    nitrite: text(row.nitrite, 40),
    alkalinity: text(row.alkalinity, 40),
    ph: text(row.ph, 40),
    phosphate: text(row.phosphate, 40),
    phosphate_band: oneOf<PhosphateBand>(row.phosphate_band, BANDS),
    product_status: parseStatus(row.product_status),
    steps_advised: parseStepsAdvised(row.steps_advised),
    steps_taken: parseStepsTaken(row.steps_taken),
    note: text(row.note, 2000),
  };
}

export function parseMemory(rows: unknown): ProductMemory[] {
  if (!Array.isArray(rows)) return [];
  const memory: ProductMemory[] = [];
  for (const row of rows) {
    if (!row || typeof row !== "object") continue;
    const product = oneOf<ProductId>((row as { product?: unknown }).product, PRODUCTS);
    if (!product) continue;
    const interval = (row as { interval_days?: unknown }).interval_days;
    memory.push({
      product,
      amount: text((row as { amount?: unknown }).amount, 80),
      interval_days:
        typeof interval === "number" &&
        Number.isInteger(interval) &&
        interval > 0 &&
        interval <= 365
          ? interval
          : null,
    });
  }
  return memory;
}

export function test7Complete(day: Pick<PondDay, TestField>): boolean {
  return (
    Boolean(day.chlorine?.trim()) &&
    Boolean(day.nitrate?.trim()) &&
    Boolean(day.nitrite?.trim()) &&
    Boolean(day.alkalinity?.trim()) &&
    Boolean(day.ph?.trim())
  );
}

export function phosphateComplete(
  day: Pick<PondDay, "phosphate" | "phosphate_band">,
): boolean {
  return Boolean(day.phosphate?.trim()) && day.phosphate_band != null;
}

export function waterComplete(
  day: Pick<PondDay, "clarity" | "color" | "string_algae" | "debris">,
): boolean {
  return (
    day.clarity != null &&
    Boolean(day.color?.trim()) &&
    day.string_algae != null &&
    day.debris != null
  );
}

export function productTaken(day: PondDay, product: ProductId): boolean {
  return day.steps_taken.products.some((entry) => entry.product === product);
}

export function stepDone(step: AdvisedStep, day: PondDay): boolean {
  switch (step.id) {
    case "skim":
      return day.steps_taken.skim;
    case "skimmer":
      return day.steps_taken.skimmer;
    case "scrub":
      return day.steps_taken.scrub;
    case "backwash":
      return day.steps_taken.backwash;
    case "water_replaced":
      return day.steps_taken.water_replaced;
    case "leave":
      return day.steps_taken.left_alone;
    case "test_7in1":
      return test7Complete(day);
    case "test_phosphate":
      return phosphateComplete(day);
    case "green_clean":
    case "clarity_max":
    case "phosphate_remover":
    case "dechlorinator":
      return productTaken(day, step.id);
    default:
      return false;
  }
}

export function savedAmount(
  memory: ProductMemory[],
  product: ProductId,
): string | undefined {
  const amount = memory.find((item) => item.product === product)?.amount?.trim();
  return amount || undefined;
}

export function toSaveInput(day: PondDay, memoryUpdates: MemoryUpdate[]): SaveDayInput {
  return {
    phoenix_date: day.phoenix_date,
    clarity: day.clarity,
    color: day.color,
    string_algae: day.string_algae,
    debris: day.debris,
    chlorine: day.chlorine,
    nitrate: day.nitrate,
    nitrite: day.nitrite,
    alkalinity: day.alkalinity,
    ph: day.ph,
    phosphate: day.phosphate,
    phosphate_band: day.phosphate_band,
    product_status: day.product_status,
    steps_taken: day.steps_taken,
    note: day.note,
    memory_updates: memoryUpdates,
  };
}

export function isStatusAnswer(value: unknown): value is ProductStatusAnswer {
  return value === "still_active" || value === "finished";
}
