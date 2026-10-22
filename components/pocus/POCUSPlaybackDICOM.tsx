'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Upload, 
  Repeat, 
  Sliders, 
  FileText, 
  Layers, 
  Sun, 
  Maximize2,
  CheckCircle2,
  AlertCircle,
  Film
} from 'lucide-react';

interface DicomMetadata {
  patientName?: string;
  patientId?: string;
  modality?: string;
  studyDescription?: string;
  rows: number;
  columns: number;
  numberOfFrames: number;
  bitsAllocated: number;
  windowCenter: number;
  windowWidth: number;
}

function buildSampleDicom(sampleType: 'efast' | 'cardiac' | 'lung'): { meta: DicomMetadata; frames: Uint8Array[] } {
  const width = 320;
  const height = 240;
  const numFrames = 30;
  const sampleFrames: Uint8Array[] = [];

  for (let f = 0; f < numFrames; f++) {
    const frameBuffer = new Uint8Array(width * height);
    const cycle = f / numFrames;
    const beat = Math.sin(cycle * Math.PI * 2);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = y * width + x;

        // Sector cone mask
        const dx = x - width / 2;
        const dy = y - 10;
        const angle = Math.atan2(dx, dy);
        const dist = Math.hypot(dx, dy);

        if (dist > 220 || Math.abs(angle) > 0.7) {
          frameBuffer[idx] = 10; // background dark
          continue;
        }

        // Generate tissue patterns based on sampleType
        if (sampleType === 'efast') {
          // RUQ Morison's pouch: liver + kidney + fluid
          const isLiver = y > 40 && y < 140 && Math.abs(x - 130) < 60;
          const isKidney = y > 130 && y < 200 && Math.abs(x - 190) < 50;
          const isFluid = y >= 125 && y <= 145 && x > 120 && x < 210;

          if (isFluid) {
            frameBuffer[idx] = 5; // anechoic black fluid
          } else if (isKidney) {
            frameBuffer[idx] = 70 + Math.floor(Math.random() * 25);
          } else if (isLiver) {
            frameBuffer[idx] = 110 + Math.floor(Math.random() * 30);
          } else {
            frameBuffer[idx] = 20 + Math.floor(Math.random() * 20);
          }
        } else if (sampleType === 'cardiac') {
          // Cardiac Apical 4-chamber pulsation
          const rOffset = beat * 12;
          const inChamber = Math.hypot(x - 160, y - 120) < (45 + rOffset);
          if (inChamber) {
            frameBuffer[idx] = 15; // anechoic blood chamber
          } else {
            frameBuffer[idx] = 100 + Math.floor(Math.random() * 45); // myocardium
          }
        } else {
          // Lung B-lines
          const isPleura = Math.abs(y - 65) < 3;
          const isBLine1 = Math.abs(x - 100) < 8 && y > 65;
          const isBLine2 = Math.abs(x - 210) < 10 && y > 65;

          if (isPleura) {
            frameBuffer[idx] = 240;
          } else if (isBLine1 || isBLine2) {
            frameBuffer[idx] = 190 + Math.floor(Math.random() * 40);
          } else {
            frameBuffer[idx] = 25 + Math.floor(Math.random() * 25);
          }
        }
      }
    }
    sampleFrames.push(frameBuffer);
  }

  const meta: DicomMetadata = {
    patientName: sampleType === 'efast' ? 'TRAUMA^SIMULATED' : sampleType === 'cardiac' ? 'FOCUS^CARDIAC' : 'BLUE^LUNG_PNEUMONIA',
    patientId: `ANESTH-US-${sampleType.toUpperCase()}`,
    modality: 'US',
    studyDescription: `${sampleType.toUpperCase()} POCUS Cine Sweep`,
    rows: height,
    columns: width,
    numberOfFrames: numFrames,
    bitsAllocated: 8,
    windowCenter: 128,
    windowWidth: 256
  };

  return { meta, frames: sampleFrames };
}

