'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Download, Smartphone, CheckCircle2, X, Sparkles, 
  WifiOff, ShieldCheck, HelpCircle, Info
} from 'lucide-react';
import { usePWAInstall } from '@/hooks/usePWAInstall';
import { translations } from '@/lib/i18n';

interface PWAInstallBannerProps {
  onOpenGuide: () => void;
  language: 'en' | 'id';
}

export default function PWAInstallBanner({ onOpenGuide, language }: PWAInstallBannerProps) {
  const { isInstalled, canPrompt, promptInstall } = usePWAInstall();
  const t = translations[language];

  const [isDismissed, setIsDismissed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [justInstalled, setJustInstalled] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const dismissed = localStorage.getItem('anesthesia_pwa_banner_dismissed');
      if (dismissed === 'true') {
        setIsDismissed(true);
      }
    } catch (e) {}
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    try {
      localStorage.setItem('anesthesia_pwa_banner_dismissed', 'true');
    } catch (e) {}
  };

  const handleInstallClick = async () => {
    if (canPrompt) {
      const result = await promptInstall();
      if (result === 'accepted') {
        setJustInstalled(true);
        return;
      }
    }
    // If prompt is not directly available, open the guide modal with instructions
    onOpenGuide();
  };

  if (!isMounted) return null;

  // If already installed and running in standalone mode
  if (isInstalled || justInstalled) {
    return (
      <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-50 via-teal-50/60 to-slate-50 dark:from-emerald-950/25 dark:via-teal-950/20 dark:to-[#0b1220] border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[13px] font-[800] text-emerald-950 dark:text-emerald-200">
                {language === 'en' ? 'PWA Standalone Mode Active' : 'Mode Mandiri PWA Aktif'}
              </span>
              <span className="px-2 py-0.2 rounded-full text-[9px] font-[800] bg-emerald-200/80 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300 font-mono">
                OFFLINE READY
              </span>
            </div>
            <p className="text-[11.5px] text-emerald-800/80 dark:text-emerald-300/70">
              {language === 'en'
                ? 'Anesthesia is running natively with zero-latency offline database & fullscreen bedside interface.'
                : 'Anesthesia berjalan mandiri dengan basis data luring tanpa latensi & tampilan layar penuh bedside.'}
            </p>
          </div>
        </div>

        <button
          onClick={onOpenGuide}
          className="px-3 py-1.5 rounded-lg border border-emerald-300/80 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100/60 dark:hover:bg-emerald-500/10 text-[11px] font-[700] transition-all shrink-0 cursor-pointer flex items-center gap-1.5"
        >
          <Info className="w-3.5 h-3.5" />
          <span>{language === 'en' ? 'PWA Info' : 'Info PWA'}</span>
        </button>
      </div>
    );
  }

  // If dismissed by user
  if (isDismissed) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
        transition={{ duration: 0.3 }}
        className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-50/95 via-sky-50/70 to-indigo-50/80 dark:from-[#0d1d3d] dark:via-[#0e172e] dark:to-[#0b1324] border border-blue-200/90 dark:border-blue-500/30 shadow-sm relative overflow-hidden group"
      >
        {/* Subtle decorative glow */}
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-blue-400/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          {/* Left: Info & Badges */}
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform mt-0.5">
              <Download className="w-5 h-5" />
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-[800] bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30 uppercase tracking-wider">
                  Progressive Web App
                </span>
                <span className="text-[11px] font-[700] text-blue-700 dark:text-blue-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  {language === 'en' ? 'Fast 1-Tap Bedside Access' : 'Akses Cepat 1-Ketuk Bedside'}
                </span>
              </div>

              <h3 className="text-[15px] sm:text-[16px] font-[800] text-slate-900 dark:text-white tracking-tight">
                {t.pwa_banner_title}
              </h3>

              <p className="text-[12px] text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                {t.pwa_banner_desc}
              </p>

              {/* Feature Pill Tags */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10.5px] font-[600] bg-white/80 dark:bg-black/30 border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-300">
                  <WifiOff className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  {language === 'en' ? '100% Offline Database' : '100% Basis Data Luring'}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10.5px] font-[600] bg-white/80 dark:bg-black/30 border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-300">
                  <Smartphone className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                  {language === 'en' ? 'No Browser Address Bar' : 'Layar Penuh Tanpa Tab'}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10.5px] font-[600] bg-white/80 dark:bg-black/30 border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-300">
                  <ShieldCheck className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                  {language === 'en' ? 'Zero Patient Cloud Leaks' : 'Privasi 100% On-Device'}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2.5 shrink-0 self-end lg:self-center pl-14 sm:pl-0">
            {/* ALWAYS "Install App Now" button */}
            <button
              onClick={handleInstallClick}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-[700] text-[12.5px] flex items-center gap-2 shadow-sm shadow-blue-500/20 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{language === 'en' ? 'Install App Now' : 'Instal Aplikasi Sekarang'}</span>
            </button>

            <button
              onClick={onOpenGuide}
              className="px-3.5 py-2.5 rounded-xl bg-white/90 hover:bg-white dark:bg-white/[0.06] dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 font-[600] text-[12px] transition-all cursor-pointer flex items-center gap-1.5"
            >
              <HelpCircle className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              <span>{language === 'en' ? 'Instructions' : 'Panduan'}</span>
            </button>

            {/* Dismiss X */}
            <button
              onClick={handleDismiss}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-white/80 dark:hover:bg-white/10 transition-all cursor-pointer"
              title={t.pwa_dismiss}
              aria-label={t.pwa_dismiss}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
