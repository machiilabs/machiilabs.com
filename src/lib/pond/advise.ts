import { daysBetween, formatAgo, formatShortDate } from "@/lib/pond/dates";
import {
  phosphateIsAbove,
  phosphateKnown,
  phosphatePpm,
  productTaken,
  savedAmount,
  stepDone,
  test7Complete,
  waterComplete,
} from "@/lib/pond/day";
import {
  PRODUCT_LABEL,
  TEST_FIELDS,
  type Advice,
  type AdvisedStep,
  type PondDay,
  type PondQuestion,
  type ProductId,
  type ProductMemory,
  type RecapLine,
  type TestAsk,
} from "@/lib/pond/types";

/**
 * One pond in Phoenix, about 500 gallons, no fish.
 * Granite waterfall, river rocks, Pond Shield epoxy over former bare cement.
 * The Pond Shield on the walls is charcoal gray. Clear water shows that gray.
 * 3/4 hp pump, 50 lb Hayward sand filter.
 * A backwash lately replaces about a third to half of the water.
 *
 * Prime directives, both required:
 * - No harm to wildlife that drinks here (squirrels, birds, reptiles,
 *   insects — mostly bees — and cats, wild and domestic).
 * - Keep the water as clear and as free of algae as possible.
 *   String algae is the main problem.
 *
 * Never invent a dose or a retreatment interval. Never invent a test
 * threshold. On the freshwater phosphate card, 0.0 ppm is the low swatch.
 * A higher swatch is above it. A 7-in-1 or phosphate reading is an input,
 * and only when a dose needs one that is not already current.
 */

const TREATMENT_PRODUCTS = [
  "green_clean",
  "clarity_max",
  "phosphate_remover",
] as const satisfies readonly ProductId[];

type DoseState = "none" | "in_interval" | "interval_elapsed" | "unspecified";

function pastDays(history: PondDay[], today: string): PondDay[] {
  return history.filter((day) => day.phoenix_date < today);
}

function mostRecent(days: PondDay[], pred: (day: PondDay) => boolean): PondDay | null {
  let best: PondDay | null = null;
  for (const day of days) {
    if (!pred(day)) continue;
    if (!best || day.phoenix_date > best.phoenix_date) best = day;
  }
  return best;
}

function lastUse(
  days: PondDay[],
  product: ProductId,
): { date: string; amount: string | null } | null {
  const day = mostRecent(days, (item) => productTaken(item, product));
  if (!day) return null;
  const entry = day.steps_taken.products.find((item) => item.product === product);
  return { date: day.phoenix_date, amount: entry?.amount?.trim() || null };
}

function doseState(
  days: PondDay[],
  today: string,
  product: ProductId,
  memory: ProductMemory[],
): DoseState {
  const last = lastUse(days, product);
  if (!last) return "none";
  const interval = memory.find((item) => item.product === product)?.interval_days;
  if (interval && interval > 0) {
    return daysBetween(last.date, today) >= interval ? "interval_elapsed" : "in_interval";
  }
  return "unspecified";
}

function canDose(
  day: PondDay,
  history: PondDay[],
  product: ProductId,
  memory: ProductMemory[],
): "yes" | "no" | "ask" {
  if (productTaken(day, product)) return "yes";
  const state = doseState(history, day.phoenix_date, product, memory);
  if (state === "none" || state === "interval_elapsed") return "yes";
  if (state === "in_interval") return "no";
  const answer = day.product_status[product];
  if (answer === "finished") return "yes";
  if (answer === "still_active") return "no";
  return "ask";
}

function withToday(day: PondDay, history: PondDay[]): PondDay[] {
  return [...history.filter((item) => item.phoenix_date < day.phoenix_date), day];
}

function happenedAfter(testDate: string, eventDate: string | null, today: string): boolean {
  if (!eventDate) return false;
  if (eventDate > testDate) return true;
  return eventDate === testDate && eventDate < today;
}

function freshStrip(day: PondDay, history: PondDay[]): PondDay | null {
  const days = withToday(day, history);
  const tested = mostRecent(days, test7Complete);
  if (!tested) return null;
  const today = day.phoenix_date;
  const backwash = mostRecent(days, (item) => item.steps_taken.backwash)?.phoenix_date ?? null;
  const green = mostRecent(days, (item) => productTaken(item, "green_clean"))?.phoenix_date ?? null;
  const clarity = mostRecent(days, (item) => productTaken(item, "clarity_max"))?.phoenix_date ?? null;
  const waterChangeDue = backwashDue(history, today) && !day.steps_taken.backwash;
  if (waterChangeDue && tested.phoenix_date < today) return null;
  if (happenedAfter(tested.phoenix_date, backwash, today)) return null;
  if (happenedAfter(tested.phoenix_date, green, today)) return null;
  if (happenedAfter(tested.phoenix_date, clarity, today)) return null;
  return tested;
}

