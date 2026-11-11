import type { ComponentType } from "react";

const content = {
  "vol-1/cara-google-search-bekerja": () => import("@/content/vol-1/cara-google-search-bekerja.mdx"),
  "vol-1/maksud-pencarian-dan-konten": () => import("@/content/vol-1/maksud-pencarian-dan-konten.mdx"),
  "vol-1/struktur-url-dan-html": () => import("@/content/vol-1/struktur-url-dan-html.mdx"),
  "vol-1/title-description-dan-snippet": () => import("@/content/vol-1/title-description-dan-snippet.mdx"),
  "vol-1/gambar-dan-tautan-internal": () => import("@/content/vol-1/gambar-dan-tautan-internal.mdx"),
  "vol-2/status-http-redirect-soft-404": () => import("@/content/vol-2/status-http-redirect-soft-404.mdx"),
  "vol-2/sitemap-xml-dan-index": () => import("@/content/vol-2/sitemap-xml-dan-index.mdx"),
  "vol-2/robots-txt-dan-crawler": () => import("@/content/vol-2/robots-txt-dan-crawler.mdx"),
  "vol-2/noindex-dan-x-robots-tag": () => import("@/content/vol-2/noindex-dan-x-robots-tag.mdx"),
  "vol-2/canonical-dan-url-duplikat": () => import("@/content/vol-2/canonical-dan-url-duplikat.mdx"),
  "vol-2/javascript-rendering-dan-html": () => import("@/content/vol-2/javascript-rendering-dan-html.mdx"),
  "vol-3/search-console-dan-url-inspection": () => import("@/content/vol-3/search-console-dan-url-inspection.mdx"),
  "vol-3/impresi-klik-dan-ctr": () => import("@/content/vol-3/impresi-klik-dan-ctr.mdx"),
  "vol-3/structured-data-dan-pengujian": () => import("@/content/vol-3/structured-data-dan-pengujian.mdx"),
  "vol-3/pengalaman-halaman-dan-core-web-vitals": () => import("@/content/vol-3/pengalaman-halaman-dan-core-web-vitals.mdx"),
  "vol-3/audit-seo-sebelum-dan-sesudah-deploy": () => import("@/content/vol-3/audit-seo-sebelum-dan-sesudah-deploy.mdx"),
} as const;

type ContentKey = keyof typeof content;

export async function loadChapter(volumeSlug: string, chapterSlug: string): Promise<ComponentType> {
  const key = `${volumeSlug}/${chapterSlug}` as ContentKey;
  const loader = content[key];
  if (!loader) throw new Error(`Konten belum tersedia: ${key}`);
  return (await loader()).default;
}
