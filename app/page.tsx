import Image from "next/image";
import Link from "next/link";
import { volumes } from "@/lib/catalog";

export default function HomePage() {
  return (
    <main id="konten" className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <section className="hero-grid py-10 sm:py-16">
        <div>
          <p className="mb-4 flex items-center gap-2 font-semibold uppercase tracking-[0.16em] text-blue-700"><Image src="/icons/search-material.svg" alt="" width={24} height={24} /> E-book untuk developer</p>
          <h1>SEO dari Nol</h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-600">Memahami cara Google menemukan, membaca, dan menilai halaman web melalui praktik yang bisa diperiksa.</p>
          <Link prefetch={false} className="mt-8 inline-block rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white" href="/vol-1/">Mulai Vol. 1</Link>
        </div>
        <Image priority src="/illustrations/hero.svg" alt="Ilustrasi halaman web, jalur crawler, dan kaca pembesar" width={720} height={580} />
      </section>
      <section aria-labelledby="volume-title" className="py-12">
        <h2 id="volume-title" className="text-4xl">Tiga volume, satu alur belajar</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {volumes.map((volume) => (
            <article key={volume.slug} className="rounded-xl border border-slate-200 bg-white p-6">
              <Image src={`/illustrations/${volume.slug}.svg`} alt="" width={640} height={400} className="mb-5 rounded-lg" />
              <p className="font-semibold text-blue-700">Volume {volume.number}</p>
              <h3 className="mt-2 text-2xl">{volume.title}</h3>
              <p className="mt-3 text-slate-600">{volume.summary}</p>
              <Link prefetch={false} className="mt-5 inline-block font-semibold text-blue-700" href={`/${volume.slug}/`}>Lihat daftar bab →</Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
