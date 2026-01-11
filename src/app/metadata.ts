// Configuración centralizada de metadatos
// Importa esto en layout.tsx

import type { Metadata, Viewport } from "next";
import { defaultMetadata, siteConfig } from "@/utils/seoConfig";

// Metadatos básicos
export const metadata: Metadata = {
  title: {
    default: defaultMetadata.title,
    template: `%s | ${siteConfig.siteName}`,
  },
  description: defaultMetadata.description,
  keywords: defaultMetadata.keywords,
  authors: defaultMetadata.authors,
  creator: defaultMetadata.creator,
  referrer: "strict-origin-when-cross-origin",
  
  // Open Graph
  openGraph: {
    type: "website",
    locale: "es_DO",
    url: siteConfig.siteUrl,
    siteName: siteConfig.siteName,
    title: defaultMetadata.openGraph.title,
    description: defaultMetadata.openGraph.description,
    images: defaultMetadata.openGraph.images,
  },
  
  // Twitter/X
twitter: {
  card: "summary_large_image",
  site: undefined,
  creator: undefined,
  title: defaultMetadata.twitter.title,
  description: defaultMetadata.twitter.description,
  images: defaultMetadata.twitter.images,
},
  
  // Información adicional
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  // Canonical URL
  alternates: {
    canonical: siteConfig.siteUrl,
  },
  
  // Verificación de sitios
  verification: {
    // Agrega aquí tus códigos de verificación
    // google: "codigo-de-google",
    // yandex: "codigo-de-yandex",
  },
};

// Configuración de viewport
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  colorScheme: "light dark",
};
