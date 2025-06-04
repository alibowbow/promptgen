import { useConfigStore } from '../stores/configStore.js';
import { useInputStore } from '../stores/inputStore.js';
import { CATEGORIES } from '../lib/constants.js';

export const CategorySelector = () => {
  const { category, setCategory } = useConfigStore();
  const { loading } = useInputStore();

  return (
    <div className="flex flex-wrap gap-2 mb-4 justify-center">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.key}
          className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-semibold border text-xs sm:text-sm transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
            category === cat.key
              ? "bg-indigo-600 text-white border-indigo-600 shadow-md scale-105"
              : "bg-slate-100 text-indigo-700 border-slate-200 hover:bg-indigo-50 hover:border-indigo-300"
          }`}
          onClick={() => setCategory(cat.key)}
          disabled={loading}
          type="button"
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
};