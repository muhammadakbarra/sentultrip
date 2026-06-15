export type PackageType = "trekking" | "offroad" | "corporate" | "livein";

export interface Package {
  id: number;
  slug: string;
  name: string;
  type: PackageType;
  duration: string;
  price: number;
  priceUnit: string;
  rating: number;
  reviews: number;
  badge?: string;
  images?: string[];
}

const packages: Package[] = [
  {
    id: 1, slug: "curug-cibingbin", name: "Trekking Curug Cibingbin", type: "trekking", duration: "5 Jam",
    price: 150000, priceUnit: "orang", rating: 4.9, reviews: 57, badge: "POPULER",
    images: ["/produk/curug-cibingbin/1.jpeg", "/produk/curug-cibingbin/2.jpeg", "/produk/curug-cibingbin/3.jpeg"],
  },
  // { id: 2, slug: "leuwi-hejo", name: "Trekking Leuwi Hejo", type: "trekking", duration: "6 Jam", price: 180000, priceUnit: "orang", rating: 4.9, reviews: 54, images: ["/produk/leuwi-hejo.webp", "/produk/leuwi-hejo2.webp"] },
  // { id: 3, slug: "trekking-corporate", name: "Trekking Corporate", type: "corporate", duration: "7 Jam", price: 270000, priceUnit: "orang", rating: 4.9, reviews: 0 },
  {
    id: 4, slug: "curug-bidadari", name: "Trekking Curug Bidadari", type: "trekking", duration: "4 Jam",
    price: 150000, priceUnit: "orang", rating: 4.8, reviews: 54,
    images: ["/produk/curug-bidadari/1.jpeg", "/produk/curug-bidadari/2.jpeg", "/produk/curug-bidadari/3.jpeg"],
  },
  // { id: 5, name: "Offroad Curug Bidadari", type: "offroad", duration: "3 Jam", price: 1250000, priceUnit: "jeep", rating: 4.8, reviews: 54, images: ["/produk/curug-bidadari.webp", "/produk/curug-bidadari2.webp", "/produk/curug-bidadari3.webp"] },
  // { id: 6, name: "Offroad Jeep Sentul", type: "offroad", duration: "3 Jam", price: 1200000, priceUnit: "jeep", rating: 4.8, reviews: 54, images: ["/produk/ofroad-sentul.webp"] },
  // { id: 7, name: "Trekking Bukit Paniisan", type: "trekking", duration: "7 Jam", price: 180000, priceUnit: "orang", rating: 4.8, reviews: 0, images: ["/produk/Bukit-paniisan.webp", "/produk/Bukit-paniisan2.webp"] },
  // { id: 8, name: "Trekking Goa Garunggang", type: "trekking", duration: "5 Jam", price: 175000, priceUnit: "orang", rating: 4.9, reviews: 0, images: ["/produk/goa-garunggang.webp", "/produk/goa-garunggang2.webp"] },
  // { id: 9, name: "Trekking Curug Hordeng", type: "trekking", duration: "7 Jam", price: 180000, priceUnit: "orang", rating: 4.8, reviews: 53 },
  // { id: 10, name: "Trekking Curug Love", type: "trekking", duration: "6 Jam", price: 180000, priceUnit: "orang", rating: 4.8, reviews: 0 },
  // { id: 11, name: "Trekking Leuwi Asih", type: "trekking", duration: "4 Jam", price: 150000, priceUnit: "orang", rating: 4.8, reviews: 0 },
  // { id: 12, name: "Trekking Puncak Kuta", type: "trekking", duration: "8 Jam", price: 180000, priceUnit: "orang", rating: 4.8, reviews: 0 },
  // { id: 13, name: "Trekking Dusun Cisadon", type: "trekking", duration: "7 Jam", price: 180000, priceUnit: "orang", rating: 4.8, reviews: 0, images: ["/produk/cisadon.webp", "/produk/cisadon2.webp"] },
  // { id: 14, name: "Live-in Desa", type: "livein", duration: "2D 1N", price: 749000, priceUnit: "orang", rating: 4.9, reviews: 0 },
];

export default packages;