export default function POCUSPlaybackDICOM() {
  const [initialData] = useState(() => buildSampleDicom('efast'));
  const [dicomMeta, setDicomMeta] = useState<DicomMetadata | null>(initialData.meta);
  const [frames, setFrames] = useState<Uint8Array[]>(initialData.frames);
  const [currentFrameIndex, setCurrentFrameIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [fps, setFps] = useState<number>(25);
  const [isLooping, setIsLooping] = useState<boolean>(true);
  const [windowCenter, setWindowCenter] = useState<number>(128);
  const [windowWidth, setWindowWidth] = useState<number>(256);
  const [fileName, setFileName] = useState<string>('trauma_efast_cine.dcm');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Generate synthetic multi-frame ultrasound cine loop on button click
  const generateSampleDicom = useCallback((sampleType: 'efast' | 'cardiac' | 'lung') => {
    const { meta, frames: sampleFrames } = buildSampleDicom(sampleType);
    setDicomMeta(meta);
    setFrames(sampleFrames);
    setCurrentFrameIndex(0);
    setErrorMsg(null);
  }, []);

  // Pure client-side DICOM ArrayBuffer parser
  const parseDicomBuffer = (buffer: ArrayBuffer) => {
    try {
      const dataView = new DataView(buffer);
      const uint8 = new Uint8Array(buffer);

      // Verify "DICM" prefix at offset 128
      const magic = String.fromCharCode(uint8[128], uint8[129], uint8[130], uint8[131]);
      let offset = magic === 'DICM' ? 132 : 0;

      let rows = 240;
      let columns = 320;
      let numberOfFrames = 1;
      let bitsAllocated = 8;
      let windowCenterVal = 128;
      let windowWidthVal = 256;
      let modality = 'US';
      let patientName = 'ANONYMOUS';
      let patientId = 'POCUS-PATIENT';
      let pixelDataOffset = -1;
      let pixelDataLength = 0;

      // Simple tag scanner
      while (offset < buffer.byteLength - 8) {
        const group = dataView.getUint16(offset, true);
        const element = dataView.getUint16(offset + 2, true);
        offset += 4;

        // Read tag VR or length
        let length = 0;
        const vrChars = String.fromCharCode(uint8[offset], uint8[offset + 1]);
        const standardVRs = ['AE', 'AS', 'AT', 'CS', 'DA', 'DS', 'DT', 'FL', 'FD', 'IS', 'LO', 'LT', 'OB', 'OF', 'OW', 'PN', 'SH', 'SL', 'SQ', 'SS', 'ST', 'TM', 'UI', 'UL', 'UN', 'US', 'UT'];

        if (standardVRs.includes(vrChars)) {
          // Explicit VR
          offset += 2;
          if (['OB', 'OW', 'OF', 'SQ', 'UT', 'UN'].includes(vrChars)) {
            offset += 2; // skip reserved bytes
            length = dataView.getUint32(offset, true);
            offset += 4;
          } else {
            length = dataView.getUint16(offset, true);
            offset += 2;
          }
        } else {
          // Implicit VR
          length = dataView.getUint32(offset, true);
          offset += 4;
        }

        if (length === 0xFFFFFFFF || length < 0) {
          length = 0;
        }

        // Match tags
        if (group === 0x0010 && element === 0x0010) {
          // Patient Name
          patientName = new TextDecoder().decode(uint8.subarray(offset, offset + length)).trim() || 'ANONYMOUS';
        } else if (group === 0x0010 && element === 0x0020) {
          // Patient ID
          patientId = new TextDecoder().decode(uint8.subarray(offset, offset + length)).trim() || 'POCUS-ID';
        } else if (group === 0x0008 && element === 0x0060) {
          // Modality
          modality = new TextDecoder().decode(uint8.subarray(offset, offset + length)).trim() || 'US';
        } else if (group === 0x0028 && element === 0x0008) {
          // Number of frames
          const numStr = new TextDecoder().decode(uint8.subarray(offset, offset + length)).trim();
          numberOfFrames = parseInt(numStr, 10) || 1;
        } else if (group === 0x0028 && element === 0x0010) {
          // Rows
          rows = dataView.getUint16(offset, true);
        } else if (group === 0x0028 && element === 0x0011) {
          // Columns
          columns = dataView.getUint16(offset, true);
        } else if (group === 0x0028 && element === 0x0100) {
          // Bits Allocated
          bitsAllocated = dataView.getUint16(offset, true);
        } else if (group === 0x0028 && element === 0x1050) {
          // Window Center
          const str = new TextDecoder().decode(uint8.subarray(offset, offset + length)).trim();
          windowCenterVal = parseFloat(str) || 128;
        } else if (group === 0x0028 && element === 0x1051) {
          // Window Width
          const str = new TextDecoder().decode(uint8.subarray(offset, offset + length)).trim();
          windowWidthVal = parseFloat(str) || 256;
        } else if (group === 0x7FE0 && element === 0x0010) {
          // Pixel Data
          pixelDataOffset = offset;
          pixelDataLength = length;
          break; // Found pixel data, stop tag scan
        }

        offset += length;
      }

      if (pixelDataOffset === -1) {
        throw new Error('No pixel data tag (7FE0,0010) found in DICOM file.');
      }

      // Extract frame byte chunks
      const parsedFrames: Uint8Array[] = [];
      const frameByteSize = rows * columns * (bitsAllocated === 16 ? 2 : 1);

      for (let i = 0; i < numberOfFrames; i++) {
        const start = pixelDataOffset + i * frameByteSize;
        const end = Math.min(start + frameByteSize, buffer.byteLength);
        if (start < buffer.byteLength) {
          parsedFrames.push(uint8.subarray(start, end));
        }
      }

      setDicomMeta({
        patientName,
        patientId,
        modality,
        studyDescription: 'Imported DICOM Ultrasound',
        rows,
        columns,
        numberOfFrames: parsedFrames.length || 1,
        bitsAllocated,
        windowCenter: windowCenterVal,
        windowWidth: windowWidthVal
      });

      setFrames(parsedFrames);
      setCurrentFrameIndex(0);
      setWindowCenter(windowCenterVal);
      setWindowWidth(windowWidthVal);
      setErrorMsg(null);
    } catch (err: any) {
      console.error('DICOM Parse error:', err);
      setErrorMsg(`Failed to parse DICOM file: ${err.message}`);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result instanceof ArrayBuffer) {
        parseDicomBuffer(reader.result);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  // Render current frame to canvas with window/level adjustment
  useEffect(() => {
    if (!canvasRef.current || !dicomMeta || frames.length === 0) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const frameData = frames[currentFrameIndex] || frames[0];
    const { rows, columns } = dicomMeta;

    if (canvas.width !== columns || canvas.height !== rows) {
      canvas.width = columns;
      canvas.height = rows;
    }

    const imgData = ctx.createImageData(columns, rows);
    const minVal = windowCenter - windowWidth / 2;
    const maxVal = windowCenter + windowWidth / 2;

    for (let i = 0; i < columns * rows; i++) {
      const rawVal = frameData[i] || 0;
      // Window / Level linear transfer
      let clamped = 0;
      if (rawVal <= minVal) clamped = 0;
      else if (rawVal >= maxVal) clamped = 255;
      else clamped = Math.round(((rawVal - minVal) / windowWidth) * 255);

      const pIdx = i * 4;
      imgData.data[pIdx] = clamped;     // R
      imgData.data[pIdx + 1] = clamped; // G
      imgData.data[pIdx + 2] = clamped; // B
      imgData.data[pIdx + 3] = 255;     // A
    }

    ctx.putImageData(imgData, 0, 0);
  }, [currentFrameIndex, frames, dicomMeta, windowCenter, windowWidth]);

  // Cine loop playback timer
  useEffect(() => {
    if (!isPlaying || frames.length <= 1) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrentFrameIndex((prev) => {
        if (prev + 1 >= frames.length) {
          return isLooping ? 0 : prev;
        }
        return prev + 1;
      });
    }, 1000 / fps);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, frames.length, isLooping, fps]);

  return (
    <div className="space-y-4">
      {/* ─── Header & Controls ─── */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#0b1223] to-[#070b16] border border-white/10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Film className="w-4 h-4 text-cyan-400" />
            <span className="text-[13px] font-[900] text-slate-100 tracking-tight">
              DICOM CINE VIEWER (.dcm)
            </span>
          </div>

          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-black/50 text-cyan-300 border border-white/10">
            {fileName}
          </span>
        </div>

        {/* Load Preset Sample / Upload File */}
        <div className="flex items-center gap-2">
          {/* Preset Buttons */}
          <div className="flex items-center gap-1 text-[11px] font-mono">
            <button
              onClick={() => {
                setFileName('trauma_efast_ruq.dcm');
                generateSampleDicom('efast');
              }}
              className="px-2.5 py-1 rounded-lg bg-white/[0.04] text-slate-300 hover:text-white border border-white/10"
            >
              RUQ Sample
            </button>
            <button
              onClick={() => {
                setFileName('focus_cardiac_a4c.dcm');
                generateSampleDicom('cardiac');
              }}
              className="px-2.5 py-1 rounded-lg bg-white/[0.04] text-slate-300 hover:text-white border border-white/10"
            >
              Cardiac Sample
            </button>
            <button
              onClick={() => {
                setFileName('blue_lung_b_lines.dcm');
                generateSampleDicom('lung');
              }}
              className="px-2.5 py-1 rounded-lg bg-white/[0.04] text-slate-300 hover:text-white border border-white/10"
            >
              Lung Sample
            </button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".dcm,application/dicom"
            onChange={handleFileUpload}
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-[800] text-[12px] flex items-center gap-1.5 shadow-md shadow-blue-900/40"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Open .dcm File</span>
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-[12px] text-rose-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* ─── DICOM Main Viewport ─── */}
      <div className="relative aspect-[4/3] max-w-2xl mx-auto bg-black rounded-2xl border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain"
        />

        {/* Telemetry Overlays */}
        {dicomMeta && (
          <>
            <div className="absolute top-3 left-3 text-[10px] font-mono text-cyan-300 bg-black/60 px-2.5 py-1.5 rounded-lg border border-white/10 pointer-events-none space-y-0.5">
              <div>PATIENT: {dicomMeta.patientName}</div>
              <div>ID: {dicomMeta.patientId} • MODALITY: {dicomMeta.modality}</div>
              <div>DIM: {dicomMeta.columns}x{dicomMeta.rows} • {dicomMeta.bitsAllocated} BITS</div>
            </div>

            <div className="absolute top-3 right-3 text-[10px] font-mono text-slate-300 bg-black/60 px-2.5 py-1.5 rounded-lg border border-white/10 pointer-events-none space-y-0.5 text-right">
              <div>FRAME: {currentFrameIndex + 1} / {dicomMeta.numberOfFrames}</div>
              <div>WL: {windowCenter} • WW: {windowWidth}</div>
              <div>FPS: {fps}</div>
            </div>
          </>
        )}
      </div>

      {/* ─── Cine Controls & Frame Scrubber ─── */}
      <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentFrameIndex(Math.max(0, currentFrameIndex - 1))}
              className="p-2 rounded-xl bg-white/[0.04] text-slate-300 hover:text-white border border-white/10"
              title="Previous frame"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-[800] text-[13px] flex items-center gap-1.5 shadow"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isPlaying ? 'Pause' : 'Play Cine'}</span>
            </button>

            <button
              onClick={() => setCurrentFrameIndex((prev) => (prev + 1) % (frames.length || 1))}
              className="p-2 rounded-xl bg-white/[0.04] text-slate-300 hover:text-white border border-white/10"
              title="Next frame"
            >
              <SkipForward className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsLooping(!isLooping)}
              className={`p-2 rounded-xl border transition-colors ${
                isLooping ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' : 'bg-white/[0.04] text-slate-400 border-white/10'
              }`}
              title="Toggle Loop"
            >
              <Repeat className="w-4 h-4" />
            </button>
          </div>

          {/* Frame Scrubber Slider */}
          <div className="flex-1 flex items-center gap-3">
            <span className="text-[11px] font-mono text-slate-400 shrink-0">
              {currentFrameIndex + 1} / {frames.length || 1}
            </span>
            <input
              type="range"
              min="0"
              max={Math.max(0, frames.length - 1)}
              value={currentFrameIndex}
              onChange={(e) => setCurrentFrameIndex(Number(e.target.value))}
              className="flex-1 accent-cyan-400 cursor-pointer"
            />
          </div>

          {/* Speed / FPS Selector */}
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-300 shrink-0">
            <span className="text-slate-400">FPS:</span>
            {[15, 25, 40].map((speed) => (
              <button
                key={speed}
                onClick={() => setFps(speed)}
                className={`px-2 py-1 rounded border ${
                  fps === speed ? 'bg-blue-600 text-white border-blue-500' : 'bg-white/[0.04] text-slate-400 border-white/10'
                }`}
              >
                {speed}
              </button>
            ))}
          </div>
        </div>

        {/* Window Level (Brightness) & Window Width (Contrast) Sliders */}
        <div className="pt-2 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-4 text-[12px]">
          <div className="flex items-center gap-3">
            <span className="font-[700] text-slate-400 w-28">Window Level (Center):</span>
            <input
              type="range"
              min="0"
              max="255"
              value={windowCenter}
              onChange={(e) => setWindowCenter(Number(e.target.value))}
              className="flex-1 accent-blue-500 cursor-pointer"
            />
            <span className="font-mono text-blue-400 w-10 text-right">{windowCenter}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-[700] text-slate-400 w-28">Window Width (Spread):</span>
            <input
              type="range"
              min="10"
              max="512"
              value={windowWidth}
              onChange={(e) => setWindowWidth(Number(e.target.value))}
              className="flex-1 accent-blue-500 cursor-pointer"
            />
            <span className="font-mono text-blue-400 w-10 text-right">{windowWidth}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
