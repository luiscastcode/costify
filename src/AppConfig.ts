import socialImg from '../public/img/social.webp'



export const SITE = {
  metatitle: "Aprende a Tu Bodega Al Día Facturas y Trámites en Venezuela 2025",
  tagline: "Guias Para Pagar Trámites y Servicios",
  metadescrip: "Aprende a gestionar tus trámites, pagar facturas desde tu teléfono o pc, pagar servicios en linea de Cantv, factura en línea corpoelec, rif en línea y más.",
  description_short: "Aprende a gestionar tus trámites, pagar facturas desde tu teléfono o pc.",
  url: "https://costifyprecios.vercel.app",
  author: "Luis Castillo",
};

export const SEO = {
  title: SITE.metatitle,
  description: SITE.metadescrip,
  structuredData: {
    "@context": "https://schema.org",
    "@type": "WebPage",
    inLanguage: "en-US",
    "@id": SITE.url,
    url: SITE.url,
    name: SITE.metatitle,
    description: SITE.metadescrip,
    isPartOf: {
      "@type": "WebSite",
      url: SITE.url,
      name: SITE.metatitle,
      description: SITE.metadescrip,
    },
  },
};

