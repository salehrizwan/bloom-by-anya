import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { BRAND_CONFIG } from '../config/brand';
import { SafeImage } from './SafeImage';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct } = useShop();
  const wishlisted = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0],
      selectedColor: product.availableWrappingColors ? product.availableWrappingColors[0] : undefined,
    });
  };

  const handleOpenQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div className="group relative flex flex-col bg-[#FBF8F1] rounded-2xl border border-[#D8C8A5]/40 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[#788269]/40">
      
      {/* Image Container with 4:3 Aspect Ratio */}
      <Link to={`/product/${product.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-[#F7F1E7]">
        <SafeImage
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Subtle Badge (Max 1 subtle text tag per guidelines) */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-[#FBF8F1]/95 text-[#303A2B] text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md shadow-xs backdrop-blur-xs border border-[#D8C8A5]/50">
            {product.badge}
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-200 ${
            wishlisted
              ? 'bg-[#DDA9AC] text-[#303A2B] shadow-md'
              : 'bg-[#FBF8F1]/80 text-[#303A2B] hover:bg-[#FBF8F1] shadow-xs'
          }`}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Hover Quick Actions Bar */}
        <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={handleOpenQuickView}
            className="flex-1 py-2 px-3 bg-[#FBF8F1]/95 backdrop-blur-md text-[#303A2B] text-xs font-semibold rounded-lg shadow-md hover:bg-white transition-colors flex items-center justify-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5 text-[#788269]" />
            <span>Quick View</span>
          </button>
          <button
            onClick={handleQuickAdd}
            aria-label="Add to cart"
            className="p-2 bg-[#303A2B] text-[#FBF8F1] rounded-lg shadow-md hover:bg-[#788269] transition-colors"
          >
            <ShoppingBag className="w-4 h-4 text-[#D8C8A5]" />
          </button>
        </div>
      </Link>

      {/* Content Area */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-gradient-to-b from-[#FBF8F1] to-[#F7F1E7]/50">
        <div>
          {/* Subcategory Label */}
          <div className="flex items-center justify-between text-[11px] text-[#788269] uppercase tracking-widest font-medium mb-1">
            <span>{product.subcategory}</span>
            <span className="font-mono text-[#D99B20]">★ {product.rating}</span>
          </div>

          {/* Product Title */}
          <Link to={`/product/${product.slug}`} className="block group-hover:text-[#788269] transition-colors">
            <h3 className="font-serif text-base sm:text-lg font-bold text-[#303A2B] line-clamp-1 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Brief Snippet */}
          <p className="text-xs text-[#788269] line-clamp-1 mt-1 font-light">
            {product.description}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="mt-4 pt-3 border-t border-[#D8C8A5]/30 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-base font-bold text-[#303A2B] tabular-nums">
              {BRAND_CONFIG.currency.format(product.price)}
            </span>
            {product.originalPrice && (
              <span className="font-mono text-xs text-[#788269] line-through tabular-nums">
                {BRAND_CONFIG.currency.format(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            onClick={handleQuickAdd}
            className="text-xs font-semibold text-[#303A2B] hover:text-[#788269] transition-colors flex items-center gap-1 group/btn"
          >
            <span>Add</span>
            <span className="transition-transform group-hover/btn:translate-x-0.5">+</span>
          </button>
        </div>
      </div>
    </div>
  );
};
