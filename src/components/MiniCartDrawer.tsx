import React from 'react';
import { Link } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { BRAND_CONFIG } from '../config/brand';

export const MiniCartDrawer: React.FC = () => {
  const {
    cart,
    cartCount,
    cartSubtotal,
    deliveryFee,
    cartTotal,
    isMiniCartOpen,
    setIsMiniCartOpen,
    updateQuantity,
    removeFromCart,
  } = useShop();

  if (!isMiniCartOpen) return null;

  const freeDeliveryThreshold = BRAND_CONFIG.delivery.freeDeliveryThreshold;
  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - cartSubtotal);
  const deliveryProgress = Math.min(100, (cartSubtotal / freeDeliveryThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#303A2B]/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsMiniCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FBF8F1] shadow-2xl flex flex-col border-l border-[#D8C8A5]/40 animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 border-b border-[#D8C8A5]/30 flex items-center justify-between bg-[#F7F1E7]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#303A2B]" />
              <h2 className="font-serif text-lg font-bold text-[#303A2B]">
                Your Shopping Bag ({cartCount})
              </h2>
            </div>
            <button
              onClick={() => setIsMiniCartOpen(false)}
              className="p-1.5 rounded-full hover:bg-[#D8C8A5]/20 text-[#303A2B] transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Delivery Threshold Indicator */}
          <div className="p-4 bg-[#FBF8F1] border-b border-[#D8C8A5]/20 text-xs text-[#303A2B]">
            {remainingForFreeDelivery > 0 ? (
              <div>
                <p className="mb-1.5">
                  Add <span className="font-semibold text-[#303A2B]">{BRAND_CONFIG.currency.format(remainingForFreeDelivery)}</span> more for <span className="font-semibold text-[#788269]">Free Sialkot Delivery</span>
                </p>
                <div className="w-full bg-[#EBF0E6] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#788269] h-full transition-all duration-300 rounded-full"
                    style={{ width: `${deliveryProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <p className="text-[#303A2B] font-medium flex items-center gap-1.5">
                <span className="text-[#D99B20]">✓</span> You qualify for <span className="font-semibold text-[#788269]">Free Sialkot Delivery!</span>
              </p>
            )}
          </div>

          {/* Item List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#D8C8A5]/20">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#F7F1E7] border border-[#D8C8A5] flex items-center justify-center text-[#788269]">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-[#303A2B]">
                    Your bag is empty
                  </h3>
                  <p className="text-xs text-[#788269] max-w-xs mt-1">
                    Discover handcrafted bouquets, chocolate hampers, and bespoke gifts handmade with love.
                  </p>
                </div>
                <Link
                  to="/shop"
                  onClick={() => setIsMiniCartOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-[#303A2B] text-[#FBF8F1] text-xs uppercase tracking-wider font-medium hover:bg-[#788269] transition-colors"
                >
                  Explore Bouquets
                </Link>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="py-4 flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-lg object-cover border border-[#D8C8A5]/40 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="text-sm font-semibold text-[#303A2B] truncate">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#788269] hover:text-red-600 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {item.selectedColor && (
                      <p className="text-[11px] text-[#788269] mt-0.5">
                        Wrap: {item.selectedColor}
                        {item.selectedSize ? ` · Size: ${item.selectedSize}` : ''}
                      </p>
                    )}

                    {item.customCardMessage && (
                      <p className="text-[11px] text-[#303A2B]/70 italic truncate mt-0.5">
                        Card: "{item.customCardMessage}"
                      </p>
                    )}

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center border border-[#D8C8A5] rounded-full bg-[#F7F1E7]">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:text-[#303A2B] text-[#788269] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-mono font-medium text-[#303A2B] tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:text-[#303A2B] text-[#788269] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-mono text-sm font-semibold text-[#303A2B] tabular-nums">
                        {BRAND_CONFIG.currency.format(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#D8C8A5]/30 bg-[#F7F1E7]/70 space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#788269]">
                  <span>Subtotal</span>
                  <span className="font-mono text-[#303A2B] font-medium tabular-nums">
                    {BRAND_CONFIG.currency.format(cartSubtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-[#788269]">
                  <span>Estimated Delivery</span>
                  <span className="font-mono text-[#303A2B] font-medium tabular-nums">
                    {deliveryFee === 0 ? 'FREE' : BRAND_CONFIG.currency.format(deliveryFee)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-[#303A2B] pt-2 border-t border-[#D8C8A5]/30">
                  <span>Total</span>
                  <span className="font-mono text-base tabular-nums">
                    {BRAND_CONFIG.currency.format(cartTotal)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link
                  to="/cart"
                  onClick={() => setIsMiniCartOpen(false)}
                  className="w-full py-2.5 px-3 rounded-xl border border-[#303A2B] text-[#303A2B] text-xs font-semibold tracking-wide text-center hover:bg-[#303A2B]/5 transition-colors"
                >
                  View Full Bag
                </Link>
                <Link
                  to="/checkout"
                  onClick={() => setIsMiniCartOpen(false)}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#303A2B] text-[#FBF8F1] text-xs font-semibold tracking-wide text-center hover:bg-[#788269] transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <p className="text-[11px] text-center text-[#788269] flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Handmade with care & direct artisan confirmation
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
