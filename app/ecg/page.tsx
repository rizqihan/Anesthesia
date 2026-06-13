'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useAppStore } from '@/store/appStore';
import { translations } from '@/lib/i18n';
import db from '@/lib/db';
import type { ECGDiagnosisRecord } from '@/lib/ecgData';
import { 
  Activity, ArrowLeft, Search, SlidersHorizontal, BookOpen, AlertTriangle, 
  ChevronDown, Heart, Info, CheckCircle2, ShieldAlert, ExternalLink, 
  Clock, Stethoscope, BriefcaseMedical, AlertOctagon, HelpCircle, RefreshCw,
  Monitor, ArrowRight, Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { printContentAsPDF } from '@/lib/pdfGenerator';

// ─── Programmatic SVG Waveform Component ───
// Renders high-accuracy ECG waveforms on simulated pink grid paper (1mm and 5mm grid lines)
function ECGWaveform({ type, label, size = 'small' }: { type: string; label?: string; size?: 'small' | 'large' }) {
  const height = size === 'large' ? 160 : 100;
  const width = 450;
  
  // Custom path generation based on pathology
  const path = useMemo(() => {
    let d = `M 0 ${height / 2}`; // Start at baseline
    const mid = height / 2;
    
    switch (type) {
      case 'stemi':
        // J-point ST elevation "tombstone" merging with tall T wave
        d = `M 0 ${mid} ` +
            // P wave
            `C 15 ${mid}, 22 ${mid - 8}, 30 ${mid} ` +
            // PR segment
            `L 45 ${mid} ` +
            // QRS
            `L 49 ${mid + 5} L 55 ${mid - 35} L 60 ${mid + 20} ` +
            // ST Elevation (High J-point)
            `L 65 ${mid - 25} ` +
            // Tombstone ST Segment merging into giant T wave
            `C 75 ${mid - 30}, 95 ${mid - 28}, 110 ${mid} ` +
            // Baseline
            `L 150 ${mid} ` +
            // Second cycle
            `C 165 ${mid}, 172 ${mid - 8}, 180 ${mid} ` +
            `L 195 ${mid} ` +
            `L 199 ${mid + 5} L 205 ${mid - 35} L 210 ${mid + 20} ` +
            `L 215 ${mid - 25} ` +
            `C 225 ${mid - 30}, 245 ${mid - 28}, 260 ${mid} ` +
            `L 300 ${mid} ` +
            // Third cycle
            `C 315 ${mid}, 322 ${mid - 8}, 330 ${mid} ` +
            `L 345 ${mid} ` +
            `L 349 ${mid + 5} L 355 ${mid - 35} L 360 ${mid + 20} ` +
            `L 365 ${mid - 25} ` +
            `C 375 ${mid - 30}, 395 ${mid - 28}, 410 ${mid} ` +
            `L 450 ${mid}`;
        break;
      
      case 'nstemi':
        // ST depression and T wave inversion
        d = `M 0 ${mid} ` +
            // P wave
            `C 15 ${mid}, 22 ${mid - 8}, 30 ${mid} ` +
            // PR segment
            `L 45 ${mid} ` +
            // QRS
            `L 49 ${mid + 5} L 55 ${mid - 35} L 61 ${mid + 22} ` +
            // ST depression (J-point is low)
            `L 66 ${mid + 12} L 80 ${mid + 12} ` +
            // Inverted T wave
            `C 90 ${mid + 22}, 105 ${mid + 20}, 115 ${mid} ` +
            // Baseline
            `L 150 ${mid} ` +
            // Second cycle
            `C 165 ${mid}, 172 ${mid - 8}, 180 ${mid} ` +
            `L 195 ${mid} ` +
            `L 199 ${mid + 5} L 205 ${mid - 35} L 211 ${mid + 22} ` +
            `L 216 ${mid + 12} L 230 ${mid + 12} ` +
            `C 240 ${mid + 22}, 255 ${mid + 20}, 265 ${mid} ` +
            `L 300 ${mid}`;
        break;

      case 'de_winter':
        // J-point upsloping ST depression merging into tall peaked T wave
        d = `M 0 ${mid} ` +
            // P wave
            `C 15 ${mid}, 22 ${mid - 8}, 30 ${mid} ` +
            // PR segment
            `L 45 ${mid} ` +
            // QRS
            `L 49 ${mid + 5} L 55 ${mid - 35} L 61 ${mid + 24} ` +
            // J-point depression & upsloping ST segment
            `L 66 ${mid + 14} L 75 ${mid + 8} ` +
            // Tall, peaked, symmetric T wave
            `C 82 ${mid - 25}, 88 ${mid - 35}, 95 ${mid} ` +
            // Baseline
            `L 150 ${mid} ` +
            // Cycle 2
            `C 165 ${mid}, 172 ${mid - 8}, 180 ${mid} ` +
            `L 195 ${mid} ` +
            `L 199 ${mid + 5} L 205 ${mid - 35} L 211 ${mid + 24} ` +
            `L 216 ${mid + 14} L 225 ${mid + 8} ` +
            `C 232 ${mid - 25}, 238 ${mid - 35}, 245 ${mid} ` +
            `L 300 ${mid}`;
        break;

      case 'wellens':
        // Type B deeply inverted symmetrical T wave in V2-V3
        d = `M 0 ${mid} ` +
            // P wave
            `C 15 ${mid}, 22 ${mid - 8}, 30 ${mid} ` +
            // PR
            `L 45 ${mid} ` +
            // QRS
            `L 49 ${mid + 5} L 55 ${mid - 35} L 61 ${mid + 15} ` +
            // Isoelectric ST segment
            `L 68 ${mid} ` +
            // Deeply inverted T wave
            `C 75 ${mid + 30}, 92 ${mid + 35}, 105 ${mid} ` +
            `L 150 ${mid} ` +
            // Cycle 2
            `C 165 ${mid}, 172 ${mid - 8}, 180 ${mid} ` +
            `L 195 ${mid} ` +
            `L 199 ${mid + 5} L 205 ${mid - 35} L 211 ${mid + 15} ` +
            `L 218 ${mid} ` +
            `C 225 ${mid + 30}, 242 ${mid + 35}, 255 ${mid} ` +
            `L 300 ${mid}`;
        break;

      case 'posterior_mi':
        // Reciprocal ST depression in V1-V3 with high R wave and upright T
        d = `M 0 ${mid} ` +
            // P wave
            `C 15 ${mid}, 22 ${mid - 8}, 30 ${mid} ` +
            `L 45 ${mid} ` +
            // Tall R wave (V2)
            `L 49 ${mid + 2} L 54 ${mid - 45} L 60 ${mid + 18} ` +
            // ST depression (depressed J-point)
            `L 65 ${mid + 10} L 80 ${mid + 10} ` +
            // Tall upright T wave
            `C 90 ${mid - 5}, 102 ${mid - 12}, 112 ${mid} ` +
            `L 150 ${mid} ` +
            // Cycle 2
            `C 165 ${mid}, 172 ${mid - 8}, 180 ${mid} ` +
            `L 195 ${mid} ` +
            `L 199 ${mid + 2} L 205 ${mid - 45} L 210 ${mid + 18} ` +
            `L 215 ${mid + 10} L 230 ${mid + 10} ` +
            `C 240 ${mid - 5}, 252 ${mid - 12}, 262 ${mid} ` +
            `L 300 ${mid}`;
        break;

      case 'brugada':
        // Coved ST elevation (V1-V2) merging into inverted T wave
        d = `M 0 ${mid} ` +
            // P wave
            `C 15 ${mid}, 22 ${mid - 8}, 30 ${mid} ` +
            `L 45 ${mid} ` +
            // QRS
            `L 49 ${mid + 4} L 55 ${mid - 30} L 59 ${mid - 15} ` +
            // Coved ST elevation (High J point)
            `L 64 ${mid - 22} ` +
            `C 72 ${mid - 25}, 85 ${mid - 10}, 92 ${mid + 15} ` +
            // Inverted T wave
            `C 98 ${mid + 22}, 108 ${mid + 18}, 115 ${mid} ` +
            `L 150 ${mid} ` +
            // Cycle 2
            `C 165 ${mid}, 172 ${mid - 8}, 180 ${mid} ` +
            `L 195 ${mid} ` +
            `L 199 ${mid + 4} L 205 ${mid - 30} L 209 ${mid - 15} ` +
            `L 214 ${mid - 22} ` +
            `C 222 ${mid - 25}, 235 ${mid - 10}, 242 ${mid + 15} ` +
            `C 248 ${mid + 22}, 258 ${mid + 18}, 265 ${mid} ` +
            `L 300 ${mid}`;
        break;

      case 'hyperkalemia':
        // Tall, symmetric, extremely peaked tent-shaped T wave
        d = `M 0 ${mid} ` +
            // P wave flat
            `C 15 ${mid}, 25 ${mid - 2}, 30 ${mid} ` +
            `L 45 ${mid} ` +
            // QRS (slightly widened)
            `L 48 ${mid + 6} L 55 ${mid - 35} L 62 ${mid + 18} ` +
            `L 67 ${mid} ` +
            // Peaked T wave
            `C 74 ${mid - 10}, 80 ${mid - 45}, 85 ${mid - 45} ` +
            `C 90 ${mid - 45}, 96 ${mid - 10}, 103 ${mid} ` +
            `L 150 ${mid} ` +
            // Cycle 2
            `C 165 ${mid}, 175 ${mid - 2}, 180 ${mid} ` +
            `L 195 ${mid} ` +
            `L 198 ${mid + 6} L 205 ${mid - 35} L 212 ${mid + 18} ` +
            `L 217 ${mid} ` +
            `C 224 ${mid - 10}, 230 ${mid - 45}, 235 ${mid - 45} ` +
            `C 240 ${mid - 45}, 246 ${mid - 10}, 253 ${mid} ` +
            `L 300 ${mid}`;
        break;

      case 'pe':
        // S1Q3T3 (Lead III view: Q wave + T-wave inversion)
        d = `M 0 ${mid} ` +
            // P
            `C 15 ${mid}, 22 ${mid - 8}, 30 ${mid} ` +
            `L 45 ${mid} ` +
            // QRS with deep Q wave
            `L 48 ${mid + 15} L 54 ${mid - 30} L 60 ${mid + 8} ` +
            `L 65 ${mid} ` +
            // Inverted T wave
            `C 75 ${mid + 18}, 90 ${mid + 18}, 100 ${mid} ` +
            `L 150 ${mid} ` +
            // Cycle 2
            `C 165 ${mid}, 172 ${mid - 8}, 180 ${mid} ` +
            `L 195 ${mid} ` +
            `L 198 ${mid + 15} L 204 ${mid - 30} L 210 ${mid + 8} ` +
            `L 215 ${mid} ` +
            `C 225 ${mid + 18}, 240 ${mid + 18}, 250 ${mid} ` +
            `L 300 ${mid}`;
        break;

      case 'chb':
        // Complete Heart Block: P waves march regularly (every 60 units), 
        // QRS escape rhythm marches independently (every 140 units)
        // Redrawn specifically for complete heart block representation
        d = `M 0 ${mid} `;
        // Let's programmatically plot independent P and QRS waves
        // P waves at: 20, 80, 140, 200, 260, 320, 380, 440
        // QRS complexes at: 50, 190, 330
        const pPositions = [20, 80, 140, 200, 260, 320, 380, 440];
        const qrsPositions = [50, 190, 330];
        
        for (let x = 0; x < width; x++) {
          let y = mid;
          
          // Add P waves
          for (let p of pPositions) {
            if (x >= p - 10 && x <= p + 10) {
              const diff = x - p;
              // Gaussian P wave shape
              y -= Math.exp(-Math.pow(diff / 5, 2)) * 8;
            }
          }
          
          // Add QRS complexes (wide in CHB ventricular escape)
          for (let q of qrsPositions) {
            // Q wave
            if (x >= q - 5 && x < q - 2) {
              y += (x - (q - 5)) * 2;
            }
            // R wave
            else if (x >= q - 2 && x <= q + 3) {
              const diff = x - q;
              y -= 30 * Math.exp(-Math.pow(diff / 2.5, 2));
            }
            // S wave
            else if (x > q + 3 && x <= q + 8) {
              y += 10 * Math.exp(-Math.pow((x - (q + 5)) / 2, 2));
            }
            // T wave (discordant and wide)
            else if (x > q + 15 && x <= q + 45) {
              const diff = x - (q + 30);
              y -= Math.exp(-Math.pow(diff / 10, 2)) * 14;
            }
          }
          
          if (x === 0) d = `M 0 ${y}`;
          else d += ` L ${x} ${y}`;
        }
        break;

      case 'wpw':
        // Short PR interval (<120 ms) + delta wave slurred upstroke
        d = `M 0 ${mid} ` +
            // P wave
            `C 15 ${mid}, 22 ${mid - 8}, 30 ${mid} ` +
            // Almost no PR segment, immediately starts slurred Delta wave
            `L 35 ${mid} ` +
            // Delta wave (slow slope)
            `L 45 ${mid - 12} ` +
            // R wave peak (sharp)
            `L 48 ${mid - 38} L 53 ${mid + 18} ` +
            `L 58 ${mid} ` +
            // T wave
            `C 68 ${mid - 12}, 82 ${mid - 12}, 95 ${mid} ` +
            `L 150 ${mid} ` +
            // Cycle 2
            `C 165 ${mid}, 172 ${mid - 8}, 180 ${mid} ` +
            `L 185 ${mid} ` +
            `L 195 ${mid - 12} ` +
            `L 198 ${mid - 38} L 203 ${mid + 18} ` +
            `L 208 ${mid} ` +
            `C 218 ${mid - 12}, 232 ${mid - 12}, 245 ${mid} ` +
            `L 300 ${mid}`;
        break;

      case 'afib':
        // Irregular R-R complexes, chaotic baseline (fibrillatory waves)
        d = `M 0 ${mid} `;
        const afibQrsPositions = [40, 105, 145, 230, 275, 370, 420];
        
        for (let x = 0; x < width; x++) {
          let y = mid;
          
          // Add chaotic fibrillatory noise
          y += Math.sin(x * 0.7) * 2.2 + Math.cos(x * 1.5) * 1.0;
          
          // Add irregular QRS complexes
          for (let q of afibQrsPositions) {
            if (x >= q - 4 && x < q - 2) {
              y += 3;
            } else if (x >= q - 2 && x <= q + 2) {
              const diff = x - q;
              y -= 38 * Math.exp(-Math.pow(diff / 1.5, 2));
            } else if (x > q + 2 && x <= q + 5) {
              y += 6;
            } else if (x > q + 10 && x <= q + 30) {
              // T wave
              const diff = x - (q + 20);
              y -= Math.exp(-Math.pow(diff / 6, 2)) * 6;
            }
          }
          
          if (x === 0) d = `M 0 ${y}`;
          else d += ` L ${x} ${y}`;
        }
        break;

      case 'aflutter':
        // Continuous sawtooth flutter waves at ~300 bpm, regular QRS 4:1 or 3:1
        d = `M 0 ${mid} `;
        const flutterQrsPositions = [70, 190, 310, 430];
        
        for (let x = 0; x < width; x++) {
          let y = mid;
          
          // Continuous sawtooth wave: F wave amplitude 6
          const fPeriod = 24; // 24 units per F wave
          const phase = x % fPeriod;
          const sawtooth = (phase / fPeriod) * 10 - 5;
          y += sawtooth;
          
          // Superimpose QRS complexes
          for (let q of flutterQrsPositions) {
            if (x >= q - 3 && x < q - 1) {
              y += 4;
            } else if (x >= q - 1 && x <= q + 2) {
              const diff = x - q;
              y -= 35 * Math.exp(-Math.pow(diff / 1.5, 2));
            } else if (x > q + 2 && x <= q + 5) {
              y += 8;
            }
          }
          
          if (x === 0) d = `M 0 ${y}`;
          else d += ` L ${x} ${y}`;
        }
        break;

      case 'long_qt':
        // Prolonged QT interval (very wide T wave placed very late)
        d = `M 0 ${mid} ` +
            // P wave
            `C 15 ${mid}, 22 ${mid - 8}, 30 ${mid} ` +
            `L 45 ${mid} ` +
            // QRS (narrow)
            `L 49 ${mid + 5} L 54 ${mid - 35} L 59 ${mid + 15} ` +
            // Long flat ST segment segment
            `L 90 ${mid} ` +
            // Delayed, broad, flat T wave
            `C 105 ${mid - 12}, 125 ${mid - 12}, 138 ${mid} ` +
            `L 180 ${mid} ` +
            // Cycle 2
            `C 195 ${mid}, 202 ${mid - 8}, 210 ${mid} ` +
            `L 225 ${mid} ` +
            `L 229 ${mid + 5} L 234 ${mid - 35} L 239 ${mid + 15} ` +
            `L 270 ${mid} ` +
            `C 285 ${mid - 12}, 305 ${mid - 12}, 318 ${mid} ` +
            `L 450 ${mid}`;
        break;

      case 'lbbb':
        // Wide QRS with notched R wave in lateral leads + discordant ST/T
        d = `M 0 ${mid} ` +
            // P wave
            `C 15 ${mid}, 22 ${mid - 8}, 30 ${mid} ` +
            `L 42 ${mid} ` +
            // Notched broad QRS complex
            `L 46 ${mid + 3} L 50 ${mid - 25} L 53 ${mid - 12} L 56 ${mid - 28} L 62 ${mid + 5} ` +
            // ST depression (J-point is low)
            `L 66 ${mid + 8} L 75 ${mid + 8} ` +
            // Discordant T wave (inverted)
            `C 85 ${mid + 18}, 98 ${mid + 15}, 108 ${mid} ` +
            `L 150 ${mid} ` +
            // Cycle 2
            `C 165 ${mid}, 172 ${mid - 8}, 180 ${mid} ` +
            `L 192 ${mid} ` +
            `L 196 ${mid + 3} L 200 ${mid - 25} L 203 ${mid - 12} L 206 ${mid - 28} L 212 ${mid + 5} ` +
            `L 216 ${mid + 8} L 225 ${mid + 8} ` +
            `C 235 ${mid + 18}, 248 ${mid + 15}, 258 ${mid} ` +
            `L 300 ${mid}`;
        break;

      case 'rbbb':
        // Wide QRS, rSR' wave in V1-V3 + discordant ST depression
        d = `M 0 ${mid} ` +
            // P wave
            `C 15 ${mid}, 22 ${mid - 8}, 30 ${mid} ` +
            `L 43 ${mid} ` +
            // QRS with rSR'
            `L 46 ${mid - 10} ` + // small r
            `L 50 ${mid + 28} ` + // deep S
            `L 55 ${mid - 32} ` + // tall R'
            `L 60 ${mid + 5} ` +
            // Discordant depressed ST
            `L 65 ${mid + 10} L 74 ${mid + 10} ` +
            // Discordant inverted T wave
            `C 84 ${mid + 20}, 96 ${mid + 16}, 106 ${mid} ` +
            `L 150 ${mid} ` +
            // Cycle 2
            `C 165 ${mid}, 172 ${mid - 8}, 180 ${mid} ` +
            `L 193 ${mid} ` +
            `L 196 ${mid - 10} ` +
            `L 200 ${mid + 28} ` +
            `L 205 ${mid - 32} ` +
            `L 210 ${mid + 5} ` +
            `L 215 ${mid + 10} L 224 ${mid + 10} ` +
            `C 234 ${mid + 20}, 246 ${mid + 16}, 256 ${mid} ` +
            `L 300 ${mid}`;
        break;

      case 'left_main':
        // Widespread ST depression
        d = `M 0 ${mid} ` +
            // P wave
            `C 15 ${mid}, 22 ${mid - 8}, 30 ${mid} ` +
            `L 45 ${mid} ` +
            // QRS
            `L 49 ${mid + 5} L 55 ${mid - 32} L 61 ${mid + 25} ` +
            // Very deep ST depression
            `L 66 ${mid + 16} L 82 ${mid + 16} ` +
            // T wave
            `C 92 ${mid + 24}, 108 ${mid + 20}, 118 ${mid} ` +
            `L 150 ${mid} ` +
            // Cycle 2
            `C 165 ${mid}, 172 ${mid - 8}, 180 ${mid} ` +
            `L 195 ${mid} ` +
            `L 199 ${mid + 5} L 205 ${mid - 32} L 211 ${mid + 25} ` +
            `L 216 ${mid + 16} L 232 ${mid + 16} ` +
            `C 242 ${mid + 24}, 258 ${mid + 20}, 268 ${mid} ` +
            `L 300 ${mid}`;
        break;

      case 'unstable_angina':
        // Mild ST depression
        d = `M 0 ${mid} ` +
            // P wave
            `C 15 ${mid}, 22 ${mid - 8}, 30 ${mid} ` +
            `L 45 ${mid} ` +
            // QRS
            `L 49 ${mid + 4} L 55 ${mid - 32} L 61 ${mid + 18} ` +
            // Mild ST depression
            `L 66 ${mid + 7} L 78 ${mid + 7} ` +
            // T wave
            `C 86 ${mid + 13}, 98 ${mid + 10}, 108 ${mid} ` +
            `L 150 ${mid} ` +
            // Cycle 2
            `C 165 ${mid}, 172 ${mid - 8}, 180 ${mid} ` +
            `L 195 ${mid} ` +
            `L 199 ${mid + 4} L 205 ${mid - 32} L 211 ${mid + 18} ` +
            `L 216 ${mid + 7} L 228 ${mid + 7} ` +
            `C 236 ${mid + 13}, 248 ${mid + 10}, 258 ${mid} ` +
            `L 300 ${mid}`;
        break;

      case 'normal':
      default:
        // Normal P-QRS-T complex
        d = `M 0 ${mid} ` +
            // P wave
            `C 15 ${mid}, 22 ${mid - 8}, 30 ${mid} ` +
            // PR segment
            `L 45 ${mid} ` +
            // QRS complex (Q-R-S)
            `L 49 ${mid + 4} L 55 ${mid - 35} L 61 ${mid + 15} ` +
            // ST segment (Isoelectric)
            `L 68 ${mid} L 76 ${mid} ` +
            // T wave (smooth, upright)
            `C 86 ${mid - 14}, 98 ${mid - 12}, 108 ${mid} ` +
            // Baseline
            `L 150 ${mid} ` +
            // Cycle 2
            `C 165 ${mid}, 172 ${mid - 8}, 180 ${mid} ` +
            `L 195 ${mid} ` +
            `L 199 ${mid + 4} L 205 ${mid - 35} L 211 ${mid + 15} ` +
            `L 218 ${mid} L 226 ${mid} ` +
            `C 236 ${mid - 14}, 248 ${mid - 12}, 258 ${mid} ` +
            `L 300 ${mid} ` +
            // Cycle 3
            `C 315 ${mid}, 322 ${mid - 8}, 330 ${mid} ` +
            `L 345 ${mid} ` +
            `L 349 ${mid + 4} L 355 ${mid - 35} L 361 ${mid + 15} ` +
            `L 368 ${mid} L 376 ${mid} ` +
            `C 386 ${mid - 14}, 398 ${mid - 12}, 408 ${mid} ` +
            `L 450 ${mid}`;
        break;
    }
    return d;
  }, [type, height]);

  // Standard annotations shown on large details waveform
  const renderAnnotations = () => {
    if (size !== 'large') return null;
    const mid = height / 2;
    
    switch (type) {
      case 'stemi':
        return (
          <>
            <circle cx="65" cy={mid - 25} r="5" fill="none" stroke="#f43f5e" strokeWidth="1.5" className="animate-pulse" />
            <text x="75" y={mid - 25} fill="#f43f5e" className="text-[10px] font-bold" style={{ textShadow: '0 0 4px rgba(0,0,0,0.8)' }}>J-point ST Elevation</text>
            <text x="115" y={mid - 8} fill="#fb7185" className="text-[9px]" style={{ textShadow: '0 0 4px rgba(0,0,0,0.8)' }}>Tombstone T wave</text>
          </>
        );
      case 'nstemi':
        return (
          <>
            <circle cx="73" cy={mid + 12} r="5" fill="none" stroke="#38bdf8" strokeWidth="1.5" className="animate-pulse" />
            <text x="83" y={mid + 16} fill="#38bdf8" className="text-[10px] font-bold" style={{ textShadow: '0 0 4px rgba(0,0,0,0.8)' }}>ST Depression</text>
            <text x="110" y={mid + 30} fill="#60a5fa" className="text-[9px]" style={{ textShadow: '0 0 4px rgba(0,0,0,0.8)' }}>Inverted T wave</text>
          </>
        );
      case 'de_winter':
        return (
          <>
            <circle cx="66" cy={mid + 14} r="5" fill="none" stroke="#a78bfa" strokeWidth="1.5" className="animate-pulse" />
            <text x="12" y={mid + 25} fill="#a78bfa" className="text-[10px] font-bold" style={{ textShadow: '0 0 4px rgba(0,0,0,0.8)' }}>Upsloping ST depression</text>
            <text x="95" y={mid - 20} fill="#c084fc" className="text-[10px] font-bold" style={{ textShadow: '0 0 4px rgba(0,0,0,0.8)' }}>Tall Peaked T wave</text>
          </>
        );
      case 'wellens':
        return (
          <>
            <circle cx="85" cy={mid + 32} r="5" fill="none" stroke="#2dd4bf" strokeWidth="1.5" className="animate-pulse" />
            <text x="95" y={mid + 28} fill="#2dd4bf" className="text-[10px] font-bold" style={{ textShadow: '0 0 4px rgba(0,0,0,0.8)' }}>Deeply Inverted T (Type B)</text>
            <text x="45" y={mid - 15} fill="#94a3b8" className="text-[9px]" style={{ textShadow: '0 0 4px rgba(0,0,0,0.8)' }}>Isoelectric ST segment</text>
          </>
        );
      case 'brugada':
        return (
          <>
            <circle cx="64" cy={mid - 22} r="5" fill="none" stroke="#fbbf24" strokeWidth="1.5" className="animate-pulse" />
            <text x="74" y={mid - 22} fill="#fbbf24" className="text-[10px] font-bold" style={{ textShadow: '0 0 4px rgba(0,0,0,0.8)' }}>"Coved" ST Elevation</text>
            <text x="100" y={mid + 30} fill="#f59e0b" className="text-[9px]" style={{ textShadow: '0 0 4px rgba(0,0,0,0.8)' }}>Negative T wave</text>
          </>
        );
      case 'hyperkalemia':
        return (
          <>
            <circle cx="85" cy={mid - 45} r="5" fill="none" stroke="#f43f5e" strokeWidth="1.5" className="animate-pulse" />
            <text x="95" y={mid - 35} fill="#f43f5e" className="text-[10px] font-bold" style={{ textShadow: '0 0 4px rgba(0,0,0,0.8)' }}>Tall Peaked T wave</text>
            <text x="95" y={mid - 22} fill="#fb7185" className="text-[9px]" style={{ textShadow: '0 0 4px rgba(0,0,0,0.8)' }}>("Tent-shaped", narrow basis)</text>
          </>
        );
      case 'wpw':
        return (
          <>
            <circle cx="45" cy={mid - 12} r="5" fill="none" stroke="#34d399" strokeWidth="1.5" className="animate-pulse" />
            <text x="12" y={mid - 20} fill="#34d399" className="text-[10px] font-bold" style={{ textShadow: '0 0 4px rgba(0,0,0,0.8)' }}>Delta wave (pre-excitation)</text>
            <text x="70" y={mid + 25} fill="#a78bfa" className="text-[9px]" style={{ textShadow: '0 0 4px rgba(0,0,0,0.8)' }}>Short PR interval</text>
          </>
        );
      case 'afib':
        return (
          <>
            <text x="10" y={mid + 28} fill="#38bdf8" className="text-[10px] font-bold" style={{ textShadow: '0 0 4px rgba(0,0,0,0.8)' }}>Fibrillatory (f) waves, No P waves</text>
            <text x="125" y={mid - 25} fill="#fb7185" className="text-[9px] font-bold" style={{ textShadow: '0 0 4px rgba(0,0,0,0.8)' }}>Irregular RR Interval</text>
          </>
        );
      case 'aflutter':
        return (
          <>
            <text x="10" y={mid + 26} fill="#fbbf24" className="text-[10px] font-bold" style={{ textShadow: '0 0 4px rgba(0,0,0,0.8)' }}>"Sawtooth" F waves (regular)</text>
            <text x="195" y={mid - 22} fill="#34d399" className="text-[9px]" style={{ textShadow: '0 0 4px rgba(0,0,0,0.8)' }}>Controlled AV conduction</text>
          </>
        );
      case 'chb':
        return (
          <>
            {/* Highlight independent P waves */}
            <circle cx="80" cy={mid - 8} r="5" fill="none" stroke="#38bdf8" strokeWidth="1.5" className="animate-pulse" />
            <circle cx="140" cy={mid - 8} r="5" fill="none" stroke="#38bdf8" strokeWidth="1.5" className="animate-pulse" />
            <text x="95" y={mid - 15} fill="#38bdf8" className="text-[10px] font-bold" style={{ textShadow: '0 0 4px rgba(0,0,0,0.8)' }}>Independent P waves (AV Dissociation)</text>
            <text x="190" y={mid + 35} fill="#fb7185" className="text-[9px] font-bold" style={{ textShadow: '0 0 4px rgba(0,0,0,0.8)' }}>Regular, slow ventricular rate</text>
          </>
        );
      default:
        return (
          <>
            <text x="10" y={mid - 20} fill="#a1a1aa" className="text-[9px]">P wave</text>
            <text x="50" y={mid - 42} fill="#a1a1aa" className="text-[9px]">QRS</text>
            <text x="92" y={mid - 20} fill="#a1a1aa" className="text-[9px]">T wave</text>
            <text x="12" y={mid + 30} fill="#34d399" className="text-[10px] font-bold" style={{ textShadow: '0 0 4px rgba(0,0,0,0.8)' }}>Normal Sinus Rhythm</text>
          </>
        );
    }
  };

  return (
    <div className="relative rounded-xl overflow-hidden border border-white/[0.07] bg-[#0c121e]">
      {/* simulated pink ECG paper grid background */}
      <svg className="w-full h-full block" style={{ height: `${height}px` }} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="ecgGrid" width="6" height="6" patternUnits="userSpaceOnUse">
            <path d="M 6 0 L 0 0 0 6" fill="none" stroke="rgba(244, 63, 94, 0.05)" strokeWidth="0.5" />
          </pattern>
          <pattern id="ecgGridMajor" width="30" height="30" patternUnits="userSpaceOnUse">
            <rect width="30" height="30" fill="url(#ecgGrid)" />
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(244, 63, 94, 0.16)" strokeWidth="0.8" />
          </pattern>
        </defs>
        
        {/* Fill with grid */}
        <rect width="100%" height="100%" fill="url(#ecgGridMajor)" />
        
        {/* Draw waveform path */}
        <path d={path} fill="none" stroke="#22c55e" strokeWidth={size === 'large' ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round" />
        
        {/* Render interactive labels */}
        {renderAnnotations()}
      </svg>
      
      {label && (
        <span className="absolute bottom-2 left-2 text-[9px] font-extrabold tracking-widest text-[#22c55e] uppercase px-1.5 py-0.5 rounded bg-black/60 border border-[#22c55e]/20">
          {label}
        </span>
      )}
    </div>
  );
}

// ─── Formatted Content Component for bold markers ───
function FormattedText({ text, className = '' }: { text: string; className?: string }) {
  if (!text) return null;
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <p className={`text-[13px] leading-relaxed whitespace-pre-line ${className}`}>
      {parts.map((part, idx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={idx} className="font-[700] text-white">{part.slice(2, -2)}</strong>;
        }
        return part;
      })}
    </p>
  );
}

