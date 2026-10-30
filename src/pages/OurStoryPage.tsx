import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, ArrowRight, ShieldCheck, MapPin, Scissors, Flower2, Gift } from 'lucide-react';
import { BRAND_CONFIG } from '../config/brand';
import { SafeImage } from '../components/SafeImage';

export const OurStoryPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FBF8F1] pb-24">
      
      {/* Editorial Hero */}
      <div className="relative bg-[#F7F1E7] border-b border-[#D8C8A5]/40 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#788269]">
            <Sparkles className="w-3.5 h-3.5 text-[#D99B20]" />
            <span>The Artisan Journey · Sialkot, Pakistan</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-[#303A2B] leading-tight text-balance">
            Handcrafted With Love, Created For Your Special Moments.
          </h1>
          <p className="text-sm sm:text-base text-[#788269] max-w-2xl mx-auto font-light leading-relaxed">
            Thoughtfully made. Beautifully gifted. The story of a boutique studio dedicated to the tactile beauty of fresh flora, gourmet hampers, and unforgettable surprises.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-20 sm:space-y-28">
        
        {/* Story Section 1: The Sialkot Studio */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#788269] block">
              Where It Began
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#303A2B] leading-snug">
              Every Stem Has a Soul, Every Ribbon a Purpose
            </h2>
            <p className="text-xs sm:text-sm text-[#303A2B]/85 font-light leading-relaxed">
              Blooms by Anya was born in Sialkot out of a passion for genuine, heartfelt gifting. In an era of hurried commercial presents, we set out to create something slower, warmer, and profoundly personal.
            </p>
            <p className="text-xs sm:text-sm text-[#303A2B]/85 font-light leading-relaxed">
              Each arrangement is assembled by hand on our studio worktables. We fold waterproof papers layer by layer, tie satin ribbons by hand, and transcribe your thoughts onto gold-embossed cards with pen and ink.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs font-semibold text-[#788269]">
              <span className="flex items-center gap-1.5 text-[#303A2B]">
                <MapPin className="w-4 h-4 text-[#788269]" /> {BRAND_CONFIG.location}
              </span>
              <span aria-hidden="true">·</span>
              <span>Bespoke Gifting Studio</span>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden border border-[#D8C8A5]/50 shadow-md aspect-[4/3] bg-[#F7F1E7]">
              <SafeImage
                src={BRAND_CONFIG.assets.studio}
                alt="Blooms by Anya Studio in Sialkot"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Brand Pillars */}
        <section className="bg-white rounded-3xl p-8 sm:p-14 border border-[#D8C8A5]/50 shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#788269] block">
              Our Commitments
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#303A2B]">
              The Four Pillars of Blooms by Anya
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#F7F1E7] border border-[#D8C8A5] flex items-center justify-center text-[#788269]">
                <Flower2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#303A2B]">
                Peak Freshness
              </h3>
              <p className="text-xs text-[#788269] leading-relaxed font-light">
                We select premium imported roses, bright sunflowers, and fresh lilies to ensure long-lasting elegance in your home.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#F7F1E7] border border-[#D8C8A5] flex items-center justify-center text-[#788269]">
                <Scissors className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#303A2B]">
                Handmade Precision
              </h3>
              <p className="text-xs text-[#788269] leading-relaxed font-light">
                No assembly lines. Every bouquet, money arrangement, and chocolate tower is sculpted individually with artisanal dedication.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#F7F1E7] border border-[#D8C8A5] flex items-center justify-center text-[#788269]">
                <Gift className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#303A2B]">
                Bespoke Personalization
              </h3>
              <p className="text-xs text-[#788269] leading-relaxed font-light">
                From custom wrapping colors to handwritten gold-embossed message notes, your gift expresses your exact emotion.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#F7F1E7] border border-[#D8C8A5] flex items-center justify-center text-[#788269]">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#303A2B]">
                Sialkot Community
              </h3>
              <p className="text-xs text-[#788269] leading-relaxed font-light">
                Proudly based in Sialkot, delivering memorable surprises across Cantt, Model Town, Kashmir Road, and beyond.
              </p>
            </div>
          </div>
        </section>

        {/* Call to action */}
        <section className="text-center max-w-xl mx-auto space-y-6">
          <h2 className="font-serif text-3xl font-bold text-[#303A2B]">
            Ready to Celebrate Someone Special?
          </h2>
          <p className="text-xs sm:text-sm text-[#788269] font-light">
            Browse our ready collections or build a personalized gift with our master florists.
          </p>
          <div className="flex justify-center gap-3">
            <Link
              to="/shop"
              className="px-8 py-3 rounded-full bg-[#303A2B] text-[#FBF8F1] text-xs font-semibold uppercase tracking-wider hover:bg-[#788269] transition-colors"
            >
              Explore Boutique
            </Link>
            <Link
              to="/create-your-own-gift"
              className="px-8 py-3 rounded-full border border-[#303A2B] text-[#303A2B] text-xs font-semibold uppercase tracking-wider hover:bg-[#F7F1E7] transition-colors"
            >
              Custom Studio
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
};
