import React, { useState } from 'react';
import { Smartphone, Cpu, ShoppingBag, Wrench, ShieldCheck, ChevronRight, Store, ArrowRight } from 'lucide-react';
import { AppTab } from '../../types';

interface HowItWorksProps {
  onNavigate: (tab: AppTab) => void;
}

const STEPS = [
  {
    number: '01',
    title: 'Tell us about your broken device',
    actor: 'Device owner',
    icon: Smartphone,
    shortSummary: 'Share the brand, model, and problem in under a minute.',
    details: 'A customer quickly selects the device, explains the issue, and gets a fair price range based on the parts that can still be reused.',
    linkTab: 'sell-device' as AppTab,
    linkLabel: 'Start selling'
  },
  {
    number: '02',
    title: 'We check what can be reused',
    actor: 'Eco2Fixx check',
    icon: Cpu,
    shortSummary: 'Finds working parts and estimates value.',
    details: 'The system checks the camera, motherboard, battery, and other important components to estimate resale and recovery value.',
    linkTab: 'sell-device' as AppTab,
    linkLabel: 'See value estimate'
  },
  {
    number: '03',
    title: 'A nearby shop buys the device',
    actor: 'Local repair shop',
    icon: Wrench,
    shortSummary: 'The shop inspects it and pays directly.',
    details: 'The technician checks the device in person, agrees on the value, and buys it directly from the owner without any confusion.',
    linkTab: 'associate-hub' as AppTab,
    linkLabel: 'Open repair view'
  },
  {
    number: '04',
    title: 'Existing parts are tested and listed',
    actor: 'Repair workbench',
    icon: ShoppingBag,
    shortSummary: 'Good parts are used for repairs or sold on the platform.',
    details: 'The shop checks screens, cameras, boards, and batteries, then either uses them for local repairs or lists them for sale.',
    linkTab: 'associate-hub' as AppTab,
    linkLabel: 'View inventory'
  },
  {
    number: '05',
    title: 'Buyers get trusted spare parts',
    actor: 'Spare part buyer',
    icon: ShieldCheck,
    shortSummary: 'Clean, tested parts with warranty and support.',
    details: 'Customers can buy used or recovered parts at lower cost, with quality checks and a simple warranty process.',
    linkTab: 'marketplace' as AppTab,
    linkLabel: 'Browse parts'
  }
];

export const HowItWorksSection: React.FC<HowItWorksProps> = ({ onNavigate }) => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-14 border-b border-slate-200 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/60 px-3 py-1 rounded-full inline-block">
            Decentralized Circular Model
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 font-display">
            How it works in 5 simple steps
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            A clear and easy process for people who want to sell a broken device, repair it, or buy a tested spare part without confusion.
          </p>
        </div>

        {/* 5-Step Process Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeStep === idx;
            return (
              <button
                key={step.number}
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-xl text-left border transition-all relative ${
                  isSelected
                    ? 'bg-white border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-bold font-mono ${isSelected ? 'text-emerald-700' : 'text-slate-400'}`}>
                    {step.number}
                  </span>
                  <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider mb-0.5 truncate">
                  {step.actor}
                </div>
                <div className="text-xs font-bold text-slate-900 leading-snug line-clamp-2">
                  {step.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Expanded Active Step Detail View */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold px-2.5 py-1 rounded bg-emerald-100 text-emerald-800">
                  Step {STEPS[activeStep].number} Detail
                </span>
                <span className="text-xs font-bold text-slate-600">
                  {STEPS[activeStep].actor}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                {STEPS[activeStep].title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {STEPS[activeStep].details}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <button
                onClick={() => onNavigate(STEPS[activeStep].linkTab)}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-xs"
              >
                <span>{STEPS[activeStep].linkLabel}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
