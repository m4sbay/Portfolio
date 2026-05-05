import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export default function EventLayout({ children }: { children: React.ReactNode }) {
  return <div className={dmSans.className}>{children}</div>;
}
