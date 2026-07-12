import { useViewStore } from '../../stores/viewStore';
import type { AppView } from '../../stores/viewStore';

const TABS: { key: AppView; label: string; emoji: string }[] = [
  { key: 'home', label: '홈', emoji: '🏠' },
  { key: 'learn', label: '학습', emoji: '📚' },
  { key: 'library', label: '라이브러리', emoji: '🗂️' },
  { key: 'imagelab', label: '이미지 랩', emoji: '🎨' },
  { key: 'generate', label: '생성기', emoji: '✨' },
];

export const AppNav = () => {
  const view = useViewStore((s) => s.view);
  const setView = useViewStore((s) => s.setView);

  return (
    <header className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Brand */}
        <button
          type="button"
          onClick={() => setView('home')}
          className="flex items-center gap-3 text-left"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center text-white text-xl shadow-lg">
            🧠
          </div>
          <div>
            <h1 className="text-xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent tracking-tight leading-none">
              프롬프트 랩
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              프롬프트를 체계적으로 배우다
            </p>
          </div>
        </button>

        {/* Tabs */}
        <nav
          className="inline-flex bg-slate-100 dark:bg-slate-800 rounded-xl p-1 self-start sm:self-auto"
          aria-label="주요 메뉴"
        >
          {TABS.map((tab) => {
            const active = view === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setView(tab.key)}
                aria-current={active ? 'page' : undefined}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                  active
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                <span aria-hidden="true">{tab.emoji}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
