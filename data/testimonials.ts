export interface Testimonial {
  name: string;
  trip: string;
  initials: string;
  text: string;
}

const testimonials: Testimonial[] = [
  { name: "Tata", trip: "Curug Bidadari · Corporate", initials: "TA", text: "Perusahaan kami gunakan untuk team building. Trekkingnya seru, semua peserta antusias. Guide-nya sabar banget ngurus orang banyak!" },
  { name: "Indah", trip: "Curug Cibingbin · Family Trip", initials: "IN", text: "Bawa anak-anak ikut trekking dan mereka sangat menikmati. Pemandu perhatian, suasana alamnya bikin rileks. Pasti balik lagi!" },
  { name: "Anita", trip: "Curug Bidadari · Solo Trip", initials: "AN", text: "Baru pertama trekking, sempat ragu. Tapi guide-nya sabar dan jelaskan semua detail. Pengalaman pertama yang sangat menyenangkan!" },
  { name: "Ade Suryana", trip: "Leuwi Hejo", initials: "AS", text: "Guide-nya ramah dan profesional, jalur trekkingnya seru tapi aman. Pemandangan alamnya bikin betah. Recommended banget!" },
  { name: "Nurul", trip: "Goa Garunggang", initials: "NU", text: "Dibawa ke spot-spot cantik yang jarang diketahui orang. Pemandangan benar-benar memukau, cocok buat yang suka fotografi alam." },
  { name: "Mala", trip: "Curug Cibingbin · Corporate", initials: "MA", text: "Selain menemani rombongan, mereka juga ahli ambil foto ciamik karena paham betul medannya. Grup besar atau kecil, recommended!" },
];

export default testimonials;
