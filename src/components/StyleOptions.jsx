import { useConfigStore } from '../stores/configStore.js';
import { TONE_OPTIONS, LENGTH_OPTIONS, FORMAT_OPTIONS } from '../lib/constants.js';

export const StyleOptions = () => {
  const { 
    tone, setTone,
    length, setLength,
    format, setFormat,
    showStyleOptions, setShowStyleOptions
  } = useConfigStore();

  return (
    <div className="mb-4">
      <button
        type="button"
        onClick={() => setShowStyleOptions(!showStyleOptions)}
        className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-indigo-600 transition-colors"
      >
        <span>{showStyleOptions ? "🔽" : "▶️"}</span>
        스타일 옵션
      </button>
      
      {showStyleOptions && (
        <div className="mt-3 p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
          {/* Tone Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">톤</label>
            <div className="flex flex-wrap gap-2">
              {TONE_OPTIONS.map((option) => (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => setTone(option.key)}
                  className={`px-3 py-1 rounded-full text-xs border transition-all ${
                    tone === option.key
                      ? "bg-blue-100 text-blue-700 border-blue-300"
                      : "bg-white text-slate-600 border-slate-300 hover:border-blue-300"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Length Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">길이</label>
            <div className="flex flex-wrap gap-2">
              {LENGTH_OPTIONS.map((option) => (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => setLength(option.key)}
                  className={`px-3 py-1 rounded-full text-xs border transition-all ${
                    length === option.key
                      ? "bg-green-100 text-green-700 border-green-300"
                      : "bg-white text-slate-600 border-slate-300 hover:border-green-300"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Format Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">형식</label>
            <div className="flex flex-wrap gap-2">
              {FORMAT_OPTIONS.map((option) => (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => setFormat(option.key)}
                  className={`px-3 py-1 rounded-full text-xs border transition-all ${
                    format === option.key
                      ? "bg-purple-100 text-purple-700 border-purple-300"
                      : "bg-white text-slate-600 border-slate-300 hover:border-purple-300"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};