# SEO dari Nol

E-book web berbahasa Indonesia untuk developer pemula. Situs menjelaskan SEO dari HTML dasar hingga audit teknis melalui 3 volume dan 16 bab.

## Isi

- Landing page dan tiga halaman volume.
- 16 bab MDX dengan contoh yang dapat disalin.
- Next.js App Router dan static export.
- Tailwind CSS, Shiki build-time, serta font lokal.
- Canonical, Open Graph, robots.txt, sitemap.xml, BreadcrumbList, dan halaman 404.
- Sidebar desktop, drawer mobile, tombol Salin, latihan, serta navigasi antarbab.
- Ilustrasi SVG orisinal dan gambar Open Graph lokal.

## Persyaratan

- Node.js 20.9 atau lebih baru.
- npm dengan dukungan `npm ci`.

Versi Node yang dipakai saat verifikasi: `24.4.0`.

## Instalasi

```bash
npm ci
```

Salin konfigurasi lingkungan:

```bash
copy .env.example .env.local
```

Pada macOS/Linux:

```bash
cp .env.example .env.local
```

## Konfigurasi domain

`SITE_URL` wajib berupa origin HTTP/HTTPS tanpa path, query, fragment, atau credentials.

```env
SITE_URL=https://seo.example.com
SITE_PREVIEW=false
```

Sebelum deploy produksi, ganti dengan domain sebenarnya:

```env
SITE_URL=https://seo-domain-kamu.com
SITE_PREVIEW=false
```

Nilai ini menjadi sumber tunggal untuk canonical, Open Graph, sitemap, robots.txt, dan JSON-LD.

Untuk build preview yang tidak boleh diindeks:

```env
SITE_URL=https://preview-domain-kamu.vercel.app
SITE_PREVIEW=true
```

`SITE_PREVIEW=true` menghasilkan meta robots `noindex, nofollow`. Ini bukan perlindungan data privat; gunakan Deployment Protection Vercel untuk konten rahasia.

## Pengembangan

```bash
npm run dev
```

Buka `http://localhost:3000`.

## Verifikasi

```bash
npm run lint
npm run typecheck
npm run build
npm run check:static
```

Atau jalankan semuanya:

```bash
npm run check
```

`npm run check:static` memeriksa 20 URL kanonis, metadata dasar, satu H1, sitemap, BreadcrumbList, tautan lokal, aset, dan halaman 404.

## Build dan preview lokal

```bash
npm run build
npm run preview
```

Buka `http://127.0.0.1:4173`. Hasil build berada di `out/`. Server preview menggunakan Node.js stdlib dan mengembalikan status `404` nyata untuk URL yang tidak ditemukan.

Port dapat diganti:

```powershell
$env:PORT = "4180"
npm run preview
```

Pada macOS/Linux:

```bash
PORT=4180 npm run preview
```

## Deploy ke Vercel

Vercel menjadi target hosting utama. Proyek dibangun dengan Next.js, lalu hasil `output: "export"` dipasang sebagai situs statis biasa. `vercel.json` sengaja memakai `framework: null` agar adapter Next.js Vercel tidak mencari `routes-manifest.json` di dalam `out/`.

1. Simpan proyek dalam repository GitHub.
2. Impor repository melalui dashboard Vercel.
3. Gunakan **Framework Preset: Other**. Konfigurasi repository juga memaksanya melalui `framework: null`.
4. Gunakan Build Command `npm run build` dan Output Directory `out`. Nilai ini sudah ditetapkan oleh `vercel.json`.
5. Tambahkan environment variable produksi:
   - `SITE_URL=https://domain-produksi-kamu.com`
   - `SITE_PREVIEW=false`
6. Tambahkan domain kustom di **Settings → Domains**.
7. Deploy.
8. Pastikan domain utama mengarah ke deployment produksi.
9. Periksa `/robots.txt`, `/sitemap.xml`, `/og.png`, satu bab, dan satu URL salah.

`vercel.json` menetapkan:

- instalasi melalui `npm ci`;
- build melalui `npm run build`;
- Framework Preset `Other` melalui `framework: null`;
- output directory statis `out`;
- trailing slash konsisten;
- `X-Robots-Tag: noindex` untuk PDF di `/downloads/`;
- header `X-Content-Type-Options` dan `Referrer-Policy`.

