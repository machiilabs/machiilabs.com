import type { Metadata } from "next";
import { archivo, chakraPetch, sora, spaceGrotesk, specialElite } from "../fonts/sample-fonts";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Font sample",
  robots: { index: false, follow: false },
};


const samples = [
  {
    name: "Special Elite",
    note: "Grungy typewriter",
    className: specialElite.className,
  },
  {
    name: "Space Grotesk",
    note: "Aerospace geometric",
    className: spaceGrotesk.className,
  },
  {
    name: "Chakra Petch",
    note: "Technical / angular",
    className: chakraPetch.className,
  },
  {
    name: "Archivo",
    note: "Industrial sturdy",
    className: archivo.className,
  },
  {
    name: "Sora",
    note: "Modern geometric",
    className: sora.className,
  },
] as const;

export default function FontSamplePage() {
  return (
    <div className="min-h-dvh bg-ink text-snow">
      <SiteHeader />
      <div className="mx-auto w-full max-w-4xl px-6 py-12 sm:px-10">
        <h1 className="text-2xl font-semibold tracking-tight">
          Display font samples
        </h1>
        <p className="mt-2 text-fog">
          Same string in each candidate. Inter is the live display face.
        </p>

        <ul className="mt-12 space-y-14">
          {samples.map((sample) => (
            <li key={sample.name} className="border-t border-white/10 pt-8">
              <p className="text-xs font-semibold tracking-[0.2em] text-fog uppercase">
                {sample.name}
                <span className="ml-3 font-normal normal-case tracking-normal text-fog/70">
                  {sample.note}
                </span>
              </p>
              <p
                className={`${sample.className} mt-4 text-[clamp(2.5rem,10vw,5.5rem)] leading-[0.95] font-bold tracking-tight`}
              >
                Mach&nbsp;II Labs
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
