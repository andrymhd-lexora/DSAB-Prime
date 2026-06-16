import React from 'react';
import { Project, Language, Theme } from '../types';
import { TRANSLATIONS } from '../data';
import { X, MapPin, Calendar, Coins, Settings, CheckCircle2, ChevronLeft, ChevronRight, FileCode2 } from 'lucide-react';
import { motion } from 'motion/react';

interface ProjectDetailModalProps {
  project: Project;
  lang: Language;
  theme: Theme;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function ProjectDetailModal({
  project,
  lang,
  theme,
  onClose,
  onNext,
  onPrev
}: ProjectDetailModalProps) {
  const t = TRANSLATIONS[lang];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark Overlay with blur */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md cursor-pointer" 
      />

      {/* Main Modal Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.93, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.93, y: 15 }}
        transition={{ duration: 0.25 }}
        className={`relative w-full max-w-4xl h-[90vh] md:h-auto md:max-h-[85vh] overflow-y-auto rounded-3xl border shadow-2xl flex flex-col md:flex-row ${
          theme === 'dark'
            ? 'bg-slate-950 border-violet-500/20 text-white'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        
        {/* Left Side: Images Render column */}
        <div className="relative w-full md:w-1/2 h-64 md:h-auto min-h-[250px] md:min-h-[480px] bg-slate-900 overflow-hidden shrink-0">
          <img
            src={project.image}
            alt={project.title[lang]}
            className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />
          
          {/* Status Overlay Badge */}
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1.5 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase shadow-md flex items-center gap-1.5 ${
              project.completed 
                ? 'bg-emerald-950/80 border border-emerald-500 text-emerald-400' 
                : 'bg-violet-950/80 border border-violet-500 text-violet-400'
            }`}>
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              {project.completed ? t.statusCompleted : t.statusActive}
            </span>
          </div>

          {/* Project Title overlay on image for mobile layout */}
          <div className="absolute bottom-4 left-4 right-4 md:hidden">
            <h4 className="text-xl font-display font-medium text-white drop-shadow-md">
              {project.title[lang]}
            </h4>
            <span className="text-xs text-cyan-300 font-mono flex items-center gap-1 mt-1">
              <MapPin className="w-3 h-3 text-cyan-400" />
              {project.location[lang]}
            </span>
          </div>
        </div>

        {/* Right Side: Informative specs sheet */}
        <div className="p-6 md:p-8 flex flex-col justify-between flex-grow overflow-y-auto">
          <div>
            {/* Modal Controls Header */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest bg-violet-500/15 text-violet-400 px-3 py-1 rounded-full">
                {project.category.toUpperCase()} SPEC_ID: {project.id.toUpperCase()}
              </span>
              <button 
                onClick={onClose}
                className={`p-2 rounded-full border transition-all ${
                  theme === 'dark' 
                    ? 'border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900' 
                    : 'border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-150'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Desktop-only Title Header */}
            <div className="hidden md:block mb-4">
              <h4 className="text-2xl font-display font-medium mb-1">
                {project.title[lang]}
              </h4>
              <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  {project.location[lang]}
                </span>
                <span className="text-slate-600">|</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-violet-400" />
                  {t.specLabelYear}: {project.year}
                </span>
              </div>
            </div>

            {/* Project description copy */}
            <p className={`text-xs md:text-sm leading-relaxed mb-6 ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}>
              {project.description[lang]}
            </p>

            {/* Metadata spec pills */}
            <div className="space-y-4">
              <h5 className="text-[11px] font-mono font-bold tracking-widest uppercase text-cyan-400 flex items-center gap-1">
                <FileCode2 className="w-3.5 h-3.5" />
                {t.specLabelSpecs}
              </h5>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Contract value card */}
                <div className={`p-3 rounded-xl border flex items-center gap-3 ${
                  theme === 'dark' ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-100'
                }`}>
                  <Coins className="w-8 h-8 text-cyan-400 shrink-0 bg-cyan-950/20 p-1.5 rounded-lg border border-cyan-800/30" />
                  <div>
                    <span className="text-[9px] font-mono text-slate-500 uppercase block leading-none mb-1">
                      {t.specLabelBudget}
                    </span>
                    <span className="text-xs md:text-sm font-bold block font-mono text-cyan-400">
                      {project.budgetEst}
                    </span>
                  </div>
                </div>

                {/* Subspecs map */}
                {project.specs.map((item, id) => (
                  <div key={id} className={`p-3 rounded-xl border flex items-center gap-3 ${
                    theme === 'dark' ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-100'
                  }`}>
                    <Settings className="w-8 h-8 text-violet-400 shrink-0 bg-violet-950/20 p-1.5 rounded-lg border border-violet-800/30" />
                    <div>
                      <span className="text-[9px] font-mono text-slate-500 uppercase block leading-none mb-1">
                        {item.label[lang]}
                      </span>
                      <span className={`text-[11px] font-semibold block ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                        {item.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Bottom Footer Navigation */}
          <div className="mt-8 pt-4 border-t border-dashed border-slate-800 flex justify-between items-center">
            
            {/* Prev/Next arrows */}
            <div className="flex gap-2">
              <button 
                onClick={onPrev}
                className={`py-2 px-3 text-xs font-semibold rounded-lg border flex items-center gap-1 text-[11px] transition-all hover:bg-slate-800 disabled:opacity-40 select-none cursor-pointer`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{lang === 'id' ? 'Sebelumnya' : 'Prev'}</span>
              </button>
              <button 
                onClick={onNext}
                className={`py-2 px-3 text-xs font-semibold rounded-lg border flex items-center gap-1 text-[11px] transition-all hover:bg-slate-800 disabled:opacity-40 select-none cursor-pointer`}
              >
                <span>{lang === 'id' ? 'Berikutnya' : 'Next'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Consult redirect button */}
            <a
              href="#contact"
              onClick={onClose}
              className="py-2 px-4 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-mono text-[11px] font-bold uppercase tracking-wider transition-all"
            >
              {lang === 'id' ? 'Minta Proposal' : 'Request Bid'}
            </a>

          </div>

        </div>

      </motion.div>
    </div>
  );
}
