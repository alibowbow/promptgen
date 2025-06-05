import { useState } from 'react';
import { useConfigStore } from '../stores/configStore.js';
import { STYLE_OPTIONS_BY_CATEGORY, PREMIUM_STYLE_TREES } from '../lib/constants.js';

export const StyleOptions = () => {
  const { category, styleMode, setStyleMode } = useConfigStore();
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isExpanded, setIsExpanded] = useState(false);

  const categoryOptions = STYLE_OPTIONS_BY_CATEGORY[category] || {};
  const premiumTree = PREMIUM_STYLE_TREES[category] || [];
  const [premiumSelected, setPremiumSelected] = useState([]);

  const handleOptionSelect = (groupKey, value) => {
    setSelectedOptions(prev => ({
      ...prev,
      [groupKey]: prev[groupKey] === value ? null : value // Allow deselection
    }));
  };

  const togglePremium = (value) => {
    setPremiumSelected((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  const renderPremiumTree = (nodes, depth = 0) => (
    <ul className="space-y-1" style={{ marginLeft: depth * 16 }}>
      {nodes.map((node) => (
        <li key={node.key}>
          <button
            type="button"
            onClick={() => node.children ? null : togglePremium(node.key)}
            className={`text-left w-full px-2 py-1 rounded transition-colors ${
              premiumSelected.includes(node.key)
                ? 'bg-indigo-500/20 dark:bg-indigo-800/30'
                : 'hover:bg-slate-100 dark:hover:bg-slate-700/50'
            }`}
          >
            {node.label}
          </button>
          {node.children && renderPremiumTree(node.children, depth + 1)}
        </li>
      ))}
    </ul>
  );

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
              className={`group px-3 py-2 rounded-xl transition-all duration-300 ${
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

  const selectedCount =
    Object.values(selectedOptions).filter(v => v).length + premiumSelected.length;

  return (
    <div className="glass-card">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/20 dark:hover:bg-slate-700/20 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">🎨</span>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">
              스타일 옵션 {selectedCount > 0 && `(${selectedCount}개 선택)`}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              선택사항 • 더 정교한 결과
            </p>
          </div>
        </div>
        <span className={`text-xl transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
          🔽
        </span>
      </div>

        {isExpanded && (
          <div className="border-t border-white/20 dark:border-slate-700/30 p-4">
            <div className="flex justify-end mb-4 gap-2">
              <button
                type="button"
                onClick={() => setStyleMode('basic')}
                className={`px-3 py-1 rounded text-sm border ${styleMode === 'basic' ? 'bg-indigo-500 text-white' : 'bg-white dark:bg-slate-700'}`}
              >
                Basic
              </button>
              <button
                type="button"
                onClick={() => setStyleMode('premium')}
                className={`px-3 py-1 rounded text-sm border ${styleMode === 'premium' ? 'bg-indigo-500 text-white' : 'bg-white dark:bg-slate-700'}`}
              >
                Premium
              </button>
            </div>
            {styleMode === 'basic' ? (
              <div className="space-y-6">
                {Object.entries(categoryOptions).map(([groupKey, options]) =>
                  renderOptionGroup(groupKey, options)
                )}
              </div>
            ) : (
              <div className="max-h-72 overflow-y-auto pr-2">
                {renderPremiumTree(premiumTree)}
              </div>
            )}

          {/* No options selected hint */}
          {Object.keys(categoryOptions).length > 0 && Object.values(selectedOptions).every(v => !v) && (
            <div className="mt-6 p-4 bg-slate-50/50 dark:bg-slate-800/30 rounded-xl border border-slate-200/30 dark:border-slate-600/30">
              <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
                💡 옵션을 선택하지 않으면 AI가 자동으로 최적의 스타일을 결정합니다
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
