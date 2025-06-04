export const API_ENDPOINT = "https://magenta-morning-find.glitch.me/generate";

export const CATEGORIES = [
  {
    key: "image",
    label: "이미지",
    englishPromptPrefix:
      "Transform the following Korean text into the best English prompt for image generation AI models (such as Midjourney, Stable Diffusion, DALL-E, etc). Include style, composition, subject, artist, mood, and any implied context. Your final output should ONLY be this refined, ready-to-use English prompt. Do not include any conversational filler, preambles, explanations of your process, or any text other than the English prompt itself. Korean text to transform: ",
    koreanPromptOptimizeInstruction:
      "Analyze the following Korean text and refine it into a highly effective Korean prompt, specifically designed for image generation AI models (Midjourney, Stable Diffusion, DALL-E 등). Enhance clarity, specificity, and incorporate key elements like style, composition, subject, artist, and mood, all in Korean. Your final output should ONLY be this optimized Korean prompt. Do not include any conversational filler, preambles, explanations of your process, or any text other than the Korean prompt itself. Original Korean text: ",
  },
  {
    key: "video",
    label: "동영상",
    englishPromptPrefix:
      "Transform the following Korean text into the best English prompt for video generation AI models (Sora, Pika, Runway, etc). Focus on scenes, mood, camera movement, style. Your final output should ONLY be this refined, ready-to-use English prompt. Do not include any conversational filler, preambles, explanations of your process, or any text other than the English prompt itself. Korean text to transform: ",
    koreanPromptOptimizeInstruction:
      "Analyze the following Korean text and refine it into a highly effective Korean prompt, specifically designed for video generation AI models (Sora, Pika, Runway 등). Enhance clarity on scenes, mood, camera movement, and style, all in Korean. Your final output should ONLY be this optimized Korean prompt. Do not include any conversational filler, preambles, explanations of your process, or any text other than the Korean prompt itself. Original Korean text: ",
  },
  {
    key: "document",
    label: "일반 문서",
    englishPromptPrefix:
      "Transform the following Korean text into a high-quality English prompt for a large language model (Gemini, ChatGPT, Claude, etc). Make it clear, specific, and context-rich. Your final output should ONLY be this refined, ready-to-use English prompt. Do not include any conversational filler, preambles, explanations of your process, or any text other than the English prompt itself. Korean text to transform: ",
    koreanPromptOptimizeInstruction:
      "Analyze the following Korean text and refine it into a highly effective Korean prompt, specifically designed for large language models (Gemini, ChatGPT, Claude 등). Improve its clarity, specificity, and context-richness, all in Korean. Your final output should ONLY be this optimized Korean prompt. Do not include any conversational filler, preambles, explanations of your process, or any text other than the Korean prompt itself. Original Korean text: ",
  },
  {
    key: "code",
    label: "코딩",
    englishPromptPrefix:
      "Transform the following Korean text into the best English prompt for coding AI assistants (Copilot, Gemini, GPT-4, etc). Specify language, libraries, output format, etc. Your final output should ONLY be this refined, ready-to-use English prompt. Do not include any conversational filler, preambles, explanations of your process, or any text other than the English prompt itself. Korean text to transform: ",
    koreanPromptOptimizeInstruction:
      "Analyze the following Korean text and refine it into a highly effective Korean prompt, specifically designed for coding AI assistants (Copilot, Gemini, GPT-4 등). Specify language, libraries, output format, and other relevant details clearly, all in Korean. Your final output should ONLY be this optimized Korean prompt. Do not include any conversational filler, preambles, explanations of your process, or any text other than the Korean prompt itself. Original Korean text: ",
  },
];

export const TONE_OPTIONS = [
  { key: "professional", label: "전문적" },
  { key: "friendly", label: "친근한" },
  { key: "creative", label: "창의적" },
  { key: "direct", label: "직설적" }
];

export const LENGTH_OPTIONS = [
  { key: "short", label: "짧게" },
  { key: "medium", label: "보통" },
  { key: "long", label: "길게" }
];

export const FORMAT_OPTIONS = [
  { key: "sentence", label: "문장" },
  { key: "markup", label: "마크업" },
  { key: "slogan", label: "슬로건" },
  { key: "json", label: "JSON" }
];

export const VIEW_MODES = [
  { key: "short", label: "짧게", emoji: "📝" },
  { key: "normal", label: "보통", emoji: "📄" },
  { key: "detailed", label: "상세", emoji: "📋" }
];