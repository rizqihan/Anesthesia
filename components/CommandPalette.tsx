'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/appStore';
import { 
  Search, Calculator, Syringe, Activity, Pill, BookOpen, Stethoscope, 
  AlertOctagon, Book, Settings, User, ArrowRight, X, ShieldAlert, Printer, Radio
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { exportBedsideRoundsPDF } from '@/lib/pdfGenerator';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCaseModal?: () => void;
}

export default function CommandPalette({ isOpen, onClose, onOpenCaseModal }: CommandPaletteProps) {
  const router = useRouter();
  const { language } = useAppStore();
  const [query, setQuery] = useState('');

  // Handle ESC key and Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const commands = [
    {
      id: 'emergency',
      title: language === 'en' ? '🚨 Emergency OR Crisis Card' : '🚨 Kartu Krisis Anestesi / Resusitasi',
      subtitle: language === 'en' ? 'Push doses: Arrest, LAST, MH, Anaphylaxis' : 'Dosis cepat henti jantung, LAST, MH, anafilaksis',
      href: '/emergency',
      icon: AlertOctagon,
      category: 'Emergency',
    },
    {
      id: 'antimicrobial',
      title: language === 'en' ? 'Antimicrobial Stewardship & Renal Dosing' : 'Penatagunaan Antimikroba & Klirens Ginjal',
      subtitle: language === 'en' ? 'Syndromic regimens, CrCl cutoffs, Cefepime neurotoxicity, nomograms' : 'Regimen sindromik, batas CrCl, penyesuaian dosis ginjal',
      href: '/antimicrobial',
      icon: ShieldAlert,
      category: 'Pharmacology',
    },
    {
      id: 'export-sbar',
      title: language === 'en' ? '📄 Export Bedside Rounds SBAR PDF' : '📄 Ekspor PDF SBAR Visite Pasien',
      subtitle: language === 'en' ? 'One-tap hospital-grade SBAR handoff sheet with CrCl & crisis doses' : 'Lembar handoff klinis SBAR dengan klirens ginjal & dosis krisis',
      action: () => {
        onClose();
        const state = useAppStore.getState();
        exportBedsideRoundsPDF({
          activeCase: state.activeCase,
          patientLabs: state.patientLabs,
        });
      },
      icon: Printer,
      category: 'Patient',
    },
    {
      id: 'active-case',
      title: language === 'en' ? 'Active Case Session (Weight, Height, ASA)' : 'Sesi Pasien Aktif (BB, TB, ASA)',
      subtitle: language === 'en' ? 'Update active patient parameters for all calculators' : 'Perbarui parameter pasien aktif untuk semua kalkulator',
      action: () => {
        onClose();
        if (onOpenCaseModal) onOpenCaseModal();
      },
      icon: User,
      category: 'Patient',
    },
    {
      id: 'calculators',
      title: language === 'en' ? 'Medical Calculators' : 'Kalkulator Medis',
      subtitle: 'BMI, IBW/ABW, CrCl, eGFR, MAP, ETT, ABL, P/F ratio, Holliday-Segar',
      href: '/calculators',
      icon: Calculator,
      category: 'Calculators',
    },
    {
      id: 'dosage',
      title: language === 'en' ? 'Weight-Based Dosage Calculator' : 'Kalkulator Dosis Berbasis Berat',
      subtitle: language === 'en' ? 'Pediatric & adult mg/kg dosing with safety caps' : 'Dosis mg/kg pediatrik & dewasa dengan batas aman',
      href: '/dosage',
      icon: Syringe,
      category: 'Calculators',
    },
    {
      id: 'ecg',
      title: language === 'en' ? '12-Lead ECG Learning & Simulator' : 'Pembelajaran & Simulator EKG 12-Lead',
      subtitle: language === 'en' ? 'Interactive waveforms: STEMI, Wellens, Brugada, rhythm strips' : 'Gelombang interaktif: STEMI, Wellens, Brugada',
      href: '/ecg',
      icon: Activity,
      category: 'Diagnostics',
    },
    {
      id: 'pocus',
      title: language === 'en' ? 'POCUS Point-of-Care Ultrasound Suite' : 'Modul USG POCUS Bedside',
      subtitle: language === 'en' ? 'eFAST, BLUE protocol, FOCUS cardiac, vascular access & DICOM cine' : 'eFAST trauma, protokol BLUE, fokus jantung FOCUS, akses vaskular & penampil DICOM',
      href: '/pocus',
      icon: Radio,
      category: 'Diagnostics',
    },
    {
      id: 'formulary',
      title: language === 'en' ? 'Drug Formulary Reference' : 'Formularium & Referensi Obat',
      subtitle: language === 'en' ? 'Indications, contraindications, routes & preparations' : 'Indikasi, kontraindikasi, rute & sediaan',
      href: '/formulary',
      icon: Pill,
      category: 'Pharmacology',
    },
    {
      id: 'interactions',
      title: language === 'en' ? 'Drug Interaction Checker' : 'Pemeriksa Interaksi Obat',
      subtitle: language === 'en' ? 'AI-powered multi-drug safety & contraindication analysis' : 'Analisis keamanan multi-obat didukung AI',
      href: '/interactions',
      icon: Pill,
      category: 'Pharmacology',
    },
    {
      id: 'guidelines',
      title: language === 'en' ? 'Clinical Practice Guidelines (CPGs)' : 'Panduan Praktik Klinis (PPK)',
      subtitle: language === 'en' ? 'Offline structured specialty medical guidelines' : 'Panduan klinis terstruktur offline',
      href: '/guidelines',
      icon: BookOpen,
      category: 'Reference',
    },
    {
      id: 'physical-exam',
      title: language === 'en' ? 'Physical Exam Guidelines & Body Map' : 'Panduan Pemeriksaan Fisik & Peta Tubuh',
      subtitle: language === 'en' ? 'Interactive 2D anatomical selector with exam steps' : 'Peta anatomi interaktif dengan langkah pemeriksaan',
      href: '/physical-exam',
      icon: Stethoscope,
      category: 'Reference',
    },
    {
      id: 'icd10',
      title: language === 'en' ? 'ICD-10 Diagnostic Search' : 'Pencarian Kode Diagnostik ICD-10',
      subtitle: language === 'en' ? '14,000+ codes indexed for zero-latency offline lookup' : '14.000+ kode untuk pencarian offline cepat',
      href: '/icd10',
      icon: Book,
      category: 'Reference',
    },
    {
      id: 'settings',
      title: language === 'en' ? 'Settings & Offline Sync' : 'Pengaturan & Sinkronisasi Offline',
      subtitle: language === 'en' ? 'AI keys, model selection, dataset sync & cache management' : 'Kunci AI, model, sinkronisasi data',
      href: '/settings',
      icon: Settings,
      category: 'System',
    },
  ];

  const filtered = commands.filter((cmd) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      cmd.title.toLowerCase().includes(q) ||
      cmd.subtitle.toLowerCase().includes(q) ||
      cmd.category.toLowerCase().includes(q)
    );
  });

  const handleSelect = (cmd: typeof commands[0]) => {
    if (cmd.action) {
      cmd.action();
    } else if (cmd.href) {
      router.push(cmd.href);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-start justify-center pt-20 px-4 bg-black/75 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -10 }}
        className="w-full max-w-xl bg-[#0c1322] border border-white/10 shadow-2xl rounded-2xl overflow-hidden flex flex-col max-h-[75vh]"
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10 gap-3">
          <Search className="w-5 h-5 text-blue-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              language === 'en'
                ? 'Type to search tools, calculators, crisis doses, or drugs...'
                : 'Ketik untuk mencari alat, kalkulator, dosis krisis, atau obat...'
            }
            className="w-full bg-transparent text-[14px] text-slate-100 placeholder-slate-500 focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded text-slate-400 hover:text-slate-100"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400">
              ESC
            </span>
          )}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-[13px]">
              {language === 'en' ? 'No matching clinical tools found.' : 'Tidak ada alat klinis yang cocok.'}
            </div>
          ) : (
            filtered.map((cmd) => {
              const Icon = cmd.icon;
              return (
                <button
                  key={cmd.id}
                  onClick={() => handleSelect(cmd)}
                  className="w-full text-left flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.06] transition-all group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 group-hover:text-blue-400 group-hover:border-blue-500/30 transition-colors shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[13px] font-[700] text-slate-200 group-hover:text-white truncate">
                        {cmd.title}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate">
                        {cmd.subtitle}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors shrink-0 ml-2" />
                </button>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 border-t border-white/10 bg-black/30 flex items-center justify-between text-[11px] text-slate-500">
          <span>Navigation Quick Tray</span>
          <span className="font-mono">Anesthesia Acute Care Suite</span>
        </div>
      </motion.div>
    </div>
  );
}
