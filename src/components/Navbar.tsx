import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, X, User, MessageCircle } from 'lucide-react';
import { BRAND_CONFIG } from '../config/brand';
import { useShop } from '../context/ShopContext';
import { SafeImage } from './SafeImage';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { cartCount, wishlist, setIsMiniCartOpen, searchQuery, setSearchQuery, getWhatsAppDirectInquiryUrl } = useShop();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FBF8F1]/95 backdrop-blur-md border-b border-[#D8C8A5]/30 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-8">
          
          {/* ZONE 1: BRAND LOGO */}
          <div className="flex items-center gap-3 shrink-0">
            <Link to="/" className="flex items-center gap-3 group">
              <SafeImage
                src={BRAND_CONFIG.assets.logo}
                alt="Blooms by Anya Official Emblem"
                className="w-12 h-12 md:w-14 md:h-14 rounded-full object-contain shadow-xs border border-[#D8C8A5]/40 transition-transform duration-300 group-hover:scale-105"
              />
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#303A2B] leading-none">
                  Blooms by Anya
                </span>
                <span className="text-[10px] sm:text-[11px] tracking-widest uppercase text-[#788269] font-medium mt-1">
                  Bespoke Floral Studio
                </span>
              </div>
            </Link>
          </div>

          {/* ZONE 2: DESKTOP NAVIGATION LINKS */}
          <nav className="hidden lg:flex items-center gap-8 text-[13px] font-medium tracking-wide uppercase text-[#303A2B]/85">
            <Link
              to="/"
              className="hover:text-[#303A2B] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#303A2B] hover:after:w-full after:transition-all whitespace-nowrap shrink-0"
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="hover:text-[#303A2B] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#303A2B] hover:after:w-full after:transition-all whitespace-nowrap shrink-0"
            >
              Shop All
            </Link>
            <Link
              to="/shop?cat=bouquets"
              className="hover:text-[#303A2B] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#303A2B] hover:after:w-full after:transition-all whitespace-nowrap shrink-0"
            >
              Bouquets
            </Link>
            <Link
              to="/shop?cat=hampers"
              className="hover:text-[#303A2B] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#303A2B] hover:after:w-full after:transition-all whitespace-nowrap shrink-0"
            >
              Hampers
            </Link>
            <Link
              to="/create-your-own-gift"
              className="text-[#303A2B] font-semibold flex items-center gap-1 hover:text-[#788269] transition-colors relative py-1 whitespace-nowrap shrink-0"
            >
              <span className="text-xs text-[#D99B20]">✦</span> Create Your Own Gift
            </Link>
            <Link
              to="/our-story"
              className="hover:text-[#303A2B] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#303A2B] hover:after:w-full after:transition-all whitespace-nowrap shrink-0"
            >
              Our Story
            </Link>
            <Link
              to="/contact"
              className="hover:text-[#303A2B] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#303A2B] hover:after:w-full after:transition-all whitespace-nowrap shrink-0"
            >
              Contact
            </Link>
          </nav>

          {/* ZONE 3: ACTIONS */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search Catalog"
              className="p-2 text-[#303A2B] hover:text-[#788269] transition-colors rounded-full hover:bg-[#F7F1E7]"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="p-2 text-[#303A2B] hover:text-[#788269] transition-colors relative rounded-full hover:bg-[#F7F1E7]"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#DDA9AC] text-[#303A2B] text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Account */}
            <Link
              to="/account"
              aria-label="Customer Account"
              className="hidden sm:flex p-2 text-[#303A2B] hover:text-[#788269] transition-colors rounded-full hover:bg-[#F7F1E7]"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Live Shopping Bag */}
            <button
              onClick={() => setIsMiniCartOpen(true)}
              aria-label="Shopping Bag"
              className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#303A2B] text-[#FBF8F1] hover:bg-[#788269] transition-colors duration-200 shadow-xs"
            >
              <ShoppingBag className="w-4 h-4 text-[#D8C8A5]" />
              <span className="text-xs font-semibold tracking-wider font-mono tabular-nums">
                {cartCount}
              </span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Mobile Menu"
              className="lg:hidden p-2 text-[#303A2B] hover:text-[#788269] transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Expandable Search Input Bar */}
        {searchOpen && (
          <div className="py-3 border-t border-[#D8C8A5]/30 animate-in fade-in duration-200">
            <form onSubmit={handleSearchSubmit} className="relative max-w-xl mx-auto flex items-center">
              <Search className="absolute left-3 w-4 h-4 text-[#788269]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search bouquets, hampers, roses, chocolates, teddy..."
                className="w-full pl-9 pr-24 py-2 bg-[#F7F1E7] border border-[#D8C8A5] rounded-full text-xs text-[#303A2B] placeholder:text-[#788269]/70 focus:outline-none focus:ring-1 focus:ring-[#303A2B]"
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-1 px-4 py-1.5 bg-[#303A2B] text-[#FBF8F1] rounded-full text-xs font-medium hover:bg-[#788269] transition-colors"
              >
                Search
              </button>
            </form>
          </div>
        )}
      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-[#303A2B]/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Menu */}
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-[#FBF8F1] shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#D8C8A5]/40">
                <div className="flex items-center gap-2">
                  <SafeImage
                    src={BRAND_CONFIG.assets.logo}
                    alt="Blooms by Anya"
                    className="w-10 h-10 rounded-full object-contain"
                  />
                  <span className="font-serif font-bold text-lg text-[#303A2B]">
                    Blooms by Anya
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="p-1 rounded-md text-[#303A2B] hover:bg-[#F7F1E7]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="py-6 flex flex-col space-y-4 text-sm font-medium text-[#303A2B]">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 hover:text-[#788269] transition-colors border-b border-[#D8C8A5]/20"
                >
                  Home
                </Link>
                <Link
                  to="/shop"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 hover:text-[#788269] transition-colors border-b border-[#D8C8A5]/20"
                >
                  Explore All Collections
                </Link>
                <Link
                  to="/shop?cat=bouquets"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 hover:text-[#788269] transition-colors border-b border-[#D8C8A5]/20 pl-2"
                >
                  Handmade Bouquets
                </Link>
                <Link
                  to="/shop?cat=hampers"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 hover:text-[#788269] transition-colors border-b border-[#D8C8A5]/20 pl-2"
                >
                  DIY Hampers & Gift Boxes
                </Link>
                <Link
                  to="/shop?cat=occasions"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 hover:text-[#788269] transition-colors border-b border-[#D8C8A5]/20 pl-2"
                >
                  Special Occasions
                </Link>
                <Link
                  to="/shop?cat=arrangements"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 hover:text-[#788269] transition-colors border-b border-[#D8C8A5]/20 pl-2"
                >
                  Luxury Arrangements & Towers
                </Link>
                <Link
                  to="/create-your-own-gift"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-[#D99B20] font-semibold flex items-center gap-2 border-b border-[#D8C8A5]/20"
                >
                  <span>✦</span> Create Your Own Gift
                </Link>
                <Link
                  to="/our-story"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 hover:text-[#788269] transition-colors border-b border-[#D8C8A5]/20"
                >
                  Our Story
                </Link>
                <Link
                  to="/account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 hover:text-[#788269] transition-colors border-b border-[#D8C8A5]/20"
                >
                  My Account & Orders
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 hover:text-[#788269] transition-colors"
                >
                  Contact & Location
                </Link>
              </div>
            </div>

            {/* Bottom Contact inside Drawer */}
            <div className="pt-6 border-t border-[#D8C8A5]/30">
              <a
                href={getWhatsAppDirectInquiryUrl('Hello Blooms by Anya, I have a quick question about ordering an arrangement.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#303A2B] text-[#FBF8F1] rounded-xl text-xs font-semibold tracking-wide hover:bg-[#788269] transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#D8C8A5]" />
                Chat on WhatsApp
              </a>
              <p className="text-center text-[11px] text-[#788269] mt-3">
                Based in {BRAND_CONFIG.location}
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
