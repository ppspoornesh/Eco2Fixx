import React, { useState } from 'react';
import { RotateCw, Sparkles, CheckCircle2, RefreshCw } from 'lucide-react';

const CIRCULAR_NODES = [
  { id: 1, label: 'Damaged Product', desc: 'Customer registers non-working phone instead of dumping in scrap' },
  { id: 2, label: 'Component Recovery', desc: 'Verified local repair shop tests and harvests working OEM modules' },
  { id: 3, label: 'Verified Component', desc: 'Working displays, cameras, and logic boards graded with warranty' },
  { id: 4, label: 'Affordable Repair', desc: 'Another phone is repaired at 60% lower cost than brand service centers' },
  { id: 5, label: 'Extended Life', desc: 'Smartphone usable lifespan prolonged by 2–4 years' },
  { id: 6, label: 'Zero Scrap Waste', desc: 'Hardware materials stay in economic circulation across India' },
];

export const CircularEconomySection: React.FC = () => {
  const [activeNode, setActiveNode] = useState(0);

  return (
    <section className="py-14 border-b border-slate-200 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full inline-block">
            Sustainable Hardware Lifecycle
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 font-display">
            The Eco2Fixx Circular Loop
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Instead of treating damaged phones as electronic waste, Eco2Fixx routes reusable modules back into India's vibrant repair economy.
          </p>
        </div>

        {/* Circular Infographic Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: The Circular Interactive Ring */}
          <div className="lg:col-span-6 flex items-center justify-center relative py-6">
            <div className="relative w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] rounded-full border-2 border-dashed border-emerald-200 flex items-center justify-center bg-slate-50/50">
              {/* Central Hub */}
              <div className="relative z-10 w-28 h-28 rounded-full bg-white border-2 border-emerald-500 flex flex-col items-center justify-center shadow-lg text-center p-2">
                <span className="text-sm font-bold text-slate-900 font-display">Eco2Fixx</span>
                <span className="text-[10px] text-emerald-600 font-semibold">Platform Hub</span>
                <RotateCw className="w-3.5 h-3.5 text-emerald-600 mt-1 animate-[spin_10s_linear_infinite]" />
              </div>

              {/* 6 Circular Nodes */}
              {CIRCULAR_NODES.map((node, i) => {
                const angle = (i * (360 / CIRCULAR_NODES.length) - 90) * (Math.PI / 180);
                const radius = 145; // radius
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                const isSelected = activeNode === i;

                return (
                  <button
                    key={node.id}
                    onClick={() => setActiveNode(i)}
                    style={{
                      transform: `translate(${x}px, ${y}px)`
                    }}
                    className={`absolute z-20 px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition-all text-center max-w-[120px] shadow-xs ${
                      isSelected
                        ? 'bg-emerald-600 border-emerald-600 text-white scale-105 shadow-md'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-emerald-300'
                    }`}
                  >
                    <div className="truncate">{node.label}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Explanatory Proof & Principles */}
          <div className="lg:col-span-6 space-y-5">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 shadow-xs">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-700 uppercase tracking-wider bg-emerald-100 px-2 py-0.5 rounded">
                  Loop Phase {activeNode + 1} of 6
                </span>
                <span className="text-slate-400">Continuous Indian Supply Loop</span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 font-display">
                {CIRCULAR_NODES[activeNode].label}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {CIRCULAR_NODES[activeNode].desc}
              </p>
            </div>

            {/* Principles: People vs Environment */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2 shadow-xs">
                <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                  For Customers & Repair Shops
                </div>
                <ul className="text-xs text-slate-600 space-y-1.5">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>60% lower spare part repair bills</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Instant cash buyout for broken phones</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>High-margin original OEM parts for shops</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2 shadow-xs">
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  For The Environment
                </div>
                <ul className="text-xs text-slate-600 space-y-1.5">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Extended electronic device lifespan</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Zero unnecessary landfill dumping</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Reduced import of duplicate copies</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
