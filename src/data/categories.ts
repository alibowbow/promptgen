import type { Category } from './types';

// Library categories. Ordered from foundational/everyday to specialized.
export const CATEGORIES: Category[] = [
  {
    slug: 'fundamentals',
    label: '프롬프트 기본기',
    emoji: '🧱',
    description: '어떤 도메인에도 통하는 근본적이고 재사용 가능한 프롬프트 뼈대',
  },
  {
    slug: 'vibe-coding',
    label: '바이브코딩',
    emoji: '🌊',
    description: 'AI와 대화하며 코드를 만드는 흐름 — 계획·스캐폴딩·반복',
  },
  {
    slug: 'software-dev',
    label: '소프트웨어 개발',
    emoji: '💻',
    description: '설계·구현·리팩터링·테스트를 위한 개발 프롬프트',
  },
  {
    slug: 'debugging',
    label: '디버깅 & 코드 리뷰',
    emoji: '🐞',
    description: '버그 원인 추적, 코드 리뷰, 개선 제안',
  },
  {
    slug: 'writing',
    label: '글쓰기 & 콘텐츠',
    emoji: '✍️',
    description: '초안·편집·톤 조정·구조화된 글쓰기',
  },
  {
    slug: 'learning',
    label: '학습 & 설명',
    emoji: '📚',
    description: '어려운 개념을 배우고 가르치기 위한 프롬프트',
  },
  {
    slug: 'research',
    label: '리서치 & 분석',
    emoji: '🔍',
    description: '자료 조사, 비교 분석, 근거 기반 정리',
  },
  {
    slug: 'business',
    label: '비즈니스 & 기획',
    emoji: '📊',
    description: '전략·기획·의사결정·문서화',
  },
  {
    slug: 'marketing',
    label: '마케팅 & 카피',
    emoji: '📣',
    description: '카피라이팅, 포지셔닝, 콘텐츠 마케팅',
  },
  {
    slug: 'productivity',
    label: '생산성 & 자동화',
    emoji: '⚡',
    description: '반복 작업 자동화, 워크플로, 정리',
  },
  {
    slug: 'thinking',
    label: '사고 & 의사결정',
    emoji: '🧠',
    description: '더 깊이 생각하고 더 나은 결정을 내리는 프롬프트',
  },
  {
    slug: 'data-sql',
    label: '데이터 & SQL',
    emoji: '🗄️',
    description: '쿼리 작성, 데이터 분석, 스키마 설계',
  },
  {
    slug: 'image-gen',
    label: '이미지 생성',
    emoji: '🎨',
    description: 'Midjourney·SD·DALL·E 등을 위한 이미지 프롬프트',
  },
  {
    slug: 'career',
    label: '커리어 & 자기계발',
    emoji: '🚀',
    description: '이력서·면접·학습 계획·피드백',
  },
  {
    slug: 'roleplay',
    label: '역할 부여 & 시뮬레이션',
    emoji: '🎭',
    description: '전문가 페르소나, 인터뷰어, 토론 상대 시뮬레이션',
  },
  {
    slug: 'summarize',
    label: '요약 & 추출',
    emoji: '📝',
    description: '긴 텍스트 요약, 핵심 추출, 구조화',
  },
];

export const CATEGORY_BY_SLUG: Record<string, Category> = Object.fromEntries(
  CATEGORIES.map((c) => [c.slug, c])
);
