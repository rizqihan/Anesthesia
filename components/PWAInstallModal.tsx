'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Smartphone, Monitor, Apple, CheckCircle2, 
  Download, Share2, PlusSquare, Sparkles, ShieldCheck, 
  WifiOff, ArrowRight, ExternalLink, Info, AlertCircle 
} from 'lucide-react';
import { usePWAInstall } from '@/hooks/usePWAInstall';
import { translations } from '@/lib/i18n';
import { APP_VERSION } from '@/lib/version';

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'en' | 'id';
}

type PlatformTab = 'ios' | 'android' | 'desktop';

export default function PWAInstallModal({ isOpen, onClose, language }: PWAInstallModalProps) {
  const { isInstalled, canPrompt, isIOS, isAndroid, isDesktop, promptInstall } = usePWAInstall();
  const t = translations[language];

  // Default active tab based on detected platform
  const [activeTab, setActiveTab] = useState<PlatformTab>('android');
  const [installSuccess, setInstallSuccess] = useState(false);
  const [showManualGuide, setShowManualGuide] = useState(false);

  useEffect(() => {
    if (isIOS) {
      setActiveTab('ios');
    } else if (isAndroid) {
      setActiveTab('android');
    } else {
      setActiveTab('desktop');
    }
  }, [isIOS, isAndroid, isDesktop]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleInstallClickInModal = async () => {
    if (canPrompt) {
      const res = await promptInstall();
      if (res === 'accepted') {
        setInstallSuccess(true);
        setTimeout(() => {
          onClose();
          setInstallSuccess(false);
        }, 1500);
        return;
      }
    }
    // If native prompt cannot be triggered directly by code, show clear guidance
    setShowManualGuide(true);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-white dark:bg-[#0b1220] border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden z-10"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-white/[0.08] flex items-center justify-between bg-gradient-to-r from-blue-50/80 via-indigo-50/50 to-transparent dark:from-blue-950/40 dark:via-indigo-950/20 dark:to-transparent">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                <Download className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-[16px] sm:text-[18px] font-[800] text-slate-900 dark:text-white">
                    {t.pwa_modal_title}
                  </h2>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200 dark:bg-blue-500/10 dark:text-blue-300 dark:border-blue-500/20 font-bold uppercase">
                    PWA Suite
                  </span>
                </div>
                <p className="text-[11.5px] text-slate-600 dark:text-slate-400 font-medium mt-0.5">
                  {t.pwa_modal_subtitle}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-all cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Platform Tabs */}
          <div className="flex items-center gap-2 px-4 sm:px-5 pt-3 pb-2 border-b border-slate-200 dark:border-white/[0.06] bg-slate-50/50 dark:bg-white/[0.02]">
            <button
              onClick={() => { setActiveTab('ios'); setShowManualGuide(false); }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-[12px] font-[700] transition-all cursor-pointer ${
                activeTab === 'ios'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5'
              }`}
            >
              <Apple className="w-3.5 h-3.5" />
              <span>iOS / Safari</span>
              {isIOS && (
                <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse ml-0.5" />
              )}
            </button>

            <button
              onClick={() => { setActiveTab('android'); setShowManualGuide(false); }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-[12px] font-[700] transition-all cursor-pointer ${
                activeTab === 'android'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Android</span>
              {isAndroid && (
                <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse ml-0.5" />
              )}
            </button>

            <button
              onClick={() => { setActiveTab('desktop'); setShowManualGuide(false); }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-[12px] font-[700] transition-all cursor-pointer ${
                activeTab === 'desktop'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Desktop (PC/Mac)</span>
              {isDesktop && (
                <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse ml-0.5" />
              )}
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
            {/* Primary Action Box: ALWAYS VISIBLE WITH "INSTALL APP NOW" BUTTON */}
            {!isInstalled && (
              <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/30 border border-blue-200 dark:border-blue-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-blue-500/20">
                    <Download className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[14px] font-[800] text-slate-900 dark:text-white">
                      {language === 'en' ? 'Install Anesthesia Suite' : 'Instal Aplikasi Anesthesia'}
                    </h4>
                    <p className="text-[12px] text-slate-600 dark:text-slate-300">
                      {canPrompt
                        ? (language === 'en'
                            ? 'Ready for 1-click install dialog on this browser.'
                            : 'Siap untuk dialog instalasi 1-klik di peramban ini.')
                        : activeTab === 'ios'
                        ? (language === 'en'
                            ? 'On iOS Safari, use the Share button below.'
                            : 'Di Safari iOS, gunakan tombol Bagikan di bawah.')
                        : (language === 'en'
                            ? 'Tap below to launch install or use browser menu.'
                            : 'Ketuk di bawah untuk menginstal atau gunakan menu peramban.')}
                    </p>
                  </div>
                </div>

                {/* THE "INSTALL APP NOW" BUTTON */}
                <button
                  onClick={handleInstallClickInModal}
                  disabled={installSuccess}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-[700] text-[13px] flex items-center justify-center gap-2 shadow-md shadow-blue-500/25 transition-all shrink-0 cursor-pointer"
                >
                  {installSuccess ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                      <span>{language === 'en' ? 'Installed!' : 'Terinstal!'}</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>{language === 'en' ? 'Install App Now' : 'Instal Aplikasi Sekarang'}</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Manual Menu Hint (Shows when user clicks install but browser requires menu action) */}
            {showManualGuide && !canPrompt && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-500/30 text-amber-900 dark:text-amber-200 text-[12px] flex items-start gap-2.5"
              >
                <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-[700] mb-0.5">
                    {activeTab === 'ios'
                      ? (language === 'en' ? 'iOS Safari Add to Home Screen:' : 'Tambah ke Layar Utama iOS Safari:')
                      : (language === 'en' ? 'Browser Menu Install:' : 'Instal Melalui Menu Browser:')}
                  </div>
                  <div>
                    {activeTab === 'ios'
                      ? (language === 'en'
                          ? 'Tap the Share icon at the bottom of Safari, then choose "Add to Home Screen".'
                          : 'Ketuk ikon Bagikan di bar menu bawah Safari, lalu pilih "Tambah ke Layar Utama".')
                      : (language === 'en'
                          ? 'Tap the three dots (⋮) in the top-right corner of your browser and select "Install app" or "Add to Home screen".'
                          : 'Ketuk ikon tiga titik (⋮) di pojok kanan atas peramban Anda dan pilih "Instal aplikasi" atau "Tambahkan ke Layar Utama".')}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Standalone Active Badge */}
            {isInstalled && (
              <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-500/30 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <div className="text-[12px] text-emerald-900 dark:text-emerald-200 font-medium">
                  {t.pwa_installed_badge}. {language === 'en' ? 'You are currently running Anesthesia in standalone application mode.' : 'Anda saat ini menjalankan Anesthesia dalam mode aplikasi mandiri.'}
                </div>
              </div>
            )}

            {/* Platform Instructions */}
            <div className="space-y-3 pt-1">
              <h3 className="text-[13px] font-[800] text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <span>{language === 'en' ? 'Step-by-Step Instructions' : 'Langkah-Langkah Instalasi'}</span>
                <span className="text-[11px] font-normal text-slate-500 dark:text-slate-400">
                  ({activeTab === 'ios' ? 'Safari on iOS' : activeTab === 'android' ? 'Chrome / Edge on Android' : 'Chrome, Edge or Brave on Desktop'})
                </span>
              </h3>

              {activeTab === 'ios' && (
                <div className="space-y-2.5">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.06]">
                    <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center text-[12px] font-[800] shrink-0 mt-0.5">
                      1
                    </div>
                    <div className="text-[12.5px] text-slate-700 dark:text-slate-300">
                      {language === 'en' ? (
                        <>Open this app in <strong>Apple Safari</strong> browser on your iPhone or iPad.</>
                      ) : (
                        <>Buka aplikasi ini menggunakan peramban <strong>Apple Safari</strong> di iPhone atau iPad Anda.</>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.06]">
                    <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center text-[12px] font-[800] shrink-0 mt-0.5">
                      2
                    </div>
                    <div className="text-[12.5px] text-slate-700 dark:text-slate-300">
                      {language === 'en' ? (
                        <>Tap the <strong className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400"><Share2 className="w-3.5 h-3.5 inline" /> Share</strong> button in Safari&apos;s bottom toolbar.</>
                      ) : (
                        <>Ketuk tombol <strong className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400"><Share2 className="w-3.5 h-3.5 inline" /> Bagikan (Share)</strong> di baris menu bawah Safari.</>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.06]">
                    <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center text-[12px] font-[800] shrink-0 mt-0.5">
                      3
                    </div>
                    <div className="text-[12.5px] text-slate-700 dark:text-slate-300">
                      {language === 'en' ? (
                        <>Scroll down the share sheet and tap <strong className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400"><PlusSquare className="w-3.5 h-3.5 inline" /> Add to Home Screen</strong>.</>
                      ) : (
                        <>Gulir ke bawah pada menu bagikan dan ketuk <strong className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400"><PlusSquare className="w-3.5 h-3.5 inline" /> Tambah ke Layar Utama</strong>.</>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.06]">
                    <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center text-[12px] font-[800] shrink-0 mt-0.5">
                      4
                    </div>
                    <div className="text-[12.5px] text-slate-700 dark:text-slate-300">
                      {language === 'en' ? (
                        <>Tap <strong>Add</strong> in the top-right corner. The Anesthesia app icon will appear directly on your home screen and open in standalone mode.</>
                      ) : (
                        <>Ketuk <strong>Tambah (Add)</strong> di pojok kanan atas. Ikon Anesthesia akan langsung muncul di layar utama Anda dan terbuka dalam mode mandiri.</>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'android' && (
                <div className="space-y-2.5">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.06]">
                    <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center text-[12px] font-[800] shrink-0 mt-0.5">
                      1
                    </div>
                    <div className="text-[12.5px] text-slate-700 dark:text-slate-300">
                      {language === 'en' ? (
                        <>Tap the <strong className="text-blue-600 dark:text-blue-400">&quot;Install App Now&quot;</strong> button above. If your browser requires manual confirmation, tap the browser menu (<strong>⋮</strong> three dots in top-right corner).</>
                      ) : (
                        <>Ketuk tombol <strong className="text-blue-600 dark:text-blue-400">&quot;Instal Aplikasi Sekarang&quot;</strong> di atas. Jika peramban membutuhkan konfirmasi manual, buka menu peramban (<strong>⋮</strong> ikon tiga titik di pojok kanan atas).</>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.06]">
                    <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center text-[12px] font-[800] shrink-0 mt-0.5">
                      2
                    </div>
                    <div className="text-[12.5px] text-slate-700 dark:text-slate-300">
                      {language === 'en' ? (
                        <>Select <strong>&quot;Install app&quot;</strong> or <strong>&quot;Add to Home screen&quot;</strong>.</>
                      ) : (
                        <>Pilih opsi <strong>&quot;Instal aplikasi&quot;</strong> atau <strong>&quot;Tambahkan ke Layar Utama&quot;</strong>.</>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.06]">
                    <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center text-[12px] font-[800] shrink-0 mt-0.5">
                      3
                    </div>
                    <div className="text-[12.5px] text-slate-700 dark:text-slate-300">
                      {language === 'en' ? (
                        <>Confirm by tapping <strong>Install</strong>. Anesthesia will install into your App Drawer and Home Screen.</>
                      ) : (
                        <>Konfirmasi dengan mengetuk <strong>Instal</strong>. Anesthesia akan terpasang di daftar aplikasi dan layar utama Anda.</>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'desktop' && (
                <div className="space-y-2.5">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.06]">
                    <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center text-[12px] font-[800] shrink-0 mt-0.5">
                      1
                    </div>
                    <div className="text-[12.5px] text-slate-700 dark:text-slate-300">
                      {language === 'en' ? (
                        <>Click the <strong className="text-blue-600 dark:text-blue-400">&quot;Install App Now&quot;</strong> button above, or look at the right side of your address bar for the <strong className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400"><Download className="w-3.5 h-3.5 inline" /> Install</strong> icon.</>
                      ) : (
                        <>Klik tombol <strong className="text-blue-600 dark:text-blue-400">&quot;Instal Aplikasi Sekarang&quot;</strong> di atas, atau lihat sisi kanan kolom alamat URL untuk ikon <strong className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400"><Download className="w-3.5 h-3.5 inline" /> Instal</strong>.</>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.06]">
                    <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center text-[12px] font-[800] shrink-0 mt-0.5">
                      2
                    </div>
                    <div className="text-[12.5px] text-slate-700 dark:text-slate-300">
                      {language === 'en' ? (
                        <>Click the icon and select <strong>&quot;Install Anesthesia&quot;</strong>.</>
                      ) : (
                        <>Klik ikon tersebut dan pilih <strong>&quot;Instal Anesthesia&quot;</strong>.</>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.06]">
                    <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center text-[12px] font-[800] shrink-0 mt-0.5">
                      3
                    </div>
                    <div className="text-[12.5px] text-slate-700 dark:text-slate-300">
                      {language === 'en' ? (
                        <>Alternatively, open browser menu (<strong>⋮</strong>) &rarr; <strong>&quot;Save and share&quot;</strong> / <strong>&quot;Apps&quot;</strong> &rarr; <strong>&quot;Install Anesthesia&quot;</strong>.</>
                      ) : (
                        <>Atau, buka menu browser (<strong>⋮</strong>) &rarr; <strong>&quot;Simpan dan bagikan&quot;</strong> / <strong>&quot;Aplikasi&quot;</strong> &rarr; <strong>&quot;Instal Anesthesia&quot;</strong>.</>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Why PWA / Benefits Section */}
            <div className="pt-2 border-t border-slate-200 dark:border-white/[0.06]">
              <div className="text-[11px] font-[800] uppercase tracking-wider text-slate-400 mb-3">
                {language === 'en' ? 'Why Install Anesthesia as a PWA?' : 'Keunggulan Instalasi Anesthesia PWA'}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.06]">
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-[700] text-[12px] mb-1">
                    <WifiOff className="w-3.5 h-3.5" />
                    <span>{t.pwa_feature_offline}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                    {t.pwa_feature_offline_desc}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.06]">
                  <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-[700] text-[12px] mb-1">
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>{t.pwa_feature_fullscreen}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                    {t.pwa_feature_fullscreen_desc}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.06]">
                  <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-[700] text-[12px] mb-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{t.pwa_feature_privacy}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                    {t.pwa_feature_privacy_desc}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-[#080d17] flex items-center justify-between">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
              Offline Cache Engine v{APP_VERSION}
            </span>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-white/10 dark:hover:bg-white/15 text-slate-800 dark:text-white font-[600] text-[12px] transition-all cursor-pointer"
            >
              {language === 'en' ? 'Close' : 'Tutup'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
