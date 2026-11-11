import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Halaman tidak ditemukan",
  description: "URL yang diminta tidak tersedia.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main id="konten" className="mx-auto max-w-3xl px-6 py-24 text-center">
      <p className="font-semibold text-blue-700">Error 404</p>
      <h1 className="mt-4 max-w-none! text-6xl!">Halaman tidak ditemukan</h1>
      <p className="mt-6 text-lg text-slate-600">URL mungkin salah atau halaman telah dipindahkan.</p>
      <Link prefetch={false} className="mt-8 inline-block rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white" href="/">Kembali ke beranda</Link>
    </main>
  );
}
