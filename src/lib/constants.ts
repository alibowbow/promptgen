// Endpoint is configurable via env (VITE_API_ENDPOINT); falls back to the default proxy.
export const API_ENDPOINT =
  (import.meta.env.VITE_API_ENDPOINT as string | undefined) ||
  "https://magenta-morning-find.glitch.me/generate";

// Request timeout (ms) — the default backend can cold-start slowly.
export const REQUEST_TIMEOUT_MS = 40000;

export interface Category {
  key: string;
  label: string;
  englishPromptPrefix: string;
  koreanPromptOptimizeInstruction: string;
}

export interface StyleOption {
  key: string;
  label: string;
  emoji?: string;
}

export interface TreeNode {
  key: string;
  label: string;
  children?: TreeNode[];
}

export const CATEGORIES: Category[] = [
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
export const PROMPT_EXAMPLES: Record<string, string[]> = {
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
export const STYLE_OPTIONS_BY_CATEGORY: Record<string, Record<string, StyleOption[]>> = {
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
      { key: "documentary", label: "다큐멘터리", emoji: "📹" },
      { key: "animation", label: "애니메이션", emoji: "🎞️" }
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

// Premium style trees for each category with more than 50 sub options each
export const PREMIUM_STYLE_TREES: Record<string, TreeNode[]> = {
  image: [
    {
      key: 'lighting',
      label: '라이팅',
      children: [
        { key: 'sunny', label: '맑은 날' },
        { key: 'dawn', label: '새벽' },
        { key: 'golden_hour', label: '골든 아워' },
        { key: 'twilight', label: '황혼' },
        { key: 'neon', label: '네온 조명' },
        { key: 'backlight', label: '역광' }
      ]
    },
    {
      key: 'color_scheme',
      label: '색상 조합',
      children: [
        { key: 'monochrome', label: '단색' },
        { key: 'pastel', label: '파스텔' },
        { key: 'vivid', label: '선명한' },
        { key: 'warm', label: '따뜻한' },
        { key: 'cool', label: '차가운' },
        { key: 'complementary', label: '보색' }
      ]
    },
    {
      key: 'perspective',
      label: '시점',
      children: [
        { key: 'top_down', label: '탑다운' },
        { key: 'isometric', label: '아이소메트릭' },
        { key: 'close_up', label: '클로즈업' },
        { key: 'wide', label: '와이드' },
        { key: 'first_person', label: '1인칭' },
        { key: 'third_person', label: '3인칭' }
      ]
    },
    {
      key: 'environment',
      label: '환경',
      children: [
        { key: 'mountain', label: '산' },
        { key: 'ocean', label: '바다' },
        { key: 'forest', label: '숲' },
        { key: 'desert', label: '사막' },
        { key: 'city', label: '도시' },
        { key: 'space', label: '우주' }
      ]
    },
    {
      key: 'mood',
      label: '분위기',
      children: [
        { key: 'happy', label: '행복한' },
        { key: 'dark', label: '어두운' },
        { key: 'mysterious', label: '신비로운' },
        { key: 'romantic', label: '로맨틱한' },
        { key: 'tense', label: '긴장된' },
        { key: 'peaceful', label: '평화로운' }
      ]
    },
    {
      key: 'movement',
      label: '예술 사조',
      children: [
        { key: 'impressionism', label: '인상주의' },
        { key: 'surrealism', label: '초현실주의' },
        { key: 'pop_art', label: '팝아트' },
        { key: 'abstract', label: '추상' },
        { key: 'realism', label: '사실주의' },
        { key: 'cubism', label: '입체파' }
      ]
    },
    {
      key: 'medium',
      label: '표현 매체',
      children: [
        { key: 'oil', label: '유화' },
        { key: 'watercolor', label: '수채화' },
        { key: 'digital', label: '디지털' },
        { key: 'pencil', label: '연필' },
        { key: 'charcoal', label: '목탄' },
        { key: 'ink', label: '잉크' }
      ]
    },
    {
      key: 'texture',
      label: '질감',
      children: [
        { key: 'smooth', label: '매끄러운' },
        { key: 'rough', label: '거친' },
        { key: 'metallic', label: '메탈릭' },
        { key: 'matte', label: '무광' },
        { key: 'glossy', label: '유광' },
        { key: 'grainy', label: '입자감' }
      ]
    },
    {
      key: 'camera_angle',
      label: '카메라 앵글',
      children: [
        { key: 'low', label: '로우 앵글' },
        { key: 'high', label: '하이 앵글' },
        { key: 'tilt', label: '틸트' },
        { key: 'pan', label: '팬' },
        { key: 'zoom', label: '줌' },
        { key: 'aerial', label: '항공샷' }
      ]
    },
    {
      key: 'composition',
      label: '구도',
      children: [
        { key: 'rule_of_thirds', label: '삼분할' },
        { key: 'symmetry', label: '대칭' },
        { key: 'asymmetry', label: '비대칭' },
        { key: 'minimal', label: '미니멀' },
        { key: 'busy', label: '복잡한' },
        { key: 'balanced', label: '균형' }
      ]
    },
    {
      key: 'animation_style',
      label: '애니메이션 스타일',
      children: [
        { key: '2d', label: '2D' },
        { key: '3d', label: '3D' },
        { key: 'stop_motion', label: '스톱모션' },
        { key: 'anime', label: '애니메' },
        { key: 'motion_graphic', label: '모션그래픽' },
        { key: 'clay', label: '클레이' }
      ]
    }
  ],
  video: [
    {
      key: 'lighting',
      label: '조명',
      children: [
        { key: 'natural', label: '자연광' },
        { key: 'studio', label: '스튜디오' },
        { key: 'low_key', label: '로우키' },
        { key: 'high_key', label: '하이키' },
        { key: 'neon', label: '네온' },
        { key: 'dramatic', label: '드라마틱' }
      ]
    },
    {
      key: 'camera_movement',
      label: '카메라 무빙',
      children: [
        { key: 'static', label: '정지' },
        { key: 'pan', label: '팬' },
        { key: 'tilt', label: '틸트' },
        { key: 'dolly', label: '달리' },
        { key: 'crane', label: '크레인' },
        { key: 'handheld', label: '핸드헬드' }
      ]
    },
    {
      key: 'shot_type',
      label: '샷 종류',
      children: [
        { key: 'close_up', label: '클로즈업' },
        { key: 'medium_shot', label: '미디엄' },
        { key: 'wide_shot', label: '와이드' },
        { key: 'tracking', label: '트래킹' },
        { key: 'aerial', label: '항공샷' },
        { key: 'pov', label: '시점샷' }
      ]
    },
    {
      key: 'transition',
      label: '전환 효과',
      children: [
        { key: 'cut', label: '컷' },
        { key: 'fade', label: '페이드' },
        { key: 'dissolve', label: '디졸브' },
        { key: 'wipe', label: '와이프' },
        { key: 'zoom', label: '줌' },
        { key: 'glitch', label: '글리치' }
      ]
    },
    {
      key: 'color_grade',
      label: '색보정',
      children: [
        { key: 'warm', label: '따뜻한' },
        { key: 'cool', label: '차가운' },
        { key: 'filmic', label: '필름룩' },
        { key: 'saturated', label: '선명한' },
        { key: 'desaturated', label: '탈색된' },
        { key: 'b&w', label: '흑백' }
      ]
    },
    {
      key: 'mood',
      label: '분위기',
      children: [
        { key: 'romantic', label: '로맨틱' },
        { key: 'thrilling', label: '스릴' },
        { key: 'comedic', label: '코믹' },
        { key: 'dramatic', label: '드라마' },
        { key: 'inspirational', label: '감동' },
        { key: 'dark', label: '어두움' }
      ]
    },
    {
      key: 'aspect_ratio',
      label: '화면비',
      children: [
        { key: '16_9', label: '16:9' },
        { key: '9_16', label: '9:16' },
        { key: '1_1', label: '1:1' },
        { key: '4_3', label: '4:3' },
        { key: '3_4', label: '3:4' }
      ]
    },
    {
      key: 'animation_style',
      label: '애니메이션 스타일',
      children: [
        { key: '2d', label: '2D' },
        { key: '3d', label: '3D' },
        { key: 'stop_motion', label: '스톱모션' },
        { key: 'anime', label: '애니메' },
        { key: 'motion_graphic', label: '모션그래픽' },
        { key: 'clay', label: '클레이' }
      ]
    },
    {
      key: 'pace',
      label: '편집 속도',
      children: [
        { key: 'slow_motion', label: '슬로모션' },
        { key: 'time_lapse', label: '타임랩스' },
        { key: 'fast_cut', label: '빠른 컷' },
        { key: 'normal', label: '보통' },
        { key: 'montage', label: '몽타주' },
        { key: 'one_take', label: '원테이크' }
      ]
    }
  ],
  document: [
    {
      key: 'writing_style',
      label: '글쓰기 방식',
      children: [
        { key: 'expository', label: '설명문' },
        { key: 'descriptive', label: '묘사문' },
        { key: 'persuasive', label: '설득문' },
        { key: 'narrative', label: '서사문' },
        { key: 'technical', label: '기술문' },
        { key: 'instructional', label: '지침문' }
      ]
    },
    {
      key: 'tone',
      label: '톤',
      children: [
        { key: 'formal', label: '격식체' },
        { key: 'informal', label: '비격식체' },
        { key: 'humorous', label: '유머러스' },
        { key: 'serious', label: '진지한' },
        { key: 'empathetic', label: '공감형' },
        { key: 'authoritative', label: '권위적' }
      ]
    },
    {
      key: 'audience',
      label: '대상',
      children: [
        { key: 'beginner', label: '초보자' },
        { key: 'intermediate', label: '중급자' },
        { key: 'expert', label: '전문가' },
        { key: 'children', label: '어린이' },
        { key: 'academic', label: '학계' },
        { key: 'public', label: '일반인' }
      ]
    },
    {
      key: 'purpose',
      label: '목적',
      children: [
        { key: 'informative', label: '정보' },
        { key: 'tutorial', label: '튜토리얼' },
        { key: 'reference', label: '참고' },
        { key: 'storytelling', label: '스토리텔링' },
        { key: 'marketing', label: '마케팅' },
        { key: 'summary', label: '요약' }
      ]
    },
    {
      key: 'format',
      label: '형식',
      children: [
        { key: 'essay', label: '에세이' },
        { key: 'report', label: '보고서' },
        { key: 'bullet', label: '불릿' },
        { key: 'qa', label: 'Q&A' },
        { key: 'listicle', label: '리스트형' },
        { key: 'infographic', label: '인포그래픽' }
      ]
    },
    {
      key: 'citation',
      label: '인용 스타일',
      children: [
        { key: 'apa', label: 'APA' },
        { key: 'mla', label: 'MLA' },
        { key: 'chicago', label: 'Chicago' },
        { key: 'ieee', label: 'IEEE' },
        { key: 'harvard', label: 'Harvard' },
        { key: 'none', label: '없음' }
      ]
    },
    {
      key: 'perspective',
      label: '시점',
      children: [
        { key: 'first_person', label: '1인칭' },
        { key: 'second_person', label: '2인칭' },
        { key: 'third_person', label: '3인칭' },
        { key: 'omniscient', label: '전지적' },
        { key: 'objective', label: '객관적' },
        { key: 'mixed', label: '혼합' }
      ]
    },
    {
      key: 'structure',
      label: '구성',
      children: [
        { key: 'intro_body_conclusion', label: '서론-본론-결론' },
        { key: 'step_by_step', label: '단계별' },
        { key: 'faq', label: 'FAQ' },
        { key: 'problem_solution', label: '문제-해결' },
        { key: 'compare_contrast', label: '비교-대조' },
        { key: 'chronological', label: '연대기' }
      ]
    },
    {
      key: 'language_style',
      label: '언어 스타일',
      children: [
        { key: 'concise', label: '간결한' },
        { key: 'elaborate', label: '풍부한' },
        { key: 'technical_jargon', label: '전문용어' },
        { key: 'plain_language', label: '쉬운 표현' },
        { key: 'rhetorical', label: '수사적' },
        { key: 'poetic', label: '시적' }
      ]
    }
  ],
  code: [
    {
      key: 'language',
      label: '언어',
      children: [
        { key: 'typescript', label: 'TypeScript' },
        { key: 'python', label: 'Python' },
        { key: 'javascript', label: 'JavaScript' },
        { key: 'go', label: 'Go' },
        { key: 'rust', label: 'Rust' },
        { key: 'java', label: 'Java' }
      ]
    },
    {
      key: 'paradigm',
      label: '패러다임',
      children: [
        { key: 'functional', label: '함수형' },
        { key: 'object_oriented', label: '객체지향' },
        { key: 'procedural', label: '절차형' },
        { key: 'async', label: '비동기' },
        { key: 'reactive', label: '반응형' }
      ]
    },
    {
      key: 'output_format',
      label: '출력 형식',
      children: [
        { key: 'full_file', label: '전체 파일' },
        { key: 'snippet', label: '스니펫' },
        { key: 'diff', label: '변경점(diff)' },
        { key: 'pseudocode', label: '의사코드' },
        { key: 'cli', label: 'CLI 명령' }
      ]
    },
    {
      key: 'constraints',
      label: '제약',
      children: [
        { key: 'no_deps', label: '외부 의존성 없이' },
        { key: 'std_only', label: '표준 라이브러리만' },
        { key: 'performance', label: '성능 최적화' },
        { key: 'memory_safe', label: '메모리 안전' },
        { key: 'idiomatic', label: '관용적 스타일' }
      ]
    },
    {
      key: 'quality',
      label: '품질',
      children: [
        { key: 'with_tests', label: '테스트 포함' },
        { key: 'with_comments', label: '주석 포함' },
        { key: 'error_handling', label: '에러 처리' },
        { key: 'type_hints', label: '타입 힌트' },
        { key: 'docstrings', label: '문서화 주석' }
      ]
    }
  ]
};

// Flatten a premium tree into a leaf key -> label map.
const flattenTree = (
  nodes: TreeNode[],
  acc: Record<string, string> = {}
): Record<string, string> => {
  for (const node of nodes) {
    if (node.children && node.children.length > 0) {
      flattenTree(node.children, acc);
    } else {
      acc[node.key] = node.label;
    }
  }
  return acc;
};

// Resolve selected style keys into {key,label} terms for a category.
export const collectStyleTerms = (
  category: string,
  basic: Record<string, string>,
  premium: string[]
): { key: string; label: string }[] => {
  const terms: { key: string; label: string }[] = [];
  const groups = STYLE_OPTIONS_BY_CATEGORY[category] || {};

  for (const [groupKey, optionKey] of Object.entries(basic)) {
    if (!optionKey) continue;
    const opt = (groups[groupKey] || []).find((o) => o.key === optionKey);
    if (opt) terms.push({ key: opt.key, label: opt.label });
  }

  const leaves = flattenTree(PREMIUM_STYLE_TREES[category] || []);
  for (const key of premium) {
    if (leaves[key]) terms.push({ key, label: leaves[key] });
  }

  return terms;
};

export interface KeyLabel {
  key: string;
  label: string;
  emoji?: string;
}

// Legacy options for backward compatibility
export const TONE_OPTIONS: KeyLabel[] = [
  { key: "professional", label: "전문적" },
  { key: "friendly", label: "친근한" },
  { key: "creative", label: "창의적" },
  { key: "direct", label: "직설적" }
];

export const LENGTH_OPTIONS: KeyLabel[] = [
  { key: "short", label: "짧게" },
  { key: "medium", label: "보통" },
  { key: "long", label: "길게" }
];

export const FORMAT_OPTIONS: KeyLabel[] = [
  { key: "sentence", label: "문장" },
  { key: "markup", label: "마크업" },
  { key: "slogan", label: "슬로건" },
  { key: "json", label: "JSON" }
];

export const VIEW_MODES: KeyLabel[] = [
  { key: "short", label: "짧게", emoji: "📝" },
  { key: "normal", label: "보통", emoji: "📄" },
  { key: "detailed", label: "상세", emoji: "📋" }
];
