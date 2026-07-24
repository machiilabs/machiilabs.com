import { redirect } from "next/navigation";

export default function SkagwayFirstLaunchRedirect() {
  redirect("/skagway/manual");
}
