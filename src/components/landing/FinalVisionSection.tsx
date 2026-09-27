import React from 'react';
import { ArrowRight, Layers, Smartphone, Laptop, Tablet, Tv, Home, Car } from 'lucide-react';
import { AppTab } from '../../types';

interface FinalVisionProps {
  onNavigate: (tab: AppTab) => void;
  onStartTour: () => void;
}

const EXPANSION_CATEGORIES = [
  { name: 'Smartphones', status: 'Phase 1: Active Focus', icon: Smartphone },
  { name: 'Laptops & MacBooks', status: 'Phase 1: Active Pilot', icon: Laptop },
  { name: 'Tablets & iPads', status: 'Phase 2: Next Rollout', icon: Tablet },
  { name: 'Smart TVs', status: 'Phase 2: Next Rollout', icon: Tv },
  { name: 'Home Appliances', status: 'Phase 3: Concept', icon: Home },
  { name: 'Automotive Modules', status: 'Phase 3: Concept', icon: Car },
];

export const FinalVisionSection: React.FC<FinalVisionProps> = ({ onNavigate, onStartTour }) => {
  return (
    <section className="py-16 border-b border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full inline-block">
            Pan-India Circular Vision
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-display text-balance">
            Give Every Recoverable Component a Second Life.
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-balance">
            Eco2Fixx aims to build India's largest decentralized marketplace connecting damaged electronic hardware, neighborhood repair businesses, and people who need the parts inside them.
          </p>
        </div>

        {/* Category expansion roadmap */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 max-w-4xl mx-auto text-left space-y-5 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Phased Category Rollout across Indian Metros
            </span>
            <span className="text-xs font-semibold text-emerald-700">
              We start with phones & laptops. Prove the unit economics. Then expand.
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {EXPANSION_CATEGORIES.map((cat, i) => {
              const IconComp = cat.icon;
              return (
                <div
                  key={cat.name}
                  className={`p-3.5 rounded-xl border text-center space-y-2 transition-all flex flex-col items-center justify-center ${
                    i < 2
                      ? 'bg-white border-emerald-500 shadow-xs ring-1 ring-emerald-500/20'
                      : 'bg-white/60 border-slate-200 opacity-70'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${i < 2 ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-bold text-slate-800 truncate w-full">{cat.name}</div>
                  <div className="text-[10px] font-medium text-emerald-700 truncate w-full">{cat.status}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Bar */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => onNavigate('sell-device')}
            className="px-6 py-3 text-xs font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-xl transition-all shadow-xs flex items-center gap-2"
          >
            <span>Sell a Broken Phone (+ Instant ₹)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onNavigate('marketplace')}
            className="px-6 py-3 text-xs font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-colors shadow-xs"
          >
            Explore Tested Spare Parts
          </button>
        </div>

        <div>
          <p className="text-xs font-mono tracking-widest text-slate-400 uppercase">
            Recover · Reuse · Repair · Repeat
          </p>
        </div>
      </div>
    </section>
  );
};
