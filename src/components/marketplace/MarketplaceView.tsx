import React, { useState } from 'react';
import { RecoveredPart } from '../../types';
import { Search, SlidersHorizontal, ShieldCheck, Truck, Star, Eye, ShoppingCart, Check, X, Shield, Lock, ArrowRight, MapPin, Tag, CheckCircle2, Calculator, RotateCcw } from 'lucide-react';
import { ComponentSvgVisual } from '../common/ComponentSvgVisual';
import { EmiCalculatorWidget } from './EmiCalculatorWidget';
import { ReviewSection } from './ReviewSection';
import { MarketplaceFilterSidebar } from './MarketplaceFilterSidebar';

interface MarketplaceViewProps {
  parts: RecoveredPart[];
  onAddToCart: (part: RecoveredPart) => void;
  onInstantBuy: (part: RecoveredPart) => void;
}

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({
  parts,
  onAddToCart,
  onInstantBuy
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 8000]);
  const [selectedAudience, setSelectedAudience] = useState<'all' | 'b2b' | 'b2c'>('all');
  const [sortBy, setSortBy] = useState<'relevance' | 'price-low' | 'price-high' | 'rating'>('relevance');
  const [selectedPartModal, setSelectedPartModal] = useState<RecoveredPart | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const availableParts = parts.filter((p) => p.listingStatus === 'available_marketplace');

  const minPossiblePrice = 0;
  const maxPossiblePrice = 8000;

  const categories = ['Display', 'Camera', 'Motherboard', 'Battery', 'Audio/Haptics', 'Charging Port'];
  const brands = ['Apple', 'Samsung', 'OnePlus', 'Lenovo', 'Xiaomi'];
  const conditions = ['Grade A - Like New', 'Grade B - Minor Signs', 'Diagnostic Passed'];

  // Toggle helpers
  const handleToggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleToggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleToggleCondition = (cond: string) => {
    setSelectedConditions((prev) =>
      prev.includes(cond) ? prev.filter((c) => c !== cond) : [...prev, cond]
    );
  };

  const handleResetAllFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedConditions([]);
    setPriceRange([0, maxPossiblePrice]);
    setSelectedAudience('all');
  };

  // Counts calculation
  const categoryCounts = categories.reduce((acc, cat) => {
    acc[cat] = availableParts.filter((p) => p.category.toLowerCase() === cat.toLowerCase()).length;
    return acc;
  }, {} as Record<string, number>);

  const brandCounts = brands.reduce((acc, b) => {
    acc[b] = availableParts.filter((p) =>
      (p.brand && p.brand.toLowerCase() === b.toLowerCase()) ||
      p.deviceModel.toLowerCase().includes(b.toLowerCase())
    ).length;
    return acc;
  }, {} as Record<string, number>);

  const filteredParts = availableParts.filter((part) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      part.title.toLowerCase().includes(q) ||
      part.deviceModel.toLowerCase().includes(q) ||
      part.category.toLowerCase().includes(q) ||
      (part.brand && part.brand.toLowerCase().includes(q));

    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(part.category);

    const matchesBrand =
      selectedBrands.length === 0 ||
      (part.brand && selectedBrands.includes(part.brand)) ||
      selectedBrands.some((b) => part.deviceModel.toLowerCase().includes(b.toLowerCase()));

    const matchesPrice =
      part.price >= priceRange[0] && part.price <= priceRange[1];

    const matchesCondition =
      selectedConditions.length === 0 ||
      selectedConditions.some((c) => part.condition.toLowerCase().includes(c.toLowerCase()));

    const matchesAudience =
      selectedAudience === 'all' ||
      (selectedAudience === 'b2b' && (part.targetAudience === 'b2b_only' || part.targetAudience === 'both')) ||
      (selectedAudience === 'b2c' && (part.targetAudience === 'b2c_only' || part.targetAudience === 'both'));

    return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesCondition && matchesAudience;
  });

  const sortedParts = [...filteredParts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return (b.rating || b.associateRating) - (a.rating || a.associateRating);
    return 0;
  });

  const hasActiveFilters =
    searchQuery.trim().length > 0 ||
    selectedCategories.length > 0 ||
    selectedBrands.length > 0 ||
    selectedConditions.length > 0 ||
    priceRange[0] > minPossiblePrice ||
    priceRange[1] < maxPossiblePrice ||
    selectedAudience !== 'all';

  const activeFilterCount =
    (searchQuery.trim() ? 1 : 0) +
    selectedCategories.length +
    selectedBrands.length +
    selectedConditions.length +
    (priceRange[1] < maxPossiblePrice || priceRange[0] > minPossiblePrice ? 1 : 0) +
    (selectedAudience !== 'all' ? 1 : 0);

  return (
    <div className="py-8 bg-slate-50 min-h-[calc(100vh-4rem)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Store breadcrumb and heading */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div>
            <div className="text-xs text-slate-500 flex items-center gap-1.5 mb-1 font-medium">
              <span>Home</span>
              <span>/</span>
              <span>Spare Parts Store</span>
              <span>/</span>
              <span className="text-emerald-700 font-bold">Tested OEM Circular Components</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-display tracking-tight">
              Original Tested Spare Parts Marketplace
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Recovered by verified mobile repair shops from damaged gadgets · Bench-tested with 3-Month warranty & 7-day replacement guarantee.
            </p>
          </div>

          {/* Quick Pincode delivery assurance */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center gap-3 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider">
                Pan-India Express Delivery
              </div>
              <div className="text-xs font-bold text-slate-900">
                Delivering to: <span className="text-emerald-700">Bengaluru 560001</span>
              </div>
            </div>
          </div>
        </div>

        {/* Top-bar: Search, Mobile Filter Trigger, Audience Switcher & Sort Controls */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search spare: e.g. iPhone 13 Display, Pixel 7 Camera, S22 AMOLED, ThinkPad Battery..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:bg-white transition-all font-medium"
              />
            </div>

            {/* Mobile Filter Toggle Button */}
            <button
              type="button"
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 rounded-xl text-xs hover:bg-emerald-100 transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4 text-emerald-700" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="bg-emerald-600 text-white font-mono text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* B2B vs B2C Toggle */}
            <div className="hidden sm:flex items-center gap-1 p-1 bg-slate-100 border border-slate-200 rounded-xl text-xs shrink-0">
              <button
                onClick={() => setSelectedAudience('all')}
                className={`px-3 py-1.5 rounded-lg transition-colors font-semibold ${
                  selectedAudience === 'all'
                    ? 'bg-white text-emerald-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Spares
              </button>
              <button
                onClick={() => setSelectedAudience('b2b')}
                className={`px-3 py-1.5 rounded-lg transition-colors font-semibold ${
                  selectedAudience === 'b2b'
                    ? 'bg-white text-emerald-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Wholesale (B2B)
              </button>
              <button
                onClick={() => setSelectedAudience('b2c')}
                className={`px-3 py-1.5 rounded-lg transition-colors font-semibold ${
                  selectedAudience === 'b2c'
                    ? 'bg-white text-emerald-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Consumers (B2C)
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-slate-500 font-medium hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-emerald-600 w-full sm:w-auto"
              >
                <option value="relevance">Featured & Relevant</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Customer Rating</option>
              </select>
            </div>
          </div>

          {/* Active Filter Chips Strip */}
          {hasActiveFilters && (
            <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-1.5 text-xs animate-in fade-in duration-150">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-1">
                Active Filters:
              </span>

              {/* Price Cap Chip */}
              {priceRange[1] < maxPossiblePrice && (
                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 font-semibold px-2.5 py-0.5 rounded-lg border border-emerald-200">
                  <span>Price: ≤ ₹{priceRange[1].toLocaleString()}</span>
                  <button
                    onClick={() => setPriceRange([0, maxPossiblePrice])}
                    className="hover:text-emerald-950 p-0.5 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {/* Categories Chips */}
              {selectedCategories.map((cat) => (
                <span
                  key={cat}
                  className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 font-semibold px-2.5 py-0.5 rounded-lg border border-emerald-200"
                >
                  <span>{cat}</span>
                  <button
                    onClick={() => handleToggleCategory(cat)}
                    className="hover:text-emerald-950 p-0.5 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}

              {/* Brands Chips */}
              {selectedBrands.map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-1 bg-slate-100 text-slate-800 font-semibold px-2.5 py-0.5 rounded-lg border border-slate-200"
                >
                  <span>{b}</span>
                  <button
                    onClick={() => handleToggleBrand(b)}
                    className="hover:text-slate-950 p-0.5 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}

              {/* Conditions Chips */}
              {selectedConditions.map((cond) => (
                <span
                  key={cond}
                  className="inline-flex items-center gap-1 bg-slate-100 text-slate-800 font-semibold px-2.5 py-0.5 rounded-lg border border-slate-200"
                >
                  <span>{cond}</span>
                  <button
                    onClick={() => handleToggleCondition(cond)}
                    className="hover:text-slate-950 p-0.5 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}

              {/* Audience Chip */}
              {selectedAudience !== 'all' && (
                <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-800 font-semibold px-2.5 py-0.5 rounded-lg border border-blue-200">
                  <span>{selectedAudience === 'b2b' ? 'B2B Wholesale' : 'Consumer B2C'}</span>
                  <button
                    onClick={() => setSelectedAudience('all')}
                    className="hover:text-blue-950 p-0.5 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {/* Reset all button */}
              <button
                type="button"
                onClick={handleResetAllFilters}
                className="text-xs text-rose-600 hover:text-rose-700 font-bold ml-auto hover:underline flex items-center gap-1 cursor-pointer pl-2"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Clear All ({activeFilterCount})</span>
              </button>
            </div>
          )}
        </div>

        {/* Two-Column Marketplace Layout (Sidebar + Products Grid) */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Sidebar with Price Range Slider, Category Checkboxes & Brand Filters */}
          <MarketplaceFilterSidebar
            categories={categories}
            selectedCategories={selectedCategories}
            onToggleCategory={handleToggleCategory}
            onClearCategories={() => setSelectedCategories([])}
            categoryCounts={categoryCounts}
            priceRange={priceRange}
            minPossiblePrice={minPossiblePrice}
            maxPossiblePrice={maxPossiblePrice}
            onPriceChange={setPriceRange}
            brands={brands}
            selectedBrands={selectedBrands}
            onToggleBrand={handleToggleBrand}
            brandCounts={brandCounts}
            conditions={conditions}
            selectedConditions={selectedConditions}
            onToggleCondition={handleToggleCondition}
            selectedAudience={selectedAudience}
            onAudienceChange={setSelectedAudience}
            onResetAll={handleResetAllFilters}
            hasActiveFilters={hasActiveFilters}
            isMobileOpen={isMobileFilterOpen}
            onCloseMobile={() => setIsMobileFilterOpen(false)}
            totalResults={sortedParts.length}
          />

          {/* Main Products Grid Section */}
          <div className="flex-1 min-w-0 space-y-4">
            {/* Results Count & Delivery Assurance */}
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
              <span>
                Showing <strong>{sortedParts.length}</strong> of {availableParts.length} bench-tested spare parts
              </span>
              <span className="hidden sm:inline">Certified Technicians & 3-Month Warranty</span>
            </div>

            {/* E-Commerce Product Card Grid or Empty State */}
            {sortedParts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {sortedParts.map((part) => {
                  const discountPct = part.originalPrice
                    ? Math.round(((part.originalPrice - part.price) / part.originalPrice) * 100)
                    : null;

                  return (
                    <div
                      key={part.id}
                      className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                    >
                      {/* Product Image Box with Badges */}
                      <div>
                        <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden cursor-pointer" onClick={() => setSelectedPartModal(part)}>
                          {part.imageUrl ? (
                            <img
                              src={part.imageUrl}
                              alt={part.title}
                              onError={(e) => {
                                (e.currentTarget as HTMLElement).style.display = 'none';
                                const fallback = (e.currentTarget.nextElementSibling as HTMLElement);
                                if (fallback) fallback.style.display = 'flex';
                              }}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : null}
                          <div
                            style={{ display: part.imageUrl ? 'none' : 'flex' }}
                            className="w-full h-full items-center justify-center p-4 bg-slate-100"
                          >
                            <ComponentSvgVisual category={part.category} size="lg" />
                          </div>

                          {/* Top Badges */}
                          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                            {part.badge && (
                              <span className="bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded shadow-xs uppercase tracking-wider">
                                {part.badge}
                              </span>
                            )}
                            <span className="bg-white/95 backdrop-blur-xs text-slate-800 text-[10px] font-bold px-1.5 py-0.5 rounded border border-slate-200 shadow-xs">
                              {part.condition}
                            </span>
                          </div>

                          {discountPct && (
                            <span className="absolute top-2.5 right-2.5 bg-rose-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded shadow-xs">
                              {discountPct}% OFF
                            </span>
                          )}

                          <div className="absolute bottom-2 left-2 right-2 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-1 rounded flex items-center justify-between">
                            <span className="flex items-center gap-1 text-emerald-400">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>{part.testStatus}</span>
                            </span>
                            <span className="text-slate-300 font-mono">{part.warranty}</span>
                          </div>
                        </div>

                        {/* Product Info */}
                        <div className="p-4 space-y-2.5">
                          {/* Device model tag */}
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-bold text-emerald-700 uppercase tracking-wider font-mono">
                              {part.deviceModel}
                            </span>
                            <span className="text-slate-400 font-medium">{part.category}</span>
                          </div>

                          {/* Title */}
                          <h3
                            onClick={() => setSelectedPartModal(part)}
                            className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-2 hover:text-emerald-700 cursor-pointer transition-colors leading-snug"
                          >
                            {part.title}
                          </h3>

                          {/* Star Rating & Reviews */}
                          <div className="flex items-center gap-2 text-xs">
                            <span className="inline-flex items-center gap-1 bg-emerald-700 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                              <span>{part.rating || part.associateRating}</span>
                              <Star className="w-2.5 h-2.5 fill-current" />
                            </span>
                            <span className="text-[11px] text-slate-400">
                              ({part.reviewCount || 24} ratings)
                            </span>
                          </div>

                          {/* Pricing Block with MRP strikethrough */}
                          <div className="pt-1 flex items-baseline gap-2">
                            <span className="text-lg font-black text-slate-900 font-mono">
                              ₹{part.price.toLocaleString()}
                            </span>
                            {part.originalPrice && (
                              <span className="text-xs text-slate-400 line-through">
                                M.R.P. ₹{part.originalPrice.toLocaleString()}
                              </span>
                            )}
                            {discountPct && (
                              <span className="text-xs font-bold text-emerald-600">
                                {discountPct}% off
                              </span>
                            )}
                          </div>

                          {/* EMI Teaser Badge on Card & GST input credit */}
                          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                            {part.price >= 1000 && (
                              <div className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-850 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-200/80">
                                <Calculator className="w-2.5 h-2.5 text-emerald-600" />
                                <span>EMI: <strong>₹{Math.round(part.price / 3).toLocaleString()}/mo</strong></span>
                              </div>
                            )}
                            <span className="text-[9px] font-bold text-blue-700 bg-blue-50 border border-blue-200/60 px-1.5 py-0.5 rounded">
                              GST Input Eligible
                            </span>
                          </div>

                          {/* Seller details & delivery */}
                          <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="truncate">Verified Lab: <strong>{part.associateName}</strong></span>
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0 ml-1" />
                            </div>
                            <div className="flex items-center justify-between text-slate-700 font-medium">
                              <span className="flex items-center gap-1">
                                <Truck className="w-3 h-3 text-emerald-600" />
                                <span>Express Tomorrow 2 PM</span>
                              </span>
                              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded">
                                Free Dispatch
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card Action Buttons: Add to Cart + Buy Now */}
                      <div className="p-3 pt-0 flex items-center gap-2">
                        <button
                          onClick={() => onAddToCart(part)}
                          className="flex-1 py-2 px-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <ShoppingCart className="w-3.5 h-3.5 text-emerald-700" />
                          <span>Add to Cart</span>
                        </button>

                        <button
                          onClick={() => onInstantBuy(part)}
                          className="py-2 px-3 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl transition-colors shadow-xs cursor-pointer"
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Empty State */
              <div className="text-center py-16 bg-white border border-slate-200 rounded-3xl p-8 space-y-4 shadow-xs">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto">
                  <SlidersHorizontal className="w-7 h-7" />
                </div>
                <div className="space-y-1 max-w-md mx-auto">
                  <h3 className="text-base font-bold text-slate-900">
                    No components match your current filters
                  </h3>
                  <p className="text-xs text-slate-500">
                    Try adjusting the price range slider or unchecking some categories to see more circular spare parts.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleResetAllFilters}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer inline-flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All Filters</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* E-Commerce Product Detail Modal */}
        {selectedPartModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-bold font-mono text-emerald-700 uppercase tracking-wider">
                    {selectedPartModal.deviceModel} · {selectedPartModal.category}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1 font-display">
                    {selectedPartModal.title}
                  </h2>
                  <div className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-3">
                    <span className="flex items-center gap-1 text-slate-700 font-semibold">
                      <span>Sold by: {selectedPartModal.associateName}</span>
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>{selectedPartModal.associateRating}</span>
                    </span>
                    <span>·</span>
                    <span className="text-emerald-700 font-bold">In Stock ({selectedPartModal.inStock} left)</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedPartModal(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Photo & Technical Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedPartModal.imageUrl ? (
                  <div className="rounded-xl overflow-hidden aspect-[4/3] bg-slate-100 border border-slate-200">
                    <img
                      src={selectedPartModal.imageUrl}
                      alt={selectedPartModal.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center p-6">
                    <ComponentSvgVisual category={selectedPartModal.category} size="lg" />
                  </div>
                )}

                {/* Diagnostic Test Specs */}
                <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Associate Inspection Report</span>
                  </div>
                  <div className="space-y-1.5 text-slate-600">
                    <div className="flex justify-between">
                      <span>Diagnostic Test:</span>
                      <strong className="text-emerald-700 font-bold">{selectedPartModal.testStatus}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Component Grade:</span>
                      <strong className="text-slate-900 font-bold">{selectedPartModal.condition}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Warranty Period:</span>
                      <strong className="text-slate-900 font-bold">{selectedPartModal.warranty}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Return Policy:</span>
                      <strong className="text-slate-900 font-bold">7-Day Replacement Guarantee</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Compatibility Checklist */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                <div className="font-bold text-slate-900">Verified Model Compatibility:</div>
                <div className="flex flex-wrap gap-2">
                  {selectedPartModal.compatibility.map((c) => (
                    <span key={c} className="bg-white border border-slate-300 text-slate-800 font-medium px-2.5 py-1 rounded-lg">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Simple EMI Calculator Widget for premium components */}
              <EmiCalculatorWidget price={selectedPartModal.price} />

              {/* Pincode checker */}
              <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-emerald-900">
                  <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Delivery to Pincode: <strong>560001 (Bengaluru)</strong></span>
                </div>
                <span className="text-emerald-800 font-bold">
                  Guaranteed Delivery by Tomorrow, 2 PM
                </span>
              </div>

              {/* Customer Ratings, Written Feedback & Replaced Part Photos */}
              <ReviewSection part={selectedPartModal} />

              {/* Price & Cart Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div>
                  <div className="text-xs text-slate-500 font-medium">Final Price (Incl. GST & Testing):</div>
                  <div className="text-2xl font-black text-slate-900 font-mono">
                    ₹{selectedPartModal.price.toLocaleString()}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      onAddToCart(selectedPartModal);
                      setSelectedPartModal(null);
                    }}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5"
                  >
                    <ShoppingCart className="w-4 h-4 text-emerald-700" />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    onClick={() => {
                      onInstantBuy(selectedPartModal);
                      setSelectedPartModal(null);
                    }}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
                  >
                    Proceed to Buy
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
