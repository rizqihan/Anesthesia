'use client';

import React, { useState, useCallback } from 'react';
import { useAppStore } from '@/store/appStore';
import { translations } from '@/lib/i18n';
import { Settings, Cpu, Wifi, WifiOff, AlertTriangle, Database, RefreshCw, Book, Pill, FileText, Sparkles, Loader2, Stethoscope, ArrowLeft } from 'lucide-react';
import db from '@/lib/db';
import { ICD10_DB } from '@/lib/icd10';
import { DRUG_DB } from '@/lib/drugs';
import { GUIDELINES_DB } from '@/lib/guidelines';
import { PHYSICAL_EXAMS_DB } from '@/lib/physicalExamsData';
import { useLiveQuery } from 'dexie-react-hooks';
import { AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { syncICD10, syncDrugs, syncGuidelines, syncPhysicalExams, type SyncResult } from '@/lib/syncAgent';
import SyncReviewPanel from '@/components/SyncReviewPanel';

type DatasetType = 'icd10' | 'drugs' | 'guidelines' | 'physicalExams';

export default function SettingsPage() {
  const store = useAppStore();
  const t = translations[store.language];

  // AI config status
  const isAiConfigured = () => {
    // default_groq is always considered configured (key is server-side)
    if (store.aiProvider === 'custom_gemini' && !store.customGeminiKey.trim()) return false;
    if (store.aiProvider === 'openai_compatible' && (!store.openaiEndpoint.trim() || !store.openaiKey.trim())) return false;
    return true;
  };
  const aiStatus = store.isOffline ? 'offline' : isAiConfigured() ? 'ready' : 'missing';

  // Live record counts from IndexedDB
  const icd10Count = useLiveQuery(() => db.icd10.count(), []) ?? 0;
  const drugCount = useLiveQuery(() => db.drugs.count(), []) ?? 0;
  const guidelineCount = useLiveQuery(() => db.guidelines.count(), []) ?? 0;
  const physicalExamCount = useLiveQuery(() => db.physicalExams.count(), []) ?? 0;

  // Sync state
  const [syncingDataset, setSyncingDataset] = useState<DatasetType | null>(null);
  const [syncError, setSyncError] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [reviewData, setReviewData] = useState<{ type: DatasetType; result: SyncResult<any> } | null>(null);

  // Groq model browser
  const [groqModels, setGroqModels] = useState<{ id: string; owned_by: string }[]>([]);
  const [loadingGroqModels, setLoadingGroqModels] = useState(false);
  const [groqModelsError, setGroqModelsError] = useState<string | null>(null);

  const RECOMMENDED_GROQ_MODELS = [
    'llama-3.1-8b-instant',
    'llama-3.3-70b-versatile',
    'openai/gpt-oss-20b',
    'openai/gpt-oss-120b',
  ];

  const fetchGroqModels = useCallback(async () => {
    setLoadingGroqModels(true);
    setGroqModelsError(null);
    try {
      const res = await fetch('/api/groq/models');
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error?.message || `Failed to fetch models (${res.status})`);
      }
      const data = await res.json();
      const models = (data.data || [])
        .map((m: { id: string; owned_by?: string }) => ({ id: m.id, owned_by: m.owned_by || '' }))
        .sort((a: { id: string }, b: { id: string }) => a.id.localeCompare(b.id));
      setGroqModels(models);
    } catch (e) {
      setGroqModelsError(e instanceof Error ? e.message : 'Failed to fetch models');
    } finally {
      setLoadingGroqModels(false);
    }
  }, []);

  // Seed initial data (first-time setup)
  const seedDatabase = useCallback(async () => {
    try {
      await db.icd10.bulkPut(ICD10_DB);
      await db.drugs.bulkPut(DRUG_DB);
      await db.guidelines.bulkPut(GUIDELINES_DB);
      await db.physicalExams.bulkPut(PHYSICAL_EXAMS_DB);
      const now = new Date().toISOString();
      store.updateSyncMeta('icd10', { lastSynced: now, count: ICD10_DB.length, fullLoaded: false });
      store.updateSyncMeta('drugs', { lastSynced: now, count: DRUG_DB.length });
      store.updateSyncMeta('guidelines', { lastSynced: now, count: GUIDELINES_DB.length });
      store.updateSyncMeta('physicalExams', { lastSynced: now, count: PHYSICAL_EXAMS_DB.length });

      // Trigger full ICD-10 loading
      try {
        const { loadFullICD10 } = await import('@/lib/icd10');
        const count = await loadFullICD10();
        store.updateSyncMeta('icd10', {
          lastSynced: new Date().toISOString(),
          count,
          fullLoaded: true
        });
      } catch (icdErr) {
        console.error('Failed to seed full ICD-10 database:', icdErr);
      }
    } catch (e) {
      console.error('Seed error:', e);
    }
  }, [store]);

  const handleResetDatabase = useCallback(async () => {
    if (!window.confirm(store.language === 'en' ? 'Are you sure you want to reset the database? Any synced data will be lost.' : 'Apakah Anda yakin ingin mereset database? Data hasil sinkronisasi akan hilang.')) return;
    try {
      await db.icd10.clear();
      await db.drugs.clear();
      await db.guidelines.clear();
      await db.physicalExams.clear();
      await seedDatabase();
    } catch (e) {
      console.error('Reset error:', e);
      setSyncError(store.language === 'en' ? 'Failed to reset database' : 'Gagal mereset database');
    }
  }, [seedDatabase, store.language]);

  // AI-powered sync for a specific dataset
  const handleSync = useCallback(async (dataset: DatasetType) => {
    if (syncingDataset) return;
    setSyncingDataset(dataset);
    setSyncError(null);

    try {
      // If the DB is empty, seed first
      const counts = { icd10: icd10Count, drugs: drugCount, guidelines: guidelineCount, physicalExams: physicalExamCount };
      if (counts[dataset] === 0) {
        if (dataset === 'icd10') await db.icd10.bulkPut(ICD10_DB);
        if (dataset === 'drugs') await db.drugs.bulkPut(DRUG_DB);
        if (dataset === 'guidelines') await db.guidelines.bulkPut(GUIDELINES_DB);
        if (dataset === 'physicalExams') await db.physicalExams.bulkPut(PHYSICAL_EXAMS_DB);
      }

      // Call AI sync agent
      let result;
      if (dataset === 'icd10') result = await syncICD10();
      else if (dataset === 'drugs') result = await syncDrugs();
      else if (dataset === 'guidelines') result = await syncGuidelines();
      else result = await syncPhysicalExams();

      if (result.newEntries.length > 0 || result.updatedEntries.length > 0) {
        setReviewData({ type: dataset, result });
      } else {
        setSyncError(t.no_new_data);
        setTimeout(() => setSyncError(null), 3000);
      }
    } catch (e) {
      console.error('Sync error:', e);
      setSyncError(e instanceof Error ? e.message : t.sync_error);
    } finally {
      setSyncingDataset(null);
    }
  }, [syncingDataset, icd10Count, drugCount, guidelineCount, physicalExamCount, t]);

  const handleApprove = useCallback(async (newSelected: Record<string, any>[], updateSelected: Record<string, any>[]) => {
    if (!reviewData) return;
    const { type } = reviewData;
    const allEntries = [...newSelected, ...updateSelected];

    try {
      if (type === 'icd10') await db.icd10.bulkPut(allEntries as unknown as import('@/lib/db').ICD10Record[]);
      else if (type === 'drugs') await db.drugs.bulkPut(allEntries as unknown as import('@/lib/drugs').Drug[]);
      else if (type === 'guidelines') await db.guidelines.bulkPut(allEntries as unknown as import('@/lib/db').GuidelineRecord[]);
      else await db.physicalExams.bulkPut(allEntries as unknown as import('@/lib/db').PhysicalExamRecord[]);

      const count = type === 'icd10' ? await db.icd10.count() : type === 'drugs' ? await db.drugs.count() : type === 'guidelines' ? await db.guidelines.count() : await db.physicalExams.count();
      store.updateSyncMeta(type, { lastSynced: new Date().toISOString(), count });
    } catch (e) {
      console.error('Approve error:', e);
    }

    setReviewData(null);
  }, [reviewData, store]);

  const inputClass = "glass-input w-full px-3 py-2.5 text-[13px] font-[500]";
  const labelClass = "form-label";

  const datasets: { key: DatasetType; label: string; icon: React.ReactNode; count: number; color: string; gradient: string }[] = [
    { key: 'icd10', label: t.icd10_dictionary, icon: <Book className="w-3.5 h-3.5" />, count: icd10Count, color: '#fbbf24', gradient: 'rgba(251,191,36,0.1)' },
    { key: 'drugs', label: t.drug_formulary, icon: <Pill className="w-3.5 h-3.5" />, count: drugCount, color: '#a78bfa', gradient: 'rgba(167,139,250,0.1)' },
    { key: 'guidelines', label: t.clinical_guidelines, icon: <FileText className="w-3.5 h-3.5" />, count: guidelineCount, color: '#34d399', gradient: 'rgba(52,211,153,0.1)' },
    { key: 'physicalExams', label: t.physical_exam_title, icon: <Stethoscope className="w-3.5 h-3.5" />, count: physicalExamCount, color: '#818cf8', gradient: 'rgba(129,140,248,0.1)' },
  ];

  return (
    <div className="space-y-5 max-w-4xl mx-auto">
      <div className="flex items-center gap-3">
        <Link href="/">
          <button className="p-2 rounded-xl border border-white/[0.06] bg-[#0c121e]/80 hover:bg-white/5 transition-all text-gray-400 hover:text-white shrink-0">
            <ArrowLeft className="w-4 h-4" />
          </button>
        </Link>
        <div className="icon-box" style={{ background: 'linear-gradient(135deg,#374151,#6b7280)', boxShadow: '0 0 12px rgba(107,114,128,0.25)' }}>
          <Settings className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-[18px] font-[800] tracking-tight" style={{ color: 'var(--text-primary)' }}>{t.settings}</h1>
          <p className="text-[12px]" style={{ color: 'var(--text-muted)' }}>{store.language === 'en' ? 'Manage application preferences' : 'Kelola preferensi aplikasi'}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* AI Config Card */}
        <div className="glass-card-static overflow-hidden">
          <div className="section-header justify-between">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
              <span className="section-header-label">{t.ai_config}</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-[600]">
              <span style={{ color: 'var(--text-muted)' }}>{t.ai_status}:</span>
              {aiStatus === 'offline' && (
                <span className="flex items-center gap-1" style={{ color: '#fb7185' }}><WifiOff className="w-3 h-3" />{t.offline}</span>
              )}
              {aiStatus === 'ready' && (
                <span className="flex items-center gap-1" style={{ color: '#34d399' }}><Wifi className="w-3 h-3" />{t.ready}</span>
              )}
              {aiStatus === 'missing' && (
                <span className="flex items-center gap-1" style={{ color: '#fbbf24' }}><AlertTriangle className="w-3 h-3" />{t.missing_config}</span>
              )}
            </div>
          </div>
          <div className="p-5 flex flex-col gap-4">
            <div>
              <label className={labelClass}>{t.ai_provider}</label>
              <select value={store.aiProvider} onChange={(e) => store.setAiProvider(e.target.value as 'default_groq' | 'custom_gemini' | 'openai_compatible')} className={inputClass}>
                <option value="default_groq">{t.default_gemini}</option>
                <option value="custom_gemini">{t.custom_gemini}</option>
                <option value="openai_compatible">{t.openai_compatible}</option>
              </select>
            </div>

            {store.aiProvider === 'default_groq' && (
              <div className="flex flex-col gap-3">
                <div>
                  <label className={labelClass}>{t.groq_model}</label>
                  <select value={store.groqModel} onChange={(e) => store.setGroqModel(e.target.value)} className={inputClass}>
                    <optgroup label={store.language === 'en' ? 'Recommended' : 'Rekomendasi'}>
                      <option value="llama-3.1-8b-instant">Llama 3.1 8B Instant</option>
                      <option value="llama-3.3-70b-versatile">Llama 3.3 70B Versatile</option>
                      <option value="openai/gpt-oss-20b">GPT-OSS 20B</option>
                      <option value="openai/gpt-oss-120b">GPT-OSS 120B</option>
                    </optgroup>
                    {groqModels.length > 0 && (
                      <optgroup label={store.language === 'en' ? 'All Available Models' : 'Semua Model Tersedia'}>
                        {groqModels
                          .filter(m => !RECOMMENDED_GROQ_MODELS.includes(m.id))
                          .map(m => (
                            <option key={m.id} value={m.id}>{m.id}</option>
                          ))}
                      </optgroup>
                    )}
                  </select>
                </div>
                <button
                  type="button"
                  onClick={fetchGroqModels}
                  disabled={loadingGroqModels}
                  className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-[12px] font-[600] transition-all"
                  style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', color: '#93c5fd' }}
                >
                  {loadingGroqModels ? (
                    <><Loader2 className="w-3.5 h-3.5 animate-spin" />{store.language === 'en' ? 'Fetching models...' : 'Mengambil model...'}</>
                  ) : (
                    <><RefreshCw className="w-3.5 h-3.5" />{store.language === 'en' ? 'Browse All Available Models' : 'Jelajahi Semua Model'}</>
                  )}
                </button>
                {groqModelsError && (
                  <div className="text-[11px] font-[500]" style={{ color: '#fb7185' }}>{groqModelsError}</div>
                )}
              </div>
            )}

            {store.aiProvider === 'custom_gemini' && (
              <div>
                <label className={labelClass}>{t.api_key} (Gemini)</label>
                <input type="password" value={store.customGeminiKey} onChange={(e) => store.setCustomGeminiKey(e.target.value)} className={inputClass} placeholder="AIzaSy..." />
              </div>
            )}

            {store.aiProvider === 'openai_compatible' && (
              <div className="flex flex-col gap-3">
                <div>
                  <label className={labelClass}>{t.endpoint_url}</label>
                  <input type="text" value={store.openaiEndpoint} onChange={(e) => store.setOpenaiEndpoint(e.target.value)} className={inputClass} placeholder="https://api.groq.com/openai/v1" />
                </div>
                <div>
                  <label className={labelClass}>{t.api_key}</label>
                  <input type="password" value={store.openaiKey} onChange={(e) => store.setOpenaiKey(e.target.value)} className={inputClass} placeholder="sk-..." />
                </div>
                <div>
                  <label className={labelClass}>{t.model_name}</label>
                  <input type="text" value={store.openaiModel} onChange={(e) => store.setOpenaiModel(e.target.value)} className={inputClass} placeholder="llama-3.3-70b-versatile" />
                </div>
              </div>
            )}

            <div className="p-3 rounded-lg text-[11px]" style={{ background: 'rgba(59,130,246,0.07)', border: '1px solid rgba(59,130,246,0.15)', color: 'var(--text-muted)' }}>
              {store.language === 'en' ? 'Configuration is automatically saved to local browser storage.' : 'Konfigurasi otomatis tersimpan di penyimpanan browser lokal.'}
            </div>
          </div>
        </div>

        {/* AI-Powered Database Sync Card */}
        <div className="glass-card-static overflow-hidden">
          <div className="section-header justify-between">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
              <span className="section-header-label">{t.database_sync}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" style={{ color: '#a78bfa' }} />
              <span className="text-[11px] font-[600]" style={{ color: '#a78bfa' }}>{t.requires_ai}</span>
            </div>
          </div>
          <div className="p-5 flex flex-col gap-4">
            {/* Description */}
            <div className="p-3 rounded-lg text-[11px]" style={{ background: 'rgba(167,139,250,0.06)', border: '1px solid rgba(167,139,250,0.12)', color: 'var(--text-muted)' }}>
              <div className="flex items-center gap-1.5 mb-1">
                <Sparkles className="w-3 h-3" style={{ color: '#a78bfa' }} />
                <span className="font-[700]" style={{ color: '#a78bfa' }}>{t.database_sync}</span>
              </div>
              {t.ai_sync_desc}
              {(store.aiProvider === 'default_groq' || store.aiProvider === 'openai_compatible') && (
                <div className="mt-2 pt-2" style={{ borderTop: '1px solid rgba(251,191,36,0.15)', color: '#fbbf24' }}>
                  ⚠️ {t.no_live_search}
                </div>
              )}
            </div>

            {/* Per-dataset rows */}
            <div className="rounded-xl overflow-hidden divide-y divide-white/[0.06]" style={{ border: '1px solid var(--border-card)' }}>
              {datasets.map(({ key, label, icon, count, color, gradient }) => {
                const meta = store.syncMeta[key] || { lastSynced: null, count: 0 };
                const isSyncing = syncingDataset === key;

                return (
                  <div key={key} className="px-4 py-3 flex items-center justify-between gap-3" style={{ background: 'var(--bg-card)' }}>
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: gradient, color }}>
                        {icon}
                      </div>
                      <div className="min-w-0">
                        <div className="text-[13px] font-[600]" style={{ color: 'var(--text-primary)' }}>{label}</div>
                        <div className="flex items-center gap-2 text-[10px]" style={{ color: 'var(--text-muted)' }}>
                          <span className="font-[700]" style={{ color }}>
                            {count} {t.records} {key === 'icd10' && (meta.fullLoaded ? `(${store.language === 'en' ? 'Full' : 'Lengkap'})` : `(${store.language === 'en' ? 'Curated' : 'Kurasi'})`)}
                          </span>
                          <span>•</span>
                          <span>{t.last_synced}: {meta.lastSynced ? new Date(meta.lastSynced).toLocaleDateString() : t.never_synced}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      disabled={!!syncingDataset || aiStatus !== 'ready'}
                      onClick={() => handleSync(key)}
                      className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-[700] transition-all disabled:opacity-40"
                      style={{ background: gradient, border: `1px solid ${color}30`, color }}>
                      <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
                      {isSyncing ? t.searching_ai : t.sync_dataset}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Error display */}
            {syncError && (
              <div className="p-3 rounded-lg text-[11px] font-[500]"
                style={{ background: 'rgba(244,63,94,0.07)', border: '1px solid rgba(244,63,94,0.15)', color: '#fb7185' }}>
                {syncError}
              </div>
            )}

            {/* Seed button for first-time setup or Reset button */}
            {(icd10Count === 0 && drugCount === 0 && guidelineCount === 0 && physicalExamCount === 0) ? (
              <button
                type="button"
                onClick={seedDatabase}
                className="btn-primary w-full py-2.5 text-[13px]">
                {t.sync_now}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleResetDatabase}
                className="w-full py-2.5 text-[13px] rounded-xl font-[600] transition-all"
                style={{ background: 'rgba(244,63,94,0.1)', color: '#fb7185', border: '1px solid rgba(244,63,94,0.2)' }}>
                {t.reset_database}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Review Modal */}
      <AnimatePresence>
        {reviewData && (
          <SyncReviewPanel
            datasetType={reviewData.type}
            newEntries={reviewData.result.newEntries}
            updatedEntries={reviewData.result.updatedEntries}
            sources={reviewData.result.sources}
            hasGrounding={reviewData.result.hasGrounding}
            onApprove={handleApprove}
            onDismiss={() => setReviewData(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
