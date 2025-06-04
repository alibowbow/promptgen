import { useConfigStore } from '../stores/configStore.js';
import { useInputStore } from '../stores/inputStore.js';

export const LanguageSelector = () => {
  const { outputLanguage, setOutputLanguage } = useConfigStore();
  const { loading } = useInputStore();

  return (
    <div className="flex gap-2 mb-4 justify-center">
      <button
        onClick={() => setOutputLanguage("en")}
        disabled={loading}
        type="button"
        className={`px-4 py-2 rounded-full font-semibold border text-sm transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-400 ${
          outputLanguage === "en"
            ? "bg-purple-600 text-white border-purple-600 shadow-md scale-105"
            : "bg-slate-100 text-purple-700 border-slate-200 hover:bg-purple-50 hover:border-purple-300"
        }`}
      >
        ➡️ 영어로 변환
      </button>
      <button
        onClick={() => setOutputLanguage("ko")}
        disabled={loading}
        type="button"
        className={`px-4 py-2 rounded-full font-semibold border text-sm transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-400 ${
          outputLanguage === "ko"
            ? "bg-teal-500 text-white border-teal-500 shadow-md scale-105"
            : "bg-slate-100 text-teal-700 border-slate-200 hover:bg-teal-50 hover:border-teal-300"
        }`}
      >
        🇰🇷 한국어로 최적화
      </button>
    </div>
  );
};