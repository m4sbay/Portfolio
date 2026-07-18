import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const base = site.url.replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Area internal: admin invoice (/m4s*), route API, dan demo eksperimen.
      disallow: ["/m4s", "/api/", "/demo/"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
