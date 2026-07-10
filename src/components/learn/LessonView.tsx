import { useEffect, useState } from 'react';
import { ALL_LESSONS, getLesson, MODULES } from '../../data/curriculum';
import { relatedPromptsForLesson } from '../../data/crossLinks';
import type { LibraryPrompt } from '../../data/types';
import { useLearningStore } from '../../stores/learningStore';
import { useInputStore } from '../../stores/inputStore';
import { useViewStore } from '../../stores/viewStore';
import { useToastStore } from '../../stores/toastStore';
import { QuizSection } from './QuizSection';
import { PromptDetail } from '../library/PromptDetail';

interface Props {
  lessonId: string;
  onNavigate: (id: string) => void;
  onExit: () => void;
}

export const LessonView = ({ lessonId, onNavigate, onExit }: Props) => {
  const lesson = getLesson(lessonId);
  const isComplete = useLearningStore((s) => s.completedLessons.includes(lessonId));
  const toggleLesson = useLearningStore((s) => s.toggleLesson);
  const markComplete = useLearningStore((s) => s.markComplete);
  const setInput = useInputStore((s) => s.setInput);
  const setView = useViewStore((s) => s.setView);
  const info = useToastStore((s) => s.info);
  const [detailPrompt, setDetailPrompt] = useState<LibraryPrompt | null>(null);

  // Scroll to top whenever the lesson changes.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [lessonId]);

  if (!lesson) {
    return (
      <div className="glass-card">
        <div className="glass-card-body text-center text-slate-500">
          레슨을 찾을 수 없습니다.
          <button onClick={onExit} className="ml-2 text-indigo-600 underline">
            돌아가기
          </button>
        </div>
      </div>
    );
  }

  const module = MODULES.find((m) => m.id === lesson.moduleId);
  const idx = ALL_LESSONS.findIndex((l) => l.id === lessonId);
  const prev = idx > 0 ? ALL_LESSONS[idx - 1] : null;
  const next = idx < ALL_LESSONS.length - 1 ? ALL_LESSONS[idx + 1] : null;
  const lessonIndexInModule = module
    ? module.lessons.findIndex((l) => l.id === lessonId)
    : 0;
  const related = relatedPromptsForLesson(lesson.moduleId, lessonIndexInModule);

  const practiceInGenerator = () => {
    setInput(lesson.exercise);
    setView('generate');
    info('생성기에 연습 과제를 옮겼어요. 직접 프롬프트로 만들어보세요!');
  };

  const completeAndNext = () => {
    markComplete(lessonId);
    if (next) onNavigate(next.id);
    else onExit();
  };

  return (
    <article className="animate-fade-in max-w-3xl mx-auto">
      {/* Breadcrumb */}
      <button
        type="button"
        onClick={onExit}
        className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300 mb-4 inline-flex items-center gap-1"
      >
        <span aria-hidden="true">←</span> 커리큘럼
        {module && <span className="text-slate-300 dark:text-slate-600">/ {module.emoji} {module.title}</span>}
      </button>

      <div className="glass-card">
        <div className="glass-card-body space-y-8">
          {/* Header */}
          <header>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
              {lesson.title}
            </h1>
            <p className="text-slate-600 dark:text-slate-300 mt-2 text-lg">{lesson.summary}</p>
          </header>

          {/* Concept */}
          <section className="space-y-3">
            {lesson.concept.map((para, i) => (
              <p key={i} className="text-slate-700 dark:text-slate-200 leading-relaxed">
                {para}
              </p>
            ))}
          </section>

          {/* Principles */}
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-300 mb-3">
              핵심 원칙
            </h2>
            <ul className="space-y-2">
              {lesson.principles.map((p, i) => (
                <li key={i} className="flex gap-3 text-slate-700 dark:text-slate-200">
                  <span className="text-indigo-500 font-bold shrink-0" aria-hidden="true">
                    ●
                  </span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Example */}
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-300 mb-3">
              좋은 예 vs 나쁜 예
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="rounded-xl border border-rose-200/70 dark:border-rose-900/40 bg-rose-50/60 dark:bg-rose-950/20 p-4">
                <div className="text-xs font-bold text-rose-600 dark:text-rose-300 mb-2">
                  🚫 이렇게 하지 마세요
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-200 whitespace-pre-wrap">
                  {lesson.example.bad}
                </p>
              </div>
              <div className="rounded-xl border border-emerald-200/70 dark:border-emerald-900/40 bg-emerald-50/60 dark:bg-emerald-950/20 p-4">
                <div className="text-xs font-bold text-emerald-600 dark:text-emerald-300 mb-2">
                  ✅ 이렇게 해보세요
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-200 whitespace-pre-wrap">
                  {lesson.example.good}
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-3">
              💡 {lesson.example.note}
            </p>
          </section>

          {/* Checklist */}
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-300 mb-3">
              체크리스트
            </h2>
            <ul className="space-y-2">
              {lesson.checklist.map((c, i) => (
                <li key={i} className="flex gap-3 text-slate-700 dark:text-slate-200">
                  <span className="text-emerald-500 shrink-0" aria-hidden="true">
                    ☑
                  </span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Exercise */}
          <section className="rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-900/40 p-5">
            <h2 className="text-sm font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-300 mb-2">
              ✏️ 연습 과제
            </h2>
            <p className="text-slate-700 dark:text-slate-200">{lesson.exercise}</p>
            <button
              type="button"
              onClick={practiceInGenerator}
              className="btn btn-secondary btn-sm mt-4"
            >
              생성기에서 연습하기 →
            </button>
          </section>

          {/* Comprehension quiz */}
          <QuizSection lessonId={lessonId} />

          {/* Related library prompts */}
          {related.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-300 mb-3">
                🗂️ 이 원리를 쓰는 프롬프트
              </h2>
              <ul className="space-y-2">
                {related.map((p) => (
                  <li key={p.id}>
                    <button
                      type="button"
                      onClick={() => setDetailPrompt(p)}
                      className="w-full text-left rounded-xl border border-slate-200/60 dark:border-slate-700/40 bg-white/60 dark:bg-slate-800/50 px-4 py-3 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors group"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-300">
                          {p.title}
                        </span>
                        <span className="text-slate-300 dark:text-slate-600" aria-hidden="true">→</span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                        {p.principle}
                      </p>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>

      {detailPrompt && (
        <PromptDetail prompt={detailPrompt} onClose={() => setDetailPrompt(null)} />
      )}

      {/* Footer nav */}
      <div className="mt-6 flex items-center justify-between gap-3 flex-wrap">
        <button
          type="button"
          onClick={() => toggleLesson(lessonId)}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            isComplete
              ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
              : 'bg-white/70 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/40'
          }`}
        >
          {isComplete ? '✓ 완료함' : '완료로 표시'}
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={!prev}
            onClick={() => prev && onNavigate(prev.id)}
            className="btn btn-secondary btn-sm disabled:opacity-40"
          >
            ← 이전
          </button>
          {next ? (
            <button
              type="button"
              onClick={completeAndNext}
              className="btn btn-primary btn-sm"
            >
              완료하고 다음 →
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                markComplete(lessonId);
                onExit();
              }}
              className="btn btn-primary btn-sm"
            >
              완료하고 마치기 ✓
            </button>
          )}
        </div>
      </div>
    </article>
  );
};
