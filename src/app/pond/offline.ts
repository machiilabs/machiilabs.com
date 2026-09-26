import type { PondDay, ProductMemory, SaveDayInput } from "@/lib/pond/types";

const DB_NAME = "machii-pond";
const DB_VERSION = 1;

export type OutboxItem = {
  revision: number;
  input: SaveDayInput;
  photoPending: boolean;
};

export type StoredPhoto = {
  blob: Blob;
  pending: boolean;
};

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      for (const name of ["days", "outbox", "photos", "memory"]) {
        if (!db.objectStoreNames.contains(name)) db.createObjectStore(name);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function txDone(tx: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
  });
}

export async function cacheLog(days: PondDay[], memory: ProductMemory[]) {
  const db = await openDb();
  try {
    const tx = db.transaction(["days", "memory"], "readwrite");
    const finished = txDone(tx);
    const dayStore = tx.objectStore("days");
    for (const day of days) dayStore.put(day, day.phoenix_date);
    tx.objectStore("memory").put(memory, "all");
    await finished;
  } finally {
    db.close();
  }
}

export async function enqueue(input: SaveDayInput, photoPending: boolean): Promise<number> {
  const db = await openDb();
  try {
    const tx = db.transaction("outbox", "readwrite");
    const finished = txDone(tx);
    const store = tx.objectStore("outbox");
    const revision = await new Promise<number>((resolve, reject) => {
      const getReq = store.get(input.phoenix_date);
      getReq.onerror = () => reject(getReq.error);
      getReq.onsuccess = () => {
        const current = getReq.result as OutboxItem | undefined;
        const next = (current?.revision ?? 0) + 1;
        const putReq = store.put(
          { revision: next, input, photoPending } satisfies OutboxItem,
          input.phoenix_date,
        );
        putReq.onerror = () => reject(putReq.error);
        putReq.onsuccess = () => resolve(next);
      };
    });
    await finished;
    return revision;
  } finally {
    db.close();
  }
}

export async function readOutbox(): Promise<OutboxItem[]> {
  const db = await openDb();
  try {
    const tx = db.transaction("outbox", "readonly");
    const finished = txDone(tx);
    const rows = await new Promise<OutboxItem[]>((resolve, reject) => {
      const request = tx.objectStore("outbox").getAll();
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve((request.result as OutboxItem[]) ?? []);
    });
    await finished;
    return rows;
  } finally {
    db.close();
  }
}

export async function dropOutboxIfUnchanged(date: string, revision: number) {
  const db = await openDb();
  try {
    const tx = db.transaction("outbox", "readwrite");
    const finished = txDone(tx);
    const store = tx.objectStore("outbox");
    await new Promise<void>((resolve, reject) => {
      const getReq = store.get(date);
      getReq.onerror = () => reject(getReq.error);
      getReq.onsuccess = () => {
        const current = getReq.result as OutboxItem | undefined;
        if (!current || current.revision !== revision) {
          resolve();
          return;
        }
        const deleteReq = store.delete(date);
        deleteReq.onerror = () => reject(deleteReq.error);
        deleteReq.onsuccess = () => resolve();
      };
    });
    await finished;
  } finally {
    db.close();
  }
}

export async function writePhoto(date: string, blob: Blob, pending: boolean) {
  const db = await openDb();
  try {
    const tx = db.transaction("photos", "readwrite");
    const finished = txDone(tx);
    tx.objectStore("photos").put({ blob, pending } satisfies StoredPhoto, date);
    await finished;
  } finally {
    db.close();
  }
}

export async function readPhoto(date: string): Promise<StoredPhoto | null> {
  const db = await openDb();
  try {
    const tx = db.transaction("photos", "readonly");
    const finished = txDone(tx);
    const row = await new Promise<StoredPhoto | null>((resolve, reject) => {
      const request = tx.objectStore("photos").get(date);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve((request.result as StoredPhoto | undefined) ?? null);
    });
    await finished;
    return row;
  } finally {
    db.close();
  }
}

export async function markPhotoSynced(date: string) {
  const db = await openDb();
  try {
    const tx = db.transaction("photos", "readwrite");
    const finished = txDone(tx);
    const store = tx.objectStore("photos");
    await new Promise<void>((resolve, reject) => {
      const getReq = store.get(date);
      getReq.onerror = () => reject(getReq.error);
      getReq.onsuccess = () => {
        const row = getReq.result as StoredPhoto | undefined;
        if (!row) {
          resolve();
          return;
        }
        const putReq = store.put({ blob: row.blob, pending: false } satisfies StoredPhoto, date);
        putReq.onerror = () => reject(putReq.error);
        putReq.onsuccess = () => resolve();
      };
    });
    await finished;
  } finally {
    db.close();
  }
}

export function registerPondWorker() {
  if (process.env.NODE_ENV !== "production") return;
  if (!("serviceWorker" in navigator)) return;
  void navigator.serviceWorker.register("/pond-sw.js", { scope: "/pond" }).catch(() => {
    // The page still works online if the worker does not install.
  });
}
