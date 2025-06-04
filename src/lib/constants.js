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

// Category-specific prompt examples
export const PROMPT_EXAMPLES = {
  image: [
    "아름다운 일몰이 보이는 산 정상의 풍경",
    "미래적인 도시의 네온사인과 비 오는 밤",
    "고양이가 책을 읽고 있는 아늑한 도서관"
  ],
  video: [
    "카메라가 숲속을 천천히 이동하며 햇빛이 나뭇잎 사이로 스며드는 장면",
    "도시의 아침 출근길 타임랩스 영상",
    "바다 위에서 돌고래들이 뛰어노는 모습"
  ],
  document: [
    "효과적인 프레젠테이션 방법에 대해 설명해줘",
    "Python을 처음 배우는 사람을 위한 학습 로드맵을 만들어줘",
    "친환경 생활 습관 10가지를 정리해줘"
  ],
  code: [
    "React에서 useState를 사용한 간단한 카운터 컴포넌트를 만들어줘",
    "Python으로 CSV 파일을 읽고 데이터를 분석하는 코드",
    "JavaScript로 배열에서 중복값을 제거하는 함수"
  ]
};

// Minimal category-specific style options
export const STYLE_OPTIONS_BY_CATEGORY = {
  image: {
    style: [
      { key: "realistic", label: "사실적", emoji: "📸" },
      { key: "artistic", label: "예술적", emoji: "🎨" },
      { key: "animation", label: "애니메이션", emoji: "🎬" }
    ]
  },
  video: {
    style: [
      { key: "cinematic", label: "영화적", emoji: "🎬" },
      { key: "documentary", label: "다큐멘터리", emoji: "📹" }
    ]
  },
  document: {
    tone: [
      { key: "professional", label: "전문적", emoji: "💼" },
      { key: "friendly", label: "친근한", emoji: "😊" },
      { key: "academic", label: "학술적", emoji: "🎓" }
    ],
    length: [
      { key: "short", label: "짧게", emoji: "📝" },
      { key: "long", label: "상세하게", emoji: "📋" }
    ]
  },
  code: {
    style: [
      { key: "clean", label: "깔끔한", emoji: "✨" },
      { key: "commented", label: "주석포함", emoji: "💬" }
    ],
    complexity: [
      { key: "simple", label: "간단", emoji: "🔰" },
      { key: "advanced", label: "고급", emoji: "🚀" }
    ]
  }
};

// Legacy options for backward compatibility
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