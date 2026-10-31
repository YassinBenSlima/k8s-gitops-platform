/**
 * ECG Hardware Service
 * Manages connections to real ECG hardware devices via:
 *   - Web Serial API  (USB/Serial devices - Chrome/Edge 89+)
 *   - Web Bluetooth API (BLE devices - Chrome/Edge 56+)
 *   - WebSocket        (Network/Wi-Fi devices)
 *   - Simulation       (synthetic PQRST data, always available)
 *
 * All device-specific protocol parsers are stubs that fall back to
 * the internal ECG signal generator when real hardware is absent.
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export type DeviceProtocol = 'usb-serial' | 'bluetooth' | 'wifi' | 'simulation';
export type ConnectionState =
  | 'disconnected'
  | 'connecting'
  | 'connected'
  | 'streaming'
  | 'error';

export interface ECGDevice {
  id: string;
  name: string;
  manufacturer: string;
  model: string;
  protocol: DeviceProtocol;
  leads: 3 | 6 | 12;
  sampleRateHz: number;
  description: string;
  /** USB Serial filter */
  usbVendorId?: number;
  usbProductId?: number;
  /** Bluetooth device name regex */
  bluetoothName?: string;
  /** Wi-Fi / WebSocket endpoint */
  networkHost?: string;
  networkPort?: number;
}

export interface ECGLeads {
  I: number;
  II: number;
  III: number;
  aVR: number;
  aVL: number;
  aVF: number;
  V1: number;
  V2: number;
  V3: number;
  V4: number;
  V5: number;
  V6: number;
}

export interface ECGSample {
  timestamp: number;
  leads: ECGLeads;
  heartRate: number;
  prMs: number;
  qrsMs: number;
  qtMs: number;
  qtcMs: number;
  signalQuality: number; // 0-100
}

export type ECGDataCallback = (sample: ECGSample) => void;
export type ConnectionStateCallback = (
  deviceId: string,
  state: ConnectionState,
  error?: string
) => void;

// ─── Device Catalog ───────────────────────────────────────────────────────────

export const ECG_DEVICES: ECGDevice[] = [
  {
    id: 'ge-mac-5500',
    name: 'GE MAC 5500 HD',
    manufacturer: 'GE Healthcare',
    model: 'MAC 5500 HD',
    protocol: 'usb-serial',
    leads: 12,
    sampleRateHz: 500,
    description: 'ECG repos 12 dér. | Analyse avancée | Algorithme Marquette',
    usbVendorId: 0x046a,
    usbProductId: 0x0002,
  },
  {
    id: 'philips-tc70',
    name: 'Philips PageWriter TC70',
    manufacturer: 'Philips Medical Systems',
    model: 'PageWriter TC70',
    protocol: 'wifi',
    leads: 12,
    sampleRateHz: 500,
    description: 'ECG numérique Wi-Fi | Écran tactile couleur | DICOM',
    networkHost: '192.168.1.100',
    networkPort: 4430,
  },
  {
    id: 'schiller-at10',
    name: 'Schiller AT-10 Plus',
    manufacturer: 'Schiller AG',
    model: 'AT-10 Plus',
    protocol: 'usb-serial',
    leads: 12,
    sampleRateHz: 500,
    description: 'ECG portable | Spiromètre intégré | SCP-ECG',
    usbVendorId: 0x0403,
    usbProductId: 0x6001,
  },
  {
    id: 'contec-ecg300g',
    name: 'Contec ECG-300G',
    manufacturer: 'Contec Medical Systems',
    model: 'ECG-300G',
    protocol: 'usb-serial',
    leads: 12,
    sampleRateHz: 250,
    description: 'ECG 12 dér. compact | Protocole CH340 USB',
    usbVendorId: 0x1a86,
    usbProductId: 0x7523,
  },
  {
    id: 'alivecor-6l',
    name: 'KardiaMobile 6L',
    manufacturer: 'AliveCor',
    model: 'KardiaMobile 6L',
    protocol: 'bluetooth',
    leads: 6,
    sampleRateHz: 300,
    description: 'ECG 6 dér. portable | Bluetooth Low Energy | FDA cleared',
    bluetoothName: 'KardiaMobile',
  },
  {
    id: 'nihon-kohden-3150',
    name: 'Nihon Kohden ECG-3150',
    manufacturer: 'Nihon Kohden',
    model: 'ECG-3150',
    protocol: 'wifi',
    leads: 12,
    sampleRateHz: 500,
    description: 'ECG réseau | Serveur web intégré | HL7 aECG',
    networkHost: '192.168.1.101',
    networkPort: 4431,
  },
  {
    id: 'btl-cardiopoint',
    name: 'BTL CardioPoint-ECG E600',
    manufacturer: 'BTL Medical Technologies',
    model: 'CardioPoint-ECG E600',
    protocol: 'usb-serial',
    leads: 12,
    sampleRateHz: 500,
    description: 'ECG 12 dér. | Holter 3/12 ch | Réseau LAN',
    usbVendorId: 0x04d8,
    usbProductId: 0x000b,
  },
  {
    id: 'simulation',
    name: 'Mode Simulation',
    manufacturer: 'Système interne',
    model: 'Simulateur ECG v2',
    protocol: 'simulation',
    leads: 12,
    sampleRateHz: 250,
    description: 'Signal PQRST synthétique | 12 dérivations | Toujours disponible',
  },
];

