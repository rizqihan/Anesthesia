'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/store/appStore';
import { 
  Activity, ArrowRight, ShieldCheck, Zap, WifiOff, Heart, Syringe, 
  Calculator, Pill, BookOpen, Stethoscope, AlertOctagon, CheckCircle2,
  Sparkles, Lock, Cpu, Database, ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';

export default function LandingPage() {
  const { language } = useAppStore();
  const [demoWeight, setDemoWeight] = useState(70);

  // Live computed demo values
  const propofolDose = (demoWeight * 2.0).toFixed(0);
  const rocuroniumDose = (demoWeight * 0.6).toFixed(0);
  const fentanylDose = (demoWeight * 2.0).toFixed(0);
  const sugammadexDose = (demoWeight * 2.0).toFixed(0);
  const sugammadexEmergency = (demoWeight * 16.0).toFixed(0);
  const fluidRate = demoWeight <= 10 
    ? demoWeight * 4 
    : demoWeight <= 20 
    ? 40 + (demoWeight - 10) * 2 
    : 60 + (demoWeight - 20) * 1;

  return (
    <div className="space-y-24 py-12 md:py-20">
      {/* ─── HERO SECTION ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto space-y-6"
        >
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-300 text-[12px] font-[700]">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>
              {language === 'en'
                ? 'Precision Clinical Decision Support for Acute Care & Anesthesia'
                : 'Dukungan Keputusan Klinis Presisi untuk Anestesi & Perawatan Akut'}
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-[36px] sm:text-[52px] md:text-[62px] font-[900] tracking-tight text-white leading-[1.08]">
            {language === 'en' ? (
              <>
                Engineered for <span className="text-blue-400">Zero Latency</span> in the Operating Room.
              </>
            ) : (
              <>
                Dirancang untuk <span className="text-blue-400">Nol Latensi</span> di Kamar Operasi.
              </>
            )}
          </h1>

          {/* Subtitle */}
          <p className="text-[16px] sm:text-[19px] text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {language === 'en'
              ? '100% offline-first clinical calculations, 12-lead ECG waveform simulation, weight-calculated crisis push doses, and AI-assisted differential diagnosis for MDs and anesthesiologists.'
              : 'Perhitungan klinis 100% offline-first, simulasi gelombang EKG 12-lead, dosis darurat krisis berbasis berat badan, dan diagnosis banding berbantuan AI untuk dokter spesialis dan residen.'}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
            <Link href="/dashboard" className="w-full sm:w-auto">
              <button className="btn-primary w-full sm:w-auto text-[15px] font-[800] px-8 py-3.5 rounded-xl flex items-center justify-center gap-2.5 shadow-xl shadow-blue-600/20">
                <span>{language === 'en' ? 'Launch Clinical Suite' : 'Buka Dasbor Klinis'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>

            <Link href="/emergency" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-rose-600/20 border border-rose-500/40 hover:bg-rose-600/30 text-rose-200 transition-all text-[15px] font-[700] flex items-center justify-center gap-2">
                <AlertOctagon className="w-4 h-4 text-rose-400" />
                <span>{language === 'en' ? 'OR Crisis Card' : 'Kartu Krisis Anestesi'}</span>
              </button>
            </Link>

            <Link href="/ecg" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] text-slate-300 transition-all text-[15px] font-[600] flex items-center justify-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                <span>{language === 'en' ? '12-Lead Simulator' : 'Simulator EKG'}</span>
              </button>
            </Link>
          </div>

          {/* Trust badges */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-[12px] text-slate-400 font-[500]">
            <span className="flex items-center gap-1.5">
              <WifiOff className="w-4 h-4 text-emerald-400" />
              {language === 'en' ? 'Full Offline PWA' : 'Bekerja Tanpa Internet'}
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              {language === 'en' ? 'Safety Dosage Bounds' : 'Batas Aman Dosis Terverifikasi'}
            </span>
            <span className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-amber-400" />
              {language === 'en' ? 'Local IndexedDB Storage' : 'Penyimpanan Lokal Privat'}
            </span>
          </div>
        </motion.div>
      </section>

      {/* ─── INTERACTIVE LIVE HUD TEASER ─── */}
      <section id="demo" className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-[#0c1424] border border-white/10 p-6 md:p-10 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-8 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-[800] bg-blue-500/20 text-blue-300 border border-blue-500/30 uppercase">
                  Interactive Live Preview
                </span>
                <span className="text-[12px] text-emerald-400 flex items-center gap-1 font-[600]">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Realtime Dosing Engine
                </span>
              </div>
              <h2 className="text-[24px] md:text-[30px] font-[900] text-slate-100 tracking-tight">
                {language === 'en' ? 'Try the Dosing & Rhythm Engine' : 'Coba Kalkulator Dosis & Irama Langsung'}
              </h2>
              <p className="text-[13px] text-slate-400 mt-1 max-w-xl">
                {language === 'en'
                  ? 'Drag the patient weight slider to observe instant induction doses, reversal options, and fluid maintenance rates.'
                  : 'Geser slider berat badan pasien untuk melihat dosis induksi, pemulihan, dan cairan rumatan secara seketika.'}
              </p>
            </div>

            {/* Slider control */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 w-full lg:w-80">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[11px] font-[700] text-slate-400 uppercase tracking-wider">
                  {language === 'en' ? 'Patient Weight' : 'Berat Badan Pasien'}
                </span>
                <span className="font-mono font-[900] text-[20px] text-blue-400">
                  {demoWeight} <span className="text-[14px] text-slate-400">kg</span>
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="120"
                value={demoWeight}
                onChange={(e) => setDemoWeight(Number(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>10 kg (Peds)</span>
                <span>70 kg (Standard)</span>
                <span>120 kg (Bariatric)</span>
              </div>
            </div>
          </div>

          {/* Computed Output Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 pt-8">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
              <div className="text-[10px] font-[700] text-slate-400 uppercase tracking-wider mb-1">Propofol (Induction)</div>
              <div className="text-[26px] font-[900] font-mono text-blue-300">{propofolDose} mg</div>
              <div className="text-[10px] text-slate-500 font-mono mt-1">2.0 mg/kg IV</div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
              <div className="text-[10px] font-[700] text-slate-400 uppercase tracking-wider mb-1">Rocuronium (Intubation)</div>
              <div className="text-[26px] font-[900] font-mono text-cyan-300">{rocuroniumDose} mg</div>
              <div className="text-[10px] text-slate-500 font-mono mt-1">0.6 mg/kg IV</div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
              <div className="text-[10px] font-[700] text-slate-400 uppercase tracking-wider mb-1">Fentanyl (Analgesia)</div>
              <div className="text-[26px] font-[900] font-mono text-blue-300">{fentanylDose} mcg</div>
              <div className="text-[10px] text-slate-500 font-mono mt-1">2.0 mcg/kg IV</div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
              <div className="text-[10px] font-[700] text-slate-400 uppercase tracking-wider mb-1">Sugammadex (Routine)</div>
              <div className="text-[26px] font-[900] font-mono text-emerald-300">{sugammadexDose} mg</div>
              <div className="text-[10px] text-slate-500 font-mono mt-1">2.0 mg/kg (Rescue: {sugammadexEmergency}mg)</div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 col-span-2 sm:col-span-1">
              <div className="text-[10px] font-[700] text-slate-400 uppercase tracking-wider mb-1">Fluid Rate (4-2-1)</div>
              <div className="text-[26px] font-[900] font-mono text-amber-300">{fluidRate} mL/hr</div>
              <div className="text-[10px] text-slate-500 font-mono mt-1">Holliday-Segar rule</div>
            </div>
          </div>

          {/* Animated ECG preview strip */}
          <div className="mt-8 p-4 rounded-xl bg-black/60 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 overflow-hidden relative">
            <div className="flex items-center gap-3 z-10">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 relative">
                <Activity className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <div>
                <span className="text-[12px] font-[800] text-slate-200">Normal Sinus Rhythm (Simulated Monitor)</span>
                <span className="text-[11px] text-slate-400 block font-mono">HR: 72 bpm • 25 mm/s • Lead II • ST: Isoelectric</span>
              </div>
            </div>

            {/* SVG ECG Strip Animation */}
            <div className="hidden md:block flex-1 max-w-xs h-8 overflow-hidden opacity-75">
              <svg viewBox="0 0 300 40" className="w-full h-full stroke-emerald-400 fill-none stroke-[1.5]">
                <path d="M 0 20 L 30 20 L 35 15 L 40 20 L 60 20 L 65 24 L 70 4 L 75 30 L 80 20 L 95 20 L 105 12 L 120 20 L 170 20 L 175 15 L 180 20 L 200 20 L 205 24 L 210 4 L 215 30 L 220 20 L 235 20 L 245 12 L 260 20 L 300 20" />
              </svg>
            </div>

            <Link href="/ecg" className="z-10 shrink-0">
              <motion.button 
                whileTap={{ scale: 0.95 }}
                className="text-[12px] font-[700] text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 transition-colors"
              >
                <span>{language === 'en' ? 'Launch 12-Lead Simulator' : 'Buka Simulator 12-Lead'}</span>
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CORE PILLARS GRID ─── */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-[11px] font-mono font-[800] text-blue-400 uppercase tracking-widest">
            Clinical Capabilities
          </span>
          <h2 className="text-[30px] md:text-[38px] font-[900] text-slate-100 tracking-tight">
            {language === 'en'
              ? 'Complete Clinical Decision Support in One Integrated Suite'
              : 'Dukungan Keputusan Klinis Lengkap dalam Satu Sistem Terpadu'}
          </h2>
          <p className="text-[14px] text-slate-400">
            {language === 'en'
              ? 'Designed specifically for high-stress operating room, intensive care, and acute resuscitation environments.'
              : 'Dirancang khusus untuk kamar operasi, perawatan intensif, dan situasi resusitasi akut.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Crisis Card */}
          <div className="p-6 rounded-2xl bg-[#0c1424] border border-rose-500/20 hover:border-rose-500/40 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-rose-600/20 border border-rose-500/30 flex items-center justify-center text-rose-300 mb-4">
                <AlertOctagon className="w-5 h-5 text-rose-400" />
              </div>
              <h3 className="text-[17px] font-[800] text-slate-100 group-hover:text-rose-200 transition-colors mb-2">
                {language === 'en' ? 'OR Crisis Card & Resuscitation' : 'Kartu Krisis Kamar Operasi'}
              </h3>
              <p className="text-[13px] text-slate-400 leading-relaxed">
                {language === 'en'
                  ? 'One-click weight calculated protocols for Malignant Hyperthermia (Dantrolene reconstitution), LAST 20% lipid rescue, cardiac arrest, and refractory anaphylaxis.'
                  : 'Protokol dosis cepat henti jantung, penanganan hipertermia maligna (dantrolen), intoksikasi anestesi lokal (lipid rescue), dan anafilaksis.'}
              </p>
            </div>
            <Link href="/emergency" className="mt-6 flex items-center text-[12px] font-[700] text-rose-400 group-hover:text-rose-300">
              <span>{language === 'en' ? 'View Crisis Card' : 'Lihat Kartu Krisis'}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Card 2: Offline First */}
          <div className="p-6 rounded-2xl bg-[#0c1424] border border-white/10 hover:border-blue-500/40 transition-all flex flex-col justify-between group" id="offline">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-300 mb-4">
                <WifiOff className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-[17px] font-[800] text-slate-100 group-hover:text-emerald-200 transition-colors mb-2">
                {language === 'en' ? 'Zero-Cloud Offline Reliability' : 'Keandalan Offline 100%'}
              </h3>
              <p className="text-[13px] text-slate-400 leading-relaxed">
                {language === 'en'
                  ? 'IndexedDB storage with Dexie ensures all calculators, 14,000+ ICD-10 codes, and clinical guidelines work flawlessly in shielded hospital suites without cellular reception.'
                  : 'Penyimpanan lokal IndexedDB memastikan kalkulator, kode ICD-10, dan panduan klinis tetap berfungsi di ruang operasi bawah tanah tanpa sinyal.'}
              </p>
            </div>
            <Link href="/settings" className="mt-6 flex items-center text-[12px] font-[700] text-emerald-400 group-hover:text-emerald-300">
              <span>{language === 'en' ? 'Inspect Local Storage' : 'Periksa Penyimpanan'}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Card 3: 12-Lead ECG */}
          <div className="p-6 rounded-2xl bg-[#0c1424] border border-white/10 hover:border-blue-500/40 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-300 mb-4">
                <Activity className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-[17px] font-[800] text-slate-100 group-hover:text-blue-200 transition-colors mb-2">
                {language === 'en' ? '12-Lead ECG Simulator & Cases' : 'Simulator EKG 12-Lead & Kasus'}
              </h3>
              <p className="text-[13px] text-slate-400 leading-relaxed">
                {language === 'en'
                  ? 'Interactive programmatic SVG waveforms on calibrated pink grid paper. Learn and test differential recognition for Wellens, Brugada, and STEMI.'
                  : 'Gelombang programatik SVG berkalibrasi kertas grid 1mm/5mm. Pelajari pola Wellens, sindrom Brugada, dan elevasi ST secara interaktif.'}
              </p>
            </div>
            <Link href="/ecg" className="mt-6 flex items-center text-[12px] font-[700] text-blue-400 group-hover:text-blue-300">
              <span>{language === 'en' ? 'Open ECG Module' : 'Buka Modul EKG'}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Card 4: Dosing & Calculators */}
          <div className="p-6 rounded-2xl bg-[#0c1424] border border-white/10 hover:border-blue-500/40 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300 mb-4">
                <Calculator className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-[17px] font-[800] text-slate-100 group-hover:text-cyan-200 transition-colors mb-2">
                {language === 'en' ? 'Critical Care Calculators' : 'Kalkulator Perawatan Kritis'}
              </h3>
              <p className="text-[13px] text-slate-400 leading-relaxed">
                {language === 'en'
                  ? 'Creatinine Clearance, eGFR, MAP, allowable blood loss (ABL), P/F ratio, and pediatric/adult endotracheal tube (ETT) formulas.'
                  : 'Klirens kreatinin, eGFR, MAP, perkiraan kehilangan darah (ABL), rasio PaO2/FiO2, dan ukuran pipa endotrakeal (ETT).'}
              </p>
            </div>
            <Link href="/calculators" className="mt-6 flex items-center text-[12px] font-[700] text-cyan-400 group-hover:text-cyan-300">
              <span>{language === 'en' ? 'Explore Calculators' : 'Buka Kalkulator'}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Card 5: Drug Interactions */}
          <div className="p-6 rounded-2xl bg-[#0c1424] border border-white/10 hover:border-blue-500/40 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-300 mb-4">
                <Pill className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-[17px] font-[800] text-slate-100 group-hover:text-blue-200 transition-colors mb-2">
                {language === 'en' ? 'Drug Safety & Cross-Interactions' : 'Keamanan & Interaksi Obat'}
              </h3>
              <p className="text-[13px] text-slate-400 leading-relaxed">
                {language === 'en'
                  ? 'Multi-drug safety analysis, anesthetic contraindications, and complete formulary references with routes and preparation guidelines.'
                  : 'Analisis kontraindikasi multi-obat, peringatan interaksi obat anestesi, dan formularium lengkap dengan rute pemberian.'}
              </p>
            </div>
            <Link href="/interactions" className="mt-6 flex items-center text-[12px] font-[700] text-blue-400 group-hover:text-blue-300">
              <span>{language === 'en' ? 'Check Interactions' : 'Periksa Interaksi'}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Card 6: Physical Exam & Body Map */}
          <div className="p-6 rounded-2xl bg-[#0c1424] border border-white/10 hover:border-blue-500/40 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-600/20 border border-amber-500/30 flex items-center justify-center text-amber-300 mb-4">
                <Stethoscope className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-[17px] font-[800] text-slate-100 group-hover:text-amber-200 transition-colors mb-2">
                {language === 'en' ? 'Physical Exam & Airway Map' : 'Pemeriksaan Fisik & Peta Jalan Napas'}
              </h3>
              <p className="text-[13px] text-slate-400 leading-relaxed">
                {language === 'en'
                  ? '2D anatomical selector map with structured step-by-step physical exam procedures, normal versus abnormal clinical findings, and airway scoring.'
                  : 'Peta anatomi 2D dengan langkah terstruktur pemeriksaan fisik, temuan normal versus abnormal, dan evaluasi jalan napas.'}
              </p>
            </div>
            <Link href="/physical-exam" className="mt-6 flex items-center text-[12px] font-[700] text-amber-400 group-hover:text-amber-300">
              <span>{language === 'en' ? 'Open Body Map' : 'Buka Peta Tubuh'}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── BOTTOM CTA BANNER ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-blue-950/40 via-blue-900/20 to-[#0c1424] border border-blue-500/30 text-center space-y-6">
          <h2 className="text-[28px] sm:text-[36px] font-[900] text-slate-100 tracking-tight">
            {language === 'en'
              ? 'Ready to Elevate Your Operating Room Workflow?'
              : 'Siap Mengoptimalkan Alur Kerja Kamar Operasi Anda?'}
          </h2>
          <p className="text-[15px] text-slate-300 max-w-xl mx-auto leading-relaxed">
            {language === 'en'
              ? 'No sign-up required. Your patient calculations and settings stay securely stored on your local device.'
              : 'Tanpa perlu pendaftaran. Perhitungan pasien dan pengaturan Anda tersimpan secara aman di perangkat lokal Anda.'}
          </p>
          <div className="pt-2">
            <Link href="/dashboard">
              <button className="btn-primary text-[15px] font-[800] px-8 py-3.5 rounded-xl shadow-xl shadow-blue-500/20">
                {language === 'en' ? 'Launch Clinical Dashboard' : 'Buka Dasbor Klinis'}
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
