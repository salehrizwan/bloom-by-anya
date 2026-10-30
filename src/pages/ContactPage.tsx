import React, { useState } from 'react';
import { MessageCircle, Instagram, MapPin, Mail, Clock, Truck, ShieldCheck, Send, CheckCircle2 } from 'lucide-react';
import { BRAND_CONFIG } from '../config/brand';
import { useShop } from '../context/ShopContext';

export const ContactPage: React.FC = () => {
  const { showToast, getWhatsAppDirectInquiryUrl } = useShop();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [inquiryType, setInquiryType] = useState('Custom Floral Arrangement');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setSubmitted(true);
    showToast('Your message has been sent to our Sialkot studio!');

    // Prepare message to send via WhatsApp as well
    const waText = `*INQUIRY FROM WEBSITE*\nName: ${name}\nPhone: ${phone}\nTopic: ${inquiryType}\nMessage: "${message}"`;
    const waUrl = getWhatsAppDirectInquiryUrl(waText);

    // Open WhatsApp after brief delay
    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#FBF8F1] pb-24">
      {/* Header */}
      <div className="bg-[#F7F1E7] border-b border-[#D8C8A5]/40 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#788269] block">
            Get In Touch
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#303A2B]">
            Connect With Blooms by Anya
          </h1>
          <p className="text-xs sm:text-sm text-[#788269] max-w-xl mx-auto font-light leading-relaxed">
            Have questions about custom bouquet orders, corporate hampers, or car surprise setups in Sialkot? We would love to assist you.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Contact Details & Delivery Guidelines (Col 5) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D8C8A5]/50 shadow-sm space-y-6">
              <h2 className="font-serif text-xl font-bold text-[#303A2B]">
                Studio & Digital Inquiries
              </h2>

              <div className="space-y-4 text-xs text-[#303A2B]">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#F7F1E7] border border-[#D8C8A5] flex items-center justify-center text-[#788269] shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold block">Location</span>
                    <span className="text-[#788269]">{BRAND_CONFIG.location}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#F7F1E7] border border-[#D8C8A5] flex items-center justify-center text-[#788269] shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold block">WhatsApp Business</span>
                    <a
                      href={`https://wa.me/${BRAND_CONFIG.contact.whatsappNumber.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#788269] hover:text-[#303A2B] underline"
                    >
                      {BRAND_CONFIG.contact.whatsappDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#F7F1E7] border border-[#D8C8A5] flex items-center justify-center text-[#788269] shrink-0">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold block">Instagram Gallery</span>
                    <a
                      href={BRAND_CONFIG.contact.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#788269] hover:text-[#303A2B] underline"
                    >
                      @{BRAND_CONFIG.contact.instagramHandle}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#F7F1E7] border border-[#D8C8A5] flex items-center justify-center text-[#788269] shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold block">Email Concierge</span>
                    <span className="text-[#788269]">{BRAND_CONFIG.contact.email}</span>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp Action */}
              <div className="pt-4 border-t border-[#D8C8A5]/30">
                <a
                  href={getWhatsAppDirectInquiryUrl('Hello Blooms by Anya, I would like to inquire about ordering an arrangement.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-[#25D366] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#1EBE5D] transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Start WhatsApp Chat</span>
                </a>
              </div>
            </div>

            {/* Delivery Terms Card */}
            <div className="bg-[#F7F1E7]/70 rounded-3xl p-6 border border-[#D8C8A5]/50 space-y-4 text-xs">
              <div className="flex items-center gap-2 font-serif text-base font-bold text-[#303A2B]">
                <Truck className="w-4 h-4 text-[#788269]" />
                <span>Delivery Information</span>
              </div>
              <ul className="space-y-2 text-[#788269] list-disc list-inside font-light">
                <li>Local doorstep delivery across Sialkot City, Cantt, Sambrial, and Daska.</li>
                <li>Standard delivery fee: Rs. {BRAND_CONFIG.delivery.standardFee} (Complimentary on orders over Rs. {BRAND_CONFIG.delivery.freeDeliveryThreshold.toLocaleString()}).</li>
                <li>Advance notice of 24 to 48 hours recommended for custom chocolate towers and bespoke gift boxes.</li>
                <li>Car surprise setups arranged on-location in Sialkot with advance booking.</li>
              </ul>
            </div>

          </div>

          {/* Contact Inquiry Form (Col 7) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-[#D8C8A5]/50 shadow-sm">
            <h2 className="font-serif text-2xl font-bold text-[#303A2B] mb-2">
              Send an Inquiry
            </h2>
            <p className="text-xs text-[#788269] mb-8 font-light">
              Fill in your details and we will get back to you promptly with design recommendations and pricing.
            </p>

            {submitted ? (
              <div className="p-8 bg-[#EBF0E6] rounded-2xl border border-[#788269]/40 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[#788269] mx-auto" />
                <h3 className="font-serif text-2xl font-bold text-[#303A2B]">
                  Thank You, {name}!
                </h3>
                <p className="text-xs text-[#788269] max-w-md mx-auto">
                  Your inquiry has been received and opened in WhatsApp for instant artisan confirmation.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-full bg-[#303A2B] text-white text-xs font-semibold"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#303A2B] uppercase tracking-wider mb-1">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="E.g., Sarah Khan"
                      className="w-full px-4 py-2.5 bg-[#FBF8F1] border border-[#D8C8A5] rounded-xl text-xs text-[#303A2B] focus:outline-none focus:ring-1 focus:ring-[#303A2B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#303A2B] uppercase tracking-wider mb-1">
                      WhatsApp Contact Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="E.g., 0300 1234567"
                      className="w-full px-4 py-2.5 bg-[#FBF8F1] border border-[#D8C8A5] rounded-xl text-xs text-[#303A2B] focus:outline-none focus:ring-1 focus:ring-[#303A2B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#303A2B] uppercase tracking-wider mb-1">
                    Occasion / Inquiry Type
                  </label>
                  <select
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#FBF8F1] border border-[#D8C8A5] rounded-xl text-xs text-[#303A2B] focus:outline-none focus:ring-1 focus:ring-[#303A2B]"
                  >
                    <option value="Custom Floral Bouquet">Custom Floral Bouquet</option>
                    <option value="Luxury Gift Hamper">DIY Luxury Hamper / Box</option>
                    <option value="Ferrero Chocolate Tower">Chocolate Tower Arrangement</option>
                    <option value="Birthday / Anniversary Surprise">Birthday / Anniversary Surprise</option>
                    <option value="Sialkot Car Boot Trunk Decor">Sialkot Car Boot Surprise Setup</option>
                    <option value="Corporate / Event Styling">Corporate / Bulk Gifting</option>
                    <option value="General Inquiry">General Question</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#303A2B] uppercase tracking-wider mb-1">
                    Your Message / Idea <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your desired flowers, favorite colors, date, and delivery location in Sialkot..."
                    className="w-full px-4 py-2.5 bg-[#FBF8F1] border border-[#D8C8A5] rounded-xl text-xs text-[#303A2B] focus:outline-none focus:ring-1 focus:ring-[#303A2B]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#303A2B] text-[#FBF8F1] text-xs font-bold uppercase tracking-wider hover:bg-[#788269] transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <Send className="w-4 h-4 text-[#D8C8A5]" />
                  <span>Submit Inquiry to Studio</span>
                </button>
              </form>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};
