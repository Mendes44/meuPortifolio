import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
export default function sitemap(): MetadataRoute.Sitemap {
  const url = process.env.NEXT_PUBLIC_SITE_URL;
  if (!url) return [];
  return [
    "",
    "/privacidade",
    ...projects.map((p) => `/projetos/${p.slug}`),
  ].map((path) => ({
    url: `${url}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
