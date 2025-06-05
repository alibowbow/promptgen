import { create } from 'zustand';

export interface InputState {
  input: string;
  loading: boolean;
  error: string;
  apiStatus: string;
  setInput: (input: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  setApiStatus: (status: string) => void;
  clearStates: () => void;
  resetInput: () => void;
}

export const useInputStore = create<InputState>((set, get) => ({
  // Input state
  input: '',
  loading: false,
  error: '',
  apiStatus: '',
  
  // Actions
  setInput: (input: string) => set({ input }),
  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string) => set({ error }),
  setApiStatus: (apiStatus: string) => set({ apiStatus }),
  
  // Clear all states
  clearStates: () => set({
    error: '',
    apiStatus: ''
  }),
  
  // Reset input
  resetInput: () => set({ input: '' })
}));
