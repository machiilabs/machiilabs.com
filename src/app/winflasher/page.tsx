import { redirect } from "next/navigation";

/** Legacy URL — Windows download now lives on /flasher#windows */
export default function WinFlasherRedirectPage() {
  redirect("/flasher");
}
