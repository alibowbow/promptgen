import { useState } from 'react';
import { useHistoryStore } from '../stores/historyStore.js';
import { useConfigStore } from '../stores/configStore.js';
import { useInputStore } from '../stores/inputStore.js';
import { useResultStore } from '../stores/resultStore.js';
import { CATEGORIES } from '../lib/constants.js';

export const HistoryPanel = () => {
  const [isExpanded, setIsExpanded] = useState(false);
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
    <div className="glass-card">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/20 dark:hover:bg-slate-700/20 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">📚</span>
          <h3 className="font-semibold text-slate-900 dark:text-slate-100">
            최근 기록 ({history.length})
          </h3>
        </div>
        <div className="flex items-center gap-3">
          {history.length > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                clearHistory();
              }}
              className="text-xs text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 px-2 py-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              전체 삭제
            </button>
          )}
          <span className={`text-xl transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
            🔽
          </span>
        </div>
      </div>
      
      {isExpanded && (
        <div className="border-t border-white/20 dark:border-slate-700/30 p-4 max-h-64 overflow-y-auto">
          {history.length === 0 ? (
            <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-4">
              저장된 기록이 없습니다.
            </p>
          ) : (
            <div className="space-y-3">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-white/60 dark:bg-slate-700/60 rounded-xl border border-white/30 dark:border-slate-600/30 hover:bg-white/80 dark:hover:bg-slate-700/80 cursor-pointer transition-all duration-200 hover:scale-[1.02]"
                  onClick={() => loadFromHistory(item)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">
                        {item.input.substring(0, 50)}...
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs px-2 py-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg">
                          {CATEGORIES.find(c => c.key === item.category)?.label}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {item.outputLanguage === 'en' ? '영어' : '한국어'}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {new Date(item.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromHistory(item.id);
                      }}
                      className="text-xs text-red-400 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 ml-2 p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};