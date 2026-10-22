'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Activity, 
  Snowflake, 
  Play, 
  Pause, 
  Sliders, 
  CheckCircle2, 
  AlertCircle, 
  RotateCcw,
  Info
} from 'lucide-react';

export default function POCUSMModeStrip() {
  const [patternMode, setPatternMode] = useState<'seashore' | 'barcode'>('seashore');
  const [sweepSpeed, setSweepSpeed] = useState<number>(2); // pixels per frame
  const [isFrozen, setIsFrozen] = useState<boolean>(false);
  const [cursorX, setCursorX] = useState<number>(50); // percentage 0-100 of sampling line

  const mainCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const bufferCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const animRef = useRef<number | null>(null);
  const frameCountRef = useRef<number>(0);

  // Initialize double buffers
  useEffect(() => {
    const main = mainCanvasRef.current;
    if (!main) return;

    if (!bufferCanvasRef.current) {
      const buffer = document.createElement('canvas');
      buffer.width = main.width;
      buffer.height = main.height;
      const ctx = buffer.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#020612';
        ctx.fillRect(0, 0, buffer.width, buffer.height);
      }
      bufferCanvasRef.current = buffer;
    }
  }, []);

  // Real-time double-buffered rolling M-mode column extractor
  useEffect(() => {
    if (isFrozen) return;

    const main = mainCanvasRef.current;
    const buffer = bufferCanvasRef.current;
    if (!main || !buffer) return;

    const mainCtx = main.getContext('2d');
    const bufferCtx = buffer.getContext('2d');
    if (!mainCtx || !bufferCtx) return;

    const width = main.width;
    const height = main.height;
    const pleuralY = Math.round(height * 0.38);

    const render = () => {
      frameCountRef.current++;
      const frame = frameCountRef.current;

      // 1. Shift the buffer to the left by sweepSpeed
      bufferCtx.drawImage(
        buffer,
        sweepSpeed, 0, width - sweepSpeed, height,
        0, 0, width - sweepSpeed, height
      );

      // 2. Generate new 1px to 2px vertical column on the right edge
      const colX = width - sweepSpeed;

      // Fill background of new column
      bufferCtx.fillStyle = '#020612';
      bufferCtx.fillRect(colX, 0, sweepSpeed, height);

      // Above pleural line: static subcutaneous chest wall (horizontal parallel strata in both seashore and barcode)
      for (let y = 0; y < pleuralY; y++) {
        // Stationary strata patterns
        const strata = Math.sin(y * 0.18) > 0.4 ? 1 : 0;
        if (strata) {
          bufferCtx.fillStyle = 'rgba(148, 163, 184, 0.45)';
          bufferCtx.fillRect(colX, y, sweepSpeed, 1);
        }
      }

      // Pleural line: bright specular reflector
      bufferCtx.fillStyle = '#ffffff';
      bufferCtx.fillRect(colX, pleuralY - 1, sweepSpeed, 3);

      // Below pleural line:
      if (patternMode === 'seashore') {
        // SEASHORE SIGN: granular, dynamic respiratory sandy speckle
        // Shimmering granular motion caused by aerated lung sliding
        const breathCycle = Math.sin((frame * 0.05)) * 0.5 + 0.5; // respiration cycle
        for (let y = pleuralY + 3; y < height; y++) {
          // Dynamic random speckle modulated by respiratory cycle
          const noise = Math.random();
          if (noise > 0.65 - breathCycle * 0.15) {
            const intensity = Math.floor(noise * 180);
            bufferCtx.fillStyle = `rgb(${intensity}, ${intensity}, ${Math.min(255, intensity + 30)})`;
            bufferCtx.fillRect(colX, y, sweepSpeed, 1);
          }
        }
      } else {
        // BARCODE / STRATOSPHERE SIGN: continuous rigid parallel horizontal lines throughout all depths
        for (let y = pleuralY + 3; y < height; y++) {
          const barcodeLine = Math.sin(y * 0.25) > 0.3 || (y % 11 === 0);
          if (barcodeLine) {
            bufferCtx.fillStyle = 'rgba(248, 113, 113, 0.7)';
            bufferCtx.fillRect(colX, y, sweepSpeed, 1);
          }
        }
      }

      // 3. Draw buffer onto main canvas
      mainCtx.drawImage(buffer, 0, 0);

      animRef.current = requestAnimationFrame(render);
    };

    animRef.current = requestAnimationFrame(render);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isFrozen, patternMode, sweepSpeed]);

  const handleReset = () => {
    const buffer = bufferCanvasRef.current;
    if (buffer) {
      const ctx = buffer.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#020612';
        ctx.fillRect(0, 0, buffer.width, buffer.height);
      }
    }
    frameCountRef.current = 0;
  };

  return (
    <div className="space-y-4">
      {/* ─── Control Toolbar ─── */}
      <div className="p-3 rounded-2xl bg-gradient-to-r from-[#0b1324] to-[#070b16] border border-white/10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${isFrozen ? 'bg-cyan-400' : 'bg-emerald-400 animate-pulse'}`} />
            <span className="text-[13px] font-[900] text-slate-100 tracking-tight">
              M-MODE LUNG MOTION STRIP
            </span>
          </div>

          {/* Pattern Mode Toggle */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/10 text-[11px]">
            <button
              onClick={() => {
                setPatternMode('seashore');
                handleReset();
              }}
              className={`px-3 py-1.5 rounded-lg font-[800] transition-colors ${
                patternMode === 'seashore'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Seashore Sign (Normal)
            </button>
            <button
              onClick={() => {
                setPatternMode('barcode');
                handleReset();
              }}
              className={`px-3 py-1.5 rounded-lg font-[800] transition-colors ${
                patternMode === 'barcode'
                  ? 'bg-rose-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Barcode Sign (Pneumothorax)
            </button>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Sweep Speed Selector */}
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-300">
            <span className="text-slate-400">Sweep:</span>
            {[1, 2, 4].map((s) => (
              <button
                key={s}
                onClick={() => setSweepSpeed(s)}
                className={`px-2 py-1 rounded border ${
                  sweepSpeed === s
                    ? 'bg-blue-600 text-white border-blue-500'
                    : 'bg-white/[0.04] text-slate-400 border-white/10'
                }`}
              >
                {s === 1 ? 'Slow' : s === 2 ? 'Normal' : 'Fast'}
              </button>
            ))}
          </div>

          {/* Freeze */}
          <button
            onClick={() => setIsFrozen(!isFrozen)}
            className={`px-3 py-1.5 rounded-xl text-[12px] font-[800] flex items-center gap-1.5 border transition-all ${
              isFrozen
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-[900]'
                : 'bg-white/[0.04] text-cyan-300 border-cyan-500/30 hover:bg-cyan-500/20'
            }`}
          >
            <Snowflake className="w-3.5 h-3.5" />
            <span>{isFrozen ? 'UNFREEZE' : 'FREEZE'}</span>
          </button>

          <button
            onClick={handleReset}
            className="p-1.5 rounded-xl bg-white/[0.04] text-slate-400 hover:text-white border border-white/10"
            title="Reset M-mode buffer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ─── Real-Time Rolling M-Mode Canvas ─── */}
      <div className="relative aspect-[16/9] bg-black rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
        <canvas
          ref={mainCanvasRef}
          width={700}
          height={380}
          className="w-full h-full object-fill"
        />

        {/* Pleural Line Label indicator */}
        <div className="absolute left-3 top-[38%] -translate-y-1/2 flex items-center gap-2 pointer-events-none">
          <span className="px-2 py-0.5 rounded bg-black/80 border border-white/30 text-[10px] font-mono text-cyan-300 font-[800]">
            PLEURAL LINE
          </span>
          <div className="w-8 border-b-2 border-cyan-400 border-dashed" />
        </div>

        {/* Above: Chest wall label */}
        <div className="absolute left-3 top-[18%] -translate-y-1/2 pointer-events-none">
          <span className="px-2 py-0.5 rounded bg-black/60 text-[9px] font-mono text-slate-400">
            CHEST WALL (PARIETAL STRATA)
          </span>
        </div>

        {/* Below: Lung pattern label */}
        <div className="absolute left-3 bottom-[25%] pointer-events-none">
          <span className={`px-2 py-1 rounded text-[10px] font-mono font-[800] border ${
            patternMode === 'seashore'
              ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
              : 'bg-rose-950/80 text-rose-300 border-rose-500/40'
          }`}>
            {patternMode === 'seashore' ? 'SEASHORE SIGN (NORMAL SLIDING)' : 'BARCODE / STRATOSPHERE SIGN (PNEUMOTHORAX)'}
          </span>
        </div>

        {/* Time axis on bottom */}
        <div className="absolute bottom-2 right-3 text-[9px] font-mono text-slate-500 pointer-events-none">
          TIME &rarr; (ROLLING REAL-TIME COLUMN EXTRACTOR)
        </div>
      </div>

      {/* ─── Clinical Interpretation Card ─── */}
      <div className={`p-4 rounded-2xl border flex items-start gap-3.5 ${
        patternMode === 'seashore'
          ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200'
          : 'bg-rose-950/30 border-rose-500/30 text-rose-200'
      }`}>
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
          patternMode === 'seashore' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
        }`}>
          {patternMode === 'seashore' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
        </div>
        <div className="space-y-1 text-[12px] leading-relaxed">
          <h4 className="font-[900] text-[14px]">
            {patternMode === 'seashore' ? 'Normal Seashore Sign Detected' : 'Barcode / Stratosphere Sign Detected'}
          </h4>
          <p className="text-slate-300">
            {patternMode === 'seashore'
              ? 'Laminar horizontal lines in the chest wall combined with a speckled, granular "sandy beach" pattern deep to the pleural line. This 100% excludes pneumothorax at this specific acoustic window.'
              : 'Rigid horizontal lines extend continuously through both the chest wall and the deep field without granular sandy speckling. Indicates complete absence of visceral pleural sliding (pneumothorax, apnea, severe bulla, or mainstem intubation).'}
          </p>
        </div>
      </div>
    </div>
  );
}