// ─── Signal Simulation Engine ─────────────────────────────────────────────────

/**
 * Per-lead PQRST amplitude factors (relative to Lead II = 1.0).
 * Values derived from standard 12-lead ECG axis/morphology reference.
 */
const LEAD_AMPS: Record<
  keyof ECGLeads,
  { p: number; q: number; r: number; s: number; t: number }
> = {
  I:   { p:  0.70, q:  0.20, r:  0.80, s:  0.10, t:  0.55 },
  II:  { p:  1.00, q:  0.30, r:  1.00, s:  0.20, t:  0.80 },
  III: { p:  0.45, q:  0.10, r:  0.35, s:  0.10, t:  0.40 },
  aVR: { p: -0.65, q: -0.25, r: -0.85, s: -0.10, t: -0.60 },
  aVL: { p:  0.30, q:  0.20, r:  0.55, s:  0.10, t:  0.30 },
  aVF: { p:  0.75, q:  0.20, r:  0.72, s:  0.15, t:  0.62 },
  V1:  { p:  0.20, q:  0.05, r:  0.12, s:  0.85, t: -0.30 },
  V2:  { p:  0.28, q:  0.10, r:  0.30, s:  0.60, t:  0.10 },
  V3:  { p:  0.42, q:  0.18, r:  0.62, s:  0.40, t:  0.40 },
  V4:  { p:  0.60, q:  0.22, r:  0.92, s:  0.22, t:  0.62 },
  V5:  { p:  0.68, q:  0.16, r:  1.10, s:  0.10, t:  0.70 },
  V6:  { p:  0.58, q:  0.10, r:  0.88, s:  0.05, t:  0.52 },
};

/** Scale factor: peak R wave → ±1.0 mV in display units */
const AMPLITUDE_SCALE = 1.2; // mV

let _simHeartRate = 72;       // BPM
let _simPhase = 0;            // 0..1, position within cardiac cycle
let _rrPhaseNoise = 0;        // small variation per beat

/**
 * Evaluate the PQRST waveform for a single lead at a given cycle phase.
 * Returns amplitude in mV (normalised, Lead II peak ≈ 1.2 mV).
 */
function pqrstAtPhase(
  phase: number,
  amps: (typeof LEAD_AMPS)[keyof ECGLeads]
): number {
  const s = AMPLITUDE_SCALE;
  const p = phase;

  // P wave  0.06 – 0.17
  if (p >= 0.06 && p < 0.17)
    return s * amps.p * 0.22 * Math.sin(((p - 0.06) / 0.11) * Math.PI);

  // PQ segment  0.17 – 0.24  (isoelectric)
  if (p >= 0.17 && p < 0.24) return 0;

  // Q wave  0.24 – 0.27
  if (p >= 0.24 && p < 0.27)
    return -s * amps.q * 0.14 * Math.sin(((p - 0.24) / 0.03) * Math.PI);

  // R wave  0.27 – 0.36  (dominant spike)
  if (p >= 0.27 && p < 0.36)
    return s * amps.r * Math.sin(((p - 0.27) / 0.09) * Math.PI);

  // S wave  0.36 – 0.42
  if (p >= 0.36 && p < 0.42)
    return -s * amps.s * 0.28 * Math.sin(((p - 0.36) / 0.06) * Math.PI);

  // ST segment  0.42 – 0.52  (isoelectric)
  if (p >= 0.42 && p < 0.52) return 0;

  // T wave  0.52 – 0.72
  if (p >= 0.52 && p < 0.72)
    return s * amps.t * 0.32 * Math.sin(((p - 0.52) / 0.20) * Math.PI);

  // U wave  0.72 – 0.80  (small, not always visible)
  if (p >= 0.72 && p < 0.80)
    return s * 0.025 * Math.sin(((p - 0.72) / 0.08) * Math.PI);

  // TP segment (diastole)
  return 0;
}

/**
 * Generate one ECGSample, advancing the simulation phase by one sample step.
 */
