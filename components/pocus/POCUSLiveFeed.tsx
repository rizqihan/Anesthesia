'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Camera, 
  Video, 
  VideoOff, 
  Snowflake, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Bookmark, 
  CheckCircle2, 
  Settings2, 
  Layers, 
  Sliders,
  Ruler,
  AlertTriangle,
  RotateCw
} from 'lucide-react';
import POCUSCalipersOverlay from './POCUSCalipersOverlay';
import db, { POCUSMeasurement } from '@/lib/db';

export default function POCUSLiveFeed() {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamError, setStreamError] = useState<string | null>(null);
  const [isFrozen, setIsFrozen] = useState(false);
  const [cineBuffer, setCineBuffer] = useState<ImageData[]>([]);
  const [cineIndex, setCineIndex] = useState(0);
  const [showCalipers, setShowCalipers] = useState(false);
  const [depthScaleCm, setDepthScaleCm] = useState(15);
  const [gainDb, setGainDb] = useState(65);
  const [isSaved, setIsSaved] = useState(false);
  const [isSimulationMode, setIsSimulationMode] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const circularBufferRef = useRef<ImageData[]>([]);
  const maxCineFrames = 30;

  // Enumerate video devices (UVC capture cards, USB probes, webcams)
  useEffect(() => {
    let active = true;
    const fetchDevices = async () => {
      try {
        if (!navigator.mediaDevices?.enumerateDevices) {
          if (active) setIsSimulationMode(true);
          return;
        }
        const allDevices = await navigator.mediaDevices.enumerateDevices();
        if (!active) return;
        const videoInputs = allDevices.filter((d) => d.kind === 'videoinput');
        setDevices(videoInputs);
        if (videoInputs.length > 0) {
          setSelectedDeviceId((prev) => prev || videoInputs[0].deviceId);
        } else {
          setIsSimulationMode(true);
        }
      } catch {
        if (active) setIsSimulationMode(true);
      }
    };
    fetchDevices();
    return () => {
      active = false;
    };
  }, []);

  // Start video stream from selected device
  const startStream = async (deviceId?: string) => {
    setStreamError(null);
    try {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((t) => t.stop());
      }

      const constraints: MediaStreamConstraints = {
        video: {
          deviceId: deviceId || selectedDeviceId ? { exact: deviceId || selectedDeviceId } : undefined,
          width: { ideal: 1280 },
          height: { ideal: 720 },
          frameRate: { ideal: 30 }
        },
        audio: false
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setIsStreaming(true);
        setIsSimulationMode(false);
        setIsFrozen(false);
      }
    } catch (err: any) {
      console.warn('UVC Video capture error, falling back to simulated ultrasound feed:', err);
      setStreamError('No physical UVC ultrasound probe or camera connected. Running simulated ultrasound mode.');
      setIsSimulationMode(true);
      setIsStreaming(true);
      setIsFrozen(false);
    }
  };

  const stopStream = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((t) => t.stop());
      videoRef.current.srcObject = null;
    }
    setIsStreaming(false);
  };

  // Simulated ultrasound engine when physical probe is absent
  useEffect(() => {
    if (!isSimulationMode || isFrozen) return;

    let frame = 0;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const renderSim = () => {
      frame++;
      const w = canvas.width;
      const h = canvas.height;

      // Dark background
      ctx.fillStyle = '#020611';
      ctx.fillRect(0, 0, w, h);

      // Ultrasound Sector Arc Mask
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(w / 2, 20);
      ctx.lineTo(w - 40, h - 20);
      ctx.arc(w / 2, 20, h - 30, 0.4, Math.PI - 0.4, false);
      ctx.lineTo(w / 2, 20);
      ctx.closePath();
      ctx.clip();

      // Simulated speckle & acoustic texture
      const cycle = (frame % 90) / 90; // heart / respiratory cycle
      const heartPulse = Math.sin(cycle * Math.PI * 2) * 8;
      const respShift = Math.sin(cycle * Math.PI) * 12;

      // Simulated liver / spleen tissue
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.ellipse(w / 2 - 40, h / 2 - 20 + respShift, 140, 90, -0.2, 0, Math.PI * 2);
      ctx.fill();

      // Kidney contour
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(w / 2 + 50, h / 2 + 50 + respShift * 0.7, 75, 45, 0.4, 0, Math.PI * 2);
      ctx.stroke();

      // Pulsatile vessel / heart chamber
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.ellipse(w / 2 - 60, h / 2 - 60 + respShift, 45 + heartPulse, 30 + heartPulse * 0.7, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Acoustic noise lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 8; i++) {
        ctx.beginPath();
        ctx.arc(w / 2, 20, 60 + i * 35, 0.4, Math.PI - 0.4);
        ctx.stroke();
      }

      ctx.restore();

      // Circular cine buffer recording
      try {
        const frameData = ctx.getImageData(0, 0, w, h);
        circularBufferRef.current.push(frameData);
        if (circularBufferRef.current.length > maxCineFrames) {
          circularBufferRef.current.shift();
        }
      } catch {}

      animFrameRef.current = requestAnimationFrame(renderSim);
    };

    animFrameRef.current = requestAnimationFrame(renderSim);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isSimulationMode, isFrozen]);

  // Handle freeze / unfreeze
  const handleToggleFreeze = () => {
    if (!isFrozen) {
      // Freeze frame & commit cine buffer
      setIsFrozen(true);
      setCineBuffer([...circularBufferRef.current]);
      setCineIndex(circularBufferRef.current.length - 1);
    } else {
      // Unfreeze
      setIsFrozen(false);
    }
  };

  // Scrub cine frame
  const handleCineScrub = (idx: number) => {
    if (!cineBuffer[idx] || !canvasRef.current) return;
    setCineIndex(idx);
    const ctx = canvasRef.current.getContext('2d');
    if (ctx) {
      ctx.putImageData(cineBuffer[idx], 0, 0);
    }
  };

  // Save current frozen or live frame to Dexie captures
  const handleSaveCapture = async () => {
    if (!canvasRef.current) return;
    try {
      const dataUri = canvasRef.current.toDataURL('image/jpeg', 0.85);
      await db.pocusCaptures.add({
        timestamp: Date.now(),
        protocol: 'live',
        windowId: 'uvc-capture',
        diagnosis: isSimulationMode ? 'Simulated Cine Frame' : 'Live Probe Capture',
        notes: `POCUS capture at ${depthScaleCm} cm depth scale, gain ${gainDb} dB.`,
        imageDataUri: dataUri,
      });
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (e) {
      console.error('Failed to save capture:', e);
    }
  };

  return (
    <div className="space-y-4">
      {/* ─── Top Control Strip ─── */}
      <div className="p-3 rounded-2xl bg-gradient-to-r from-[#0d1627] to-[#090f1d] border border-white/10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${isStreaming ? (isFrozen ? 'bg-cyan-400' : 'bg-emerald-400 animate-pulse') : 'bg-rose-400'}`} />
            <span className="text-[13px] font-[900] text-slate-100 tracking-tight">
              {isStreaming ? (isFrozen ? 'CINE FROZEN' : (isSimulationMode ? 'SIMULATED PROBE FEED' : 'LIVE UVC FEED')) : 'FEED STANDBY'}
            </span>
          </div>

          {/* Device Selector */}
          {devices.length > 0 && (
            <select
              value={selectedDeviceId}
              onChange={(e) => {
                setSelectedDeviceId(e.target.value);
                startStream(e.target.value);
              }}
              className="px-2.5 py-1 rounded-xl bg-white/[0.04] border border-white/10 text-slate-200 text-[11px] font-mono"
            >
              {devices.map((d) => (
                <option key={d.deviceId} value={d.deviceId} className="bg-slate-900 text-slate-200">
                  {d.label || `Probe / Camera ${d.deviceId.slice(0, 5)}...`}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {!isStreaming ? (
            <button
              onClick={() => startStream()}
              className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-[800] text-[12px] flex items-center gap-1.5 shadow-md shadow-blue-900/40"
            >
              <Video className="w-3.5 h-3.5" />
              <span>Connect Probe</span>
            </button>
          ) : (
            <>
              {/* Freeze Button */}
              <button
                onClick={handleToggleFreeze}
                className={`px-3.5 py-1.5 rounded-xl font-[800] text-[12px] flex items-center gap-1.5 transition-all border ${
                  isFrozen
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg shadow-cyan-950/60 font-[900]'
                    : 'bg-white/[0.06] text-cyan-300 border-cyan-500/30 hover:bg-cyan-500/20'
                }`}
              >
                <Snowflake className="w-3.5 h-3.5" />
                <span>{isFrozen ? 'UNFREEZE' : 'FREEZE'}</span>
              </button>

              {/* Calipers Toggle */}
              <button
                onClick={() => setShowCalipers(!showCalipers)}
                className={`px-3 py-1.5 rounded-xl text-[12px] font-[700] flex items-center gap-1.5 border transition-all ${
                  showCalipers
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-white/[0.04] text-slate-300 border-white/10 hover:text-white'
                }`}
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>Calipers</span>
              </button>

              {/* Save Snapshot */}
              <button
                onClick={handleSaveCapture}
                disabled={isSaved}
                className="px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/10 text-slate-200 border border-white/10 text-[12px] font-[700] flex items-center gap-1.5"
              >
                {isSaved ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Bookmark className="w-3.5 h-3.5 text-blue-400" />}
                <span>{isSaved ? 'Captured' : 'Save Capture'}</span>
              </button>

              <button
                onClick={stopStream}
                className="p-1.5 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30"
                title="Disconnect stream"
              >
                <VideoOff className="w-3.5 h-3.5" />
              </button>
            </>
          )}
        </div>
      </div>

      {streamError && (
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[12px] text-amber-300 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
          <span>{streamError}</span>
        </div>
      )}

      {/* ─── Main Viewport & Video / Canvas Area ─── */}
      <div className="relative aspect-[16/10] bg-black rounded-2xl border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center">
        {/* Hidden HTML5 video element for hardware capture stream */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={isSimulationMode ? 'hidden' : 'w-full h-full object-contain'}
        />

        {/* Real-time rendering canvas */}
        <canvas
          ref={canvasRef}
          width={640}
          height={400}
          className={`w-full h-full object-contain ${!isSimulationMode && !isFrozen ? 'hidden' : ''}`}
        />

        {/* Not connected placeholder */}
        {!isStreaming && !isSimulationMode && (
          <div className="flex flex-col items-center justify-center text-center p-6 space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400">
              <Camera className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-[16px] font-[800] text-slate-200">No Video Signal</h4>
              <p className="text-[12px] text-slate-400 max-w-sm mt-1">
                Connect your USB ultrasound probe, video capture card, or launch simulated ultrasound mode.
              </p>
            </div>
            <button
              onClick={() => startStream()}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-[800] text-[13px] shadow-lg shadow-blue-900/40"
            >
              Start Probe Video
            </button>
          </div>
        )}

        {/* On-Screen Ultrasound Telemetry Overlay */}
        {isStreaming && (
          <div className="absolute top-3 left-3 text-[10px] font-mono text-cyan-300 bg-black/60 px-2.5 py-1.5 rounded-lg border border-white/10 pointer-events-none space-y-0.5">
            <div>PROBE: {isSimulationMode ? 'SIMULATED CURVILINEAR' : 'UVC VIDEO 30FPS'}</div>
            <div>DEPTH: {depthScaleCm} CM • GAIN: {gainDb} DB</div>
            <div>MI: 0.9 • TIS: 0.2</div>
          </div>
        )}

        {/* Calipers Overlay on top of live/frozen frame */}
        {showCalipers && isStreaming && (
          <div className="absolute inset-0">
            <POCUSCalipersOverlay
              depthScaleCm={depthScaleCm}
              onSaveMeasurement={(m) => {
                console.log('Saved caliper:', m);
              }}
            />
          </div>
        )}
      </div>

      {/* ─── Cine Buffer Scrubber (Visible when frozen) ─── */}
      {isFrozen && cineBuffer.length > 0 && (
        <div className="p-3.5 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-cyan-300">
            <span>CINE MEMORY SCRUBBER: FRAME {cineIndex + 1} / {cineBuffer.length}</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleCineScrub(Math.max(0, cineIndex - 1))}
                className="p-1 rounded bg-white/5 hover:bg-white/10 text-cyan-200"
                title="Step 1 frame back"
              >
                <SkipBack className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleCineScrub(Math.min(cineBuffer.length - 1, cineIndex + 1))}
                className="p-1 rounded bg-white/5 hover:bg-white/10 text-cyan-200"
                title="Step 1 frame forward"
              >
                <SkipForward className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <input
            type="range"
            min="0"
            max={cineBuffer.length - 1}
            value={cineIndex}
            onChange={(e) => handleCineScrub(Number(e.target.value))}
            className="w-full accent-cyan-400 cursor-pointer"
          />
        </div>
      )}

      {/* ─── Depth & Gain Controls ─── */}
      <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-wrap items-center justify-between gap-4 text-[12px]">
        <div className="flex items-center gap-3">
          <span className="font-[700] text-slate-300">Depth Scale:</span>
          {[5, 10, 15, 20].map((d) => (
            <button
              key={d}
              onClick={() => setDepthScaleCm(d)}
              className={`px-2 py-1 rounded-lg font-mono text-[11px] border ${
                depthScaleCm === d
                  ? 'bg-blue-600 text-white border-blue-500'
                  : 'bg-white/[0.04] text-slate-400 border-white/10'
              }`}
            >
              {d} cm
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="font-[700] text-slate-300">Gain:</span>
          <input
            type="range"
            min="30"
            max="90"
            value={gainDb}
            onChange={(e) => setGainDb(Number(e.target.value))}
            className="w-24 accent-blue-500 cursor-pointer"
          />
          <span className="font-mono text-[11px] text-blue-400">{gainDb} dB</span>
        </div>
      </div>
    </div>
  );
}
