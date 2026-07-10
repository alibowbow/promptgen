import { MODULES, TOTAL_LESSONS } from '../../data/curriculum';
import { useLearningStore } from '../../stores/learningStore';
import { useViewStore } from '../../stores/viewStore';
import { LessonView } from './LessonView';
import type { Module } from '../../data/types';

const LEVEL_STYLES: Record<string, string> = {
  입문: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  중급: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  고급: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300',
};

const ModuleCard = ({
  module,
  onOpenLesson,
}: {
  module: Module;
  onOpenLesson: (id: string) => void;
}) => {
  const completedLessons = useLearningStore((s) => s.completedLessons);
  const done = module.lessons.filter((l) => completedLessons.includes(l.id)).length;
  const total = module.lessons.length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div className="glass-card">
      <div className="glass-card-body">
        <div className="flex items-start gap-4">
          <div className="text-3xl" aria-hidden="true">
            {module.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                {module.title}
              </h3>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium ${LEVEL_STYLES[module.level]}`}
              >
                {module.level}
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              {module.description}
            </p>
          </div>
          <div className="text-right shrink-0">
            <div className="text-sm font-bold text-indigo-600 dark:text-indigo-300 tabular-nums">
              {done}/{total}
            </div>
            <div className="text-xs text-slate-400">완료</div>
          </div>
        </div>

        <div className="mt-4 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>

        <ul className="mt-4 divide-y divide-slate-100 dark:divide-slate-700/50">
          {module.lessons.map((lesson, i) => {
            const isDone = completedLessons.includes(lesson.id);
            return (
              <li key={lesson.id}>
                <button
                  type="button"
                  onClick={() => onOpenLesson(lesson.id)}
                  className="w-full flex items-center gap-3 py-2.5 text-left group"
                >
                  <span
                    className={`w-5 h-5 shrink-0 rounded-full border-2 flex items-center justify-center text-[10px] ${
                      isDone
                        ? 'bg-emerald-500 border-emerald-500 text-white'
                        : 'border-slate-300 dark:border-slate-600 text-transparent'
                    }`}
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  <span className="text-xs text-slate-400 tabular-nums w-5">
                    {i + 1}
                  </span>
                  <span className="flex-1 text-sm text-slate-700 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                    {lesson.title}
                  </span>
                  <span
                    className="text-slate-300 dark:text-slate-600 group-hover:translate-x-0.5 transition-transform"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export const LearnView = () => {
  const activeLessonId = useViewStore((s) => s.activeLessonId);
  const openLesson = useViewStore((s) => s.openLesson);
  const closeLesson = useViewStore((s) => s.closeLesson);
  const completedLessons = useLearningStore((s) => s.completedLessons);
  const doneCount = completedLessons.length;
  const pct = TOTAL_LESSONS > 0 ? Math.round((doneCount / TOTAL_LESSONS) * 100) : 0;

  if (activeLessonId) {
    return (
      <LessonView
        lessonId={activeLessonId}
        onNavigate={openLesson}
        onExit={closeLesson}
      />
    );
  }

  return (
    <div className="animate-fade-in space-y-6">
      {/* Intro / overall progress */}
      <div className="glass-card">
        <div className="glass-card-body">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            프롬프트 엔지니어링, 기초부터 체계적으로
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
            지엽적인 테크닉이 아니라 <strong className="text-indigo-600 dark:text-indigo-300">어떤 AI·어떤 주제에도 통하는 근본 원리</strong>를
            순서대로 익힙니다. 각 레슨은 개념 → 핵심 원칙 → 좋은 예/나쁜 예 → 체크리스트 → 연습으로 구성됩니다.
          </p>
          <div className="mt-5 flex items-center gap-4">
            <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="text-sm font-semibold text-slate-600 dark:text-slate-300 tabular-nums">
              {doneCount}/{TOTAL_LESSONS} 완료 ({pct}%)
            </span>
          </div>
        </div>
      </div>

      {MODULES.map((module) => (
        <ModuleCard key={module.id} module={module} onOpenLesson={openLesson} />
      ))}
    </div>
  );
};
