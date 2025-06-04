import { useState } from 'react';
import { useConfigStore } from '../stores/configStore.js';
import { STYLE_OPTIONS_BY_CATEGORY } from '../lib/constants.js';

export const StyleOptions = () => {
  const { category } = useConfigStore();
  const [selectedOptions, setSelectedOptions] = useState({});

  const categoryOptions = STYLE_OPTIONS_BY_CATEGORY[category] || {};

  const handleOptionSelect = (groupKey, value) => {
    setSelectedOptions(prev => ({
      ...prev,
      [groupKey]: prev[groupKey] === value ? null : value // Allow deselection
    }));
  };

  const renderOptionGroup = (groupKey, options) => {
    if (!options || options.length === 0) return null;

    const groupLabels = {
      style: '스타일',
      tone: '톤',
      length: '길이',
      complexity: '복잡도'
    };

    return (
      <div key={groupKey} className="space-y-3">
        <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {groupLabels[groupKey]}
        </h4>
        <div className="flex flex-wrap gap-2">
          {options.map((option) => (
            <button
              key={option.key}
              type="button"
              onClick={() => handleOptionSelect(groupKey, option.key)}
              className={`group px-4 py-2.5 rounded-xl transition-all duration-300 ${
                selectedOptions[groupKey] === option.key
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg transform scale-105'
                  : 'bg-white/80 dark:bg-slate-700/50 text-slate-700 dark:text-slate-200 border border-slate-200/50 dark:border-slate-600/50 hover:bg-gradient-to-r hover:from-indigo-100 hover:to-purple-100 dark:hover:from-indigo-900/20 dark:hover:to-purple-900/20 hover:scale-105'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{option.emoji}</span>
                <span className="text-sm font-medium">{option.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="glass-card-body">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2 tracking-tight">
          스타일 옵션 (선택사항)
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          선택하면 더 정교한 결과를 얻을 수 있습니다
        </p>
      </div>

      <div className="space-y-6">
        {Object.entries(categoryOptions).map(([groupKey, options]) => 
          renderOptionGroup(groupKey, options)
        )}
      </div>

      {/* No options selected hint */}
      {Object.keys(categoryOptions).length > 0 && Object.values(selectedOptions).every(v => !v) && (
        <div className="mt-6 p-4 bg-slate-50/50 dark:bg-slate-800/30 rounded-xl border border-slate-200/30 dark:border-slate-600/30">
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
            💡 옵션을 선택하지 않으면 AI가 자동으로 최적의 스타일을 결정합니다
          </p>
        </div>
      )}
    </div>
  );
};