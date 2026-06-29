/**
 * Tiered pricing — cap di tier ke-3 (31+ orang):
 * - Dewasa: turun Rp 10.000 per 10 total peserta, max diskon 3 tier (cap Rp 30.000)
 * - Anak  : same tier step, base = harga dewasa - 20.000
 *
 * Tier 0: 1–10  → base
 * Tier 1: 11–20 → base - 10k
 * Tier 2: 21–30 → base - 20k
 * Tier 3: 31+   → base - 30k  (tidak turun lagi)
 */

const MAX_TIER = 3;

export function getTieredAdultPrice(basePrice: number, totalCount: number): number {
  const tier = Math.min(Math.floor(Math.max(totalCount - 1, 0) / 10), MAX_TIER);
  return basePrice - tier * 10000;
}

export function getTieredChildPrice(basePrice: number, totalCount: number): number {
  const tier = Math.min(Math.floor(Math.max(totalCount - 1, 0) / 10), MAX_TIER);
  return (basePrice - 20000) - tier * 10000;
}