### Preview deployment Vercel

Environment variable Vercel berlaku per lingkungan. Atur:

| Lingkungan | `SITE_URL` | `SITE_PREVIEW` |
|---|---|---|
| Production | Domain kanonis | `false` |
| Preview | URL/domain preview yang stabil | `true` |

URL preview Vercel dapat berubah per deployment. Canonical preview tidak penting karena halaman preview `noindex`; jangan mengirim sitemap preview ke Search Console.

### Redirect domain `vercel.app`

Jangan menambahkan redirect host sebelum nama proyek dan domain produksi diketahui. Setelah keduanya final, aturan berikut dapat ditambahkan ke `redirects` dalam `vercel.json`:

```json
{
  "source": "/:path*",
  "has": [
    { "type": "host", "value": "nama-proyek\\.vercel\\.app" }
  ],
  "destination": "https://domain-produksi-kamu.com/:path*",
  "permanent": true
}
```

Pembatasan host mencegah loop dan tidak mengalihkan seluruh preview deployment.

## Static hosting alternatif

Folder `out/` dapat dipasang pada hosting statis lain. Hosting tersebut harus:

- melayani `index.html` pada setiap direktori rute;
- mempertahankan trailing slash;
- melayani `404.html` dengan status HTTP `404`;
- menyediakan MIME XML, SVG, PNG, WOFF, dan WOFF2 yang benar;
- menerapkan redirect serta `X-Robots-Tag` pada lapisan hosting.

GitHub Pages dapat melayani file statis, tetapi tidak mendukung custom response header seperti `X-Robots-Tag` secara native. Vercel lebih sesuai untuk proyek ini.

## Menambahkan bab

1. Tambahkan entri pada `chapters` di `lib/catalog.ts`.
2. Gunakan slug huruf kecil dengan tanda hubung.
3. Buat file MDX di `content/vol-N/<slug>.mdx`.
4. Tambahkan import statis pada `lib/content.ts`.
5. Set `available: true` setelah materi lengkap.
6. Gunakan delapan heading H2 standar:
   - Masalah nyata
   - Tujuan belajar
   - Konsep inti
   - Praktik langkah demi langkah
   - Verifikasi dan hasil yang diharapkan
   - Kesalahan umum
   - Latihan
   - Rujukan
7. Jalankan `npm run check`.

Katalog adalah sumber bersama untuk rute, navigasi, metadata, dan sitemap. Jangan membuat daftar URL kedua.

## Struktur penting

```text
app/                    Rute, metadata, sitemap, robots, dan 404
components/             UI, drawer, kode, breadcrumb JSON-LD, diagram
content/vol-N/          Satu file MDX per bab
lib/catalog.ts          Katalog 3 volume dan 16 bab
lib/content.ts          Import statis MDX
lib/site.ts             Konfigurasi domain
public/illustrations/   Ilustrasi, diagram, dan kredit
scripts/check.mjs       Audit keluaran statis
scripts/preview.mjs     Server preview lokal
vercel.json             Konfigurasi deploy Vercel
```

## Aset dan lisensi

Ilustrasi utama dibuat khusus untuk proyek ini. Satu ikon Search dari Google Material Design Icons digunakan berdasarkan Apache License 2.0. Kredit, sumber, perubahan, dan lisensi tersedia di `public/illustrations/CREDITS.md` serta `public/licenses/`.

## Pemeriksaan pascadeploy

- Pastikan canonical memakai domain produksi.
- Pastikan sitemap memuat tepat 20 URL publik.
- Pastikan robots.txt menunjuk sitemap produksi.
- Pastikan URL salah memberikan `404`, bukan soft 404.
- Uji Open Graph melalui alat platform terkait.
- Uji BreadcrumbList dengan Rich Results Test.
- Tambahkan properti Search Console, kirim sitemap, lalu inspeksi URL penting.
- Pantau Core Web Vitals lapangan setelah data tersedia.

Search Console, rich result, pengindeksan, dan data lapangan tidak dapat dijamin melalui build lokal.
