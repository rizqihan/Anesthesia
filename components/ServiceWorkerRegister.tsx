'use client';

import { useEffect } from 'react';

// Declare custom property on window for global prompt caching
declare global {
  interface Window {
    __pwa_install_prompt?: any;
  }
}

// Intercept beforeinstallprompt early in the client lifecycle
if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    window.__pwa_install_prompt = e;
    window.dispatchEvent(new CustomEvent('pwa_prompt_ready'));
  });
}

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      const registerSW = async () => {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/',
          });

          // Check if a new service worker is waiting
          registration.addEventListener('updatefound', () => {
            const installing = registration.installing;
            if (installing) {
              installing.addEventListener('statechange', () => {
                if (installing.state === 'installed' && navigator.serviceWorker.controller) {
                  console.log('[SW] New version available for offline use.');
                }
              });
            }
          });
        } catch (error) {
          console.warn('[SW] Registration failed:', error);
        }
      };

      if (document.readyState === 'complete') {
        registerSW();
      } else {
        window.addEventListener('load', registerSW);
        return () => window.removeEventListener('load', registerSW);
      }
    }
  }, []);

  return null;
}
