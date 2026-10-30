/**
 * @license
 * Blooms by Anya - Official Brand Configuration
 * Sialkot, Pakistan
 */

export const BRAND_CONFIG = {
  name: "Blooms by Anya",
  tagline: "Thoughtfully Made. Beautifully Gifted.",
  location: "Sialkot, Pakistan",
  country: "Pakistan",
  currency: {
    code: "PKR",
    symbol: "Rs. ",
    format: (amount: number) => `Rs. ${amount.toLocaleString()}`,
  },
  // Configurable contact details
  contact: {
    whatsappNumber: "+923001234567", // Configurable WhatsApp Business number
    whatsappDisplay: "+92 300 1234567",
    instagramHandle: "blooms_by_anya",
    instagramUrl: "https://www.instagram.com/blooms_by_anya/",
    email: "bloomsbyanya@gmail.com", // Configurable email
    city: "Sialkot",
    province: "Punjab, Pakistan",
    deliveryNotice: "Standard delivery across Sialkot city within 24-48 hours. Express same-day delivery available on select arrangements.",
  },
  delivery: {
    standardFee: 350,
    freeDeliveryThreshold: 6000,
  },
  // Canonical public image assets guaranteed to work in development, production build, and Vercel deployments
  assets: {
    logo: "/images/branding/logo.png",
    fallback: "/images/floral_fallback.svg",
    hero: "/images/hero/hero_luxury_floral.jpg",
    roseBouquet: "/images/bouquets/rose_bouquet.jpg",
    sunflowerBouquet: "/images/bouquets/sunflower_bouquet.jpg",
    chocolateHamper: "/images/hampers/chocolate_hamper.jpg",
    studio: "/images/gallery/craft_studio_anya.jpg",
  },
  palette: {
    warmIvory: "#F7F1E7",
    softCream: "#FBF8F1",
    sageGreen: "#788269",
    botanicalGreen: "#303A2B",
    blushPink: "#DDA9AC",
    champagneGold: "#D8C8A5",
    sunflowerGold: "#D99B20",
  },
};
