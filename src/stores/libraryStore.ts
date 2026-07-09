import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface LibraryUiState {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const useLibraryStore = create<LibraryUiState>()(
  persist(
    (set, get) => ({
      favorites: [],

      toggleFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((f) => f !== id)
            : [...state.favorites, id],
        })),

      isFavorite: (id) => get().favorites.includes(id),
    }),
    { name: 'prompt-library-favorites', version: 1 }
  )
);
