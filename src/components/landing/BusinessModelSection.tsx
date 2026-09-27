import React, { useState } from 'react';
import { DollarSign, ShieldAlert, ArrowRight, Building, CheckCircle, Check, Store, Wallet, Percent, TrendingUp } from 'lucide-react';

export const BusinessModelSection: React.FC = () => {
  const [salePrice, setSalePrice] = useState<number>(2499);
  const commissionRate = 0.10; // 10%
  const eco2fixxCommission = Math.round(salePrice * commissionRate);
  const associatePayout = salePrice - eco2fixxCommission;

  return (
    <section className="py-14 border-b border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full inline-block">
            Transparent Pricing & Platform Trust
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 font-display">
            How Eco2Fixx Protects Buyers, Sellers & Repair Shops
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Eco2Fixx connects local device sellers directly with verified neighborhood repair shops and buyers, providing diagnostic testing standards, escrow payment protection, and a simple 10% platform facilitation fee.
          </p>
        </div>

        {/* Roles & Guarantees Matrix */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs">
          <div className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Building className="w-4 h-4 text-emerald-600" />
            <span>Clear Roles & Service Guarantees</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2 shadow-xs">
              <div className="font-bold text-emerald-800 text-sm flex items-center gap-1.5">
                <Store className="w-4 h-4 text-emerald-600" />
                <span>What Associate Repair Shops Own & Do:</span>
              </div>
              <ul className="text-slate-600 space-y-2 pt-1">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Physical Inventory:</strong> Buys broken phones directly from Customer A using shop cash.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Testing & Grading:</strong> Bench-tests camera, display, battery, and logic chips with multimeters.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Offline Profits:</strong> Uses salvaged parts for walk-in repairs (saves 70% vs duplicate Chinese copies).</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Warranty Fulfillment:</strong> Backs components per standard 1–3 month terms.</span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2 shadow-xs">
              <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <Wallet className="w-4 h-4 text-emerald-600" />
                <span>What Eco2Fixx Platform Provides:</span>
              </div>
              <ul className="text-slate-600 space-y-2 pt-1">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>AI Valuation Engine:</strong> Real-time estimation of component salvage value for consumers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Pan-India Marketplace:</strong> Search, buyer discovery, courier logistics, and tracking.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Escrow & Settlement:</strong> Holds buyer payment until part arrives and passes inspection.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Trust & Privacy:</strong> Masks buyer/seller contact info to prevent fraud and disintermediation.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Interactive Transaction Fee Simulator (Indian Rupee Model) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded uppercase tracking-wider">
              10% Marketplace Commission
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
              Live Transaction Split Calculator
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              When Customer B or a fellow repair shop purchases a recovered component, payment is escrowed safely. The Associate receives their bulk 90% payout upon delivery, and Eco2Fixx retains a 10% platform facilitation fee.
            </p>

            <div className="space-y-2 pt-1">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Select Sample Spare Part Price:
              </label>
              <div className="flex flex-wrap gap-2">
                {[999, 1899, 2499, 4999, 7499].map((p) => (
                  <button
                    key={p}
                    onClick={() => setSalePrice(p)}
                    className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-all ${
                      salePrice === p
                        ? 'bg-emerald-600 text-white font-bold border-emerald-600 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    ₹{p.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
                <span>Unit Economics Breakdown</span>
                <span className="font-mono text-emerald-600 font-bold">Live Example</span>
              </div>

              <div className="space-y-2.5">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-600 font-medium">Buyer Payment (Customer B)</div>
                    <div className="text-[10px] text-emerald-600">Escrowed upon checkout</div>
                  </div>
                  <div className="text-base font-bold text-slate-900 font-mono">
                    ₹{salePrice.toLocaleString()}
                  </div>
                </div>

                <div className="p-3 bg-emerald-50/60 rounded-lg border border-emerald-200 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-emerald-900 font-bold">Associate Net Payout (90%)</div>
                    <div className="text-[10px] text-emerald-700">Bank transfer to repair shop after delivery</div>
                  </div>
                  <div className="text-base font-bold text-emerald-700 font-mono">
                    ₹{associatePayout.toLocaleString()}
                  </div>
                </div>

                <div className="p-3 bg-blue-50/60 rounded-lg border border-blue-200 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-blue-900 font-bold">Eco2Fixx Marketplace Fee (10%)</div>
                    <div className="text-[10px] text-blue-700">Covers AI diagnostics, escrow, platform server</div>
                  </div>
                  <div className="text-base font-bold text-blue-700 font-mono">
                    ₹{eco2fixxCommission.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="pt-2 text-[11px] text-slate-400 text-center border-t border-slate-100">
                *Illustrative example. Platform commission scales with seller volume tiers.
              </div>
            </div>
          </div>
        </div>

        {/* Future Revenue Streams (Roadmap) */}
        <div className="pt-6 border-t border-slate-200">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            Potential Future Revenue Streams for Eco2Fixx:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="font-bold text-slate-900">Repair Shop SaaS Subscriptions</div>
              <p className="text-slate-500 text-[11px]">
                Inventory tracking, multi-channel repair bench tooling, automated diagnostic logging for high-volume shops.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="font-bold text-slate-900">Sponsored Spare Parts Placement</div>
              <p className="text-slate-500 text-[11px]">
                Verified Associates can sponsor high-demand parts to appear at the top of city search results.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="font-bold text-slate-900">B2B Bulk Component Logistics</div>
              <p className="text-slate-500 text-[11px]">
                Dedicated intra-city courier and batch testing partnerships connecting regional electronic repair clusters.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
