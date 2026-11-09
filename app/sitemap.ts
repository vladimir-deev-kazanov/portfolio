import type { MetadataRoute } from "next";

const siteUrl = "https://vladimirdeev.com";

// Public, indexable routes only.
const routes = [
  { path: "/", priority: 1 },
  { path: "/work/ai-agent", priority: 0.9 },
  { path: "/work/semrush-locations", priority: 0.9 },
  { path: "/work/raiffeisen-mobile", priority: 0.9 },
  { path: "/cv", priority: 0.7 },
  { path: "/privacy", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, priority }) => ({
    url: `${siteUrl}${path === "/" ? "" : path}`,
    changeFrequency: "monthly",
    priority,
  }));
}
