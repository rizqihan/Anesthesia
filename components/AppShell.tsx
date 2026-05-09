'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppStore } from '@/store/appStore';
import { translations } from '@/lib/i18n';
import { Home, Calculator, Pill, Activity, Syringe, Settings, Book, ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const store = useAppStore();
  const { language, setLanguage, isOffline, setOfflineStatus } = store;
  const t = translations[language];
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isAiConfigured = () => {
    if (store.aiProvider === 'custom_gemini' && !store.customGeminiKey.trim()) return false;
    if (store.aiProvider === 'openai_compatible' && (!store.openaiEndpoint.trim() || !store.openaiKey.trim())) return false;
    return true;
  };

  const getProviderName = () => {
    switch (store.aiProvider) {
      case 'default_gemini': return 'Gemini (Built-in)';
      case 'custom_gemini': return 'Gemini (Custom)';
      case 'openai_compatible': return 'OpenAI Compatible';
      default: return 'AI Config';
    }
  };

  useEffect(() => {
    // Basic offline detection
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
    { name: t.settings, href: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Top Bar */}
      <header className="h-[56px] bg-white border-b border-slate-200 flex items-center justify-between px-5 shrink-0 z-10 w-full fixed md:static top-0">
        <div className="flex items-center gap-4">
          <div className="font-[800] text-[20px] text-sky-600 tracking-[-0.5px] flex items-center gap-2">
            <span>{t.app_name}</span>
            <span className="font-normal text-slate-500 text-[14px] hidden sm:inline">Clinical Assistant</span>
          </div>
        </div>
        
        <div className="flex gap-4 items-center">
          {isOffline && (
            <div className="text-[11px] font-semibold bg-green-100 text-green-800 px-2.5 py-1 rounded-full flex items-center gap-1">
              <span>●</span>
              <span className="hidden sm:inline">Offline Access: ACTIVE</span>
              <span className="sm:hidden">OFFLINE</span>
            </div>
          )}
          
          <div className="text-[12px] font-semibold border border-slate-200 rounded-md p-1 cursor-pointer bg-slate-50 flex">
            <button 
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 rounded ${language === 'en' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}
            >
              EN
            </button>
            <button 
              onClick={() => setLanguage('id')}
              className={`px-2 py-0.5 rounded ${language === 'id' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}
            >
              ID
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden pt-[56px] md:pt-0 pb-[60px] md:pb-0 relative">
        {/* Sidebar */}
        <motion.nav 
          initial={false}
          animate={{ width: isCollapsed ? 70 : 220 }}
          transition={{ type: "tween", ease: "easeInOut", duration: 0.25 }}
          className="hidden md:flex flex-col bg-slate-900 text-white shrink-0 overflow-hidden relative"
        >
          <div className="p-4 flex items-center text-slate-400 h-[60px]">
            <motion.span 
               initial={false}
               animate={{ opacity: isCollapsed ? 0 : 1 }}
               className="text-[10px] uppercase tracking-[1px] font-semibold whitespace-nowrap"
            >
              Main Menu
            </motion.span>
            <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1.5 rounded hover:bg-slate-800 text-slate-400 transition-colors absolute right-4"
            >
              <motion.div animate={{ rotate: isCollapsed ? 180 : 0 }}>
                <ChevronLeft className="w-5 h-5" />
              </motion.div>
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto mt-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (pathname?.startsWith(item.href) && item.href !== '/');
              return (
                <Link 
                  key={item.href} 
                  href={item.href}
                  className={`px-5 py-3 flex items-center cursor-pointer transition-colors text-[14px] border-l-[3px] gap-3 ${isActive ? 'bg-slate-800 border-sky-600 text-white' : 'border-transparent text-slate-400 hover:bg-slate-800/50 hover:text-white'}`}
                  title={isCollapsed ? item.name : undefined}
                >
                  <item.icon className="w-5 h-5 shrink-0" />
                  <motion.span 
                    initial={false}
                    animate={{ opacity: isCollapsed ? 0 : 1 }}
                    className="truncate whitespace-nowrap block"
                  >
                    {item.name}
                  </motion.span>
                </Link>
              )
            })}
          </div>

          <div className="mt-auto p-4 border-t border-slate-800 h-[60px] flex items-center relative">
            <motion.div 
               initial={false}
               animate={{ opacity: isCollapsed ? 0 : 1 }}
               className="text-[11px] text-slate-400 truncate w-[140px]"
            >
              {getProviderName()}: {isOffline ? t.offline : isAiConfigured() ? t.ready : t.missing_config}
            </motion.div>
            
            {isCollapsed && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className={`w-2 h-2 rounded-full ${isOffline ? 'bg-red-500' : isAiConfigured() ? 'bg-green-500' : 'bg-orange-500'}`}></div>
              </div>
            )}
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
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around p-2 z-20 pb-safe overflow-x-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (pathname?.startsWith(item.href) && item.href !== '/');
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex flex-col items-center p-2 min-w-[64px] rounded-lg shrink-0 ${isActive ? 'text-sky-600' : 'text-slate-500'}`}
            >
              <item.icon className="w-6 h-6 mb-1" />
              <span className="text-[10px] font-medium whitespace-nowrap">{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </>
  );
}
