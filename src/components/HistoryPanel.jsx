import { useHistoryStore } from '../stores/historyStore.js';
import { useConfigStore } from '../stores/configStore.js';
import { useInputStore } from '../stores/inputStore.js';
import { useResultStore } from '../stores/resultStore.js';
import { CATEGORIES } from '../lib/constants.js';

export const HistoryPanel = () => {
  const { 
    history, 
    showHistory, 
    removeFromHistory, 
    clearHistory 
  } = useHistoryStore();
  
  const { loadConfig } = useConfigStore();
  const { setInput } = useInputStore();
  const { setResult } = useResultStore();

  const loadFromHistory = (historyItem) => {
    setInput(historyItem.input);
    loadConfig({
      category: historyItem.category,
      outputLanguage: historyItem.outputLanguage,
      tone: historyItem.tone,
      length: historyItem.length,
      format: historyItem.format
    });
    setResult(historyItem.output);
  };

  if (!showHistory) return null;

  return (
    <div className="mb-4 p-4 bg-slate-50 rounded-xl border border-slate-200 max-h-64 overflow-y-auto">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-slate-700">최근 기록</h3>
        <button
          onClick={clearHistory}
          className="text-xs text-red-500 hover:text-red-700"
        >
          전체 삭제
        </button>
      </div>
      
      {history.length === 0 ? (
        <p className="text-sm text-slate-500 text-center py-4">저장된 기록이 없습니다.</p>
      ) : (
        <div className="space-y-2">
          {history.map((item) => (
            <div
              key={item.id}
              className="p-3 bg-white rounded-lg border border-slate-200 hover:border-indigo-300 cursor-pointer transition-colors"
              onClick={() => loadFromHistory(item)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-700 truncate">
                    {item.input.substring(0, 50)}...
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs px-2 py-1 bg-indigo-100 text-indigo-600 rounded">
                      {CATEGORIES.find(c => c.key === item.category)?.label}
                    </span>
                    <span className="text-xs text-slate-500">
                      {item.outputLanguage === 'en' ? '영어' : '한국어'}
                    </span>
                    <span className="text-xs text-slate-500">
                      {new Date(item.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromHistory(item.id);
                  }}
                  className="text-xs text-red-400 hover:text-red-600 ml-2"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};