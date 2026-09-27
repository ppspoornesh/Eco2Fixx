import React, { useState } from 'react';
import { ProductCategory, DeviceAssessment, Associate } from '../../types';
import { Smartphone, Laptop, Tv, Headphones, Tablet, Home, Car, Check, Upload, Sparkles, MapPin, ArrowRight, ShieldCheck, CheckCircle2, AlertCircle, Star, Camera, ShieldAlert, Store, Clock, MessageSquare, PhoneCall } from 'lucide-react';
import { ComponentSvgVisual } from '../common/ComponentSvgVisual';
import { DamagedPhoneVisual } from '../common/DamagedPhoneVisual';

interface SellDeviceFlowProps {
  associates: Associate[];
  onDeviceRegistered: (newAssessment: DeviceAssessment) => void;
  onNavigateToAssociate: (associateId: string) => void;
}

const CATEGORIES: { id: ProductCategory; label: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'smartphone', label: 'Smartphone', icon: Smartphone },
  { id: 'laptop', label: 'Laptop / MacBook', icon: Laptop },
  { id: 'tablet', label: 'Tablet / iPad', icon: Tablet },
  { id: 'tv', label: 'Smart TV', icon: Tv },
  { id: 'earbuds', label: 'Audio / Earbuds', icon: Headphones },
  { id: 'appliance', label: 'Home Appliance', icon: Home },
  { id: 'automotive', label: 'Automotive Unit', icon: Car },
];

const POPULAR_BRANDS = ['Apple', 'Samsung', 'OnePlus', 'Xiaomi', 'Vivo', 'Oppo', 'Realme', 'Lenovo'];

