import { useState, useEffect, useCallback, useRef } from 'react';
import {
  ECG_DEVICES,
  ECGDevice,
  ECGSample,
  ConnectionState,
  connectDevice,
  disconnectDevice,
  getDeviceState,
  subscribeToData,
  subscribeToConnectionState,
  setSimulatedHeartRate,
  getSimulatedHeartRate,
} from '../services/hardwareService';

export interface DeviceStatus {
  device: ECGDevice;
  state: ConnectionState;
  error?: string;
}

export interface UseECGHardwareReturn {
  deviceStatuses: DeviceStatus[];
  latestSample: ECGSample | null;
  /** Circular sample buffer (newest last). Max length = bufferSize. */
  sampleBuffer: ECGSample[];
  /** The currently active (connected or streaming) device, if any. */
  connectedDevice: DeviceStatus | undefined;
  /** True when any device is actively streaming. */
  isStreaming: boolean;
  connect: (deviceId: string) => Promise<void>;
  disconnect: (deviceId: string) => void;
  simulatedHeartRate: number;
  setSimHeartRate: (bpm: number) => void;
}

/**
 * React hook for ECG hardware management.
 *
 * @param bufferSize  Number of ECGSamples to keep in memory (default 2000).
 *                    At 250 Hz this equals 8 seconds of waveform history.
 */
export function useECGHardware(bufferSize = 2000): UseECGHardwareReturn {
  const [deviceStatuses, setDeviceStatuses] = useState<DeviceStatus[]>(() =>
    ECG_DEVICES.map((d) => ({ device: d, state: getDeviceState(d.id) }))
  );

  const [latestSample, setLatestSample] = useState<ECGSample | null>(null);
  const [simHR, setSimHR] = useState(getSimulatedHeartRate());
  // Internal mutable buffer — not state, to avoid re-render on every sample
  const bufferRef = useRef<ECGSample[]>([]);

  // Subscribe to incoming samples
  useEffect(() => {
    const unsubData = subscribeToData((sample) => {
      bufferRef.current.push(sample);
      if (bufferRef.current.length > bufferSize) {
        bufferRef.current = bufferRef.current.slice(-bufferSize);
      }
      setLatestSample({ ...sample }); // trigger re-render for live vitals
    });

    const unsubState = subscribeToConnectionState((deviceId, state, error) => {
      setDeviceStatuses((prev) =>
        prev.map((ds) =>
          ds.device.id === deviceId ? { ...ds, state, error } : ds
        )
      );
    });

    return () => {
      unsubData();
      unsubState();
    };
  }, [bufferSize]);

  const connect = useCallback(async (deviceId: string) => {
    bufferRef.current = [];
    setLatestSample(null);
    await connectDevice(deviceId);
  }, []);

  const disconnect = useCallback((deviceId: string) => {
    disconnectDevice(deviceId);
  }, []);

  const handleSetSimHR = useCallback((bpm: number) => {
    setSimulatedHeartRate(bpm);
    setSimHR(bpm);
  }, []);

  const connectedDevice = deviceStatuses.find(
    (ds) => ds.state === 'connected' || ds.state === 'streaming'
  );

  const isStreaming = deviceStatuses.some((ds) => ds.state === 'streaming');

  return {
    deviceStatuses,
    latestSample,
    sampleBuffer: bufferRef.current,
    connectedDevice,
    isStreaming,
    connect,
    disconnect,
    simulatedHeartRate: simHR,
    setSimHeartRate: handleSetSimHR,
  };
}
