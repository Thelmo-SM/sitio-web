// Generador de datos estructurados (Schema.org JSON-LD)

import { siteConfig } from "./seoConfig";
import { LocalBusinessSchema, BreadcrumbSchema, ProductSchema } from "@/types/SEOTypes";

/**
 * Genera el Schema de LocalBusiness para SEO local
 */
export function generateLocalBusinessSchema(): LocalBusinessSchema {
  return {
    "@context": "https://schema.org",
    "@type": siteConfig.business.type || "LocalBusiness",
    name: siteConfig.business.name,
    image: siteConfig.logo,
    description: siteConfig.business.description,
    url: siteConfig.siteUrl,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.business.address.streetAddress,
      addressLocality: siteConfig.business.address.addressLocality,
      addressRegion: siteConfig.business.address.addressRegion,
      postalCode: siteConfig.business.address.postalCode,
      addressCountry: siteConfig.business.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.business.coordinates.latitude,
      longitude: siteConfig.business.coordinates.longitude,
    },
    openingHoursSpecification: siteConfig.business.openingHours.map((hours) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: hours.dayOfWeek,
      opens: hours.opens,
      closes: hours.closes,
    })),
    priceRange: siteConfig.business.priceRange,
    sameAs: Object.values(siteConfig.social).filter(Boolean),
  };
}

/**
 * Genera el Schema de Breadcrumb para navegación
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url?: string }>): BreadcrumbSchema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url ? `${siteConfig.siteUrl}${item.url}` : undefined,
    })),
  };
}

/**
 * Genera el Schema para un producto
 */
export function generateProductSchema(product: {
  name: string;
  description?: string;
  image?: string | string[];
  brand?: string;
  price?: string;
  currency?: string;
  availability?: "InStock" | "OutOfStock" | "PreOrder";
  rating?: { value: number; count: number };
}): ProductSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,

    brand: product.brand
      ? {
          "@type": "Brand",
          name: product.brand,
        }
      : undefined,

    offers: product.price
      ? {
          "@type": "Offer",
          url: siteConfig.siteUrl,
          priceCurrency: product.currency ?? "DOP",
          price: product.price,
          availability: `https://schema.org/${product.availability ?? "InStock"}`,
        }
      : undefined,

    aggregateRating: product.rating
      ? {
          "@type": "AggregateRating",
          ratingValue: product.rating.value,
          bestRating: 5,
          worstRating: 1,
          ratingCount: product.rating.count,
        }
      : undefined,
  };
}


/**
 * Genera el Schema para Organización
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.business.name,
    url: siteConfig.siteUrl,
    logo: siteConfig.logo,
    description: siteConfig.business.description,
    sameAs: Object.values(siteConfig.social).filter(Boolean),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.contact.phone,
      contactType: "Customer Service",
    },
  };
}

/**
 * Genera el Schema para FAQs
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
