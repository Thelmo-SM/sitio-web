/* ---------- BASE JSON-LD ---------- */
export type JsonLd = {
  "@context": "https://schema.org";
  "@type": string;
  [key: string]: unknown;
};

/* ---------- LOCAL BUSINESS ---------- */
export interface LocalBusinessSchema extends JsonLd {
  name: string;
  image?: string;
  description?: string;
  url: string;
  telephone?: string;
  email?: string;

  address: {
    "@type": "PostalAddress";
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };

  geo?: {
    "@type": "GeoCoordinates";
    latitude: number;
    longitude: number;
  };

  openingHoursSpecification?: Array<{
    "@type": "OpeningHoursSpecification";
    dayOfWeek: string[];
    opens: string;
    closes: string;
  }>;

  priceRange?: string;
  sameAs?: string[];
}

/* ---------- BREADCRUMB ---------- */
export interface BreadcrumbSchema extends JsonLd {
  "@type": "BreadcrumbList";
  itemListElement: Array<{
    "@type": "ListItem";
    position: number;
    name: string;
    item?: string;
  }>;
}

/* ---------- PRODUCT ---------- */
export interface ProductSchema extends JsonLd {
  "@type": "Product";
  name: string;
  description?: string;
  image?: string | string[];

  brand?: {
    "@type": "Brand";
    name: string;
  };

  offers?: {
    "@type": "Offer";
    url: string;
    priceCurrency: string;
    price: string;
    availability: string;
  };

  aggregateRating?: {
    "@type": "AggregateRating";
    ratingValue: number;
    bestRating: number;
    worstRating: number;
    ratingCount: number;
  };
}
