import { redirect } from "next/navigation";

/** Kept so App Router has a route; next.config also 308s /skagway/explore → /skagway. */
export default function SkagwayExploreRedirect() {
  redirect("/skagway");
}
