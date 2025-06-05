import { useResultStore } from '../stores/resultStore';
import { useConfigStore } from '../stores/configStore';
import { useInputStore } from '../stores/inputStore';
import { usePromptConverter } from '../hooks/usePromptConverter';
import { useClipboard } from '../hooks/useClipboard';
import { VIEW_MODES } from '../lib/constants';

export const ResultViewer = () => {
  const { result, viewMode, setViewMode, getResultStats } = useResultStore();
  const { outputLanguage, tone, length, format } = useConfigStore();
  const { loading } = useInputStore();
  const { handleConvert } = usePromptConverter();
  const { copied, copyToClipboard } = useClipboard();

  if (!result || loading) return null;

  const resultTitle = outputLanguage === 'en' ? "영문 프롬프트 결과" : "최적화된 한국어 프롬프트";
  const stats = getResultStats();

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-3">
        <span className="font-semibold text-indigo-700 text-lg">
          {resultTitle}
        </span>
        <div className="flex gap-2">
          {/* View Mode Toggle */}
          <div className="flex bg-slate-100 rounded-lg p-1">
            {VIEW_MODES.map((mode) => (
              <button
                key={mode.key}
                onClick={() => setViewMode(mode.key)}
                className={`px-2 py-1 rounded text-xs transition-all ${
                  viewMode === mode.key
                    ? "bg-white text-indigo-600 shadow-sm"
                    : "text-slate-600 hover:text-indigo-600"
                }`}
                title={mode.label}
              >
                {mode.emoji}
              </button>
            ))}
          </div>
          
          {/* Action Buttons */}
          <button
            className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs hover:bg-indigo-200 active:scale-95 transition-colors duration-150 ease-in-out flex items-center gap-1"
            onClick={handleConvert}
            disabled={loading}
          >
            🔄 재변환
          </button>
          <button
            className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-xs hover:bg-cyan-200 active:scale-95 transition-colors duration-150 ease-in-out"
            onClick={() => copyToClipboard(result)}
          >
            {copied ? "✅ 복사됨!" : "📋 복사"}
          </button>
        </div>
      </div>
      
      {/* Result Display with View Mode */}
      <div className="bg-gray-50 rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <pre className={`p-4 whitespace-pre-wrap text-gray-700 font-mono ${
          viewMode === "short" ? "text-sm line-clamp-3" : 
          viewMode === "normal" ? "text-base" : "text-base leading-relaxed"
        }`}>
          {viewMode === "short" && result.length > 200 
            ? result.substring(0, 200) + "..." 
            : result}
        </pre>
        
        {viewMode === "short" && result.length > 200 && (
          <div className="px-4 pb-3">
            <button 
              onClick={() => setViewMode("normal")}
              className="text-xs text-indigo-600 hover:text-indigo-800"
            >
              전체 보기 →
            </button>
          </div>
        )}
        
        {viewMode === "detailed" && stats && (
          <div className="border-t border-slate-200 bg-slate-50 p-3">
            <div className="text-xs text-slate-600 space-y-1">
              <div>📊 글자 수: {stats.charCount}자</div>
              <div>📝 단어 수: {stats.wordCount}개</div>
              <div>🎨 스타일: {tone} / {length} / {format}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};