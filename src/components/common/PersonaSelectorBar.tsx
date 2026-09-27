import React from 'react';
import { UserPersona, SupportedLanguage } from '../../types';
import { TRANSLATIONS } from '../../data/translations';
import { Smartphone, Store, ShoppingCart, ShoppingBag, Eye, Volume2 } from 'lucide-react';

interface PersonaSelectorBarProps {
  currentPersona: UserPersona;
  onSelectPersona: (persona: UserPersona) => void;
  currentLanguage?: SupportedLanguage;
  isHindi?: boolean;
  onVoiceSpeak?: () => void;
}

export const PersonaSelectorBar: React.FC<PersonaSelectorBarProps> = ({
  currentPersona,
  onSelectPersona,
  currentLanguage = 'en',
  isHindi = false,
  onVoiceSpeak
}) => {
  const lang = currentLanguage || (isHindi ? 'hi' : 'en');
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const personas = [
    {
      id: 'seller' as UserPersona,
      title: t.roleSeller,
      subtext: t.roleSellerSub,
      badge: lang === 'hi' ? 'तुरंत कैश' : lang === 'te' ? 'తక్షణ నగదు' : 'Instant Cash',
      color: 'hover:border-emerald-500',
      activeColor: 'bg-emerald-600 text-white border-emerald-600 shadow-md ring-2 ring-emerald-500/20',
      icon: Smartphone
    },
    {
      id: 'associate_a' as UserPersona,
      title: t.roleAssociateA,
      subtext: t.roleAssociateASub,
      badge: lang === 'hi' ? 'दुकानदार' : lang === 'te' ? 'షాప్ భాగస్వామి' : 'Dukaan Hub',
      color: 'hover:border-teal-500',
      activeColor: 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-slate-900/20',
      icon: Store
    },
    {
      id: 'associate_b' as UserPersona,
      title: t.roleAssociateB,
      subtext: t.roleAssociateBSub,
      badge: lang === 'hi' ? 'थोक भाव' : lang === 'te' ? 'హోల్‌సేల్' : 'B2B Wholesale',
      color: 'hover:border-blue-500',
      activeColor: 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-500/20',
      icon: ShoppingCart
    },
    {
      id: 'buyer' as UserPersona,
      title: t.roleBuyer,
      subtext: t.roleBuyerSub,
      badge: lang === 'hi' ? '70% बचत' : lang === 'te' ? '70% ఆదా' : '60-70% Savings',
      color: 'hover:border-amber-500',
      activeColor: 'bg-amber-600 text-white border-amber-600 shadow-md ring-2 ring-amber-500/20',
      icon: ShoppingBag
    },
    {
      id: 'executive' as UserPersona,
      title: t.roleExecutive,
      subtext: t.roleExecutiveSub,
      badge: '360° Flow',
      color: 'hover:border-purple-500',
      activeColor: 'bg-purple-700 text-white border-purple-700 shadow-md ring-2 ring-purple-500/20',
      icon: Eye
    }
  ];

  return (
    <div className="bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs py-3.5 px-4 sm:px-6 lg:px-8 sticky top-[108px] z-30">
      <div className="max-w-7xl mx-auto space-y-2.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-extrabold uppercase tracking-wider">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-600"></span>
              </span>
              <span>Stakeholder Mode</span>
            </div>
            <span className="text-xs font-bold text-slate-800 font-display">
              {t.selectRole}
            </span>
            <span className="text-[11px] text-slate-400 font-medium hidden md:inline">
              — The entire portal adapts to your selected business role
            </span>
          </div>

          {/* Voice Guidance Button for low-literacy users */}
          <button
            onClick={onVoiceSpeak}
            className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold transition-all shadow-2xs cursor-pointer group"
            title="Listen to audio guidance"
          >
            <Volume2 className="w-3.5 h-3.5 text-emerald-700 group-hover:scale-110 transition-transform" />
            <span>{t.listenVoice}</span>
          </button>
        </div>

        {/* 5 Dynamic Persona Selection Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {personas.map((p) => {
            const Icon = p.icon;
            const isSelected = currentPersona === p.id;
            return (
              <button
                key={p.id}
                onClick={() => onSelectPersona(p.id)}
                className={`group relative p-3 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? `${p.activeColor} ring-2 shadow-sm`
                    : `bg-slate-50/70 border-slate-200/90 text-slate-700 ${p.color} hover:bg-white hover:border-slate-300 hover:shadow-xs`
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-2">
                  <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-white border border-slate-200 text-slate-700 shadow-2xs'
                  }`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-emerald-50 text-emerald-800 border border-emerald-200/60'
                  }`}>
                    {p.badge}
                  </span>
                </div>

                <div>
                  <div className={`text-xs font-black tracking-tight leading-snug ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                    {p.title}
                  </div>
                  <div className={`text-[10px] mt-0.5 truncate leading-tight font-medium ${isSelected ? 'text-white/85' : 'text-slate-500'}`}>
                    {p.subtext}
                  </div>
                </div>

                {isSelected && (
                  <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
