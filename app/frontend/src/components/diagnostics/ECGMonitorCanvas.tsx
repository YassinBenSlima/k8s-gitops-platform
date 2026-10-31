/**
 * ECGMonitorCanvas
 * High-performance real-time ECG display using the "oscilloscope sweep" technique:
 *   • A write-head advances left → right across the canvas at 25 mm/s (paper speed)
 *   • A small erase window slightly ahead of the write-head clears old data
 *   • Incoming ECGSamples are stored in a ring buffer and rendered frame-by-frame
 *   • When no hardware is connected the component falls back to the PQRST simulator
 */

import React, { useRef, useEffect, useCallback, useState } from 'react';
import { ECGSample, ECGLeads } from '../../services/hardwareService';
import {
  ActivityIcon,
  MaximizeIcon,
  MinimizeIcon,
  ZapIcon,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type LeadKey = keyof ECGLeads;

const ALL_LEADS: LeadKey[] = [
  'I', 'II', 'III', 'aVR', 'aVL', 'aVF',
  'V1', 'V2', 'V3', 'V4', 'V5', 'V6',
];

interface ECGMonitorCanvasProps {
  /** Sample buffer from useECGHardware (newest last). */
  sampleBuffer: ECGSample[];
  /** Latest sample for live vitals display. */
  latestSample: ECGSample | null;
  /** Which lead to display in the main (large) channel. */
  selectedLead: LeadKey;
  onLeadChange: (lead: LeadKey) => void;
  /** Whether there is an active streaming device. */
  isStreaming: boolean;
  /** Canvas height in pixels (default 160). */
  height?: number;
}

// ─── Canvas constants ─────────────────────────────────────────────────────────

const PAPER_SPEED_PX_PER_MS = 0.625;   // 25 mm/s → 0.625 px/ms (assumes 1 px = 0.04 mm)
const SAMPLE_RATE_HZ = 250;
const PX_PER_SAMPLE = (PAPER_SPEED_PX_PER_MS * 1000) / SAMPLE_RATE_HZ; // px per sample
const ERASE_WINDOW_PX = 18;           // blank "cursor" ahead of write-head
const GRID_SMALL_PX = 10;             // 1 mm
const GRID_LARGE_PX = 50;             // 5 mm (standard ECG major grid)
const MV_TO_PX = 60;                  // 1 mV → 60 px  (10 mm/mV standard)
const GRID_COLOR_MINOR = 'rgba(239,68,68,0.07)';
const GRID_COLOR_MAJOR = 'rgba(239,68,68,0.18)';
const ECG_COLOR = '#ef4444';
const ECG_GLOW = 'rgba(239,68,68,0.55)';
const BG_COLOR = '#0c1221';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function drawGrid(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.lineWidth = 0.5;
  ctx.strokeStyle = GRID_COLOR_MINOR;
  for (let x = 0; x < w; x += GRID_SMALL_PX) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
  }
  for (let y = 0; y < h; y += GRID_SMALL_PX) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
  }
  ctx.lineWidth = 1;
  ctx.strokeStyle = GRID_COLOR_MAJOR;
  for (let x = 0; x < w; x += GRID_LARGE_PX) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
  }
  for (let y = 0; y < h; y += GRID_LARGE_PX) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
  }
}

// ─── Main canvas hook ─────────────────────────────────────────────────────────

