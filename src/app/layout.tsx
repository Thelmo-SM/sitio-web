import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

import Navbar from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import StructuredData from "@/components/ui/StructuredData";

import { metadata as seoMetadata } from "./metadata";
import {
  generateLocalBusinessSchema,
  generateOrganizationSchema,
} from "@/utils/structuredData";

export const metadata: Metadata = seoMetadata;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <head>
        {/* Datos estructurados (JSON-LD) */}
        <StructuredData data={generateLocalBusinessSchema()} />
        <StructuredData data={generateOrganizationSchema()} />
      </head>

      <body>
        <Navbar />
        {children}
        <Footer />

        {/* Google Maps API */}
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&libraries=places`}
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
