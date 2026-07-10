import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/** Local YYYY-MM-DD for streak bookkeeping. */
const today = (): string => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

/** Consecutive-day streak ending today or yesterday. */
export const computeStreak = (dates: string[]): number => {
  if (dates.length === 0) return 0;
  const days = Array.from(new Set(dates)).sort().reverse();
  const dayMs = 24 * 60 * 60 * 1000;
  const toMs = (s: string) => new Date(`${s}T00:00:00`).getTime();

  const now = toMs(today());
  // The streak is alive if the latest activity is today or yesterday.
  if (now - toMs(days[0]) > dayMs) return 0;

  let streak = 1;
  for (let i = 1; i < days.length; i++) {
    if (toMs(days[i - 1]) - toMs(days[i]) === dayMs) streak++;
    else break;
  }
  return streak;
};

export interface LearningState {
  completedLessons: string[];
  /** lessonId -> YYYY-MM-DD of first completion (fuels the streak). */
  completionDates: Record<string, string>;
  toggleLesson: (id: string) => void;
  markComplete: (id: string) => void;
  isComplete: (id: string) => boolean;
  completedInModule: (lessonIds: string[]) => number;
  getStreak: () => number;
  resetProgress: () => void;
}

export const useLearningStore = create<LearningState>()(
  persist(
    (set, get) => ({
      completedLessons: [],
      completionDates: {},

      toggleLesson: (id) =>
        set((state) => {
          if (state.completedLessons.includes(id)) {
            return {
              completedLessons: state.completedLessons.filter((l) => l !== id),
            };
          }
          return {
            completedLessons: [...state.completedLessons, id],
            completionDates: { ...state.completionDates, [id]: today() },
          };
        }),

      markComplete: (id) =>
        set((state) =>
          state.completedLessons.includes(id)
            ? state
            : {
                completedLessons: [...state.completedLessons, id],
                completionDates: { ...state.completionDates, [id]: today() },
              }
        ),

      isComplete: (id) => get().completedLessons.includes(id),

      completedInModule: (lessonIds) => {
        const done = new Set(get().completedLessons);
        return lessonIds.filter((id) => done.has(id)).length;
      },

      getStreak: () => computeStreak(Object.values(get().completionDates)),

      resetProgress: () => set({ completedLessons: [], completionDates: {} }),
    }),
    {
      name: 'prompt-learning',
      version: 2,
      migrate: (persisted: unknown) => {
        const p = (persisted ?? {}) as Partial<LearningState>;
        return {
          completedLessons: p.completedLessons ?? [],
          completionDates: p.completionDates ?? {},
        };
      },
    }
  )
);