function useSweepCanvas(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  sampleBuffer: ECGSample[],
  selectedLead: LeadKey,
  isStreaming: boolean,
  height: number
) {
  const writeXRef = useRef(0);
  const lastRenderedIdxRef = useRef(-1);
  const rafRef = useRef<number>(0);
  const offscreenRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const W = canvas.width;
    const H = height;
    const mid = H / 2;

    // Offscreen buffer: preserves the drawn waveform across frames
    if (!offscreenRef.current || offscreenRef.current.width !== W) {
      offscreenRef.current = document.createElement('canvas');
      offscreenRef.current.width = W;
      offscreenRef.current.height = H;
      const offCtx = offscreenRef.current.getContext('2d')!;
      offCtx.fillStyle = BG_COLOR;
      offCtx.fillRect(0, 0, W, H);
    }
    const offscreen = offscreenRef.current;
    const offCtx = offscreen.getContext('2d')!;
    const ctx = canvas.getContext('2d')!;

    let prevX = writeXRef.current;
    let prevY = mid;

    const render = () => {
      const buf = sampleBuffer;

      // How many new samples arrived since last render?
      const startIdx = lastRenderedIdxRef.current + 1;
      const newSamples = buf.slice(startIdx);

      if (newSamples.length > 0 || isStreaming) {
        // Draw new samples onto offscreen buffer
        offCtx.strokeStyle = ECG_COLOR;
        offCtx.lineWidth = 1.8;
        offCtx.shadowColor = ECG_GLOW;
        offCtx.shadowBlur = 3;

        for (const sample of newSamples) {
          const amplitude = sample.leads[selectedLead] ?? 0;
          const y = mid - amplitude * MV_TO_PX;
          const x = writeXRef.current;

          // Erase window just ahead of write head
          const eraseX = (x + ERASE_WINDOW_PX) % W;
          offCtx.fillStyle = BG_COLOR;
          if (eraseX < W - ERASE_WINDOW_PX) {
            offCtx.fillRect(eraseX, 0, ERASE_WINDOW_PX + 2, H);
          } else {
            offCtx.fillRect(eraseX, 0, W - eraseX, H);
            offCtx.fillRect(0, 0, (eraseX + ERASE_WINDOW_PX + 2) % W, H);
          }

          // Draw segment from previous point
          offCtx.beginPath();
          if (x < prevX) {
            // Wrapped: lift pen
            offCtx.moveTo(x, y);
          } else {
            offCtx.moveTo(prevX, prevY);
            offCtx.lineTo(x, y);
          }
          offCtx.stroke();

          prevX = x;
          prevY = y;
          writeXRef.current = (x + PX_PER_SAMPLE) % W;
        }

        offCtx.shadowBlur = 0;
        lastRenderedIdxRef.current = buf.length - 1;
      }

      // ── Compose final frame ──
      ctx.clearRect(0, 0, W, H);

      // Background
      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, W, H);

      // Grid (drawn over background, under waveform)
      drawGrid(ctx, W, H);

      // Blit offscreen waveform
      ctx.drawImage(offscreen, 0, 0);

      // Write-head cursor (thin vertical line)
      const wx = writeXRef.current;
      const grad = ctx.createLinearGradient(wx - 2, 0, wx + 4, 0);
      grad.addColorStop(0, 'rgba(239,68,68,0)');
      grad.addColorStop(0.5, 'rgba(239,68,68,0.8)');
      grad.addColorStop(1, 'rgba(239,68,68,0)');
      ctx.strokeStyle = grad;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(wx, 0);
      ctx.lineTo(wx, H);
      ctx.stroke();

      rafRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLead, isStreaming, height]);

  // Reset buffer pointer when lead changes
  useEffect(() => {
    writeXRef.current = 0;
    lastRenderedIdxRef.current = -1;
    if (offscreenRef.current) {
      const ctx = offscreenRef.current.getContext('2d')!;
      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, offscreenRef.current.width, offscreenRef.current.height);
    }
  }, [selectedLead]);
}

// ─── Mini lead canvas (12-lead grid) ─────────────────────────────────────────

function MiniLeadCanvas({
  sampleBuffer,
  lead,
  isSelected,
  onClick,
}: {
  sampleBuffer: ECGSample[];
  lead: LeadKey;
  isSelected: boolean;
  onClick: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;
    const mid = H / 2;

    ctx.fillStyle = '#0c1221';
    ctx.fillRect(0, 0, W, H);

    // Mini grid
    ctx.strokeStyle = 'rgba(239,68,68,0.1)';
    ctx.lineWidth = 0.5;
    for (let x = 0; x < W; x += 10) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let y = 0; y < H; y += 10) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }

    // Draw last N samples to fill the mini canvas
    const displaySamples = Math.floor(W / (PX_PER_SAMPLE * 0.5));
    const slice = sampleBuffer.slice(-displaySamples);
    if (slice.length < 2) return;

    ctx.strokeStyle = isSelected ? '#f87171' : '#ef4444';
    ctx.lineWidth = 1.2;
    ctx.shadowColor = 'rgba(239,68,68,0.4)';
    ctx.shadowBlur = 2;
    ctx.beginPath();

    const scale = 0.5; // mini scale
    for (let i = 0; i < slice.length; i++) {
      const x = (i / slice.length) * W;
      const amp = slice[i].leads[lead] ?? 0;
      const y = mid - amp * MV_TO_PX * scale;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;
  });

  return (
    <button
      onClick={onClick}
      className={`relative rounded-lg overflow-hidden transition-all border ${
        isSelected
          ? 'border-red-500 ring-1 ring-red-400 shadow-lg shadow-red-900/30'
          : 'border-gray-700 hover:border-gray-500'
      }`}
    >
      <canvas
        ref={canvasRef}
        width={100}
        height={40}
        className="w-full h-10 block"
      />
      <span className="absolute top-0.5 left-1 text-[9px] text-gray-400 font-mono">
        {lead}
      </span>
      {isSelected && (
        <span className="absolute top-0.5 right-1 w-1.5 h-1.5 bg-red-500 rounded-full" />
      )}
    </button>
  );
}

// ─── ECGMonitorCanvas component ───────────────────────────────────────────────

