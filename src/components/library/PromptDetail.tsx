import { useEffect, useState } from 'react';
import type { LibraryPrompt } from '../../data/types';
import { CATEGORY_BY_SLUG } from '../../data/categories';
import { relatedPrompts, moduleForCategory } from '../../data/crossLinks';
import { useLibraryStore } from '../../stores/libraryStore';
import { useInputStore } from '../../stores/inputStore';
import { useViewStore } from '../../stores/viewStore';
import { useLearningStore } from '../../stores/learningStore';
import { useClipboard } from '../../hooks/useClipboard';
import { useToastStore } from '../../stores/toastStore';

export const PromptDetail = ({
  prompt,
  onClose,
}: {
  prompt: LibraryPrompt;
  onClose: () => void;
}) => {
  // Related-prompt links swap the modal content in place.
  const [p, setP] = useState(prompt);
  useEffect(() => setP(prompt), [prompt]);

  const isFavorite = useLibraryStore((s) => s.favorites.includes(p.id));
  const toggleFavorite = useLibraryStore((s) => s.toggleFavorite);
  const setInput = useInputStore((s) => s.setInput);
  const setView = useViewStore((s) => s.setView);
  const openLesson = useViewStore((s) => s.openLesson);
  const completedLessons = useLearningStore((s) => s.completedLessons);
  const { copied, copyToClipboard } = useClipboard();
  const success = useToastStore((s) => s.success);
  const info = useToastStore((s) => s.info);

  const category = CATEGORY_BY_SLUG[p.category];
  const related = relatedPrompts(p);
  const teachModule = moduleForCategory(p.category);
  const teachLesson = teachModule
    ? (teachModule.lessons.find((l) => !completedLessons.includes(l.id)) ??
      teachModule.lessons[0])
    : undefined;

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
    setInput(p.prompt);
    setView('generate');
    info('생성기로 옮겼어요. 원하는 대로 다듬어 사용하세요!');
  };

  const goToLesson = () => {
    if (!teachLesson) return;
    onClose();
    openLesson(teachLesson.id);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={p.title}
        className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 space-y-5">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div>
              {category && (
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  {category.emoji} {category.label} · {p.difficulty}
                </div>
              )}
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-1">
                {p.title}
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
                  copyToClipboard(p.prompt);
                  success('프롬프트를 복사했어요.');
                }}
                className="text-xs px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-900/40 text-cyan-800 dark:text-cyan-200 hover:bg-cyan-200 dark:hover:bg-cyan-900/60"
              >
                {copied ? '✅ 복사됨' : '📋 복사'}
              </button>
            </div>
            <pre className="whitespace-pre-wrap font-mono text-sm text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl p-4">
              {p.prompt}
            </pre>
          </div>

          {/* Worked example: the template filled for a real scenario */}
          {p.example && (
            <details
              open
              className="rounded-xl border border-emerald-200/60 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-950/20 overflow-hidden"
            >
              <summary className="cursor-pointer px-4 py-3 text-xs font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-300 select-none">
                📌 사용 예시 — 빈칸을 채우면 이렇게
              </summary>
              <div className="px-4 pb-4 space-y-2">
                <pre className="whitespace-pre-wrap font-mono text-sm text-slate-700 dark:text-slate-200 bg-white/70 dark:bg-slate-900/50 border border-emerald-100 dark:border-emerald-900/30 rounded-lg p-3">
                  {p.example}
                </pre>
                {p.exampleNote && (
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    💡 {p.exampleNote}
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => {
                    copyToClipboard(p.example ?? '');
                    success('예시 프롬프트를 복사했어요.');
                  }}
                  className="text-xs px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-200 dark:hover:bg-emerald-900/60"
                >
                  📋 예시 복사
                </button>
              </div>
            </details>
          )}

          {/* Situational variations */}
          {p.variations && p.variations.length > 0 && (
            <details className="rounded-xl border border-slate-200/60 dark:border-slate-700/40 bg-slate-50/60 dark:bg-slate-900/30 overflow-hidden">
              <summary className="cursor-pointer px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-600 dark:text-slate-300 select-none">
                🔀 변형 {p.variations.length}종 — 상황에 맞게 골라 쓰기
              </summary>
              <div className="px-4 pb-4 space-y-3">
                {p.variations.map((v, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-slate-200/70 dark:border-slate-700/50 bg-white/70 dark:bg-slate-900/50 p-3"
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-300">
                        {v.label}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          copyToClipboard(v.prompt);
                          success(`"${v.label}" 변형을 복사했어요.`);
                        }}
                        className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-900/40 text-cyan-800 dark:text-cyan-200 hover:bg-cyan-200 dark:hover:bg-cyan-900/60"
                      >
                        📋 복사
                      </button>
                    </div>
                    <pre className="whitespace-pre-wrap font-mono text-xs text-slate-600 dark:text-slate-300">
                      {v.prompt}
                    </pre>
                  </div>
                ))}
              </div>
            </details>
          )}

          {/* Why it works */}
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-900/40 p-4">
              <div className="text-xs font-bold text-indigo-600 dark:text-indigo-300 mb-1">
                핵심 원리
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-200">{p.principle}</p>
            </div>
            <div className="rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-700/40 p-4">
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">
                왜 효과적인가
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-200">{p.why}</p>
            </div>
          </div>

          {p.tip && (
            <p className="text-sm text-slate-500 dark:text-slate-400">💡 {p.tip}</p>
          )}

          {/* Learn the principle behind this prompt */}
          {teachModule && teachLesson && (
            <button
              type="button"
              onClick={goToLesson}
              className="w-full text-left rounded-xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200/60 dark:border-purple-900/40 p-4 hover:border-purple-400 transition-colors group"
            >
              <div className="text-xs font-bold text-purple-600 dark:text-purple-300 mb-1">
                📚 이 원리를 제대로 배우기
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-200">
                {teachModule.emoji} <strong>{teachModule.title}</strong> ·{' '}
                {teachLesson.title}
                <span
                  className="ml-1 text-purple-400 group-hover:translate-x-0.5 inline-block transition-transform"
                  aria-hidden="true"
                >
                  →
                </span>
              </p>
            </button>
          )}

          {/* Tags */}
          {p.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                >
                  #{t}
                </span>
              ))}
            </div>
          )}

          {/* Related prompts */}
          {related.length > 0 && (
            <div>
              <div className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
                비슷한 프롬프트
              </div>
              <div className="flex flex-col gap-1.5">
                {related.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setP(r)}
                    className="text-left text-sm text-indigo-600 dark:text-indigo-300 hover:underline"
                  >
                    ↳ {r.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2 flex-wrap pt-2">
            <button type="button" onClick={useInGenerator} className="btn btn-primary btn-sm">
              생성기에서 사용 →
            </button>
            <button
              type="button"
              onClick={() => toggleFavorite(p.id)}
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
