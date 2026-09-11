const LINK_CLASS =
  "font-medium text-[#1d4ed8] underline-offset-2 hover:underline";

export function PogoCableLinks() {
  return (
    <>
      <a
        href="https://www.thecalculatorstore.com/p/data-cable-for-hp-calculators"
        target="_blank"
        rel="noopener noreferrer"
        className={LINK_CLASS}
      >
        The Calculator Store
      </a>
      {" or "}
      <a
        href="https://commerce.hpcalc.org/usbpogo.php"
        target="_blank"
        rel="noopener noreferrer"
        className={LINK_CLASS}
      >
        hpcalc.org
      </a>
    </>
  );
}
