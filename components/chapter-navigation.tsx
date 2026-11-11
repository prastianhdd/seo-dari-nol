import Link from "next/link";
import type { Chapter } from "@/lib/catalog";

export function ChapterNavigation({ previous, next }: { previous?: Chapter; next?: Chapter }) {
  return (
    <nav aria-label="Navigasi bab">
      {previous && <Link href={`/vol-${previous.volume}/${previous.slug}/`}>← {previous.title}</Link>}
      {next && <Link href={`/vol-${next.volume}/${next.slug}/`}>{next.title} →</Link>}
    </nav>
  );
}
