import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useHistoryStore = create(
  persist(
    (set, get) => ({
      // History state
      history: [],
      showHistory: false,
      
      // Actions
      setShowHistory: (show) => set({ showHistory: show }),
      
      // Add item to history
      addToHistory: (inputText, outputText, config) => {
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
      removeFromHistory: (id) => {
        const currentHistory = get().history;
        const newHistory = currentHistory.filter(item => item.id !== id);
        set({ history: newHistory });
      },
      
      // Clear all history
      clearHistory: () => set({ history: [] }),
      
      // Get history item by id
      getHistoryItem: (id) => {
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