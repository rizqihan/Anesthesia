'use client';

import React from 'react';
import Link from 'next/link';
import { useAppStore } from '@/store/appStore';
import { Activity, ArrowRight, ShieldCheck, Github, Globe } from 'lucide-react';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  const { language, setLanguage } = useAppStore();

  return (
    <div className="min-h-screen flex flex-col bg-[#070b14] text-[#f8fafc]">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 w-full bg-[#080d19]/80 backdrop-blur-lg border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600/30 border border-blue-500/40 flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.25)]">
              <Activity className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <span className="font-[900] text-[17px] tracking-tight text-white block leading-none">Anesthesia</span>
              <span className="text-[10px] text-slate-400 font-[500] block mt-1">Point-of-Care Medical Suite</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-[13px] font-[600] text-slate-300">
            <a href="#features" className="hover:text-white transition-colors">
              {language === 'en' ? 'Features' : 'Fitur'}
            </a>
            <a href="#demo" className="hover:text-white transition-colors">
              {language === 'en' ? 'Interactive Demo' : 'Demo Interaktif'}
            </a>
            <a href="#offline" className="hover:text-white transition-colors">
              {language === 'en' ? 'Offline Engine' : 'Sistem Offline'}
            </a>
            <Link href="/emergency" className="text-rose-400 hover:text-rose-300 flex items-center gap-1 transition-colors">
              <span>{language === 'en' ? 'Crisis Card' : 'Kartu Krisis'}</span>
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <div className="flex rounded-lg p-[2px] bg-white/[0.04] border border-white/10">
              {(['en', 'id'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-[700] transition-all ${
                    language === lang
                      ? 'bg-blue-600/30 text-blue-300 border border-blue-500/40 shadow-sm'
                      : 'text-slate-400 border border-transparent hover:text-slate-200'
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Launch CTA */}
            <Link href="/dashboard">
              <button className="btn-primary text-[13px] font-[700] px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg shadow-blue-500/10">
                <span>{language === 'en' ? 'Launch Suite' : 'Buka Dasbor'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Page Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] bg-[#050810] py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center text-blue-400">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[14px] font-[800] text-slate-200">Anesthesia Clinical Assistant</div>
              <div className="text-[11px] text-slate-500">
                Licensed under GNU General Public License v3.0 • Built for Healthcare Professionals
              </div>
            </div>
          </div>

          <div className="text-[12px] text-slate-500 text-center md:text-right max-w-md leading-relaxed">
            Medical disclaimer: For clinical reference & educational decision support only. Does not replace professional clinical judgment.
          </div>
        </div>
      </footer>
    </div>
  );
}
