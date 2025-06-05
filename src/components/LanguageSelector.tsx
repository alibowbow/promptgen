import { useConfigStore } from '../stores/configStore';
import { useInputStore } from '../stores/inputStore';

export const LanguageSelector = () => {
  const { outputLanguage, setOutputLanguage } = useConfigStore();
  const { loading } = useInputStore();

  return (
    <div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 tracking-tight">
        출력 언어
      </h3>
      
      {/* Segmented Control Style */}
      <div className="relative bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
        <div 
          className={`absolute top-1 bottom-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg transition-all duration-300 w-1/2 ${
            outputLanguage === 'en' ? 'left-1' : 'left-1/2'
          }`}
        />
        
        <div className="relative grid grid-cols-2">
          <button
            onClick={() => setOutputLanguage("en")}
            disabled={loading}
            className={`px-3 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
              outputLanguage === "en"
                ? 'text-white'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
            aria-pressed={outputLanguage === "en"}
          >
            <div className="flex items-center justify-center gap-2">
              <span>🌐</span>
              <span>영어</span>
            </div>
          </button>
          
          <button
            onClick={() => setOutputLanguage("ko")}
            disabled={loading}
            className={`px-4 py-3 rounded-lg font-medium text-sm transition-all duration-300 ${
              outputLanguage === "ko"
                ? 'text-white'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
            aria-pressed={outputLanguage === "ko"}
          >
            <div className="flex items-center justify-center gap-2">
              <span>🇰🇷</span>
              <span>한국어</span>
            </div>
          </button>
        </div>
        
        {/* Loading overlay */}
        {loading && (
          <div className="absolute inset-0 bg-white/80 dark:bg-slate-800/80 rounded-xl flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
};