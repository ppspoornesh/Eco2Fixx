import React, { useState } from 'react';
import { ComponentSvgVisual } from '../common/ComponentSvgVisual';
import { Check, X, ShieldAlert, Sparkles, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

const DAMAGED_DEVICE_COMPONENTS = [
  { name: 'Rear Dual Camera (12MP)', category: 'camera', state: 'Intact Optics & OIS', salvageable: true, value: '₹2,100' },
  { name: 'OLED Display Panel', category: 'display', state: 'Cracked Outer Glass', salvageable: false, value: '₹0 (Cracked)' },
  { name: 'A15 Bionic Logic Motherboard', category: 'logic', state: 'Functional Unlocked Chips', salvageable: true, value: '₹2,800' },
  { name: 'Li-ion Battery Cell (88% Health)', category: 'battery', state: 'Stable Health', salvageable: true, value: '₹750' },
  { name: 'Taptic & Stereo Speaker', category: 'speaker', state: 'Full Acoustic Calibration', salvageable: true, value: '₹550' },
  { name: 'Charging Port & Primary Mic', category: 'charging', state: 'Fast Charging Verified', salvageable: true, value: '₹400' },
];

export const CoreProblemSection: React.FC = () => {
  const [viewMode, setViewMode] = useState<'traditional' | 'eco2fixx'>('eco2fixx');

  return (
    <section className="py-20 bg-slate-50/60 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200/80 shadow-2xs">
            <Zap className="w-3.5 h-3.5 text-emerald-600" />
            <span>The Circular Recommerce Reality</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 font-display">
            Your damaged device still has real value
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            A cracked screen may look useless, but the camera, battery, and board inside often still work. Instead of selling it as scrap, you can get a fair value and keep useful parts in circulation.
          </p>
        </div>

        {/* High-Contrast Interactive Switcher */}
        <div className="flex justify-center">
          <div className="p-1.5 bg-white border border-slate-200 rounded-2xl flex items-center gap-1.5 shadow-sm">
            <button
              type="button"
              onClick={() => setViewMode('traditional')}
              className={`px-5 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                viewMode === 'traditional'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${viewMode === 'traditional' ? 'bg-white' : 'bg-rose-500'}`} />
              <span>Informal Scrap Scraping (₹300)</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('eco2fixx')}
              className={`px-5 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                viewMode === 'eco2fixx'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${viewMode === 'eco2fixx' ? 'bg-white' : 'bg-emerald-500'}`} />
              <span>Eco2Fixx Verified Salvage (₹6,600 Value)</span>
            </button>
          </div>
        </div>

        {/* Visual Comparison Grid with elevated cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Device Perspective Card */}
          <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-3xl p-7 sm:p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className={`text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                  viewMode === 'traditional'
                    ? 'bg-rose-100 text-rose-800 border border-rose-200'
                    : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                }`}>
                  {viewMode === 'traditional' ? 'Unregulated Scrap Path' : 'Certified Recommerce Path'}
                </span>
                <span className="text-xs text-slate-400 font-mono font-medium">Specimen: iPhone 13</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display leading-snug">
                {viewMode === 'traditional'
                  ? 'Owner assumes the entire device is worthless garbage.'
                  : 'Local technicians recover ₹6,600 in certified spare parts.'}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {viewMode === 'traditional'
                  ? 'Because the glass is shattered, owners dump the handset in a drawer or sell it to unverified scrap collectors for ₹300. Working cameras, chips, and power ICs end up in landfills or furnace waste.'
                  : 'Eco2Fixx connects the seller to a vetted local repair lab. The technician pays ₹3,200–₹4,800 direct cash, tests and harvests the camera, logic board, and battery, and uses them to fix devices affordably.'}
              </p>
            </div>

            {/* Spec Sheet Sub-Card */}
            <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-3 shadow-2xs">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-200/60">
                <span className="text-slate-500 font-medium">Device Model</span>
                <span className="font-bold text-slate-900">Apple iPhone 13 (128GB)</span>
              </div>
              <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-200/60">
                <span className="text-slate-500 font-medium">Visible Damage</span>
                <span className="font-semibold text-rose-600">Shattered Front Display</span>
              </div>
              <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-200/60">
                <span className="text-slate-500 font-medium">Internal Assemblies</span>
                <span className="font-semibold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>100% Bench Functional</span>
                </span>
              </div>
              <div className="pt-1 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">
                    Net Cash to Device Owner
                  </div>
                  <div className={`font-black font-mono mt-0.5 ${
                    viewMode === 'traditional' ? 'text-rose-600 text-lg' : 'text-emerald-700 text-xl'
                  }`}>
                    {viewMode === 'traditional' ? '₹300' : '₹3,200 – ₹4,800'}
                  </div>
                </div>
                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg ${
                  viewMode === 'traditional'
                    ? 'bg-rose-50 text-rose-700 border border-rose-200'
                    : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                }`}>
                  {viewMode === 'traditional' ? 'Informal Scrap' : 'Instant Cash'}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Deconstructed Anatomy Breakdown with elevated modern cards */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {DAMAGED_DEVICE_COMPONENTS.map((comp) => {
                const isSalvageable = comp.salvageable;
                return (
                  <div
                    key={comp.name}
                    className={`p-4 rounded-2xl border transition-all ${
                      viewMode === 'traditional'
                        ? 'bg-white border-slate-200 opacity-60 shadow-2xs'
                        : isSalvageable
                        ? 'bg-white border-slate-200 hover:border-emerald-400 shadow-sm hover:shadow-md'
                        : 'bg-slate-100/70 border-slate-200/80 opacity-70'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 shrink-0">
                        <ComponentSvgVisual category={comp.category} size="sm" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className="text-xs font-bold text-slate-900 truncate">
                            {comp.name}
                          </h4>
                          {viewMode === 'eco2fixx' && isSalvageable && (
                            <span className="text-xs font-mono font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60 shrink-0">
                              {comp.value}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1">
                          {comp.state}
                        </p>
                        <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                          {viewMode === 'traditional' ? (
                            <span className="text-rose-600 flex items-center gap-1 font-semibold">
                              <X className="w-3.5 h-3.5 text-rose-500" />
                              <span>Discarded as Scrap</span>
                            </span>
                          ) : isSalvageable ? (
                            <span className="text-emerald-700 flex items-center gap-1 font-bold">
                              <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                              <span>Tested & Usable OEM Spare</span>
                            </span>
                          ) : (
                            <span className="text-slate-400 flex items-center gap-1 font-medium">
                              <X className="w-3.5 h-3.5" />
                              <span>Cracked Assembly</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-slate-600 font-medium text-center sm:text-left">
                Every component is verified through standardized 12-point hardware bench tests.
              </span>
              <span className="font-bold text-emerald-700 shrink-0 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                100% Genuine Salve Rate
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

