import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import Link from "next/link";
import { FaqList } from "@/components/arsipreset/FaqItem";
import { ArrowRightIcon } from "@/design-system/icons";
import CircularGallery from "@/components/arsipreset/CircularGallery";

const arsipresetTitle = "ArsiPreset - Preset Lightroom Editorial";
const arsipresetDescription =
  "Preset Lightroom premium bergaya editorial. Satu klik, warna langsung berkarakter. Tersedia dalam 3 pack: AR2020, AR2021, AR2022.";

export const metadata: Metadata = {
  // Sub-brand produk: pakai absolute agar tidak menempel "- Maulana Bayu".
  title: { absolute: arsipresetTitle },
  description: arsipresetDescription,
  alternates: { canonical: "/arsipreset" },
  openGraph: {
    title: arsipresetTitle,
    description: arsipresetDescription,
    url: "/arsipreset",
  },
};

const ACCENT = "#6AADCE";

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: "variable",
  axes: ["opsz", "wdth"],
});

const glass = "bg-white/50 dark:bg-white/[0.04] backdrop-blur-xl border border-white/70 dark:border-white/10 shadow-[0_2px_20px_rgba(106,173,206,0.08)]";
const fullSection = "w-screen min-h-svh overflow-visible";
const centeredSection = `${fullSection} flex flex-col items-center justify-center px-0 py-20 sm:py-24 lg:min-h-screen lg:overflow-hidden`;

type Pack = {
  id: string;
  name: string;
  desc: string;
  price: string;
  presets: number;
  tag: string;
  accentHex: string;
  previewGradient: string;
  href: string;
  featured?: boolean;
};

const packs: Pack[] = [
  {
    id: "AR2020",
    name: "Arsip Preset 2020",
    desc: "Film grain klasik, highlight sedikit tergerus, shadow hangat. Cocok untuk foto jalanan dan portrait candid.",
    price: "Rp 35.000",
    presets: 12,
    tag: "Film · Grain · Retro",
    accentHex: "#c49a60",
    previewGradient: "linear-gradient(135deg, #2e1e08 0%, #5c3a18 45%, #8a5c2e 80%, #b88040 100%)",
    href: "http://lynk.id/arsipdigitalbymasbay/nY37VK3/checkout",
  },
  {
    id: "AR2021",
    name: "Arsip Preset 2021",
    desc: "Shadow dalam, teal di highlight, kontras sinematik. Cocok untuk foto travel, landscape, dan fashion.",
    price: "Rp 35.000",
    presets: 15,
    tag: "Cinematic · Teal · Dark",
    accentHex: ACCENT,
    previewGradient: "linear-gradient(135deg, #081418 0%, #103040 45%, #1c5060 80%, #2a7080 100%)",
    href: "http://lynk.id/arsipdigitalbymasbay/6EAj1B9/checkout",
    featured: true,
  },
  {
    id: "AR2022",
    name: "Arsip Preset 2022",
    desc: "Midtone hangat, black pekat, highlight elegan. Preset editorial paling matang dari seluruh seri Arsi.",
    price: "Rp 35.000",
    presets: 18,
    tag: "Editorial · Warm · Premium",
    accentHex: "#d4826a",
    previewGradient: "linear-gradient(135deg, #1a0a02 0%, #3d1e06 35%, #6e3410 65%, #a05828 85%, #c47030 100%)",
    href: "http://lynk.id/arsipdigitalbymasbay/YGwB2aB/checkout",
  },
];


const galleryItems = [
  { image: "https://picsum.photos/seed/101/900/600", text: "AR2020 · Film" },
  { image: "https://picsum.photos/seed/102/900/600", text: "AR2020 · Grain" },
  { image: "https://picsum.photos/seed/201/900/600", text: "AR2021 · Cinematic" },
  { image: "https://picsum.photos/seed/202/900/600", text: "AR2021 · Teal" },
  { image: "https://picsum.photos/seed/301/900/600", text: "AR2022 · Editorial" },
  { image: "https://picsum.photos/seed/302/900/600", text: "AR2022 · Warm" },
  { image: "https://picsum.photos/seed/401/900/600", text: "Portrait" },
  { image: "https://picsum.photos/seed/501/900/600", text: "Landscape" },
];

