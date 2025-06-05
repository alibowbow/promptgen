import { useState } from 'react';
import { usePresetStore } from '../stores/presetStore';
import { useConfigStore } from '../stores/configStore';
import { useInputStore } from '../stores/inputStore';
import { useResultStore } from '../stores/resultStore';
import { CATEGORIES } from '../lib/constants';
import { ExportImport } from './ExportImport';

export const PresetManager = () => {
  const [showPresets, setShowPresets] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [presetName, setPresetName] = useState('');
  const [editingPreset, setEditingPreset] = useState(null);
  
  const { 
    presets, 
    favorites,
    savePreset, 
    loadPreset, 
    deletePreset, 
    toggleFavorite,
    updatePresetName,
    getFavoritePresets 
  } = usePresetStore();
  
  const { getConfig, loadConfig } = useConfigStore();
  const { input } = useInputStore();
  const { result, setResult } = useResultStore();

  const handleSavePreset = () => {
    if (!presetName.trim()) return;
    
    const config = getConfig();
    savePreset(presetName, config, input, result);
    setPresetName('');
    setShowSaveDialog(false);
  };

  const handleLoadPreset = (id) => {
    const preset = loadPreset(id);
    if (preset) {
      loadConfig(preset.config);
      if (preset.inputText) {
        useInputStore.getState().setInput(preset.inputText);
      }
      if (preset.outputText) {
        setResult(preset.outputText);
      }
    }
  };

  const handleEditPresetName = (id, newName) => {
    updatePresetName(id, newName);
    setEditingPreset(null);
  };

  const favoritePresets = getFavoritePresets();

  return (
    <div className="mb-4">
      {/* Preset Controls */}
      <div className="flex gap-2 mb-3">
        <button
          onClick={() => setShowPresets(!showPresets)}
          className="flex-1 px-3 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors text-sm font-medium"
        >
          📁 프리셋 ({presets.length})
        </button>
        <button
          onClick={() => setShowSaveDialog(true)}
          className="px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium"
        >
          💾 저장
        </button>
        <ExportImport />
      </div>

      {/* Save Dialog */}
      {showSaveDialog && (
        <div className="mb-3 p-3 bg-green-50 rounded-lg border border-green-200">
          <h4 className="text-sm font-medium text-green-800 mb-2">프리셋 저장</h4>
          <div className="flex gap-2">
            <input
              type="text"
              value={presetName}
              onChange={(e) => setPresetName(e.target.value)}
              placeholder="프리셋 이름 입력..."
              className="flex-1 px-3 py-2 border border-green-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              onKeyDown={(e) => e.key === 'Enter' && handleSavePreset()}
            />
            <button
              onClick={handleSavePreset}
              disabled={!presetName.trim()}
              className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 text-sm"
            >
              저장
            </button>
            <button
              onClick={() => {
                setShowSaveDialog(false);
                setPresetName('');
              }}
              className="px-3 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 text-sm"
            >
              취소
            </button>
          </div>
        </div>
      )}

      {/* Presets List */}
      {showPresets && (
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 max-h-64 overflow-y-auto">
          {/* Favorites Section */}
          {favoritePresets.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-slate-700 mb-2 flex items-center">
                ⭐ 즐겨찾기
              </h4>
              <div className="space-y-2">
                {favoritePresets.map((preset) => (
                  <PresetItem
                    key={preset.id}
                    preset={preset}
                    onLoad={() => handleLoadPreset(preset.id)}
                    onDelete={() => deletePreset(preset.id)}
                    onToggleFavorite={() => toggleFavorite(preset.id)}
                    onEdit={(newName) => handleEditPresetName(preset.id, newName)}
                    editingPreset={editingPreset}
                    setEditingPreset={setEditingPreset}
                    isFavorite={true}
                  />
                ))}
              </div>
            </div>
          )}

          {/* All Presets */}
          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-2">
              전체 프리셋
            </h4>
            {presets.length === 0 ? (
              <p className="text-sm text-slate-500 text-center py-4">저장된 프리셋이 없습니다.</p>
            ) : (
              <div className="space-y-2">
                {presets.map((preset) => (
                  <PresetItem
                    key={preset.id}
                    preset={preset}
                    onLoad={() => handleLoadPreset(preset.id)}
                    onDelete={() => deletePreset(preset.id)}
                    onToggleFavorite={() => toggleFavorite(preset.id)}
                    onEdit={(newName) => handleEditPresetName(preset.id, newName)}
                    editingPreset={editingPreset}
                    setEditingPreset={setEditingPreset}
                    isFavorite={favorites.includes(preset.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const PresetItem = ({ 
  preset, 
  onLoad, 
  onDelete, 
  onToggleFavorite, 
  onEdit,
  editingPreset,
  setEditingPreset,
  isFavorite 
}) => {
  const [editName, setEditName] = useState(preset.name);
  
  const handleEdit = () => {
    if (editName.trim()) {
      onEdit(editName.trim());
    } else {
      setEditingPreset(null);
      setEditName(preset.name);
    }
  };

  return (
    <div className="p-3 bg-white rounded-lg border border-slate-200 hover:border-indigo-300 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          {editingPreset === preset.id ? (
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="flex-1 px-2 py-1 border border-slate-300 rounded text-sm"
                onKeyDown={(e) => e.key === 'Enter' && handleEdit()}
                autoFocus
              />
              <button
                onClick={handleEdit}
                className="text-xs text-green-600 hover:text-green-800"
              >
                ✓
              </button>
              <button
                onClick={() => {
                  setEditingPreset(null);
                  setEditName(preset.name);
                }}
                className="text-xs text-red-600 hover:text-red-800"
              >
                ✕
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 mb-2">
              <button
                onClick={onLoad}
                className="text-sm font-medium text-slate-700 hover:text-indigo-600 cursor-pointer flex-1 text-left"
              >
                {preset.name}
              </button>
              <button
                onClick={() => setEditingPreset(preset.id)}
                className="text-xs text-slate-400 hover:text-slate-600"
              >
                ✏️
              </button>
            </div>
          )}
          
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs px-2 py-1 bg-indigo-100 text-indigo-600 rounded">
              {CATEGORIES.find(c => c.key === preset.config.category)?.label}
            </span>
            <span className="text-xs text-slate-500">
              {preset.config.outputLanguage === 'en' ? '영어' : '한국어'}
            </span>
            <span className="text-xs text-slate-500">
              {preset.config.tone} / {preset.config.length} / {preset.config.format}
            </span>
            <span className="text-xs text-slate-400">
              {new Date(preset.timestamp).toLocaleDateString()}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-1 ml-2">
          <button
            onClick={onToggleFavorite}
            className={`text-sm ${isFavorite ? 'text-yellow-500' : 'text-gray-300'} hover:text-yellow-600`}
          >
            ⭐
          </button>
          <button
            onClick={onDelete}
            className="text-xs text-red-400 hover:text-red-600"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};