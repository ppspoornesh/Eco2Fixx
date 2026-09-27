import React from 'react';
import { SlidersHorizontal, X, RotateCcw, Check, ChevronDown, ChevronUp, ShieldCheck, Tag, DollarSign, Layers } from 'lucide-react';

export interface FilterState {
  searchQuery: string;
  selectedCategories: string[];
  selectedBrands: string[];
  priceRange: [number, number];
  selectedConditions: string[];
  selectedAudience: 'all' | 'b2b' | 'b2c';
  sortBy: 'relevance' | 'price-low' | 'price-high' | 'rating';
}

interface MarketplaceFilterSidebarProps {
  categories: string[];
  selectedCategories: string[];
  onToggleCategory: (category: string) => void;
  onClearCategories: () => void;
  categoryCounts: Record<string, number>;

  priceRange: [number, number];
  minPossiblePrice: number;
  maxPossiblePrice: number;
  onPriceChange: (newRange: [number, number]) => void;

  brands: string[];
  selectedBrands: string[];
  onToggleBrand: (brand: string) => void;
  brandCounts: Record<string, number>;

  conditions: string[];
  selectedConditions: string[];
  onToggleCondition: (condition: string) => void;

  selectedAudience: 'all' | 'b2b' | 'b2c';
  onAudienceChange: (audience: 'all' | 'b2b' | 'b2c') => void;

  onResetAll: () => void;
  hasActiveFilters: boolean;

  isMobileOpen: boolean;
  onCloseMobile: () => void;
  totalResults: number;
  isHindi?: boolean;
}

