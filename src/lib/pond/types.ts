export const POND_TIMEZONE = "America/Phoenix";

export const PRODUCT_IDS = [
  "green_clean",
  "clarity_max",
  "phosphate_remover",
  "dechlorinator",
] as const;

export type ProductId = (typeof PRODUCT_IDS)[number];

export const PRODUCT_LABEL: Record<ProductId, string> = {
  green_clean: "Green Clean",
  clarity_max: "Clarity Max",
  phosphate_remover: "Microbe-Lift phosphate remover",
  dechlorinator: "Dechlorinator",
};

export const CLARITY_OPTIONS = [
  { id: "clear", label: "Clear" },
  { id: "slightly_hazy", label: "Slightly hazy" },
  { id: "cloudy", label: "Cloudy" },
  { id: "murky", label: "Murky" },
] as const;

export type WaterClarity = (typeof CLARITY_OPTIONS)[number]["id"];

export const ALGAE_OPTIONS = [
  { id: "none", label: "None" },
  { id: "some", label: "Some" },
  { id: "heavy", label: "Heavy" },
] as const;

export type StringAlgae = (typeof ALGAE_OPTIONS)[number]["id"];

export const DEBRIS_OPTIONS = [
  { id: "none", label: "None" },
  { id: "light", label: "A little" },
  { id: "heavy", label: "A lot" },
] as const;

export type DebrisLevel = (typeof DEBRIS_OPTIONS)[number]["id"];

export const PHOSPHATE_BANDS = [
  { id: "low", label: "In this kit’s low range" },
  { id: "above", label: "Above this kit’s low range" },
  { id: "unsure", label: "Not sure" },
] as const;

export type PhosphateBand = (typeof PHOSPHATE_BANDS)[number]["id"];

export type ProductStatusAnswer = "still_active" | "finished";

export type StepsTaken = {
  backwash: boolean;
  water_replaced: boolean;
  scrub: boolean;
  skim: boolean;
  skimmer: boolean;
  left_alone: boolean;
  products: { product: ProductId; amount: string }[];
  other: string;
};

export type AdvisedStepId =
  | "skim"
  | "skimmer"
  | "scrub"
  | "backwash"
  | "water_replaced"
  | "test_7in1"
  | "test_phosphate"
  | ProductId
  | "leave";

export type AdvisedStep = {
  id: AdvisedStepId;
  label: string;
  detail?: string;
  product?: ProductId;
  /** Present only when Paul has already saved an amount. */
  amount?: string;
};

export type PondDay = {
  phoenix_date: string;
  photo_path: string | null;
  clarity: WaterClarity | null;
  color: string | null;
  string_algae: StringAlgae | null;
  debris: DebrisLevel | null;
  chlorine: string | null;
  nitrate: string | null;
  nitrite: string | null;
  alkalinity: string | null;
  ph: string | null;
  phosphate: string | null;
  phosphate_band: PhosphateBand | null;
  product_status: Partial<Record<ProductId, ProductStatusAnswer>>;
  steps_advised: AdvisedStep[];
  steps_taken: StepsTaken;
  note: string | null;
};

export type ProductMemory = {
  product: ProductId;
  amount: string | null;
  interval_days: number | null;
};

export type MemoryUpdate = {
  product: ProductId;
  amount?: string | null;
  interval_days?: number | null;
};

export type PondQuestion =
  | { kind: "photo"; prompt: string }
  | { kind: "water"; prompt: string }
  | {
      kind: "product_active";
      product: ProductId;
      prompt: string;
      lastDate: string;
    };

export type RecapLine = { label: string; text: string };

export type TestAsk = {
  /** Set when a dose needs a 7-in-1 reading that is not already on record. */
  strip: string | null;
  /** Set when a dose needs a phosphate reading that is not already on record. */
  phosphate: string | null;
};

export type Advice = {
  recap: RecapLine[];
  questions: PondQuestion[];
  checklist: AdvisedStep[] | null;
  ask: TestAsk;
};

export type SaveResult =
  | { ok: true; memory: ProductMemory[] }
  | { ok: false; temporary: boolean; error: string };

export type SaveDayInput = {
  phoenix_date: string;
  clarity: WaterClarity | null;
  color: string | null;
  string_algae: StringAlgae | null;
  debris: DebrisLevel | null;
  chlorine: string | null;
  nitrate: string | null;
  nitrite: string | null;
  alkalinity: string | null;
  ph: string | null;
  phosphate: string | null;
  phosphate_band: PhosphateBand | null;
  product_status: Partial<Record<ProductId, ProductStatusAnswer>>;
  steps_taken: StepsTaken;
  note: string | null;
  memory_updates: MemoryUpdate[];
};

export const TEST_FIELDS = [
  ["chlorine", "Chlorine"],
  ["nitrate", "Nitrate"],
  ["nitrite", "Nitrite"],
  ["alkalinity", "Alkalinity"],
  ["ph", "pH"],
] as const;

export type TestField = (typeof TEST_FIELDS)[number][0];
