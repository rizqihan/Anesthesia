'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { POCUS_CASES, POCUSCase, ProbeType } from '@/lib/pocusData';
import { 
  Crosshair, 
  RotateCw, 
  RotateCcw, 
  CheckCircle2, 
  Compass, 
  Maximize2,
  Lock,
  Layers,
  Sparkles
} from 'lucide-react';

interface POCUSMannequinProps {
  activeCaseId: string;
  onSelectCase: (caseId: string) => void;
}

export default function POCUSMannequin({ activeCaseId, onSelectCase }: POCUSMannequinProps) {
  const currentCase = POCUS_CASES[activeCaseId] || POCUS_CASES['efast-ruq'];

  // Probe position in percentage (0-100) across 400x600 mannequin canvas
  const [probePos, setProbePos] = useState<{ x: number; y: number }>({
    x: currentCase.mannequinPosition.x,
    y: currentCase.mannequinPosition.y
  });

  const [probeRotation, setProbeRotation] = useState<number>(currentCase.mannequinPosition.angleDeg);
  const [isDragging, setIsDragging] = useState(false);
  const [lockedCase, setLockedCase] = useState<POCUSCase | null>(currentCase);
  const [viewFilter, setViewFilter] = useState<'all' | 'efast' | 'blue' | 'focus' | 'vascular'>('all');

  const [prevCaseId, setPrevCaseId] = useState(activeCaseId);
  const svgRef = useRef<SVGSVGElement | null>(null);

  // When activeCaseId changes externally, update probe position
  if (activeCaseId !== prevCaseId) {
    setPrevCaseId(activeCaseId);
    const target = POCUS_CASES[activeCaseId];
    if (target) {
      setProbePos({ x: target.mannequinPosition.x, y: target.mannequinPosition.y });
      setProbeRotation(target.mannequinPosition.angleDeg);
      setLockedCase(target);
    }
  }

  // Check distance to all targets and lock if <= 18px (converted from 400x600 viewBox)
  // Viewbox: 400x600. 18px in a 400px width is 4.5% x-axis, 3.0% y-axis.
  const checkWindowLock = useCallback((xPct: number, yPct: number) => {
    let bestCase: POCUSCase | null = null;
    let minDistancePx = Infinity;

    for (const c of Object.values(POCUS_CASES)) {
      // Convert percentage to viewBox coords
      const targetX = (c.mannequinPosition.x / 100) * 400;
      const targetY = (c.mannequinPosition.y / 100) * 600;

      const currentX = (xPct / 100) * 400;
      const currentY = (yPct / 100) * 600;

      const dist = Math.hypot(targetX - currentX, targetY - currentY);
      const lockRadius = c.mannequinPosition.lockRadiusPx || 18;

      if (dist <= lockRadius && dist < minDistancePx) {
        minDistancePx = dist;
        bestCase = c;
      }
    }

    if (bestCase && bestCase !== lockedCase) {
      setLockedCase(bestCase);
      setProbePos({ x: bestCase.mannequinPosition.x, y: bestCase.mannequinPosition.y });
      setProbeRotation(bestCase.mannequinPosition.angleDeg);
      onSelectCase(bestCase.id);
    } else if (!bestCase) {
      setLockedCase(null);
    }
  }, [lockedCase, onSelectCase]);

  // Pointer drag events
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    (e.target as Element).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !svgRef.current) return;

    const rect = svgRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    const xPct = Math.max(5, Math.min(95, (clientX / rect.width) * 100));
    const yPct = Math.max(5, Math.min(95, (clientY / rect.height) * 100));

    setProbePos({ x: xPct, y: yPct });
    checkWindowLock(xPct, yPct);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    try {
      (e.target as Element).releasePointerCapture(e.pointerId);
    } catch {}
  };

  const handleRotate = (delta: number) => {
    setProbeRotation((prev) => (prev + delta + 360) % 360);
  };

  const handleSnapTo = (c: POCUSCase) => {
    setProbePos({ x: c.mannequinPosition.x, y: c.mannequinPosition.y });
    setProbeRotation(c.mannequinPosition.angleDeg);
    setLockedCase(c);
    onSelectCase(c.id);
  };

  const filteredCases = Object.values(POCUS_CASES).filter(
    (c) => viewFilter === 'all' || c.protocol === viewFilter
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* ─── Left: Interactive Mannequin Canvas (7 cols) ─── */}
      <div className="lg:col-span-7 flex flex-col rounded-2xl bg-[#03060d] border border-white/10 p-5 shadow-2xl relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <h3 className="text-[15px] font-[900] text-slate-100 tracking-tight">
                Anatomical Probe Placement Simulator
              </h3>
            </div>
            <p className="text-[12px] text-slate-400 mt-0.5">
              Drag the ultrasound probe or tap any acoustic window (d &le; 18px magnetic lock)
            </p>
          </div>

          {/* Filter protocol */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/10 text-[11px]">
            {(['all', 'efast', 'blue', 'focus', 'vascular'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setViewFilter(filter)}
                className={`px-2 py-1 rounded-lg font-[700] uppercase transition-colors ${
                  viewFilter === filter
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Lock Status Banner */}
        <div className={`p-3 rounded-xl mb-4 border transition-all flex items-center justify-between ${
          lockedCase
            ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
            : 'bg-white/[0.03] border-white/10 text-slate-400'
        }`}>
          <div className="flex items-center gap-2.5">
            <Lock className={`w-4 h-4 ${lockedCase ? 'text-emerald-400' : 'text-slate-500'}`} />
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider block">
                {lockedCase ? 'Acoustic Window Locked' : 'Searching for Acoustic Window...'}
              </span>
              <span className="text-[13px] font-[800] text-white">
                {lockedCase ? lockedCase.title : 'Drag probe near an anatomical landmark'}
              </span>
            </div>
          </div>

          {lockedCase && (
            <span className="px-2 py-1 rounded-lg bg-emerald-500/20 text-emerald-200 border border-emerald-500/40 text-[11px] font-[700]">
              {lockedCase.probeType}
            </span>
          )}
        </div>

        {/* Mannequin SVG Viewport */}
        <div data-preserve-dark className="relative w-full aspect-[400/580] bg-[#020409] rounded-xl border border-white/5 overflow-hidden select-none touch-none">
          <svg
            ref={svgRef}
            viewBox="0 0 400 600"
            className="w-full h-full cursor-crosshair"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
          >
            <defs>
              {/* Subtle Body Gradient */}
              <radialGradient id="bodyGradient" cx="50%" cy="35%" r="60%">
                <stop offset="0%" stopColor="#1e293b" stopOpacity="0.7" />
                <stop offset="70%" stopColor="#0f172a" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#090d16" stopOpacity="0.95" />
              </radialGradient>

              {/* Grid pattern */}
              <pattern id="mannequinGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.04" />
              </pattern>
            </defs>

            {/* Background Grid */}
            <rect width="400" height="600" fill="url(#mannequinGrid)" />

            {/* ─── Anatomical Mannequin Body Silhouette ─── */}
            <g opacity="0.85">
              {/* Head */}
              <ellipse cx="200" cy="55" rx="35" ry="42" fill="url(#bodyGradient)" stroke="#334155" strokeWidth="2" />
              
              {/* Neck */}
              <path d="M 185 92 L 185 115 L 215 115 L 215 92 Z" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />

              {/* Clavicles */}
              <path d="M 130 120 Q 165 125 185 116 M 215 116 Q 235 125 270 120" stroke="#475569" strokeWidth="2" strokeDasharray="3 3" fill="none" />

              {/* Sternum */}
              <line x1="200" y1="118" x2="200" y2="230" stroke="#475569" strokeWidth="3" strokeDasharray="4 2" />
              {/* Xiphoid process */}
              <circle cx="200" cy="230" r="4" fill="#64748b" />

              {/* Torso & Pelvis Contour */}
              <path
                d="M 120 125 Q 90 145 95 240 Q 100 320 125 380 L 140 400 L 175 400 L 185 365 L 215 365 L 225 400 L 260 400 L 275 380 Q 300 320 305 240 Q 310 145 280 125 Z"
                fill="url(#bodyGradient)"
                stroke="#38bdf8"
                strokeWidth="1.5"
                strokeOpacity="0.5"
              />

              {/* Rib cage subtle contours */}
              <path d="M 140 160 Q 170 175 200 170 M 200 170 Q 230 175 260 160" stroke="#334155" strokeWidth="1.5" fill="none" />
              <path d="M 130 190 Q 170 205 200 200 M 200 200 Q 230 205 270 190" stroke="#334155" strokeWidth="1.5" fill="none" />
              <path d="M 125 220 Q 170 235 200 230 M 200 230 Q 230 235 275 220" stroke="#334155" strokeWidth="1.5" fill="none" />
              <path d="M 125 250 Q 170 265 200 260 M 200 260 Q 230 265 275 250" stroke="#334155" strokeWidth="1.5" fill="none" />

              {/* Iliac Crests */}
              <path d="M 115 320 Q 150 330 200 330 Q 250 330 285 320" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />

              {/* Lower Extremities (Upper Thighs to Knees) */}
              {/* Left thigh */}
              <path d="M 140 400 L 130 520 L 175 520 L 180 400 Z" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
              {/* Right thigh */}
              <path d="M 220 400 L 225 520 L 270 520 L 260 400 Z" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
              {/* Knees */}
              <ellipse cx="152" cy="535" rx="20" ry="14" fill="#1e293b" stroke="#475569" />
              <ellipse cx="248" cy="535" rx="20" ry="14" fill="#1e293b" stroke="#475569" />
            </g>

            {/* ─── Hotspot Acoustic Windows Targets ─── */}
            {filteredCases.map((c) => {
              const targetX = (c.mannequinPosition.x / 100) * 400;
              const targetY = (c.mannequinPosition.y / 100) * 600;
              const isCurrent = lockedCase?.id === c.id;

              return (
                <g
                  key={c.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSnapTo(c);
                  }}
                  className="cursor-pointer group"
                >
                  {/* Outer magnetic lock zone ring (d <= 18px) */}
                  <circle
                    cx={targetX}
                    cy={targetY}
                    r={c.mannequinPosition.lockRadiusPx || 18}
                    fill={isCurrent ? '#38bdf8' : '#3b82f6'}
                    fillOpacity={isCurrent ? 0.25 : 0.08}
                    stroke={isCurrent ? '#38bdf8' : '#60a5fa'}
                    strokeWidth={isCurrent ? 1.5 : 1}
                    strokeDasharray={isCurrent ? undefined : '3 2'}
                  />

                  {/* Pulsing indicator */}
                  <circle
                    cx={targetX}
                    cy={targetY}
                    r={isCurrent ? 9 : 6}
                    fill={isCurrent ? '#38bdf8' : '#2563eb'}
                    stroke="#ffffff"
                    strokeWidth={isCurrent ? 2 : 1}
                  />

                  {isCurrent && (
                    <circle
                      cx={targetX}
                      cy={targetY}
                      r={18}
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="1.5"
                      className="animate-ping"
                    />
                  )}

                  {/* Label */}
                  <text
                    x={targetX}
                    y={targetY - 14}
                    textAnchor="middle"
                    fill={isCurrent ? '#38bdf8' : '#94a3b8'}
                    fontSize="9"
                    fontWeight="800"
                    className="select-none pointer-events-none drop-shadow"
                  >
                    {c.windowId.toUpperCase()}
                  </text>
                </g>
              );
            })}

            {/* ─── Draggable Ultrasound Probe ─── */}
            {(() => {
              const px = (probePos.x / 100) * 400;
              const py = (probePos.y / 100) * 600;

              return (
                <g
                  transform={`translate(${px}, ${py}) rotate(${probeRotation})`}
                  className="cursor-grab active:cursor-grabbing pointer-events-none"
                >
                  {/* Probe Acoustic Beam Projection Fan */}
                  <path
                    d="M -12 25 L -45 90 A 90 90 0 0 0 45 90 L 12 25 Z"
                    fill="url(#bodyGradient)"
                    stroke="#38bdf8"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                    opacity={lockedCase ? 0.7 : 0.2}
                  />

                  {/* Transducer Face */}
                  <rect
                    x="-18"
                    y="15"
                    width="36"
                    height="10"
                    rx="3"
                    fill="#38bdf8"
                    stroke="#ffffff"
                    strokeWidth="1"
                  />

                  {/* Transducer Main Body */}
                  <rect
                    x="-14"
                    y="-30"
                    width="28"
                    height="45"
                    rx="6"
                    fill="#0f172a"
                    stroke="#64748b"
                    strokeWidth="2"
                  />

                  {/* Probe Indicator Notch (Orientation Marker) */}
                  {/* Marker is located on one side (pointing in direction of angle) */}
                  <rect
                    x="-17"
                    y="-10"
                    width="4"
                    height="12"
                    rx="1"
                    fill="#f59e0b"
                    stroke="#ffffff"
                    strokeWidth="1"
                  />

                  {/* Grip bands */}
                  <line x1="-10" y1="-15" x2="10" y2="-15" stroke="#334155" strokeWidth="2" />
                  <line x1="-10" y1="-5" x2="10" y2="-5" stroke="#334155" strokeWidth="2" />

                  {/* Probe Cord */}
                  <path d="M 0 -30 Q -10 -55 5 -75" fill="none" stroke="#475569" strokeWidth="3" />

                  {/* Center Target Dot */}
                  <circle cx="0" cy="20" r="2.5" fill="#ffffff" />
                </g>
              );
            })()}
          </svg>
        </div>

        {/* Rotation & Probe Controls Toolbar */}
        <div className="mt-4 p-3 rounded-xl bg-white/[0.03] border border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-amber-400" />
            <span className="text-[12px] font-[700] text-slate-200">Probe Notch Rotation:</span>
            <span className="text-[12px] font-mono font-[800] text-amber-400">{probeRotation}°</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handleRotate(-45)}
              className="p-2 rounded-lg bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/10 border border-white/10"
              title="Rotate 45° Counter-Clockwise"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleRotate(45)}
              className="p-2 rounded-lg bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/10 border border-white/10"
              title="Rotate 45° Clockwise"
            >
              <RotateCw className="w-4 h-4" />
            </button>

            {/* Quick angle presets */}
            <button
              onClick={() => setProbeRotation(0)}
              className={`px-2.5 py-1 text-[11px] font-[700] rounded-lg border ${
                probeRotation === 0 
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                  : 'bg-white/[0.04] text-slate-400 border-white/10'
              }`}
            >
              0° (Sagittal / Cephalad)
            </button>
            <button
              onClick={() => setProbeRotation(90)}
              className={`px-2.5 py-1 text-[11px] font-[700] rounded-lg border ${
                probeRotation === 90 
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                  : 'bg-white/[0.04] text-slate-400 border-white/10'
              }`}
            >
              90° (Transverse / Right)
            </button>
          </div>
        </div>
      </div>

      {/* ─── Right: Active Window Case Details & Protocol Checklist (5 cols) ─── */}
      <div className="lg:col-span-5 space-y-4">
        {lockedCase ? (
          <div className="p-5 rounded-2xl bg-[#0a101f] border border-blue-500/40 shadow-xl space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-[800] bg-blue-500/20 text-blue-300 border border-blue-500/30 uppercase">
                  {lockedCase.protocol.toUpperCase()} • {lockedCase.windowId.toUpperCase()}
                </span>
                <h3 className="text-[17px] font-[900] text-white mt-1 leading-snug">
                  {lockedCase.title}
                </h3>
              </div>
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>

            <p className="text-[12px] text-slate-300 leading-relaxed">
              {lockedCase.subtitle}
            </p>

            {/* Real Ultrasound Capture Preview Thumbnail */}
            {(lockedCase.normalPhoto || lockedCase.pathologyPhoto) && (
              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-black/50 border border-white/10">
                <img
                  src={lockedCase.normalPhoto?.url || lockedCase.pathologyPhoto?.url}
                  alt={lockedCase.title}
                  className="w-16 h-12 object-cover rounded-lg border border-white/10 shrink-0"
                />
                <div className="text-[11px] min-w-0">
                  <span className="text-[10px] font-mono text-cyan-400 font-[800] block uppercase">
                    {lockedCase.normalPhoto?.modality || lockedCase.pathologyPhoto?.modality} • Ultrasound Capture
                  </span>
                  <span className="text-slate-300 truncate block">
                    {lockedCase.normalPhoto?.signName || lockedCase.pathologyPhoto?.signName || lockedCase.title}
                  </span>
                </div>
              </div>
            )}

            <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1.5 text-[11px]">
              <div className="flex justify-between text-slate-400">
                <span>Recommended Transducer:</span>
                <span className="text-white font-[700]">{lockedCase.probeType} ({lockedCase.frequencyRange})</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Notch Orientation:</span>
                <span className="text-amber-300 font-[700]">{lockedCase.mannequinPosition.angleDeg}° Preset</span>
              </div>
            </div>

            {/* Procedural Step Checklist */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <span className="text-[11px] font-[800] text-slate-200 uppercase tracking-wider block">
                Acquisition Procedure:
              </span>
              <div className="space-y-1.5">
                {lockedCase.proceduralSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-[12px] text-slate-300">
                    <span className="w-4 h-4 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-mono flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-snug">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Action Button */}
            <button
              onClick={() => onSelectCase(lockedCase.id)}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-[800] text-[13px] flex items-center justify-center gap-2 shadow-lg shadow-blue-900/50 transition-all"
            >
              <span>Examine Ultrasound View in Atlas</span>
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-white/5 mx-auto flex items-center justify-center text-slate-400">
              <Crosshair className="w-6 h-6" />
            </div>
            <h4 className="text-[15px] font-[800] text-slate-200">No Window Locked</h4>
            <p className="text-[12px] text-slate-400 max-w-xs mx-auto">
              Drag the probe across the chest and abdomen on the left, or click any blue target marker to instantly snap to that acoustic window.
            </p>
          </div>
        )}

        {/* Quick Acoustic Windows Directory */}
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2.5">
          <span className="text-[11px] font-[800] text-slate-400 uppercase tracking-wider block">
            Acoustic Windows ({filteredCases.length})
          </span>
          <div className="space-y-1 max-h-[280px] overflow-y-auto pr-1">
            {filteredCases.map((c) => {
              const isSelected = lockedCase?.id === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => handleSnapTo(c)}
                  className={`w-full px-3 py-2 rounded-xl text-left flex items-center justify-between border transition-all text-[12px] ${
                    isSelected
                      ? 'bg-blue-600/20 border-blue-500/50 text-white'
                      : 'bg-white/[0.02] border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-blue-400' : 'bg-slate-500'}`} />
                    <span className="font-[700] truncate">{c.title}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">{c.probeType}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