export const SellDeviceFlow: React.FC<SellDeviceFlowProps> = ({
  associates,
  onDeviceRegistered,
  onNavigateToAssociate
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [category, setCategory] = useState<ProductCategory>('smartphone');
  const [brand, setBrand] = useState('Apple');
  const [model, setModel] = useState('iPhone 13 (128GB)');
  const [age, setAge] = useState('1.5 Years');
  const [damageType, setDamageType] = useState('Cracked Screen & Back Glass');
  const [workingComponents, setWorkingComponents] = useState('Powers on, vibrates, cameras open cleanly, FaceID works');
  const [previousRepairs, setPreviousRepairs] = useState('None (Original Factory Condition)');
  const [photoSelected, setPhotoSelected] = useState<string>('preset-screen-crack');

  // AI assessment generation state
  const [isScanning, setIsScanning] = useState(false);
  const [assessmentResult, setAssessmentResult] = useState<DeviceAssessment | null>(null);

  const handleRunAssessment = () => {
    setIsScanning(true);
    setStep(4);

    // Simulate authentic AI diagnostic sequence
    setTimeout(() => {
      const generatedAssessment: DeviceAssessment = {
        id: `dev-${Date.now()}`,
        deviceTitle: `${brand} ${model}`,
        category,
        brand,
        model,
        age,
        damageType,
        workingCondition: workingComponents,
        photos: ['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=80'],
        components: [
          {
            id: 'c-1',
            name: 'Primary Dual-Camera Assembly (Wide + Ultra-Wide)',
            category: 'camera',
            recoveryPotential: 'High',
            estimatedValueMin: 1800,
            estimatedValueMax: 2400,
            typicalCondition: 'Optics clear, autofocus responsive',
            notes: 'Unimpaired by housing drop'
          },
          {
            id: 'c-2',
            name: 'A-Series Logic Motherboard (Unlocked)',
            category: 'logic',
            recoveryPotential: 'High',
            estimatedValueMin: 2200,
            estimatedValueMax: 3200,
            typicalCondition: 'Clean power rails, valid baseband',
            notes: 'High demand in independent repair market'
          },
          {
            id: 'c-3',
            name: 'Taptic Engine & Stereo Acoustic Chamber',
            category: 'speaker',
            recoveryPotential: 'High',
            estimatedValueMin: 450,
            estimatedValueMax: 700,
            typicalCondition: 'Full haptic calibration',
            notes: 'Intact acoustic chamber'
          },
          {
            id: 'c-4',
            name: 'Lightning Charging Port Flex & Dual Mic',
            category: 'charging',
            recoveryPotential: 'Medium',
            estimatedValueMin: 350,
            estimatedValueMax: 550,
            typicalCondition: 'Power delivery functional',
            notes: 'Minor mechanical wear'
          },
          {
            id: 'c-5',
            name: 'OLED Display & Digitizer Assembly',
            category: 'display',
            recoveryPotential: 'Low',
            estimatedValueMin: 600,
            estimatedValueMax: 1000,
            typicalCondition: 'Glass fractured, IC driver intact',
            notes: 'Suitable for refurbishment or glass separation'
          }
        ],
        estimatedTotalMin: 3200,
        estimatedTotalMax: 4800,
        confidenceScore: 89,
        status: 'pending_associate',
        recommendedAssociateId: associates[0]?.id || 'asc-101',
        createdAt: 'Just now'
      };

      setAssessmentResult(generatedAssessment);
      setIsScanning(false);
      onDeviceRegistered(generatedAssessment);
    }, 1500);
  };

  const recommendedAssociate = associates.find(
    (a) => a.id === (assessmentResult?.recommendedAssociateId || 'asc-101')
  ) || associates[0];

  return (
    <div className="py-8 bg-slate-50 min-h-[calc(100vh-4rem)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header: Direct Buyout Desk */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded uppercase tracking-wider">
              Customer A Portal · Instant Cash Buyout
            </span>
            <h1 className="text-2xl font-black text-slate-900 font-display tracking-tight">
              Sell Damaged Phone to Nearest Verified Repair Shop
            </h1>
            <p className="text-xs text-slate-600">
              Get an instant AI valuation for your usable components and sell directly to local technicians.
            </p>
          </div>

          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-right shrink-0">
            <div className="text-[10px] text-amber-800 font-bold uppercase tracking-wider">Zero Scrap Lowballs</div>
            <div className="text-sm font-black text-slate-900 mt-0.5">Average Payout: ₹3,500+</div>
          </div>
        </div>

        {/* Step Progress Indicators */}
        <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs grid grid-cols-4 gap-2 text-xs">
          <button
            onClick={() => !isScanning && setStep(1)}
            className={`py-2 px-3 rounded-lg font-bold text-center transition-colors ${
              step === 1 ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            1. Category
          </button>
          <button
            onClick={() => !isScanning && setStep(2)}
            className={`py-2 px-3 rounded-lg font-bold text-center transition-colors ${
              step === 2 ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            2. Details
          </button>
          <button
            onClick={() => !isScanning && setStep(3)}
            className={`py-2 px-3 rounded-lg font-bold text-center transition-colors ${
              step === 3 ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            3. Condition
          </button>
          <button
            className={`py-2 px-3 rounded-lg font-bold text-center transition-colors ${
              step === 4 ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600'
            }`}
          >
            4. AI Valuation
          </button>
        </div>

        {/* STEP 1: Select Category */}
        {step === 1 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs animate-in fade-in duration-200">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Select Device Category</h2>
              <p className="text-xs text-slate-500 mt-0.5">What type of electronics do you want to sell?</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {CATEGORIES.map((cat) => {
                const IconComponent = cat.icon;
                const isSelected = category === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    className={`p-4 rounded-xl text-left border transition-all flex flex-col justify-between h-28 ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-500 shadow-xs ring-2 ring-emerald-500/20'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <IconComponent className={`w-6 h-6 ${isSelected ? 'text-emerald-600' : 'text-slate-500'}`} />
                    <div className="text-xs font-bold text-slate-800">{cat.label}</div>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <span>Continue to Device Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Device Information */}
        {step === 2 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs animate-in fade-in duration-200">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Select Brand & Enter Model Details</h2>
              <p className="text-xs text-slate-500 mt-0.5">Choose your brand from popular Indian manufacturers:</p>
            </div>

            {/* Popular Brand Tiles */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-2 uppercase tracking-wider">
                Select Brand:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {POPULAR_BRANDS.map((b) => (
                  <button
                    key={b}
                    onClick={() => setBrand(b)}
                    className={`py-2 px-3 text-xs font-bold rounded-lg border text-center transition-colors ${
                      brand === b
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Model & Variant</label>
                <input
                  type="text"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 font-semibold focus:outline-none focus:border-emerald-600 focus:bg-white"
                  placeholder="e.g. iPhone 13 (128GB)"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Approximate Age</label>
                <input
                  type="text"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 font-semibold focus:outline-none focus:border-emerald-600 focus:bg-white"
                  placeholder="e.g. 1.5 Years"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-bold text-slate-700">Visible Damage Symptoms</label>
                <input
                  type="text"
                  value={damageType}
                  onChange={(e) => setDamageType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 font-semibold focus:outline-none focus:border-emerald-600 focus:bg-white"
                  placeholder="e.g. Front glass cracked, touch working, back panel shattered"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-bold text-slate-700">What Still Works Properly?</label>
                <textarea
                  value={workingComponents}
                  onChange={(e) => setWorkingComponents(e.target.value)}
                  rows={2}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 font-semibold focus:outline-none focus:border-emerald-600 focus:bg-white"
                  placeholder="e.g. Powers on, haptics vibrate, cameras open cleanly, sound is clear"
                />
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-slate-100">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-6 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <span>Continue to Photo / Condition</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Photo Condition Verification */}
        {step === 3 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs animate-in fade-in duration-200">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Device Condition & Photo Verification</h2>
              <p className="text-xs text-slate-500 mt-0.5">Select your condition scenario or preview diagnostic scan:</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-7 space-y-3">
                {[
                  { id: 'preset-screen-crack', title: 'Scenario A: Cracked Screen Only', desc: 'Display glass broken, touch working, internal cameras & chips 100% fine' },
                  { id: 'preset-water-damage', title: 'Scenario B: Liquid Exposure', desc: 'Device does not boot, but cameras, casing, battery, and housing are undamaged' },
                  { id: 'preset-housing-shatter', title: 'Scenario C: Chassis / Rear Drop', desc: 'Motherboard, logic processor, and biometric FaceID sensors intact' }
                ].map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => setPhotoSelected(preset.id)}
                    className={`w-full p-3.5 rounded-xl text-left border transition-all ${
                      photoSelected === preset.id
                        ? 'bg-emerald-50 border-emerald-500 shadow-xs ring-1 ring-emerald-500/20'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-900">{preset.title}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{preset.desc}</div>
                  </button>
                ))}

                <div className="p-3.5 border-2 border-dashed border-slate-300 rounded-xl text-center space-y-1 bg-slate-50">
                  <Upload className="w-5 h-5 text-emerald-600 mx-auto" />
                  <div className="text-xs font-bold text-slate-800">
                    Sample Photo Loaded ({photoSelected})
                  </div>
                  <p className="text-[10px] text-slate-400">
                    Diagnostic models estimate module safety zones and component salvage potential.
                  </p>
                </div>
              </div>

              {/* Realistic Hardware Specimen Visual */}
              <div className="md:col-span-5">
                <DamagedPhoneVisual
                  damageScenario={
                    photoSelected === 'preset-screen-crack'
                      ? 'screen'
                      : photoSelected === 'preset-water-damage'
                      ? 'water'
                      : 'backglass'
                  }
                  className="h-[320px] bg-slate-900"
                />
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-slate-100">
              <button
                onClick={() => setStep(2)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Back
              </button>
              <button
                onClick={handleRunAssessment}
                className="px-6 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all shadow-xs flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Calculate Value & Match Local Shops</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Scanning & Valuation Result */}
        {step === 4 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {isScanning ? (
              <div className="p-12 rounded-2xl bg-white border border-slate-200 text-center space-y-4 shadow-xs">
                <div className="w-12 h-12 rounded-full border-4 border-emerald-600 border-t-transparent animate-spin mx-auto" />
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-slate-900 font-display">
                    AI Valuating Your Broken Device...
                  </h3>
                  <p className="text-xs text-slate-500">
                    Cross-referencing spare parts demand across 2,400+ local mobile repair shops in your city...
                  </p>
                </div>
              </div>
            ) : assessmentResult ? (
              <div className="space-y-6">
                {/* Result Card */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
                  {/* Official Diagnostic Certificate Strip */}
                  <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-emerald-400" />
                          <span>ISO 9001:2015 Diagnostic Certificate</span>
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          ID: #{assessmentResult.id.toUpperCase()}
                        </span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-black text-white font-display">
                        {assessmentResult.deviceTitle}
                      </h2>
                      <p className="text-xs text-slate-300">
                        Symptom Profile: <span className="text-slate-100 font-semibold">{assessmentResult.damageType}</span> · Condition: <span className="text-emerald-300 font-semibold">Usable OEM Assemblies Intact</span>
                      </p>
                    </div>

                    <div className="bg-slate-800/90 border border-slate-700/80 p-3.5 rounded-xl text-left sm:text-right shrink-0">
                      <div className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">
                        Estimated Shop Cash Payout
                      </div>
                      <div className="text-2xl font-black text-emerald-400 font-mono">
                        ₹{assessmentResult.estimatedTotalMin.toLocaleString()} – ₹{assessmentResult.estimatedTotalMax.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-slate-400 font-medium">
                        vs ₹300 scrap dealer offer
                      </div>
                    </div>
                  </div>

                  {/* NIST 800-88 & Data Protection Guarantee */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 bg-emerald-50/80 rounded-xl border border-emerald-200 text-xs text-emerald-950 flex items-center gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                      <div>
                        <strong className="block text-[11px] uppercase tracking-wider text-emerald-800">NIST 800-88 Data Sanitization</strong>
                        <span className="text-[11px] text-emerald-800/90">Customer storage wiped before modular component recovery.</span>
                      </div>
                    </div>

                    <div className="p-3 bg-blue-50/80 rounded-xl border border-blue-200 text-xs text-blue-950 flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0" />
                      <div>
                        <strong className="block text-[11px] uppercase tracking-wider text-blue-800">EPR Zero Landfill Commitment</strong>
                        <span className="text-[11px] text-blue-800/90">Damaged non-salvageable frames diverted to authorized smelters.</span>
                      </div>
                    </div>
                  </div>

                  {/* Component Breakdown Table */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800 uppercase tracking-wider">
                      <span>Identified Usable Modular Components ({assessmentResult.components.length})</span>
                      <span className="text-emerald-700 font-mono">Estimated Salvage Breakdown</span>
                    </div>
                    <div className="grid grid-cols-1 gap-2.5">
                      {assessmentResult.components.map((comp) => (
                        <div
                          key={comp.id}
                          className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 flex items-center justify-between gap-4 hover:border-emerald-300 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <ComponentSvgVisual category={comp.category} size="sm" />
                            <div>
                              <div className="text-xs font-bold text-slate-900">{comp.name}</div>
                              <div className="text-[11px] text-slate-500">{comp.typicalCondition} · {comp.notes}</div>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                              comp.recoveryPotential === 'High'
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300/50'
                                : comp.recoveryPotential === 'Medium'
                                ? 'bg-amber-100 text-amber-800 border border-amber-300/50'
                                : 'bg-slate-200 text-slate-700'
                            }`}>
                              {comp.recoveryPotential} Yield
                            </span>
                            <div className="text-xs font-mono font-black text-slate-900 mt-1">
                              ₹{comp.estimatedValueMin} – ₹{comp.estimatedValueMax}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommended Associate Card (Visit Store & Get Cash) */}
                  <div className="pt-4 border-t border-slate-200 space-y-3">
                    <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Store className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Recommended Nearest Verified Partner Lab (Bring Phone for Spot Cash)</span>
                    </div>

                    <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-50 to-emerald-50/30 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-base font-black text-slate-900 font-display">
                            {recommendedAssociate.shopName}
                          </span>
                          <span className="text-[10px] text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full font-bold border border-emerald-200">
                            Verified Partner Hub
                          </span>
                        </div>
                        <div className="text-xs text-slate-600 flex items-center gap-1.5 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{recommendedAssociate.address} ({recommendedAssociate.distanceKm} km away)</span>
                        </div>
                        <div className="text-xs text-slate-500 flex items-center gap-2 pt-0.5">
                          <span className="flex items-center gap-1 font-bold text-slate-700">
                            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                            {recommendedAssociate.rating} ({recommendedAssociate.reviewCount} verified shop reviews)
                          </span>
                          <span>·</span>
                          <span className="text-emerald-700 font-semibold flex items-center gap-1">
                            <Clock className="w-3 h-3" /> Open Today until 9:00 PM
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                        <a
                          href={`https://wa.me/919392532390?text=Hello%20Eco2Fixx,%20I%20have%20completed%20the%20valuation%20for%20my%20${encodeURIComponent(assessmentResult.deviceTitle)}%20(Est%20₹${assessmentResult.estimatedTotalMin}-₹${assessmentResult.estimatedTotalMax})%20and%20want%20to%20visit%20${encodeURIComponent(recommendedAssociate.shopName)}.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-3 text-xs font-bold text-white bg-[#25D366] hover:bg-[#20ba59] rounded-xl transition-all whitespace-nowrap shadow-xs hover:shadow flex items-center justify-center gap-2"
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span>Book Slot on WhatsApp</span>
                        </a>

                        <button
                          onClick={() => onNavigateToAssociate(recommendedAssociate.id)}
                          className="px-5 py-3 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all whitespace-nowrap shadow-xs hover:shadow flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Store className="w-4 h-4" />
                          <span>Associate Workbench →</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs text-slate-500">
                  <button
                    onClick={() => setStep(1)}
                    className="hover:text-slate-900 font-semibold"
                  >
                    ← Valuate Another Broken Phone
                  </button>
                  <span>Inspection Ticket: #{assessmentResult.id}</span>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};