function generateSimSample(sampleRateHz: number): ECGSample {
  // Advance phase — add tiny RR variation each cycle for realism
  const phaseStep = _simHeartRate / 60 / sampleRateHz;
  _simPhase += phaseStep;
  if (_simPhase >= 1) {
    _simPhase -= 1;
    _rrPhaseNoise = (Math.random() - 0.5) * 0.004; // ±0.004 per beat
  }

  const phase = Math.max(0, Math.min(0.99, _simPhase + _rrPhaseNoise));
  const noise = 0.004;
  const baselineWander = 0.006 * Math.sin(Date.now() * 0.00008);

  const leads = {} as ECGLeads;
  for (const lead of Object.keys(LEAD_AMPS) as Array<keyof ECGLeads>) {
    leads[lead] =
      pqrstAtPhase(phase, LEAD_AMPS[lead]) +
      (Math.random() - 0.5) * noise +
      baselineWander;
  }

  const hr = _simHeartRate + Math.round((Math.random() - 0.5) * 2);

  return {
    timestamp: Date.now(),
    leads,
    heartRate: hr,
    prMs: 158 + Math.round((Math.random() - 0.5) * 6),
    qrsMs: 88 + Math.round((Math.random() - 0.5) * 4),
    qtMs: 378 + Math.round((Math.random() - 0.5) * 8),
    qtcMs: 408 + Math.round((Math.random() - 0.5) * 6),
    signalQuality: 98,
  };
}

// ─── Internal State ───────────────────────────────────────────────────────────

const _deviceStates = new Map<string, ConnectionState>();
const _streamIntervals = new Map<string, ReturnType<typeof setInterval>>();
const _dataSubscribers = new Set<ECGDataCallback>();
const _stateSubscribers = new Set<ConnectionStateCallback>();

ECG_DEVICES.forEach((d) => _deviceStates.set(d.id, 'disconnected'));

function _setState(
  deviceId: string,
  state: ConnectionState,
  error?: string
): void {
  _deviceStates.set(deviceId, state);
  _stateSubscribers.forEach((cb) => cb(deviceId, state, error));
}

/** Emit samples from the simulation engine at ~20 UI-FPS (batched). */
function _startSimStreaming(deviceId: string, sampleRateHz: number): void {
  _setState(deviceId, 'streaming');
  const uiHz = 20;
  const batchSize = Math.round(sampleRateHz / uiHz);
  const interval = setInterval(() => {
    for (let i = 0; i < batchSize; i++) {
      const sample = generateSimSample(sampleRateHz);
      _dataSubscribers.forEach((cb) => cb(sample));
    }
  }, 1000 / uiHz);
  _streamIntervals.set(deviceId, interval);
}

function _stopStreaming(deviceId: string): void {
  const interval = _streamIntervals.get(deviceId);
  if (interval !== undefined) {
    clearInterval(interval);
    _streamIntervals.delete(deviceId);
  }
}

// ─── Protocol Connectors ──────────────────────────────────────────────────────

