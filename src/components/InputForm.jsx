import { useState } from 'react';
import { useInputStore } from '../stores/inputStore.js';
import { useConfigStore } from '../stores/configStore.js';
import { usePromptConverter } from '../hooks/usePromptConverter.js';
import { CATEGORIES } from '../lib/constants.js';

export const InputForm = () => {
  const { input, setInput, loading } = useInputStore();
  const { category, outputLanguage } = useConfigStore();
  const { handleConvert } = usePromptConverter();
  const [charCount, setCharCount] = useState(input?.length || 0);

  const selectedCat = CATEGORIES.find((c) => c.key === category);
  
  const mainButtonText = outputLanguage === 'en' ? 
    `${selectedCat?.label || "선택"}용 영문 프롬프트 변환` : 
    `${selectedCat?.label || "선택"}용 한국어 최적화`;
  
  const placeholderText = `${selectedCat?.label || '작업'}에 맞는 아이디어나 내용을 입력하세요...\n\n예시:\n• "${selectedCat?.label}" 스타일의 아름다운 풍경\n• 창의적이고 혁신적인 디자인 콘셉트\n• 상세하고 구체적인 설명을 포함해주세요`;

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    setCharCount(value.length);
  };

  const getCharCountColor = () => {
    if (charCount > 800) return 'text-error-500';
    if (charCount > 600) return 'text-warning-500';
    return 'text-slate-500';
  };

  return (
    <div className="card-body">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="heading-4">프롬프트 입력</h3>
          <div className="flex items-center gap-2">
            <span className={`caption ${getCharCountColor()}`}>
              {charCount}/1000
            </span>
            {selectedCat && (
              <span className="inline-flex items-center px-2 py-1 rounded-lg bg-primary-100 text-primary-700 text-xs font-medium">
                {selectedCat.label}
              </span>
            )}
          </div>
        </div>
        <p className="caption">
          아이디어를 구체적이고 상세하게 입력할수록 더 좋은 결과를 얻을 수 있습니다
        </p>
      </div>

      <form onSubmit={handleConvert} className="space-y-4">
        {/* Enhanced textarea */}
        <div className="relative">
          <textarea
            className={`textarea min-h-[120px] sm:min-h-[140px] resize-none transition-all duration-200 ${
              loading ? 'opacity-60 cursor-not-allowed' : ''
            } ${charCount > 900 ? 'ring-2 ring-error-300' : ''}`}
            placeholder={placeholderText}
            value={input}
            onChange={handleInputChange}
            disabled={loading}
            maxLength={1000}
            required
            rows={6}
            aria-label="프롬프트 입력"
          />
          
          {/* Character limit warning */}
          {charCount > 900 && (
            <div className="absolute top-2 right-2 bg-error-100 text-error-700 px-2 py-1 rounded-lg text-xs">
              글자 수 제한 초과
            </div>
          )}
        </div>

        {/* Submit button with enhanced design */}
        <button
          type="submit"
          disabled={loading || !input.trim() || charCount > 1000}
          className={`w-full btn btn-lg touch-target transition-all duration-200 ${
            loading || !input.trim() || charCount > 1000
              ? 'btn-secondary opacity-50 cursor-not-allowed'
              : 'btn-primary hover:scale-[1.02] active:scale-[0.98] shadow-medium hover:shadow-strong'
          }`}
        >
          <div className="flex items-center justify-center gap-3">
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>AI 처리 중...</span>
              </>
            ) : (
              <>
                <span className="text-xl">✨</span>
                <span className="font-semibold">{mainButtonText}</span>
                <span className="text-xl">🚀</span>
              </>
            )}
          </div>
        </button>

        {/* Quick action buttons */}
        {!loading && input.trim() && (
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={() => setInput('')}
              className="btn btn-secondary btn-sm flex-1"
            >
              🗑️ 초기화
            </button>
            <button
              type="button"
              onClick={() => {
                const examples = [
                  "미래 도시의 아름다운 스카이라인, 네온사인이 빛나는 밤",
                  "평화로운 숲속 오두막, 따뜻한 황금빛 햇살",
                  "창의적인 우주 탐험 컨셉, 신비로운 행성들"
                ];
                const randomExample = examples[Math.floor(Math.random() * examples.length)];
                setInput(randomExample);
                setCharCount(randomExample.length);
              }}
              className="btn btn-secondary btn-sm flex-1"
            >
              🎲 예시
            </button>
          </div>
        )}

        {/* Keyboard shortcut hint */}
        <div className="text-center">
          <p className="caption text-slate-400">
            💡 <kbd className="px-2 py-1 bg-slate-100 rounded text-xs">Ctrl</kbd> + 
            <kbd className="px-2 py-1 bg-slate-100 rounded text-xs ml-1">Enter</kbd>로 빠른 변환
          </p>
        </div>
      </form>
    </div>
  );
};