import type { MetadataRoute } from "next";
import { MANUAL_PAGES } from "@/app/skagway/manual/manual";

const BASE = "https://machiilabs.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    {
      url: `${BASE}/flasher`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${BASE}/flasher/guide`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE}/skagway`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${BASE}/skagway/manual`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.65,
    },
  ];

  // first-launch lives at /skagway/manual (redirect); do not list the redirect URL.
  const manualRoutes: MetadataRoute.Sitemap = MANUAL_PAGES.filter(
    (page) => page.slug !== "first-launch",
  ).map((page) => ({
    url: `${BASE}/skagway/manual/${page.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...manualRoutes];
}
