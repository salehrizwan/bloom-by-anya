import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  ShoppingBag,
  MessageCircle,
  Truck,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Star,
  Check,
  Plus,
  Minus,
} from 'lucide-react';
import { PRODUCTS, SAMPLE_DATA_NOTICE } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { useShop } from '../context/ShopContext';
import { BRAND_CONFIG } from '../config/brand';
import { SafeImage } from '../components/SafeImage';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist, getWhatsAppDirectInquiryUrl } = useShop();

  const product = PRODUCTS.find((p) => p.slug === slug);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSizeIndex, setSelectedSizeIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [cardMessage, setCardMessage] = useState<string>('');
  const [recipientName, setRecipientName] = useState<string>('');

  useEffect(() => {
    window.scrollTo(0, 0);
    if (product) {
      setSelectedImageIndex(0);
      if (product.availableWrappingColors?.length) {
        setSelectedColor(product.availableWrappingColors[0]);
      } else {
        setSelectedColor('');
      }
      setSelectedSizeIndex(0);
      setQuantity(1);
      setCardMessage('');
      setRecipientName('');
    }
  }, [slug, product]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="font-serif text-3xl font-bold text-[#303A2B]">Arrangement Not Found</h2>
        <p className="text-xs text-[#788269] mt-2 mb-6">
          The requested floral arrangement may have bloomed or moved.
        </p>
        <Link
          to="/shop"
          className="px-6 py-2.5 rounded-full bg-[#303A2B] text-[#FBF8F1] text-xs font-semibold uppercase tracking-wider"
        >
          Return to Catalog
        </Link>
      </div>
    );
  }

  const wishlisted = isInWishlist(product.id);

  const priceDiff = product.availableSizes ? product.availableSizes[selectedSizeIndex]?.priceDiff || 0 : 0;
  const currentUnitPrice = product.price + priceDiff;
  const totalPrice = currentUnitPrice * quantity;

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: currentUnitPrice,
      quantity,
      image: product.images[selectedImageIndex] || product.images[0],
      selectedColor: selectedColor || undefined,
      selectedSize: product.availableSizes ? product.availableSizes[selectedSizeIndex].label : undefined,
      customCardMessage: cardMessage.trim() || undefined,
      recipientName: recipientName.trim() || undefined,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  // WhatsApp order text
  const waInquiryMessage = `*PRODUCT INQUIRY — BLOOMS BY ANYA*
Arrangement: *${product.name}*
Price: Rs. ${currentUnitPrice.toLocaleString()}
Quantity: ${quantity}
${selectedColor ? `Wrap Color: ${selectedColor}\n` : ''}${
    product.availableSizes ? `Size: ${product.availableSizes[selectedSizeIndex].name}\n` : ''
  }${recipientName ? `Recipient: ${recipientName}\n` : ''}${
    cardMessage ? `Card Note: "${cardMessage}"\n` : ''
  }
Please confirm delivery availability in Sialkot.`;

  // Recommended products in same category
  const recommendedProducts = PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#FBF8F1] pb-24">
      
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 text-xs text-[#788269] flex items-center gap-1.5 flex-wrap">
        <Link to="/" className="hover:text-[#303A2B] transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to="/shop" className="hover:text-[#303A2B] transition-colors">Shop</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to={`/shop?cat=${product.category}`} className="hover:text-[#303A2B] transition-colors capitalize">
          {product.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#303A2B] font-medium truncate max-w-xs">{product.name}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main PDP Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">
          
          {/* LEFT: GALLERY MODULE (Col 7) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Main Stage Image */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-[#F7F1E7] border border-[#D8C8A5]/50 shadow-sm">
              <SafeImage
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-300"
              />

              {product.badge && (
                <div className="absolute top-4 left-4 bg-white/95 text-[#303A2B] text-xs font-semibold tracking-wider uppercase px-3 py-1.5 rounded-md shadow-xs border border-[#D8C8A5]/40 backdrop-blur-xs">
                  {product.badge}
                </div>
              )}

              <button
                onClick={() => toggleWishlist(product.id)}
                aria-label="Wishlist"
                className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-colors shadow-xs ${
                  wishlisted
                    ? 'bg-[#DDA9AC] text-[#303A2B]'
                    : 'bg-white/80 text-[#303A2B] hover:bg-white'
                }`}
              >
                <Heart className={`w-5 h-5 ${wishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Thumbnails row */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-24 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      selectedImageIndex === idx
                        ? 'border-[#303A2B] ring-2 ring-[#303A2B]/20'
                        : 'border-[#D8C8A5]/60 opacity-75 hover:opacity-100'
                    }`}
                  >
                    <SafeImage
                      src={img}
                      alt={`${product.name} angle ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Floral Craftsmanship Story */}
            <div className="bg-white rounded-2xl p-6 border border-[#D8C8A5]/40 shadow-xs space-y-3 mt-6">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#788269]">
                <Sparkles className="w-3.5 h-3.5 text-[#D99B20]" />
                <span>Craftsmanship & Origin</span>
              </div>
              <h3 className="font-serif text-lg font-bold text-[#303A2B]">
                Handmade in Our Sialkot Studio
              </h3>
              <p className="text-xs text-[#303A2B]/80 font-light leading-relaxed">
                {product.story}
              </p>

              {product.flowersIncluded && (
                <div className="pt-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#788269] block mb-1">
                    Featured Stems & Botanical Elements:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {product.flowersIncluded.map((f, i) => (
                      <span
                        key={i}
                        className="text-xs text-[#303A2B] bg-[#F7F1E7] px-2.5 py-1 rounded-lg border border-[#D8C8A5]/50"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* RIGHT: CONTIGUOUS PURCHASE MODULE (Col 5) */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-[#D8C8A5]/50 p-6 sm:p-8 shadow-sm space-y-6 sticky top-28">
            
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-[#788269] uppercase tracking-widest font-medium mb-1.5">
                <span>{product.subcategory}</span>
                <div className="flex items-center gap-1 font-mono text-[#D99B20]">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{product.rating} ({product.reviewCount} reviews)</span>
                </div>
              </div>

              {/* Product Title */}
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#303A2B] leading-tight">
                {product.name}
              </h1>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="font-mono text-2xl font-bold text-[#303A2B] tabular-nums">
                  {BRAND_CONFIG.currency.format(currentUnitPrice)}
                </span>
                {product.originalPrice && (
                  <span className="font-mono text-sm text-[#788269] line-through tabular-nums">
                    {BRAND_CONFIG.currency.format(product.originalPrice)}
                  </span>
                )}
                <span className="text-[11px] text-[#788269]">
                  (Sample catalog price)
                </span>
              </div>

              <p className="mt-3 text-xs text-[#303A2B]/80 font-light leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Customization Options */}
            <div className="space-y-4 pt-4 border-t border-[#D8C8A5]/30">
              
              {/* Wrapping Color Picker */}
              {product.availableWrappingColors && product.availableWrappingColors.length > 0 && (
                <div>
                  <label className="block text-xs font-semibold text-[#303A2B] uppercase tracking-wider mb-2">
                    Luxury Wrap Tone: <span className="text-[#788269] capitalize">{selectedColor}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.availableWrappingColors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                          selectedColor === color
                            ? 'bg-[#303A2B] text-[#FBF8F1] border-[#303A2B] shadow-xs'
                            : 'bg-[#F7F1E7] text-[#303A2B] border-[#D8C8A5] hover:border-[#303A2B]'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {product.availableSizes && product.availableSizes.length > 1 && (
                <div>
                  <label className="block text-xs font-semibold text-[#303A2B] uppercase tracking-wider mb-2">
                    Arrangement Size
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {product.availableSizes.map((size, idx) => (
                      <button
                        key={size.name}
                        type="button"
                        onClick={() => setSelectedSizeIndex(idx)}
                        className={`p-2.5 rounded-xl text-xs font-medium border text-left transition-all ${
                          selectedSizeIndex === idx
                            ? 'bg-[#303A2B] text-[#FBF8F1] border-[#303A2B] shadow-xs'
                            : 'bg-[#F7F1E7] text-[#303A2B] border-[#D8C8A5] hover:border-[#303A2B]'
                        }`}
                      >
                        <div className="font-semibold">{size.name}</div>
                        {size.priceDiff > 0 && (
                          <div className={`text-[10px] ${selectedSizeIndex === idx ? 'text-[#D8C8A5]' : 'text-[#788269]'}`}>
                            +{BRAND_CONFIG.currency.format(size.priceDiff)}
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Recipient Name Input */}
              <div>
                <label className="block text-xs font-semibold text-[#303A2B] uppercase tracking-wider mb-1">
                  Recipient Name (Optional)
                </label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="E.g., Dr. Ayesha, Mr. & Mrs. Khan"
                  className="w-full px-3.5 py-2 bg-[#FBF8F1] border border-[#D8C8A5] rounded-xl text-xs text-[#303A2B] focus:outline-none focus:ring-1 focus:ring-[#303A2B]"
                />
              </div>

              {/* Complimentary Handwritten Card Message */}
              <div>
                <label className="block text-xs font-semibold text-[#303A2B] uppercase tracking-wider mb-1">
                  Complimentary Card Note
                </label>
                <textarea
                  rows={2}
                  value={cardMessage}
                  onChange={(e) => setCardMessage(e.target.value)}
                  placeholder="Write your heartfelt message for the gold-foil greeting card..."
                  className="w-full px-3.5 py-2 bg-[#FBF8F1] border border-[#D8C8A5] rounded-xl text-xs text-[#303A2B] focus:outline-none focus:ring-1 focus:ring-[#303A2B]"
                />
              </div>

              {/* Quantity */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-semibold text-[#303A2B] uppercase tracking-wider">
                  Quantity
                </span>
                <div className="flex items-center border border-[#D8C8A5] rounded-xl bg-[#F7F1E7]">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1.5 text-[#788269] hover:text-[#303A2B]"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 font-mono text-xs font-bold text-[#303A2B] tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1.5 text-[#788269] hover:text-[#303A2B]"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>

            {/* Purchase CTA Buttons */}
            <div className="pt-4 border-t border-[#D8C8A5]/40 space-y-2.5">
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full py-3.5 rounded-xl bg-[#303A2B] text-[#FBF8F1] text-xs font-bold uppercase tracking-wider hover:bg-[#788269] transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <ShoppingBag className="w-4 h-4 text-[#D8C8A5]" />
                <span>Add to Shopping Bag · {BRAND_CONFIG.currency.format(totalPrice)}</span>
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                className="w-full py-3 rounded-xl bg-[#D8C8A5] text-[#303A2B] text-xs font-bold uppercase tracking-wider hover:bg-[#BFA56E] transition-colors shadow-xs"
              >
                Buy Now (Proceed to Checkout)
              </button>

              <a
                href={getWhatsAppDirectInquiryUrl(waInquiryMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl border border-[#788269] text-[#303A2B] text-xs font-semibold tracking-wide hover:bg-[#EBF0E6] transition-colors flex items-center justify-center gap-2 text-center"
              >
                <MessageCircle className="w-4 h-4 text-[#303A2B]" />
                <span>Order on WhatsApp</span>
              </a>
            </div>

            {/* Trust Assurance Strip */}
            <div className="pt-4 border-t border-[#D8C8A5]/30 space-y-2 text-xs text-[#788269]">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#303A2B]" />
                <span>Sialkot Hand-Delivery Available within 24-48 Hours</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#303A2B]" />
                <span>Carefully Protected Floral Packaging Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-[#303A2B]" />
                <span>Custom Adjustments accommodated prior to dispatch</span>
              </div>
            </div>

          </div>

        </div>

        {/* RECOMMENDED PRODUCTS SECTION */}
        {recommendedProducts.length > 0 && (
          <div className="mt-20 pt-16 border-t border-[#D8C8A5]/40">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="text-xs uppercase tracking-widest font-semibold text-[#788269] block">
                  You May Also Love
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#303A2B] mt-1">
                  Complementary Creations
                </h3>
              </div>
              <Link
                to={`/shop?cat=${product.category}`}
                className="text-xs font-semibold text-[#303A2B] hover:text-[#788269] uppercase tracking-wider"
              >
                View Category
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
