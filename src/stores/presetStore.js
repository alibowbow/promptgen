import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const usePresetStore = create(
  persist(
    (set, get) => ({
      // Presets state
      presets: [],
      favorites: [],
      
      // Actions
      // Save current config as a preset
      savePreset: (name, config, inputText = '', outputText = '') => {
        const preset = {
          id: Date.now(),
          name,
          timestamp: new Date().toISOString(),
          config,
          inputText,
          outputText,
          isFavorite: false
        };
        
        const currentPresets = get().presets;
        const newPresets = [preset, ...currentPresets];
        set({ presets: newPresets });
        
        return preset.id;
      },
      
      // Load preset configuration
      loadPreset: (id) => {
        const presets = get().presets;
        return presets.find(preset => preset.id === id);
      },
      
      // Delete preset
      deletePreset: (id) => {
        const currentPresets = get().presets;
        const newPresets = currentPresets.filter(preset => preset.id !== id);
        
        const currentFavorites = get().favorites;
        const newFavorites = currentFavorites.filter(fav => fav !== id);
        
        set({ 
          presets: newPresets,
          favorites: newFavorites 
        });
      },
      
      // Toggle favorite
      toggleFavorite: (id) => {
        const currentFavorites = get().favorites;
        const isFavorite = currentFavorites.includes(id);
        
        if (isFavorite) {
          const newFavorites = currentFavorites.filter(fav => fav !== id);
          set({ favorites: newFavorites });
        } else {
          const newFavorites = [...currentFavorites, id];
          set({ favorites: newFavorites });
        }
        
        // Update preset object
        const currentPresets = get().presets;
        const newPresets = currentPresets.map(preset => 
          preset.id === id 
            ? { ...preset, isFavorite: !isFavorite }
            : preset
        );
        set({ presets: newPresets });
      },
      
      // Get favorite presets
      getFavoritePresets: () => {
        const { presets, favorites } = get();
        return presets.filter(preset => favorites.includes(preset.id));
      },
      
      // Update preset name
      updatePresetName: (id, newName) => {
        const currentPresets = get().presets;
        const newPresets = currentPresets.map(preset =>
          preset.id === id ? { ...preset, name: newName } : preset
        );
        set({ presets: newPresets });
      },
      
      // Export presets
      exportPresets: () => {
        const { presets, favorites } = get();
        return {
          presets,
          favorites,
          exportedAt: new Date().toISOString(),
          version: '1.0'
        };
      },
      
      // Import presets
      importPresets: (data) => {
        if (data.presets && Array.isArray(data.presets)) {
          set({ 
            presets: data.presets,
            favorites: data.favorites || []
          });
          return true;
        }
        return false;
      },
      
      // Clear all presets
      clearPresets: () => set({ presets: [], favorites: [] })
    }),
    {
      name: 'prompt-presets',
      partialize: (state) => ({
        presets: state.presets,
        favorites: state.favorites
      })
    }
  )
);