import type { MetadataRoute } from "next";
import { SERVICES } from "@/lib/services";
import { getAllServiceTopics } from "@/lib/service-topics";

const SITE = "https://inovix.co.il";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    "",
    "/about",
    "/blog",
    "/tour",
    "/accessibility",
    "/terms",
  ].map((path) => ({
    url: `${SITE}${path}`,
    lastModified: now,
  }));

  const services = SERVICES.map((s) => ({
    url: `${SITE}${s.href}`,
    lastModified: now,
  }));

  const topics = getAllServiceTopics().map((t) => ({
    url: `${SITE}${t.href}`,
    lastModified: now,
  }));

  return [...staticRoutes, ...services, ...topics];
}
