import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface LearningState {
  completedLessons: string[];
  toggleLesson: (id: string) => void;
  markComplete: (id: string) => void;
  isComplete: (id: string) => boolean;
  completedInModule: (lessonIds: string[]) => number;
  resetProgress: () => void;
}

export const useLearningStore = create<LearningState>()(
  persist(
    (set, get) => ({
      completedLessons: [],

      toggleLesson: (id) =>
        set((state) => ({
          completedLessons: state.completedLessons.includes(id)
            ? state.completedLessons.filter((l) => l !== id)
            : [...state.completedLessons, id],
        })),

      markComplete: (id) =>
        set((state) =>
          state.completedLessons.includes(id)
            ? state
            : { completedLessons: [...state.completedLessons, id] }
        ),

      isComplete: (id) => get().completedLessons.includes(id),

      completedInModule: (lessonIds) => {
        const done = new Set(get().completedLessons);
        return lessonIds.filter((id) => done.has(id)).length;
      },

      resetProgress: () => set({ completedLessons: [] }),
    }),
    { name: 'prompt-learning', version: 1 }
  )
);
