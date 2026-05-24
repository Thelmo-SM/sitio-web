// Configuración centralizada de SEO para tu tienda

export const siteConfig = {
  // Información básica del sitio
  siteName: "CellStore",
  description: "Tu tienda de celulares de confianza. Venta de smartphones últimos modelos, accesorios y servicio técnico profesional.",
  siteUrl: "https://tutienda.com", // Cambia esto por tu dominio real
  logo: "https://tutienda.com/logo.png",
  
  // Información de contacto
  contact: {
    email: "info@tutienda.com",
    phone: "+1 (XXX) XXX-XXXX", // Cambia con tu número
    whatsapp: "+1 (XXX) XXX-XXXX",
  },

  // Información local del negocio
  business: {
    name: "Tienda de Celulares Premium",
    type: "MobilePhoneStore", // LocalBusiness type
    description: "Tienda especializada en venta y servicio técnico de celulares",
    address: {
      streetAddress: "Calle Principal 123", // Cambia
      addressLocality: "Tu Ciudad", // Cambia
      addressRegion: "Tu Estado/Provincia", // Cambia
      postalCode: "00000", // Cambia
      addressCountry: "MX", // Código de país ISO
    },
    coordinates: {
      latitude: 0.0, // Cambia
      longitude: 0.0, // Cambia
    },
    openingHours: [
      {
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "19:00",
      },
      {
        dayOfWeek: ["Saturday"],
        opens: "10:00",
        closes: "18:00",
      },
      {
        dayOfWeek: ["Sunday"],
        opens: "12:00",
        closes: "17:00",
      },
    ],
    priceRange: "$$", // $ a $$$$
  },

  // Social media
  social: {
    facebook: "https://facebook.com/tutienda",
    instagram: "https://instagram.com/tutienda",
    twitter: "https://twitter.com/tutienda",
    whatsapp: "https://wa.me/1234567890",
    youtube: "https://youtube.com/@tutienda",
  },

  // Keywords principales
  keywords: {
    main: ["celulares", "smartphones", "tienda de celulares", "servicio técnico"],
    local: ["celulares en [tu ciudad]", "tienda de celulares cerca de mí"],
    products: ["iPhone", "Samsung", "Xiaomi", "OnePlus"],
  },
};

// Metadatos por defecto para el sitio
export const defaultMetadata = {
  title: `${siteConfig.siteName} | Venta y Servicio Técnico`,
  description: siteConfig.description,
  keywords: [...siteConfig.keywords.main, ...siteConfig.keywords.local],
  authors: [{ name: siteConfig.business.name }],
  creator: siteConfig.business.name,
  openGraph: {
    type: "website",
    locale: "es_MX", // Cambia según tu región
    url: siteConfig.siteUrl,
    siteName: siteConfig.siteName,
    title: `${siteConfig.siteName} | Venta y Servicio Técnico`,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.logo,
        width: 1200,
        height: 630,
        alt: siteConfig.siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@tutienda", // Cambia
    creator: "@tutienda", // Cambia
    title: siteConfig.siteName,
    description: siteConfig.description,
    images: [siteConfig.logo],
  },
};
