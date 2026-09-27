import React from 'react';
import workshopImg from '../../assets/images/associate_repair_workshop_1790419255786.avif';

interface DamagedPhoneVisualProps {
  damageScenario?: 'screen' | 'backglass' | 'water';
  className?: string;
  showCallouts?: boolean;
}

export const DamagedPhoneVisual: React.FC<DamagedPhoneVisualProps> = ({
  damageScenario = 'screen',
  className = '',
  showCallouts = true
}) => {
  return (
    <div className={`relative rounded-2xl overflow-hidden bg-[#0A0F0D] border border-[#23352B] p-6 flex items-center justify-center ${className}`}>
      {/* Background workbench photo texture */}
      <img
        src={workshopImg}
        alt="Technician Workbench Surface"
        className="absolute inset-0 w-full h-full object-cover opacity-15 filter grayscale"
        referrerPolicy="no-referrer"
      />
      
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F0D] via-[#0A0F0D]/85 to-[#0A0F0D]/60 pointer-events-none" />

      {/* Realistic Hardware Presentation */}
      <div className="relative z-10 w-full max-w-[280px] aspect-[9/17] flex items-center justify-center">
        {/* Smartphone Body Silhouette */}
        <div className="relative w-full h-full rounded-[38px] bg-gradient-to-b from-[#1C2722] via-[#121A16] to-[#0A100D] border-[3px] border-[#374E42] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden p-2.5">
          {/* Antenna bands */}
          <div className="absolute left-0 top-16 w-1 h-2 bg-[#2D4036]" />
          <div className="absolute right-0 top-16 w-1 h-2 bg-[#2D4036]" />
          <div className="absolute left-0 bottom-20 w-1 h-2 bg-[#2D4036]" />
          <div className="absolute right-0 bottom-20 w-1 h-2 bg-[#2D4036]" />

          {/* Inner Display Glass / Bezel */}
          <div className="relative w-full h-full rounded-[30px] bg-[#070B09] border border-[#22352B] overflow-hidden flex flex-col justify-between">
            {/* Dynamic Island / Notch */}
            <div className="relative z-20 mx-auto mt-2 w-24 h-5 rounded-full bg-[#030604] border border-[#16241D] flex items-center justify-center px-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[#0A140F] border border-[#20362B] mr-2" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#52B788]/60" />
            </div>

            {/* Realistic Fracture Mesh (if screen cracked) */}
            {damageScenario === 'screen' && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 240 460" fill="none">
                {/* Impact origin */}
                <circle cx="180" cy="140" r="4" fill="#A7D7C5" opacity="0.8" />
                {/* Hairline glass fracture fissures */}
                <path d="M180 140 L140 180 L90 210 L30 260" stroke="#74C69D" strokeWidth="1.2" opacity="0.75" />
                <path d="M180 140 L210 190 L230 260" stroke="#74C69D" strokeWidth="1" opacity="0.6" />
                <path d="M180 140 L160 80 L120 40 L60 20" stroke="#74C69D" strokeWidth="1" opacity="0.7" />
                <path d="M140 180 L160 240 L150 320 L110 390 L80 440" stroke="#74C69D" strokeWidth="0.8" opacity="0.5" />
                <path d="M90 210 L60 170 L20 160" stroke="#74C69D" strokeWidth="0.7" opacity="0.6" />
                <path d="M160 240 L210 300 L200 370" stroke="#74C69D" strokeWidth="0.7" opacity="0.5" />
                {/* Spiderweb secondary micro-fractures */}
                <path d="M170 120 L195 155 L165 160 Z" stroke="#A7D7C5" strokeWidth="0.5" opacity="0.4" fill="#52B788" fillOpacity="0.05" />
              </svg>
            )}

            {/* Diagnostic Scanner Overlay */}
            <div className="absolute inset-0 flex flex-col justify-center items-center p-4 z-15">
              <div className="w-full p-3 rounded-xl bg-[#0E1713]/90 border border-[#253D30] backdrop-blur-md space-y-1.5 text-center">
                <div className="text-[10px] font-mono text-[#52B788] uppercase tracking-wider">
                  Hardware Diagnostic
                </div>
                <div className="text-xs font-bold text-[#E8ECE9]">
                  Display Impact · Sensors Operational
                </div>
                <div className="text-[10px] text-[#9AA5A0]">
                  Recovery Potential: 82%
                </div>
              </div>
            </div>

            {/* Bottom Home Indicator Bar */}
            <div className="relative z-20 mb-2 w-28 h-1 rounded-full bg-[#273B30] mx-auto" />
          </div>
        </div>

        {/* Diagnostic Callout Pins (Floating markers) */}
        {showCallouts && (
          <>
            {/* Camera module pin */}
            <div className="absolute -top-2 -right-4 z-30 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#14231B] border border-[#2B4738] shadow-lg text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#52B788]" />
              <span className="font-semibold text-[#E8ECE9]">Camera: High Potential</span>
            </div>

            {/* Motherboard pin */}
            <div className="absolute top-1/3 -left-6 z-30 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#14231B] border border-[#2B4738] shadow-lg text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#52B788]" />
              <span className="font-semibold text-[#E8ECE9]">A15 Logic: Intact</span>
            </div>

            {/* Battery / Power pin */}
            <div className="absolute bottom-10 -right-4 z-30 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#14231B] border border-[#2B4738] shadow-lg text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#52B788]" />
              <span className="font-semibold text-[#E8ECE9]">Battery: 88% Health</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
