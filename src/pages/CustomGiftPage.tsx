import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Plus, Minus, Sparkles, ShoppingBag, MessageCircle, ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import { CUSTOM_BUILDER_OPTIONS, SAMPLE_DATA_NOTICE } from '../data/products';
import { BRAND_CONFIG } from '../config/brand';
import { useShop } from '../context/ShopContext';
import { SafeImage } from '../components/SafeImage';

export const CustomGiftPage: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart, getWhatsAppDirectInquiryUrl } = useShop();

  const [activeStep, setActiveStep] = useState<number>(1);

  // Builder state
  const [selectedBase, setSelectedBase] = useState(CUSTOM_BUILDER_OPTIONS.bases[0]);
  const [flowerQuantities, setFlowerQuantities] = useState<Record<string, number>>({
    'fl-roses-red': 1,
    'fl-gyp': 1,
  });
  const [treatQuantities, setTreatQuantities] = useState<Record<string, number>>({
    'tr-ferrero': 1,
  });
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>(['ac-card']);
  const [selectedColor, setSelectedColor] = useState('Sage Green');
  const [selectedRibbon, setSelectedRibbon] = useState('Champagne Gold');
  const [recipientName, setRecipientName] = useState('');
  const [cardMessage, setCardMessage] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Step names
  const steps = [
    { number: 1, title: 'Choose Base', subtitle: 'Foundation' },
    { number: 2, title: 'Select Flowers', subtitle: 'Blooms & Greens' },
    { number: 3, title: 'Add Treats', subtitle: 'Chocolates & Goodies' },
    { number: 4, title: 'Accessories', subtitle: 'Balloons & Bears' },
    { number: 5, title: 'Personalize', subtitle: 'Card & Wrappings' },
    { number: 6, title: 'Review & Order', subtitle: 'Summary' },
  ];

  // Price calculations
  const basePrice = selectedBase.price;

  const flowersTotal = Object.entries(flowerQuantities).reduce((sum, [id, qty]) => {
    const item = CUSTOM_BUILDER_OPTIONS.flowers.find(f => f.id === id);
    return sum + (item ? item.price * qty : 0);
  }, 0);

  const treatsTotal = Object.entries(treatQuantities).reduce((sum, [id, qty]) => {
    const item = CUSTOM_BUILDER_OPTIONS.treats.find(t => t.id === id);
    return sum + (item ? item.price * qty : 0);
  }, 0);

  const accessoriesTotal = selectedAccessories.reduce((sum, id) => {
    const item = CUSTOM_BUILDER_OPTIONS.accessories.find(a => a.id === id);
    return sum + (item ? item.price : 0);
  }, 0);

  const customGiftTotal = basePrice + flowersTotal + treatsTotal + accessoriesTotal;

  // Toggle helpers
  const handleFlowerQty = (id: string, delta: number) => {
    setFlowerQuantities(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      const updated = { ...prev };
      if (next === 0) {
        delete updated[id];
      } else {
        updated[id] = next;
      }
      return updated;
    });
  };

  const handleTreatQty = (id: string, delta: number) => {
    setTreatQuantities(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      const updated = { ...prev };
      if (next === 0) {
        delete updated[id];
      } else {
        updated[id] = next;
      }
      return updated;
    });
  };

  const toggleAccessory = (id: string) => {
    setSelectedAccessories(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleReset = () => {
    setSelectedBase(CUSTOM_BUILDER_OPTIONS.bases[0]);
    setFlowerQuantities({ 'fl-roses-red': 1, 'fl-gyp': 1 });
    setTreatQuantities({ 'tr-ferrero': 1 });
    setSelectedAccessories(['ac-card']);
    setSelectedColor('Sage Green');
    setSelectedRibbon('Champagne Gold');
    setRecipientName('');
    setCardMessage('');
    setSpecialInstructions('');
    setActiveStep(1);
  };

  // Compile detailed description
  const compileGiftSummaryText = () => {
    const flowerDetails = Object.entries(flowerQuantities)
      .map(([id, qty]) => {
        const f = CUSTOM_BUILDER_OPTIONS.flowers.find(item => item.id === id);
        return f ? `${qty}x ${f.name}` : null;
      })
      .filter(Boolean)
      .join(', ');

    const treatDetails = Object.entries(treatQuantities)
      .map(([id, qty]) => {
        const t = CUSTOM_BUILDER_OPTIONS.treats.find(item => item.id === id);
        return t ? `${qty}x ${t.name}` : null;
      })
      .filter(Boolean)
      .join(', ');

    const accDetails = selectedAccessories
      .map(id => CUSTOM_BUILDER_OPTIONS.accessories.find(a => a.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    return `Base: ${selectedBase.name} | Wrap: ${selectedColor} & ${selectedRibbon} | Flowers: [${flowerDetails || 'None'}] | Treats: [${treatDetails || 'None'}] | Accessories: [${accDetails || 'None'}]${
      recipientName ? ` | For: ${recipientName}` : ''
    }${cardMessage ? ` | Note: "${cardMessage}"` : ''}`;
  };

  const handleAddCustomGiftToCart = () => {
    const details = compileGiftSummaryText();
    addToCart({
      productId: 'custom-gift-creation',
      name: `Bespoke Creation: ${selectedBase.name}`,
      price: customGiftTotal,
      quantity: 1,
      image: selectedBase.image,
      selectedColor: `${selectedColor} with ${selectedRibbon} ribbon`,
      customCardMessage: cardMessage.trim() || undefined,
      recipientName: recipientName.trim() || undefined,
      isCustomGift: true,
      customGiftDetails: details,
    });
    navigate('/cart');
  };

  const getCustomGiftWhatsAppUrl = () => {
    const rawNumber = BRAND_CONFIG.contact.whatsappNumber.replace(/[^0-9]/g, '');
    const flowerDetails = Object.entries(flowerQuantities)
      .map(([id, qty]) => {
        const f = CUSTOM_BUILDER_OPTIONS.flowers.find(item => item.id === id);
        return f ? `  • ${f.name} x${qty} (Rs. ${(f.price * qty).toLocaleString()})` : '';
      })
      .filter(Boolean)
      .join('\n');

    const treatDetails = Object.entries(treatQuantities)
      .map(([id, qty]) => {
        const t = CUSTOM_BUILDER_OPTIONS.treats.find(item => item.id === id);
        return t ? `  • ${t.name} x${qty} (Rs. ${(t.price * qty).toLocaleString()})` : '';
      })
      .filter(Boolean)
      .join('\n');

    const accDetails = selectedAccessories
      .map(id => {
        const a = CUSTOM_BUILDER_OPTIONS.accessories.find(item => item.id === id);
        return a ? `  • ${a.name} (Rs. ${a.price.toLocaleString()})` : '';
      })
      .filter(Boolean)
      .join('\n');

    const msg = `*CUSTOM GIFT INQUIRY — BLOOMS BY ANYA*
Hello! I designed a custom gift arrangement on your website and would like to order it:

*1. Selected Base:*
  • ${selectedBase.name} (Rs. ${selectedBase.price.toLocaleString()})

*2. Flowers:*
${flowerDetails || '  • None selected'}

*3. Gourmet Treats:*
${treatDetails || '  • None selected'}

*4. Accessories & Styling:*
${accDetails || '  • None selected'}

*5. Personalization:*
  • Wrap Color: ${selectedColor}
  • Ribbon Accent: ${selectedRibbon}
  • Recipient Name: ${recipientName || 'Not specified'}
  • Card Message: "${cardMessage || 'Please provide blank card'}"
  • Special Instructions: ${specialInstructions || 'Standard arrangement'}

*Estimated Total: Rs. ${customGiftTotal.toLocaleString()}*
_(Sample catalog pricing)_

Could you please confirm the crafting timeline and Sialkot delivery schedule? Thank you!`;

    return `https://wa.me/${rawNumber}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="min-h-screen bg-[#FBF8F1] pb-24">
      
      {/* Editorial Header */}
      <div className="bg-[#F7F1E7] border-b border-[#D8C8A5]/40 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#788269]">
            <Sparkles className="w-3.5 h-3.5 text-[#D99B20]" />
            <span>Interactive Studio Workshop</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#303A2B]">
            Create Your Own Gift
          </h1>
          <p className="text-sm sm:text-base text-[#788269] max-w-2xl mx-auto font-light leading-relaxed">
            Your imagination, our handmade magic. Design a one-of-a-kind bouquet or luxury hamper personalized down to every ribbon and blossom.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Step Indicator Bar */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-[#D8C8A5]/50 p-4 mb-8 shadow-xs overflow-x-auto">
          <div className="flex items-center justify-between min-w-[620px] gap-2">
            {steps.map((s) => {
              const isPassed = activeStep > s.number;
              const isCurrent = activeStep === s.number;
              return (
                <button
                  key={s.number}
                  onClick={() => setActiveStep(s.number)}
                  className={`flex items-center gap-3 py-2 px-3 rounded-xl transition-all text-left ${
                    isCurrent
                      ? 'bg-[#303A2B] text-[#FBF8F1] shadow-xs'
                      : isPassed
                      ? 'text-[#303A2B] hover:bg-[#F7F1E7]'
                      : 'text-[#788269]/60 hover:text-[#788269]'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                      isCurrent
                        ? 'bg-[#D8C8A5] text-[#303A2B]'
                        : isPassed
                        ? 'bg-[#788269] text-white'
                        : 'border border-[#D8C8A5] text-[#788269]'
                    }`}
                  >
                    {isPassed ? <Check className="w-4 h-4" /> : s.number}
                  </div>
                  <div className="whitespace-nowrap">
                    <div className="text-xs font-semibold leading-tight">{s.title}</div>
                    <div className={`text-[10px] ${isCurrent ? 'text-[#D8C8A5]' : 'text-[#788269]'}`}>
                      {s.subtitle}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Builder Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Active Step Panel (Col 7) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#D8C8A5]/50 p-6 sm:p-8 shadow-sm space-y-6">
            
            {/* STEP 1: CHOOSE BASE */}
            {activeStep === 1 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#303A2B]">
                    Step 1: Choose Your Base
                  </h2>
                  <p className="text-xs text-[#788269] mt-1 font-light">
                    Select the foundational presentation style for your custom gift arrangement.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {CUSTOM_BUILDER_OPTIONS.bases.map((base) => {
                    const isSelected = selectedBase.id === base.id;
                    return (
                      <div
                        key={base.id}
                        onClick={() => setSelectedBase(base)}
                        className={`relative rounded-2xl border p-4 cursor-pointer transition-all ${
                          isSelected
                            ? 'border-[#303A2B] bg-[#F7F1E7]/50 shadow-md ring-1 ring-[#303A2B]'
                            : 'border-[#D8C8A5]/60 bg-[#FBF8F1] hover:border-[#788269]'
                        }`}
                      >
                        <SafeImage
                          src={base.image}
                          alt={base.name}
                          className="w-full h-36 object-cover rounded-xl mb-3"
                        />
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-serif text-base font-bold text-[#303A2B]">
                              {base.name}
                            </h3>
                            <p className="text-xs text-[#788269] mt-0.5 line-clamp-2">
                              {base.description}
                            </p>
                          </div>
                          <span className="font-mono text-sm font-bold text-[#303A2B] whitespace-nowrap ml-2 tabular-nums">
                            {BRAND_CONFIG.currency.format(base.price)}
                          </span>
                        </div>
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#303A2B] text-white flex items-center justify-center">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 2: CHOOSE FLOWERS */}
            {activeStep === 2 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#303A2B]">
                    Step 2: Choose Your Flowers
                  </h2>
                  <p className="text-xs text-[#788269] mt-1 font-light">
                    Mix and match fresh imported blooms, sunflowers, and delicate filler blossoms.
                  </p>
                </div>

                <div className="space-y-3">
                  {CUSTOM_BUILDER_OPTIONS.flowers.map((fl) => {
                    const count = flowerQuantities[fl.id] || 0;
                    return (
                      <div
                        key={fl.id}
                        className={`p-4 rounded-2xl border flex items-center justify-between transition-colors ${
                          count > 0
                            ? 'border-[#303A2B] bg-[#F7F1E7]/40'
                            : 'border-[#D8C8A5]/50 bg-[#FBF8F1]'
                        }`}
                      >
                        <div>
                          <h3 className="font-serif text-base font-bold text-[#303A2B]">
                            {fl.name}
                          </h3>
                          <p className="text-xs text-[#788269]">
                            {BRAND_CONFIG.currency.format(fl.price)} · {fl.unit}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 border border-[#D8C8A5] rounded-xl bg-white px-2 py-1">
                          <button
                            type="button"
                            onClick={() => handleFlowerQty(fl.id, -1)}
                            className="p-1 text-[#788269] hover:text-[#303A2B]"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-6 text-center font-mono text-xs font-bold text-[#303A2B] tabular-nums">
                            {count}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleFlowerQty(fl.id, 1)}
                            className="p-1 text-[#788269] hover:text-[#303A2B]"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 3: ADD TREATS */}
            {activeStep === 3 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#303A2B]">
                    Step 3: Add Gourmet Treats
                  </h2>
                  <p className="text-xs text-[#788269] mt-1 font-light">
                    Add irresistible artisan chocolates, bakery treats, and gourmet roasted nuts.
                  </p>
                </div>

                <div className="space-y-3">
                  {CUSTOM_BUILDER_OPTIONS.treats.map((tr) => {
                    const count = treatQuantities[tr.id] || 0;
                    return (
                      <div
                        key={tr.id}
                        className={`p-4 rounded-2xl border flex items-center justify-between transition-colors ${
                          count > 0
                            ? 'border-[#303A2B] bg-[#F7F1E7]/40'
                            : 'border-[#D8C8A5]/50 bg-[#FBF8F1]'
                        }`}
                      >
                        <div>
                          <h3 className="font-serif text-base font-bold text-[#303A2B]">
                            {tr.name}
                          </h3>
                          <p className="text-xs text-[#788269]">
                            {BRAND_CONFIG.currency.format(tr.price)}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 border border-[#D8C8A5] rounded-xl bg-white px-2 py-1">
                          <button
                            type="button"
                            onClick={() => handleTreatQty(tr.id, -1)}
                            className="p-1 text-[#788269] hover:text-[#303A2B]"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-6 text-center font-mono text-xs font-bold text-[#303A2B] tabular-nums">
                            {count}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleTreatQty(tr.id, 1)}
                            className="p-1 text-[#788269] hover:text-[#303A2B]"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 4: ADD ACCESSORIES */}
            {activeStep === 4 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#303A2B]">
                    Step 4: Add Accessories & Keepsakes
                  </h2>
                  <p className="text-xs text-[#788269] mt-1 font-light">
                    Elevate the celebration with balloons, fairy lights, teddy bears, and calligraphy cards.
                  </p>
                </div>

                <div className="space-y-3">
                  {CUSTOM_BUILDER_OPTIONS.accessories.map((ac) => {
                    const isSelected = selectedAccessories.includes(ac.id);
                    return (
                      <div
                        key={ac.id}
                        onClick={() => toggleAccessory(ac.id)}
                        className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-colors ${
                          isSelected
                            ? 'border-[#303A2B] bg-[#F7F1E7]/40 ring-1 ring-[#303A2B]'
                            : 'border-[#D8C8A5]/50 bg-[#FBF8F1] hover:border-[#788269]'
                        }`}
                      >
                        <div>
                          <h3 className="font-serif text-base font-bold text-[#303A2B]">
                            {ac.name}
                          </h3>
                          <p className="text-xs text-[#788269]">
                            {BRAND_CONFIG.currency.format(ac.price)}
                          </p>
                        </div>

                        <div
                          className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-colors ${
                            isSelected
                              ? 'bg-[#303A2B] border-[#303A2B] text-white'
                              : 'border-[#D8C8A5] bg-white text-transparent'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 5: PERSONALIZE */}
            {activeStep === 5 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#303A2B]">
                    Step 5: Personalize Your Gift
                  </h2>
                  <p className="text-xs text-[#788269] mt-1 font-light">
                    Select styling tones and pen a heartfelt message for the recipient.
                  </p>
                </div>

                {/* Color Selector */}
                <div>
                  <label className="block text-xs font-semibold text-[#303A2B] uppercase tracking-wider mb-2">
                    Primary Wrap Palette: <span className="text-[#788269]">{selectedColor}</span>
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {CUSTOM_BUILDER_OPTIONS.colors.map((c) => (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => setSelectedColor(c.name)}
                        className={`px-3 py-2 rounded-xl text-xs font-medium border flex items-center gap-2 transition-all ${
                          selectedColor === c.name
                            ? 'border-[#303A2B] bg-[#303A2B] text-[#FBF8F1]'
                            : 'border-[#D8C8A5] bg-[#FBF8F1] text-[#303A2B] hover:border-[#303A2B]'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/10"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span>{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Ribbon Choice */}
                <div>
                  <label className="block text-xs font-semibold text-[#303A2B] uppercase tracking-wider mb-2">
                    Satin Ribbon Accent
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {['Champagne Gold', 'Blush Pink', 'Sage Green', 'Botanical Green', 'Ivory White'].map((ribbon) => (
                      <button
                        key={ribbon}
                        type="button"
                        onClick={() => setSelectedRibbon(ribbon)}
                        className={`py-2 px-3 rounded-xl text-xs font-medium border transition-colors ${
                          selectedRibbon === ribbon
                            ? 'bg-[#303A2B] text-[#FBF8F1] border-[#303A2B]'
                            : 'bg-[#FBF8F1] text-[#303A2B] border-[#D8C8A5] hover:border-[#303A2B]'
                        }`}
                      >
                        {ribbon}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Recipient Name */}
                <div>
                  <label className="block text-xs font-semibold text-[#303A2B] uppercase tracking-wider mb-1.5">
                    Recipient’s Name
                  </label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="E.g., Fatima Zahra, Usman, Mama..."
                    className="w-full px-4 py-2.5 bg-[#FBF8F1] border border-[#D8C8A5] rounded-xl text-xs text-[#303A2B] focus:outline-none focus:ring-1 focus:ring-[#303A2B]"
                  />
                </div>

                {/* Handwritten Card Message */}
                <div>
                  <label className="block text-xs font-semibold text-[#303A2B] uppercase tracking-wider mb-1.5">
                    Handwritten Calligraphy Card Message
                  </label>
                  <textarea
                    rows={3}
                    value={cardMessage}
                    onChange={(e) => setCardMessage(e.target.value)}
                    placeholder="Write your personal words here. We transcribe it lovingly on gold-embossed card stock..."
                    className="w-full px-4 py-2.5 bg-[#FBF8F1] border border-[#D8C8A5] rounded-xl text-xs text-[#303A2B] focus:outline-none focus:ring-1 focus:ring-[#303A2B]"
                  />
                </div>

                {/* Special Instructions */}
                <div>
                  <label className="block text-xs font-semibold text-[#303A2B] uppercase tracking-wider mb-1.5">
                    Special Delivery or Floral Styling Notes (Optional)
                  </label>
                  <input
                    type="text"
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    placeholder="E.g., Surprise delivery in Cantt Sialkot after 6 PM, add extra baby's breath"
                    className="w-full px-4 py-2.5 bg-[#FBF8F1] border border-[#D8C8A5] rounded-xl text-xs text-[#303A2B] focus:outline-none focus:ring-1 focus:ring-[#303A2B]"
                  />
                </div>
              </div>
            )}

            {/* STEP 6: REVIEW */}
            {activeStep === 6 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#303A2B]">
                    Step 6: Review Your Handmade Creation
                  </h2>
                  <p className="text-xs text-[#788269] mt-1 font-light">
                    Every piece is crafted by our artisans in Sialkot according to your exact choices.
                  </p>
                </div>

                <div className="bg-[#F7F1E7]/70 rounded-2xl p-5 border border-[#D8C8A5]/40 space-y-4 text-xs">
                  <div className="flex justify-between items-start pb-3 border-b border-[#D8C8A5]/30">
                    <div>
                      <span className="font-semibold text-[#303A2B] text-sm block">
                        Base: {selectedBase.name}
                      </span>
                      <span className="text-[#788269] text-[11px]">
                        Wrap: {selectedColor} · Ribbon: {selectedRibbon}
                      </span>
                    </div>
                    <span className="font-mono font-bold text-[#303A2B]">
                      {BRAND_CONFIG.currency.format(selectedBase.price)}
                    </span>
                  </div>

                  {/* Flowers Summary */}
                  <div>
                    <h4 className="font-semibold text-[#303A2B] uppercase tracking-wider text-[11px] mb-2">
                      Selected Blooms:
                    </h4>
                    <div className="space-y-1.5 pl-2">
                      {Object.keys(flowerQuantities).length === 0 ? (
                        <p className="text-[#788269] italic">No flowers added</p>
                      ) : (
                        Object.entries(flowerQuantities).map(([id, qty]) => {
                          const f = CUSTOM_BUILDER_OPTIONS.flowers.find(item => item.id === id);
                          if (!f) return null;
                          return (
                            <div key={id} className="flex justify-between text-[#788269]">
                              <span>{f.name} (x{qty})</span>
                              <span className="font-mono text-[#303A2B]">
                                {BRAND_CONFIG.currency.format(f.price * qty)}
                              </span>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                  {/* Treats Summary */}
                  <div className="pt-2 border-t border-[#D8C8A5]/20">
                    <h4 className="font-semibold text-[#303A2B] uppercase tracking-wider text-[11px] mb-2">
                      Gourmet Treats:
                    </h4>
                    <div className="space-y-1.5 pl-2">
                      {Object.keys(treatQuantities).length === 0 ? (
                        <p className="text-[#788269] italic">No treats added</p>
                      ) : (
                        Object.entries(treatQuantities).map(([id, qty]) => {
                          const t = CUSTOM_BUILDER_OPTIONS.treats.find(item => item.id === id);
                          if (!t) return null;
                          return (
                            <div key={id} className="flex justify-between text-[#788269]">
                              <span>{t.name} (x{qty})</span>
                              <span className="font-mono text-[#303A2B]">
                                {BRAND_CONFIG.currency.format(t.price * qty)}
                              </span>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                  {/* Accessories */}
                  <div className="pt-2 border-t border-[#D8C8A5]/20">
                    <h4 className="font-semibold text-[#303A2B] uppercase tracking-wider text-[11px] mb-2">
                      Accessories & Keepsakes:
                    </h4>
                    <div className="space-y-1.5 pl-2">
                      {selectedAccessories.length === 0 ? (
                        <p className="text-[#788269] italic">No accessories</p>
                      ) : (
                        selectedAccessories.map((id) => {
                          const a = CUSTOM_BUILDER_OPTIONS.accessories.find(item => item.id === id);
                          if (!a) return null;
                          return (
                            <div key={id} className="flex justify-between text-[#788269]">
                              <span>{a.name}</span>
                              <span className="font-mono text-[#303A2B]">
                                {BRAND_CONFIG.currency.format(a.price)}
                              </span>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                  {/* Personalization Note */}
                  {(recipientName || cardMessage) && (
                    <div className="pt-3 border-t border-[#D8C8A5]/30 bg-white/70 p-3 rounded-xl">
                      {recipientName && (
                        <p className="text-[#303A2B] font-medium">
                          Recipient: <span className="font-semibold">{recipientName}</span>
                        </p>
                      )}
                      {cardMessage && (
                        <p className="text-[#788269] italic mt-1 font-serif text-sm">
                          "{cardMessage}"
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <p className="text-[11px] text-[#788269] italic text-center">
                  {SAMPLE_DATA_NOTICE}
                </p>
              </div>
            )}

            {/* Step Navigation Controls */}
            <div className="pt-6 border-t border-[#D8C8A5]/40 flex items-center justify-between">
              {activeStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setActiveStep(activeStep - 1)}
                  className="px-4 py-2.5 rounded-xl border border-[#D8C8A5] text-[#303A2B] text-xs font-medium hover:bg-[#F7F1E7] transition-colors flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2.5 rounded-xl text-[#788269] hover:text-[#303A2B] text-xs font-medium transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All</span>
                </button>
              )}

              {activeStep < 6 ? (
                <button
                  type="button"
                  onClick={() => setActiveStep(activeStep + 1)}
                  className="px-6 py-2.5 rounded-xl bg-[#303A2B] text-[#FBF8F1] text-xs font-semibold hover:bg-[#788269] transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <a
                    href={getCustomGiftWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl border border-[#788269] text-[#303A2B] text-xs font-semibold hover:bg-[#EBF0E6] transition-colors flex items-center gap-1.5"
                  >
                    <MessageCircle className="w-4 h-4 text-[#303A2B]" />
                    <span>WhatsApp Order</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleAddCustomGiftToCart}
                    className="px-6 py-2.5 rounded-xl bg-[#303A2B] text-[#FBF8F1] text-xs font-semibold hover:bg-[#788269] transition-colors flex items-center gap-1.5 shadow-md"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#D8C8A5]" />
                    <span>Add to Bag</span>
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* Live Creation Preview & Price Card (Col 5) */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-[#D8C8A5]/50 p-6 shadow-sm sticky top-28 space-y-5">
            
            <div className="flex items-center justify-between pb-4 border-b border-[#D8C8A5]/30">
              <h3 className="font-serif text-lg font-bold text-[#303A2B]">
                Your Bespoke Creation
              </h3>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#788269]">
                Live Calculation
              </span>
            </div>

            {/* Visual Image Preview */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#F7F1E7] border border-[#D8C8A5]/40">
              <SafeImage
                src={selectedBase.image}
                alt={selectedBase.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                <span className="text-[11px] tracking-widest uppercase font-mono text-[#D8C8A5]">
                  {selectedColor} Palette
                </span>
                <span className="font-serif text-lg font-semibold leading-tight">
                  {selectedBase.name}
                </span>
              </div>
            </div>

            {/* Live Pricing Breakdown */}
            <div className="space-y-2 text-xs border-b border-[#D8C8A5]/30 pb-4">
              <div className="flex justify-between text-[#788269]">
                <span>Base ({selectedBase.name})</span>
                <span className="font-mono text-[#303A2B] tabular-nums">
                  {BRAND_CONFIG.currency.format(basePrice)}
                </span>
              </div>
              <div className="flex justify-between text-[#788269]">
                <span>Floral Elements</span>
                <span className="font-mono text-[#303A2B] tabular-nums">
                  {BRAND_CONFIG.currency.format(flowersTotal)}
                </span>
              </div>
              <div className="flex justify-between text-[#788269]">
                <span>Gourmet Treats</span>
                <span className="font-mono text-[#303A2B] tabular-nums">
                  {BRAND_CONFIG.currency.format(treatsTotal)}
                </span>
              </div>
              <div className="flex justify-between text-[#788269]">
                <span>Accessories & Card</span>
                <span className="font-mono text-[#303A2B] tabular-nums">
                  {BRAND_CONFIG.currency.format(accessoriesTotal)}
                </span>
              </div>
              
              <div className="pt-2 flex justify-between text-base font-bold text-[#303A2B]">
                <span>Estimated Total</span>
                <span className="font-mono text-xl tabular-nums">
                  {BRAND_CONFIG.currency.format(customGiftTotal)}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={handleAddCustomGiftToCart}
                className="w-full py-3 rounded-xl bg-[#303A2B] text-[#FBF8F1] text-xs font-bold uppercase tracking-wider hover:bg-[#788269] transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <ShoppingBag className="w-4 h-4 text-[#D8C8A5]" />
                <span>Add Creation to Bag</span>
              </button>

              <a
                href={getCustomGiftWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl border border-[#788269] text-[#303A2B] text-xs font-semibold tracking-wide hover:bg-[#EBF0E6] transition-colors flex items-center justify-center gap-2 text-center"
              >
                <MessageCircle className="w-4 h-4 text-[#303A2B]" />
                <span>Order Custom Gift on WhatsApp</span>
              </a>
            </div>

            <p className="text-[11px] text-center text-[#788269]">
              Free delivery in Sialkot applies on orders above Rs. 6,000.
            </p>

          </div>

        </div>

      </div>
    </div>
  );
};
