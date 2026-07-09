import {
  LanguageSelector,
  CategorySelector,
  StyleOptions,
  HistoryPanel,
  InputForm,
  StatusDisplay,
  ResultViewer,
} from '../index';
import { useHistoryStore } from '../../stores/historyStore';

export const GenerateView = () => {
  const history = useHistoryStore((s) => s.history);
  const showHistory = useHistoryStore((s) => s.showHistory);
  const setShowHistory = useHistoryStore((s) => s.setShowHistory);

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            프롬프트 생성기
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            배운 원리를 바로 적용해 아이디어를 최적화된 프롬프트로 변환하세요
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowHistory(!showHistory)}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            showHistory
              ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
              : 'bg-white/70 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/40'
          }`}
        >
          📚 히스토리 ({history.length})
        </button>
      </div>

      {showHistory && (
        <div className="mb-6 animate-slide-up">
          <HistoryPanel />
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-4 space-y-6">
          <div className="glass-card">
            <div className="glass-card-body space-y-8">
              <LanguageSelector />
              <CategorySelector />
            </div>
          </div>
          <StyleOptions />
        </div>

        <div className="xl:col-span-8 space-y-6">
          <div className="glass-card">
            <InputForm />
          </div>
          <StatusDisplay />
          <ResultViewer />
        </div>
      </div>
    </div>
  );
};
