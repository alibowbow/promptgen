import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AppView = 'learn' | 'library' | 'generate';

export interface ViewState {
  view: AppView;
  setView: (view: AppView) => void;
}

export const useViewStore = create<ViewState>()(
  persist(
    (set) => ({
      view: 'learn',
      setView: (view) => set({ view }),
    }),
    { name: 'prompt-view', version: 1 }
  )
);
