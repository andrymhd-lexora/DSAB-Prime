import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Shield, RefreshCw, Layers, ToggleLeft } from 'lucide-react';

interface TelemetryMsg {
  timestamp: string;
  msg: string;
  type: 'info' | 'success' | 'action' | 'system';
}

interface LiveTelemetryLoggerProps {
  logs: string[];
  theme: 'dark' | 'light';
  lang: 'id' | 'en';
}

export default function LiveTelemetryLogger({ logs, theme, lang }: LiveTelemetryLoggerProps) {
  const [internalLogs, setInternalLogs] = useState<TelemetryMsg[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Convert standard string logs into detailed structured messages
  useEffect(() => {
    if (logs.length === 0) return;
    
    const latestRaw = logs[logs.length - 1];
    
    let type: 'info' | 'success' | 'action' | 'system' = 'info';
    if (latestRaw.includes('Calculated') || latestRaw.includes('Menghitung')) {
      type = 'action';
    } else if (latestRaw.includes('Submitted') || latestRaw.includes('dikirim') || latestRaw.includes('Berhasil')) {
      type = 'success';
    } else if (latestRaw.includes('theme') || latestRaw.includes('Bahasa') || latestRaw.includes('dialihkan')) {
      type = 'system';
    }

    const newLog: TelemetryMsg = {
      timestamp: new Date().toLocaleTimeString('id-ID', { hour12: false }),
      msg: latestRaw,
      type
    };

    setInternalLogs(prev => [...prev.slice(-30), newLog]); // Keep last 30 logs
  }, [logs]);

  // Initial seeding
  useEffect(() => {
    const seedMsgs = lang === 'id' 
      ? [
          'Sistem Kontrol PT DSAB (DSAB Prime) diaktifkan.',
          'Peralatan telemetri K3 & Mutu ISO 9001 tersinkronisasi.',
          'Menghubungkan visualisasi proyek nasional...'
        ]
      : [
          'PT DSAB Telemetry Unit (DSAB Prime active).',
          'ISO 9001 & ISO 45001 safety metrics synchronized.',
          'Connecting national engineering databases...'
        ];

    const mapped = seedMsgs.map((m, i) => ({
      timestamp: new Date(Date.now() - (3 - i) * 1000 * 60).toLocaleTimeString('id-ID', { hour12: false }),
      msg: m,
      type: 'system' as const
    }));

    setInternalLogs(mapped);
  }, [lang]);

  // Handle autoscroll
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [internalLogs]);

  const clearLogs = () => {
    setInternalLogs([{
      timestamp: new Date().toLocaleTimeString('id-ID', { hour12: false }),
      msg: lang === 'id' ? 'Terminal dibersihkan.' : 'Console buffer cleared.',
      type: 'system'
    }]);
  };

  return (
    <div className={`rounded-2xl border font-mono text-xs shadow-xl overflow-hidden transition-all ${
      theme === 'dark'
        ? 'bg-slate-950 border-slate-800 text-slate-300'
        : 'bg-slate-900 border-slate-700 text-slate-200'
    }`}>
      {/* Console Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800/80 bg-slate-900/90">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[10px] font-bold tracking-widest text-cyan-400 uppercase flex items-center gap-1">
            <Terminal className="w-3.5 h-3.5" />
            CONSOLE TELEMETRY FEED
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[9px] text-slate-500 uppercase font-bold">MUTU K3 STANDARD</span>
          <button 
            onClick={clearLogs}
            className="text-[9px] px-2 py-0.5 rounded border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            CLEAR
          </button>
        </div>
      </div>

      {/* Terminal View */}
      <div 
        ref={containerRef}
        className="p-4 h-40 overflow-y-auto space-y-1.5 scrollbar-thin scrollbar-thumb-violet-500/30 scrollbar-track-transparent select-text"
      >
        {internalLogs.map((log, idx) => (
          <div key={idx} className="flex items-start gap-2 leading-relaxed">
            <span className="text-slate-500 tracking-tighter shrink-0 select-none">
              [{log.timestamp}]
            </span>
            <span className={`shrink-0 font-bold select-none ${
              log.type === 'success' ? 'text-emerald-400' :
              log.type === 'action' ? 'text-cyan-400' :
              log.type === 'system' ? 'text-violet-400' :
              'text-slate-400'
            }`}>
              {log.type === 'success' ? '✓' :
               log.type === 'action' ? '⚡' :
               log.type === 'system' ? '⚙' :
               '»'}
            </span>
            <span className="break-all">{log.msg}</span>
          </div>
        ))}
      </div>

      {/* Status Bar */}
      <div className="px-4 py-1.5 border-t border-slate-800/60 bg-slate-950/80 text-[10px] text-slate-500 flex justify-between">
        <span className="flex items-center gap-1">
          <Shield className="w-3 h-3 text-emerald-500" />
          LPJK REGISTERED CLASS-A
        </span>
        <span className="flex items-center gap-1 text-slate-400 font-bold tracking-wider">
          <RefreshCw className="w-3 h-3 text-cyan-400 animate-spin" />
          LIVE DIAGNOSTICS ACTIVE
        </span>
      </div>
    </div>
  );
}
