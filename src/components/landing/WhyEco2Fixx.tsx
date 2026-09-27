import React, { useState } from 'react';
import { ArrowRight, AlertTriangle, CheckCircle2, TrendingUp, Trash2, Cpu, Check, X } from 'lucide-react';

export const WhyEco2Fixx: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'with' | 'without'>('with');

  return (
    <section className="py-14 border-b border-slate-200 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/60 px-3 py-1 rounded-full inline-block">
            Solving India's Electronics Scrap Trap
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 font-display">
            Why Eco2Fixx Matters
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Comparing the traditional informal scrap route with the organized Eco2Fixx circular spare parts network.
          </p>
        </div>

        {/* Path Comparison Switcher */}
        <div className="flex justify-center">
          <div className="p-1 bg-white border border-slate-200 rounded-xl flex items-center gap-1 shadow-xs">
            <button
              onClick={() => setActiveTab('without')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'without'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Without Eco2Fixx (Junk Scrap)
            </button>
            <button
              onClick={() => setActiveTab('with')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'with'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              With Eco2Fixx (Circular Recovery)
            </button>
          </div>
        </div>

        {/* Path Flow Display */}
        {activeTab === 'without' ? (
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-rose-200 space-y-6 shadow-xs animate-in fade-in duration-200">
            <div className="flex items-center gap-2.5 text-rose-700">
              <Trash2 className="w-5 h-5" />
              <h3 className="text-lg font-bold font-display">The Traditional Dead End</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-rose-50/50 rounded-xl border border-rose-100 space-y-1.5">
                <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded">Stage 01</span>
                <div className="font-bold text-slate-900 text-xs">Forgotten in a Drawer</div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Over 120 million broken smartphones sit idle in Indian households because owners don't know who to trust or assume repair is too costly.
                </p>
              </div>

              <div className="p-4 bg-rose-50/50 rounded-xl border border-rose-100 space-y-1.5">
                <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded">Stage 02</span>
                <div className="font-bold text-slate-900 text-xs">Sold for ₹200–₹300 Scrap</div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Eventually handed over to scrap collectors for pennies. Intact Sony camera sensors and unlocked processors are destroyed.
                </p>
              </div>

              <div className="p-4 bg-rose-50/50 rounded-xl border border-rose-100 space-y-1.5">
                <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded">Stage 03</span>
                <div className="font-bold text-slate-900 text-xs">High Repair Costs for Others</div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Meanwhile, another customer who needs a display or camera is forced to pay ₹7,000 for brand replacement or buy low-quality Chinese copies.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-emerald-200 space-y-6 shadow-xs animate-in fade-in duration-200">
            <div className="flex items-center gap-2.5 text-emerald-800">
              <Cpu className="w-5 h-5 text-emerald-600" />
              <h3 className="text-lg font-bold font-display">The Eco2Fixx Circular Pipeline</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 text-xs">
              <div className="p-3.5 bg-emerald-50/50 rounded-xl border border-emerald-100 space-y-1">
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">01 · Scan</span>
                <div className="font-bold text-slate-900 text-xs">AI Valuation</div>
                <p className="text-slate-600 text-[11px]">Damaged phone diagnosed; indicative cash range shown.</p>
              </div>

              <div className="p-3.5 bg-emerald-50/50 rounded-xl border border-emerald-100 space-y-1">
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">02 · Match</span>
                <div className="font-bold text-slate-900 text-xs">Associate Buyout</div>
                <p className="text-slate-600 text-[11px]">Verified local repair shop inspects and pays direct cash.</p>
              </div>

              <div className="p-3.5 bg-emerald-50/50 rounded-xl border border-emerald-100 space-y-1">
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">03 · Harvest</span>
                <div className="font-bold text-slate-900 text-xs">Bench Testing</div>
                <p className="text-slate-600 text-[11px]">Technician tests cameras, boards, audio, batteries.</p>
              </div>

              <div className="p-3.5 bg-emerald-50/50 rounded-xl border border-emerald-100 space-y-1">
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">04 · List</span>
                <div className="font-bold text-slate-900 text-xs">Eco2Fixx Spares</div>
                <p className="text-slate-600 text-[11px]">Listed with 3-mo warranty for repair shops or users.</p>
              </div>

              <div className="p-3.5 bg-emerald-50/50 rounded-xl border border-emerald-100 space-y-1">
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">05 · Reuse</span>
                <div className="font-bold text-slate-900 text-xs">Device Saved</div>
                <p className="text-slate-600 text-[11px]">Working phone repaired at 60% lower cost than OEM.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
