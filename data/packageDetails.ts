export interface PackageDetail {
  slug: string;
  name: string;
  tagline: string;
  description: string[];
  highlights: { title: string; desc: string }[];
  includes: string[];
  excludes: string[];
  schedule: { time: string; activity: string }[];
  tips: string[];
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
    tagline: "Jelajahi 4 Air Terjun Tersembunyi dalam Satu Perjalanan",
    description: [
      "Curug Cibingbin adalah paket trekking unggulan SentulTrip yang membawa Anda menyusuri jalur hutan alami di kawasan Babakan Madang, Sentul, Bogor. Dalam satu perjalanan selama 5 jam, Anda akan mengunjungi empat air terjun berbeda yang tersembunyi di balik lebatnya pepohonan.",
      "Jalur trekking ini melewati sungai berbatu, tebing berlumut, dan hutan tropis yang masih terjaga keasliannya. Guide lokal kami — warga asli Sentul dengan pengalaman lebih dari 10 tahun — akan memandu setiap langkah perjalanan dengan aman dan informatif.",
      "Paket ini cocok untuk pemula hingga peserta berpengalaman. Tingkat kesulitan sedang dengan beberapa tanjakan dan penyeberangan sungai dangkal. Tidak diperlukan perlengkapan khusus selain alas kaki yang nyaman.",
    ],
    highlights: [
      {
        title: "4 Air Terjun dalam 1 Trip",
        desc: "Kunjungi Curug Cibingbin, Curug Ngageleuk, dan dua curug tersembunyi lainnya yang jarang diketahui wisatawan umum.",
      },
      {
        title: "Susur Sungai & Trekking",
        desc: "Kombinasi jalur hutan dan susur sungai berbatu memberikan pengalaman alam yang lengkap dan tidak membosankan.",
      },
      {
        title: "Guide Lokal Berpengalaman",
        desc: "Dipandu warga asli Sentul yang hafal setiap jalur, titik aman, dan cerita di balik setiap destinasi.",
      },
    ],
    includes: [
      "Jasa guide lokal berpengalaman",
      "Tiket masuk semua destinasi",
      "Air minum selama perjalanan",
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
    tips: [
      "Gunakan sandal gunung atau sepatu yang tidak licin di air",
      "Bawa baju ganti minimal 1 set — jalur melewati sungai",
      "Datang tepat waktu, trekking dimulai pagi untuk menghindari terik",
      "Bawa bekal makanan ringan untuk energi di perjalanan",
      "Anak-anak minimal usia 8 tahun diperbolehkan ikut",
    ],
    meetingPoint: "Kp. Cibingbin, Desa Bojong Koneng, Babakan Madang, Bogor",
    capacity: "2 – 30 orang per sesi",
    difficulty: "Sedang",
    minAge: "8 tahun",
    photos: Array.from({ length: 10 }, (_, i) => `/produk/curug-cibingbin/${i + 1}.jpeg`),
    photoOrientations: ["portrait","portrait","landscape","landscape","landscape","landscape","portrait","portrait","portrait","portrait"],
  },
  {
    slug: "curug-bidadari",
    name: "Trekking Curug Bidadari",
    tagline: "Air Terjun Jernih di Tengah Hutan Sentul yang Asri",
    description: [
      "Curug Bidadari adalah destinasi trekking favorit di kawasan Sentul Bogor, dikenal dengan aliran air yang jernih dan suasana hutan yang tenang. Jalur trekking sepanjang 4 jam ini cocok untuk keluarga, pasangan, maupun grup pemula yang ingin merasakan petualangan alam tanpa harus memiliki pengalaman mendaki sebelumnya.",
      "Nama 'Bidadari' lahir dari keindahan air terjun yang bertingkat dengan kolam alami di bawahnya — jernih dan segar sepanjang tahun. Jalur menuju curug melewati kebun warga, hutan pinus muda, dan sungai kecil yang menyejukkan.",
      "Bersama guide lokal SentulTrip, Anda akan mendapat penjelasan tentang ekosistem lokal, cerita rakyat setempat, serta titik-titik foto terbaik yang hanya diketahui warga asli Sentul.",
    ],
    highlights: [
      {
        title: "Air Terjun Bertingkat",
        desc: "Curug Bidadari memiliki aliran bertingkat dengan kolam alami yang bisa digunakan untuk berenang atau sekedar menikmati kesejukan.",
      },
      {
        title: "Cocok untuk Keluarga",
        desc: "Jalur lebih pendek dan tingkat kesulitan ringan menjadikannya pilihan ideal untuk keluarga dengan anak-anak atau peserta pemula.",
      },
      {
        title: "Alam yang Belum Ramai",
        desc: "Berbeda dengan destinasi wisata massal, Curug Bidadari masih terjaga kealamiannya dan jarang dijangkau wisatawan umum.",
      },
    ],
    includes: [
      "Jasa guide lokal berpengalaman",
      "Tiket masuk destinasi",
      "Air minum selama perjalanan",
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
    tips: [
      "Gunakan alas kaki yang tidak licin — jalur melewati batu basah",
      "Bawa baju ganti karena kolam curug sangat menggoda untuk nyebur",
      "Waktu terbaik pagi hari sebelum jam 10 untuk kondisi air paling jernih",
      "Cocok untuk anak-anak minimal usia 6 tahun",
      "Bawa sunscreen dan topi untuk jalur terbuka",
    ],
    meetingPoint: "Kp. Cibingbin, Desa Bojong Koneng, Babakan Madang, Bogor",
    capacity: "2 – 25 orang per sesi",
    difficulty: "Ringan – Sedang",
    minAge: "6 tahun",
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
