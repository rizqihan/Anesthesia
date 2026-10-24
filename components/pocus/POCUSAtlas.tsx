'use client';

import React, { useState } from 'react';
import { 
  POCUS_PROTOCOLS, 
  POCUS_CASES, 
  POCUSProtocolId, 
  POCUSCase, 
  AcousticLandmark 
} from '@/lib/pocusData';
import { 
  Camera,
  Maximize2,
  X,
  Eye, 
  Layers, 
  AlertCircle, 
  CheckCircle2, 
  Bookmark, 
  HelpCircle, 
  ChevronRight,
  Info,
  Sliders,
  Sparkles,
  Stethoscope,
  Activity
} from 'lucide-react';
import db from '@/lib/db';

interface POCUSAtlasProps {
  onSelectCase?: (caseId: string) => void;
  selectedCaseId?: string;
}

export default function POCUSAtlas({ onSelectCase, selectedCaseId }: POCUSAtlasProps) {
  const [activeProtocol, setActiveProtocol] = useState<POCUSProtocolId>('efast');
  const [currentCaseId, setCurrentCaseId] = useState<string>(selectedCaseId || 'efast-ruq');
  const [viewMode, setViewMode] = useState<'comparison' | 'normal' | 'pathology'>('comparison');
  const [showLandmarks, setShowLandmarks] = useState(true);
  const [activeLandmark, setActiveLandmark] = useState<AcousticLandmark | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [compressionSlider, setCompressionSlider] = useState(0); // 0 = no compression, 100 = full probe pressure
  const [displayMode, setDisplayMode] = useState<'real' | 'schematic'>('real');
  const [fullscreenPhoto, setFullscreenPhoto] = useState<{
    url: string;
    title: string;
    subtitle: string;
    caption: string;
    signName?: string;
    modality: string;
    isPathology: boolean;
  } | null>(null); // 0 = no compression, 100 = full probe pressure

  const [prevSelectedCaseId, setPrevSelectedCaseId] = useState(selectedCaseId);

  // Sync with prop if it changes
  if (selectedCaseId && selectedCaseId !== prevSelectedCaseId) {
    setPrevSelectedCaseId(selectedCaseId);
    if (POCUS_CASES[selectedCaseId]) {
      setCurrentCaseId(selectedCaseId);
      setActiveProtocol(POCUS_CASES[selectedCaseId].protocol);
    }
  }

  const currentCase = POCUS_CASES[currentCaseId] || POCUS_CASES['efast-ruq'];
  const protocolMeta = POCUS_PROTOCOLS.find((p) => p.id === activeProtocol) || POCUS_PROTOCOLS[0];

  const handleProtocolChange = (protoId: POCUSProtocolId) => {
    setActiveProtocol(protoId);
    const meta = POCUS_PROTOCOLS.find((p) => p.id === protoId);
    if (meta && meta.caseIds.length > 0) {
      setCurrentCaseId(meta.caseIds[0]);
      if (onSelectCase) onSelectCase(meta.caseIds[0]);
    }
    setActiveLandmark(null);
  };

  const handleCaseSelect = (caseId: string) => {
    setCurrentCaseId(caseId);
    setActiveLandmark(null);
    setIsSaved(false);
    if (onSelectCase) onSelectCase(caseId);
  };

  const handleSaveToCaptures = async () => {
    try {
      await db.pocusCaptures.add({
        timestamp: Date.now(),
        protocol: currentCase.protocol,
        windowId: currentCase.windowId,
        diagnosis: currentCase.pathologyTitle,
        notes: `Atlas study reference for ${currentCase.title}. Landmark: ${currentCase.acousticLandmarks.map(l => l.name).join(', ')}`,
      });
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (e) {
      console.error('Failed to save capture:', e);
    }
  };

  return (
    <div className="space-y-6">
      {/* ─── Protocol Selector Pills ─── */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-white/[0.03] border border-white/10">
        {POCUS_PROTOCOLS.map((protocol) => {
          const isActive = activeProtocol === protocol.id;
          return (
            <button
              key={protocol.id}
              onClick={() => handleProtocolChange(protocol.id)}
              className={`flex-1 min-w-[140px] px-4 py-2.5 rounded-xl text-left transition-all relative ${
                isActive
                  ? 'bg-blue-600/30 text-blue-200 border border-blue-500/50 shadow-lg shadow-blue-950/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04] border border-transparent'
              }`}
            >
              <div className="flex items-center justify-between mb-0.5">
                <span className="font-[800] text-[13px] tracking-tight">{protocol.title}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/40 text-blue-300 border border-white/10">
                  {protocol.defaultProbe}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-1">{protocol.shortDesc}</p>
            </button>
          );
        })}
      </div>

      {/* ─── Case Carousel / Selector Strip ─── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
        {protocolMeta.caseIds.map((cId) => {
          const c = POCUS_CASES[cId];
          if (!c) return null;
          const isSelected = c.id === currentCaseId;
          return (
            <button
              key={c.id}
              onClick={() => handleCaseSelect(c.id)}
              className={`shrink-0 px-3.5 py-2 rounded-xl text-left border transition-all ${
                isSelected
                  ? 'bg-gradient-to-r from-blue-950/60 to-indigo-950/60 border-blue-500 text-white shadow-md'
                  : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-slate-200 hover:border-white/20'
              }`}
            >
              <div className="text-[12px] font-[700] tracking-tight">{c.title}</div>
              <div className="text-[10px] text-slate-400">{c.probeType} • {c.windowId.toUpperCase()}</div>
            </button>
          );
        })}
      </div>

      {/* ─── Case Header Card ─── */}
      <div className="p-4 md:p-5 rounded-2xl bg-gradient-to-br from-[#0c1427] to-[#080d1a] border border-white/10 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-[800] bg-blue-500/20 text-blue-300 border border-blue-500/30 uppercase tracking-wider">
                {currentCase.protocol.toUpperCase()} PROTOCOL
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-[11px] font-mono text-emerald-400">
                {currentCase.probeType} ({currentCase.frequencyRange})
              </span>
            </div>
            <h2 className="text-[20px] md:text-[22px] font-[900] text-slate-100 tracking-tight">
              {currentCase.title}
            </h2>
            <p className="text-[13px] text-slate-400 mt-0.5">{currentCase.subtitle}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowLandmarks(!showLandmarks)}
              className={`px-3 py-2 rounded-xl text-[12px] font-[700] flex items-center gap-1.5 transition-all border ${
                showLandmarks 
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-sm' 
                  : 'bg-white/[0.04] text-slate-400 border-white/10 hover:text-white'
              }`}
              title="Toggle acoustic landmark overlays"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{showLandmarks ? 'Hide Landmarks' : 'Show Landmarks'}</span>
            </button>

            <button
              onClick={handleSaveToCaptures}
              disabled={isSaved}
              className={`px-3 py-2 rounded-xl text-[12px] font-[700] flex items-center gap-1.5 transition-all border ${
                isSaved
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-white/[0.04] text-slate-300 border-white/10 hover:border-blue-500/40 hover:bg-blue-500/10'
              }`}
            >
              {isSaved ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Bookmark className="w-3.5 h-3.5 text-blue-400" />}
              <span>{isSaved ? 'Saved to Captures' : 'Save Reference'}</span>
            </button>
          </div>
        </div>

        {/* Probe Orientation Rule Callout */}
        <div className="mt-4 p-3 rounded-xl bg-blue-950/30 border border-blue-500/20 flex items-start gap-3">
          <div className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
            <Info className="w-3.5 h-3.5" />
          </div>
          <div className="text-[12px] leading-relaxed">
            <span className="font-[800] text-blue-200">Probe Orientation & Marker Rules: </span>
            <span className="text-slate-300">{currentCase.probeOrientation}</span>
          </div>
        </div>
      </div>

      {/* ─── Synchronized Comparison Screen ─── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-[14px] font-[800] text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Eye className="w-4 h-4 text-blue-400" />
              <span>Synchronized Ultrasound Simulation</span>
            </h3>
            {currentCase.protocol === 'vascular' && (
              <span className="text-[11px] text-amber-300 bg-amber-500/15 px-2 py-0.5 rounded border border-amber-500/30">
                Interactive Compression Available
              </span>
            )}
          </div>

          {/* Display & View Mode Toggles */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Real USG vs Schematic Toggle */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/10 text-[11px]">
              <button
                onClick={() => setDisplayMode('real')}
                className={`px-3 py-1 rounded-lg font-[800] flex items-center gap-1.5 transition-all ${
                  displayMode === 'real'
                    ? 'bg-cyan-600 text-white shadow-md shadow-cyan-950/60'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Camera className="w-3.5 h-3.5 text-cyan-200" />
                <span>Real USG Photos</span>
              </button>
              <button
                onClick={() => setDisplayMode('schematic')}
                className={`px-3 py-1 rounded-lg font-[800] flex items-center gap-1.5 transition-all ${
                  displayMode === 'schematic'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-950/60'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-blue-200" />
                <span>Vector Schematics</span>
              </button>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/10 text-[11px]">
            <button
              onClick={() => setViewMode('comparison')}
              className={`px-2.5 py-1 rounded-lg font-[700] transition-colors ${
                viewMode === 'comparison' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Split View
            </button>
            <button
              onClick={() => setViewMode('normal')}
              className={`px-2.5 py-1 rounded-lg font-[700] transition-colors ${
                viewMode === 'normal' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Normal Only
            </button>
            <button
              onClick={() => setViewMode('pathology')}
              className={`px-2.5 py-1 rounded-lg font-[700] transition-colors ${
                viewMode === 'pathology' ? 'bg-rose-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Pathology Only
            </button>
          </div>
          </div>
        </div>

        {/* Compression slider if vascular */}
        {currentCase.protocol === 'vascular' && (
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-blue-400" />
              <span className="text-[12px] font-[700] text-slate-200">Probe Compression Force:</span>
              <span className="text-[11px] font-mono text-blue-400">{compressionSlider}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={compressionSlider}
              onChange={(e) => setCompressionSlider(Number(e.target.value))}
              className="flex-1 max-w-xs accent-blue-500 cursor-pointer"
            />
            <button
              onClick={() => setCompressionSlider(compressionSlider === 100 ? 0 : 100)}
              className="px-2.5 py-1 text-[11px] font-[700] rounded-lg bg-blue-600/20 text-blue-300 border border-blue-500/30 hover:bg-blue-600/30"
            >
              {compressionSlider === 100 ? 'Release Probe' : 'Compress Vein'}
            </button>
          </div>
        )}

        {/* Ultrasound Viewport Grid */}
        <div className={`grid gap-4 ${viewMode === 'comparison' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
          {/* Normal Frame */}
          {(viewMode === 'comparison' || viewMode === 'normal') && (
            <div className="flex flex-col rounded-2xl bg-[#03060c] border border-emerald-500/30 overflow-hidden shadow-2xl relative">
              <div className="px-4 py-2.5 bg-emerald-950/40 border-b border-emerald-500/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[12px] font-[800] text-emerald-300 uppercase tracking-wider">
                    Normal Finding (Physiological)
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">FPS: 30 • GAIN: 68dB</span>
              </div>

              {/* Ultrasound Screen Simulator / Real USG Capture */}
              <div className="relative aspect-[4/3] bg-black flex items-center justify-center p-2 select-none overflow-hidden">
                {displayMode === 'real' && currentCase.normalPhoto ? (
                  <div
                    onClick={() => setFullscreenPhoto({
                      url: currentCase.normalPhoto!.url,
                      title: currentCase.title,
                      subtitle: currentCase.subtitle,
                      caption: currentCase.normalPhoto!.caption,
                      signName: currentCase.normalPhoto!.signName,
                      modality: currentCase.normalPhoto!.modality,
                      isPathology: false
                    })}
                    className="w-full h-full relative group cursor-pointer flex items-center justify-center"
                    title="Click to view full-resolution ultrasound capture"
                  >
                    <img
                      src={currentCase.normalPhoto.url}
                      alt={currentCase.normalPhoto.caption}
                      className="w-full h-full object-contain rounded-lg shadow-inner"
                    />
                    <div className="absolute top-3 right-3 bg-black/75 hover:bg-black/90 text-cyan-300 px-2.5 py-1 rounded-lg text-[11px] font-[700] border border-cyan-500/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 shadow-lg backdrop-blur">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Full Resolution</span>
                    </div>
                    <div className="absolute bottom-3 left-3 bg-black/80 text-white px-2.5 py-1 rounded-lg text-[10px] font-mono border border-white/20 backdrop-blur flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="font-[800] text-emerald-300">{currentCase.normalPhoto.modality}</span>
                      {currentCase.normalPhoto.signName && (
                        <span className="text-slate-300 border-l border-white/20 pl-2">{currentCase.normalPhoto.signName}</span>
                      )}
                    </div>
                  </div>
                ) : (
                  <UltrasoundScreenGraphic 
                    caseData={currentCase} 
                    isPathology={false} 
                    compressionPct={compressionSlider}
                    showLandmarks={showLandmarks}
                    activeLandmark={activeLandmark}
                    onSelectLandmark={setActiveLandmark}
                  />
                )}
              </div>

              <div className="p-4 bg-[#070c17] border-t border-white/5 space-y-2">
                {displayMode === 'real' && currentCase.normalPhoto && (
                  <div className="p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-[11px] text-emerald-200 flex items-start gap-2">
                    <Camera className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <div className="leading-relaxed">
                      <span className="font-[800] text-emerald-300">Real USG Capture: </span>
                      <span>{currentCase.normalPhoto.caption}</span>
                    </div>
                  </div>
                )}
                <h4 className="text-[13px] font-[800] text-slate-200">Normal Acoustic Characteristics:</h4>
                <p className="text-[12px] text-slate-400 leading-relaxed">{currentCase.normalDescription}</p>
                <div className="space-y-1 pt-1">
                  {currentCase.normalFindings.map((finding, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{finding}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Pathology Frame */}
          {(viewMode === 'comparison' || viewMode === 'pathology') && (
            <div className="flex flex-col rounded-2xl bg-[#03060c] border border-rose-500/30 overflow-hidden shadow-2xl relative">
              <div className="px-4 py-2.5 bg-rose-950/40 border-b border-rose-500/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
                  <span className="text-[12px] font-[800] text-rose-300 uppercase tracking-wider">
                    {currentCase.pathologySignName}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-rose-300 bg-rose-500/20 px-1.5 py-0.5 rounded border border-rose-500/30">
                  POSITIVE PATHOLOGY
                </span>
              </div>

              {/* Ultrasound Screen Simulator / Real USG Capture */}
              <div className="relative aspect-[4/3] bg-black flex items-center justify-center p-2 select-none overflow-hidden">
                {displayMode === 'real' && currentCase.pathologyPhoto ? (
                  <div
                    onClick={() => setFullscreenPhoto({
                      url: currentCase.pathologyPhoto!.url,
                      title: currentCase.pathologyTitle,
                      subtitle: currentCase.title,
                      caption: currentCase.pathologyPhoto!.caption,
                      signName: currentCase.pathologySignName,
                      modality: currentCase.pathologyPhoto!.modality,
                      isPathology: true
                    })}
                    className="w-full h-full relative group cursor-pointer flex items-center justify-center"
                    title="Click to view full-resolution ultrasound capture"
                  >
                    <img
                      src={currentCase.pathologyPhoto.url}
                      alt={currentCase.pathologyPhoto.caption}
                      className="w-full h-full object-contain rounded-lg shadow-inner"
                    />
                    <div className="absolute top-3 right-3 bg-black/75 hover:bg-black/90 text-rose-300 px-2.5 py-1 rounded-lg text-[11px] font-[700] border border-rose-500/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 shadow-lg backdrop-blur">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Full Resolution</span>
                    </div>
                    <div className="absolute bottom-3 left-3 bg-black/80 text-white px-2.5 py-1 rounded-lg text-[10px] font-mono border border-white/20 backdrop-blur flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
                      <span className="font-[800] text-rose-300">{currentCase.pathologyPhoto.modality}</span>
                      <span className="text-rose-200 border-l border-white/20 pl-2 font-[800]">{currentCase.pathologySignName}</span>
                    </div>
                  </div>
                ) : (
                  <UltrasoundScreenGraphic 
                    caseData={currentCase} 
                    isPathology={true} 
                    compressionPct={compressionSlider}
                    showLandmarks={showLandmarks}
                    activeLandmark={activeLandmark}
                    onSelectLandmark={setActiveLandmark}
                  />
                )}
              </div>

              <div className="p-4 bg-[#070c17] border-t border-white/5 space-y-2">
                {displayMode === 'real' && currentCase.pathologyPhoto && (
                  <div className="p-2.5 rounded-xl bg-rose-950/30 border border-rose-500/40 text-[11px] text-rose-200 flex items-start gap-2">
                    <Camera className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                    <div className="leading-relaxed">
                      <span className="font-[800] text-rose-300">Pathognomonic USG Sign: </span>
                      <span>{currentCase.pathologyPhoto.caption}</span>
                    </div>
                  </div>
                )}
                <h4 className="text-[13px] font-[800] text-rose-200">{currentCase.pathologyTitle}</h4>
                <p className="text-[12px] text-slate-400 leading-relaxed">{currentCase.pathologyDescription}</p>
                <div className="space-y-1 pt-1">
                  {currentCase.pathologyFindings.map((finding, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-[11px] text-rose-300/90">
                      <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                      <span>{finding}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ─── Active Landmark Inspection Drawer ─── */}
      {activeLandmark && (
        <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
              <span className="text-[11px] font-mono uppercase text-cyan-300 tracking-wider">
                Acoustic Landmark Inspected
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-200 border border-cyan-500/40 uppercase">
                {activeLandmark.echogenicity}
              </span>
            </div>
            <h4 className="text-[15px] font-[800] text-white">{activeLandmark.name}</h4>
            <p className="text-[12px] text-slate-300 mt-0.5 leading-relaxed">{activeLandmark.description}</p>
          </div>
          <button
            onClick={() => setActiveLandmark(null)}
            className="text-[11px] text-slate-400 hover:text-white px-2 py-1 rounded bg-white/5"
          >
            Close
          </button>
        </div>
      )}

      {/* ─── Clinical Decision Tree & Pearls Section ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Branching Decision Tree */}
        <div className="p-4 md:p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-amber-400" />
            <h3 className="text-[14px] font-[800] text-slate-200 uppercase tracking-wider">
              Diagnostic Decision Protocol
            </h3>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-2">
            <div className="text-[12px] font-[700] text-blue-300 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
              <span>{currentCase.decisionTree.question}</span>
            </div>

            <div className="pt-2 border-t border-white/5 space-y-2 text-[12px]">
              <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20">
                <span className="font-[800] text-rose-300">If Positive ({currentCase.decisionTree.positiveFinding}): </span>
                <span className="text-slate-300">{currentCase.decisionTree.positiveAction}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <span className="font-[800] text-emerald-300">If Negative ({currentCase.decisionTree.negativeFinding}): </span>
                <span className="text-slate-300">{currentCase.decisionTree.negativeAction}</span>
              </div>
            </div>
          </div>
        </div>

        {/* High-Yield Clinical Pearls & Pitfalls */}
        <div className="p-4 md:p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <h3 className="text-[14px] font-[800] text-slate-200 uppercase tracking-wider">
              Anaesthesia & ICU Pearls
            </h3>
          </div>

          <div className="space-y-2">
            {currentCase.clinicalPearls.map((pearl, idx) => (
              <div key={idx} className="flex items-start gap-2 text-[12px] text-slate-300">
                <span className="text-blue-400 font-mono font-[800] shrink-0 mt-0.5">•</span>
                <span className="leading-relaxed">{pearl}</span>
              </div>
            ))}
          </div>

          {currentCase.pitfalls.length > 0 && (
            <div className="pt-3 border-t border-white/5 space-y-1.5">
              <div className="text-[11px] font-[800] text-amber-400 uppercase tracking-wider flex items-center gap-1">
                <AlertCircle className="w-3 h-3 text-amber-400" />
                <span>Diagnostic Pitfalls to Avoid:</span>
              </div>
              {currentCase.pitfalls.map((pitfall, idx) => (
                <div key={idx} className="text-[11px] text-slate-400 leading-relaxed pl-4 border-l-2 border-amber-500/30">
                  {pitfall}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* ─── Fullscreen High-Resolution Lightbox Modal ─── */}
      {fullscreenPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 md:p-6 animate-in fade-in duration-200"
          onClick={() => setFullscreenPhoto(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[92vh] flex flex-col rounded-2xl bg-[#03060c] border border-white/20 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-5 py-3.5 bg-[#090e1a] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-[800] uppercase ${
                  fullscreenPhoto.isPathology 
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' 
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                }`}>
                  {fullscreenPhoto.modality}
                </span>
                <div>
                  <h3 className="text-[15px] font-[900] text-white tracking-tight">
                    {fullscreenPhoto.title}
                  </h3>
                  {fullscreenPhoto.signName && (
                    <span className={`text-[11px] font-[700] ${fullscreenPhoto.isPathology ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {fullscreenPhoto.signName}
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={() => setFullscreenPhoto(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Close (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Image Viewport */}
            <div className="flex-1 bg-black flex items-center justify-center p-4 overflow-hidden min-h-[300px]">
              <img
                src={fullscreenPhoto.url}
                alt={fullscreenPhoto.caption}
                className="max-h-[65vh] w-auto max-w-full object-contain rounded-lg shadow-2xl"
              />
            </div>

            {/* Educational Footer Legend */}
            <div className="p-4 bg-[#070c17] border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-3 text-[12px]">
              <div className="text-slate-300 leading-relaxed max-w-3xl">
                <span className="font-[800] text-cyan-300">Bedside Clinical Interpretation: </span>
                <span>{fullscreenPhoto.caption}</span>
              </div>
              <button
                onClick={() => setFullscreenPhoto(null)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-[700] text-[12px] shrink-0"
              >
                Close Full View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// High-Fidelity SVG Ultrasound Screen Graphic Component
// ─────────────────────────────────────────────────────────────
interface UltrasoundScreenGraphicProps {
  caseData: POCUSCase;
  isPathology: boolean;
  compressionPct: number;
  showLandmarks: boolean;
  activeLandmark: AcousticLandmark | null;
  onSelectLandmark: (landmark: AcousticLandmark) => void;
}

function UltrasoundScreenGraphic({
  caseData,
  isPathology,
  compressionPct,
  showLandmarks,
  activeLandmark,
  onSelectLandmark
}: UltrasoundScreenGraphicProps) {
  const { id } = caseData;

  return (
    <div data-preserve-dark className="w-full h-full relative overflow-hidden rounded-lg bg-[#000000] border border-white/10 flex items-center justify-center">
      {/* Ultrasound Sector / Cone Mask */}
      <svg
        viewBox="0 0 400 300"
        className="w-full h-full object-contain"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Radial gradient for acoustic attenuation */}
          <radialGradient id="depthAtten" cx="50%" cy="0%" r="90%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.12" />
            <stop offset="60%" stopColor="#ffffff" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.8" />
          </radialGradient>

          {/* Speckle noise filter */}
          <filter id="speckle" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" result="noise" />
            <feColorMatrix type="matrix" values="0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0 0 0 0.25 0" />
            <feComposite in2="SourceGraphic" in="gl" operator="arithmetic" k1="0" k2="1" k3="0.8" k4="0" />
          </filter>
        </defs>

        {/* Acoustic sector cone for curvilinear/phased array, rectangular for linear */}
        {caseData.probeType === 'Linear' ? (
          <rect x="30" y="20" width="340" height="260" rx="4" fill="#050a14" stroke="#1e293b" strokeWidth="1" />
        ) : (
          <path
            d="M 180 20 L 370 280 A 240 240 0 0 1 30 280 L 180 20 Z"
            fill="#050a14"
            stroke="#1e293b"
            strokeWidth="1"
          />
        )}

        {/* Simulated Anatomical Graphics per case */}
        {id === 'efast-ruq' && (
          <g>
            {/* Diaphragm */}
            <path d="M 60 70 Q 180 50 340 90" stroke="#e2e8f0" strokeWidth="4" fill="none" opacity="0.9" />
            
            {/* Liver parenchyma */}
            <path d="M 70 80 Q 200 65 310 110 L 290 190 Q 180 160 80 180 Z" fill="#1e293b" stroke="#334155" strokeWidth="1" opacity="0.7" />
            <text x="140" y="125" fill="#94a3b8" fontSize="11" fontWeight="700">LIVER</text>

            {/* Right Kidney */}
            <ellipse cx="230" cy="205" rx="55" ry="35" fill="#0f172a" stroke="#cbd5e1" strokeWidth="2" transform="rotate(-15 230 205)" />
            {/* Renal sinus */}
            <ellipse cx="230" cy="205" rx="28" ry="12" fill="#475569" stroke="#94a3b8" strokeWidth="1" transform="rotate(-15 230 205)" />
            <text x="210" y="210" fill="#cbd5e1" fontSize="10" fontWeight="700">KIDNEY</text>

            {/* Morison's Pouch */}
            {isPathology ? (
              // Free fluid: jet black anechoic stripe separating liver and kidney
              <g>
                <path
                  d="M 140 165 Q 200 155 285 175 Q 260 195 180 185 Z"
                  fill="#000000"
                  stroke="#ef4444"
                  strokeWidth="2"
                  className="animate-pulse"
                />
                <text x="160" y="180" fill="#f87171" fontSize="10" fontWeight="900">
                  FREE FLUID (HEMOPERITONEUM)
                </text>
              </g>
            ) : (
              // Normal: crisp bright hyperechoic line
              <path d="M 145 168 Q 200 158 280 178" stroke="#ffffff" strokeWidth="2.5" fill="none" opacity="0.95" />
            )}
          </g>
        )}

        {id === 'efast-luq' && (
          <g>
            {/* Left Diaphragm */}
            <path d="M 60 70 Q 180 45 340 85" stroke="#e2e8f0" strokeWidth="4" fill="none" opacity="0.9" />

            {/* Spleen parenchyma */}
            <path d="M 80 85 Q 180 65 290 105 L 260 175 Q 160 150 70 165 Z" fill="#1e293b" stroke="#334155" strokeWidth="1" opacity="0.75" />
            <text x="135" y="120" fill="#94a3b8" fontSize="11" fontWeight="700">SPLEEN</text>

            {/* Left Kidney */}
            <ellipse cx="225" cy="210" rx="52" ry="32" fill="#0f172a" stroke="#cbd5e1" strokeWidth="2" transform="rotate(15 225 210)" />
            <ellipse cx="225" cy="210" rx="26" ry="10" fill="#475569" stroke="#94a3b8" strokeWidth="1" transform="rotate(15 225 210)" />
            <text x="205" y="215" fill="#cbd5e1" fontSize="10" fontWeight="700">L-KIDNEY</text>

            {isPathology ? (
              <g>
                {/* Subdiaphragmatic & splenorenal free fluid stripe */}
                <path
                  d="M 70 70 Q 180 48 310 90 L 290 110 Q 180 72 85 92 Z"
                  fill="#000000"
                  stroke="#ef4444"
                  strokeWidth="2"
                  className="animate-pulse"
                />
                <path
                  d="M 125 155 Q 185 145 260 175 L 245 190 Q 180 165 120 170 Z"
                  fill="#000000"
                  stroke="#ef4444"
                  strokeWidth="1.5"
                />
                <text x="110" y="82" fill="#f87171" fontSize="10" fontWeight="900">
                  SUBPHRENIC FREE FLUID
                </text>
              </g>
            ) : (
              <path d="M 125 155 Q 185 145 260 175" stroke="#ffffff" strokeWidth="2" fill="none" opacity="0.9" />
            )}
          </g>
        )}

        {id === 'efast-pelvis' && (
          <g>
            {/* Bladder Lumen */}
            <path
              d="M 130 95 Q 200 70 270 95 Q 300 160 270 215 Q 200 235 130 215 Q 100 160 130 95 Z"
              fill="#020617"
              stroke="#cbd5e1"
              strokeWidth="2.5"
            />
            <text x="175" y="155" fill="#38bdf8" fontSize="11" fontWeight="800">BLADDER</text>

            {/* Prostate / Uterus */}
            <ellipse cx="200" cy="240" rx="40" ry="18" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
            <text x="180" y="244" fill="#94a3b8" fontSize="9" fontWeight="700">RETROVESICAL</text>

            {isPathology ? (
              <g>
                {/* Free fluid pooling in rectovesical pouch / Douglas */}
                <path
                  d="M 125 218 Q 200 240 275 218 L 285 260 Q 200 280 115 260 Z"
                  fill="#000000"
                  stroke="#ef4444"
                  strokeWidth="2"
                  className="animate-pulse"
                />
                <text x="135" y="255" fill="#f87171" fontSize="10" fontWeight="900">
                  PELVIC FREE FLUID
                </text>
              </g>
            ) : (
              <line x1="130" y1="216" x2="270" y2="216" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" />
            )}
          </g>
        )}

        {id === 'efast-subxiphoid' && (
          <g>
            {/* Liver left lobe window */}
            <path d="M 100 45 Q 200 35 300 55 L 290 90 Q 200 80 110 90 Z" fill="#1e293b" opacity="0.6" />
            <text x="175" y="70" fill="#94a3b8" fontSize="10" fontWeight="700">LIVER LOBE</text>

            {/* Pericardium */}
            <path d="M 90 95 Q 200 85 310 100 L 320 230 Q 200 250 80 230 Z" fill="#0b1120" stroke="#cbd5e1" strokeWidth="2" />

            {/* Free fluid band if pathology */}
            {isPathology && (
              <path
                d="M 95 100 Q 200 90 305 105 L 295 130 Q 200 115 105 125 Z"
                fill="#000000"
                stroke="#ef4444"
                strokeWidth="2"
                className="animate-pulse"
              />
            )}

            {/* Right Ventricle */}
            <path
              d={isPathology 
                ? "M 110 135 Q 200 130 285 140 L 275 180 Q 200 175 120 180 Z" 
                : "M 105 105 Q 200 95 295 110 L 280 170 Q 200 160 115 170 Z"}
              fill="#020617"
              stroke="#64748b"
              strokeWidth="1.5"
            />
            <text x="180" y="155" fill="#e2e8f0" fontSize="11" fontWeight="800">RV</text>

            {/* Left Ventricle */}
            <path d="M 125 180 Q 200 175 275 180 L 260 225 Q 200 235 135 225 Z" fill="#020617" stroke="#94a3b8" strokeWidth="2" />
            <text x="180" y="205" fill="#e2e8f0" fontSize="11" fontWeight="800">LV</text>
          </g>
        )}

        {(id === 'blue-sliding' || id === 'efast-lung-ant') && (
          <g>
            {/* Rib Shadows */}
            <rect x="40" y="40" width="60" height="40" rx="10" fill="#334155" />
            <rect x="40" y="80" width="60" height="190" fill="#000000" opacity="0.9" />
            <text x="55" y="65" fill="#f8fafc" fontSize="10" fontWeight="700">RIB</text>

            <rect x="300" y="40" width="60" height="40" rx="10" fill="#334155" />
            <rect x="300" y="80" width="60" height="190" fill="#000000" opacity="0.9" />
            <text x="315" y="65" fill="#f8fafc" fontSize="10" fontWeight="700">RIB</text>

            {/* Pleural Line */}
            <line x1="100" y1="85" x2="300" y2="85" stroke="#ffffff" strokeWidth="3" />
            <text x="160" y="75" fill="#38bdf8" fontSize="10" fontWeight="800">PLEURAL LINE</text>

            {/* Normal: shimmering dots + A-lines */}
            {!isPathology ? (
              <g>
                {/* Horizontal A-lines */}
                <line x1="100" y1="145" x2="300" y2="145" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.7" />
                <line x1="100" y1="205" x2="300" y2="205" stroke="#64748b" strokeWidth="1" strokeDasharray="6 4" opacity="0.5" />
                <text x="180" y="140" fill="#94a3b8" fontSize="9" fontWeight="700">A1 REVERBERATION</text>
                <text x="180" y="200" fill="#64748b" fontSize="9" fontWeight="700">A2 REVERBERATION</text>

                {/* Shimmering ants marching indicator */}
                <circle cx="150" cy="85" r="2" fill="#38bdf8" className="animate-ping" />
                <circle cx="210" cy="85" r="2" fill="#38bdf8" className="animate-ping" />
                <circle cx="260" cy="85" r="2" fill="#38bdf8" className="animate-ping" />
                <text x="145" y="105" fill="#34d399" fontSize="10" fontWeight="800">
                  NORMAL LUNG SLIDING
                </text>
              </g>
            ) : (
              // Pneumothorax: rigid static lines without sliding
              <g>
                <line x1="100" y1="130" x2="300" y2="130" stroke="#f87171" strokeWidth="2" opacity="0.8" />
                <line x1="100" y1="175" x2="300" y2="175" stroke="#f87171" strokeWidth="2" opacity="0.8" />
                <line x1="100" y1="220" x2="300" y2="220" stroke="#f87171" strokeWidth="2" opacity="0.8" />
                <text x="140" y="115" fill="#ef4444" fontSize="11" fontWeight="900">
                  ABOLISHED SLIDING (BARCODE)
                </text>
              </g>
            )}
          </g>
        )}

        {id === 'blue-a-lines' && (
          <g>
            {/* Rib Shadows */}
            <rect x="40" y="40" width="55" height="35" rx="8" fill="#334155" />
            <rect x="40" y="75" width="55" height="195" fill="#000000" opacity="0.9" />
            <text x="55" y="62" fill="#f8fafc" fontSize="10" fontWeight="700">RIB</text>

            <rect x="305" y="40" width="55" height="35" rx="8" fill="#334155" />
            <rect x="305" y="75" width="55" height="195" fill="#000000" opacity="0.9" />
            <text x="320" y="62" fill="#f8fafc" fontSize="10" fontWeight="700">RIB</text>

            {/* Pleural Line */}
            <line x1="95" y1="85" x2="305" y2="85" stroke="#ffffff" strokeWidth="3" />
            <text x="160" y="75" fill="#38bdf8" fontSize="10" fontWeight="800">PLEURAL LINE</text>

            {/* Regular horizontal A-lines */}
            <line x1="95" y1="145" x2="305" y2="145" stroke="#94a3b8" strokeWidth="2" strokeDasharray="8 4" opacity="0.85" />
            <line x1="95" y1="205" x2="305" y2="205" stroke="#64748b" strokeWidth="1.5" strokeDasharray="8 4" opacity="0.65" />
            <text x="155" y="140" fill="#94a3b8" fontSize="10" fontWeight="700">A1 REVERBERATION (DRY)</text>
            <text x="155" y="200" fill="#64748b" fontSize="10" fontWeight="700">A2 REVERBERATION</text>

            {isPathology ? (
              <g>
                <circle cx="200" cy="85" r="4" fill="#f59e0b" className="animate-ping" />
                <text x="110" y="115" fill="#fcd34d" fontSize="10" fontWeight="800">
                  A-PROFILE: RULE OUT COPD/ASTHMA OR PE (SCREEN DVT)
                </text>
              </g>
            ) : (
              <g>
                <circle cx="160" cy="85" r="2" fill="#34d399" className="animate-ping" />
                <circle cx="240" cy="85" r="2" fill="#34d399" className="animate-ping" />
                <text x="140" y="105" fill="#34d399" fontSize="10" fontWeight="800">
                  NORMAL AERATED LUNG
                </text>
              </g>
            )}
          </g>
        )}

        {id === 'blue-b-lines' && (
          <g>
            {/* Pleural Line */}
            <line x1="50" y1="70" x2="350" y2="70" stroke="#ffffff" strokeWidth="3" />
            <text x="160" y="60" fill="#38bdf8" fontSize="10" fontWeight="800">PLEURAL LINE</text>

            {!isPathology ? (
              // Normal A-lines
              <g>
                <line x1="60" y1="130" x2="340" y2="130" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="8 4" opacity="0.6" />
                <line x1="60" y1="190" x2="340" y2="190" stroke="#64748b" strokeWidth="1.5" strokeDasharray="8 4" opacity="0.4" />
                <text x="160" y="125" fill="#94a3b8" fontSize="10" fontWeight="700">A-LINE PROFILE (DRY)</text>
              </g>
            ) : (
              // Multiple bright laser-like B-lines erasing A-lines
              <g>
                <polygon points="110,70 95,270 125,270" fill="url(#depthAtten)" opacity="0.9" />
                <line x1="110" y1="70" x2="110" y2="270" stroke="#ffffff" strokeWidth="3" />

                <polygon points="200,70 180,270 220,270" fill="url(#depthAtten)" opacity="0.9" />
                <line x1="200" y1="70" x2="200" y2="270" stroke="#ffffff" strokeWidth="3.5" />

                <polygon points="290,70 275,270 305,270" fill="url(#depthAtten)" opacity="0.9" />
                <line x1="290" y1="70" x2="290" y2="270" stroke="#ffffff" strokeWidth="3" />

                <text x="120" y="160" fill="#67e8f9" fontSize="12" fontWeight="900">
                  {'B-LINES ("LUNG ROCKETS")'}
                </text>
                <text x="135" y="180" fill="#e2e8f0" fontSize="10" fontWeight="700">
                  &gt;= 3 / SPACE (PULMONARY EDEMA)
                </text>
              </g>
            )}
          </g>
        )}

        {id === 'blue-lung-point' && (
          <g>
            {/* Rib Shadows */}
            <rect x="40" y="40" width="50" height="35" rx="8" fill="#334155" />
            <rect x="40" y="75" width="50" height="195" fill="#000000" opacity="0.9" />
            <rect x="310" y="40" width="50" height="35" rx="8" fill="#334155" />
            <rect x="310" y="75" width="50" height="195" fill="#000000" opacity="0.9" />

            {/* Pleural Line */}
            <line x1="90" y1="85" x2="310" y2="85" stroke="#ffffff" strokeWidth="3" />

            {/* Left half: Aerated lung with sliding */}
            <rect x="90" y="87" width="110" height="180" fill="#05101f" opacity="0.5" />
            <line x1="95" y1="145" x2="195" y2="145" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="6 3" />
            <circle cx="140" cy="85" r="2" fill="#34d399" className="animate-ping" />
            <text x="105" y="105" fill="#34d399" fontSize="9" fontWeight="800">SLIDING ZONE</text>

            {/* Right half: Pneumothorax with abolished sliding / barcode */}
            <rect x="200" y="87" width="110" height="180" fill="#180709" opacity="0.6" />
            <line x1="205" y1="130" x2="305" y2="130" stroke="#f87171" strokeWidth="1.5" />
            <line x1="205" y1="165" x2="305" y2="165" stroke="#f87171" strokeWidth="1.5" />
            <line x1="205" y1="200" x2="305" y2="200" stroke="#f87171" strokeWidth="1.5" />
            <text x="215" y="105" fill="#f87171" fontSize="9" fontWeight="800">BARCODE ZONE</text>

            {/* Focal boundary transition marker */}
            <line x1="200" y1="65" x2="200" y2="240" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="4 2" />
            <polygon points="195,65 205,65 200,55" fill="#f59e0b" />
            <text x="145" y="50" fill="#f59e0b" fontSize="10" fontWeight="900">
              LUNG POINT BOUNDARY
            </text>
          </g>
        )}

        {id === 'blue-effusion' && (
          <g>
            {/* Rib Shadows */}
            <rect x="40" y="40" width="55" height="35" rx="8" fill="#334155" />
            <rect x="40" y="75" width="55" height="195" fill="#000000" opacity="0.9" />
            <rect x="305" y="40" width="55" height="35" rx="8" fill="#334155" />
            <rect x="305" y="75" width="55" height="195" fill="#000000" opacity="0.9" />

            {/* Parietal Pleura */}
            <line x1="95" y1="85" x2="305" y2="85" stroke="#ffffff" strokeWidth="3" />
            <text x="155" y="78" fill="#38bdf8" fontSize="9" fontWeight="700">PARIETAL PLEURA</text>

            {isPathology ? (
              <g>
                {/* Quad sign: anechoic effusion pool */}
                <path d="M 95 87 L 305 87 L 285 190 Q 200 170 115 190 Z" fill="#000000" stroke="#ef4444" strokeWidth="2" />
                
                {/* Floating atelectatic lung ("Jellyfish" sign) */}
                <path d="M 125 190 Q 200 160 275 190 L 265 240 Q 200 250 135 240 Z" fill="#1e293b" stroke="#60a5fa" strokeWidth="2" />
                <text x="145" y="215" fill="#93c5fd" fontSize="10" fontWeight="800">COMPRESSED LUNG</text>
                <text x="140" y="135" fill="#f87171" fontSize="11" fontWeight="900">
                  QUAD SIGN (EFFUSION)
                </text>
              </g>
            ) : (
              <g>
                <line x1="95" y1="145" x2="305" y2="145" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="6 3" />
                <text x="150" y="130" fill="#34d399" fontSize="10" fontWeight="800">NO PLEURAL FLUID</text>
              </g>
            )}
          </g>
        )}

        {id === 'blue-consolidation' && (
          <g>
            {/* Irregular Pleural line */}
            <path d="M 50 70 L 120 70 L 130 85 L 180 75 L 230 90 L 290 70 L 350 70" stroke="#ffffff" strokeWidth="3" fill="none" />

            {isPathology ? (
              <g>
                {/* Hepatization: solid liver-like lung parenchyma */}
                <path d="M 50 72 L 350 72 L 330 240 Q 200 260 70 240 Z" fill="#1e293b" opacity="0.85" />
                <text x="135" y="110" fill="#cbd5e1" fontSize="11" fontWeight="800">
                  HEPATIZED LUNG (TISSUE DENSITY)
                </text>

                {/* Air bronchograms: branching white echoes */}
                <path d="M 150 130 L 170 170 M 170 170 L 160 200 M 170 170 L 195 190" stroke="#ffffff" strokeWidth="3" fill="none" />
                <path d="M 230 140 L 245 180 M 245 180 L 265 200" stroke="#ffffff" strokeWidth="2.5" fill="none" />
                <text x="180" y="165" fill="#ffffff" fontSize="9" fontWeight="800">AIR BRONCHOGRAMS</text>

                {/* Shred sign (fractal irregular deep border) */}
                <path d="M 70 240 L 105 220 L 140 250 L 175 225 L 210 255 L 255 225 L 295 250 L 330 240" stroke="#ef4444" strokeWidth="3" fill="none" />
                <text x="145" y="270" fill="#f87171" fontSize="10" fontWeight="900">
                  SHRED SIGN (FRACTAL LINE)
                </text>
              </g>
            ) : (
              <g>
                <line x1="50" y1="130" x2="350" y2="130" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="8 4" />
                <text x="140" y="120" fill="#34d399" fontSize="10" fontWeight="800">NORMAL AERATION</text>
              </g>
            )}
          </g>
        )}

        {(id === 'focus-plax' || id === 'focus-psax') && (
          <g>
            {id === 'focus-psax' ? (
              // Short axis papillary level
              <g>
                {/* Crescent RV */}
                <path
                  d={isPathology
                    // D-Sign: RV pushes against flattened IVS
                    ? "M 80 150 Q 150 70 240 100 L 220 150 Q 150 140 100 150 Z"
                    : "M 90 150 Q 140 80 200 90 L 180 140 Q 140 130 100 140 Z"}
                  fill="#030712"
                  stroke={isPathology ? "#ef4444" : "#64748b"}
                  strokeWidth="2"
                />
                <text x="120" y="115" fill={isPathology ? "#f87171" : "#94a3b8"} fontSize="11" fontWeight="800">
                  {isPathology ? "DILATED RV" : "RV"}
                </text>

                {/* LV Doughnut */}
                {isPathology ? (
                  // D-shaped LV with flattened septum
                  <g>
                    <path
                      d="M 180 110 L 180 200 Q 280 220 280 150 Q 280 90 180 110 Z"
                      fill="#030712"
                      stroke="#ef4444"
                      strokeWidth="3"
                    />
                    <text x="200" y="155" fill="#fca5a5" fontSize="11" fontWeight="900">{'D-SIGN LV'}</text>
                  </g>
                ) : (
                  // Normal circular LV doughnut
                  <g>
                    <circle cx="220" cy="155" r="55" fill="#030712" stroke="#e2e8f0" strokeWidth="3" />
                    {/* Papillary mounds */}
                    <circle cx="200" cy="180" r="10" fill="#475569" stroke="#94a3b8" />
                    <circle cx="245" cy="180" r="10" fill="#475569" stroke="#94a3b8" />
                    <text x="210" y="145" fill="#f8fafc" fontSize="11" fontWeight="800">LV</text>
                  </g>
                )}
              </g>
            ) : (
              // PLAX view
              <g>
                {/* RVOT anterior */}
                <ellipse cx="180" cy="80" rx="60" ry="22" fill="#030712" stroke="#64748b" strokeWidth="2" />
                <text x="165" y="85" fill="#94a3b8" fontSize="10" fontWeight="700">RVOT</text>

                {/* Septum */}
                <line x1="120" y1="105" x2="250" y2="105" stroke="#cbd5e1" strokeWidth={isPathology ? "2" : "5"} />

                {/* LV cavity */}
                <ellipse
                  cx="180"
                  cy="150"
                  rx={isPathology ? 75 : 60}
                  ry={isPathology ? 45 : 35}
                  fill="#030712"
                  stroke={isPathology ? "#ef4444" : "#e2e8f0"}
                  strokeWidth="2.5"
                />
                <text x="175" y="155" fill="#f8fafc" fontSize="11" fontWeight="800">LV</text>

                {/* Mitral Valve Leaflet */}
                <line
                  x1="230"
                  y1="140"
                  x2={isPathology ? "205" : "190"}
                  y2={isPathology ? "125" : "110"}
                  stroke="#38bdf8"
                  strokeWidth="2.5"
                />
                <text x={isPathology ? "210" : "195"} y="125" fill="#38bdf8" fontSize="9" fontWeight="700">
                  {isPathology ? "EPSS > 12mm (POOR EF)" : "MV (EPSS < 7mm)"}
                </text>
              </g>
            )}
          </g>
        )}

        {id === 'focus-a4c' && (
          <g>
            {/* Cardiac Apex at top/transducer */}
            {/* Left Ventricle (apex-forming) */}
            <path
              d={isPathology
                ? "M 195 50 Q 280 120 250 180 L 195 180 Z"
                : "M 195 50 Q 290 120 260 180 L 195 180 Z"}
              fill="#020617"
              stroke="#cbd5e1"
              strokeWidth="2"
            />
            <text x="215" y="130" fill="#e2e8f0" fontSize="11" fontWeight="800">LV</text>

            {/* Right Ventricle */}
            <path
              d={isPathology
                // Severe RV Dilation in PE / RV failure
                ? "M 195 50 Q 110 110 135 180 L 195 180 Z"
                : "M 195 50 Q 140 120 150 180 L 195 180 Z"}
              fill="#020617"
              stroke={isPathology ? "#ef4444" : "#64748b"}
              strokeWidth={isPathology ? "2.5" : "1.5"}
            />
            <text x="155" y="130" fill={isPathology ? "#f87171" : "#94a3b8"} fontSize="11" fontWeight="800">
              {isPathology ? "DILATED RV" : "RV"}
            </text>

            {/* Atria in far field */}
            <ellipse cx="160" cy="225" rx="30" ry="22" fill="#020617" stroke="#64748b" strokeWidth="1.5" />
            <text x="152" y="230" fill="#94a3b8" fontSize="10">RA</text>

            <ellipse cx="230" cy="225" rx="32" ry="22" fill="#020617" stroke="#cbd5e1" strokeWidth="1.5" />
            <text x="222" y="230" fill="#cbd5e1" fontSize="10">LA</text>

            {/* Crux / AV Valves */}
            <line x1="140" y1="180" x2="255" y2="180" stroke="#38bdf8" strokeWidth="2" />

            {isPathology && (
              <g>
                <circle cx="195" cy="50" r="6" fill="#38bdf8" className="animate-ping" />
                <text x="110" y="35" fill="#f87171" fontSize="10" fontWeight="900">
                  {"McCONNELL'S SIGN (RV APEX SPARING)"}
                </text>
              </g>
            )}
          </g>
        )}

        {id === 'focus-subcostal' && (
          <g>
            {/* Liver acoustic window anteriorly */}
            <path d="M 80 45 Q 200 30 320 50 L 305 85 Q 200 70 95 80 Z" fill="#1e293b" opacity="0.7" />
            <text x="175" y="65" fill="#94a3b8" fontSize="10" fontWeight="700">LIVER WINDOW</text>

            {/* Subcostal 4 chambers */}
            <path d="M 90 90 Q 200 75 310 95 L 315 220 Q 200 240 85 220 Z" fill="#020617" stroke="#cbd5e1" strokeWidth="2" />
            
            {/* Pericardial fluid if pathology */}
            {isPathology ? (
              <g>
                <path
                  d="M 90 85 Q 200 70 310 90 L 300 125 Q 200 100 100 115 Z"
                  fill="#000000"
                  stroke="#ef4444"
                  strokeWidth="2"
                  className="animate-pulse"
                />
                <text x="135" y="110" fill="#f87171" fontSize="10" fontWeight="900">
                  PERICARDIAL TAMPONADE
                </text>
              </g>
            ) : null}

            {/* RV directly under liver */}
            <path d="M 110 120 Q 200 110 270 125 L 260 165 Q 200 155 120 165 Z" fill="#030712" stroke="#64748b" strokeWidth="1.5" />
            <text x="180" y="145" fill="#e2e8f0" fontSize="11" fontWeight="800">RV</text>

            {/* RA & LV in far field */}
            <ellipse cx="150" cy="195" rx="32" ry="18" fill="#020617" stroke="#64748b" />
            <text x="142" y="200" fill="#94a3b8" fontSize="10">RA</text>
            <ellipse cx="230" cy="195" rx="35" ry="20" fill="#020617" stroke="#cbd5e1" />
            <text x="222" y="200" fill="#cbd5e1" fontSize="10">LV</text>
          </g>
        )}

        {id === 'focus-ivc' && (
          <g>
            {/* Liver parenchyma surrounding IVC */}
            <path d="M 70 40 Q 200 30 330 50 L 330 260 L 70 260 Z" fill="#1e293b" opacity="0.5" />
            <text x="90" y="65" fill="#94a3b8" fontSize="10" fontWeight="700">LIVER</text>

            {/* Right Atrium junction */}
            <ellipse cx="200" cy="55" rx="45" ry="20" fill="#020617" stroke="#38bdf8" strokeWidth="2" />
            <text x="188" y="60" fill="#38bdf8" fontSize="10" fontWeight="800">RA</text>

            {/* Hepatic Vein entering IVC */}
            <path d="M 235 120 Q 280 140 280 160 L 260 170 Q 235 145 235 135 Z" fill="#030712" stroke="#64748b" />
            <text x="285" y="155" fill="#94a3b8" fontSize="9">HEPATIC V.</text>

            {/* IVC Longitudinal Tube */}
            {isPathology ? (
              // Plethoric dilated IVC (>2.1 cm, no collapse)
              <g>
                <path
                  d="M 160 65 L 160 270 L 240 270 L 240 65 Z"
                  fill="#000000"
                  stroke="#ef4444"
                  strokeWidth="3"
                />
                <text x="165" y="180" fill="#f87171" fontSize="10" fontWeight="900">
                  PLETHORIC IVC (&gt;2.1cm)
                </text>
                <text x="175" y="195" fill="#cbd5e1" fontSize="9" fontWeight="700">
                  HIGH CVP (&gt;15 mmHg)
                </text>
              </g>
            ) : (
              // Normal collapsible IVC
              <g>
                <path
                  d="M 175 65 Q 185 160 175 270 L 225 270 Q 215 160 225 65 Z"
                  fill="#030712"
                  stroke="#38bdf8"
                  strokeWidth="2"
                />
                <text x="180" y="180" fill="#38bdf8" fontSize="10" fontWeight="800">
                  NORMAL IVC
                </text>
                <text x="175" y="195" fill="#94a3b8" fontSize="9">
                  &gt;50% COLLAPSE
                </text>
              </g>
            )}
          </g>
        )}

        {id === 'vasc-femoral' && (
          <g>
            {/* Inguinal tissue plane */}
            <line x1="40" y1="60" x2="360" y2="60" stroke="#64748b" strokeWidth="2" strokeDasharray="4 2" />
            <text x="50" y="50" fill="#64748b" fontSize="10">INGUINAL LIGAMENT</text>

            {/* Common Femoral Artery (lateral, round, pulsatile) */}
            <circle cx="160" cy="150" r="30" fill="#050814" stroke="#f43f5e" strokeWidth="3" />
            <text x="145" y="155" fill="#fda4af" fontSize="11" fontWeight="800">CFA</text>

            {/* Great Saphenous Vein branch */}
            <circle cx="280" cy="120" r="14" fill="#030712" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="272" y="124" fill="#7dd3fc" fontSize="8" fontWeight="700">GSV</text>

            {/* Common Femoral Vein (medial, compressible) */}
            {isPathology ? (
              <g>
                <ellipse
                  cx="250"
                  cy="150"
                  rx="42"
                  ry={Math.max(34 - (compressionPct * 0.08), 28)}
                  fill="#090d16"
                  stroke="#ef4444"
                  strokeWidth="2.5"
                />
                <ellipse cx="250" cy="150" rx="24" ry="16" fill="#475569" stroke="#94a3b8" />
                <text x="215" y="155" fill="#fca5a5" fontSize="10" fontWeight="900">
                  FEMORAL DVT
                </text>
              </g>
            ) : (
              <g>
                <ellipse
                  cx="250"
                  cy="150"
                  rx={Math.max(42 - (compressionPct * 0.38), 7)}
                  ry={Math.max(34 - (compressionPct * 0.32), 2)}
                  fill="#030712"
                  stroke="#38bdf8"
                  strokeWidth="2"
                />
                <text x="238" y="155" fill="#7dd3fc" fontSize="11" fontWeight="800">
                  {compressionPct > 70 ? 'COLLAPSED' : 'CFV'}
                </text>
              </g>
            )}
          </g>
        )}

        {id === 'vasc-dvt' && (
          <g>
            {/* Popliteal Fossa border */}
            <path d="M 50 60 Q 200 45 350 60" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3 3" />
            <text x="60" y="50" fill="#64748b" fontSize="10">POPLITEAL FOSSA</text>

            {/* Popliteal Artery (deep, circular, pulsatile) */}
            <circle cx="200" cy="205" r="26" fill="#050814" stroke="#f43f5e" strokeWidth="2.5" />
            <text x="180" y="210" fill="#fda4af" fontSize="10" fontWeight="800">POP ART</text>

            {/* Popliteal Vein (superficial to artery) */}
            {isPathology ? (
              <g>
                <ellipse
                  cx="200"
                  cy="130"
                  rx="40"
                  ry={Math.max(30 - (compressionPct * 0.07), 24)}
                  fill="#090d16"
                  stroke="#ef4444"
                  strokeWidth="2.5"
                />
                <ellipse cx="200" cy="130" rx="22" ry="14" fill="#475569" stroke="#94a3b8" />
                <text x="155" y="135" fill="#fca5a5" fontSize="10" fontWeight="900">
                  OCCLUSIVE POPLITEAL DVT
                </text>
              </g>
            ) : (
              <g>
                <ellipse
                  cx="200"
                  cy="130"
                  rx={Math.max(40 - (compressionPct * 0.36), 6)}
                  ry={Math.max(30 - (compressionPct * 0.28), 2)}
                  fill="#030712"
                  stroke="#38bdf8"
                  strokeWidth="2"
                />
                <text x="185" y="135" fill="#7dd3fc" fontSize="11" fontWeight="800">
                  {compressionPct > 70 ? 'COLLAPSED' : 'POP VEIN'}
                </text>
              </g>
            )}
          </g>
        )}

        {id === 'vasc-ijv' && (
          <g>
            {/* Sternocleidomastoid muscle fascia */}
            <path d="M 50 60 Q 200 50 350 60" stroke="#64748b" strokeWidth="2" fill="none" opacity="0.6" />
            <text x="60" y="50" fill="#64748b" fontSize="10">SCM MUSCLE</text>

            {/* Carotid Artery (round, pulsatile, resists compression) */}
            <circle cx="250" cy="150" r="32" fill="#050814" stroke="#f43f5e" strokeWidth="3" />
            <text x="230" y="155" fill="#fda4af" fontSize="11" fontWeight="800">CAROTID</text>

            {/* Internal Jugular Vein (IJV) with compression dynamics */}
            {isPathology ? (
              // Thrombosed vein: fails to compress completely, internal clot visible
              <g>
                <ellipse
                  cx="140"
                  cy="150"
                  rx="48"
                  ry={Math.max(38 - (compressionPct * 0.08), 30)}
                  fill="#090d16"
                  stroke="#ef4444"
                  strokeWidth="2.5"
                />
                {/* Echogenic clot */}
                <ellipse cx="140" cy="150" rx="28" ry="18" fill="#475569" stroke="#94a3b8" />
                <text x="105" y="155" fill="#fca5a5" fontSize="10" fontWeight="900">
                  NON-COMPRESSIBLE THROMBUS
                </text>
              </g>
            ) : (
              // Normal vein: collapses completely with probe pressure
              <g>
                <ellipse
                  cx="140"
                  cy="150"
                  rx={Math.max(48 - (compressionPct * 0.4), 8)}
                  ry={Math.max(38 - (compressionPct * 0.36), 2)}
                  fill="#030712"
                  stroke="#38bdf8"
                  strokeWidth="2"
                />
                <text x="125" y="155" fill="#7dd3fc" fontSize="11" fontWeight="800">
                  {compressionPct > 70 ? 'COLLAPSED' : 'IJV'}
                </text>
              </g>
            )}
          </g>
        )}

        {id === 'vasc-gastric' && (
          <g>
            {/* Left Lobe of Liver Acoustic Window */}
            <path d="M 80 40 Q 200 28 320 50 L 305 95 Q 200 75 90 85 Z" fill="#1e293b" stroke="#334155" strokeWidth="1" opacity="0.8" />
            <text x="160" y="65" fill="#94a3b8" fontSize="10" fontWeight="700">LIVER (L-LOBE)</text>

            {/* Abdominal Aorta far field */}
            <circle cx="200" cy="245" r="24" fill="#020617" stroke="#f43f5e" strokeWidth="2.5" />
            <text x="180" y="250" fill="#fda4af" fontSize="10" fontWeight="800">AORTA</text>

            {/* Pancreas */}
            <ellipse cx="200" cy="190" rx="36" ry="12" fill="#1e293b" stroke="#64748b" />
            <text x="175" y="194" fill="#94a3b8" fontSize="9">PANCREAS</text>

            {/* Gastric Antrum */}
            {isPathology ? (
              // Distended Full Stomach with Frosted Glass particulate food
              <g>
                <ellipse cx="200" cy="135" rx="68" ry="40" fill="#1e293b" stroke="#ef4444" strokeWidth="3" className="animate-pulse" />
                <line x1="150" y1="125" x2="250" y2="125" stroke="#ffffff" strokeWidth="2" strokeDasharray="4 2" />
                <line x1="145" y1="140" x2="255" y2="140" stroke="#ffffff" strokeWidth="2" strokeDasharray="4 2" />
                <text x="135" y="130" fill="#fca5a5" fontSize="11" fontWeight="900">FULL STOMACH (FROSTED GLASS)</text>
                <text x="145" y="150" fill="#fbbf24" fontSize="9" fontWeight="700">PERLAS 2 (HIGH ASPIRATION RISK)</text>
              </g>
            ) : (
              // Collapsed Empty Antrum (Bull's Eye Target Sign)
              <g>
                <ellipse cx="200" cy="130" rx="30" ry="16" fill="#020617" stroke="#38bdf8" strokeWidth="2" />
                <ellipse cx="200" cy="130" rx="16" ry="8" fill="#334155" stroke="#94a3b8" />
                <text x="178" y="134" fill="#7dd3fc" fontSize="9" fontWeight="800">ANTRUM</text>
                <text x="140" y="155" fill="#34d399" fontSize="9" fontWeight="700">EMPTY (BULL&apos;S EYE SIGN)</text>
              </g>
            )}
          </g>
        )}

        {/* Acoustic Landmark Pin Overlays */}
        {showLandmarks && caseData.acousticLandmarks.map((lm, idx) => {
          const isSelected = activeLandmark?.id === lm.id;
          const px = (lm.x / 100) * 400;
          const py = (lm.y / 100) * 300;

          return (
            <g
              key={lm.id}
              onClick={(e) => {
                e.stopPropagation();
                onSelectLandmark(lm);
              }}
              className="cursor-pointer group"
            >
              <circle
                cx={px}
                cy={py}
                r={isSelected ? 10 : 7}
                fill={isSelected ? '#06b6d4' : '#22d3ee'}
                fillOpacity={isSelected ? 0.9 : 0.6}
                stroke="#ffffff"
                strokeWidth={isSelected ? 2.5 : 1.5}
                className="transition-all"
              />
              <circle
                cx={px}
                cy={py}
                r={isSelected ? 16 : 11}
                fill="none"
                stroke="#06b6d4"
                strokeWidth="1.5"
                opacity={0.5}
                className="animate-ping"
              />
              <text
                x={px}
                y={py + 3.5}
                textAnchor="middle"
                fill="#000000"
                fontSize="9"
                fontWeight="900"
              >
                {idx + 1}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Depth ruler on right side */}
      <div className="absolute right-1 top-4 bottom-4 w-3 flex flex-col justify-between items-center text-[8px] font-mono text-slate-500 select-none">
        <span>0</span>
        <span>•</span>
        <span>5</span>
        <span>•</span>
        <span>10</span>
        <span>•</span>
        <span>15cm</span>
      </div>
    </div>
  );
}
