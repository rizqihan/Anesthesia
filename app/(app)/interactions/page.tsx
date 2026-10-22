'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/store/appStore';
import { translations } from '@/lib/i18n';
import {
  Pill,
  Cpu,
  ShieldAlert,
  AlertCircle,
  Clock,
  Trash2,
  Download,
  Maximize2,
  ArrowLeft,
  Plus,
  X,
  CheckCircle2,
  AlertTriangle,
  Info,
  ShieldCheck,
  Search,
} from 'lucide-react';
import { generateAIResponse } from '@/lib/ai';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { downloadAIResponsePDF } from '@/lib/pdfGenerator';
import ResultModal from '@/components/ResultModal';
import {
  evaluateDrugInteractions,
  MatchedInteraction,
  InteractionSeverity,
} from '@/lib/drugInteractions';
import { DRUG_DB } from '@/lib/drugs';

const POPULAR_DRUGS = [
  'Fentanyl',
  'Midazolam',
  'Propofol',
  'Ondansetron',
  'Amiodarone',
  'Ketorolac',
  'Lisinopril',
  'Warfarin',
  'Linezolid',
  'Tramadol',
  'Spironolactone',
  'Gentamicin',
  'Clarithromycin',
  'Haloperidol',
];

export default function InteractionsPage() {
  const { language, isOffline, interactionHistory, addInteractionHistory, clearInteractionHistory } =
    useAppStore();
  const t = translations[language];

  // Selected drug list (chips)
  const [selectedDrugs, setSelectedDrugs] = useState<string[]>(['Fentanyl', 'Midazolam']);
  const [inputDrug, setInputDrug] = useState('');

  // AI & Modal State
  const [loadingAi, setLoadingAi] = useState(false);
  const [aiResult, setAiResult] = useState('');
  const [aiError, setAiError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Evaluate offline interactions in real time
  const offlineMatches: MatchedInteraction[] = evaluateDrugInteractions(selectedDrugs);

  const addDrug = (drugName: string) => {
    const trimmed = drugName.trim();
    if (!trimmed) return;
    const exists = selectedDrugs.some((d) => d.toLowerCase() === trimmed.toLowerCase());
    if (!exists) {
      setSelectedDrugs([...selectedDrugs, trimmed]);
    }
    setInputDrug('');
  };

  const removeDrug = (index: number) => {
    setSelectedDrugs(selectedDrugs.filter((_, i) => i !== index));
  };

  const handleAiCheck = async () => {
    if (selectedDrugs.length < 2) return;
    setLoadingAi(true);
    setAiResult('');
    setAiError('');

    if (isOffline) {
      setAiError(
        language === 'en'
          ? 'Offline mode: Using offline deterministic rule matrix. Connect to internet for open-ended AI literature synthesis.'
          : 'Mode offline: Menggunakan matriks aturan deterministik offline. Hubungkan ke internet untuk sintesis AI.'
      );
      setLoadingAi(false);
      return;
    }

    try {
      const drugListStr = selectedDrugs.join(', ');
      const prompt = `Act as an expert clinical pharmacologist & anesthesiologist. Perform a rigorous drug-drug interaction check for this patient medication list: "${drugListStr}". Respond in ${
        language === 'en' ? 'English' : 'Indonesian'
      }.
Include:
1. High-Alert Clinical Contraindications & Major Risks (QT prolongation, Serotonin syndrome, Respiratory depression, Nephrotoxicity, Hemorrhage).
2. Pharmacokinetic & Pharmacodynamic Mechanisms (CYP enzymes, receptor synergy).
3. Concrete Bedside Mitigation & Monitoring Protocol.
Keep it structured with bullet points. Add standard medical disclaimer.`;

      const aiResponse = await generateAIResponse(prompt);
      setAiResult(aiResponse);
      addInteractionHistory({
        query: drugListStr,
        result: aiResponse,
      });
    } catch (err: any) {
      setAiError(err.message || (language === 'en' ? 'AI request failed.' : 'Gagal menghubungi AI.'));
    } finally {
      setLoadingAi(false);
    }
  };

  const getSeverityBadge = (sev: InteractionSeverity) => {
    switch (sev) {
      case 'contraindicated':
        return {
          bg: 'bg-rose-950/40 text-rose-300 border-rose-500/50',
          dot: 'bg-rose-500',
          label: 'CONTRAINDICATED / FATAL',
        };
      case 'major':
        return {
          bg: 'bg-orange-950/40 text-orange-300 border-orange-500/50',
          dot: 'bg-orange-500',
          label: 'MAJOR / AVOID',
        };
      case 'moderate':
        return {
          bg: 'bg-amber-950/40 text-amber-300 border-amber-500/50',
          dot: 'bg-amber-400',
          label: 'MODERATE / MONITOR',
        };
      case 'minor':
      default:
        return {
          bg: 'bg-slate-800/60 text-slate-300 border-slate-700',
          dot: 'bg-slate-400',
          label: 'MINOR',
        };
    }
  };

  return (
    <div className="space-y-5 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/dashboard">
          <button className="p-2 rounded-xl border border-white/[0.06] bg-[#0c121e]/80 hover:bg-white/5 transition-all text-gray-400 hover:text-white shrink-0">
            <ArrowLeft className="w-4 h-4" />
          </button>
        </Link>
        <div
          className="icon-box"
          style={{
            background: 'linear-gradient(135deg,#be123c,#f43f5e)',
            boxShadow: '0 0 16px rgba(244,63,94,0.35)',
          }}
        >
          <Pill className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-[18px] font-[800] tracking-tight" style={{ color: 'var(--text-primary)' }}>
            {t.interaction_checker}
          </h1>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="badge-offline">100% OFFLINE MATRIX</span>
            <span className="badge-ai inline-flex">
              <Cpu className="w-2.5 h-2.5" />
              OPTIONAL AI
            </span>
          </div>
        </div>
      </div>

      {/* Main Drug Multi-Selector Card */}
      <div className="glass-card-static overflow-hidden p-5 space-y-4">
        <div>
          <label className="block text-[11px] font-[700] uppercase tracking-wider text-slate-400 mb-1.5">
            {language === 'en' ? 'Selected Regimen / Drug List' : 'Daftar Obat Pasien'}
          </label>

          {/* Active Chips */}
          <div className="flex flex-wrap gap-2 p-3 min-h-[52px] rounded-xl bg-black/30 border border-white/10 items-center">
            {selectedDrugs.map((drug, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[12px] font-[700] bg-blue-600/25 border border-blue-500/40 text-blue-200"
              >
                <span>{drug}</span>
                <button
                  type="button"
                  onClick={() => removeDrug(index)}
                  className="hover:text-rose-400 transition-colors p-0.5 rounded-full"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}

            {selectedDrugs.length === 0 && (
              <span className="text-[12px] text-slate-500 italic">
                {language === 'en'
                  ? 'Add at least 2 medications below to check interaction matrix...'
                  : 'Tambahkan minimal 2 obat di bawah untuk memeriksa matriks interaksi...'}
              </span>
            )}
          </div>
        </div>

        {/* Drug Input & Add Button */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={inputDrug}
              onChange={(e) => setInputDrug(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addDrug(inputDrug);
                }
              }}
              placeholder={
                language === 'en'
                  ? 'Type generic or brand name, then press Enter...'
                  : 'Ketik nama obat, lalu tekan Enter...'
              }
              className="glass-input w-full pl-9 pr-3 py-2 text-[12.5px]"
            />
          </div>
          <button
            type="button"
            onClick={() => addDrug(inputDrug)}
            disabled={!inputDrug.trim()}
            className="btn-primary px-4 py-2 text-[12.5px] font-[700] flex items-center gap-1.5 rounded-xl shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>

        {/* Quick-Add Chips */}
        <div>
          <div className="text-[10px] font-mono uppercase text-slate-500 mb-1.5">
            {language === 'en' ? 'Quick Add High-Alert Medications:' : 'Tambah Cepat Obat Kritis:'}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {POPULAR_DRUGS.map((d) => {
              const isAdded = selectedDrugs.some((item) => item.toLowerCase() === d.toLowerCase());
              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => (isAdded ? null : addDrug(d))}
                  disabled={isAdded}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-[600] transition-colors border ${
                    isAdded
                      ? 'bg-white/[0.02] border-white/[0.05] text-slate-600 cursor-default'
                      : 'bg-white/[0.03] border-white/10 text-slate-300 hover:text-white hover:bg-white/[0.08]'
                  }`}
                >
                  +{d}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* =========================================================
          OFFLINE DETERMINISTIC INTERACTION MATRIX RESULTS
         ========================================================= */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <h3 className="text-[14px] font-[800] text-slate-200">
              {language === 'en' ? 'Offline Drug Safety Matrix' : 'Matriks Keamanan Interaksi Offline'}
            </h3>
          </div>

          {selectedDrugs.length >= 2 && (
            <span className="text-[11px] font-mono text-slate-400">
              {offlineMatches.length} {offlineMatches.length === 1 ? 'Interaction' : 'Interactions'} Detected
            </span>
          )}
        </div>

        {selectedDrugs.length < 2 ? (
          <div className="p-6 rounded-2xl bg-[#0e1424] border border-white/[0.06] text-center text-[12px] text-slate-400">
            Select at least 2 medications above to evaluate the rule-based safety matrix.
          </div>
        ) : offlineMatches.length === 0 ? (
          <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-[13px] font-[800] text-emerald-200">
                No High-Risk Contraindications Flagged in Core Matrix
              </div>
              <p className="text-[11.5px] text-emerald-300/80 mt-1 leading-relaxed">
                None of the {selectedDrugs.length} selected agents have known contraindicated or major black-box interactions in our deterministic formulary rules. Always cross-reference patient kidney/liver function and clinical context.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {offlineMatches.map((match, idx) => {
              const badge = getSeverityBadge(match.severity);
              return (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-2xl bg-[#0c121e] border border-white/10 space-y-3 shadow-lg"
                >
                  {/* Top Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-[800] border ${badge.bg}`}>
                        {badge.label}
                      </span>
                      <span className="text-[13px] font-[800] text-slate-100 font-mono">
                        {match.drugA.toUpperCase()} + {match.drugB.toUpperCase()}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                      {match.category.replace('_', ' ')}
                    </span>
                  </div>

                  {/* Title & Mechanism */}
                  <div>
                    <h4 className="text-[13.5px] font-[700] text-rose-200">{match.title}</h4>
                    <p className="text-[12px] text-slate-300 mt-1 leading-relaxed">
                      <strong>Mechanism:</strong> {match.mechanism}
                    </p>
                  </div>

                  {/* Consequence & Management */}
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-[11.5px] space-y-1.5">
                    <div className="text-amber-300/90 leading-relaxed">
                      <strong>Clinical Consequence:</strong> {match.clinicalConsequence}
                    </div>
                    <div className="text-emerald-300/90 leading-relaxed">
                      <strong>Management / Action:</strong> {match.management}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* =========================================================
          OPTIONAL AI SECOND OPINION BUTTON
         ========================================================= */}
      <div className="glass-card-static p-5 border border-white/10 rounded-2xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-purple-400" />
            <h3 className="text-[13px] font-[800] text-slate-200">
              {language === 'en' ? 'AI Deep Pharmacological Synthesis' : 'Sintesis Farmakologi AI'}
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400">ONLINE OPTION</span>
        </div>

        <p className="text-[11.5px] text-slate-400 leading-relaxed">
          Need an open-ended synthesis for rare/unlisted combinations or drug-disease interactions? Tap below to query the LLM clinical pharmacologist engine.
        </p>

        <button
          type="button"
          onClick={handleAiCheck}
          disabled={loadingAi || selectedDrugs.length < 2}
          className="btn-primary w-full py-2.5 text-[12.5px] font-[700] flex items-center justify-center gap-2"
        >
          {loadingAi ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin-slow" />
              <span>Analyzing Pharmacokinetics & Literature...</span>
            </>
          ) : (
            <>
              <Cpu className="w-4 h-4" />
              <span>
                {language === 'en'
                  ? `Analyze Regimen (${selectedDrugs.length} Drugs) via AI`
                  : `Analisis Paduan Obat (${selectedDrugs.length} Obat) via AI`}
              </span>
            </>
          )}
        </button>

        {aiError && (
          <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/40 text-[11.5px] text-rose-300 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span>{aiError}</span>
          </div>
        )}

        {aiResult && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="pt-2 space-y-3"
          >
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                AI Synthesis Report
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    downloadAIResponsePDF(
                      'Drug Interaction Report',
                      'Drugs Checked:',
                      selectedDrugs.join(', '),
                      'Result',
                      aiResult,
                      'interaction_report.pdf'
                    )
                  }
                  className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-[11px] font-semibold flex items-center gap-1"
                >
                  <Download className="w-3 h-3" />
                  <span>PDF</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-[11px] font-semibold flex items-center gap-1"
                >
                  <Maximize2 className="w-3 h-3" />
                  <span>Fullscreen</span>
                </button>
              </div>
            </div>

            <div className="result-box overflow-y-auto max-h-[350px]">
              <div className="text-[12.5px] leading-relaxed prose prose-invert prose-sm max-w-none prose-p:text-slate-300 prose-headings:text-slate-100">
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                  {aiResult}
                </ReactMarkdown>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* History */}
      {interactionHistory.length > 0 && (
        <div className="glass-card-static overflow-hidden">
          <div className="section-header justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400" />
              <span className="section-header-label">{t.history}</span>
            </div>
            <button
              onClick={clearInteractionHistory}
              className="text-[11px] font-[600] flex items-center gap-1.5 text-rose-400 hover:text-rose-300"
            >
              <Trash2 className="w-3.5 h-3.5" />
              {t.clear_history}
            </button>
          </div>
          <div className="divide-y divide-white/5">
            {interactionHistory.map((item) => (
              <div
                key={item.id}
                className="p-4 hover:bg-white/5 cursor-pointer transition-colors"
                onClick={() => {
                  const drugsFromQuery = item.query.split(',').map((s) => s.trim());
                  setSelectedDrugs(drugsFromQuery);
                  setAiResult(item.result);
                }}
              >
                <div className="flex justify-between items-start mb-1 gap-4">
                  <span className="text-[12.5px] font-[700] text-slate-200">{item.query}</span>
                  <span className="text-[10px] font-mono text-slate-400 shrink-0">
                    {new Date(item.timestamp).toLocaleTimeString(
                      language === 'en' ? 'en-US' : 'id-ID',
                      { hour: '2-digit', minute: '2-digit' }
                    )}
                  </span>
                </div>
                <div className="text-[11.5px] text-slate-400 line-clamp-2 leading-relaxed">
                  {item.result}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="text-center text-[11px] text-slate-500">{t.disclaimer}</div>

      <ResultModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={t.interaction_checker}
        categoryTag={language === 'en' ? 'Drug Interaction Checker' : 'Pengecekan Interaksi'}
        statusTag={language === 'en' ? 'AI Response' : 'Respon AI'}
        agentName="Anesthesia Interaction Agent v2.0"
        queryLabel={language === 'en' ? 'Drugs Checked:' : 'Obat Diperiksa:'}
        queryText={selectedDrugs.join(', ')}
        resultLabel={t.result}
        markdownContent={aiResult}
        onDownloadPDF={() =>
          downloadAIResponsePDF(
            'Drug Interaction Report',
            'Drugs Checked:',
            selectedDrugs.join(', '),
            t.result,
            aiResult,
            'interaction_report.pdf'
          )
        }
        language={language}
      />
    </div>
  );
}