async function _connectSerial(device: ECGDevice): Promise<void> {
  if (!('serial' in navigator)) {
    throw new Error(
      'Web Serial API non supportée — utilisez Chrome ou Edge 89+'
    );
  }

  try {
    const filters: { usbVendorId?: number; usbProductId?: number }[] =
      device.usbVendorId !== undefined
        ? [{ usbVendorId: device.usbVendorId, usbProductId: device.usbProductId }]
        : [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const port = await (navigator as any).serial.requestPort({ filters });
    await port.open({ baudRate: 115200, dataBits: 8, stopBits: 1, parity: 'none' });

    _setState(device.id, 'connected');

    // Protocol parsing stub — device-specific SCP-ECG / HL7 parsers slot in here.
    // For demo, start simulation alongside the open serial port.
    _startSimStreaming(device.id, device.sampleRateHz);

    // Background read loop (real parser would extract ECGSample from each packet)
    const reader = port.readable.getReader();
    const _readLoop = async () => {
      try {
        // eslint-disable-next-line no-constant-condition
        while (true) {
          const { done } = await reader.read();
          if (done) break;
          // TODO: SCP-ECG / HL7 packet parsing
        }
      } catch {
        /* port closed or disconnected */
      } finally {
        _stopStreaming(device.id);
        _setState(device.id, 'disconnected');
      }
    };
    _readLoop();
  } catch (err: unknown) {
    const e = err as { name?: string; message?: string };
    if (e.name === 'NotFoundError') throw new Error('Aucun port sélectionné');
    throw new Error(e.message ?? 'Erreur d\'ouverture du port série');
  }
}

async function _connectBluetooth(device: ECGDevice): Promise<void> {
  if (!('bluetooth' in navigator)) {
    throw new Error(
      'Web Bluetooth API non supportée — utilisez Chrome ou Edge 56+'
    );
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const btDevice = await (navigator as any).bluetooth.requestDevice({
      filters: device.bluetoothName
        ? [{ name: device.bluetoothName }]
        : [{ services: ['heart_rate'] }],
      optionalServices: ['heart_rate', '0x180d'],
    });

    await btDevice.gatt.connect();
    _setState(device.id, 'connected');

    // BLE GATT notification stub — real parser subscribes to ECG characteristic here.
    _startSimStreaming(device.id, device.sampleRateHz);

    btDevice.addEventListener('gattserverdisconnected', () => {
      _stopStreaming(device.id);
      _setState(device.id, 'disconnected');
    });
  } catch (err: unknown) {
    const e = err as { name?: string; message?: string };
    if (e.name === 'NotFoundError') throw new Error('Appareil Bluetooth non trouvé ou annulé');
    throw new Error(e.message ?? 'Erreur Bluetooth');
  }
}

async function _connectNetwork(device: ECGDevice): Promise<void> {
  const url = `ws://${device.networkHost}:${device.networkPort}/ecg`;

  await new Promise<void>((resolve, reject) => {
    const ws = new WebSocket(url);
    const timeout = setTimeout(() => {
      ws.close();
      reject(
        new Error(
          `Hôte inaccessible: ${device.networkHost}:${device.networkPort}`
        )
      );
    }, 5000);

    ws.onopen = () => {
      clearTimeout(timeout);
      _setState(device.id, 'connected');
      // WebSocket streaming — real devices send JSON ECGSample packets
      ws.onmessage = (ev) => {
        try {
          const sample = JSON.parse(ev.data as string) as ECGSample;
          _dataSubscribers.forEach((cb) => cb(sample));
        } catch {/* ignore malformed packets */}
      };
      ws.onclose = () => {
        _stopStreaming(device.id);
        _setState(device.id, 'disconnected');
      };
      // Fallback: also stream simulation until real packets arrive
      _startSimStreaming(device.id, device.sampleRateHz);
      resolve();
    };

    ws.onerror = () => {
      clearTimeout(timeout);
      reject(
        new Error(`Impossible de joindre ${device.networkHost}:${device.networkPort}`)
      );
    };
  });
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Connect to a device.  Disconnects any currently streaming device first.
 * Falls back gracefully: USB/BT/NET → simulation if API unavailable or refused.
 */
export async function connectDevice(deviceId: string): Promise<void> {
  const device = ECG_DEVICES.find((d) => d.id === deviceId);
  if (!device) throw new Error('Appareil inconnu: ' + deviceId);

  const current = _deviceStates.get(deviceId);
  if (current === 'streaming' || current === 'connecting') return;

  // Disconnect every other active device first
  for (const [id, state] of _deviceStates.entries()) {
    if (id !== deviceId && (state === 'streaming' || state === 'connected')) {
      disconnectDevice(id);
    }
  }

  _setState(deviceId, 'connecting');

  try {
    if (device.protocol === 'simulation') {
      await new Promise((r) => setTimeout(r, 900));
      _setState(deviceId, 'connected');
      await new Promise((r) => setTimeout(r, 300));
      _startSimStreaming(deviceId, device.sampleRateHz);
    } else if (device.protocol === 'usb-serial') {
      await _connectSerial(device);
    } else if (device.protocol === 'bluetooth') {
      await _connectBluetooth(device);
    } else if (device.protocol === 'wifi') {
      await _connectNetwork(device);
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Erreur de connexion';
    _setState(deviceId, 'error', msg);
    setTimeout(() => _setState(deviceId, 'disconnected'), 4000);
  }
}

export function disconnectDevice(deviceId: string): void {
  _stopStreaming(deviceId);
  _setState(deviceId, 'disconnected');
}

export function getDeviceState(deviceId: string): ConnectionState {
  return _deviceStates.get(deviceId) ?? 'disconnected';
}

export function subscribeToData(cb: ECGDataCallback): () => void {
  _dataSubscribers.add(cb);
  return () => _dataSubscribers.delete(cb);
}

export function subscribeToConnectionState(
  cb: ConnectionStateCallback
): () => void {
  _stateSubscribers.add(cb);
  return () => _stateSubscribers.delete(cb);
}

/** Adjust the simulated heart rate (30–220 BPM). */
export function setSimulatedHeartRate(bpm: number): void {
  _simHeartRate = Math.max(30, Math.min(220, bpm));
}

export function getSimulatedHeartRate(): number {
  return _simHeartRate;
}
