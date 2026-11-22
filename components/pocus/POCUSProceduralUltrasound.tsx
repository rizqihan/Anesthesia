'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  POCUSCase, 
  AcousticLandmark, 
  ProbeType 
} from '@/lib/pocusData';
import { 
  Camera, 
  Snowflake, 
  Play, 
  Pause, 
  Sliders, 
  Ruler, 
  Layers, 
  Eye, 
  Maximize2, 
  Upload, 
  RotateCcw, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle,
  Info,
  Palette,
  Compass
} from 'lucide-react';
import { CustomPOCUSScan, getCustomScan, saveCustomScan, deleteCustomScan } from '@/lib/pocusCustomScans';

interface POCUSProceduralUltrasoundProps {
  caseData: POCUSCase;
  isPathology: boolean;
  compressionPct?: number; // 0 - 100 for vascular views
  showLandmarks?: boolean;
  activeLandmark?: AcousticLandmark | null;
  onSelectLandmark?: (landmark: AcousticLandmark) => void;
  onOpenFullscreen?: () => void;
}

export type UltrasoundColormap = 'grayscale' | 'amber' | 'ice';

export default function POCUSProceduralUltrasound({
  caseData,
  isPathology,
  compressionPct = 0,
  showLandmarks = false,
  activeLandmark,
  onSelectLandmark,
  onOpenFullscreen
}: POCUSProceduralUltrasoundProps) {
  // Machine Controls State
  const [isFrozen, setIsFrozen] = useState(false);
  const [gainDb, setGainDb] = useState(60); // 40dB - 80dB (default 60dB)
  const [nearGain, setNearGain] = useState(0); // -10 to +10 dB
  const [farGain, setFarGain] = useState(0); // -10 to +10 dB
  const [colormap, setColormap] = useState<UltrasoundColormap>('grayscale');
  const [sriEnabled, setSriEnabled] = useState(true); // Speckle reduction filter
  const [colorDoppler, setColorDoppler] = useState(false); // CFM overlay
  const [showAnatomicalGuide, setShowAnatomicalGuide] = useState(false);
  const [calipersActive, setCalipersActive] = useState(false);
  const [caliperPts, setCaliperPts] = useState<{ x: number; y: number }[]>([]);
  const [measuredDistMm, setMeasuredDistMm] = useState<number | null>(null);

  // Custom User Clinical Scan State
  const [customScan, setCustomScan] = useState<CustomPOCUSScan | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Canvas Refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animRef = useRef<number | null>(null);
  const timeRef = useRef<number>(0);
  const lastFrameTimeRef = useRef<number>(Date.now());

  // Check for custom user-uploaded scan in IndexedDB
  useEffect(() => {
    let active = true;
    getCustomScan(caseData.id, isPathology).then((scan) => {
      if (active) setCustomScan(scan);
    });
    return () => {
      active = false;
    };
  }, [caseData.id, isPathology]);

  // Handle User Scan Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (evt) => {
      const dataUrl = evt.target?.result as string;
      if (dataUrl) {
        await saveCustomScan(
          caseData.id,
          isPathology,
          dataUrl,
          `Clinical ${caseData.title} (${isPathology ? 'Pathology' : 'Normal'})`
        );
        const updated = await getCustomScan(caseData.id, isPathology);
        setCustomScan(updated);
        setIsUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRevertToSimulation = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Revert to high-fidelity procedural simulation?')) {
      await deleteCustomScan(caseData.id, isPathology);
      setCustomScan(null);
    }
  };

  // Convert depth in cm based on probe
  const depthScaleCm = caseData.probeType === 'Linear' ? 5 : caseData.probeType === 'Phased Array' ? 18 : 16;

  // Calipers Click
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!calipersActive || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (caliperPts.length >= 2) {
      setCaliperPts([{ x, y }]);
      setMeasuredDistMm(null);
    } else {
      const next = [...caliperPts, { x, y }];
      setCaliperPts(next);
      if (next.length === 2) {
        // Calculate distance based on canvas height and depthScaleCm
        const dx = next[1].x - next[0].x;
        const dy = next[1].y - next[0].y;
        const pixelDist = Math.hypot(dx, dy);
        const mmPerPixel = (depthScaleCm * 10) / rect.height;
        const distMm = Math.round(pixelDist * mmPerPixel * 10) / 10;
        setMeasuredDistMm(distMm);
      }
    }
  };

  // ─────────────────────────────────────────────────────────────
  // Procedural B-Mode Canvas Rendering Engine
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    // If a custom real clinical photo was uploaded, we don't need procedural canvas loop
    if (customScan) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isRunning = true;

    // Colormap tint tables
    const getColor = (intensity: number, alpha: number = 1): string => {
      const val = Math.min(255, Math.max(0, Math.round(intensity)));
      if (colormap === 'amber') {
        // Sepia / Amber high contrast
        const r = Math.min(255, Math.round(val * 1.15));
        const g = Math.round(val * 0.85);
        const b = Math.round(val * 0.45);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
      } else if (colormap === 'ice') {
        // Cool blue / ice vascular map
        const r = Math.round(val * 0.7);
        const g = Math.round(val * 0.95);
        const b = Math.min(255, Math.round(val * 1.2));
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
      }
      // Standard grayscale
      return `rgba(${val}, ${val}, ${val}, ${alpha})`;
    };

    const render = () => {
      if (!isRunning) return;

      const now = Date.now();
      const dt = (now - lastFrameTimeRef.current) / 1000;
      lastFrameTimeRef.current = now;

      if (!isFrozen) {
        timeRef.current += dt;
      }

      const t = timeRef.current;
      const width = canvas.width;
      const height = canvas.height;

      // 1. Clear background to dark ultrasound chassis black
      ctx.fillStyle = '#010409';
      ctx.fillRect(0, 0, width, height);

      // Gain multiplier (normalized around 60dB)
      const gainMult = Math.pow(10, (gainDb - 60) / 25);

      // Dynamic cycles
      const cardiacFreq = 1.15; // ~69 bpm
      const cardiacCycle = (t * cardiacFreq) % 1; // 0 to 1
      const heartBeat = Math.sin(t * cardiacFreq * Math.PI * 2);
      const systoleContract = Math.max(0, Math.sin(t * cardiacFreq * Math.PI * 2));

      const respFreq = 0.28; // ~17 breaths/min
      const respCycle = Math.sin(t * respFreq * Math.PI * 2);
      const respInspiratory = Math.max(0, Math.sin(t * respFreq * Math.PI * 2));

      // 2. Setup Transducer Beam Geometry & Clipping Mask
      ctx.save();

      const probeType = caseData.probeType;
      const originX = width / 2;
      const originY = probeType === 'Curvilinear' ? -40 : probeType === 'Phased Array' ? 10 : 25;

      ctx.beginPath();
      if (probeType === 'Linear') {
        // Rectangular scanhead (40mm linear array)
        const marginX = 50;
        const scanWidth = width - marginX * 2;
        const scanHeight = height - 55;
        ctx.rect(marginX, originY, scanWidth, scanHeight);
      } else if (probeType === 'Phased Array') {
        // 80-degree sector cone originating from narrow phased point
        const apexAngle = 0.72; // ~82 degrees
        const maxRadius = height + 30;
        ctx.moveTo(originX, originY);
        ctx.arc(originX, originY, maxRadius, Math.PI / 2 - apexAngle, Math.PI / 2 + apexAngle);
        ctx.closePath();
      } else {
        // Curvilinear 60-degree sector
        const apexAngle = 0.58; // ~66 degrees
        const minRadius = 60;
        const maxRadius = height + 10;
        ctx.arc(originX, originY, maxRadius, Math.PI / 2 - apexAngle, Math.PI / 2 + apexAngle, false);
        ctx.arc(originX, originY, minRadius, Math.PI / 2 + apexAngle, Math.PI / 2 - apexAngle, true);
        ctx.closePath();
      }

      ctx.clip();

      // Scan area fill with base acoustic dark field
      ctx.fillStyle = '#030712';
      ctx.fill();

      // Depth attenuation & TGC gradient
      const depthGrad = ctx.createLinearGradient(0, 0, 0, height);
      const nearFactor = Math.max(0.1, 1 + nearGain / 15);
      const farFactor = Math.max(0.1, 1 + farGain / 15);
      depthGrad.addColorStop(0, `rgba(255, 255, 255, ${0.12 * nearFactor * gainMult})`);
      depthGrad.addColorStop(0.5, `rgba(255, 255, 255, ${0.06 * gainMult})`);
      depthGrad.addColorStop(1, `rgba(0, 0, 0, ${0.65 / farFactor})`);
      ctx.fillStyle = depthGrad;
      ctx.fillRect(0, 0, width, height);

      // ─────────────────────────────────────────────────────────
      // 3. Procedural Acoustic Speckle Noise Layer
      // ─────────────────────────────────────────────────────────
      // We generate randomized acoustic speckle particles that move with tissue
      const speckleCount = sriEnabled ? 350 : 650;
      const speckleSeed = Math.floor(t * 18); // animated sparkle
      ctx.fillStyle = getColor(45 * gainMult, sriEnabled ? 0.35 : 0.6);

      for (let i = 0; i < speckleCount; i++) {
        // Pseudo-random deterministic placement
        const px = ((Math.sin(i * 12.9898 + speckleSeed) * 43758.5453) % 1 + 1) * 0.5 * width;
        const py = ((Math.cos(i * 78.233 + speckleSeed) * 43758.5453) % 1 + 1) * 0.5 * height;
        const psize = (i % 3 === 0) ? 1.5 : 1;
        ctx.fillRect(px, py, psize, psize);
      }

      // ─────────────────────────────────────────────────────────
      // 4. Case-Specific Anatomical USG Physics Rendering
      // ─────────────────────────────────────────────────────────
      const caseId = caseData.id;

      // === eFAST RUQ (Morison's Pouch) ===
      if (caseId === 'efast-ruq') {
        const respShift = respCycle * 6;

        // Diaphragm (brilliant hyperechoic curve)
        ctx.strokeStyle = getColor(220 * gainMult);
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(80, 75 + respShift);
        ctx.quadraticCurveTo(width / 2, 50 + respShift, width - 80, 100 + respShift);
        ctx.stroke();

        // Liver parenchyma (isoechoic textured mid-gray)
        ctx.fillStyle = getColor(75 * gainMult, 0.7);
        ctx.beginPath();
        ctx.moveTo(90, 85 + respShift);
        ctx.quadraticCurveTo(width / 2 + 20, 65 + respShift, width - 110, 120 + respShift);
        ctx.quadraticCurveTo(width - 120, 230 + respShift, width / 2, 210 + respShift);
        ctx.quadraticCurveTo(110, 200 + respShift, 90, 85 + respShift);
        ctx.fill();

        // Hepatic veins (anechoic tubular branching)
        ctx.strokeStyle = getColor(10, 0.9);
        ctx.lineWidth = 9;
        ctx.beginPath();
        ctx.moveTo(width / 2 - 40, 120 + respShift);
        ctx.quadraticCurveTo(width / 2, 140 + respShift, width / 2 + 50, 130 + respShift);
        ctx.stroke();

        // Right Kidney (cortex hypoechoic, bright central sinus)
        ctx.save();
        ctx.translate(width / 2 + 60, 230 + respShift);
        ctx.rotate(-0.25);
        // Renal cortex
        ctx.fillStyle = getColor(45 * gainMult, 0.85);
        ctx.strokeStyle = getColor(190 * gainMult, 0.8);
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.ellipse(0, 0, 75, 48, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        // Central renal sinus (hyperechoic central fatty echoes)
        ctx.fillStyle = getColor(165 * gainMult, 0.85);
        ctx.beginPath();
        ctx.ellipse(5, 0, 36, 18, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Morison's Pouch (Hepatorenal interface)
        if (isPathology) {
          // Free fluid: jet-black anechoic stripe with acoustic enhancement underneath
          ctx.fillStyle = getColor(5, 0.98); // pure anechoic black
          ctx.strokeStyle = getColor(240 * gainMult, 0.5); // edge reflection
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(width / 2 - 30, 185 + respShift);
          ctx.quadraticCurveTo(width / 2 + 40, 175 + respShift, width / 2 + 130, 205 + respShift);
          ctx.quadraticCurveTo(width / 2 + 60, 220 + respShift, width / 2 - 20, 205 + respShift);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          // Posterior acoustic enhancement behind fluid pocket
          const enhanceGrad = ctx.createRadialGradient(width / 2 + 50, 250, 10, width / 2 + 50, 250, 90);
          enhanceGrad.addColorStop(0, getColor(130 * gainMult, 0.25));
          enhanceGrad.addColorStop(1, 'transparent');
          ctx.fillStyle = enhanceGrad;
          ctx.fillRect(width / 2 - 40, 215, 180, 90);
        } else {
          // Normal: crisp hyperechoic interface line (no fluid separation)
          ctx.strokeStyle = getColor(235 * gainMult, 0.95);
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(width / 2 - 25, 190 + respShift);
          ctx.quadraticCurveTo(width / 2 + 45, 180 + respShift, width / 2 + 125, 208 + respShift);
          ctx.stroke();
        }
      }

      // === eFAST LUQ (Splenorenal Window) ===
      else if (caseId === 'efast-luq') {
        const respShift = respCycle * 5;

        // Left Diaphragm
        ctx.strokeStyle = getColor(220 * gainMult);
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(80, 75 + respShift);
        ctx.quadraticCurveTo(width / 2, 50 + respShift, width - 80, 95 + respShift);
        ctx.stroke();

        // Spleen parenchyma (fine homogenous speckle)
        ctx.fillStyle = getColor(80 * gainMult, 0.7);
        ctx.beginPath();
        ctx.moveTo(95, 85 + respShift);
        ctx.quadraticCurveTo(width / 2, 65 + respShift, width - 110, 115 + respShift);
        ctx.quadraticCurveTo(width - 130, 220 + respShift, width / 2 - 20, 200 + respShift);
        ctx.quadraticCurveTo(100, 190 + respShift, 95, 85 + respShift);
        ctx.fill();

        // Left Kidney
        ctx.save();
        ctx.translate(width / 2 + 50, 235 + respShift);
        ctx.rotate(0.2);
        ctx.fillStyle = getColor(42 * gainMult, 0.85);
        ctx.strokeStyle = getColor(185 * gainMult, 0.8);
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.ellipse(0, 0, 70, 44, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        // Renal sinus
        ctx.fillStyle = getColor(160 * gainMult, 0.85);
        ctx.beginPath();
        ctx.ellipse(-5, 0, 32, 16, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Splenorenal interface & Subdiaphragmatic space
        if (isPathology) {
          // Subdiaphragmatic fluid cap
          ctx.fillStyle = getColor(5, 0.98);
          ctx.beginPath();
          ctx.moveTo(110, 80 + respShift);
          ctx.quadraticCurveTo(width / 2 - 10, 60 + respShift, width / 2 + 90, 88 + respShift);
          ctx.quadraticCurveTo(width / 2 - 20, 80 + respShift, 120, 95 + respShift);
          ctx.closePath();
          ctx.fill();

          // Splenorenal free fluid stripe
          ctx.beginPath();
          ctx.moveTo(width / 2 - 20, 185 + respShift);
          ctx.quadraticCurveTo(width / 2 + 40, 175 + respShift, width / 2 + 115, 200 + respShift);
          ctx.quadraticCurveTo(width / 2 + 45, 215 + respShift, width / 2 - 10, 200 + respShift);
          ctx.closePath();
          ctx.fill();
        } else {
          // Normal bright splenorenal capsule
          ctx.strokeStyle = getColor(230 * gainMult, 0.95);
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(width / 2 - 15, 188 + respShift);
          ctx.quadraticCurveTo(width / 2 + 40, 180 + respShift, width / 2 + 110, 204 + respShift);
          ctx.stroke();
        }
      }

      // === eFAST Pelvis (Suprapubic Transverse / Longitudinal) ===
      else if (caseId === 'efast-pelvis') {
        // Bladder (transverse acoustic window: trapezoidal anechoic fluid)
        ctx.fillStyle = getColor(5, 0.98);
        ctx.strokeStyle = getColor(220 * gainMult, 0.9);
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(width / 2 - 110, 110);
        ctx.quadraticCurveTo(width / 2, 90, width / 2 + 110, 110);
        ctx.quadraticCurveTo(width / 2 + 125, 210, width / 2 + 65, 240);
        ctx.quadraticCurveTo(width / 2, 250, width / 2 - 65, 240);
        ctx.quadraticCurveTo(width / 2 - 125, 210, width / 2 - 110, 110);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Posterior acoustic enhancement below bladder
        const enhGrad = ctx.createLinearGradient(0, 240, 0, height);
        enhGrad.addColorStop(0, getColor(120 * gainMult, 0.35));
        enhGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = enhGrad;
        ctx.fillRect(width / 2 - 90, 240, 180, 80);

        if (isPathology) {
          // Free fluid pooling in rectovesical pouch / pouch of Douglas (posterior to bladder)
          ctx.fillStyle = getColor(5, 0.98);
          ctx.strokeStyle = getColor(230 * gainMult, 0.6);
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(width / 2 - 75, 255);
          ctx.quadraticCurveTo(width / 2, 268, width / 2 + 75, 255);
          ctx.quadraticCurveTo(width / 2 + 90, 295, width / 2, 305);
          ctx.quadraticCurveTo(width / 2 - 90, 295, width / 2 - 75, 255);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        }
      }

      // === Lung Windows: BLUE A-lines, B-lines, Sliding, Lung Point, Pneumothorax ===
      else if (caseId.startsWith('blue-') || caseId === 'efast-lung-ant') {
        const pleuralY = 100;
        const ribWidth = 65;
        const ribY = 65;

        // Rib 1 & Rib 2 (Cortex + Dense Posterior Acoustic Shadows)
        // Rib 1 (Left)
        ctx.fillStyle = getColor(210 * gainMult, 0.9);
        ctx.beginPath();
        ctx.ellipse(90, ribY, ribWidth / 2, 18, 0, 0, Math.PI);
        ctx.fill();
        // Rib 1 acoustic shadow (dense jet-black column down to bottom)
        ctx.fillStyle = '#010307';
        ctx.fillRect(90 - ribWidth / 2, ribY, ribWidth, height - ribY);

        // Rib 2 (Right)
        ctx.fillStyle = getColor(210 * gainMult, 0.9);
        ctx.beginPath();
        ctx.ellipse(width - 90, ribY, ribWidth / 2, 18, 0, 0, Math.PI);
        ctx.fill();
        // Rib 2 acoustic shadow
        ctx.fillStyle = '#010307';
        ctx.fillRect(width - 90 - ribWidth / 2, ribY, ribWidth, height - ribY);

        // Intercostal muscle tissue
        ctx.fillStyle = getColor(55 * gainMult, 0.6);
        ctx.fillRect(135, 45, width - 270, pleuralY - 45);

        // Pleural Line (between the two rib acoustic shadows)
        const pleuraLeft = 125;
        const pleuraRight = width - 125;

        // Sliding shimmer simulation (high-frequency sparkling along pleura)
        const hasSliding = (!isPathology && caseId !== 'blue-lung-point') || 
                           (isPathology && caseId === 'blue-b-lines') || 
                           (isPathology && caseId === 'blue-effusion') || 
                           (isPathology && caseId === 'blue-consolidation');

        const pleuraShimmer = hasSliding ? (Math.sin(t * 35) * 1.5) : 0;
        const respLungShift = hasSliding ? (respCycle * 8) : 0;

        ctx.strokeStyle = getColor(245 * gainMult);
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.moveTo(pleuraLeft, pleuralY);
        ctx.lineTo(pleuraRight, pleuralY);
        ctx.stroke();

        // Shimmering micro-speckles on visceral pleura
        if (hasSliding) {
          ctx.fillStyle = getColor(255 * gainMult, 0.85);
          for (let s = pleuraLeft + 10; s < pleuraRight - 10; s += 14) {
            const sx = s + pleuraShimmer + (Math.sin(s + t * 20) * 4);
            ctx.fillRect(sx, pleuralY - 1, 3, 2);
          }
        }

        // Sub-pleural Artifacts:
        if (caseId === 'blue-b-lines' && isPathology) {
          // B-lines (Comet Tails): Vertical hyperechoic laser-like rays arising from pleura, extending to bottom
          const beamCount = 5;
          for (let b = 0; b < beamCount; b++) {
            const bx = pleuraLeft + 35 + b * ((pleuraRight - pleuraLeft - 70) / (beamCount - 1)) + respLungShift;
            const bGrad = ctx.createLinearGradient(bx, pleuralY, bx, height);
            bGrad.addColorStop(0, getColor(240 * gainMult, 0.95));
            bGrad.addColorStop(0.4, getColor(210 * gainMult, 0.8));
            bGrad.addColorStop(1, getColor(170 * gainMult, 0.6));
            ctx.fillStyle = bGrad;
            ctx.beginPath();
            ctx.moveTo(bx - 3, pleuralY);
            ctx.lineTo(bx + 3, pleuralY);
            ctx.lineTo(bx + 18, height);
            ctx.lineTo(bx - 18, height);
            ctx.closePath();
            ctx.fill();
          }
        } else if (caseId === 'blue-lung-point' && isPathology) {
          // Lung Point: Transition between sliding lung (right) and pneumothorax absent sliding (left)
          const transitionX = width / 2 + respLungShift * 2;

          // Left side: A-lines (Pneumothorax)
          ctx.strokeStyle = getColor(120 * gainMult, 0.6);
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(pleuraLeft, pleuralY + 55);
          ctx.lineTo(transitionX - 10, pleuralY + 55);
          ctx.moveTo(pleuraLeft, pleuralY + 110);
          ctx.lineTo(transitionX - 10, pleuralY + 110);
          ctx.stroke();

          // Right side: B-lines & sliding
          const bGrad = ctx.createLinearGradient(transitionX + 25, pleuralY, transitionX + 25, height);
          bGrad.addColorStop(0, getColor(230 * gainMult, 0.9));
          bGrad.addColorStop(1, getColor(150 * gainMult, 0.5));
          ctx.fillStyle = bGrad;
          ctx.beginPath();
          ctx.moveTo(transitionX + 22, pleuralY);
          ctx.lineTo(transitionX + 28, pleuralY);
          ctx.lineTo(transitionX + 42, height);
          ctx.lineTo(transitionX + 8, height);
          ctx.closePath();
          ctx.fill();

          // Highlight transition focal marker
          ctx.fillStyle = '#f59e0b';
          ctx.beginPath();
          ctx.arc(transitionX, pleuralY, 4, 0, Math.PI * 2);
          ctx.fill();
        } else if (caseId === 'blue-effusion' && isPathology) {
          // Pleural Effusion: Anechoic dependent fluid separating pleura and undulating atelectatic lung
          ctx.fillStyle = getColor(5, 0.98); // black fluid
          ctx.fillRect(pleuraLeft, pleuralY + 20, pleuraRight - pleuraLeft, 110);

          // Compressive atelectatic consolidated lung lobe flapping in fluid ("jellyfish sign")
          const flap = Math.sin(t * 3.5) * 8 + respCycle * 6;
          ctx.fillStyle = getColor(95 * gainMult, 0.85);
          ctx.beginPath();
          ctx.moveTo(pleuraLeft + 30, pleuralY + 60 + flap);
          ctx.quadraticCurveTo(width / 2, pleuralY + 85 + flap, pleuraRight - 40, pleuralY + 65 + flap);
          ctx.lineTo(pleuraRight - 50, pleuralY + 120);
          ctx.lineTo(pleuraLeft + 40, pleuralY + 120);
          ctx.closePath();
          ctx.fill();

          // Diaphragm below effusion
          ctx.strokeStyle = getColor(220 * gainMult, 0.9);
          ctx.lineWidth = 3.5;
          ctx.beginPath();
          ctx.moveTo(pleuraLeft, pleuralY + 140);
          ctx.quadraticCurveTo(width / 2, pleuralY + 125, pleuraRight, pleuralY + 140);
          ctx.stroke();
        } else {
          // Standard A-Line Pattern (Normal Aerated Lung or Pneumothorax)
          // Multiple horizontal reverberation lines equidistant from skin to pleura
          const aLineSpacing = pleuralY - 25; // ~75px
          for (let a = 1; a <= 3; a++) {
            const ay = pleuralY + a * aLineSpacing;
            if (ay < height - 20) {
              const aAlpha = Math.max(0.15, (0.7 - a * 0.18)) * gainMult;
              ctx.strokeStyle = getColor(170, aAlpha);
              ctx.lineWidth = 2.5;
              ctx.beginPath();
              ctx.moveTo(pleuraLeft + 10, ay);
              ctx.lineTo(pleuraRight - 10, ay);
              ctx.stroke();
            }
          }
        }
      }

      // === Cardiac FOCUS: PLAX (Parasternal Long Axis) ===
      else if (caseId === 'focus-plax') {
        const lvWallMotion = isPathology ? (heartBeat * 4) : (heartBeat * 14); // hypokinetic if pathology
        const valveFlicker = Math.max(0, Math.sin(t * cardiacFreq * Math.PI * 2)); // open in diastole

        // RV anterior wall
        ctx.fillStyle = getColor(60 * gainMult, 0.7);
        ctx.beginPath();
        ctx.moveTo(80, 70);
        ctx.quadraticCurveTo(width / 2, 60, width - 80, 85);
        ctx.lineTo(width - 80, 95);
        ctx.quadraticCurveTo(width / 2, 75, 80, 85);
        ctx.closePath();
        ctx.fill();

        // RV Cavity (anechoic)
        ctx.fillStyle = getColor(5, 0.95);
        ctx.beginPath();
        ctx.moveTo(90, 88);
        ctx.quadraticCurveTo(width / 2, 78, width - 90, 98);
        ctx.quadraticCurveTo(width / 2, 115, 90, 112);
        ctx.closePath();
        ctx.fill();

        // Interventricular Septum (IVS)
        ctx.fillStyle = getColor(75 * gainMult, 0.8);
        ctx.beginPath();
        ctx.moveTo(90, 115);
        ctx.quadraticCurveTo(width / 2, 110 + lvWallMotion * 0.4, width / 2 + 75, 125);
        ctx.lineTo(width / 2 + 75, 145);
        ctx.quadraticCurveTo(width / 2, 128 + lvWallMotion * 0.4, 90, 135);
        ctx.closePath();
        ctx.fill();

        // LV Cavity
        ctx.fillStyle = getColor(5, 0.98);
        ctx.beginPath();
        ctx.moveTo(85, 140);
        ctx.quadraticCurveTo(width / 2 - 30, 132 + lvWallMotion * 0.5, width / 2 + 70, 148);
        ctx.lineTo(width / 2 + 65, 235);
        ctx.quadraticCurveTo(width / 2 - 30, 225 - lvWallMotion * 0.6, 85, 175);
        ctx.closePath();
        ctx.fill();

        // Mitral Valve Leaflets (Anterior AMVL & Posterior PMVL)
        const amvlAngle = valveFlicker * 0.5;
        ctx.strokeStyle = getColor(230 * gainMult);
        ctx.lineWidth = 2.5;
        // AMVL (flicks toward septum in diastole)
        ctx.beginPath();
        ctx.moveTo(width / 2 + 50, 195);
        ctx.lineTo(width / 2 + 10 - amvlAngle * 25, 165 - amvlAngle * 20);
        ctx.stroke();
        // PMVL
        ctx.beginPath();
        ctx.moveTo(width / 2 + 55, 225);
        ctx.lineTo(width / 2 + 30, 220 + amvlAngle * 10);
        ctx.stroke();

        // Posterior LV Wall (PLVW)
        ctx.fillStyle = getColor(75 * gainMult, 0.8);
        ctx.beginPath();
        ctx.moveTo(85, 178);
        ctx.quadraticCurveTo(width / 2 - 30, 228 - lvWallMotion * 0.6, width / 2 + 65, 238);
        ctx.lineTo(width / 2 + 65, 258);
        ctx.quadraticCurveTo(width / 2 - 30, 248 - lvWallMotion * 0.6, 85, 198);
        ctx.closePath();
        ctx.fill();

        // Aorta & Left Atrium
        ctx.strokeStyle = getColor(190 * gainMult, 0.85);
        ctx.lineWidth = 2;
        // Aortic root
        ctx.beginPath();
        ctx.moveTo(width / 2 + 75, 125);
        ctx.lineTo(width - 60, 115);
        ctx.moveTo(width / 2 + 75, 168);
        ctx.lineTo(width - 60, 158);
        ctx.stroke();

        // Pericardial Effusion (Pathology in posterior AV groove or circumferential)
        if (isPathology) {
          ctx.fillStyle = getColor(5, 0.98);
          ctx.strokeStyle = getColor(240 * gainMult, 0.7);
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(75, 205);
          ctx.quadraticCurveTo(width / 2 - 20, 255 - lvWallMotion * 0.6, width / 2 + 80, 265);
          ctx.quadraticCurveTo(width / 2 - 10, 280, 75, 225);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        }
      }

      // === Cardiac FOCUS: PSAX (Parasternal Short Axis - Papillary Level) ===
      else if (caseId === 'focus-psax') {
        const lvContract = isPathology ? (heartBeat * 3) : (systoleContract * 12);
        const centerCircleX = width / 2 + 20;
        const centerCircleY = height / 2 + 10;
        const radiusLV = 65 - lvContract;

        // RV Crescent (wrapped around LV)
        ctx.fillStyle = getColor(5, 0.95);
        ctx.strokeStyle = getColor(170 * gainMult, 0.8);
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(centerCircleX - 45, centerCircleY - 15, 60, Math.PI * 0.6, Math.PI * 1.5, false);
        ctx.quadraticCurveTo(centerCircleX - 25, centerCircleY - 10, centerCircleX - 35, centerCircleY + 35);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // LV Doughnut Myocardium
        ctx.fillStyle = getColor(75 * gainMult, 0.85);
        ctx.beginPath();
        if (isPathology) {
          // RV Strain: "D-shaped" flattened interventricular septum!
          ctx.arc(centerCircleX, centerCircleY, radiusLV + 24, -Math.PI * 0.45, Math.PI * 0.45, false);
          ctx.lineTo(centerCircleX - 35, centerCircleY + radiusLV + 20);
          ctx.lineTo(centerCircleX - 35, centerCircleY - radiusLV - 20);
          ctx.closePath();
        } else {
          // Normal: concentric circular ring
          ctx.arc(centerCircleX, centerCircleY, radiusLV + 24, 0, Math.PI * 2);
        }
        ctx.fill();

        // LV Cavity (jet black anechoic)
        ctx.fillStyle = getColor(5, 0.98);
        ctx.beginPath();
        if (isPathology) {
          // Flattened D-shape cavity
          ctx.arc(centerCircleX, centerCircleY, radiusLV, -Math.PI * 0.45, Math.PI * 0.45, false);
          ctx.lineTo(centerCircleX - 18, centerCircleY + radiusLV * 0.7);
          ctx.lineTo(centerCircleX - 18, centerCircleY - radiusLV * 0.7);
          ctx.closePath();
        } else {
          ctx.arc(centerCircleX, centerCircleY, radiusLV, 0, Math.PI * 2);
        }
        ctx.fill();

        // Papillary Muscles (Anterolateral at 4 o'clock, Posteromedial at 8 o'clock)
        ctx.fillStyle = getColor(85 * gainMult, 0.9);
        // Anterolateral
        ctx.beginPath();
        ctx.ellipse(centerCircleX + radiusLV * 0.6, centerCircleY + radiusLV * 0.45, 14, 10, 0.4, 0, Math.PI * 2);
        ctx.fill();
        // Posteromedial
        ctx.beginPath();
        ctx.ellipse(centerCircleX - radiusLV * 0.45, centerCircleY + radiusLV * 0.55, 14, 10, -0.4, 0, Math.PI * 2);
        ctx.fill();
      }

      // === Cardiac FOCUS: Apical 4-Chamber (A4C) ===
      else if (caseId === 'focus-a4c') {
        const beat = systoleContract * 8;
        const rvDilation = isPathology ? 1.6 : 1.0; // severe RV dilation in massive PE

        // Left Ventricle (LV)
        ctx.fillStyle = getColor(5, 0.98);
        ctx.beginPath();
        ctx.moveTo(width / 2, 70); // apex
        ctx.quadraticCurveTo(width / 2 + 65, 130 - beat, width / 2 + 50, 195);
        ctx.lineTo(width / 2 + 5, 195);
        ctx.quadraticCurveTo(width / 2 + 10, 130 - beat, width / 2, 70);
        ctx.closePath();
        ctx.fill();

        // Right Ventricle (RV)
        ctx.beginPath();
        ctx.moveTo(width / 2, 70);
        ctx.quadraticCurveTo(width / 2 - 60 * rvDilation, 135 - beat, width / 2 - 45 * rvDilation, 195);
        ctx.lineTo(width / 2 - 5, 195);
        ctx.quadraticCurveTo(width / 2 - 10, 135 - beat, width / 2, 70);
        ctx.closePath();
        ctx.fill();

        // Left Atrium (LA) & Right Atrium (RA)
        // LA
        ctx.beginPath();
        ctx.ellipse(width / 2 + 30, 235, 30, 26, 0, 0, Math.PI * 2);
        ctx.fill();
        // RA
        ctx.beginPath();
        ctx.ellipse(width / 2 - 28 * rvDilation, 235, 26 * rvDilation, 26, 0, 0, Math.PI * 2);
        ctx.fill();

        // Central crux & Septum
        ctx.fillStyle = getColor(80 * gainMult, 0.85);
        ctx.fillRect(width / 2 - 4, 75, 8, 120);

        // Mitral & Tricuspid valves
        ctx.strokeStyle = getColor(220 * gainMult);
        ctx.lineWidth = 2.5;
        // Mitral valve
        ctx.beginPath();
        ctx.moveTo(width / 2 + 5, 195);
        ctx.lineTo(width / 2 + 45, 195);
        ctx.stroke();
        // Tricuspid valve (more apical)
        ctx.beginPath();
        ctx.moveTo(width / 2 - 5, 190);
        ctx.lineTo(width / 2 - 42 * rvDilation, 190);
        ctx.stroke();
      }

      // === FOCUS IVC (Inferior Vena Cava Long Axis) ===
      else if (caseId === 'focus-ivc') {
        // Liver acoustic window (anterior)
        ctx.fillStyle = getColor(75 * gainMult, 0.7);
        ctx.beginPath();
        ctx.moveTo(60, 60);
        ctx.lineTo(width - 60, 60);
        ctx.lineTo(width - 60, 135);
        ctx.lineTo(60, 135);
        ctx.closePath();
        ctx.fill();

        // Right Atrium border
        ctx.strokeStyle = getColor(190 * gainMult, 0.85);
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(width - 110, 180, 50, -Math.PI * 0.4, Math.PI * 0.4);
        ctx.stroke();

        // IVC Caliber (Normal/Hypovolemia collapsibility >50% vs Fluid Overload plethoric fixed >2.5cm)
        let ivcHeight = 40;
        if (isPathology) {
          // Plethoric fixed dilated IVC: >2.5cm, minimal collapse
          ivcHeight = 58 - respInspiratory * 4;
        } else {
          // Normal: collapses >50% on inspiration/sniff
          ivcHeight = 36 - respInspiratory * 22;
        }

        // Anechoic IVC Lumen
        ctx.fillStyle = getColor(5, 0.98);
        ctx.strokeStyle = getColor(220 * gainMult, 0.9);
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(60, 140);
        ctx.lineTo(width - 120, 140);
        ctx.lineTo(width - 120, 140 + ivcHeight);
        ctx.lineTo(60, 140 + ivcHeight);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }

      // === Vascular Access (IJV / Femoral / DVT) ===
      else if (caseId.startsWith('vasc-')) {
        const compForce = (compressionPct / 100); // 0 to 1
        const artPulse = Math.sin(t * 1.3 * Math.PI * 2) * 2.5;

        if (caseId === 'vasc-gastric') {
          // Gastric Antrum in parasagittal epigastric scan
          // Liver left lobe anteriorly
          ctx.fillStyle = getColor(75 * gainMult, 0.7);
          ctx.beginPath();
          ctx.moveTo(60, 55);
          ctx.lineTo(width - 60, 55);
          ctx.lineTo(width - 60, 120);
          ctx.lineTo(60, 140);
          ctx.closePath();
          ctx.fill();

          // Gastric antrum lumen
          const antrumRadiusX = isPathology ? 65 : 28;
          const antrumRadiusY = isPathology ? 50 : 16;
          const antrumCenterX = width / 2;
          const antrumCenterY = height / 2 + 35;

          // Muscularis propria & submucosa ring (gut signature)
          ctx.fillStyle = getColor(40 * gainMult, 0.85);
          ctx.strokeStyle = getColor(225 * gainMult, 0.9);
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.ellipse(antrumCenterX, antrumCenterY, antrumRadiusX + 12, antrumRadiusY + 8, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          // Antrum lumen
          if (isPathology) {
            // Full stomach: hypoechoic fluid with swirling particulate echoes ("starry night")
            ctx.fillStyle = getColor(12, 0.95);
            ctx.beginPath();
            ctx.ellipse(antrumCenterX, antrumCenterY, antrumRadiusX, antrumRadiusY, 0, 0, Math.PI * 2);
            ctx.fill();

            // Particulate food echoes
            ctx.fillStyle = getColor(210 * gainMult, 0.8);
            for (let f = 0; f < 35; f++) {
              const fx = antrumCenterX + (Math.sin(f * 2.4 + t) * (antrumRadiusX - 10));
              const fy = antrumCenterY + (Math.cos(f * 3.1 + t) * (antrumRadiusY - 8));
              ctx.fillRect(fx, fy, 2, 2);
            }
          } else {
            // Fasted / Empty: collapsed "bull's eye" target with thick folded mucosa
            ctx.fillStyle = getColor(70 * gainMult, 0.9);
            ctx.beginPath();
            ctx.ellipse(antrumCenterX, antrumCenterY, antrumRadiusX, antrumRadiusY, 0, 0, Math.PI * 2);
            ctx.fill();
          }

          // Aorta / SMA deep to antrum
          ctx.fillStyle = getColor(5, 0.95);
          ctx.strokeStyle = getColor(200 * gainMult, 0.8);
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(antrumCenterX - 45, antrumCenterY + 70, 18 + artPulse, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        } else {
          // IJV / Femoral / DVT Transverse Compression Test
          const artX = width / 2 - 70;
          const veinX = width / 2 + 60;
          const vesselY = height / 2 + 10;

          // Common Carotid / Femoral Artery (Pulsatile, non-compressible thick echogenic wall)
          const artRadius = 26 + artPulse;
          ctx.fillStyle = getColor(5, 0.98);
          ctx.strokeStyle = getColor(230 * gainMult, 0.95);
          ctx.lineWidth = 3.5;
          ctx.beginPath();
          ctx.arc(artX, vesselY, artRadius, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          // Vein:
          // In normal: collapses smoothly to 0 under probe compression
          // In DVT (or vascular pathology): NON-compressible with intraluminal thrombus!
          let veinRadiusY = 32;
          if (isPathology || caseId === 'vasc-dvt') {
            // Non-compressible: minimal deformation even at 100% compression
            veinRadiusY = 32 - compForce * 6;
          } else {
            // Fully compressible
            veinRadiusY = Math.max(1, 32 * (1 - compForce * 1.05));
          }

          ctx.fillStyle = getColor(5, 0.98);
          ctx.strokeStyle = getColor(190 * gainMult, 0.85);
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.ellipse(veinX, vesselY, 36, veinRadiusY, 0, 0, Math.PI * 2);
          ctx.fill();
          if (veinRadiusY > 2) ctx.stroke();

          // DVT Intraluminal Thrombus (heterogeneous echoes inside lumen)
          if ((isPathology || caseId === 'vasc-dvt') && veinRadiusY > 8) {
            ctx.fillStyle = getColor(85 * gainMult, 0.8);
            ctx.beginPath();
            ctx.ellipse(veinX - 4, vesselY + 2, 24, veinRadiusY * 0.7, 0.2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // ─────────────────────────────────────────────────────────
      // 5. Color Flow Doppler (CFM) Overlay
      // ─────────────────────────────────────────────────────────
      if (colorDoppler) {
        // Color Doppler sampling box
        const boxX = width / 2 - 80;
        const boxY = height / 2 - 50;
        const boxW = 160;
        const boxH = 110;

        ctx.strokeStyle = '#eab308'; // yellow dashed box
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.strokeRect(boxX, boxY, boxW, boxH);
        ctx.setLineDash([]);

        // Red flow (arterial / toward transducer)
        const redGrad = ctx.createRadialGradient(width / 2 - 60, height / 2 + 10, 4, width / 2 - 60, height / 2 + 10, 30);
        redGrad.addColorStop(0, 'rgba(239, 68, 68, 0.85)');
        redGrad.addColorStop(0.7, 'rgba(249, 115, 22, 0.6)');
        redGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = redGrad;
        ctx.beginPath();
        ctx.arc(width / 2 - 60, height / 2 + 10, 26, 0, Math.PI * 2);
        ctx.fill();

        // Blue flow (venous / away from transducer) - absent or diminished in DVT
        if (!caseId.includes('dvt') || !isPathology) {
          const blueGrad = ctx.createRadialGradient(width / 2 + 50, height / 2 + 10, 4, width / 2 + 50, height / 2 + 10, 35);
          blueGrad.addColorStop(0, 'rgba(59, 130, 246, 0.85)');
          blueGrad.addColorStop(0.7, 'rgba(6, 182, 212, 0.55)');
          blueGrad.addColorStop(1, 'transparent');
          ctx.fillStyle = blueGrad;
          ctx.beginPath();
          ctx.ellipse(width / 2 + 50, height / 2 + 10, 32, 22, 0, 0, Math.PI * 2);
          ctx.fill();
        }

        // Color velocity bar on the right (+64 / -64 cm/s)
        const barX = width - 35;
        const barY = 65;
        const barH = 80;
        const velGrad = ctx.createLinearGradient(0, barY, 0, barY + barH);
        velGrad.addColorStop(0, '#ef4444');
        velGrad.addColorStop(0.48, '#eab308');
        velGrad.addColorStop(0.5, '#000000');
        velGrad.addColorStop(0.52, '#06b6d4');
        velGrad.addColorStop(1, '#2563eb');
        ctx.fillStyle = velGrad;
        ctx.fillRect(barX, barY, 8, barH);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 0.5;
        ctx.strokeRect(barX, barY, 8, barH);

        ctx.fillStyle = '#f8fafc';
        ctx.font = '8px monospace';
        ctx.fillText('+64', barX - 18, barY + 7);
        ctx.fillText('-64', barX - 18, barY + barH);
      }

      ctx.restore(); // Restore beam clip

      // ─────────────────────────────────────────────────────────
      // 6. Ultrasound Machine HUD & Depth Scale Markers
      // ─────────────────────────────────────────────────────────
      // Top HUD Header Bar
      ctx.fillStyle = '#060a12';
      ctx.fillRect(0, 0, width, 30);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, 30);
      ctx.lineTo(width, 30);
      ctx.stroke();

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 10px monospace, sans-serif';
      ctx.fillText(`POCUS SUITE • ${caseData.protocol.toUpperCase()}`, 12, 19);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '9px monospace';
      ctx.fillText(`${caseData.probeType} (${caseData.frequencyRange})`, 190, 19);
      ctx.fillText(`FR:${isFrozen ? '0' : '36'}Hz`, width - 110, 19);
      ctx.fillText(`GN:${gainDb}dB`, width - 58, 19);

      // Probe orientation notch indicator (amber or white dot at top-left of sector)
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(36, 42, 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Right-edge centimeter depth graticule ruler
      const depthMarks = 5;
      ctx.fillStyle = '#64748b';
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 1;
      ctx.font = '8px monospace';
      for (let d = 1; d <= depthMarks; d++) {
        const dy = 30 + (d / depthMarks) * (height - 45);
        const cmVal = Math.round((d / depthMarks) * depthScaleCm);
        ctx.beginPath();
        ctx.moveTo(width - 12, dy);
        ctx.lineTo(width - 6, dy);
        ctx.stroke();
        ctx.fillText(`${cmVal}`, width - 20, dy + 3);
      }

      // Focal zone triangle indicator
      const focalY = height * 0.55;
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.moveTo(width - 4, focalY);
      ctx.lineTo(width - 1, focalY - 4);
      ctx.lineTo(width - 1, focalY + 4);
      ctx.closePath();
      ctx.fill();

      // ─────────────────────────────────────────────────────────
      // 7. Interactive Calipers Overlay
      // ─────────────────────────────────────────────────────────
      if (caliperPts.length > 0) {
        ctx.strokeStyle = '#22c55e'; // green calipers
        ctx.lineWidth = 1.5;
        ctx.fillStyle = '#22c55e';

        caliperPts.forEach((pt, idx) => {
          // Draw caliper crosshair (+)
          ctx.beginPath();
          ctx.moveTo(pt.x - 6, pt.y);
          ctx.lineTo(pt.x + 6, pt.y);
          ctx.moveTo(pt.x, pt.y - 6);
          ctx.lineTo(pt.x, pt.y + 6);
          ctx.stroke();
          ctx.font = 'bold 9px monospace';
          ctx.fillText(`D${idx + 1}`, pt.x + 7, pt.y - 4);
        });

        if (caliperPts.length === 2) {
          // Dotted line connecting calipers
          ctx.setLineDash([3, 3]);
          ctx.beginPath();
          ctx.moveTo(caliperPts[0].x, caliperPts[0].y);
          ctx.lineTo(caliperPts[1].x, caliperPts[1].y);
          ctx.stroke();
          ctx.setLineDash([]);

          // Readout box
          if (measuredDistMm !== null) {
            const midX = (caliperPts[0].x + caliperPts[1].x) / 2;
            const midY = (caliperPts[0].y + caliperPts[1].y) / 2 - 12;
            ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
            ctx.strokeStyle = '#22c55e';
            ctx.lineWidth = 1;
            ctx.fillRect(midX - 30, midY - 10, 60, 18);
            ctx.strokeRect(midX - 30, midY - 10, 60, 18);

            ctx.fillStyle = '#86efac';
            ctx.font = 'bold 10px monospace';
            ctx.fillText(`${measuredDistMm} mm`, midX - 22, midY + 3);
          }
        }
      }

      // ─────────────────────────────────────────────────────────
      // 8. Anatomical Guide Contour Overlay (AI / Teaching Assist)
      // ─────────────────────────────────────────────────────────
      if (showAnatomicalGuide) {
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.7)'; // glowing cyan
        ctx.lineWidth = 1.5;
        ctx.setLineDash([2, 2]);

        // Draw bounding guides based on case
        if (caseId === 'efast-ruq') {
          ctx.strokeRect(width / 2 + 10, 195, 120, 75);
          ctx.fillStyle = '#22d3ee';
          ctx.font = '9px sans-serif';
          ctx.fillText('Hepatorenal Recess (Morison)', width / 2 + 14, 190);
        } else if (caseId.startsWith('blue-')) {
          ctx.strokeRect(125, 95, width - 250, 15);
          ctx.fillStyle = '#22d3ee';
          ctx.font = '9px sans-serif';
          ctx.fillText('Pleural Line', 130, 90);
        } else if (caseId === 'focus-plax') {
          ctx.strokeRect(width / 2 - 40, 135, 120, 110);
          ctx.fillStyle = '#22d3ee';
          ctx.font = '9px sans-serif';
          ctx.fillText('LV Cavity & Mitral Valve', width / 2 - 35, 130);
        }

        ctx.setLineDash([]);
      }

      animRef.current = requestAnimationFrame(render);
    };

    animRef.current = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [
    caseData.id,
    caseData.probeType,
    caseData.protocol,
    caseData.frequencyRange,
    isPathology,
    compressionPct,
    isFrozen,
    gainDb,
    nearGain,
    farGain,
    colormap,
    sriEnabled,
    colorDoppler,
    showAnatomicalGuide,
    calipersActive,
    caliperPts,
    measuredDistMm,
    depthScaleCm,
    customScan
  ]);

  return (
    <div className="w-full h-full flex flex-col bg-black relative select-none rounded-xl overflow-hidden border border-white/10 group">
      {/* ─── Top Telemetry & Control Bar ─── */}
      <div className="px-3 py-1.5 bg-[#070d18] border-b border-white/10 flex items-center justify-between text-[11px] z-20">
        <div className="flex items-center gap-2">
          {/* Status Badge */}
          {customScan ? (
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-[800] bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 uppercase flex items-center gap-1">
              <Camera className="w-3 h-3 text-cyan-400" />
              <span>User Clinical Scan</span>
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-[800] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span>Procedural B-Mode Cine</span>
            </span>
          )}

          {isFrozen && (
            <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-[800] bg-blue-500/30 text-blue-200 border border-blue-500/40 flex items-center gap-1">
              <Snowflake className="w-3 h-3" />
              <span>FREEZE</span>
            </span>
          )}
        </div>

        {/* Live Ultrasound Controls Toolbar */}
        <div className="flex items-center gap-1 text-[11px]">
          {/* Freeze / Live Toggle */}
          {!customScan && (
            <button
              onClick={() => setIsFrozen(!isFrozen)}
              className={`p-1.5 rounded-lg border transition-colors ${
                isFrozen
                  ? 'bg-blue-600/30 border-blue-500/50 text-blue-300'
                  : 'bg-white/[0.04] border-white/10 text-slate-300 hover:text-white'
              }`}
              title={isFrozen ? 'Resume live cineloop' : 'Freeze scan for measurement'}
            >
              {isFrozen ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
          )}

          {/* Color Doppler (CFM) */}
          {!customScan && (
            <button
              onClick={() => setColorDoppler(!colorDoppler)}
              className={`px-2 py-1 rounded-lg text-[10px] font-mono font-[800] border transition-colors ${
                colorDoppler
                  ? 'bg-amber-500/25 border-amber-500/50 text-amber-300 shadow-sm'
                  : 'bg-white/[0.04] border-white/10 text-slate-400 hover:text-white'
              }`}
              title="Toggle Color Flow Doppler (CFM)"
            >
              CFM
            </button>
          )}

          {/* Calipers Measurement Tool */}
          <button
            onClick={() => {
              setCalipersActive(!calipersActive);
              if (calipersActive) {
                setCaliperPts([]);
                setMeasuredDistMm(null);
              }
            }}
            className={`p-1.5 rounded-lg border transition-colors ${
              calipersActive
                ? 'bg-emerald-600/30 border-emerald-500/50 text-emerald-300'
                : 'bg-white/[0.04] border-white/10 text-slate-400 hover:text-white'
            }`}
            title="Toggle Digital Calipers (Click 2 points to measure)"
          >
            <Ruler className="w-3.5 h-3.5" />
          </button>

          {/* Anatomical Guide Overlay */}
          {!customScan && (
            <button
              onClick={() => setShowAnatomicalGuide(!showAnatomicalGuide)}
              className={`p-1.5 rounded-lg border transition-colors ${
                showAnatomicalGuide
                  ? 'bg-cyan-600/30 border-cyan-500/50 text-cyan-300'
                  : 'bg-white/[0.04] border-white/10 text-slate-400 hover:text-white'
              }`}
              title="Toggle Anatomical Landmark Outlines"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Colormap Cycle */}
          {!customScan && (
            <button
              onClick={() => {
                if (colormap === 'grayscale') setColormap('amber');
                else if (colormap === 'amber') setColormap('ice');
                else setColormap('grayscale');
              }}
              className="p-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-slate-400 hover:text-white transition-colors"
              title={`Colormap: ${colormap}`}
            >
              <Palette className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Upload Real Scan Button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 transition-colors"
            title="Upload actual patient scan / clinical photo"
          >
            <Upload className="w-3.5 h-3.5" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />

          {/* Revert if custom scan */}
          {customScan && (
            <button
              onClick={handleRevertToSimulation}
              className="p-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 hover:bg-rose-500/20 transition-colors"
              title="Revert back to procedural B-mode simulation"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Fullscreen Modal */}
          {onOpenFullscreen && (
            <button
              onClick={onOpenFullscreen}
              className="p-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-slate-400 hover:text-white transition-colors ml-1"
              title="Full View Lightbox"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* ─── Main Ultrasound Screen Viewport ─── */}
      <div className="relative flex-1 min-h-[300px] w-full bg-black flex items-center justify-center overflow-hidden">
        {customScan ? (
          // User Uploaded Real Clinical Image
          <div className="relative w-full h-full flex items-center justify-center p-2">
            <img
              src={customScan.dataUrl}
              alt={customScan.label || 'Clinical Ultrasound Scan'}
              className="w-full h-full object-contain rounded-lg shadow-2xl"
              style={{
                filter: `brightness(${gainDb / 60}) contrast(1.1)`
              }}
            />
            <div className="absolute top-4 left-4 bg-black/85 text-cyan-300 px-2.5 py-1 rounded-lg text-[10px] font-mono border border-cyan-500/30 backdrop-blur">
              Verified Clinical User Upload
            </div>
          </div>
        ) : (
          // Procedural High-Fidelity B-Mode Simulator Canvas
          <canvas
            ref={canvasRef}
            width={540}
            height={360}
            onClick={handleCanvasClick}
            className={`w-full h-full object-contain ${calipersActive ? 'cursor-crosshair' : 'cursor-default'}`}
          />
        )}

        {/* Informational Pill when simulated */}
        {!customScan && (
          <div className="absolute bottom-2.5 right-2.5 bg-black/80 backdrop-blur border border-white/10 rounded-lg px-2 py-0.5 text-[9px] text-slate-400 font-mono pointer-events-none">
            Synthetic Physics Engine (B-Mode)
          </div>
        )}

        {/* Calipers instructions if active */}
        {calipersActive && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-black/90 text-emerald-300 border border-emerald-500/40 rounded-lg px-3 py-1 text-[11px] font-mono flex items-center gap-1.5 shadow-xl pointer-events-none">
            <Ruler className="w-3.5 h-3.5 text-emerald-400" />
            <span>
              {caliperPts.length === 0 && 'Click first point to start measurement'}
              {caliperPts.length === 1 && 'Click second point to measure distance'}
              {caliperPts.length === 2 && `Measured: ${measuredDistMm ?? 0} mm (Click to reset)`}
            </span>
          </div>
        )}
      </div>

      {/* ─── Bottom Machine Gain & Tuning Bar ─── */}
      <div className="px-3 py-2 bg-[#050811] border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-[11px]">
        {/* Gain Knob Slider */}
        <div className="flex items-center gap-2">
          <Sliders className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-400 font-mono text-[10px]">GAIN:</span>
          <input
            type="range"
            min="35"
            max="85"
            value={gainDb}
            onChange={(e) => setGainDb(Number(e.target.value))}
            className="w-20 accent-cyan-400 cursor-pointer h-1.5 bg-white/10 rounded-lg"
          />
          <span className="text-[10px] font-mono text-cyan-300 w-8">{gainDb}dB</span>
        </div>

        {/* TGC Quick Adjust */}
        {!customScan && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono text-slate-400">NEAR:</span>
              <input
                type="range"
                min="-10"
                max="10"
                value={nearGain}
                onChange={(e) => setNearGain(Number(e.target.value))}
                className="w-14 accent-blue-400 cursor-pointer h-1 bg-white/10 rounded-lg"
              />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono text-slate-400">FAR:</span>
              <input
                type="range"
                min="-10"
                max="10"
                value={farGain}
                onChange={(e) => setFarGain(Number(e.target.value))}
                className="w-14 accent-blue-400 cursor-pointer h-1 bg-white/10 rounded-lg"
              />
            </div>
          </div>
        )}

        {/* Speckle Filter SRI Toggle */}
        {!customScan && (
          <button
            onClick={() => setSriEnabled(!sriEnabled)}
            className={`px-2 py-0.5 rounded text-[10px] font-mono border transition-colors ${
              sriEnabled
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                : 'bg-white/[0.03] text-slate-400 border-white/10'
            }`}
          >
            SRI: {sriEnabled ? 'ON' : 'OFF'}
          </button>
        )}
      </div>
    </div>
  );
}
