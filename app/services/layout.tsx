import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={[dmSans.className, "mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8"].join(" ")}>
      {children}
    </div>
  );
}
