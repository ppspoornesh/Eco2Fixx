import React, { useState } from 'react';
import { Associate, DeviceAssessment, RecoveredPart } from '../../types';
import { Wrench, CheckCircle, Package, ArrowUpRight, DollarSign, Store, Tag, ShieldCheck, ChevronRight, RefreshCw, Smartphone, Star, MapPin, Phone, Award } from 'lucide-react';
import { ComponentSvgVisual } from '../common/ComponentSvgVisual';
import { DamagedPhoneVisual } from '../common/DamagedPhoneVisual';
import workshopImg from '../../assets/images/associate_repair_workshop_1790419255786.avif';

interface AssociateDashboardProps {
  currentAssociate: Associate;
  inboundDevices: DeviceAssessment[];
  inventory: RecoveredPart[];
  onPurchaseDevice: (deviceId: string, negotiatedPrice: number) => void;
  onUpdatePartStatus: (partId: string, status: 'available_marketplace' | 'used_offline', audience: 'both' | 'b2b_only' | 'b2c_only') => void;
  onNavigateToMarketplace: () => void;
}

export const AssociateDashboard: React.FC<AssociateDashboardProps> = ({
  currentAssociate,
  inboundDevices,
  inventory,
  onPurchaseDevice,
  onUpdatePartStatus,
  onNavigateToMarketplace
}) => {
  const [selectedOpportunity, setSelectedOpportunity] = useState<DeviceAssessment | null>(inboundDevices[0] || null);
  const [negotiatedPriceInput, setNegotiatedPriceInput] = useState<number>(3400);
  const [showPurchaseSuccess, setShowPurchaseSuccess] = useState(false);

  const handleConfirmPurchase = () => {
    if (!selectedOpportunity) return;
    onPurchaseDevice(selectedOpportunity.id, negotiatedPriceInput);
    setShowPurchaseSuccess(true);
    setTimeout(() => setShowPurchaseSuccess(false), 3000);
  };

  const activeMarketplaceListings = inventory.filter((p) => p.listingStatus === 'available_marketplace');
  const offlineParts = inventory.filter((p) => p.listingStatus === 'used_offline');

  return (
    <div className="py-8 bg-slate-50 min-h-[calc(100vh-4rem)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Associate Shop Header Banner with Real Workshop Image */}
        <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 shadow-sm">
          <div className="absolute inset-0 z-0">
            <img
              src={workshopImg}
              alt="Repair Workbench"
              className="w-full h-full object-cover opacity-35 filter brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-900/60" />
          </div>

          <div className="relative z-10 p-6 sm:p-8 space-y-4 text-white">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-bold text-emerald-300 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-700/60 flex items-center gap-1">
                    <Award className="w-3 h-3 text-emerald-400" />
                    <span>Verified Associate Dukaan Hub</span>
                  </span>
                  <span className="text-xs text-slate-300 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{currentAssociate.address}</span>
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight">
                  {currentAssociate.shopName}
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  You own the physical hardware. Purchase broken devices from local customers, bench-test components, and either use them for in-shop walk-ins or list on Eco2Fixx pan-India.
                </p>
              </div>

              {/* Shop Trust Stats */}
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shrink-0">
                <div>
                  <div className="text-[11px] text-slate-300 font-medium">Technician Rating</div>
                  <div className="text-xl font-black text-white flex items-center gap-1 font-mono">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span>{currentAssociate.rating}</span>
                  </div>
                  <div className="text-[10px] text-slate-300">
                    {currentAssociate.completedRepairs}+ repairs completed
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Operational Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="text-xs text-slate-500 font-medium">Nearby Inbound Devices</div>
            <div className="text-2xl font-black text-slate-900 font-mono mt-1">
              {inboundDevices.length}
            </div>
            <div className="text-[11px] text-emerald-700 font-semibold mt-1 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> Customer drop-offs ready
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="text-xs text-slate-500 font-medium">Active Online Spares</div>
            <div className="text-2xl font-black text-emerald-700 font-mono mt-1">
              {activeMarketplaceListings.length}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Live on Eco2Fixx marketplace
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="text-xs text-slate-500 font-medium">In-Shop Walk-in Spares</div>
            <div className="text-2xl font-black text-slate-900 font-mono mt-1">
              {offlineParts.length}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Reserved for walk-in repairs
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="text-xs text-slate-500 font-medium">Owned Inventory Value</div>
            <div className="text-2xl font-black text-emerald-700 font-mono mt-1">
              ₹34,800
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Your physical shop asset
            </div>
          </div>
        </div>

        {/* SECTION 1: Inbound Customer Opportunities */}
        <div className="space-y-4">
          <div>
            <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Inbound Device Buyout Desk
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display mt-1">
              Broken Devices Registered Nearby
            </h2>
            <p className="text-xs text-slate-600">
              Customers waiting for store drop-off or doorstep pickup. Review AI component estimates, negotiate direct cash payment, and take physical ownership.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* List of Devices */}
            <div className="lg:col-span-5 space-y-3">
              {inboundDevices.length === 0 ? (
                <div className="p-8 rounded-xl bg-white border border-slate-200 text-center text-xs text-slate-500 shadow-xs">
                  No pending customer opportunities right now. New submissions will appear here automatically.
                </div>
              ) : (
                inboundDevices.map((dev) => {
                  const isSelected = selectedOpportunity?.id === dev.id;
                  return (
                    <button
                      key={dev.id}
                      onClick={() => setSelectedOpportunity(dev)}
                      className={`w-full p-4 rounded-xl text-left border transition-all ${
                        isSelected
                          ? 'bg-emerald-50/70 border-emerald-500 shadow-sm ring-1 ring-emerald-500/20'
                          : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold text-slate-900">
                          {dev.deviceTitle}
                        </span>
                        <span className="text-xs font-mono font-black text-emerald-700">
                          ₹{dev.estimatedTotalMin}–₹{dev.estimatedTotalMax}
                        </span>
                      </div>
                      <div className="text-xs text-slate-600 line-clamp-1">
                        Damage: {dev.damageType}
                      </div>
                      <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                        <span>{dev.components.length} recoverable modules</span>
                        <span>{dev.createdAt}</span>
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Opportunity Inspector & Purchase Box */}
            <div className="lg:col-span-7">
              {selectedOpportunity ? (
                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-5">
                  <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
                    <div>
                      <span className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-wider">
                        Customer Device Inspection
                      </span>
                      <h3 className="text-lg font-black text-slate-900 mt-0.5">
                        {selectedOpportunity.deviceTitle}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Symptoms: {selectedOpportunity.workingCondition}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-[11px] text-slate-500">AI Valuation Range</div>
                      <div className="text-base font-black text-emerald-700 font-mono">
                        ₹{selectedOpportunity.estimatedTotalMin} – ₹{selectedOpportunity.estimatedTotalMax}
                      </div>
                    </div>
                  </div>

                  {/* Bench Diagnostic Verification Checklist */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2.5">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800 uppercase tracking-wider">
                      <span className="flex items-center gap-1.5 text-slate-900">
                        <Wrench className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Technician Bench Diagnostic Triage</span>
                      </span>
                      <span className="text-emerald-700 font-mono text-[11px]">4 of 4 Modules PASS</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div className="p-2 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                        <span className="text-slate-600">Tektronix 5V/9V Rails:</span>
                        <span className="text-emerald-700 font-bold flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> PASS
                        </span>
                      </div>
                      <div className="p-2 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                        <span className="text-slate-600">Baseband & Clean IMEI:</span>
                        <span className="text-emerald-700 font-bold flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> PASS
                        </span>
                      </div>
                      <div className="p-2 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                        <span className="text-slate-600">Optics & TrueDepth Sensor:</span>
                        <span className="text-emerald-700 font-bold flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> PASS
                        </span>
                      </div>
                      <div className="p-2 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                        <span className="text-slate-600">Battery Impedance SOH:</span>
                        <span className="text-emerald-700 font-bold">88% (Healthy)</span>
                      </div>
                    </div>
                  </div>

                  {/* Components breakdown */}
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Identified Recoverable Modules:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {selectedOpportunity.components.map((c) => (
                        <div key={c.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
                          <div>
                            <div className="font-bold text-slate-900 truncate">{c.name}</div>
                            <span className="text-[10px] text-emerald-700 font-semibold">{c.recoveryPotential} Potential</span>
                          </div>
                          <span className="font-mono font-bold text-slate-900">₹{c.estimatedValueMin}–₹{c.estimatedValueMax}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Purchase Confirmation Box */}
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="space-y-0.5">
                        <div className="text-xs font-black text-slate-900">
                          Direct Cash Purchase from Customer
                        </div>
                        <div className="text-[11px] text-slate-600">
                          You pay customer cash directly and take 100% legal title of the physical hardware.
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="text-xs text-slate-600 font-semibold">Agreed Cash: ₹</span>
                        <input
                          type="number"
                          value={negotiatedPriceInput}
                          onChange={(e) => setNegotiatedPriceInput(Number(e.target.value))}
                          className="w-24 px-2 py-1.5 bg-white border border-emerald-400 rounded-lg text-xs text-slate-900 font-mono font-bold text-right shadow-2xs"
                        />
                      </div>
                    </div>

                    <div className="p-2.5 bg-emerald-100/60 rounded-lg border border-emerald-300/60 flex items-center justify-between text-xs font-semibold text-emerald-950">
                      <span>Projected Net Profit Margin:</span>
                      <span className="font-mono font-bold text-emerald-900">
                        +₹{Math.max(0, 6798 - negotiatedPriceInput).toLocaleString()} ({(Math.max(0, 6798 - negotiatedPriceInput) / (negotiatedPriceInput || 1) * 100).toFixed(0)}% ROI)
                      </span>
                    </div>

                    <button
                      onClick={handleConfirmPurchase}
                      className="w-full py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Confirm Direct Purchase & Add to Shop Inventory</span>
                    </button>

                    {showPurchaseSuccess && (
                      <div className="text-xs text-center text-emerald-800 font-bold animate-in fade-in flex items-center justify-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Device purchased! Salvaged components transferred to your active inventory below.</span>
                      </div>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* SECTION 2: Recovered Inventory Manager */}
        <div className="space-y-4 pt-6 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Shop Inventory Desk
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display mt-1">
                Your Harvested Component Inventory
              </h2>
              <p className="text-xs text-slate-600">
                You own these components. Decide whether to use them offline for local walk-in customers OR list them on the Eco2Fixx marketplace.
              </p>
            </div>

            <button
              onClick={onNavigateToMarketplace}
              className="text-xs text-emerald-700 hover:text-emerald-800 flex items-center gap-1 font-bold"
            >
              <span>View Public Marketplace Store</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {inventory.map((part) => {
              const isMarketplace = part.listingStatus === 'available_marketplace';
              return (
                <div
                  key={part.id}
                  className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      {part.imageUrl ? (
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                          <img src={part.imageUrl} alt={part.title} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <ComponentSvgVisual category={part.category} size="sm" />
                      )}
                      <div className="text-right">
                        <div className="text-sm font-black text-slate-900 font-mono">
                          ₹{part.price.toLocaleString()}
                        </div>
                        <div className="text-[11px] text-emerald-700 font-semibold">
                          {part.warranty}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1">
                        {part.title}
                      </h4>
                      <div className="text-xs text-slate-500 font-medium">
                        Model: {part.deviceModel}
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-400">
                        <span>{part.condition}</span>
                        <span>·</span>
                        <span className="text-emerald-700 font-semibold">{part.testStatus}</span>
                      </div>
                    </div>
                  </div>

                  {/* Dual Channel Options: Offline vs Online & B2B vs B2C */}
                  <div className="space-y-2 pt-3 border-t border-slate-100">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">Channel Allocation:</span>
                      <span className={`font-bold ${isMarketplace ? 'text-emerald-700' : 'text-slate-800'}`}>
                        {isMarketplace ? 'Listed Online (Eco2Fixx)' : 'Reserved for Walk-in Shop'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onUpdatePartStatus(part.id, 'used_offline', 'both')}
                        className={`py-1.5 px-2 text-[11px] font-bold rounded-lg border transition-colors ${
                          !isMarketplace
                            ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                            : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Use Offline
                      </button>
                      <button
                        onClick={() => onUpdatePartStatus(part.id, 'available_marketplace', part.targetAudience)}
                        className={`py-1.5 px-2 text-[11px] font-bold rounded-lg border transition-colors ${
                          isMarketplace
                            ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                            : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        List on Eco2Fixx
                      </button>
                    </div>

                    {isMarketplace && (
                      <div className="pt-2 flex items-center justify-between text-[11px]">
                        <span className="text-slate-400">Target Audience:</span>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => onUpdatePartStatus(part.id, 'available_marketplace', 'b2b_only')}
                            className={`px-2 py-0.5 rounded text-xs font-semibold ${part.targetAudience === 'b2b_only' ? 'bg-emerald-100 text-emerald-800' : 'text-slate-500 hover:text-slate-800'}`}
                          >
                            Shops (B2B)
                          </button>
                          <span>/</span>
                          <button
                            onClick={() => onUpdatePartStatus(part.id, 'available_marketplace', 'both')}
                            className={`px-2 py-0.5 rounded text-xs font-semibold ${part.targetAudience === 'both' ? 'bg-emerald-100 text-emerald-800' : 'text-slate-500 hover:text-slate-800'}`}
                          >
                            All (B2B+B2C)
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
