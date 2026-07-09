import type { WritingPost } from "@/types/writing";

export const post: WritingPost = {
  slug: "punya-tumbler-untuk-pertama-kalinya",
  title: "Punya Tumbler untuk Pertama Kalinya",
  topic: "Life",
  status: "published",
  publishedAt: "2026-07-08",
  image: {
    src: "/writing/tumbler_baru2.png",
    alt: "Tumbler pertama, kado ulang tahun ke-23",
  },
  content: [
    "Ulang tahun ke-23 ini aku dapat kado yang bahkan nggak pernah kepikiran buat masuk wishlist: sebuah tumbler. Dikasih sama orang yang paling aku sayang. Entah kenapa, sejak nerimanya rasanya tumbler ini jadi lebih dari sekadar tempat minum. Kayak ada perasaan yang ikut dibawa setiap kali aku pegang.",

    "Sebelumnya aku termasuk orang yang mikir, 'ya cuma tumbler doang kan?'. Air ya tetap air. Nggak pernah benar-benar ngerti kenapa banyak orang rela beli tumbler yang harganya lumayan. Sampai akhirnya aku punya sendiri.",

    { type: "heading", text: "Tumbler Kecil, Harga Nggak Kecil" },

    "Pas tahu harganya, jujur aku sempat melongo. Ukurannya kecil, tapi ternyata harganya nggak main-main. Tapi begitu pertama kali dipegang, langsung kerasa bedanya. Bahannya padat, tutupnya rapat, finishing-nya rapi, pokoknya beda sama tumbler yang biasa aku lihat di minimarket.",

    "Aku baru sadar ternyata ada alasan kenapa orang rela beli barang seperti ini. Kadang kualitas itu memang baru kerasa setelah dipakai, bukan waktu cuma lihat fotonya.",

    { type: "heading", text: "Tes Pertama: Es Batu Semalaman" },

    "Malam itu aku langsung iseng. Aku isi penuh sama batu es, tutup rapat, terus tinggal tidur. Penasaran aja, emang sebagus itu ya katanya?",

    "Besok paginya pas dibuka... aku malah ketawa sendiri. Esnya masih utuh. Beneran masih batu es, bukan tinggal air dingin atau serpihan kecil. Aku sampai bengong beberapa detik sambil mikir, 'lah kok bisa sih?'. Buat orang yang baru pertama kali punya tumbler begini, itu cukup bikin takjub.",

    { type: "heading", text: "Dibawa ke Work From Ruang" },

    {
      type: "paragraph",
      segments: [
        "Pas banget besoknya aku ada jadwal ikut Work From Ruang di ",
        { type: "mention", entity: "ruang-tambah" },
        ". Ya jelas tumbler barunya ikut. Rasanya kayak anak kecil habis dibeliin mainan baru. Ada aja alasan buat dibawa ke mana-mana.",
      ],
    },

    {
      type: "paragraph",
      segments: [
        "Sebelum mulai kerja aku mampir beli kopi susu di ",
        { type: "mention", entity: "kopkit" },
        ". Kopinya langsung aku pindahin ke tumbler yang esnya bahkan masih ada dari semalam. Dalam hati ya berharap aja sih semoga tetap dingin sampai siang.",
      ],
    },

    "Yang lucu, kopinya duluan habis sebelum es batunya menyerah. Setiap kali minum aku lihat esnya masih ada. Sampai gelasnya kosong pun batunya masih bertahan. Aku malah jadi lebih sering buka tutup tumbler cuma buat memastikan kalau mataku nggak salah lihat.",

    { type: "entityCard", entity: "kopkit" },

    { type: "heading", text: "Bukan Soal Tumblernya" },

    "Sejak hari itu tumbler ini hampir selalu masuk tas kalau aku keluar rumah. Memang karena fungsinya enak dipakai, tapi kalau jujur... alasan utamanya bukan itu.",

    "Setiap kali lagi minum, entah kenapa aku selalu keingat orang yang ngasih. Rasanya sederhana banget sebenarnya. Tapi justru hal-hal kecil kayak gini yang bikin sebuah barang jadi susah diganti. Mungkin memang bukan tumblernya yang bikin senang, tapi karena setiap kali dipakai rasanya kayak diingetin kalau ada seseorang yang perhatian sama hal-hal kecil tentang kita.",
  ],
};
