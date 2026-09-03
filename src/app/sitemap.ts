import type { MetadataRoute } from "next";
import { guides } from "@/lib/guides";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/guia/",
    "/acerca/",
    "/contacto/",
    "/privacidad/",
    "/aviso-legal/",
  ];

  return [
    ...staticRoutes.map((path) => ({
      url: `${SITE_URL}${path || "/"}`,
      lastModified: new Date("2026-09-03"),
    })),
    ...guides.map((guide) => ({
      url: `${SITE_URL}/guia/${guide.slug}/`,
      lastModified: new Date(guide.updated),
    })),
  ];
}
