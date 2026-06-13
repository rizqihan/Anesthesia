'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppStore } from '@/store/appStore';
import { translations } from '@/lib/i18n';
import { Home, Settings, ChevronLeft, Wifi, WifiOff, AlertTriangle, Activity, Database, RefreshCw, X, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const store = useAppStore();
  const { language, setLanguage, isOffline, setOfflineStatus } = store;
  const t = translations[language];
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isInitialSyncing, setIsInitialSyncing] = useState(false);
  const [hasIgnoredSync, setHasIgnoredSync] = useState(false);

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
      const { ICD10_DB } = await import('@/lib/icd10');
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
      store.updateSyncMeta('icd10', { lastSynced: now, count: ICD10_DB.length });
      store.updateSyncMeta('drugs', { lastSynced: now, count: DRUG_DB.length });
      store.updateSyncMeta('guidelines', { lastSynced: now, count: GUIDELINES_DB.length });
      store.updateSyncMeta('physicalExams', { lastSynced: now, count: PHYSICAL_EXAMS_DB.length });
      store.updateSyncMeta('ecgDiagnoses', { lastSynced: now, count: ECG_DIAGNOSES_DB.length });
    } catch (e) {
      console.error('Initial sync error:', e);
    } finally {
      setIsInitialSyncing(false);
    }
  };

  const isAiConfigured = () => {
    // default_groq is always considered configured (key is server-side)
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

  const navItems = [
    { name: t.home, href: '/', icon: Home },
    { name: t.tutorial, href: '/tutorial', icon: BookOpen },
    { name: t.settings, href: '/settings', icon: Settings },
  ];

  const statusDotClass = aiStatus === 'ready' ? 'status-dot status-dot-green' : aiStatus === 'missing' ? 'status-dot status-dot-amber' : 'status-dot status-dot-red';
  const statusLabel = aiStatus === 'ready' ? t.ready : aiStatus === 'missing' ? t.missing_config : t.offline;

  return (
    <>
      {/* ─── Top Bar ─── */}
      <header
        className="h-[56px] shrink-0 flex items-center justify-between px-4 md:px-0 z-10 w-full fixed md:static top-0"
        style={{
          background: 'rgba(8, 13, 23, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          boxShadow: '0 1px 0 rgba(255,255,255,0.03), 0 4px 24px rgba(0,0,0,0.4)',
        }}
      >
        {/* Mobile Logo */}
        <div className="flex items-center gap-3 md:hidden">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)', boxShadow: '0 0 16px rgba(59,130,246,0.4)' }}
          >
            <Activity className="w-4 h-4 text-white" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-[800] text-[16px] leading-tight gradient-text tracking-tight">{t.app_name}</span>
            <span className="text-[10px] leading-tight mt-0.5" style={{ color: 'var(--text-muted)' }}>Clinical Assistant</span>
          </div>
        </div>

        {/* Desktop Logo */}
        <motion.div
          initial={false}
          animate={{ 
            width: isCollapsed ? 68 : 220,
            paddingLeft: isCollapsed ? 18 : 24
          }}
          transition={{ type: 'tween', ease: 'easeInOut', duration: 0.25 }}
          className="hidden md:flex items-center h-full overflow-hidden"
          style={{
            borderRight: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <motion.div 
            className="flex items-center"
            animate={{ gap: isCollapsed ? 0 : 12 }}
            transition={{ type: 'tween', ease: 'easeInOut', duration: 0.25 }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)', boxShadow: '0 0 16px rgba(59,130,246,0.4)' }}
            >
              <Activity className="w-4 h-4 text-white" />
            </div>
            <motion.div
              initial={false}
              animate={{ 
                opacity: isCollapsed ? 0 : 1
              }}
              transition={{ type: 'tween', ease: 'easeInOut', duration: 0.25 }}
              className="flex flex-col justify-center whitespace-nowrap overflow-hidden"
            >
              <span className="font-[800] text-[16px] leading-tight gradient-text tracking-tight">{t.app_name}</span>
              <span className="text-[10px] leading-tight mt-0.5" style={{ color: 'var(--text-muted)' }}>Clinical Assistant</span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right controls */}
        <div className="flex items-center gap-3 pr-4 md:pr-6">
          {/* Offline badge */}
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
          <div
            className="flex rounded-lg p-[3px] gap-[2px]"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-card)' }}
          >
            {(['en', 'id'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className="px-2.5 py-1 rounded-md text-[11px] font-[700] transition-all duration-200"
                style={language === lang ? {
                  background: 'rgba(59,130,246,0.2)',
                  color: '#93c5fd',
                  border: '1px solid rgba(59,130,246,0.3)',
                  boxShadow: '0 0 10px rgba(59,130,246,0.15)',
                } : {
                  color: 'var(--text-muted)',
                  border: '1px solid transparent',
                }}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ─── Main Layout ─── */}
      <div className="flex flex-1 overflow-hidden pt-[56px] md:pt-0 pb-[110px] md:pb-0 relative">
        {/* Sidebar (Desktop) */}
        <motion.nav
          initial={false}
          animate={{ width: isCollapsed ? 68 : 220 }}
          transition={{ type: 'tween', ease: 'easeInOut', duration: 0.25 }}
          className="hidden md:flex flex-col shrink-0 overflow-hidden relative"
          style={{
            background: 'rgba(8, 13, 23, 0.95)',
            borderRight: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {/* Sidebar top glow */}
          <div
            className="absolute top-0 left-0 right-0 h-[1px]"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.4), transparent)' }}
          />

          {/* Collapse toggle */}
          <div className="flex items-center px-4 h-[52px] border-b relative" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
            <motion.span
              initial={false}
              animate={{ opacity: isCollapsed ? 0 : 1 }}
              transition={{ type: 'tween', ease: 'easeInOut', duration: 0.25 }}
              className="text-[10px] uppercase tracking-[1.5px] font-[700] overflow-hidden whitespace-nowrap"
              style={{ color: 'var(--text-muted)' }}
            >
              Navigation
            </motion.span>
            <motion.button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="absolute p-1.5 rounded-lg"
              animate={{ 
                right: isCollapsed ? 20 : 12,
                y: '-50%'
              }}
              transition={{ type: 'tween', ease: 'easeInOut', duration: 0.25 }}
              style={{ color: 'var(--text-muted)', top: '50%' }}
            >
              <motion.div animate={{ rotate: isCollapsed ? 180 : 0 }} transition={{ type: 'tween', ease: 'easeInOut', duration: 0.25 }}>
                <ChevronLeft className="w-4 h-4" />
              </motion.div>
            </motion.button>
          </div>

          {/* Nav items */}
          <div className="flex-1 py-3 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (pathname?.startsWith(item.href) && item.href !== '/');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={isCollapsed ? item.name : undefined}
                  className="mx-2 mb-1 block"
                >
                  <motion.div
                    className={`nav-item flex items-center rounded-lg text-[13px] font-[500] ${isActive ? 'nav-item-active' : ''}`}
                    animate={{
                      paddingLeft: isCollapsed ? 18 : 16,
                      paddingRight: isCollapsed ? 18 : 16,
                      gap: isCollapsed ? 0 : 12,
                    }}
                    transition={{ type: 'tween', ease: 'easeInOut', duration: 0.25 }}
                    style={{
                      color: isActive ? '#93c5fd' : 'var(--text-secondary)',
                      background: isActive ? 'rgba(59,130,246,0.1)' : 'transparent',
                      boxShadow: isActive ? '0 0 20px rgba(59,130,246,0.08)' : 'none',
                      height: '44px',
                      transition: 'background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease',
                    }}
                  >
                    <item.icon className="w-4 h-4 shrink-0" />
                    <motion.span
                      initial={false}
                      animate={{ opacity: isCollapsed ? 0 : 1 }}
                      transition={{ type: 'tween', ease: 'easeInOut', duration: 0.25 }}
                      className="overflow-hidden whitespace-nowrap truncate"
                    >
                      {item.name}
                    </motion.span>
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* AI Status footer */}
          <div
            className="p-4 border-t relative"
            style={{ borderColor: 'rgba(255,255,255,0.05)' }}
          >
            <motion.div 
              className="flex items-center"
              animate={{
                gap: isCollapsed ? 0 : 10,
                paddingLeft: isCollapsed ? 14 : 0,
              }}
              transition={{ type: 'tween', ease: 'easeInOut', duration: 0.25 }}
            >
              <span className={statusDotClass} />
              <motion.div
                initial={false}
                animate={{ opacity: isCollapsed ? 0 : 1 }}
                transition={{ type: 'tween', ease: 'easeInOut', duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="text-[10px] font-[600] whitespace-nowrap" style={{ color: 'var(--text-muted)' }}>
                  {getProviderName()}
                </div>
                <div className={`text-[10px] font-[700] whitespace-nowrap ${aiStatus === 'ready' ? 'text-emerald-400' : aiStatus === 'missing' ? 'text-amber-400' : 'text-rose-400'}`}>
                  {statusLabel}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.nav>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto w-full">
          <div className="p-4 md:p-6 w-full max-w-full mx-auto container">
            {children}
          </div>
        </main>
      </div>

      {/* Bottom Navigation (Mobile) */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 flex justify-around px-2 pb-safe z-20"
        style={{
          background: 'rgba(8, 13, 23, 0.92)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(255,255,255,0.07)',
          paddingTop: '8px',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href || (pathname?.startsWith(item.href) && item.href !== '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center py-1 px-4 rounded-xl min-w-[60px] transition-all"
              style={isActive ? { color: '#60a5fa' } : { color: 'var(--text-muted)' }}
            >
              <div
                className="p-2 rounded-xl mb-0.5 transition-all"
                style={isActive ? {
                  background: 'rgba(59,130,246,0.15)',
                  boxShadow: '0 0 12px rgba(59,130,246,0.25)',
                } : {}}
              >
                <item.icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-[600]">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Sync Warning Modal */}
      <AnimatePresence>
        {isNotSynced && !hasIgnoredSync && pathname !== '/' && pathname !== '/settings' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="glass-card-static w-full max-w-sm p-6 flex flex-col items-center text-center relative"
            >
              <button 
                onClick={() => setHasIgnoredSync(true)}
                className="absolute top-3 right-3 p-1.5 rounded-lg transition-colors hover:bg-white/5"
                style={{ color: 'var(--text-muted)' }}
              >
                <X className="w-4 h-4" />
              </button>
              <div className="w-14 h-14 rounded-full mb-5 flex items-center justify-center shadow-lg mt-2" style={{ background: 'rgba(251,191,36,0.1)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.2)' }}>
                <Database className="w-7 h-7" />
              </div>
              <h2 className="text-[18px] font-[800] mb-2" style={{ color: 'var(--text-primary)' }}>
                {language === 'en' ? 'Database Not Synced' : 'Database Belum Disinkronkan'}
              </h2>
              <p className="text-[13px] mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {language === 'en' 
                  ? 'Please sync the clinical database first to enable offline features like medical calculators and drug references.'
                  : 'Harap sinkronkan database klinis terlebih dahulu untuk mengaktifkan fitur offline seperti kalkulator medis dan referensi obat.'}
              </p>
              <button 
                onClick={handleInitialSync}
                disabled={isInitialSyncing}
                className="btn-primary w-full py-3 text-[14px] font-[600] flex justify-center items-center gap-2"
              >
                {isInitialSyncing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    {language === 'en' ? 'Syncing...' : 'Menyinkronkan...'}
                  </>
                ) : (
                  <>
                    <Database className="w-4 h-4" />
                    {language === 'en' ? 'Sync Database Now' : 'Sinkronkan Database Sekarang'}
                  </>
                )}
              </button>
              <button 
                onClick={() => setHasIgnoredSync(true)}
                className="w-full py-2.5 mt-3 text-[13px] font-[600] rounded-xl transition-all hover:bg-white/5"
                style={{ color: 'var(--text-muted)', background: 'rgba(255,255,255,0.02)' }}
              >
                {language === 'en' ? 'Ignore for now' : 'Abaikan untuk saat ini'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
