export type Chapter = {
  volume: 1 | 2 | 3;
  order: number;
  slug: string;
  title: string;
  description: string;
  references: readonly string[];
  available: boolean;
};

export type Volume = {
  number: 1 | 2 | 3;
  slug: `vol-${1 | 2 | 3}`;
  title: string;
  summary: string;
  outcome: string;
};

export const volumes = [
  { number: 1, slug: "vol-1", title: "Dasar dan SEO On-Page", summary: "Memahami cara Search bekerja lalu menyusun halaman yang jelas bagi pembaca dan mesin pencari.", outcome: "Menerbitkan satu halaman proyek dengan konten, judul, metadata, dan tautan yang sesuai." },
  { number: 2, slug: "vol-2", title: "Technical SEO", summary: "Mengendalikan akses crawler, sinyal pengindeksan, URL kanonis, dan hasil rendering.", outcome: "Membangun sitemap otomatis dan mendiagnosis URL melalui HTTP, HTML, serta hasil render." },
  { number: 3, slug: "vol-3", title: "Audit dan Pengembangan", summary: "Mengukur hasil, menerapkan structured data, dan menyusun audit yang dapat ditindaklanjuti.", outcome: "Melakukan audit situs, memprioritaskan perbaikan, dan memeriksa dampaknya." },
] as const satisfies readonly Volume[];

const searchDocs = "https://developers.google.com/search/docs";

