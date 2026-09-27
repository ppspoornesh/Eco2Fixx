import React from 'react';

interface ComponentProductCardVisualProps {
  category: string;
  deviceModel?: string;
  title?: string;
  className?: string;
  imageUrl?: string;
}

export const ComponentProductCardVisual: React.FC<ComponentProductCardVisualProps> = ({
  category,
  deviceModel = '',
  title = '',
  className = '',
  imageUrl
}) => {
  const cat = category.toLowerCase();
  const isDisplay = cat.includes('display') || cat.includes('screen');
  const isCamera = cat.includes('camera');
  const isMotherboard = cat.includes('motherboard') || cat.includes('logic');
  const isBattery = cat.includes('battery');
  const isCharging = cat.includes('charging') || cat.includes('port');
  const isAudio = cat.includes('audio') || cat.includes('speaker') || cat.includes('haptic');

  // If a valid custom image exists AND it's not a generic mismatch, we can check or render the studio visual
  // To prevent any sports car or desk mishaps, we use our authentic commercial spare parts visualizer:

  if (isDisplay) {
    return (
      <div className={`relative w-full h-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-950 flex items-center justify-center p-3 overflow-hidden select-none ${className}`}>
        {/* Studio grid backdrop */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:12px_12px]" />
        
        {/* Smartphone OLED Display Assembly */}
        <div className="relative w-28 h-40 sm:w-32 sm:h-44 bg-slate-950 rounded-2xl border-2 border-slate-700 shadow-2xl flex flex-col justify-between p-1.5 overflow-hidden">
          {/* Top Speaker Ear-piece Notch/Island */}
          <div className="w-12 h-2.5 rounded-full bg-slate-900 border border-slate-800 mx-auto flex items-center justify-center">
            <div className="w-4 h-0.5 rounded-full bg-slate-700" />
          </div>

          {/* OLED Panel Screen with Glass Reflection */}
          <div className="relative flex-1 my-1 rounded-xl bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-800 border border-slate-800/80 flex flex-col items-center justify-center overflow-hidden">
            {/* Diagonal studio glass glare reflection */}
            <div className="absolute -top-10 -left-10 w-44 h-44 bg-gradient-to-br from-white/15 via-white/5 to-transparent rotate-45 pointer-events-none" />
            
            <div className="text-[9px] font-mono font-black text-emerald-400 tracking-wider bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40 shadow-xs">
              SUPER RETINA OLED
            </div>
            <div className="text-[7.5px] font-mono text-slate-400 mt-1">
              ORIGINAL TESTED OEM
            </div>
            <div className="text-[6.5px] text-slate-500 font-mono">
              TRUE TONE READY · 0 DEAD PIXELS
            </div>
          </div>

          {/* Copper-Gold Ribbon Flex Connector at Bottom */}
          <div className="flex items-center justify-center gap-1 pt-0.5">
            <div className="w-14 h-3 bg-amber-600/90 rounded-sm border border-amber-400 flex items-center justify-around px-1 shadow-xs">
              <div className="w-1.5 h-1.5 rounded-xs bg-amber-300" />
              <div className="w-1.5 h-1.5 rounded-xs bg-amber-300" />
              <div className="w-1.5 h-1.5 rounded-xs bg-amber-300" />
              <div className="w-1.5 h-1.5 rounded-xs bg-amber-300" />
              <span className="text-[6px] font-mono font-bold text-slate-950">FLEX IC</span>
            </div>
          </div>
        </div>

        {/* Quality Passed Hologram Badge */}
        <div className="absolute top-2 right-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded shadow-md uppercase tracking-wider">
          QC PASSED
        </div>
      </div>
    );
  }

  if (isCamera) {
    return (
      <div className={`relative w-full h-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-950 flex items-center justify-center p-3 overflow-hidden select-none ${className}`}>
        {/* Studio grid backdrop */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:12px_12px]" />

        {/* Smartphone Camera Module Housing */}
        <div className="relative w-36 h-36 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 rounded-2xl border-2 border-slate-600 shadow-2xl p-2.5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[7px] text-slate-400 font-mono uppercase">
            <span>OIS OPTICAL 12MP</span>
            <span className="text-emerald-400 font-bold">BENCH TESTED</span>
          </div>

          {/* Dual/Triple Camera Lenses with Blue-Purple Optical Reflection */}
          <div className="flex items-center justify-center gap-2.5 py-1">
            {/* Primary Lens */}
            <div className="relative w-12 h-12 rounded-full bg-slate-950 border-2 border-slate-600 shadow-inner flex items-center justify-center p-1">
              <div className="w-full h-full rounded-full bg-gradient-to-tr from-indigo-950 via-slate-900 to-sky-950 border border-indigo-400/50 flex items-center justify-center relative overflow-hidden">
                {/* Optical glass coating reflection */}
                <div className="absolute top-1 left-1.5 w-4 h-4 rounded-full bg-cyan-400/30 blur-2xs" />
                <div className="absolute bottom-1 right-1.5 w-3 h-3 rounded-full bg-purple-500/25 blur-2xs" />
                <div className="w-4 h-4 rounded-full bg-slate-950 border border-slate-700" />
              </div>
            </div>

            {/* Secondary Ultra-Wide Lens */}
            <div className="relative w-10 h-10 rounded-full bg-slate-950 border-2 border-slate-600 shadow-inner flex items-center justify-center p-1">
              <div className="w-full h-full rounded-full bg-gradient-to-tr from-purple-950 via-slate-900 to-emerald-950 border border-purple-400/50 flex items-center justify-center relative overflow-hidden">
                <div className="absolute top-1 left-1 w-3 h-3 rounded-full bg-cyan-400/30 blur-2xs" />
                <div className="w-3 h-3 rounded-full bg-slate-950 border border-slate-700" />
              </div>
            </div>
          </div>

          {/* Gold Connector Ribbon Cable at bottom */}
          <div className="w-full h-3 bg-amber-600 rounded-sm border border-amber-400 flex items-center justify-between px-2">
            <span className="text-[6.5px] font-mono font-bold text-slate-950">SAPPHIRE LENS CONNECTOR</span>
            <div className="flex gap-0.5">
              <div className="w-1 h-1.5 bg-amber-300" />
              <div className="w-1 h-1.5 bg-amber-300" />
              <div className="w-1 h-1.5 bg-amber-300" />
            </div>
          </div>
        </div>

        {/* Quality Passed Hologram Badge */}
        <div className="absolute top-2 right-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded shadow-md uppercase tracking-wider">
          OIS TESTED
        </div>
      </div>
    );
  }

  if (isMotherboard) {
    return (
      <div className={`relative w-full h-full bg-gradient-to-b from-slate-950 via-emerald-950/60 to-slate-950 flex items-center justify-center p-3 overflow-hidden select-none ${className}`}>
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:10px_10px]" />

        {/* Logic Motherboard Circuit PCB */}
        <div className="relative w-36 h-36 bg-[#0b291b] rounded-xl border-2 border-emerald-600 shadow-2xl p-2.5 flex flex-col justify-between overflow-hidden">
          {/* Circuit Traces lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" viewBox="0 0 120 120" fill="none">
            <path d="M10 20 H40 V60 H80" stroke="#34d399" strokeWidth="1" />
            <path d="M30 100 V80 H70 V40" stroke="#34d399" strokeWidth="1" />
            <circle cx="40" cy="60" r="2" fill="#6ee7b7" />
            <circle cx="70" cy="80" r="2" fill="#6ee7b7" />
          </svg>

          {/* Top Chip / Processor */}
          <div className="flex items-center justify-between z-10">
            <span className="text-[7.5px] font-mono font-bold text-emerald-300">PCB SOLDER MASK</span>
            <span className="text-[7px] font-mono bg-emerald-900/90 text-emerald-200 px-1 rounded border border-emerald-600">CLEAN IMEI</span>
          </div>

          {/* Central Processor Chip with Laser Etching */}
          <div className="my-auto mx-auto w-20 h-16 bg-slate-900 border border-slate-600 rounded-md shadow-md p-1 flex flex-col items-center justify-center z-10">
            <div className="text-[8px] font-mono font-black text-amber-400 tracking-wider">
              BIONIC / INTEL
            </div>
            <div className="text-[6.5px] font-mono text-slate-400 mt-0.5">
              16GB LPDDR / SOC
            </div>
            <div className="w-12 h-0.5 bg-amber-500/60 mt-1" />
          </div>

          {/* Gold Pin Edge Connector */}
          <div className="w-full h-2.5 bg-amber-500 rounded-xs flex items-center justify-around px-1 z-10">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="w-1 h-1.5 bg-amber-200 rounded-2xs" />
            ))}
          </div>
        </div>

        <div className="absolute top-2 right-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded shadow-md uppercase tracking-wider">
          UNLOCKED
        </div>
      </div>
    );
  }

  if (isBattery) {
    return (
      <div className={`relative w-full h-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-950 flex items-center justify-center p-3 overflow-hidden select-none ${className}`}>
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:12px_12px]" />

        {/* Li-Ion Battery Cell Enclosure */}
        <div className="relative w-32 h-40 bg-slate-950 rounded-xl border-2 border-slate-700 shadow-2xl p-2.5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[7px] text-slate-400 font-mono">
            <span>RECHARGEABLE LI-ION</span>
            <span className="text-emerald-400 font-bold">HEALTH 88%+</span>
          </div>

          <div className="my-auto space-y-1 text-center">
            <div className="text-sm font-black text-white font-mono tracking-tight">
              3,240 mAh
            </div>
            <div className="text-[8px] text-slate-400 font-mono">
              3.83V · 12.41 Wh
            </div>
            <div className="text-[6.5px] text-amber-400/90 font-mono border-t border-slate-800 pt-1">
              BIS CERTIFIED · SAFETY IC INTACT
            </div>
          </div>

          {/* Battery Flex Ribbon Connector */}
          <div className="w-16 h-3 bg-amber-600 rounded-sm mx-auto border border-amber-400 flex items-center justify-around px-1">
            <div className="w-1.5 h-1.5 bg-amber-300" />
            <span className="text-[6px] font-mono font-bold text-slate-950">BATT POS/NEG</span>
            <div className="w-1.5 h-1.5 bg-amber-300" />
          </div>
        </div>

        <div className="absolute top-2 right-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded shadow-md uppercase tracking-wider">
          CYCLES TESTED
        </div>
      </div>
    );
  }

  // Fallback for Charging Port / Audio / Other Parts
  return (
    <div className={`relative w-full h-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-950 flex items-center justify-center p-3 overflow-hidden select-none ${className}`}>
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:12px_12px]" />

      <div className="relative w-32 h-36 bg-slate-950 rounded-xl border-2 border-slate-700 shadow-2xl p-2.5 flex flex-col justify-between">
        <div className="text-[7.5px] text-slate-400 font-mono uppercase">
          {category || 'OEM HARDWARE'}
        </div>

        <div className="my-auto text-center space-y-1">
          <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-600 mx-auto flex items-center justify-center text-emerald-400 font-mono font-bold text-xs">
            {isCharging ? 'USB-C' : isAudio ? 'AUDIO' : 'SPARE'}
          </div>
          <div className="text-[9px] font-bold text-white truncate px-1">
            {deviceModel || 'Tested Module'}
          </div>
          <div className="text-[7px] text-emerald-400 font-mono">
            BENCH MULTIMETER PASSED
          </div>
        </div>

        <div className="w-full h-2.5 bg-amber-600 rounded-xs border border-amber-400 flex items-center justify-around px-1">
          <span className="text-[6px] font-mono font-bold text-slate-950">100% OEM CONTACT PINS</span>
        </div>
      </div>

      <div className="absolute top-2 right-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded shadow-md uppercase tracking-wider">
        TESTED
      </div>
    </div>
  );
};
