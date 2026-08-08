import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/data/packageDetails";
import { getAllBlogSlugs, getAllTags } from "@/data/blogPosts";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const packagePages: MetadataRoute.Sitemap = getAllSlugs().map((slug) => ({
    url: `https://sentultrip.id/paket/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const blogPages: MetadataRoute.Sitemap = getAllBlogSlugs().map((slug) => ({
    url: `https://sentultrip.id/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const tagPages: MetadataRoute.Sitemap = getAllTags().map((t) => ({
    url: `https://sentultrip.id/blog/tag/${t.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.4,
  }));

  return [
    {
      url: "https://sentultrip.id",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://sentultrip.id/blog",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...packagePages,
    ...blogPages,
    ...tagPages,
  ];
}
