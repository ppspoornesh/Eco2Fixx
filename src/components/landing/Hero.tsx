import React, { useState } from 'react';
import { AppTab, UserPersona, SupportedLanguage } from '../../types';
import { ArrowRight, ShieldCheck, RefreshCw, Cpu, Store, Tag, Sparkles, ChevronRight, CheckCircle2, MapPin, Plus, Search, ShoppingBag, Truck, Award, Volume2, ShoppingCart, ArrowUpRight, DollarSign, Package, MessageSquare, PhoneCall, Check, Smartphone, Droplets, Layers, PowerOff } from 'lucide-react';
import { HeroCircularFlowVisual } from '../common/HeroCircularFlowVisual';
import workshopImg from '../../assets/images/associate_repair_workshop_1790419255786.avif';

interface HeroProps {
  onNavigate: (tab: AppTab) => void;
  onStartTour: () => void;
  currentPersona: UserPersona;
  onSelectPersona: (persona: UserPersona) => void;
  currentLanguage?: SupportedLanguage;
  isHindi?: boolean;
  onVoiceSpeak?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onNavigate,
  onStartTour,
  currentPersona,
  onSelectPersona,
  isHindi,
  onVoiceSpeak
}) => {
  const [selectedBrand, setSelectedBrand] = useState('Apple');
  const [selectedModel, setSelectedModel] = useState('iPhone 13 (128GB)');
  const [selectedDamage, setSelectedDamage] = useState('Cracked Screen');

  const BRANDS = ['Apple', 'Samsung', 'OnePlus', 'Xiaomi', 'Vivo / Oppo', 'Lenovo'];
  const MODELS: Record<string, string[]> = {
    Apple: ['iPhone 13 (128GB)', 'iPhone 12', 'iPhone 11', 'iPhone 14 Pro'],
    Samsung: ['Galaxy S22 5G', 'Galaxy S21', 'Galaxy A53', 'Galaxy Note 20'],
    OnePlus: ['OnePlus 11', 'OnePlus 10 Pro', 'OnePlus Nord 2T'],
    Xiaomi: ['Redmi Note 12 Pro', 'Mi 11X', 'Xiaomi 12 Pro'],
    'Vivo / Oppo': ['Vivo V27', 'Oppo Reno 8', 'Vivo X80'],
    Lenovo: ['ThinkPad X1 Carbon', 'ThinkPad T14', 'IdeaPad Slim 5']
  };

  const getEstimatedValue = () => {
    if (selectedBrand === 'Apple') return '₹3,200 – ₹4,800';
    if (selectedBrand === 'Samsung') return '₹2,500 – ₹3,800';
    if (selectedBrand === 'Lenovo') return '₹6,500 – ₹9,000';
    return '₹1,800 – ₹3,200';
  };

  return (
    <section className="bg-slate-50/50 border-b border-slate-200/90 pt-6 sm:pt-8 pb-12 sm:pb-16 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="rounded-[28px] border border-emerald-100 bg-white shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-50 via-white to-slate-50 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 text-slate-900 border-b border-emerald-100">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Eco2Fixx Circular Marketplace
                </div>
                <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight text-slate-900">
                  Choose what you want to do today
                </h1>
                <p className="text-sm text-slate-600 max-w-xl">
                  Sell a broken device, buy a tested spare part, or start a repair business with a simple process that is easy to understand and use.
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-left backdrop-blur-sm min-w-[180px] shadow-sm">
                <div className="text-[10px] uppercase tracking-[0.2em] text-emerald-700">Live platform</div>
                <div className="mt-1 text-xl font-black text-slate-900">4.9/5</div>
                <div className="text-[11px] text-emerald-700">Trust rating across partners</div>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3">
              {[
                {
                  id: 'seller' as UserPersona,
                  label: 'Seller',
                  description: 'Sell a damaged device',
                  benefit: 'Instant cash',
                  icon: Smartphone,
                  accent: 'bg-emerald-50 text-emerald-700 border-emerald-200'
                },
                {
                  id: 'associate_a' as UserPersona,
                  label: 'Associate',
                  description: 'Buy and repair devices',
                  benefit: 'Earn from recovery',
                  icon: Store,
                  accent: 'bg-slate-100 text-slate-800 border-slate-200'
                },
                {
                  id: 'associate_b' as UserPersona,
                  label: 'Wholesale',
                  description: 'Source tested OEM parts',
                  benefit: 'B2B inventory',
                  icon: ShoppingCart,
                  accent: 'bg-blue-50 text-blue-700 border-blue-200'
                },
                {
                  id: 'buyer' as UserPersona,
                  label: 'Buyer',
                  description: 'Buy spare parts',
                  benefit: 'Save up to 70%',
                  icon: ShoppingBag,
                  accent: 'bg-amber-50 text-amber-700 border-amber-200'
                },
                {
                  id: 'executive' as UserPersona,
                  label: 'Executive',
                  description: 'Explore the full flow',
                  benefit: 'Platform view',
                  icon: Sparkles,
                  accent: 'bg-violet-50 text-violet-700 border-violet-200'
                }
              ].map((persona) => {
                const Icon = persona.icon;
                const isSelected = currentPersona === persona.id;

                return (
                  <button
                    key={persona.id}
                    onClick={() => onSelectPersona(persona.id)}
                    className={`group relative rounded-2xl border text-left p-3.5 transition-all ${
                      isSelected
                        ? 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white border-emerald-500 shadow-lg ring-2 ring-emerald-200'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm text-slate-800'
                    }`}
                  >
                    <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl border ${isSelected ? 'bg-white/10 border-white/10 text-emerald-300' : persona.accent}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="mt-3">
                      <div className="text-[11px] font-bold uppercase tracking-[0.2em] opacity-70">{persona.label}</div>
                      <div className={`mt-1 text-base font-black ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                        {persona.description}
                      </div>
                    </div>
                    <div className={`mt-3 inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${
                      isSelected ? 'bg-emerald-500 text-slate-950' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {persona.benefit}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* =========================================================================
            DYNAMIC HERO ADAPTATION BASED ON USER PERSONA
           ========================================================================= */}

        {/* 1. SELLER PERSONA (Customer A - Damaged Device Owner) */}
        {currentPersona === 'seller' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch animate-in fade-in duration-300">
            {/* Left: Quick Sell Calculator Widget */}
            <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-3xl p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-6">
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-amber-900 bg-amber-50 border border-amber-200/80 px-3 py-1 rounded-full uppercase tracking-wider">
                    {isHindi ? 'तुरंत नकद बायआउट' : 'Direct Cash Buyout'}
                  </span>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>2,400+ {isHindi ? 'नजदीकी दुकानें' : 'Verified Shops'}</span>
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2.5 rounded-2xl border border-slate-200 bg-slate-50 p-2.5">
                  {[
                    { label: 'Trust', value: '100% Verified' },
                    { label: 'Payout', value: 'Same day' },
                    { label: 'Support', value: 'Live help' }
                  ].map((item) => (
                    <div key={item.label} className="rounded-xl bg-white border border-slate-200 px-2 py-2 text-center">
                      <div className="text-[9px] uppercase tracking-wider font-bold text-slate-500">{item.label}</div>
                      <div className="text-[11px] font-extrabold text-slate-900 mt-0.5">{item.value}</div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display tracking-tight leading-snug">
                    {isHindi ? 'टूटा हुआ फोन है? तुरंत नकद पैसे पाएं' : 'Got a Broken Phone? Get Direct Cash Payout.'}
                  </h2>
                  <button
                    onClick={onVoiceSpeak}
                    className="p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/80 shrink-0 ml-2 transition-colors cursor-pointer"
                    title="Audio Guidance"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {isHindi
                    ? 'कबाड़ी को ₹200 में न बेचें। आपके टूटे फोन के अंदर काम कर रहे कैमरा, बोर्ड और बैटरी के असली पैसे नजदीकी रिपेयर दुकान से पाएं।'
                    : 'Do not discard or sell to scrap collectors for ₹300. Verified local mobile shops buy your damaged device directly to salvage working internal OEM parts.'}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    {
                      title: '1. Select device',
                      detail: 'Choose brand and model',
                      accent: 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    },
                    {
                      title: '2. Share issue',
                      detail: 'Crack, water or no power',
                      accent: 'bg-amber-50 text-amber-800 border-amber-200'
                    },
                    {
                      title: '3. Get paid',
                      detail: 'Verified shop pays instantly',
                      accent: 'bg-sky-50 text-sky-800 border-sky-200'
                    }
                  ].map((step) => (
                    <div key={step.title} className={`rounded-xl border p-2.5 ${step.accent}`}>
                      <div className="text-[10px] font-black uppercase tracking-wider opacity-80">{step.title}</div>
                      <div className="text-[11px] font-semibold mt-0.5">{step.detail}</div>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-700">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Why this feels easy</span>
                  </div>
                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-slate-600">
                    <div className="bg-white border border-slate-200 rounded-lg px-2 py-1.5 shadow-sm">No hidden fees</div>
                    <div className="bg-white border border-slate-200 rounded-lg px-2 py-1.5 shadow-sm">Verified local shops</div>
                    <div className="bg-white border border-slate-200 rounded-lg px-2 py-1.5 shadow-sm">Cash or UPI payment</div>
                  </div>
                </div>

                <div className="rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-[1px] shadow-sm">
                  <div className="rounded-2xl bg-white/95 px-3 py-2.5 flex items-center justify-between gap-3">
                    <div>
                      <div className="text-[9px] uppercase tracking-wider font-bold text-slate-500">Customer confidence</div>
                      <div className="text-sm font-black text-slate-900">4.9/5 trust rating</div>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500">
                      <span>★★★★★</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 1, 2, 3 Visual Selector (Accessible for non-English speakers) */}
              <div className="space-y-4 bg-slate-50/80 p-5 rounded-2xl border border-slate-200 shadow-2xs">
                {/* Brand selection */}
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-2 uppercase tracking-wider">
                    {isHindi ? '1. फोन की कंपनी चुनें (Select Brand):' : '1. Select Brand:'}
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {BRANDS.map((b) => (
                      <button
                        key={b}
                        onClick={() => {
                          setSelectedBrand(b);
                          setSelectedModel(MODELS[b]?.[0] || 'Model');
                        }}
                        className={`px-3.5 py-1.5 text-xs rounded-xl font-bold border transition-all cursor-pointer ${
                          selectedBrand === b
                            ? 'bg-slate-900 text-white border-slate-900 shadow-xs ring-1 ring-slate-900/20'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Model selection */}
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1.5 uppercase tracking-wider">
                    {isHindi ? '2. फोन का मॉडल चुनें (Select Model):' : '2. Select Model:'}
                  </label>
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 shadow-2xs"
                  >
                    {(MODELS[selectedBrand] || []).map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                {/* Damage Condition Selector */}
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-2 uppercase tracking-wider">
                    {isHindi ? '3. क्या खराबी है? (Damage Type):' : '3. What is Damaged?:'}
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {[
                      {
                        en: 'Cracked Screen',
                        hi: 'स्क्रीन टूटी है',
                        icon: Smartphone,
                        detail: 'Display / Touch broken'
                      },
                      {
                        en: 'Liquid Damaged',
                        hi: 'पानी में गिरा',
                        icon: Droplets,
                        detail: 'Water / Liquid contact'
                      },
                      {
                        en: 'Back Glass Shattered',
                        hi: 'पीछे का शीशा टूटा',
                        icon: Layers,
                        detail: 'Rear panel damaged'
                      },
                      {
                        en: 'Won\'t Turn On',
                        hi: 'चालू नहीं हो रहा',
                        icon: PowerOff,
                        detail: 'Dead / No power'
                      }
                    ].map((dmg) => {
                      const IconComponent = dmg.icon;
                      const isSelected = selectedDamage === dmg.en;
                      return (
                        <button
                          key={dmg.en}
                          type="button"
                          onClick={() => setSelectedDamage(dmg.en)}
                          className={`relative p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-2 ${
                            isSelected
                              ? 'bg-emerald-50/90 text-emerald-950 border-emerald-500 font-bold shadow-2xs ring-1 ring-emerald-500/30'
                              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <div
                              className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                                isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500'
                              }`}
                            >
                              <IconComponent className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-xs font-bold truncate leading-tight">
                              {isHindi ? dmg.hi : dmg.en}
                            </span>
                          </div>

                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                              isSelected
                                ? 'border-emerald-600 bg-emerald-600 text-white'
                                : 'border-slate-300 bg-white'
                            }`}
                          >
                            {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Component Salvage Breakdown Preview */}
              <div className="bg-slate-50/90 rounded-2xl p-4 border border-slate-200/90 space-y-2 text-xs">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 uppercase tracking-wider pb-1 border-b border-slate-200">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>AI Component Salvage Valuation</span>
                  </span>
                  <span className="text-emerald-700 font-mono font-bold">94.8% Confidence</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2 bg-white rounded-xl border border-slate-200/70 flex justify-between items-center">
                    <span className="text-slate-600 font-medium">Rear Camera Unit:</span>
                    <strong className="text-slate-900 font-mono">₹1,400 – ₹2,200</strong>
                  </div>
                  <div className="p-2 bg-white rounded-xl border border-slate-200/70 flex justify-between items-center">
                    <span className="text-slate-600 font-medium">Motherboard (Unlocked):</span>
                    <strong className="text-slate-900 font-mono">₹1,800 – ₹3,200</strong>
                  </div>
                  <div className="p-2 bg-white rounded-xl border border-slate-200/70 flex justify-between items-center">
                    <span className="text-slate-600 font-medium">Battery & Haptics:</span>
                    <strong className="text-slate-900 font-mono">₹500 – ₹850</strong>
                  </div>
                  <div className="p-2 bg-white rounded-xl border border-slate-200/70 flex justify-between items-center">
                    <span className="text-slate-600 font-medium">Chassis / Mic Flex:</span>
                    <strong className="text-slate-900 font-mono">₹300 – ₹550</strong>
                  </div>
                </div>
              </div>

              {/* Instant Valuation & Payout Action */}
              <div className="pt-2 border-t border-slate-100 space-y-3.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-emerald-50/70 border border-emerald-300/80 p-4 rounded-2xl shadow-2xs">
                  <div>
                    <div className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider flex items-center gap-1">
                      <DollarSign className="w-3 h-3 text-emerald-700" />
                      <span>{isHindi ? 'दुकान से मिलने वाले नकद पैसे:' : 'Guaranteed Shop Cash Payout:'}</span>
                    </div>
                    <div className="text-2xl font-black text-emerald-800 font-mono tracking-tight mt-0.5">
                      {getEstimatedValue()}
                    </div>
                    <div className="text-[10px] text-emerald-700 font-medium">
                      {isHindi ? 'कच्चे कबाड़ी की तुलना में 12 गुना अधिक' : 'vs ₹300 street scrap dealer value (12x higher)'}
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigate('sell-device')}
                    className="bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-extrabold text-xs px-5 py-3 rounded-xl shadow-xs hover:shadow transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
                  >
                    <span>{isHindi ? 'दुकान पर जाएं और कैश लें' : 'Find Nearby Shop Payout'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Direct WhatsApp Quote for low literacy / quick action */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 border-t border-slate-100">
                  <a
                    href="https://wa.me/919392532390?text=Hello%20Eco2Fixx,%20I%20want%20to%20sell%20my%20broken%20device.%20Here%20is%20the%20photo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs py-2.5 px-3.5 rounded-xl shadow-2xs hover:shadow transition-all"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp Photo: 9392532390</span>
                  </a>

                  <a
                    href="tel:9392532390"
                    className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2.5 px-3.5 rounded-xl shadow-2xs hover:shadow transition-all"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Technician Hotline: +91 9392532390</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Seller Assurance & Map/Shop Match Preview */}
            <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-3xl p-7 sm:p-9 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/80">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{isHindi ? '100% सुरक्षित और पारदर्शी' : 'NIST 800-88 Data Wipe Guaranteed'}</span>
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {isHindi ? 'नकद भुगतान सीधे दुकान पर' : '● 2,450+ Verified Repair Labs Active'}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-display leading-[1.15]">
                  {isHindi
                    ? 'आपका टूटा हुआ फोन बेकार नहीं है।'
                    : 'Your Damaged Phone Is Not Electronic Scrap.'}
                </h1>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                  {isHindi
                    ? 'जब स्क्रीन टूटती है, तब भी 85% अंदरूनी पुर्जे (कैमरा, मदरबोर्ड, बैटरी, स्पीकर) बिल्कुल सही काम कर रहे होते हैं। Eco2Fixx आपको नजदीकी रिपेयर दुकानों से जोड़ता है जो इसे खरीदकर रिपेयर में काम लेते हैं।'
                    : 'A shattered glass panel does not mean dead hardware. Internal OEM cameras, logic processors, batteries, and acoustic modules remain fully functional. Verified local technicians buy your device directly and repurpose these genuine components.'}
                </p>
              </div>

              {/* 3 Simple Visual Steps */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
                <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-1.5 shadow-2xs">
                  <div className="w-7 h-7 rounded-xl bg-emerald-600 text-white text-xs font-black flex items-center justify-center shadow-2xs">1</div>
                  <div className="text-xs font-bold text-slate-900">{isHindi ? 'मॉडल और खराबी बताएं' : 'Select Phone & Damage'}</div>
                  <div className="text-[11px] text-slate-500 leading-snug">{isHindi ? 'AI तुरंत सही कीमत बताएगा' : 'Instant AI modular salvage valuation'}</div>
                </div>

                <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-1.5 shadow-2xs">
                  <div className="w-7 h-7 rounded-xl bg-emerald-600 text-white text-xs font-black flex items-center justify-center shadow-2xs">2</div>
                  <div className="text-xs font-bold text-slate-900">{isHindi ? 'नजदीकी दुकान चुनें' : 'Walk In to Verified Lab'}</div>
                  <div className="text-[11px] text-slate-500 leading-snug">{isHindi ? '1.2 किमी की दूरी पर सत्यापित पार्टनर' : 'Drop at verified partner lab (1.2 km away)'}</div>
                </div>

                <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-1.5 shadow-2xs">
                  <div className="w-7 h-7 rounded-xl bg-emerald-600 text-white text-xs font-black flex items-center justify-center shadow-2xs">3</div>
                  <div className="text-xs font-bold text-slate-900">{isHindi ? 'तुरंत नकद लें' : 'Get Instant Cash / UPI'}</div>
                  <div className="text-[11px] text-slate-500 leading-snug">{isHindi ? 'जांच के बाद नकद या UPI पेमेंट' : 'Physical testing & immediate payout on spot'}</div>
                </div>
              </div>

              {/* Live Verified Trade-in Payout Feed */}
              <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="font-bold text-slate-800">Live Payout:</span>
                  <span className="text-slate-600 font-mono truncate">
                    ₹3,850 via UPI to Vivek S. (iPhone 13) at Indiranagar Lab · 4m ago
                  </span>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full shrink-0">
                  Verified
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-100">
                <button
                  onClick={() => onNavigate('sell-device')}
                  className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-xs px-6 py-3.5 rounded-xl shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>{isHindi ? 'पूरा सेल फॉर्म खोलें' : 'Start Full Sell Valuation'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('overview')}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors ml-auto flex items-center gap-1 cursor-pointer"
                >
                  <span>{isHindi ? '60 सेकंड में पूरा मॉडल समझें' : 'How Eco2Fixx Works'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 2. ASSOCIATE A PERSONA (Primary Mobile Repair Shop / Hardware Buyer) */}
        {currentPersona === 'associate_a' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-100 pb-6">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300 flex items-center gap-1">
                    <Store className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{isHindi ? 'दुकानदार / रिपेयर पार्टनर पोर्टल' : 'Associate A: Mobile Repair Shop Portal'}</span>
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {isHindi ? 'आप हार्डवेयर के असली मालिक हैं' : 'You Own 100% of Physical Inventory'}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
                  {isHindi
                    ? 'टूटे हुए फोन से अपनी दुकान की कमाई 70% बढ़ाएं'
                    : 'Turn Inbound Broken Gadgets into High-Margin Repair Inventory'}
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {isHindi
                    ? 'स्थानीय ग्राहकों से सीधे टूटे फोन खरीदें। उनके असली OEM पुर्जे (डिस्प्ले, कैमरा, बोर्ड) निकालें और दुकान में आने वाले ग्राहकों के फोन सस्ते में रिपेयर करें या ऑनलाइन बेचें।'
                    : 'Independent repair businesses purchase damaged devices directly from local owners, bench-test usable components, and utilize them for high-margin walk-in repairs or list on Eco2Fixx for national buyers.'}
                </p>
              </div>

              {/* Partner Quick Stats */}
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 shrink-0 text-xs">
                <div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{isHindi ? 'नजदीकी फोन' : 'Inbound Nearby'}</div>
                  <div className="text-lg font-black text-slate-900 font-mono">3 Phones</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{isHindi ? 'दुकान का मुनाफा' : 'Gross Margin'}</div>
                  <div className="text-lg font-black text-emerald-700 font-mono">65% – 75%</div>
                </div>
              </div>
            </div>

            {/* Inbound Broken Phones Ready for Associate Purchase */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800 uppercase tracking-wider">
                <span>{isHindi ? 'ग्राहक जो अपनी डिवाइस बेचना चाहते हैं:' : 'Nearby Customer Drop-off Requests Ready for Buyout:'}</span>
                <span className="text-emerald-700">{isHindi ? 'तुरंत जांचें और खरीदें' : 'Direct Cash Acquisition'}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-slate-900">Apple iPhone 13 (128GB)</span>
                    <span className="text-xs font-mono font-black text-emerald-700">₹3,400</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Screen flickers, cameras and FaceID 100% operational. Customer in Koramangala (1.2 km away).</p>
                  <button
                    onClick={() => onNavigate('associate-hub')}
                    className="w-full py-1.5 px-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors"
                  >
                    {isHindi ? 'दुकान में खरीदें (₹3,400 नकद)' : 'Inspect & Buy Device'}
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-slate-900">Samsung Galaxy S22</span>
                    <span className="text-xs font-mono font-black text-emerald-700">₹2,800</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Back glass shattered, 50MP camera & logic board tested fine. Customer in Indiranagar (2.4 km away).</p>
                  <button
                    onClick={() => onNavigate('associate-hub')}
                    className="w-full py-1.5 px-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors"
                  >
                    {isHindi ? 'दुकान में खरीदें (₹2,800 नकद)' : 'Inspect & Buy Device'}
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-slate-900">ThinkPad X1 Carbon Gen 9</span>
                    <span className="text-xs font-mono font-black text-emerald-700">₹7,500</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Broken screen hinge. i7 Motherboard and 57Wh battery working cleanly. MG Road partner.</p>
                  <button
                    onClick={() => onNavigate('associate-hub')}
                    className="w-full py-1.5 px-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors"
                  >
                    {isHindi ? 'दुकान में खरीदें (₹7,500 नकद)' : 'Inspect & Buy Device'}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => onNavigate('associate-hub')}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-xs transition-colors flex items-center gap-2"
              >
                <Store className="w-4 h-4" />
                <span>{isHindi ? 'दुकानदार वर्कबेंच खोलें' : 'Open Associate Workbench & Inventory'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onNavigate('business-model')}
                className="text-xs font-semibold text-slate-700 hover:text-emerald-700 transition-colors"
              >
                {isHindi ? 'शॉप ओनरशिप और रिस्क मॉडल समझें →' : 'Review Associate Ownership Rules →'}
              </button>
            </div>
          </div>
        )}

        {/* 3. ASSOCIATE B PERSONA (Secondary Repair Shop / B2B Wholesale Parts Buyer) */}
        {currentPersona === 'associate_b' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-100 pb-6">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-blue-800 bg-blue-100 px-3 py-1 rounded-full border border-blue-300 flex items-center gap-1">
                    <ShoppingCart className="w-3.5 h-3.5 text-blue-700" />
                    <span>{isHindi ? 'दुकानों के लिए थोक ओरिजिनल स्पेयर पार्ट्स' : 'Associate B: B2B Wholesale Tested Spares'}</span>
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {isHindi ? 'कोई डुप्लीकेट कॉपी नहीं' : '100% Bench Tested OEM Pulls'}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
                  {isHindi
                    ? 'अपनी दुकान के रिपेयर के लिए थोक भाव में असली स्पेयर पार्ट्स मंगाएं'
                    : 'Source Tested Genuine OEM Spares for Your Repair Shop Customers'}
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {isHindi
                    ? 'सस्ते चीनी डुप्लीकेट पार्ट्स बार-बार खराब होकर दुकान का नाम खराब करते हैं। साथी लैब तकनीशियनों द्वारा मल्टीमीटर से टेस्ट किए गए ओरिजिनल पार्ट्स 3 महीने की वारंटी के साथ मंगाएं।'
                    : 'Avoid cheap counterfeit copies that fail after two weeks. Purchase authentic pulled OEM displays, logic motherboards, batteries, and camera modules tested by certified technician peers across India.'}
                </p>
              </div>

              {/* B2B Assurance Badges */}
              <div className="grid grid-cols-2 gap-3 bg-blue-50/70 p-4 rounded-xl border border-blue-200 shrink-0 text-xs">
                <div>
                  <div className="text-[10px] text-blue-800 font-bold uppercase tracking-wider">{isHindi ? 'वारंटी' : 'Shop Warranty'}</div>
                  <div className="text-base font-black text-slate-900">3 Months</div>
                </div>
                <div>
                  <div className="text-[10px] text-blue-800 font-bold uppercase tracking-wider">{isHindi ? 'जीएसटी बिल' : 'Tax Invoice'}</div>
                  <div className="text-base font-black text-slate-900">GST Input Credit</div>
                </div>
              </div>
            </div>

            {/* Popular B2B Wholesale Spares Grid */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800 uppercase tracking-wider">
                <span>{isHindi ? 'दुकानों द्वारा सबसे ज्यादा खरीदे जा रहे स्पेयर:' : 'High-Demand Bench-Tested Spares Available:'}</span>
                <span className="text-blue-700">{isHindi ? 'थोक कीमतें' : 'Wholesale Dealer Prices'}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="text-xs font-bold text-slate-900 truncate">iPhone 13 OLED Display (OEM Pull)</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-base font-black text-slate-900 font-mono">₹2,499</span>
                    <span className="text-xs text-slate-400 line-through">₹6,999</span>
                  </div>
                  <div className="text-[11px] text-emerald-700 font-semibold">Touch digitizer & TrueTone verified</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="text-xs font-bold text-slate-900 truncate">ThinkPad X1 Motherboard (i7 Unlocked)</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-base font-black text-slate-900 font-mono">₹7,499</span>
                    <span className="text-xs text-slate-400 line-through">₹22,000</span>
                  </div>
                  <div className="text-[11px] text-emerald-700 font-semibold">Clean power rails, HDMI pass</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="text-xs font-bold text-slate-900 truncate">Galaxy S22 50MP Camera Module</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-base font-black text-slate-900 font-mono">₹1,450</span>
                    <span className="text-xs text-slate-400 line-through">₹3,800</span>
                  </div>
                  <div className="text-[11px] text-emerald-700 font-semibold">OIS stabilization bench tested</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => onNavigate('marketplace')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-xs transition-colors flex items-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>{isHindi ? 'सभी थोक स्पेयर पार्ट्स देखें' : 'Browse All Wholesale B2B Spares'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <span className="text-xs text-slate-500">
                {isHindi ? 'सुरक्षित एस्क्रो पेमेंट: डिलीवरी के बाद ही सेलर को पेमेंट' : 'Escrow secured: Payment held until delivery verified'}
              </span>
            </div>
          </div>
        )}

        {/* 4. BUYER PERSONA (Customer B - Consumer Needing Affordable Spare) */}
        {currentPersona === 'buyer' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-100 pb-6">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300 flex items-center gap-1">
                    <ShoppingBag className="w-3.5 h-3.5 text-amber-700" />
                    <span>{isHindi ? 'सस्ता और असली स्पेयर पार्ट्स स्टोर' : 'Customer B: Affordable Replacement Spares'}</span>
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {isHindi ? 'सर्विस सेंटर से 70% सस्ता' : 'Save 70% vs Brand Service Centers'}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
                  {isHindi
                    ? 'अपने फोन का स्क्रीन या बैटरी बदलें - 70% कम दाम में'
                    : 'Fix Your Phone with Tested Original Parts at Fraction of the Cost'}
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {isHindi
                    ? 'ब्रांड सर्विस सेंटर नई स्क्रीन के ₹12,000 मांगते हैं? Eco2Fixx पर 100% असली, टेस्ट की हुई स्क्रीन मात्र ₹2,499 में 3 महीने की वारंटी के साथ पाएं।'
                    : 'Brand service centers quote unreasonable repair prices for older gadgets. Eco2Fixx delivers genuine pulled OEM displays, camera lenses, and batteries bench-tested by local technicians.'}
                </p>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-2 gap-3 bg-amber-50/70 p-4 rounded-xl border border-amber-200 shrink-0 text-xs">
                <div>
                  <div className="text-[10px] text-amber-800 font-bold uppercase tracking-wider">{isHindi ? 'वापसी' : 'Returns'}</div>
                  <div className="text-base font-black text-slate-900">7 Days Easy</div>
                </div>
                <div>
                  <div className="text-[10px] text-amber-800 font-bold uppercase tracking-wider">{isHindi ? 'वारंटी' : 'Warranty'}</div>
                  <div className="text-base font-black text-slate-900">3 Months</div>
                </div>
              </div>
            </div>

            {/* Quick Component Search for Consumers */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div onClick={() => onNavigate('marketplace')} className="p-3.5 bg-slate-50 hover:bg-amber-50 rounded-xl border border-slate-200 cursor-pointer transition-colors">
                <div className="text-xs font-bold text-slate-900">{isHindi ? 'मोबाइल डिस्प्ले (OLED)' : 'Mobile Displays'}</div>
                <div className="text-[11px] text-emerald-700 font-bold mt-1">₹1,899 {isHindi ? 'से शुरू' : 'onwards'}</div>
              </div>
              <div onClick={() => onNavigate('marketplace')} className="p-3.5 bg-slate-50 hover:bg-amber-50 rounded-xl border border-slate-200 cursor-pointer transition-colors">
                <div className="text-xs font-bold text-slate-900">{isHindi ? 'ओरिजिनल बैटरी' : 'Tested Batteries'}</div>
                <div className="text-[11px] text-emerald-700 font-bold mt-1">₹899 {isHindi ? 'से शुरू' : 'onwards'}</div>
              </div>
              <div onClick={() => onNavigate('marketplace')} className="p-3.5 bg-slate-50 hover:bg-amber-50 rounded-xl border border-slate-200 cursor-pointer transition-colors">
                <div className="text-xs font-bold text-slate-900">{isHindi ? 'कैमरा मॉड्यूल्स' : 'Camera Modules'}</div>
                <div className="text-[11px] text-emerald-700 font-bold mt-1">₹1,200 {isHindi ? 'से शुरू' : 'onwards'}</div>
              </div>
              <div onClick={() => onNavigate('marketplace')} className="p-3.5 bg-slate-50 hover:bg-amber-50 rounded-xl border border-slate-200 cursor-pointer transition-colors">
                <div className="text-xs font-bold text-slate-900">{isHindi ? 'चार्जिंग पोर्ट' : 'Charging Flex'}</div>
                <div className="text-[11px] text-emerald-700 font-bold mt-1">₹399 {isHindi ? 'से शुरू' : 'onwards'}</div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => onNavigate('marketplace')}
                className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-xs transition-colors flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{isHindi ? 'अपने फोन का पार्ट खोजें' : 'Find Spare Part for My Device'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <span className="text-xs text-slate-500">
                {isHindi ? 'कैश ऑन डिलीवरी और UPI उपलब्ध' : 'Cash on Delivery & Express Courier Available'}
              </span>
            </div>
          </div>
        )}

        {/* 5. EXECUTIVE / ALL-IN-ONE OVERVIEW (Default or Executive View) */}
        {currentPersona === 'executive' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch animate-in fade-in duration-300">
            {/* Left: Quick Sell Widget */}
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {isHindi ? 'सर्कुलर इकोनॉमी मॉडल' : 'Circular Economy Platform'}
                  </span>
                  <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>2,400+ Local Shops</span>
                  </span>
                </div>

                <h2 className="text-2xl font-black text-slate-900 font-display tracking-tight leading-snug">
                  {isHindi ? 'टूटा हुआ फोन? तुरंत नकद कीमत जानें' : 'Got a Broken Phone? Get Direct Cash Payout.'}
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isHindi
                    ? 'स्थानीय रिपेयर दुकानें आपके फोन को खरीदकर उसके पुर्जे निकालती हैं और दूसरों के काम लाती हैं।'
                    : 'Verified local repair shops buy damaged gadgets directly to harvest and reuse working internal OEM parts.'}
                </p>
              </div>

              {/* Selector */}
              <div className="space-y-3.5 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1.5 uppercase tracking-wider">
                    1. Brand:
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {BRANDS.map((b) => (
                      <button
                        key={b}
                        onClick={() => {
                          setSelectedBrand(b);
                          setSelectedModel(MODELS[b]?.[0] || 'Model');
                        }}
                        className={`px-2.5 py-1 text-xs rounded-lg font-medium border transition-colors ${
                          selectedBrand === b
                            ? 'bg-emerald-600 text-white border-emerald-600 font-bold shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1 uppercase tracking-wider">
                    2. Model:
                  </label>
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-emerald-600"
                  >
                    {(MODELS[selectedBrand] || []).map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1.5 uppercase tracking-wider">
                    3. Damage:
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {[
                      { en: 'Cracked Screen', icon: Smartphone },
                      { en: 'Liquid Damaged', icon: Droplets },
                      { en: 'Back Glass Shattered', icon: Layers },
                      { en: 'Won\'t Turn On', icon: PowerOff }
                    ].map((dmg) => {
                      const IconComponent = dmg.icon;
                      const isSelected = selectedDamage === dmg.en;
                      return (
                        <button
                          key={dmg.en}
                          type="button"
                          onClick={() => setSelectedDamage(dmg.en)}
                          className={`relative p-2 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-1.5 ${
                            isSelected
                              ? 'bg-emerald-50 text-emerald-950 border-emerald-500 font-bold shadow-2xs ring-1 ring-emerald-500/20'
                              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center gap-1.5 min-w-0">
                            <IconComponent className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-emerald-600' : 'text-slate-400'}`} />
                            <span className="text-[11px] font-bold truncate">{dmg.en}</span>
                          </div>
                          {isSelected && <Check className="w-3 h-3 text-emerald-600 shrink-0 stroke-[3]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-4">
                <div>
                  <div className="text-[10px] text-slate-500 font-medium">Shop Payout:</div>
                  <div className="text-xl font-black text-emerald-700 font-mono">
                    {getEstimatedValue()}
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('sell-device')}
                  className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-1.5 shrink-0"
                >
                  <span>Find Nearby Shop</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right: High-Fidelity Circular E-Commerce Launch Banner */}
            <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-3xl p-7 sm:p-9 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-6 relative overflow-hidden">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/80">
                    <Award className="w-3.5 h-3.5 text-emerald-700" />
                    <span>India's 1st Tested Circular Spare Parts Store</span>
                  </span>
                  <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                    Verified by 1,400+ Repair Labs
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-display leading-[1.15]">
                  Broken Doesn't Mean Worthless.
                </h1>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
                  Eco2Fixx connects owners of broken smartphones, local repair technicians, and buyers. Independent repair shops buy damaged gadgets directly, test and salvage working OEM displays, cameras, and batteries, and sell them at 60% lower cost.
                </p>
              </div>

              {/* High-Fidelity Visual Composite Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div
                  onClick={() => onNavigate('marketplace')}
                  className="bg-slate-50/80 hover:bg-emerald-50/50 transition-all p-3.5 rounded-2xl border border-slate-200 hover:border-emerald-300 cursor-pointer group shadow-2xs hover:shadow-xs"
                >
                  <div className="h-24 w-full rounded-xl overflow-hidden mb-2.5 bg-slate-200 relative">
                    <img
                      src="https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=400&q=80"
                      alt="iPhone 13 Display"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute bottom-1.5 left-1.5 bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-2xs">
                      OEM Tested
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-900 truncate">iPhone 13 OLED Display</div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs font-black text-emerald-700 font-mono">₹2,499</span>
                    <span className="text-[10px] text-slate-400 line-through">₹6,999</span>
                  </div>
                </div>

                <div
                  onClick={() => onNavigate('marketplace')}
                  className="bg-slate-50/80 hover:bg-emerald-50/50 transition-all p-3.5 rounded-2xl border border-slate-200 hover:border-emerald-300 cursor-pointer group shadow-2xs hover:shadow-xs"
                >
                  <div className="h-24 w-full rounded-xl overflow-hidden mb-2.5 bg-slate-200 relative">
                    <img
                      src="https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=400&q=80"
                      alt="Camera Module"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute bottom-1.5 left-1.5 bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-2xs">
                      Grade A
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-900 truncate">iPhone Dual Camera</div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs font-black text-emerald-700 font-mono">₹1,899</span>
                    <span className="text-[10px] text-slate-400 line-through">₹4,800</span>
                  </div>
                </div>

                <div
                  onClick={() => onNavigate('marketplace')}
                  className="bg-slate-50/80 hover:bg-emerald-50/50 transition-all p-3.5 rounded-2xl border border-slate-200 hover:border-emerald-300 cursor-pointer group shadow-2xs hover:shadow-xs"
                >
                  <div className="h-24 w-full rounded-xl overflow-hidden mb-2.5 bg-slate-200 relative">
                    <img
                      src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80"
                      alt="ThinkPad Motherboard"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute bottom-1.5 left-1.5 bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-2xs">
                      B2B Verified
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-900 truncate">ThinkPad X1 Board</div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs font-black text-emerald-700 font-mono">₹7,499</span>
                    <span className="text-[10px] text-slate-400 line-through">₹22,000</span>
                  </div>
                </div>
              </div>

              {/* CTAs & Quick Search */}
              <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-100">
                <button
                  onClick={() => onNavigate('marketplace')}
                  className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-xs px-6 py-3.5 rounded-xl shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Shop 25,000+ Tested Spares</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('associate-hub')}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-5 py-3.5 rounded-xl border border-slate-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Store className="w-4 h-4 text-emerald-600" />
                  <span>Partner Dukaan Hub</span>
                </button>

                <button
                  onClick={() => onNavigate('overview')}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors ml-auto flex items-center gap-1 cursor-pointer"
                >
                  <span>How Eco2Fixx Works</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* E-Commerce Circular Lifecycle Infographic with High-Fidelity Photographic Flow */}
        <HeroCircularFlowVisual
          onExploreStage={(stage) => {
            if (stage === 1) onNavigate('sell-device');
            if (stage === 2 || stage === 3) onNavigate('associate-hub');
            if (stage === 4) onNavigate('marketplace');
          }}
        />
      </div>
    </section>
  );
};
