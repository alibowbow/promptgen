import { create } from 'zustand';

export interface ResultStats {
  charCount: number;
  wordCount: number;
  lineCount: number;
}

export interface ResultState {
  result: string;
  viewMode: string;
  copied: boolean;
  setResult: (result: string) => void;
  setViewMode: (viewMode: string) => void;
  setCopied: (copied: boolean) => void;
  clearResult: () => void;
  getResultStats: () => ResultStats | null;
}

export const useResultStore = create<ResultState>((set, get) => ({
  // Result state
  result: '',
  viewMode: 'normal',
  copied: false,
  
  // Actions
  setResult: (result: string) => set({ result }),
  setViewMode: (viewMode: string) => set({ viewMode }),
  setCopied: (copied: boolean) => set({ copied }),
  
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
