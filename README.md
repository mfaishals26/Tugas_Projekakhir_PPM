# 📦 NusaStock - Smart Inventory Management

**NusaStock** adalah aplikasi manajemen inventaris modern yang dirancang khusus untuk membantu UMKM mengelola stok barang secara efisien. Proyek ini dikembangkan sebagai **Tugas Akhir Mata Kuliah Pemrograman Perangkat Mobile (Sesi 14)**.

Aplikasi ini mengusung konsep **Hybrid Storage (Offline-First)**, di mana operasional harian berjalan melalui database lokal untuk kecepatan maksimal, namun tetap terintegrasi dengan Cloud untuk keamanan data.

---

## 👤 Identitas Pengembang
- **Nama:** Muhammad Faishal Setiawan
- **NIM:** 20230040146
- **Kelas:** TI23F
- **Link Demo:** https://drive.google.com/file/d/1UOELtp268RX7HQWwr_IvtaBh4GaI2LKZ/view

---

## 🚀 Fitur Utama (Berdasarkan Checklist Penilaian)

### 1. Core Functionality (Full CRUD)
- **Create:** Menambah barang baru ke database.
- **Read:** Menampilkan daftar inventaris secara real-time.
- **Update:** Memperbarui stok dan harga barang.
- **Delete:** Menghapus data barang dari sistem.

### 2. Local & Cloud Storage
- **SQLite (Offline-First):** Menggunakan `expo-sqlite` sebagai penyimpanan utama agar aplikasi tetap berjalan tanpa internet.
- **Firebase Firestore:** Fitur **Cloud Sync** untuk mencadangkan data lokal ke awan secara aman.

### 3. Authentication
- **Firebase Auth:** Sistem login yang aman untuk melindungi data akses inventaris pemilik usaha.

### 4. Performance Optimization
- **Memoization:** Implementasi `React.memo` pada komponen item list untuk mencegah re-render yang tidak perlu.
- **Hooks Optimization:** Penggunaan `useMemo` untuk kalkulasi nilai aset dan `useCallback` untuk stabilitas fungsi.
- **FlatList Optimization:** Rendering daftar barang yang efisien untuk menangani data berjumlah besar.

### 5. UI/UX & Animation
- **Responsive Design:** Layout adaptif menggunakan `react-native-responsive-screen` (support HP & Tablet).
- **Meaningful Animation:** Efek transisi halus menggunakan `react-native-reanimated` untuk feedback interaksi pengguna.

### 6. Automated Testing
- **Unit Testing:** Pengujian logika bisnis kalkulasi inventaris menggunakan **Jest** (Semua skenario: `PASS`).

---

## 🛠️ Tech Stack
- **Framework:** React Native (Expo SDK 54)
- **Navigation:** Expo Router (File-based Routing)
- **Database:** SQLite & Firebase Firestore
- **Animation:** React Native Reanimated
- **Testing:** Jest & Jest-Expo
- **Icons:** Expo Vector Icons (Ionicons)

---

## 📁 Struktur Folder
```text
NusaStock/
├── app/                # Navigasi & Halaman Utama (Expo Router)
├── components/         # Komponen UI yang di-memoize
├── database/           # Logika Database SQLite (db.ts)
├── src/
│   ├── services/       # Konfigurasi Firebase & Cloud Sync
│   └── __tests__/      # File Unit Testing (Jest)
├── metro.config.js     # Konfigurasi penanganan file .wasm
└── babel.config.js     # Konfigurasi plugin Reanimated



# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