export const chapters = [
  { volume: 1, order: 1, slug: "cara-google-search-bekerja", title: "Cara Google Search bekerja", description: "Mengikuti perjalanan URL dari penemuan hingga penyajian hasil.", references: [`${searchDocs}/fundamentals/how-search-works?hl=id`], available: true },
  { volume: 1, order: 2, slug: "maksud-pencarian-dan-konten", title: "Maksud pencarian dan konten yang membantu", description: "Menyusun halaman yang menjawab kebutuhan pembaca, bukan mengejar kata kunci semata.", references: [`${searchDocs}/fundamentals/creating-helpful-content?hl=id`], available: true },
  { volume: 1, order: 3, slug: "struktur-url-dan-html", title: "Struktur URL, HTML semantik, dan heading", description: "Membangun struktur halaman yang mudah dipahami dan ditelusuri.", references: [`${searchDocs}/fundamentals/seo-starter-guide?hl=id`], available: true },
  { volume: 1, order: 4, slug: "title-description-dan-snippet", title: "Title, meta description, dan snippet", description: "Membedakan metadata dokumen dari tampilan hasil pencarian.", references: [`${searchDocs}/appearance/title-link?hl=id`, `${searchDocs}/appearance/snippet?hl=id`], available: true },
  { volume: 1, order: 5, slug: "gambar-dan-tautan-internal", title: "Gambar, alt text, dan tautan internal", description: "Memberi konteks pada media dan menghubungkan halaman secara masuk akal.", references: [`${searchDocs}/appearance/google-images?hl=id`, `${searchDocs}/crawling-indexing/links-crawlable?hl=id`], available: true },
  { volume: 2, order: 1, slug: "status-http-redirect-soft-404", title: "Status HTTP, redirect, dan soft 404", description: "Memilih respons server yang benar untuk setiap keadaan URL.", references: [`${searchDocs}/crawling-indexing/http-network-errors?hl=id`], available: true },
  { volume: 2, order: 2, slug: "sitemap-xml-dan-index", title: "Sitemap XML dan sitemap index", description: "Menyediakan daftar URL kanonis yang dapat diproses crawler.", references: [`${searchDocs}/crawling-indexing/sitemaps/build-sitemap?hl=id`], available: true },
  { volume: 2, order: 3, slug: "robots-txt-dan-crawler", title: "robots.txt dan akses crawler", description: "Mengatur akses crawling tanpa mencampurkannya dengan pengindeksan.", references: [`${searchDocs}/crawling-indexing/robots/intro?hl=id`], available: true },
  { volume: 2, order: 4, slug: "noindex-dan-x-robots-tag", title: "noindex dan X-Robots-Tag", description: "Mengendalikan pengindeksan HTML maupun aset non-HTML.", references: [`${searchDocs}/crawling-indexing/robots-meta-tag?hl=id`], available: true },
  { volume: 2, order: 5, slug: "canonical-dan-url-duplikat", title: "Canonical dan URL duplikat", description: "Menyatukan sinyal untuk beberapa URL dengan isi serupa.", references: [`${searchDocs}/crawling-indexing/canonicalization?hl=id`], available: true },
  { volume: 2, order: 6, slug: "javascript-rendering-dan-html", title: "JavaScript, rendering, dan pemeriksaan HTML", description: "Membandingkan respons awal, DOM hasil render, dan tampilan Google.", references: [`${searchDocs}/crawling-indexing/javascript/javascript-seo-basics?hl=id`], available: true },
  { volume: 3, order: 1, slug: "search-console-dan-url-inspection", title: "Search Console dan URL Inspection", description: "Memeriksa URL dengan data dan alat milik Google.", references: [`${searchDocs}/monitor-debug/search-console-start?hl=id`], available: true },
  { volume: 3, order: 2, slug: "impresi-klik-dan-ctr", title: "Membaca impresi, klik, dan CTR", description: "Mengubah metrik performa menjadi pertanyaan yang dapat diuji.", references: ["https://support.google.com/webmasters/answer/7576553?hl=id"], available: true },
  { volume: 3, order: 3, slug: "structured-data-dan-pengujian", title: "Structured data dan pengujian", description: "Menandai informasi yang benar-benar terlihat dan menguji kelayakannya.", references: [`${searchDocs}/appearance/structured-data/intro-structured-data?hl=id`], available: true },
  { volume: 3, order: 4, slug: "pengalaman-halaman-dan-core-web-vitals", title: "Pengalaman halaman dan Core Web Vitals", description: "Mengukur LCP, INP, dan CLS tanpa menyederhanakan pengalaman pengguna.", references: [`${searchDocs}/appearance/core-web-vitals?hl=id`], available: true },
  { volume: 3, order: 5, slug: "audit-seo-sebelum-dan-sesudah-deploy", title: "Audit SEO sebelum dan sesudah deploy", description: "Mencatat temuan, tindakan, prioritas, dan verifikasi ulang.", references: [`${searchDocs}/monitor-debug/debugging-search-traffic-drops?hl=id`], available: true },
] as const satisfies readonly Chapter[];

function validateCatalog() {
  const expected = new Map([[1, 5], [2, 6], [3, 5]]);
  const slugs = new Set<string>();
  for (const chapter of chapters) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(chapter.slug)) throw new Error(`Slug tidak valid: ${chapter.slug}`);
    const key = `${chapter.volume}/${chapter.slug}`;
    if (slugs.has(key)) throw new Error(`Bab duplikat: ${key}`);
    slugs.add(key);
  }
  for (const [volume, count] of expected) {
    const list = chapters.filter((chapter) => chapter.volume === volume);
    if (list.length !== count || list.some((chapter, index) => chapter.order !== index + 1)) {
      throw new Error(`Urutan Volume ${volume} tidak valid`);
    }
  }
}

validateCatalog();

export function getVolume(slug: string) {
  return volumes.find((volume) => volume.slug === slug);
}

export function getVolumeChapters(volume: number) {
  return chapters.filter((chapter) => chapter.volume === volume);
}

export function getChapter(volumeSlug: string, chapterSlug: string) {
  const volume = getVolume(volumeSlug);
  return volume && chapters.find((chapter) => chapter.volume === volume.number && chapter.slug === chapterSlug);
}

export function getAvailableChapters() {
  return chapters.filter((chapter) => chapter.available);
}
