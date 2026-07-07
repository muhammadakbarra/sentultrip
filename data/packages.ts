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
    price: 200000, marketPrice: 275000, priceUnit: "orang", rating: 4.9, reviews: 38, badge: "BARU",
    images: ["/produk/desa-cisadon/1.jpeg", "/produk/desa-cisadon/2.jpeg", "/produk/desa-cisadon/3.jpeg"],
  },
  {
    id: 6, slug: "bukit-daolong", name: "Trekking Bukit Daolong", type: "trekking", duration: "4–5 Jam",
    price: 130000, marketPrice: 200000, priceUnit: "orang", rating: 4.8, reviews: 0, badge: "BARU",
    images: ["/produk/bukit-daolong/1.jpeg", "/produk/bukit-daolong/2.jpeg", "/produk/bukit-daolong/3.jpeg"],
  },
  {
    id: 7, slug: "puncak-langit", name: "Trekking Puncak Langit", type: "trekking", duration: "3–4 Jam",
    price: 130000, marketPrice: 200000, priceUnit: "orang", rating: 4.8, reviews: 0, badge: "BARU",
    images: ["/produk/puncak-langit/1.jpeg", "/produk/puncak-langit/2.jpeg", "/produk/puncak-langit/3.jpeg"],
  },
];

export default packages;
