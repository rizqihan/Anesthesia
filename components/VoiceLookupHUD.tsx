'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  X,
  Sparkles,
  Radio,
  Activity,
  ShieldAlert,
  Search,
  CornerDownLeft
} from 'lucide-react';
import { useVoiceLookup } from '@/hooks/useVoiceLookup';
import { useAppStore } from '@/store/appStore';

interface VoiceLookupHUDProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VoiceLookupHUD({ isOpen, onClose }: VoiceLookupHUDProps) {
  const router = useRouter();
  const { language, activeCase, setActiveCase, setTheme } = useAppStore();
  const [manualText, setManualText] = useState('');

  const {
    isListening,
    isSupported,
    isSpeaking,
    transcript,
    interimTranscript,
    matchedIntent,
    error,
    continuousScrubMode,
    startListening,
    stopListening,
    toggleListening,
    setContinuousScrubMode,
    speak,
    cancelSpeech,
    processQuery,
    clearTranscript
  } = useVoiceLookup();

  // Keyboard shortcut: ESC to close, Space to toggle mic when open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // When modal opens, auto-start listening if supported
  useEffect(() => {
    if (isOpen && isSupported) {
      clearTranscript();
      startListening();
    } else {
      stopListening();
      cancelSpeech();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualText.trim()) return;
    const intent = processQuery(manualText.trim());
    setManualText('');
    const textToSpeak = language === 'en' ? intent.speakTextEn : intent.speakTextId;
    speak(textToSpeak);
  };

  const handleExecuteAction = () => {
    if (!matchedIntent) return;

    // Apply Active Case Mutation if applicable
    if (matchedIntent.type === 'ACTIVE_CASE' && matchedIntent.details?.actionPayload) {
      setActiveCase(matchedIntent.details.actionPayload);
    }

    // Apply Theme change if applicable
    if (matchedIntent.type === 'THEME' && matchedIntent.details?.actionPayload?.theme) {
      setTheme(matchedIntent.details.actionPayload.theme);
    }

    // Navigate to tool if applicable
    if (matchedIntent.details?.actionHref) {
      router.push(matchedIntent.details.actionHref);
      onClose();
    }
  };

  const sampleVoicePrompts = [
    { label: 'Push-Dose Epi', query: 'push dose epi' },
    { label: 'LAST Protocol (80 kg)', query: 'last protocol 80 kg' },
    { label: 'Propofol (70 kg)', query: 'propofol induction for 70 kg' },
    { label: 'Malignant Hyperthermia', query: 'malignant hyperthermia dantrolene' },
    { label: 'Open POCUS', query: 'open pocus ultrasound' },
    { label: 'Set Weight (65 kg)', query: 'set patient weight 65 kg' },
    { label: '4-Step ABG', query: 'abg blood gas analyzer' }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 15 }}
        className="w-full max-w-2xl bg-white dark:bg-[#0c1424] border border-slate-200 dark:border-white/10 shadow-2xl rounded-3xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="text-[15px] font-[800] text-slate-900 dark:text-white flex items-center gap-2">
                <span>{language === 'en' ? 'Bedside Voice Assistant' : 'Asisten Suara Bedside'}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30">
                  HANDS-FREE
                </span>
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                {language === 'en'
                  ? 'Sterile field & resuscitation bay hands-free lookups'
                  : 'Pencarian suara bebas genggam untuk kamar bedah & resusitasi'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Continuous Scrubbed Mode Toggle */}
            <button
              onClick={() => setContinuousScrubMode(!continuousScrubMode)}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-[700] border transition-all flex items-center gap-1.5 ${
                continuousScrubMode
                  ? 'bg-rose-500/15 border-rose-500/40 text-rose-600 dark:text-rose-400 animate-pulse'
                  : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title={
                language === 'en'
                  ? 'Continuous Scrubbed Mode keeps listening between queries'
                  : 'Mode Kamar Bedah terus mendengarkan antar pertanyaan'
              }
            >
              <Radio className="w-3.5 h-3.5" />
              <span>{continuousScrubMode ? 'SCRUB MODE ON' : 'SCRUB MODE'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
              aria-label="Close voice assistant"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Central Audio Listening Visualizer */}
        <div className="px-6 py-6 border-b border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-[#070c17]/60 flex flex-col items-center justify-center text-center relative overflow-hidden">
          {/* Pulsing Audio Waves when listening */}
          <div className="relative mb-4 flex items-center justify-center">
            {isListening && (
              <>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0.8 }}
                  animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                  className="absolute w-24 h-24 rounded-full bg-emerald-500/20 -z-10"
                />
                <motion.div
                  initial={{ scale: 0.9, opacity: 0.6 }}
                  animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0, 0.4] }}
                  transition={{ repeat: Infinity, duration: 2.2, delay: 0.3, ease: 'easeInOut' }}
                  className="absolute w-32 h-32 rounded-full bg-emerald-500/10 -z-10"
                />
              </>
            )}

            <button
              onClick={toggleListening}
              className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer ${
                isListening
                  ? 'bg-emerald-500 text-white shadow-emerald-500/30 hover:bg-emerald-600'
                  : 'bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-white/20'
              }`}
              title={isListening ? 'Tap to pause microphone' : 'Tap to speak'}
            >
              {isListening ? <Mic className="w-7 h-7" /> : <MicOff className="w-7 h-7" />}
            </button>
          </div>

          <div className="text-[13px] font-[700] text-slate-900 dark:text-slate-100 mb-1">
            {isListening
              ? language === 'en'
                ? 'Listening to clinical voice commands...'
                : 'Mendengarkan instruksi klinis...'
              : language === 'en'
              ? 'Microphone Paused. Tap mic to listen.'
              : 'Mikrofon Dijeda. Ketuk mikrofon untuk bicara.'}
          </div>

          {/* Real-time Subtitle HUD (High Visibility) */}
          <div className="min-h-[44px] flex items-center justify-center px-4 max-w-lg">
            {interimTranscript ? (
              <span className="text-[16px] font-[600] text-emerald-600 dark:text-emerald-400 italic animate-pulse">
                &ldquo;{interimTranscript}&rdquo;
              </span>
            ) : transcript ? (
              <span className="text-[16px] font-[700] text-slate-800 dark:text-slate-200">
                &ldquo;{transcript}&rdquo;
              </span>
            ) : (
              <span className="text-[12px] text-slate-400 dark:text-slate-500">
                {language === 'en'
                  ? 'Try: "Push dose epi", "Propofol 70 kg", "LAST protocol", or "Open POCUS"'
                  : 'Coba: "Push dose epi", "Dosis propofol 70 kg", "Protokol LAST", atau "Buka POCUS"'}
              </span>
            )}
          </div>

          {error && (
            <div className="mt-2 text-[11px] font-[600] text-rose-500 dark:text-rose-400 bg-rose-500/10 px-3 py-1 rounded-lg border border-rose-500/20 max-w-md">
              {error}
            </div>
          )}
        </div>

        {/* Content Body: Matched Result Card */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <AnimatePresence mode="wait">
            {matchedIntent ? (
              <motion.div
                key={matchedIntent.titleEn}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-3"
              >
                {/* Look-Alike / Sound-Alike Alert Banner if Detected */}
                {matchedIntent.soundAlikeAlert && (
                  <div className="p-3.5 rounded-2xl bg-amber-500/15 border border-amber-500/40 flex items-start gap-3">
                    <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <div className="text-[12px] text-amber-900 dark:text-amber-200 leading-snug">
                      <div className="font-[800] uppercase tracking-wider text-[11px] text-amber-700 dark:text-amber-400 mb-0.5">
                        ⚠️ High-Alert Sound-Alike Safeguard
                      </div>
                      {language === 'en'
                        ? matchedIntent.soundAlikeAlert.warningEn
                        : matchedIntent.soundAlikeAlert.warningId}
                    </div>
                  </div>
                )}

                {/* Giant Bedside Clinical Card (Legible from 2m away) */}
                <div className="p-5 rounded-2xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 shadow-inner">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-md text-[10px] font-[800] uppercase tracking-wider ${
                        matchedIntent.badge.color === 'rose'
                          ? 'bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-500/30'
                          : matchedIntent.badge.color === 'amber'
                          ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30'
                          : matchedIntent.badge.color === 'emerald'
                          ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                          : 'bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-500/30'
                      }`}
                    >
                      {matchedIntent.badge.label}
                    </span>

                    <button
                      onClick={() => (isSpeaking ? cancelSpeech() : speak())}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-[700] bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:text-blue-600 transition-colors"
                      title="Read aloud"
                    >
                      {isSpeaking ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
                          <span>Stop Audio</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5 text-blue-500" />
                          <span>Read Aloud</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Primary Title (Large for sterile fields) */}
                  <h3 className="text-[20px] sm:text-[22px] font-[900] text-slate-900 dark:text-white leading-tight mb-1">
                    {language === 'en' ? matchedIntent.titleEn : matchedIntent.titleId}
                  </h3>

                  {/* Subtitle / Details */}
                  <p className="text-[13px] sm:text-[14px] text-slate-600 dark:text-slate-300 font-[500] leading-relaxed mb-3">
                    {language === 'en' ? matchedIntent.subtitleEn : matchedIntent.subtitleId}
                  </p>

                  {/* Drug Preparation or Clinical Pearls */}
                  {matchedIntent.details?.preparation && (
                    <div className="mt-3 p-3 rounded-xl bg-slate-200/60 dark:bg-black/30 border border-slate-300/60 dark:border-white/5 text-[12px] text-slate-700 dark:text-slate-300 space-y-1">
                      <div className="font-[800] uppercase text-[10px] tracking-wider text-slate-500">
                        Preparation & Dilution
                      </div>
                      <div>{matchedIntent.details.preparation}</div>
                    </div>
                  )}

                  {/* Action Button */}
                  <div className="mt-4 flex flex-wrap items-center gap-2.5">
                    {matchedIntent.details?.actionHref && (
                      <button
                        onClick={handleExecuteAction}
                        className="btn-primary px-4 py-2 text-[13px] font-[700] flex items-center gap-2 rounded-xl"
                      >
                        <span>
                          {matchedIntent.type === 'NAVIGATION'
                            ? language === 'en'
                              ? 'Go to Module'
                              : 'Buka Modul'
                            : language === 'en'
                            ? 'Open Full Calculator'
                            : 'Buka Kalkulator Lengkap'}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}

                    {matchedIntent.type === 'ACTIVE_CASE' && (
                      <button
                        onClick={handleExecuteAction}
                        className="btn-primary px-4 py-2 text-[13px] font-[700] flex items-center gap-2 rounded-xl"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{language === 'en' ? 'Apply to Active Case' : 'Terapkan ke Data Pasien'}</span>
                      </button>
                    )}

                    {matchedIntent.type === 'THEME' && (
                      <button
                        onClick={handleExecuteAction}
                        className="btn-primary px-4 py-2 text-[13px] font-[700] flex items-center gap-2 rounded-xl"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{language === 'en' ? 'Apply Theme' : 'Terapkan Tema'}</span>
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="text-center py-4 space-y-3">
                <div className="text-[12px] font-[700] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {language === 'en' ? 'Quick Clinical Voice Queries' : 'Pintasan Pertanyaan Suara'}
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {sampleVoicePrompts.map((p) => (
                    <button
                      key={p.label}
                      onClick={() => {
                        const intent = processQuery(p.query);
                        const text = language === 'en' ? intent.speakTextEn : intent.speakTextId;
                        speak(text);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-[12px] font-[600] text-slate-700 dark:text-slate-300 transition-colors"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Fallback Input (For environments without working mic) */}
        <div className="p-3 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/30">
          <form onSubmit={handleManualSubmit} className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={manualText}
                onChange={(e) => setManualText(e.target.value)}
                placeholder={
                  language === 'en'
                    ? 'Or type clinical query (e.g. "propofol 70 kg", "push dose epi")...'
                    : 'Atau ketik instruksi klinis (misal: "propofol 70 kg", "push dose epi")...'
                }
                className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl pl-9 pr-3 py-2 text-[12px] text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              disabled={!manualText.trim()}
              className="p-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white transition-colors"
              title="Submit query"
            >
              <CornerDownLeft className="w-4 h-4" />
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
