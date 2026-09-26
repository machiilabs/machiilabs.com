import { GateForm } from "@/app/pond/gate-form";
import { PondApp } from "@/app/pond/pond-app";
import { loadPondLog } from "@/lib/pond/db";
import { isPondUnlocked } from "@/lib/pond/gate";

export const dynamic = "force-dynamic";

function PondMessage({ title, body }: { title: string; body: string }) {
  return (
    <main className="mx-auto flex min-h-full w-full max-w-lg flex-col justify-center px-4 py-10">
      <h1 className="font-display text-3xl font-bold tracking-tight">{title}</h1>
      <p className="mt-3 text-sm leading-6 text-fog">{body}</p>
    </main>
  );
}

export default async function PondPage() {
  if (!process.env.POND_PASSPHRASE) {
    return <PondMessage title="Pond" body="This log isn’t available." />;
  }
  if (!(await isPondUnlocked())) {
    return <GateForm />;
  }
  let log: Awaited<ReturnType<typeof loadPondLog>> | null = null;
  try {
    log = await loadPondLog();
  } catch (err) {
    console.error("pond load", err instanceof Error ? err.message : "error");
  }
  if (!log) {
    return <PondMessage title="Pond" body="The pond log isn’t ready yet." />;
  }
  return <PondApp initial={log} />;
}
