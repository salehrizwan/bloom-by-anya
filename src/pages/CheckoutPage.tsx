import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, MessageCircle, ArrowRight, CheckCircle2, Calendar, MapPin, Phone, User, Mail, FileText, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useShop } from '../context/ShopContext';
import { BRAND_CONFIG } from '../config/brand';
import { SAMPLE_DATA_NOTICE } from '../data/products';
import { Order } from '../types';
import { SafeImage } from '../components/SafeImage';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    cart,
    cartSubtotal,
    deliveryFee,
    cartTotal,
    createOrder,
    getWhatsAppOrderUrl,
  } = useShop();

  // Form states
  const [fullName, setFullName] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [email, setEmail] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [city, setCity] = useState('Sialkot');
  const [area, setArea] = useState('Sialkot Cantt');
  const [postalCode, setPostalCode] = useState('');
  const [preferredDeliveryDate, setPreferredDeliveryDate] = useState(() => {
    // Tomorrow default date
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [giftMessage, setGiftMessage] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [paymentPreference, setPaymentPreference] = useState<'cod' | 'bank_transfer'>('cod');
  const [errorMsg, setErrorMsg] = useState('');

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
        <h2 className="font-serif text-3xl font-bold text-[#303A2B]">No Items To Checkout</h2>
        <p className="text-xs text-[#788269] mt-2 mb-6">
          Your shopping bag is currently empty.
        </p>
        <Link
          to="/shop"
          className="px-6 py-2.5 rounded-full bg-[#303A2B] text-[#FBF8F1] text-xs font-semibold uppercase tracking-wider"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const validateForm = () => {
    if (!fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return false;
    }
    if (!whatsappNumber.trim() || whatsappNumber.trim().length < 8) {
      setErrorMsg('Please enter a valid WhatsApp contact number.');
      return false;
    }
    if (!deliveryAddress.trim()) {
      setErrorMsg('Please provide a complete delivery address.');
      return false;
    }
    setErrorMsg('');
    return true;
  };

  const buildOrderPayload = (checkoutMethod: 'website' | 'whatsapp') => {
    const fullDeliveryAddr = `${deliveryAddress}, ${area}, ${city}${postalCode ? ` (Postal: ${postalCode})` : ''}`;

    return {
      items: cart.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        customDetails: [
          item.selectedColor ? `Wrap: ${item.selectedColor}` : null,
          item.selectedSize ? `Size: ${item.selectedSize}` : null,
          item.customCardMessage ? `Card: "${item.customCardMessage}"` : null,
          item.recipientName ? `For: ${item.recipientName}` : null,
          item.customGiftDetails ? item.customGiftDetails : null,
        ]
          .filter(Boolean)
          .join(' | '),
      })),
      subtotal: cartSubtotal,
      deliveryFee,
      total: cartTotal,
      customerInfo: {
        fullName,
        whatsappNumber,
        email: email || undefined,
        deliveryAddress: fullDeliveryAddr,
        city,
        postalCode: postalCode || undefined,
        preferredDeliveryDate,
        giftMessage: giftMessage || undefined,
        additionalNotes: additionalNotes || undefined,
      },
      checkoutMethod,
    };
  };

  // Option 1: Website Checkout
  const handleWebsiteCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = buildOrderPayload('website');
    const newOrder = createOrder(payload);

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#D8C8A5', '#788269', '#DDA9AC', '#D99B20'],
      });
    } catch {}

    navigate(`/order-confirmation/${newOrder.id}`);
  };

  // Option 2: WhatsApp Checkout
  const handleWhatsAppCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = buildOrderPayload('whatsapp');
    const newOrder = createOrder(payload);

    try {
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.6 },
      });
    } catch {}

    const waUrl = getWhatsAppOrderUrl(newOrder);
    window.open(waUrl, '_blank');
    navigate(`/order-confirmation/${newOrder.id}`);
  };

  return (
    <div className="min-h-screen bg-[#FBF8F1] pb-24">
      
      {/* Header */}
      <div className="bg-[#F7F1E7] border-b border-[#D8C8A5]/40 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#788269] block mb-1">
            Secure Gifting Checkout
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#303A2B]">
            Complete Your Gifting Order
          </h1>
          <p className="text-xs text-[#788269] mt-1 font-light">
            Handcrafted with love in {BRAND_CONFIG.location}.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Notice on Sample & Payment Transparency */}
        <div className="p-4 bg-[#EBF0E6] rounded-2xl border border-[#788269]/30 text-xs text-[#303A2B] mb-8 font-light space-y-1">
          <div className="flex items-center gap-2 font-semibold text-[#303A2B]">
            <ShieldCheck className="w-4 h-4 text-[#788269]" />
            <span>Artisan Confirmation Policy & Payment Transparency</span>
          </div>
          <p className="text-[11px] text-[#788269] leading-relaxed">
            All orders placed on our website are formal reservation requests. No automated payment is charged online; you will pay via <strong>Cash on Delivery (COD)</strong> or direct <strong>Bank Transfer</strong> upon direct confirmation with Blooms by Anya.
          </p>
        </div>

        {errorMsg && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-xs mb-6 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Checkout Form (Col 7) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#D8C8A5]/50 p-6 sm:p-8 shadow-sm space-y-8">
            
            {/* Section 1: Customer Contact */}
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#788269] mb-4">
                <User className="w-4 h-4 text-[#303A2B]" />
                <span>1. Customer & Recipient Information</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#303A2B] uppercase tracking-wider mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="E.g., Fatima Tariq"
                    className="w-full px-4 py-2.5 bg-[#FBF8F1] border border-[#D8C8A5] rounded-xl text-xs text-[#303A2B] focus:outline-none focus:ring-1 focus:ring-[#303A2B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#303A2B] uppercase tracking-wider mb-1">
                    WhatsApp Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    placeholder="E.g., 0300 1234567 or +92..."
                    className="w-full px-4 py-2.5 bg-[#FBF8F1] border border-[#D8C8A5] rounded-xl text-xs text-[#303A2B] focus:outline-none focus:ring-1 focus:ring-[#303A2B]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#303A2B] uppercase tracking-wider mb-1">
                    Email Address (Optional for digital invoice)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E.g., fatima@example.com"
                    className="w-full px-4 py-2.5 bg-[#FBF8F1] border border-[#D8C8A5] rounded-xl text-xs text-[#303A2B] focus:outline-none focus:ring-1 focus:ring-[#303A2B]"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Delivery Details */}
            <div className="pt-6 border-t border-[#D8C8A5]/30">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#788269] mb-4">
                <MapPin className="w-4 h-4 text-[#303A2B]" />
                <span>2. Delivery Address in Sialkot</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#303A2B] uppercase tracking-wider mb-1">
                    City
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#FBF8F1] border border-[#D8C8A5] rounded-xl text-xs text-[#303A2B] focus:outline-none focus:ring-1 focus:ring-[#303A2B]"
                  >
                    <option value="Sialkot">Sialkot City</option>
                    <option value="Sambrial">Sambrial</option>
                    <option value="Daska">Daska</option>
                    <option value="Ugoki">Ugoki</option>
                    <option value="Other">Other (Outside Sialkot)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#303A2B] uppercase tracking-wider mb-1">
                    Area / Locality
                  </label>
                  <select
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#FBF8F1] border border-[#D8C8A5] rounded-xl text-xs text-[#303A2B] focus:outline-none focus:ring-1 focus:ring-[#303A2B]"
                  >
                    <option value="Sialkot Cantt">Sialkot Cantt</option>
                    <option value="Model Town">Model Town</option>
                    <option value="Kashmir Road">Kashmir Road</option>
                    <option value="Paris Road">Paris Road</option>
                    <option value="Defence Road">Defence Road</option>
                    <option value="Shahabpura">Shahabpura</option>
                    <option value="Commissioner Road">Commissioner Road</option>
                    <option value="Other Location">Other Residential / Commercial Area</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#303A2B] uppercase tracking-wider mb-1">
                    Complete Street Address / House / Landmark <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="House/Plot number, street name, nearest landmark..."
                    className="w-full px-4 py-2.5 bg-[#FBF8F1] border border-[#D8C8A5] rounded-xl text-xs text-[#303A2B] focus:outline-none focus:ring-1 focus:ring-[#303A2B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#303A2B] uppercase tracking-wider mb-1">
                    Preferred Delivery Date
                  </label>
                  <input
                    type="date"
                    value={preferredDeliveryDate}
                    onChange={(e) => setPreferredDeliveryDate(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#FBF8F1] border border-[#D8C8A5] rounded-xl text-xs text-[#303A2B] focus:outline-none focus:ring-1 focus:ring-[#303A2B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#303A2B] uppercase tracking-wider mb-1">
                    Postal Code (Optional)
                  </label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="E.g., 51310"
                    className="w-full px-4 py-2.5 bg-[#FBF8F1] border border-[#D8C8A5] rounded-xl text-xs text-[#303A2B] focus:outline-none focus:ring-1 focus:ring-[#303A2B]"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Personalization & Special Instructions */}
            <div className="pt-6 border-t border-[#D8C8A5]/30">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#788269] mb-4">
                <FileText className="w-4 h-4 text-[#303A2B]" />
                <span>3. Gift Message & Special Instructions</span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#303A2B] uppercase tracking-wider mb-1">
                    Handwritten Gold-Embossed Card Message
                  </label>
                  <textarea
                    rows={3}
                    value={giftMessage}
                    onChange={(e) => setGiftMessage(e.target.value)}
                    placeholder="Words of celebration, love, or warm wishes..."
                    className="w-full px-4 py-2.5 bg-[#FBF8F1] border border-[#D8C8A5] rounded-xl text-xs text-[#303A2B] focus:outline-none focus:ring-1 focus:ring-[#303A2B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#303A2B] uppercase tracking-wider mb-1">
                    Additional Styling or Surprise Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    placeholder="E.g., Please ring doorbell quietly, do not include price invoice in package"
                    className="w-full px-4 py-2.5 bg-[#FBF8F1] border border-[#D8C8A5] rounded-xl text-xs text-[#303A2B] focus:outline-none focus:ring-1 focus:ring-[#303A2B]"
                  />
                </div>
              </div>
            </div>

            {/* Section 4: Payment Preference */}
            <div className="pt-6 border-t border-[#D8C8A5]/30">
              <label className="block text-xs font-semibold text-[#303A2B] uppercase tracking-wider mb-3">
                Payment Method (Configurable)
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  onClick={() => setPaymentPreference('cod')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentPreference === 'cod'
                      ? 'border-[#303A2B] bg-[#F7F1E7]/50 ring-1 ring-[#303A2B]'
                      : 'border-[#D8C8A5]/60 bg-[#FBF8F1]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-xs text-[#303A2B]">
                      Cash on Delivery (COD)
                    </span>
                    <span className="text-[10px] text-[#788269] uppercase font-mono">Sialkot</span>
                  </div>
                  <p className="text-[11px] text-[#788269] leading-relaxed">
                    Pay securely upon doorstep receipt of your handmade arrangement.
                  </p>
                </div>

                <div
                  onClick={() => setPaymentPreference('bank_transfer')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentPreference === 'bank_transfer'
                      ? 'border-[#303A2B] bg-[#F7F1E7]/50 ring-1 ring-[#303A2B]'
                      : 'border-[#D8C8A5]/60 bg-[#FBF8F1]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-xs text-[#303A2B]">
                      Direct Bank Transfer / Raast
                    </span>
                    <span className="text-[10px] text-[#788269] uppercase font-mono">Advance</span>
                  </div>
                  <p className="text-[11px] text-[#788269] leading-relaxed">
                    Account details shared via WhatsApp upon confirmation.
                  </p>
                </div>
              </div>
            </div>

            {/* Submission Actions: Option 1 & Option 2 per prompt */}
            <div className="pt-6 border-t border-[#D8C8A5]/30 space-y-4">
              <div className="text-xs font-semibold text-[#303A2B] uppercase tracking-wider">
                Select Checkout Option:
              </div>

              {/* Option 1: Website Checkout */}
              <div className="p-4 rounded-2xl border border-[#D8C8A5] bg-[#F7F1E7]/40 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xs font-bold uppercase text-[#303A2B]">
                      Option 1: Website Checkout
                    </h3>
                    <p className="text-[11px] text-[#788269]">
                      Submit directly online. Generates a formal reference number (#BBA-XXXX) and saves to your account.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleWebsiteCheckout}
                  className="w-full py-3 rounded-xl bg-[#303A2B] text-[#FBF8F1] text-xs font-bold uppercase tracking-wider hover:bg-[#788269] transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <span>Submit Order on Website</span>
                  <ArrowRight className="w-4 h-4 text-[#D8C8A5]" />
                </button>
              </div>

              {/* Option 2: WhatsApp Checkout */}
              <div className="p-4 rounded-2xl border border-[#788269]/40 bg-[#EBF0E6]/50 space-y-3">
                <div>
                  <h3 className="text-xs font-bold uppercase text-[#303A2B]">
                    Option 2: WhatsApp Checkout
                  </h3>
                  <p className="text-[11px] text-[#788269]">
                    Opens WhatsApp with your prepared items, delivery address, custom notes, and total formatted automatically.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleWhatsAppCheckout}
                  className="w-full py-3 rounded-xl bg-[#25D366] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#1EBE5D] transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Order to WhatsApp ({BRAND_CONFIG.contact.whatsappDisplay})</span>
                </button>
              </div>
            </div>

          </div>

          {/* Right Summary (Col 5) */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-[#D8C8A5]/50 p-6 sm:p-7 shadow-sm sticky top-28 space-y-5">
            <h2 className="font-serif text-xl font-bold text-[#303A2B] pb-3 border-b border-[#D8C8A5]/30">
              Items in Order ({cart.length})
            </h2>

            <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1 divide-y divide-[#D8C8A5]/20">
              {cart.map((item) => (
                <div key={item.id} className="pt-3 first:pt-0 flex gap-3">
                  <SafeImage
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover border border-[#D8C8A5]/40 shrink-0"
                  />
                  <div className="flex-1 min-w-0 text-xs">
                    <h3 className="font-semibold text-[#303A2B] truncate">{item.name}</h3>
                    <p className="text-[11px] text-[#788269]">
                      Qty: {item.quantity} · {BRAND_CONFIG.currency.format(item.price)} each
                    </p>
                    {item.selectedColor && (
                      <p className="text-[10px] text-[#788269]">Style: {item.selectedColor}</p>
                    )}
                  </div>
                  <span className="font-mono text-xs font-bold text-[#303A2B] tabular-nums">
                    {BRAND_CONFIG.currency.format(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-2 text-xs border-t border-[#D8C8A5]/30 pt-4">
              <div className="flex justify-between text-[#788269]">
                <span>Subtotal</span>
                <span className="font-mono text-[#303A2B] tabular-nums">
                  {BRAND_CONFIG.currency.format(cartSubtotal)}
                </span>
              </div>
              <div className="flex justify-between text-[#788269]">
                <span>Sialkot Delivery</span>
                <span className="font-mono text-[#303A2B] tabular-nums">
                  {deliveryFee === 0 ? 'FREE' : BRAND_CONFIG.currency.format(deliveryFee)}
                </span>
              </div>
              <div className="pt-2 border-t border-[#D8C8A5]/30 flex justify-between text-base font-bold text-[#303A2B]">
                <span>Grand Total</span>
                <span className="font-mono text-xl tabular-nums">
                  {BRAND_CONFIG.currency.format(cartTotal)}
                </span>
              </div>
            </div>

            <div className="p-3 bg-[#F7F1E7] rounded-xl text-[11px] text-[#788269] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#303A2B] shrink-0" />
              <span>Official Blooms by Anya artisan confirmation dispatched via WhatsApp</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
