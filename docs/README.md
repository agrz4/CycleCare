# 🌸 CycleCare — Menstrual & Ovulation Calendar App

> Aplikasi React Native untuk membantu pasangan memahami siklus menstruasi dan ovulasi, serta panduan tindakan di setiap fase.

---

## 📋 Deskripsi

**CycleCare** adalah aplikasi mobile berbasis React Native yang dirancang untuk pasangan. Perempuan dapat mencatat siklus menstruasi dan ovulasinya, sementara pasangan (laki-laki) dapat melihat fase yang sedang berlangsung beserta panduan praktis — mulai dari cara mendukung secara emosional, waktu terbaik untuk berhubungan intim, hingga hal-hal yang perlu dihindari di setiap fase.

---

## ✨ Fitur Utama

| Fitur | Deskripsi |
|---|---|
| 📅 Kalender Menstruasi | Catat hari pertama & durasi menstruasi |
| 🥚 Kalender Ovulasi | Prediksi otomatis masa subur & ovulasi |
| 💑 Mode Pasangan | Tampilan khusus untuk pasangan dengan panduan tindakan |
| 🔔 Notifikasi Cerdas | Pengingat fase, mood, dan momen penting |
| 📊 Analisis Siklus | Grafik dan prediksi siklus ke depan |
| 📝 Jurnal Gejala | Catat mood, nyeri, dan gejala harian |

---

## 🗓️ Fase Siklus & Panduan Pasangan

### 1. 🔴 Fase Menstruasi (Hari 1–5)
**Apa yang terjadi:** Lapisan rahim luruh, hormon di titik terendah.

**Yang bisa dilakukan pasangan:**
- Siapkan heating pad / bantal hangat untuk meredakan kram
- Sediakan makanan favoritnya (cokelat, teh hangat)
- Hindari mengajak keluar untuk aktivitas berat
- Berikan pelukan dan kehadiran — bukan solusi
- Tanyakan dengan lembut: *"Kamu butuh apa hari ini?"*

**Hindari:**
- Membahas topik berat atau konflik
- Memaksanya beraktivitas
- Komentar soal mood atau sensitifitasnya

---

### 2. 🟡 Fase Folikuler (Hari 6–13)
**Apa yang terjadi:** Estrogen naik, energi meningkat, mood membaik.

**Yang bisa dilakukan pasangan:**
- Ajak aktivitas seru: hiking, nonton, dinner date
- Waktu ideal untuk diskusi penting atau rencana bersama
- Dukung hobi dan produktivitasnya
- Beri pujian — ia sedang dalam mood terbaik

**Hindari:**
- Tidak ada pantangan khusus — ini fase terbaik!

---

### 3. 🟢 Fase Ovulasi (Hari 14–16) ⭐ Masa Subur
**Apa yang terjadi:** Sel telur dilepaskan, libido tinggi, energi puncak.

**Yang bisa dilakukan pasangan:**
- Waktu terbaik untuk berhubungan intim (jika merencanakan kehamilan)
- Rencanakan momen romantis
- Ia sangat komunikatif & percaya diri — manfaatkan untuk obrolan mendalam
- Beri perhatian ekstra dan afeksi fisik

**Catatan:** Tanda ovulasi — suhu basal tubuh naik, lendir serviks seperti putih telur mentah.

---

### 4. 🟠 Fase Luteal (Hari 17–28)
**Apa yang terjadi:** Progesteron dominan, PMS mungkin muncul, tubuh bersiap menstruasi berikutnya.

**Yang bisa dilakukan pasangan:**
- Lebih sabar dan pengertian — perubahan mood normal
- Bantu pekerjaan rumah tanpa diminta
- Sediakan camilan sehat (ia mungkin lebih lapar)
- Validasi perasaannya: *"Aku ngerti ini berat buat kamu"*
- Kurangi ekspektasi sosial di akhir fase ini

**Hindari:**
- Komentar *"Kamu PMS ya?"* — sangat tidak membantu
- Meninggalkannya sendirian tanpa kabar
- Membahas keuangan atau keputusan besar di fase akhir

---

