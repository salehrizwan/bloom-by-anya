import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, MessageCircle, ArrowRight, ShoppingBag, MapPin, Calendar, Clock, FileCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { BRAND_CONFIG } from '../config/brand';

export const OrderConfirmationPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { getOrderById, getWhatsAppOrderUrl } = useShop();

  const order = orderId ? getOrderById(orderId) : undefined;

  return (
    <div className="min-h-screen bg-[#FBF8F1] pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        
        {/* Receipt Confirmation Card */}
        <div className="bg-white rounded-3xl border border-[#D8C8A5]/50 p-6 sm:p-10 shadow-sm text-center space-y-6">
          
          <div className="w-16 h-16 rounded-full bg-[#EBF0E6] text-[#788269] flex items-center justify-center mx-auto border border-[#788269]/30">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-[#788269] block mb-1">
              Order Request Received
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#303A2B]">
              Thank You for Trusting Blooms by Anya
            </h1>
            <p className="text-xs sm:text-sm text-[#788269] mt-2 font-light max-w-lg mx-auto">
              Your handmade floral order request has been logged under reference{' '}
              <strong className="text-[#303A2B] font-mono font-bold">#{orderId}</strong>.
            </p>
          </div>

          {/* Pending Confirmation Explanatory Card */}
          <div className="p-4 bg-[#F7F1E7] rounded-2xl border border-[#D8C8A5]/60 text-left text-xs text-[#303A2B] space-y-2">
            <div className="flex items-center gap-2 font-semibold text-[#303A2B]">
              <Clock className="w-4 h-4 text-[#788269]" />
              <span>Pending Artisan Confirmation</span>
            </div>
            <p className="text-[11px] text-[#788269] leading-relaxed">
              This order request is currently pending confirmation from our Sialkot studio. Our florists will review blossom availability, arrange delivery time, and contact you directly on WhatsApp ({order?.customerInfo.whatsappNumber || 'your number'}) to confirm fulfillment.
            </p>
          </div>

          {/* Order Details Breakdown if found */}
          {order && (
            <div className="text-left pt-6 border-t border-[#D8C8A5]/30 space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#303A2B]">
                Order Summary #{order.id}
              </h3>

              <div className="bg-[#FBF8F1] rounded-2xl p-4 border border-[#D8C8A5]/30 space-y-3 text-xs">
                <div className="flex justify-between text-[#788269]">
                  <span>Customer:</span>
                  <span className="font-semibold text-[#303A2B]">{order.customerInfo.fullName}</span>
                </div>
                <div className="flex justify-between text-[#788269]">
                  <span>WhatsApp:</span>
                  <span className="font-mono text-[#303A2B]">{order.customerInfo.whatsappNumber}</span>
                </div>
                <div className="flex justify-between text-[#788269]">
                  <span>Delivery Address:</span>
                  <span className="text-[#303A2B] max-w-xs text-right">{order.customerInfo.deliveryAddress}</span>
                </div>
                <div className="flex justify-between text-[#788269]">
                  <span>Preferred Delivery:</span>
                  <span className="text-[#303A2B]">{order.customerInfo.preferredDeliveryDate}</span>
                </div>
              </div>

              {/* Items */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs uppercase font-semibold tracking-wider text-[#788269]">
                  Handcrafted Items:
                </h4>
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between items-center text-xs pb-2 border-b border-[#D8C8A5]/20">
                    <div>
                      <span className="font-semibold text-[#303A2B]">{item.name}</span>
                      <span className="text-[#788269] ml-2 font-mono">x{item.quantity}</span>
                      {item.customDetails && (
                        <p className="text-[10px] text-[#788269] italic">{item.customDetails}</p>
                      )}
                    </div>
                    <span className="font-mono font-bold text-[#303A2B]">
                      {BRAND_CONFIG.currency.format(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex justify-between text-sm font-bold text-[#303A2B]">
                <span>Grand Total:</span>
                <span className="font-mono text-lg">{BRAND_CONFIG.currency.format(order.total)}</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-6 border-t border-[#D8C8A5]/30 flex flex-col sm:flex-row gap-3 justify-center">
            {order && (
              <a
                href={getWhatsAppOrderUrl(order)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-[#25D366] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#1EBE5D] transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat About This Order on WhatsApp</span>
              </a>
            )}

            <Link
              to="/account"
              className="px-6 py-3 rounded-full border border-[#303A2B] text-[#303A2B] text-xs font-semibold uppercase tracking-wider hover:bg-[#F7F1E7] transition-colors flex items-center justify-center gap-1.5"
            >
              <FileCheck className="w-4 h-4" />
              <span>View Order In My Account</span>
            </Link>

            <Link
              to="/shop"
              className="px-6 py-3 rounded-full bg-[#303A2B] text-[#FBF8F1] text-xs font-semibold uppercase tracking-wider hover:bg-[#788269] transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Back to Boutique</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
};
