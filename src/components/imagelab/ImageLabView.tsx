import { useMemo, useState } from 'react';
import {
  IMAGE_ANATOMY,
  IMAGE_VOCAB_TABLES,
  PROGRESSIVE_EXAMPLE,
} from '../../data/imageStudio';
import { useInputStore } from '../../stores/inputStore';
import { useViewStore } from '../../stores/viewStore';
import { useConfigStore } from '../../stores/configStore';
import { useClipboard } from '../../hooks/useClipboard';
import { useToastStore } from '../../stores/toastStore';

// Distinct hue per anatomy part, reused by the formula strip and detail card.
const PART_COLORS: Record<string, string> = {
  subject: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 border-indigo-300/60',
  style: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 border-purple-300/60',
  composition: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300 border-sky-300/60',
  lighting: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 border-amber-300/60',
  color: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300 border-rose-300/60',
  mood: 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300 border-teal-300/60',
  detail: 'bg-lime-100 text-lime-700 dark:bg-lime-900/40 dark:text-lime-300 border-lime-300/60',
  params: 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200 border-slate-300/60',
};

export const ImageLabView = () => {
  const [activePart, setActivePart] = useState(IMAGE_ANATOMY[0]?.key ?? 'subject');
  const [stepIdx, setStepIdx] = useState(0);
  const [activeTable, setActiveTable] = useState(IMAGE_VOCAB_TABLES[0]?.key ?? 'lighting');
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);
  const [picked, setPicked] = useState<string[]>([]);
  const [subject, setSubject] = useState('');
  const [trayOpen, setTrayOpen] = useState(true);

  const setInput = useInputStore((s) => s.setInput);
  const setView = useViewStore((s) => s.setView);
  const setCategory = useConfigStore((s) => s.setCategory);
  const { copyToClipboard } = useClipboard();
  const success = useToastStore((s) => s.success);
  const info = useToastStore((s) => s.info);

  const part = IMAGE_ANATOMY.find((a) => a.key === activePart) ?? IMAGE_ANATOMY[0];
  const step = PROGRESSIVE_EXAMPLE[stepIdx];
  const table =
    IMAGE_VOCAB_TABLES.find((t) => t.key === activeTable) ?? IMAGE_VOCAB_TABLES[0];

  const togglePick = (en: string) =>
    setPicked((prev) =>
      prev.includes(en) ? prev.filter((p) => p !== en) : [...prev, en]
    );

  // Assemble: subject first, descriptive keywords comma-joined, --params trailing.
  const assembled = useMemo(() => {
    const words = picked.filter((p) => !p.startsWith('--'));
    const params = picked.filter((p) => p.startsWith('--'));
    const head = subject.trim() || '[주제를 입력하세요]';
    const body = words.length > 0 ? `, ${words.join(', ')}` : '';
    const tail = params.length > 0 ? ` ${params.join(' ')}` : '';
    return `${head}${body}${tail}`;
  }, [picked, subject]);

  const sendToGenerator = () => {
    setInput(assembled);
    setCategory('image');
    setView('generate');
    info('조립한 프롬프트를 생성기로 옮겼어요. 이미지 카테고리로 설정했습니다.');
  };

  return (
    <div className="animate-fade-in space-y-8 pb-40">
      {/* Intro */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          🎨 이미지 랩
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-3xl">
          이미지 프롬프트는 문장이 아니라 <strong className="text-indigo-600 dark:text-indigo-300">시각 요소의 조립</strong>입니다.
          조립 공식을 이해하고 → 진화 과정을 보고 → 핵심 단어를 표에서 골라 직접 조립해보세요.
        </p>
      </div>

      {/* 1. Anatomy formula */}
      <section className="glass-card">
        <div className="glass-card-body">
          <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">
            1. 프롬프트 조립 공식
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            좋은 이미지 프롬프트는 8개 부품의 조합입니다. 부품을 눌러 역할을 확인하세요.
          </p>
          <div className="flex flex-wrap items-center gap-1.5">
            {IMAGE_ANATOMY.map((a, i) => (
              <span key={a.key} className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setActivePart(a.key)}
                  aria-pressed={activePart === a.key}
                  className={`px-3 py-1.5 rounded-lg border text-sm font-medium transition-all ${PART_COLORS[a.key] ?? ''} ${
                    activePart === a.key
                      ? 'ring-2 ring-indigo-400 ring-offset-1 dark:ring-offset-slate-900'
                      : 'opacity-80 hover:opacity-100'
                  }`}
                >
                  {a.ko}
                </button>
                {i < IMAGE_ANATOMY.length - 1 && (
                  <span className="text-slate-300 dark:text-slate-600 font-bold" aria-hidden="true">+</span>
                )}
              </span>
            ))}
          </div>

          {part && (
            <div className="mt-4 rounded-xl border border-slate-200/60 dark:border-slate-700/40 bg-white/60 dark:bg-slate-800/50 p-4">
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="font-bold text-slate-900 dark:text-slate-100">{part.ko}</span>
                <span className="text-xs font-mono text-slate-400">{part.label}</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{part.description}</p>
              <p className="text-sm font-mono text-indigo-600 dark:text-indigo-300 mt-2">
                예: {part.example}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 2. Progressive example */}
      <section className="glass-card">
        <div className="glass-card-body">
          <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">
            2. 한 줄이 작품이 되는 과정
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            같은 주제가 단계마다 어떤 부품을 얻는지 보세요.
          </p>

          <div className="flex items-center gap-1.5 flex-wrap mb-4" role="tablist" aria-label="진화 단계">
            {PROGRESSIVE_EXAMPLE.map((s, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={stepIdx === i}
                onClick={() => setStepIdx(i)}
                className={`w-8 h-8 rounded-full text-sm font-bold tabular-nums transition-all ${
                  i === stepIdx
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow'
                    : i < stepIdx
                      ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-400'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          {step && (
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-slate-800 dark:text-slate-100">{step.title}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300">
                  {step.addition}
                </span>
              </div>
              <pre className="mt-3 whitespace-pre-wrap font-mono text-sm text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl p-4">
                {step.prompt}
              </pre>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">💡 {step.note}</p>
              <div className="flex gap-2 mt-3">
                <button
                  type="button"
                  disabled={stepIdx === 0}
                  onClick={() => setStepIdx((i) => Math.max(0, i - 1))}
                  className="btn btn-secondary btn-sm disabled:opacity-40"
                >
                  ← 이전
                </button>
                <button
                  type="button"
                  disabled={stepIdx === PROGRESSIVE_EXAMPLE.length - 1}
                  onClick={() => setStepIdx((i) => Math.min(PROGRESSIVE_EXAMPLE.length - 1, i + 1))}
                  className="btn btn-primary btn-sm disabled:opacity-40"
                >
                  다음 단계 →
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 3. Vocabulary tables */}
      <section className="glass-card">
        <div className="glass-card-body">
          <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">
            3. 핵심 단어장
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            차원별 핵심 키워드입니다. <strong className="text-indigo-600 dark:text-indigo-300">＋담기</strong>를 누르면 아래 빌더에서 프롬프트로 조립됩니다.
          </p>

          <div className="flex gap-2 flex-wrap mb-4">
            {IMAGE_VOCAB_TABLES.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => {
                  setActiveTable(t.key);
                  setExpandedTerm(null);
                }}
                aria-pressed={activeTable === t.key}
                className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                  activeTable === t.key
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow'
                    : 'bg-white/70 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/40 hover:border-indigo-300'
                }`}
              >
                {t.emoji} {t.title}
              </button>
            ))}
          </div>

          {table && (
            <>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">{table.intro}</p>
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-2.5">
                {table.terms.map((term) => {
                  const isPicked = picked.includes(term.en);
                  const isOpen = expandedTerm === term.en;
                  return (
                    <div
                      key={term.en}
                      className={`rounded-xl border p-3 transition-colors ${
                        isPicked
                          ? 'border-indigo-400/70 bg-indigo-50/70 dark:bg-indigo-900/20'
                          : 'border-slate-200/60 dark:border-slate-700/40 bg-white/60 dark:bg-slate-800/50 hover:border-indigo-300/60'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => setExpandedTerm(isOpen ? null : term.en)}
                          aria-expanded={isOpen}
                          className="flex-1 min-w-0 text-left"
                        >
                          <span className="font-semibold text-[15px] text-indigo-700 dark:text-indigo-300 break-words">
                            {term.en}
                          </span>
                          <span className="ml-2 text-xs text-slate-500 dark:text-slate-400">
                            {term.ko}
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() => togglePick(term.en)}
                          aria-pressed={isPicked}
                          className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                            isPicked
                              ? 'bg-indigo-500 text-white'
                              : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/40'
                          }`}
                        >
                          {isPicked ? '✓' : '＋담기'}
                        </button>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                        {term.effect}
                      </p>
                      {isOpen && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 pt-2 border-t border-slate-100 dark:border-slate-700/40">
                          <span className="font-semibold text-slate-400 dark:text-slate-500">사용 예 · </span>
                          {term.usage}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-3">
                키워드를 누르면 사용 예가 열립니다
              </p>
            </>
          )}
        </div>
      </section>

      {/* 4. Builder tray (sticky) */}
      {picked.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-indigo-200/60 dark:border-indigo-900/40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg shadow-2xl">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setTrayOpen(!trayOpen)}
                aria-expanded={trayOpen}
                className="flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-100 text-sm"
              >
                🧩 프롬프트 빌더
                <span className="px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-xs tabular-nums">
                  {picked.length}개 담김
                </span>
                <span aria-hidden="true" className={`transition-transform ${trayOpen ? 'rotate-180' : ''}`}>🔽</span>
              </button>
              <button
                type="button"
                onClick={() => setPicked([])}
                className="text-xs text-slate-400 hover:text-red-500"
              >
                비우기
              </button>
            </div>

            {trayOpen && (
              <div className="mt-3 space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {picked.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => togglePick(p)}
                      aria-label={`${p} 빼기`}
                      className="px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200/60 dark:border-indigo-800/40 text-xs font-mono text-indigo-700 dark:text-indigo-300 hover:line-through"
                    >
                      {p} ✕
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="주제 입력 (예: a lone lighthouse on a cliff / 절벽 위 등대)"
                  aria-label="이미지 주제"
                  className="w-full px-4 py-2 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/40 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <pre className="whitespace-pre-wrap font-mono text-sm text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl p-3 max-h-28 overflow-y-auto">
                  {assembled}
                </pre>
                <div className="flex gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={() => {
                      copyToClipboard(assembled);
                      success('조립한 프롬프트를 복사했어요.');
                    }}
                    className="btn btn-primary btn-sm"
                  >
                    📋 복사
                  </button>
                  <button type="button" onClick={sendToGenerator} className="btn btn-secondary btn-sm">
                    ✨ 생성기에서 다듬기 →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