function freshPhosphate(day: PondDay, history: PondDay[]): PondDay | null {
  const days = withToday(day, history);
  const tested = mostRecent(days, phosphateKnown);
  if (!tested) return null;
  const today = day.phoenix_date;
  const backwash = mostRecent(days, (item) => item.steps_taken.backwash)?.phoenix_date ?? null;
  const remover =
    mostRecent(days, (item) => productTaken(item, "phosphate_remover"))?.phoenix_date ?? null;
  const waterChangeDue = backwashDue(history, today) && !day.steps_taken.backwash;
  if (waterChangeDue && tested.phoenix_date < today) return null;
  if (happenedAfter(tested.phoenix_date, backwash, today)) return null;
  if (happenedAfter(tested.phoenix_date, remover, today)) return null;
  return tested;
}

function wantsProduct(day: PondDay, history: PondDay[], product: ProductId): boolean {
  if (product === "green_clean") {
    return day.string_algae === "some" || day.string_algae === "heavy";
  }
  if (product === "clarity_max") {
    return day.clarity === "cloudy" || day.clarity === "murky";
  }
  if (product === "phosphate_remover") {
    const tested = freshPhosphate(day, history);
    return tested != null && phosphateIsAbove(tested);
  }
  return false;
}

function readingNote(label: string, when: string, today: string): string {
  if (when === today) return "";
  return ` ${label} from ${formatShortDate(when)}.`;
}

function productStep(
  product: ProductId,
  detail: string,
  memory: ProductMemory[],
): AdvisedStep {
  const step: AdvisedStep = {
    id: product,
    label: PRODUCT_LABEL[product],
    detail,
    product,
  };
  const amount = savedAmount(memory, product);
  if (amount) step.amount = amount;
  return step;
}

function backwashDue(history: PondDay[], today: string): boolean {
  const last = mostRecent(history, (day) => day.steps_taken.backwash);
  if (!last) return false;
  return daysBetween(last.phoenix_date, today) >= 7;
}

