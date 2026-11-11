"use client";

import { useEffect, useRef, useState } from "react";
import { ChapterList } from "@/components/chapter-list";

export function ChapterDrawer({ activeSlug }: { activeSlug: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      dialog.current?.showModal();
      closeButton.current?.focus();
      document.body.classList.add("drawer-open");
    } else {
      dialog.current?.close();
      document.body.classList.remove("drawer-open");
    }
    return () => document.body.classList.remove("drawer-open");
  }, [open]);

  return (
    <div className="mobile-chapter-menu">
      <button className="drawer-trigger" type="button" onClick={() => setOpen(true)}>Daftar bab</button>
      <dialog ref={dialog} aria-labelledby="drawer-title" onClose={() => setOpen(false)} onCancel={() => setOpen(false)}>
        <div className="drawer-heading"><h2 id="drawer-title">Daftar bab</h2><button ref={closeButton} type="button" onClick={() => setOpen(false)} aria-label="Tutup daftar bab">Tutup</button></div>
        <ChapterList activeSlug={activeSlug} />
      </dialog>
    </div>
  );
}