export function ECGMonitorCanvas({
  sampleBuffer,
  latestSample,
  selectedLead,
  onLeadChange,
  isStreaming,
  height = 160,
}: ECGMonitorCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useSweepCanvas(canvasRef, sampleBuffer, selectedLead, isStreaming, height);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen((v) => !v);
  }, []);

  const displayHeight = isFullscreen ? 280 : height;

  return (
    <div
      className={`flex flex-col gap-2 ${
        isFullscreen
          ? 'fixed inset-0 z-50 bg-gray-950 p-4 overflow-auto'
          : ''
      }`}
    >
      {/* ── Main ECG canvas ── */}
      <div className="bg-gray-950 rounded-xl border border-gray-700 overflow-hidden shadow-xl">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-gray-800">
          {/* Left: status + lead selector */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              {isStreaming ? (
                <>
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-semibold text-red-400">
                    LIVE
                  </span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 bg-gray-600 rounded-full" />
                  <span className="text-[10px] text-gray-500">
                    En attente…
                  </span>
                </>
              )}
            </div>
            <span className="text-gray-700">|</span>
            {/* Lead selector */}
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-gray-500">Dérivation :</span>
              <select
                value={selectedLead}
                onChange={(e) => onLeadChange(e.target.value as LeadKey)}
                className="bg-gray-800 text-gray-200 text-[10px] font-mono border border-gray-700 rounded px-1.5 py-0.5 focus:outline-none focus:ring-1 focus:ring-red-500"
              >
                {ALL_LEADS.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
            <span className="text-gray-700 hidden sm:block">|</span>
            <span className="text-[10px] text-gray-500 hidden sm:block">
              25 mm/s · 10 mm/mV
            </span>
          </div>

          {/* Right: live vitals + controls */}
          <div className="flex items-center gap-3">
            {latestSample && isStreaming && (
              <>
                <Vital label="FC" value={latestSample.heartRate} unit="bpm" />
                <Vital label="PR" value={latestSample.prMs} unit="ms" />
                <Vital label="QRS" value={latestSample.qrsMs} unit="ms" />
                <Vital label="QTc" value={latestSample.qtcMs} unit="ms" />
                <span className="flex items-center gap-0.5 text-[10px] text-emerald-400">
                  <ZapIcon className="w-2.5 h-2.5" />
                  {latestSample.signalQuality}%
                </span>
              </>
            )}
            <button
              onClick={toggleFullscreen}
              className="p-1 rounded bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
              title={isFullscreen ? 'Réduire' : 'Plein écran'}
            >
              {isFullscreen ? (
                <MinimizeIcon className="w-3 h-3" />
              ) : (
                <MaximizeIcon className="w-3 h-3" />
              )}
            </button>
          </div>
        </div>

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          width={1200}
          height={displayHeight}
          className="w-full block"
          style={{ height: displayHeight, background: BG_COLOR }}
        />

        {/* Scale legend */}
        <div className="flex items-center gap-4 px-3 py-1 border-t border-gray-800">
          <span className="text-[10px] text-gray-500">
            Vitesse papier: 25 mm/s
          </span>
          <span className="text-[9px] text-gray-600">·</span>
          <span className="text-[10px] text-gray-500">
            Amplitude: 10 mm/mV
          </span>
          <span className="text-[9px] text-gray-600">·</span>
          <span className="text-[10px] text-gray-500">
            Filtre: 0.05–150 Hz
          </span>
          {!isStreaming && (
            <span className="ml-auto text-[10px] text-amber-500">
              Connectez un appareil pour afficher un signal en temps réel
            </span>
          )}
        </div>
      </div>

      {/* ── 12-Lead grid ── */}
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <ActivityIcon className="w-3.5 h-3.5 text-gray-400" />
          <h3 className="text-xs font-semibold text-gray-700">
            ECG 12 Dérivations
          </h3>
          {isStreaming && (
            <span className="text-[10px] text-gray-400 ml-1">
              (cliquez pour sélectionner)
            </span>
          )}
        </div>
        <div className="grid grid-cols-6 gap-1.5">
          {ALL_LEADS.map((lead) => (
            <MiniLeadCanvas
              key={lead}
              sampleBuffer={sampleBuffer}
              lead={lead}
              isSelected={lead === selectedLead}
              onClick={() => onLeadChange(lead)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Small vital display helper ───────────────────────────────────────────────

function Vital({
  label,
  value,
  unit,
}: {
  label: string;
  value: number;
  unit: string;
}) {
  return (
    <span className="flex items-baseline gap-0.5">
      <span className="text-[9px] text-gray-500">{label}</span>
      <span className="text-[11px] font-bold text-gray-200">{value}</span>
      <span className="text-[9px] text-gray-500">{unit}</span>
    </span>
  );
}
