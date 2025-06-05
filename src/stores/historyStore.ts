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
}

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
      }
    }),
    {
      name: 'prompt-history',
      partialize: (state) => ({
        history: state.history
      })
    }
  )
);
