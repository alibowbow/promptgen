import { useHistoryStore } from '../stores/historyStore.js';

export const Header = () => {
  const { history, showHistory, setShowHistory } = useHistoryStore();

  return (
    <header className="relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-secondary-500/5 to-primary-500/5 rounded-3xl blur-3xl"></div>
      
      <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
        {/* Logo and title */}
        <div className="flex-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-medium">
              AI
            </div>
            <div>
              <h1 className="heading-1 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                프롬프트 최적화 도우미
              </h1>
              <p className="caption text-slate-500 -mt-1">
                AI Prompt Optimizer
              </p>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className={`btn btn-sm touch-target transition-all duration-200 ${
              showHistory 
                ? 'btn-primary' 
                : 'btn-secondary hover:scale-105'
            }`}
            title="히스토리 토글"
            aria-label={`히스토리 패널 ${showHistory ? '닫기' : '열기'}`}
          >
            <span className="text-sm">📚</span>
            <span className="ml-1 font-medium">{history.length}</span>
            {history.length > 0 && (
              <div className="status-info absolute -top-1 -right-1"></div>
            )}
          </button>
          
          {/* Settings button for future use */}
          <button
            className="btn btn-secondary btn-sm touch-target hover:scale-105 transition-all duration-200"
            title="설정"
            aria-label="앱 설정"
          >
            <span className="text-sm">⚙️</span>
          </button>
        </div>
      </div>
    </header>
  );
};