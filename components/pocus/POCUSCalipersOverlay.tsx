'use client';

import React, { useState, useRef } from 'react';
import { 
  calculateIvcCollapsibility, 
  calculateIvcDistensibility, 
  calculateBladderVolume, 
  calculateEllipseArea 
} from '@/lib/pocusData';
import { POCUSMeasurement } from '@/lib/db';
import { 
  Ruler, 
  Maximize2, 
  Trash2, 
  RotateCcw, 
  Save, 
  Check, 
  HelpCircle,
  Activity,
  Layers
} from 'lucide-react';

export type CaliperMode = 'distance' | 'ellipse' | 'bladder' | 'ivc';

interface Point {
  x: number; // percentage 0-100
  y: number; // percentage 0-100
}

interface CalipersOverlayProps {
  depthScaleCm: number; // current depth e.g. 10 or 15 cm
  onSaveMeasurement?: (measurement: POCUSMeasurement) => void;
  width?: number;
  height?: number;
}

export default function POCUSCalipersOverlay({
  depthScaleCm = 15,
  onSaveMeasurement
}: CalipersOverlayProps) {
  const [mode, setMode] = useState<CaliperMode>('distance');
  const [points, setPoints] = useState<Point[]>([]);
  const [bladderAxes, setBladderAxes] = useState<{ d1?: number; d2?: number; d3?: number }>({});
  const [ivcAxes, setIvcAxes] = useState<{ max?: number; min?: number }>({});
  const [savedMeasurements, setSavedMeasurements] = useState<POCUSMeasurement[]>([]);

  const containerRef = useRef<HTMLDivElement | null>(null);

  // Convert pixel distance to cm based on depth scale (depthScaleCm corresponds to height of viewport)
  const calcDistCm = (p1: Point, p2: Point): number => {
    // dx and dy in percentage
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    // Assuming aspect ratio roughly 4:3 (width:height = 1.33:1)
    const normDy = dy;
    const normDx = dx * 1.333;
    const pctDist = Math.hypot(normDx, normDy);
    // 100% vertical = depthScaleCm
    const distCm = (pctDist / 100) * depthScaleCm;
    return Math.round(distCm * 10) / 10;
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const newPt: Point = { x, y };

    if (mode === 'distance') {
      if (points.length >= 2) {
        setPoints([newPt]);
      } else {
        const next = [...points, newPt];
        setPoints(next);
        if (next.length === 2) {
          const dCm = calcDistCm(next[0], next[1]);
          const meas: POCUSMeasurement = {
            type: 'distance',
            d1_mm: Math.round(dCm * 10),
            label: `Distance: ${dCm} cm (${Math.round(dCm * 10)} mm)`
          };
          setSavedMeasurements((prev) => [...prev, meas]);
          if (onSaveMeasurement) onSaveMeasurement(meas);
        }
      }
    } else if (mode === 'ellipse') {
      if (points.length >= 4) {
        setPoints([newPt]);
      } else {
        const next = [...points, newPt];
        setPoints(next);
        if (next.length === 4) {
          const major = calcDistCm(next[0], next[1]);
          const minor = calcDistCm(next[2], next[3]);
          const areaRes = calculateEllipseArea(major, minor);
          const meas: POCUSMeasurement = {
            type: 'ellipse',
            d1_mm: Math.round(major * 10),
            d2_mm: Math.round(minor * 10),
            area_cm2: areaRes.areaCm2,
            label: `Ellipse Area: ${areaRes.areaCm2} cm² (${major} x ${minor} cm)`
          };
          setSavedMeasurements((prev) => [...prev, meas]);
          if (onSaveMeasurement) onSaveMeasurement(meas);
        }
      }
    } else if (mode === 'bladder') {
      // Collect sequential axes for bladder
      if (points.length >= 2) {
        setPoints([newPt]);
      } else {
        const next = [...points, newPt];
        setPoints(next);
        if (next.length === 2) {
          const dist = calcDistCm(next[0], next[1]);
          if (!bladderAxes.d1) {
            setBladderAxes({ ...bladderAxes, d1: dist });
          } else if (!bladderAxes.d2) {
            setBladderAxes({ ...bladderAxes, d2: dist });
          } else if (!bladderAxes.d3) {
            const finalD1 = bladderAxes.d1;
            const finalD2 = bladderAxes.d2;
            const finalD3 = dist;
            setBladderAxes({ d1: finalD1, d2: finalD2, d3: finalD3 });
            const volRes = calculateBladderVolume(finalD1, finalD2, finalD3);
            const meas: POCUSMeasurement = {
              type: 'bladder_volume',
              d1_mm: Math.round(finalD1 * 10),
              d2_mm: Math.round(finalD2 * 10),
              d3_mm: Math.round(finalD3 * 10),
              volume_ml: volRes.volumeMl,
              label: `Bladder Volume: ${volRes.volumeMl} mL (${volRes.isRetention ? 'RETENTION >= 400mL' : 'Normal'})`
            };
            setSavedMeasurements((prev) => [...prev, meas]);
            if (onSaveMeasurement) onSaveMeasurement(meas);
          }
        }
      }
    } else if (mode === 'ivc') {
      if (points.length >= 2) {
        setPoints([newPt]);
      } else {
        const next = [...points, newPt];
        setPoints(next);
        if (next.length === 2) {
          const dist = calcDistCm(next[0], next[1]);
          if (!ivcAxes.max) {
            setIvcAxes({ ...ivcAxes, max: dist });
          } else {
            const max = Math.max(ivcAxes.max, dist);
            const min = Math.min(ivcAxes.max, dist);
            setIvcAxes({ max, min });
            const collRes = calculateIvcCollapsibility(max, min);
            const distRes = calculateIvcDistensibility(max, min);
            const meas: POCUSMeasurement = {
              type: 'ivc_collapsibility',
              ivc_max_cm: max,
              ivc_min_cm: min,
              ivc_index_pct: collRes.indexPct,
              label: `IVC: Max ${max}cm / Min ${min}cm • Collapsibility ${collRes.indexPct}% • Distensibility ${distRes.indexPct}%`
            };
            setSavedMeasurements((prev) => [...prev, meas]);
            if (onSaveMeasurement) onSaveMeasurement(meas);
          }
        }
      }
    }
  };

  const handleClear = () => {
    setPoints([]);
    setBladderAxes({});
    setIvcAxes({});
    setSavedMeasurements([]);
  };

  return (
    <div className="space-y-3">
      {/* ─── Caliper Control Toolbar ─── */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-xl bg-white/[0.04] border border-white/10 text-[12px]">
        {/* Mode Selector */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              setMode('distance');
              setPoints([]);
            }}
            className={`px-2.5 py-1.5 rounded-lg font-[700] flex items-center gap-1.5 transition-colors ${
              mode === 'distance' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Ruler className="w-3.5 h-3.5" />
            <span>2-Point Distance</span>
          </button>

          <button
            onClick={() => {
              setMode('ellipse');
              setPoints([]);
            }}
            className={`px-2.5 py-1.5 rounded-lg font-[700] flex items-center gap-1.5 transition-colors ${
              mode === 'ellipse' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Ellipse Area</span>
          </button>

          <button
            onClick={() => {
              setMode('bladder');
              setPoints([]);
              setBladderAxes({});
            }}
            className={`px-2.5 py-1.5 rounded-lg font-[700] flex items-center gap-1.5 transition-colors ${
              mode === 'bladder' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>3-Axis Bladder Vol</span>
          </button>

          <button
            onClick={() => {
              setMode('ivc');
              setPoints([]);
              setIvcAxes({});
            }}
            className={`px-2.5 py-1.5 rounded-lg font-[700] flex items-center gap-1.5 transition-colors ${
              mode === 'ivc' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>IVC Index</span>
          </button>
        </div>

        <button
          onClick={handleClear}
          className="px-2.5 py-1.5 rounded-lg text-slate-400 hover:text-rose-300 hover:bg-rose-500/10 flex items-center gap-1 transition-colors"
          title="Clear all calipers"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Calipers</span>
        </button>
      </div>

      {/* ─── Caliper Overlay Target Layer ─── */}
      <div
        ref={containerRef}
        onClick={handleCanvasClick}
        className="w-full h-full relative cursor-crosshair select-none"
      >
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          {/* Render active points and lines */}
          {points.length === 2 && (
            <g>
              <line
                x1={points[0].x}
                y1={points[0].y}
                x2={points[1].x}
                y2={points[1].y}
                stroke="#22d3ee"
                strokeWidth="0.8"
                strokeDasharray="2 1"
              />
              {/* Distance label */}
              <text
                x={(points[0].x + points[1].x) / 2}
                y={(points[0].y + points[1].y) / 2 - 2}
                fill="#22d3ee"
                fontSize="3.5"
                fontWeight="800"
                textAnchor="middle"
              >
                {calcDistCm(points[0], points[1])} cm
              </text>
            </g>
          )}

          {/* Caliper crosses for each point */}
          {points.map((pt, idx) => (
            <g key={idx}>
              <line x1={pt.x - 2} y1={pt.y} x2={pt.x + 2} y2={pt.y} stroke="#f59e0b" strokeWidth="0.8" />
              <line x1={pt.x} y1={pt.y - 2} x2={pt.x} y2={pt.y + 2} stroke="#f59e0b" strokeWidth="0.8" />
              <circle cx={pt.x} cy={pt.y} r="0.8" fill="#ffffff" />
            </g>
          ))}
        </svg>

        {/* Helpful instructions overlay if no points clicked */}
        {points.length === 0 && (
          <div className="absolute top-2 left-2 px-2.5 py-1 rounded-md bg-black/70 border border-white/10 text-[10px] text-cyan-300 font-mono pointer-events-none">
            {mode === 'distance' && 'Click 2 points on screen to measure distance'}
            {mode === 'ellipse' && 'Click 4 points: 2 for major axis, 2 for minor axis'}
            {mode === 'bladder' && (
              !bladderAxes.d1 ? 'Click 2 points for D1 (Transverse Width)' :
              !bladderAxes.d2 ? 'Click 2 points for D2 (AP Height)' :
              'Click 2 points for D3 (Sagittal Length)'
            )}
            {mode === 'ivc' && (
              !ivcAxes.max ? 'Click 2 points for IVC Max Diameter (Expiratory)' :
              'Click 2 points for IVC Min Diameter (Inspiratory)'
            )}
          </div>
        )}
      </div>

      {/* ─── Caliper Measurement Results List ─── */}
      {savedMeasurements.length > 0 && (
        <div className="p-3 rounded-xl bg-black/60 border border-cyan-500/30 space-y-1.5">
          <span className="text-[11px] font-[800] text-cyan-300 uppercase tracking-wider block">
            Active Caliper Measurements:
          </span>
          <div className="space-y-1 text-[12px]">
            {savedMeasurements.map((m, idx) => (
              <div key={idx} className="flex items-center justify-between text-slate-200">
                <span className="font-mono text-cyan-200">{m.label}</span>
                <span className="text-[10px] text-slate-400">Scale: {depthScaleCm}cm</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