// ─── Main ECG Learning Module Component ───
export default function EcgModule() {
  const { language } = useAppStore();
  const t = translations[language];
  
  // States
  const [diagnoses, setDiagnoses] = useState<ECGDiagnosisRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<ECGDiagnosisRecord | null>(null);
  const [dbSynced, setDbSynced] = useState<boolean>(true);
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    findings: true,
    criteria: false,
    workup: false,
    diff: false,
    pearls: false,
    references: false
  });
  
  const [mounted, setMounted] = useState(false);

  const modalBodyRef = React.useRef<HTMLDivElement>(null);

  const handleDownloadPDF = () => {
    if (!selectedDiagnosis || !modalBodyRef.current) return;
    const title = selectedDiagnosis.title[language];
    const contentHtml = modalBodyRef.current.innerHTML;
    printContentAsPDF(
      title,
      contentHtml,
      `ecg_${title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.pdf`
    );
  };
  
  // Initialize and load from Dexie DB
  useEffect(() => {
    setMounted(true);
    
    async function loadData() {
      try {
        const records = await db.ecgDiagnoses.toArray();
        if (records && records.length > 0) {
          setDiagnoses(records);
          setDbSynced(true);
        } else {
          // Fallback to static loading if not synced yet (for immediate testing/experience)
          const { ECG_DIAGNOSES_DB } = await import('@/lib/ecgData');
          setDiagnoses(ECG_DIAGNOSES_DB);
          setDbSynced(false);
        }
      } catch (err) {
        console.error('Failed to load ECG diagnoses:', err);
        // Fallback
        const { ECG_DIAGNOSES_DB } = await import('@/lib/ecgData');
        setDiagnoses(ECG_DIAGNOSES_DB);
        setDbSynced(false);
      }
    }
    loadData();
    
    return () => setMounted(false);
  }, []);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (selectedDiagnosis) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedDiagnosis]);

  const toggleAccordion = (section: string) => {
    setOpenAccordions(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Filter diagnoses based on Category and Search Query
  const filteredDiagnoses = useMemo(() => {
    return diagnoses.filter(item => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
      
      // Search filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const titleText = (item.title[language] || '').toLowerCase();
        const overviewText = (item.overview[language] || '').toLowerCase();
        const findingsText = (item.ecgPattern.keyFindings[language] || []).join(' ').toLowerCase();
        const leadsText = (item.ecgPattern.leads[language] || '').toLowerCase();
        
        return (
          titleText.includes(query) ||
          overviewText.includes(query) ||
          findingsText.includes(query) ||
          leadsText.includes(query)
        );
      }
      
      return true;
    });
  }, [diagnoses, selectedCategory, searchQuery, language]);

  // Categories helper
  const categories = [
    { id: 'all', label: t.ecg_all_categories },
    { id: 'acs', label: t.ecg_cat_acs },
    { id: 'st-equivalent', label: t.ecg_cat_st_eq },
    { id: 'red-flags', label: t.ecg_cat_red_flags },
    { id: 'arrhythmia', label: t.ecg_cat_arrhythmia }
  ];

  // Helper to color-code card categories
  const getCategoryTheme = (cat: string) => {
    switch (cat) {
      case 'acs':
        return {
          bg: 'rgba(239, 68, 68, 0.1)',
          border: 'rgba(239, 68, 68, 0.2)',
          text: '#ef4444',
          accent: '#f87171'
        };
      case 'st-equivalent':
        return {
          bg: 'rgba(168, 85, 247, 0.1)',
          border: 'rgba(168, 85, 247, 0.2)',
          text: '#a855f7',
          accent: '#c084fc'
        };
      case 'red-flags':
        return {
          bg: 'rgba(245, 158, 11, 0.1)',
          border: 'rgba(245, 158, 11, 0.2)',
          text: '#f59e0b',
          accent: '#fbbf24'
        };
      case 'arrhythmia':
      default:
        return {
          bg: 'rgba(16, 185, 129, 0.1)',
          border: 'rgba(16, 185, 129, 0.2)',
          text: '#10b981',
          accent: '#34d399'
        };
    }
  };

  // Synchronize IndexedDB
  const handleForceSync = async () => {
    try {
      const { ECG_DIAGNOSES_DB } = await import('@/lib/ecgData');
      await db.ecgDiagnoses.bulkPut(ECG_DIAGNOSES_DB as any);
      setDiagnoses(ECG_DIAGNOSES_DB);
      setDbSynced(true);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      {/* ─── Back Arrow & Header ─── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/">
            <button className="p-2 rounded-xl border border-white/[0.06] bg-[#0c121e]/80 hover:bg-white/5 transition-all text-gray-400 hover:text-white shrink-0">
              <ArrowLeft className="w-4 h-4" />
            </button>
          </Link>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-[20px] md:text-[22px] font-[800] tracking-tight gradient-text leading-none">
                {t.ecg_learning_title}
              </h1>
              <span className="badge-offline text-[10px] hidden sm:flex items-center gap-0.5 select-none">
                {t.offline_capable}
              </span>
            </div>
            <p className="text-[12px] md:text-[13px] mt-1" style={{ color: 'var(--text-muted)' }}>
              {t.ecg_learning_desc}
            </p>
          </div>
        </div>
        
        {/* Sync Trigger Warning for testing */}
        {!dbSynced && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-3 p-2 px-3.5 rounded-xl text-[12px] border bg-[#fbbf24]/10 border-[#fbbf24]/20 text-[#fbbf24] shrink-0"
          >
            <span>{language === 'en' ? 'Running from app cache' : 'Berjalan dari memori aplikasi'}</span>
            <button 
              onClick={handleForceSync}
              className="p-1 px-2 rounded-lg bg-[#fbbf24]/20 hover:bg-[#fbbf24]/30 text-white font-bold flex items-center gap-1 transition-all text-[11px]"
            >
              <RefreshCw className="w-3 h-3" />
              <span>{t.sync_now}</span>
            </button>
          </motion.div>
        )}
      </div>

      {/* ─── STEMI vs NSTEMI Comparison Panel ─── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-5 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-blue-500/20 via-purple-500/30 to-red-500/20" />
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-4 h-4 text-sky-400" />
          <h2 className="text-[14px] font-[800] uppercase tracking-wider text-white">
            {t.ecg_comparison_title}
          </h2>
        </div>
        
        {/* Responsive Table */}
        <div className="overflow-x-auto rounded-xl border border-white/[0.06] bg-[#070b13]/60">
          <table className="w-full text-left border-collapse text-[12px]">
            <thead>
              <tr className="border-b border-white/[0.08]" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <th className="p-3 font-extrabold uppercase text-gray-400 border-r border-white/[0.08]">{t.cpg_definition}</th>
                <th className="p-3 font-extrabold text-[#ef4444]">{t.ecg_compare_stemi}</th>
                <th className="p-3 font-extrabold text-[#38bdf8] border-l border-white/[0.08]">{t.ecg_compare_nstemi}</th>
                <th className="p-3 font-extrabold text-[#a855f7] border-l border-white/[0.08]">{t.ecg_compare_steq}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05] text-gray-300">
              <tr>
                <td className="p-3 font-bold border-r border-white/[0.08] bg-white/[0.01]">{t.ecg_compare_ecg_pattern}</td>
                <td className="p-3">{t.ecg_compare_stemi_val}</td>
                <td className="p-3 border-l border-white/[0.08]">{t.ecg_compare_nstemi_val}</td>
                <td className="p-3 border-l border-white/[0.08]">{t.ecg_compare_steq_val}</td>
              </tr>
              <tr>
                <td className="p-3 font-bold border-r border-white/[0.08] bg-white/[0.01]">{t.ecg_compare_patho}</td>
                <td className="p-3 text-red-300 font-semibold">{t.ecg_compare_stemi_patho}</td>
                <td className="p-3 border-l border-white/[0.08]">{t.ecg_compare_nstemi_patho}</td>
                <td className="p-3 border-l border-white/[0.08] text-purple-300 font-semibold">{t.ecg_compare_steq_patho}</td>
              </tr>
              <tr>
                <td className="p-3 font-bold border-r border-white/[0.08] bg-white/[0.01]">{t.ecg_compare_troponin}</td>
                <td className="p-3">{t.ecg_compare_stemi_trop}</td>
                <td className="p-3 border-l border-white/[0.08]">{t.ecg_compare_nstemi_trop}</td>
                <td className="p-3 border-l border-white/[0.08]">{t.ecg_compare_steq_trop}</td>
              </tr>
              <tr>
                <td className="p-3 font-bold border-r border-white/[0.08] bg-white/[0.01]">{t.ecg_compare_therapy}</td>
                <td className="p-3 text-red-400 font-bold">{t.ecg_compare_stemi_tx}</td>
                <td className="p-3 border-l border-white/[0.08]">{t.ecg_compare_nstemi_tx}</td>
                <td className="p-3 border-l border-white/[0.08] text-purple-400 font-bold">{t.ecg_compare_steq_tx}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* ─── 12-Lead ECG Simulator CTA ─── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Link href="/ecg/simulator">
          <div className="glass-card p-5 border border-emerald-500/20 hover:border-emerald-500/40 bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 cursor-pointer transition-all hover:scale-[1.01] group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-emerald-500 to-cyan-500" />
            <div className="flex items-center justify-between pl-2">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 group-hover:scale-105 transition-transform">
                  <Monitor className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-white font-extrabold text-[14px] flex items-center gap-2">
                    {t.ecg_sim_title}
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
                      {language === 'en' ? 'New Mode' : 'Mode Baru'}
                    </span>
                  </h3>
                  <p className="text-gray-400 text-[11.5px] mt-0.5 leading-relaxed">
                    {t.ecg_sim_desc}
                  </p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/[0.04] group-hover:bg-emerald-500/10 flex items-center justify-center text-gray-400 group-hover:text-emerald-400 transition-all">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>
        </Link>
      </motion.div>

      {/* ─── Search and Filters Row ─── */}
      <div className="flex flex-col gap-4">
        {/* Search bar */}
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder={t.ecg_search_placeholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 text-[13px] rounded-xl border border-white/[0.06] bg-[#0c121e]/80 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 focus:bg-[#0c121e] transition-all"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar select-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-[11px] font-[700] whitespace-nowrap transition-all border shrink-0`}
              style={selectedCategory === cat.id ? {
                background: 'rgba(59,130,246,0.15)',
                color: '#93c5fd',
                borderColor: 'rgba(59,130,246,0.25)',
                boxShadow: '0 0 12px rgba(59,130,246,0.1)',
              } : {
                background: 'rgba(255,255,255,0.02)',
                color: 'var(--text-secondary)',
                borderColor: 'var(--border-card)',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* ─── Diagnosis Card Grid ─── */}
      {filteredDiagnoses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDiagnoses.map((diag) => {
            const theme = getCategoryTheme(diag.category);
            return (
              <motion.div
                key={diag.id}
                layoutId={`card-container-${diag.id}`}
                className="glass-card flex flex-col hover:border-white/10 transition-all group overflow-hidden"
              >
                {/* SVG strip on top */}
                <div className="p-3 bg-[#070b13]/40 border-b border-white/[0.04]">
                  <ECGWaveform type={diag.ecgPattern.waveformType} label={diag.ecgPattern.waveformType} />
                </div>
                
                {/* Information */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Category tag */}
                    <span 
                      className="px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wide inline-block mb-2.5 border"
                      style={{ backgroundColor: theme.bg, color: theme.text, borderColor: theme.border }}
                    >
                      {diag.category === 'acs' ? t.ecg_cat_acs : diag.category === 'st-equivalent' ? t.ecg_cat_st_eq : diag.category === 'red-flags' ? t.ecg_cat_red_flags : t.ecg_cat_arrhythmia}
                    </span>
                    
                    {/* Title */}
                    <h3 className="text-[14px] font-[800] leading-snug text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {diag.title[language]}
                    </h3>
                    
                    {/* Overview */}
                    <p className="text-[12px] leading-relaxed text-gray-400 line-clamp-3 mb-4">
                      {diag.overview[language]}
                    </p>
                  </div>
                  
                  {/* Footer leads + button */}
                  <div className="border-t border-white/[0.04] pt-3 mt-2 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[9px] uppercase tracking-wider text-gray-500 font-bold">{t.ecg_leads}</span>
                      <span className="text-[11px] text-gray-300 font-semibold max-w-[130px] truncate" title={diag.ecgPattern.leads[language]}>
                        {diag.ecgPattern.leads[language]}
                      </span>
                    </div>
                    
                    <button 
                      onClick={() => setSelectedDiagnosis(diag)}
                      className="p-2 px-3.5 rounded-lg text-[11px] font-extrabold bg-blue-500/10 hover:bg-blue-500/20 text-[#60a5fa] border border-blue-500/20 hover:border-blue-500/40 transition-all select-none"
                    >
                      {language === 'en' ? 'Study Pattern' : 'Pelajari Pola'}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 glass-card p-6 flex flex-col items-center">
          <Info className="w-8 h-8 text-gray-600 mb-3" />
          <h3 className="text-[14px] font-bold text-white mb-1">
            {language === 'en' ? 'No patterns found' : 'Tidak ada pola ditemukan'}
          </h3>
          <p className="text-[12px] text-gray-500">
            {language === 'en' ? 'Try adjusting your search criteria.' : 'Coba ubah kriteria pencarian Anda.'}
          </p>
        </div>
      )}

      {/* ─── Premium Detail Modal (via Portal) ─── */}
      {mounted && typeof window !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedDiagnosis && (
            <div className="fixed inset-0 z-[100] flex justify-center items-start overflow-y-auto p-4 md:p-6 bg-black/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.97, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: 15 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="glass-card-static w-full max-w-4xl rounded-2xl overflow-hidden my-auto shadow-2xl border border-white/10 flex flex-col relative"
              >
                {/* Top accent bar */}
                <div 
                  className="h-1.5 w-full shrink-0" 
                  style={{ background: getCategoryTheme(selectedDiagnosis.category).text }} 
                />
                
                {/* Modal Header */}
                <div className="p-5 border-b border-white/[0.06] flex items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span 
                        className="px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wide inline-block border"
                        style={{ 
                          backgroundColor: getCategoryTheme(selectedDiagnosis.category).bg, 
                          color: getCategoryTheme(selectedDiagnosis.category).text, 
                          borderColor: getCategoryTheme(selectedDiagnosis.category).border 
                        }}
                      >
                        {selectedDiagnosis.category === 'acs' ? t.ecg_cat_acs : selectedDiagnosis.category === 'st-equivalent' ? t.ecg_cat_st_eq : selectedDiagnosis.category === 'red-flags' ? t.ecg_cat_red_flags : t.ecg_cat_arrhythmia}
                      </span>
                      <span className="badge-offline text-[9px] flex items-center gap-0.5">
                        {t.ecg_leads}: {selectedDiagnosis.ecgPattern.leads[language]}
                      </span>
                    </div>
                    <h2 className="text-[18px] md:text-[20px] font-[850] text-white leading-tight">
                      {selectedDiagnosis.title[language]}
                    </h2>
                  </div>
                  <button 
                    onClick={() => setSelectedDiagnosis(null)}
                    className="p-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] hover:bg-white/5 transition-all text-gray-400 hover:text-white shrink-0 text-[12px] font-extrabold px-3"
                  >
                    {language === 'en' ? 'Close' : 'Tutup'}
                  </button>
                </div>

                {/* Modal Body */}
                <div ref={modalBodyRef} className="p-5 overflow-y-auto space-y-6 max-h-[60vh] md:max-h-[70vh] no-scrollbar">
                  
                  {/* Two-Column Top: Overview & Large SVG */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                    <div className="lg:col-span-5 space-y-4">
                      {/* Description Card */}
                      <div className="p-4 rounded-xl border border-white/[0.05] bg-white/[0.01]">
                        <h4 className="text-[11px] uppercase tracking-wider text-gray-500 font-extrabold mb-2 flex items-center gap-1.5">
                          <Info className="w-3.5 h-3.5 text-blue-400" />
                          {t.cpg_definition}
                        </h4>
                        <p className="text-[13px] leading-relaxed text-gray-300">
                          {selectedDiagnosis.overview[language]}
                        </p>
                      </div>

                      {/* Clinical Pearls Alert Card */}
                      <div className="p-4 rounded-xl border border-[#fbbf24]/20 bg-[#fbbf24]/5">
                        <h4 className="text-[11px] uppercase tracking-wider text-[#fbbf24] font-extrabold mb-2 flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          {t.ecg_clinical_pearls}
                        </h4>
                        <FormattedText text={selectedDiagnosis.pearls[language]} className="text-[#fbbf24]/90" />
                      </div>
                    </div>

                    <div className="lg:col-span-7 space-y-4">
                      {/* Simulated ECG Paper Large Waveform */}
                      <div className="p-4 rounded-xl border border-white/[0.05] bg-[#070b13]/80">
                        <h4 className="text-[11px] uppercase tracking-wider text-gray-500 font-extrabold mb-3 flex items-center gap-1.5">
                          <Activity className="w-3.5 h-3.5 text-[#22c55e]" />
                          {language === 'en' ? 'Accurate Waveform Visualization' : 'Visualisasi Pola Gelombang Akurat'}
                        </h4>
                        <ECGWaveform type={selectedDiagnosis.ecgPattern.waveformType} size="large" />
                        <div className="mt-3 p-2.5 rounded-lg bg-black/40 border border-white/[0.04] text-[11px] text-gray-400 leading-relaxed">
                          {language === 'en' 
                            ? '*Hover over the active peaks on the grid above to observe the diagnostic segment changes.' 
                            : '*Arahkan kursor ke puncak aktif pada grafik di atas untuk melihat perubahan segmen diagnostik.'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Grid of Accordion Cards for diagnostics */}
                  <div className="space-y-3">
                    {/* 1. Key Findings & Leads */}
                    <div className="rounded-xl border border-white/[0.05] bg-[#0c121e]/80 overflow-hidden">
                      <button 
                        onClick={() => toggleAccordion('findings')}
                        className="w-full p-4 flex items-center justify-between text-left font-bold text-white hover:bg-white/[0.01] transition-colors"
                      >
                        <span className="text-[13px] font-extrabold flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          {t.ecg_key_findings}
                        </span>
                        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${openAccordions.findings ? 'rotate-180' : ''}`} />
                      </button>
                      {openAccordions.findings && (
                        <div className="p-4 pt-0 border-t border-white/[0.03] space-y-2 bg-black/10">
                          <div className="text-[12px] font-bold text-gray-400 mb-2">
                            {t.ecg_leads}: <span className="text-white">{selectedDiagnosis.ecgPattern.leads[language]}</span>
                          </div>
                          <ul className="space-y-2 pl-2">
                            {(selectedDiagnosis.ecgPattern.keyFindings[language] || []).map((finding, idx) => (
                              <li key={idx} className="text-[12.5px] leading-relaxed text-gray-300 flex items-start gap-2">
                                <span className="text-emerald-500 shrink-0 mt-1.5 font-extrabold text-[10px]">■</span>
                                <span>{finding}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* 2. Diagnostic Criteria */}
                    <div className="rounded-xl border border-white/[0.05] bg-[#0c121e]/80 overflow-hidden">
                      <button 
                        onClick={() => toggleAccordion('criteria')}
                        className="w-full p-4 flex items-center justify-between text-left font-bold text-white hover:bg-white/[0.01] transition-colors"
                      >
                        <span className="text-[13px] font-extrabold flex items-center gap-2">
                          <Stethoscope className="w-4 h-4 text-sky-400 shrink-0" />
                          {t.ecg_diagnosis_criteria}
                        </span>
                        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${openAccordions.criteria ? 'rotate-180' : ''}`} />
                      </button>
                      {openAccordions.criteria && (
                        <div className="p-4 pt-0 border-t border-white/[0.03] bg-black/10">
                          <FormattedText text={selectedDiagnosis.diagnosticCriteria[language]} className="text-gray-300" />
                        </div>
                      )}
                    </div>

                    {/* 3. Supporting Diagnostics */}
                    <div className="rounded-xl border border-white/[0.05] bg-[#0c121e]/80 overflow-hidden">
                      <button 
                        onClick={() => toggleAccordion('workup')}
                        className="w-full p-4 flex items-center justify-between text-left font-bold text-white hover:bg-white/[0.01] transition-colors"
                      >
                        <span className="text-[13px] font-extrabold flex items-center gap-2">
                          <BriefcaseMedical className="w-4 h-4 text-[#fb7185] shrink-0" />
                          {t.ecg_supporting_workup}
                        </span>
                        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${openAccordions.workup ? 'rotate-180' : ''}`} />
                      </button>
                      {openAccordions.workup && (
                        <div className="p-4 pt-0 border-t border-white/[0.03] bg-black/10">
                          <FormattedText text={selectedDiagnosis.supportingDiagnostics[language]} className="text-gray-300" />
                        </div>
                      )}
                    </div>

                    {/* 4. Differential Diagnosis */}
                    <div className="rounded-xl border border-white/[0.05] bg-[#0c121e]/80 overflow-hidden">
                      <button 
                        onClick={() => toggleAccordion('diff')}
                        className="w-full p-4 flex items-center justify-between text-left font-bold text-white hover:bg-white/[0.01] transition-colors"
                      >
                        <span className="text-[13px] font-extrabold flex items-center gap-2">
                          <HelpCircle className="w-4 h-4 text-[#fbbf24] shrink-0" />
                          {t.cpg_diff_diagnosis}
                        </span>
                        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${openAccordions.diff ? 'rotate-180' : ''}`} />
                      </button>
                      {openAccordions.diff && (
                        <div className="p-4 pt-0 border-t border-white/[0.03] bg-black/10">
                          <FormattedText text={selectedDiagnosis.differentialDiagnosis[language]} className="text-gray-300" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ─── Treatment Section (2x2 Grid) ─── */}
                  <div className="p-5 rounded-xl border border-white/[0.06] bg-[#070b13]/70 space-y-4">
                    <div className="flex items-center gap-2 mb-1">
                      <BriefcaseMedical className="w-4 h-4 text-[#10b981]" />
                      <h3 className="text-[14px] font-[850] uppercase tracking-wider text-white">
                        {t.ecg_treatment}
                      </h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* ED Initial Care */}
                      <div className="p-4 rounded-xl border border-emerald-500/10 bg-emerald-500/[0.01] hover:bg-emerald-500/[0.02] transition-colors">
                        <h4 className="text-[12px] font-extrabold text-[#34d399] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {t.ecg_treatment_initial}
                        </h4>
                        <FormattedText text={selectedDiagnosis.treatment.initial[language]} className="text-gray-300" />
                      </div>

                      {/* Definitive Treatment */}
                      <div className="p-4 rounded-xl border border-blue-500/10 bg-blue-500/[0.01] hover:bg-blue-500/[0.02] transition-colors">
                        <h4 className="text-[12px] font-extrabold text-[#60a5fa] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {t.ecg_treatment_definitive}
                        </h4>
                        <FormattedText text={selectedDiagnosis.treatment.definitive[language]} className="text-gray-300" />
                      </div>

                      {/* Contraindications / Cautions */}
                      <div className="p-4 rounded-xl border border-rose-500/10 bg-rose-500/[0.01] hover:bg-rose-500/[0.02] transition-colors">
                        <h4 className="text-[12px] font-extrabold text-[#fb7185] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <AlertOctagon className="w-3.5 h-3.5" />
                          {t.ecg_treatment_caution}
                        </h4>
                        <FormattedText text={selectedDiagnosis.treatment.caution[language]} className="text-gray-300" />
                      </div>

                      {/* Referral & Timing */}
                      <div className="p-4 rounded-xl border border-purple-500/10 bg-purple-500/[0.01] hover:bg-purple-500/[0.02] transition-colors">
                        <h4 className="text-[12px] font-extrabold text-[#c084fc] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <ExternalLink className="w-3.5 h-3.5" />
                          {t.ecg_treatment_referral}
                        </h4>
                        <FormattedText text={selectedDiagnosis.treatment.referral[language]} className="text-gray-300" />
                      </div>
                    </div>
                  </div>

                  {/* 5. References Section */}
                  <div className="rounded-xl border border-white/[0.05] bg-[#0c121e]/80 overflow-hidden">
                    <button 
                      onClick={() => toggleAccordion('references')}
                      className="w-full p-4 flex items-center justify-between text-left font-bold text-white hover:bg-white/[0.01] transition-colors"
                    >
                      <span className="text-[13px] font-extrabold flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-indigo-400 shrink-0" />
                        {t.ecg_references}
                      </span>
                      <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${openAccordions.references ? 'rotate-180' : ''}`} />
                    </button>
                    {openAccordions.references && (
                      <div className="p-4 pt-0 border-t border-white/[0.03] bg-black/10">
                        <FormattedText text={selectedDiagnosis.references[language]} className="text-gray-400 font-mono text-[11.5px]" />
                      </div>
                    )}
                  </div>

                </div>

                {/* Modal Footer */}
                <div className="p-4 bg-[#070b13]/80 border-t border-white/[0.06] flex items-center justify-between shrink-0">
                  <span className="text-[11px] text-gray-500">
                    {t.disclaimer}
                  </span>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={handleDownloadPDF}
                      className="btn-primary py-2 px-5 text-[12px] font-extrabold select-none flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-white" />
                      <span>{t.download_pdf}</span>
                    </button>
                    <button 
                      onClick={() => setSelectedDiagnosis(null)}
                      className="btn-primary py-2 px-5 text-[12px] font-extrabold select-none cursor-pointer"
                    >
                      {language === 'en' ? 'Understood' : 'Dimengerti'}
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
