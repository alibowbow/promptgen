import { useConfigStore } from '../stores/configStore.js';
import { useInputStore } from '../stores/inputStore.js';
import { CATEGORIES } from '../lib/constants.js';

export const CategorySelector = () => {
  const { category, setCategory } = useConfigStore();
  const { loading } = useInputStore();

  const categoryIcons = {
    image: '🖼️',
    video: '🎬',
    document: '📄',
    code: '💻'
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 tracking-tight">
        카테고리
      </h3>
      
      <div className="grid grid-cols-2 gap-3">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setCategory(cat.key)}
            disabled={loading}
            className={`group relative px-4 py-3 rounded-xl transition-all duration-300 font-medium text-sm ${
              category === cat.key
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg scale-105'
                : 'bg-white/80 dark:bg-slate-700/50 text-slate-700 dark:text-slate-200 border border-slate-200/50 dark:border-slate-600/50 hover:bg-white dark:hover:bg-slate-700 hover:shadow-lg hover:scale-105'
            } ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            aria-pressed={category === cat.key}
            aria-label={`카테고리를 ${cat.label}로 설정`}
          >
            <div className="flex items-center justify-center gap-2">
              <span className="text-lg">{categoryIcons[cat.key]}</span>
              <span>{cat.label}</span>
            </div>
            
            {/* Loading indicator */}
            {loading && category === cat.key && (
              <div className="absolute inset-0 bg-white/80 dark:bg-slate-800/80 rounded-xl flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};