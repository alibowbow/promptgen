import { useState, useEffect } from 'react';
import { useInputStore } from '../stores/inputStore.js';
import { useConfigStore } from '../stores/configStore.js';
import { usePromptConverter } from '../hooks/usePromptConverter.js';
import { CATEGORIES } from '../lib/constants.js';

export const InputForm = () => {
  const { input, setInput, loading } = useInputStore();
  const { category, outputLanguage } = useConfigStore();
  const { handleConvert } = usePromptConverter();
  const [charCount, setCharCount] = useState(input?.length || 0);
  const [isFocused, setIsFocused] = useState(false);

  const selectedCat = CATEGORIES.find((c) => c.key === category);
  
  const mainButtonText = outputLanguage === 'en' ? 
    `${selectedCat?.label || "선택"}용 영문 프롬프트 생성` : 
    `${selectedCat?.label || "선택"}용 한국어 최적화`;
  
  const placeholderText = `${selectedCat?.label || '프로젝트'}에 대한 아이디어를 자세히 설명해주세요...

예시:
• 미래적인 도시 풍경, 네온사인과 홀로그램이 있는 밤 장면
• 평화로운 숲속 오두막, 따뜻한 황금빛과 자연스러운 조명
• 혁신적인 제품 디자인, 미니멀하고 현대적인 스타일

구체적이고 상세할수록 더 좋은 결과를 얻을 수 있습니다.`;

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    setCharCount(value.length);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (input.trim() && !loading) {
          handleConvert(e);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [input, loading, handleConvert]);

  const getCharCountColor = () => {
    if (charCount > 900) return 'text-red-500 dark:text-red-400';
    if (charCount > 700) return 'text-amber-500 dark:text-amber-400';
    return 'text-slate-500 dark:text-slate-400';
  };

  return (
    <div className="glass-card-body">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            프롬프트 입력
          </h2>
          <div className="flex items-center gap-3">
            <div className={`text-sm font-medium ${getCharCountColor()}`}>
              {charCount}/1000
            </div>
            {selectedCat && (
              <div className="px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg text-sm font-medium">
                {selectedCat.label}
              </div>
            )}
          </div>
        </div>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          AI에게 전달할 명확하고 구체적인 지시사항을 작성해주세요
        </p>
      </div>

      <form onSubmit={handleConvert} className="space-y-6">
        {/* Enhanced textarea with better focus effects */}
        <div className="relative group">
          <textarea
            className={`w-full px-6 py-5 border-2 rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg font-mono text-base leading-relaxed placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-slate-100 transition-all duration-300 resize-none focus:outline-none ${
              isFocused
                ? 'border-indigo-500 shadow-xl shadow-indigo-500/20 bg-white/80 dark:bg-slate-800/80 ring-4 ring-indigo-500/10'
                : 'border-slate-200/50 dark:border-slate-600/50 shadow-lg hover:shadow-xl hover:border-slate-300/50 dark:hover:border-slate-500/50'
            } ${loading ? 'opacity-60 cursor-not-allowed' : ''} ${
              charCount > 950 ? 'border-red-400 dark:border-red-500' : ''
            }`}
            placeholder={placeholderText}
            value={input}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={loading}
            maxLength={1000}
            required
            rows={8}
            style={{ minHeight: '200px' }}
            aria-label="프롬프트 입력"
          />
          
          {/* Character limit warning */}
          {charCount > 950 && (
            <div className="absolute top-3 right-3 px-3 py-1 bg-red-500 text-white rounded-lg text-xs font-medium animate-pulse">
              글자 수 한계 임박
            </div>
          )}

          {/* Focus glow effect */}
          {isFocused && (
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 -z-10 blur-xl"></div>
          )}
        </div>

        {/* Submit button with enhanced gradient design */}
        <button
          type="submit"
          disabled={loading || !input.trim() || charCount > 1000}
          className={`w-full btn btn-lg transition-all duration-300 relative overflow-hidden ${
            loading || !input.trim() || charCount > 1000
              ? 'opacity-50 cursor-not-allowed bg-slate-300 dark:bg-slate-600'
              : 'btn-primary group hover:shadow-2xl hover:shadow-indigo-500/30'
          }`}
        >
          {/* Button background gradient animation */}
          {!loading && input.trim() && charCount <= 1000 && (
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          )}
          
          <div className="relative flex items-center justify-center gap-3">
            {loading ? (
              <>
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span className="text-lg font-semibold">AI 처리 중...</span>
              </>
            ) : (
              <>
                <span className="text-2xl group-hover:scale-110 transition-transform duration-300">✨</span>
                <span className="text-lg font-semibold">{mainButtonText}</span>
                <span className="text-2xl group-hover:scale-110 transition-transform duration-300">🚀</span>
              </>
            )}
          </div>
        </button>

        {/* Quick action buttons */}
        {!loading && input.trim() && (
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => {
                setInput('');
                setCharCount(0);
              }}
              className="btn btn-secondary btn-sm flex-1"
            >
              <span className="mr-2">🗑️</span>
              초기화
            </button>
            <button
              type="button"
              onClick={() => {
                const examples = [
                  "미래적인 도시 풍경, 네온사인이 빛나는 밤 하늘, 사이버펑크 스타일, 4K 고화질",
                  "평화로운 숲속 오두막, 따뜻한 황금빛 햇살이 스며드는 아침, 자연스러운 조명",
                  "혁신적인 스마트폰 디자인, 미니멀한 인터페이스, 홀로그램 디스플레이, 투명한 소재"
                ];
                const randomExample = examples[Math.floor(Math.random() * examples.length)];
                setInput(randomExample);
                setCharCount(randomExample.length);
              }}
              className="btn btn-secondary btn-sm flex-1"
            >
              <span className="mr-2">🎲</span>
              예시
            </button>
          </div>
        )}

        {/* Enhanced keyboard shortcut hint */}
        <div className="text-center p-4 bg-slate-50/50 dark:bg-slate-800/30 rounded-xl border border-slate-200/50 dark:border-slate-600/50">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            💡 <kbd className="px-2 py-1 bg-white dark:bg-slate-700 rounded border shadow-sm text-xs font-mono">⌘</kbd> + 
            <kbd className="px-2 py-1 bg-white dark:bg-slate-700 rounded border shadow-sm text-xs font-mono ml-1">Enter</kbd>
            로 빠른 변환 (Mac) 또는 
            <kbd className="px-2 py-1 bg-white dark:bg-slate-700 rounded border shadow-sm text-xs font-mono ml-1">Ctrl</kbd> + 
            <kbd className="px-2 py-1 bg-white dark:bg-slate-700 rounded border shadow-sm text-xs font-mono ml-1">Enter</kbd>
            (Windows)
          </p>
        </div>
      </form>
    </div>
  );
};