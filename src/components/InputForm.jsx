import { useInputStore } from '../stores/inputStore.js';
import { useConfigStore } from '../stores/configStore.js';
import { usePromptConverter } from '../hooks/usePromptConverter.js';
import { CATEGORIES } from '../lib/constants.js';

export const InputForm = () => {
  const { input, setInput, loading } = useInputStore();
  const { category, outputLanguage } = useConfigStore();
  const { handleConvert } = usePromptConverter();

  const selectedCat = CATEGORIES.find((c) => c.key === category);
  
  const mainButtonText = outputLanguage === 'en' ? 
    `${selectedCat?.label || "선택"}용 영문 프롬프트 변환하기` : 
    `${selectedCat?.label || "선택"}용 한국어 프롬프트 최적화하기`;
  
  const placeholderText = `최적화하고 싶은 아이디어나 내용을 입력해주세요 😊 (예: "${selectedCat?.label || '작업'} 카테고리에서 '미래 도시의 모습' 또는 '효율적인 아침 루틴에 대한 글')`;

  return (
    <form onSubmit={handleConvert} className="flex flex-col gap-4">
      <textarea
        className="w-full h-28 rounded-xl border border-slate-200 p-3 text-base focus:ring-2 focus:ring-indigo-300 resize-none transition-shadow duration-150 ease-in-out shadow-sm hover:shadow-md focus:shadow-lg"
        placeholder={placeholderText} 
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={loading}
        maxLength={1000}
        required
      />
      <button
        type="submit"
        className={`w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl shadow-md transition-all duration-150 ease-in-out hover:bg-indigo-700 active:scale-95 ${
          loading
            ? "opacity-60 cursor-not-allowed"
            : "hover:shadow-lg active:bg-indigo-800"
        }`}
        disabled={loading}
      >
        {loading ? "AI 처리 중..." : mainButtonText}
      </button>
    </form>
  );
};