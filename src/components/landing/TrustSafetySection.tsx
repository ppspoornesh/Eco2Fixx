import React from 'react';
import { ShieldCheck, EyeOff, Award, FileText, CheckCircle2, Lock, Truck, RefreshCw } from 'lucide-react';

const TRUST_PILLARS = [
  {
    icon: EyeOff,
    title: 'Masked Contact Privacy',
    description:
      'Direct phone numbers and addresses are protected until an order is placed, protecting customers and repair shops from spam and off-platform fraud.'
  },
  {
    icon: Award,
    title: 'Verified Associate Network',
    description:
      'Every local repair shop Associate undergoes GSTIN/shop establishment verification and physical workbench inspection before receiving listing privileges.'
  },
  {
    icon: FileText,
    title: 'Tested Diagnostic Reports',
    description:
      'Every spare part discloses its test status (Bench Multimeter Tested, Diagnostic Passed) and condition grade (Grade A OEM, Grade B Functional).'
  },
  {
    icon: ShieldCheck,
    title: 'Escrow & 7-Day Replacement',
    description:
      'Payments remain protected in platform escrow until the spare part arrives, passes installation, and satisfies stated warranty terms.'
  }
];

export const TrustSafetySection: React.FC = () => {
  return (
    <section className="py-14 border-b border-slate-200 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/60 px-3 py-1 rounded-full inline-block">
            Trust & Security Guarantees
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 font-display">
            Built for Trust in India's Unorganized Repair Market
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Designed to build trust through verified shops, transparent diagnostic tests, and secure escrow payouts.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TRUST_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="p-5 bg-white border border-slate-200 rounded-xl space-y-2.5 shadow-xs"
              >
                <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">
                  {pillar.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Disclaimer Notice */}
        <div className="p-4 bg-white border border-slate-200 rounded-xl text-center text-xs text-slate-500 max-w-3xl mx-auto shadow-xs">
          Eco2Fixx provides digital assessment, discovery, and transaction escrow infrastructure. Physical inventory ownership, diagnostics, and component recovery are independently conducted by verified Associates.
        </div>
      </div>
    </section>
  );
};
