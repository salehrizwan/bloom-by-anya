import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Heart, ShieldCheck, Truck, Clock, Instagram, Send, Star } from 'lucide-react';
import { BRAND_CONFIG } from '../config/brand';
import { PRODUCTS, SAMPLE_DATA_NOTICE } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { useShop } from '../context/ShopContext';
import { SafeImage } from '../components/SafeImage';

export const HomePage: React.FC = () => {
  const { showToast } = useShop();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const bestsellers = PRODUCTS.filter(p => p.badge === 'Bestseller' || p.rating >= 4.9).slice(0, 4);

  const collections = [
    {
      title: 'Handmade Bouquets',
      description: 'Artfully folded fresh roses, sunflowers, and baby’s breath in luxury waterproof paper.',
      image: BRAND_CONFIG.assets.roseBouquet,
      link: '/shop?cat=bouquets',
    },
    {
      title: 'Chocolate Bouquets',
      description: 'Rich Ferrero Rocher & Cadbury treats paired with fresh roses on gold floral stems.',
      image: BRAND_CONFIG.assets.chocolateHamper,
      link: '/shop?cat=bouquets&sub=Chocolate+Bouquets',
    },
    {
      title: 'Luxury Hampers',
      description: 'Curated wicker gift baskets and velvet boxes packed with artisan goodies.',
      image: BRAND_CONFIG.assets.chocolateHamper,
      link: '/shop?cat=hampers',
    },
    {
      title: 'Birthday Surprises',
      description: 'Bespoke celebratory bloom boxes, balloon combos, and personalized cards.',
      image: BRAND_CONFIG.assets.hero,
      link: '/shop?cat=occasions&sub=Birthday+Gifts',
    },
    {
      title: 'Customized Gifts',
      description: 'Design your own signature arrangement step-by-step in our online studio.',
      image: BRAND_CONFIG.assets.studio,
      link: '/create-your-own-gift',
    },
    {
      title: 'Special Arrangements',
      description: 'Chocolate towers, teddy cuddles, and on-location car surprise trunk decor in Sialkot.',
      image: BRAND_CONFIG.assets.sunflowerBouquet,
      link: '/shop?cat=arrangements',
    },
  ];

  // Sample Instagram posts
  const instagramPosts = [
    { image: BRAND_CONFIG.assets.roseBouquet, title: 'Velvet Scarlet Rose Bouquet in Sage Wrap' },
    { image: BRAND_CONFIG.assets.sunflowerBouquet, title: 'Golden Radiance Sunflowers for a graduation' },
    { image: BRAND_CONFIG.assets.chocolateHamper, title: 'Bespoke Wicker Basket Hamper with Belgian chocolates' },
    { image: BRAND_CONFIG.assets.hero, title: 'Fresh morning arrangement at the Sialkot studio' },
    { image: BRAND_CONFIG.assets.studio, title: 'Behind the scenes: ribbon folding and gold wax sealing' },
  ];

  // Sample testimonials (transparently marked as sample reviews per prompt)
  const sampleTestimonials = [
    {
      quote: "The velvet rose bouquet was breathtaking! The handwritten gold card made my mother’s birthday so special here in Sialkot.",
      author: "Ayesha Malik",
      occasion: "Birthday Gift · Sialkot Cantt",
      rating: 5,
    },
    {
      quote: "Ordered a custom Ferrero chocolate bouquet for our anniversary. The presentation was genuinely international luxury grade.",
      author: "Bilal & Hina",
      occasion: "1st Anniversary Surprise",
      rating: 5,
    },
    {
      quote: "The sunflower and lily bouquet was so vibrant and fresh. Handcrafted with authentic love and delivered right on time.",
      author: "Zainab R.",
      occasion: "Graduation Keepsake",
      rating: 5,
    },
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubmitted(true);
      showToast('Thank you for subscribing to Blooms by Anya!');
      setNewsletterEmail('');
    }
  };

  return (
    <div className="space-y-20 sm:space-y-28 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[580px] lg:min-h-[640px] flex items-center justify-center overflow-hidden bg-[#F7F1E7]">
        {/* Large Lifestyle Photo Backdrop with soft contrast scrim */}
        <div className="absolute inset-0">
          <SafeImage
            src={BRAND_CONFIG.assets.hero}
            alt="Handmade luxury bouquets and gift hampers at Blooms by Anya"
            className="w-full h-full object-cover object-center scale-102 transition-transform duration-1000 ease-out"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#303A2B]/85 via-[#303A2B]/65 to-[#303A2B]/40 lg:from-[#303A2B]/90 lg:via-[#303A2B]/60 lg:to-transparent" />
        </div>

        {/* Hero Editorial Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-2xl text-left space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FBF8F1]/15 backdrop-blur-md border border-[#D8C8A5]/40 text-[#D8C8A5] text-xs font-medium tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#D99B20]" />
              <span>Luxury Handmade Floral Boutique · Sialkot</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#FBF8F1] leading-[1.08] tracking-tight text-balance">
              Make Every Moment Bloom.
            </h1>

            <p className="text-base sm:text-lg text-[#FBF8F1]/90 font-light leading-relaxed max-w-xl">
              Beautifully handcrafted bouquets and thoughtfully curated hampers, designed to make every celebration unforgettable.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                to="/shop"
                className="px-8 py-3.5 rounded-full bg-[#D8C8A5] text-[#303A2B] text-xs font-bold uppercase tracking-wider hover:bg-[#FBF8F1] transition-all duration-300 shadow-lg text-center flex items-center justify-center gap-2 group"
              >
                <span>Explore Collections</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/create-your-own-gift"
                className="px-8 py-3.5 rounded-full bg-[#FBF8F1]/10 backdrop-blur-md border border-[#FBF8F1]/40 text-[#FBF8F1] text-xs font-semibold uppercase tracking-wider hover:bg-[#FBF8F1]/20 transition-all duration-300 text-center"
              >
                Create Your Own Gift
              </Link>
            </div>

            {/* Quiet trust markers */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-[#FBF8F1]/80 font-light">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#D8C8A5]" />
                <span>100% Handcrafted In Studio</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#D8C8A5]" />
                <span>Careful Doorstep Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#D8C8A5]" />
                <span>Custom Orders Welcomed</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. BRAND INTRODUCTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#788269] block">
          Artisanal Philosophy
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#303A2B]">
          More Than a Gift. A Beautiful Memory.
        </h2>
        <p className="text-sm sm:text-base text-[#788269] font-light leading-relaxed max-w-2xl mx-auto">
          At Blooms by Anya, we believe a gift is a tactile expression of love, gratitude, and wonder. From delicate velvet ribbons to fragrant imported blossoms and hand-folded wrappers, every element is assembled by hand in our Sialkot studio with thoughtful intentionality.
        </p>
      </section>

      {/* 3. FEATURED COLLECTIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#788269] block">
              Curated Catalog
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#303A2B] mt-1">
              Featured Collections
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-xs font-semibold text-[#303A2B] hover:text-[#788269] uppercase tracking-wider flex items-center gap-1.5 transition-colors"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {collections.map((col, idx) => (
            <div
              key={idx}
              className="group relative rounded-3xl overflow-hidden border border-[#D8C8A5]/40 bg-white flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="aspect-[4/3] overflow-hidden bg-[#F7F1E7]">
                <SafeImage
                  src={col.image}
                  alt={col.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                  loading="lazy"
                />
              </div>

              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#303A2B] group-hover:text-[#788269] transition-colors">
                    {col.title}
                  </h3>
                  <p className="text-xs text-[#788269] mt-2 leading-relaxed font-light">
                    {col.description}
                  </p>
                </div>
                
                <div className="mt-5 pt-4 border-t border-[#D8C8A5]/30">
                  <Link
                    to={col.link}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#303A2B] hover:text-[#788269] transition-colors"
                  >
                    <span>Explore Collection</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. BESTSELLING PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#788269] block">
              Customer Favorites
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#303A2B] mt-1">
              Bestselling Creations
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-xs font-semibold text-[#303A2B] hover:text-[#788269] uppercase tracking-wider flex items-center gap-1.5 transition-colors"
          >
            <span>View Full Shop</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellers.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* 5. CUSTOM GIFTING SPOTLIGHT ("Your Imagination, Our Handmade Magic") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#303A2B] to-[#1F261C] text-[#FBF8F1] border border-[#D8C8A5]/30 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#D8C8A5]">
                <Sparkles className="w-4 h-4 text-[#D99B20]" />
                <span>Signature Bespoke Service</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#FBF8F1] leading-tight">
                Your Imagination, Our Handmade Magic.
              </h2>

              <p className="text-sm sm:text-base text-[#FBF8F1]/85 font-light leading-relaxed max-w-xl">
                Can’t find the exact combination you envisioned? Hand-pick your base, choose your favorite roses or sunflowers, select Belgian chocolates, add fluffy bears and personalized calligraphy cards in our interactive 6-step builder.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  to="/create-your-own-gift"
                  className="px-8 py-3.5 rounded-full bg-[#D8C8A5] text-[#303A2B] text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors duration-200 shadow-md flex items-center gap-2"
                >
                  <span>Build Your Own Gift</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/shop?cat=hampers"
                  className="px-6 py-3.5 rounded-full border border-[#D8C8A5]/40 text-[#FBF8F1] text-xs font-semibold uppercase tracking-wider hover:bg-white/10 transition-colors"
                >
                  Browse Pre-curated Hampers
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-12">
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-[#D8C8A5]/30 shadow-2xl">
                <SafeImage
                  src={BRAND_CONFIG.assets.studio}
                  alt="Crafting bespoke floral gifts in Sialkot"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-6">
                  <p className="text-xs text-[#D8C8A5] italic font-serif">
                    "Every petal hand-selected, every bow hand-tied with passion."
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. INSTAGRAM GALLERY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <div className="flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#788269]">
            <Instagram className="w-4 h-4" />
            <span>@{BRAND_CONFIG.contact.instagramHandle}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#303A2B]">
            Follow Our Floral Journey
          </h2>
          <p className="text-xs sm:text-sm text-[#788269] font-light">
            Real snapshots from our handmade studio in Sialkot, Pakistan.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {instagramPosts.map((post, idx) => (
            <a
              key={idx}
              href={BRAND_CONFIG.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-[#F7F1E7] border border-[#D8C8A5]/40 shadow-xs block"
            >
              <SafeImage
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#303A2B]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 text-center text-white">
                <Instagram className="w-6 h-6 text-[#D8C8A5] mb-2" />
                <span className="text-[11px] font-medium line-clamp-2">
                  {post.title}
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* 7. CUSTOMER TESTIMONIALS (Transparently Sample Content per prompt) */}
      <section className="bg-[#F7F1E7]/70 py-16 border-y border-[#D8C8A5]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#788269] block">
              Gifting Experiences
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#303A2B]">
              Words of Delight
            </h2>
            <p className="text-[11px] text-[#788269] italic">
              *Sample reviews for demonstration until official client reviews are collected.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sampleTestimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-[#D8C8A5]/40 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex gap-1 text-[#D99B20] mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-[#303A2B] font-light leading-relaxed italic font-serif">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-3 border-t border-[#D8C8A5]/30">
                  <div className="font-semibold text-xs text-[#303A2B]">{t.author}</div>
                  <div className="text-[11px] text-[#788269]">{t.occasion}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. NEWSLETTER ("Stay in Bloom") */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#D8C8A5]/50 shadow-sm space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#788269] block">
            The Anya Journal
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#303A2B]">
            Stay in Bloom.
          </h2>
          <p className="text-xs sm:text-sm text-[#788269] font-light max-w-md mx-auto">
            Receive seasonal bouquet inspiration, festive hamper launches, and special gifting ideas in Sialkot.
          </p>

          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex gap-2 pt-2">
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email address..."
              required
              className="flex-1 px-4 py-2.5 bg-[#FBF8F1] border border-[#D8C8A5] rounded-full text-xs text-[#303A2B] placeholder:text-[#788269]/70 focus:outline-none focus:ring-1 focus:ring-[#303A2B]"
            />
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#303A2B] text-[#FBF8F1] rounded-full text-xs font-semibold hover:bg-[#788269] transition-colors flex items-center gap-1.5"
            >
              <span>Subscribe</span>
              <Send className="w-3.5 h-3.5 text-[#D8C8A5]" />
            </button>
          </form>

          <p className="text-[10px] text-[#788269] italic">
            *Demo subscription interface. No backend email list connected currently.
          </p>
        </div>
      </section>

    </div>
  );
};
