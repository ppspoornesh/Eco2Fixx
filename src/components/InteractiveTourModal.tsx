import React, { useState } from 'react';
import { AppTab } from '../types';
import { X, ArrowRight, ArrowLeft, CheckCircle2, ShieldCheck, Repeat, DollarSign, Store, ShoppingBag, Award } from 'lucide-react';
import { ComponentSvgVisual } from './common/ComponentSvgVisual';

interface InteractiveTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToTab: (tab: AppTab) => void;
}

const TOUR_STEPS = [
  {
    step: 1,
    title: 'Customer A Has a Damaged Phone',
    subtitle: 'Broken doesn’t mean worthless',
    actor: 'Customer A (Device Owner)',
    description:
      'Customer A has an iPhone 13 with cracked back glass and display flicker. Instead of leaving it in a drawer or selling for negligible scrap value, they register the device on Eco2Fixx to discover what components are still valuable.',
    insight: 'Most electronic devices fail due to one component, while 70-85% of internal modular parts remain in working order.',
    demoActionLabel: 'Try Customer Sell Flow',
    targetTab: 'sell-device' as AppTab,
    visualType: 'phone_damaged'
  },
  {
    step: 2,
    title: 'AI Evaluates Recoverable Components',
    subtitle: 'Indicative recovery potential & value range',
    actor: 'Eco2Fixx Diagnostic Engine',
    description:
      'Eco2Fixx analyzes device model, damage pattern, and functioning sub-systems. It calculates recovery probabilities: Camera (High), Motherboard (High), Audio (High), Display (Low). It gives an indicative valuation: ₹3,200 – ₹4,800.',
    insight: 'AI provides an indicative estimate to set expectations. Physical testing and final purchase price remain with the human technician.',
    demoActionLabel: 'View AI Assessment Specs',
    targetTab: 'sell-device' as AppTab,
    visualType: 'ai_breakdown'
  },
  {
    step: 3,
    title: 'Associate Purchases Damaged Product',
    subtitle: 'The Associate owns the physical inventory',
    actor: 'Associate (Independent Repair Business)',
    description:
      'Eco2Fixx matches Customer A with a verified nearby Associate shop ("Metro Logic Board Lab"). Customer A visits, the technician inspects the device, negotiates the final purchase price, and buys it directly. Eco2Fixx does NOT warehouse or buy inventory.',
    insight: 'Inventory risk is distributed across local repair entrepreneurs who already have the testing benches and repair demand.',
    demoActionLabel: 'Explore Associate Dukaan Hub',
    targetTab: 'associate-hub' as AppTab,
    visualType: 'associate_shop'
  },
  {
    step: 4,
    title: 'Component Recovery & Dual Channel',
    subtitle: 'Use offline OR list on Eco2Fixx',
    actor: 'Associate Workbench',
    description:
      'The Associate extracts usable components, bench-tests them, and assigns condition grades. The Associate has two profitable options: A) Use components for walk-in offline repairs, or B) List them on the Eco2Fixx marketplace for other repair shops and consumers.',
    insight: 'Associates gain high-margin OEM parts inventory without waiting weeks for imported supplier batches.',
    demoActionLabel: 'Manage Recovered Inventory',
    targetTab: 'associate-hub' as AppTab,
    visualType: 'recovery_choice'
  },
  {
    step: 5,
    title: 'Customer B or Shop B Discovers Part',
    subtitle: 'Search, filter, and purchase with warranty',
    actor: 'Customer B (Buyer) / Repair Shop B',
    description:
      'Customer B needs an iPhone 13 display or camera. They search Eco2Fixx, compare verified Associate listings, review diagnostic test status, condition grades, and warranty terms. They place an order securely through Eco2Fixx escrow.',
    insight: 'Buyers get authentic OEM parts at 50-70% lower prices compared to brand-authorized service centers.',
    demoActionLabel: 'Browse Spare Parts Store',
    targetTab: 'marketplace' as AppTab,
    visualType: 'marketplace_order'
  },
  {
    step: 6,
    title: 'Marketplace Transaction & Split',
    subtitle: 'Escrow payment, fulfillment & circular loop',
    actor: 'Eco2Fixx Platform Economics',
    description:
      'Customer B pays ₹1,899. Eco2Fixx holds funds in escrow. The Associate ships the part or prepares it for pickup. Upon delivery and verification, Eco2Fixx disburses the payout (₹1,709) to the Associate and retains its 10% platform fee (₹190).',
    insight: 'Asset-light circular marketplace: Eco2Fixx generates high-margin revenue with zero warehousing overhead.',
    demoActionLabel: 'Review Startup Unit Economics',
    targetTab: 'business-model' as AppTab,
    visualType: 'circular_split'
  }
];

