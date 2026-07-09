import { useInputStore } from '../stores/inputStore';

export const StatusDisplay = () => {
  const error = useInputStore((s) => s.error);
  const apiStatus = useInputStore((s) => s.apiStatus);
  const loading = useInputStore((s) => s.loading);

  return (
    <>
      {error && (
        <div
          role="alert"
          className="mt-4 text-red-600 dark:text-red-300 text-center bg-red-50 dark:bg-red-900/30 border border-red-200/60 dark:border-red-800/40 p-3 rounded-lg text-sm"
        >
          {error}
        </div>
      )}

      {apiStatus && !loading && (
        <div className="mt-4 text-center" role="status" aria-live="polite">
          <span className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">
            {apiStatus}
          </span>
        </div>
      )}

      {loading && (
        <div
          className="flex flex-col items-center justify-center mt-8 gap-2"
          role="status"
          aria-live="polite"
        >
          <div
            className="w-8 h-8 border-4 border-indigo-300 border-t-indigo-600 rounded-full animate-spin"
            aria-hidden="true"
          />
          <div className="text-indigo-600 dark:text-indigo-300 text-sm mt-2">
            {apiStatus || 'AI가 프롬프트를 생성/최적화 중입니다...'}
          </div>
        </div>
      )}
    </>
  );
};
