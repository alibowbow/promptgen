import { useHistoryStore } from '../stores/historyStore';

export const Header = () => {
  const history = useHistoryStore((s) => s.history);
  const showHistory = useHistoryStore((s) => s.showHistory);
  const setShowHistory = useHistoryStore((s) => s.setShowHistory);

  return (
    <header className="relative">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
      
      <div className="relative text-center space-y-4">
        {/* Logo and main title */}
        <div className="flex items-center justify-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-2xl animate-pulse">
              AI
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-400 rounded-2xl blur opacity-50 animate-pulse"></div>
          </div>
          
          <div className="text-left">
            <h1 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent tracking-tight">
              Prompt Optimizer
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 font-medium">
              AI 프롬프트 최적화 도구
            </p>
          </div>
        </div>

        {/* Quick stats */}
        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg rounded-xl border border-white/20 dark:border-slate-700/30">
            <span className="text-lg">📚</span>
            <span className="font-medium text-slate-700 dark:text-slate-300">
              히스토리 {history.length}개
            </span>
          </div>
          
          <button
            onClick={() => setShowHistory(!showHistory)}
            className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
              showHistory
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                : 'bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg text-slate-700 dark:text-slate-300 border border-white/20 dark:border-slate-700/30 hover:bg-white/80 dark:hover:bg-slate-800/80'
            }`}
            aria-label={`히스토리 패널 ${showHistory ? '닫기' : '열기'}`}
          >
            <span className="text-sm">
              {showHistory ? '히스토리 숨기기' : '히스토리 보기'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};