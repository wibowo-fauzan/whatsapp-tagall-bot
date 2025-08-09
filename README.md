# 📢 WhatsApp Group Tag All Bot

Bot WhatsApp ini dibuat dengan [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js) untuk menandai semua anggota grup menggunakan perintah `@ping`.

## ✨ Fitur
- Perintah `@ping` untuk mention semua member di grup.
- Membalas otomatis ke pesan yang mengirim `@ping`.
- Menambahkan teks khusus setelah mention.
- Otomatis deteksi apakah chat adalah grup atau bukan.

---

## 📦 Instalasi

### 1. Persiapan
Pastikan sudah menginstal:
- [Node.js](https://nodejs.org/) minimal versi **18**
- [Git](https://git-scm.com/)

---

### 2. Clone Repository
```bash
git clone https://github.com/username/namarepo.git
cd namarepo
```

---

### 3. Instalasi Dependencies
Install semua dependencies yang dibutuhkan:
```bash
npm install
```

Atau install manual:
```bash
npm install whatsapp-web.js
npm install qrcode-terminal
```

Opsional (untuk auto-restart saat develop):
```bash
npm install -g nodemon
```

---

### 4. Jalankan Bot
Tanpa nodemon:
```bash
node bot.js
```

Dengan nodemon:
```bash
nodemon bot.js
```

---

## 📝 Catatan
- Saat pertama kali dijalankan, bot akan menampilkan **QR Code** di terminal.  
  Scan menggunakan WhatsApp di HP kamu:  
  `WhatsApp > Menu > Perangkat Tertaut > Tautkan Perangkat`
- Pastikan WhatsApp Web tetap aktif agar bot berjalan.
- Bot hanya bisa menjalankan perintah `@ping` di **grup**, bukan di chat pribadi.

---

## 📄 Lisensi
Proyek ini dirilis di bawah lisensi **MIT**.  
Silakan digunakan, dimodifikasi, dan disebarkan sesuai kebutuhan.