import type { SpeakingSession } from "@/types/speaking";

export const session: SpeakingSession = {
  slug: "microblog-instagram-halokatalks",
  title: "Microblog di Instagram: Masih Laku Nggak Sih",
  // Placeholder: kegiatan asli tahun 2022. Tanggal pasti belum ada — dipakai
  // pertengahan tahun agar sorting (terbaru dulu) tetap berjalan. Ganti nanti.
  date: "2022-09-08",
  // Placeholder: jam asli menyusul.
  timeLabel: "20.00 – 20.30 WIB",
  // Placeholder: lokasi asli menyusul (sesi berbasis komunitas Halokatalks).
  location: "Daring — Instagram Live",
  // Copy sementara — akan diganti dengan ringkasan asli.
  excerpt:
    "Sesi berbagi bareng Halokatalks Community soal relevansi microblog di Instagram: apakah formatnya masih efektif dan bagaimana menyusun carousel yang tetap dibaca sampai slide terakhir.",
  body: [
    "Obrolan dibuka dengan pertanyaan sederhana: di tengah dominasi video pendek, apakah microblog di Instagram masih punya tempat? Jawabannya bergantung pada tujuan — microblog unggul untuk menjelaskan ide bertahap yang butuh konteks.",
    "Sisanya membahas anatomi carousel yang enak dipindai: hook di slide pertama, satu gagasan per slide, dan penutup yang mengajak menyimpan atau membagikan. (Isi ini sementara dan akan diperbarui.)",
  ],
  images: [
    {
      src: "/speaking/haloka_card.png",
      alt: "Gambar Haloka Card",
      width: 1200,
      height: 800,
    },
  ],
};
