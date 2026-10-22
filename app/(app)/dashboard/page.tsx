'use client';

import React from 'react';
import Link from 'next/link';
import { useAppStore } from '@/store/appStore';
import { translations } from '@/lib/i18n';
import { 
  Calculator, Pill, Activity, Syringe, BookOpen, WifiOff, Book, 
  ArrowRight, Stethoscope, AlertOctagon, Heart, User, Clock,
  Cpu, Droplet, Sparkles, ShieldCheck
} from 'lucide-react';
import { motion } from 'motion/react';

export default function DashboardPage() {
  const { language, activeCase } = useAppStore();
  const t = translations[language];

  const weight = parseFloat(activeCase.patientWeight) || 70;
  const height = parseFloat(activeCase.patientHeight) || 170;

  // Rapid quick calculations for the active patient
  const bmi = (weight / ((height / 100) ** 2)).toFixed(1);
  const fluidMaintenance = weight <= 10 ? weight * 4 : weight <= 20 ? 40 + (weight - 10) * 2 : 60 + (weight - 20) * 1;
  const ettSize = activeCase.patientSex === 'M' ? '7.5 – 8.0' : '7.0 – 7.5';

  const toolSections = [
    {
      sectionTitle: language === 'en' ? 'Acute Care & Crisis Protocols' : 'Protokol Akut & Krisis',
      sectionDesc: language === 'en' ? 'Immediate weight-calculated resuscitation and emergency push doses' : 'Dosis resusitasi darurat berbasis berat badan',
      items: [
        {
          title: language === 'en' ? '🚨 Emergency OR Crisis Card' : '🚨 Kartu Krisis Anestesi',
          icon: AlertOctagon,
          href: '/emergency',
          desc: language === 'en' ? 'Malignant Hyperthermia, LAST lipid rescue, arrest epinephrine & amiodarone' : 'Hipertermia maligna, intoksikasi anestesi lokal, henti jantung',
          highlight: 'urgent',
          badge: 'CRISIS READY',
        },
        {
          title: language === 'en' ? 'Weight-Based Dosage Calculator' : 'Kalkulator Dosis Berat Badan',
          icon: Syringe,
          href: '/dosage',
          desc: language === 'en' ? 'Pediatric & adult dosing formulas with safety boundaries' : 'Dosis pediatrik & dewasa dengan batas keamanan otomatis',
          badge: 'OFFLINE',
        },
      ],
    },
    {
      sectionTitle: language === 'en' ? 'Intra-Operative & Critical Calculators' : 'Kalkulator Intra-Operasi & Kritis',
      sectionDesc: language === 'en' ? 'Fluid deficit, renal dosing, hemodynamic indices, and endotracheal tube sizing' : 'Defisit cairan, klirens ginjal, indeks hemodinamik, dan ukuran ETT',
      items: [
        {
          title: t.medical_calculators,
          icon: Calculator,
          href: '/calculators',
          desc: language === 'en' ? 'BMI, IBW/ABW, CrCl, eGFR, MAP, ETT, ABL, P/F Ratio, Holliday-Segar fluid' : 'IMT, BBI/BBD, CrCl, eGFR, MAP, ETT, ABL, rasio P/F, rumus cairan rumatan',
          badge: 'OFFLINE',
        },
        {
          title: language === 'en' ? '12-Lead ECG Simulator & Learning' : 'Simulator & Modul EKG 12-Lead',
          icon: Activity,
          href: '/ecg',
          desc: language === 'en' ? 'Interactive programmatic SVG waveforms for STEMI, Wellens, Brugada & quiz' : 'Gelombang SVG programatik untuk STEMI, Wellens, Brugada & latihan kuis',
          badge: 'SIMULATOR',
        },
      ],
    },
    {
      sectionTitle: language === 'en' ? 'Pre-Operative Assessment & Pharmacology' : 'Penilaian Pra-Operasi & Farmakologi',
      sectionDesc: language === 'en' ? 'Airway examination, multi-drug interactions, and clinical guidelines' : 'Pemeriksaan jalan napas, interaksi obat, dan panduan klinis',
      items: [
        {
          title: language === 'en' ? 'Interactive Physical Exam Map' : 'Peta Pemeriksaan Fisik Interaktif',
          icon: Stethoscope,
          href: '/physical-exam',
          desc: language === 'en' ? 'Clickable 2D anatomical map with structured exam procedures' : 'Peta anatomi 2D dengan prosedur langkah pemeriksaan fisik',
          badge: 'OFFLINE',
        },
        {
          title: t.interaction_checker,
          icon: Pill,
          href: '/interactions',
          desc: language === 'en' ? 'AI-driven multi-drug contraindication and cross-reaction matrix' : 'Matriks interaksi kontraindikasi multi-obat didukung AI',
          badge: 'AI AIDED',
        },
        {
          title: t.drug_formulary,
          icon: Pill,
          href: '/formulary',
          desc: language === 'en' ? 'Complete clinical pharmacology, indications, contraindications & routes' : 'Farmakologi klinis lengkap, indikasi, kontraindikasi & sediaan',
          badge: 'OFFLINE',
        },
        {
          title: t.symptom_checker,
          icon: Activity,
          href: '/symptoms',
          desc: language === 'en' ? 'Differential diagnosis assistant with red-flag detection' : 'Asisten diagnosis banding dengan deteksi tanda bahaya red-flag',
          badge: 'AI AIDED',
        },
        {
          title: t.clinical_guidelines_title,
          icon: BookOpen,
          href: '/guidelines',
          desc: language === 'en' ? 'Structured Clinical Practice Guidelines (CPGs) across medical specialties' : 'Panduan Praktik Klinis (PPK) terstruktur berbagai spesialisasi',
          badge: 'OFFLINE',
        },
        {
          title: t.icd10_search,
          icon: Book,
          href: '/icd10',
          desc: language === 'en' ? 'Fast offline search across 14,000+ ICD-10 diagnostic codes' : 'Pencarian offline cepat lebih dari 14.000 kode ICD-10',
          badge: 'OFFLINE',
        },
      ],
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* ─── Hero Clinical Command Strip ─── */}
      <div className="p-5 md:p-6 rounded-2xl bg-gradient-to-r from-[#0d1629] to-[#0a1020] border border-white/10 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-[800] bg-blue-500/20 text-blue-300 border border-blue-500/30 uppercase tracking-wider">
                Clinical Workspace
              </span>
              <span className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-[600]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                {language === 'en' ? 'Zero Latency Offline' : 'Offline Siap Tanpa Latensi'}
              </span>
            </div>
            <h1 className="text-[22px] md:text-[26px] font-[900] text-slate-100 tracking-tight">
              {language === 'en' ? 'Clinical Command Center' : 'Pusat Komando Klinis'}
            </h1>
            <p className="text-[13px] text-slate-400 max-w-2xl mt-1">
              {language === 'en'
                ? 'Mission-critical acute care calculators, 12-lead ECG waveforms, and crisis pharmacopeia tailored for operating rooms and ICUs.'
                : 'Kalkulator perawatan akut, gelombang EKG 12-lead, dan farmakope krisis untuk kamar operasi dan ICU.'}
            </p>
          </div>

          {/* Active Patient Quick HUD */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 p-3.5 rounded-xl bg-black/40 border border-white/10">
            <div className="flex items-center gap-2.5 pr-3 border-r border-white/10">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                <User className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-[700] text-slate-400">Active Case</div>
                <div className="text-[14px] font-[800] text-slate-200 font-mono">
                  {activeCase.patientWeight}kg • {activeCase.patientSex} • ASA {activeCase.asaClass}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center pl-1 font-mono text-[11px]">
              <div>
                <div className="text-[10px] text-slate-500 uppercase font-[700]">BMI</div>
                <div className="font-[800] text-blue-300 text-[13px]">{bmi}</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-500 uppercase font-[700]">Fluid/Hr</div>
                <div className="font-[800] text-emerald-300 text-[13px]">{fluidMaintenance} mL</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-500 uppercase font-[700]">ETT Size</div>
                <div className="font-[800] text-cyan-300 text-[13px]">{ettSize}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Fast-Access Crisis Banner ─── */}
      <Link href="/emergency" className="block">
        <div className="p-4 rounded-xl bg-gradient-to-r from-rose-950/40 via-rose-900/20 to-[#0e1424] border border-rose-500/30 hover:border-rose-500/50 transition-all flex items-center justify-between group cursor-pointer shadow-lg">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-rose-600/30 border border-rose-500/40 flex items-center justify-center text-rose-300 shrink-0 group-hover:scale-105 transition-transform">
              <AlertOctagon className="w-5 h-5 text-rose-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[14px] font-[800] text-rose-100">
                  {language === 'en' ? 'Emergency OR Crisis Card' : 'Kartu Krisis Anestesi / Resusitasi'}
                </h3>
                <span className="px-2 py-0.2 rounded text-[10px] font-[800] bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  RAPID PUSH DOSES
                </span>
              </div>
              <p className="text-[12px] text-rose-200/70">
                {language === 'en'
                  ? 'Instant weight-calculated push doses: Epinephrine, Atropine, Succinylcholine, Dantrolene (MH), 20% Lipid Rescue (LAST).'
                  : 'Dosis darurat otomatis untuk berat aktif: Epinefrin, Atropin, Suksinilkolin, Dantrolen (MH), Emulsi Lipid 20% (LAST).'}
              </p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-rose-400 group-hover:translate-x-1 transition-transform shrink-0 ml-4" />
        </div>
      </Link>

      {/* ─── Categorized Tool Workspaces ─── */}
      <div className="space-y-8">
        {toolSections.map((section, idx) => (
          <div key={idx} className="space-y-3">
            <div className="flex items-baseline justify-between border-b border-white/[0.06] pb-2">
              <div>
                <h2 className="text-[15px] font-[800] tracking-tight text-slate-100">
                  {section.sectionTitle}
                </h2>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {section.sectionDesc}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {section.items.map((tool) => {
                const Icon = tool.icon;
                const isUrgent = tool.highlight === 'urgent';
                return (
                  <Link key={tool.href} href={tool.href} className="block h-full">
                    <div
                      className={`h-full p-4 rounded-xl border transition-all duration-200 flex flex-col justify-between group cursor-pointer ${
                        isUrgent
                          ? 'bg-rose-950/20 border-rose-500/30 hover:border-rose-500/60 hover:bg-rose-950/30'
                          : 'bg-[#0d1424] border-white/[0.08] hover:border-blue-500/40 hover:bg-[#111a30]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div
                            className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border ${
                              isUrgent
                                ? 'bg-rose-600/20 text-rose-300 border-rose-500/30'
                                : 'bg-blue-600/20 text-blue-400 border-blue-500/30'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <span
                            className={`text-[9px] font-[800] px-2 py-0.5 rounded-full border tracking-wider font-mono ${
                              isUrgent
                                ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                                : tool.badge === 'AI AIDED'
                                ? 'bg-purple-500/15 text-purple-300 border-purple-500/30'
                                : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                            }`}
                          >
                            {tool.badge}
                          </span>
                        </div>

                        <h3 className="text-[14px] font-[700] text-slate-100 group-hover:text-white transition-colors mb-1">
                          {tool.title}
                        </h3>
                        <p className="text-[12px] text-slate-400 leading-relaxed mb-4">
                          {tool.desc}
                        </p>
                      </div>

                      <div className="flex items-center text-[11px] font-[600] text-blue-400 group-hover:text-blue-300 pt-2 border-t border-white/[0.04]">
                        <span>{language === 'en' ? 'Open Workspace' : 'Buka Alat'}</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
