import { existsSync, readFileSync } from "node:fs";
import { extname, join } from "node:path";
const root = join(process.cwd(), "out"); const origin = process.env.SITE_URL || "https://seo.example.com";
const expected = ["/", "/vol-1/", "/vol-2/", "/vol-3/", "/vol-1/cara-google-search-bekerja/", "/vol-1/maksud-pencarian-dan-konten/", "/vol-1/struktur-url-dan-html/", "/vol-1/title-description-dan-snippet/", "/vol-1/gambar-dan-tautan-internal/", "/vol-2/status-http-redirect-soft-404/", "/vol-2/sitemap-xml-dan-index/", "/vol-2/robots-txt-dan-crawler/", "/vol-2/noindex-dan-x-robots-tag/", "/vol-2/canonical-dan-url-duplikat/", "/vol-2/javascript-rendering-dan-html/", "/vol-3/search-console-dan-url-inspection/", "/vol-3/impresi-klik-dan-ctr/", "/vol-3/structured-data-dan-pengujian/", "/vol-3/pengalaman-halaman-dan-core-web-vitals/", "/vol-3/audit-seo-sebelum-dan-sesudah-deploy/"];
const errors = [];
const routeFile = (path) => path === "/" ? join(root, "index.html") : join(root, path, "index.html");
const targetFile = (url) => { const clean = url.split(/[?#]/)[0]; if (clean === "/") return join(root, "index.html"); const direct = join(root, clean.replace(/^\//, "")); return extname(direct) ? direct : join(direct, "index.html"); };
for (const route of expected) {
  const file = routeFile(route); if (!existsSync(file)) { errors.push(`${route}: HTML hilang`); continue; }
  const html = readFileSync(file, "utf8");
  if (!/<title>.+<\/title>/.test(html)) errors.push(`${route}: title hilang`);
  if (!/<meta name="description" content="[^"]+"/.test(html)) errors.push(`${route}: description hilang`);
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  if (canonical !== new URL(route, origin).href) errors.push(`${route}: canonical salah`);
  if ((html.match(/<h1(?:\s|>)/g) || []).length !== 1) errors.push(`${route}: H1 bukan satu`);
  if (!html.includes('property="og:image"')) errors.push(`${route}: og:image hilang`);
  if (route.split("/").filter(Boolean).length === 2) for (const key of ["BreadcrumbList", "<details>", 'class="shiki']) if (!html.includes(key)) errors.push(`${route}: ${key} hilang`);
  for (const match of html.matchAll(/(?:href|src)="(\/(?!\/)[^"]*)"/g)) if (!match[1].startsWith("/_next/") && !existsSync(targetFile(match[1]))) errors.push(`${route}: target hilang ${match[1]}`);
}
const sitemap = readFileSync(join(root, "sitemap.xml"), "utf8"); const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
if (urls.length !== 20 || new Set(urls).size !== 20) errors.push("sitemap: harus 20 URL unik");
for (const path of expected) if (!urls.includes(new URL(path, origin).href)) errors.push(`sitemap: hilang ${path}`);
if (!readFileSync(join(root, "robots.txt"), "utf8").includes(`Sitemap: ${origin}/sitemap.xml`)) errors.push("robots: sitemap salah");
for (const asset of ["og.png", "icons/search-material.svg", "illustrations/hero.svg", "licenses/material-design-icons-APACHE-2.0.txt"]) if (!existsSync(join(root, asset))) errors.push(`aset hilang ${asset}`);
if (!readFileSync(join(root, "404.html"), "utf8").includes("noindex")) errors.push("404: noindex hilang");
if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
console.log("QA statis lulus: 20 rute dan URL sitemap.");
