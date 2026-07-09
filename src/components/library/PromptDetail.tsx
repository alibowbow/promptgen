import { useEffect } from 'react';
import type { LibraryPrompt } from '../../data/types';
import { CATEGORY_BY_SLUG } from '../../data/categories';
import { useLibraryStore } from '../../stores/libraryStore';
import { useInputStore } from '../../stores/inputStore';
import { useViewStore } from '../../stores/viewStore';
import { useClipboard } from '../../hooks/useClipboard';
import { useToastStore } from '../../stores/toastStore';

export const PromptDetail = ({
  prompt,
  onClose,
}: {
  prompt: LibraryPrompt;
  onClose: () => void;
}) => {
  const isFavorite = useLibraryStore((s) => s.favorites.includes(prompt.id));
  const toggleFavorite = useLibraryStore((s) => s.toggleFavorite);
  const setInput = useInputStore((s) => s.setInput);
  const setView = useViewStore((s) => s.setView);
  const { copied, copyToClipboard } = useClipboard();
  const success = useToastStore((s) => s.success);
  const info = useToastStore((s) => s.info);
  const category = CATEGORY_BY_SLUG[prompt.category];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const useInGenerator = () => {
    setInput(prompt.prompt);
    setView('generate');
    info('생성기로 옮겼어요. 원하는 대로 다듬어 사용하세요!');
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={prompt.title}
        className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 space-y-5">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div>
              {category && (
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  {category.emoji} {category.label} · {prompt.difficulty}
                </div>
              )}
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-1">
                {prompt.title}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="닫기"
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xl shrink-0"
            >
              <span aria-hidden="true">✕</span>
            </button>
          </div>

          {/* The prompt */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">
                프롬프트
              </span>
              <button
                type="button"
                onClick={() => {
                  copyToClipboard(prompt.prompt);
                  success('프롬프트를 복사했어요.');
                }}
                className="text-xs px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-900/40 text-cyan-800 dark:text-cyan-200 hover:bg-cyan-200 dark:hover:bg-cyan-900/60"
              >
                {copied ? '✅ 복사됨' : '📋 복사'}
              </button>
            </div>
            <pre className="whitespace-pre-wrap font-mono text-sm text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl p-4">
              {prompt.prompt}
            </pre>
          </div>

          {/* Why it works */}
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-900/40 p-4">
              <div className="text-xs font-bold text-indigo-600 dark:text-indigo-300 mb-1">
                핵심 원리
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-200">{prompt.principle}</p>
            </div>
            <div className="rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-700/40 p-4">
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">
                왜 효과적인가
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-200">{prompt.why}</p>
            </div>
          </div>

          {prompt.tip && (
            <p className="text-sm text-slate-500 dark:text-slate-400">💡 {prompt.tip}</p>
          )}

          {/* Tags */}
          {prompt.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {prompt.tags.map((t) => (
                <span
                  key={t}
                  className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                >
                  #{t}
                </span>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2 flex-wrap pt-2">
            <button type="button" onClick={useInGenerator} className="btn btn-primary btn-sm">
              생성기에서 사용 →
            </button>
            <button
              type="button"
              onClick={() => toggleFavorite(prompt.id)}
              aria-pressed={isFavorite}
              className="btn btn-secondary btn-sm"
            >
              {isFavorite ? '★ 즐겨찾기됨' : '☆ 즐겨찾기'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
