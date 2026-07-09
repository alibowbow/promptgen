import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Config {
  category: string;
  outputLanguage: string;
  tone: string;
  length: string;
  format: string;
  styleMode: string;
  /** Basic style panel selections: groupKey -> optionKey */
  basicStyle: Record<string, string>;
  /** Premium style tree: selected leaf keys */
  premiumStyle: string[];
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
  setBasicStyleOption: (groupKey: string, optionKey: string) => void;
  togglePremiumStyle: (key: string) => void;
  clearStyleSelections: () => void;
  getConfig: () => Config;
  loadConfig: (config: Partial<Config>) => void;
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
      basicStyle: {},
      premiumStyle: [],

      // UI state
      showStyleOptions: false,

      // Actions
      // Changing category resets style selections (each category has its own options)
      setCategory: (category: string) =>
        set({ category, basicStyle: {}, premiumStyle: [] }),
      setOutputLanguage: (outputLanguage: string) => set({ outputLanguage }),
      setTone: (tone: string) => set({ tone }),
      setLength: (length: string) => set({ length }),
      setFormat: (format: string) => set({ format }),
      setStyleMode: (styleMode: string) => set({ styleMode }),
      setShowStyleOptions: (show: boolean) => set({ showStyleOptions: show }),

      // Toggle a basic style chip within a group (re-selecting clears it)
      setBasicStyleOption: (groupKey: string, optionKey: string) =>
        set((state) => {
          const next = { ...state.basicStyle };
          if (next[groupKey] === optionKey) {
            delete next[groupKey];
          } else {
            next[groupKey] = optionKey;
          }
          return { basicStyle: next };
        }),

      // Toggle a premium tree leaf
      togglePremiumStyle: (key: string) =>
        set((state) => ({
          premiumStyle: state.premiumStyle.includes(key)
            ? state.premiumStyle.filter((k) => k !== key)
            : [...state.premiumStyle, key],
        })),

      clearStyleSelections: () => set({ basicStyle: {}, premiumStyle: [] }),

      // Get current config as object
      getConfig: () => {
        const state = get();
        return {
          category: state.category,
          outputLanguage: state.outputLanguage,
          tone: state.tone,
          length: state.length,
          format: state.format,
          styleMode: state.styleMode,
          basicStyle: state.basicStyle,
          premiumStyle: state.premiumStyle,
        };
      },

      // Load config from object (missing fields fall back to sensible defaults)
      loadConfig: (config: Partial<Config>) =>
        set({
          category: config.category ?? 'image',
          outputLanguage: config.outputLanguage ?? 'en',
          tone: config.tone ?? 'professional',
          length: config.length ?? 'medium',
          format: config.format ?? 'sentence',
          styleMode: config.styleMode ?? 'basic',
          basicStyle: config.basicStyle ?? {},
          premiumStyle: config.premiumStyle ?? [],
        }),
    }),
    {
      name: 'prompt-config',
      version: 1,
      migrate: (persisted: unknown) => {
        const p = (persisted ?? {}) as Partial<Config>;
        return {
          ...p,
          basicStyle: p.basicStyle ?? {},
          premiumStyle: p.premiumStyle ?? [],
        };
      },
      partialize: (state) => ({
        category: state.category,
        outputLanguage: state.outputLanguage,
        tone: state.tone,
        length: state.length,
        format: state.format,
        styleMode: state.styleMode,
        basicStyle: state.basicStyle,
        premiumStyle: state.premiumStyle,
      }),
    }
  )
);
