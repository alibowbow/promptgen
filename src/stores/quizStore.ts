import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface QuizScore {
  correct: number;
  total: number;
  /** ISO timestamp of the best attempt. */
  at: string;
}

export interface QuizState {
  /** Best score per lesson id. */
  scores: Record<string, QuizScore>;
  recordScore: (lessonId: string, correct: number, total: number) => void;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set) => ({
      scores: {},

      // Keep only the best attempt per lesson.
      recordScore: (lessonId, correct, total) =>
        set((state) => {
          const prev = state.scores[lessonId];
          if (prev && prev.correct >= correct) return state;
          return {
            scores: {
              ...state.scores,
              [lessonId]: { correct, total, at: new Date().toISOString() },
            },
          };
        }),
    }),
    { name: 'prompt-quiz', version: 1 }
  )
);
