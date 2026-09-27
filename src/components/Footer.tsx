import React from 'react';
import { AppTab } from '../types';
import { ShieldCheck, Truck, RefreshCw, PhoneCall, Award, Play } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: AppTab) => void;
  onStartTour: () => void;
  onOpenTracking?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onStartTour, onOpenTracking }) => {
  return (
    <footer className="bg-[#0A2540] text-slate-300 text-xs py-14 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Trust Badges Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-8 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-xs">100% Bench Tested</div>
              <div className="text-[11px] text-slate-400">Tested by verified Indian lab technicians</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-xs">7-Day Easy Replacement</div>
              <div className="text-[11px] text-slate-400">Protected by platform escrow guarantee</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-xs">Express Pan-India Shipping</div>
              <div className="text-[11px] text-slate-400">Doorstep delivery or local shop walk-in</div>
            </div>
          </div>

          <a href="tel:9392532390" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-xs">Helpline / WhatsApp: +91 9392532390</div>
              <div className="text-[11px] text-slate-400">Direct Support & Instant WhatsApp Quotes</div>
            </div>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-black text-lg">
                E2
              </div>
              <span className="text-xl font-black text-white font-display tracking-tight">
                Eco2<span className="text-emerald-400">Fixx</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              India's 1st circular spare parts marketplace. Connecting damaged gadget owners, neighborhood repair businesses, and buyers through transparent diagnostic testing.
            </p>
            <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
              Broken Doesn't Mean Worthless.
            </div>
          </div>

          {/* Platform Navigation */}
          <div className="space-y-2.5">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Eco2Fixx Marketplace
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('overview')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  How Eco2Fixx Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('sell-device')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Sell Broken Phone for Instant Cash
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('marketplace')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Buy Tested Spare Parts (OEM Spares)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('associate-hub')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Repair Shop Partner Hub & Workbench
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTracking}
                  className="text-emerald-400 font-bold hover:text-emerald-300 transition-colors flex items-center gap-1"
                >
                  <Truck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Track Order & Repair Status</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Trust & Guarantees */}
          <div className="space-y-2.5">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Trust & Guarantees
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <span className="text-slate-300 font-medium">3-Month Component Warranty</span>
              </li>
              <li>
                <span className="text-slate-300 font-medium">7-Day Easy Replacement Policy</span>
              </li>
              <li>
                <span className="text-slate-300 font-medium">100% Certified Bench-Tested Spares</span>
              </li>
              <li>
                <span className="text-slate-300 font-medium">Escrow Protected Secure Payments</span>
              </li>
              <li>
                <span className="text-slate-300 font-medium">Instant Cash Payout for Trade-ins</span>
              </li>
            </ul>
          </div>

          {/* Principles */}
          <div className="space-y-2.5">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Service Hubs & Regulatory
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Operating across Bengaluru Tech Corridor, Mumbai BKC & Lamington, Delhi NCR Nehru Place, Hyderabad Hitec City, Pune, and Chennai.
            </p>
            <div className="pt-2 text-[10px] text-emerald-400 font-mono space-y-1">
              <div>Over 2,450+ independent technician labs connected.</div>
              <div className="text-slate-400">CPCB EPR Registration: EPR/TECH/2026/KA-88192</div>
              <div className="text-slate-400">GSTIN: 29AABCE1284K1Z8</div>
            </div>
          </div>
        </div>

        {/* Corporate Address & Institutional Badges */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-300">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>ISO 9001:2015 Certified Quality</span>
            </span>
            <span>·</span>
            <span className="text-slate-300">ISO 14001:2015 Environmental Standard</span>
            <span>·</span>
            <span className="text-slate-300">NIST 800-88 Data Sanitization Compliant</span>
            <span>·</span>
            <span className="text-slate-300">256-Bit Escrow Gateway</span>
          </div>

          <div className="text-slate-500 font-mono text-[10px]">
            Embassy TechVillage, Bellandur, Bengaluru 560103
          </div>
        </div>

        {/* Legal Disclaimer & Bottom Strip */}
        <div className="pt-4 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px]">
          <p className="text-slate-400 text-center md:text-left max-w-2xl">
            Eco2Fixx is a circular marketplace and transaction coordination platform. Physical product inspection, component bench testing, inventory ownership, and warranties are independently managed by registered repair shop Associates.
          </p>
          <div className="text-slate-400 font-medium">
            © {new Date().getFullYear()} Eco2Fixx Technologies India Pvt. Ltd. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
