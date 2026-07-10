import { useState } from 'react';
import { getQuiz } from '../../data/quizzes';
import { useQuizStore } from '../../stores/quizStore';
import { useLearningStore } from '../../stores/learningStore';
import { useToastStore } from '../../stores/toastStore';

export const QuizSection = ({ lessonId }: { lessonId: string }) => {
  const quiz = getQuiz(lessonId);
  const best = useQuizStore((s) => s.scores[lessonId]);
  const recordScore = useQuizStore((s) => s.recordScore);
  const markComplete = useLearningStore((s) => s.markComplete);
  const success = useToastStore((s) => s.success);

  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [graded, setGraded] = useState(false);

  if (!quiz || quiz.questions.length === 0) return null;

  const total = quiz.questions.length;
  const answeredAll = quiz.questions.every((_, i) => answers[i] !== undefined);
  const correctCount = quiz.questions.filter((q, i) => answers[i] === q.answer).length;

  const grade = () => {
    setGraded(true);
    recordScore(lessonId, correctCount, total);
    if (correctCount === total) {
      markComplete(lessonId);
      success('퀴즈 만점! 레슨을 완료로 표시했어요. 🎉');
    }
  };

  const retry = () => {
    setAnswers({});
    setGraded(false);
  };

  return (
    <section className="rounded-xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200/60 dark:border-purple-900/40 p-5">
      <div className="flex items-center justify-between gap-2 flex-wrap mb-4">
        <h2 className="text-sm font-bold uppercase tracking-wide text-purple-600 dark:text-purple-300">
          🧠 이해도 체크
        </h2>
        {best && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 tabular-nums">
            최고 기록 {best.correct}/{best.total}
          </span>
        )}
      </div>

      <div className="space-y-5">
        {quiz.questions.map((q, qi) => {
          const chosen = answers[qi];
          return (
            <fieldset key={qi}>
              <legend className="font-medium text-slate-800 dark:text-slate-100 text-sm mb-2">
                {qi + 1}. {q.q}
              </legend>
              <div className="space-y-1.5">
                {q.options.map((opt, oi) => {
                  const isChosen = chosen === oi;
                  const isAnswer = q.answer === oi;
                  let style =
                    'border-slate-200/70 dark:border-slate-700/50 bg-white/70 dark:bg-slate-800/60 hover:border-purple-300';
                  if (graded && isAnswer) {
                    style =
                      'border-emerald-400 bg-emerald-50/80 dark:bg-emerald-950/40';
                  } else if (graded && isChosen && !isAnswer) {
                    style = 'border-rose-400 bg-rose-50/80 dark:bg-rose-950/40';
                  } else if (isChosen) {
                    style =
                      'border-purple-400 bg-purple-50/80 dark:bg-purple-900/30';
                  }
                  return (
                    <label
                      key={oi}
                      className={`flex items-start gap-2.5 rounded-lg border px-3 py-2 text-sm cursor-pointer transition-colors ${style} ${graded ? 'cursor-default' : ''}`}
                    >
                      <input
                        type="radio"
                        name={`${lessonId}-q${qi}`}
                        checked={isChosen}
                        disabled={graded}
                        onChange={() => setAnswers((a) => ({ ...a, [qi]: oi }))}
                        className="mt-0.5 accent-purple-600"
                      />
                      <span className="text-slate-700 dark:text-slate-200">
                        {opt}
                        {graded && isAnswer && (
                          <span className="ml-1 text-emerald-600 dark:text-emerald-400" aria-hidden="true">✓</span>
                        )}
                      </span>
                    </label>
                  );
                })}
              </div>
              {graded && (
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 pl-1">
                  💡 {q.explain}
                </p>
              )}
            </fieldset>
          );
        })}
      </div>

      <div className="mt-5 flex items-center gap-3 flex-wrap">
        {!graded ? (
          <button
            type="button"
            onClick={grade}
            disabled={!answeredAll}
            className="btn btn-primary btn-sm disabled:opacity-40"
          >
            채점하기
          </button>
        ) : (
          <>
            <span
              className={`text-sm font-bold tabular-nums ${
                correctCount === total
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-slate-700 dark:text-slate-200'
              }`}
              role="status"
            >
              {correctCount === total ? '🎉 만점!' : `${correctCount}/${total} 정답`}
            </span>
            <button type="button" onClick={retry} className="btn btn-secondary btn-sm">
              다시 풀기
            </button>
          </>
        )}
        {!graded && !answeredAll && (
          <span className="text-xs text-slate-400">모든 문항에 답해주세요</span>
        )}
      </div>
    </section>
  );
};
