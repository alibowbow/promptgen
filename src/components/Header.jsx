import { useHistoryStore } from '../stores/historyStore.js';

export const Header = () => {
  const { history, showHistory, setShowHistory } = useHistoryStore();

  return (
    <div className="flex items-center justify-between mb-2">
      <div></div>
      <h1 className="text-3xl font-bold text-center tracking-tight text-indigo-600">
        AI 프롬프트 최적화 도우미 ✨
      </h1>
      <button
        onClick={() => setShowHistory(!showHistory)}
        className="px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600 hover:text-slate-800 transition-colors text-sm"
        title="히스토리"
      >
        📚 {history.length}
      </button>
    </div>
  );
};