import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AppView = 'home' | 'learn' | 'library' | 'imagelab' | 'generate';

export const APP_VIEWS: AppView[] = ['home', 'learn', 'library', 'imagelab', 'generate'];

export interface ViewState {
  view: AppView;
  /** Lesson currently open in Learn mode (null = curriculum overview). */
  activeLessonId: string | null;
  /** One-shot category preselect consumed by LibraryView on mount. */
  librarySeedCategory: string | null;
  setView: (view: AppView) => void;
  openLesson: (id: string) => void;
  closeLesson: () => void;
  openLibraryCategory: (slug: string) => void;
  consumeLibrarySeed: () => string | null;
}

export const useViewStore = create<ViewState>()(
  persist(
    (set, get) => ({
      view: 'home',
      activeLessonId: null,
      librarySeedCategory: null,

      setView: (view) =>
        set((state) => ({
          view,
          // Leaving Learn resets the open lesson so returning shows the overview.
          activeLessonId: view === 'learn' ? state.activeLessonId : null,
        })),

      openLesson: (id) => set({ view: 'learn', activeLessonId: id }),
      closeLesson: () => set({ activeLessonId: null }),

      openLibraryCategory: (slug) =>
        set({ view: 'library', librarySeedCategory: slug }),

      consumeLibrarySeed: () => {
        const seed = get().librarySeedCategory;
        if (seed) set({ librarySeedCategory: null });
        return seed;
      },
    }),
    {
      name: 'prompt-view',
      version: 2,
      partialize: (state) => ({ view: state.view }),
      migrate: (persisted: unknown) => {
        const p = (persisted ?? {}) as { view?: string };
        return {
          view: (APP_VIEWS as string[]).includes(p.view ?? '')
            ? (p.view as AppView)
            : 'home',
        };
      },
    }
  )
);
