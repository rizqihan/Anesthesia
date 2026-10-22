'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAppStore } from '@/store/appStore';
import {
  Heart,
  Play,
  Pause,
  RotateCcw,
  Zap,
  Volume2,
  VolumeX,
  AlertTriangle,
  Clock,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Activity,
  Syringe,
  FileText,
  ShieldAlert,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { HS_AND_TS_LIST, HsAndTsItem } from '@/lib/emergencyProtocols';

interface CodeEvent {
  id: string;
  timestamp: string; // HH:MM:SS
  elapsedSec: number;
  type: 'cpr' | 'shock' | 'epi' | 'amio' | 'rhythm' | 'ht' | 'rosc' | 'note';
  text: string;
}

export default function ACLSCycleTimer() {
  const { language, activeCase } = useAppStore();
  const patientWeight = parseFloat(activeCase.patientWeight) || 70;
  const isPediatric = patientWeight < 40;

  // Resuscitation cycle state
  const [isRunning, setIsRunning] = useState(false);
  const [cycleSecondsLeft, setCycleSecondsLeft] = useState(120); // 2-minute CPR cycle (120s)
  const [cycleCount, setCycleCount] = useState(1);
  const [totalElapsedSeconds, setTotalElapsedSeconds] = useState(0);
  const [rhythmMode, setRhythmMode] = useState<'shockable' | 'non_shockable'>('shockable');

  // Metronome state (110 BPM)
  const [isMetronomeActive, setIsMetronomeActive] = useState(false);
  const [metronomeBeatFlash, setMetronomeBeatFlash] = useState(false);

  // Drugs & Counters
  const [shockCount, setShockCount] = useState(0);
  const [epiDoseCount, setEpiDoseCount] = useState(0);
  const [lastEpiElapsedSec, setLastEpiElapsedSec] = useState<number | null>(null);
  const [amiodaroneDoseCount, setAmiodaroneDoseCount] = useState(0);
  const [isRoscAchieved, setIsRoscAchieved] = useState(false);

  // Hs & Ts checklist state
  const [checkedHtIds, setCheckedHtIds] = useState<Record<string, boolean>>({});
  const [expandedHtId, setExpandedHtId] = useState<string | null>(null);

  // Event Log & Copy state
  const [events, setEvents] = useState<CodeEvent[]>([]);
  const [copiedLog, setCopiedLog] = useState(false);

  // Web Audio Context Reference
  const audioCtxRef = useRef<AudioContext | null>(null);
  const metronomeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Format seconds to MM:SS
  const formatTime = (totalSec: number) => {
    const mins = Math.floor(Math.abs(totalSec) / 60);
    const secs = Math.abs(totalSec) % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Get current wall-clock time string
  const getWallClockTime = () => {
    const now = new Date();
    return now.toTimeString().split(' ')[0]; // HH:MM:SS
  };

  // Helper to add an event to the audit log
  const logEvent = useCallback(
    (type: CodeEvent['type'], text: string) => {
      const newEv: CodeEvent = {
        id: Math.random().toString(36).substring(2, 9),
        timestamp: getWallClockTime(),
        elapsedSec: totalElapsedSeconds,
        type,
        text,
      };
      setEvents((prev) => [newEv, ...prev]);
    },
    [totalElapsedSeconds]
  );

  // Initialize or resume AudioContext
  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtxClass();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  // Web Audio Sine Beep Generator
  const playSineBeep = useCallback(
    (freq = 880, duration = 0.05, volume = 0.25) => {
      try {
        const ctx = getAudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gain.gain.setValueAtTime(volume, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + duration);
      } catch {
        // Audio error ignored safely
      }
    },
    [getAudioContext]
  );

  // Play urgent alarm when cycle reaches 00:00
  const playCycleAlarm = useCallback(() => {
    try {
      const ctx = getAudioContext();
      [0, 0.18, 0.36].forEach((delay, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(index === 2 ? 1175 : 880, ctx.currentTime + delay);
        gain.gain.setValueAtTime(0.35, ctx.currentTime + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + delay);
        osc.stop(ctx.currentTime + delay + 0.12);
      });
    } catch {
      // Audio error ignored
    }
  }, [getAudioContext]);

  // Metronome loop (110 BPM = 545.45 ms interval)
  useEffect(() => {
    if (isMetronomeActive) {
      const intervalMs = Math.round(60000 / 110); // ~545ms
      metronomeTimerRef.current = setInterval(() => {
        playSineBeep(880, 0.04, 0.2);
        setMetronomeBeatFlash(true);
        setTimeout(() => setMetronomeBeatFlash(false), 90);
      }, intervalMs);
    } else {
      if (metronomeTimerRef.current) {
        clearInterval(metronomeTimerRef.current);
        metronomeTimerRef.current = null;
      }
    }
    return () => {
      if (metronomeTimerRef.current) {
        clearInterval(metronomeTimerRef.current);
      }
    };
  }, [isMetronomeActive, playSineBeep]);

  // 1-second interval timer for CPR cycle and total elapsed time
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isRunning) {
      timer = setInterval(() => {
        setTotalElapsedSeconds((prev) => prev + 1);
        setCycleSecondsLeft((prev) => {
          if (prev <= 1) {
            playCycleAlarm();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, playCycleAlarm]);

  // Handle Start / Pause
  const toggleRunning = () => {
    if (!isRunning) {
      getAudioContext();
      if (totalElapsedSeconds === 0) {
        logEvent('cpr', `CPR Started (Cycle #1, Target 110 bpm)`);
      }
      setIsRunning(true);
    } else {
      setIsRunning(false);
    }
  };

  // Deliver Shock and Restart 2-Min Cycle
  const handleDeliverShock = () => {
    const nextShock = shockCount + 1;
    const energy = isPediatric
      ? `${Math.min(200, Math.round(patientWeight * 2))} J (2 J/kg initial)`
      : '200 J Biphasic';
    setShockCount(nextShock);
    logEvent('shock', `Defibrillation #${nextShock} Delivered: ${energy}`);
    // Reset cycle and resume
    setCycleSecondsLeft(120);
    setCycleCount((prev) => prev + 1);
    setIsRunning(true);
    logEvent('cpr', `Resumed CPR immediately (Cycle #${cycleCount + 1})`);
  };

  // Non-shockable check & Restart 2-Min Cycle
  const handleContinueNonShockable = () => {
    logEvent('rhythm', `Rhythm Check: Non-Shockable (PEA/Asystole) — No shock indicated`);
    setCycleSecondsLeft(120);
    setCycleCount((prev) => prev + 1);
    setIsRunning(true);
    logEvent('cpr', `Resumed CPR immediately (Cycle #${cycleCount + 1})`);
  };

  // Log Epinephrine Administration
  const handleGiveEpi = () => {
    const nextDose = epiDoseCount + 1;
    setEpiDoseCount(nextDose);
    setLastEpiElapsedSec(totalElapsedSeconds);
    const doseText = isPediatric
      ? `${Math.min(1.0, +(patientWeight * 0.01).toFixed(2))} mg IV/IO (0.01 mg/kg)`
      : '1.0 mg IV/IO (1:10,000)';
    logEvent('epi', `Epinephrine Dose #${nextDose} (${doseText}) administered with 20mL NS flush`);
  };

  // Log Amiodarone Administration
  const handleGiveAmio = () => {
    const nextDose = amiodaroneDoseCount + 1;
    setAmiodaroneDoseCount(nextDose);
    let doseText = '';
    if (isPediatric) {
      doseText = `${Math.min(300, Math.round(patientWeight * 5))} mg IV/IO (5 mg/kg)`;
    } else {
      doseText = nextDose === 1 ? '300 mg IV Bolus (Dose 1)' : '150 mg IV Bolus (Dose 2)';
    }
    logEvent('amio', `Amiodarone Dose #${nextDose}: ${doseText}`);
  };

  // ROSC Toggle
  const handleRosc = () => {
    setIsRoscAchieved(true);
    setIsRunning(false);
    setIsMetronomeActive(false);
    logEvent('rosc', `ROSC Confirmed! Return of spontaneous circulation achieved at ${formatTime(totalElapsedSeconds)}`);
  };

  // Reset Everything
  const handleFullReset = () => {
    setIsRunning(false);
    setIsMetronomeActive(false);
    setCycleSecondsLeft(120);
    setCycleCount(1);
    setTotalElapsedSeconds(0);
    setShockCount(0);
    setEpiDoseCount(0);
    setLastEpiElapsedSec(null);
    setAmiodaroneDoseCount(0);
    setIsRoscAchieved(false);
    setCheckedHtIds({});
    logEvent('note', 'ACLS CPR Resuscitation Session Reset');
  };

  // Toggle Hs & Ts item
  const toggleHtItem = (item: HsAndTsItem) => {
    const updated = !checkedHtIds[item.id];
    setCheckedHtIds((prev) => ({ ...prev, [item.id]: updated }));
    if (updated) {
      logEvent('ht', `Addressed Reversible Cause: ${item.name} (${item.category})`);
    }
  };

  // Copy full audit log
  const handleCopyLog = () => {
    const lines = [
      `ACLS RESUSCITATION EVENT AUDIT LOG`,
      `Date/Time: ${new Date().toLocaleString()}`,
      `Patient Weight: ${patientWeight} kg (${isPediatric ? 'Pediatric' : 'Adult'})`,
      `Total Arrest Time: ${formatTime(totalElapsedSeconds)}`,
      `CPR Cycles Completed: ${cycleCount}`,
      `Shocks Delivered: ${shockCount}`,
      `Epinephrine Doses: ${epiDoseCount}`,
      `Amiodarone Doses: ${amiodaroneDoseCount}`,
      `ROSC Status: ${isRoscAchieved ? 'ACHIEVED' : 'In Progress / Terminated'}`,
      `----------------------------------------`,
      `CHRONOLOGICAL EVENT LOG:`,
      ...events.map(
        (e) => `[${e.timestamp} | +${formatTime(e.elapsedSec)}] ${e.text}`
      ),
    ];
    navigator.clipboard.writeText(lines.join('\n'));
    setCopiedLog(true);
    setTimeout(() => setCopiedLog(false), 2000);
  };

  // SVG Circular countdown geometry
  const radius = 86;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (cycleSecondsLeft / 120) * circumference;
  const isAlarm00 = cycleSecondsLeft === 0;

  // Epi interval calculation
  const epiSecondsSince = lastEpiElapsedSec !== null ? totalElapsedSeconds - lastEpiElapsedSec : null;
  const isEpiDue = epiSecondsSince !== null && epiSecondsSince >= 180; // >= 3 minutes

  const addressedHtCount = Object.values(checkedHtIds).filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* CPR Control Center & Circular Ring */}
      <div className="p-6 rounded-2xl bg-[#0e1424] border border-slate-800 shadow-xl relative overflow-hidden">
        {/* Top bar with Cycle Number & Metronome Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 font-mono text-[13px] font-[700]">
              {language === 'en' ? 'CYCLE' : 'SIKLUS'} #{cycleCount}
            </div>
            <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[13px]">
              <Clock className="w-4 h-4 text-blue-400" />
              <span>{language === 'en' ? 'Elapsed' : 'Total'}:</span>
              <strong className="text-slate-100 tabular-nums">{formatTime(totalElapsedSeconds)}</strong>
            </div>
          </div>

          {/* Metronome 110 BPM Control */}
          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                getAudioContext();
                setIsMetronomeActive(!isMetronomeActive);
              }}
              className={`flex items-center gap-2 px-3.5 py-2 min-h-[44px] rounded-xl text-[12px] font-[700] transition-colors border ${
                isMetronomeActive
                  ? 'bg-rose-600/30 border-rose-500/60 text-rose-200'
                  : 'bg-slate-900/80 border-slate-700/80 text-slate-400 hover:text-slate-200'
              }`}
            >
              {isMetronomeActive ? (
                <Volume2 className="w-4 h-4 text-rose-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-500" />
              )}
              <span>110 BPM {isMetronomeActive ? 'ON' : 'OFF'}</span>
              <span
                className={`w-2 h-2 rounded-full transition-opacity ${
                  metronomeBeatFlash ? 'bg-rose-400 opacity-100 scale-125' : 'bg-slate-600 opacity-40'
                }`}
              />
            </motion.button>
          </div>
        </div>

        {/* Circular Ring Timer + Main Action Cluster */}
        <div className="flex flex-col md:flex-row items-center justify-around gap-6 my-2">
          {/* Circular Countdown Ring */}
          <div className="relative w-56 h-56 flex items-center justify-center shrink-0">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 200 200">
              {/* Background Ring Track */}
              <circle
                cx="100"
                cy="100"
                r={radius}
                className="stroke-slate-800"
                strokeWidth="12"
                fill="transparent"
              />
              {/* Dynamic Countdown Progress */}
              <circle
                cx="100"
                cy="100"
                r={radius}
                className={`transition-all duration-1000 ease-linear ${
                  isAlarm00
                    ? 'stroke-rose-500 animate-pulse'
                    : cycleSecondsLeft <= 20
                    ? 'stroke-amber-400'
                    : 'stroke-blue-500'
                }`}
                strokeWidth="12"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            {/* Inner Center Display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
              <span className="text-[11px] font-[700] uppercase tracking-wider text-slate-400">
                {isAlarm00 ? 'RHYTHM CHECK' : '2-MIN CYCLE'}
              </span>
              <span
                className={`text-[42px] font-[900] font-mono tabular-nums leading-none my-1 tracking-tight ${
                  isAlarm00 ? 'text-rose-400' : 'text-slate-100'
                }`}
              >
                {formatTime(cycleSecondsLeft)}
              </span>
              <span className="text-[11px] font-[600] text-slate-400">
                {cycleSecondsLeft > 0 ? 'Compressions @ 110/min' : 'STOP CPR NOW'}
              </span>
            </div>
          </div>

          {/* Quick Primary Controls */}
          <div className="flex flex-col gap-3 w-full max-w-xs">
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={toggleRunning}
              className={`w-full min-h-[48px] px-5 py-3 rounded-xl font-[800] text-[15px] flex items-center justify-center gap-2.5 transition-all shadow-md ${
                isRunning
                  ? 'bg-amber-600/30 border border-amber-500/50 text-amber-200 hover:bg-amber-600/40'
                  : 'bg-blue-600 hover:bg-blue-500 text-white'
              }`}
            >
              {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
              <span>{isRunning ? 'Pause CPR Timer' : 'Start 2-Min CPR'}</span>
            </motion.button>

            <div className="grid grid-cols-2 gap-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCycleSecondsLeft(120);
                  logEvent('cpr', `CPR Cycle #${cycleCount} restarted to 02:00`);
                }}
                className="min-h-[44px] px-3 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-slate-300 hover:text-white hover:bg-slate-800 text-[12px] font-[700] flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4 text-slate-400" />
                <span>Reset Cycle</span>
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleRosc}
                className="min-h-[44px] px-3 py-2 rounded-xl bg-emerald-950/40 border border-emerald-500/50 text-emerald-300 hover:bg-emerald-900/50 text-[12px] font-[800] flex items-center justify-center gap-1.5"
              >
                <Activity className="w-4 h-4 text-emerald-400" />
                <span>ROSC Achieved!</span>
              </motion.button>
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleFullReset}
              className="text-slate-500 hover:text-slate-400 text-[11px] font-[600] py-1 text-center"
            >
              Reset Full Code Arrest Session
            </motion.button>
          </div>
        </div>

        {/* 00:00 Flash Alarm Banner */}
        <AnimatePresence>
          {isAlarm00 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mt-6 p-4 rounded-xl bg-rose-950/70 border border-rose-500 text-rose-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-pulse shadow-lg"
            >
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-rose-400 shrink-0" />
                <div>
                  <h4 className="font-[900] text-[16px] text-rose-100">
                    {language === 'en'
                      ? 'STOP CPR! Check Rhythm & Pulse (< 10 seconds)'
                      : 'HENTIKAN RJP! Cek Irama & Nadi (< 10 detik)'}
                  </h4>
                  <p className="text-[12px] text-rose-200/80">
                    {language === 'en'
                      ? 'If organized rhythm, check carotid pulse. Switch compressor role now!'
                      : 'Jika irama teratur, raba nadi karotis. Ganti penolong kompresi sekarang!'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDeliverShock}
                  className="min-h-[44px] px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-[800] text-[13px] flex items-center gap-1.5 shadow-md"
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>Shock Delivered</span>
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleContinueNonShockable}
                  className="min-h-[44px] px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:bg-slate-800 font-[700] text-[13px]"
                >
                  <span>Non-Shockable</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Branching Decision Tree: Shockable vs Non-Shockable */}
      <div className="p-6 rounded-2xl bg-[#0e1424] border border-slate-800 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-[16px] font-[800] text-slate-100">
              {language === 'en' ? 'Branching ACLS Decision Tree' : 'Pohon Keputusan ACLS'}
            </h3>
            <p className="text-[12px] text-slate-400">
              {language === 'en'
                ? 'Select current rhythm to guide defib energy, drug sequence, and timing'
                : 'Pilih irama saat ini untuk panduan energi kejut, urutan obat, dan waktu'}
            </p>
          </div>

          {/* Rhythm Selector Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setRhythmMode('shockable')}
              className={`min-h-[44px] px-4 py-2 rounded-xl text-[12px] font-[800] transition-colors ${
                rhythmMode === 'shockable'
                  ? 'bg-rose-600 text-white'
                  : 'bg-slate-900 border border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
            >
              VF / Pulseless VT (Shockable)
            </button>
            <button
              onClick={() => setRhythmMode('non_shockable')}
              className={`min-h-[44px] px-4 py-2 rounded-xl text-[12px] font-[800] transition-colors ${
                rhythmMode === 'non_shockable'
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-900 border border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
            >
              PEA / Asystole (Non-Shockable)
            </button>
          </div>
        </div>

        {/* Content for Shockable Protocol */}
        {rhythmMode === 'shockable' ? (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-[11px] font-[700] uppercase tracking-wider text-rose-400">
                  Defibrillation Energy
                </div>
                <div className="text-[20px] font-[900] font-mono tabular-nums text-slate-100">
                  {isPediatric
                    ? `${Math.min(200, Math.round(patientWeight * 2))} J (Initial 2 J/kg) -> ${Math.min(200, Math.round(patientWeight * 4))} J (4 J/kg)`
                    : '200 J Biphasic (or manufacturer maximum)'}
                </div>
                <p className="text-[12px] text-slate-400">
                  Deliver shock immediately. Resume CPR without pausing to check pulse or rhythm.
                </p>
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleDeliverShock}
                className="min-h-[44px] px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-[13px] font-[800] flex items-center gap-2 shrink-0"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>Log Shock #{shockCount + 1}</span>
              </motion.button>
            </div>

            {/* Drug Sequence Steps */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Epinephrine Step Card */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-[800] text-slate-200">
                    Epinephrine (after Shock #2)
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/10 text-blue-300 border border-blue-500/20">
                    q3–5 min
                  </span>
                </div>
                <div className="text-[18px] font-[900] font-mono tabular-nums text-blue-400">
                  {isPediatric
                    ? `${Math.min(1.0, +(patientWeight * 0.01).toFixed(2))} mg IV/IO (0.01 mg/kg)`
                    : '1.0 mg IV/IO (1:10,000)'}
                </div>
                <p className="text-[12px] text-slate-400">
                  {lastEpiElapsedSec !== null ? (
                    <>
                      Last given: <strong className="text-slate-200 font-mono">{formatTime(epiSecondsSince || 0)} ago</strong>
                      {isEpiDue && (
                        <span className="ml-2 text-rose-400 font-[800] animate-pulse">
                          (DUE NOW!)
                        </span>
                      )}
                    </>
                  ) : (
                    'Not administered yet (Give after 2nd shock)'
                  )}
                </p>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleGiveEpi}
                  className="w-full min-h-[44px] mt-2 px-3 py-2 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-200 hover:bg-blue-600/30 text-[12px] font-[800] flex items-center justify-center gap-1.5"
                >
                  <Syringe className="w-3.5 h-3.5" />
                  <span>Log Epinephrine Dose #{epiDoseCount + 1}</span>
                </motion.button>
              </div>

              {/* Amiodarone Step Card */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-[800] text-slate-200">
                    Amiodarone (after Shock #3)
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/20">
                    Refractory VF
                  </span>
                </div>
                <div className="text-[18px] font-[900] font-mono tabular-nums text-amber-400">
                  {isPediatric
                    ? `${Math.min(300, Math.round(patientWeight * 5))} mg IV/IO (5 mg/kg)`
                    : amiodaroneDoseCount === 0
                    ? '300 mg IV Bolus (Dose 1)'
                    : '150 mg IV Bolus (Dose 2)'}
                </div>
                <p className="text-[12px] text-slate-400">
                  First dose 300 mg after 3rd shock. Second dose 150 mg after 5th shock if VF persists. (Alt: Lidocaine 1–1.5 mg/kg).
                </p>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleGiveAmio}
                  className="w-full min-h-[44px] mt-2 px-3 py-2 rounded-xl bg-amber-600/20 border border-amber-500/40 text-amber-200 hover:bg-amber-600/30 text-[12px] font-[800] flex items-center justify-center gap-1.5"
                >
                  <Syringe className="w-3.5 h-3.5" />
                  <span>Log Amiodarone Dose #{amiodaroneDoseCount + 1}</span>
                </motion.button>
              </div>
            </div>
          </div>
        ) : (
          /* Content for Non-Shockable Protocol */
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 space-y-3">
              <div className="flex items-center gap-2 text-amber-300 font-[800] text-[14px]">
                <ShieldAlert className="w-5 h-5 text-amber-400" />
                <span>Immediate Epinephrine & Reversible Causes Focus</span>
              </div>
              <p className="text-[12px] text-slate-300 leading-relaxed">
                In Asystole or PEA, give <strong>Epinephrine 1 mg IV/IO immediately</strong> as soon as feasible. Do NOT shock. High-quality CPR 2-minute cycles, check rhythm every 2 minutes. The primary determinant of survival is finding and fixing the underlying cause (Hs &amp; Ts).
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleGiveEpi}
                  className="min-h-[44px] px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-[800] text-[13px] flex items-center gap-2"
                >
                  <Syringe className="w-4 h-4" />
                  <span>Give Immediate Epinephrine 1 mg (Dose #{epiDoseCount + 1})</span>
                </motion.button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Hs & Ts Checklist */}
      <div className="p-6 rounded-2xl bg-[#0e1424] border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-[16px] font-[800] text-slate-100">
                {language === 'en' ? 'Reversible Causes (Hs & Ts)' : 'Penyebab Reversibel (5H & 5T)'}
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-[700] bg-blue-500/10 text-blue-300 border border-blue-500/20">
                {addressedHtCount} / {HS_AND_TS_LIST.length} addressed
              </span>
            </div>
            <p className="text-[12px] text-slate-400">
              Actively interrogate and exclude each reversible cause during resuscitation
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {HS_AND_TS_LIST.map((item) => {
            const isChecked = !!checkedHtIds[item.id];
            const isExpanded = expandedHtId === item.id;
            return (
              <div
                key={item.id}
                className={`p-3.5 rounded-xl border transition-all ${
                  isChecked
                    ? 'bg-blue-950/20 border-blue-500/40'
                    : 'bg-slate-900/60 border-slate-800'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <label className="flex items-start gap-3 cursor-pointer select-none grow">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleHtItem(item)}
                      className="mt-0.5 w-4 h-4 rounded text-blue-600 focus:ring-0 bg-slate-950 border-slate-700 cursor-pointer"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-[10px] font-mono font-[800] px-1.5 py-0.2 rounded ${
                            item.category === 'H'
                              ? 'bg-rose-500/20 text-rose-300'
                              : 'bg-cyan-500/20 text-cyan-300'
                          }`}
                        >
                          {item.category}
                        </span>
                        <span className="text-[13px] font-[700] text-slate-200">
                          {item.name}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {item.clinicalSign}
                      </p>
                    </div>
                  </label>

                  <button
                    onClick={() => setExpandedHtId(isExpanded ? null : item.id)}
                    className="p-1 rounded text-slate-400 hover:text-slate-200"
                    aria-label="Expand details"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {/* Expanded Action Tips */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 pt-3 border-t border-slate-800 text-[11px] text-slate-300 space-y-1.5"
                    >
                      <div className="font-[700] text-blue-300">Action Plan:</div>
                      {item.keyInterventions.map((k, idx) => (
                        <div key={idx} className="flex items-start gap-1.5">
                          <span className="text-blue-400">•</span>
                          <span>{k}</span>
                        </div>
                      ))}
                      <div className="p-2 rounded bg-slate-950/80 text-slate-400 font-mono text-[10px] mt-2">
                        {item.bedsideTips}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* Timestamped Event Audit Log */}
      <div className="p-6 rounded-2xl bg-[#0e1424] border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-400" />
            <h3 className="text-[15px] font-[800] text-slate-100">
              {language === 'en' ? 'Resuscitation Audit Log' : 'Catatan Audit Resusitasi'}
            </h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300">
              {events.length} events
            </span>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleCopyLog}
            className="flex items-center gap-1.5 px-3 py-1.5 min-h-[44px] rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white text-[12px] font-[700]"
          >
            {copiedLog ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Audit Log</span>
              </>
            )}
          </motion.button>
        </div>

        {events.length === 0 ? (
          <div className="py-8 text-center text-slate-500 text-[13px]">
            No resuscitation events logged yet. Start CPR or log actions above to begin recording timestamped events.
          </div>
        ) : (
          <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
            {events.map((ev) => (
              <div
                key={ev.id}
                className="flex items-start justify-between gap-3 p-2.5 rounded-lg bg-slate-900/50 border border-slate-800/80 text-[12px]"
              >
                <div className="flex items-start gap-2.5">
                  <span className="font-mono text-[11px] text-blue-400 shrink-0 tabular-nums">
                    +{formatTime(ev.elapsedSec)}
                  </span>
                  <span className="text-slate-200">{ev.text}</span>
                </div>
                <span className="font-mono text-[10px] text-slate-500 shrink-0">
                  {ev.timestamp}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
