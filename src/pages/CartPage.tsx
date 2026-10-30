import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Tag, ArrowLeft } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { BRAND_CONFIG } from '../config/brand';
import { SAMPLE_DATA_NOTICE } from '../data/products';
import { SafeImage } from '../components/SafeImage';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    cart,
    cartCount,
    cartSubtotal,
    deliveryFee,
    cartTotal,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useShop();

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'BLOOMS10') {
      setDiscountPercent(0.10);
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError('Invalid promo code. Try "BLOOMS10" for a 10% sample discount.');
    }
  };

  const discountAmount = Math.round(cartSubtotal * discountPercent);
  const finalTotal = Math.max(0, cartSubtotal - discountAmount) + deliveryFee;

  const freeDeliveryThreshold = BRAND_CONFIG.delivery.freeDeliveryThreshold;
  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - cartSubtotal);

  if (cart.length === 0) {
    return (
      <div className="min-h-[65vh] flex flex-col items-center justify-center text-center px-4 py-16">
        <div className="w-20 h-20 rounded-full bg-[#F7F1E7] border border-[#D8C8A5] flex items-center justify-center text-[#788269] mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-[#303A2B]">
          Your Shopping Bag is Empty
        </h1>
        <p className="text-xs text-[#788269] max-w-sm mt-2 mb-8 font-light leading-relaxed">
          Looks like you haven't selected any floral arrangements or gift hampers yet. Explore our handmade collections or build a custom creation.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/shop"
            className="px-8 py-3 rounded-full bg-[#303A2B] text-[#FBF8F1] text-xs font-semibold uppercase tracking-wider hover:bg-[#788269] transition-colors"
          >
            Explore All Bouquets
          </Link>
          <Link
            to="/create-your-own-gift"
            className="px-8 py-3 rounded-full border border-[#303A2B] text-[#303A2B] text-xs font-semibold uppercase tracking-wider hover:bg-[#F7F1E7] transition-colors"
          >
            Create Your Own Gift
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF8F1] pb-24">
      
      {/* Header */}
      <div className="bg-[#F7F1E7] border-b border-[#D8C8A5]/40 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#303A2B]">
              Your Shopping Bag
            </h1>
            <p className="text-xs text-[#788269] mt-1">
              Review your handcrafted items before proceeding to checkout.
            </p>
          </div>
          <button
            onClick={clearCart}
            className="text-xs text-[#788269] hover:text-red-600 underline transition-colors self-start sm:self-auto"
          >
            Clear Bag
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Sample notice */}
        <div className="p-3 bg-[#EBF0E6] rounded-xl border border-[#788269]/30 text-center text-xs text-[#303A2B] mb-8 font-light">
          {SAMPLE_DATA_NOTICE}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Itemized List (Col 8) */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-[#D8C8A5]/50 p-6 sm:p-8 shadow-sm divide-y divide-[#D8C8A5]/30">
            {cart.map((item) => (
              <div key={item.id} className="py-6 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                
                {/* Thumb */}
                <SafeImage
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border border-[#D8C8A5]/40 shrink-0"
                />

                {/* Details */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-serif text-lg font-bold text-[#303A2B]">
                      {item.name}
                    </h3>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-[#788269] hover:text-red-600 p-1 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {item.selectedColor && (
                    <p className="text-xs text-[#788269]">
                      <span className="font-medium text-[#303A2B]">Style:</span> {item.selectedColor}
                      {item.selectedSize ? ` · Size: ${item.selectedSize}` : ''}
                    </p>
                  )}

                  {item.customCardMessage && (
                    <p className="text-xs text-[#788269] italic bg-[#F7F1E7]/70 p-2 rounded-lg font-serif">
                      Card Note: "{item.customCardMessage}"
                      {item.recipientName ? ` (To: ${item.recipientName})` : ''}
                    </p>
                  )}

                  {item.customGiftDetails && (
                    <p className="text-[11px] text-[#788269] bg-[#EBF0E6] p-2 rounded-lg">
                      {item.customGiftDetails}
                    </p>
                  )}

                  <div className="pt-3 flex items-center justify-between">
                    <div className="flex items-center border border-[#D8C8A5] rounded-xl bg-[#F7F1E7]">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2.5 py-1 text-xs text-[#788269] hover:text-[#303A2B]"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 font-mono text-xs font-bold text-[#303A2B] tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2.5 py-1 text-xs text-[#788269] hover:text-[#303A2B]"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="font-mono text-base font-bold text-[#303A2B] tabular-nums">
                        {BRAND_CONFIG.currency.format(item.price * item.quantity)}
                      </span>
                      {item.quantity > 1 && (
                        <span className="block text-[11px] text-[#788269] font-mono tabular-nums">
                          ({BRAND_CONFIG.currency.format(item.price)} each)
                        </span>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            ))}

            <div className="pt-6 flex justify-between items-center">
              <Link
                to="/shop"
                className="text-xs font-semibold text-[#303A2B] hover:text-[#788269] flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>

          {/* Order Summary Module (Col 4) */}
          <div className="lg:col-span-4 bg-white rounded-3xl border border-[#D8C8A5]/50 p-6 sm:p-7 shadow-sm sticky top-28 space-y-6">
            
            <h2 className="font-serif text-xl font-bold text-[#303A2B] pb-4 border-b border-[#D8C8A5]/30">
              Order Summary
            </h2>

            {/* Delivery threshold indicator */}
            <div className="p-3.5 bg-[#F7F1E7] rounded-xl text-xs text-[#303A2B]">
              {remainingForFreeDelivery > 0 ? (
                <p>
                  Add <span className="font-semibold">{BRAND_CONFIG.currency.format(remainingForFreeDelivery)}</span> more for <span className="font-semibold text-[#788269]">Free Sialkot Delivery</span>
                </p>
              ) : (
                <p className="font-medium text-[#788269] flex items-center gap-1.5">
                  <span className="text-[#D99B20]">✓</span> You qualify for Free Sialkot Delivery!
                </p>
              )}
            </div>

            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="space-y-1.5">
              <label className="block text-[11px] font-semibold text-[#303A2B] uppercase tracking-wider">
                Promotional Code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter code (e.g. BLOOMS10)"
                  className="flex-1 px-3 py-2 bg-[#FBF8F1] border border-[#D8C8A5] rounded-xl text-xs text-[#303A2B] uppercase placeholder:normal-case focus:outline-none focus:ring-1 focus:ring-[#303A2B]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#F7F1E7] border border-[#D8C8A5] text-[#303A2B] rounded-xl text-xs font-semibold hover:bg-[#303A2B] hover:text-white transition-colors"
                >
                  Apply
                </button>
              </div>
              {promoApplied && (
                <p className="text-[11px] text-[#788269] font-medium">
                  ✓ 10% sample discount applied!
                </p>
              )}
              {promoError && (
                <p className="text-[11px] text-red-600">
                  {promoError}
                </p>
              )}
            </form>

            {/* Financial Rows */}
            <div className="space-y-2.5 text-xs border-t border-[#D8C8A5]/30 pt-4">
              <div className="flex justify-between text-[#788269]">
                <span>Items Subtotal</span>
                <span className="font-mono text-[#303A2B] tabular-nums">
                  {BRAND_CONFIG.currency.format(cartSubtotal)}
                </span>
              </div>

              {promoApplied && (
                <div className="flex justify-between text-[#788269]">
                  <span>Promotional Discount (10%)</span>
                  <span className="font-mono text-red-700 tabular-nums">
                    -{BRAND_CONFIG.currency.format(discountAmount)}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-[#788269]">
                <span>Estimated Delivery</span>
                <span className="font-mono text-[#303A2B] tabular-nums">
                  {deliveryFee === 0 ? 'FREE' : BRAND_CONFIG.currency.format(deliveryFee)}
                </span>
              </div>

              <div className="pt-3 border-t border-[#D8C8A5]/30 flex justify-between text-base font-bold text-[#303A2B]">
                <span>Estimated Total</span>
                <span className="font-mono text-xl tabular-nums">
                  {BRAND_CONFIG.currency.format(finalTotal)}
                </span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-3.5 rounded-xl bg-[#303A2B] text-[#FBF8F1] text-xs font-bold uppercase tracking-wider hover:bg-[#788269] transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 text-[#D8C8A5]" />
            </button>

            <div className="pt-2 text-center text-xs text-[#788269] flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#303A2B]" />
              <span>Direct confirmation by Blooms by Anya in Sialkot</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
