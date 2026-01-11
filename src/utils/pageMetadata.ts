// Generador de metadatos para páginas individuales

import type { Metadata } from "next";
import { siteConfig } from "@/utils/seoConfig";

interface PageMetadataProps {
  title: string;
  description: string;
  url: string; // ✅ obligatorio (evita canonical duplicado)
  keywords?: string[];
  image?: string;
  type?: "website" | "article"; // ✅ Open Graph solo acepta estos
}

export function generatePageMetadata({
  title,
  description,
  keywords = [],
  image = siteConfig.logo,
  url,
  type = "website",
}: PageMetadataProps): Metadata {
  const fullTitle = `${title} | ${siteConfig.siteName}`;

  return {
    title: fullTitle,
    description,
    keywords: [
      ...keywords,
      ...siteConfig.keywords.main,
      ...siteConfig.keywords.local,
    ],
    openGraph: {
      type, // ✅ SIN any
      locale: "es_DO", // ✅ República Dominicana
      url,
      siteName: siteConfig.siteName,
      title: fullTitle,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@tutienda",    // opcional (quita si no existe)
      creator: "@tutienda", // opcional
      title: fullTitle,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
  };
}
