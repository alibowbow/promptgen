import { useState } from 'react';

export const useClipboard = () => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    if (!text) {
      console.log("[DEBUG] 복사할 내용이 없습니다.");
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      console.log("[DEBUG] 클립보드 복사 성공!");
      setTimeout(() => setCopied(false), 1200);
    } catch (err) {
      console.error("[ERROR] 클립보드 복사 실패:", err);
      alert("클립보드 복사에 실패했습니다. 브라우저 콘솔에서 오류를 확인해주세요.\n(HTTPS 환경인지, 권한이 허용되었는지 확인이 필요할 수 있습니다.)");
    }
  };

  return {
    copied,
    copyToClipboard
  };
};
