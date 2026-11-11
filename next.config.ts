import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  trailingSlash: true,
};

const withMDX = createMDX({
  options: {
    rehypePlugins: [
      "rehype-slug",
      ["@shikijs/rehype", { themes: { light: "github-light", dark: "github-dark" } }],
    ],
  },
});

export default withMDX(nextConfig);
