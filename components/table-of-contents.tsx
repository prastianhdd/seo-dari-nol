const sections = ["Masalah nyata", "Tujuan belajar", "Konsep inti", "Praktik langkah demi langkah", "Verifikasi dan hasil yang diharapkan", "Kesalahan umum", "Latihan", "Rujukan"];
const slug = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export function TableOfContents() {
  return <nav aria-label="Di halaman ini" className="toc"><h2>Di halaman ini</h2><ol>{sections.map((section) => <li key={section}><a href={`#${slug(section)}`}>{section}</a></li>)}</ol></nav>;
}
