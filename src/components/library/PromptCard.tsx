import type { LibraryPrompt } from '../../data/types';
import { CATEGORY_BY_SLUG } from '../../data/categories';
import { useLibraryStore } from '../../stores/libraryStore';
import { useClipboard } from '../../hooks/useClipboard';
import { useToastStore } from '../../stores/toastStore';

const DIFF_STYLES: Record<string, string> = {
  입문: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  중급: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  고급: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300',
};

export const PromptCard = ({
  prompt,
  onOpen,
}: {
  prompt: LibraryPrompt;
  onOpen: () => void;
}) => {
  const isFavorite = useLibraryStore((s) => s.favorites.includes(prompt.id));
  const toggleFavorite = useLibraryStore((s) => s.toggleFavorite);
  const { copyToClipboard } = useClipboard();
  const success = useToastStore((s) => s.success);
  const category = CATEGORY_BY_SLUG[prompt.category];

  return (
    <div className="glass-card h-full flex flex-col">
      <div className="glass-card-body flex flex-col h-full !p-5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            {category && (
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {category.emoji} {category.label}
              </span>
            )}
            <span
              className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${DIFF_STYLES[prompt.difficulty]}`}
            >
              {prompt.difficulty}
            </span>
          </div>
          <button
            type="button"
            onClick={() => toggleFavorite(prompt.id)}
            aria-label="즐겨찾기 토글"
            aria-pressed={isFavorite}
            className={`text-lg shrink-0 ${isFavorite ? 'text-amber-400' : 'text-slate-300 dark:text-slate-600 hover:text-amber-400'}`}
          >
            <span aria-hidden="true">{isFavorite ? '★' : '☆'}</span>
          </button>
        </div>

        <button type="button" onClick={onOpen} className="text-left mt-2 group">
          <h3 className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
            {prompt.title}
          </h3>
        </button>

        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 line-clamp-3 flex-1">
          {prompt.prompt}
        </p>

        <div className="flex items-center gap-2 mt-4 flex-wrap">
          <button type="button" onClick={onOpen} className="btn btn-secondary btn-sm">
            자세히
          </button>
          <button
            type="button"
            onClick={() => {
              copyToClipboard(prompt.prompt);
              success('프롬프트를 복사했어요.');
            }}
            className="btn btn-secondary btn-sm"
          >
            📋 복사
          </button>
        </div>
      </div>
    </div>
  );
};
