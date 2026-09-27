import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Cpu, RefreshCw, Smartphone, Wrench, Sparkles, MapPin, Tag, ArrowUpRight, DollarSign, Store, ShoppingBag } from 'lucide-react';
import workshopImg from '../../assets/images/associate_repair_workshop_1790419255786.avif';

interface MetricItem {
  label: string;
  value: string;
  highlight?: boolean;
}

interface StageItem {
  id: 1 | 2 | 3 | 4;
  stepNum: string;
  title: string;
  actor: string;
  actionText: string;
  heroImage: string;
  tag: string;
  tagColor: string;
  description: string;
  keyMetrics: MetricItem[];
  callout: string;
}

interface HeroCircularFlowVisualProps {
  onExploreStage?: (stage: number) => void;
  className?: string;
}

export const HeroCircularFlowVisual: React.FC<HeroCircularFlowVisualProps> = ({
  onExploreStage,
  className = ''
}) => {
  const [activeStage, setActiveStage] = useState<1 | 2 | 3 | 4>(2);

  const stages: StageItem[] = [
    {
      id: 1 as const,
      stepNum: '01',
      title: 'Customer Registers Damaged Device',
      actor: 'Customer A (Device Owner)',
      actionText: 'Instant AI Valuation & Shop Match',
      heroImage: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80',
      tag: 'Step 1: Direct Sell',
      tagColor: 'bg-rose-100 text-rose-800 border-rose-200',
      description: 'Customer with broken screen or water damage registers device. AI scans salvageable cameras, logic boards, and power modules, giving an instant indicative price range.',
      keyMetrics: [
        { label: 'Customer Cash Payout', value: '₹3,200 – ₹4,800', highlight: true },
        { label: 'Drop-off Options', value: 'Nearby Shop / Doorstep' },
        { label: 'Time to Cash', value: 'Instant on shop drop-off' }
      ],
      callout: 'Eco2Fixx does NOT buy or warehouse the phone. The local repair shop buys it directly.'
    },
    {
      id: 2 as const,
      stepNum: '02',
      title: 'Local Associate Purchases & Harvests',
      actor: 'Verified Mobile Repair Shop',
      actionText: 'Shop Owns Physical Inventory',
      heroImage: workshopImg,
      tag: 'Step 2: Shop Ownership',
      tagColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      description: 'Independent repair shop (e.g. Metro Logic Board Lab, MG Road) physically inspects phone, pays customer cash on the spot, recovers working OEM modules, and bench-tests them with diagnostic tools.',
      keyMetrics: [
        { label: 'Inventory Owner', value: 'Local Repair Shop', highlight: true },
        { label: 'Tested Yield', value: '4 Working Modules' },
        { label: 'Shop Profit Potential', value: '65% Gross Margin' }
      ],
      callout: 'Associate bears physical inventory risk and controls genuineness, bench testing, and warranty.'
    },
    {
      id: 3 as const,
      stepNum: '03',
      title: 'Dual Utilization: Offline Repair or Online Listing',
      actor: 'Associate Inventory Decision',
      actionText: 'Flexible Monetization',
      heroImage: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=800&q=80',
      tag: 'Step 3: Inventory Freedom',
      tagColor: 'bg-amber-100 text-amber-800 border-amber-200',
      description: 'The Associate can use components immediately for walk-in repair customers in their shop OR list them on Eco2Fixx with 1 click to reach buyers and repair technicians across India.',
      keyMetrics: [
        { label: 'Route A', value: 'Offline Walk-in Repair (100% Revenue)' },
        { label: 'Route B', value: 'Eco2Fixx Marketplace (National Reach)' },
        { label: 'Listing Time', value: 'Under 45 seconds' }
      ],
      callout: 'No lock-in. Associates maximize their shop earnings through local walk-ins or national sales.'
    },
    {
      id: 4 as const,
      stepNum: '04',
      title: 'Marketplace Sale & Circular Reuse',
      actor: 'Customer B & Other Repair Shops',
      actionText: 'Affordable Genuine Repairs',
      heroImage: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80',
      tag: 'Step 4: Circular Loop',
      tagColor: 'bg-blue-100 text-blue-800 border-blue-200',
      description: 'Buyer or another repair shop purchases genuine tested OEM spare part. Eco2Fixx secures payment via escrow, coordinates insured shipping, and takes an 8–10% marketplace facilitation fee.',
      keyMetrics: [
        { label: 'Buyer Savings', value: '60% vs Brand Center', highlight: true },
        { label: 'Eco2Fixx Take-Rate', value: '8% - 10% Commission' },
        { label: 'Warranty Protection', value: '3 Months Replacement' }
      ],
      callout: 'Zero e-waste to landfills. Components get a 2nd life while repair businesses thrive.'
    }
  ];

  const current = stages.find((s) => s.id === activeStage) || stages[1];

  return (
    <div className={`rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden ${className}`}>
      {/* Top Banner: E-Commerce Circular Architecture Ribbon */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-500 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Interactive Product Flow
            </span>
            <span className="text-xs text-emerald-300 font-semibold flex items-center gap-1">
              <RefreshCw className="w-3.5 h-3.5" />
              <span>The Eco2Fixx Circular Blueprint</span>
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black font-display tracking-tight text-white">
            How Broken Devices Turn into Tested Spare Parts
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Click each step below to see how phone owners, local repair shops, and buyers connect without Eco2Fixx ever needing to warehouse physical e-waste.
          </p>
        </div>

        {/* Quick Cash Flow Highlight */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-3.5 border border-white/20 shrink-0 text-right md:text-left">
          <div className="text-[11px] text-emerald-300 font-medium">Eco2Fixx Business Model:</div>
          <div className="text-lg font-black text-white font-mono">Asset-Light Marketplace</div>
          <div className="text-[10px] text-slate-300">Shops own inventory · 8-10% fee on sales</div>
        </div>
      </div>

      {/* Stage Navigation Pills (Product Launch Style) */}
      <div className="bg-slate-100 p-2 sm:p-3 border-b border-slate-200 flex flex-nowrap overflow-x-auto gap-2 items-center">
        {stages.map((stg) => {
          const isSelected = activeStage === stg.id;
          return (
            <button
              key={stg.id}
              onClick={() => {
                setActiveStage(stg.id);
                onExploreStage?.(stg.id);
              }}
              className={`flex-1 min-w-[200px] text-left p-3 rounded-xl transition-all border ${
                isSelected
                  ? 'bg-white border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                  : 'bg-white/70 border-slate-200 hover:bg-white hover:border-slate-300 text-slate-600'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${stg.tagColor}`}>
                  {stg.tag}
                </span>
                <span className="text-[11px] font-mono font-bold text-slate-400">
                  {stg.stepNum}/04
                </span>
              </div>
              <div className="text-xs font-bold text-slate-900 truncate">{stg.actor}</div>
              <div className="text-[11px] text-slate-500 truncate mt-0.5">{stg.actionText}</div>
            </button>
          );
        })}
      </div>

      {/* High-Fidelity Active Stage Presentation (Rich Image + Details + Economics) */}
      <div className="p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center bg-white">
        {/* Left: Real High-Resolution Visual Showcase with Live Overlay Badges */}
        <div className="lg:col-span-6 relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 aspect-[16/10] bg-slate-900 group">
          <img
            src={current.heroImage}
            alt={current.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />

          {/* Contextual Overlays on Image */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            <span className="bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-lg border border-white/20 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{current.actor}</span>
            </span>
          </div>

          <div className="absolute top-3 right-3">
            <span className="bg-emerald-600 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-lg shadow-md uppercase tracking-wider">
              Live Flow Active
            </span>
          </div>

          {/* Bottom Card on Image */}
          <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md rounded-xl p-3.5 border border-white/40 shadow-md">
            <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider mb-0.5">
              Physical Reality on the Ground
            </div>
            <div className="text-xs font-semibold text-slate-900">
              {current.callout}
            </div>
          </div>
        </div>

        {/* Right: Detailed Explanation, Metrics & Action */}
        <div className="lg:col-span-6 space-y-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${current.tagColor}`}>
                Stage {current.stepNum} of 04
              </span>
              <span className="text-xs font-semibold text-slate-500">
                {current.actionText}
              </span>
            </div>
            <h4 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
              {current.title}
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {current.description}
            </p>
          </div>

          {/* Key Metrics Grid (Indian Rupee / Commerce Stats) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
            {current.keyMetrics.map((km, i) => (
              <div key={i} className="space-y-0.5">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  {km.label}
                </div>
                <div
                  className={`text-sm sm:text-base font-black ${
                    km.highlight ? 'text-emerald-700 font-mono' : 'text-slate-900'
                  }`}
                >
                  {km.value}
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Navigation Action */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {current.id === 1 && (
              <button
                onClick={() => onExploreStage?.(1)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <span>Try Instant Sell Calculator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {current.id === 2 && (
              <button
                onClick={() => onExploreStage?.(2)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <span>Open Associate Dukaan Hub</span>
                <Store className="w-3.5 h-3.5" />
              </button>
            )}

            {current.id === 3 && (
              <button
                onClick={() => onExploreStage?.(2)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <span>See Recovered Inventory Manager</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {current.id === 4 && (
              <button
                onClick={() => onExploreStage?.(3)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <span>Browse Spare Parts Marketplace</span>
                <ShoppingBag className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              onClick={() => setActiveStage((prev) => (prev < 4 ? ((prev + 1) as any) : 1))}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs px-4 py-2.5 rounded-xl border border-slate-300 transition-colors flex items-center gap-1 ml-auto"
            >
              <span>Next Stage ({activeStage < 4 ? activeStage + 1 : 1}/4)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Circular Marketplace Trust & Guarantees Strip */}
      <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span><strong>Zero Inventory Liability:</strong> Eco2Fixx never warehouses damaged scrap.</span>
        </div>
        <div className="flex items-center gap-2">
          <Store className="w-4 h-4 text-emerald-600 shrink-0" />
          <span><strong>Associate Carries Risk:</strong> Shop inspects, pays cash, and tests parts.</span>
        </div>
        <div className="flex items-center gap-2">
          <RefreshCw className="w-4 h-4 text-emerald-600 shrink-0" />
          <span><strong>8–10% Marketplace Commission:</strong> Safe escrow & pan-India courier.</span>
        </div>
      </div>
    </div>
  );
};
