'use client';

import React, { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import db from '@/lib/db';
import POCUSAtlas from '@/components/pocus/POCUSAtlas';
import POCUSMannequin from '@/components/pocus/POCUSMannequin';
import POCUSLiveFeed from '@/components/pocus/POCUSLiveFeed';
import POCUSMModeStrip from '@/components/pocus/POCUSMModeStrip';
import POCUSPlaybackDICOM from '@/components/pocus/POCUSPlaybackDICOM';
import { 
  Radio, 
  Layers, 
  Crosshair, 
  Video, 
  Activity, 
  Film, 
  Archive, 
  Trash2, 
  Clock, 
  FileText,
  BookmarkCheck,
  CheckCircle2,
  AlertTriangle,
  Download
} from 'lucide-react';

type POUCUSTab = 'atlas' | 'mannequin' | 'live' | 'mmode' | 'dicom' | 'captures';

export default function POCUSPage() {
  const [activeTab, setActiveTab] = useState<POUCUSTab>('atlas');
  const [selectedCaseId, setSelectedCaseId] = useState<string>('efast-ruq');

  // Query saved POCUS captures from Dexie
  const captures = useLiveQuery(() => 
    db.pocusCaptures.orderBy('timestamp').reverse().toArray()
  , []);

  const handleDeleteCapture = async (id?: number) => {
    if (!id) return;
    try {
      await db.pocusCaptures.delete(id);
    } catch (e) {
      console.error('Failed to delete capture:', e);
    }
  };

  const handleClearAllCaptures = async () => {
    if (window.confirm('Delete all stored POCUS captures from local offline database?')) {
      await db.pocusCaptures.clear();
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* ─── Hero Clinical Strip ─── */}
      <div className="p-5 md:p-6 rounded-2xl bg-gradient-to-r from-[#0a1224] to-[#070b16] border border-white/10 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-[800] bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase tracking-wider">
                Ultrasound Suite (Phase 4 & 5)
              </span>
              <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-[600]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                Offline Ready & Hardware Compatible
              </span>
            </div>
            <h1 className="text-[22px] md:text-[26px] font-[900] text-slate-100 tracking-tight">
              POCUS (Point-of-Care Ultrasound)
            </h1>
            <p className="text-[13px] text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Multimodal bedside diagnostic suite: eFAST trauma, BLUE lung protocol, FOCUS cardiac hemodynamics, vascular access, real-time M-mode column extractor, and offline multi-frame DICOM cine viewer.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-right">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Local Captures</div>
              <div className="text-[16px] font-[900] text-cyan-300 font-mono">
                {captures?.length ?? 0}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Sub-Tabs Navigation Bar ─── */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white/[0.03] border border-white/10 overflow-x-auto scrollbar-thin">
        {[
          { id: 'atlas', label: 'Atlas & Curriculum', icon: Layers, badge: '4 PROTOCOLS' },
          { id: 'mannequin', label: 'Probe Simulator', icon: Crosshair, badge: 'LOCK d<=18px' },
          { id: 'live', label: 'Live Probe & Calipers', icon: Video, badge: 'UVC READY' },
          { id: 'mmode', label: 'M-Mode Lung Strip', icon: Activity, badge: 'REAL-TIME' },
          { id: 'dicom', label: 'DICOM Cine Viewer', icon: Film, badge: '.DCM VIEWER' },
          { id: 'captures', label: `Captures Archive (${captures?.length ?? 0})`, icon: Archive },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as POUCUSTab)}
              className={`shrink-0 px-4 py-2.5 rounded-xl font-[800] text-[12px] flex items-center gap-2 transition-all relative ${
                isActive
                  ? 'bg-blue-600/30 text-blue-200 border border-blue-500/50 shadow-md shadow-blue-950/50'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03] border border-transparent'
              }`}
            >
              <tab.icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded border ${
                  isActive ? 'bg-blue-500/30 text-blue-200 border-blue-400/30' : 'bg-black/30 text-slate-500 border-white/5'
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ─── Active Tab Content Panels ─── */}
      <div>
        {activeTab === 'atlas' && (
          <POCUSAtlas
            selectedCaseId={selectedCaseId}
            onSelectCase={(id) => setSelectedCaseId(id)}
          />
        )}

        {activeTab === 'mannequin' && (
          <POCUSMannequin
            activeCaseId={selectedCaseId}
            onSelectCase={(id) => setSelectedCaseId(id)}
          />
        )}

        {activeTab === 'live' && (
          <POCUSLiveFeed />
        )}

        {activeTab === 'mmode' && (
          <POCUSMModeStrip />
        )}

        {activeTab === 'dicom' && (
          <POCUSPlaybackDICOM />
        )}

        {activeTab === 'captures' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[16px] font-[800] text-slate-100">
                  Local POCUS Captures Archive
                </h3>
                <p className="text-[12px] text-slate-400 mt-0.5">
                  Stored securely in browser IndexedDB (Dexie v6). Zero cloud latency or external dependency.
                </p>
              </div>

              {captures && captures.length > 0 && (
                <button
                  onClick={handleClearAllCaptures}
                  className="px-3 py-1.5 rounded-xl bg-rose-600/15 text-rose-300 border border-rose-500/30 text-[12px] font-[700] hover:bg-rose-600/25 flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear All</span>
                </button>
              )}
            </div>

            {(!captures || captures.length === 0) ? (
              <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-white/5 mx-auto flex items-center justify-center text-slate-400">
                  <Archive className="w-6 h-6" />
                </div>
                <h4 className="text-[15px] font-[800] text-slate-200">No Captures Recorded Yet</h4>
                <p className="text-[12px] text-slate-400 max-w-sm mx-auto">
                  Save reference views from the Atlas or capture snapshots with calipers in the Live Probe tab to build your case log.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {captures.map((cap) => (
                  <div
                    key={cap.id}
                    className="p-4 rounded-2xl bg-[#0b1222] border border-white/10 space-y-3 shadow-lg flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 font-mono font-[800] uppercase">
                          {cap.protocol} • {cap.windowId}
                        </span>
                        <span className="text-slate-400 font-mono">
                          {new Date(cap.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      {cap.imageDataUri && (
                        <div className="aspect-[4/3] rounded-xl overflow-hidden bg-black border border-white/10">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={cap.imageDataUri}
                            alt="POCUS Snapshot"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      <h4 className="text-[14px] font-[800] text-white">
                        {cap.diagnosis || 'POCUS Bedside Examination'}
                      </h4>

                      {cap.notes && (
                        <p className="text-[12px] text-slate-300 leading-relaxed">
                          {cap.notes}
                        </p>
                      )}
                    </div>

                    <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400">
                        {new Date(cap.timestamp).toLocaleDateString()}
                      </span>
                      <button
                        onClick={() => handleDeleteCapture(cap.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-300 hover:bg-rose-500/10"
                        title="Delete capture"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