export default function ArsiPresetPage() {
  return (
    <div className="ap-page text-zinc-950 dark:text-zinc-50">
      {/* ══ 1 · HERO ══════════════════════════════════════════════════════════ */}
      <section id="hero" className="ap-bg-hero w-screen min-h-svh flex flex-col items-center justify-center overflow-hidden">
        {/* pt-[4.5rem] mendorong konten ke bawah navbar (navbar height = 4.5rem) */}
        <div className="flex w-full max-w-none flex-col items-center gap-3 px-4 pb-4 pt-[4.5rem] text-center sm:gap-4 sm:px-6">
          <div className={`inline-flex items-center gap-2 rounded-md px-3 py-1 text-xs text-zinc-600 dark:text-zinc-300 ${glass}`}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: ACCENT }} />
            Lightroom Preset Collection
          </div>

          {/* Mobile: 36px · sm: 48px · lg: 86px */}
          <h1 className={`${bricolageGrotesque.className} w-full text-[36px] font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-[86px] xl:text-[96px]`}>
            <span className="block sm:whitespace-nowrap">Warnai Instagram<span className="hidden sm:inline"> Kamu</span></span>
            <span className="block sm:whitespace-nowrap" style={{ color: ACCENT }}>Dengan Arsipreset</span>
          </h1>

          {/* Mobile: 16px */}
          <p className="flex flex-col text-[16px] font-medium leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
            Jadikan Sat Set Bersama Arsipreset
            <span>Yuk Jadikan Foto Kamu Lebih Estetik Sekarang</span>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <a href="#packs" className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-85" style={{ background: ACCENT }}>
              Lihat Preset Pack
              <ArrowRightIcon className="h-[13px] w-[13px]" />
            </a>
          </div>
        </div>

        {/* ── Circular Gallery dengan fade edges ───────────────────────── */}
        <div className="relative w-full overflow-hidden" style={{ height: "340px" }}>
          {/* Gradient fade kiri */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 sm:w-36"
            style={{
              background: "linear-gradient(to right, var(--ap-hero-bg, #f0f8fc), transparent)",
            }}
            aria-hidden
          />
          {/* Gradient fade kanan */}
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 sm:w-36"
            style={{
              background: "linear-gradient(to left, var(--ap-hero-bg, #f0f8fc), transparent)",
            }}
            aria-hidden
          />
          <CircularGallery
            items={galleryItems}
            bend={0}
            textColor="#6AADCE"
            borderRadius={0.14}
            scrollSpeed={1.2}
            scrollEase={0.03}
            fontUrl="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&display=swap"
            font="bold 20px Geist"
          />
        </div>
      </section>

      {/* ══ 2 · PRESET PACKS ══════════════════════════════════════════════════ */}
      <section id="packs" className={`${centeredSection} bg-white dark:bg-zinc-950`}>
        <div className="w-full max-w-screen-lg mx-auto px-6 flex flex-col gap-8">
          <div className="text-center">
            <p className="mb-1.5 text-xs font-semibold tracking-widest uppercase text-zinc-400 dark:text-zinc-500">Koleksi</p>
            <h2 className="text-3xl font-semibold tracking-tight">Sat Set, Sat Set, Langsung Jadi Aesthetic</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {packs.map(pack => (
              <div key={pack.id} className={`group flex flex-col overflow-hidden rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(106,173,206,0.14)] ${glass}`}>
                {/* Preview lebih compact */}
                <div className="relative h-28 w-full overflow-hidden sm:h-32" style={{ background: pack.previewGradient }} aria-label={`Preview ${pack.id} ${pack.name}`}>
                  {pack.featured && (
                    <div className="absolute top-2.5 right-2.5 rounded-full px-2 py-0.5 text-[10px] font-semibold text-white" style={{ background: ACCENT }}>
                      Populer
                    </div>
                  )}
                  <span className="absolute bottom-2.5 left-3.5 text-3xl font-bold opacity-20 select-none text-white" aria-hidden>
                    {pack.id}
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-2.5 p-4">
                  <div>
                    <p className="text-[10px] font-semibold tracking-widest uppercase text-zinc-400 dark:text-zinc-500 mb-0.5">{pack.tag}</p>
                    <h3 className="text-sm font-semibold tracking-tight">{pack.name}</h3>
                  </div>
                  <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 flex-1">{pack.desc}</p>
                  <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2.5 border-t border-white/50 dark:border-white/10">
                    <span className="text-sm font-semibold">{pack.price}</span>
                    <a href={pack.href} target="_blank" rel="noopener noreferrer" className="rounded-lg px-3.5 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-80" style={{ background: pack.accentHex }}>
                      Beli sekarang
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 3 · FAQ ════════════════════════════════════════════════════════════ */}
      <section id="faq" className={`${centeredSection} bg-[#f4fafd] dark:bg-[#060e16]`}>
        <div className="w-full max-w-screen-xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">

          {/* Kolom kiri — foto besar */}
          <div className={`relative overflow-hidden rounded-3xl h-72 sm:h-96 lg:h-[70vh] lg:max-h-[600px] ${glass}`}>
            {/* Placeholder foto — ganti src dengan foto asli */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                background: "linear-gradient(160deg, #1c2a38 0%, #2e4a5e 35%, #4a7a8a 65%, #6aadce 100%)",
              }}
              aria-hidden
            />
            {/* Overlay tipis */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" aria-hidden />
            {/* Caption bawah */}
            <div className="absolute bottom-5 left-5 right-5">
              <p className="text-xs font-semibold tracking-widest uppercase text-white/60">arsipreset</p>
              <p className="text-sm font-medium text-white/90 mt-0.5">Hasil edit dengan preset AR2022 Darkroom Warm</p>
            </div>
          </div>

          {/* Kolom kanan — FAQ: header fixed di atas, list scroll di bawah */}
          <div className="flex min-h-0 flex-col lg:h-[70vh] lg:max-h-[600px]">
            {/* Header — tidak bergerak */}
            <div className="shrink-0 pb-5">
              <p className="mb-1.5 text-xs font-semibold tracking-widest uppercase text-zinc-400 dark:text-zinc-500">
                FAQ
              </p>
              <h2 className="text-2xl font-semibold tracking-tight">Pertanyaan paling sering.</h2>
              <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                Kalau belum terjawab, DM langsung di Instagram.
              </p>
            </div>

            {/* FAQ list */}
            <FaqList glass={glass} />
          </div>

        </div>
      </section>

      {/* ══ 5 · CTA ═══════════════════════════════════════════════════════════ */}
      <section className={`ap-bg-cta ${centeredSection}`}>
        <div className="w-full max-w-screen-lg mx-auto px-6 text-center flex flex-col items-center gap-4">
          <p className="text-xs font-semibold tracking-widest uppercase text-zinc-400 dark:text-zinc-500">Mulai sekarang</p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Edit lebih sedikit, <span style={{ color: ACCENT }}>hasilkan lebih banyak.</span>
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Compatible dengan Lightroom Classic, CC, dan Mobile.</p>
          <a href="#packs" className="mt-2 inline-flex items-center gap-2 rounded-full px-7 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-85" style={{ background: ACCENT }}>
            Lihat semua pack
            <ArrowRightIcon className="h-[13px] w-[13px]" />
          </a>
        </div>
      </section>

      {/* ══ 6 · FOOTER ════════════════════════════════════════════════════════ */}
      <footer className="w-screen min-h-svh flex flex-col items-center justify-center overflow-visible bg-zinc-950 py-20 text-zinc-50 lg:min-h-screen lg:overflow-hidden">
        <div className="w-full max-w-screen-lg mx-auto px-6 flex flex-col items-center gap-10">
          <span className="text-3xl font-semibold tracking-tight">
            arsipreset<span style={{ color: ACCENT }}>.</span>
          </span>

          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-8">
            {[
              { label: "Instagram", href: "https://instagram.com/arsipreset" },
            ].map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-400 hover:text-zinc-50 transition-colors">
                {label}
              </a>
            ))}
          </div>

          <div className="flex flex-col items-center gap-2 text-xs text-zinc-600">
            <Link href="/" className="hover:text-zinc-50 transition-colors">
              ← Kembali ke portfolio
            </Link>
            <span>© 2024 arsipreset</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
