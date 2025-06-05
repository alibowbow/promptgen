import { useInputStore } from '../stores/inputStore';

export const StatusDisplay = () => {
  const { error, apiStatus, loading } = useInputStore();

  return (
    <>
      {error && (
        <div className="mt-4 text-red-500 text-center bg-red-50 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}
      
      {apiStatus && (
        <div className="mt-4 text-center">
          <span className="text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded-full">
            {apiStatus}
          </span>
        </div>
      )}
      
      {loading && (
        <div className="flex flex-col items-center justify-center mt-8 gap-2">
          <div className="w-8 h-8 border-4 border-indigo-300 border-t-indigo-600 rounded-full animate-spin" />
          <div className="text-indigo-500 text-sm mt-2">
            AI가 프롬프트를 생성/최적화 중입니다...
          </div>
        </div>
      )}
    </>
  );
};