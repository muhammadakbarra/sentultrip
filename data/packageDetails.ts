export interface PackageDetail {
  slug: string;
  name: string;
  tagline: string;
  shortDescription: string;
  price: number;
  duration: string;
  distance?: string;
  locationArea: string;
  routeType: string;
  bestTime: string;
  suitableFor: string[];
  description: string[];
  highlights: { title: string; desc: string }[];
  includes: string[];
  excludes: string[];
  schedule: { time: string; activity: string }[];
  whatToBring: string[];
  safetyNotes: string[];
  faq: { question: string; answer: string }[];
  meetingPoint: string;
  capacity: string;
  difficulty: string;
  minAge: string;
  photos: string[];
  photoOrientations: ("portrait" | "landscape")[];
}

const packageDetails: PackageDetail[] = [
  {
    slug: "curug-cibingbin",
    name: "Trekking Curug Cibingbin",
    tagline: "Susur sungai dan eksplor beberapa curug dalam satu jalur Sentul",
    shortDescription:
      "Paket trekking Sentul untuk kamu yang ingin jalur lebih variatif: hutan, sungai berbatu, dan beberapa spot air terjun dalam satu perjalanan.",
    price: 150000,
    duration: "±5–6 jam",
    distance: "±4–6 km",
    locationArea: "Bojong Koneng, Babakan Madang, Bogor",
    routeType: "Hutan, sungai berbatu, area curug",
    bestTime: "Pagi hari, mulai 07.00–08.00",
    suitableFor: ["Pemula aktif", "Komunitas", "Outing kantor", "Keluarga dengan anak 3+"],
    description: [
      "Curug Cibingbin cocok untuk peserta yang ingin trekking ringan tapi tetap terasa petualangannya. Jalurnya melewati perkampungan, area hijau, sungai berbatu, dan beberapa titik curug yang bisa jadi tempat istirahat, foto, atau main air.",
      "Rute dapat menyesuaikan kondisi cuaca dan kemampuan peserta. Umumnya perjalanan mencakup Curug Cibingbin, Curug 3 Perjaka, Curug Ngumpet, dan spot sungai/curug lain di kawasan sekitar.",
    ],
    highlights: [
      {
        title: "Beberapa Curug dalam 1 Jalur",
        desc: "Eksplor Curug Cibingbin, Curug 3 Perjaka, Curug Ngumpet, dan spot air lain sesuai kondisi jalur.",
      },
      {
        title: "Susur Sungai & Trekking",
        desc: "Kombinasi jalur tanah, bebatuan, dan sungai membuat perjalanan lebih hidup dan tidak monoton.",
      },
      {
        title: "Guide Lokal Berpengalaman",
        desc: "Dipandu tim lokal yang mengenal jalur, titik aman, dan ritme perjalanan peserta.",
      },
    ],
    includes: [
      "Jasa guide lokal berpengalaman",
      "Tiket masuk semua destinasi",
      "Air mineral selama perjalanan",
      "Dokumentasi foto perjalanan",
      "P3K dasar",
    ],
    excludes: [
      "Transportasi dari dan ke titik kumpul",
      "Makan siang",
      "Perlengkapan pribadi (sandal gunung, baju ganti)",
      "Asuransi perjalanan",
    ],
    schedule: [
      { time: "07.00", activity: "Kumpul di meeting point Kp. Cibingbin" },
      { time: "07.15", activity: "Briefing singkat dan perkenalan guide" },
      { time: "07.30", activity: "Mulai trekking menuju Curug pertama" },
      { time: "08.30", activity: "Tiba di Curug Cibingbin — sesi foto & berenang" },
      { time: "09.30", activity: "Lanjut ke Curug Ngageleuk dan curug berikutnya" },
      { time: "11.00", activity: "Istirahat dan makan bekal di area curug" },
      { time: "11.30", activity: "Trekking kembali ke titik awal" },
      { time: "12.30", activity: "Selesai — kembali ke meeting point" },
    ],
    whatToBring: [
      "Gunakan sandal gunung atau sepatu yang tidak licin di air",
      "Bawa baju ganti minimal 1 set — jalur melewati sungai",
      "Bawa plastik/dry bag untuk pakaian basah dan barang elektronik",
      "Bawa bekal makanan ringan untuk energi di perjalanan",
      "Obat pribadi jika punya kebutuhan khusus",
    ],
    safetyNotes: [
      "Jalur bisa licin setelah hujan, ikuti arahan guide saat melewati batu dan sungai.",
      "Rute dapat dipersingkat atau diubah jika cuaca kurang aman.",
      "Peserta anak-anak wajib didampingi orang dewasa.",
    ],
    faq: [
      { question: "Apakah cocok untuk pemula?", answer: "Cocok untuk pemula yang cukup aktif. Jalurnya tidak ekstrem, tapi ada bagian sungai dan bebatuan yang perlu hati-hati." },
      { question: "Apakah bisa private trip?", answer: "Bisa. Jadwal dan jumlah peserta bisa dikonfirmasi langsung lewat WhatsApp." },
      { question: "Kalau hujan bagaimana?", answer: "Guide akan menilai kondisi jalur. Jika kurang aman, rute bisa disesuaikan atau dijadwalkan ulang sesuai kesepakatan." },
      { question: "Apakah harga termasuk transportasi?", answer: "Belum termasuk transportasi dari/ke meeting point. Peserta datang langsung ke titik kumpul." },
    ],
    meetingPoint: "Kp. Cibingbin, Desa Bojong Koneng, Babakan Madang, Bogor",
    capacity: "2 – 30 orang per sesi",
    difficulty: "Sedang",
    minAge: "3 tahun",
    photos: Array.from({ length: 10 }, (_, i) => `/produk/curug-cibingbin/${i + 1}.jpeg`),
    photoOrientations: ["portrait","portrait","landscape","landscape","landscape","landscape","portrait","portrait","portrait","portrait"],
  },
  {
    slug: "curug-bidadari",
    name: "Trekking Curug Bidadari",
    tagline: "Trekking ringan ke air terjun besar yang ramah untuk keluarga",
    shortDescription:
      "Paket trekking ringan menuju Curug Bidadari Sentul. Cocok untuk keluarga, anak-anak, dan peserta pemula yang ingin main air tanpa jalur terlalu berat.",
    price: 150000,
    duration: "±3–4 jam",
    distance: "±3–4 km",
    locationArea: "Bojong Koneng, Babakan Madang, Bogor",
    routeType: "Perkampungan, area hijau, sungai kecil, curug",
    bestTime: "Pagi hari sebelum area ramai",
    suitableFor: ["Keluarga", "Anak-anak 3+", "Pemula", "Grup santai"],
    description: [
      "Curug Bidadari adalah pilihan yang lebih santai untuk menikmati alam Sentul. Jalurnya relatif ringan, pemandangannya variatif, dan tujuan utamanya adalah air terjun besar dengan area bermain air yang cocok untuk keluarga.",
      "Paket ini pas untuk peserta yang baru pertama kali trekking, rombongan keluarga, atau grup yang ingin aktivitas alam tanpa jalur terlalu menantang.",
    ],
    highlights: [
      {
        title: "Air Terjun Bertingkat",
        desc: "Air terjun besar dengan area bermain air yang menyegarkan, cocok untuk foto dan santai bersama rombongan.",
      },
      {
        title: "Cocok untuk Keluarga",
        desc: "Jalur lebih ringan dan durasi lebih singkat, cocok untuk anak-anak, keluarga, dan peserta baru.",
      },
      {
        title: "Rute Santai tapi Tetap Seru",
        desc: "Perjalanan melewati area hijau, perkampungan, dan sungai kecil sehingga tetap terasa seperti petualangan ringan.",
      },
    ],
    includes: [
      "Jasa guide lokal berpengalaman",
      "Tiket masuk destinasi",
      "Air mineral selama perjalanan",
      "Dokumentasi foto perjalanan",
      "P3K dasar",
    ],
    excludes: [
      "Transportasi dari dan ke titik kumpul",
      "Makan siang",
      "Perlengkapan pribadi (sandal gunung, baju ganti)",
      "Asuransi perjalanan",
    ],
    schedule: [
      { time: "07.00", activity: "Kumpul di meeting point Kp. Cibingbin" },
      { time: "07.15", activity: "Briefing singkat dan perkenalan guide" },
      { time: "07.30", activity: "Mulai trekking menuju Curug Bidadari" },
      { time: "08.45", activity: "Tiba di Curug Bidadari — sesi foto & berenang" },
      { time: "10.00", activity: "Istirahat dan makan bekal di area curug" },
      { time: "10.30", activity: "Trekking kembali ke titik awal" },
      { time: "11.30", activity: "Selesai — kembali ke meeting point" },
    ],
    whatToBring: [
      "Gunakan alas kaki yang tidak licin — jalur melewati batu basah",
      "Bawa baju ganti karena kolam curug sangat menggoda untuk nyebur",
      "Bawa sunscreen dan topi untuk jalur terbuka",
      "Bawa snack ringan dan obat pribadi bila diperlukan",
      "Siapkan plastik/dry bag untuk pakaian basah",
    ],
    safetyNotes: [
      "Anak-anak tetap wajib didampingi orang dewasa selama perjalanan.",
      "Area batu dan sungai bisa licin, gunakan alas kaki yang aman.",
      "Jadwal terbaik pagi hari agar perjalanan lebih nyaman.",
    ],
    faq: [
      { question: "Apakah jalurnya cocok untuk anak-anak?", answer: "Ya, paket ini lebih ramah untuk anak-anak mulai usia 3 tahun dengan pendamping orang dewasa." },
      { question: "Apakah bisa berenang?", answer: "Bisa jika kondisi air dan cuaca aman. Tetap ikuti arahan guide di lokasi." },
      { question: "Berapa lama perjalanan?", answer: "Umumnya sekitar 3–4 jam, tergantung ritme peserta dan waktu bermain di area curug." },
      { question: "Apakah cocok untuk pemula?", answer: "Sangat cocok untuk pemula karena jalurnya lebih ringan dibanding paket curug yang lebih panjang." },
    ],
    meetingPoint: "Kp. Cibingbin, Desa Bojong Koneng, Babakan Madang, Bogor",
    capacity: "2 – 25 orang per sesi",
    difficulty: "Ringan – Sedang",
    minAge: "3 tahun",
    photos: Array.from({ length: 7 }, (_, i) => `/produk/curug-bidadari/${i + 1}.jpeg`),
    photoOrientations: ["portrait","portrait","portrait","portrait","portrait","portrait","portrait"],
  },
];

export function getPackageDetail(slug: string): PackageDetail | undefined {
  return packageDetails.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return packageDetails.map((p) => p.slug);
}

export default packageDetails;
