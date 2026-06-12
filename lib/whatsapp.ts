const WA_NUMBER = "6285775777430";
const WA_BASE = `https://wa.me/${WA_NUMBER}`;

export function waLink(message: string): string {
  return `${WA_BASE}?text=${encodeURIComponent(message)}`;
}
