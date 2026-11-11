import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-slate-200 bg-white/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <Link className="font-semibold text-slate-950 no-underline" href="/">SEO dari Nol</Link>
        <nav aria-label="Navigasi utama" className="flex gap-4 text-sm font-semibold text-slate-600">
          <Link prefetch={false} href="/vol-1/">Vol. 1</Link><Link prefetch={false} href="/vol-2/">Vol. 2</Link><Link prefetch={false} href="/vol-3/">Vol. 3</Link>
        </nav>
      </div>
    </header>
  );
}
