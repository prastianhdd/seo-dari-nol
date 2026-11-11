import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getVolume, getVolumeChapters, volumes } from "@/lib/catalog";
import { pageMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return volumes.map((volume) => ({ volume: volume.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ volume: string }> }): Promise<Metadata> {
  const { volume: slug } = await params;
  const volume = getVolume(slug);
  if (!volume) return {};
  return pageMetadata(`Vol. ${volume.number} — ${volume.title}`, volume.summary, `/${volume.slug}/`);
}

export default async function VolumePage({ params }: { params: Promise<{ volume: string }> }) {
  const { volume: slug } = await params;
  const volume = getVolume(slug);
  if (!volume) notFound();
  const list = getVolumeChapters(volume.number);

  return (
    <main id="konten" className="mx-auto max-w-5xl px-6 py-16">
      <Link href="/" className="text-blue-700">← SEO dari Nol</Link>
      <p className="mt-12 font-semibold text-blue-700">Volume {volume.number}</p>
      <h1 className="mt-3 max-w-none! text-5xl!">{volume.title}</h1>
      <p className="mt-6 max-w-2xl text-lg text-slate-600">{volume.summary}</p>
      <div className="mt-8 grid items-center gap-6 rounded-2xl bg-blue-50 p-5 md:grid-cols-[1fr_18rem]">
        <p><strong>Hasil praktik:</strong> {volume.outcome}</p>
        <Image src={`/illustrations/${volume.slug}.svg`} alt={`Ilustrasi sampul Volume ${volume.number}: ${volume.title}`} width={640} height={400} />
      </div>
      <ol className="mt-10 grid gap-4">
        {list.map((chapter) => (
          <li key={chapter.slug} className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-sm font-semibold text-blue-700">Bab {chapter.order}</p>
            {chapter.available ? (
              <Link prefetch={false} className="mt-1 block text-xl font-semibold text-slate-950 hover:text-blue-700" href={`/${volume.slug}/${chapter.slug}/`}>
                {chapter.title}
              </Link>
            ) : (
              <p className="mt-1 text-xl font-semibold text-slate-700">{chapter.title}</p>
            )}
            <p className="mt-2 text-slate-600">{chapter.description}</p>
            {!chapter.available && <span className="mt-3 inline-block text-sm text-slate-500">Materi tersedia pada stage penulisan.</span>}
          </li>
        ))}
      </ol>
    </main>
  );
}
