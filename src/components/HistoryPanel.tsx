import { useState } from 'react';
import { useHistoryStore } from '../stores/historyStore';
import type { HistoryItem } from '../stores/historyStore';
import { useConfigStore } from '../stores/configStore';
import { useInputStore } from '../stores/inputStore';
import { useResultStore } from '../stores/resultStore';
import { CATEGORIES } from '../lib/constants';

export const HistoryPanel = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const history = useHistoryStore((s) => s.history);
  const showHistory = useHistoryStore((s) => s.showHistory);
  const removeFromHistory = useHistoryStore((s) => s.removeFromHistory);
  const clearHistory = useHistoryStore((s) => s.clearHistory);

  const loadConfig = useConfigStore((s) => s.loadConfig);
  const setInput = useInputStore((s) => s.setInput);
  const setResult = useResultStore((s) => s.setResult);

  const loadFromHistory = (historyItem: HistoryItem) => {
    setInput(historyItem.input);
    loadConfig({
      category: historyItem.category,
      outputLanguage: historyItem.outputLanguage,
      tone: historyItem.tone,
      length: historyItem.length,
      format: historyItem.format,
    });
    setResult(historyItem.output);
  };

  if (!showHistory) return null;

  return (
    <div className="glass-card">
      <button
        type="button"
        aria-expanded={isExpanded}
        className="flex w-full items-center justify-between p-4 text-left cursor-pointer hover:bg-white/20 dark:hover:bg-slate-700/20 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <span className="text-xl" aria-hidden="true">📚</span>
          <h3 className="font-semibold text-slate-900 dark:text-slate-100">
            최근 기록 ({history.length})
          </h3>
        </div>
        <div className="flex items-center gap-3">
          {history.length > 0 && (
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation();
                clearHistory();
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  e.stopPropagation();
                  clearHistory();
                }
              }}
              className="text-xs text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 px-2 py-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              전체 삭제
            </span>
          )}
          <span
            className={`text-xl transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
            aria-hidden="true"
          >
            🔽
          </span>
        </div>
      </button>

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
                  className="relative p-3 bg-white/60 dark:bg-slate-700/60 rounded-xl border border-white/30 dark:border-slate-600/30 hover:bg-white/80 dark:hover:bg-slate-700/80 transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => loadFromHistory(item)}
                    className="w-full text-left pr-6"
                  >
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">
                      {item.input.length > 50
                        ? item.input.substring(0, 50) + '…'
                        : item.input}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs px-2 py-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg">
                        {CATEGORIES.find((c) => c.key === item.category)?.label}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {item.outputLanguage === 'en' ? '영어' : '한국어'}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {new Date(item.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  </button>
                  <button
                    type="button"
                    aria-label="이 기록 삭제"
                    onClick={() => removeFromHistory(item.id)}
                    className="absolute top-2 right-2 text-xs text-red-400 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <span aria-hidden="true">✕</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
