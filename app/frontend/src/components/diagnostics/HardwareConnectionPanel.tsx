import React, { useState } from 'react';
import {
  Wifi,
  Bluetooth,
  Usb,
  Cpu,
  CheckCircle2,
  Loader2,
  XCircle,
  Signal,
  SignalZero,
  ChevronDown,
  ChevronUp,
  Info,
} from 'lucide-react';
import { DeviceStatus } from '../../hooks/useECGHardware';
import { DeviceProtocol, ConnectionState } from '../../services/hardwareService';

interface HardwareConnectionPanelProps {
  deviceStatuses: DeviceStatus[];
  connectedDevice?: DeviceStatus;
  latestHeartRate?: number;
  isStreaming: boolean;
  simulatedHeartRate: number;
  onConnect: (deviceId: string) => void;
  onDisconnect: (deviceId: string) => void;
  onSimHeartRateChange: (bpm: number) => void;
}

// ─── Protocol config ──────────────────────────────────────────────────────────

const PROTO_ICON: Record<DeviceProtocol, React.ReactNode> = {
  'usb-serial': <Usb className="w-3 h-3" />,
  bluetooth: <Bluetooth className="w-3 h-3" />,
  wifi: <Wifi className="w-3 h-3" />,
  simulation: <Cpu className="w-3 h-3" />,
};

const PROTO_LABEL: Record<DeviceProtocol, string> = {
  'usb-serial': 'USB',
  bluetooth: 'Bluetooth',
  wifi: 'Wi-Fi',
  simulation: 'Simulation',
};

const PROTO_COLOR: Record<DeviceProtocol, string> = {
  'usb-serial': 'bg-blue-100 text-blue-700 border-blue-200',
  bluetooth: 'bg-purple-100 text-purple-700 border-purple-200',
  wifi: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  simulation: 'bg-gray-100 text-gray-600 border-gray-200',
};

// ─── State indicator ──────────────────────────────────────────────────────────

