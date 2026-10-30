import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { BRAND_CONFIG } from '../config/brand';

export const WishlistPage: React.FC = () => {
  const { wishlist, toggleWishlist, addToCart } = useShop();

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  if (wishlistedProducts.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
        <div className="w-16 h-16 rounded-full bg-[#F7F1E7] border border-[#D8C8A5] flex items-center justify-center text-[#788269] mb-4">
          <Heart className="w-7 h-7" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-[#303A2B]">
          Your Wishlist is Empty
        </h1>
        <p className="text-xs text-[#788269] max-w-sm mt-2 mb-8 font-light">
          Tap the heart on any bouquet, luxury hamper, or chocolate arrangement to save your favorites for later.
        </p>
        <Link
          to="/shop"
          className="px-8 py-3 rounded-full bg-[#303A2B] text-[#FBF8F1] text-xs font-semibold uppercase tracking-wider hover:bg-[#788269] transition-colors"
        >
          Explore Arrangements
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF8F1] pb-24">
      {/* Header */}
      <div className="bg-[#F7F1E7] border-b border-[#D8C8A5]/40 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#303A2B]">
              My Saved Wishlist
            </h1>
            <p className="text-xs text-[#788269] mt-1">
              {wishlistedProducts.length} cherished arrangement{wishlistedProducts.length === 1 ? '' : 's'} saved
            </p>
          </div>
          <Link
            to="/shop"
            className="text-xs font-semibold text-[#303A2B] hover:text-[#788269] uppercase tracking-wider flex items-center gap-1"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistedProducts.map((product) => (
            <div
              key={product.id}
              className="group relative flex flex-col bg-white rounded-2xl border border-[#D8C8A5]/40 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300"
            >
              <Link to={`/product/${product.slug}`} className="aspect-[4/3] overflow-hidden bg-[#F7F1E7]">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </Link>

              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  <div className="text-[11px] text-[#788269] uppercase tracking-widest font-medium mb-1">
                    {product.subcategory}
                  </div>
                  <Link to={`/product/${product.slug}`}>
                    <h3 className="font-serif text-base font-bold text-[#303A2B] hover:text-[#788269] transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="mt-2 font-mono text-base font-bold text-[#303A2B] tabular-nums">
                    {BRAND_CONFIG.currency.format(product.price)}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-[#D8C8A5]/30 flex items-center gap-2">
                  <button
                    onClick={() =>
                      addToCart({
                        productId: product.id,
                        name: product.name,
                        price: product.price,
                        quantity: 1,
                        image: product.images[0],
                      })
                    }
                    className="flex-1 py-2 px-3 bg-[#303A2B] text-[#FBF8F1] rounded-xl text-xs font-semibold hover:bg-[#788269] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-[#D8C8A5]" />
                    <span>Add to Bag</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="p-2 border border-[#D8C8A5] rounded-xl text-[#788269] hover:text-red-600 transition-colors"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
