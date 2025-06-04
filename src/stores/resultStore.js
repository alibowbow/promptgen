import { create } from 'zustand';

export const useResultStore = create((set, get) => ({
  // Result state
  result: '',
  viewMode: 'normal',
  copied: false,
  
  // Actions
  setResult: (result) => set({ result }),
  setViewMode: (viewMode) => set({ viewMode }),
  setCopied: (copied) => set({ copied }),
  
  // Clear result
  clearResult: () => set({ result: '', copied: false }),
  
  // Get result stats
  getResultStats: () => {
    const result = get().result;
    if (!result) return null;
    
    return {
      charCount: result.length,
      wordCount: result.split(/\s+/).length,
      lineCount: result.split('\n').length
    };
  }
}));