function buildChecklist(
  day: PondDay,
  history: PondDay[],
  memory: ProductMemory[],
): { items: AdvisedStep[]; ask: TestAsk } {
  const items: AdvisedStep[] = [];
  const algae = day.string_algae === "some" || day.string_algae === "heavy";
  const cloudy = day.clarity === "cloudy" || day.clarity === "murky";
  const debris = day.debris === "light" || day.debris === "heavy";
  const due = backwashDue(history, day.phoenix_date);
  const showBackwash = due || day.steps_taken.backwash;
  const strip = freshStrip(day, history);
  const phosphateReading = freshPhosphate(day, history);

  if (debris || day.steps_taken.skim) {
    items.push({
      id: "skim",
      label: "Skim",
      detail: "Lift debris off the surface.",
    });
  }
  if (debris || day.steps_taken.skimmer) {
    items.push({
      id: "skimmer",
      label: "Empty the skimmer",
      detail: "Empty the skimmer basket.",
    });
  }
  if (algae || day.steps_taken.scrub) {
    items.push({
      id: "scrub",
      label: "Scrub string algae",
      detail: "Pull string algae off the granite waterfall and river rocks.",
    });
  }

  if (showBackwash) {
    const last = mostRecent(history, (item) => item.steps_taken.backwash);
    items.push({
      id: "backwash",
      label: "Backwash",
      detail: last
        ? "About seven days since the last one. A backwash lately replaces about a third to half of the water."
        : "Logged on this card. A backwash replaces about a third to half of the water.",
    });
    items.push({
      id: "water_replaced",
      label: "Replace the water",
      detail: "Refill what the backwash dumped.",
    });
    items.push(
      productStep(
        "dechlorinator",
        "Tap water goes in with the refill. Dechlorinate it before anything drinks.",
        memory,
      ),
    );
  }

  const green = canDose(day, history, "green_clean", memory);
  const clarity = canDose(day, history, "clarity_max", memory);
  const phosphate = canDose(day, history, "phosphate_remover", memory);
  const doseWantsStrip = (algae && green === "yes") || (cloudy && clarity === "yes");
  const doseWantsPhosphate = (algae || cloudy) && phosphate === "yes" && !phosphateReading;
  const days = withToday(day, history);
  const latestStrip = mostRecent(days, test7Complete);
  const latestPhosphate = mostRecent(days, phosphateKnown);
  const ask: TestAsk = {
    strip:
      doseWantsStrip && !strip
        ? latestStrip
          ? `The 7-in-1 from ${formatShortDate(latestStrip.phoenix_date)} is from before a backwash or a dose. A new reading is needed before the next dose.`
          : "A dose needs a 7-in-1 reading. Chlorine, nitrate, nitrite, alkalinity, and pH."
        : null,
    phosphate:
      doseWantsPhosphate && !phosphateReading
        ? latestPhosphate
          ? `The phosphate reading from ${formatShortDate(latestPhosphate.phoenix_date)} is from before a backwash or a dose. A new reading is needed before the next dose.`
          : "A phosphate reading decides whether to use the remover. This card’s low reading is 0.0 ppm."
        : null,
  };

  if ((algae && strip && green === "yes") || productTaken(day, "green_clean")) {
    const recorded = productTaken(day, "green_clean") && !algae;
    items.push(
      productStep(
        "green_clean",
        recorded
          ? "Already recorded on this card."
          : `String algae is visible, and no dose is still active.${strip ? readingNote("7-in-1", strip.phoenix_date, day.phoenix_date) : ""}`,
        memory,
      ),
    );
  }

  if ((cloudy && strip && clarity === "yes") || productTaken(day, "clarity_max")) {
    const recorded = productTaken(day, "clarity_max") && !cloudy;
    items.push(
      productStep(
        "clarity_max",
        recorded
          ? "Already recorded on this card."
          : `The water is cloudy, and no dose is still active.${strip ? readingNote("7-in-1", strip.phoenix_date, day.phoenix_date) : ""}`,
        memory,
      ),
    );
  }

  const phosphateHigh = wantsProduct(day, history, "phosphate_remover");
  if ((phosphateHigh && phosphate === "yes") || productTaken(day, "phosphate_remover")) {
    const recorded = productTaken(day, "phosphate_remover") && !phosphateHigh;
    items.push(
      productStep(
        "phosphate_remover",
        recorded
          ? "Already recorded on this card."
          : `Phosphate is above 0.0 ppm on this card, and no dose is still active.${phosphateReading ? readingNote("Phosphate", phosphateReading.phoenix_date, day.phoenix_date) : ""}`,
        memory,
      ),
    );
  }

  if (items.length === 0 && !ask.strip && !ask.phosphate) {
    items.push({
      id: "leave",
      label: "Leave it alone",
      detail: "Nothing else is due. Leave the pond alone.",
    });
  }

  return { items, ask };
}

function questionsFor(
  day: PondDay,
  history: PondDay[],
  memory: ProductMemory[],
  hasPhoto: boolean,
): PondQuestion[] {
  const questions: PondQuestion[] = [];
  if (!hasPhoto) {
    questions.push({
      kind: "photo",
      prompt:
        "A photo of the water. Clarity, color, string algae, and debris are read from it, and you can change any of them.",
    });
  }
  if (!waterComplete(day)) {
    questions.push({
      kind: "water",
      prompt: "Clarity, color, string algae, and debris.",
    });
  }
  if (questions.length > 0) return questions;

  for (const product of TREATMENT_PRODUCTS) {
    if (!wantsProduct(day, history, product)) continue;
    if (canDose(day, history, product, memory) !== "ask") continue;
    const last = lastUse(history, product);
    questions.push({
      kind: "product_active",
      product,
      lastDate: last?.date ?? day.phoenix_date,
      prompt: `Is the ${PRODUCT_LABEL[product]} from ${formatShortDate(last?.date ?? day.phoenix_date)} still active?`,
    });
  }
  return questions;
}

const CLARITY_TEXT = {
  clear: "clear",
  slightly_hazy: "slightly hazy",
  cloudy: "cloudy",
  murky: "murky",
} as const;

const ALGAE_TEXT = {
  none: "no string algae",
  some: "some string algae",
  heavy: "heavy string algae",
} as const;

const DEBRIS_TEXT = {
  none: "no debris",
  light: "a little debris",
  heavy: "a lot of debris",
} as const;

