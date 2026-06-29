export interface PackageDetail {
  slug: string;
  name: string;
  tagline: string;
  shortDescription: string;
  price: number;
  marketPrice?: number;
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
}

const packageDetails: PackageDetail[] = [
  {
    slug: "curug-cibingbin",
    name: "Trekking Curug Cibingbin",
    tagline: "Susur sungai dan eksplor beberapa curug dalam satu jalur Sentul",
    shortDescription:
      "Paket trekking Sentul untuk kamu yang ingin jalur lebih variatif: hutan, sungai berbatu, dan beberapa spot air terjun dalam satu perjalanan.",
    price: 150000,
    marketPrice: 200000,
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
  },
  {
    slug: "curug-bidadari",
    name: "Trekking Curug Bidadari",
    tagline: "Trekking ringan ke air terjun besar yang ramah untuk keluarga",
    shortDescription:
      "Paket trekking ringan menuju Curug Bidadari Sentul. Cocok untuk keluarga, anak-anak, dan peserta pemula yang ingin main air tanpa jalur terlalu berat.",
    price: 150000,
    marketPrice: 200000,
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
  },
  {
    slug: "desa-cisadon",
    name: "Trekking Desa Cisadon",
    tagline: "Jelajahi desa terpencil di ketinggian 1.100 mdpl lewat jalur pinus dan sawah terasering",
    shortDescription:
      "Trekking ±14 km pulang–pergi menuju Desa Cisadon yang tersembunyi di pegunungan Sentul. Melewati hutan pinus, kebun kopi, sawah terasering, dan punggungan bukit dengan panorama terbuka.",
    price: 200000,
    marketPrice: 275000,
    duration: "±5–6 jam",
    distance: "±14 km (pp)",
    locationArea: "Garuda Farm – Desa Cisadon, Babakan Madang, Bogor",
    routeType: "Tanah, bebatuan, hutan pinus, perkebunan, sawah terasering",
    bestTime: "Pagi hari, start pukul 07.00",
    suitableFor: ["Pemula aktif", "Menengah", "Komunitas", "Pecinta alam", "Outing kantor", "Keluarga dengan anak 3+"],
    description: [
      "Trekking menuju Desa Cisadon adalah salah satu rute paling ikonik di Sentul. Perjalanan ±7 km sekali jalan membawa kamu melewati beragam lanskap — dari kebun kopi dan hutan pinus yang teduh, hingga punggungan bukit terbuka dengan panorama pegunungan yang luas.",
      "Sesampainya di Desa Cisadon (±1.100 mdpl), suasana desa yang tenang dan udara segar menjadi hadiah terbaik dari perjalanan panjang ini. Makan siang di warung warga sambil menikmati pemandangan adalah pengalaman yang sulit dilupakan.",
      "Rute kembali melalui jalur yang sama menuju Garuda Farm. Level Easy–Moderate — cocok untuk pemula dengan kondisi fisik cukup aktif.",
    ],
    highlights: [
      {
        title: "Desa Terpencil di Ketinggian 1.100 mdpl",
        desc: "Desa Cisadon adalah desa yang tenang di pegunungan Sentul, jauh dari keramaian kota — akses hanya bisa ditempuh dengan trekking.",
      },
      {
        title: "Lanskap Beragam Sepanjang Jalur",
        desc: "Jalur melewati perkebunan kopi, hutan pinus, sawah terasering, dan punggungan bukit dengan pemandangan terbuka ke segala arah.",
      },
      {
        title: "Makan Siang di Warung Warga",
        desc: "Menikmati makanan sederhana warga lokal di tengah suasana desa pegunungan — momen yang paling ditunggu setiap peserta.",
      },
      {
        title: "Trekking Jarak Menengah",
        desc: "±14 km pulang–pergi dengan durasi 5–6 jam, cukup menantang tapi tetap ramah untuk pemula aktif.",
      },
    ],
    includes: [
      "Jasa guide lokal berpengalaman",
      "Air mineral selama perjalanan",
      "Dokumentasi foto perjalanan",
      "P3K dasar",
    ],
    excludes: [
      "Transportasi dari dan ke titik kumpul",
      "Makan siang di desa (bayar sendiri di warung warga, terjangkau)",
      "Perlengkapan pribadi (sepatu trekking, baju ganti)",
      "Asuransi perjalanan",
      "Tiket masuk (jika ada retribusi lokal)",
    ],
    schedule: [
      { time: "07.00", activity: "Registrasi & briefing di Garuda Farm / Bojong Koneng" },
      { time: "07.30", activity: "Mulai trekking menuju Pondok Pemburu" },
      { time: "08.30", activity: "Tiba di Pondok Pemburu — istirahat singkat" },
      { time: "09.45", activity: "Tiba di Bukit Cisadon — foto dengan panorama pegunungan" },
      { time: "10.30", activity: "Tiba di Desa Cisadon" },
      { time: "11.00", activity: "Istirahat & makan siang di warung warga" },
      { time: "12.00", activity: "Mulai perjalanan kembali menuju Garuda Farm" },
      { time: "14.00", activity: "Finish di Garuda Farm" },
    ],
    whatToBring: [
      "Sepatu trekking atau sandal gunung dengan grip kuat — wajib, jalur berbatu dan berdebu",
      "Baju ganti minimal 1 set",
      "Bekal makanan ringan dan air minum ekstra untuk di perjalanan",
      "Topi dan sunscreen untuk jalur terbuka di punggungan bukit",
      "Obat pribadi jika punya kebutuhan khusus",
      "Uang tunai untuk makan di warung warga",
    ],
    safetyNotes: [
      "Jalur bisa licin dan berdebu tergantung kondisi cuaca — pastikan alas kaki memadai.",
      "Jaga ritme jalan dan ikuti panduan guide, terutama di tanjakan punggungan bukit.",
      "Perjalanan cukup panjang (±14 km), pastikan kondisi fisik siap. Anak-anak wajib didampingi orang dewasa.",
      "Rute dapat dipersingkat jika kondisi cuaca buruk atau peserta kelelahan.",
    ],
    faq: [
      { question: "Apakah cocok untuk pemula?", answer: "Cocok untuk pemula yang aktif dan terbiasa berjalan jauh. Jalurnya tidak ekstrem, tapi jaraknya ±14 km pp jadi butuh stamina yang cukup." },
      { question: "Berapa lama perjalanannya?", answer: "Sekitar 5–6 jam termasuk istirahat di desa. Durasi bisa berubah sesuai ritme peserta dan kondisi cuaca." },
      { question: "Apakah bisa private trip?", answer: "Bisa. Hubungi kami lewat WhatsApp untuk konfirmasi jadwal dan jumlah peserta." },
      { question: "Apakah ada sinyal di Desa Cisadon?", answer: "Sinyal sangat terbatas di sepanjang jalur dan di desa. Disarankan untuk unduh peta offline atau informasikan rencana perjalanan ke keluarga sebelum berangkat." },
      { question: "Makan siang termasuk paket?", answer: "Tidak termasuk. Tapi di Desa Cisadon ada warung warga dengan menu sederhana dan harga sangat terjangkau." },
    ],
    meetingPoint: "Garuda Farm / Bojong Koneng, Babakan Madang, Bogor",
    capacity: "3 – 40 orang per sesi",
    difficulty: "Sedang",
    minAge: "3 tahun",
    photos: Array.from({ length: 5 }, (_, i) => `/produk/desa-cisadon/${i + 1}.jpeg`),
  },
  {
    slug: "bukit-daolong",
    name: "Trekking Bukit Daolong – Puncak Silala",
    tagline: "Dua puncak dalam satu jalur — panorama Gunung Salak hingga Gede Pangrango dari ketinggian 800 mdpl",
    shortDescription:
      "Trekking ±8–10 km pulang–pergi melewati hutan bambu, perkebunan warga, dan aliran sungai menuju Puncak Silala dan Bukit Daolong di Sentul. Cocok untuk pemula hingga menengah.",
    price: 130000,
    marketPrice: 200000,
    duration: "±4–5 jam",
    distance: "±8–10 km (pp)",
    locationArea: "Bojong Koneng, Babakan Madang, Bogor",
    routeType: "Setapak tanah, bebatuan, hutan bambu, perkebunan, sungai kecil",
    bestTime: "Pagi hari, start pukul 07.00 untuk sunrise dan panorama terbaik",
    suitableFor: ["Pemula", "Menengah", "Family gathering", "Company outing", "Komunitas", "Trail running", "Fotografi alam"],
    description: [
      "Bukit Daolong dan Puncak Silala adalah dua titik trekking yang bisa ditempuh dalam satu jalur dari Bojong Koneng, Sentul. Jalur melewati perkampungan, perkebunan warga, hutan bambu yang rindang, dan aliran sungai kecil sebelum menanjak menuju kedua puncak.",
      "Di Puncak Silala (±700 mdpl) dan Bukit Daolong (±800 mdpl) tersedia beberapa spot foto dengan pemandangan hamparan hutan hijau dan perbukitan Sentul. Saat cuaca cerah, siluet Gunung Salak dan Gunung Gede Pangrango ikut menyambut dari kejauhan.",
      "Dengan durasi 4–5 jam dan jalur yang bersahabat, rute ini cocok untuk pemula aktif maupun rombongan family gathering atau company outing.",
    ],
    highlights: [
      {
        title: "Dua Puncak dalam Satu Jalur",
        desc: "Satu trekking, dua destinasi — Puncak Silala dan Bukit Daolong berurutan dalam jalur yang sama.",
      },
      {
        title: "Panorama Gunung Salak & Gede Pangrango",
        desc: "Saat cuaca cerah, puncak Gunung Salak dan Gede Pangrango terlihat jelas dari Bukit Daolong — spot foto terbaik di jalur ini.",
      },
      {
        title: "Hutan Bambu & Sungai Kecil",
        desc: "Jalur melewati hutan bambu yang rindang dan aliran sungai kecil — suasana alami yang menenangkan sebelum tanjakan puncak.",
      },
      {
        title: "Cocok untuk Semua Kalangan",
        desc: "Durasi 4–5 jam dengan tanjakan bertahap, cocok untuk pemula, keluarga, komunitas, hingga trail runner.",
      },
    ],
    includes: [
      "Jasa guide lokal berpengalaman",
      "Air mineral selama perjalanan",
      "Dokumentasi foto perjalanan",
      "P3K dasar",
    ],
    excludes: [
      "Transportasi dari dan ke titik kumpul",
      "Makan siang",
      "Perlengkapan pribadi (sepatu trekking, baju ganti)",
      "Asuransi perjalanan",
    ],
    schedule: [
      { time: "07.00", activity: "Registrasi & briefing di Start Point Bojong Koneng" },
      { time: "07.30", activity: "Mulai trekking melewati jalan kampung dan perkebunan" },
      { time: "08.30", activity: "Memasuki jalur hutan bambu dan menyusuri sungai kecil" },
      { time: "09.30", activity: "Tiba di Puncak Silala (±700 mdpl) — istirahat & foto" },
      { time: "10.00", activity: "Melanjutkan perjalanan menuju Bukit Daolong" },
      { time: "10.15", activity: "Tiba di Bukit Daolong (±800 mdpl) — istirahat & foto panorama" },
      { time: "11.00", activity: "Mulai perjalanan kembali menuju Start Point" },
      { time: "12.00", activity: "Finish di Start Point Bojong Koneng" },
    ],
    whatToBring: [
      "Sepatu trekking atau sandal gunung yang nyaman — jalur berbatu dan tanah",
      "Baju ganti minimal 1 set",
      "Bekal makanan ringan dan air minum ekstra",
      "Topi dan sunscreen untuk jalur terbuka di puncak",
      "Jaket tipis jika berangkat pagi — udara di puncak lebih sejuk",
      "Obat pribadi jika punya kebutuhan khusus",
    ],
    safetyNotes: [
      "Jalur bisa licin saat musim hujan, gunakan alas kaki dengan grip yang baik.",
      "Ikuti arahan guide terutama di tanjakan dan area berbatu.",
      "Anak-anak wajib didampingi orang dewasa sepanjang perjalanan.",
      "Rute dapat disesuaikan dengan kondisi cuaca dan kemampuan peserta.",
    ],
    faq: [
      { question: "Apakah cocok untuk pemula?", answer: "Ya, jalurnya bertahap dan cocok untuk pemula aktif. Tanjakan tidak terlalu ekstrem dan durasinya sekitar 4–5 jam." },
      { question: "Berapa lama perjalanannya?", answer: "Sekitar 4–5 jam termasuk istirahat di kedua puncak. Durasi bisa berubah sesuai ritme peserta." },
      { question: "Apakah bisa untuk acara company outing?", answer: "Sangat cocok. Kapasitas bisa disesuaikan, hubungi kami lewat WhatsApp untuk diskusi lebih lanjut." },
      { question: "Kapan waktu terbaik trekking?", answer: "Pagi hari pukul 07.00 untuk mendapatkan udara segar, peluang melihat sunrise, dan panorama gunung yang lebih jelas sebelum kabut datang." },
      { question: "Apakah ada sinyal di jalur?", answer: "Sinyal cukup terbatas di beberapa titik jalur, terutama di area hutan bambu dan puncak." },
    ],
    meetingPoint: "Bojong Koneng, Babakan Madang, Bogor",
    capacity: "3 – 40 orang per sesi",
    difficulty: "Ringan – Sedang",
    minAge: "3 tahun",
    photos: Array.from({ length: 3 }, (_, i) => `/produk/bukit-daolong/${i + 1}.jpeg`),
  },
  {
    slug: "puncak-langit",
    name: "Trekking Puncak Langit",
    tagline: "Puncak 900 mdpl dengan panorama lembah Sentul dan siluet Gunung Salak di pagi hari",
    shortDescription:
      "Trekking ±7–9 km pulang–pergi melewati perkebunan kopi, hutan tropis, dan jalur punggungan bukit menuju Puncak Langit di Sentul. Durasi 3–4 jam, cocok untuk pemula hingga menengah.",
    price: 130000,
    marketPrice: 200000,
    duration: "±3–4 jam",
    distance: "±7–9 km (pp)",
    locationArea: "Bojong Koneng, Babakan Madang, Bogor",
    routeType: "Tanah, bebatuan, perkebunan kopi, hutan tropis, punggungan bukit",
    bestTime: "Pagi hari pukul 07.00 untuk sunrise dan panorama terbaik sebelum kabut",
    suitableFor: ["Pemula", "Menengah", "Family gathering", "Company outing", "Komunitas", "Trail running", "Hunting sunrise", "Fotografi alam"],
    description: [
      "Puncak Langit adalah salah satu destinasi trekking pagi yang paling digemari di Sentul. Dari Start Point Bojong Koneng, jalur melewati jalan kampung, perkebunan kopi, hutan tropis, hingga jalur punggungan bukit sebelum sampai di puncak.",
      "Di ketinggian ±900 mdpl, Puncak Langit menawarkan pemandangan hamparan perbukitan hijau, lembah Sentul, dan saat cuaca cerah siluet Gunung Salak serta Gunung Gede Pangrango tampak jelas di kejauhan. Spot foto sunrise dan kabut pagi di sini sangat populer di kalangan fotografer alam dan konten kreator.",
      "Dengan durasi 3–4 jam dan jalur bertahap, rute ini cocok untuk pemula, rombongan keluarga, company outing, maupun komunitas trail running.",
    ],
    highlights: [
      {
        title: "Panorama 900 mdpl",
        desc: "Hamparan perbukitan hijau, lembah Sentul, dan siluet Gunung Salak serta Gede Pangrango menanti di puncak saat cuaca cerah.",
      },
      {
        title: "Spot Sunrise & Kabut Pagi",
        desc: "Salah satu spot terbaik di Sentul untuk menikmati sunrise dan lautan kabut pagi — favorit fotografer dan konten kreator.",
      },
      {
        title: "Jalur Beragam",
        desc: "Melewati perkebunan kopi, hutan tropis, dan punggungan bukit — setiap segmen jalur punya karakter dan pemandangan yang berbeda.",
      },
      {
        title: "Durasi Ramah Pemula",
        desc: "Cukup ditempuh dalam 3–4 jam dengan tanjakan bertahap, cocok untuk pemula aktif maupun rombongan keluarga.",
      },
    ],
    includes: [
      "Jasa guide lokal berpengalaman",
      "Air mineral selama perjalanan",
      "Dokumentasi foto perjalanan",
      "P3K dasar",
    ],
    excludes: [
      "Transportasi dari dan ke titik kumpul",
      "Makan siang",
      "Perlengkapan pribadi (sepatu trekking, baju ganti)",
      "Asuransi perjalanan",
    ],
    schedule: [
      { time: "07.00", activity: "Registrasi & briefing di Start Point Bojong Koneng" },
      { time: "07.30", activity: "Mulai trekking melewati jalan kampung" },
      { time: "08.15", activity: "Melewati perkebunan kopi dan hutan tropis" },
      { time: "09.00", activity: "Tiba di Puncak Langit (±900 mdpl)" },
      { time: "09.00", activity: "Istirahat, menikmati panorama & sesi foto" },
      { time: "09.45", activity: "Mulai perjalanan kembali menuju Start Point" },
      { time: "11.00", activity: "Finish di Start Point Bojong Koneng" },
    ],
    whatToBring: [
      "Sepatu trekking atau sandal gunung yang nyaman dan tidak licin",
      "Baju ganti minimal 1 set",
      "Bekal makanan ringan dan air minum ekstra",
      "Jaket tipis — udara di puncak lebih sejuk terutama pagi hari",
      "Topi dan sunscreen untuk jalur terbuka di punggungan",
      "Obat pribadi jika punya kebutuhan khusus",
    ],
    safetyNotes: [
      "Jalur tanah bisa licin saat musim hujan, pastikan alas kaki memadai.",
      "Ikuti arahan guide terutama di jalur punggungan dan tanjakan.",
      "Anak-anak wajib didampingi orang dewasa sepanjang perjalanan.",
      "Rute dapat disesuaikan dengan kondisi cuaca dan kemampuan peserta.",
    ],
    faq: [
      { question: "Apakah cocok untuk pemula?", answer: "Ya, jalur bertahap dan durasi 3–4 jam sangat cocok untuk pemula aktif maupun rombongan keluarga." },
      { question: "Kapan waktu terbaik untuk hunting sunrise?", answer: "Berangkat pukul 05.00–05.30 agar tiba di puncak sebelum matahari terbit. Hubungi kami untuk konfirmasi jadwal khusus sunrise." },
      { question: "Apakah bisa untuk company outing?", answer: "Sangat cocok. Kapasitas bisa disesuaikan, hubungi kami lewat WhatsApp untuk diskusi lebih lanjut." },
      { question: "Berapa lama perjalanannya?", answer: "Sekitar 3–4 jam termasuk istirahat di puncak. Durasi bisa berubah sesuai ritme peserta." },
      { question: "Apakah ada sinyal di puncak?", answer: "Sinyal terbatas di beberapa titik jalur. Di puncak biasanya ada sinyal meski tidak selalu stabil." },
    ],
    meetingPoint: "Bojong Koneng, Babakan Madang, Bogor",
    capacity: "3 – 40 orang per sesi",
    difficulty: "Ringan – Sedang",
    minAge: "3 tahun",
    photos: Array.from({ length: 3 }, (_, i) => `/produk/puncak-langit/${i + 1}.jpeg`),
  },
];

export function getPackageDetail(slug: string): PackageDetail | undefined {
  return packageDetails.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return packageDetails.map((p) => p.slug);
}

export default packageDetails;
