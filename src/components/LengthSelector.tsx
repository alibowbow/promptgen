import { useConfigStore } from '../stores/configStore';
import { LENGTH_OPTIONS } from '../lib/constants';
import { useInputStore } from '../stores/inputStore';

export const LengthSelector = () => {
  const { length, setLength } = useConfigStore();
  const { loading } = useInputStore();

  return (
    <div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 tracking-tight">
        프롬프트 길이
      </h3>
      <div className="grid grid-cols-3 gap-2">
        {LENGTH_OPTIONS.map((opt) => (
          <button
            key={opt.key}
            onClick={() => setLength(opt.key)}
            disabled={loading}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              length === opt.key
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg scale-105'
                : 'bg-white/80 dark:bg-slate-700/50 text-slate-700 dark:text-slate-200 border border-slate-200/50 dark:border-slate-600/50 hover:bg-white dark:hover:bg-slate-700 hover:shadow-lg hover:scale-105'
            } ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            aria-pressed={length === opt.key}
            aria-label={`길이를 ${opt.label}로 설정`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
};