## 🛠️ Tech Stack

```
React Native 0.74+
TypeScript
React Navigation 6
Redux Toolkit / Zustand (state management)
React Native Calendars
AsyncStorage / SQLite (penyimpanan lokal)
Firebase (notifikasi push & sinkronisasi pasangan)
date-fns (manipulasi tanggal)
```

---

## 📁 Struktur Proyek

```
CycleCare/
├── src/
│   ├── screens/
│   │   ├── HomeScreen.tsx          # Dashboard utama
│   │   ├── CalendarScreen.tsx      # Kalender siklus
│   │   ├── PartnerScreen.tsx       # Mode tampilan pasangan
│   │   ├── LogSymptomScreen.tsx    # Catat gejala harian
│   │   ├── InsightScreen.tsx       # Analisis & prediksi
│   │   └── SettingsScreen.tsx      # Pengaturan profil & siklus
│   │
│   ├── components/
│   │   ├── CycleCalendar.tsx       # Komponen kalender berwarna
│   │   ├── PhaseCard.tsx           # Kartu info fase aktif
│   │   ├── PartnerGuideCard.tsx    # Panduan tindakan pasangan
│   │   ├── SymptomLogger.tsx       # Form log gejala
│   │   └── CycleChart.tsx          # Grafik analisis siklus
│   │
│   ├── hooks/
│   │   ├── useCycleCalculator.ts   # Logika hitung ovulasi & fase
│   │   ├── useNotifications.ts     # Push notification
│   │   └── usePartnerSync.ts       # Sinkronisasi data ke pasangan
│   │
│   ├── store/
│   │   ├── cycleSlice.ts           # State siklus menstruasi
│   │   └── userSlice.ts            # State profil pengguna
│   │
│   ├── utils/
│   │   ├── cycleCalculator.ts      # Kalkulasi fase & prediksi
│   │   ├── dateHelpers.ts          # Utilitas tanggal
│   │   └── notifications.ts        # Konfigurasi notifikasi
│   │
│   └── types/
│       └── cycle.types.ts          # TypeScript interfaces
│
├── android/
├── ios/
├── __tests__/
├── App.tsx
├── package.json
└── README.md
```

---

## 🚀 Instalasi & Setup

### Prerequisites
- Node.js >= 18
- Aplikasi **Expo Go** terbaru terinstal di HP Android / iOS Anda.

### Clone & Install

```bash
# Clone repository
git clone https://github.com/username/cyclecare.git
cd cyclecare

# Install dependencies
npm install
# atau
yarn install
```

### Jalankan Aplikasi (Expo)

Jalankan perintah berikut pada terminal:
```bash
npx expo start
```
1. Pastikan HP dan Laptop WiFi yang sama.
2. Buka **Expo Go** pada ponsel, login jika diperlukan.
3. Gunakan fitur pemintas kamera/scanner QR Scanner bawaan Expo Go untuk memindai Barcode yang muncul.

**PENTING**: Jika muncul tulisan "*Project is incompatible with this version of Expo Go*", silahkan buka PlayStore, cari aplikasi "Expo Go" lalu pencet tombol **UPDATE** di HP Anda.

### Setup Firebase (untuk fitur Partner Sync)

