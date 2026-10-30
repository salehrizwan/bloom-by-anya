import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, Order, CustomGiftState } from '../types';
import { BRAND_CONFIG } from '../config/brand';

interface ShopContextType {
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  deliveryFee: number;
  cartTotal: number;
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'orderDate' | 'status'>) => Order;
  getOrderById: (orderId: string) => Order | undefined;
  isMiniCartOpen: boolean;
  setIsMiniCartOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (p: Product | null) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  formatWhatsAppOrderMessage: (order: Order) => string;
  getWhatsAppOrderUrl: (order: Order) => string;
  getWhatsAppDirectInquiryUrl: (text?: string) => string;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'blooms_by_anya_cart_v1';
const WISHLIST_STORAGE_KEY = 'blooms_by_anya_wishlist_v1';
const ORDERS_STORAGE_KEY = 'blooms_by_anya_orders_v1';

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial states from localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const stored = localStorage.getItem(ORDERS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync with LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist to localStorage', e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders to localStorage', e);
    }
  }, [orders]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 2800);
  };

  const addToCart = (itemData: Omit<CartItem, 'id'>) => {
    const idKey = `${itemData.productId}-${itemData.selectedColor || ''}-${itemData.selectedSize || ''}-${itemData.customCardMessage || ''}`;
    
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.id === idKey);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += itemData.quantity;
        return updated;
      } else {
        return [...prev, { ...itemData, id: idKey }];
      }
    });

    showToast(`Added "${itemData.name}" to your shopping bag`);
    setIsMiniCartOpen(true);
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev => prev.map(item => (item.id === id ? { ...item, quantity } : item)));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => {
      const removed = prev.find(item => item.id === id);
      if (removed) {
        showToast(`Removed "${removed.name}" from shopping bag`);
      }
      return prev.filter(item => item.id !== id);
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed item from your wishlist');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Saved item to your wishlist');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Derived totals
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const deliveryFee = cartSubtotal >= BRAND_CONFIG.delivery.freeDeliveryThreshold || cartSubtotal === 0 
    ? 0 
    : BRAND_CONFIG.delivery.standardFee;
  const cartTotal = cartSubtotal + deliveryFee;

  const createOrder = (orderData: Omit<Order, 'id' | 'orderDate' | 'status'>): Order => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newOrderId = `BBA-${randomSuffix}`;
    const newOrder: Order = {
      ...orderData,
      id: newOrderId,
      orderDate: new Date().toISOString(),
      status: 'Received',
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const getOrderById = (orderId: string) => {
    return orders.find(o => o.id.toLowerCase() === orderId.toLowerCase());
  };

  const formatWhatsAppOrderMessage = (order: Order): string => {
    const itemsList = order.items
      .map(
        (item, idx) =>
          `${idx + 1}. *${item.name}* (x${item.quantity}) - Rs. ${(item.price * item.quantity).toLocaleString()}${
            item.customDetails ? `\n   _Details: ${item.customDetails}_` : ''
          }`
      )
      .join('\n');

    const msg = `*NEW ORDER REQUEST — BLOOMS BY ANYA*
Ref No: *#${order.id}*
Date: ${new Date(order.orderDate).toLocaleDateString()}

*Customer Details:*
• Name: ${order.customerInfo.fullName}
• WhatsApp: ${order.customerInfo.whatsappNumber}
• City: ${order.customerInfo.city}
• Address: ${order.customerInfo.deliveryAddress}
• Preferred Delivery Date: ${order.customerInfo.preferredDeliveryDate}
${order.customerInfo.giftMessage ? `• Gift Card Note: "${order.customerInfo.giftMessage}"\n` : ''}${
      order.customerInfo.additionalNotes ? `• Special Notes: ${order.customerInfo.additionalNotes}\n` : ''
    }
*Items Ordered:*
${itemsList}

*Financial Summary:*
• Subtotal: Rs. ${order.subtotal.toLocaleString()}
• Delivery: ${order.deliveryFee === 0 ? 'FREE' : `Rs. ${order.deliveryFee.toLocaleString()}`}
• *Grand Total: Rs. ${order.total.toLocaleString()}*

_Please confirm order availability and dispatch schedule. Thank you!_`;

    return msg;
  };

  const getWhatsAppOrderUrl = (order: Order): string => {
    const rawNumber = BRAND_CONFIG.contact.whatsappNumber.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(formatWhatsAppOrderMessage(order));
    return `https://wa.me/${rawNumber}?text=${message}`;
  };

  const getWhatsAppDirectInquiryUrl = (text?: string): string => {
    const rawNumber = BRAND_CONFIG.contact.whatsappNumber.replace(/[^0-9]/g, '');
    const defaultText = text || `Hello Blooms by Anya, I am browsing your luxury boutique and would like to inquire about a custom arrangement.`;
    return `https://wa.me/${rawNumber}?text=${encodeURIComponent(defaultText)}`;
  };

  return (
    <ShopContext.Provider
      value={{
        cart,
        cartCount,
        cartSubtotal,
        deliveryFee,
        cartTotal,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        wishlist,
        toggleWishlist,
        isInWishlist,
        orders,
        createOrder,
        getOrderById,
        isMiniCartOpen,
        setIsMiniCartOpen,
        quickViewProduct,
        setQuickViewProduct,
        searchQuery,
        setSearchQuery,
        toastMessage,
        showToast,
        formatWhatsAppOrderMessage,
        getWhatsAppOrderUrl,
        getWhatsAppDirectInquiryUrl,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
