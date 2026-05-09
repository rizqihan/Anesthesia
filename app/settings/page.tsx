'use client';

import React from 'react';
import { useAppStore } from '@/store/appStore';
import { translations } from '@/lib/i18n';
import { Settings, Cpu, Wifi, WifiOff, AlertTriangle, Database } from 'lucide-react';
import db from '@/lib/db';
import { ICD10_DB } from '@/lib/icd10';
import { DRUG_DB } from '@/lib/drugs';
import { GUIDELINES_DB } from '@/lib/guidelines';

export default function SettingsPage() {
  const store = useAppStore();
  const t = translations[store.language];

  const isAiConfigured = () => {
    if (store.aiProvider === 'custom_gemini' && !store.customGeminiKey.trim()) return false;
    if (store.aiProvider === 'openai_compatible' && (!store.openaiEndpoint.trim() || !store.openaiKey.trim())) return false;
    return true;
  };

  const aiStatus = store.isOffline ? 'offline' : isAiConfigured() ? 'ready' : 'missing';

  const inputClass = "glass-input w-full px-3 py-2.5 text-[13px] font-[500]";
  const labelClass = "form-label";

  return (
    <div className="space-y-5 max-w-4xl">
      <div className="flex items-center gap-3">
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
              <select value={store.aiProvider} onChange={(e) => store.setAiProvider(e.target.value as any)} className={inputClass}>
                <option value="default_gemini">{t.default_gemini}</option>
                <option value="custom_gemini">{t.custom_gemini}</option>
                <option value="openai_compatible">{t.openai_compatible}</option>
              </select>
            </div>

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

        {/* Database Sync Card */}
        <div className="glass-card-static overflow-hidden">
          <div className="section-header justify-between">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
              <span className="section-header-label">{t.database_sync}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px]" style={{ color: 'var(--text-muted)' }}>
              <span>{t.last_synced}:</span>
              <span className="font-[600]" style={{ color: 'var(--text-secondary)' }}>
                {store.lastSyncDate ? new Date(store.lastSyncDate).toLocaleDateString() : t.never_synced}
              </span>
            </div>
          </div>
          <div className="p-5 flex flex-col gap-4">
            <div className="rounded-xl overflow-hidden divide-y" style={{ border: '1px solid var(--border-card)' }}>
              {[
                { label: t.icd10_dictionary },
                { label: t.drug_formulary },
                { label: t.clinical_guidelines },
              ].map((item) => (
                <div key={item.label} className="px-4 py-3 flex items-center justify-between" style={{ background: 'var(--bg-card)' }}>
                  <span className="text-[13px] font-[500]" style={{ color: 'var(--text-secondary)' }}>{item.label}</span>
                  <div className="flex items-center gap-1.5 text-[11px] font-[700]" style={{ color: '#34d399' }}>
                    <span className="status-dot status-dot-green" />
                    <span>{t.up_to_date}</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              id="sync-btn"
              onClick={async () => {
                const btn = document.getElementById('sync-btn');
                if (btn) {
                  btn.innerHTML = `<span style="display:inline-block;width:14px;height:14px;border:2px solid rgba(255,255,255,0.4);border-top-color:white;border-radius:50%;animation:spin 1s linear infinite;margin-right:8px;vertical-align:middle"></span>${t.syncing}`;
                  btn.setAttribute('disabled', 'true');
                  try {
                    await db.icd10.bulkPut(ICD10_DB);
                    await db.drugs.bulkPut(DRUG_DB);
                    await db.guidelines.bulkPut(GUIDELINES_DB);
                    store.setLastSyncDate(new Date().toISOString());
                  } catch (e) { console.error('Sync error', e); }
                  setTimeout(() => { btn.innerHTML = t.sync_now; btn.removeAttribute('disabled'); }, 500);
                }
              }}
              className="btn-primary w-full py-2.5 text-[13px]"
            >
              {t.sync_now}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