function StateChip({ state }: { state: ConnectionState }) {
  if (state === 'streaming')
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-green-600">
        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
        En cours
      </span>
    );
  if (state === 'connected')
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600">
        <CheckCircle2 className="w-3 h-3" />
        Connecté
      </span>
    );
  if (state === 'connecting')
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-blue-600">
        <Loader2 className="w-3 h-3 animate-spin" />
        Connexion…
      </span>
    );
  if (state === 'error')
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-red-600">
        <XCircle className="w-3 h-3" />
        Erreur
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 text-[10px] text-gray-400">
      <span className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
      Déconnecté
    </span>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function HardwareConnectionPanel({
  deviceStatuses,
  connectedDevice,
  latestHeartRate,
  isStreaming,
  simulatedHeartRate,
  onConnect,
  onDisconnect,
  onSimHeartRateChange,
}: HardwareConnectionPanelProps) {
  const [expanded, setExpanded] = useState(true);
  const [showSimControls, setShowSimControls] = useState(false);

  const isActive = (s: ConnectionState) =>
    s === 'connected' || s === 'streaming';

  // Separate simulation entry from real hardware
  const realDevices = deviceStatuses.filter(
    (ds) => ds.device.protocol !== 'simulation'
  );
  const simEntry = deviceStatuses.find(
    (ds) => ds.device.protocol === 'simulation'
  );

  const webSerialSupported = 'serial' in navigator;
  const webBluetoothSupported = 'bluetooth' in navigator;

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      {/* ── Header ── */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between px-3 py-2.5 bg-gradient-to-r from-slate-900 to-slate-800 text-white hover:from-slate-800 hover:to-slate-700 transition-colors"
      >
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-red-600 rounded-md flex items-center justify-center flex-shrink-0">
            {isStreaming ? (
              <Signal className="w-3.5 h-3.5" />
            ) : (
              <SignalZero className="w-3.5 h-3.5" />
            )}
          </div>
          <div className="text-left">
            <p className="text-xs font-semibold leading-tight">
              Connexion Appareil ECG
            </p>
            <p className="text-[10px] text-slate-400 leading-tight">
              {connectedDevice
                ? `${connectedDevice.device.name} · ${connectedDevice.device.leads} dérivations · ${connectedDevice.device.sampleRateHz} Hz`
                : 'Aucun appareil connecté — sélectionnez une source ci-dessous'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Live HR badge when streaming */}
          {isStreaming && latestHeartRate && (
            <div className="flex items-center gap-1 bg-red-600 bg-opacity-25 border border-red-400 border-opacity-40 rounded-lg px-2 py-0.5">
              <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
              <span className="text-sm font-bold text-red-300">
                {latestHeartRate}
              </span>
              <span className="text-[10px] text-red-400">bpm</span>
            </div>
          )}
          {expanded ? (
            <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          )}
        </div>
      </button>

      {/* ── Collapsible body ── */}
      {expanded && (
        <>
          {/* Real hardware section */}
          <div className="px-3 pt-2.5 pb-1">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
              Appareils Physiques
            </p>
            <div className="space-y-1.5">
              {realDevices.map(({ device, state, error }) => (
                <div
                  key={device.id}
                  className={`rounded-lg border p-2.5 transition-all ${
                    isActive(state)
                      ? 'border-green-300 bg-green-50'
                      : state === 'error'
                      ? 'border-red-200 bg-red-50'
                      : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    {/* Device info */}
                    <div className="flex items-start gap-2 min-w-0">
                      {/* Protocol badge */}
                      <span
                        className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded border text-[10px] font-medium flex-shrink-0 mt-0.5 ${PROTO_COLOR[device.protocol]}`}
                      >
                        {PROTO_ICON[device.protocol]}
                        {PROTO_LABEL[device.protocol]}
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-gray-900 leading-tight">
                          {device.name}
                        </p>
                        <p className="text-[10px] text-gray-500 truncate">
                          {device.manufacturer} &nbsp;·&nbsp;{' '}
                          {device.leads} dér. &nbsp;·&nbsp; {device.sampleRateHz} Hz
                        </p>
                        {device.protocol === 'wifi' && (
                          <p className="text-[10px] text-gray-400">
                            {device.networkHost}:{device.networkPort}
                          </p>
                        )}
                        {error && (
                          <p className="text-[10px] text-red-500 mt-0.5">{error}</p>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <StateChip state={state} />
                      {state === 'connecting' ? null : isActive(state) ? (
                        <button
                          onClick={() => onDisconnect(device.id)}
                          className="px-2 py-0.5 text-[10px] font-medium text-red-600 border border-red-200 rounded-md hover:bg-red-50 transition-colors"
                        >
                          Déconnecter
                        </button>
                      ) : (
                        <button
                          onClick={() => onConnect(device.id)}
                          className="px-2 py-0.5 text-[10px] font-medium text-white bg-slate-700 rounded-md hover:bg-slate-900 transition-colors"
                        >
                          Connecter
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="mx-3 my-2 border-t border-gray-100" />

          {/* Simulation section */}
          {simEntry && (
            <div className="px-3 pb-2.5">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
                Source de Démonstration
              </p>
              <div
                className={`rounded-lg border p-2.5 transition-all ${
                  isActive(simEntry.state)
                    ? 'border-green-300 bg-green-50'
                    : 'border-dashed border-gray-300 bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded border text-[10px] font-medium ${PROTO_COLOR['simulation']}`}
                    >
                      <Cpu className="w-3 h-3" />
                      Simulation
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-gray-900">
                        Mode Simulation
                      </p>
                      <p className="text-[10px] text-gray-500">
                        Signal PQRST synthétique · 12 dér. · 250 Hz
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <StateChip state={simEntry.state} />
                    {simEntry.state === 'connecting' ? null : isActive(simEntry.state) ? (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setShowSimControls((v) => !v)}
                          className="px-2 py-0.5 text-[10px] font-medium text-gray-600 border border-gray-200 rounded-md hover:bg-gray-100"
                        >
                          Paramètres
                        </button>
                        <button
                          onClick={() => onDisconnect(simEntry.device.id)}
                          className="px-2 py-0.5 text-[10px] font-medium text-red-600 border border-red-200 rounded-md hover:bg-red-50"
                        >
                          Arrêter
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => onConnect(simEntry.device.id)}
                        className="px-2 py-0.5 text-[10px] font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                      >
                        Démarrer
                      </button>
                    )}
                  </div>
                </div>

                {/* Simulation sliders */}
                {showSimControls && isActive(simEntry.state) && (
                  <div className="mt-2.5 pt-2 border-t border-green-200">
                    <div className="flex items-center gap-3">
                      <label className="text-[10px] text-gray-600 font-medium whitespace-nowrap">
                        FC simulée
                      </label>
                      <input
                        type="range"
                        min={40}
                        max={180}
                        value={simulatedHeartRate}
                        onChange={(e) =>
                          onSimHeartRateChange(Number(e.target.value))
                        }
                        className="flex-1 h-1 accent-red-600"
                      />
                      <span className="text-[10px] font-bold text-red-600 w-14 text-right">
                        {simulatedHeartRate} bpm
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── API support footer ── */}
          <div className="flex items-center gap-3 px-3 py-2 bg-gray-50 border-t border-gray-100">
            <span className="flex items-center gap-1">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  webSerialSupported ? 'bg-green-500' : 'bg-gray-300'
                }`}
              />
              <span className="text-[10px] text-gray-500">
                Web Serial {webSerialSupported ? '✓' : '✗'}
              </span>
            </span>
            <span className="flex items-center gap-1">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  webBluetoothSupported ? 'bg-green-500' : 'bg-gray-300'
                }`}
              />
              <span className="text-[10px] text-gray-500">
                Bluetooth {webBluetoothSupported ? '✓' : '✗'}
              </span>
            </span>
            <span className="flex items-center gap-1 ml-auto text-[10px] text-gray-400">
              <Info className="w-3 h-3" />
              USB / BT requis Chrome / Edge
            </span>
          </div>
        </>
      )}
    </div>
  );
}
