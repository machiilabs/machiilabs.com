import assert from "node:assert/strict";
import { advise } from "../src/lib/pond/advise";
import { blankDay, emptySteps } from "../src/lib/pond/day";
import type { PondDay, ProductId, ProductMemory } from "../src/lib/pond/types";

const today = "2026-09-26";

function day(partial: Partial<PondDay> & { phoenix_date: string }): PondDay {
  return { ...blankDay(partial.phoenix_date), ...partial, phoenix_date: partial.phoenix_date };
}

function seen(partial: Partial<PondDay> = {}): Partial<PondDay> {
  return {
    clarity: "clear",
    color: "green",
    string_algae: "none",
    debris: "none",
    ...partial,
  };
}

function check(
  partial: Partial<PondDay>,
  history: PondDay[] = [],
  memory: ProductMemory[] = [],
  hasPhoto = true,
) {
  return advise({
    today,
    hasPhoto,
    day: day({ phoenix_date: today, ...partial }),
    history,
    memory,
  });
}

function ids(result: ReturnType<typeof check>): string[] {
  return (result.checklist ?? []).map((step) => step.id);
}

function dose(date: string, product: ProductId, amount: string | null = null): PondDay {
  const steps = emptySteps();
  if (amount) steps.products.push({ product, amount });
  else steps.products.push({ product, amount: "kept" });
  return day({ phoenix_date: date, steps_taken: steps });
}

const filled = {
  chlorine: "0",
  nitrate: "0",
  nitrite: "0",
  alkalinity: "80",
  ph: "7.6",
};

let empty = check({}, [], [], false);
assert.equal(empty.checklist, null);
assert.ok(empty.questions.some((question) => question.kind === "photo"));
assert.equal(empty.recap[0]?.text, "No earlier days are in the log yet.");

empty = check(seen(), [], [], false);
assert.equal(empty.checklist, null);
assert.ok(empty.questions.some((question) => question.kind === "photo"));

const water = check({}, [], [], true);
assert.equal(water.checklist, null);
assert.ok(water.questions.some((question) => question.kind === "water"));

const first = check(seen());
assert.deepEqual(ids(first), ["leave"]);
assert.ok(!ids(first).includes("backwash"));
assert.ok(!ids(first).includes("green_clean"));

const recentWash = day({
  phoenix_date: "2026-09-20",
  steps_taken: { ...emptySteps(), backwash: true },
});
const quiet = check(seen(), [recentWash]);
assert.deepEqual(ids(quiet), ["leave"]);
assert.equal(quiet.ask.strip, null);
assert.equal(quiet.ask.phosphate, null);

const dueWash = day({
  phoenix_date: "2026-09-19",
  steps_taken: { ...emptySteps(), backwash: true },
});
assert.ok(ids(check(seen(), [dueWash])).includes("backwash"));
assert.ok(ids(check(seen(), [dueWash])).includes("dechlorinator"));

const algae = check(seen({ string_algae: "some" }));
assert.ok(ids(algae).includes("scrub"));
assert.ok(!ids(algae).includes("test_7in1"));
assert.ok(!ids(algae).includes("test_phosphate"));
assert.ok(!ids(algae).includes("green_clean"));
assert.ok(algae.ask.strip);
assert.ok(algae.ask.phosphate);

const algaeTested = check(seen({ string_algae: "some", ...filled }));
const green = algaeTested.checklist?.find((step) => step.id === "green_clean");
assert.ok(green);
assert.equal(green?.amount, undefined);
assert.ok(!ids(algaeTested).includes("test_7in1"));
assert.ok(!ids(algaeTested).includes("backwash"));
assert.equal(algaeTested.ask.strip, null);

const remembered = check(seen({ string_algae: "some", ...filled }), [], [
  { product: "green_clean", amount: "the scoop he saved", interval_days: null },
]);
assert.equal(
  remembered.checklist?.find((step) => step.id === "green_clean")?.amount,
  "the scoop he saved",
);

const prior = dose("2026-09-24", "green_clean", "the scoop he saved");
const ask = check(seen({ string_algae: "some", ...filled }), [prior]);
assert.equal(ask.checklist, null);
assert.equal(ask.questions[0]?.kind, "product_active");
assert.ok(ask.recap.some((line) => line.text.includes("the scoop he saved")));
assert.ok(!ask.recap.some((line) => /\b\d+\s?(tsp|oz|ml|cup)/i.test(line.text)));

