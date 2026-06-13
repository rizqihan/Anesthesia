'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import db, { type PhysicalExamRecord } from '@/lib/db';
import { useAppStore } from '@/store/appStore';
import { translations } from '@/lib/i18n';
import { generatePhysicalExamGuideline } from '@/lib/syncAgent';
import BodyIllustration from '@/components/BodyIllustration';
import { 
  Stethoscope, Search, WifiOff, Sparkles, RefreshCw, X, Plus, 
  AlertTriangle, BookOpen, Clipboard, Eye, AlertCircle, CheckCircle, Info,
  Download, ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { printContentAsPDF } from '@/lib/pdfGenerator';

export default function PhysicalExamPage() {
  const { language } = useAppStore();
  const t = translations[language];
  const [search, setSearch] = useState('');
  const [newExamName, setNewExamName] = useState('');
  const [selectedExam, setSelectedExam] = useState<PhysicalExamRecord | null>(null);
  const [activePartId, setActivePartId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'steps' | 'map'>('steps');
  
  // Mounted status for portal
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // AI Generator state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);

  const stepsContainerRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = () => {
    if (!selectedExam || !stepsContainerRef.current) return;
    const title = language === 'en' ? selectedExam.title.en : selectedExam.title.id;
    const contentHtml = stepsContainerRef.current.innerHTML;
    printContentAsPDF(
      title,
      contentHtml,
      `physical_exam_${title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.pdf`
    );
  };

  // Prevent background scroll when modal open
  useEffect(() => {
    if (selectedExam) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedExam]);

  // Load exams from Dexie DB
  const exams = useLiveQuery(() => {
    if (typeof window === 'undefined') return [];
    if (!search.trim()) return db.physicalExams.toArray();
    return db.physicalExams.filter(e =>
      e.title.en.toLowerCase().includes(search.toLowerCase()) ||
      e.title.id.toLowerCase().includes(search.toLowerCase()) ||
      e.category.toLowerCase().includes(search.toLowerCase())
    ).toArray();
  }, [search]);

  // Handle generating exam guide on demand
  const handleGenerateExam = async (name: string) => {
    if (!name.trim()) return;
    setIsGenerating(true);
    setGenerationError(null);
    try {
      const record = await generatePhysicalExamGuideline(name);
      const id = await db.physicalExams.put(record);
      setSelectedExam({ ...record, id });
      setNewExamName('');
      setSearch('');
    } catch (err: any) {
      console.error(err);
      setGenerationError(
        language === 'en'
          ? `Generation failed: ${err.message || 'Make sure your AI settings are configured correctly.'}`
          : `Gagal membuat panduan: ${err.message || 'Pastikan pengaturan AI Anda terisi dengan benar.'}`
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const getCategoryTheme = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('neuro')) return { bg: 'rgba(167,139,250,0.1)', border: 'rgba(167,139,250,0.25)', color: '#a78bfa' };
    if (cat.includes('cardio')) return { bg: 'rgba(244,63,94,0.1)', border: 'rgba(244,63,94,0.25)', color: '#fb7185' };
    if (cat.includes('pulmono')) return { bg: 'rgba(56,189,248,0.1)', border: 'rgba(56,189,248,0.25)', color: '#38bdf8' };
    if (cat.includes('gastro') || cat.includes('hepato')) return { bg: 'rgba(52,211,153,0.1)', border: 'rgba(52,211,153,0.25)', color: '#34d399' };
    return { bg: 'rgba(99,102,241,0.1)', border: 'rgba(99,102,241,0.25)', color: '#818cf8' };
  };

  // Helper to parse double asterisks for inline highlights
  const parseHighlights = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const clean = part.slice(2, -2);
        return (
          <strong key={idx} className="text-indigo-300 font-[700] drop-shadow-[0_0_8px_rgba(129,140,248,0.2)]">
            {clean}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <div className="space-y-5 max-w-5xl mx-auto pb-10">
      
      {/* Header Panel */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <Link href="/">
            <button className="p-2 rounded-xl border border-white/[0.06] bg-[#0c121e]/80 hover:bg-white/5 transition-all text-gray-400 hover:text-white shrink-0">
              <ArrowLeft className="w-4 h-4" />
            </button>
          </Link>
          <div className="icon-box" style={{ background: 'linear-gradient(135deg,#4f46e5,#6366f1)', boxShadow: '0 0 16px rgba(99,102,241,0.35)' }}>
            <Stethoscope className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-[20px] font-[800] tracking-tight" style={{ color: 'var(--text-primary)' }}>
              {t.physical_exam_title}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="badge-offline inline-flex"><WifiOff className="w-2.5 h-2.5" />{t.offline_capable}</span>
              <span className="badge-ai inline-flex"><Sparkles className="w-2.5 h-2.5" />{t.powered_by_ai}</span>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-auto sm:min-w-[280px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
            className="glass-input w-full pl-9 pr-3 py-2.5 text-[13px] font-[500]"
            placeholder={t.search} 
          />
        </div>
      </div>

      {/* AI Physical Exam Generator Panel */}
      <div className="glass-card p-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1 flex-1">
            <h2 className="text-[14px] font-[800] flex items-center gap-1.5" style={{ color: 'var(--text-primary)' }}>
              <Sparkles className="w-4 h-4 text-indigo-400" />
              {language === 'en' ? 'AI Physical Exam Guideline Generator' : 'Generator Panduan Pemeriksaan Fisik AI'}
            </h2>
            <p className="text-[11.5px]" style={{ color: 'var(--text-secondary)' }}>
              {language === 'en' 
                ? 'Generate step-by-step clinical exam instructions, normal, and abnormal findings on demand.'
                : 'Buat panduan pemeriksaan klinis langkah-demi-langkah, temuan normal, dan abnormal secara instan.'}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 w-full md:w-auto">
            <input 
              type="text" 
              value={newExamName} 
              onChange={(e) => setNewExamName(e.target.value)}
              className="glass-input flex-1 md:w-64 py-2 px-3 text-[12.5px]"
              placeholder={t.pe_search_placeholder}
              disabled={isGenerating}
              onKeyDown={(e) => { if (e.key === 'Enter') handleGenerateExam(newExamName); }}
            />
            <button 
              onClick={() => handleGenerateExam(newExamName)}
              disabled={isGenerating || !newExamName.trim()}
              className="px-4 py-2 rounded-xl text-[12.5px] font-[700] flex items-center gap-1.5 transition-all text-white shrink-0 hover:scale-[1.02] disabled:opacity-50 disabled:pointer-events-none"
              style={{ background: 'linear-gradient(135deg, #4f46e5, #4338ca)', boxShadow: '0 4px 12px rgba(79,70,229,0.2)' }}
            >
              {isGenerating ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              <span>{t.pe_generate_btn}</span>
            </button>
          </div>
        </div>

        {generationError && (
          <div className="mt-3 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-[11px] text-rose-400 flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
            <span>{generationError}</span>
          </div>
        )}
      </div>

      {/* Main Grid View */}
      <div className="relative min-h-[300px]">
        {!exams ? (
          <div className="flex items-center justify-center gap-3 py-16">
            <span className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin-slow" style={{ borderColor: 'rgba(99,102,241,0.5)', borderTopColor: 'transparent' }} />
            <span className="text-[13px]" style={{ color: 'var(--text-secondary)' }}>{language === 'en' ? 'Loading guidelines...' : 'Memuat pedoman...'}</span>
          </div>
        ) : exams.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-4 glass-card">
            <BookOpen className="w-12 h-12" style={{ color: 'var(--text-muted)' }} />
            <div className="text-center max-w-sm space-y-1 px-4">
              <p className="text-[14px] font-[700]" style={{ color: 'var(--text-primary)' }}>
                {language === 'en' ? 'No exam guides found' : 'Tidak ada panduan pemeriksaan ditemukan'}
              </p>
              <p className="text-[11.5px]" style={{ color: 'var(--text-muted)' }}>
                {language === 'en' 
                  ? 'Generate a new diagnostic physical exam guide instantly using AI!' 
                  : 'Buat panduan pemeriksaan fisik diagnostik baru secara instan menggunakan AI!'}
              </p>
            </div>
            {search.trim() && (
              <button 
                onClick={() => handleGenerateExam(search)}
                disabled={isGenerating}
                className="px-4 py-2.5 rounded-xl text-[12px] font-[700] flex items-center gap-1.5 text-white transition-all hover:scale-[1.02]"
                style={{ background: 'linear-gradient(135deg, #4f46e5, #6366f1)' }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{language === 'en' ? `Generate "${search}" Guide` : `Buat Panduan "${search}"`}</span>
              </button>
            )}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={search.trim() || '__all__'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {exams.map(exam => {
                const catStyle = getCategoryTheme(exam.category);
                return (
                  <div 
                    key={exam.id}
                    onClick={() => {
                      setSelectedExam(exam);
                      setActivePartId(exam.steps[0]?.bodyPartId || null);
                      setActiveTab('steps');
                      setGenerationError(null);
                    }}
                    className="glass-card flex flex-col h-full group cursor-pointer overflow-hidden transition-all hover:border-indigo-500/30 hover:shadow-lg"
                  >
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex items-start justify-between mb-4 gap-2">
                        <div className="p-2.5 rounded-xl transition-all group-hover:scale-105 shrink-0"
                          style={{ background: catStyle.bg, border: `1px solid ${catStyle.border}` }}>
                          <Stethoscope className="w-5 h-5" style={{ color: catStyle.color }} />
                        </div>
                        <span className="text-[10px] px-2.5 py-1 rounded-full font-[700] uppercase tracking-wider truncate max-w-[170px]"
                          style={{ background: catStyle.bg, border: `1px solid ${catStyle.border}`, color: catStyle.color }}>
                          {exam.category}
                        </span>
                      </div>
                      <h3 className="font-[700] text-[14px] leading-snug mb-2 group-hover:text-indigo-400 transition-colors" style={{ color: 'var(--text-primary)' }}>
                        {language === 'en' ? exam.title.en : exam.title.id}
                      </h3>
                      <p className="text-[12px] leading-relaxed flex-1 line-clamp-3" style={{ color: 'var(--text-secondary)' }}>
                        {language === 'en' ? exam.definition.en : exam.definition.id}
                      </p>
                      <div className="mt-3 pt-2 text-[10px] flex items-center justify-between" style={{ borderTop: '1px solid rgba(255,255,255,0.03)', color: 'var(--text-muted)' }}>
                        <span>{exam.steps.length} {language === 'en' ? 'Steps' : 'Langkah'}</span>
                        {exam.lastGenerated && (
                          <span>{new Date(exam.lastGenerated).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Physical Exam Detail Modal */}
      {mounted && typeof window !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedExam && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0"
                style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
                onClick={() => setSelectedExam(null)}
              />

              {/* Modal Card */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 30 }}
                className="w-full max-w-5xl h-[85vh] flex flex-col rounded-2xl overflow-hidden z-10"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', boxShadow: '0 25px 50px rgba(0,0,0,0.6)' }}
              >
                {/* Modal Header */}
                <div className="p-5 flex items-start justify-between shrink-0 gap-4" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] px-2 py-0.5 rounded font-[800] uppercase tracking-wider"
                        style={{ 
                          background: getCategoryTheme(selectedExam.category).bg, 
                          border: `1px solid ${getCategoryTheme(selectedExam.category).border}`, 
                          color: getCategoryTheme(selectedExam.category).color 
                        }}>
                        {selectedExam.category}
                      </span>
                    </div>
                    <h2 className="text-[16px] font-[800] leading-snug" style={{ color: 'var(--text-primary)' }}>
                      {language === 'en' ? selectedExam.title.en : selectedExam.title.id}
                    </h2>
                  </div>
                  <button 
                    onClick={() => setSelectedExam(null)}
                    className="p-1.5 rounded-lg hover:bg-white/5 transition-all text-neutral-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Tab Switcher */}
                <div className="flex md:hidden p-3 bg-white/5 border-b border-white/5 gap-2 shrink-0">
                  <button
                    onClick={() => setActiveTab('steps')}
                    className={`flex-1 py-2 rounded-xl text-[12px] font-[700] transition-all ${
                      activeTab === 'steps'
                        ? 'bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 shadow-md'
                        : 'text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    {language === 'en' ? 'Exam Steps' : 'Langkah Pemeriksaan'}
                  </button>
                  <button
                    onClick={() => setActiveTab('map')}
                    className={`flex-1 py-2 rounded-xl text-[12px] font-[700] transition-all ${
                      activeTab === 'map'
                        ? 'bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 shadow-md'
                        : 'text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    {language === 'en' ? 'Interactive Map' : 'Peta Interaktif'}
                  </button>
                </div>

                {/* Split Content: Steps (Left) + Body Illustration (Right) */}
                <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                  
                  {/* Left Column: Scrollable Steps */}
                  <div ref={stepsContainerRef} className={`flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar border-r border-white/5 ${activeTab === 'steps' ? 'block' : 'hidden'} md:block`}>
                    
                    {/* Definition */}
                    <div className="glass-card p-4 space-y-2 relative border border-white/5">
                      <div className="flex items-center gap-2 text-indigo-400 font-[800] text-[12.5px]">
                        <Info className="w-4 h-4" />
                        <span>Clinical Purpose</span>
                      </div>
                      <p className="text-[12.5px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {language === 'en' ? selectedExam.definition.en : selectedExam.definition.id}
                      </p>
                    </div>

                    {/* Preparation */}
                    {selectedExam.preparation && (
                      <div className="glass-card p-4 space-y-2 border border-white/5" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.03) 0%, rgba(0,0,0,0) 80%)' }}>
                        <div className="flex items-center gap-2 text-indigo-300 font-[800] text-[12px] uppercase tracking-wider">
                          <Clipboard className="w-4 h-4" />
                          <span>{t.physical_exam_setup}</span>
                        </div>
                        <p className="text-[12px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                          {language === 'en' ? selectedExam.preparation.en : selectedExam.preparation.id}
                        </p>
                      </div>
                    )}

                    {/* Steps Checklist */}
                    <div className="space-y-4">
                      <h3 className="text-[13px] font-[800] uppercase tracking-wider text-neutral-300 flex items-center gap-2 mb-2">
                        <Eye className="w-4 h-4 text-indigo-400" />
                        <span>{t.physical_exam_steps}</span>
                      </h3>

                      {selectedExam.steps.map((step) => {
                        const isHovered = activePartId === step.bodyPartId;
                        return (
                          <div 
                            key={step.stepNumber}
                            onMouseEnter={() => setActivePartId(step.bodyPartId)}
                            className="glass-card p-4 space-y-3 transition-all duration-200 border relative group cursor-pointer"
                            style={isHovered ? {
                              background: 'rgba(99,102,241,0.05)',
                              borderColor: 'rgba(129,140,248,0.3)',
                              boxShadow: '0 4px 20px rgba(99,102,241,0.05)'
                            } : {
                              borderColor: 'rgba(255,255,255,0.05)'
                            }}
                          >
                            {/* Step Header */}
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-[800] uppercase tracking-wider bg-indigo-500/10 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/20">
                                Step {step.stepNumber}
                              </span>
                              <span className="text-[9px] font-[800] tracking-wider text-neutral-400 uppercase">
                                Region: {step.bodyPartId}
                              </span>
                            </div>

                            {/* Instruction */}
                            <p className="text-[13px] font-[500] leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                              {parseHighlights(language === 'en' ? step.instruction.en : step.instruction.id)}
                            </p>

                            {/* Normal / Abnormal Split */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2 pt-2 border-t border-white/5">
                              {/* Normal */}
                              <div className="p-2.5 rounded-xl bg-emerald-500/5 border border-emerald-500/10 space-y-1">
                                <span className="text-[9.5px] font-[800] text-emerald-400 flex items-center gap-1">
                                  <CheckCircle className="w-3 h-3" />
                                  <span>{t.physical_exam_normal}</span>
                                </span>
                                <p className="text-[11.5px] leading-relaxed text-emerald-100/90">
                                  {parseHighlights(language === 'en' ? step.normalFindings.en : step.normalFindings.id)}
                                </p>
                              </div>

                              {/* Abnormal */}
                              <div className="p-2.5 rounded-xl bg-rose-500/5 border border-rose-500/10 space-y-1">
                                <span className="text-[9.5px] font-[800] text-rose-400 flex items-center gap-1">
                                  <AlertCircle className="w-3 h-3" />
                                  <span>{t.physical_exam_abnormal}</span>
                                </span>
                                <p className="text-[11.5px] leading-relaxed text-rose-100/90">
                                  {parseHighlights(language === 'en' ? step.abnormalFindings.en : step.abnormalFindings.id)}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Column: Sticky Body Map (Desktop Only or shown on top) */}
                  <div className={`w-full md:w-[350px] shrink-0 p-5 flex flex-col justify-center bg-black/10 border-t md:border-t-0 md:border-l border-white/5 ${activeTab === 'map' ? 'flex' : 'hidden'} md:flex`}>
                    <h3 className="text-[12px] font-[800] uppercase tracking-wider text-neutral-300 mb-4 text-center shrink-0">
                      {t.body_parts_title}
                    </h3>
                    <div className="flex-1 flex items-center justify-center">
                      <BodyIllustration 
                        activePartId={activePartId}
                        onPartClick={(partId) => setActivePartId(partId)}
                      />
                    </div>
                  </div>

                </div>

                {/* Modal Footer */}
                <div className="p-4 flex items-center justify-between shrink-0" style={{ borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)' }}>
                  <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
                    Physical Exam Diagnostic Guide v1.0
                  </span>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={handleDownloadPDF}
                      className="px-4 py-1.5 rounded-xl text-[12px] font-[700] transition-all bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-blue-400" />
                      <span>{t.download_pdf}</span>
                    </button>
                    <button 
                      onClick={() => setSelectedExam(null)}
                      className="px-4 py-1.5 rounded-xl text-[12px] font-[700] transition-all bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white cursor-pointer"
                    >
                      {t.close}
                    </button>
                  </div>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}

    </div>
  );
}
