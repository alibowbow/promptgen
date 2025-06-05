import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Config {
  category: string;
  outputLanguage: string;
  tone: string;
  length: string;
  format: string;
  styleMode: string;
}

export interface ConfigState extends Config {
  showStyleOptions: boolean;
  setCategory: (category: string) => void;
  setOutputLanguage: (lang: string) => void;
  setTone: (tone: string) => void;
  setLength: (length: string) => void;
  setFormat: (format: string) => void;
  setStyleMode: (mode: string) => void;
  setShowStyleOptions: (show: boolean) => void;
  getConfig: () => Config;
  loadConfig: (config: Config) => void;
}

export const useConfigStore = create<ConfigState>()(
  persist(
    (set, get) => ({
      // Category and language settings
      category: 'image',
      outputLanguage: 'en',
      
      // Style preferences
      tone: 'professional',
      length: 'medium',
      format: 'sentence',
      styleMode: 'basic',
      
      // UI state
      showStyleOptions: false,
      
      // Actions
      setCategory: (category: string) => set({ category }),
      setOutputLanguage: (outputLanguage: string) => set({ outputLanguage }),
      setTone: (tone: string) => set({ tone }),
      setLength: (length: string) => set({ length }),
      setFormat: (format: string) => set({ format }),
      setStyleMode: (styleMode: string) => set({ styleMode }),
      setShowStyleOptions: (show: boolean) => set({ showStyleOptions: show }),
      
      // Get current config as object
      getConfig: () => {
        const state = get();
        return {
          category: state.category,
          outputLanguage: state.outputLanguage,
          tone: state.tone,
          length: state.length,
          format: state.format,
          styleMode: state.styleMode
        };
      },
      
      // Load config from object
      loadConfig: (config: Config) => set({
        category: config.category,
        outputLanguage: config.outputLanguage,
        tone: config.tone,
        length: config.length,
        format: config.format,
        styleMode: config.styleMode || 'basic'
      })
    }),
    {
      name: 'prompt-config',
      partialize: (state) => ({
        category: state.category,
        outputLanguage: state.outputLanguage,
        tone: state.tone,
        length: state.length,
        format: state.format,
        styleMode: state.styleMode
      })
    }
  )
);