Karena menggunakan Expo Go, kita akan memerlukan custom dev client ke depannya. Rincian konfigurasi `google-services.json` dapat dilihat pada [Expo Firebase Documentation](https://docs.expo.dev/guides/using-firebase/).

---

## 🧮 Logika Kalkulasi Siklus

```typescript
// src/utils/cycleCalculator.ts

export interface CyclePhase {
  name: string;
  startDay: number;
  endDay: number;
  color: string;
  partnerActions: string[];
}

export function calculateCyclePhases(
  lastPeriodStart: Date,
  cycleLength: number = 28,
  periodDuration: number = 5
): CyclePhase[] {
  return [
    {
      name: 'Menstruasi',
      startDay: 1,
      endDay: periodDuration,
      color: '#E53E3E',
      partnerActions: [
        'Siapkan heating pad',
        'Sediakan makanan favoritnya',
        'Berikan pelukan tanpa kata-kata',
      ],
    },
    {
      name: 'Folikuler',
      startDay: periodDuration + 1,
      endDay: 13,
      color: '#ECC94B',
      partnerActions: [
        'Ajak date menyenangkan',
        'Diskusi rencana ke depan',
        'Dukung aktivitas dan hobinya',
      ],
    },
    {
      name: 'Ovulasi',
      startDay: 14,
      endDay: 16,
      color: '#48BB78',
      partnerActions: [
        'Waktu terbaik untuk keintiman',
        'Rencanakan momen romantis',
        'Berikan perhatian ekstra',
      ],
    },
    {
      name: 'Luteal',
      startDay: 17,
      endDay: cycleLength,
      color: '#ED8936',
      partnerActions: [
        'Lebih sabar dan pengertian',
        'Bantu pekerjaan rumah',
        'Validasi perasaannya',
      ],
    },
  ];
}

export function getOvulationDate(lastPeriodStart: Date, cycleLength: number = 28): Date {
  const ovulationDay = cycleLength - 14;
  const ovulationDate = new Date(lastPeriodStart);
  ovulationDate.setDate(lastPeriodStart.getDate() + ovulationDay - 1);
  return ovulationDate;
}

export function getFertileWindow(ovulationDate: Date): { start: Date; end: Date } {
  const start = new Date(ovulationDate);
  start.setDate(ovulationDate.getDate() - 5);
  const end = new Date(ovulationDate);
  end.setDate(ovulationDate.getDate() + 1);
  return { start, end };
}
```

---

## 📱 Alur Pengguna (User Flow)

```
Onboarding
├── Pilih peran: Perempuan / Pasangan (Laki-laki)
├── Input siklus: Hari pertama haid terakhir + rata-rata panjang siklus
└── (Opsional) Hubungkan dengan kode pasangan

Perempuan (Main User)
├── Dashboard → fase aktif hari ini + prediksi
├── Kalender → tampilan warna per fase
├── Log Gejala → mood, nyeri, gejala lain
└── Insight → grafik siklus & prediksi 3 bulan ke depan

Pasangan (Partner Mode)
├── Dashboard → fase pasangan hari ini
├── Panduan → "Hari ini lakukan ini untuk dia"
├── Notifikasi → alert masuk fase baru
└── Tips → artikel & panduan per fase
```

---

## 🔔 Notifikasi yang Dikirim

| Notifikasi | Kapan |
|---|---|
| 🔴 Menstruasi akan dimulai | H-2 sebelum periode |
| 🥚 Masa subur dimulai | Hari pertama fertile window |
| 💚 Hari ovulasi! | Tepat di hari ovulasi |
| 🟠 PMS mungkin muncul | Masuk fase luteal |
| 💊 Pengingat suplemen | Sesuai pengaturan pengguna |

---

## 🤝 Kontribusi

Pull request sangat disambut! Untuk perubahan besar, buka issue terlebih dahulu.

```bash
git checkout -b feature/nama-fitur
git commit -m 'feat: tambah fitur baru'
git push origin feature/nama-fitur
```

---

## 📄 Lisensi

MIT License — bebas digunakan dan dimodifikasi.

---

## 🏗️ Panduan Setup Project dari Awal (Inisialisasi)

Penyelesaian setup react native dari awal menggunakan Expo (`create-expo-app`):

### 1. Inisialisasi Project Baru
```bash
npx create-expo-app@latest CycleCare --template blank-typescript
cd CycleCare
```

### 2. Instalasi Dependensi Inti

Instal library utama yang berjalan di project ini:
```bash
npm install @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context
npm install react-native-calendars date-fns
npm install @reduxjs/toolkit react-redux
```

---

## 💬 Catatan untuk Pasangan

> *"Memahami siklus pasanganmu bukan tentang mengontrol, tapi tentang hadir dengan cara yang tepat di waktu yang tepat. Aplikasi ini membantumu menjadi pasangan yang lebih peka dan penuh kasih."* 💕

---

<div align="center">
  Dibuat dengan ❤️ untuk pasangan yang saling peduli
</div>
