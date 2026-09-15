import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col bg-ink text-snow">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background: `
            radial-gradient(90% 60% at 80% 0%, rgba(61, 111, 154, 0.28) 0%, transparent 55%),
            radial-gradient(70% 50% at 10% 90%, rgba(232, 160, 69, 0.1) 0%, transparent 50%),
            linear-gradient(165deg, #05080f 0%, #0a1220 50%, #081018 100%)
          `,
        }}
      />
      <SiteHeader />
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  );
}
