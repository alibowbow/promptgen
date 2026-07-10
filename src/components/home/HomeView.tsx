import { useMemo, useState } from 'react';
import { MODULES, ALL_LESSONS, TOTAL_LESSONS } from '../../data/curriculum';
import { LIBRARY_PROMPTS, PROMPT_COUNT } from '../../data/library';
import { CATEGORIES } from '../../data/categories';
import type { LibraryPrompt } from '../../data/types';
import { useLearningStore } from '../../stores/learningStore';
import { useQuizStore } from '../../stores/quizStore';
import { useLibraryStore } from '../../stores/libraryStore';
import { useViewStore } from '../../stores/viewStore';
import { useClipboard } from '../../hooks/useClipboard';
import { useToastStore } from '../../stores/toastStore';
import { PromptDetail } from '../library/PromptDetail';

const StatTile = ({
  value,
  label,
  emoji,
}: {
  value: string;
  label: string;
  emoji: string;
}) => (
  <div className="glass-card">
    <div className="!p-4 sm:!p-5 glass-card-body">
      <div className="text-xl" aria-hidden="true">
        {emoji}
      </div>
      <div className="text-2xl font-black text-slate-900 dark:text-slate-100 tabular-nums mt-1">
        {value}
      </div>
      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{label}</div>
    </div>
  </div>
);

export const HomeView = () => {
  const completedLessons = useLearningStore((s) => s.completedLessons);
  const getStreak = useLearningStore((s) => s.getStreak);
  const scores = useQuizStore((s) => s.scores);
  const favorites = useLibraryStore((s) => s.favorites);
  const openLesson = useViewStore((s) => s.openLesson);
  const setView = useViewStore((s) => s.setView);
  const openLibraryCategory = useViewStore((s) => s.openLibraryCategory);
  const { copyToClipboard } = useClipboard();
  const success = useToastStore((s) => s.success);
  const [detailPrompt, setDetailPrompt] = useState<LibraryPrompt | null>(null);

  const doneSet = useMemo(() => new Set(completedLessons), [completedLessons]);
  const doneCount = completedLessons.filter((id) =>
    ALL_LESSONS.some((l) => l.id === id)
  ).length;
  const pct = Math.round((doneCount / TOTAL_LESSONS) * 100);
  const streak = getStreak();

  // Next lesson = first incomplete lesson in curriculum order.
  const nextLesson = ALL_LESSONS.find((l) => !doneSet.has(l.id));
  const nextModule = nextLesson
    ? MODULES.find((m) => m.id === nextLesson.moduleId)
    : null;

  // Quiz accuracy across best attempts.
  const quizEntries = Object.values(scores);
  const quizPct =
    quizEntries.length > 0
      ? Math.round(
          (quizEntries.reduce((s, q) => s + q.correct, 0) /
            quizEntries.reduce((s, q) => s + q.total, 0)) *
            100
        )
      : null;

  // Prompt of the day: deterministic daily rotation.
  const promptOfTheDay = useMemo(() => {
    const day = Math.floor(Date.now() / (24 * 60 * 60 * 1000));
    return LIBRARY_PROMPTS[day % LIBRARY_PROMPTS.length];
  }, []);

  const shortcutCategories = CATEGORIES.slice(0, 6);

  return (
    <div className="animate-fade-in space-y-6">
      {/* Hero: continue learning */}
      <div className="glass-card overflow-visible">
        <div className="glass-card-body">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
                {doneCount === 0
                  ? '프롬프트, 오늘부터 제대로 배워봐요'
                  : streak > 1
                    ? `🔥 ${streak}일 연속 학습 중!`
                    : '다시 오셨네요, 이어서 배워볼까요?'}
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mt-2">
                {nextLesson && nextModule ? (
                  <>
                    다음 레슨: <strong>{nextModule.emoji} {nextLesson.title}</strong>
                  </>
                ) : (
                  '모든 레슨을 완료했어요! 라이브러리에서 프롬프트를 탐색해보세요. 🎉'
                )}
              </p>
              <div className="mt-4 flex items-center gap-3">
                {nextLesson ? (
                  <button
                    type="button"
                    onClick={() => openLesson(nextLesson.id)}
                    className="btn btn-primary btn-md"
                  >
                    {doneCount === 0 ? '학습 시작하기' : '이어서 학습하기'} →
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setView('library')}
                    className="btn btn-primary btn-md"
                  >
                    라이브러리 탐색 →
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setView('learn')}
                  className="btn btn-secondary btn-md"
                >
                  커리큘럼 보기
                </button>
              </div>
            </div>

            {/* Progress ring */}
            <div className="shrink-0 self-center" aria-label={`전체 진도 ${pct}%`}>
              <div className="relative w-28 h-28">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle
                    cx="50" cy="50" r="42" fill="none" strokeWidth="10"
                    className="stroke-slate-200 dark:stroke-slate-700"
                  />
                  <circle
                    cx="50" cy="50" r="42" fill="none" strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={`${(pct / 100) * 264} 264`}
                    className="stroke-indigo-500"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black text-slate-900 dark:text-slate-100 tabular-nums">
                    {pct}%
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">
                    {doneCount}/{TOTAL_LESSONS} 레슨
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatTile emoji="✅" value={`${doneCount}/${TOTAL_LESSONS}`} label="완료한 레슨" />
        <StatTile emoji="🔥" value={`${streak}일`} label="연속 학습" />
        <StatTile
          emoji="🧠"
          value={quizPct === null ? '—' : `${quizPct}%`}
          label="퀴즈 정답률"
        />
        <StatTile emoji="⭐" value={`${favorites.length}`} label="즐겨찾기 프롬프트" />
      </div>

      {/* Prompt of the day */}
      <div className="glass-card">
        <div className="glass-card-body">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">
              ✨ 오늘의 프롬프트
            </h3>
            <span className="text-xs text-slate-400">
              {PROMPT_COUNT}개 중 매일 하나씩
            </span>
          </div>
          <button
            type="button"
            onClick={() => setDetailPrompt(promptOfTheDay)}
            className="text-left mt-3 group block w-full"
          >
            <div className="font-semibold text-indigo-600 dark:text-indigo-300 group-hover:underline">
              {promptOfTheDay.title}
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
              {promptOfTheDay.prompt}
            </p>
          </button>
          <div className="flex gap-2 mt-3">
            <button
              type="button"
              onClick={() => {
                copyToClipboard(promptOfTheDay.prompt);
                success('프롬프트를 복사했어요.');
              }}
              className="btn btn-secondary btn-sm"
            >
              📋 복사
            </button>
            <button
              type="button"
              onClick={() => setDetailPrompt(promptOfTheDay)}
              className="btn btn-secondary btn-sm"
            >
              자세히
            </button>
          </div>
        </div>
      </div>

      {/* Library shortcuts */}
      <div>
        <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-3">
          🗂️ 라이브러리 바로가기
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {shortcutCategories.map((c) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => openLibraryCategory(c.slug)}
              className="glass-card text-left hover:scale-[1.02] transition-transform"
            >
              <div className="!p-4 glass-card-body">
                <div className="text-xl" aria-hidden="true">{c.emoji}</div>
                <div className="font-semibold text-sm text-slate-900 dark:text-slate-100 mt-1">
                  {c.label}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                  {c.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {detailPrompt && (
        <PromptDetail prompt={detailPrompt} onClose={() => setDetailPrompt(null)} />
      )}
    </div>
  );
};
