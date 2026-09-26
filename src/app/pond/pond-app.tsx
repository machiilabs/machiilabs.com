"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { savePondDay } from "@/app/pond/actions";
import {
  cacheLog,
  dropOutboxIfUnchanged,
  enqueue,
  markPhotoSynced,
  readOutbox,
  readPhoto,
  registerPondWorker,
  writePhoto,
} from "@/app/pond/offline";
import { advise } from "@/lib/pond/advise";
import { formatPhoenixDate, formatShortDate, phoenixToday } from "@/lib/pond/dates";
import { blankDay, productTaken, stepDone, toSaveInput } from "@/lib/pond/day";
import {
  ALGAE_OPTIONS,
  CLARITY_OPTIONS,
  DEBRIS_OPTIONS,
  PHOSPHATE_BANDS,
  PRODUCT_LABEL,
  TEST_FIELDS,
  type AdvisedStep,
  type MemoryUpdate,
  type PondDay,
  type ProductId,
  type ProductMemory,
  type ProductStatusAnswer,
  type SaveDayInput,
  type StepsTaken,
} from "@/lib/pond/types";

type InitialLog = {
  today: string;
  days: PondDay[];
  memory: ProductMemory[];
};

const FIELD =
  "mt-2 w-full rounded-md border border-white/15 bg-ink-elevated px-3 py-3 text-base text-snow";
const CHOICE_ON =
  "min-h-11 rounded-full border border-afterburn bg-white/10 px-3 text-sm font-medium text-snow";
const CHOICE_OFF = "min-h-11 rounded-full border border-white/15 px-3 text-sm text-fog";
const TREATMENTS = new Set<ProductId>(["green_clean", "clarity_max", "phosphate_remover"]);

function seed(initial: InitialLog): Record<string, PondDay> {
  const drafts: Record<string, PondDay> = {};
  for (const day of initial.days) drafts[day.phoenix_date] = day;
  if (!drafts[initial.today]) drafts[initial.today] = blankDay(initial.today);
  return drafts;
}

function applyInput(day: PondDay, input: SaveDayInput): PondDay {
  return {
    ...day,
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
    steps_taken: input.steps_taken,
    note: input.note,
  };
}

function withProduct(steps: StepsTaken, product: ProductId, amount: string | null): StepsTaken {
  const products = steps.products.filter((item) => item.product !== product);
  if (amount?.trim()) products.push({ product, amount: amount.trim() });
  return { ...steps, products };
}

function daySummary(day: PondDay): string {
  const bits: string[] = [];
  if (day.clarity === "clear") bits.push("clear");
  if (day.clarity === "slightly_hazy") bits.push("slightly hazy");
  if (day.clarity === "cloudy") bits.push("cloudy");
  if (day.clarity === "murky") bits.push("murky");
  if (day.string_algae === "some" || day.string_algae === "heavy") bits.push("string algae");
  if (day.steps_taken.backwash) bits.push("backwash");
  return bits.join(" · ") || "Opened";
}

async function compressPhoto(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  try {
    const maxEdge = 1280;
    const scale = Math.min(1, maxEdge / Math.max(bitmap.width, bitmap.height));
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("canvas");
    context.drawImage(bitmap, 0, 0, width, height);
    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob((result) => resolve(result), "image/jpeg", 0.72);
    });
    if (!blob) throw new Error("compress");
    return blob;
  } finally {
    bitmap.close();
  }
}

async function postPhoto(date: string, blob: Blob): Promise<boolean> {
  const body = new FormData();
  body.set("date", date);
  body.set("file", new File([blob], `${date}.jpg`, { type: "image/jpeg" }));
  const response = await fetch("/pond/photo", { method: "POST", body });
  if (!response.ok) return false;
  const json = (await response.json()) as { ok?: boolean };
  return json.ok === true;
}

