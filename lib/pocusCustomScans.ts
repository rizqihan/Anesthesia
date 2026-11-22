'use client';

import { get, set, del, keys } from 'idb-keyval';

export interface CustomPOCUSScan {
  caseId: string;
  isPathology: boolean;
  dataUrl: string;
  label?: string;
  timestamp: number;
}

const PREFIX = 'pocus_scan_';

function makeKey(caseId: string, isPathology: boolean): string {
  return `${PREFIX}${caseId}_${isPathology ? 'path' : 'norm'}`;
}

export async function getCustomScan(caseId: string, isPathology: boolean): Promise<CustomPOCUSScan | null> {
  if (typeof window === 'undefined') return null;
  try {
    const key = makeKey(caseId, isPathology);
    const item = await get<CustomPOCUSScan>(key);
    return item || null;
  } catch (err) {
    console.error('Error fetching custom POCUS scan:', err);
    return null;
  }
}

export async function saveCustomScan(
  caseId: string,
  isPathology: boolean,
  dataUrl: string,
  label?: string
): Promise<void> {
  if (typeof window === 'undefined') return;
  const key = makeKey(caseId, isPathology);
  const record: CustomPOCUSScan = {
    caseId,
    isPathology,
    dataUrl,
    label: label || (isPathology ? 'Clinical Pathology Scan' : 'Clinical Normal Scan'),
    timestamp: Date.now()
  };
  await set(key, record);
}

export async function deleteCustomScan(caseId: string, isPathology: boolean): Promise<void> {
  if (typeof window === 'undefined') return;
  const key = makeKey(caseId, isPathology);
  await del(key);
}

export async function getCustomScansCount(): Promise<number> {
  if (typeof window === 'undefined') return 0;
  try {
    const allKeys = await keys();
    return allKeys.filter((k) => typeof k === 'string' && k.startsWith(PREFIX)).length;
  } catch {
    return 0;
  }
}
