'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAppStore } from '@/store/appStore';
import { translations } from '@/lib/i18n';
import { 
  LayoutDashboard, Settings, ChevronLeft, WifiOff, Activity, Database, 
  RefreshCw, X, BookOpen, AlertOctagon, Calculator, Syringe, Pill, 
  Stethoscope, Book, Search, User, Globe, ShieldAlert, Printer, Radio, FileText,
  Sun, Moon, Monitor
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ActiveCaseModal from '@/components/ActiveCaseModal';
import CommandPalette from '@/components/CommandPalette';
import SOAPNoteModal from '@/components/SOAPNoteModal';
import ReleaseNotesModal from '@/components/ReleaseNotesModal';
import { exportBedsideRoundsPDF } from '@/lib/pdfGenerator';
import { APP_VERSION } from '@/lib/version';

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
  const [isReleaseModalOpen, setIsReleaseModalOpen] = useState(false);

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

  // Ensure expanded drug formulary is seeded to local IndexedDB
  useEffect(() => {
    async function ensureDrugsSeeded() {
      try {
        const db = (await import('@/lib/db')).default;
        const { DRUG_DB } = await import('@/lib/drugs');
        const count = await db.drugs.count();
        if (count < DRUG_DB.length) {
          await db.drugs.bulkPut(DRUG_DB as any);
          const now = new Date().toISOString();
          store.updateSyncMeta('drugs', { lastSynced: now, count: DRUG_DB.length });
        }
      } catch (err) {
        console.error('Error ensuring expanded drugs seeded:', err);
      }
    }
    ensureDrugsSeeded();
  }, [store]);

  // Synchronize theme with <html> class, data-theme attribute, and color-scheme
  useEffect(() => {
    const applyTheme = (theme: 'dark' | 'light' | 'system') => {
      const isLight =
        theme === 'light' ||
        (theme === 'system' && typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches);

      const root = document.documentElement;
      if (isLight) {
        root.classList.add('light');
        root.classList.remove('dark');
        root.setAttribute('data-theme', 'light');
        root.style.colorScheme = 'light';
      } else {
        root.classList.add('dark');
        root.classList.remove('light');
        root.setAttribute('data-theme', 'dark');
        root.style.colorScheme = 'dark';
      }
    };

    applyTheme(store.theme);

    if (store.theme === 'system' && typeof window !== 'undefined' && window.matchMedia) {
      const mql = window.matchMedia('(prefers-color-scheme: light)');
      const handler = () => applyTheme('system');
      mql.addEventListener('change', handler);
      return () => mql.removeEventListener('change', handler);
    }
  }, [store.theme]);

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
    <div className="h-screen overflow-hidden flex flex-col bg-[var(--bg-base)] text-[var(--text-primary)]">
      {/* ─── Top Bar ─── */}
      <header
        className="shrink-0 z-30 w-full fixed md:static top-0 bg-white/95 dark:bg-[#0a0f1d]/95 backdrop-blur-md border-b border-slate-200 dark:border-white/[0.08]"
      >
        {/* Main Row */}
        <div className="h-[52px] sm:h-[56px] flex items-center justify-between px-3 md:px-4">
          {/* Left: Mobile Branding / Logo */}
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-600/30 border border-blue-200 dark:border-blue-500/40 flex items-center justify-center shrink-0">
                <Activity className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-[900] text-[15px] tracking-tight text-slate-900 dark:text-white leading-none">Anesthesia</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-blue-100 text-blue-800 border border-blue-200 dark:bg-blue-500/20 dark:text-blue-300 dark:border-blue-500/30 font-bold">
                    v{APP_VERSION}
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-[500] leading-none mt-1">Acute Care Suite</span>
              </div>
            </Link>
          </div>

          {/* Center: Active Case Bar (Desktop & Tablet) */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => setIsCaseModalOpen(true)}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-slate-800 dark:bg-white/[0.04] dark:border-white/10 dark:hover:border-blue-500/40 dark:hover:bg-blue-500/10 dark:text-slate-300 transition-all text-[12px] group"
              title="Click to edit active patient parameters"
            >
              <div className="w-5 h-5 rounded-md bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <User className="w-3 h-3" />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-[600] text-slate-600 dark:text-slate-300">
                  {language === 'en' ? 'Active Case' : 'Pasien'}:
                </span>
                <span className="font-mono font-[700] text-blue-600 dark:text-blue-300">
                  {activeCase.patientWeight || '70'} kg
                </span>
                <span className="text-slate-400 dark:text-slate-500">•</span>
                <span className="font-mono text-slate-700 dark:text-slate-300">
                  {activeCase.patientSex} / {activeCase.patientAge || '45'}y
                </span>
                <span className="text-slate-400 dark:text-slate-500">•</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-[800] bg-amber-100 text-amber-800 border border-amber-300 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/30">
                  ASA {activeCase.asaClass}
                </span>
              </div>
            </button>

            {/* Quick Emergency Button */}
            <Link href="/emergency">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-700 dark:bg-rose-600/20 dark:border-rose-500/40 dark:hover:bg-rose-600/30 dark:text-rose-300 transition-all text-[12px] font-[700]">
                <AlertOctagon className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                <span>{language === 'en' ? 'Crisis Dose' : 'Dosis Krisis'}</span>
              </button>
            </Link>

            {/* 1-Tap SBAR Rounds PDF Button */}
            <button
              onClick={() => {
                exportBedsideRoundsPDF({
                  activeCase: store.activeCase,
                  patientLabs: store.patientLabs,
                  language: store.language,
                });
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 hover:bg-blue-100 text-blue-700 dark:bg-blue-600/20 dark:border-blue-500/40 dark:hover:bg-blue-600/30 dark:text-blue-300 transition-all text-[12px] font-[700]"
              title="Export Bedside Rounds SBAR Clinical Handoff Sheet"
            >
              <Printer className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>{language === 'en' ? 'SBAR PDF' : 'PDF SBAR'}</span>
            </button>

            {/* 1-Tap Structured SOAP Progress Note */}
            <button
              onClick={() => setIsSoapModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 border border-purple-200 hover:bg-purple-100 text-purple-700 dark:bg-purple-600/20 dark:border-purple-500/40 dark:hover:bg-purple-600/30 dark:text-purple-300 transition-all text-[12px] font-[700]"
              title="Generate Structured Clinical SOAP Note"
            >
              <FileText className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>SOAP Note</span>
            </button>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Cmd+K Search trigger */}
            <button
              onClick={() => setIsCmdPaletteOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100 border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900 dark:bg-white/[0.04] dark:border-white/10 dark:hover:border-white/20 dark:text-slate-400 dark:hover:text-slate-200 transition-all text-[12px]"
              title="Search commands, calculators, drugs (Cmd+K)"
              aria-label="Search commands"
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
              className="p-1.5 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-xl border border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/10 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
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

            {/* Theme switcher */}
            <div className="flex rounded-lg p-[2px] bg-slate-100 border border-slate-200 dark:bg-white/[0.04] dark:border-white/10" title={language === 'en' ? 'Appearance / Theme' : 'Tema Tampilan'}>
              <button
                type="button"
                onClick={() => store.setTheme('dark')}
                className={`p-1 rounded-md text-[11px] transition-all ${
                  store.theme === 'dark'
                    ? 'bg-blue-600 text-white dark:bg-blue-600/30 dark:text-blue-300 border border-blue-600 dark:border-blue-500/40 shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 border border-transparent hover:text-slate-900 dark:hover:text-slate-200'
                }`}
                title={language === 'en' ? 'Dark Mode (OR / Acute Care)' : 'Mode Gelap (Kamar Operasi / ICU)'}
                aria-label="Dark mode"
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => store.setTheme('light')}
                className={`p-1 rounded-md text-[11px] transition-all ${
                  store.theme === 'light'
                    ? 'bg-amber-500 text-white dark:bg-amber-500/25 dark:text-amber-400 border border-amber-500 dark:border-amber-500/40 shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 border border-transparent hover:text-slate-900 dark:hover:text-slate-200'
                }`}
                title={language === 'en' ? 'Light Mode (Pre-Op / Clinic)' : 'Mode Terang (Poliklinik / Bangsal)'}
                aria-label="Light mode"
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => store.setTheme('system')}
                className={`p-1 rounded-md text-[11px] transition-all ${
                  store.theme === 'system'
                    ? 'bg-blue-600 text-white dark:bg-blue-600/30 dark:text-blue-300 border border-blue-600 dark:border-blue-500/40 shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 border border-transparent hover:text-slate-900 dark:hover:text-slate-200'
                }`}
                title={language === 'en' ? 'System Theme' : 'Sesuai Sistem'}
                aria-label="System theme"
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Language toggle */}
            <div className="flex rounded-lg p-[2px] bg-slate-100 border border-slate-200 dark:bg-white/[0.04] dark:border-white/10">
              {(['en', 'id'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-2 py-1 rounded-md text-[11px] font-[700] transition-all ${
                    language === lang
                      ? 'bg-blue-600 text-white dark:bg-blue-600/30 dark:text-blue-300 border border-blue-600 dark:border-blue-500/40 shadow-sm'
                      : 'text-slate-500 dark:text-slate-400 border border-transparent hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Row 2: Persistent Clinical Action & Patient HUD */}
        <div className="sm:hidden h-[42px] px-3 flex items-center justify-between gap-1.5 border-t border-slate-200 dark:border-white/[0.06] bg-slate-50/95 dark:bg-[#070c17]/95">
          {/* Active Patient Pill */}
          <button
            onClick={() => setIsCaseModalOpen(true)}
            className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 hover:border-blue-500/40 text-slate-800 dark:text-blue-300 font-[700] min-w-0 flex-1 truncate transition-colors text-[11px] shadow-sm dark:shadow-none"
            title={language === 'en' ? 'Click to edit active patient parameters' : 'Klik untuk edit data pasien aktif'}
            aria-label="Edit active patient case"
          >
            <User className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
            <span className="truncate">
              {activeCase.patientWeight || '70'}kg • {activeCase.patientSex} • ASA {activeCase.asaClass}
            </span>
          </button>

          {/* Action buttons */}
          <div className="flex items-center gap-1 shrink-0">
            {/* SOAP Note Button */}
            <button
              onClick={() => setIsSoapModalOpen(true)}
              className="px-2 py-1 rounded-lg bg-purple-100/80 hover:bg-purple-200/80 border border-purple-200 text-purple-700 dark:bg-purple-600/25 dark:border-purple-500/40 dark:text-purple-200 dark:hover:bg-purple-600/35 active:scale-95 font-[800] flex items-center gap-1 transition-all text-[11px]"
              title="Generate Structured SOAP Note"
              aria-label="Generate SOAP progress note"
            >
              <FileText className="w-3.5 h-3.5 text-purple-600 dark:text-purple-300" />
              <span>SOAP</span>
            </button>

            {/* SBAR PDF Button */}
            <button
              onClick={() => {
                exportBedsideRoundsPDF({
                  activeCase: store.activeCase,
                  patientLabs: store.patientLabs,
                  language: store.language,
                });
              }}
              className="px-2 py-1 rounded-lg bg-blue-100/80 hover:bg-blue-200/80 border border-blue-200 text-blue-700 dark:bg-blue-600/25 dark:border-blue-500/40 dark:text-blue-200 dark:hover:bg-blue-600/35 active:scale-95 font-[800] flex items-center gap-1 transition-all text-[11px]"
              title="Export Bedside Rounds SBAR Clinical Handoff Sheet"
              aria-label="Export SBAR rounds PDF"
            >
              <Printer className="w-3.5 h-3.5 text-blue-600 dark:text-blue-300" />
              <span>SBAR</span>
            </button>

            {/* Crisis Button */}
            <Link
              href="/emergency"
              className="px-2 py-1 rounded-lg bg-rose-100/80 hover:bg-rose-200/80 border border-rose-200 text-rose-700 dark:bg-rose-600/25 dark:border-rose-500/40 dark:text-rose-200 dark:hover:bg-rose-600/35 active:scale-95 font-[800] flex items-center gap-1 transition-all text-[11px]"
              title="Open Emergency Crisis Protocols"
              aria-label="Open emergency crisis protocols"
            >
              <AlertOctagon className="w-3.5 h-3.5 text-rose-600 dark:text-rose-300" />
              <span>{language === 'en' ? 'Crisis' : 'Krisis'}</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ─── Main Workspace Shell ─── */}
      <div className="flex flex-1 overflow-hidden min-w-0 pt-[94px] sm:pt-[56px] md:pt-0 pb-[72px] md:pb-0 relative">
        {/* Desktop Sidebar */}
        <motion.nav
          initial={false}
          animate={{ width: isCollapsed ? '68px' : '230px' }}
          transition={{ type: 'tween', ease: 'easeInOut', duration: 0.2 }}
          className="hidden md:flex flex-col shrink-0 overflow-hidden relative bg-white dark:bg-[#090e1a] border-r border-slate-200 dark:border-white/[0.07]"
        >
          {/* Collapse header */}
          <div className="flex items-center justify-between px-4 h-[48px] border-b border-slate-200 dark:border-white/[0.05]">
            <span className={`text-[10px] uppercase tracking-[1.5px] font-[800] text-slate-500 dark:text-slate-400 truncate ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
              Clinical Suite
            </span>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
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
                          ? 'bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-600/25 dark:text-rose-200 dark:border-rose-500/40 shadow-sm'
                          : 'bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-600/20 dark:text-blue-300 dark:border-blue-500/30 shadow-sm'
                        : isEmergency
                        ? 'text-rose-600 hover:bg-rose-50 dark:text-rose-400/90 dark:hover:bg-rose-500/10 dark:hover:text-rose-300'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-white/[0.04]'
                    }`}
                  >
                    <item.icon className="w-4 h-4 shrink-0" />
                    {!isCollapsed && (
                      <span className="ml-3 truncate flex-1">{item.name}</span>
                    )}
                    {!isCollapsed && item.badge && (
                      <span className="ml-auto text-[9px] font-[800] px-1.5 py-0.2 rounded bg-rose-100 text-rose-700 border border-rose-200 dark:bg-rose-500/20 dark:text-rose-300 dark:border-rose-500/40">
                        {item.badge}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>

          {/* AI / Offline & Version Footer */}
          <div className="p-3 border-t border-slate-200 dark:border-white/[0.05] bg-slate-50 dark:bg-[#070b14]/60 space-y-2">
            <div className="flex items-center gap-2.5">
              <span className={statusDotClass} />
              {!isCollapsed && (
                <div className="text-[11px] truncate leading-tight flex-1">
                  <div className="text-slate-500 dark:text-slate-400">{getProviderName()} Engine</div>
                  <div className={`font-[700] ${aiStatus === 'ready' ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                    {statusLabel}
                  </div>
                </div>
              )}
            </div>
            {!isCollapsed ? (
              <button
                type="button"
                onClick={() => setIsReleaseModalOpen(true)}
                className="w-full flex items-center justify-between px-2 py-1 rounded-lg bg-white dark:bg-white/[0.03] hover:bg-slate-100 dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/[0.06] text-[10px] font-mono text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 transition-colors cursor-pointer"
                title="View Release Notes & Changelog"
              >
                <span>v{APP_VERSION}</span>
                <span className="text-[9px] text-blue-600 dark:text-blue-400 font-sans font-bold">Changelog →</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsReleaseModalOpen(true)}
                className="w-full text-center text-[9px] font-mono text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 py-0.5 cursor-pointer"
                title={`v${APP_VERSION} (Click for changelog)`}
              >
                v{APP_VERSION}
              </button>
            )}
          </div>
        </motion.nav>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden min-w-0 w-full">
          <div className="p-4 md:p-6 w-full max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-[64px] bg-white/95 dark:bg-[#090e1a]/95 backdrop-blur-lg border-t border-slate-200 dark:border-white/10 flex items-center justify-around px-2 z-30 shadow-lg">
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
                  ? item.highlight ? 'text-rose-600 dark:text-rose-400 font-[700]' : 'text-blue-600 dark:text-blue-400 font-[700]'
                  : item.highlight ? 'text-rose-500/80 dark:text-rose-400/70' : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
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
        onOpenSoapModal={() => setIsSoapModalOpen(true)}
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

      {/* Release Notes & Changelog Modal */}
      <ReleaseNotesModal
        isOpen={isReleaseModalOpen}
        onClose={() => setIsReleaseModalOpen(false)}
        language={language}
      />
    </div>
  );
}
