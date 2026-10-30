import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Package, Heart, Search, CheckCircle2, Clock, Truck, ShieldCheck, MapPin, Phone, MessageCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { BRAND_CONFIG } from '../config/brand';

export const AccountPage: React.FC = () => {
  const { orders, wishlist } = useShop();

  const [searchOrderId, setSearchOrderId] = useState('');
  const [searchedOrderResult, setSearchedOrderResult] = useState<any>(null);
  const [searchAttempted, setSearchAttempted] = useState(false);

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchOrderId.trim()) return;

    setSearchAttempted(true);
    const cleaned = searchOrderId.trim().toUpperCase().replace('#', '');
    const found = orders.find(o => o.id.toUpperCase() === cleaned || o.id.toUpperCase() === `BBA-${cleaned}`);
    setSearchedOrderResult(found || null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Received':
        return <span className="text-[#303A2B] bg-[#F7F1E7] border border-[#D8C8A5] px-2.5 py-1 rounded-md text-[11px] font-medium">Request Logged</span>;
      case 'In Preparation':
        return <span className="text-[#D99B20] bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-md text-[11px] font-medium">In Preparation</span>;
      case 'Dispatched':
        return <span className="text-[#788269] bg-[#EBF0E6] border border-[#788269]/40 px-2.5 py-1 rounded-md text-[11px] font-medium">Dispatched</span>;
      case 'Delivered':
        return <span className="text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md text-[11px] font-medium">Delivered</span>;
      default:
        return <span className="text-[#788269] text-[11px]">{status}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF8F1] pb-24">
      {/* Header */}
      <div className="bg-[#F7F1E7] border-b border-[#D8C8A5]/40 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-[#788269] block">
              Customer Portal
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#303A2B] mt-1">
              My Orders & Profile
            </h1>
            <p className="text-xs text-[#788269] mt-1">
              Track real-time requests and view past floral arrangements.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/wishlist"
              className="px-4 py-2 bg-white border border-[#D8C8A5] text-[#303A2B] rounded-xl text-xs font-semibold hover:bg-[#F7F1E7] transition-colors flex items-center gap-1.5"
            >
              <Heart className="w-3.5 h-3.5 text-[#DDA9AC]" />
              <span>Wishlist ({wishlist.length})</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Architecture Note */}
        <div className="p-3 bg-[#EBF0E6] rounded-xl border border-[#788269]/30 text-xs text-[#303A2B] mb-8 font-light flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#788269] shrink-0" />
          <span>Local session storage active. Account is configured ready for future backend authentication.</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Track by Reference (Col 4) */}
          <div className="lg:col-span-4 bg-white rounded-3xl border border-[#D8C8A5]/50 p-6 shadow-sm space-y-6">
            <div>
              <h2 className="font-serif text-lg font-bold text-[#303A2B]">
                Track Your Floral Order
              </h2>
              <p className="text-xs text-[#788269] mt-1">
                Enter your order reference code (e.g. BBA-8924) to inspect preparation status.
              </p>
            </div>

            <form onSubmit={handleTrackOrder} className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#788269]" />
                <input
                  type="text"
                  value={searchOrderId}
                  onChange={(e) => setSearchOrderId(e.target.value)}
                  placeholder="Order ID (e.g. BBA-1042)"
                  className="w-full pl-9 pr-3 py-2 bg-[#FBF8F1] border border-[#D8C8A5] rounded-xl text-xs text-[#303A2B] uppercase focus:outline-none focus:ring-1 focus:ring-[#303A2B]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#303A2B] text-[#FBF8F1] text-xs font-semibold hover:bg-[#788269] transition-colors"
              >
                Track Status
              </button>
            </form>

            {/* Tracking Result Modal / Box */}
            {searchAttempted && (
              <div className="pt-4 border-t border-[#D8C8A5]/30">
                {searchedOrderResult ? (
                  <div className="bg-[#F7F1E7]/70 rounded-2xl p-4 border border-[#D8C8A5]/50 space-y-3 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-mono font-bold text-[#303A2B]">#{searchedOrderResult.id}</span>
                      {getStatusBadge(searchedOrderResult.status)}
                    </div>
                    <p className="text-[#788269]">
                      Recipient: <strong className="text-[#303A2B]">{searchedOrderResult.customerInfo.fullName}</strong>
                    </p>
                    <p className="text-[#788269]">
                      Address: <span className="text-[#303A2B]">{searchedOrderResult.customerInfo.deliveryAddress}</span>
                    </p>
                    <p className="text-[#788269]">
                      Date: <span className="text-[#303A2B]">{searchedOrderResult.customerInfo.preferredDeliveryDate}</span>
                    </p>
                    <div className="pt-2 border-t border-[#D8C8A5]/30 flex justify-between font-bold text-[#303A2B]">
                      <span>Total</span>
                      <span className="font-mono">{BRAND_CONFIG.currency.format(searchedOrderResult.total)}</span>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-red-50 text-red-700 rounded-xl text-xs border border-red-200">
                    No order found with reference "{searchOrderId}". Please verify the code or contact our studio on WhatsApp.
                  </div>
                )}
              </div>
            )}

            {/* Direct WhatsApp Concierge */}
            <div className="pt-4 border-t border-[#D8C8A5]/30 space-y-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#788269] block">
                Direct Floral Concierge
              </span>
              <p className="text-xs text-[#303A2B]/80 font-light leading-relaxed">
                Need urgent status update or change of delivery address in Sialkot? Chat directly with Anya.
              </p>
              <a
                href={`https://wa.me/${BRAND_CONFIG.contact.whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl border border-[#788269] text-[#303A2B] text-xs font-semibold hover:bg-[#EBF0E6] transition-colors flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#303A2B]" />
                <span>Message on WhatsApp</span>
              </a>
            </div>

          </div>

          {/* Right Column: Order History (Col 8) */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-[#D8C8A5]/50 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#D8C8A5]/30">
              <h2 className="font-serif text-xl font-bold text-[#303A2B]">
                Recent Orders ({orders.length})
              </h2>
              <span className="text-xs text-[#788269]">Saved in local session</span>
            </div>

            {orders.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <Package className="w-10 h-10 text-[#788269] mx-auto opacity-60" />
                <h3 className="font-serif text-lg font-semibold text-[#303A2B]">
                  No orders placed yet
                </h3>
                <p className="text-xs text-[#788269] max-w-sm mx-auto font-light">
                  Your submitted order reservations and custom gifts will appear here with live preparation tracking.
                </p>
                <Link
                  to="/shop"
                  className="inline-block mt-2 px-6 py-2.5 rounded-full bg-[#303A2B] text-[#FBF8F1] text-xs font-semibold uppercase tracking-wider hover:bg-[#788269] transition-colors"
                >
                  Browse Catalog
                </Link>
              </div>
            ) : (
              <div className="space-y-6 divide-y divide-[#D8C8A5]/30">
                {orders.map((o) => (
                  <div key={o.id} className="pt-6 first:pt-0 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-base text-[#303A2B]">
                            #{o.id}
                          </span>
                          {getStatusBadge(o.status)}
                        </div>
                        <span className="text-[11px] text-[#788269]">
                          Ordered on {new Date(o.orderDate).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="text-left sm:text-right">
                        <span className="font-mono font-bold text-base text-[#303A2B] tabular-nums">
                          {BRAND_CONFIG.currency.format(o.total)}
                        </span>
                        <span className="block text-[11px] text-[#788269]">
                          {o.checkoutMethod === 'whatsapp' ? 'Ordered via WhatsApp' : 'Website Reservation'}
                        </span>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="bg-[#FBF8F1] rounded-2xl p-4 border border-[#D8C8A5]/30 space-y-2 text-xs">
                      {o.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center">
                          <span className="text-[#303A2B]">
                            {item.name} <span className="font-mono text-[#788269]">x{item.quantity}</span>
                          </span>
                          <span className="font-mono font-medium text-[#303A2B]">
                            {BRAND_CONFIG.currency.format(item.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="text-xs text-[#788269] flex flex-wrap gap-4 pt-1">
                      <span>Delivery: <strong>{o.customerInfo.city}</strong></span>
                      <span>Date: <strong>{o.customerInfo.preferredDeliveryDate}</strong></span>
                      {o.customerInfo.giftMessage && (
                        <span className="italic">Card: "{o.customerInfo.giftMessage}"</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
