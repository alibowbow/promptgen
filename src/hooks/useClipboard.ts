import { useState } from 'react';
import { useToastStore } from '../stores/toastStore';

export const useClipboard = () => {
  const [copied, setCopied] = useState(false);
  const errorToast = useToastStore((s) => s.error);

  const copyToClipboard = async (text: string) => {
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (err) {
      console.error('[ERROR] 클립보드 복사 실패:', err);
      errorToast(
        '클립보드 복사에 실패했습니다. HTTPS 환경인지, 권한이 허용되었는지 확인해주세요.'
      );
    }
  };

  return {
    copied,
    copyToClipboard,
  };
};
