import type { HTMLAttributes, ReactElement } from "react";
import { CopyButton } from "@/components/copy-button";

function textOf(node: unknown): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (node && typeof node === "object" && "props" in node) {
    return textOf((node as ReactElement<{ children?: unknown }>).props.children);
  }
  return "";
}

export function CodeBlock(props: HTMLAttributes<HTMLPreElement>) {
  const value = textOf(props.children).replace(/\n$/, "");
  return <div className="code-frame"><CopyButton value={value} /><pre {...props} /></div>;
}
