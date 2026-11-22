'use client';

import { useState, useEffect, useCallback } from 'react';

// Extend Window interface for captured beforeinstallprompt event
declare global {
  interface Window {
    __pwa_install_prompt?: any;
  }
}

export interface UsePWAInstallReturn {
  isInstalled: boolean;
  canPrompt: boolean;
  isIOS: boolean;
  isSafari: boolean;
  isAndroid: boolean;
  isDesktop: boolean;
  promptInstall: () => Promise<'accepted' | 'dismissed' | 'unsupported'>;
}

export function usePWAInstall(): UsePWAInstallReturn {
  const [isInstalled, setIsInstalled] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isSafari, setIsSafari] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if running in standalone mode (already installed PWA)
    const checkStandalone = () => {
      const standalone =
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true ||
        document.referrer.includes('android-app://');
      setIsInstalled(!!standalone);
    };

    checkStandalone();

    // Device / Browser Detection
    const ua = window.navigator.userAgent.toLowerCase();
    const ios = /iphone|ipad|ipod/.test(ua);
    const android = /android/.test(ua);
    const safari = /safari/.test(ua) && !/chrome|chromium|crios/.test(ua);
    const desktop = !ios && !android;

    setIsIOS(ios);
    setIsSafari(safari);
    setIsAndroid(android);
    setIsDesktop(desktop);

    // Pick up already captured beforeinstallprompt from global window
    if (window.__pwa_install_prompt) {
      setDeferredPrompt(window.__pwa_install_prompt);
    }

    const handlePromptReady = () => {
      if (window.__pwa_install_prompt) {
        setDeferredPrompt(window.__pwa_install_prompt);
      }
    };

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      window.__pwa_install_prompt = e;
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      window.__pwa_install_prompt = null;
    };

    window.addEventListener('pwa_prompt_ready', handlePromptReady);
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('pwa_prompt_ready', handlePromptReady);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const promptInstall = useCallback(async (): Promise<'accepted' | 'dismissed' | 'unsupported'> => {
    const promptEvent = deferredPrompt || (typeof window !== 'undefined' ? window.__pwa_install_prompt : null);
    if (!promptEvent) {
      return 'unsupported';
    }

    try {
      promptEvent.prompt();
      const choiceResult = await promptEvent.userChoice;
      if (choiceResult && choiceResult.outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
      if (typeof window !== 'undefined') {
        window.__pwa_install_prompt = null;
      }
      return choiceResult?.outcome || 'accepted';
    } catch (err) {
      console.warn('[PWA] Error triggering install prompt:', err);
      return 'unsupported';
    }
  }, [deferredPrompt]);

  return {
    isInstalled,
    canPrompt: Boolean(deferredPrompt),
    isIOS,
    isSafari,
    isAndroid,
    isDesktop,
    promptInstall,
  };
}