export const InteractiveTourModal: React.FC<InteractiveTourModalProps> = ({
  isOpen,
  onClose,
  onNavigateToTab
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  if (!isOpen) return null;

  const currentStep = TOUR_STEPS[currentStepIndex];

  const handleNext = () => {
    if (currentStepIndex < TOUR_STEPS.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleAction = () => {
    onNavigateToTab(currentStep.targetTab);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-300">
              Step {currentStep.step} of {TOUR_STEPS.length}
            </span>
            <span className="text-xs font-bold text-slate-600">
              {currentStep.actor}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-slate-900 font-display">
              {currentStep.title}
            </h2>
            <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              {currentStep.subtitle}
            </p>
          </div>

          <p className="text-slate-600 text-sm leading-relaxed">
            {currentStep.description}
          </p>

          {/* Visual Interactive Representation */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            {currentStep.visualType === 'phone_damaged' && (
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 shrink-0">
                  <ComponentSvgVisual category="display" size="sm" />
                </div>
                <div className="space-y-1 text-xs">
                  <div className="font-bold text-slate-900">Apple iPhone 13 (Customer A)</div>
                  <div className="text-slate-500">Symptom: Screen flickering + shattered rear back glass</div>
                  <div className="text-emerald-700 font-semibold flex items-center gap-1.5 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Internal camera, motherboard, logic chips undamaged & fully recoverable</span>
                  </div>
                </div>
              </div>
            )}

            {currentStep.visualType === 'ai_breakdown' && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-white rounded-lg border border-slate-200 text-center shadow-2xs">
                  <ComponentSvgVisual category="camera" size="sm" className="mx-auto mb-1" />
                  <div className="text-xs font-bold text-slate-900">Camera Module</div>
                  <div className="text-[10px] text-emerald-700 font-semibold">High Potential</div>
                  <div className="text-xs font-mono font-bold text-slate-900 mt-0.5">₹1,800 – ₹2,400</div>
                </div>
                <div className="p-3 bg-white rounded-lg border border-slate-200 text-center shadow-2xs">
                  <ComponentSvgVisual category="logic" size="sm" className="mx-auto mb-1" />
                  <div className="text-xs font-bold text-slate-900">A15 Board</div>
                  <div className="text-[10px] text-emerald-700 font-semibold">High Potential</div>
                  <div className="text-xs font-mono font-bold text-slate-900 mt-0.5">₹2,200 – ₹3,200</div>
                </div>
                <div className="p-3 bg-white rounded-lg border border-slate-200 text-center shadow-2xs">
                  <ComponentSvgVisual category="speaker" size="sm" className="mx-auto mb-1" />
                  <div className="text-xs font-bold text-slate-900">Speaker Unit</div>
                  <div className="text-[10px] text-emerald-700 font-semibold">High Potential</div>
                  <div className="text-xs font-mono font-bold text-slate-900 mt-0.5">₹450 – ₹700</div>
                </div>
                <div className="p-3 bg-white rounded-lg border border-slate-200 text-center shadow-2xs">
                  <ComponentSvgVisual category="display" size="sm" className="mx-auto mb-1" />
                  <div className="text-xs font-bold text-slate-900">OLED Assembly</div>
                  <div className="text-[10px] text-amber-700 font-semibold">Low Potential</div>
                  <div className="text-xs font-mono font-bold text-slate-900 mt-0.5">₹600 – ₹1,000</div>
                </div>
              </div>
            )}

            {currentStep.visualType === 'associate_shop' && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-2 text-xs">
                <div className="space-y-1">
                  <div className="font-bold text-slate-900 text-sm">Metro Logic Board Lab (Verified Associate)</div>
                  <div className="text-slate-500">Physical inspection performed · Directly negotiates & pays Customer A cash</div>
                  <div className="text-emerald-700 font-semibold flex items-center gap-1.5 mt-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Associate carries physical inventory risk · Eco2Fixx holds zero stock</span>
                  </div>
                </div>
                <div className="px-3.5 py-2 bg-emerald-50 rounded-lg border border-emerald-200 text-center shrink-0">
                  <div className="text-[10px] text-slate-500 font-medium">Indicative Valuation</div>
                  <div className="text-base font-black text-emerald-700 font-mono">₹3,200 – ₹4,800</div>
                </div>
              </div>
            )}

            {currentStep.visualType === 'recovery_choice' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1 shadow-2xs">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <span>Option A:</span> Offline Shop Repair
                  </div>
                  <p className="text-slate-600">
                    Associate uses the recovered parts immediately for walk-in repair customers in their own local shop.
                  </p>
                </div>
                <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1 shadow-2xs">
                  <div className="font-bold text-emerald-700 flex items-center gap-1.5">
                    <span>Option B:</span> List on Eco2Fixx
                  </div>
                  <p className="text-slate-600">
                    Associate lists component online to sell to repair shops nationwide (B2B) or end-consumers (B2C).
                  </p>
                </div>
              </div>
            )}

            {currentStep.visualType === 'marketplace_order' && (
              <div className="flex items-center justify-between p-2 text-xs">
                <div className="flex items-center gap-3">
                  <ComponentSvgVisual category="camera" size="sm" />
                  <div>
                    <div className="font-bold text-slate-900 text-sm">OEM Dual Camera Module (iPhone 13)</div>
                    <div className="text-slate-500">Tested by Associate · 3-Month Warranty · 1 Day Delivery</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-base font-black text-slate-900 font-mono">₹1,899</div>
                  <div className="text-[10px] text-emerald-700 font-bold">Buyer Details Masked</div>
                </div>
              </div>
            )}

            {currentStep.visualType === 'circular_split' && (
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2.5 bg-white rounded-lg border border-slate-200 shadow-2xs">
                    <div className="text-slate-500 text-[11px]">Customer B Pays</div>
                    <div className="text-sm font-black text-slate-900 font-mono mt-0.5">₹1,899</div>
                  </div>
                  <div className="p-2.5 bg-white rounded-lg border border-slate-200 shadow-2xs">
                    <div className="text-slate-500 text-[11px]">Associate Payout</div>
                    <div className="text-sm font-black text-emerald-700 font-mono mt-0.5">₹1,709</div>
                  </div>
                  <div className="p-2.5 bg-white rounded-lg border border-slate-200 shadow-2xs">
                    <div className="text-slate-500 text-[11px]">Eco2Fixx Fee (10%)</div>
                    <div className="text-sm font-black text-slate-900 font-mono mt-0.5">₹190</div>
                  </div>
                </div>
                <div className="text-xs text-slate-500 text-center flex items-center justify-center gap-2">
                  <Repeat className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Circular outcome: Zero new mining, lower repair cost, extended device lifespan.</span>
                </div>
              </div>
            )}
          </div>

          {/* Strategic Insight */}
          <div className="p-3.5 bg-emerald-50/70 border-l-4 border-emerald-600 rounded-r-xl text-xs text-slate-700 leading-relaxed">
            <span className="font-bold text-slate-900">Founding Team Key Takeaway: </span>
            {currentStep.insight}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentStepIndex === 0}
              className={`flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg transition-colors font-semibold ${
                currentStepIndex === 0
                  ? 'text-slate-300 cursor-not-allowed'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>
            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-xs"
            >
              <span>{currentStepIndex === TOUR_STEPS.length - 1 ? 'Finish Tour' : 'Next Step'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={handleAction}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors flex items-center gap-1"
          >
            <span>{currentStep.demoActionLabel}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
