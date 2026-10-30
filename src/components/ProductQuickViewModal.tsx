import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Heart, ShoppingBag, MessageCircle, Check, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { BRAND_CONFIG } from '../config/brand';
import { SafeImage } from './SafeImage';

export const ProductQuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    getWhatsAppDirectInquiryUrl,
  } = useShop();

  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSizeIndex, setSelectedSizeIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [cardMessage, setCardMessage] = useState<string>('');

  useEffect(() => {
    if (quickViewProduct) {
      if (quickViewProduct.availableWrappingColors?.length) {
        setSelectedColor(quickViewProduct.availableWrappingColors[0]);
      } else {
        setSelectedColor('');
      }
      setSelectedSizeIndex(0);
      setQuantity(1);
      setCardMessage('');
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const wishlisted = isInWishlist(quickViewProduct.id);

  const currentPrice =
    quickViewProduct.price +
    (quickViewProduct.availableSizes ? quickViewProduct.availableSizes[selectedSizeIndex]?.priceDiff || 0 : 0);

  const handleAddToCart = () => {
    addToCart({
      productId: quickViewProduct.id,
      name: quickViewProduct.name,
      price: currentPrice,
      quantity,
      image: quickViewProduct.images[0],
      selectedColor: selectedColor || undefined,
      selectedSize: quickViewProduct.availableSizes ? quickViewProduct.availableSizes[selectedSizeIndex].label : undefined,
      customCardMessage: cardMessage.trim() || undefined,
    });
    setQuickViewProduct(null);
  };

  const selectedSizeLabel = quickViewProduct.availableSizes
    ? quickViewProduct.availableSizes[selectedSizeIndex]?.label
    : '';

  const waInquiryText = `Hello Blooms by Anya, I am interested in ordering:
*${quickViewProduct.name}*
Price: Rs. ${currentPrice.toLocaleString()}
${selectedColor ? `Wrapping: ${selectedColor}\n` : ''}${selectedSizeLabel ? `Size: ${selectedSizeLabel}\n` : ''}${
    cardMessage ? `Card Note: "${cardMessage}"\n` : ''
  }Qty: ${quantity}
Could you please confirm availability for Sialkot delivery?`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#303A2B]/60 backdrop-blur-xs transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      />

      <div className="min-h-screen px-4 text-center flex items-center justify-center p-0">
        <div className="inline-block w-full max-w-3xl my-8 overflow-hidden text-left align-middle transition-all transform bg-[#FBF8F1] rounded-3xl shadow-2xl border border-[#D8C8A5]/50 relative z-10">
          
          {/* Close Button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-20 p-2 text-[#303A2B] bg-[#F7F1E7]/80 hover:bg-[#F7F1E7] rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Image Preview */}
              <SafeImage
                src={quickViewProduct.images[0]}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover min-h-[320px] md:min-h-full"
              />
              <button
                onClick={() => toggleWishlist(quickViewProduct.id)}
                className={`absolute top-4 left-4 p-2 rounded-full backdrop-blur-md transition-colors ${
                  wishlisted
                    ? 'bg-[#DDA9AC] text-[#303A2B]'
                    : 'bg-[#FBF8F1]/80 text-[#303A2B] hover:bg-[#FBF8F1]'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Details & Customization */}
            <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
              <div>
                <div className="flex items-center gap-2 text-xs text-[#788269] uppercase tracking-widest font-medium mb-1">
                  <span>{quickViewProduct.subcategory}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#303A2B]">Handcrafted</span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-[#303A2B] leading-tight">
                  {quickViewProduct.name}
                </h3>

                <div className="mt-2 flex items-baseline gap-3">
                  <span className="font-mono text-xl font-bold text-[#303A2B] tabular-nums">
                    {BRAND_CONFIG.currency.format(currentPrice)}
                  </span>
                  {quickViewProduct.originalPrice && (
                    <span className="font-mono text-sm text-[#788269] line-through tabular-nums">
                      {BRAND_CONFIG.currency.format(quickViewProduct.originalPrice)}
                    </span>
                  )}
                  <span className="text-[11px] text-[#788269]">
                    (Sample catalog price)
                  </span>
                </div>

                <p className="mt-3 text-xs text-[#303A2B]/80 leading-relaxed font-light">
                  {quickViewProduct.description}
                </p>

                {/* Wrapping Color Selection */}
                {quickViewProduct.availableWrappingColors && quickViewProduct.availableWrappingColors.length > 0 && (
                  <div className="mt-5">
                    <label className="block text-xs font-semibold text-[#303A2B] uppercase tracking-wider mb-2">
                      Wrap Color: <span className="font-normal text-[#788269] capitalize">{selectedColor}</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {quickViewProduct.availableWrappingColors.map((color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => setSelectedColor(color)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                            selectedColor === color
                              ? 'bg-[#303A2B] text-[#FBF8F1] border-[#303A2B]'
                              : 'bg-[#F7F1E7] text-[#303A2B] border-[#D8C8A5] hover:border-[#303A2B]'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selection */}
                {quickViewProduct.availableSizes && quickViewProduct.availableSizes.length > 1 && (
                  <div className="mt-4">
                    <label className="block text-xs font-semibold text-[#303A2B] uppercase tracking-wider mb-2">
                      Arrangement Size
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {quickViewProduct.availableSizes.map((size, idx) => (
                        <button
                          key={size.name}
                          type="button"
                          onClick={() => setSelectedSizeIndex(idx)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                            selectedSizeIndex === idx
                              ? 'bg-[#303A2B] text-[#FBF8F1] border-[#303A2B]'
                              : 'bg-[#F7F1E7] text-[#303A2B] border-[#D8C8A5] hover:border-[#303A2B]'
                          }`}
                        >
                          {size.name} {size.priceDiff > 0 ? `(+${BRAND_CONFIG.currency.format(size.priceDiff)})` : ''}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Optional Message Card */}
                <div className="mt-4">
                  <label className="block text-xs font-semibold text-[#303A2B] uppercase tracking-wider mb-1.5">
                    Complimentary Handwritten Card Note (Optional)
                  </label>
                  <input
                    type="text"
                    value={cardMessage}
                    onChange={(e) => setCardMessage(e.target.value)}
                    placeholder="E.g., Happy Birthday Anya! With all my love, Sara"
                    className="w-full px-3 py-2 bg-[#F7F1E7] border border-[#D8C8A5] rounded-xl text-xs text-[#303A2B] placeholder:text-[#788269]/60 focus:outline-none focus:ring-1 focus:ring-[#303A2B]"
                    maxLength={150}
                  />
                </div>

                {/* Quantity */}
                <div className="mt-4 flex items-center gap-3">
                  <span className="text-xs font-semibold text-[#303A2B] uppercase tracking-wider">
                    Quantity:
                  </span>
                  <div className="flex items-center border border-[#D8C8A5] rounded-xl bg-[#F7F1E7]">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-2.5 py-1 text-xs text-[#788269] hover:text-[#303A2B]"
                    >
                      -
                    </button>
                    <span className="px-3 font-mono text-xs font-bold text-[#303A2B] tabular-nums">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-2.5 py-1 text-xs text-[#788269] hover:text-[#303A2B]"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-[#D8C8A5]/40 space-y-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full py-3 px-4 rounded-xl bg-[#303A2B] text-[#FBF8F1] text-xs font-bold uppercase tracking-wider hover:bg-[#788269] transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <ShoppingBag className="w-4 h-4 text-[#D8C8A5]" />
                  <span>Add to Bag · {BRAND_CONFIG.currency.format(currentPrice * quantity)}</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={getWhatsAppDirectInquiryUrl(waInquiryText)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl border border-[#788269] text-[#303A2B] text-xs font-semibold text-center hover:bg-[#EBF0E6] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#303A2B]" />
                    <span>Order via WhatsApp</span>
                  </a>

                  <Link
                    to={`/product/${quickViewProduct.slug}`}
                    onClick={() => setQuickViewProduct(null)}
                    className="py-2.5 px-3 rounded-xl border border-[#D8C8A5] text-[#303A2B] text-xs font-semibold text-center hover:bg-[#F7F1E7] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Full Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