const finished = check(seen({ string_algae: "some", ...filled, product_status: { green_clean: "finished" } }), [
  prior,
]);
assert.ok(ids(finished).includes("green_clean"));

const held = check(seen({ string_algae: "some", ...filled, product_status: { green_clean: "still_active" } }), [
  prior,
]);
assert.ok(!ids(held).includes("green_clean"));

const intervalMemory: ProductMemory[] = [
  { product: "green_clean", amount: "the scoop he saved", interval_days: 7 },
];
const inside = check(seen({ string_algae: "some", ...filled }), [dose("2026-09-23", "green_clean", "the scoop he saved")], intervalMemory);
assert.equal(inside.questions.length, 0);
assert.ok(!ids(inside).includes("green_clean"));
assert.ok(inside.recap.some((line) => line.text.includes("7-day interval")));

const elapsed = check(seen({ string_algae: "some", ...filled }), [dose("2026-09-18", "green_clean", "the scoop he saved")], intervalMemory);
assert.ok(ids(elapsed).includes("green_clean"));

const phosphate = check(seen({ phosphate: "5.0" }));
assert.ok(ids(phosphate).includes("phosphate_remover"));
assert.equal(phosphate.checklist?.find((step) => step.id === "phosphate_remover")?.amount, undefined);
assert.equal(phosphate.ask.phosphate, null);
assert.ok(!ids(phosphate).includes("test_phosphate"));

const low = check(seen({ phosphate: "0.0" }));
assert.ok(!ids(low).includes("phosphate_remover"));
assert.equal(low.ask.phosphate, null);

const cloudy = check(seen({ clarity: "cloudy", ...filled }));
assert.ok(ids(cloudy).includes("clarity_max"));
assert.equal(cloudy.checklist?.find((step) => step.id === "clarity_max")?.amount, undefined);

const hazy = check(seen({ clarity: "slightly_hazy", ...filled }));
assert.ok(!ids(hazy).includes("clarity_max"));
assert.ok(!ids(hazy).includes("test_7in1"));
assert.equal(hazy.ask.strip, null);
assert.equal(hazy.ask.phosphate, null);

const wash = day({
  phoenix_date: "2026-09-20",
  steps_taken: { ...emptySteps(), backwash: true },
});
const earlierTest = day({
  phoenix_date: "2026-09-25",
  ...filled,
  phosphate: "5.0",
});
const reused = check(seen({ string_algae: "some" }), [earlierTest, wash]);
assert.ok(ids(reused).includes("green_clean"));
assert.ok(ids(reused).includes("phosphate_remover"));
assert.equal(reused.ask.strip, null);
assert.equal(reused.ask.phosphate, null);
assert.ok(reused.checklist?.find((step) => step.id === "green_clean")?.detail?.includes("Sep"));

const used = day({
  phoenix_date: "2026-09-25",
  ...filled,
  phosphate: "5.0",
  steps_taken: {
    ...emptySteps(),
    products: [
      { product: "green_clean", amount: "scoop" },
      { product: "phosphate_remover", amount: "scoop" },
    ],
  },
});
const again = check(
  seen({
    string_algae: "some",
    product_status: { green_clean: "finished", phosphate_remover: "finished" },
  }),
  [used, wash],
);
assert.ok(!ids(again).includes("green_clean"));
assert.ok(!ids(again).includes("phosphate_remover"));
assert.ok(again.ask.strip);
assert.ok(again.ask.phosphate);

const quietHigh = check(seen(), [earlierTest, wash]);
assert.ok(ids(quietHigh).includes("phosphate_remover"));
assert.equal(quietHigh.ask.strip, null);
assert.equal(quietHigh.ask.phosphate, null);

const debris = check(seen({ debris: "light" }), [recentWash]);
assert.deepEqual(ids(debris), ["skim", "skimmer"]);

const openDay = day({
  phoenix_date: "2026-09-25",
  steps_advised: [{ id: "skim", label: "Skim" }],
  steps_taken: emptySteps(),
});
const recap = check(seen(), [openDay, recentWash]);
assert.ok(recap.recap.some((line) => line.label === "Still open" && line.text.includes("Skim")));

console.log("pond advise checks passed");
