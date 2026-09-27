import React, { useState } from 'react';
import { AppTab, UserPersona, SupportedLanguage, DeviceAssessment, RecoveredPart, CartItem, Order } from './types';
import { INITIAL_ASSOCIATES, INITIAL_ASSESSMENTS, INITIAL_PARTS, INITIAL_ORDERS } from './data/mockData';
import { TRANSLATIONS, SUPPORTED_LANGUAGES } from './data/translations';
import { Navbar } from './components/Navbar';
import { Hero } from './components/landing/Hero';
import { CoreProblemSection } from './components/landing/CoreProblemSection';
import { HowItWorksSection } from './components/landing/HowItWorksSection';
import { CircularEconomySection } from './components/landing/CircularEconomySection';
import { WhyEco2Fixx } from './components/landing/WhyEco2Fixx';
import { BusinessModelSection } from './components/landing/BusinessModelSection';
import { TrustSafetySection } from './components/landing/TrustSafetySection';
import { FinalVisionSection } from './components/landing/FinalVisionSection';
import { SellDeviceFlow } from './components/customer/SellDeviceFlow';
import { AssociateDashboard } from './components/associate/AssociateDashboard';
import { MarketplaceView } from './components/marketplace/MarketplaceView';
import { CartCheckoutDrawer } from './components/marketplace/CartCheckoutDrawer';
import { InteractiveTourModal } from './components/InteractiveTourModal';
import { OrderTrackingModal } from './components/common/OrderTrackingModal';
import { Footer } from './components/Footer';
import { PhoneCall, MessageSquare, Volume2, ShieldCheck, CheckCircle2, ArrowRight, Store, ShoppingBag, Sparkles, MapPin, Truck } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('overview');
  const [currentPersona, setCurrentPersona] = useState<UserPersona>('seller');
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('en');
  const [associates] = useState(INITIAL_ASSOCIATES);
  const [inboundDevices, setInboundDevices] = useState<DeviceAssessment[]>(INITIAL_ASSESSMENTS);
  const [parts, setParts] = useState<RecoveredPart[]>(INITIAL_PARTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [trackingOrderId, setTrackingOrderId] = useState('ORD-849201');
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);

  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
  const isHindi = currentLanguage === 'hi';

  const handleOpenTracking = (orderId?: string) => {
    if (orderId) {
      setTrackingOrderId(orderId);
    }
    setIsTrackingOpen(true);
  };

  const handleToggleVoice = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsVoiceEnabled((prev) => !prev);
  };

  // Voice Assistant Speech Synthesis for accessibility / low literacy
  const handleVoiceSpeak = () => {
    if (!isVoiceEnabled) return;

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      let text = '';
      if (currentPersona === 'seller') {
        text = t.voicePromptSeller || t.voicePromptSeller;
      } else if (currentPersona === 'associate_a') {
        text = t.voicePromptAssociateA;
      } else if (currentPersona === 'associate_b') {
        text = t.voicePromptAssociateB;
      } else if (currentPersona === 'buyer') {
        text = t.voicePromptBuyer;
      } else {
        text = t.voicePromptExecutive;
      }

      const langObj = SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage) || SUPPORTED_LANGUAGES[0];
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.92;
      utterance.lang = langObj.speechLang;
      window.speechSynthesis.speak(utterance);
    }
  };

  // When Customer A submits a damaged device, it enters the inbound pool for local Associates
  const handleDeviceRegistered = (newAssessment: DeviceAssessment) => {
    setInboundDevices((prev) => [newAssessment, ...prev]);
  };

  // When Associate purchases a device from Customer A
  const handlePurchaseDevice = (deviceId: string, negotiatedPrice: number) => {
    const dev = inboundDevices.find((d) => d.id === deviceId);
    if (!dev) return;

    // Remove from inbound devices
    setInboundDevices((prev) => prev.filter((d) => d.id !== deviceId));

    // Convert recoverable modules into Associate's active inventory
    const getCompImage = (cat: string) => {
      const c = cat.toLowerCase();
      if (c.includes('camera')) return 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=600&q=80';
      if (c.includes('display') || c.includes('screen')) return 'https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=600&q=80';
      if (c.includes('logic') || c.includes('motherboard') || c.includes('board')) return 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80';
      if (c.includes('battery')) return 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=600&q=80';
      return 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=600&q=80';
    };

    const newRecoveredParts: RecoveredPart[] = dev.components.map((comp, idx) => {
      const price = comp.estimatedValueMin + Math.round((comp.estimatedValueMax - comp.estimatedValueMin) * 0.5);
      return {
        id: `rec-${Date.now()}-${idx}`,
        title: `OEM ${comp.name} (Diagnostic Tested)`,
        deviceModel: dev.deviceTitle,
        brand: dev.brand,
        category: comp.category,
        condition: comp.recoveryPotential === 'High' ? 'Grade A - Like New' : 'Grade B - Good',
        testStatus: 'Diagnostic Passed',
        price,
        originalPrice: Math.round(price * 2.4),
        warranty: '3 Months',
        deliveryDays: 1,
        listingStatus: 'available_marketplace',
        targetAudience: 'both',
        associateId: dev.recommendedAssociateId,
        associateName: 'Metro Logic Board Lab',
        associateRating: 4.9,
        compatibility: [dev.deviceTitle],
        imageUrl: getCompImage(comp.category),
        inStock: 1,
        sourceDeviceId: dev.id,
        rating: 4.9,
        reviewCount: 12,
        badge: 'Newly Salvaged OEM'
      };
    });

    setParts((prev) => [...newRecoveredParts, ...prev]);
  };

  // Associate toggling component allocation: Offline Repair vs Eco2Fixx Marketplace
  const handleUpdatePartStatus = (
    partId: string,
    status: 'available_marketplace' | 'used_offline',
    audience: 'both' | 'b2b_only' | 'b2c_only'
  ) => {
    setParts((prev) =>
      prev.map((p) =>
        p.id === partId ? { ...p, listingStatus: status, targetAudience: audience } : p
      )
    );
  };

  // Cart operations
  const handleAddToCart = (part: RecoveredPart) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.part.id === part.id);
      if (existing) {
        return prev.map((item) =>
          item.part.id === part.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { part, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleInstantBuy = (part: RecoveredPart) => {
    setCart([{ part, quantity: 1 }]);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (partId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.part.id === partId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (partId: string) => {
    setCart((prev) => prev.filter((item) => item.part.id !== partId));
  };

  const handleOrderCompleted = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onStartTour={() => setIsTourOpen(true)}
        cartCount={cart.reduce((acc, i) => acc + i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        currentPersona={currentPersona}
        onPersonaChange={(p) => {
          setCurrentPersona(p);
          // Stay on the starting page ('overview') so the UI adapts dynamically for this user!
          setActiveTab('overview');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentLanguage={currentLanguage}
        onSelectLanguage={(lang) => {
          setCurrentLanguage(lang);
        }}
        onVoiceSpeak={handleVoiceSpeak}
        onOpenTracking={handleOpenTracking}
        isVoiceEnabled={isVoiceEnabled}
        onToggleVoice={handleToggleVoice}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'overview' && (
          <div className="space-y-0">
            {/* Dynamic Hero that adapts per user role */}
            <Hero
              onNavigate={(tab) => {
                setActiveTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onStartTour={() => setIsTourOpen(true)}
              currentPersona={currentPersona}
              onSelectPersona={setCurrentPersona}
              currentLanguage={currentLanguage}
              isHindi={isHindi}
              onVoiceSpeak={handleVoiceSpeak}
            />

            {/* DYNAMIC STARTING PAGE BODY ACCORDING TO USER ROLE */}

            {/* --- FOR SELLER PERSONA --- */}
            {currentPersona === 'seller' && (
              <div className="bg-white py-10 space-y-12">
                {/* 1. Comparison: Local Scrap vs Eco2Fixx Verified Shop */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-slate-50 border border-emerald-200 rounded-3xl p-6 sm:p-8 shadow-sm">
                    <div className="text-center max-w-2xl mx-auto space-y-2 mb-6">
                      <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider">
                        {isHindi ? 'पैसे का अंतर समझें' : 'Smart Owner vs Scrap Dealer'}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
                        {isHindi
                          ? 'कबाड़ी को ₹200 में न बेचें, असली कीमत पाएं'
                          : 'Do Not Sell for ₹200 to Scrap Buyers'}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600">
                        {isHindi
                          ? 'जब स्क्रीन टूटती है, तब भी 85% पुर्जे जैसे कैमरा, मदरबोर्ड और बैटरी एकदम सही होते हैं।'
                          : 'Even with a shattered screen, internal OEM camera sensors, logic boards, and batteries are fully functional.'}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                      {/* Old Scrap Way */}
                      <div className="bg-white/80 border border-rose-200 rounded-2xl p-5 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-lg">
                            {isHindi ? 'कबाड़ी / लोकल रद्दी' : 'Traditional Scrap / Local Dealer'}
                          </span>
                          <span className="text-xl font-black text-rose-600 line-through">₹200 – ₹300</span>
                        </div>
                        <ul className="text-xs text-slate-600 space-y-2">
                          <li className="flex items-center gap-2 text-rose-600">
                            ✕ {isHindi ? 'बिना जांच किए रद्दी का भाव देते हैं' : 'Treated as dead junk weight'}
                          </li>
                          <li className="flex items-center gap-2 text-rose-600">
                            ✕ {isHindi ? 'काम कर रहे कैमरा व बोर्ड का कोई पैसा नहीं' : 'Zero compensation for working OEM parts'}
                          </li>
                          <li className="flex items-center gap-2 text-rose-600">
                            ✕ {isHindi ? 'कचरे में जाकर पर्यावरण को नुकसान' : 'Dumps electronic toxic e-waste in landfills'}
                          </li>
                        </ul>
                      </div>

                      {/* Eco2Fixx Way */}
                      <div className="bg-white border-2 border-emerald-500 rounded-2xl p-5 space-y-3 shadow-md relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-emerald-600 text-white font-black text-[10px] px-3 py-0.5 rounded-bl-lg uppercase tracking-wider">
                          10x {isHindi ? 'ज्यादा पैसा' : 'Higher Value'}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-lg">
                            Eco2Fixx {isHindi ? 'सत्यापित रिपेयर दुकान' : 'Verified Partner Shop'}
                          </span>
                          <span className="text-2xl font-black text-emerald-700 font-mono">₹3,400 – ₹5,200</span>
                        </div>
                        <ul className="text-xs text-slate-700 space-y-2 font-medium">
                          <li className="flex items-center gap-2 text-emerald-700">
                            ✓ {isHindi ? 'कैमरा, बोर्ड और बैटरी के अलग-अलग पैसे' : 'Fair diagnostic valuation of working modules'}
                          </li>
                          <li className="flex items-center gap-2 text-emerald-700">
                            ✓ {isHindi ? 'नजदीकी दुकान पर तुरंत कैश या UPI' : 'Instant physical inspection & cash payout'}
                          </li>
                          <li className="flex items-center gap-2 text-emerald-700">
                            ✓ {isHindi ? 'सुरक्षित डेटा वाइप व 100% पर्यावरण संरक्षण' : 'Certified data reset & circular reuse'}
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                      <button
                        onClick={() => setActiveTab('sell-device')}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                      >
                        <span>{isHindi ? 'अपने फोन की कीमत जांचें और बेचें' : 'Check My Phone Price & Sell'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <a
                        href="https://wa.me/919392532390?text=Hello%20Eco2Fixx,%20I%20have%20a%20broken%20phone%20to%20sell"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs px-5 py-3 rounded-xl shadow-xs transition-all flex items-center gap-2"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>WhatsApp Photo: 9392532390</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* 2. Recently Bought Phones with Cash Paid Out (Market Realism) */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-black text-slate-900 font-display">
                          {isHindi ? 'हाल ही में ग्राहकों से खरीदे गए फोन' : 'Live Damaged Devices Recently Purchased from Owners'}
                        </h4>
                        <p className="text-xs text-slate-500">
                          {isHindi ? 'ग्राहकों को सीधे उनकी नजदीकी दुकान पर मिला कैश भुगतान' : 'Actual verified cash paid by local associate repair workshops'}
                        </p>
                      </div>
                      <span className="hidden sm:inline text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                        ● Live Verified Payouts
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-3">
                        <img
                          src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=200&q=80"
                          alt="iPhone 13"
                          className="w-16 h-16 rounded-xl object-cover border border-slate-200"
                        />
                        <div className="space-y-1">
                          <div className="text-xs font-bold text-slate-900">Apple iPhone 13 (Cracked)</div>
                          <div className="text-[11px] text-slate-500">Sold at Metro Logic Lab, MG Road</div>
                          <div className="text-sm font-black text-emerald-700 font-mono">₹3,400 Paid in Cash</div>
                        </div>
                      </div>

                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-3">
                        <img
                          src="https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=200&q=80"
                          alt="Galaxy S22"
                          className="w-16 h-16 rounded-xl object-cover border border-slate-200"
                        />
                        <div className="space-y-1">
                          <div className="text-xs font-bold text-slate-900">Samsung Galaxy S22 (Back Glass)</div>
                          <div className="text-[11px] text-slate-500">Sold at Apex Tech, Koramangala</div>
                          <div className="text-sm font-black text-emerald-700 font-mono">₹2,800 Paid via UPI</div>
                        </div>
                      </div>

                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-3">
                        <img
                          src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=200&q=80"
                          alt="OnePlus 11"
                          className="w-16 h-16 rounded-xl object-cover border border-slate-200"
                        />
                        <div className="space-y-1">
                          <div className="text-xs font-bold text-slate-900">OnePlus 11 5G (Display Bleed)</div>
                          <div className="text-[11px] text-slate-500">Sold at Indiranagar Lab</div>
                          <div className="text-sm font-black text-emerald-700 font-mono">₹3,100 Paid in Cash</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <TrustSafetySection />
              </div>
            )}

            {/* --- FOR ASSOCIATE A PERSONA --- */}
            {currentPersona === 'associate_a' && (
              <div className="bg-white py-10 space-y-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                  {/* Shop Margin Simulator */}
                  <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                      <div>
                        <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                          Associate A Unit Economics Simulator
                        </span>
                        <h3 className="text-2xl font-black text-white font-display">
                          How Repair Shops Double Their Gross Margin
                        </h3>
                      </div>
                      <button
                        onClick={() => setActiveTab('associate-hub')}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs flex items-center gap-2 cursor-pointer self-start md:self-auto"
                      >
                        <Store className="w-4 h-4" />
                        <span>Open Partner Workbench</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                      <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
                        <div className="text-slate-400">Step 1: Buy Damaged Phone</div>
                        <div className="text-lg font-black text-rose-400 font-mono">- ₹3,400</div>
                        <div className="text-[11px] text-slate-400">Customer walk-in iPhone 13</div>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
                        <div className="text-slate-400">Step 2: Harvest Usable OEM Modules</div>
                        <div className="text-lg font-black text-emerald-400 font-mono">+ 4 Modules</div>
                        <div className="text-[11px] text-slate-400">Display, Dual Cam, Battery, Board</div>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
                        <div className="text-slate-400">Step 3: Component Value Realized</div>
                        <div className="text-lg font-black text-emerald-400 font-mono">₹6,798</div>
                        <div className="text-[11px] text-slate-400">Offline repair or online sales</div>
                      </div>

                      <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-600/50 space-y-1">
                        <div className="text-emerald-400 font-bold">Net Shop Profit (Per Device)</div>
                        <div className="text-xl font-black text-emerald-300 font-mono">+ ₹3,398</div>
                        <div className="text-[11px] text-emerald-400">99.9% Gross ROI on Acquisition</div>
                      </div>
                    </div>
                  </div>
                </div>

                <BusinessModelSection />
              </div>
            )}

            {/* --- FOR ASSOCIATE B PERSONA --- */}
            {currentPersona === 'associate_b' && (
              <div className="bg-white py-10 space-y-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 font-display">
                        High-Demand Bench-Tested Spares for Repair Shops
                      </h3>
                      <p className="text-xs text-slate-500">
                        100% genuine pulled OEM components with 3-month technician warranty and GST input credit
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab('marketplace')}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors cursor-pointer"
                    >
                      View All Wholesale Spares →
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {parts.slice(0, 3).map((part) => (
                      <div key={part.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                        <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-200">
                          <img src={part.imageUrl} alt={part.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="text-xs font-bold text-slate-900">{part.title}</div>
                        <div className="flex items-baseline justify-between">
                          <span className="text-lg font-black text-slate-900 font-mono">₹{part.price}</span>
                          <span className="text-xs text-slate-400 line-through">₹{part.originalPrice}</span>
                        </div>
                        <button
                          onClick={() => handleAddToCart(part)}
                          className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                        >
                          Order for Shop (B2B)
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <TrustSafetySection />
              </div>
            )}

            {/* --- FOR BUYER PERSONA --- */}
            {currentPersona === 'buyer' && (
              <div className="bg-white py-10 space-y-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 font-display">
                        Tested Original Replacement Parts - Save 70%
                      </h3>
                      <p className="text-xs text-slate-500">
                        Don't pay exorbitant brand service center rates. Authentic tested parts with 7-day easy returns.
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab('marketplace')}
                      className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors cursor-pointer"
                    >
                      Browse Catalog →
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    {parts.slice(0, 4).map((part) => (
                      <div key={part.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2.5">
                        <div className="aspect-square rounded-xl overflow-hidden bg-slate-200">
                          <img src={part.imageUrl} alt={part.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="text-xs font-bold text-slate-900 truncate">{part.title}</div>
                        <div className="flex items-center justify-between">
                          <span className="text-base font-black text-emerald-700 font-mono">₹{part.price}</span>
                          <span className="text-[10px] text-slate-400 line-through">₹{part.originalPrice}</span>
                        </div>
                        <button
                          onClick={() => handleInstantBuy(part)}
                          className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
                        >
                          Buy Now
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <WhyEco2Fixx />
              </div>
            )}

            {/* --- FOR EXECUTIVE / 360° TOUR PERSONA --- */}
            {currentPersona === 'executive' && (
              <>
                <CoreProblemSection />
                <HowItWorksSection
                  onNavigate={(tab) => {
                    setActiveTab(tab);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
                <CircularEconomySection />
                <WhyEco2Fixx />
                <BusinessModelSection />
                <TrustSafetySection />
                <FinalVisionSection
                  onNavigate={(tab) => {
                    setActiveTab(tab);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onStartTour={() => setIsTourOpen(true)}
                />
              </>
            )}
          </div>
        )}

        {activeTab === 'sell-device' && (
          <SellDeviceFlow
            associates={associates}
            onDeviceRegistered={handleDeviceRegistered}
            onNavigateToAssociate={(ascId) => {
              setActiveTab('associate-hub');
              setCurrentPersona('associate_a');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'associate-hub' && (
          <AssociateDashboard
            currentAssociate={associates[0]}
            inboundDevices={inboundDevices}
            inventory={parts}
            onPurchaseDevice={handlePurchaseDevice}
            onUpdatePartStatus={handleUpdatePartStatus}
            onNavigateToMarketplace={() => {
              setActiveTab('marketplace');
              setCurrentPersona('associate_b');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'marketplace' && (
          <MarketplaceView
            parts={parts}
            onAddToCart={handleAddToCart}
            onInstantBuy={handleInstantBuy}
          />
        )}

        {activeTab === 'business-model' && (
          <div className="py-8">
            <BusinessModelSection />
            <CircularEconomySection />
            <TrustSafetySection />
          </div>
        )}
      </main>

      {/* Floating Low-Literacy / Helpline Quick Contact Widget */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
        <button
          onClick={handleVoiceSpeak}
          className="flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-3.5 py-2.5 rounded-full shadow-lg border border-emerald-500 transition-all hover:scale-105 cursor-pointer"
          title="Play voice explanation"
        >
          <Volume2 className="w-4 h-4 animate-bounce" />
          <span className="hidden sm:inline">{t.voiceGuide}</span>
        </button>

        <a
          href="https://wa.me/919392532390?text=Hello%20Eco2Fixx,%20I%20need%20assistance"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs px-3.5 py-2.5 rounded-full shadow-lg border border-emerald-400 transition-all hover:scale-105"
          title="WhatsApp Helpline"
        >
          <MessageSquare className="w-4 h-4" />
          <span className="hidden md:inline">WhatsApp</span>
        </a>

        <a
          href="tel:9392532390"
          className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-full shadow-lg border border-slate-700 transition-all hover:scale-105"
          title="Call Support"
        >
          <PhoneCall className="w-4 h-4 text-emerald-400" />
          <span className="font-bold">+91 9392532390</span>
        </a>
      </div>

      {/* Footer */}
      <Footer
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onStartTour={() => setIsTourOpen(true)}
        onOpenTracking={handleOpenTracking}
      />

      {/* 60s Product Tour Modal */}
      <InteractiveTourModal
        isOpen={isTourOpen}
        onClose={() => setIsTourOpen(false)}
        onNavigateToTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Shopping Cart & Checkout Drawer */}
      <CartCheckoutDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onOrderCompleted={handleOrderCompleted}
        onOpenTracking={handleOpenTracking}
      />

      {/* Live Order & Repair Tracking Modal */}
      <OrderTrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
        orders={orders}
        initialOrderId={trackingOrderId}
        isHindi={isHindi}
      />
    </div>
  );
}
