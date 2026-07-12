import { useMemo, useState } from 'react';
import { LIBRARY_PROMPTS, countByCategory, PROMPT_COUNT } from '../../data/library';
import { CATEGORIES } from '../../data/categories';
import type { Difficulty, LibraryPrompt } from '../../data/types';
import { useLibraryStore } from '../../stores/libraryStore';
import { useViewStore } from '../../stores/viewStore';
import { PromptCard } from './PromptCard';
import { PromptDetail } from './PromptDetail';

const DIFFICULTIES: (Difficulty | 'all')[] = ['all', '입문', '중급', '고급'];

export const LibraryView = () => {
  const [query, setQuery] = useState('');
  // A shortcut (e.g. from the home dashboard) can preselect a category.
  const [activeCategory, setActiveCategory] = useState<string>(
    () => useViewStore.getState().consumeLibrarySeed() ?? 'all'
  );
  const [difficulty, setDifficulty] = useState<Difficulty | 'all'>('all');
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [activePrompt, setActivePrompt] = useState<LibraryPrompt | null>(null);

  const favorites = useLibraryStore((s) => s.favorites);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const favSet = new Set(favorites);
    return LIBRARY_PROMPTS.filter((p) => {
      if (favoritesOnly && !favSet.has(p.id)) return false;
      if (activeCategory !== 'all' && p.category !== activeCategory) return false;
      if (difficulty !== 'all' && p.difficulty !== difficulty) return false;
      if (q) {
        const hay = `${p.title} ${p.prompt} ${p.principle} ${p.tags.join(' ')}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [query, activeCategory, difficulty, favoritesOnly, favorites]);

  return (
    <div className="animate-fade-in space-y-6">
      {/* Intro */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          프롬프트 라이브러리
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          카테고리별로 엄선한 <strong className="text-indigo-600 dark:text-indigo-300">{PROMPT_COUNT}개</strong>의
          재사용 가능한 프롬프트. 복사해서 바로 쓰거나 생성기로 다듬어 보세요.
        </p>
      </div>

      {/* Controls */}
      <div className="glass-card">
        <div className="glass-card-body !p-4 space-y-4">
          <div className="flex gap-3 flex-wrap items-center">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="🔍 제목·태그·내용 검색..."
              aria-label="프롬프트 검색"
              className="flex-1 min-w-[200px] px-4 py-2 rounded-xl bg-white/70 dark:bg-slate-800/70 border border-slate-200/60 dark:border-slate-700/40 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
              {DIFFICULTIES.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDifficulty(d)}
                  aria-pressed={difficulty === d}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                    difficulty === d
                      ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm'
                      : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {d === 'all' ? '전체' : d}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setFavoritesOnly(!favoritesOnly)}
              aria-pressed={favoritesOnly}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                favoritesOnly
                  ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
                  : 'bg-white/70 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/40'
              }`}
            >
              ★ 즐겨찾기 ({favorites.length})
            </button>
          </div>

          {/* Category chips */}
          <div className="flex gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              aria-pressed={activeCategory === 'all'}
              className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                activeCategory === 'all'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow'
                  : 'bg-white/70 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/40 hover:border-indigo-300'
              }`}
            >
              전체 {PROMPT_COUNT}
            </button>
            {CATEGORIES.map((c) => {
              const count = countByCategory(c.slug);
              if (count === 0) return null;
              const active = activeCategory === c.slug;
              return (
                <button
                  key={c.slug}
                  type="button"
                  onClick={() => setActiveCategory(c.slug)}
                  aria-pressed={active}
                  className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                    active
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow'
                      : 'bg-white/70 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/40 hover:border-indigo-300'
                  }`}
                >
                  {c.emoji} {c.label} {count}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Image-lab cross-link for the image category */}
      {activeCategory === 'image-gen' && (
        <button
          type="button"
          onClick={() => useViewStore.getState().setView('imagelab')}
          className="w-full text-left rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 border border-indigo-200/60 dark:border-indigo-900/40 px-5 py-4 hover:border-indigo-400 transition-colors group"
        >
          <span className="text-sm text-slate-700 dark:text-slate-200">
            🎨 <strong>이미지 프롬프트를 체계적으로 배우고 싶다면</strong> — 조립 공식·핵심 단어표·빌더가 있는
            <span className="text-indigo-600 dark:text-indigo-300 font-semibold"> 이미지 랩</span>으로
            <span aria-hidden="true" className="inline-block group-hover:translate-x-0.5 transition-transform"> →</span>
          </span>
        </button>
      )}

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="glass-card">
          <div className="glass-card-body text-center py-12 text-slate-500 dark:text-slate-400">
            조건에 맞는 프롬프트가 없습니다. 필터를 바꿔보세요.
          </div>
        </div>
      ) : (
        <>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {filtered.length}개 결과
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((p) => (
              <PromptCard key={p.id} prompt={p} onOpen={() => setActivePrompt(p)} />
            ))}
          </div>
        </>
      )}

      {activePrompt && (
        <PromptDetail prompt={activePrompt} onClose={() => setActivePrompt(null)} />
      )}
    </div>
  );
};
