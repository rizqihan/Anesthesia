'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import db, { type GuidelineRecord } from '@/lib/db';
import { useAppStore } from '@/store/appStore';
import { translations } from '@/lib/i18n';
import { generateSingleCPG } from '@/lib/syncAgent';
import { 
  BookOpen, Search, WifiOff, FileText, HeartPulse, Stethoscope, Wind, Baby, Pill, ArrowLeft, 
  Activity, FlaskConical, GitBranch, ShieldCheck, GraduationCap, ClipboardCheck, 
  AlertTriangle, Sparkles, ChevronDown, ChevronUp, RefreshCw, X, Plus, Brain, Syringe, Scan,
  Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { printContentAsPDF } from '@/lib/pdfGenerator';

const getCategoryIcon = (category: string) => {
  const cat = category.toLowerCase();
  if (cat.includes('cardio')) return <HeartPulse className="w-5 h-5" style={{ color: '#fb7185' }} />;
  if (cat.includes('pulmonology') || cat.includes('respiratory')) return <Wind className="w-5 h-5" style={{ color: '#38bdf8' }} />;
  if (cat.includes('obste') || cat.includes('pediat') || cat.includes('matern')) return <Baby className="w-5 h-5" style={{ color: '#f472b6' }} />;
  if (cat.includes('endocrin')) return <Pill className="w-5 h-5" style={{ color: '#fbbf24' }} />;
  if (cat.includes('nephro') || cat.includes('renal')) return <FlaskConical className="w-5 h-5" style={{ color: '#2dd4bf' }} />;
  if (cat.includes('gastro') || cat.includes('hepato')) return <Activity className="w-5 h-5" style={{ color: '#34d399' }} />;
  if (cat.includes('neuro')) return <Brain className="w-5 h-5" style={{ color: '#a78bfa' }} />;
  if (cat.includes('anesthes') || cat.includes('surgery') || cat.includes('surgical')) return <Syringe className="w-5 h-5" style={{ color: '#818cf8' }} />;
  if (cat.includes('emergency') || cat.includes('critical') || cat.includes('icu')) return <AlertTriangle className="w-5 h-5" style={{ color: '#f97316' }} />;
  if (cat.includes('infectious')) return <ShieldCheck className="w-5 h-5" style={{ color: '#10b981' }} />;
  if (cat.includes('radiology') || cat.includes('imaging') || cat.includes('interventional')) return <Scan className="w-5 h-5" style={{ color: '#22d3ee' }} />;
  return <Stethoscope className="w-5 h-5" style={{ color: '#a78bfa' }} />;
};

const getCategoryStyle = (category: string): { bg: string; border: string; color: string } => {
  const cat = category.toLowerCase();
  if (cat.includes('cardio')) return { bg: 'rgba(244,63,94,0.1)', border: 'rgba(244,63,94,0.25)', color: '#fb7185' };
  if (cat.includes('pulmonology') || cat.includes('respiratory')) return { bg: 'rgba(56,189,248,0.1)', border: 'rgba(56,189,248,0.25)', color: '#38bdf8' };
  if (cat.includes('obste')) return { bg: 'rgba(236,72,153,0.1)', border: 'rgba(236,72,153,0.25)', color: '#f472b6' };
  if (cat.includes('endocrin')) return { bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.25)', color: '#fbbf24' };
  if (cat.includes('nephro') || cat.includes('renal')) return { bg: 'rgba(45,212,191,0.1)', border: 'rgba(45,212,191,0.25)', color: '#2dd4bf' };
  if (cat.includes('gastro') || cat.includes('hepato')) return { bg: 'rgba(52,211,153,0.1)', border: 'rgba(52,211,153,0.25)', color: '#34d399' };
  if (cat.includes('neuro')) return { bg: 'rgba(167,139,250,0.1)', border: 'rgba(167,139,250,0.25)', color: '#a78bfa' };
  if (cat.includes('anesthes') || cat.includes('surgery') || cat.includes('surgical')) return { bg: 'rgba(129,140,248,0.1)', border: 'rgba(129,140,248,0.25)', color: '#818cf8' };
  if (cat.includes('emergency') || cat.includes('critical')) return { bg: 'rgba(249,115,22,0.1)', border: 'rgba(249,115,22,0.25)', color: '#f97316' };
  if (cat.includes('infectious')) return { bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.25)', color: '#10b981' };
  if (cat.includes('radiology') || cat.includes('imaging') || cat.includes('interventional')) return { bg: 'rgba(6,182,212,0.1)', border: 'rgba(6,182,212,0.25)', color: '#22d3ee' };
  return { bg: 'rgba(139,92,246,0.1)', border: 'rgba(139,92,246,0.25)', color: '#a78bfa' };
};

export default function GuidelinesPage() {
  const { language } = useAppStore();
  const t = translations[language];
  const [search, setSearch] = useState('');
  const [newCondition, setNewCondition] = useState('');
  const [selectedGuideline, setSelectedGuideline] = useState<GuidelineRecord | null>(null);
  
  // Client mount status for React Portal
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // AI generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  
  // Accordion state
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    definition: true,
  });

  // Modal scroll reset ref and effect
  const modalBodyRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (selectedGuideline && modalBodyRef.current) {
      modalBodyRef.current.scrollTop = 0;
    }
  }, [selectedGuideline, isGenerating]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (selectedGuideline) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedGuideline]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleDownloadPDF = () => {
    if (!selectedGuideline || !modalBodyRef.current) return;
    const title = language === 'en' ? selectedGuideline.title.en : selectedGuideline.title.id;
    const contentHtml = modalBodyRef.current.innerHTML;
    printContentAsPDF(
      title,
      contentHtml,
      `cpg_${title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.pdf`
    );
  };

  const guidelines = useLiveQuery(async () => {
    if (typeof window === 'undefined') return [];
    let list: GuidelineRecord[] = [];
    if (!search.trim()) {
      list = await db.guidelines.toArray();
    } else {
      const lowerSearch = search.toLowerCase();
      list = await db.guidelines.filter(g =>
        g.title.en.toLowerCase().includes(lowerSearch) ||
        g.title.id.toLowerCase().includes(lowerSearch) ||
        g.category.toLowerCase().includes(lowerSearch)
      ).toArray();
    }
    
    // Sort alphabetically based on the current language selection
    return list.sort((a, b) => {
      const titleA = language === 'en' ? a.title.en : a.title.id;
      const titleB = language === 'en' ? b.title.en : b.title.id;
      return titleA.localeCompare(titleB, language);
    });
  }, [search, language]);

  // Handle generating a new CPG from scratch
  const handleGenerateCPG = async (conditionName: string) => {
    if (!conditionName.trim()) return;
    setIsGenerating(true);
    setGenerationError(null);
    try {
      const record = await generateSingleCPG(conditionName);
      const id = await db.guidelines.put(record);
      setSelectedGuideline({ ...record, id });
      setNewCondition('');
      setSearch('');
    } catch (err: any) {
      console.error(err);
      setGenerationError(
        language === 'en'
          ? `Generation failed: ${err.message || 'Make sure your AI Configuration in Settings is set up correctly.'}`
          : `Gagal membuat PPK: ${err.message || 'Pastikan Konfigurasi AI di Pengaturan sudah diisi dengan benar.'}`
      );
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle enhancing an unstructured legacy guideline
  const handleEnhanceGuideline = async (g: GuidelineRecord) => {
    if (!g.id) return;
    setIsGenerating(true);
    setGenerationError(null);
    try {
      const record = await generateSingleCPG(language === 'en' ? g.title.en : g.title.id);
      record.id = g.id; // Preserve ID
      if (g.pdfUrl) record.pdfUrl = g.pdfUrl; // Preserve PDF url if any
      await db.guidelines.put(record);
      setSelectedGuideline(record);
    } catch (err: any) {
      console.error(err);
      setGenerationError(
        language === 'en'
          ? `Enhancing failed: ${err.message || 'Make sure your AI provider is online.'}`
          : `Gagal meningkatkan pedoman: ${err.message || 'Pastikan penyedia AI Anda aktif.'}`
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-5 max-w-4xl mx-auto pb-10">
      
      {/* Header Panel */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <Link href="/">
            <button className="p-2 rounded-xl border border-white/[0.06] bg-[#0c121e]/80 hover:bg-white/5 transition-all text-gray-400 hover:text-white shrink-0">
              <ArrowLeft className="w-4 h-4" />
            </button>
          </Link>
          <div className="icon-box" style={{ background: 'linear-gradient(135deg,#0f766e,#14b8a6)', boxShadow: '0 0 16px rgba(20,184,166,0.35)' }}>
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-[20px] font-[800] tracking-tight" style={{ color: 'var(--text-primary)' }}>
              {t.clinical_guidelines_title}
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

      {/* AI CPG Generator Input Panel */}
      <div className="glass-card p-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1 flex-1">
            <h2 className="text-[14px] font-[800] flex items-center gap-1.5" style={{ color: 'var(--text-primary)' }}>
              <Sparkles className="w-4 h-4 text-teal-400" />
              {language === 'en' ? 'AI Clinical Practice Guideline Generator' : 'Generator Pedoman Praktik Klinis AI'}
            </h2>
            <p className="text-[11.5px]" style={{ color: 'var(--text-secondary)' }}>
              {language === 'en' 
                ? 'Create a detailed CPG featuring diagnostic workup, management phases, prevention, and clinical cases on demand.'
                : 'Buat PPK lengkap dengan pemeriksaan penunjang, fase penanganan, pencegahan, dan kasus klinis secara instan.'}
            </p>
          </div>
          
          <div className="flex items-center gap-2 shrink-0 w-full md:w-auto">
            <input 
              type="text" 
              value={newCondition} 
              onChange={(e) => setNewCondition(e.target.value)}
              className="glass-input flex-1 md:w-64 py-2 px-3 text-[12.5px]"
              placeholder={t.cpg_search_placeholder}
              disabled={isGenerating}
              onKeyDown={(e) => { if (e.key === 'Enter') handleGenerateCPG(newCondition); }}
            />
            <button 
              onClick={() => handleGenerateCPG(newCondition)}
              disabled={isGenerating || !newCondition.trim()}
              className="px-4 py-2 rounded-xl text-[12.5px] font-[700] flex items-center gap-1.5 transition-all text-white shrink-0 hover:scale-[1.02] disabled:opacity-50 disabled:pointer-events-none"
              style={{ background: 'linear-gradient(135deg, #0d9488, #0f766e)', boxShadow: '0 4px 12px rgba(13,148,136,0.2)' }}
            >
              {isGenerating ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              <span>{t.cpg_generate_btn}</span>
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

      {/* Main Content Area */}
      <div className="relative min-h-[300px]">
        {!guidelines ? (
          <div className="flex items-center justify-center gap-3 py-16">
            <span className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin-slow" style={{ borderColor: 'rgba(20,184,166,0.5)', borderTopColor: 'transparent' }} />
            <span className="text-[13px]" style={{ color: 'var(--text-secondary)' }}>{language === 'en' ? 'Loading guidelines...' : 'Memuat pedoman...'}</span>
          </div>
        ) : guidelines.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-4 glass-card">
            <BookOpen className="w-12 h-12" style={{ color: 'var(--text-muted)' }} />
            <div className="text-center max-w-sm space-y-1 px-4">
              <p className="text-[14px] font-[700]" style={{ color: 'var(--text-primary)' }}>
                {language === 'en' ? 'No guidelines found' : 'Tidak ada pedoman ditemukan'}
              </p>
              <p className="text-[11.5px]" style={{ color: 'var(--text-muted)' }}>
                {language === 'en' 
                  ? 'We couldn\'t find any matching guidelines in the offline database. Generate a new custom CPG right now!' 
                  : 'Kami tidak menemukan pedoman yang cocok di database luring. Buat PPK kustom baru sekarang juga!'}
              </p>
            </div>
            {search.trim() && (
              <button 
                onClick={() => handleGenerateCPG(search)}
                disabled={isGenerating}
                className="px-4 py-2.5 rounded-xl text-[12px] font-[700] flex items-center gap-1.5 text-white transition-all hover:scale-[1.02]"
                style={{ background: 'linear-gradient(135deg, #0d9488, #14b8a6)' }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{language === 'en' ? `Generate "${search}" CPG` : `Buat PPK "${search}"`}</span>
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
              {guidelines.map(g => {
                const catStyle = getCategoryStyle(g.category);
                return (
                  <div 
                    key={g.id}
                    onClick={() => {
                      setSelectedGuideline(g);
                      setGenerationError(null);
                    }}
                    className="glass-card flex flex-col h-full group cursor-pointer overflow-hidden transition-all hover:border-teal-500/30 hover:shadow-lg"
                  >
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex items-start justify-between mb-4 gap-2">
                        {/* Left Group: Icon */}
                        <div className="p-2.5 rounded-xl transition-all group-hover:scale-105 shrink-0"
                          style={{ background: catStyle.bg, border: `1px solid ${catStyle.border}` }}>
                          {getCategoryIcon(g.category)}
                        </div>
                        {/* Right Group: Category Tag (e.g. Interventional Radiology) */}
                        <span className="text-[10px] px-2.5 py-1 rounded-full font-[700] uppercase tracking-wider truncate max-w-[170px] sm:max-w-none shrink-0"
                          style={{ background: catStyle.bg, border: `1px solid ${catStyle.border}`, color: catStyle.color }}>
                          {g.category}
                        </span>
                      </div>
                      <h3 className="font-[700] text-[14px] leading-snug mb-2 group-hover:text-teal-400 transition-colors" style={{ color: 'var(--text-primary)' }}>
                        {language === 'en' ? g.title.en : g.title.id}
                      </h3>
                      <p className="text-[12px] leading-relaxed flex-1 line-clamp-3" style={{ color: 'var(--text-secondary)' }}>
                        {language === 'en' 
                          ? (g.definition?.en || g.content?.en) 
                          : (g.definition?.id || g.content?.id)}
                      </p>
                      
                      {g.lastGenerated && (
                        <div className="mt-3 pt-2 text-[10px]" style={{ borderTop: '1px solid rgba(255,255,255,0.03)', color: 'var(--text-muted)' }}>
                          {t.cpg_last_generated}: {new Date(g.lastGenerated).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* CPG Detail Modal Overlay */}
      {mounted && typeof window !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedGuideline && (
            <div 
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
              style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
              onClick={() => setSelectedGuideline(null)}
            />
            {/* Modal Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="w-full max-w-2xl max-h-[85vh] flex flex-col rounded-2xl overflow-hidden z-10"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', boxShadow: '0 25px 50px rgba(0,0,0,0.6)' }}
            >
              {/* Modal Header */}
              <div className="p-5 flex items-start justify-between shrink-0 gap-4" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] px-2 py-0.5 rounded font-[800] uppercase tracking-wider"
                      style={{ 
                        background: getCategoryStyle(selectedGuideline.category).bg, 
                        border: `1px solid ${getCategoryStyle(selectedGuideline.category).border}`, 
                        color: getCategoryStyle(selectedGuideline.category).color 
                      }}>
                      {selectedGuideline.category}
                    </span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded font-[800] tracking-wide"
                      style={selectedGuideline.isStructured 
                        ? { background: 'rgba(20,184,166,0.1)', color: '#2dd4bf', border: '1px solid rgba(20,184,166,0.2)' }
                        : { background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)', border: '1px solid rgba(255,255,255,0.08)' }
                      }>
                      {selectedGuideline.isStructured ? t.cpg_is_structured : t.cpg_is_unstructured}
                    </span>
                  </div>
                  <h2 className="text-[16px] font-[800] leading-snug" style={{ color: 'var(--text-primary)' }}>
                    {language === 'en' ? selectedGuideline.title.en : selectedGuideline.title.id}
                  </h2>
                </div>
                <button 
                  onClick={() => setSelectedGuideline(null)}
                  className="p-1.5 rounded-lg hover:bg-white/5 transition-all text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Scrollable Body */}
              <div 
                ref={modalBodyRef}
                className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar"
              >
                
                {/* AI Enhancing loader */}
                {isGenerating && (
                  <div className="flex flex-col items-center justify-center py-12 gap-3 text-center">
                    <div className="relative">
                      <div className="w-10 h-10 border-2 border-teal-500/20 border-t-teal-400 rounded-full animate-spin" />
                      <Sparkles className="w-4 h-4 text-teal-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <span className="text-[12.5px] font-[700] text-teal-400 animate-pulse">{t.cpg_generating_ai}</span>
                    <span className="text-[11px] max-w-xs" style={{ color: 'var(--text-muted)' }}>
                      {language === 'en'
                        ? 'Synthesizing evidence-based guidelines and compiling structured sections...'
                        : 'Menyusun pedoman berbasis bukti dan merangkum bagian-bagian terstruktur...'}
                    </span>
                  </div>
                )}

                {/* Legacy/Unstructured Banner & Content */}
                {!isGenerating && !selectedGuideline.isStructured && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-3">
                      <div className="flex gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <div className="space-y-1">
                          <h4 className="text-[12px] font-[700] text-amber-400">
                            {language === 'en' ? 'Unstructured Guideline' : 'Pedoman Tidak Terstruktur'}
                          </h4>
                          <p className="text-[11.5px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            {t.cpg_enhance_warning}
                          </p>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => handleEnhanceGuideline(selectedGuideline)}
                        className="w-full py-2 rounded-xl text-[12px] font-[800] flex items-center justify-center gap-1.5 text-white transition-all hover:scale-[1.01]"
                        style={{ background: 'linear-gradient(135deg, #d97706, #b45309)' }}
                      >
                        <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                        <span>{t.cpg_enhance_ai}</span>
                      </button>
                    </div>

                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
                      <span className="text-[11px] font-[700] uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                        {language === 'en' ? 'Description' : 'Deskripsi'}
                      </span>
                      <p className="text-[13px] leading-relaxed whitespace-pre-wrap" style={{ color: 'var(--text-secondary)' }}>
                        {language === 'en' ? selectedGuideline.content?.en : selectedGuideline.content?.id}
                      </p>
                    </div>
                  </div>
                )}

                {/* Structured CPG View (9 Accordions) */}
                {!isGenerating && selectedGuideline.isStructured && (
                  <div className="space-y-3">
                    
                    {/* Section 1: Definition */}
                    <AccordionCard 
                      id="definition"
                      title={t.cpg_definition}
                      icon={<BookOpen className="w-4 h-4" />}
                      isExpanded={expandedSections.definition}
                      onToggle={toggleSection}
                      content={language === 'en' ? selectedGuideline.definition?.en : selectedGuideline.definition?.id}
                    />

                    {/* Section 2: Symptoms */}
                    <AccordionCard 
                      id="symptoms"
                      title={t.cpg_symptoms}
                      icon={<Activity className="w-4 h-4" />}
                      isExpanded={expandedSections.symptoms}
                      onToggle={toggleSection}
                      content={language === 'en' ? selectedGuideline.symptoms?.en : selectedGuideline.symptoms?.id}
                    />

                    {/* Section 3: Physical Examination */}
                    <AccordionCard 
                      id="physicalExamination"
                      title={t.cpg_physical_exam}
                      icon={<Stethoscope className="w-4 h-4" />}
                      isExpanded={expandedSections.physicalExamination}
                      onToggle={toggleSection}
                      content={language === 'en' ? selectedGuideline.physicalExamination?.en : selectedGuideline.physicalExamination?.id}
                    />

                    {/* Section 4: Lab Findings */}
                    <AccordionCard 
                      id="labFindings"
                      title={t.cpg_lab_findings}
                      icon={<FlaskConical className="w-4 h-4" />}
                      isExpanded={expandedSections.labFindings}
                      onToggle={toggleSection}
                      content={language === 'en' ? selectedGuideline.labFindings?.en : selectedGuideline.labFindings?.id}
                    />

                    {/* Section 5: Differential Diagnosis */}
                    <AccordionCard 
                      id="differentialDiagnosis"
                      title={t.cpg_diff_diagnosis}
                      icon={<GitBranch className="w-4 h-4" />}
                      isExpanded={expandedSections.differentialDiagnosis}
                      onToggle={toggleSection}
                      content={language === 'en' ? selectedGuideline.differentialDiagnosis?.en : selectedGuideline.differentialDiagnosis?.id}
                    />

                    {/* Section 5b: Danger Signs (conditional) */}
                    {(language === 'en' ? selectedGuideline.dangerSigns?.en : selectedGuideline.dangerSigns?.id) && (
                      <div className="glass-card rounded-xl overflow-hidden border border-red-500/20" style={{ background: 'linear-gradient(135deg, rgba(239,68,68,0.06) 0%, rgba(0,0,0,0) 60%)' }}>
                        <button 
                          onClick={() => toggleSection('dangerSigns')}
                          className="w-full px-4 py-3.5 flex items-center justify-between transition-colors hover:bg-red-500/5"
                          style={{ borderBottom: expandedSections.dangerSigns ? '1px solid rgba(239,68,68,0.12)' : 'none' }}
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-red-500/15 text-red-400 border border-red-500/30">
                              <AlertTriangle className="w-4 h-4" />
                            </div>
                            <span className="text-[13px] font-[800] text-red-300">{t.cpg_danger_signs}</span>
                          </div>
                          {expandedSections.dangerSigns ? <ChevronUp className="w-4 h-4 text-red-400" /> : <ChevronDown className="w-4 h-4 text-red-400" />}
                        </button>
                        
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: expandedSections.dangerSigns ? 'auto' : 0, opacity: expandedSections.dangerSigns ? 1 : 0 }}
                          transition={{ duration: 0.25 }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div className="p-4">
                            <div className="p-3 rounded-lg border border-red-500/15 bg-red-500/5">
                              <FormattedContent 
                                text={language === 'en' ? selectedGuideline.dangerSigns?.en : selectedGuideline.dangerSigns?.id} 
                                isDanger={true} 
                              />
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    )}

                    {/* Section 6: Management (6 Subsections Grid) */}
                    <div className="glass-card rounded-xl overflow-hidden border border-white/5">
                      <button 
                        onClick={() => toggleSection('management')}
                        className="w-full px-4 py-3.5 flex items-center justify-between transition-colors hover:bg-white/5"
                        style={{ borderBottom: expandedSections.management ? '1px solid rgba(255,255,255,0.05)' : 'none' }}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-teal-500/10 text-teal-400 border border-teal-500/25">
                            <HeartPulse className="w-4 h-4" />
                          </div>
                          <span className="text-[13px] font-[800]" style={{ color: 'var(--text-primary)' }}>{t.cpg_management}</span>
                        </div>
                        {expandedSections.management ? <ChevronUp className="w-4 h-4 text-neutral-400" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
                      </button>
                      
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: expandedSections.management ? 'auto' : 0, opacity: expandedSections.management ? 1 : 0 }}
                        transition={{ duration: 0.25 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div className="p-4 space-y-3">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <SubSectionCard 
                              title={t.cpg_initial_treatment}
                              content={language === 'en' ? selectedGuideline.management?.initialTreatment?.en : selectedGuideline.management?.initialTreatment?.id}
                              accentColor="rose"
                            />
                            <SubSectionCard 
                              title={t.cpg_definitive_treatment}
                              content={language === 'en' ? selectedGuideline.management?.definitiveTreatment?.en : selectedGuideline.management?.definitiveTreatment?.id}
                              accentColor="teal"
                            />
                            <SubSectionCard 
                              title={t.cpg_workup}
                              content={language === 'en' ? selectedGuideline.management?.workup?.en : selectedGuideline.management?.workup?.id}
                              accentColor="sky"
                            />
                            <SubSectionCard 
                              title={t.cpg_rehab}
                              content={language === 'en' ? selectedGuideline.management?.rehab?.en : selectedGuideline.management?.rehab?.id}
                              accentColor="purple"
                            />
                            <SubSectionCard 
                              title={t.cpg_referral}
                              content={language === 'en' ? selectedGuideline.management?.referral?.en : selectedGuideline.management?.referral?.id}
                              accentColor="amber"
                            />
                            {selectedGuideline.management?.other && (language === 'en' ? selectedGuideline.management.other.en : selectedGuideline.management.other.id) && (
                              <SubSectionCard 
                                title={t.cpg_other_mgmt}
                                content={language === 'en' ? selectedGuideline.management.other.en : selectedGuideline.management.other.id}
                                accentColor="neutral"
                              />
                            )}
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Section 7: Follow Up */}
                    <AccordionCard 
                      id="followUp"
                      title={t.cpg_follow_up}
                      icon={<ClipboardCheck className="w-4 h-4" />}
                      isExpanded={expandedSections.followUp}
                      onToggle={toggleSection}
                      content={language === 'en' ? selectedGuideline.followUp?.en : selectedGuideline.followUp?.id}
                    />

                    {/* Section 8: Prevention (2 Subsections Grid) */}
                    <div className="glass-card rounded-xl overflow-hidden border border-white/5">
                      <button 
                        onClick={() => toggleSection('prevention')}
                        className="w-full px-4 py-3.5 flex items-center justify-between transition-colors hover:bg-white/5"
                        style={{ borderBottom: expandedSections.prevention ? '1px solid rgba(255,255,255,0.05)' : 'none' }}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-teal-500/10 text-teal-400 border border-teal-500/25">
                            <ShieldCheck className="w-4 h-4" />
                          </div>
                          <span className="text-[13px] font-[800]" style={{ color: 'var(--text-primary)' }}>{t.cpg_prevention}</span>
                        </div>
                        {expandedSections.prevention ? <ChevronUp className="w-4 h-4 text-neutral-400" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
                      </button>
                      
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: expandedSections.prevention ? 'auto' : 0, opacity: expandedSections.prevention ? 1 : 0 }}
                        transition={{ duration: 0.25 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div className="p-4 space-y-3">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <SubSectionCard 
                              title={t.cpg_pharmacological}
                              content={language === 'en' ? selectedGuideline.prevention?.pharmacological?.en : selectedGuideline.prevention?.pharmacological?.id}
                              accentColor="sky"
                            />
                            <SubSectionCard 
                              title={t.cpg_non_pharmacological}
                              content={language === 'en' ? selectedGuideline.prevention?.nonPharmacological?.en : selectedGuideline.prevention?.nonPharmacological?.id}
                              accentColor="emerald"
                            />
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Section 9: Clinical Case Example (Visually distinct purple layout) */}
                    <div 
                      className="rounded-xl overflow-hidden border transition-all"
                      style={{ 
                        background: 'linear-gradient(135deg, rgba(139,92,246,0.06), rgba(99,102,241,0.06))',
                        border: '1px solid rgba(139,92,246,0.25)', 
                        boxShadow: '0 4px 20px rgba(139,92,246,0.06)'
                      }}
                    >
                      <button 
                        onClick={() => toggleSection('caseExample')}
                        className="w-full px-4 py-3.5 flex items-center justify-between transition-colors hover:bg-purple-500/5"
                        style={{ borderBottom: expandedSections.caseExample ? '1px solid rgba(139,92,246,0.15)' : 'none' }}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-purple-500/20 text-purple-300 border border-purple-500/30">
                            <GraduationCap className="w-4 h-4" />
                          </div>
                          <span className="text-[13.5px] font-[900]" style={{ color: '#c084fc' }}>{t.cpg_case_example}</span>
                        </div>
                        {expandedSections.caseExample ? <ChevronUp className="w-4 h-4 text-purple-300" /> : <ChevronDown className="w-4 h-4 text-purple-300" />}
                      </button>
                      
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: expandedSections.caseExample ? 'auto' : 0, opacity: expandedSections.caseExample ? 1 : 0 }}
                        transition={{ duration: 0.25 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div className="p-5">
                          <FormattedContent 
                            text={language === 'en' ? selectedGuideline.caseExample?.en : selectedGuideline.caseExample?.id} 
                            isCase={true} 
                          />
                        </div>
                      </motion.div>
                    </div>

                    {/* Section 10: Guideline References */}
                    <AccordionCard 
                      id="references"
                      title={t.cpg_references}
                      icon={<FileText className="w-4 h-4" />}
                      isExpanded={expandedSections.references}
                      onToggle={toggleSection}
                      content={language === 'en' ? selectedGuideline.references?.en : selectedGuideline.references?.id}
                    />

                  </div>
                )}

                {generationError && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-[11px] text-rose-400 flex items-center gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span>{generationError}</span>
                  </div>
                )}

              </div>

              {/* Modal Footer */}
              <div className="p-4 flex items-center justify-between shrink-0" style={{ borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)' }}>
                <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
                  Anesthesia CPG Agent v1.2
                </span>
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handleDownloadPDF}
                    className="px-4 py-2 rounded-xl text-[11.5px] font-[700] transition-all flex items-center gap-1.5 text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-blue-400" />
                    <span>{t.download_pdf}</span>
                  </button>
                  <a 
                    href={selectedGuideline.pdfUrl ? selectedGuideline.pdfUrl : `https://www.google.com/search?q=${encodeURIComponent(language === 'en' ? selectedGuideline.title.en : selectedGuideline.title.id)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl text-[11.5px] font-[700] transition-all flex items-center gap-1.5 text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10"
                    style={{ textDecoration: 'none' }}
                  >
                    {selectedGuideline.pdfUrl ? (
                      <>
                        <FileText className="w-3.5 h-3.5 text-teal-400" />
                        <span>Official PDF</span>
                      </>
                    ) : (
                      <>
                        <Search className="w-3.5 h-3.5" />
                        <span>Google Search</span>
                      </>
                    )}
                  </a>
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

// ─── Sub-Components ───

interface FormattedContentProps {
  text: string | undefined;
  isDanger?: boolean;
  isCase?: boolean;
}

function FormattedContent({ text, isDanger = false, isCase = false }: FormattedContentProps) {
  if (!text) return null;

  const lines = text.split('\n');
  const renderedElements: React.ReactNode[] = [];
  let currentListItems: React.ReactNode[] = [];

  const bulletColor = isDanger 
    ? "before:bg-rose-400/80 before:shadow-[0_0_8px_rgba(244,63,94,0.6)]" 
    : isCase 
      ? "before:bg-purple-400/80 before:shadow-[0_0_8px_rgba(167,139,250,0.6)]"
      : "before:bg-teal-400/80 before:shadow-[0_0_8px_rgba(45,212,191,0.6)]";
      
  const borderColor = isDanger 
    ? "border-rose-500/25" 
    : isCase 
      ? "border-purple-500/25" 
      : "border-teal-500/25";

  const boldClass = isDanger 
    ? "text-rose-300 font-[800] drop-shadow-[0_0_12px_rgba(244,63,94,0.15)]" 
    : isCase 
      ? "text-purple-300 font-[800] drop-shadow-[0_0_12px_rgba(167,139,250,0.15)]" 
      : "text-teal-300 font-[800] drop-shadow-[0_0_12px_rgba(45,212,191,0.15)]";

  const textClass = isDanger 
    ? "text-rose-100/95" 
    : isCase 
      ? "text-purple-100/95" 
      : "text-neutral-200/95";

  const parseBoldText = (str: string) => {
    const parts = str.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const cleanText = part.slice(2, -2);
        return (
          <strong key={idx} className={boldClass}>
            {cleanText}
          </strong>
        );
      }
      return part;
    });
  };

  const flushList = (key: number) => {
    if (currentListItems.length > 0) {
      renderedElements.push(
        <ul key={`ul-${key}`} className={`my-2 ml-1.5 space-y-2 border-l-2 ${borderColor} pl-4`}>
          {currentListItems}
        </ul>
      );
      currentListItems = [];
    }
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('•')) {
      const content = line.substring(line.indexOf('•') + 1).trim();
      currentListItems.push(
        <li 
          key={`li-${index}`} 
          className={`relative list-none text-[12.5px] leading-relaxed font-[500] ${textClass} before:content-[''] before:absolute before:-left-5 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full ${bulletColor}`}
        >
          {parseBoldText(content)}
        </li>
      );
    } else {
      flushList(index);
      if (trimmed.length > 0) {
        renderedElements.push(
          <p key={`p-${index}`} className={`text-[12.5px] leading-relaxed mb-2 font-[500] ${textClass}`}>
            {parseBoldText(line)}
          </p>
        );
      }
    }
  });

  flushList(lines.length);

  return <div className="space-y-0.5">{renderedElements}</div>;
}

interface AccordionCardProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  isExpanded: boolean;
  onToggle: (id: string) => void;
  content: string | undefined;
}

function AccordionCard({ id, title, icon, isExpanded, onToggle, content }: AccordionCardProps) {
  if (!content) return null;
  
  return (
    <div className="glass-card rounded-xl overflow-hidden border border-white/5">
      <button 
        onClick={() => onToggle(id)}
        className="w-full px-4 py-3.5 flex items-center justify-between transition-colors hover:bg-white/5"
        style={{ borderBottom: isExpanded ? '1px solid rgba(255,255,255,0.05)' : 'none' }}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-teal-500/10 text-teal-400 border border-teal-500/25">
            {icon}
          </div>
          <span className="text-[13px] font-[800]" style={{ color: 'var(--text-primary)' }}>{title}</span>
        </div>
        {isExpanded ? <ChevronUp className="w-4 h-4 text-neutral-400" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
      </button>
      
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        style={{ overflow: 'hidden' }}
      >
        <div className="p-4 pt-3">
          <FormattedContent text={content} />
        </div>
      </motion.div>
    </div>
  );
}

interface SubSectionCardProps {
  title: string;
  content: string | undefined;
  accentColor: 'rose' | 'teal' | 'sky' | 'purple' | 'amber' | 'emerald' | 'neutral';
}

function SubSectionCard({ title, content, accentColor }: SubSectionCardProps) {
  if (!content) return null;

  const accentStyles = {
    rose: { border: 'border-l-[3px] border-l-rose-500', bg: 'bg-rose-500/5', text: 'text-rose-400' },
    teal: { border: 'border-l-[3px] border-l-teal-500', bg: 'bg-teal-500/5', text: 'text-teal-400' },
    sky: { border: 'border-l-[3px] border-l-sky-500', bg: 'bg-sky-500/5', text: 'text-sky-400' },
    purple: { border: 'border-l-[3px] border-l-purple-500', bg: 'bg-purple-500/5', text: 'text-purple-400' },
    amber: { border: 'border-l-[3px] border-l-amber-500', bg: 'bg-amber-500/5', text: 'text-amber-400' },
    emerald: { border: 'border-l-[3px] border-l-emerald-500', bg: 'bg-emerald-500/5', text: 'text-emerald-400' },
    neutral: { border: 'border-l-[3px] border-l-neutral-500', bg: 'bg-neutral-500/5', text: 'text-neutral-300' },
  };

  const currentAccent = accentStyles[accentColor];

  return (
    <div className={`p-4 rounded-xl ${currentAccent.bg} ${currentAccent.border} border border-white/5 space-y-1.5`}>
      <h5 className={`text-[11.5px] font-[800] uppercase tracking-wider ${currentAccent.text}`}>
        {title}
      </h5>
      <div>
        <FormattedContent text={content} />
      </div>
    </div>
  );
}
