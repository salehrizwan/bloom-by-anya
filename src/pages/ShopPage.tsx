import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, ArrowUpDown, Search, X, RotateCcw } from 'lucide-react';
import { PRODUCTS, SAMPLE_DATA_NOTICE } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { ProductCategory } from '../types';
import { BRAND_CONFIG } from '../config/brand';

export const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialCat = (searchParams.get('cat') as ProductCategory | 'all') || 'all';
  const initialSub = searchParams.get('sub') || 'all';
  const initialSearch = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>(initialCat);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>(initialSub);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(15000);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync state if URL query changes
  React.useEffect(() => {
    const cat = searchParams.get('cat') as ProductCategory | null;
    const sub = searchParams.get('sub');
    const q = searchParams.get('search');

    if (cat) setSelectedCategory(cat);
    if (sub) setSelectedSubcategory(sub);
    if (q !== null) setSearchQuery(q);
  }, [searchParams]);

  // Extract available subcategories based on category
  const availableSubcategories = useMemo(() => {
    let pool = PRODUCTS;
    if (selectedCategory !== 'all') {
      pool = pool.filter(p => p.category === selectedCategory);
    }
    const subs = Array.from(new Set(pool.map(p => p.subcategory)));
    return subs;
  }, [selectedCategory]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      // Category match
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Subcategory match
      if (selectedSubcategory !== 'all' && product.subcategory !== selectedSubcategory) {
        return false;
      }
      // Price match
      if (product.price > maxPrice) {
        return false;
      }
      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(query);
        const matchDesc = product.description.toLowerCase().includes(query);
        const matchSub = product.subcategory.toLowerCase().includes(query);
        const matchFlowers = product.flowersIncluded?.some(f => f.toLowerCase().includes(query));
        if (!matchName && !matchDesc && !matchSub && !matchFlowers) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default order
    });
  }, [selectedCategory, selectedSubcategory, maxPrice, searchQuery, sortBy]);

  const handleCategoryChange = (cat: ProductCategory | 'all') => {
    setSelectedCategory(cat);
    setSelectedSubcategory('all');
    const params = new URLSearchParams(searchParams);
    if (cat === 'all') {
      params.delete('cat');
    } else {
      params.set('cat', cat);
    }
    params.delete('sub');
    setSearchParams(params);
  };

  const handleSubcategoryChange = (sub: string) => {
    setSelectedSubcategory(sub);
    const params = new URLSearchParams(searchParams);
    if (sub === 'all') {
      params.delete('sub');
    } else {
      params.set('sub', sub);
    }
    setSearchParams(params);
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedSubcategory('all');
    setSearchQuery('');
    setMaxPrice(15000);
    setSortBy('featured');
    setSearchParams(new URLSearchParams());
  };

  return (
    <div className="min-h-screen bg-[#FBF8F1] pb-24">
      
      {/* Editorial Category Header */}
      <div className="bg-[#F7F1E7] border-b border-[#D8C8A5]/40 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center space-y-3">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#788269] block">
            Complete Gifting Catalog
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#303A2B]">
            {selectedCategory === 'bouquets'
              ? 'Handmade Bouquets'
              : selectedCategory === 'hampers'
              ? 'DIY Luxury Hampers'
              : selectedCategory === 'occasions'
              ? 'Special Occasion Gifts'
              : selectedCategory === 'arrangements'
              ? 'Luxury Arrangements & Towers'
              : 'The Boutique Collection'}
          </h1>
          <p className="text-xs sm:text-sm text-[#788269] max-w-xl mx-auto font-light leading-relaxed">
            Every arrangement is handcrafted with love, imported blooms, and artisanal packaging in Sialkot.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Sample catalog banner */}
        <div className="p-3 bg-[#EBF0E6] rounded-xl border border-[#788269]/30 text-center text-xs text-[#303A2B] mb-8 font-light flex items-center justify-center gap-2">
          <span className="text-[#D99B20] font-bold">ℹ</span>
          <span>{SAMPLE_DATA_NOTICE}</span>
        </div>

        {/* Filter & Sorting Control Bar */}
        <div className="bg-white rounded-2xl border border-[#D8C8A5]/40 p-4 mb-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Tabs (Segmented control button elements per guidelines) */}
          <div className="flex items-center gap-1.5 p-1 bg-[#F7F1E7] rounded-xl overflow-x-auto w-full md:w-auto">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === 'all'
                  ? 'bg-[#303A2B] text-[#FBF8F1] shadow-xs'
                  : 'text-[#303A2B] hover:bg-white/60'
              }`}
            >
              All Products
            </button>
            <button
              onClick={() => handleCategoryChange('bouquets')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === 'bouquets'
                  ? 'bg-[#303A2B] text-[#FBF8F1] shadow-xs'
                  : 'text-[#303A2B] hover:bg-white/60'
              }`}
            >
              Bouquets
            </button>
            <button
              onClick={() => handleCategoryChange('hampers')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === 'hampers'
                  ? 'bg-[#303A2B] text-[#FBF8F1] shadow-xs'
                  : 'text-[#303A2B] hover:bg-white/60'
              }`}
            >
              Hampers
            </button>
            <button
              onClick={() => handleCategoryChange('occasions')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === 'occasions'
                  ? 'bg-[#303A2B] text-[#FBF8F1] shadow-xs'
                  : 'text-[#303A2B] hover:bg-white/60'
              }`}
            >
              Occasions
            </button>
            <button
              onClick={() => handleCategoryChange('arrangements')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === 'arrangements'
                  ? 'bg-[#303A2B] text-[#FBF8F1] shadow-xs'
                  : 'text-[#303A2B] hover:bg-white/60'
              }`}
            >
              Arrangements
            </button>
          </div>

          {/* Right Utility: Search & Sort */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            
            {/* Search Input */}
            <div className="relative flex-1 md:w-56">
              <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-[#788269]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full pl-8 pr-3 py-1.5 bg-[#F7F1E7] border border-[#D8C8A5] rounded-xl text-xs text-[#303A2B] placeholder:text-[#788269]/70 focus:outline-none focus:ring-1 focus:ring-[#303A2B]"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 shrink-0">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#788269]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#F7F1E7] border border-[#D8C8A5] rounded-xl text-xs text-[#303A2B] py-1.5 px-2.5 focus:outline-none focus:ring-1 focus:ring-[#303A2B]"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="md:hidden p-2 rounded-xl border border-[#D8C8A5] bg-[#F7F1E7] text-[#303A2B]"
              aria-label="Toggle Filters"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Subcategory Pills Row (if available) */}
        {availableSubcategories.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6">
            <span className="text-xs text-[#788269] uppercase font-semibold shrink-0 mr-1">
              Filter By Style:
            </span>
            <button
              onClick={() => handleSubcategoryChange('all')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors whitespace-nowrap shrink-0 border ${
                selectedSubcategory === 'all'
                  ? 'bg-[#788269] text-white border-[#788269]'
                  : 'bg-white text-[#303A2B] border-[#D8C8A5] hover:border-[#303A2B]'
              }`}
            >
              All Styles
            </button>
            {availableSubcategories.map((sub) => (
              <button
                key={sub}
                onClick={() => handleSubcategoryChange(sub)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors whitespace-nowrap shrink-0 border ${
                  selectedSubcategory === sub
                    ? 'bg-[#788269] text-white border-[#788269]'
                    : 'bg-white text-[#303A2B] border-[#D8C8A5] hover:border-[#303A2B]'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        )}

        {/* Active Filters Display */}
        {(selectedCategory !== 'all' || selectedSubcategory !== 'all' || searchQuery || maxPrice < 15000) && (
          <div className="flex items-center gap-3 text-xs text-[#788269] mb-6 flex-wrap">
            <span>Active filters:</span>
            {selectedCategory !== 'all' && (
              <span className="px-2.5 py-0.5 rounded-full bg-[#EBF0E6] text-[#303A2B] flex items-center gap-1">
                Category: {selectedCategory}
                <button onClick={() => handleCategoryChange('all')} className="hover:text-red-600">×</button>
              </span>
            )}
            {selectedSubcategory !== 'all' && (
              <span className="px-2.5 py-0.5 rounded-full bg-[#EBF0E6] text-[#303A2B] flex items-center gap-1">
                Style: {selectedSubcategory}
                <button onClick={() => handleSubcategoryChange('all')} className="hover:text-red-600">×</button>
              </span>
            )}
            {searchQuery && (
              <span className="px-2.5 py-0.5 rounded-full bg-[#EBF0E6] text-[#303A2B] flex items-center gap-1">
                Query: "{searchQuery}"
                <button onClick={() => setSearchQuery('')} className="hover:text-red-600">×</button>
              </span>
            )}
            <button
              onClick={handleResetFilters}
              className="text-xs text-[#303A2B] font-semibold underline hover:text-[#788269] flex items-center gap-1 ml-2"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset all</span>
            </button>
          </div>
        )}

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl border border-[#D8C8A5]/40 p-12 text-center space-y-4 max-w-lg mx-auto my-12">
            <h3 className="font-serif text-2xl font-bold text-[#303A2B]">
              No Arrangements Found
            </h3>
            <p className="text-xs text-[#788269] font-light leading-relaxed">
              We couldn’t find any creations matching your search. Try resetting your filters or custom-build your unique gift.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 rounded-full bg-[#303A2B] text-[#FBF8F1] text-xs font-semibold hover:bg-[#788269] transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
