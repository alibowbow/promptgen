import {
  API_ENDPOINT,
  REQUEST_TIMEOUT_MS,
  CATEGORIES,
  collectStyleTerms,
} from './constants';
import type { Config } from '../stores/configStore';

export type StatusCallback = (status: string) => void;

/** Thrown when the user cancels an in-flight request (so it can be ignored silently). */
export class PromptCancelledError extends Error {
  constructor() {
    super('요청이 취소되었습니다.');
    this.name = 'PromptCancelledError';
  }
}

const toneMap: Record<string, string> = {
  professional: '전문적이고 격식 있는 톤으로',
  friendly: '친근하고 대화하는 톤으로',
  creative: '창의적이고 독창적인 톤으로',
  direct: '직설적이고 간결한 톤으로',
};

const lengthMap: Record<string, string> = {
  short: '간단하고 핵심적인 내용으로 (1-2문장)',
  medium: '적당한 길이로 (2-4문장)',
  long: '상세하고 포괄적인 내용으로 (4문장 이상)',
};

const formatMap: Record<string, string> = {
  sentence: '자연스러운 문장 형태로',
  markup: '마크다운 형식으로 구조화하여',
  slogan: '슬로건이나 캐치프레이즈 형태로',
  json: 'JSON 구조로 정리하여',
};

// Generate a category-aware style instruction.
// Image/video generators expect comma-separated descriptor phrases, not prose,
// so we deliberately do NOT force tone/length/sentence formatting on them.
export const generateStyleInstruction = (
  category: string,
  tone: string,
  length: string,
  format: string
): string => {
  if (category === 'image' || category === 'video') {
    return ' 완결된 문장이 아니라, 콤마로 구분된 서술형 키워드와 구문 형태의 프롬프트로 작성해주세요.';
  }

  const tonePart = toneMap[tone] ?? toneMap.professional;
  const lengthPart = lengthMap[length] ?? lengthMap.medium;
  const formatPart = formatMap[format] ?? formatMap.sentence;

  return ` ${tonePart}, ${lengthPart}, ${formatPart} 작성해주세요.`;
};

// Build a suffix from the user's selected style attributes so the style panel
// actually shapes the generated prompt.
export const buildStyleSuffix = (config: Config): string => {
  const terms = collectStyleTerms(
    config.category,
    config.basicStyle ?? {},
    config.premiumStyle ?? []
  );
  if (terms.length === 0) return '';

  const rendered = terms.map((t) =>
    config.outputLanguage === 'en' ? t.key.replace(/_/g, ' ') : t.label
  );

  return config.outputLanguage === 'en'
    ? `\n\nStyle attributes to incorporate: ${rendered.join(', ')}.`
    : `\n\n다음 스타일 요소를 반영해주세요: ${rendered.join(', ')}.`;
};

// Parse the API response into text. Returns '' when there is no usable text.
// Throws a friendly error for a detectable safety block.
export const parseApiResponse = (data: unknown): string => {
  if (data == null) return '';
  if (typeof data === 'string') return data;
  if (typeof data !== 'object') return '';

  const d = data as Record<string, any>;

  if (Array.isArray(d.candidates) && d.candidates.length > 0) {
    const candidate = d.candidates[0];
    const text = candidate?.content?.parts?.[0]?.text;
    if (typeof text === 'string' && text.trim()) {
      return text;
    }
    // Candidates present but no text → likely a safety/finish issue.
    const reason: string | undefined =
      candidate?.finishReason || d.promptFeedback?.blockReason;
    if (reason && reason !== 'STOP') {
      throw new Error(
        '콘텐츠가 안전 필터에 의해 차단되었습니다. 표현을 바꿔 다시 시도해주세요.'
      );
    }
    return '';
  }

  if (typeof d.result === 'string') return d.result;
  if (typeof d.text === 'string') return d.text;

  if (Array.isArray(d.choices) && d.choices.length > 0) {
    if (d.choices[0].message?.content) {
      return d.choices.map((c: any) => c.message.content).join('\n');
    }
    if (d.choices[0].text) {
      return d.choices.map((c: any) => c.text).join('\n');
    }
  }

  return '';
};

// Main API call. Accepts an optional external AbortSignal so callers can cancel.
export const convertPrompt = async (
  input: string,
  config: Config,
  onStatusUpdate: StatusCallback,
  externalSignal?: AbortSignal
): Promise<string> => {
  const selectedCategory = CATEGORIES.find((c) => c.key === config.category);
  if (!selectedCategory) {
    throw new Error('카테고리를 찾을 수 없습니다.');
  }

  const styleInstruction = generateStyleInstruction(
    config.category,
    config.tone,
    config.length,
    config.format
  );
  const styleSuffix = buildStyleSuffix(config);

  const prefix =
    config.outputLanguage === 'en'
      ? selectedCategory.englishPromptPrefix
      : selectedCategory.koreanPromptOptimizeInstruction;

  const requestMessage = `${prefix}"${input}"${styleInstruction}${styleSuffix}`;

  onStatusUpdate('프롬프트 생성 준비 중...');

  // Combine an internal timeout with any external (cancel-button) signal.
  const controller = new AbortController();
  let timedOut = false;
  const timeoutId = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, REQUEST_TIMEOUT_MS);

  if (externalSignal) {
    if (externalSignal.aborted) {
      controller.abort();
    } else {
      externalSignal.addEventListener('abort', () => controller.abort(), {
        once: true,
      });
    }
  }

  let response: Response;
  try {
    response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: requestMessage }),
      signal: controller.signal,
    });
  } catch (err) {
    if ((err as Error)?.name === 'AbortError') {
      if (timedOut) {
        throw new Error(
          '응답 시간이 초과되었습니다. 서버가 절전 상태일 수 있으니 잠시 후 다시 시도해주세요.'
        );
      }
      throw new PromptCancelledError();
    }
    throw new Error(
      '서버에 연결하지 못했습니다. 인터넷 연결을 확인하고 다시 시도해주세요.'
    );
  } finally {
    clearTimeout(timeoutId);
  }

  onStatusUpdate('AI가 프롬프트를 작성하는 중...');

  if (!response.ok) {
    throw new Error(
      `서버가 오류를 반환했습니다 (HTTP ${response.status}). 잠시 후 다시 시도해주세요.`
    );
  }

  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    // Cold-start interstitials / gateway pages are HTML, not JSON.
    await response.text().catch(() => '');
    throw new Error(
      '서버가 준비 중이거나 일시적으로 응답할 수 없습니다. 잠시 후 다시 시도해주세요.'
    );
  }

  let data: unknown;
  try {
    data = await response.json();
  } catch {
    throw new Error('서버 응답을 해석할 수 없습니다. 잠시 후 다시 시도해주세요.');
  }

  onStatusUpdate('완료');

  const output = parseApiResponse(data);

  if (!output || !output.trim()) {
    throw new Error(
      `${config.outputLanguage === 'en' ? '영문' : '한국어'} 프롬프트 변환/최적화에 실패했습니다. 입력을 조금 더 구체적으로 바꿔 다시 시도해주세요.`
    );
  }

  return output.trim();
};
