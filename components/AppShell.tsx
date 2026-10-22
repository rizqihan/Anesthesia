'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAppStore } from '@/store/appStore';
import { translations } from '@/lib/i18n';
import { 
  LayoutDashboard, Settings, ChevronLeft, WifiOff, Activity, Database, 
  RefreshCw, X, BookOpen, AlertOctagon, Calculator, Syringe, Pill, 
  Stethoscope, Book, Search, User, Globe, ShieldAlert, Printer, Radio, FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ActiveCaseModal from '@/components/ActiveCaseModal';
import CommandPalette from '@/components/CommandPalette';
import SOAPNoteModal from '@/components/SOAPNoteModal';
import { exportBedsideRoundsPDF } from '@/lib/pdfGenerator';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const store = useAppStore();
  const { language, setLanguage, isOffline, setOfflineStatus, activeCase } = store;
  const t = translations[language];
  const pathname = usePathname();
  const router = useRouter();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isInitialSyncing, setIsInitialSyncing] = useState(false);
  const [hasIgnoredSync, setHasIgnoredSync] = useState(false);
  const [isCaseModalOpen, setIsCaseModalOpen] = useState(false);
  const [isCmdPaletteOpen, setIsCmdPaletteOpen] = useState(false);
  const [isSoapModalOpen, setIsSoapModalOpen] = useState(false);

  const isNotSynced = !store.lastSyncDate && 
    !store.syncMeta?.icd10?.lastSynced && 
    !store.syncMeta?.drugs?.lastSynced && 
    !store.syncMeta?.guidelines?.lastSynced &&
    !store.syncMeta?.physicalExams?.lastSynced &&
    !store.syncMeta?.ecgDiagnoses?.lastSynced;

  const handleInitialSync = async () => {
    setIsInitialSyncing(true);
    try {
      const db = (await import('@/lib/db')).default;
      const { ICD10_DB, loadFullICD10 } = await import('@/lib/icd10');
      const { DRUG_DB } = await import('@/lib/drugs');
      const { GUIDELINES_DB } = await import('@/lib/guidelines');
      const { PHYSICAL_EXAMS_DB } = await import('@/lib/physicalExamsData');
      const { ECG_DIAGNOSES_DB } = await import('@/lib/ecgData');
      
      await db.icd10.bulkPut(ICD10_DB as any);
      await db.drugs.bulkPut(DRUG_DB as any);
      await db.guidelines.bulkPut(GUIDELINES_DB as any);
      await db.physicalExams.bulkPut(PHYSICAL_EXAMS_DB as any);
      await db.ecgDiagnoses.bulkPut(ECG_DIAGNOSES_DB as any);
      
      const now = new Date().toISOString();
      store.updateSyncMeta('icd10', { lastSynced: now, count: ICD10_DB.length, fullLoaded: false });
      store.updateSyncMeta('drugs', { lastSynced: now, count: DRUG_DB.length });
      store.updateSyncMeta('guidelines', { lastSynced: now, count: GUIDELINES_DB.length });
      store.updateSyncMeta('physicalExams', { lastSynced: now, count: PHYSICAL_EXAMS_DB.length });
      store.updateSyncMeta('ecgDiagnoses', { lastSynced: now, count: ECG_DIAGNOSES_DB.length });

      try {
        const fullCount = await loadFullICD10();
        store.updateSyncMeta('icd10', {
          lastSynced: new Date().toISOString(),
          count: fullCount,
          fullLoaded: true
        });
      } catch (icdErr) {
        console.error('Failed to load full ICD-10 during sync:', icdErr);
      }
    } catch (e) {
      console.error('Initial sync error:', e);
    } finally {
      setIsInitialSyncing(false);
    }
  };

  const isAiConfigured = () => {
    if (store.aiProvider === 'custom_gemini' && !store.customGeminiKey.trim()) return false;
    if (store.aiProvider === 'openai_compatible' && (!store.openaiEndpoint.trim() || !store.openaiKey.trim())) return false;
    return true;
  };

  const getProviderName = () => {
    switch (store.aiProvider) {
      case 'default_groq': return 'Groq';
      case 'custom_gemini': return 'Gemini';
      case 'openai_compatible': return 'OpenAI Compat';
      default: return 'AI';
    }
  };

  const aiStatus = isOffline ? 'offline' : isAiConfigured() ? 'ready' : 'missing';

  useEffect(() => {
    const handleOnline = () => setOfflineStatus(false);
    const handleOffline = () => setOfflineStatus(true);
    setOfflineStatus(!navigator.onLine);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [setOfflineStatus]);

  // Global keyboard shortcut: Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCmdPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navItems = [
    { name: language === 'en' ? 'Dashboard' : 'Dasbor', href: '/dashboard', icon: LayoutDashboard },
    { name: language === 'en' ? 'OR Crisis Card' : 'Kartu Krisis', href: '/emergency', icon: AlertOctagon, badge: 'CRISIS' },
    { name: language === 'en' ? 'Antimicrobial & SBAR' : 'Antimikroba & SBAR', href: '/antimicrobial', icon: ShieldAlert },
    { name: t.calculators, href: '/calculators', icon: Calculator },
    { name: t.dosage, href: '/dosage', icon: Syringe },
    { name: '12-Lead ECG', href: '/ecg', icon: Activity },
    { name: language === 'en' ? 'POCUS Ultrasound' : 'USG POCUS', href: '/pocus', icon: Radio, badge: 'POCUS' },
    { name: language === 'en' ? 'Formulary' : 'Formularium', href: '/formulary', icon: Pill },
    { name: language === 'en' ? 'Guidelines' : 'Panduan', href: '/guidelines', icon: BookOpen },
    { name: language === 'en' ? 'Physical Exam' : 'Pemeriksaan Fisik', href: '/physical-exam', icon: Stethoscope },
    { name: t.interactions, href: '/interactions', icon: Pill },
    { name: t.symptoms, href: '/symptoms', icon: Activity },
    { name: 'ICD-10', href: '/icd10', icon: Book },
    { name: t.tutorial, href: '/tutorial', icon: BookOpen },
    { name: t.settings, href: '/settings', icon: Settings },
  ];

  const statusDotClass = aiStatus === 'ready' ? 'status-dot status-dot-green' : aiStatus === 'missing' ? 'status-dot status-dot-amber' : 'status-dot status-dot-red';
  const statusLabel = aiStatus === 'ready' ? t.ready : aiStatus === 'missing' ? t.missing_config : t.offline;

  return (
    <div className="h-screen overflow-hidden flex flex-col bg-[#080c15] text-[#f8fafc]">
      {/* ─── Top Bar ─── */}
      <header
        className="h-[56px] shrink-0 flex items-center justify-between px-3 md:px-4 z-20 w-full fixed md:static top-0 bg-[#0a0f1d]/90 backdrop-blur-md border-b border-white/[0.08]"
      >
        {/* Left: Mobile Branding / Logo */}
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600/30 border border-blue-500/40 flex items-center justify-center shrink-0">
              <Activity className="w-4 h-4 text-blue-400" />
            </div>
            <div className="flex flex-col">
              <span className="font-[900] text-[15px] tracking-tight text-white leading-none">Anesthesia</span>
              <span className="text-[10px] text-slate-400 font-[500] leading-none mt-1">Acute Care Suite</span>
            </div>
          </Link>
        </div>

        {/* Center: Active Case Bar (Desktop & Tablet) */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={() => setIsCaseModalOpen(true)}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-blue-500/40 hover:bg-blue-500/10 transition-all text-[12px] group"
            title="Click to edit active patient parameters"
          >
            <div className="w-5 h-5 rounded-md bg-blue-500/20 flex items-center justify-center text-blue-400">
              <User className="w-3 h-3" />
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <span className="font-[600]">
                {language === 'en' ? 'Active Case' : 'Pasien'}:
              </span>
              <span className="font-mono font-[700] text-blue-300">
                {activeCase.patientWeight || '70'} kg
              </span>
              <span className="text-slate-500">•</span>
              <span className="font-mono text-slate-300">
                {activeCase.patientSex} / {activeCase.patientAge || '45'}y
              </span>
              <span className="text-slate-500">•</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-[800] bg-amber-500/15 text-amber-300 border border-amber-500/30">
                ASA {activeCase.asaClass}
              </span>
            </div>
          </button>

          {/* Quick Emergency Button */}
          <Link href="/emergency">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600/20 border border-rose-500/40 hover:bg-rose-600/30 text-rose-300 transition-all text-[12px] font-[700]">
              <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
              <span>{language === 'en' ? 'Crisis Dose' : 'Dosis Krisis'}</span>
            </button>
          </Link>

          {/* 1-Tap SBAR Rounds PDF Button */}
          <button
            onClick={() => {
              exportBedsideRoundsPDF({
                activeCase: store.activeCase,
                patientLabs: store.patientLabs,
              });
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600/20 border border-blue-500/40 hover:bg-blue-600/30 text-blue-300 transition-all text-[12px] font-[700]"
            title="Export Bedside Rounds SBAR Clinical Handoff Sheet"
          >
            <Printer className="w-3.5 h-3.5 text-blue-400" />
            <span>{language === 'en' ? 'SBAR PDF' : 'PDF SBAR'}</span>
          </button>

          {/* 1-Tap Structured SOAP Progress Note */}
          <button
            onClick={() => setIsSoapModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600/20 border border-purple-500/40 hover:bg-purple-600/30 text-purple-300 transition-all text-[12px] font-[700]"
            title="Generate Structured Clinical SOAP Note"
          >
            <FileText className="w-3.5 h-3.5 text-purple-400" />
            <span>SOAP Note</span>
          </button>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Cmd+K Search trigger */}
          <button
            onClick={() => setIsCmdPaletteOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/20 text-slate-400 hover:text-slate-200 transition-all text-[12px]"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden lg:inline text-[11px] font-mono">⌘K</span>
          </button>

          {/* LoLyeah Topic Showcase */}
          <a
            href="https://lolyeah.github.io/topics/anesthesia.html"
            target="_blank"
            rel="noopener noreferrer"
            title="LoLyeah Topic Showcase"
            className="p-1.5 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/10 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <Globe className="w-4 h-4" />
          </a>

          {/* Offline status indicator */}
          <AnimatePresence>
            {isOffline && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="badge-offline text-[10px] hidden sm:flex items-center gap-1"
              >
                <WifiOff className="w-3 h-3" />
                <span>OFFLINE</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Language toggle */}
          <div className="flex rounded-lg p-[2px] bg-white/[0.04] border border-white/10">
            {(['en', 'id'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-2 py-1 rounded-md text-[11px] font-[700] transition-all ${
                  language === lang
                    ? 'bg-blue-600/30 text-blue-300 border border-blue-500/40 shadow-sm'
                    : 'text-slate-400 border border-transparent hover:text-slate-200'
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ─── Main Workspace Shell ─── */}
      <div className="flex flex-1 overflow-hidden min-w-0 pt-[56px] md:pt-0 pb-[72px] md:pb-0 relative">
        {/* Desktop Sidebar */}
        <motion.nav
          initial={false}
          animate={{ width: isCollapsed ? '68px' : '230px' }}
          transition={{ type: 'tween', ease: 'easeInOut', duration: 0.2 }}
          className="hidden md:flex flex-col shrink-0 overflow-hidden relative bg-[#090e1a] border-r border-white/[0.07]"
        >
          {/* Collapse header */}
          <div className="flex items-center justify-between px-4 h-[48px] border-b border-white/[0.05]">
            <span className={`text-[10px] uppercase tracking-[1.5px] font-[800] text-slate-400 truncate ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
              Clinical Suite
            </span>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <ChevronLeft className={`w-4 h-4 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Nav Links */}
          <div className="flex-1 py-2 overflow-y-auto space-y-0.5 px-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (pathname?.startsWith(item.href) && item.href !== '/dashboard');
              const isEmergency = item.href === '/emergency';
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={isCollapsed ? item.name : undefined}
                  className="block"
                >
                  <div
                    className={`flex items-center px-3 py-2 rounded-xl text-[13px] font-[600] transition-all ${
                      isActive
                        ? isEmergency
                          ? 'bg-rose-600/25 text-rose-200 border border-rose-500/40 shadow-[0_0_15px_rgba(244,63,94,0.15)]'
                          : 'bg-blue-600/20 text-blue-300 border border-blue-500/30 shadow-[0_0_15px_rgba(37,99,235,0.15)]'
                        : isEmergency
                        ? 'text-rose-400/90 hover:bg-rose-500/10 hover:text-rose-300'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                    }`}
                  >
                    <item.icon className="w-4 h-4 shrink-0" />
                    {!isCollapsed && (
                      <span className="ml-3 truncate flex-1">{item.name}</span>
                    )}
                    {!isCollapsed && item.badge && (
                      <span className="ml-auto text-[9px] font-[800] px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40">
                        {item.badge}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>

          {/* AI / Offline Footer */}
          <div className="p-3 border-t border-white/[0.05] bg-[#070b14]/60">
            <div className="flex items-center gap-2.5">
              <span className={statusDotClass} />
              {!isCollapsed && (
                <div className="text-[11px] truncate leading-tight">
                  <div className="text-slate-400">{getProviderName()} Engine</div>
                  <div className={`font-[700] ${aiStatus === 'ready' ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {statusLabel}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.nav>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden min-w-0 w-full">
          {/* Active Case Mobile Bar */}
          <div className="sm:hidden flex items-center justify-between px-3 py-1.5 bg-blue-950/20 border-b border-blue-500/20 text-[12px] gap-2">
            <button
              onClick={() => setIsCaseModalOpen(true)}
              className="min-h-[44px] flex items-center gap-2 text-blue-300 font-[700] px-2 py-1 rounded-lg hover:bg-blue-500/10 transition-colors min-w-0 flex-1"
              aria-label="Edit active patient case"
            >
              <User className="w-4 h-4 text-blue-400 shrink-0" />
              <span className="truncate">{activeCase.patientWeight || '70'}kg • {activeCase.patientSex} • ASA {activeCase.asaClass}</span>
            </button>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => setIsSoapModalOpen(true)}
                className="min-h-[44px] px-2 rounded-xl bg-purple-600/20 border border-purple-500/40 text-purple-300 font-[800] flex items-center gap-1 transition-colors text-[11px]"
                aria-label="Generate SOAP progress note"
              >
                <FileText className="w-3.5 h-3.5 text-purple-400" />
                <span>SOAP</span>
              </button>
              <button
                onClick={() => {
                  exportBedsideRoundsPDF({
                    activeCase: store.activeCase,
                    patientLabs: store.patientLabs,
                  });
                }}
                className="min-h-[44px] px-2.5 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-300 font-[800] flex items-center gap-1 transition-colors text-[11px]"
                aria-label="Export SBAR rounds PDF"
              >
                <Printer className="w-3.5 h-3.5 text-blue-400" />
                <span>SBAR</span>
              </button>
              <Link
                href="/emergency"
                className="min-h-[44px] px-3 rounded-xl bg-rose-600/20 border border-rose-500/40 text-rose-300 font-[800] flex items-center gap-1.5 transition-colors"
                aria-label="Open emergency crisis protocols"
              >
                <AlertOctagon className="w-4 h-4 text-rose-400" />
                <span>Crisis</span>
              </Link>
            </div>
          </div>

          <div className="p-4 md:p-6 w-full max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-[64px] bg-[#090e1a]/95 backdrop-blur-lg border-t border-white/10 flex items-center justify-around px-2 z-30">
        {[
          { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
          { name: 'Crisis', href: '/emergency', icon: AlertOctagon, highlight: true },
          { name: 'Calculators', href: '/calculators', icon: Calculator },
          { name: 'Dosing', href: '/dosage', icon: Syringe },
          { name: 'ECG', href: '/ecg', icon: Activity },
          { name: 'More', href: '/settings', icon: Settings },
        ].map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
                isActive
                  ? item.highlight ? 'text-rose-400' : 'text-blue-400'
                  : item.highlight ? 'text-rose-400/70' : 'text-slate-400'
              }`}
            >
              <item.icon className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] font-[600]">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Modals & Trays */}
      <ActiveCaseModal isOpen={isCaseModalOpen} onClose={() => setIsCaseModalOpen(false)} />
      <SOAPNoteModal isOpen={isSoapModalOpen} onClose={() => setIsSoapModalOpen(false)} />
      <CommandPalette 
        isOpen={isCmdPaletteOpen} 
        onClose={() => setIsCmdPaletteOpen(false)} 
        onOpenCaseModal={() => setIsCaseModalOpen(true)}
      />

      {/* Database Sync Warning Modal */}
      <AnimatePresence>
        {isNotSynced && !hasIgnoredSync && pathname !== '/' && pathname !== '/settings' && pathname !== '/emergency' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="w-full max-w-sm p-6 bg-[#0e1424] border border-white/10 rounded-2xl shadow-2xl flex flex-col items-center text-center relative"
            >
              <button 
                onClick={() => setHasIgnoredSync(true)}
                className="absolute top-3 right-3 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center bg-amber-500/15 text-amber-400 border border-amber-500/30">
                <Database className="w-6 h-6" />
              </div>
              <h2 className="text-[17px] font-[800] text-slate-100 mb-1.5">
                {language === 'en' ? 'Offline Database Not Synced' : 'Database Offline Belum Disinkronkan'}
              </h2>
              <p className="text-[12px] text-slate-400 mb-5 leading-relaxed">
                {language === 'en'
                  ? 'Sync offline data to ensure instant access to drug formularies and calculators without network latency.'
                  : 'Sinkronkan data offline untuk memastikan akses cepat ke formularium obat dan kalkulator tanpa latensi jaringan.'}
              </p>
              <button 
                onClick={handleInitialSync}
                disabled={isInitialSyncing}
                className="btn-primary w-full py-2.5 text-[13px] font-[700] flex justify-center items-center gap-2 rounded-xl"
              >
                {isInitialSyncing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>{language === 'en' ? 'Syncing Datasets...' : 'Menyinkronkan Data...'}</span>
                  </>
                ) : (
                  <>
                    <Database className="w-4 h-4" />
                    <span>{language === 'en' ? 'Sync Local Database' : 'Sinkronkan Database Lokal'}</span>
                  </>
                )}
              </button>
              <button 
                onClick={() => setHasIgnoredSync(true)}
                className="w-full py-2 mt-2 text-[12px] text-slate-400 hover:text-slate-200"
              >
                {language === 'en' ? 'Continue for now' : 'Lanjutkan sekarang'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
