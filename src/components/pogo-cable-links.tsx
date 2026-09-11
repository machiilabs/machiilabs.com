import { headers } from "next/headers";

const CALCULATOR_STORE = {
  href: "https://www.thecalculatorstore.com/p/data-cable-for-hp-calculators",
  label: "The Calculator Store",
} as const;

const HPCALC = {
  href: "https://commerce.hpcalc.org/usbpogo.php",
  label: "hpcalc.org",
} as const;

const LINK_CLASS =
  "font-medium text-[#1d4ed8] underline-offset-2 hover:underline";

const NORTH_AMERICA = new Set(["US", "CA", "MX"]);

export async function PogoCableLinks() {
  const country = (await headers()).get("x-vercel-ip-country");
  const [first, second] = country && NORTH_AMERICA.has(country)
    ? [HPCALC, CALCULATOR_STORE]
    : [CALCULATOR_STORE, HPCALC];

  return (
    <>
      <a
        href={first.href}
        target="_blank"
        rel="noopener noreferrer"
        className={LINK_CLASS}
      >
        {first.label}
      </a>
      {" or "}
      <a
        href={second.href}
        target="_blank"
        rel="noopener noreferrer"
        className={LINK_CLASS}
      >
        {second.label}
      </a>
    </>
  );
}
