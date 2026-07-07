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
    images: ["/produk/curug-cibingbin/1.jpeg", "/produk/curug-cibingbin/2.jpeg", "/produk/curug-cibingbin/3.jpeg"],
  },
  {
    id: 4, slug: "curug-bidadari", name: "Trekking Curug Bidadari", type: "trekking", duration: "4 Jam",
    price: 150000, marketPrice: 200000, priceUnit: "orang", rating: 4.8, reviews: 54,
    images: ["/produk/curug-bidadari/1.jpeg", "/produk/curug-bidadari/2.jpeg", "/produk/curug-bidadari/3.jpeg"],
  },
  {
    id: 5, slug: "desa-cisadon", name: "Trekking Desa Cisadon", type: "trekking", duration: "5–6 Jam",
    price: 200000, marketPrice: 275000, priceUnit: "orang", rating: 4.9, reviews: 38, badge: "IKONIK",
    images: ["/produk/desa-cisadon/1.jpeg", "/produk/desa-cisadon/2.jpeg", "/produk/desa-cisadon/3.jpeg"],
  },
  {
    id: 6, slug: "bukit-daolong", name: "Trekking Bukit Daolong", type: "trekking", duration: "4–5 Jam",
    price: 130000, marketPrice: 200000, priceUnit: "orang", rating: 4.8, reviews: 0, badge: "2 PUNCAK",
    images: ["/produk/bukit-daolong/1.jpeg", "/produk/bukit-daolong/2.jpeg", "/produk/bukit-daolong/3.jpeg"],
  },
  {
    id: 7, slug: "puncak-langit", name: "Trekking Puncak Langit", type: "trekking", duration: "3–4 Jam",
    price: 130000, marketPrice: 200000, priceUnit: "orang", rating: 4.8, reviews: 0, badge: "SUNRISE",
    images: ["/produk/puncak-langit/1.jpeg", "/produk/puncak-langit/2.jpeg", "/produk/puncak-langit/3.jpeg"],
  },
  {
    id: 8, slug: "bukit-paniisan", name: "Trekking Bukit Paniisan", type: "trekking", duration: "4–5 Jam",
    price: 150000, marketPrice: 200000, priceUnit: "orang", rating: 4.8, reviews: 0, badge: "HEALING",
    images: ["/produk/bukit-paniisan/1.jpeg", "/produk/bukit-paniisan/2.jpeg", "/produk/bukit-paniisan/3.jpeg"],
  },
  {
    id: 9, slug: "goa-garunggang", name: "Trekking Goa Garunggang", type: "trekking", duration: "3,5–5 Jam",
    price: 200000, marketPrice: 250000, priceUnit: "orang", rating: 4.9, reviews: 0, badge: "UNIK",
    images: ["/produk/goa-garunggang/1.jpeg", "/produk/goa-garunggang/2.jpeg", "/produk/goa-garunggang/3.jpeg"],
  },
  {
    id: 10, slug: "leuwi-asih", name: "Trekking Leuwi Asih", type: "trekking", duration: "3–4 Jam",
    price: 150000, marketPrice: 200000, priceUnit: "orang", rating: 4.8, reviews: 0, badge: "KELUARGA",
    images: ["/produk/leuwi-asih/1.jpeg", "/produk/leuwi-asih/2.jpeg", "/produk/leuwi-asih/3.jpeg"],
  },
  {
    id: 11, slug: "putri-kencana-curug-love", name: "Trekking Curug Putri Kencana – Curug Love", type: "trekking", duration: "3–4 Jam",
    price: 180000, marketPrice: 250000, priceUnit: "orang", rating: 4.9, reviews: 0, badge: "2 CURUG",
    images: ["/produk/Putri-Kencana-Curug-Love/1.jpeg", "/produk/Putri-Kencana-Curug-Love/2.jpeg", "/produk/Putri-Kencana-Curug-Love/3.jpeg"],
  },
  {
    id: 12, slug: "leuwi-hejo-cepet-lieuk", name: "Trekking Leuwi Hejo – Leuwi Cepet – Leuwi Lieuk", type: "trekking", duration: "3–4 Jam",
    price: 200000, marketPrice: 275000, priceUnit: "orang", rating: 4.9, reviews: 0, badge: "3 LEUWI",
    images: ["/produk/Leuwi Hejo-Leuwi Cepet-Leuwi-Lieuk/1.jpeg", "/produk/Leuwi Hejo-Leuwi Cepet-Leuwi-Lieuk/2.jpeg", "/produk/Leuwi Hejo-Leuwi Cepet-Leuwi-Lieuk/3.jpeg"],
  },
  {
    id: 13, slug: "curug-hordeng-kembar", name: "Trekking Curug Hordeng – Curug Kembar", type: "trekking", duration: "3–4 Jam",
    price: 230000, marketPrice: 300000, priceUnit: "orang", rating: 4.9, reviews: 0, badge: "2 CURUG",
    images: ["/produk/Curug-Hordeng-Curug-Kembar/1.jpeg", "/produk/Curug-Hordeng-Curug-Kembar/2.jpeg", "/produk/Curug-Hordeng-Curug-Kembar/3.jpeg"],
  },
  {
    id: 99, slug: "test-dummy", name: "[TEST] Paket Demo", type: "trekking", duration: "1 Jam",
    price: 5000, marketPrice: 15000, priceUnit: "orang", rating: 5.0, reviews: 0, badge: "TEST",
    images: [],
  },
];

export default packages;