function waterText(day: PondDay): string | null {
  const parts: string[] = [];
  if (day.clarity) parts.push(CLARITY_TEXT[day.clarity]);
  if (day.color?.trim()) parts.push(day.color.trim());
  if (day.string_algae) parts.push(ALGAE_TEXT[day.string_algae]);
  if (day.debris) parts.push(DEBRIS_TEXT[day.debris]);
  return parts.length ? parts.join(", ") : null;
}

function testText(day: PondDay): string | null {
  const bits: string[] = [];
  for (const [key, label] of TEST_FIELDS) {
    const value = day[key]?.trim();
    if (value) bits.push(`${label} ${value}`);
  }
  if (day.phosphate?.trim()) {
    const reading = day.phosphate.trim();
    const shown =
      phosphatePpm(reading) != null && !/ppm/i.test(reading) ? `${reading} ppm` : reading;
    bits.push(
      phosphateIsAbove(day) ? `phosphate ${shown}, above 0.0` : `phosphate ${shown}`,
    );
  }
  return bits.length ? bits.join("; ") : null;
}

function doseLine(
  days: PondDay[],
  today: string,
  product: ProductId,
  memory: ProductMemory[],
): string | null {
  const last = lastUse(days, product);
  if (!last) return null;
  const when = `${formatShortDate(last.date)} (${formatAgo(daysBetween(last.date, today))})`;
  const amount = last.amount ? ` Amount ${last.amount}.` : " Amount not recorded.";
  if (product === "dechlorinator") {
    return `${PRODUCT_LABEL[product]} on ${when}.${amount}`;
  }
  const state = doseState(days, today, product, memory);
  const interval = memory.find((item) => item.product === product)?.interval_days;
  let tail = " No retreatment interval is saved.";
  if (state === "in_interval" && interval) {
    tail = ` Still inside the ${interval}-day interval you saved.`;
  } else if (state === "interval_elapsed" && interval) {
    tail = ` The ${interval}-day interval you saved has passed.`;
  }
  return `${PRODUCT_LABEL[product]} on ${when}.${amount}${tail}`;
}

function recapFor(days: PondDay[], today: string, memory: ProductMemory[]): RecapLine[] {
  if (days.length === 0) {
    return [{ label: "History", text: "No earlier days are in the log yet." }];
  }

  const backwash = mostRecent(days, (day) => day.steps_taken.backwash);
  const backwashText = backwash
    ? `${formatShortDate(backwash.phoenix_date)} (${formatAgo(daysBetween(backwash.phoenix_date, today))}).`
    : "None recorded.";

  const doses = (["green_clean", "clarity_max", "phosphate_remover", "dechlorinator"] as const)
    .map((product) => doseLine(days, today, product, memory))
    .filter((line): line is string => Boolean(line));

  const tested = mostRecent(days, (day) => testText(day) != null);
  const looked = mostRecent(days, (day) => waterText(day) != null);
  const latest = mostRecent(days, () => true);
  const open = latest
    ? latest.steps_advised.filter(
        (step) =>
          step.id !== "test_7in1" && step.id !== "test_phosphate" && !stepDone(step, latest),
      )
    : [];

  return [
    { label: "Last backwash", text: backwashText },
    {
      label: "Last doses",
      text: doses.length ? doses.join(" ") : "None recorded.",
    },
    {
      label: "Last test",
      text: tested
        ? `${formatShortDate(tested.phoenix_date)} — ${testText(tested)}.`
        : "None recorded.",
    },
    {
      label: "Water",
      text: looked
        ? `${formatShortDate(looked.phoenix_date)} — ${waterText(looked)}.`
        : "Nothing recorded.",
    },
    {
      label: "Still open",
      text: open.length
        ? open.map((step) => step.label).join(", ") + "."
        : "Nothing left open.",
    },
  ];
}

export function advise(input: {
  today: string;
  hasPhoto: boolean;
  day: PondDay;
  history: PondDay[];
  memory: ProductMemory[];
}): Advice {
  const history = pastDays(input.history, input.today);
  const day = { ...input.day, phoenix_date: input.today };
  const recap = recapFor(history, input.today, input.memory);
  const questions = questionsFor(day, history, input.memory, input.hasPhoto);
  const none: TestAsk = { strip: null, phosphate: null };
  if (questions.length > 0) {
    return { recap, questions, checklist: null, ask: none };
  }
  const built = buildChecklist(day, history, input.memory);
  return {
    recap,
    questions: [],
    checklist: built.items,
    ask: built.ask,
  };
}
