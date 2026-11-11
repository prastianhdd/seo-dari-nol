import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
const root = join(process.cwd(), "content");
const required = ["Masalah nyata", "Tujuan belajar", "Konsep inti", "Praktik langkah demi langkah", "Verifikasi dan hasil yang diharapkan", "Kesalahan umum", "Latihan", "Rujukan"];
const files = readdirSync(root, { recursive: true }).filter((file) => file.endsWith(".mdx")).map((file) => join(root, file));
const errors = [];
for (const file of files) {
  const text = readFileSync(file, "utf8"); const lines = text.split(/\r?\n/); const headings = [];
  let fenced = false, details = 0, summary = 0, table = [];
  const finishTable = () => {
    if (!table.length) return;
    const counts = new Set(table.map(({ line }) => (line.match(/(?<!\\)\|/g) || []).length));
    if (counts.size !== 1) errors.push(`${file}:${table[0].number}: jumlah kolom tabel tidak konsisten`);
    if (table.length < 2 || !/^\|(?:\s*:?-+:?\s*\|)+$/.test(table[1].line)) errors.push(`${file}:${table[0].number}: pemisah tabel tidak valid`);
    table = [];
  };
  lines.forEach((line, index) => {
    if (line.startsWith("```")) { finishTable(); fenced = !fenced; return; }
    if (fenced) return;
    if (line.startsWith("## ")) headings.push(line.slice(3).trim());
    details += (line.match(/<details>/g) || []).length - (line.match(/<\/details>/g) || []).length;
    summary += (line.match(/<summary>/g) || []).length - (line.match(/<\/summary>/g) || []).length;
    if (line.trimStart().startsWith("|")) {
      const value = line.trim(); if (!value.endsWith("|")) errors.push(`${file}:${index + 1}: tabel tidak diakhiri |`);
      table.push({ number: index + 1, line: value });
    } else finishTable();
  });
  finishTable();
  if (fenced) errors.push(`${file}: fence tidak ditutup`);
  if (details || summary) errors.push(`${file}: tag details/summary tidak seimbang`);
  if (headings.length !== required.length || headings.some((value, index) => value !== required[index])) errors.push(`${file}: H2 tidak lengkap/urut`);
  if (!/<details>[\s\S]*<summary>/.test(text)) errors.push(`${file}: latihan details hilang`);
  if (!/https:\/\/(developers|support|search)\.google\.com|https:\/\/web\.dev/.test(text)) errors.push(`${file}: rujukan resmi hilang`);
}
if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
console.log(`Audit MDX lulus: ${files.length} file.`);
