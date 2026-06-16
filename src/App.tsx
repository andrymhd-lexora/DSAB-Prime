import React, { useState, useEffect } from 'react';
import { Language, Theme, Project } from './types';
import { TRANSLATIONS, PROJECTS, SERVICES, PROCESS_STEPS, FAQ_ITEMS, TESTIMONIALS, CLIENT_LOGOS } from './data';
import BudgetEstimator from './components/BudgetEstimator';
import LiveTelemetryLogger from './components/LiveTelemetryLogger';
import ProjectDetailModal from './components/ProjectDetailModal';
import SkeletonLoader from './components/SkeletonLoader';
import { 
  Building2, Hammer, Shield, RefreshCw, Mail, Phone, Globe, Menu, X, 
  ChevronDown, ArrowUpRight, ArrowRight, Layers, Sparkles, CheckCircle, 
  MapPin, HelpCircle, FileText, ChevronRight, MessageCircle, AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // Theme & Language state
  const [lang, setLang] = useState<Language>('id');
  const [theme, setTheme] = useState<Theme>('dark');
  
  // Navigation states
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  
  // Projects filtering states
  const [activeFilter, setActiveFilter] = useState<'all' | 'infrastructure' | 'building' | 'renovation' | 'green'>('all');
  const [isProjectLoading, setIsProjectLoading] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Custom interactive telemetry log entries
  const [logs, setLogs] = useState<string[]>([]);

  // FAQ active indexes
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  // Contact form state
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [contactSubmitting, setContactSubmitting] = useState<boolean>(false);
  const [contactSuccessMsg, setContactSuccessMsg] = useState<boolean>(false);

  const t = TRANSLATIONS[lang];

  // Utility to push notifications into telemetry feed
  const addLog = (msg: string) => {
    setLogs(prev => [...prev, msg]);
  };

  // Set theme class on body
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.backgroundColor = '#070314'; // beautiful dark space background
    } else {
      root.classList.remove('dark');
      root.style.backgroundColor = '#fdfdfd'; // bright solid base
    }
    addLog(`${t.loggerThemeChanged} ${theme === 'dark' ? t.darkMode : t.lightMode}`);
  }, [theme]);

  // Handle translation alerts
  const handleLangToggle = () => {
    const nextLang: Language = lang === 'id' ? 'en' : 'id';
    setLang(nextLang);
    // Timeout log to ensure state has changed first
    setTimeout(() => {
      setLogs(prev => [...prev, nextLang === 'en' ? 'Language switched to English' : 'Bahasa dialihkan ke Indonesia']);
    }, 50);
  };

  // Filter projects with subtle simulated skeleton delays
  const handleFilterChange = (filter: typeof activeFilter) => {
    if (filter === activeFilter) return;
    setIsProjectLoading(true);
    setActiveFilter(filter);
    addLog(lang === 'id' ? `Menampilkan kategori proyek: ${filter}` : `Filtering project archive by: ${filter}`);
    
    // Smooth loader delay
    setTimeout(() => {
      setIsProjectLoading(false);
    }, 600);
  };

  // Contact form submission
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.phone) return;

    setContactSubmitting(true);
    setTimeout(() => {
      setContactSubmitting(false);
      setContactSuccessMsg(true);
      addLog(`${t.loggerFormSubmitted} ${contactForm.name} | Telp: ${contactForm.phone}`);
      
      // Clear form inputs
      setContactForm({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => {
        setContactSuccessMsg(false);
      }, 6000);
    }, 1500);
  };

  // Retrieve filtered list of project entries
  const filteredProjects = PROJECTS.filter(p => {
    if (activeFilter === 'all') return true;
    return p.category === activeFilter;
  });

  // Modal navigation helpers
  const handleNextProject = () => {
    if (!selectedProject) return;
    const currentIdx = PROJECTS.findIndex(p => p.id === selectedProject.id);
    const nextIdx = (currentIdx + 1) % PROJECTS.length;
    setSelectedProject(PROJECTS[nextIdx]);
    addLog(`${t.loggerProjectSelected} ${PROJECTS[nextIdx].title[lang]}`);
  };

  const handlePrevProject = () => {
    if (!selectedProject) return;
    const currentIdx = PROJECTS.findIndex(p => p.id === selectedProject.id);
    const prevIdx = (currentIdx - 1 + PROJECTS.length) % PROJECTS.length;
    setSelectedProject(PROJECTS[prevIdx]);
    addLog(`${t.loggerProjectSelected} ${PROJECTS[prevIdx].title[lang]}`);
  };

  // Trigger default consultation draft via WhatsApp
  const openWhatsAppHotline = () => {
    const greetingText = lang === 'id' 
      ? 'Halo PT DSAB (DSAB Prime), saya ingin berkonsultasi mengenai proyek pembangunan/renovasi sipil di wilayah kami.'
      : 'Hello PT DSAB (DSAB Prime), I would like to schedule an engineering project consultation.';
    window.open(`https://wa.me/6281412235545?text=${encodeURIComponent(greetingText)}`, '_blank');
  };

  return (
    <div className={`min-h-screen relative font-sans antialiased overflow-x-hidden ${
      theme === 'dark' ? 'bg-[#070314] text-slate-100' : 'bg-[#fafafa] text-slate-800'
    }`}>
      
      {/* Dynamic Cyber Backdrop Accents (Visible in dark mode) */}
      {theme === 'dark' && (
        <div className="absolute top-0 left-0 w-full h-[100vh] overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[70%] bg-violet-900/10 rounded-full blur-[160px]" />
          <div className="absolute top-[40%] right-[-10%] w-[50%] h-[60%] bg-cyan-900/10 rounded-full blur-[140px]" />
          <div className="absolute bottom-0 left-[20%] w-[40%] h-[50%] bg-purple-900/10 rounded-full blur-[150px]" />
        </div>
      )}

      {/* STICKY ACCENT NAVIGATION HEADER */}
      <nav className={`sticky top-0 z-40 transition-all border-b ${
        theme === 'dark' 
          ? 'bg-[#070314]/80 backdrop-blur-md border-violet-950/40 text-white' 
          : 'bg-white/90 backdrop-blur-md border-slate-200 text-slate-900'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Brand Logo & Slogan */}
            <a href="#" className="flex items-center gap-3 select-none text-left">
              <img 
                src="/src/assets/images/dsab_logo_emblem_1781500938548.jpg" 
                alt="DSAB Prime Logo" 
                className="h-10 w-auto rounded-lg object-contain border border-violet-500/10"
              />
              <div className="flex flex-col">
                <span className="text-lg font-display font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400 leading-none">
                  {t.navBrand}
                </span>
                <span className="text-[9px] font-mono font-bold tracking-widest text-slate-400 mt-0.5 uppercase hidden sm:block">
                  {t.navTagline}
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-6">
              <a href="#projects" className="text-xs font-mono font-semibold uppercase tracking-wider hover:text-cyan-400 transition">
                {t.navProjects}
              </a>
              <a href="#about" className="text-xs font-mono font-semibold uppercase tracking-wider hover:text-cyan-400 transition">
                {t.navAbout}
              </a>
              <a href="#services" className="text-xs font-mono font-semibold uppercase tracking-wider hover:text-cyan-400 transition">
                {t.navServices}
              </a>
              <a href="#process" className="text-xs font-mono font-semibold uppercase tracking-wider hover:text-cyan-400 transition">
                {t.navProcess}
              </a>
              <a href="#budget-estimator" className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400 hover:text-cyan-300 transition">
                {t.navEstimator}
              </a>
              <a href="#faq" className="text-xs font-mono font-semibold uppercase tracking-wider hover:text-cyan-400 transition">
                {t.navFAQ}
              </a>
              <a href="#contact" className="text-xs font-mono font-semibold uppercase tracking-wider hover:text-cyan-400 transition">
                {t.navContact}
              </a>
            </div>

            {/* Utility Toggles Dashboard */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Language Controller Button */}
              <button
                onClick={handleLangToggle}
                className={`py-1.5 px-3 rounded-lg border font-mono text-[10px] font-bold tracking-wider transition-all select-none cursor-pointer ${
                  theme === 'dark' 
                    ? 'border-violet-900/40 hover:bg-violet-950/40 text-violet-300' 
                    : 'border-slate-200 hover:bg-slate-100 text-slate-700'
                }`}
              >
                {lang === 'id' ? 'EN' : 'ID'}
              </button>

              {/* Theme Toggle Button */}
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className={`py-1.5 px-3 rounded-lg border font-mono text-[10px] font-bold tracking-wider transition-all select-none cursor-pointer ${
                  theme === 'dark' 
                    ? 'border-cyan-900/40 hover:bg-cyan-950/40 text-cyan-300' 
                    : 'border-slate-200 hover:bg-slate-100 text-slate-700'
                }`}
              >
                {theme === 'dark' ? 'LIGHT' : 'DARK'}
              </button>

              {/* WhatsApp Quick Link */}
              <button 
                onClick={openWhatsAppHotline}
                className="py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-[10px] font-bold tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>HOTLINE</span>
              </button>
            </div>

            {/* Mobile menu trigger */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-1.5 rounded-lg border text-xs"
              >
                {theme === 'dark' ? 'L' : 'D'}
              </button>
              <button
                onClick={handleLangToggle}
                className="p-1.5 rounded-lg border text-xs font-mono"
              >
                {lang.toUpperCase()}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 rounded-lg border text-slate-400 hover:text-white"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile menu panel dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className={`lg:hidden border-t overflow-hidden ${
                theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="px-4 py-3 space-y-2 text-xs flex flex-col font-mono font-medium uppercase tracking-wider">
                <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-cyan-400">{t.navProjects}</a>
                <a href="#about" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-cyan-400">{t.navAbout}</a>
                <a href="#services" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-cyan-400">{t.navServices}</a>
                <a href="#process" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-cyan-400">{t.navProcess}</a>
                <a href="#budget-estimator" onClick={() => setMobileMenuOpen(false)} className="py-2 text-cyan-400">{t.navEstimator}</a>
                <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-cyan-400">{t.navFAQ}</a>
                <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-cyan-400">{t.navContact}</a>
                <button
                  onClick={() => { openWhatsAppHotline(); setMobileMenuOpen(false); }}
                  className="w-full py-2 bg-emerald-600 text-white rounded text-center mt-2 flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WHATSAPP HOTLINE</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* 01. INTRO / HERO SECTION (Aesthetic, Dark space, generated images) */}
      <section className="relative pt-8 pb-16 md:pt-16 md:pb-24 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Headline copy info */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Upper badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/30 bg-violet-950/15 text-[10px] md:text-xs font-mono font-bold tracking-widest text-violet-400 uppercase select-none">
                <Sparkles className="w-3.5 h-3.5 text-violet-500 animate-spin" />
                {t.heroBadge}
              </div>

              {/* Spectacular giant title */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-medium tracking-tight leading-none text-balance">
                {t.heroTitlePart1}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 leading-normal">
                  {t.heroTitleHighlight}
                </span>
                {t.heroTitlePart2}
              </h1>

              {/* Supportive introductory text */}
              <p className={`text-sm md:text-base leading-relaxed ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
              }`}>
                {t.heroDesc}
              </p>

              {/* Action buttons triggers */}
              <div className="flex flex-wrap gap-3">
                <a
                  href="#contact"
                  className="py-3 px-6 rounded-xl font-display font-semibold text-xs md:text-sm tracking-wide bg-gradient-to-r from-violet-600 to-cyan-500 hover:opacity-90 hover:shadow-cyan-500/10 hover:shadow-lg text-white transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>{t.heroCtaPrimary}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="#budget-estimator"
                  className={`py-3 px-6 rounded-xl font-display font-semibold text-xs md:text-sm tracking-wide border transition-all flex items-center gap-2 cursor-pointer ${
                    theme === 'dark' 
                      ? 'border-slate-800 text-slate-300 hover:bg-slate-900' 
                      : 'border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>{t.heroCtaSecondary}</span>
                  <ArrowUpRight className="w-4 h-4 text-violet-400" />
                </a>
              </div>

              {/* Dynamic metrics bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-dashed border-slate-800/80">
                <div>
                  <span className="text-xl sm:text-2xl font-bold font-mono text-cyan-400 select-none">42+</span>
                  <span className={`text-[10px] block font-mono font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                    {t.heroStatsProject}
                  </span>
                </div>
                <div>
                  <span className="text-xl sm:text-2xl font-bold font-mono text-violet-400 select-none">18+</span>
                  <span className={`text-[10px] block font-mono font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                    {t.heroStatsClient}
                  </span>
                </div>
                <div>
                  <span className="text-xl sm:text-2xl font-bold font-mono text-cyan-400 select-none">99.2%</span>
                  <span className={`text-[10px] block font-mono font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                    {t.heroStatsSatis}
                  </span>
                </div>
                <div>
                  <span className="text-xl sm:text-2xl font-bold font-mono text-violet-400 select-none">12+</span>
                  <span className={`text-[10px] block font-mono font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                    {t.heroStatsProv}
                  </span>
                </div>
              </div>

            </div>

            {/* Right side: Generated Premium Architectural render with glowing interface */}
            <div className="lg:col-span-5 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-cyan-500/20 rounded-3xl blur-2xl opacity-40 z-0 pointer-events-none" />
              
              <div className={`relative rounded-3xl p-3 border shadow-2xl z-10 transition-all ${
                theme === 'dark' ? 'bg-[#0f0724]/80 border-violet-900/30' : 'bg-white border-slate-200'
              }`}>
                {/* Simulated interface border */}
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-900">
                  <img
                    src="/src/assets/images/dsab_hero_building_1781499891337.jpg"
                    alt="DSAB Prime Skyscraper Jakarta"
                    className="w-full h-full object-cover select-none"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle dark layout fading scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

                  {/* Tiny floating telemetry panel inside hero image */}
                  <div className="absolute bottom-4 left-4 right-4 glass-panel p-3 rounded-xl border border-violet-500/30 text-white font-mono text-[9px] sm:text-[10px] space-y-1">
                    <div className="flex justify-between font-bold text-cyan-400">
                      <span>PROJECT ACTIVE CONTROL</span>
                      <span className="animate-pulse">● LIVE STATE</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>LOCATION: SCBD JAKARTA</span>
                      <span>SAFETY CODES: ISO-45001</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 08. ACCREDITED CLIENTS MARQUEE / SLIDER */}
      <section className={`py-12 border-y ${
        theme === 'dark' ? 'bg-slate-950/40 border-slate-800' : 'bg-slate-100 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[10px] font-mono font-bold tracking-widest text-violet-400 uppercase mb-6">
            {t.clientTitle}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 items-center justify-items-center">
            {CLIENT_LOGOS.map((client, idx) => (
              <div 
                key={idx} 
                onClick={() => addLog(`Mitra Terpilih: ${client.name}`)}
                className={`py-3 px-5 rounded-xl border font-display transition-all select-none cursor-pointer flex flex-col justify-center items-center w-full max-w-[180px] ${
                  theme === 'dark' 
                    ? 'border-slate-800 bg-slate-900/40 text-slate-400 hover:text-white hover:border-violet-500/30' 
                    : 'border-slate-200 bg-white text-slate-500 hover:text-slate-900 hover:shadow shadow-sm'
                }`}
              >
                <span className="text-xs font-bold tracking-wider">{client.logoText}</span>
                <span className="text-[8px] font-mono text-slate-500">{client.industry[lang]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 02. SELECTED WORKS PORTFOLIO (Category filtering, loading skeletons, modal specs sheet) */}
      <section id="projects" className="py-16 md:py-24 z-10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header block info */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold tracking-widest text-violet-400 uppercase bg-violet-600/10 px-3 py-1 rounded-full">
              {lang === 'id' ? 'PORTOFOLIO PILIHAN' : 'FEATURED WORKS'}
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-medium mt-4 mb-2">
              {t.projectsTitle}
            </h2>
            <p className={`text-slate-400 text-sm md:text-base ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              {t.projectsSubtitle}
            </p>
          </div>

          {/* Filtering buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {[
              { id: 'all', label: t.filterAll },
              { id: 'infrastructure', label: t.filterInfra },
              { id: 'building', label: t.filterBuilding },
              { id: 'renovation', label: t.filterRenovation },
              { id: 'green', label: t.filterGreen }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => handleFilterChange(tab.id as typeof activeFilter)}
                className={`py-2 px-4 rounded-full font-mono text-xs font-semibold uppercase tracking-wider transition-all select-none cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-lg shadow-violet-500/20'
                    : theme === 'dark' 
                      ? 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800' 
                      : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Project Cards Grid / Skeleton State Loader */}
          {isProjectLoading ? (
            <SkeletonLoader count={filteredProjects.length || 3} theme={theme} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className={`group rounded-2xl overflow-hidden border transition-all h-full flex flex-col justify-between ${
                      theme === 'dark' 
                        ? 'bg-slate-950 border-slate-850 hover:border-violet-500/40 hover:shadow-xl hover:shadow-violet-950/20' 
                        : 'bg-white border-slate-200 hover:shadow-lg hover:border-slate-300'
                    }`}
                  >
                    {/* Project Thumbs */}
                    <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden cursor-pointer" onClick={() => { setSelectedProject(project); addLog(`${t.loggerProjectSelected} ${project.title[lang]}`); }}>
                      <img
                        src={project.image}
                        alt={project.title[lang]}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                      
                      {/* Location Badge upper */}
                      <span className="absolute bottom-3 left-3 text-[10px] font-mono text-cyan-300 font-bold bg-slate-950/80 px-2.5 py-1 rounded border border-cyan-900/30 flex items-center gap-1 leading-none select-none">
                        <MapPin className="w-3 h-3 text-cyan-400" />
                        {project.location[lang]}
                      </span>
                    </div>

                    {/* Metadata specs lower */}
                    <div className="p-5 flex-grow flex flex-col justify-between">
                      <div className="mb-4">
                        <span className="text-[9px] font-mono font-bold tracking-widest text-violet-400 uppercase">
                          {project.category} · {project.year}
                        </span>
                        <h4 className="text-base font-display font-medium leading-snug mt-1 group-hover:text-cyan-450 transition">
                          {project.title[lang]}
                        </h4>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-dashed border-slate-800/60 mt-auto">
                        <span className="text-xs font-mono font-bold text-cyan-400">
                          {project.budgetEst}
                        </span>
                        
                        <button
                          onClick={() => { setSelectedProject(project); addLog(`${t.loggerProjectSelected} ${project.title[lang]}`); }}
                          className={`text-[10px] font-mono font-bold tracking-wider uppercase py-1.5 px-3 rounded-lg flex items-center gap-1 select-none transition-all cursor-pointer ${
                            theme === 'dark' 
                              ? 'bg-violet-950/35 hover:bg-violet-900/40 text-violet-300 border border-violet-800/40' 
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                          }`}
                        >
                          <span>DETAILS</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

        </div>
      </section>

      {/* 03. ABOUT STUDIO / PROFILE SECTION */}
      <section id="about" className={`py-16 md:py-24 border-y relative ${
        theme === 'dark' ? 'bg-[#0b0520]/20 border-slate-900' : 'bg-slate-50 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Legal status, Certifications checkboxes, description */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-600/10 text-xs font-mono font-semibold tracking-wider text-violet-400">
                {t.aboutBadge}
              </div>

              <h3 className="text-3xl md:text-4xl font-display font-medium leading-tight">
                {t.aboutTitle}
              </h3>

              <p className={`text-xs md:text-sm leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                {t.aboutParagraph1}
              </p>
              
              <p className={`text-xs md:text-sm leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                {t.aboutParagraph2}
              </p>

              {/* Accreditations specs points */}
              <div className="pt-4 space-y-2">
                <span className="text-[10px] font-mono font-bold text-violet-400 tracking-wider block uppercase">
                  {t.aboutCertifications}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono font-bold">
                  {[
                    'SBU Kontraktor Utama Klas Utama',
                    'ISO 9001:2015 Quality Management',
                    'ISO 45001:2018 Safety Management',
                    'Green Building Council Member (GBCI)'
                  ].map((cert, id) => (
                    <div key={id} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>{cert}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Legal regulatory class statement */}
              <div className="p-3.5 rounded-xl border border-dashed border-violet-500/20 bg-violet-950/10 font-mono text-[10px] sm:text-xs text-slate-400">
                ⭐ {t.legalStatus}
              </div>

            </div>

            {/* Right Column: Interactive Vision & Mission selector cards */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Vision Card */}
              <div className={`p-6 rounded-2xl border transition-all ${
                theme === 'dark' ? 'bg-slate-950/80 border-violet-900/30' : 'bg-white border-slate-200'
              }`}>
                <h4 className="text-lg font-display font-medium text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400 flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-violet-500" />
                  {t.visionTitle}
                </h4>
                <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                  {t.visionDesc}
                </p>
              </div>

              {/* Mission Card */}
              <div className={`p-6 rounded-2xl border transition-all ${
                theme === 'dark' ? 'bg-slate-950/80 border-violet-900/30' : 'bg-white border-slate-200'
              }`}>
                <h4 className="text-lg font-display font-medium text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400 flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  {t.missionTitle}
                </h4>
                <div className="space-y-2 text-xs font-medium leading-relaxed">
                  {[t.mission1, t.mission2, t.mission3, t.mission4].map((miss, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="font-mono text-cyan-400 font-bold shrink-0">{idx + 1}.</span>
                      <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>{miss}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 04. CORE BUSINESS SERVICES (With interactive calculator launcher inside layout) */}
      <section id="services" className="py-16 md:py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold tracking-widest text-violet-400 uppercase bg-violet-600/10 px-3 py-1 rounded-full">
              {lang === 'id' ? 'LAYANAN TERBAIK KAMI' : 'OUR EXPERTISES'}
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-medium mt-4 mb-2">
              {t.servicesTitle}
            </h2>
            <p className={`text-sm md:text-base ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              {t.servicesSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {SERVICES.map((srv, idx) => (
              <div
                key={srv.id}
                onClick={() => addLog(lang === 'id' ? `Meninjau layanan: ${srv.title.id}` : `Inspecting service: ${srv.title.en}`)}
                className={`p-6 rounded-2xl border transition-all h-full flex flex-col justify-between hover:-translate-y-1 duration-300 ${
                  theme === 'dark' 
                    ? 'bg-slate-950/80 border-slate-850 hover:border-violet-500/40 hover:shadow-cyan-950/10' 
                    : 'bg-white border-slate-200 hover:shadow-md'
                }`}
              >
                <div>
                  {/* Service Icon indicator */}
                  <div className="p-3 w-12 h-12 rounded-xl bg-violet-600/15 text-violet-400 flex items-center justify-center mb-6 border border-violet-800/30">
                    {idx === 0 ? <Building2 className="w-6 h-6" /> : idx === 1 ? <Hammer className="w-6 h-6" /> : <Sparkles className="w-6 h-6" />}
                  </div>

                  <h4 className="text-lg font-display font-medium mb-3">
                    {srv.title[lang]}
                  </h4>

                  <p className={`text-xs leading-relaxed mb-6 ${
                    theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {srv.fullDescription[lang]}
                  </p>

                  <div className="space-y-2 border-t border-dashed border-slate-800 pb-4 pt-4">
                    <span className="text-[9px] font-mono uppercase font-bold text-violet-400 tracking-wider">
                      {t.serviceKeyFeatures}
                    </span>
                    <ul className="space-y-1.5 text-[11px] font-mono font-medium">
                      {srv.features[lang].map((f, i) => (
                        <li key={i} className="flex items-start gap-1 text-slate-300">
                          <span className="text-cyan-400">⚡</span>
                          <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/60 mt-auto flex flex-col gap-1.5 text-[10px] font-mono font-semibold">
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t.serviceTimeline}:</span>
                    <span className="text-cyan-400">{srv.averageTimeline[lang]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t.serviceBudgetRange}:</span>
                    <span className="text-violet-400 font-bold">{srv.priceRange}</span>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Embedded smart budget calculator component block */}
          <div className="mt-16">
            <BudgetEstimator lang={lang} theme={theme} onLog={addLog} />
          </div>

        </div>
      </section>

      {/* 05. RIGOROUS ENGINEERING CYCLE / PROCESS */}
      <section id="process" className={`py-16 md:py-24 border-y relative ${
        theme === 'dark' ? 'bg-[#0a0520]/20 border-slate-900' : 'bg-slate-50 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold tracking-widest text-violet-400 uppercase bg-violet-600/10 px-3 py-1 rounded-full">
              {lang === 'id' ? 'SIKLUS KERJA PRESISI' : 'OUR DETAILED WORKFLOW'}
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-medium mt-4 mb-2">
              {t.processTitle}
            </h2>
            <p className={`text-slate-400 text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              {t.processSubtitle}
            </p>
          </div>

          {/* Horizontal animated milestone phases layout */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
            
            {/* Visual dashed connector line for widescreen */}
            <div className="hidden md:block absolute top-[28px] left-[50px] right-[50px] h-0.5 border-t border-dashed border-slate-800/80 z-0 pointer-events-none" />

            {PROCESS_STEPS.map((step, id) => (
              <div 
                key={id}
                onClick={() => addLog(lang === 'id' ? `Meninjau Fase Konstruksi ${step.step}` : `Reviewing Phase ${step.step}`)}
                className="relative flex flex-col items-center text-center group cursor-pointer z-10"
              >
                {/* Numeric Indicator */}
                <div className={`w-14 h-14 rounded-full border flex items-center justify-center font-mono text-lg font-bold transition-all duration-300 mb-6 ${
                  theme === 'dark'
                    ? 'bg-slate-950 border-slate-800 group-hover:border-violet-500 text-violet-400 group-hover:shadow-lg group-hover:shadow-violet-950/40'
                    : 'bg-white border-slate-200 group-hover:border-slate-400 text-slate-800 group-hover:shadow'
                }`}>
                  {step.step}
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono leading-none tracking-widest text-cyan-400 font-bold uppercase bg-cyan-950/20 py-1 px-2.5 rounded border border-cyan-800/30">
                    {step.metric}
                  </span>
                  <h4 className="text-sm font-display font-semibold pt-1">
                    {step.title[lang]}
                  </h4>
                  <p className={`text-xs leading-relaxed max-w-[210px] mx-auto ${
                    theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {step.description[lang]}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* TESTIMONIAL REELS SECTION */}
      <section className="py-16 md:py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold tracking-widest text-violet-400 uppercase bg-violet-600/10 px-3 py-1 rounded-full">
              {lang === 'id' ? 'TESTIMONI MITRA' : 'MITRA TESTIMONIAL ARCHIVES'}
            </span>
            <h3 className="text-2xl md:text-3xl font-display font-medium mt-4">
              {lang === 'id' ? 'Suara Kepuasan Pembahanan Sipil' : 'Reputable Structural Voices of Endorsement'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TESTIMONIALS.map((test) => (
              <div 
                key={test.id}
                className={`p-6 md:p-8 rounded-3xl border ${
                  theme === 'dark' ? 'bg-slate-950/80 border-violet-900/10' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="text-2xl text-violet-500 font-serif leading-none mb-3">“</div>
                <p className={`text-xs md:text-sm italic leading-relaxed mb-6 ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  {test.quote[lang]}
                </p>
                
                <div className="flex items-center gap-4 border-t border-dashed border-slate-800/70 pt-4">
                  <img
                    src={test.avatarUrl}
                    alt={test.name}
                    className="w-10 h-10 rounded-full object-cover shrink-0 border border-slate-700"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <span className="text-xs font-bold block">{test.name}</span>
                    <span className="text-[10px] font-mono text-slate-500 block">
                      {test.role[lang]} · <strong className="text-cyan-400 font-bold">{test.company}</strong>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 07. FAQ ACCORDIONS */}
      <section id="faq" className={`py-16 md:py-24 border-y relative ${
        theme === 'dark' ? 'bg-[#0b0520]/20 border-slate-900' : 'bg-slate-50 border-slate-200'
      }`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="text-center mb-12">
            <span className="text-xs font-mono font-bold tracking-widest text-violet-400 uppercase bg-violet-600/10 px-3 py-1 rounded-full">
              FAQ RESOURCE
            </span>
            <h2 className="text-3xl font-display font-medium mt-4 mb-2">
              {t.faqTitle}
            </h2>
            <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              {t.faqSubtitle}
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-4">
            {FAQ_ITEMS.map((item) => {
              const isOpen = openFaqId === item.id;
              return (
                <div 
                  key={item.id}
                  className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
                    isOpen 
                      ? theme === 'dark' ? 'bg-slate-950 border-violet-500/30' : 'bg-white border-slate-400'
                      : theme === 'dark' ? 'bg-slate-950/60 border-slate-850' : 'bg-white border-slate-200'
                  }`}
                >
                  <button
                    onClick={() => {
                      setOpenFaqId(isOpen ? null : item.id);
                      addLog(lang === 'id' ? `Membuka FAQ: ${item.id}` : `Opened FAQ item: ${item.id}`);
                    }}
                    className="w-full p-5 text-left flex justify-between items-center gap-4 hover:transition"
                  >
                    <span className="text-xs md:text-sm font-semibold tracking-tight">
                      {item.question[lang]}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-violet-400 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                      >
                        <div className={`px-5 pb-5 pt-1 text-xs leading-relaxed border-t border-dashed border-slate-800/50 ${
                          theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                        }`}>
                          {item.answer[lang]}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 06. CONTACT PANEL (Interactive lead form, WhatsApp Hotline & static gorgeous mapping) */}
      <section id="contact" className="py-16 md:py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Side: Address Details & Click-to-Chat & Static map mockup */}
            <div className="lg:col-span-5 space-y-6">
              
              <div>
                <span className="text-xs font-mono font-bold tracking-widest text-violet-400 uppercase bg-violet-600/10 px-3 py-1 rounded-full">
                  {lang === 'id' ? 'STASIUN HUBUNGAN' : 'SPECIFICATIONS INTAKE'}
                </span>
                <h2 className="text-3xl font-display font-medium mt-4 mb-2">
                  {t.contactTitle}
                </h2>
                <p className={`text-xs md:text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                  {t.contactSubtitle}
                </p>
              </div>

              {/* HQ Address card */}
              <div className={`p-5 rounded-2xl border ${
                theme === 'dark' ? 'bg-slate-950/80 border-slate-850' : 'bg-white border-slate-200'
              }`}>
                <span className="text-[10px] font-mono uppercase font-bold text-violet-400 block tracking-wider mb-2">
                  📍 {t.officeAddress}
                </span>
                <p className={`text-xs leading-relaxed font-medium ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-800'
                }`}>
                  {t.officeDetail}
                </p>
                <div className="mt-4 flex flex-col gap-2 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="text-slate-400 select-all">info@tti.my.id</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-violet-400 shrink-0" />
                    <span className="text-slate-400 select-all">+62-814-1223-5545</span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout panel */}
              <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/20">
                <span className="text-xs font-mono font-bold text-emerald-400 block uppercase mb-1">
                  🟢 {t.collabHeadline}
                </span>
                <p className="text-[11px] leading-relaxed text-slate-450 mb-4 text-slate-300">
                  {lang === 'id' 
                    ? 'Ingin tanggapan instan dalam waktu kurang dari 5 menit? Terhubung langsung dengan tim Business Development kami.'
                    : 'Need instantaneous answers? Send a secure ping directly to our tender division.'}
                </p>
                <button
                  onClick={openWhatsAppHotline}
                  className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t.collabButton}</span>
                </button>
              </div>

              {/* Stylish dark map container */}
              <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 h-44 relative">
                <div className="absolute inset-0 bg-slate-900/60 z-10 pointer-events-none" />
                <div className="absolute top-4 left-4 z-25 bg-slate-950/80 px-2.5 py-1 rounded border border-slate-800 font-mono text-[9px] text-slate-300">
                  GPS: 6.2486° S, 106.8248° E (Mampang Jakarta)
                </div>
                {/* Simulated geometric grid map */}
                <div className="w-full h-full opacity-60 flex flex-col justify-between p-4" style={{
                  backgroundImage: `radial-gradient(#1e1e38 1px, transparent 1px)`,
                  backgroundSize: '16px 16px'
                }}>
                  <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono mt-8">
                    <span>Mampang Prapatan Rd</span>
                    <span>Transjakarta L-8</span>
                  </div>
                  <div className="w-full flex justify-center">
                    <div className="w-3.5 h-3.5 rounded-full bg-cyan-400 border-2 border-slate-950 animate-ping absolute" />
                    <div className="w-3.5 h-3.5 rounded-full bg-cyan-400 border-4 border-slate-950 relative z-10" />
                  </div>
                  <div className="text-center font-mono text-[10px] text-violet-400 font-bold tracking-wider">
                    PT DSAB MAMPANG WORKSHOP
                  </div>
                </div>
              </div>

            </div>

            {/* Right Side: High-fidelity interactive form */}
            <div className="lg:col-span-7">
              <form 
                onSubmit={handleContactSubmit}
                className={`p-6 md:p-8 rounded-3xl border ${
                  theme === 'dark' ? 'bg-slate-950/80 border-violet-900/10' : 'bg-white border-slate-200'
                }`}
              >
                <div className="space-y-4">
                  {/* Name field */}
                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase tracking-wider mb-2 text-violet-400">
                      {t.contactFormName} *
                    </label>
                    <input
                      required
                      type="text"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder={lang === 'id' ? 'Nama lengkap atau perwakilan instansi...' : 'John Doe / Ministry Representative...'}
                      className={`w-full py-3 px-4 rounded-xl border text-sm focus:ring-1 focus:ring-violet-500 focus:outline-none ${
                        theme === 'dark' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
                      }`}
                    />
                  </div>

                  {/* Contact row: Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-semibold uppercase tracking-wider mb-2 text-violet-400">
                        {t.contactFormEmail} *
                      </label>
                      <input
                        required
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="co@domain.com"
                        className={`w-full py-3 px-4 rounded-xl border text-sm focus:ring-1 focus:ring-violet-500 focus:outline-none ${
                          theme === 'dark' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-semibold uppercase tracking-wider mb-2 text-violet-400">
                        {t.contactFormPhone} *
                      </label>
                      <input
                        required
                        type="text"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        placeholder="08123456789"
                        className={`w-full py-3 px-4 rounded-xl border text-sm focus:ring-1 focus:ring-violet-500 focus:outline-none ${
                          theme === 'dark' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Message body */}
                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase tracking-wider mb-2 text-violet-400">
                      {t.contactFormMsg}
                    </label>
                    <textarea
                      rows={5}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder={lang === 'id' ? 'Tuliskan rancangan ide atau detail lelang sipil secara ringkas...' : 'Briefly describe construction specifications, timeline demands, or tender parameters...'}
                      className={`w-full py-3 px-4 rounded-xl border text-sm focus:ring-1 focus:ring-violet-500 focus:outline-none ${
                        theme === 'dark' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
                      }`}
                    />
                  </div>

                </div>

                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={contactSubmitting || !contactForm.name || !contactForm.email}
                    className={`w-full py-3.5 px-6 rounded-xl font-display font-semibold text-xs md:text-sm tracking-widest uppercase flex items-center justify-center gap-2 transition-all ${
                      contactSubmitting 
                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-lg cursor-pointer'
                    }`}
                  >
                    <span>{contactSubmitting ? t.contactLoading : t.contactFormBtn}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Instant Success Banner */}
                <AnimatePresence>
                  {contactSuccessMsg && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      className="mt-4 p-4 rounded-xl border border-emerald-500/30 bg-emerald-950/20 text-emerald-400 text-xs font-medium flex items-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5 shrink-0" />
                      <span>{t.contactSuccess}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

              </form>
            </div>

          </div>
        </div>
      </section>

      {/* DYNAMIC TELEMETRY LOGGER DRAWER CONTAINER (Tasteful, optional expandable footer logs) */}
      <section className="py-8 border-t border-slate-800 bg-slate-950 text-slate-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-4">
            <span className="text-[10px] font-mono font-bold tracking-widest text-violet-400 block uppercase mb-1">
              {t.loggerTitle}
            </span>
          </div>
          <LiveTelemetryLogger logs={logs} theme={theme} lang={lang} />
        </div>
      </section>

      {/* FOOTER BLOCK PART */}
      <footer className={`py-12 text-center border-t ${
        theme === 'dark' ? 'bg-slate-950 border-slate-900 text-slate-500' : 'bg-slate-100 border-slate-200 text-slate-600'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex justify-center items-center">
            <img 
              src="/src/assets/images/dsab_logo_wide_1781500955328.jpg" 
              alt="DSAB Prime Corporate Wordmark" 
              className="h-12 w-auto rounded-lg object-contain opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>
          <div className="text-xs font-mono leading-relaxed">
            <p>
              {t.footerCredits}
            </p>
          </div>
        </div>
      </footer>

      {/* DETAIL WORK MODAL HANDLER */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal
            project={selectedProject}
            lang={lang}
            theme={theme}
            onClose={() => setSelectedProject(null)}
            onNext={handleNextProject}
            onPrev={handlePrevProject}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
