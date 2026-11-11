import Link from "next/link";
import { getVolumeChapters, volumes } from "@/lib/catalog";

export function ChapterList({ activeSlug }: { activeSlug: string }) {
  return (
    <nav aria-label="Daftar bab" className="chapter-list">
      {volumes.map((volume) => (
        <section key={volume.slug}>
          <h2>Volume {volume.number}</h2>
          <ol>
            {getVolumeChapters(volume.number).map((chapter) => (
              <li key={chapter.slug}>
                {chapter.available ? <Link prefetch={false} aria-current={chapter.slug === activeSlug ? "page" : undefined} href={`/${volume.slug}/${chapter.slug}/`}>{chapter.order}. {chapter.title}</Link> : <span>{chapter.order}. {chapter.title}</span>}
              </li>
            ))}
          </ol>
        </section>
      ))}
    </nav>
  );
}
