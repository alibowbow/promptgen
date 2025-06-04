import { create } from 'zustand';

export const useInputStore = create((set, get) => ({
  // Input state
  input: '',
  loading: false,
  error: '',
  apiStatus: '',
  
  // Actions
  setInput: (input) => set({ input }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setApiStatus: (apiStatus) => set({ apiStatus }),
  
  // Clear all states
  clearStates: () => set({
    error: '',
    apiStatus: ''
  }),
  
  // Reset input
  resetInput: () => set({ input: '' })
}));