# 🎬 Anichin API

Unofficial REST API untuk **Anichin.cafe** berbasis Next.js App Router — siap deploy ke Vercel dalam hitungan menit.

> Powered by [@zhadev/anichin](https://www.npmjs.com/package/@zhadev/anichin)

---

## 📋 Endpoints

| Method | Endpoint | Keterangan |
|--------|----------|------------|
| GET | `/api/home?page=1` | Home (slider, latest, popular) |
| GET | `/api/search?q=naruto&page=1` | Cari series |
| GET | `/api/series/:slug` | Detail series & episode list |
| GET | `/api/watch/:slug?episode=1` | Server video & link download |
| GET | `/api/schedule` | Jadwal tayang mingguan |
| GET | `/api/schedule?day=monday` | Jadwal hari tertentu |
| GET | `/api/ongoing?page=1` | Series ongoing |
| GET | `/api/completed?page=1` | Series completed |
| GET | `/api/sidebar` | Data sidebar |
| GET | `/api/genres/:slug?page=1` | Series berdasarkan genre |
| GET | `/api/quickfilter` | Opsi filter tersedia |

---

## 🚀 Deploy ke Vercel (Cara 1 — Lewat GitHub, Direkomendasikan)

### Step 1 — Install Git & Node.js
Pastikan sudah terinstall:
- [Node.js](https://nodejs.org) versi 16+
- [Git](https://git-scm.com)

### Step 2 — Buat Repository GitHub

1. Buka [github.com](https://github.com) → klik **New repository**
2. Beri nama repo, misal `anichin-api`
3. Pilih **Public** atau **Private**
4. Klik **Create repository**

### Step 3 — Push Project ke GitHub

Buka terminal di folder project ini, lalu jalankan:

```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/USERNAME/anichin-api.git
git push -u origin main
```

> Ganti `USERNAME` dengan username GitHub kamu.

### Step 4 — Deploy di Vercel

1. Buka [vercel.com](https://vercel.com) → **Login** / **Sign Up** (bisa pakai akun GitHub)
2. Klik **Add New → Project**
3. Pilih repo `anichin-api` yang barusan di-push
4. Vercel otomatis detect Next.js — langsung klik **Deploy**
5. Tunggu ~1-2 menit → selesai! ✅

Kamu akan dapat URL seperti: `https://anichin-api-xxxx.vercel.app`

---

## 🚀 Deploy ke Vercel (Cara 2 — Lewat CLI)

```bash
# Install Vercel CLI
npm install -g vercel

# Masuk ke folder project
cd anichin-api

# Install dependencies
npm install

# Deploy
vercel

# Ikuti instruksi di terminal:
# - Login dengan akun Vercel
# - Pilih scope (personal/team)
# - Konfirmasi project name
# - Deploy!
```

Untuk deploy ulang setelah ada perubahan:

```bash
vercel --prod
```

---

## 💻 Menjalankan Secara Lokal

```bash
# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

Dokumentasi API tersedia di [http://localhost:3000/docs](http://localhost:3000/docs)

---

## 📁 Struktur Project

```
anichin-api/
├── app/
│   ├── api/
│   │   ├── route.ts              ← /api (info)
│   │   ├── home/route.ts         ← /api/home
│   │   ├── search/route.ts       ← /api/search
│   │   ├── series/[slug]/route.ts← /api/series/:slug
│   │   ├── watch/[slug]/route.ts ← /api/watch/:slug
│   │   ├── schedule/route.ts     ← /api/schedule
│   │   ├── ongoing/route.ts      ← /api/ongoing
│   │   ├── completed/route.ts    ← /api/completed
│   │   ├── sidebar/route.ts      ← /api/sidebar
│   │   ├── genres/[slug]/route.ts← /api/genres/:slug
│   │   └── quickfilter/route.ts  ← /api/quickfilter
│   ├── docs/page.tsx             ← Halaman dokumentasi
│   ├── layout.tsx
│   └── page.tsx                  ← Redirect ke /docs
├── lib/
│   └── scraper.ts                ← Shared scraper instance
├── vercel.json
├── package.json
└── README.md
```

---

## ⚙️ Konfigurasi (Opsional)

Edit `lib/scraper.ts` untuk menyesuaikan konfigurasi scraper:

```typescript
const scraper = new AnichinScraper({
  timeout: 30000,      // Timeout request (ms)
  maxRetries: 3,       // Maks retry jika gagal
  retryDelay: 1000,    // Jeda antar retry (ms)
  requestDelay: 500,   // Jeda antar request (ms)
  // proxy: { ... }   // Opsional: konfigurasi proxy
});
```

---

## 📄 Format Response

Semua endpoint mengembalikan format:

```json
{
  "success": true,
  "creator": "zhadevv",
  "data": { ... },
  "message": null
}
```

---

## ⚠️ Disclaimer

Project ini bersifat tidak resmi dan hanya untuk tujuan edukasi. Gunakan secara bertanggung jawab dan hormati Terms of Service dari Anichin.cafe.

---

## 📜 License

MIT License © 2025
