import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, MessageCircle, MapPin, Mail, Sparkles, Heart } from 'lucide-react';
import { BRAND_CONFIG } from '../config/brand';
import { SAMPLE_DATA_NOTICE } from '../data/products';
import { SafeImage } from './SafeImage';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#303A2B] text-[#FBF8F1] pt-16 pb-12 border-t border-[#D8C8A5]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Brand Lockup & Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-[#FBF8F1]/15">
          
          {/* Col 1 & 2: Brand Identity & Story */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <SafeImage
                src={BRAND_CONFIG.assets.logo}
                alt="Blooms by Anya"
                className="w-14 h-14 rounded-full object-contain bg-[#FBF8F1] p-0.5 border border-[#D8C8A5]"
              />
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-[#FBF8F1] block">
                  Blooms by Anya
                </span>
                <span className="text-xs uppercase tracking-widest text-[#D8C8A5] font-light">
                  {BRAND_CONFIG.tagline}
                </span>
              </div>
            </Link>

            <p className="text-xs text-[#FBF8F1]/80 leading-relaxed max-w-sm font-light">
              A boutique handmade gifting studio in {BRAND_CONFIG.location}. We artfully craft bespoke flower bouquets, gourmet chocolate hampers, and celebratory arrangements tailored for your most cherished life moments.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={BRAND_CONFIG.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram profile"
                className="w-9 h-9 rounded-full bg-[#FBF8F1]/10 flex items-center justify-center text-[#D8C8A5] hover:bg-[#FBF8F1]/20 hover:text-white transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${BRAND_CONFIG.contact.whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp business chat"
                className="w-9 h-9 rounded-full bg-[#FBF8F1]/10 flex items-center justify-center text-[#D8C8A5] hover:bg-[#FBF8F1]/20 hover:text-white transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Shop Categories */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#D8C8A5] mb-4">
              Floral Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FBF8F1]/80">
              <li>
                <Link to="/shop?cat=bouquets" className="hover:text-[#D8C8A5] transition-colors">
                  Handmade Bouquets
                </Link>
              </li>
              <li>
                <Link to="/shop?cat=bouquets&sub=Red+Rose+Bouquets" className="hover:text-[#D8C8A5] transition-colors">
                  Red Rose Bouquets
                </Link>
              </li>
              <li>
                <Link to="/shop?cat=bouquets&sub=Sunflower+Bouquets" className="hover:text-[#D8C8A5] transition-colors">
                  Sunflower Bouquets
                </Link>
              </li>
              <li>
                <Link to="/shop?cat=bouquets&sub=Chocolate+Bouquets" className="hover:text-[#D8C8A5] transition-colors">
                  Chocolate Bouquets
                </Link>
              </li>
              <li>
                <Link to="/shop?cat=bouquets&sub=Money+Bouquets" className="hover:text-[#D8C8A5] transition-colors">
                  Money Bouquets
                </Link>
              </li>
              <li>
                <Link to="/create-your-own-gift" className="text-[#D99B20] font-medium hover:underline flex items-center gap-1">
                  <span>✦</span> Custom Gift Builder
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Hampers & Occasions */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#D8C8A5] mb-4">
              Gifts & Hampers
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FBF8F1]/80">
              <li>
                <Link to="/shop?cat=hampers" className="hover:text-[#D8C8A5] transition-colors">
                  DIY Luxury Hampers
                </Link>
              </li>
              <li>
                <Link to="/shop?cat=hampers&sub=Chocolate+Hampers" className="hover:text-[#D8C8A5] transition-colors">
                  Chocolate Gift Boxes
                </Link>
              </li>
              <li>
                <Link to="/shop?cat=occasions&sub=Birthday+Gifts" className="hover:text-[#D8C8A5] transition-colors">
                  Birthday Surprises
                </Link>
              </li>
              <li>
                <Link to="/shop?cat=occasions&sub=Anniversary+Gifts" className="hover:text-[#D8C8A5] transition-colors">
                  Anniversary Collections
                </Link>
              </li>
              <li>
                <Link to="/shop?cat=arrangements&sub=Chocolate+Towers" className="hover:text-[#D8C8A5] transition-colors">
                  Ferrero Chocolate Towers
                </Link>
              </li>
              <li>
                <Link to="/shop?cat=arrangements&sub=Car+Surprise+Decorations" className="hover:text-[#D8C8A5] transition-colors">
                  Sialkot Car Boot Styling
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Studio & Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#D8C8A5] mb-4">
              Studio & Service
            </h4>
            <ul className="space-y-3 text-xs text-[#FBF8F1]/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D8C8A5] shrink-0 mt-0.5" />
                <span>{BRAND_CONFIG.location}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MessageCircle className="w-4 h-4 text-[#D8C8A5] shrink-0 mt-0.5" />
                <span>WhatsApp: {BRAND_CONFIG.contact.whatsappDisplay}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#D8C8A5] shrink-0 mt-0.5" />
                <span>{BRAND_CONFIG.contact.email}</span>
              </li>
              <li className="pt-2">
                <Link
                  to="/our-story"
                  className="inline-block px-3 py-1.5 rounded-lg border border-[#D8C8A5]/40 text-[#D8C8A5] hover:bg-[#D8C8A5]/10 text-[11px] uppercase tracking-wider transition-colors"
                >
                  Read Our Story
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Sample Pricing Note */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#FBF8F1]/60">
          <div>
            <p>© {new Date().getFullYear()} Blooms by Anya. All rights reserved.</p>
            <p className="text-[11px] text-[#D8C8A5]/80 mt-1">
              {SAMPLE_DATA_NOTICE}
            </p>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <Link to="/contact" className="hover:text-[#D8C8A5] transition-colors">
              Delivery Terms
            </Link>
            <span aria-hidden="true">·</span>
            <Link to="/account" className="hover:text-[#D8C8A5] transition-colors">
              Track Order
            </Link>
            <span aria-hidden="true">·</span>
            <a
              href={BRAND_CONFIG.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#D8C8A5] transition-colors"
            >
              Instagram @{BRAND_CONFIG.contact.instagramHandle}
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
