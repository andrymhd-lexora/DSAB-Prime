import React, { useState, useEffect } from 'react';
import { Language, Theme } from '../types';
import { TRANSLATIONS } from '../data';
import { Calculator, Hammer, Trees, MapPin, ReceiptText, ChevronRight, MessageSquareCode, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BudgetEstimatorProps {
  lang: Language;
  theme: Theme;
  onLog: (msg: string) => void;
}

export default function BudgetEstimator({ lang, theme, onLog }: BudgetEstimatorProps) {
  const t = TRANSLATIONS[lang];

  // Form states
  const [projectType, setProjectType] = useState<'high-rise' | 'infrastructure' | 'retrofitting'>('high-rise');
  const [scale, setScale] = useState<number>(1200); // in m2 or meters
  const [materialGrade, setMaterialGrade] = useState<'standard' | 'premium' | 'carbon'>('premium');
  const [region, setRegion] = useState<string>('jakarta');
  const [useEcoTech, setUseEcoTech] = useState<boolean>(true);
  const [isCalculated, setIsCalculated] = useState<boolean>(false);
  
  // Submission simulation
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [clientName, setClientName] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');

  // Cost calculation coefficients
  const baseCostMultiplier = {
    'high-rise': 8000000,    // Rp 8.0M / m2
    'infrastructure': 15000000, // Rp 15.0M / meter linear
    'retrofitting': 450000000,   // Rp 4.5M / m2
  };

  const materialModifiers = {
    'standard': 0.9,
    'premium': 1.15,
    'carbon': 1.45,
  };

  const regionModifiers: Record<string, { label: string, val: number }> = {
    'jakarta': { label: 'DKI Jakarta (Jabodetabek Index 1.0x)', val: 1.0 },
    'surabaya': { label: 'Surabaya & Gerbangkertosusila (Index 0.96x)', val: 0.96 },
    'ikn': { label: 'Ibu Kota Nusantara IKN (Index 1.35x)', val: 1.35 },
    'sumatera': { label: 'Sumatera & Jasa Trans-Bela (Index 1.02x)', val: 1.02 },
    'eastern': { label: 'Indonesia Bagian Timur (Index 1.25x)', val: 1.25 },
  };

  // Live calculation
  const getCalculation = () => {
    const base = baseCostMultiplier[projectType] * scale;
    const materialMod = materialModifiers[materialGrade];
    const regionMod = regionModifiers[region]?.val || 1.0;
    
    const baseStructuralCost = base * materialMod * regionMod;
    const ecoPremium = useEcoTech ? baseStructuralCost * 0.12 : 0;
    
    // Tax + Admin legalities (PPN, PBG, AMDAL)
    const adminTaxes = (baseStructuralCost + ecoPremium) * 0.11;
    const totalCost = baseStructuralCost + ecoPremium + adminTaxes;

    return {
      structural: Math.round(baseStructuralCost),
      eco: Math.round(ecoPremium),
      tax: Math.round(adminTaxes),
      total: Math.round(totalCost)
    };
  };

  const costs = getCalculation();

  useEffect(() => {
    // Log the calculation parameter changes to parent telemetry log
    const typeLabel = projectType === 'high-rise' ? 'Gedung' : projectType === 'infrastructure' ? 'Infrastruktur' : 'Renovasi';
    onLog(`${t.loggerEstimateCalculated} ${formatRupiah(costs.total)} (${typeLabel}, ${scale} m²)`);
  }, [projectType, scale, materialGrade, region, useEcoTech]);

  function formatRupiah(num: number): string {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(num);
  }

  const handleSubmitEstimate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      onLog(`${t.loggerFormSubmitted} ${clientName} (${clientEmail}) - Proyek ${projectType} Est: ${formatRupiah(costs.total)}`);
      setTimeout(() => {
        setIsSubmitted(false);
        setClientName('');
        setClientEmail('');
      }, 5000);
    }, 1500);
  };

  // Generate WhatsApp message based on selections
  const triggerWhatsAppDraft = () => {
    const textMsg = `Halo PT DSAB (DSAB Prime), saya ingin berkonsultasi mengenai penawaran resmi. Rincian Estimatori Aplikasi:\nTipe Proyek: ${projectType.toUpperCase()}\nUkuran: ${scale} ${projectType === 'infrastructure' ? 'Meter' : 'm²'}\nMaterial: ${materialGrade.toUpperCase()}\nWilayah: ${regionModifiers[region]?.label}\nEco Tech: ${useEcoTech ? 'AKTIF (Sistem Hijau)' : 'NON-AKTIF'}\nEstimasi Kasar: ${formatRupiah(costs.total)}\nMohon hubungi saya kembali untuk rencana survey. Terima kasih.`;
    const encoded = encodeURIComponent(textMsg);
    window.open(`https://wa.me/6281412235545?text=${encoded}`, '_blank');
  };

  return (
    <div id="budget-estimator" className={`rounded-3xl border p-6 md:p-8 transition-all ${
      theme === 'dark' 
        ? 'glass-panel bg-slate-950/80 border-violet-900/30 text-white' 
        : 'glass-panel-light bg-slate-50/90 border-slate-200/80 text-slate-900'
    }`}>
      {/* Badge Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-xl bg-violet-600/10 text-violet-400">
          <Calculator className="w-5 h-5 text-violet-500 animate-pulse" />
        </div>
        <span className="text-xs font-mono font-bold tracking-widest text-violet-500 uppercase">
          DSAB REALTIME ESTIMATOR
        </span>
      </div>

      <h3 className="text-2xl md:text-3xl font-display font-medium mb-2">
        {t.estTitle}
      </h3>
      <p className={`text-sm mb-8 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
        {t.estSubtitle}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Parameters */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Project Type Selection */}
          <div>
            <label className="block text-xs font-mono font-semibold uppercase tracking-wider mb-2 text-violet-400">
              {t.estSelectType}
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setProjectType('high-rise')}
                className={`py-3 px-2 text-xs md:text-sm font-semibold rounded-xl border transition-all flex flex-col items-center justify-center gap-2 ${
                  projectType === 'high-rise'
                    ? 'bg-violet-600/20 border-violet-500 text-violet-400 font-bold'
                    : theme === 'dark' ? 'border-slate-800 text-slate-400 hover:bg-slate-900' : 'border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Hammer className="w-4 h-4" />
                <span>Gedung</span>
              </button>
              <button
                onClick={() => setProjectType('infrastructure')}
                className={`py-3 px-2 text-xs md:text-sm font-semibold rounded-xl border transition-all flex flex-col items-center justify-center gap-2 ${
                  projectType === 'infrastructure'
                    ? 'bg-cyan-600/20 border-cyan-500 text-cyan-400 font-bold'
                    : theme === 'dark' ? 'border-slate-800 text-slate-400 hover:bg-slate-900' : 'border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Calculator className="w-4 h-4" />
                <span>Infrastruktur</span>
              </button>
              <button
                onClick={() => setProjectType('retrofitting')}
                className={`py-3 px-2 text-xs md:text-sm font-semibold rounded-xl border transition-all flex flex-col items-center justify-center gap-2 ${
                  projectType === 'retrofitting'
                    ? 'bg-violet-600/20 border-violet-500 text-violet-400 font-bold'
                    : theme === 'dark' ? 'border-slate-800 text-slate-400 hover:bg-slate-900' : 'border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Trees className="w-4 h-4" />
                <span>Retrofit</span>
              </button>
            </div>
          </div>

          {/* Scale dimension slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-violet-400">
                {t.estSelectScale}
              </label>
              <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/30">
                {scale.toLocaleString('id-ID')} {projectType === 'infrastructure' ? 'Meter Linear' : 'm² GFA'}
              </span>
            </div>
            <input
              type="range"
              min={projectType === 'infrastructure' ? 100 : 200}
              max={projectType === 'infrastructure' ? 10000 : 25000}
              step={projectType === 'infrastructure' ? 50 : 100}
              value={scale}
              onChange={(e) => setScale(Number(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-slate-800 accent-violet-600 focus:outline-none"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
              <span>Min: {projectType === 'infrastructure' ? '100m' : '200m²'}</span>
              <span>Max: {projectType === 'infrastructure' ? '10.000m' : '25.000m²'}</span>
            </div>
          </div>

          {/* Region multiplier dropdown */}
          <div>
            <label className="block text-xs font-mono font-semibold uppercase tracking-wider mb-2 text-violet-400">
              {t.estSelectLocation}
            </label>
            <div className="relative">
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className={`w-full py-2.5 px-3 rounded-xl border text-sm font-medium focus:ring-1 focus:ring-violet-500 focus:outline-none appearance-none ${
                  theme === 'dark'
                    ? 'bg-slate-900 border-slate-800 text-white'
                    : 'bg-white border-slate-200 text-slate-800'
                }`}
              >
                {Object.keys(regionModifiers).map((regKey) => (
                  <option key={regKey} value={regKey}>
                    {regionModifiers[regKey].label}
                  </option>
                ))}
              </select>
              <MapPin className="absolute right-3 top-2.5 w-4 h-4 text-violet-400 pointer-events-none" />
            </div>
          </div>

          {/* Material Grade Choices */}
          <div>
            <label className="block text-xs font-mono font-semibold uppercase tracking-wider mb-2 text-violet-400">
              {t.estSelectMaterial}
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setMaterialGrade('standard')}
                className={`py-2 px-1 text-xs font-medium rounded-xl border transition-all ${
                  materialGrade === 'standard'
                    ? 'border-violet-500 bg-violet-600/10 text-violet-300 font-bold'
                    : theme === 'dark' ? 'border-slate-800 text-slate-400 hover:bg-slate-900' : 'border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                K-350 Standard
              </button>
              <button
                onClick={() => setMaterialGrade('premium')}
                className={`py-2 px-1 text-xs font-medium rounded-xl border transition-all ${
                  materialGrade === 'premium'
                    ? 'border-violet-500 bg-violet-600/10 text-violet-300 font-bold'
                    : theme === 'dark' ? 'border-slate-800 text-slate-400 hover:bg-slate-900' : 'border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                K-500 Post-Tension
              </button>
              <button
                onClick={() => setMaterialGrade('carbon')}
                className={`py-2 px-1 text-xs font-medium rounded-xl border transition-all ${
                  materialGrade === 'carbon'
                    ? 'border-violet-500 bg-violet-600/10 text-violet-300 font-bold'
                    : theme === 'dark' ? 'border-slate-800 text-slate-400 hover:bg-slate-900' : 'border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                Prestressed Carbon
              </button>
            </div>
          </div>

          {/* Eco Technology Toggle */}
          <div className="flex items-center justify-between p-4 rounded-2xl border border-dashed border-violet-500/20 bg-violet-950/10">
            <div className="flex items-center gap-3">
              <Trees className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <span className="text-xs font-bold block text-emerald-400 uppercase tracking-wider font-mono">
                  GREEN BUILDING METHOD
                </span>
                <span className={`text-[11px] block ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                  {t.estIncludeEco}
                </span>
              </div>
            </div>
            <button
              onClick={() => setUseEcoTech(!useEcoTech)}
              className={`w-12 h-6 rounded-full p-1 transition-colors focus:outline-none ${
                useEcoTech ? 'bg-emerald-500' : 'bg-slate-700'
              }`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                useEcoTech ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </button>
          </div>

        </div>

        {/* Output Financial Ledger */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className={`rounded-2xl p-5 border ${
            theme === 'dark' 
              ? 'bg-slate-900/90 border-violet-500/10' 
              : 'bg-white border-slate-200'
          }`}>
            <div className="flex justify-between items-center mb-4 border-b border-dashed border-slate-800 pb-3">
              <span className="text-xs font-mono text-violet-400 font-bold flex items-center gap-1">
                <ReceiptText className="w-4 h-4 text-violet-400" />
                {t.estResultDetail}
              </span>
              <span className="text-[11px] font-mono text-slate-500">REV. 2026.15</span>
            </div>

            {/* Calculations Table */}
            <div className="space-y-3 font-mono text-xs">
              
              <div className="flex justify-between items-center">
                <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>{t.baseCost}</span>
                <span className={theme === 'dark' ? 'text-white font-semibold' : 'text-slate-900 font-semibold'}>
                  {formatRupiah(costs.structural)}
                </span>
              </div>

              {useEcoTech && (
                <div className="flex justify-between items-center text-emerald-400">
                  <span className="flex items-center gap-1 font-semibold">
                    🌱 {lang === 'id' ? 'Premium Panel Hijau' : 'Eco Premium Charge'}
                  </span>
                  <span className="font-bold">
                    + {formatRupiah(costs.eco)}
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center">
                <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>{t.taxAdm}</span>
                <span className={theme === 'dark' ? 'text-white' : 'text-slate-900'}>
                  {formatRupiah(costs.tax)}
                </span>
              </div>

              <div className="pt-4 mt-2 border-t border-dashed border-slate-800">
                <span className="text-[10px] uppercase font-bold text-violet-400 block tracking-wider mb-1">
                  {t.estResultRange}
                </span>
                <div className="text-xl md:text-2xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400 animate-pulse">
                  {formatRupiah(costs.total)}
                </div>
              </div>

            </div>

            {/* Budget allocation graphics */}
            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-[10px] uppercase font-mono tracking-widest text-slate-400">
                <span>Alokasi Sipil</span>
                <span>{useEcoTech ? '72%' : '85%'}</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden flex">
                <div className="bg-violet-500 h-full" style={{ width: useEcoTech ? '72%' : '85%' }} />
                {useEcoTech && <div className="bg-emerald-400 h-full" style={{ width: '12%' }} />}
                <div className="bg-cyan-400 h-full" style={{ width: useEcoTech ? '16%' : '15%' }} />
              </div>
            </div>

            {/* Instant Actions */}
            <div className="mt-6 space-y-2">
              <button
                onClick={triggerWhatsAppDraft}
                className="w-full py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-semibold text-xs md:text-sm transition-all bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer active:scale-[0.98]"
              >
                <MessageSquareCode className="w-4 h-4" />
                <span>{lang === 'id' ? 'Konsultasi Penawaran Resmi via WA' : 'Review Estimate via WhatsApp'}</span>
              </button>
            </div>
          </div>

          {/* Quick email lead submission */}
          <form onSubmit={handleSubmitEstimate} className="mt-4">
            <p className="text-[10px] leading-relaxed text-slate-400 italic mb-3">
              {t.estBudgetDisclaimer}
            </p>
            
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <input
                  type="text"
                  required
                  placeholder={lang === 'id' ? 'Nama Anda' : 'Your Name'}
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className={`py-2 px-3 rounded-lg border text-xs focus:ring-1 focus:ring-violet-500 focus:outline-none ${
                    theme === 'dark' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
                  }`}
                />
                <input
                  type="email"
                  required
                  placeholder={lang === 'id' ? 'Email Kantor' : 'Office Email'}
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className={`py-2 px-3 rounded-lg border text-xs focus:ring-1 focus:ring-violet-500 focus:outline-none ${
                    theme === 'dark' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
                  }`}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting || !clientName || !clientEmail}
                className={`w-full py-2 px-4 rounded-lg text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                  isSubmitting 
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-violet-600 hover:bg-violet-700 text-white cursor-pointer'
                }`}
              >
                {isSubmitting ? (
                  <span>{t.contactLoading}</span>
                ) : (
                  <>
                    <span>{t.estRequestQuota}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>

            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-3 p-3 rounded-xl border border-emerald-500/30 bg-emerald-950/20 text-emerald-400 text-xs font-medium flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{t.estSuccessAlert}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </form>

        </div>
      </div>
    </div>
  );
}
