import { API_ENDPOINT, CATEGORIES } from './constants';
import type { Config } from '../stores/configStore';

export type StatusCallback = (status: string) => void;

// Generate style instruction based on user preferences
export const generateStyleInstruction = (
  tone: string,
  length: string,
  format: string
): string => {
  const toneMap = {
    professional: "전문적이고 격식 있는 톤으로",
    friendly: "친근하고 대화하는 톤으로",
    creative: "창의적이고 독창적인 톤으로",
    direct: "직설적이고 간결한 톤으로"
  };

  const lengthMap = {
    short: "간단하고 핵심적인 내용으로 (1-2문장)",
    medium: "적당한 길이로 (2-4문장)",
    long: "상세하고 포괄적인 내용으로 (4문장 이상)"
  };

  const formatMap = {
    sentence: "자연스러운 문장 형태로",
    markup: "마크다운 형식으로 구조화하여",
    slogan: "슬로건이나 캐치프레이즈 형태로",
    json: "JSON 구조로 정리하여"
  };

  return ` ${toneMap[tone]}, ${lengthMap[length]}, ${formatMap[format]} 작성해주세요.`;
};

// Parse API response to extract text
export const parseApiResponse = (data: any): string => {
  let output = "";
  
  if (
    data.candidates &&
    Array.isArray(data.candidates) &&
    data.candidates.length > 0 &&
    data.candidates[0].content &&
    data.candidates[0].content.parts &&
    Array.isArray(data.candidates[0].content.parts) &&
    data.candidates[0].content.parts.length > 0 &&
    data.candidates[0].content.parts[0].text
  ) {
    output = data.candidates[0].content.parts[0].text;
  } else if (data.result) {
    output = data.result;
  } else if (data.text) {
    output = data.text;
  } else if (
    Array.isArray(data.choices) &&
    data.choices.length > 0 
  ) { 
     if (data.choices[0].message?.content) { 
        output = data.choices.map(c => c.message.content).join("\n");
    } else if (data.choices[0].text) { 
        output = data.choices.map(c => c.text).join("\n");
    }
  } else if (typeof data === "string") {
    output = data;
  }
  
  return output;
};

// Main API call function
export const convertPrompt = async (
  input: string,
  config: Config,
  onStatusUpdate: StatusCallback
): Promise<string> => {
  const selectedCategory = CATEGORIES.find(c => c.key === config.category);
  if (!selectedCategory) {
    throw new Error("카테고리를 찾을 수 없습니다.");
  }

  const styleInstruction = generateStyleInstruction(config.tone, config.length, config.format);
  
  let requestMessage = "";
  if (config.outputLanguage === "en") {
    requestMessage = `${selectedCategory.englishPromptPrefix}"${input}"${styleInstruction}`;
  } else {
    requestMessage = `${selectedCategory.koreanPromptOptimizeInstruction}"${input}"${styleInstruction}`;
  }

  onStatusUpdate("API 요청 중...");

  const response = await fetch(API_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: requestMessage }),
  });

  onStatusUpdate(`응답: ${response.status}`);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`서버 응답 오류 (HTTP ${response.status}) - ${errorText || "내용 없음"}`);
  }

  const data = await response.json();
  onStatusUpdate("응답 완료");

  const output = parseApiResponse(data);
  
  if (!output || !output.trim()) {
    throw new Error(`${config.outputLanguage === 'en' ? '영문' : '한국어'} 프롬프트 변환/최적화에 실패했습니다.`);
  }

  return output.trim();
};
