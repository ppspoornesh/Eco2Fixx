import React, { useState } from 'react';
import { AppTab, UserPersona, SupportedLanguage } from '../types';
import { SUPPORTED_LANGUAGES, TRANSLATIONS } from '../data/translations';
import { Search, ShoppingBag, MapPin, Plus, Store, Play, ChevronDown, ShieldCheck, PhoneCall, HelpCircle, Check, Globe, Volume2, MessageSquare, Truck } from 'lucide-react';

interface NavbarProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
  onStartTour: () => void;
  cartCount: number;
  onOpenCart: () => void;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
  currentPersona?: UserPersona;
  onPersonaChange?: (p: UserPersona) => void;
  currentLanguage: SupportedLanguage;
  onSelectLanguage: (lang: SupportedLanguage) => void;
  onVoiceSpeak?: () => void;
  isVoiceEnabled?: boolean;
  onToggleVoice?: () => void;
  onOpenTracking?: (orderId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  onStartTour,
  cartCount,
  onOpenCart,
  searchQuery = '',
  onSearchChange,
  currentPersona,
  onPersonaChange,
  currentLanguage,
  onSelectLanguage,
  onVoiceSpeak,
  isVoiceEnabled = true,
  onToggleVoice,
  onOpenTracking
}) => {
  const [selectedCity, setSelectedCity] = useState('Bengaluru (560001)');
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showPersonaMenu, setShowPersonaMenu] = useState(false);

  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage) || SUPPORTED_LANGUAGES[0];

  const PERSONA_CONFIG: Record<UserPersona, { initial: string; label: string; sublabel: string; bg: string }> = {
    seller: { initial: 'S', label: 'Seller', sublabel: 'Trade-in Cash', bg: 'bg-emerald-600' },
    associate_a: { initial: 'A', label: 'Associate A', sublabel: 'Dukaan Workshop', bg: 'bg-slate-900' },
    associate_b: { initial: 'B', label: 'Associate B', sublabel: 'B2B Wholesale', bg: 'bg-blue-600' },
    buyer: { initial: 'B', label: 'Buyer', sublabel: 'Tested Spares', bg: 'bg-amber-600' },
    executive: { initial: 'E', label: 'Executive', sublabel: 'Platform Admin', bg: 'bg-purple-700' }
  };

  const activePersonaObj = PERSONA_CONFIG[currentPersona || 'seller'] || PERSONA_CONFIG.seller;

  const CITIES = [
    'Bengaluru (560001)',
    'Mumbai (400001)',
    'Delhi NCR (110001)',
    'Hyderabad (500001)',
    'Chennai (600001)',
    'Pune (411001)',
    'Kolkata (700001)'
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onTabChange('marketplace');
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* 1. Institutional Top Utility Strip with Compliance, Helpline, WhatsApp, Language & Voice Accessibility */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-slate-200 text-[11px] py-1.5 px-4 sm:px-6 lg:px-8 border-b border-emerald-700/60 font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-none py-0.5">
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold shrink-0">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Govt. EPR Registered Circular Portal</span>
            </span>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="hidden md:inline-flex items-center gap-1 text-slate-300 font-semibold shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>ISO 9001:2015 Bench Diagnostic Certified</span>
            </span>
            <span className="text-slate-600 hidden lg:inline">|</span>
            <span className="hidden lg:inline text-slate-400 shrink-0">
              ₹4.82 Cr+ Direct Salvage Paid to Owners
            </span>
          </div>

          <div className="flex items-center gap-3.5 text-slate-300 shrink-0">
            {/* Prominent Language Switcher in Header Bar */}
            <div className="relative">
              <button
                onClick={() => setShowLangDropdown(!showLangDropdown)}
                className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 font-bold text-[11px] transition-all border border-emerald-600/40 shadow-2xs"
                title="Select language / भाषा चुनें"
              >
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span>{currentLangObj.nativeName}</span>
                <ChevronDown className="w-3 h-3 text-emerald-300/80" />
              </button>

              {showLangDropdown && (
                <div className="absolute right-0 top-full mt-1.5 w-48 bg-white rounded-xl shadow-2xl border border-slate-200 py-1.5 z-50 text-slate-900">
                  <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    Select Language / भाषा चुनें
                  </div>
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onSelectLanguage(lang.code);
                        setShowLangDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs hover:bg-emerald-50 transition-colors flex items-center justify-between ${
                        currentLanguage === lang.code ? 'font-bold text-emerald-700 bg-emerald-50/70' : 'text-slate-700'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="font-semibold">{lang.nativeName}</span>
                        <span className="text-[10px] text-slate-400">({lang.name})</span>
                      </span>
                      {currentLanguage === lang.code && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Live Order Tracking Button */}
            <button
              onClick={() => onOpenTracking?.()}
              className="flex items-center gap-1 text-slate-200 hover:text-emerald-300 transition-colors font-medium cursor-pointer"
              title="Track Order & Repair Status"
            >
              <Truck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Track Order</span>
            </button>

            <span className="hidden sm:inline text-slate-700">|</span>

            {/* Voice On/Off Toggle */}
            <button
              onClick={onToggleVoice}
              className={`flex items-center gap-1.5 rounded-full border px-2 py-1 transition-colors font-medium cursor-pointer ${
                isVoiceEnabled
                  ? 'border-emerald-400/60 bg-emerald-500/10 text-emerald-300'
                  : 'border-slate-600 bg-slate-800/80 text-slate-400'
              }`}
              title={isVoiceEnabled ? 'Turn voice off' : 'Turn voice on'}
            >
              <Volume2 className={`w-3.5 h-3.5 ${isVoiceEnabled ? 'animate-pulse text-emerald-400' : 'text-slate-400'}`} />
              <span className="hidden md:inline">{isVoiceEnabled ? 'Voice On' : 'Voice Off'}</span>
            </button>

            <button
              onClick={onVoiceSpeak}
              className={`flex items-center gap-1 transition-colors font-medium cursor-pointer ${
                isVoiceEnabled ? 'text-emerald-300 hover:text-emerald-200' : 'text-slate-500 cursor-not-allowed'
              }`}
              title={isVoiceEnabled ? 'Play voice guide' : 'Turn voice on to play guide'}
              disabled={!isVoiceEnabled}
            >
              <span className="hidden md:inline">{t.voiceGuide}</span>
            </button>

            <span className="hidden sm:inline text-slate-700">|</span>

            {/* Direct WhatsApp Support */}
            <a
              href="https://wa.me/919392532390?text=Hello%20Eco2Fixx%20Support,%20I%20need%20assistance"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors font-semibold"
              title="WhatsApp Helpline"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp: 9392532390</span>
            </a>

            <span className="hidden lg:inline text-slate-700">|</span>

            {/* Direct Phone Helpline */}
            <a
              href="tel:9392532390"
              className="flex items-center gap-1 text-white hover:text-emerald-300 font-bold transition-colors"
              title="Call Helpline"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
              <span>+91 9392532390</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Search & Action Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-3 lg:gap-6">
          {/* Logo */}
          <button
            onClick={() => onTabChange('overview')}
            className="flex items-center gap-2.5 group text-left shrink-0 cursor-pointer"
          >
            <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 ring-1 ring-emerald-500/30 group-hover:scale-105 transition-transform">
              <span className="font-black text-lg tracking-tighter">E2</span>
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white flex items-center justify-center shadow-2xs">
                <span className="w-1.5 h-1.5 bg-emerald-950 rounded-full"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tight text-slate-900 font-display leading-none">
                  Eco2<span className="text-emerald-600">Fixx</span>
                </span>
                <span className="hidden sm:inline-block text-[9px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-300/80 px-2 py-0.5 rounded-full">
                  Circular Tech
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-semibold tracking-tight mt-0.5">
                {t.testedSpares}
              </p>
            </div>
          </button>

          {/* City / Location Hub Selector */}
          <div className="relative hidden xl:block shrink-0">
            <button
              onClick={() => setShowCityDropdown(!showCityDropdown)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-100/80 border border-slate-200/90 text-left transition-all text-xs bg-slate-50/50 shadow-2xs cursor-pointer"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                  Verified Lab Hub
                </div>
                <div className="font-bold text-slate-800 flex items-center gap-1">
                  <span>{selectedCity.split(' ')[0]}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </div>
              </div>
            </button>

            {showCityDropdown && (
              <div className="absolute left-0 top-full mt-1.5 w-60 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in duration-150">
                <div className="px-3.5 py-1.5 text-[10px] font-black text-slate-400 uppercase tracking-wider border-b border-slate-100 flex items-center justify-between">
                  <span>Active Technician Hubs</span>
                  <span className="text-emerald-600 font-mono">2,450+ Labs</span>
                </div>
                {CITIES.map((city) => (
                  <button
                    key={city}
                    onClick={() => {
                      setSelectedCity(city);
                      setShowCityDropdown(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs hover:bg-slate-50 transition-colors flex items-center justify-between ${
                      selectedCity === city ? 'font-bold text-emerald-700 bg-emerald-50/70' : 'text-slate-700'
                    }`}
                  >
                    <span>{city}</span>
                    {selectedCity === city && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Bar with trending pills */}
          <div className="flex-1 max-w-xl">
            <form
              onSubmit={handleSearchSubmit}
              className="relative flex items-center shadow-2xs focus-within:shadow-md transition-shadow rounded-xl"
            >
              <div className="hidden sm:flex items-center bg-slate-100 border border-r-0 border-slate-300 rounded-l-xl px-3 py-2.5 text-xs text-slate-700 font-semibold shrink-0">
                <span>{t.allSpares}</span>
                <ChevronDown className="w-3.5 h-3.5 ml-1 text-slate-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange?.(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 rounded-l-xl sm:rounded-l-none rounded-r-none px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all font-medium"
              />
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-r-xl text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0 shadow-xs cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline">{t.searchBtn}</span>
              </button>
            </form>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => {
                onPersonaChange?.('seller');
                onTabChange('overview');
              }}
              className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-black text-xs px-3 py-2 rounded-xl shadow-xs transition-all hover:scale-[1.01] cursor-pointer"
            >
              <div className="w-5 h-5 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <div className="text-left leading-tight">
                <div className="font-extrabold">{t.sellPhone}</div>
                <div className="text-[9px] font-medium opacity-90">{t.getDirectCash}</div>
              </div>
            </button>

            <div className="relative">
              <button
                onClick={() => setShowPersonaMenu(!showPersonaMenu)}
                className="flex items-center gap-2 px-2.5 py-2 rounded-xl border border-slate-200/90 hover:border-emerald-500 bg-slate-50/70 hover:bg-white text-slate-800 transition-all cursor-pointer shadow-2xs group"
                title={`Active Role: ${activePersonaObj.label} (${activePersonaObj.sublabel}) - Click to switch view`}
              >
                <div className={`w-7 h-7 rounded-xl ${activePersonaObj.bg} text-white font-black text-xs flex items-center justify-center shadow-xs shrink-0 ring-2 ring-white`}>
                  {activePersonaObj.initial}
                </div>
                <div className="hidden lg:block text-left">
                  <div className="text-xs font-black text-slate-900 leading-tight flex items-center gap-1">
                    <span>{activePersonaObj.label}</span>
                    <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-slate-700" />
                  </div>
                </div>
              </button>

              {showPersonaMenu && (
                <div className="absolute right-0 top-full mt-1.5 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in duration-150">
                  <div className="px-2.5 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    Switch User Persona
                  </div>
                  <div className="space-y-1 pt-1">
                    {(Object.keys(PERSONA_CONFIG) as UserPersona[]).map((pKey) => {
                      const p = PERSONA_CONFIG[pKey];
                      const isSelected = (currentPersona || 'seller') === pKey;
                      return (
                        <button
                          key={pKey}
                          onClick={() => {
                            onPersonaChange?.(pKey);
                            setShowPersonaMenu(false);
                            if (pKey === 'associate_a' || pKey === 'associate_b') {
                              onTabChange('associate-hub');
                            } else if (pKey === 'seller') {
                              onTabChange('sell-device');
                            } else if (pKey === 'buyer') {
                              onTabChange('marketplace');
                            }
                          }}
                          className={`w-full text-left p-2 rounded-xl text-xs transition-all flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? 'bg-emerald-50 text-emerald-950 font-bold border border-emerald-200'
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded-full ${p.bg} text-white font-bold text-[10px] flex items-center justify-center shrink-0`}>
                              {p.initial}
                            </div>
                            <div>
                              <div className="text-xs font-bold leading-tight">{p.label}</div>
                              <div className="text-[10px] text-slate-400 font-normal leading-tight">{p.sublabel}</div>
                            </div>
                          </div>
                          {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-1.5 text-xs font-semibold"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-emerald-600" />
              <span className="hidden md:inline">{t.cart}</span>
              {cartCount > 0 && (
                <span className="w-5 h-5 bg-emerald-600 text-white font-bold text-[10px] rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-[#F1F5F9] border-t border-slate-200 text-xs font-medium text-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between overflow-x-auto gap-3 py-2 scrollbar-none">
          <div className="flex items-center gap-1 md:gap-2 shrink-0">
            {[
              { label: t.homeTab, tab: 'overview', active: activeTab === 'overview' },
              { label: t.allPartsTab, tab: 'marketplace', active: activeTab === 'marketplace' },
              { label: 'Phones', tab: 'marketplace', active: false },
              { label: 'Laptops', tab: 'marketplace', active: false },
              { label: 'Spare Parts', tab: 'marketplace', active: false }
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => onTabChange(item.tab as AppTab)}
                className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap text-xs font-semibold ${
                  item.active ? 'bg-white text-emerald-700 shadow-xs' : 'hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onOpenTracking?.()}
              className="text-slate-700 bg-white hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200 font-bold px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer text-[11px]"
              title="Track Order / Repair Status"
            >
              <Truck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Track</span>
            </button>

            <button
              onClick={() => onTabChange('sell-device')}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap text-[11px] font-bold ${
                activeTab === 'sell-device' ? 'bg-emerald-600 text-white shadow-xs' : 'text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200'
              }`}
            >
              Sell device
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
