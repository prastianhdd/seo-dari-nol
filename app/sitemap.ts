import type { MetadataRoute } from "next";
import { chapters, volumes } from "@/lib/catalog";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    ...volumes.map((volume) => `/${volume.slug}/`),
    ...chapters.map((chapter) => `/vol-${chapter.volume}/${chapter.slug}/`),
  ];
  return paths.map((path) => ({ url: new URL(path, site.url).href }));
}
