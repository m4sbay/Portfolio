"use client";

import { useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Andi Pratama",
    role: "Content Creator",
    quote:
      "Sejak pakai tools ini, konten aku jauh lebih konsisten dan engagement-nya naik drastis. Highly recommended!",
    image: "/pptestimoni1.png",
  },
  {
    id: 2,
    name: "Sari Dewi",
    role: "Digital Marketer",
    quote:
      "Fitur auto-posting-nya bikin kerjaan aku lebih efisien. Nggak perlu lagi upload manual ke tiap platform.",
    image: "/pptestimoni2.png",
  },
  {
    id: 3,
    name: "Budi Santoso",
    role: "Pemilik UMKM",
    quote:
      "Bisnis kecil aku jadi keliatan lebih profesional di media sosial. Pelanggan makin percaya dan order terus naik.",
    image: "/pptestimoni3.png",
  },
  {
    id: 4,
    name: "Rini Kusuma",
    role: "Social Media Manager",
    quote:
      "Kelola lima akun klien sekaligus jadi jauh lebih gampang. Laporan performa-nya juga detail banget, klien puas semua.",
    image: "/pptestimoni4.png",
  },
  {
    id: 5,
    name: "Dian Purnama",
    role: "Fotografer",
    quote:
      "Portfolio aku jadi lebih rapi dan mudah diakses klien. Banyak inquiry masuk lewat feed yang sudah tertata.",
    image: "/pptestimoni5.png",
  },
  {
    id: 6,
    name: "Fajar Nugroho",
    role: "Founder Startup",
    quote:
      "Kami bisa gerak cepat tanpa perlu rekrut tim konten yang besar. Satu orang bisa handle semua channel dengan lancar.",
    image: "/pptestimoni6.png",
  },
  {
    id: 7,
    name: "Maya Indira",
    role: "Brand Strategist",
    quote:
      "Konsistensi visual brand klien aku terjaga dengan baik. Analitiknya membantu aku ambil keputusan strategi yang lebih tajam.",
    image: "/pptestimoni7.png",
  },
  {
    id: 8,
    name: "Hendra Wijaya",
    role: "Video Editor",
    quote:
      "Distribusi konten video ke berbagai platform sekarang tinggal satu klik. Hemat waktu berjam-jam setiap minggunya.",
    image: "/pptestimoni8.png",
  },
  {
    id: 9,
    name: "Lestari Ningrum",
    role: "Graphic Designer",
    quote:
      "Klien aku bisa langsung approve desain dan langsung terjadwal posting-nya. Workflow jadi jauh lebih smooth.",
    image: "/pptestimoni9.png",
  },
  {
    id: 10,
    name: "Rizky Aditya",
    role: "Event Organizer",
    quote:
      "Promosi event kami bisa menjangkau audiens yang tepat. Tiket terjual habis lebih cepat dari target awal.",
    image: "/pptestimoni10.png",
  },
];

const row1 = testimonials.slice(0, 5);
const row2 = testimonials.slice(5, 10);

function Avatar({ name, image }: { name: string; image: string }) {
  const [errored, setErrored] = useState(false);
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (errored) {
    return (
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-200 text-xs font-semibold text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300">
        {initials}
      </div>
    );
  }

  return (
    <img
      src={image}
      alt={name}
      onError={() => setErrored(true)}
      className="h-10 w-10 shrink-0 rounded-full object-cover"
    />
  );
}

function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof testimonials)[number];
}) {
  return (
    <div className="w-72 shrink-0 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-zinc-900 sm:w-80">
      <p className="mb-4 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <Avatar name={testimonial.name} image={testimonial.image} />
        <div>
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {testimonial.name}
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-500">
            {testimonial.role}
          </p>
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: (typeof testimonials)[number][];
  reverse?: boolean;
}) {
  const doubled = [...items, ...items];

  return (
    <div
      className="group overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
    >
      <div
        className={[
          "flex gap-4",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
          "group-hover:[animation-play-state:paused]",
        ].join(" ")}
      >
        {doubled.map((t, i) => (
          <TestimonialCard key={`${t.id}-${i}`} testimonial={t} />
        ))}
      </div>
    </div>
  );
}

export function TestimonialsMarquee() {
  return (
    <section aria-labelledby="testimonials-title" className="space-y-4">
      <header className="space-y-1">
        <h2
          id="testimonials-title"
          className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50"
        >
          Kata mereka yang pernah kerja sama
        </h2>
        <p className="text-base text-zinc-600 dark:text-zinc-500">
          Dari klien freelance, pembeli template, sampai sesama kreator yang pernah berkolaborasi.
        </p>
      </header>

      <div className="space-y-4">
        <MarqueeRow items={row1} />
        <MarqueeRow items={row2} reverse />
      </div>
    </section>
  );
}
