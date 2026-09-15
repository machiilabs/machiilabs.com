import Link from "next/link";
import type { ReactNode } from "react";
import { MachiiLogo } from "@/components/machii-logo";

const PRODUCT_LINKS = {
  skagway: [
    { id: "skagway", href: "/skagway", label: "Skagway" },
    { id: "manual", href: "/skagway/manual", label: "Manual" },
  ],
  flasher: [
    { id: "flasher", href: "/flasher", label: "15CE Flasher" },
    { id: "flasher-guide", href: "/flasher/guide", label: "Install help" },
  ],
} as const;

export type SiteNavProduct = keyof typeof PRODUCT_LINKS | "lab";

export type SiteNavActive =
  | (typeof PRODUCT_LINKS)["skagway"][number]["id"]
  | (typeof PRODUCT_LINKS)["flasher"][number]["id"]
  | "home"
  | "privacy";

type SiteHeaderProps = {
  product?: SiteNavProduct;
  tone?: "dark" | "light";
  active?: SiteNavActive;
  bordered?: boolean;
  /** Extra top padding for hero pages (home, Skagway landing). */
  hero?: boolean;
  maxWidth?: "3xl" | "6xl" | "7xl";
  className?: string;
  contentClassName?: string;
  trailing?: ReactNode;
};

const maxWidthClass = {
  "3xl": "max-w-3xl",
  "6xl": "max-w-6xl",
  "7xl": "max-w-7xl",
} as const;

export function SiteHeader({
  product = "lab",
  tone = "dark",
  active,
  bordered = true,
  hero = false,
  maxWidth = "6xl",
  className = "",
  contentClassName = "",
  trailing,
}: SiteHeaderProps) {
  const isLight = tone === "light";
  const linkClass = isLight
    ? "text-[#4b5563] transition-colors hover:text-[#1a1a1a]"
    : "text-fog transition-colors hover:text-snow";
  const linkActiveClass = isLight
    ? "font-semibold text-[#1a1a1a]"
    : "font-semibold text-snow";
  const navLinks = product === "lab" ? [] : PRODUCT_LINKS[product];

  return (
    <header
      className={[
        bordered
          ? isLight
            ? "border-b border-[#e5e7eb] bg-white"
            : "border-b border-white/5"
          : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div
        className={[
          "mx-auto flex w-full items-center justify-between gap-4 px-6 sm:px-10",
          maxWidthClass[maxWidth],
          hero ? "pt-8 pb-4" : "py-4",
          contentClassName,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="flex min-w-0 flex-wrap items-center gap-x-5 gap-y-2">
          <MachiiLogo tone={isLight ? "light" : "dark"} />
          {navLinks.length > 0 ? (
            <nav
              aria-label={
                product === "skagway" ? "Skagway" : "15CE Flasher"
              }
              className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  className={
                    active === link.id ? linkActiveClass : linkClass
                  }
                  aria-current={active === link.id ? "page" : undefined}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          ) : null}
        </div>

        <div className="flex shrink-0 items-center gap-5 text-sm">
          {trailing}
          <a href="mailto:support@machiilabs.com" className={linkClass}>
            Support
          </a>
        </div>
      </div>
    </header>
  );
}
