import { useState } from 'react';
import { usePresetStore } from '../stores/presetStore.js';
import { useHistoryStore } from '../stores/historyStore.js';
import { useResultStore } from '../stores/resultStore.js';
import { useToastStore } from '../stores/toastStore.js';
import { FileIO } from '../lib/fileIO.js';

export const ExportImport = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('export');
  const [exportType, setExportType] = useState('presets');
  const [importFile, setImportFile] = useState(null);

  const { presets, exportPresets, importPresets } = usePresetStore();
  const { history } = useHistoryStore();
  const { result } = useResultStore();
  const { success, error } = useToastStore();

  const handleExport = async () => {
    try {
      let data, filename;
      
      switch (exportType) {
        case 'presets':
          data = exportPresets();
          filename = `promptgen-presets-${new Date().toISOString().split('T')[0]}.json`;
          break;
        case 'history':
          data = { history, exportedAt: new Date().toISOString(), version: '1.0' };
          filename = `promptgen-history-${new Date().toISOString().split('T')[0]}.json`;
          break;
        case 'current':
          data = result;
          filename = `prompt-result-${new Date().toISOString().split('T')[0]}.txt`;
          break;
        case 'all':
          data = {
            presets: exportPresets().presets,
            favorites: exportPresets().favorites,
            history,
            exportedAt: new Date().toISOString(),
            version: '1.0'
          };
          filename = `promptgen-backup-${new Date().toISOString().split('T')[0]}.json`;
          break;
      }

      const exportSuccess = exportType === 'current' 
        ? FileIO.exportToText(data, filename)
        : FileIO.exportToJSON(data, filename);

      if (exportSuccess) {
        success('파일이 성공적으로 내보내졌습니다.');
      }
    } catch (err) {
      error('내보내기 중 오류가 발생했습니다.');
    }
  };

  const handleImport = async () => {
    if (!importFile) return;

    try {
      const importResult = await FileIO.importFromJSON(importFile);
      
      if (!importResult.success) {
        error(importResult.error);
        return;
      }

      const validation = FileIO.validateImportData(importResult.data);
      if (!validation.valid) {
        error(validation.error);
        return;
      }

      // Import based on data type
      if (importResult.data.presets) {
        const imported = importPresets(importResult.data);
        if (imported) {
          success('프리셋이 성공적으로 가져와졌습니다.');
        }
      }

      if (importResult.data.history) {
        useHistoryStore.getState().importHistory?.(importResult.data.history);
        success('히스토리가 성공적으로 가져와졌습니다.');
      }

      setImportFile(null);
    } catch (err) {
      error('가져오기 중 오류가 발생했습니다.');
    }
  };

  const resetImport = () => {
    setImportFile(null);
  };

  if (!showModal) {
    return (
      <button
        onClick={() => setShowModal(true)}
        className="px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm font-medium"
      >
        📂 내보내기/가져오기
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">파일 관리</h3>
          <button
            onClick={() => setShowModal(false)}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-gray-100 rounded-lg p-1 mb-4">
          <button
            onClick={() => setActiveTab('export')}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'export' 
                ? 'bg-white text-purple-600 shadow-sm' 
                : 'text-gray-600 hover:text-purple-600'
            }`}
          >
            📤 내보내기
          </button>
          <button
            onClick={() => setActiveTab('import')}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'import' 
                ? 'bg-white text-purple-600 shadow-sm' 
                : 'text-gray-600 hover:text-purple-600'
            }`}
          >
            📥 가져오기
          </button>
        </div>

        {/* Export Tab */}
        {activeTab === 'export' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                내보낼 데이터 선택
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="exportType"
                    value="presets"
                    checked={exportType === 'presets'}
                    onChange={(e) => setExportType(e.target.value)}
                    className="mr-2"
                  />
                  <span className="text-sm">프리셋 ({presets.length}개)</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="exportType"
                    value="history"
                    checked={exportType === 'history'}
                    onChange={(e) => setExportType(e.target.value)}
                    className="mr-2"
                  />
                  <span className="text-sm">히스토리 ({history.length}개)</span>
                </label>
                {result && (
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="exportType"
                      value="current"
                      checked={exportType === 'current'}
                      onChange={(e) => setExportType(e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-sm">현재 결과 (텍스트)</span>
                  </label>
                )}
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="exportType"
                    value="all"
                    checked={exportType === 'all'}
                    onChange={(e) => setExportType(e.target.value)}
                    className="mr-2"
                  />
                  <span className="text-sm">전체 백업</span>
                </label>
              </div>
            </div>

            <button
              onClick={handleExport}
              className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              내보내기
            </button>
          </div>
        )}

        {/* Import Tab */}
        {activeTab === 'import' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                JSON 파일 선택
              </label>
              <input
                type="file"
                accept=".json"
                onChange={(e) => setImportFile(e.target.files[0])}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
              />
            </div>

            {importFile && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  선택된 파일: {importFile.name}
                </p>
                <p className="text-xs text-gray-500">
                  크기: {(importFile.size / 1024).toFixed(1)} KB
                </p>
              </div>
            )}

            <div className="flex gap-2">
              <button
                onClick={handleImport}
                disabled={!importFile}
                className="flex-1 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                가져오기
              </button>
              {importFile && (
                <button
                  onClick={resetImport}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  취소
                </button>
              )}
            </div>
          </div>
        )}


        {/* Help Text */}
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-600">
            💡 팁: 프리셋과 히스토리를 백업하여 다른 기기에서도 사용할 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
};