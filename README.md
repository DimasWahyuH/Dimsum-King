# Dimsum King - POS & Stock Management System

Aplikasi manajemen Point of Sale (POS) dan stok barang untuk gerai Dimsum King. Aplikasi ini dibangun menggunakan Next.js, Prisma, dan MySQL.

## 📋 Fitur Utama
- **Landing Page Publik**: Halaman promosi dengan sistem pesanan delivery online.
- **Kasir (POS)**: Transaksi cepat dengan pemotongan stok otomatis.
- **Manajemen Produk**: CRUD produk, kategori, harga modal, harga jual, dan stok.
- **Dashboard Admin**: Ringkasan penjualan hari ini, keuntungan, dan pesanan delivery terbaru.
- **Laporan Transaksi**: Riwayat lengkap transaksi POS dan Delivery beserta detail pelanggan.

## 🚀 Cara Menjalankan Project

### 1. Instalasi
Clone repository dan instal dependensi:
```bash
npm install
```

### 2. Konfigurasi Database (.env)
Pastikan MySQL sudah berjalan, lalu sesuaikan file `.env`:
```env
DATABASE_URL="mysql://root:PASSWORD@localhost:3306/dimsum_db"
```

### 3. Import Database MySQL
Terdapat dua cara untuk menyiapkan database:

#### Cara A: Menggunakan file SQL (Rekomendasi)
Import file `database.sql` yang ada di root project ke database MySQL Anda menggunakan phpMyAdmin atau MySQL CLI:
```bash
mysql -u root -p -P 3306 dimsum_db < database.sql
```

#### Cara B: Menggunakan Prisma Push
Jika database masih kosong dan ingin sinkronisasi langsung dari skema:
```bash
npx prisma db push
```

### 4. Jalankan Aplikasi
```bash
npm run dev
```
Aplikasi akan berjalan di [http://localhost:3000](http://localhost:3000).

## 🔐 Akun Admin
Akses panel admin di `/login`:
- **Username**: `admin`
- **Password**: `admin123`

---
**Disusun Oleh:** Dimas Wahyu Habibi
