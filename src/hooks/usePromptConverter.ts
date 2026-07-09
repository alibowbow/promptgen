import { useRef } from 'react';
import { useInputStore } from '../stores/inputStore';
import { useConfigStore } from '../stores/configStore';
import { useResultStore } from '../stores/resultStore';
import { useHistoryStore } from '../stores/historyStore';
import { convertPrompt, PromptCancelledError } from '../lib/api';

export const usePromptConverter = () => {
  const { input, loading, setLoading, setError, setApiStatus, clearStates } =
    useInputStore();
  const { getConfig } = useConfigStore();
  const { setResult, clearResult } = useResultStore();
  const { addToHistory } = useHistoryStore();
  const controllerRef = useRef<AbortController | null>(null);

  const handleConvert = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    clearStates();
    clearResult();

    if (!input.trim()) {
      setError('최적화할 내용을 입력해주세요!');
      return;
    }

    const controller = new AbortController();
    controllerRef.current = controller;
    setLoading(true);

    try {
      const config = getConfig();
      const result = await convertPrompt(
        input,
        config,
        (status) => setApiStatus(status),
        controller.signal
      );

      setResult(result);
      addToHistory(input, result, config);
    } catch (err) {
      if (err instanceof PromptCancelledError) {
        setApiStatus('요청을 취소했습니다.');
      } else {
        const message =
          err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.';
        setError(message);
        setApiStatus('요청 실패');
        console.error('[ERROR] Convert Error:', err);
      }
    } finally {
      controllerRef.current = null;
      setLoading(false);
    }
  };

  const cancelConvert = () => {
    controllerRef.current?.abort();
  };

  return {
    handleConvert,
    cancelConvert,
    loading,
  };
};
