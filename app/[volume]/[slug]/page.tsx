import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChapterDrawer } from "@/components/chapter-drawer";
import { JsonLd } from "@/components/json-ld";
import { ChapterList } from "@/components/chapter-list";
import { TableOfContents } from "@/components/table-of-contents";
import { chapters, getAvailableChapters, getChapter, getVolume } from "@/lib/catalog";
import { loadChapter } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAvailableChapters().map((chapter) => ({ volume: `vol-${chapter.volume}`, slug: chapter.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ volume: string; slug: string }> }): Promise<Metadata> {
  const { volume, slug } = await params;
  const chapter = getChapter(volume, slug);
  if (!chapter?.available) return {};
  return pageMetadata(chapter.title, chapter.description, `/${volume}/${slug}/`);
}

export default async function ChapterPage({ params }: { params: Promise<{ volume: string; slug: string }> }) {
  const { volume: volumeSlug, slug } = await params;
  const volume = getVolume(volumeSlug);
  const chapter = getChapter(volumeSlug, slug);
  if (!volume || !chapter?.available) notFound();
  const Content = await loadChapter(volumeSlug, slug);
  const index = chapters.findIndex((item) => item.volume === chapter.volume && item.slug === chapter.slug);
  const previous = [...chapters.slice(0, index)].reverse().find((item) => item.available);
  const next = chapters.slice(index + 1).find((item) => item.available);
  const absolute = (path: string) => new URL(path, site.url).href;
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: absolute("/") },
      { "@type": "ListItem", position: 2, name: `Volume ${volume.number}`, item: absolute(`/${volume.slug}/`) },
      { "@type": "ListItem", position: 3, name: chapter.title },
    ],
  };

  return (
    <main id="konten" className="chapter-shell px-4 py-8 sm:px-6">
      <JsonLd data={breadcrumb} />
      <aside className="chapter-sidebar"><ChapterList activeSlug={chapter.slug} /></aside>
      <div className="chapter-main">
        <ChapterDrawer activeSlug={chapter.slug} />
        <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
          <Link prefetch={false} href="/">Beranda</Link> <span aria-hidden="true">/</span>{" "}
          <Link prefetch={false} href={`/${volume.slug}/`}>Volume {volume.number}</Link> <span aria-hidden="true">/</span>{" "}
          <span aria-current="page">Bab {chapter.order}</span>
        </nav>
        <article className="prose-seo mt-10">
          <p className="font-semibold text-blue-700">Volume {volume.number} · Bab {chapter.order}</p>
          <h1 className="max-w-none! text-5xl!">{chapter.title}</h1>
          <p className="lead">{chapter.description}</p>
          <Content />
        </article>
        <nav aria-label="Navigasi bab" className="mt-16 grid gap-4 border-t border-slate-200 pt-8 sm:grid-cols-2">
          {previous && <Link prefetch={false} href={`/vol-${previous.volume}/${previous.slug}/`}>← {previous.title}</Link>}
          {next && <Link prefetch={false} className="sm:text-right" href={`/vol-${next.volume}/${next.slug}/`}>{next.title} →</Link>}
        </nav>
      </div>
      <aside className="chapter-toc"><TableOfContents /></aside>
    </main>
  );
}