export function PondApp({ initial }: { initial: InitialLog }) {
  const [today, setToday] = useState(initial.today);
  const [view, setView] = useState(initial.today);
  const [drafts, setDrafts] = useState(() => seed(initial));
  const [memory, setMemory] = useState(initial.memory);
  const [amounts, setAmounts] = useState<Record<string, string>>(() => {
    const next: Record<string, string> = {};
    for (const item of initial.memory) {
      if (item.amount) next[item.product] = item.amount;
    }
    for (const day of initial.days) {
      for (const product of day.steps_taken.products) {
        next[`${day.phoenix_date}:${product.product}`] = product.amount;
      }
    }
    return next;
  });
  const [intervals, setIntervals] = useState<Record<string, string>>(() => {
    const next: Record<string, string> = {};
    for (const item of initial.memory) {
      if (item.interval_days) next[item.product] = String(item.interval_days);
    }
    return next;
  });
  const [previews, setPreviews] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "queued" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [rowError, setRowError] = useState<ProductId | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const draftsRef = useRef(drafts);
  const tail = useRef<Promise<void>>(Promise.resolve());

  const draft = drafts[view] ?? blankDay(view);
  const isToday = view === today;

  const advice = useMemo(() => {
    if (!isToday) return null;
    return advise({
      today,
      hasPhoto: Boolean(draft.photo_path) || Boolean(previews[view]),
      day: draft,
      history: Object.values(drafts),
      memory,
    });
  }, [isToday, today, draft, drafts, memory, previews, view]);

  const putDraft = useCallback((next: PondDay) => {
    const updated = { ...draftsRef.current, [next.phoenix_date]: next };
    draftsRef.current = updated;
    setDrafts(updated);
  }, []);

  function amountFor(date: string, product: ProductId, saved?: string): string {
    const specific = amounts[`${date}:${product}`];
    if (specific !== undefined) return specific;
    if (amounts[product] !== undefined) return amounts[product];
    return saved ?? "";
  }

  async function persistNow(day: PondDay, updates: MemoryUpdate[]) {
    const input = toSaveInput(day, updates);
    const pendingPhoto = await readPhoto(day.phoenix_date);
    const photoPending = Boolean(pendingPhoto?.pending);
    setStatus("saving");
    setError(null);
    const revision = await enqueue(input, photoPending);
    if (!navigator.onLine) {
      setStatus("queued");
      return;
    }
    try {
      if (photoPending && pendingPhoto) {
        const uploaded = await postPhoto(day.phoenix_date, pendingPhoto.blob);
        if (!uploaded) {
          setStatus("queued");
          return;
        }
        await markPhotoSynced(day.phoenix_date);
        const current = draftsRef.current[day.phoenix_date] ?? day;
        putDraft({ ...current, photo_path: `${day.phoenix_date}.jpg` });
      }
      const result = await savePondDay(input);
      if (!result.ok) {
        if (result.temporary) setStatus("queued");
        else {
          setStatus("error");
          setError(result.error);
        }
        return;
      }
      setMemory(result.memory);
      await dropOutboxIfUnchanged(day.phoenix_date, revision);
      setStatus("saved");
    } catch {
      setStatus("queued");
    }
  }

  function persist(day: PondDay, updates: MemoryUpdate[]) {
    const run = tail.current.then(() => persistNow(day, updates));
    tail.current = run.then(
      () => undefined,
      () => undefined,
    );
    return run;
  }

  const flush = useCallback(async () => {
    const run = tail.current.then(async () => {
      if (!navigator.onLine) {
        setStatus("queued");
        return;
      }
      const items = await readOutbox();
      if (items.length === 0) return;
      for (const item of items) {
        if (item.photoPending) {
          const photo = await readPhoto(item.input.phoenix_date);
          if (photo?.pending) {
            const uploaded = await postPhoto(item.input.phoenix_date, photo.blob);
            if (!uploaded) {
              setStatus("queued");
              return;
            }
            await markPhotoSynced(item.input.phoenix_date);
            const current =
              draftsRef.current[item.input.phoenix_date] ?? blankDay(item.input.phoenix_date);
            putDraft({ ...current, photo_path: `${item.input.phoenix_date}.jpg` });
          }
        }
        const result = await savePondDay(item.input);
        if (!result.ok) {
          setStatus(result.temporary ? "queued" : "error");
          if (!result.temporary) setError(result.error);
          return;
        }
        setMemory(result.memory);
        await dropOutboxIfUnchanged(item.input.phoenix_date, item.revision);
      }
      setStatus("saved");
    });
    tail.current = run.then(
      () => undefined,
      () => undefined,
    );
    return run;
  }, [putDraft]);

  useEffect(() => {
    let cancelled = false;
    registerPondWorker();
    void (async () => {
      try {
        await cacheLog(initial.days, initial.memory);
        const queued = await readOutbox();
        if (cancelled) return;
        if (queued.length > 0) {
          setDrafts((current) => {
            const next = { ...current };
            for (const item of queued) {
              const base = next[item.input.phoenix_date] ?? blankDay(item.input.phoenix_date);
              next[item.input.phoenix_date] = applyInput(base, item.input);
            }
            draftsRef.current = next;
            return next;
          });
          setStatus("queued");
        }
        const live = phoenixToday();
        if (!cancelled && live !== initial.today) {
          setToday(live);
          setView(live);
          setDrafts((current) => {
            if (current[live]) return current;
            const next = { ...current, [live]: blankDay(live) };
            draftsRef.current = next;
            return next;
          });
        }
        if (navigator.onLine && queued.length > 0) await flush();
      } catch {
        // Private browsing can block IndexedDB. Online saves still go to the server.
      }
    })();
    function onOnline() {
      void flush();
    }
    window.addEventListener("online", onOnline);
    return () => {
      cancelled = true;
      window.removeEventListener("online", onOnline);
    };
  }, [flush, initial.days, initial.memory, initial.today]);

  function edit(partial: Partial<PondDay>) {
    const current = draftsRef.current[view] ?? blankDay(view);
    putDraft({ ...current, ...partial });
  }

  function commit(partial: Partial<PondDay> = {}) {
    const current = draftsRef.current[view] ?? blankDay(view);
    const next = { ...current, ...partial };
    putDraft(next);
    void persist(next, []);
  }

  function saveAmount(product: ProductId) {
    const current = draftsRef.current[view] ?? blankDay(view);
    const value = amountFor(current.phoenix_date, product).trim();
    let next = current;
    if (productTaken(current, product)) {
      if (!value) return;
      next = { ...current, steps_taken: withProduct(current.steps_taken, product, value) };
      putDraft(next);
    }
    if (value) setAmounts((existing) => ({ ...existing, [product]: value }));
    void persist(next, [{ product, amount: value || null }]);
  }

  function saveInterval(product: ProductId, raw: string) {
    const current = draftsRef.current[view] ?? blankDay(view);
    const trimmed = raw.trim();
    if (!trimmed) {
      setMemory((existing) =>
        existing.map((item) =>
          item.product === product ? { ...item, interval_days: null } : item,
        ),
      );
      void persist(current, [{ product, interval_days: null }]);
      return;
    }
    const interval = Number(trimmed);
    if (!Number.isInteger(interval) || interval < 1 || interval > 365) return;
    setMemory((existing) => {
      const prev = existing.find((item) => item.product === product);
      return [
        ...existing.filter((item) => item.product !== product),
        { product, amount: prev?.amount ?? null, interval_days: interval },
      ];
    });
    void persist(current, [{ product, interval_days: interval }]);
  }

  async function onPhoto(file: File | null) {
    if (!file) return;
    setPhotoError(null);
    const current = draftsRef.current[view] ?? blankDay(view);
    let blob: Blob;
    try {
      blob = await compressPhoto(file);
    } catch {
      setPhotoError("Couldn’t read that photo. Try another one.");
      return;
    }
    if (blob.size > 1_500_000) {
      setPhotoError("That photo is still too large after compressing.");
      return;
    }
    const url = URL.createObjectURL(blob);
    setPreviews((existing) => {
      const previous = existing[current.phoenix_date];
      if (previous) URL.revokeObjectURL(previous);
      return { ...existing, [current.phoenix_date]: url };
    });
    try {
      await writePhoto(current.phoenix_date, blob, true);
    } catch {
      // The preview still works for this visit.
    }
    if (!navigator.onLine) {
      void persist(current, []);
      return;
    }
    const uploaded = await postPhoto(current.phoenix_date, blob);
    if (!uploaded) {
      void persist(current, []);
      return;
    }
    try {
      await markPhotoSynced(current.phoenix_date);
    } catch {
      // The server already has the file.
    }
    const latest = draftsRef.current[current.phoenix_date] ?? current;
    const next = { ...latest, photo_path: `${current.phoenix_date}.jpg` };
    putDraft(next);
    void persist(next, []);
  }

  function toggleTask(id: AdvisedStep["id"], checked: boolean) {
    const current = draftsRef.current[view] ?? blankDay(view);
    const steps = { ...current.steps_taken };
    if (id === "skim") steps.skim = checked;
    else if (id === "skimmer") steps.skimmer = checked;
    else if (id === "scrub") steps.scrub = checked;
    else if (id === "backwash") steps.backwash = checked;
    else if (id === "water_replaced") steps.water_replaced = checked;
    else if (id === "leave") steps.left_alone = checked;
    else return;
    const next = { ...current, steps_taken: steps };
    putDraft(next);
    void persist(next, []);
  }

  function toggleProduct(product: ProductId, checked: boolean, saved?: string) {
    const current = draftsRef.current[view] ?? blankDay(view);
    if (!checked) {
      const next = { ...current, steps_taken: withProduct(current.steps_taken, product, null) };
      putDraft(next);
      void persist(next, []);
      return;
    }
    const amount = amountFor(current.phoenix_date, product, saved).trim();
    if (!amount) {
      setRowError(product);
      return;
    }
    const next = { ...current, steps_taken: withProduct(current.steps_taken, product, amount) };
    putDraft(next);
    setAmounts((existing) => ({ ...existing, [product]: amount }));
    void persist(next, [{ product, amount }]);
  }

  function setProductStatus(product: ProductId, answer: ProductStatusAnswer) {
    const current = draftsRef.current[view] ?? blankDay(view);
    const next = {
      ...current,
      product_status: { ...current.product_status, [product]: answer },
    };
    putDraft(next);
    void persist(next, []);
  }

  function openDay(date: string) {
    setView(date);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const checklist = isToday ? (advice?.checklist ?? null) : draft.steps_advised;
  const photoSrc =
    previews[view] || (draft.photo_path ? `/pond/photo/${draft.phoenix_date}` : null);
  const earlier = Object.values(drafts)
    .filter((day) => day.phoenix_date < today)
    .sort((a, b) => (a.phoenix_date < b.phoenix_date ? 1 : -1));
  const statusText =
    status === "saving"
      ? "Saving…"
      : status === "saved"
        ? "Saved."
        : status === "queued"
          ? "On this phone. It will sync when you’re online."
          : status === "error"
            ? (error ?? "Couldn’t save.")
            : "";

  return (
    <main className="mx-auto w-full max-w-lg px-4 pt-6 pb-16">
      <header className="flex items-start justify-between gap-4">
        <div>
          <p className="font-display text-xs font-semibold tracking-[0.18em] text-afterburn uppercase">
            Phoenix day
          </p>
          <h1 className="mt-1 font-display text-3xl font-bold tracking-tight">
            {formatPhoenixDate(view)}
          </h1>
          {!isToday ? <p className="mt-1 text-sm text-fog">Earlier day</p> : null}
        </div>
        <a
          href="/pond/export"
          className="mt-1 shrink-0 text-sm text-fog underline decoration-white/20 underline-offset-4"
          onClick={(event) => {
            if (!navigator.onLine) {
              event.preventDefault();
              setStatus("error");
              setError("Download needs a connection. The server copy is the full log.");
            }
          }}
        >
          Download log
        </a>
      </header>

      {!isToday ? (
        <button
          type="button"
          onClick={() => openDay(today)}
          className="mt-4 text-sm text-afterburn-soft"
        >
          Back to today
        </button>
      ) : (
        <p className="mt-4 text-sm leading-6 text-fog">
          Squirrels, birds, reptiles, insects, and cats drink here. Keep the water clear, and
          don’t harm them.
        </p>
      )}

      {isToday && advice ? (
        <section className="mt-8" aria-label="Since last time">
          <h2 className="font-display text-lg font-semibold">Since last time</h2>
          <dl className="mt-3 space-y-3">
            {advice.recap.map((line) => (
              <div key={line.label}>
                <dt className="text-xs font-semibold tracking-wide text-fog uppercase">
                  {line.label}
                </dt>
                <dd className="mt-1 text-sm leading-6 text-snow">{line.text}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      {isToday && advice && advice.questions.length > 0 ? (
        <section className="mt-8" aria-label="Still needed">
          <h2 className="font-display text-lg font-semibold">Still needed</h2>
          <ul className="mt-3 space-y-4">
            {advice.questions.map((question) =>
              question.kind === "product_active" ? (
                <li key={question.product}>
                  <p className="text-sm leading-6">{question.prompt}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <button
                      type="button"
                      className={CHOICE_OFF}
                      onClick={() => setProductStatus(question.product, "still_active")}
                    >
                      Still active
                    </button>
                    <button
                      type="button"
                      className={CHOICE_OFF}
                      onClick={() => setProductStatus(question.product, "finished")}
                    >
                      Finished
                    </button>
                  </div>
                  <IntervalField
                    product={question.product}
                    value={intervals[question.product] ?? ""}
                    onChange={(value) =>
                      setIntervals((existing) => ({ ...existing, [question.product]: value }))
                    }
                    onBlur={(value) => saveInterval(question.product, value)}
                  />
                </li>
              ) : (
                <li key={question.kind} className="text-sm leading-6 text-snow">
                  {question.prompt}
                </li>
              ),
            )}
          </ul>
        </section>
      ) : null}

      <section className="mt-8" aria-label="What you see">
        <h2 className="font-display text-lg font-semibold">What you see</h2>
        <div className="mt-3">
          {photoSrc ? (
            // The photo is a private route. The image optimizer would fetch it without this cookie.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={photoSrc}
              alt={`Pond water on ${formatShortDate(draft.phoenix_date)}`}
              className="w-full rounded-md"
            />
          ) : null}
          <label
            htmlFor="pond-photo"
            className="mt-3 inline-flex min-h-11 items-center text-sm text-afterburn-soft"
          >
            {photoSrc ? "Replace photo" : "Add a photo"}
          </label>
          <input
            id="pond-photo"
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(event) => {
              const file = event.target.files?.[0] ?? null;
              event.target.value = "";
              void onPhoto(file);
            }}
          />
          {photoError ? <p className="mt-2 text-sm text-afterburn-soft">{photoError}</p> : null}
        </div>

        <ChoiceGroup
          label="Clarity"
          value={draft.clarity}
          options={CLARITY_OPTIONS}
          onChange={(clarity) => commit({ clarity })}
        />
        <label htmlFor="pond-color" className="mt-4 block text-sm text-fog">
          Color
        </label>
        <input
          id="pond-color"
          value={draft.color ?? ""}
          maxLength={80}
          onChange={(event) => edit({ color: event.target.value })}
          onBlur={(event) => commit({ color: event.target.value })}
          className={FIELD}
        />
        <ChoiceGroup
          label="String algae"
          value={draft.string_algae}
          options={ALGAE_OPTIONS}
          onChange={(string_algae) => commit({ string_algae })}
        />
        <ChoiceGroup
          label="Debris"
          value={draft.debris}
          options={DEBRIS_OPTIONS}
          onChange={(debris) => commit({ debris })}
        />

        <div id="pond-tests" className="mt-6">
          <h3 className="text-sm font-semibold text-snow">7-in-1 kit</h3>
          <p className="mt-1 text-sm leading-6 text-fog">
            Optional. Chlorine, nitrate, nitrite, alkalinity, and pH. A treatment waits until
            this test is filled in.
          </p>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {TEST_FIELDS.map(([key, label]) => (
              <div key={key}>
                <label htmlFor={`pond-${key}`} className="text-sm text-fog">
                  {label}
                </label>
                <input
                  id={`pond-${key}`}
                  value={draft[key] ?? ""}
                  maxLength={40}
                  autoComplete="off"
                  onChange={(event) => edit({ [key]: event.target.value })}
                  onBlur={(event) => commit({ [key]: event.target.value })}
                  className={FIELD}
                />
              </div>
            ))}
          </div>
        </div>

        <div id="pond-phosphate" className="mt-6">
          <h3 className="text-sm font-semibold text-snow">Phosphate kit</h3>
          <label htmlFor="pond-phosphate-reading" className="mt-3 block text-sm text-fog">
            Reading
          </label>
          <input
            id="pond-phosphate-reading"
            value={draft.phosphate ?? ""}
            maxLength={40}
            autoComplete="off"
            onChange={(event) => edit({ phosphate: event.target.value })}
            onBlur={(event) => commit({ phosphate: event.target.value })}
            className={FIELD}
          />
          <p className="mt-4 text-sm text-fog">Compared with this kit’s low range</p>
          <div className="mt-2 grid gap-2">
            {PHOSPHATE_BANDS.map((band) => (
              <button
                key={band.id}
                type="button"
                aria-pressed={draft.phosphate_band === band.id}
                onClick={() => commit({ phosphate_band: band.id })}
                className={draft.phosphate_band === band.id ? CHOICE_ON : CHOICE_OFF}
              >
                {band.label}
              </button>
            ))}
          </div>
        </div>

        <StatusNotes day={draft} />
      </section>

      {checklist && checklist.length > 0 ? (
        <section className="mt-8" aria-label="In this order">
          <h2 className="font-display text-lg font-semibold">In this order</h2>
          <ol className="mt-2">
            {checklist.map((step) => (
              <ChecklistRow
                key={step.id}
                step={step}
                done={stepDone(step, draft)}
                amount={
                  step.product
                    ? amountFor(draft.phoenix_date, step.product, step.amount)
                    : ""
                }
                interval={step.product ? (intervals[step.product] ?? "") : ""}
                rowError={rowError}
                onToggleTask={toggleTask}
                onToggleProduct={toggleProduct}
                onAmount={(product, value) => {
                  setAmounts((existing) => ({
                    ...existing,
                    [`${draft.phoenix_date}:${product}`]: value,
                  }));
                  setRowError(null);
                }}
                onAmountBlur={saveAmount}
                onInterval={(product, value) =>
                  setIntervals((existing) => ({ ...existing, [product]: value }))
                }
                onIntervalBlur={saveInterval}
              />
            ))}
          </ol>
        </section>
      ) : isToday ? null : (
        <p className="mt-8 text-sm text-fog">Nothing was advised on this card.</p>
      )}

      <label htmlFor="pond-other" className="mt-8 block text-sm text-fog">
        Anything else you did
      </label>
      <input
        id="pond-other"
        value={draft.steps_taken.other}
        maxLength={500}
        onChange={(event) => {
          const current = draftsRef.current[view] ?? draft;
          edit({ steps_taken: { ...current.steps_taken, other: event.target.value } });
        }}
        onBlur={(event) => {
          const current = draftsRef.current[view] ?? draft;
          commit({ steps_taken: { ...current.steps_taken, other: event.target.value } });
        }}
        className={FIELD}
      />

      <label htmlFor="pond-note" className="mt-4 block text-sm text-fog">
        Note
      </label>
      <textarea
        id="pond-note"
        value={draft.note ?? ""}
        maxLength={2000}
        rows={3}
        onChange={(event) => edit({ note: event.target.value })}
        onBlur={(event) => commit({ note: event.target.value })}
        className={FIELD}
      />

      <p className="mt-4 min-h-6 text-sm text-fog" aria-live="polite">
        {statusText}
      </p>

      <section className="mt-10" aria-label="Earlier days">
        <h2 className="font-display text-lg font-semibold">Earlier days</h2>
        {earlier.length === 0 ? (
          <p className="mt-3 text-sm text-fog">No earlier days yet.</p>
        ) : (
          <ul className="mt-2 border-t border-white/10">
            {earlier.map((day) => (
              <li key={day.phoenix_date} className="border-b border-white/10">
                <button
                  type="button"
                  onClick={() => openDay(day.phoenix_date)}
                  className="flex w-full flex-col items-start py-3 text-left"
                  aria-current={view === day.phoenix_date ? "true" : undefined}
                >
                  <span className="font-medium">{formatShortDate(day.phoenix_date)}</span>
                  <span className="text-sm text-fog">{daySummary(day)}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

function StatusNotes({ day }: { day: PondDay }) {
  const notes = (Object.entries(day.product_status) as [ProductId, ProductStatusAnswer][])
    .filter((entry) => entry[1])
    .map(([product, answer]) =>
      answer === "still_active"
        ? `${PRODUCT_LABEL[product]} marked still active`
        : `${PRODUCT_LABEL[product]} marked finished`,
    );
  if (notes.length === 0) return null;
  return (
    <ul className="mt-4 space-y-1 text-sm text-fog">
      {notes.map((note) => (
        <li key={note}>{note}</li>
      ))}
    </ul>
  );
}

function IntervalField({
  product,
  value,
  onChange,
  onBlur,
}: {
  product: ProductId;
  value: string;
  onChange: (value: string) => void;
  onBlur: (value: string) => void;
}) {
  const id = `interval-${product}`;
  return (
    <div className="mt-3">
      <label htmlFor={id} className="text-sm text-fog">
        Days before you use it again
      </label>
      <input
        id={id}
        inputMode="numeric"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onBlur={(event) => onBlur(event.target.value)}
        className={FIELD}
      />
    </div>
  );
}

function ChoiceGroup<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T | null;
  options: readonly { id: T; label: string }[];
  onChange: (id: T) => void;
}) {
  return (
    <div className="mt-4">
      <p className="text-sm text-fog">{label}</p>
      <div role="group" aria-label={label} className="mt-2 flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            aria-pressed={value === option.id}
            onClick={() => onChange(option.id)}
            className={value === option.id ? CHOICE_ON : CHOICE_OFF}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function ChecklistRow({
  step,
  done,
  amount,
  interval,
  rowError,
  onToggleTask,
  onToggleProduct,
  onAmount,
  onAmountBlur,
  onInterval,
  onIntervalBlur,
}: {
  step: AdvisedStep;
  done: boolean;
  amount: string;
  interval: string;
  rowError: ProductId | null;
  onToggleTask: (id: AdvisedStep["id"], checked: boolean) => void;
  onToggleProduct: (product: ProductId, checked: boolean, saved?: string) => void;
  onAmount: (product: ProductId, value: string) => void;
  onAmountBlur: (product: ProductId) => void;
  onInterval: (product: ProductId, value: string) => void;
  onIntervalBlur: (product: ProductId, value: string) => void;
}) {
  const test = step.id === "test_7in1" || step.id === "test_phosphate";
  return (
    <li className="border-b border-white/10 py-3">
      <div className="flex items-start gap-3">
        {test ? (
          <button
            type="button"
            onClick={() => {
              const target = step.id === "test_7in1" ? "pond-tests" : "pond-phosphate";
              document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "center" });
              document.getElementById(target)?.querySelector("input")?.focus();
            }}
            className="mt-0.5 text-left"
            aria-pressed={done}
          >
            <span className="text-afterburn" aria-hidden>
              {done ? "✓" : "○"}
            </span>
          </button>
        ) : (
          <input
            id={`step-${step.id}`}
            type="checkbox"
            checked={done}
            onChange={(event) => {
              if (step.product) onToggleProduct(step.product, event.target.checked, step.amount);
              else onToggleTask(step.id, event.target.checked);
            }}
            className="mt-1 size-5 accent-[var(--afterburn)]"
          />
        )}
        <div className="min-w-0 flex-1">
          {test ? (
            <p className="font-medium">{step.label}</p>
          ) : (
            <label htmlFor={`step-${step.id}`} className="font-medium">
              {step.label}
            </label>
          )}
          {step.detail ? <p className="mt-1 text-sm leading-6 text-fog">{step.detail}</p> : null}
          {step.product ? (
            <>
              <label htmlFor={`amount-${step.id}`} className="mt-3 block text-sm text-fog">
                Amount
              </label>
              <input
                id={`amount-${step.id}`}
                value={amount}
                maxLength={80}
                onChange={(event) => onAmount(step.product!, event.target.value)}
                onBlur={() => onAmountBlur(step.product!)}
                className={FIELD}
              />
              {rowError === step.product ? (
                <p className="mt-2 text-sm text-afterburn-soft">Type the amount you used.</p>
              ) : null}
              {TREATMENTS.has(step.product) ? (
                <IntervalField
                  product={step.product}
                  value={interval}
                  onChange={(value) => onInterval(step.product!, value)}
                  onBlur={(value) => onIntervalBlur(step.product!, value)}
                />
              ) : null}
            </>
          ) : null}
        </div>
      </div>
    </li>
  );
}
