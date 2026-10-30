export type ProductCategory =
  | 'bouquets'
  | 'hampers'
  | 'occasions'
  | 'arrangements';

export interface ProductVariant {
  id: string;
  name: string;
  priceModifier?: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  subcategory: string;
  price: number; // In PKR
  originalPrice?: number;
  description: string;
  story: string;
  images: string[];
  features: string[];
  flowersIncluded?: string[];
  dimensions?: string;
  availableWrappingColors?: string[];
  availableSizes?: { name: string; label: string; priceDiff: number }[];
  badge?: 'Bestseller' | 'New' | 'Signature' | 'Artisan Handcrafted';
  inStock: boolean;
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  id: string; // unique item id combining product id and variations
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  selectedColor?: string;
  selectedSize?: string;
  customCardMessage?: string;
  recipientName?: string;
  isCustomGift?: boolean;
  customGiftDetails?: string;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

export interface CustomGiftState {
  base: {
    id: string;
    name: string;
    price: number;
    description: string;
  };
  flowers: Array<{
    id: string;
    name: string;
    price: number;
    count: number;
  }>;
  treats: Array<{
    id: string;
    name: string;
    price: number;
    count: number;
  }>;
  accessories: Array<{
    id: string;
    name: string;
    price: number;
  }>;
  personalization: {
    wrappingColor: string;
    ribbonColor: string;
    recipientName: string;
    cardMessage: string;
    specialInstructions: string;
  };
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  customDetails?: string;
}

export interface Order {
  id: string; // e.g. BBA-8924
  orderDate: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: 'Received' | 'In Preparation' | 'Dispatched' | 'Delivered';
  customerInfo: {
    fullName: string;
    whatsappNumber: string;
    email?: string;
    deliveryAddress: string;
    city: string;
    postalCode?: string;
    preferredDeliveryDate: string;
    giftMessage?: string;
    additionalNotes?: string;
  };
  checkoutMethod: 'website' | 'whatsapp';
}