export const MarketplaceFilterSidebar: React.FC<MarketplaceFilterSidebarProps> = ({
  categories,
  selectedCategories,
  onToggleCategory,
  onClearCategories,
  categoryCounts,
  priceRange,
  minPossiblePrice,
  maxPossiblePrice,
  onPriceChange,
  brands,
  selectedBrands,
  onToggleBrand,
  brandCounts,
  conditions,
  selectedConditions,
  onToggleCondition,
  selectedAudience,
  onAudienceChange,
  onResetAll,
  hasActiveFilters,
  isMobileOpen,
  onCloseMobile,
  totalResults,
  isHindi = false
}) => {
  const pricePresets: { label: string; min: number; max: number }[] = [
    { label: 'Under ₹1,000', min: minPossiblePrice, max: 1000 },
    { label: '₹1,000 - ₹3,000', min: 1000, max: 3000 },
    { label: '₹3,000 - ₹5,000', min: 3000, max: 5000 },
    { label: '₹5,000+', min: 5000, max: maxPossiblePrice }
  ];

  const content = (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-700" />
          </div>
          <span className="font-black text-slate-900 text-sm font-display uppercase tracking-wider">
            {isHindi ? 'फिल्टर व खोज' : 'Refine Spares'}
          </span>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onResetAll}
            className="text-[11px] font-bold text-rose-600 hover:text-rose-700 hover:underline flex items-center gap-1 cursor-pointer transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset All</span>
          </button>
        )}
      </div>

      {/* Target Audience / Customer Segment */}
      <div className="space-y-2.5">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
          Audience Tier
        </label>
        <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
          <button
            type="button"
            onClick={() => onAudienceChange('all')}
            className={`py-1.5 px-2 rounded-lg text-center transition-all text-[11px] cursor-pointer ${
              selectedAudience === 'all'
                ? 'bg-white text-emerald-700 font-bold shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All
          </button>
          <button
            type="button"
            onClick={() => onAudienceChange('b2b')}
            className={`py-1.5 px-2 rounded-lg text-center transition-all text-[11px] cursor-pointer ${
              selectedAudience === 'b2b'
                ? 'bg-white text-emerald-700 font-bold shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            B2B Shops
          </button>
          <button
            type="button"
            onClick={() => onAudienceChange('b2c')}
            className={`py-1.5 px-2 rounded-lg text-center transition-all text-[11px] cursor-pointer ${
              selectedAudience === 'b2c'
                ? 'bg-white text-emerald-700 font-bold shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Consumers
          </button>
        </div>
      </div>

      {/* Price Range Slider Section */}
      <div className="space-y-3 pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <span className="font-mono text-emerald-700 font-black">₹</span>
            <span>Price Range</span>
          </label>
          <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
            Up to ₹{priceRange[1].toLocaleString()}
          </span>
        </div>

        {/* Interactive Max Price Slider */}
        <div className="space-y-2">
          <input
            type="range"
            min={minPossiblePrice}
            max={maxPossiblePrice}
            step={250}
            value={priceRange[1]}
            onChange={(e) => onPriceChange([priceRange[0], Number(e.target.value)])}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-400 font-semibold">
            <span>₹{minPossiblePrice.toLocaleString()}</span>
            <span>₹{(maxPossiblePrice / 2).toLocaleString()}</span>
            <span>₹{maxPossiblePrice.toLocaleString()}</span>
          </div>
        </div>

        {/* Quick Range Preset Chips */}
        <div className="grid grid-cols-2 gap-1.5 pt-1">
          {pricePresets.map((preset) => {
            const isPresetActive = priceRange[0] === preset.min && priceRange[1] === preset.max;
            return (
              <button
                key={preset.label}
                type="button"
                onClick={() => onPriceChange([preset.min, preset.max])}
                className={`py-1 px-2 rounded-lg text-[10px] font-bold text-center border transition-all cursor-pointer ${
                  isPresetActive
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Multi-Select Checkboxes */}
      <div className="space-y-2.5 pt-3 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-emerald-600" />
            <span>Component Category</span>
          </label>
          {selectedCategories.length > 0 && (
            <button
              type="button"
              onClick={onClearCategories}
              className="text-[10px] text-slate-400 hover:text-slate-700 font-semibold cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
          {categories.map((cat) => {
            const isChecked = selectedCategories.includes(cat);
            const count = categoryCounts[cat] || 0;
            return (
              <label
                key={cat}
                className={`flex items-center justify-between p-2 rounded-xl border text-xs cursor-pointer transition-all ${
                  isChecked
                    ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950 font-bold shadow-2xs'
                    : 'bg-white border-slate-200/90 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${
                      isChecked
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span className="text-xs">{cat}</span>
                </div>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    isChecked ? 'bg-emerald-200/80 text-emerald-900 font-bold' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {count}
                </span>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onToggleCategory(cat)}
                  className="sr-only"
                />
              </label>
            );
          })}
        </div>
      </div>

      {/* Brand Checkboxes */}
      <div className="space-y-2.5 pt-3 border-t border-slate-100">
        <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
          <Tag className="w-3.5 h-3.5 text-emerald-600" />
          <span>Device Brand</span>
        </label>

        <div className="grid grid-cols-2 gap-1.5">
          {brands.map((b) => {
            const isChecked = selectedBrands.includes(b);
            const count = brandCounts[b] || 0;
            return (
              <button
                key={b}
                type="button"
                onClick={() => onToggleBrand(b)}
                className={`py-1.5 px-2.5 rounded-xl border text-left flex items-center justify-between text-xs transition-all cursor-pointer ${
                  isChecked
                    ? 'bg-slate-900 text-white border-slate-900 font-bold shadow-2xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span className="truncate">{b}</span>
                <span className={`text-[10px] font-mono ml-1 ${isChecked ? 'text-slate-300' : 'text-slate-400'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Condition / Diagnostic Grade Checkboxes */}
      <div className="space-y-2 pt-3 border-t border-slate-100">
        <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Diagnostic Grade</span>
        </label>
        <div className="space-y-1.5">
          {conditions.map((cond) => {
            const isChecked = selectedConditions.includes(cond);
            return (
              <label
                key={cond}
                className={`flex items-center gap-2 p-1.5 rounded-lg text-xs cursor-pointer transition-colors ${
                  isChecked ? 'font-bold text-emerald-900' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onToggleCondition(cond)}
                  className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5 accent-emerald-600 cursor-pointer"
                />
                <span className="text-[11px] truncate">{cond}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Quality Badge Guarantee Box */}
      <div className="p-3 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200/80 rounded-2xl text-[11px] space-y-1">
        <div className="font-bold text-emerald-950 flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
          <span>100% Genuine Salve Guarantee</span>
        </div>
        <p className="text-slate-600 leading-snug">
          All listed parts are harvested from legitimate trade-ins & certified by local associate mechanics.
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:block w-72 shrink-0">
        <div className="sticky top-20 bg-white border border-slate-200 rounded-3xl p-5 shadow-xs max-h-[calc(100vh-6rem)] overflow-y-auto">
          {content}
        </div>
      </aside>

      {/* Mobile Drawer / Bottom Sheet */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />

          <div className="relative ml-auto w-full max-w-xs sm:max-w-sm bg-white h-full shadow-2xl p-6 overflow-y-auto flex flex-col justify-between z-10 animate-in slide-in-from-right duration-200">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
                <span className="font-black text-slate-900 text-base font-display">
                  Filter Spares
                </span>
                <button
                  type="button"
                  onClick={onCloseMobile}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {content}
            </div>

            <div className="pt-4 border-t border-slate-200 mt-6 sticky bottom-0 bg-white">
              <button
                type="button"
                onClick={onCloseMobile}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <span>View {totalResults} Components</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
