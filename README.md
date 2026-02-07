## Jadwal Imsakiyah Ramadan 1446 H

Landing page statis yang menampilkan kalender interaktif jadwal imsakiyah dan waktu salat untuk 55 kota di Indonesia. Halaman dibangun untuk kampanye Panasonic Indonesia selama Ramadan 1446 H/2025.

### Fitur Utama
- **Katalog kota**: daftar kota populer di hero section plus opsi dropdown untuk pencarian kota lain.
- **Kalender interaktif 30 hari**: setiap kartu hari membuka modal berisi detail jadwal (imsak, Subuh, Zuhur, Asar, Magrib, Isya).
- **Animasi dekoratif**: efek parallax lentera/bulan-bintang (jQuery + `requestAnimationFrame`) dan transisi Animate.css untuk nuansa Ramadan.
- **Optimasi sharing**: metadata SEO, Open Graph, dan Twitter Card sudah disiapkan untuk memperkaya preview tautan.
- **Responsif penuh**: tata letak Bootstrap 5 menyesuaikan tampilan desktop dan mobile (termasuk grid hari terpisah).

### Struktur Proyek
- `index.html` – kerangka utama, hero, daftar kota, templating modal jadwal.
- `assets/style/style.css` – styling kustom, warna brand, komponen tombol kota/hari, dekorasi.
- `assets/js/script.js` – script jQuery untuk animasi parallax, rendering 30 kartu hari, dan sinkronisasi riwayat browser saat modal dibuka.
- `assets/imgs/` – aset grafis: logo Panasonic & Gobel, ilustrasi masjid, ikon sosial, kalender per hari.
- `assets/fonts/` – file font beserta stylesheet `fonts.css`.
- `assets/csv/` – tempat menyimpan data jadwal tambahan bila diperlukan (saat ini kosong/tidak wajib).

### Prasyarat
- Web server statis (mis. Apache bawaan XAMPP) atau cukup buka `index.html` langsung di browser modern.
- Koneksi internet opsional untuk CDN Bootstrap 5 dan Animate.css (atau salin ke lokal bila ingin offline).

### Cara Menjalankan Secara Lokal
1. Salin folder `jadwal2026` ke direktori htdocs XAMPP (atau root server statis lain).
2. Jalankan Apache dari XAMPP.
3. Akses `http://localhost/jadwal2026` di browser.

> Alternatif tanpa server: buka `index.html` langsung, tetapi beberapa fitur (mis. load font lokal via relative path) lebih stabil jika dilayani lewat server.

### Penyesuaian Konten
- **Mengubah jadwal tiap kota**: perbarui aset gambar kalender di `assets/imgs/days/` atau modifikasi template modal di `index.html` (bagian `<script id="timeTemplate">`).
- **Menambah kota populer**: edit daftar tombol kota di section hero (`index.html`).
- **Mengubah gaya visual**: sesuaikan token warna, gradien, atau ukuran komponen di `assets/style/style.css`.
- **Menonaktifkan animasi parallax**: hapus/komentari blok pertama di `assets/js/script.js`.

### Teknologi
- HTML5 + Bootstrap 5.3.8 untuk grid dan komponen.
- jQuery 3.x untuk DOM manipulation sederhana.
- Animate.css 4.1 untuk efek masuk (fade/zoom).
- Aset grafis raster (PNG) yang dioptimasi untuk tampilan retina.

### Pengembangan Lanjutan
- Integrasikan data jadwal dinamis (JSON/CSV) lalu render otomatis menggantikan gambar statis.
- Tambahkan form langganan atau CTA promosi produk Ramadan.
- Optimalkan performa dengan preloading font dan compress gambar tambahan.

### Lisensi
Belum ditentukan. Sesuaikan dengan kebutuhan tim/klien sebelum dipublikasikan.
