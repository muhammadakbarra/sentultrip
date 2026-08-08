export interface BlogImage {
  src: string;
  alt: string;
}

export interface BlogPostSection {
  heading: string;
  paragraphs: string[];
  image?: BlogImage;
}

export interface BlogFaqItem {
  question: string;
  answer: string;
}

export interface BlogSource {
  label: string;
  url: string;
}

export interface PackageShowcaseItem {
  slug: string;
  note: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  cover: BlogImage;
  author: string;
  authorRole: string;
  date: string; // ISO, published
  readTime: string;
  content: BlogPostSection[];
  faq?: BlogFaqItem[];
  sources?: BlogSource[];
  relatedPackageSlugs?: string[];
  packageShowcase?: PackageShowcaseItem[];
}

const AUTHOR = "Tim SentulTrip";
const AUTHOR_ROLE = "Pemandu Lokal Sentul — 10+ Tahun Pengalaman";

const blogPosts: BlogPost[] = [
  {
    slug: "panduan-wisata-sentul-bogor",
    title: "Panduan Lengkap Wisata Sentul Bogor: Trekking, Curug, dan Offroad",
    excerpt:
      "Sentul punya banyak pilihan wisata alam: puluhan curug, jalur trekking, offroad jeep, sampai susur goa. Ini panduan lengkapnya sebelum kamu berangkat.",
    category: "Panduan Wisata",
    tags: ["Panduan Wisata", "Sentul Bogor"],
    cover: { src: "/produk/leuwi-hejo.webp", alt: "Wisatawan berfoto di kolam alami Leuwi Hejo Sentul" },
    author: AUTHOR,
    authorRole: AUTHOR_ROLE,
    date: "2026-08-05",
    readTime: "7 menit baca",
    content: [
      {
        heading: "Kenapa Sentul jadi tujuan wisata alam favorit dari Jakarta",
        paragraphs: [
          "Sentul berada di Kecamatan Babakan Madang, Kabupaten Bogor, sekitar 45–60 km dari Jakarta lewat Tol Jagorawi. Keluar di pintu tol Sentul City atau Sentul Selatan, perjalanan biasanya memakan waktu 1–1,5 jam tergantung lalu lintas.",
          "Kawasan ini diapit perbukitan dan lereng Gunung Pancar, sehingga menyimpan puluhan curug, kolam alami, gua batu, dan jalur bukit dalam radius yang berdekatan. Cocok untuk trip singkat akhir pekan tanpa harus jauh-jauh ke pegunungan.",
        ],
      },
      {
        heading: "4 jenis aktivitas utama di Sentul",
        paragraphs: [
          "Trekking curug — jalur jalan kaki menuju air terjun dan kolam alami seperti Curug Cibingbin, Curug Bidadari, atau trio Leuwi Hejo. Sebagian besar rute masuk kategori mudah–sedang, cocok untuk keluarga.",
          "Offroad jeep — konvoi jeep 4x4 melewati jalur tanah merah, tanjakan, dan penyeberangan sungai berbatu di sekitar Hambalang dan Cisadon. Sensasi paling cocok untuk yang cari adrenalin.",
          "Susur goa — Goa Garunggang jadi destinasi unik dengan labirin batu di atas gua dan lorong gua di bawahnya, dikelola sebagai bagian dari kawasan geopark yang dilindungi.",
          "Corporate outing & outbound — kombinasi trekking, games, dan offroad rombongan yang banyak dipakai perusahaan di Jakarta untuk team building satu hari.",
        ],
        image: { src: "/produk/CURUG-CIBINGBIN.webp", alt: "Trekking menuju Curug Cibingbin Sentul" },
      },
      {
        heading: "Tingkat kesulitan dan cocok untuk siapa",
        paragraphs: [
          "Rute seperti Curug Cibingbin dan Curug Bidadari relatif landai dan bisa ditempuh anak-anak maupun lansia dengan santai. Rute seperti Leuwi Hejo, Goa Garunggang, atau Bukit Daolong butuh stamina lebih karena medan naik-turun dan beberapa titik cukup terjal.",
          "Kalau baru pertama kali trekking, mulai dari rute mudah dulu. Guide lokal biasanya menyesuaikan tempo dengan kondisi peserta paling lambat, jadi tidak perlu khawatir tertinggal rombongan.",
        ],
      },
      {
        heading: "Kapan waktu terbaik berkunjung",
        paragraphs: [
          "Bogor punya curah hujan tinggi sepanjang tahun dan masuk zona musim tipe 1 — hampir tiap bulan berpotensi hujan, dengan musim kemarau yang relatif singkat sekitar Juli–September. Datang pagi hari (07.00–09.00) memberi peluang cuaca paling cerah sebelum kabut atau hujan siang turun.",
          "Kami bahas lebih detail soal musim dan cuaca di artikel terpisah supaya kamu bisa atur jadwal dengan lebih matang.",
        ],
      },
      {
        heading: "Estimasi biaya",
        paragraphs: [
          "Paket trekking curug umumnya mulai Rp130.000–Rp230.000 per orang, sudah termasuk guide, tiket masuk, dan air minum. Offroad jeep disewa per unit mulai sekitar Rp1.250.000, muat 4–5 orang. Paket corporate menyesuaikan jumlah peserta dan durasi — bisa dikonsultasikan langsung.",
        ],
      },
    ],
    faq: [
      {
        question: "Berapa jarak Sentul dari Jakarta?",
        answer:
          "Sekitar 45–60 km, ditempuh 1–1,5 jam lewat Tol Jagorawi keluar di pintu tol Sentul City atau Sentul Selatan.",
      },
      {
        question: "Aktivitas apa saja yang tersedia di Sentul?",
        answer:
          "Empat kategori utama: trekking curug, offroad jeep, susur goa, dan paket corporate outing/outbound untuk rombongan.",
      },
      {
        question: "Apakah trekking di Sentul cocok untuk pemula?",
        answer:
          "Cocok. Sebagian besar rute trekking curug punya tingkat kesulitan ringan–sedang dan bisa disesuaikan tempo dengan kondisi peserta.",
      },
    ],
    sources: [
      { label: "BMKG — Prakiraan Musim", url: "https://www.bmkg.go.id/berita/utama/bmkg-musim-kemarau-basah-diprediksi-hingga-oktober-2025-waspada-bencana-hidrometeorologi" },
      { label: "Wikipedia — Babakan Madang, Bogor", url: "https://id.wikipedia.org/wiki/Babakan_Madang,_Bogor" },
    ],
    relatedPackageSlugs: ["curug-cibingbin", "offroad-curug-bidadari", "leuwi-hejo-cepet-lieuk", "goa-garunggang"],
  },

  {
    slug: "curug-cibingbin",
    title: "Curug Cibingbin: Rute, Durasi, dan Tips Trekking Lengkap",
    excerpt:
      "Curug Cibingbin jadi salah satu rute trekking paling ramah untuk keluarga di Sentul. Ini rute lengkap, durasi tempuh, dan curug lain yang bisa disinggahi.",
    category: "Destinasi",
    tags: ["Destinasi", "Curug", "Panduan Wisata"],
    cover: { src: "/produk/curug-cibingbin/1.webp", alt: "Keluarga trekking menuju Curug Cibingbin melewati sawah" },
    author: AUTHOR,
    authorRole: AUTHOR_ROLE,
    date: "2026-07-30",
    readTime: "5 menit baca",
    content: [
      {
        heading: "Lokasi dan akses",
        paragraphs: [
          "Curug Cibingbin berada di Kp. Cibingbin RT 002/RW 006, Desa Bojong Koneng, Kecamatan Babakan Madang, Kabupaten Bogor. Titik kumpul biasanya di area Cibingbin, mudah dijangkau dari Tol Jagorawi via exit Sentul Selatan.",
        ],
      },
      {
        heading: "Rute dan durasi trekking",
        paragraphs: [
          "Jalurnya melewati perkampungan, area persawahan, kebun warga, dan masuk ke kawasan yang lebih rindang saat mendekati Cibingbin. Medan tergolong landai dengan beberapa turunan ringan.",
          "Waktu tempuh sekitar 2 jam dengan tempo santai plus beberapa kali istirahat — cocok untuk anak-anak, lansia, atau siapa pun yang baru pertama kali trekking ke curug.",
        ],
        image: { src: "/produk/curug-cibingbin/3.webp", alt: "Jalur trekking menuju Curug Cibingbin" },
      },
      {
        heading: "Bukan cuma satu curug",
        paragraphs: [
          "Dalam satu rute, kamu bisa singgah ke beberapa titik air terjun lain: Curug Tiga Perjaka, Curug Cisalada, dan Curug Ngumpet — jaraknya hanya sekitar 15 menit dari Curug Cibingbin. Curug Ngumpet sering disebut yang paling dramatis karena diapit tebing batu.",
        ],
        image: { src: "/produk/curug-cibingbin/6.webp", alt: "Salah satu titik curug di rute Cibingbin" },
      },
      {
        heading: "Tips sebelum berangkat",
        paragraphs: [
          "Datang pagi hari sebelum jam 08.00 supaya jalur masih sepi dan cuaca lebih cerah. Gunakan sandal atau sepatu gunung yang tidak licin, bawa baju ganti, dan pastikan kondisi fisik cukup fit karena beberapa titik sungai berbatu.",
        ],
      },
    ],
    faq: [
      {
        question: "Berapa lama waktu trekking ke Curug Cibingbin?",
        answer: "Sekitar 2 jam dengan tempo santai dan beberapa kali istirahat di jalan.",
      },
      {
        question: "Apakah cocok untuk anak-anak dan lansia?",
        answer: "Cocok. Jalurnya landai dan termasuk rute trekking paling ramah pemula di kawasan Sentul.",
      },
      {
        question: "Curug apa saja yang bisa dikunjungi dalam satu rute?",
        answer: "Curug Cibingbin, Curug Tiga Perjaka, Curug Cisalada, dan Curug Ngumpet — semuanya berdekatan.",
      },
    ],
    sources: [
      { label: "mytrip.co.id — Jalur ke Curug Cibingbin dan Curug Ngumpet", url: "https://www.mytrip.co.id/article/gambaran-lengkap-jalur-ke-curug-cibingbin-dan-curug-ngumpet-di-sentul" },
    ],
    relatedPackageSlugs: ["curug-cibingbin"],
  },

  {
    slug: "curug-bidadari-sentul",
    title: "Curug Bidadari Sentul: Lokasi, Harga Tiket, dan Daya Tariknya",
    excerpt:
      "Curug Bidadari punya air terjun setinggi puluhan meter dan konsep taman wisata yang lebih tertata. Ini info lokasi, rute, dan harga tiketnya.",
    category: "Destinasi",
    tags: ["Destinasi", "Curug"],
    cover: { src: "/produk/curug-bidadari/1.webp", alt: "Air terjun Curug Bidadari Sentul" },
    author: AUTHOR,
    authorRole: AUTHOR_ROLE,
    date: "2026-07-22",
    readTime: "4 menit baca",
    content: [
      {
        heading: "Lokasi dan akses",
        paragraphs: [
          "Curug Bidadari berada di kawasan Sentul Paradise Park, Desa Bojong Koneng, Babakan Madang. Dari Jakarta, keluar Tol Jagorawi di pintu Sentul City lalu ikuti Jalan Raya Bojong Koneng menuju arah Gunung Batu.",
          "Bisa juga naik transportasi umum sampai Terminal Sentul City lalu dilanjutkan ojek — tarif ojek biasanya Rp30.000–Rp50.000.",
        ],
      },
      {
        heading: "Ketinggian air terjun dan suasana",
        paragraphs: [
          "Air terjun ini punya ketinggian sekitar 40–75 meter dengan lebar 7 meter — salah satu yang tertinggi di kawasan Sentul. Konsepnya digabung dengan taman wisata, jadi jalur menuju curug lebih tertata dibanding curug-curug yang murni jalur trekking alami.",
        ],
        image: { src: "/produk/curug-bidadari/3.webp", alt: "Kolam di bawah Curug Bidadari" },
      },
      {
        heading: "Jam operasional dan tiket",
        paragraphs: [
          "Buka setiap hari pukul 06.00–17.00 WIB dengan harga tiket masuk sekitar Rp30.000 per orang (di luar biaya paket guide dan aktivitas tambahan). Ramai di akhir pekan, jadi datang pagi kalau ingin suasana lebih tenang.",
        ],
        image: { src: "/produk/curug-bidadari/5.webp", alt: "Area sekitar Curug Bidadari" },
      },
    ],
    faq: [
      { question: "Berapa harga tiket masuk Curug Bidadari?", answer: "Sekitar Rp30.000 per orang untuk tiket masuk kawasan." },
      { question: "Jam berapa Curug Bidadari buka?", answer: "Setiap hari, pukul 06.00–17.00 WIB." },
      { question: "Seberapa tinggi air terjunnya?", answer: "Sekitar 40–75 meter dengan lebar kurang lebih 7 meter." },
    ],
    sources: [
      { label: "CNN Indonesia — Lokasi, Harga Tiket, Fasilitas Curug Bidadari", url: "https://www.cnnindonesia.com/gaya-hidup/20230505091623-275-947094/lokasi-harga-tiket-dan-fasilitas-curug-bidadari-sentul" },
      { label: "IDN Times — Info Wisata Curug Bidadari", url: "https://www.idntimes.com/travel/destination/wisata-curug-bidadari-00-p3rq2-0nqclr" },
    ],
    relatedPackageSlugs: ["curug-bidadari"],
  },

  {
    slug: "leuwi-hejo-leuwi-cepet-leuwi-lieuk",
    title: "Leuwi Hejo, Leuwi Cepet, Leuwi Lieuk: Trio Kolam Alami di Sentul",
    excerpt:
      "Tiga kolam alami berair hijau jernih dalam satu jalur trekking. Ini yang perlu kamu tahu soal rute, kedalaman, dan tingkat kesulitannya.",
    category: "Destinasi",
    tags: ["Destinasi", "Curug"],
    cover: { src: "/produk/Leuwi Hejo-Leuwi Cepet-Leuwi-Lieuk/1.webp", alt: "Kolam alami Leuwi Hejo dengan air berwarna hijau jernih" },
    author: AUTHOR,
    authorRole: AUTHOR_ROLE,
    date: "2026-07-14",
    readTime: "5 menit baca",
    content: [
      {
        heading: "Kenapa disebut Leuwi Hejo",
        paragraphs: [
          "Leuwi dalam bahasa Sunda berarti kolam atau bagian sungai yang dalam. Airnya tampak kehijauan saat terkena sinar matahari, karena itulah dinamakan Leuwi Hejo. Lokasinya di kawasan Sentul, Babakan Madang, Bogor.",
        ],
      },
      {
        heading: "Tiga kolam dalam satu jalur",
        paragraphs: [
          "Leuwi Hejo adalah kolam utama dengan area berenang paling luas. Leuwi Cepet lebih kecil dan lebih tenang, cocok untuk berenang santai. Leuwi Lieuk lebih dalam — beberapa pengunjung lokal biasa lompat dari tebing kecil di sini.",
          "Jarak antar kolam hanya 5–15 menit jalan kaki, jadi ketiganya bisa dikunjungi dalam satu trip yang sama.",
        ],
        image: { src: "/produk/Leuwi Hejo-Leuwi Cepet-Leuwi-Lieuk/3.webp", alt: "Leuwi Cepet, salah satu kolam di rute Leuwi Hejo" },
      },
      {
        heading: "Kedalaman dan tingkat kesulitan",
        paragraphs: [
          "Kedalaman kolam bervariasi antara 3–5 meter di beberapa titik, jadi tetap disarankan didampingi guide terutama untuk yang belum lancar berenang. Total jarak trekking sekitar 6 km pulang-pergi dengan estimasi waktu 2–5 jam tergantung berapa lama berhenti di tiap kolam.",
        ],
        image: { src: "/produk/Leuwi Hejo-Leuwi Cepet-Leuwi-Lieuk/6.webp", alt: "Leuwi Lieuk, kolam terdalam di rute Leuwi Hejo" },
      },
    ],
    faq: [
      { question: "Berapa kolam yang bisa dikunjungi dalam satu rute?", answer: "Tiga: Leuwi Hejo, Leuwi Cepet, dan Leuwi Lieuk, berjarak 5-15 menit jalan kaki satu sama lain." },
      { question: "Seberapa dalam Leuwi Hejo?", answer: "Bervariasi, di beberapa titik bisa mencapai 3-5 meter — sebaiknya tetap didampingi guide saat berenang." },
      { question: "Berapa total jarak dan durasi trekkingnya?", answer: "Sekitar 6 km pulang-pergi, ditempuh 2-5 jam tergantung lama berhenti di tiap kolam." },
    ],
    sources: [
      { label: "Tripadvisor — Leuwi Hejo Waterfalls", url: "https://www.tripadvisor.com/Attraction_Review-g3733747-d9735814-Reviews-Leuwi_Hejo_Waterfalls-Sentul_Babakan_Madang_Bogor_Regency_West_Java_Java.html" },
      { label: "Traveloka — Curug Leuwi Hejo", url: "https://www.traveloka.com/id-id/explore/destination/curug-leuwi-hejo-acc/395338" },
    ],
    relatedPackageSlugs: ["leuwi-hejo-cepet-lieuk"],
  },

  {
    slug: "goa-garunggang-sentul",
    title: "Goa Garunggang: Wisata Susur Goa dan Labirin Batu di Sentul",
    excerpt:
      "Bukan curug seperti kebanyakan destinasi Sentul lainnya — Goa Garunggang menawarkan labirin batu unik dan gua alami yang penuh stalaktit.",
    category: "Destinasi",
    tags: ["Destinasi", "Unik"],
    cover: { src: "/produk/goa-garunggang/1.webp", alt: "Labirin batu di atas Goa Garunggang Sentul" },
    author: AUTHOR,
    authorRole: AUTHOR_ROLE,
    date: "2026-07-05",
    readTime: "4 menit baca",
    content: [
      {
        heading: "Lokasi",
        paragraphs: [
          "Goa Garunggang berada di Desa Karang Tengah, Kecamatan Babakan Madang, Kabupaten Bogor. Saat ini dikelola di bawah Dinas Kebudayaan dan Pariwisata Kabupaten Bogor sebagai bagian dari kawasan geopark yang dilindungi.",
        ],
      },
      {
        heading: "Labirin batu jadi ikon utama",
        paragraphs: [
          "Bagian atas goa berupa labirin batu terbuka — susunan bebatuan besar yang membentuk celah dan lorong sempit, jadi spot foto favorit sekaligus area yang cukup menantang untuk dijelajahi. Di bagian bawahnya ada gua alami dengan kelelawar, mata air kecil, dan stalaktit.",
        ],
        image: { src: "/produk/goa-garunggang/2.webp", alt: "Formasi batu labirin di Goa Garunggang" },
      },
      {
        heading: "Rute dan durasi trekking",
        paragraphs: [
          "Dari titik start seperti Kopi Tepian, jarak trekking sekitar 6 km dengan waktu tempuh normal sekitar 2 jam menuju lokasi. Total durasi trekking pulang-pergi sekitar 2,5 jam. Sepanjang jalur tersedia warung dan pondok istirahat.",
          "Jalurnya melewati sungai, sawah, jembatan bambu, dan hutan pinus — variatif dan tidak monoton dibanding rute curug pada umumnya.",
        ],
        image: { src: "/produk/goa-garunggang/3.webp", alt: "Jalur trekking menuju Goa Garunggang" },
      },
    ],
    faq: [
      { question: "Apa yang membuat Goa Garunggang berbeda dari curug lain di Sentul?", answer: "Daya tariknya bukan air terjun, tapi labirin batu terbuka di atas gua dan lorong gua alami dengan stalaktit di bawahnya." },
      { question: "Berapa lama waktu trekking ke Goa Garunggang?", answer: "Sekitar 2,5 jam pulang-pergi dari titik start seperti Kopi Tepian, dengan jarak kurang lebih 6 km." },
    ],
    sources: [
      { label: "Situs Resmi Goa Garunggang Sentul", url: "https://goagarunggang.my.id/" },
      { label: "Pariwisata Indonesia — Goa Agung Garunggang", url: "https://pariwisataindonesia.id/jelajah/goa-agung-garunggang-bagaikan-kembali-ke-zaman-megalitikum/" },
    ],
    relatedPackageSlugs: ["goa-garunggang"],
  },

  {
    slug: "desa-cisadon-sentul",
    title: "Desa Cisadon: Trekking ke Kampung Tersembunyi di Lereng Gunung Pancar",
    excerpt:
      "Cisadon menawarkan sisi lain wisata Sentul — bukan cuma curug, tapi suasana desa tradisional yang masih asri di lereng Gunung Pancar.",
    category: "Destinasi",
    tags: ["Destinasi", "Panduan Wisata"],
    cover: { src: "/produk/desa-cisadon/1.webp", alt: "Suasana Desa Cisadon di lereng Gunung Pancar Sentul" },
    author: AUTHOR,
    authorRole: AUTHOR_ROLE,
    date: "2026-06-26",
    readTime: "4 menit baca",
    content: [
      {
        heading: "Lokasi dan suasana",
        paragraphs: [
          "Cisadon adalah dusun kecil di lereng Gunung Pancar, masuk Desa Karang Tengah, Kecamatan Babakan Madang. Rumah-rumah kayu berjejer di antara ladang hijau, dan warganya masih hidup dari bertani, beternak, serta membuka warung kecil untuk pendaki.",
        ],
      },
      {
        heading: "Rute trekking",
        paragraphs: [
          "Trekking biasanya dimulai dari Sentul Selatan atau Leuwinutug, menempuh jarak sekitar 8 km melewati hutan bambu, tanjakan-turunan, dan beberapa sungai kecil yang jernih. Waktu tempuh 2–3 jam tergantung kondisi fisik peserta.",
        ],
        image: { src: "/produk/desa-cisadon/3.webp", alt: "Jalur trekking menuju Desa Cisadon" },
      },
      {
        heading: "Yang bisa dilakukan di sana",
        paragraphs: [
          "Selain trekking, Cisadon populer untuk camping dan menikmati langit malam yang masih relatif bersih dari polusi cahaya. Beberapa rumah warga sudah dijadikan homestay untuk yang ingin bermalam. Ada juga spot foto panorama bukit, sawah, dan hutan pinus di sepanjang jalur.",
        ],
        image: { src: "/produk/desa-cisadon/5.webp", alt: "Pemandangan dari area Desa Cisadon" },
      },
    ],
    faq: [
      { question: "Berapa jarak trekking ke Desa Cisadon?", answer: "Sekitar 8 km melewati hutan bambu dan sungai kecil, ditempuh dalam 2-3 jam." },
      { question: "Apa yang membuat Cisadon berbeda dari destinasi curug lainnya?", answer: "Cisadon menawarkan suasana desa tradisional dan camping, bukan sekadar air terjun." },
    ],
    sources: [
      { label: "RRI.co.id — Menyusuri Keindahan Cisadon", url: "https://rri.co.id/bogor/wisata/1858935/menyusuri-keindahan-cisadon-surga-tracking-tersembunyi-di-bogor" },
      { label: "Traveloka — Rute, Lokasi & Fasilitas Trekking Cisadon", url: "https://www.traveloka.com/id-id/explore/destination/rute-lokasi-fasilitas-trekking-cisadon-sentul-gt/1001310" },
    ],
    relatedPackageSlugs: ["desa-cisadon"],
  },

  {
    slug: "panduan-offroad-jeep-sentul",
    title: "Panduan Offroad Jeep Sentul: Rute, Harga, dan Tips Aman",
    excerpt:
      "Offroad jeep di Sentul melewati tanah merah, tanjakan, dan sungai berbatu. Ini gambaran rute, kisaran harga, dan cara menikmatinya dengan aman.",
    category: "Offroad",
    tags: ["Offroad", "Panduan Wisata"],
    cover: { src: "/produk/offroad-curug-bidadari/1.webp", alt: "Konvoi jeep offroad melintasi sungai di Sentul" },
    author: AUTHOR,
    authorRole: AUTHOR_ROLE,
    date: "2026-06-18",
    readTime: "5 menit baca",
    content: [
      {
        heading: "Karakteristik jalur offroad Sentul",
        paragraphs: [
          "Rute offroad di sekitar Hambalang dan Cisadon melewati kombinasi tanah merah, jalan berbatu, tanjakan-turunan curam, dan penyeberangan sungai dangkal. Tanahnya yang berjenis lempung membuat jalur jadi sangat licin saat musim hujan — justru itu yang membuat sensasinya makin seru bagi banyak orang.",
        ],
      },
      {
        heading: "Kisaran harga",
        paragraphs: [
          "Harga sewa jeep bervariasi tergantung rute dan kapasitas, mulai sekitar Rp1.200.000 hingga Rp2.300.000 per unit untuk kapasitas 4–7 orang. Beberapa operator menawarkan paket tambahan yang menggabungkan rute offroad dengan kunjungan ke curug terdekat.",
        ],
        image: { src: "/produk/offroad-curug-bidadari/2.webp", alt: "Jeep offroad melewati jalur tanah merah Sentul" },
      },
      {
        heading: "Tips aman naik jeep offroad",
        paragraphs: [
          "Selalu berpegangan pada handle yang tersedia saat melewati tanjakan atau turunan tajam. Gunakan baju yang boleh terkena lumpur, ikat rambut panjang, dan lepas aksesoris yang mudah terlepas. Kalau mudah mabuk perjalanan, makan ringan dulu sebelum berangkat dan hindari menatap layar HP selama di jalur.",
        ],
        image: { src: "/produk/ofroad-sentul.webp", alt: "Peserta menikmati offroad jeep Sentul" },
      },
    ],
    faq: [
      { question: "Berapa harga sewa jeep offroad di Sentul?", answer: "Mulai sekitar Rp1.200.000 sampai Rp2.300.000 per unit, tergantung rute dan kapasitas 4-7 orang." },
      { question: "Kapan waktu terbaik untuk offroad?", answer: "Bisa sepanjang tahun. Musim hujan membuat jalur lebih licin dan menantang, musim kemarau lebih kering dan stabil." },
      { question: "Berapa orang muat dalam satu jeep?", answer: "Umumnya 4-5 orang per unit, tergantung jenis jeep yang digunakan." },
    ],
    sources: [
      { label: "Traveloka — Tiket Jeep Fun Offroad Hambalang Sentul Bogor", url: "https://www.traveloka.com/id-id/activities/indonesia/product/jeep-fun-offroad-hambalang-sentul-bogor-plus-waterfall-5731084504118" },
    ],
    relatedPackageSlugs: ["offroad-curug-bidadari"],
  },

  {
    slug: "ide-corporate-outing-sentul",
    title: "Ide dan Panduan Corporate Outing / Outbound di Sentul",
    excerpt:
      "Sentul jadi salah satu lokasi favorit perusahaan Jakarta untuk team building. Ini beberapa format acara yang bisa disesuaikan dengan tim kamu.",
    category: "Corporate Outing",
    tags: ["Corporate Outing"],
    cover: { src: "/produk/offroad-curug-bidadari/1.webp", alt: "Rombongan jeep offroad untuk acara corporate outing di Sentul" },
    author: AUTHOR,
    authorRole: AUTHOR_ROLE,
    date: "2026-06-08",
    readTime: "5 menit baca",
    content: [
      {
        heading: "Kenapa Sentul cocok untuk outing kantor",
        paragraphs: [
          "Jaraknya yang hanya 1–1,5 jam dari Jakarta membuat Sentul jadi pilihan realistis untuk acara satu hari tanpa harus menginap. Ragam aktivitasnya juga luas — dari trekking santai sampai offroad yang lebih menantang — sehingga mudah disesuaikan dengan campuran usia dan kondisi fisik peserta.",
        ],
      },
      {
        heading: "Format acara yang bisa dipilih",
        paragraphs: [
          "Trekking ringan + games kelompok di curug cocok untuk tim yang jarang berolahraga, dengan durasi setengah hari. Konvoi jeep offroad rombongan lebih cocok untuk tim yang ingin sesuatu yang memacu adrenalin dan jadi momen paling diingat peserta.",
          "Untuk grup lebih kecil yang ingin pengalaman unik, susur Goa Garunggang bisa jadi variasi menarik di luar rute trekking biasa. Semua format ini bisa dikombinasikan dalam satu hari kalau waktunya memungkinkan.",
        ],
        image: { src: "/produk/curug-cibingbin/1.webp", alt: "Tim melakukan trekking bersama sebagai bagian dari acara outing" },
      },
      {
        heading: "Kapasitas dan penyesuaian anggaran",
        paragraphs: [
          "Trekking bisa menampung rombongan dari belasan hingga ratusan peserta dengan pembagian kelompok kecil per guide. Offroad jeep menyesuaikan jumlah unit yang disewa. Semua bisa dikustomisasi sesuai anggaran dan jumlah peserta — konsultasi kebutuhan tim biasanya dilakukan sebelum menentukan paket final.",
        ],
        image: { src: "/produk/goa-garunggang/2.webp", alt: "Aktivitas susur goa sebagai variasi acara outing" },
      },
    ],
    faq: [
      { question: "Berapa minimal peserta untuk corporate outing?", answer: "Bisa disesuaikan, mulai dari rombongan kecil 10 orang hingga ratusan peserta dengan pembagian kelompok per guide." },
      { question: "Aktivitas apa yang paling sering diminta untuk team building?", answer: "Kombinasi trekking ringan dengan games kelompok, atau konvoi jeep offroad untuk tim yang ingin pengalaman lebih memacu adrenalin." },
    ],
    sources: [
      { label: "Hexs Indonesia — Outbound Bogor: Lokasi & Paket Outing di Sentul", url: "https://hexsindonesia.com/tempat-outbound-sentul-bogor/" },
    ],
    relatedPackageSlugs: ["offroad-curug-bidadari", "curug-cibingbin", "goa-garunggang"],
  },

  {
    slug: "persiapan-keselamatan-trekking-sentul",
    title: "Persiapan dan Keselamatan Trekking di Sentul untuk Pemula",
    excerpt:
      "Sebelum trekking curug pertama kali, ada beberapa hal dasar soal fisik, perlengkapan, dan keselamatan jalur yang sebaiknya kamu tahu.",
    category: "Tips Trekking",
    tags: ["Tips Trekking", "Panduan Wisata"],
    cover: { src: "/produk/bukit-paniisan/1.webp", alt: "Peserta trekking bersiap di jalur Sentul" },
    author: AUTHOR,
    authorRole: AUTHOR_ROLE,
    date: "2026-05-28",
    readTime: "5 menit baca",
    content: [
      {
        heading: "Persiapan fisik",
        paragraphs: [
          "Pastikan kondisi badan fit dengan tidur cukup dan sarapan sebelum berangkat — jangan paksakan diri kalau sedang tidak enak badan, karena sebagian jalur berbatu, licin, dan cukup terjal. Kalau merasa lelah di tengah jalan, lebih baik istirahat sebentar di pinggir jalur daripada memaksakan diri sampai kaki gemetar.",
        ],
      },
      {
        heading: "Perlengkapan wajib",
        paragraphs: [
          "Sepatu atau sandal gunung dengan grip yang baik jadi item paling penting — hindari sandal jepit biasa karena licin di bebatuan. Bawa juga baju ganti, kantong plastik untuk barang basah, jas hujan tipis, dan kotak P3K dasar untuk cedera ringan.",
          "Untuk rute yang lebih panjang seperti Leuwi Hejo atau Goa Garunggang, tas carrier lebih nyaman dibanding tas selempang biasa karena bebannya terbagi rata.",
        ],
        image: { src: "/produk/leuwi-asih/1.webp", alt: "Perlengkapan trekking dasar untuk ke curug" },
      },
      {
        heading: "Keselamatan di jalur",
        paragraphs: [
          "Tetap di jalur trekking resmi — jangan ambil jalan pintas karena tanahnya bisa labil. Jangan pergi sendirian, selalu bersama teman, keluarga, atau rombongan dengan guide. Perhatikan cuaca: jalur yang biasanya kering bisa berubah licin dan berbahaya saat hujan turun.",
          "Datang di jam yang disarankan, sekitar pukul 08.00–09.00, saat jalur masih sepi dan udara masih sejuk — lebih aman dibanding berangkat terlalu siang atau sore.",
        ],
      },
      {
        heading: "Jaga kebersihan jalur",
        paragraphs: [
          "Bawa kantong kresek dari rumah untuk sampah pribadi, dan usahakan bawa tumbler yang bisa dipakai ulang daripada botol plastik sekali pakai. Jalur yang bersih membuat pengalaman trekking tetap nyaman untuk pengunjung berikutnya.",
        ],
      },
    ],
    faq: [
      { question: "Apa perlengkapan paling wajib dibawa saat trekking curug?", answer: "Sepatu/sandal gunung anti-licin, baju ganti, kantong anti air, dan kotak P3K dasar." },
      { question: "Jam berapa waktu terbaik memulai trekking?", answer: "Sekitar pukul 08.00-09.00, saat jalur masih sepi dan cuaca cenderung masih cerah." },
      { question: "Apa yang harus dilakukan kalau cuaca tiba-tiba hujan di jalur?", answer: "Ikuti arahan guide, jangan memaksakan melewati jalur licin atau menyeberang sungai yang debitnya naik, dan gunakan jas hujan yang sudah disiapkan." },
    ],
    sources: [
      { label: "IDN Times — Tips Trekking ke Curug biar Aman", url: "https://www.idntimes.com/travel/tips/tips-trekking-ke-curug-biar-aman-c1c2-01-3kz8p-853rjv" },
      { label: "Eiger Adventure — Peralatan Mendaki untuk Pemula", url: "https://www.eigeradventure.com/blog/macam-macam-peralatan-mendaki-yang-wajib-dibawa-saat-naik-gunung/" },
    ],
  },

  {
    slug: "waktu-terbaik-ke-sentul",
    title: "Waktu Terbaik ke Sentul: Musim, Cuaca, dan Tips Menghindari Hujan",
    excerpt:
      "Bogor dikenal sebagai kota hujan sepanjang tahun. Ini penjelasan pola musimnya dan bagaimana cara mengatur jadwal trekking supaya tidak kehujanan.",
    category: "Tips Trekking",
    tags: ["Tips Trekking", "Sentul Bogor"],
    cover: { src: "/produk/puncak-langit/1.webp", alt: "Pemandangan pagi hari dari Puncak Langit Sentul" },
    author: AUTHOR,
    authorRole: AUTHOR_ROLE,
    date: "2026-05-16",
    readTime: "4 menit baca",
    content: [
      {
        heading: "Kenapa Bogor disebut kota hujan",
        paragraphs: [
          "Bogor termasuk zona musim tipe 1 menurut BMKG — batas antara musim hujan dan kemarau tidak terlalu jelas karena hampir tiap bulan berpotensi hujan. Curah hujan tahunannya bisa mencapai 3.500–4.500 mm, jauh di atas rata-rata nasional yang sekitar 2.000 mm.",
        ],
      },
      {
        heading: "Pola musim di kawasan Sentul",
        paragraphs: [
          "Musim kemarau di Bogor tergolong singkat, umumnya sekitar Juli hingga September. Puncak curah hujan biasanya terjadi Desember–Januari. Di luar periode itu, hujan bisa turun kapan saja meski sedang musim kemarau — BMKG bahkan beberapa kali mencatat hujan deras di Bogor di tengah musim kemarau nasional.",
        ],
        image: { src: "/produk/puncaklangit2.webp", alt: "Langit cerah di kawasan Sentul saat musim kemarau" },
      },
      {
        heading: "Tips mengatur jadwal trekking",
        paragraphs: [
          "Pola cuaca di Bogor biasanya cerah di pagi hari dan berawan menuju hujan di siang–sore. Karena itu, mulai trekking pagi (07.00–09.00) adalah strategi paling aman di musim apa pun.",
          "Kalau memilih trekking di musim kemarau (Juli–September), jalur akan lebih kering dan tidak licin — cocok untuk pemula atau yang membawa anak-anak. Di musim hujan, debit air curug lebih deras dan pemandangannya lebih dramatis, tapi jalur tanah berisiko licin sehingga perlu ekstra hati-hati.",
        ],
        image: { src: "/produk/bukit-daolong/2.webp", alt: "Trekking di jalur bukit Sentul saat cuaca cerah" },
      },
    ],
    faq: [
      { question: "Kapan musim kemarau di Bogor?", answer: "Umumnya sekitar Juli hingga September, meski hujan tetap bisa turun sewaktu-waktu." },
      { question: "Apakah Bogor tetap hujan meski sedang musim kemarau nasional?", answer: "Ya. BMKG mencatat Bogor kerap tetap berpotensi hujan karena masuk zona musim tipe 1 yang batas musimnya tidak jelas." },
      { question: "Jam berapa waktu paling aman untuk mulai trekking?", answer: "Sekitar pukul 07.00-09.00 pagi, sebelum potensi hujan siang-sore meningkat." },
    ],
    sources: [
      { label: "BMKG — Musim Kemarau Basah Diprediksi Hingga Oktober", url: "https://www.bmkg.go.id/berita/utama/bmkg-musim-kemarau-basah-diprediksi-hingga-oktober-2025-waspada-bencana-hidrometeorologi" },
      { label: "detikJabar — Kenapa Bogor Disebut Kota Hujan", url: "https://www.detik.com/jabar/berita/d-6300244/kenapa-bogor-disebut-kota-hujan-ini-jawabannya" },
    ],
  },

  {
    slug: "puncak-langit-bukit-daolong",
    title: "Puncak Langit dan Bukit Daolong: Spot Sunrise di Sentul",
    excerpt:
      "Dua bukit ini jadi favorit untuk berburu sunrise dan pemandangan 360 derajat tanpa harus mendaki gunung. Cocok untuk pendaki pemula.",
    category: "Destinasi",
    tags: ["Destinasi", "Sentul Bogor"],
    cover: { src: "/produk/bukit-daolong/1.webp", alt: "Pemandangan dari puncak Bukit Daolong Sentul" },
    author: AUTHOR,
    authorRole: AUTHOR_ROLE,
    date: "2026-05-02",
    readTime: "4 menit baca",
    content: [
      {
        heading: "Bukit Daolong — 800 mdpl, ramah pemula",
        paragraphs: [
          "Bukit Daolong berada di Desa Bojong Koneng, Babakan Madang, dengan ketinggian sekitar 800 meter di atas permukaan laut. Puncaknya bisa dicapai dalam 1–2 jam tergantung tempo masing-masing pendaki.",
          "Beberapa titik jalur cukup terjal dengan kemiringan sampai 70 derajat, tapi sudah dilengkapi anak tangga di bagian yang sulit sehingga tetap nyaman untuk pendaki pemula.",
        ],
      },
      {
        heading: "Puncak Langit — panorama 360 derajat",
        paragraphs: [
          "Puncak Langit berada di kawasan Sentul Forest Club, Bojong Koneng, dengan ketinggian sekitar 639 mdpl. Dari sini, pemandangan terbuka ke segala arah — cocok untuk foto lanskap maupun menikmati golden hour.",
          "Di area yang sama ada Curug Aren, air terjun kecil yang bisa disinggahi sebelum atau sesudah naik ke puncak.",
        ],
        image: { src: "/produk/bukit-daolong/3.webp", alt: "Jalur menuju puncak Bukit Daolong" },
      },
      {
        heading: "Waktu terbaik berkunjung",
        paragraphs: [
          "Berangkat dini hari (sekitar pukul 04.30–05.00) kalau ingin mengejar momen sunrise dari puncak. Bawa jaket karena suhu di ketinggian lebih dingin, terutama menjelang pagi.",
        ],
        image: { src: "/produk/puncak-langit/3.webp", alt: "Pemandangan dari Puncak Langit Sentul" },
      },
    ],
    faq: [
      { question: "Berapa ketinggian Bukit Daolong dan Puncak Langit?", answer: "Bukit Daolong sekitar 800 mdpl, Puncak Langit sekitar 639 mdpl." },
      { question: "Jam berapa harus berangkat untuk mengejar sunrise?", answer: "Sekitar pukul 04.30-05.00 dini hari, supaya sampai puncak sebelum matahari terbit." },
    ],
    sources: [
      { label: "Radar Bogor — Trekking Santai ke Bukit Daolong", url: "https://radarbogor.jawapos.com/wisata/2476472488/trekking-santai-ke-bukit-daolong-800-mdpl-sentul-bogor-tempat-healing-hidden-gem-yang-cocok-untuk-pemula" },
    ],
    relatedPackageSlugs: ["bukit-daolong", "puncak-langit"],
  },

  {
    slug: "rekomendasi-paket-trekking-sentul",
    title: "12 Rekomendasi Paket Trekking dan Offroad Terbaik di Sentul Bogor",
    excerpt:
      "Dari 12 paket yang kami jalankan, ini rekomendasi lengkapnya — mana yang cocok untuk pemula, keluarga, yang cari tantangan, sampai yang ingin sensasi offroad.",
    category: "Panduan Wisata",
    tags: ["Panduan Wisata", "Destinasi", "Sentul Bogor"],
    cover: { src: "/produk/Putri-Kencana-Curug-Love/1.webp", alt: "Kolam alami biru kehijauan di Curug Putri Kencana Sentul" },
    author: AUTHOR,
    authorRole: AUTHOR_ROLE,
    date: "2026-08-08",
    readTime: "6 menit baca",
    content: [
      {
        heading: "Kenapa kami susun daftar ini",
        paragraphs: [
          "Sentul punya puluhan titik wisata alam, dan itu bisa bikin bingung menentukan mana yang paling cocok. Daftar ini kami susun berdasarkan 12 paket yang benar-benar kami jalankan sendiri sebagai guide lokal — bukan rangkuman ulang dari tempat lain.",
          "Tiap paket kami beri catatan singkat soal karakteristik jalur dan cocok untuk siapa, supaya kamu bisa langsung memilih tanpa perlu buka belasan artikel lain.",
        ],
      },
      {
        heading: "Cara memilih paket yang tepat",
        paragraphs: [
          "Kalau baru pertama kali trekking atau membawa anak-anak, mulai dari rute yang kami tandai 'ramah pemula' di bawah. Kalau sudah pernah trekking dan ingin tantangan lebih, pilih rute dengan elevasi lebih tinggi atau medan naik-turun.",
          "Semua paket bisa dikonsultasikan dulu via WhatsApp sebelum booking — kami bantu sesuaikan dengan kondisi fisik dan jumlah rombongan.",
        ],
      },
    ],
    packageShowcase: [
      { slug: "curug-cibingbin", note: "Rute paling ramah untuk pemula dan keluarga — trekking santai sekitar 2 jam melewati sawah dan kebun, dengan opsi mampir ke tiga curug lain (Tiga Perjaka, Cisalada, Ngumpet) dalam satu rute." },
      { slug: "curug-bidadari", note: "Air terjunnya salah satu yang tertinggi di kawasan ini (40–75 meter), dengan jalur lebih tertata karena berada dalam konsep taman wisata Sentul Paradise Park." },
      { slug: "leuwi-asih", note: "Paling ramah anak-anak — kolam alaminya terbentuk dari aliran sungai (bukan tebing tinggi), dan hanya sekitar 15 menit jalan kaki dari parkiran." },
      { slug: "desa-cisadon", note: "Bukan sekadar curug — cocok untuk yang ingin suasana desa tradisional, camping, dan langit malam yang masih bersih dari polusi cahaya." },
      { slug: "putri-kencana-curug-love", note: "Airnya biru kehijauan sangat jernih, diapit tebing batu tinggi. Dalam satu rute juga bisa singgah ke Curug Love yang bentuk tebingnya menyerupai hati." },
      { slug: "leuwi-hejo-cepet-lieuk", note: "Tiga kolam alami sekaligus dalam satu rute — Leuwi Hejo untuk berenang santai, Leuwi Lieuk untuk yang berani lompat dari tebing kecil." },
      { slug: "curug-hordeng-kembar", note: "Kombinasi dua karakter berbeda: Curug Hordeng yang landai dan aman untuk berenang, serta Curug Kembar dengan dua aliran air yang jatuh berdampingan." },
      { slug: "goa-garunggang", note: "Paling unik di daftar ini — bukan air terjun, tapi labirin batu terbuka dan gua alami dengan stalaktit. Pilihan tepat kalau grup sudah bosan dengan rute curug biasa." },
      { slug: "bukit-daolong", note: "Untuk yang cari sunrise dan panorama 360 derajat di ketinggian sekitar 800 mdpl tanpa harus mendaki gunung sungguhan — puncak bisa dicapai dalam 1–2 jam." },
      { slug: "puncak-langit", note: "Serupa Bukit Daolong, tapi dengan tambahan Curug Aren di jalur yang sama — cocok dikombinasikan jadi satu trip 'bukit + curug'." },
      { slug: "bukit-paniisan", note: "Puncaknya di sekitar 846 mdpl, salah satu titik tertinggi di kawasan Sentul, dengan jalur melewati kebun kopi dan sungai — cocok untuk yang sudah pernah coba rute dasar dan ingin naik level." },
      { slug: "offroad-curug-bidadari", note: "Satu-satunya paket non-trekking di daftar ini — untuk yang ingin sensasi berbeda: konvoi jeep melewati jalur tanah merah dan sungai berbatu." },
    ],
    faq: [
      { question: "Paket mana yang paling cocok untuk pemula?", answer: "Curug Cibingbin atau Leuwi Asih — keduanya punya jalur landai dan waktu tempuh singkat." },
      { question: "Paket mana yang paling menantang?", answer: "Bukit Paniisan (846 mdpl) dan Goa Garunggang, karena medannya lebih variatif dan butuh stamina lebih." },
      { question: "Apakah bisa menggabungkan beberapa paket dalam satu hari?", answer: "Bisa untuk rute yang berdekatan, misalnya Bukit Daolong dengan Puncak Langit. Konsultasikan dulu via WhatsApp supaya durasinya realistis." },
      { question: "Berapa kisaran harga paket-paket ini?", answer: "Trekking umumnya Rp130.000–Rp230.000 per orang, sementara offroad jeep mulai sekitar Rp1.250.000 per unit." },
    ],
    sources: [
      { label: "Dinas Pariwisata Kabupaten Bogor — Curug Leuwi Asih", url: "https://disparekraf.bogorkab.go.id/berita/Seputar-OPD/curug-leuwi-asih" },
      { label: "Ekabo Bogor Kab — Curug Leuwi Asih", url: "https://ekabo.bogorkab.go.id/place/curug-leuwi-asih" },
      { label: "kumparan.com — Bukit Paniisan Sentul", url: "https://kumparan.com/jendela-dunia/bukit-paniisan-sentul-tujuan-trekking-yang-populer-di-bogor-24pvTdG1GOZ" },
      { label: "Traveloka Explore — Curug Hordeng", url: "https://www.traveloka.com/id-id/explore/activities/curug-hordeng-ta/508798" },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return blogPosts.map((post) => post.slug);
}

export function slugifyTag(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");
}

export interface TagSummary {
  tag: string;
  slug: string;
  count: number;
}

export function getAllTags(): TagSummary[] {
  const map = new Map<string, TagSummary>();
  for (const post of blogPosts) {
    for (const tag of post.tags) {
      const slug = slugifyTag(tag);
      const existing = map.get(slug);
      if (existing) existing.count += 1;
      else map.set(slug, { tag, slug, count: 1 });
    }
  }
  return Array.from(map.values()).sort((a, b) => b.count - a.count);
}

export function getPostsByTagSlug(tagSlug: string): BlogPost[] {
  return blogPosts.filter((post) => post.tags.some((t) => slugifyTag(t) === tagSlug));
}

export function getTagLabel(tagSlug: string): string | undefined {
  for (const post of blogPosts) {
    const match = post.tags.find((t) => slugifyTag(t) === tagSlug);
    if (match) return match;
  }
  return undefined;
}

export default blogPosts;
