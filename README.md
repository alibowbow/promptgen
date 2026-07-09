# AI 프롬프트 최적화 도우미

한국어 아이디어를 AI 모델에 최적화된 프롬프트로 변환하는 React 웹 애플리케이션입니다.

## 기능

- **다양한 카테고리 지원**: 이미지, 동영상, 일반 문서, 코딩
- **다국어 출력**: 영어 변환 또는 한국어 최적화
- **스타일 옵션**: 기본/프리미엄 스타일 선택이 실제 프롬프트에 반영됩니다 (카테고리별 통제 어휘)
- **카테고리 인지형 포맷**: 이미지·영상은 키워드 구문, 문서·코드는 톤/길이 지시
- **히스토리 · 프리셋**: 최근 기록과 프리셋을 저장하고 JSON으로 내보내기/가져오기
- **다크 모드**: 시스템 설정 감지 및 수동 토글

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 타입 체크
npm run typecheck

# 린트
npm run lint

# 프로덕션 빌드 (tsc 타입체크 후 vite 빌드)
npm run build

# 빌드 미리보기
npm run preview
```

## 환경 변수

프롬프트를 전송하는 백엔드 엔드포인트는 환경 변수로 설정할 수 있습니다. 지정하지
않으면 기본 프록시로 폴백합니다. `.env.example`을 참고하세요.

```bash
VITE_API_ENDPOINT=https://your-backend.example.com/generate
```

## 기술 스택

- **React 18** - UI 라이브러리
- **TypeScript** - 정적 타입
- **Vite** - 빌드 도구
- **Zustand** - 상태 관리
- **Tailwind CSS** - 스타일링

## 배포

1. `npm run build`로 빌드
2. `dist` 폴더의 내용을 정적 웹 서버(예: Vercel, Netlify, GitHub Pages)에 배포
3. HTTPS 환경에서 클립보드 기능이 정상 작동합니다

## 라이선스

MIT License — 자세한 내용은 [LICENSE](./LICENSE)를 참고하세요.
