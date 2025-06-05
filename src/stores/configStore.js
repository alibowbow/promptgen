import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useConfigStore = create(
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
      setCategory: (category) => set({ category }),
      setOutputLanguage: (outputLanguage) => set({ outputLanguage }),
      setTone: (tone) => set({ tone }),
      setLength: (length) => set({ length }),
      setFormat: (format) => set({ format }),
      setStyleMode: (styleMode) => set({ styleMode }),
      setShowStyleOptions: (show) => set({ showStyleOptions: show }),
      
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
      loadConfig: (config) => set({
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
