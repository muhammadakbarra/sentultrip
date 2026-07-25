import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/data/packageDetails";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const packagePages: MetadataRoute.Sitemap = getAllSlugs().map((slug) => ({
    url: `https://sentultrip.id/paket/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: "https://sentultrip.id",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...packagePages,
  ];
}
