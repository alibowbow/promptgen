import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Config } from './configStore';

export interface HistoryItem {
  id: number;
  timestamp: string;
  input: string;
  output: string;
  category: string;
  outputLanguage: string;
  tone: string;
  length: string;
  format: string;
}

export interface HistoryState {
  history: HistoryItem[];
  showHistory: boolean;
  setShowHistory: (show: boolean) => void;
  addToHistory: (inputText: string, outputText: string, config: Config) => void;
  removeFromHistory: (id: number) => void;
  clearHistory: () => void;
  getHistoryItem: (id: number) => HistoryItem | undefined;
  importHistory: (items: unknown) => number;
}

// Keep only well-formed history entries when importing untrusted files.
const sanitizeHistoryItems = (items: unknown): HistoryItem[] => {
  if (!Array.isArray(items)) return [];
  return items
    .filter(
      (it): it is HistoryItem =>
        !!it &&
        typeof it === 'object' &&
        typeof (it as HistoryItem).input === 'string' &&
        typeof (it as HistoryItem).output === 'string'
    )
    .map((it) => ({
      id: typeof it.id === 'number' ? it.id : Date.now() + Math.floor(Math.random() * 1000),
      timestamp: typeof it.timestamp === 'string' ? it.timestamp : new Date().toISOString(),
      input: it.input,
      output: it.output,
      category: typeof it.category === 'string' ? it.category : 'image',
      outputLanguage: typeof it.outputLanguage === 'string' ? it.outputLanguage : 'en',
      tone: typeof it.tone === 'string' ? it.tone : 'professional',
      length: typeof it.length === 'string' ? it.length : 'medium',
      format: typeof it.format === 'string' ? it.format : 'sentence',
    }));
};

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set, get) => ({
      // History state
      history: [],
      showHistory: false,
      
      // Actions
      setShowHistory: (show: boolean) => set({ showHistory: show }),
      
      // Add item to history
      addToHistory: (inputText: string, outputText: string, config: Config) => {
        const historyItem = {
          id: Date.now(),
          timestamp: new Date().toISOString(),
          input: inputText,
          output: outputText,
          category: config.category,
          outputLanguage: config.outputLanguage,
          tone: config.tone,
          length: config.length,
          format: config.format
        };

        const currentHistory = get().history;
        const newHistory = [historyItem, ...currentHistory].slice(0, 50); // Keep only last 50 items
        
        set({ history: newHistory });
      },
      
      // Remove item from history
      removeFromHistory: (id: number) => {
        const currentHistory = get().history;
        const newHistory = currentHistory.filter(item => item.id !== id);
        set({ history: newHistory });
      },
      
      // Clear all history
      clearHistory: () => set({ history: [] }),
      
      // Get history item by id
      getHistoryItem: (id: number) => {
        const history = get().history;
        return history.find(item => item.id === id);
      },

      // Merge imported items into history (dedupe by id, keep newest 50).
      // Returns the number of new items actually added.
      importHistory: (items: unknown) => {
        const incoming = sanitizeHistoryItems(items);
        if (incoming.length === 0) return 0;

        const current = get().history;
        const existingIds = new Set(current.map((item) => item.id));
        const fresh = incoming.filter((item) => !existingIds.has(item.id));
        if (fresh.length === 0) return 0;

        const merged = [...fresh, ...current]
          .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
          .slice(0, 50);

        set({ history: merged });
        return fresh.length;
      }
    }),
    {
      name: 'prompt-history',
      version: 1,
      partialize: (state) => ({
        history: state.history
      })
    }
  )
);
