"use client";

import { useState } from "react";

export function CopyButton({ value }: { value: string }) {
  const [label, setLabel] = useState("Salin");

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setLabel("Tersalin");
    } catch {
      setLabel("Gagal menyalin");
    }
    window.setTimeout(() => setLabel("Salin"), 1800);
  }

  return <button className="code-copy" type="button" onClick={copy} aria-live="polite">{label}</button>;
}
