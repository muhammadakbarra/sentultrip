export type PackageType = "trekking" | "offroad" | "corporate";

export interface Package {
  id: number;
  slug: string;
  name: string;
  type: PackageType;
  duration: string;
  price: number;
  marketPrice?: number;
  priceUnit: string;
  rating: number;
  reviews: number;
  badge?: string;
  images?: string[];
}

const packages: Package[] = [
  {
    id: 1, slug: "curug-cibingbin", name: "Trekking Curug Cibingbin", type: "trekking", duration: "5 Jam",
    price: 150000, marketPrice: 200000, priceUnit: "orang", rating: 4.9, reviews: 57, badge: "POPULER",
    images: ["/produk/curug-cibingbin/1.webp", "/produk/curug-cibingbin/2.webp", "/produk/curug-cibingbin/3.webp"],
  },
  {
    id: 4, slug: "curug-bidadari", name: "Trekking Curug Bidadari", type: "trekking", duration: "4 Jam",
    price: 150000, marketPrice: 200000, priceUnit: "orang", rating: 4.8, reviews: 54,
    images: ["/produk/curug-bidadari/1.webp", "/produk/curug-bidadari/2.webp", "/produk/curug-bidadari/3.webp"],
  },
  {
    id: 5, slug: "desa-cisadon", name: "Trekking Desa Cisadon", type: "trekking", duration: "5–6 Jam",
    price: 200000, marketPrice: 275000, priceUnit: "orang", rating: 4.9, reviews: 38, badge: "IKONIK",
    images: ["/produk/desa-cisadon/1.webp", "/produk/desa-cisadon/2.webp", "/produk/desa-cisadon/3.webp"],
  },
  {
    id: 6, slug: "bukit-daolong", name: "Trekking Bukit Daolong", type: "trekking", duration: "4–5 Jam",
    price: 130000, marketPrice: 200000, priceUnit: "orang", rating: 4.8, reviews: 0, badge: "2 PUNCAK",
    images: ["/produk/bukit-daolong/1.webp", "/produk/bukit-daolong/2.webp", "/produk/bukit-daolong/3.webp"],
  },
  {
    id: 7, slug: "puncak-langit", name: "Trekking Puncak Langit", type: "trekking", duration: "3–4 Jam",
    price: 130000, marketPrice: 200000, priceUnit: "orang", rating: 4.8, reviews: 0, badge: "SUNRISE",
    images: ["/produk/puncak-langit/1.webp", "/produk/puncak-langit/2.webp", "/produk/puncak-langit/3.webp"],
  },
  {
    id: 8, slug: "bukit-paniisan", name: "Trekking Bukit Paniisan", type: "trekking", duration: "4–5 Jam",
    price: 150000, marketPrice: 200000, priceUnit: "orang", rating: 4.8, reviews: 0, badge: "HEALING",
    images: ["/produk/bukit-paniisan/1.webp", "/produk/bukit-paniisan/2.webp", "/produk/bukit-paniisan/3.webp"],
  },
  {
    id: 9, slug: "goa-garunggang", name: "Trekking Goa Garunggang", type: "trekking", duration: "3,5–5 Jam",
    price: 200000, marketPrice: 250000, priceUnit: "orang", rating: 4.9, reviews: 0, badge: "UNIK",
    images: ["/produk/goa-garunggang/1.webp", "/produk/goa-garunggang/2.webp", "/produk/goa-garunggang/3.webp"],
  },
  {
    id: 10, slug: "leuwi-asih", name: "Trekking Leuwi Asih", type: "trekking", duration: "3–4 Jam",
    price: 150000, marketPrice: 200000, priceUnit: "orang", rating: 4.8, reviews: 0, badge: "KELUARGA",
    images: ["/produk/leuwi-asih/1.webp", "/produk/leuwi-asih/2.webp", "/produk/leuwi-asih/3.webp"],
  },
  {
    id: 11, slug: "putri-kencana-curug-love", name: "Trekking Curug Putri Kencana – Curug Love", type: "trekking", duration: "3–4 Jam",
    price: 180000, marketPrice: 250000, priceUnit: "orang", rating: 4.9, reviews: 0, badge: "2 CURUG",
    images: ["/produk/Putri-Kencana-Curug-Love/1.webp", "/produk/Putri-Kencana-Curug-Love/2.webp", "/produk/Putri-Kencana-Curug-Love/3.webp"],
  },
  {
    id: 12, slug: "leuwi-hejo-cepet-lieuk", name: "Trekking Leuwi Hejo – Leuwi Cepet – Leuwi Lieuk", type: "trekking", duration: "3–4 Jam",
    price: 200000, marketPrice: 275000, priceUnit: "orang", rating: 4.9, reviews: 0, badge: "3 LEUWI",
    images: ["/produk/Leuwi Hejo-Leuwi Cepet-Leuwi-Lieuk/1.webp", "/produk/Leuwi Hejo-Leuwi Cepet-Leuwi-Lieuk/2.webp", "/produk/Leuwi Hejo-Leuwi Cepet-Leuwi-Lieuk/3.webp"],
  },
  {
    id: 13, slug: "curug-hordeng-kembar", name: "Trekking Curug Hordeng – Curug Kembar", type: "trekking", duration: "3–4 Jam",
    price: 230000, marketPrice: 300000, priceUnit: "orang", rating: 4.9, reviews: 0, badge: "2 CURUG",
    images: ["/produk/Curug-Hordeng-Curug-Kembar/1.webp", "/produk/Curug-Hordeng-Curug-Kembar/2.webp", "/produk/Curug-Hordeng-Curug-Kembar/3.webp"],
  },
  {
    id: 2, slug: "offroad-curug-bidadari", name: "Jeep Offroad Curug Bidadari", type: "offroad", duration: "3–4 Jam",
    price: 1250000, priceUnit: "jeep", rating: 4.9, reviews: 0, badge: "OFFROAD",
    images: ["/produk/offroad-curug-bidadari/1.webp", "/produk/offroad-curug-bidadari/2.webp"],
  },
];

export default packages;
