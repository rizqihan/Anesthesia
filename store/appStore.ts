import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Language = 'en' | 'id';
type AIProvider = 'default_gemini' | 'custom_gemini' | 'openai_compatible';

export interface DatasetSyncMeta {
  lastSynced: string | null;
  count: number;
}

interface AppState {
  language: Language;
  setLanguage: (lang: Language) => void;
  isOffline: boolean;
  setOfflineStatus: (status: boolean) => void;
  
  aiProvider: AIProvider;
  setAiProvider: (provider: AIProvider) => void;
  customGeminiKey: string;
  setCustomGeminiKey: (key: string) => void;
  openaiEndpoint: string;
  setOpenaiEndpoint: (endpoint: string) => void;
  openaiKey: string;
  setOpenaiKey: (key: string) => void;
  openaiModel: string;
  setOpenaiModel: (model: string) => void;
  
  // Per-dataset sync metadata
  syncMeta: {
    icd10: DatasetSyncMeta;
    drugs: DatasetSyncMeta;
    guidelines: DatasetSyncMeta;
  };
  updateSyncMeta: (dataset: 'icd10' | 'drugs' | 'guidelines', meta: Partial<DatasetSyncMeta>) => void;

  // Legacy — kept for migration
  lastSyncDate: string | null;
  setLastSyncDate: (date: string | null) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      language: 'en', // Default to English
      setLanguage: (lang) => set({ language: lang }),
      isOffline: false,
      setOfflineStatus: (status) => set({ isOffline: status }),
      
      aiProvider: 'default_gemini',
      setAiProvider: (provider) => set({ aiProvider: provider }),
      customGeminiKey: '',
      setCustomGeminiKey: (key) => set({ customGeminiKey: key }),
      openaiEndpoint: 'https://api.groq.com/openai/v1',
      setOpenaiEndpoint: (endpoint) => set({ openaiEndpoint: endpoint }),
      openaiKey: '',
      setOpenaiKey: (key) => set({ openaiKey: key }),
      openaiModel: 'llama-3.3-70b-versatile',
      setOpenaiModel: (model) => set({ openaiModel: model }),

      syncMeta: {
        icd10: { lastSynced: null, count: 0 },
        drugs: { lastSynced: null, count: 0 },
        guidelines: { lastSynced: null, count: 0 },
      },
      updateSyncMeta: (dataset, meta) =>
        set((state) => ({
          syncMeta: {
            ...state.syncMeta,
            [dataset]: { ...state.syncMeta[dataset], ...meta },
          },
        })),

      lastSyncDate: null,
      setLastSyncDate: (date) => set({ lastSyncDate: date }),
    }),
    {
      name: 'anesthesia-storage',
      partialize: (state) => ({ 
        language: state.language,
        aiProvider: state.aiProvider,
        customGeminiKey: state.customGeminiKey,
        openaiEndpoint: state.openaiEndpoint,
        openaiKey: state.openaiKey,
        openaiModel: state.openaiModel,
        lastSyncDate: state.lastSyncDate,
        syncMeta: state.syncMeta,
      }),
    }
  )
);
