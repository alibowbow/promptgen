import { useConfigStore } from '../stores/configStore.js';
import { useInputStore } from '../stores/inputStore.js';

export const LanguageSelector = () => {
  const { outputLanguage, setOutputLanguage } = useConfigStore();
  const { loading } = useInputStore();

  const languages = [
    {
      key: 'en',
      label: '영어로 변환',
      icon: '🌐',
      description: 'Convert to English',
      color: 'primary'
    },
    {
      key: 'ko', 
      label: '한국어로 최적화',
      icon: '🇰🇷',
      description: 'Optimize in Korean',
      color: 'success'
    }
  ];

  return (
    <div className="card-body">
      <div className="mb-4">
        <h3 className="heading-4 mb-2">출력 언어 선택</h3>
        <p className="caption">프롬프트를 변환할 언어를 선택하세요</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {languages.map((lang) => (
          <button
            key={lang.key}
            onClick={() => setOutputLanguage(lang.key)}
            disabled={loading}
            className={`group relative p-4 rounded-xl border-2 transition-all duration-200 touch-target ${
              outputLanguage === lang.key
                ? lang.key === 'en' 
                  ? 'border-primary-500 bg-primary-50 shadow-medium scale-105'
                  : 'border-success-500 bg-success-50 shadow-medium scale-105'
                : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-soft hover:scale-[1.02]'
            } ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            aria-pressed={outputLanguage === lang.key}
            aria-label={`언어를 ${lang.label}로 설정`}
          >
            {/* Selection indicator */}
            {outputLanguage === lang.key && (
              <div className={`absolute top-2 right-2 w-4 h-4 rounded-full flex items-center justify-center ${
                lang.key === 'en' ? 'bg-primary-500' : 'bg-success-500'
              }`}>
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            )}
            
            {/* Content */}
            <div className="flex items-center gap-3">
              <div className="text-2xl">{lang.icon}</div>
              <div className="flex-1 text-left">
                <div className={`font-medium ${
                  outputLanguage === lang.key 
                    ? lang.key === 'en' ? 'text-primary-700' : 'text-success-700'
                    : 'text-slate-700 group-hover:text-slate-900'
                }`}>
                  {lang.label}
                </div>
                <div className="caption mt-1">
                  {lang.description}
                </div>
              </div>
            </div>
            
            {/* Loading indicator */}
            {loading && outputLanguage === lang.key && (
              <div className="absolute inset-0 bg-white/80 rounded-xl flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </button>
        ))}
      </div>
      
      {/* Additional info */}
      <div className="mt-4 p-3 bg-slate-50 rounded-xl">
        <p className="caption text-slate-600">
          💡 <strong>팁:</strong> 영어 변환은 글로벌 AI 모델에 적합하고, 한국어 최적화는 로컬 컨텍스트에 더 적합합니다.
        </p>
      </div>
    </div>
  );
};