# ✨ Fitur & Pembaruan UI CycleCare (Terbaru)

Dokumen ini mencatat pembaruan antarmuka (UI) premium dan fitur interaktif yang telah diimplementasikan untuk meningkatkan pengalaman pengguna.

---

## 🎨 Pembaruan Desain Premium (UI/UX)

### 1. Dashboard Redesign
*   **Aesthetic Background**: Menggunakan *Linear Gradient* berwarna pink lembut yang memberikan kesan modern dan futuristik.
*   **Serif Typography**: Menggunakan font Serif (Georgia/System Serif) untuk nama dan judul utama, memberikan kesan mewah dan eksklusif.
*   **Custom Phase Arch**: Indikator fase siklus berbentuk busur (arch) yang dinamis, menunjukkan fase aktif (seperti Fase Folikuler) dan hitungan mundur hari menuju menstruasi berikutnya.
*   **Partner Reminder Card**: Kartu pesan dari pasangan dengan gaya *frosted glass* (transparan), lengkap dengan avatar pasangan dan ikon hati.

### 2. Kalender Interaktif
*   **Weekly Navigation Slider**: Slider mingguan horizontal yang memungkinkan pengguna memilih tanggal secara spesifik.
*   **Navigasi Minggu**: Tombol panah (kiri/kanan) untuk berpindah antar minggu dengan mudah.
*   **Monthly Modal Overview**: Klik ikon kalender untuk membuka modal kalender bulanan penuh, memudahkan melihat gambaran siklus dari awal hingga akhir bulan.
*   **Today Indicator**: Penanda khusus "hari ini" menggunakan lingkaran merah dan dot indikator agar pengguna tidak kehilangan fokus pada tanggal saat ini.
*   **Insight Tiles**: Tampilan kategori informasi (Tidur, Energi, Mood) menggunakan kotak warna-warni yang estetik dan bersih.

---

## ⚙️ Fitur Interaktif Baru

### 1. Haptic Feedback (Getar)
*   Integrasi `expo-haptics` untuk memberikan respon fisik (vibrasi ringan) saat pengguna:
    *   Memilih tanggal di kalender.
    *   Berpindah minggu.
    *   Membuka modal kalender bulanan.
    *   Menekan tombol "Kirim Kasih Sayang".

### 2. Fitur "Send Love to Partner"
*   **Interaksi Langsung**: Tombol khusus untuk mengirimkan perhatian/kasih sayang ke pasangan.
*   **Success State**: Tombol akan berubah menjadi centang hijau dan memberikan getaran khusus (Success Haptics) sebagai konfirmasi bahwa pesan telah terkirim.

### 3. Penyelarasan Visual (Alignment)
*   **Grid Termodern**: Penyelarasan strip 9-hari pada kalender dashboard agar sejajar secara presisi dengan bar navigasi 3-tab di bagian bawah.
*   **Pill Style Selection**: Desain penanda tanggal terpilih berbentuk "pill" merah yang melingkupi huruf hari dan angka tanggal secara simetris.

---

## 🛠️ Integrasi Data (State Management)
*   **Zustand Store**: Sinkronisasi data antara profil pengguna (Nama, Nama Pasangan) dengan pesan pengingat yang muncul di Dashboard.
*   **Format Tanggal**: Menggunakan `date-fns` untuk memastikan semua perhitungan hari dan format nama bulan akurat dan rapi.

---

## 📱 Tech Stack yang Digunakan (Update)
*   **expo-linear-gradient**: Untuk latar belakang gradasi premium.
*   **expo-haptics**: Untuk pengalaman interaksi fisik.
*   **react-native-calendars**: Untuk modal kalender bulanan.
*   **react-native-svg**: Untuk elemen visual kustom (seperti navbar kurva sebelumnya).

---
<div align="center">
  Dibuat dengan ❤️ untuk pengalaman CycleCare yang lebih baik.
</div>
