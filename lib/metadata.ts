import type { Metadata } from "next";
import { site } from "@/lib/site";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const url = path.startsWith("/") ? path : `/${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "id_ID",
      siteName: site.name,
      title,
      description,
      url,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: `${title} — ${site.name}` }],
    },
  };
}
