import type { MDXComponents } from "mdx/types";
import { CodeBlock } from "@/components/code-block";
import { TechnicalFigure } from "@/components/technical-figure";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    pre: CodeBlock,
    TechnicalFigure,
    ...components,
  };
}
