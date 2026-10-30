/**
 * @license
 * Blooms by Anya - Official Brand Configuration
 * Sialkot, Pakistan
 */

// Import static image assets directly so Vite bundles and hashes them in production builds (Vercel/GitHub/Cloud Run)
import heroImg from '../assets/images/hero_luxury_floral_1793343305329.jpg';
import roseBouquetImg from '../assets/images/product_rose_bouquet_1793343306109.jpg';
import sunflowerBouquetImg from '../assets/images/product_sunflower_bouquet_1793343307062.jpg';
import chocolateHamperImg from '../assets/images/product_chocolate_hamper_1793343307698.jpg';
import studioImg from '../assets/images/craft_studio_anya_1793343308424.jpg';

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
  assets: {
    logo: "/assets/aistudio/image_cab25869.png",
    fallback: "/images/floral_fallback.svg",
    hero: heroImg,
    roseBouquet: roseBouquetImg,
    sunflowerBouquet: sunflowerBouquetImg,
    chocolateHamper: chocolateHamperImg,
    studio: studioImg,
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
