import React from 'react';

interface ComponentSvgVisualProps {
  category: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const ComponentSvgVisual: React.FC<ComponentSvgVisualProps> = ({
  category,
  className = '',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-36 h-36'
  }[size];

  const cat = category.toLowerCase();

  // Multi-lens Camera Module - Studio macro photorealistic render
  if (cat.includes('camera')) {
    return (
      <div className={`relative flex items-center justify-center bg-gradient-to-b from-[#1A231E] to-[#111713] border border-[#2B3E34] rounded-xl overflow-hidden shadow-inner ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full p-1.5">
          {/* Main Module Aluminum Frame */}
          <rect x="12" y="10" width="76" height="80" rx="14" fill="#18201B" stroke="#3A4F44" strokeWidth="2.5" />
          <rect x="15" y="13" width="70" height="74" rx="11" fill="url(#metalGrad)" />
          
          {/* Sapphire Primary Lens Ring */}
          <circle cx="38" cy="35" r="21" fill="#0A0F0D" stroke="#4A6557" strokeWidth="3" />
          <circle cx="38" cy="35" r="16" fill="#13231B" stroke="#52B788" strokeWidth="1.5" />
          <circle cx="38" cy="35" r="11" fill="#08100C" />
          {/* Optical Glass Flare Reflections */}
          <ellipse cx="43" cy="31" rx="5" ry="2.5" transform="rotate(-30 43 31)" fill="#A7D7C5" opacity="0.6" />
          <circle cx="35" cy="40" r="1.5" fill="#52B788" opacity="0.8" />
          
          {/* Ultra-Wide Secondary Lens Ring */}
          <circle cx="68" cy="65" r="16" fill="#0A0F0D" stroke="#3A4F44" strokeWidth="2.5" />
          <circle cx="68" cy="65" r="11" fill="#13231B" stroke="#52B788" strokeWidth="1" />
          <circle cx="68" cy="65" r="7" fill="#08100C" />
          <ellipse cx="71" cy="62" rx="3" ry="1.5" transform="rotate(-30 71 62)" fill="#A7D7C5" opacity="0.5" />
          
          {/* LiDAR / Sensor Aperture */}
          <circle cx="36" cy="72" r="6" fill="#08100C" stroke="#2B3D33" strokeWidth="1.5" />
          
          {/* Dual-Tone True Tone Flash */}
          <circle cx="70" cy="28" r="7" fill="#2E3B33" stroke="#4A6557" strokeWidth="1.5" />
          <circle cx="70" cy="28" r="4" fill="#F4E087" opacity="0.75" />

          {/* Copper Flex Ribbon Connector */}
          <path d="M42 90h26v8H42z" fill="#B07D38" stroke="#7A5623" strokeWidth="1" />
          <path d="M46 92h2v4h-2zm6 0h2v4h-2zm6 0h2v4h-2zm6 0h2v4h-2z" fill="#E8C37B" />

          <defs>
            <linearGradient id="metalGrad" x1="15" y1="13" x2="85" y2="87" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1C2721" />
              <stop offset="0.5" stopColor="#141C18" />
              <stop offset="1" stopColor="#0E1512" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  // OLED Display Panel - High-detail smartphone screen assembly with flex cable
  if (cat.includes('display') || cat.includes('screen')) {
    return (
      <div className={`relative flex items-center justify-center bg-gradient-to-b from-[#18231E] to-[#0E1511] border border-[#2B3E34] rounded-xl overflow-hidden shadow-inner ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full p-1.5">
          {/* Glass Bezel */}
          <rect x="18" y="6" width="64" height="88" rx="8" fill="#070A09" stroke="#36493F" strokeWidth="2.5" />
          {/* Active OLED Matrix Area */}
          <rect x="22" y="12" width="56" height="74" rx="4" fill="url(#oledGrad)" />
          {/* Glass Gloss Sheen diagonal */}
          <path d="M24 14l40 0l-30 68l-10 0z" fill="white" opacity="0.04" />
          {/* Ear Speaker Cutout & Sensor Array */}
          <rect x="42" y="8" width="16" height="2.5" rx="1.25" fill="#1C2822" />
          <circle cx="36" cy="9.25" r="1.25" fill="#13231B" />
          {/* Gold Flex Cable Ribbons */}
          <path d="M36 94h28v5H36z" fill="#B07D38" />
          <path d="M40 96h3v2h-3zm6 0h3v2h-3zm6 0h3v2h-3zm6 0h3v2h-3z" fill="#F4E087" />
          
          <defs>
            <linearGradient id="oledGrad" x1="22" y1="12" x2="78" y2="86" gradientUnits="userSpaceOnUse">
              <stop stopColor="#12251C" />
              <stop offset="0.6" stopColor="#0B1511" />
              <stop offset="1" stopColor="#08100C" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  // Motherboard / Logic Board - Circuit PCB with Bionic chip & micro solder points
  if (cat.includes('logic') || cat.includes('motherboard') || cat.includes('board')) {
    return (
      <div className={`relative flex items-center justify-center bg-gradient-to-b from-[#18231E] to-[#0E1511] border border-[#2B3E34] rounded-xl overflow-hidden shadow-inner ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full p-1.5">
          {/* Dark Green PCB Silhouette */}
          <path d="M16 12h68v24h-10v26h10v26H16V12z" fill="#14211A" stroke="#334B3D" strokeWidth="2.5" />
          {/* Central Processor Chip with Heatspreader */}
          <rect x="28" y="26" width="34" height="34" rx="4" fill="#0A0E0C" stroke="#52B788" strokeWidth="1.5" />
          <rect x="33" y="31" width="24" height="24" rx="2" fill="#1A3326" />
          <circle cx="45" cy="43" r="4" fill="#52B788" opacity="0.3" />
          {/* Gold Circuit Traces & Contact Pads */}
          <path d="M22 18h8M22 24h8M22 66h8M22 72h8M68 20h8M68 76h8" stroke="#D4A373" strokeWidth="2" strokeLinecap="round" />
          <circle cx="24" cy="34" r="1.5" fill="#E8C37B" />
          <circle cx="24" cy="44" r="1.5" fill="#E8C37B" />
          <circle cx="24" cy="54" r="1.5" fill="#E8C37B" />
          <rect x="36" y="68" width="18" height="12" rx="2" fill="#0F1813" stroke="#415F4E" strokeWidth="1" />
        </svg>
      </div>
    );
  }

  // Battery Pack - Li-ion internal pouch cell with safety flex
  if (cat.includes('battery')) {
    return (
      <div className={`relative flex items-center justify-center bg-gradient-to-b from-[#18231E] to-[#0E1511] border border-[#2B3E34] rounded-xl overflow-hidden shadow-inner ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full p-1.5">
          {/* Pouch Cell Body */}
          <rect x="24" y="14" width="52" height="74" rx="6" fill="#16221C" stroke="#375041" strokeWidth="2.5" />
          <rect x="28" y="18" width="44" height="66" rx="4" fill="#0E1612" />
          {/* Top Battery Flex / BMS board */}
          <path d="M38 8h24v6H38z" fill="#2E4437" stroke="#4A6B57" strokeWidth="1.5" />
          <path d="M42 10h5v2h-5zm11 0h5v2h-5z" fill="#E8C37B" />
          {/* Clean Lightning Bolt Symbol */}
          <path d="M52 34l-9 16h10l-4 18 14-20h-10l7-14h-8z" fill="#52B788" />
        </svg>
      </div>
    );
  }

  // Speaker / Audio Haptic Engine
  if (cat.includes('audio') || cat.includes('speaker') || cat.includes('taptic')) {
    return (
      <div className={`relative flex items-center justify-center bg-gradient-to-b from-[#18231E] to-[#0E1511] border border-[#2B3E34] rounded-xl overflow-hidden shadow-inner ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full p-1.5">
          <rect x="16" y="24" width="68" height="52" rx="10" fill="#16231C" stroke="#364E40" strokeWidth="2.5" />
          {/* Sound Diaphragm Ring */}
          <circle cx="42" cy="50" r="18" fill="#0A0F0D" stroke="#52B788" strokeWidth="2" />
          <circle cx="42" cy="50" r="10" fill="#1A3326" />
          <circle cx="42" cy="50" r="4" fill="#52B788" />
          {/* Acoustic Grille Vents */}
          <path d="M68 38v24M74 42v16" stroke="#74C69D" strokeWidth="3" strokeLinecap="round" />
          <path d="M30 76h24v6H30z" fill="#B07D38" />
        </svg>
      </div>
    );
  }

  // Charging Port / Lightning / USB-C Ribbon Assembly
  return (
    <div className={`relative flex items-center justify-center bg-gradient-to-b from-[#18231E] to-[#0E1511] border border-[#2B3E34] rounded-xl overflow-hidden shadow-inner ${sizeClasses} ${className}`}>
      <svg viewBox="0 0 100 100" fill="none" className="w-full h-full p-1.5">
        <path d="M18 38h28l10-18h26v24H64l-8 20H18V38z" fill="#16231D" stroke="#364E40" strokeWidth="2.5" />
        {/* Metal USB-C Socket housing */}
        <rect x="58" y="34" width="26" height="14" rx="4" fill="#0B100D" stroke="#52B788" strokeWidth="2" />
        <rect x="63" y="38" width="16" height="6" rx="2" fill="#1C2C23" />
        <path d="M67 41h8" stroke="#E8C37B" strokeWidth="2" strokeLinecap="round" />
        {/* Primary Mic Capsule */}
        <circle cx="32" cy="50" r="5" fill="#090E0C" stroke="#3E5B4A" strokeWidth="1.5" />
        <circle cx="32" cy="50" r="2" fill="#52B788" />
      </svg>
    </div>
  );
};
