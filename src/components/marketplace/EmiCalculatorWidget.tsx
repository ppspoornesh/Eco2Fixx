import React, { useState } from 'react';
import { Calculator, CheckCircle2, CreditCard, ChevronDown, ChevronUp, Sparkles, ShieldCheck, Info } from 'lucide-react';

interface EmiCalculatorWidgetProps {
  price: number;
  className?: string;
  isHindi?: boolean;
}

export const EmiCalculatorWidget: React.FC<EmiCalculatorWidgetProps> = ({
  price,
  className = '',
  isHindi = false
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [tenure, setTenure] = useState<3 | 6 | 9 | 12>(3);
  const [emiType, setEmiType] = useState<'no_cost' | 'standard'>('no_cost');

  const tenures: (3 | 6 | 9 | 12)[] = [3, 6, 9, 12];

  // Calculate EMI
  const calculateEmi = (months: number, type: 'no_cost' | 'standard') => {
    if (type === 'no_cost') {
      const monthly = Math.round(price / months);
      return {
        monthly,
        interest: 0,
        total: price,
        rate: 0
      };
    } else {
      const annualRate = 0.13; // 13% p.a. typical bank rate
      const monthlyRate = annualRate / 12;
      const emi = (price * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
      const monthly = Math.round(emi);
      const total = monthly * months;
      const interest = total - price;
      return {
        monthly,
        interest,
        total,
        rate: 13
      };
    }
  };

  const currentEmi = calculateEmi(tenure, emiType);
  const lowestMonthly = calculateEmi(12, 'no_cost').monthly;

  return (
    <div className={`bg-gradient-to-br from-slate-50 to-emerald-50/40 border border-emerald-200/80 rounded-2xl p-4 shadow-2xs transition-all ${className}`}>
      {/* Header with quick teaser */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black text-slate-900 font-display">
                {isHindi ? 'ईएमआई कैलकुलेटर' : 'EMI Calculator & Easy Pay'}
              </span>
              <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black px-1.5 py-0.2 rounded uppercase">
                {isHindi ? '0% ब्याज' : '0% No-Cost EMI'}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              {isHindi ? 'मात्र' : 'Pay in easy installments from'}{' '}
              <strong className="text-emerald-700 font-bold font-mono">₹{lowestMonthly.toLocaleString()}/mo</strong>
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="text-slate-500 hover:text-slate-800 p-1.5 rounded-lg hover:bg-slate-200/50 transition-colors flex items-center gap-1 text-xs font-semibold cursor-pointer"
        >
          <span className="text-[11px] hidden sm:inline">{isOpen ? 'Hide' : 'Calculate'}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Expanded Interactive Calculator */}
      {isOpen && (
        <div className="mt-3.5 pt-3.5 border-t border-emerald-200/60 space-y-3.5 animate-in fade-in duration-150">
          {/* EMI Scheme Selector Tabs */}
          <div className="flex items-center p-1 bg-white border border-slate-200 rounded-xl gap-1 text-xs">
            <button
              type="button"
              onClick={() => setEmiType('no_cost')}
              className={`flex-1 py-1.5 px-2 rounded-lg font-bold transition-all text-center flex items-center justify-center gap-1 cursor-pointer ${
                emiType === 'no_cost'
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Sparkles className="w-3 h-3 text-emerald-300" />
              <span>{isHindi ? 'नो-कॉस्ट ईएमआई (0% ब्याज)' : 'No-Cost EMI (0% Interest)'}</span>
            </button>
            <button
              type="button"
              onClick={() => setEmiType('standard')}
              className={`flex-1 py-1.5 px-2 rounded-lg font-bold transition-all text-center flex items-center justify-center gap-1 cursor-pointer ${
                emiType === 'standard'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <CreditCard className="w-3 h-3" />
              <span>{isHindi ? 'बैंक क्रेडिट/डेबिट ईएमआई' : 'Standard Bank EMI'}</span>
            </button>
          </div>

          {/* Tenure Selection Pills */}
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
              {isHindi ? 'महीने चुनें (Tenure):' : 'Select Repayment Months:'}
            </label>
            <div className="grid grid-cols-4 gap-2">
              {tenures.map((m) => {
                const emiOpt = calculateEmi(m, emiType);
                const isSelected = tenure === m;
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setTenure(m)}
                    className={`py-2 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs ring-2 ring-emerald-500/20'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className={`text-xs font-black ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                      {m} {isHindi ? 'महीने' : 'Months'}
                    </div>
                    <div className={`text-[10px] font-mono mt-0.5 font-bold ${isSelected ? 'text-emerald-100' : 'text-emerald-700'}`}>
                      ₹{emiOpt.monthly.toLocaleString()}/mo
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Estimated Monthly Summary Card */}
          <div className="p-3 bg-white rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                {isHindi ? 'मासिक भुगतान (Monthly Cost):' : 'Estimated Monthly Installment:'}
              </span>
              <div className="text-xl font-black text-emerald-700 font-mono flex items-baseline gap-1">
                <span>₹{currentEmi.monthly.toLocaleString()}</span>
                <span className="text-xs font-normal text-slate-500">/ month for {tenure} mos</span>
              </div>
            </div>

            <div className="text-right text-[11px] text-slate-600 space-y-0.5 border-t sm:border-t-0 sm:border-l border-slate-100 pt-2 sm:pt-0 sm:pl-4">
              <div className="flex justify-between sm:justify-end gap-3">
                <span>Down payment:</span>
                <strong className="text-emerald-700 font-bold">₹0</strong>
              </div>
              <div className="flex justify-between sm:justify-end gap-3">
                <span>Interest:</span>
                <strong className={currentEmi.interest === 0 ? 'text-emerald-700 font-bold' : 'text-slate-900 font-bold'}>
                  {currentEmi.interest === 0 ? '₹0 (Free)' : `₹${currentEmi.interest.toLocaleString()}`}
                </strong>
              </div>
              <div className="flex justify-between sm:justify-end gap-3">
                <span>Total amount:</span>
                <strong className="text-slate-900 font-bold font-mono">₹{currentEmi.total.toLocaleString()}</strong>
              </div>
            </div>
          </div>

          {/* Supported Indian Banks & Cardless Badges */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[10px] text-slate-500">
            <div className="flex items-center gap-1 text-emerald-800 font-semibold">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span>HDFC · ICICI · SBI · Axis · Kotak · Bajaj Finserv · UPI EMI</span>
            </div>
            <span className="text-slate-400">Instant approval at checkout</span>
          </div>
        </div>
      )}
    </div>
  );
};
