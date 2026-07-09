import { useState } from 'react';
import { useConfigStore } from '../stores/configStore';
import {
  STYLE_OPTIONS_BY_CATEGORY,
  PREMIUM_STYLE_TREES,
} from '../lib/constants';
import type { StyleOption, TreeNode } from '../lib/constants';

const GROUP_LABELS: Record<string, string> = {
  style: '스타일',
  tone: '톤',
  length: '길이',
  complexity: '복잡도',
};

export const StyleOptions = () => {
  const category = useConfigStore((s) => s.category);
  const styleMode = useConfigStore((s) => s.styleMode);
  const setStyleMode = useConfigStore((s) => s.setStyleMode);
  const basicStyle = useConfigStore((s) => s.basicStyle);
  const premiumStyle = useConfigStore((s) => s.premiumStyle);
  const setBasicStyleOption = useConfigStore((s) => s.setBasicStyleOption);
  const togglePremiumStyle = useConfigStore((s) => s.togglePremiumStyle);
  const clearStyleSelections = useConfigStore((s) => s.clearStyleSelections);

  const [isExpanded, setIsExpanded] = useState(false);

  const categoryOptions = STYLE_OPTIONS_BY_CATEGORY[category] || {};
  const premiumTree = PREMIUM_STYLE_TREES[category] || [];

  const renderPremiumTree = (nodes: TreeNode[], depth = 0) => (
    <ul className="space-y-1" style={{ marginLeft: depth * 16 }}>
      {nodes.map((node) => {
        const isLeaf = !node.children || node.children.length === 0;
        const selected = premiumStyle.includes(node.key);
        return (
          <li key={node.key}>
            {isLeaf ? (
              <button
                type="button"
                aria-pressed={selected}
                onClick={() => togglePremiumStyle(node.key)}
                className={`text-left w-full px-2 py-1 rounded transition-colors ${
                  selected
                    ? 'bg-indigo-500/20 dark:bg-indigo-800/30 text-indigo-800 dark:text-indigo-200'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/50'
                }`}
              >
                {node.label}
              </button>
            ) : (
              <div className="px-2 py-1 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                {node.label}
              </div>
            )}
            {node.children && renderPremiumTree(node.children, depth + 1)}
          </li>
        );
      })}
    </ul>
  );

  const renderOptionGroup = (groupKey: string, options: StyleOption[]) => {
    if (!options || options.length === 0) return null;

    return (
      <div key={groupKey} className="space-y-3">
        <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {GROUP_LABELS[groupKey] ?? groupKey}
        </h4>
        <div className="flex flex-wrap gap-2">
          {options.map((option) => {
            const selected = basicStyle[groupKey] === option.key;
            return (
              <button
                key={option.key}
                type="button"
                aria-pressed={selected}
                onClick={() => setBasicStyleOption(groupKey, option.key)}
                className={`group px-3 py-2 rounded-xl transition-all duration-300 ${
                  selected
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg motion-safe:scale-105'
                    : 'bg-white/80 dark:bg-slate-700/50 text-slate-700 dark:text-slate-200 border border-slate-200/50 dark:border-slate-600/50 hover:bg-gradient-to-r hover:from-indigo-100 hover:to-purple-100 dark:hover:from-indigo-900/20 dark:hover:to-purple-900/20 motion-safe:hover:scale-105'
                }`}
              >
                <div className="flex items-center gap-2">
                  {option.emoji && <span className="text-lg">{option.emoji}</span>}
                  <span className="text-sm font-medium">{option.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const selectedCount = Object.keys(basicStyle).length + premiumStyle.length;

  return (
    <div className="glass-card">
      <button
        type="button"
        aria-expanded={isExpanded}
        className="flex w-full items-center justify-between p-4 text-left cursor-pointer hover:bg-white/20 dark:hover:bg-slate-700/20 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <span className="text-xl" aria-hidden="true">🎨</span>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">
              스타일 옵션 {selectedCount > 0 && `(${selectedCount}개 선택)`}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              선택사항 • 프롬프트에 반영됩니다
            </p>
          </div>
        </div>
        <span
          className={`text-xl transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
          aria-hidden="true"
        >
          🔽
        </span>
      </button>

      {isExpanded && (
        <div className="border-t border-white/20 dark:border-slate-700/30 p-4">
          <div className="flex justify-between items-center mb-4 gap-2">
            {selectedCount > 0 ? (
              <button
                type="button"
                onClick={clearStyleSelections}
                className="text-xs text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
              >
                선택 초기화
              </button>
            ) : (
              <span />
            )}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setStyleMode('basic')}
                className={`px-3 py-1 rounded text-sm border ${styleMode === 'basic' ? 'bg-indigo-500 text-white border-indigo-500' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-600'}`}
              >
                Basic
              </button>
              <button
                type="button"
                onClick={() => setStyleMode('premium')}
                className={`px-3 py-1 rounded text-sm border ${styleMode === 'premium' ? 'bg-indigo-500 text-white border-indigo-500' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-600'}`}
              >
                Premium
              </button>
            </div>
          </div>

          {styleMode === 'basic' ? (
            Object.keys(categoryOptions).length > 0 ? (
              <div className="space-y-6">
                {Object.entries(categoryOptions).map(([groupKey, options]) =>
                  renderOptionGroup(groupKey, options)
                )}
              </div>
            ) : (
              <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-4">
                이 카테고리에는 기본 스타일 옵션이 없습니다. Premium 모드를 사용해보세요.
              </p>
            )
          ) : premiumTree.length > 0 ? (
            <div className="max-h-72 overflow-y-auto pr-2">
              {renderPremiumTree(premiumTree)}
            </div>
          ) : (
            <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-4">
              이 카테고리에는 프리미엄 옵션이 아직 없습니다.
            </p>
          )}

          {styleMode === 'basic' &&
            Object.keys(categoryOptions).length > 0 &&
            selectedCount === 0 && (
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
