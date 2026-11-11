const DEFAULT_SITE_URL = "https://seo.example.com";

function parseSiteUrl(value = DEFAULT_SITE_URL): URL {
  const url = new URL(value);

  if (
    !["http:", "https:"].includes(url.protocol) ||
    url.username ||
    url.password ||
    url.pathname !== "/" ||
    url.search ||
    url.hash
  ) {
    throw new Error("SITE_URL harus berupa origin HTTP(S), misalnya https://seo.example.com");
  }

  return url;
}

export const site = {
  name: "SEO dari Nol",
  description: "E-book praktis SEO untuk developer pemula.",
  url: parseSiteUrl(process.env.SITE_URL),
  isPreview: process.env.SITE_PREVIEW === "true",
} as const;
