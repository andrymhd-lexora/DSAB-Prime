import React from 'react';

interface SkeletonLoaderProps {
  count?: number;
  theme: 'dark' | 'light';
}

export default function SkeletonLoader({ count = 3, theme }: SkeletonLoaderProps) {
  const arr = Array.from({ length: count });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {arr.map((_, i) => (
        <div 
          key={i} 
          className={`rounded-2xl border p-4 h-96 flex flex-col justify-between overflow-hidden animate-pulse ${
            theme === 'dark'
              ? 'bg-slate-900/60 border-slate-800'
              : 'bg-slate-100 border-slate-200'
          }`}
        >
          {/* Top content placeholder */}
          <div className="space-y-3">
            <div className={`h-48 w-full rounded-xl ${
              theme === 'dark' ? 'bg-slate-800' : 'bg-slate-200'
            }`} />
            
            <div className="space-y-2 mt-4">
              <div className={`h-3 w-1/3 rounded ${
                theme === 'dark' ? 'bg-slate-800' : 'bg-slate-200'
              }`} />
              <div className={`h-5 w-3/4 rounded ${
                theme === 'dark' ? 'bg-slate-800' : 'bg-slate-200'
              }`} />
            </div>
          </div>

          {/* Bottom content placeholder */}
          <div className="flex justify-between items-center mt-6">
            <div className={`h-4 w-1/4 rounded ${
              theme === 'dark' ? 'bg-slate-800' : 'bg-slate-200'
            }`} />
            <div className={`h-8 w-1/3 rounded-lg ${
              theme === 'dark' ? 'bg-slate-800' : 'bg-slate-200'
            }`} />
          </div>
        </div>
      ))}
    </div>
  );
}
