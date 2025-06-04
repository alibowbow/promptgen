import { useInputStore } from '../stores/inputStore.js';
import { useConfigStore } from '../stores/configStore.js';
import { useResultStore } from '../stores/resultStore.js';
import { useHistoryStore } from '../stores/historyStore.js';
import { convertPrompt } from '../lib/api.js';

export const usePromptConverter = () => {
  const { input, loading, setLoading, setError, setApiStatus, clearStates } = useInputStore();
  const { getConfig } = useConfigStore();
  const { setResult, clearResult } = useResultStore();
  const { addToHistory } = useHistoryStore();

  const handleConvert = async (e) => {
    if (e) e.preventDefault();
    
    clearStates();
    clearResult();

    if (!input.trim()) {
      setError("최적화할 내용을 입력해주세요!");
      return;
    }

    setLoading(true);

    try {
      const config = getConfig();
      const result = await convertPrompt(
        input, 
        config, 
        (status) => setApiStatus(status)
      );

      setResult(result);
      addToHistory(input, result, config);

    } catch (err) {
      setError(`서버 오류: ${err.message}`);
      setApiStatus("요청 실패");
      console.error("[ERROR] Convert Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleConvert,
    loading
  };
};