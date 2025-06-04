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

  const categoryDescriptions = {
    image: '이미지 생성 AI를 위한 프롬프트',
    video: '비디오 생성 AI를 위한 프롬프트',
    document: '문서 작성 AI를 위한 프롬프트',
    code: '코딩 AI를 위한 프롬프트'
  };

  return (
    <div className="card-body">
      <div className="mb-4">
        <h3 className="heading-4 mb-2">카테고리 선택</h3>
        <p className="caption">
          프롬프트를 사용할 AI 모델의 종류를 선택하세요
        </p>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setCategory(cat.key)}
            disabled={loading}
            className={`group relative p-4 rounded-xl border-2 transition-all duration-200 touch-target ${
              category === cat.key
                ? 'border-primary-500 bg-primary-50 shadow-medium scale-105'
                : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-soft hover:scale-[1.02]'
            } ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            aria-pressed={category === cat.key}
            aria-label={`카테고리를 ${cat.label}로 설정`}
          >
            {/* Selection indicator */}
            {category === cat.key && (
              <div className="absolute top-2 right-2 w-4 h-4 bg-primary-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            )}
            
            {/* Content */}
            <div className="text-center space-y-2">
              <div className="text-2xl">
                {categoryIcons[cat.key]}
              </div>
              <div>
                <div className={`font-medium text-sm ${
                  category === cat.key 
                    ? 'text-primary-700' 
                    : 'text-slate-700 group-hover:text-slate-900'
                }`}>
                  {cat.label}
                </div>
                <div className="caption text-xs mt-1 leading-tight">
                  {categoryDescriptions[cat.key]}
                </div>
              </div>
            </div>
            
            {/* Loading indicator */}
            {loading && category === cat.key && (
              <div className="absolute inset-0 bg-white/80 rounded-xl flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </button>
        ))}
      </div>
      
      {/* Category info */}
      {category && (
        <div className="mt-4 p-3 bg-primary-50 rounded-xl border border-primary-200">
          <div className="flex items-start gap-3">
            <div className="text-xl">{categoryIcons[category]}</div>
            <div className="flex-1">
              <h4 className="font-medium text-primary-900 text-sm mb-1">
                {CATEGORIES.find(c => c.key === category)?.label} 카테고리
              </h4>
              <p className="caption text-primary-700">
                {categoryDescriptions[category]}. 이 카테고리에 맞는 최적화된 프롬프트를 생성합니다.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};