import { useState } from 'react';
import { useInputStore } from '../stores/inputStore.js';
import { useResultStore } from '../stores/resultStore.js';
import { useConfigStore } from '../stores/configStore.js';
import { useToastStore } from '../stores/toastStore.js';
import { PromptAnalyzer } from '../lib/promptAnalyzer.js';

export const ExperimentalFeatures = () => {
  const [showPanel, setShowPanel] = useState(false);
  const [activeFeature, setActiveFeature] = useState('quality');
  const [analysis, setAnalysis] = useState(null);
  const [keywords, setKeywords] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  
  const { input, setInput } = useInputStore();
  const { result } = useResultStore();
  const { category } = useConfigStore();
  const { info, success } = useToastStore();

  const analyzeQuality = () => {
    if (!input.trim()) {
      info('분석할 텍스트를 입력해주세요.');
      return;
    }

    const qualityAnalysis = PromptAnalyzer.analyzeQuality(input);
    const extractedKeywords = PromptAnalyzer.extractKeywords(input);
    const improvementSuggestions = PromptAnalyzer.suggestImprovements(input, qualityAnalysis);
    
    setAnalysis(qualityAnalysis);
    setKeywords(extractedKeywords);
    setSuggestions(improvementSuggestions);
    setActiveFeature('quality');
  };

  const compressPrompt = () => {
    if (!input.trim()) {
      info('압축할 프롬프트를 입력해주세요.');
      return;
    }

    const compressed = PromptAnalyzer.compressPrompt(input);
    setInput(compressed);
    success('프롬프트가 압축되었습니다.');
  };

  const expandPrompt = () => {
    if (!input.trim()) {
      info('확장할 프롬프트를 입력해주세요.');
      return;
    }

    const expanded = PromptAnalyzer.expandPrompt(input, category);
    setInput(expanded);
    success('프롬프트가 확장되었습니다.');
  };

  const generateSimilarPrompts = () => {
    if (!input.trim()) {
      info('기준이 될 프롬프트를 입력해주세요.');
      return;
    }

    // Simple similar prompt generation based on keywords
    const keywordList = PromptAnalyzer.extractKeywords(input, 5);
    const similarPrompts = generateVariations(input, keywordList);
    
    setActiveFeature('similar');
    setSuggestions(similarPrompts.map(prompt => ({ type: 'similar', message: prompt })));
  };

  const generateVariations = (originalText, keywords) => {
    const variations = [];
    const modifiers = ['detailed', 'artistic', 'realistic', 'creative', 'professional', 'minimalist'];
    const perspectives = ['close-up view of', 'wide shot of', 'aerial view of', 'side view of'];
    
    // Add modifier variations
    keywords.slice(0, 3).forEach(({ word }) => {
      const modifier = modifiers[Math.floor(Math.random() * modifiers.length)];
      variations.push(`${modifier} ${word} ${originalText.replace(word, '').trim()}`);
    });

    // Add perspective variations (for image category)
    if (category === 'image' && variations.length < 3) {
      perspectives.forEach(perspective => {
        variations.push(`${perspective} ${originalText}`);
      });
    }

    return variations.slice(0, 4);
  };

  const getScoreColor = (score) => {
    if (score >= 4.5) return 'text-green-600';
    if (score >= 3.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score) => {
    if (score >= 4.5) return '우수';
    if (score >= 3.5) return '보통';
    return '개선 필요';
  };

  if (!showPanel) {
    return (
      <button
        onClick={() => setShowPanel(true)}
        className="px-3 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors text-sm font-medium"
      >
        🧪 실험 기능
      </button>
    );
  }

  return (
    <div className="mb-4 p-4 bg-amber-50 rounded-xl border border-amber-200">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-amber-800">🧪 실험적 기능</h3>
        <button
          onClick={() => setShowPanel(false)}
          className="text-amber-600 hover:text-amber-800 text-sm"
        >
          ✕
        </button>
      </div>

      {/* Feature Buttons */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <button
          onClick={analyzeQuality}
          className="p-2 bg-white rounded-lg border border-amber-200 hover:border-amber-300 text-sm text-amber-700 transition-colors"
        >
          📊 품질 분석
        </button>
        <button
          onClick={generateSimilarPrompts}
          className="p-2 bg-white rounded-lg border border-amber-200 hover:border-amber-300 text-sm text-amber-700 transition-colors"
        >
          🔄 유사 추천
        </button>
        <button
          onClick={compressPrompt}
          className="p-2 bg-white rounded-lg border border-amber-200 hover:border-amber-300 text-sm text-amber-700 transition-colors"
        >
          📉 압축하기
        </button>
        <button
          onClick={expandPrompt}
          className="p-2 bg-white rounded-lg border border-amber-200 hover:border-amber-300 text-sm text-amber-700 transition-colors"
        >
          📈 확장하기
        </button>
      </div>

      {/* Quality Analysis Results */}
      {activeFeature === 'quality' && analysis && (
        <div className="bg-white rounded-lg p-3 border border-amber-200">
          <h4 className="font-medium text-amber-800 mb-3">품질 분석 결과</h4>
          
          {/* Overall Score */}
          <div className="mb-3 p-2 bg-amber-50 rounded">
            <div className="flex items-center justify-between">
              <span className="text-sm text-amber-700">전체 점수</span>
              <span className={`font-bold ${getScoreColor(analysis.overall)}`}>
                {analysis.overall}/5.0 ({getScoreLabel(analysis.overall)})
              </span>
            </div>
          </div>

          {/* Detailed Scores */}
          <div className="space-y-2 mb-3">
            {[
              { key: 'clarity', label: '명확성' },
              { key: 'specificity', label: '구체성' },
              { key: 'length', label: '길이' },
              { key: 'structure', label: '구조' },
              { key: 'creativity', label: '창의성' }
            ].map(({ key, label }) => (
              <div key={key} className="flex items-center justify-between text-sm">
                <span className="text-amber-700">{label}</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-amber-400 h-2 rounded-full" 
                      style={{ width: `${(analysis[key] / 5) * 100}%` }}
                    />
                  </div>
                  <span className={`font-medium ${getScoreColor(analysis[key])}`}>
                    {analysis[key].toFixed(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Keywords */}
          {keywords.length > 0 && (
            <div className="mb-3">
              <h5 className="text-sm font-medium text-amber-800 mb-2">주요 키워드</h5>
              <div className="flex flex-wrap gap-1">
                {keywords.slice(0, 8).map(({ word, count }) => (
                  <span 
                    key={word}
                    className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs"
                  >
                    {word} ({count})
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div>
              <h5 className="text-sm font-medium text-amber-800 mb-2">개선 제안</h5>
              <div className="space-y-1">
                {suggestions.map((suggestion, index) => (
                  <div key={index} className="text-xs text-amber-600 bg-amber-50 p-2 rounded">
                    💡 {suggestion.message}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Similar Prompts */}
      {activeFeature === 'similar' && suggestions.length > 0 && (
        <div className="bg-white rounded-lg p-3 border border-amber-200">
          <h4 className="font-medium text-amber-800 mb-3">유사 프롬프트 추천</h4>
          <div className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <div 
                key={index}
                className="p-2 bg-amber-50 rounded text-sm text-amber-700 cursor-pointer hover:bg-amber-100 transition-colors"
                onClick={() => {
                  setInput(suggestion.message);
                  success('프롬프트가 적용되었습니다.');
                }}
              >
                {suggestion.message}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Help Text */}
      <div className="mt-3 text-xs text-amber-600">
        ⚠️ 실험적 기능입니다. 결과는 참고용으로만 사용하세요.
      </div>
    </div>
  );
};