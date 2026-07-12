import type { LibraryPrompt } from '../types';

export const prompts: LibraryPrompt[] = [
  {
    id: "image-gen-01",
    title: "이미지 프롬프트 6요소 공식(피사체·스타일·구도·조명·분위기·카메라)",
    category: "image-gen",
    difficulty: "입문",
    tags: ["기본기", "공식", "템플릿", "키워드"],
    prompt: `[피사체 예: a red fox sitting on a mossy rock],
[스타일 예: cinematic photography, photorealistic],
[구도 예: rule of thirds, wide shot, centered subject],
[조명 예: soft golden hour light, backlit],
[분위기 예: serene, dreamy, nostalgic],
[카메라 예: 35mm lens, shallow depth of field],
highly detailed, high quality`,
    principle: "좋은 이미지 프롬프트 = 피사체 + 스타일 + 구도 + 조명 + 분위기 + 카메라의 조합",
    why: "이미지 모델은 나열된 키워드에 반응합니다. 여섯 축을 각각 채우면 빠진 부분을 모델이 임의로 채우는 일이 줄어 원하는 그림에 안정적으로 가까워집니다.",
    tip: "결과가 밋밋하면 대개 조명과 카메라 칸이 비어 있는 경우입니다. 이 두 칸부터 채워 보세요.",
    example: `a red-crowned crane standing in a snowy field,
cinematic photography, photorealistic,
rule of thirds, wide shot,
soft golden hour light, backlit,
serene, dreamy, nostalgic,
85mm lens, shallow depth of field,
highly detailed, high quality`,
    exampleNote: "여섯 축이 전부 채워져 있어 설원 위 두루미의 역광 실루엣이라는 의도가 흔들리지 않고 잔잔한 시네마틱 사진으로 안정적으로 재현됩니다.",
    variations: [
      {
        label: "세로형(9:16) 배경화면 버전",
        prompt: `a red-crowned crane standing in a snowy field, cinematic photography, photorealistic, centered subject, negative space above, soft golden hour light, backlit, serene, minimal, 85mm lens, shallow depth of field, highly detailed --ar 9:16`,
      },
      {
        label: "야간 도시 장면 버전",
        prompt: `a lone cyclist crossing a rainy neon-lit intersection at night, cinematic photography, photorealistic, rule of thirds, wide shot, cool neon glow, reflections on wet asphalt, moody, tense, 35mm lens, shallow depth of field, highly detailed, high quality`,
      },
    ],
  },
  {
    id: "image-gen-02",
    title: "사진처럼 만들기: 카메라·렌즈·필름 키워드",
    category: "image-gen",
    difficulty: "입문",
    tags: ["사진", "카메라", "렌즈", "리얼리즘"],
    prompt: `[장면 묘사 예: a woman walking on a rainy Tokyo street at night],
photograph, shot on [카메라 예: Sony A7 III],
[렌즈 예: 50mm f/1.4 lens], shallow depth of field,
[필름/톤 예: Kodak Portra 400 film look],
natural lighting, realistic skin texture, sharp focus,
[해상도 예: 8k, ultra detailed]`,
    principle: "'사진'을 원하면 실제 촬영 장비 어휘(바디·렌즈·필름·조리개)로 지시",
    why: "photograph, 50mm, f/1.4 같은 촬영 용어는 학습 데이터의 진짜 사진들과 강하게 연결되어 있어, 일러스트풍으로 새는 것을 막고 사실적인 질감을 끌어냅니다.",
    tip: "조리개 값(f/1.4 등)은 배경 흐림 정도를, 초점거리(35mm 등)는 화각을 좌우합니다. 인물은 50~85mm가 무난합니다.",
    example: `an old fisherman mending nets at dawn on a misty harbor,
photograph, shot on Sony A7 III,
50mm f/1.4 lens, shallow depth of field,
Kodak Portra 400 film look,
natural lighting, realistic skin texture, sharp focus,
8k, ultra detailed`,
    exampleNote: "실제 카메라 바디와 필름 이름이 들어가 있어 일러스트풍으로 새지 않고 주름과 그물 질감까지 살아 있는 다큐멘터리풍 사진이 나옵니다.",
    variations: [
      {
        label: "흑백 필름 버전",
        prompt: `an old fisherman mending nets at dawn on a misty harbor, photograph, shot on Leica M6, 35mm f/2 lens, Ilford HP5 black and white film look, fine grain, deep blacks, natural lighting, sharp focus, high detail`,
      },
      {
        label: "야간 네온 스냅 버전",
        prompt: `a street food vendor cooking under neon signs at night in Seoul, photograph, shot on Fujifilm X100V, 23mm f/2 lens, shallow depth of field, CineStill 800T film look, neon reflections, rising steam, realistic skin texture, sharp focus, 8k`,
      },
    ],
  },
  {
    id: "image-gen-03",
    title: "네거티브 프롬프트로 원치 않는 것 제거하기",
    category: "image-gen",
    difficulty: "입문",
    tags: ["네거티브", "품질", "StableDiffusion", "정제"],
    prompt: `프롬프트: [원하는 이미지 묘사, 키워드 나열]

Negative prompt: [빼고 싶은 요소 나열 예: lowres, blurry, bad anatomy, extra fingers, deformed hands, watermark, text, jpeg artifacts, oversaturated, disfigured]`,
    principle: "원하는 것(positive)과 빼고 싶은 것(negative)을 분리해서 지시",
    why: "무엇을 넣을지만 말하면 흔한 오류(손가락 6개, 워터마크 등)가 그대로 섞여 나옵니다. 네거티브 칸에 반복되는 실패 요소를 적어 두면 재현율이 크게 떨어집니다.",
    tip: "네거티브는 한 번 만든 뒤 재사용하는 '기본 세트'로 관리하세요. 이미지마다 실패한 요소를 하나씩 추가해 나가면 점점 튼튼해집니다.",
    example: `프롬프트: portrait of a young woman standing in a sunflower field, golden hour backlight, soft bokeh background, photorealistic, 85mm lens, sharp focus

Negative prompt: lowres, blurry, bad anatomy, extra fingers, deformed hands, watermark, text, jpeg artifacts, oversaturated, disfigured`,
    exampleNote: "인물 사진에서 자주 깨지는 손가락과 워터마크 요소를 네거티브로 미리 차단해 후보정 없이 쓸 수 있는 컷의 비율이 크게 올라갑니다.",
    variations: [
      {
        label: "일러스트용 네거티브 세트",
        prompt: `프롬프트: a cozy watercolor illustration of a cat sleeping on a bookshelf, soft pastel palette, storybook style, warm afternoon light

Negative prompt: photorealistic, 3d render, harsh shadows, muddy colors, extra limbs, watermark, signature, text, frame`,
      },
      {
        label: "제품컷용 네거티브 세트",
        prompt: `프롬프트: product photography of a white ceramic mug on a linen cloth, soft studio lighting, minimal, centered composition, sharp focus

Negative prompt: cluttered background, human hands, fingerprints, distorted logo, text, watermark, lowres, oversaturated, harsh reflections`,
      },
    ],
  },
  {
    id: "image-gen-04",
    title: "용도별 종횡비 지정(--ar)로 잘림 없이 뽑기",
    category: "image-gen",
    difficulty: "입문",
    tags: ["종횡비", "--ar", "구도", "레이아웃"],
    prompt: `[이미지 묘사 키워드] --ar [비율]

용도별 추천:
- 유튜브 썸네일/가로 배너: --ar 16:9
- 인스타 피드(정사각): --ar 1:1
- 인스타 스토리/릴스/폰 배경: --ar 9:16
- 포스터/인쇄물(세로): --ar 3:4 또는 2:3
- 와이드 배경/히어로 이미지: --ar 21:9`,
    principle: "결과물이 쓰일 화면 비율을 먼저 정하고 그 비율로 생성",
    why: "정사각으로 뽑아 나중에 자르면 피사체가 잘리거나 여백이 어색해집니다. 처음부터 최종 비율(--ar)로 생성하면 구도가 그 비율에 맞게 잡힙니다.",
    tip: "DALL·E/ChatGPT에서는 '--ar 16:9' 대신 '가로로 긴 16:9 비율로' 처럼 말로 지정하면 됩니다.",
    example: `a minimal flat illustration of a rocket launching above the clouds, bold geometric shapes, deep navy and coral palette, centered composition --ar 16:9`,
    exampleNote: "유튜브 썸네일 용도라 처음부터 16:9로 생성했기 때문에 로켓의 구도와 텍스트 여백이 가로 화면에 맞게 잡힙니다.",
    variations: [
      {
        label: "인스타 릴스(9:16) 버전",
        prompt: `a minimal flat illustration of a rocket launching above the clouds, bold geometric shapes, deep navy and coral palette, subject in the lower third, empty sky above for caption text --ar 9:16`,
      },
      {
        label: "와이드 히어로(21:9) 버전",
        prompt: `a minimal flat illustration of a rocket flying across a starry sky, bold geometric shapes, deep navy and coral palette, rocket on the left, wide negative space on the right for a headline --ar 21:9`,
      },
    ],
  },
  {
    id: "image-gen-05",
    title: "심플한 로고·아이콘·플랫 일러스트",
    category: "image-gen",
    difficulty: "입문",
    tags: ["로고", "아이콘", "플랫디자인", "벡터"],
    prompt: `[대상 예: a coffee cup] icon,
flat vector illustration, minimalist, simple shapes,
[색상 예: two-tone, warm orange and cream],
clean lines, centered, solid [배경색 예: white] background,
no gradient, no shadow, no text`,
    principle: "로고/아이콘은 '단순함'을 명시하고 불필요 요소(그림자·질감·텍스트)를 배제",
    why: "기본값으로 두면 모델은 사진 같은 디테일과 배경을 더합니다. flat, minimalist, no gradient, solid background를 지정해야 실사용 가능한 깔끔한 아이콘이 나옵니다.",
    tip: "여러 아이콘을 세트로 만들 땐 스타일 문장을 고정하고 [대상]만 바꾸세요. 톤이 통일됩니다.",
    example: `a mountain peak icon,
flat vector illustration, minimalist, simple shapes,
two-tone, deep green and off-white,
clean lines, centered, solid white background,
no gradient, no shadow, no text`,
    exampleNote: "아웃도어 브랜드용 산 아이콘 시나리오로, 배제 키워드 덕분에 그림자나 잡배경 없이 바로 로고 시안으로 쓸 수 있는 결과가 나옵니다.",
    variations: [
      {
        label: "같은 톤 아이콘 세트 확장 버전",
        prompt: `a compass icon, flat vector illustration, minimalist, simple shapes, two-tone, deep green and off-white, clean lines, centered, solid white background, no gradient, no shadow, no text`,
      },
      {
        label: "다크 모드 앱 아이콘 버전",
        prompt: `a mountain peak icon, flat vector illustration, minimalist, geometric shapes, mint green on solid dark charcoal background, rounded square app icon style, clean lines, centered, no gradient, no text`,
      },
    ],
  },
  {
    id: "image-gen-06",
    title: "Midjourney 파라미터 종합 세트(--ar --v --stylize --chaos)",
    category: "image-gen",
    difficulty: "중급",
    tags: ["Midjourney", "파라미터", "--stylize", "--chaos"],
    prompt: `[이미지 묘사, 영어 키워드로 나열]
--ar [비율 예: 16:9]
--v [버전 예: 6.1]
--stylize [0~1000, 예: 250 · 낮을수록 프롬프트 충실, 높을수록 예술적]
--chaos [0~100, 예: 15 · 높을수록 결과 다양성 증가]
--quality [.25/.5/1, 예: 1]
--seed [정수 예: 42 · 같은 값 재사용 시 일관성 유지]`,
    principle: "각 파라미터가 통제하는 축(비율·양식화·다양성·품질·재현)을 분리해서 이해",
    why: "stylize는 예술성, chaos는 다양성, seed는 재현성을 각각 담당합니다. 무엇을 조절하고 싶은지에 따라 한 번에 하나씩 바꿔야 원인과 결과를 파악할 수 있습니다.",
    tip: "먼저 stylize/chaos를 기본값으로 두고 프롬프트 문구부터 다듬으세요. 파라미터는 문구가 안정된 뒤 미세조정용으로 씁니다.",
    example: `a cozy log cabin in a snowy pine forest at night, warm light glowing from the windows, falling snow, cinematic photography --ar 16:9 --v 6.1 --stylize 250 --chaos 15 --quality 1 --seed 42`,
    exampleNote: "기본값에 가까운 안정적인 세팅이라 이후 stylize나 chaos를 한 번에 하나씩 바꿔 가며 각 파라미터의 효과를 비교하기 좋은 출발점입니다.",
    variations: [
      {
        label: "예술성 극대화(stylize 800) 버전",
        prompt: `a cozy log cabin in a snowy pine forest at night, warm light glowing from the windows, painterly, dreamy atmosphere --ar 16:9 --v 6.1 --stylize 800 --chaos 10 --quality 1 --seed 42`,
      },
      {
        label: "시안 탐색(chaos 60) 버전",
        prompt: `a cozy log cabin in a snowy pine forest at night, warm light glowing from the windows --ar 1:1 --v 6.1 --stylize 100 --chaos 60 --quality .5`,
      },
    ],
  },
  {
    id: "image-gen-07",
    title: "조명 어휘 사전으로 분위기 결정하기",
    category: "image-gen",
    difficulty: "중급",
    tags: ["조명", "분위기", "무드", "라이팅"],
    prompt: `[피사체와 장면],
lighting: [아래에서 하나 이상 선택],
[따뜻하고 부드럽게: golden hour, soft warm light, backlit],
[극적으로: dramatic rim light, chiaroscuro, hard shadows],
[차갑고 미래적: cool blue tone, neon glow, cyberpunk lighting],
[스튜디오: softbox studio lighting, three-point lighting],
[자연광: overcast diffused light, window light],
[분위기 키워드 예: moody, ethereal, high contrast]`,
    principle: "조명은 분위기를 결정하는 핵심 변수 — 전용 어휘로 명시",
    why: "같은 피사체도 조명 한 줄로 완전히 다른 감정을 냅니다. golden hour는 향수, rim light는 극적, neon glow는 미래적 느낌을 만드는 식으로 조명 어휘가 무드를 직접 제어합니다.",
    tip: "조명 방향(backlit, side light)과 성질(soft, hard)을 함께 지정하면 훨씬 정교해집니다.",
    example: `a ballet dancer rehearsing alone on an empty theater stage,
lighting: dramatic rim light, chiaroscuro, hard shadows,
moody, high contrast, cinematic`,
    exampleNote: "림 라이트와 키아로스쿠로 조합이 무용수의 윤곽선만 어둠 위로 떠오르게 만들어 극적인 무대 사진이 완성됩니다.",
    variations: [
      {
        label: "따뜻한 골든아워 버전",
        prompt: `a ballet dancer stretching by a large rehearsal room window, lighting: golden hour, soft warm light, backlit, dust particles floating in the air, serene, nostalgic`,
      },
      {
        label: "네온 사이버펑크 버전",
        prompt: `a ballet dancer posing in an empty underground parking garage, lighting: cool blue tone, neon glow, cyberpunk lighting, magenta and cyan accents, futuristic, moody`,
      },
    ],
  },
  {
    id: "image-gen-08",
    title: "카메라 앵글·샷 크기·구도 제어",
    category: "image-gen",
    difficulty: "중급",
    tags: ["구도", "앵글", "샷사이즈", "카메라"],
    prompt: `[피사체와 장면],
shot size: [close-up / medium shot / wide shot / extreme long shot],
angle: [eye level / low angle / high angle / bird's eye view / dutch angle],
composition: [rule of thirds / centered / leading lines / symmetrical / negative space],
[렌즈/원근 예: wide-angle 24mm / telephoto compression],
[초점 예: subject in sharp focus, background bokeh]`,
    principle: "샷 크기·앵글·구도를 영화 촬영 용어로 나눠 지정",
    why: "'멋지게'는 모델이 해석할 수 없지만 low angle, wide shot, rule of thirds는 정확한 카메라 지시입니다. 세 축을 나눠 적으면 원하는 시선과 프레이밍을 재현할 수 있습니다.",
    tip: "인물을 웅장하게 보이려면 low angle, 귀엽거나 작게 보이려면 high angle을 쓰세요. 앵글이 곧 감정입니다.",
    example: `a samurai standing in a bamboo forest,
shot size: wide shot,
angle: low angle,
composition: rule of thirds,
wide-angle 24mm,
subject in sharp focus, background bokeh`,
    exampleNote: "로우 앵글 와이드 샷이 사무라이를 올려다보는 시점으로 담아 대나무의 수직선과 함께 위압감과 웅장함이 살아납니다.",
    variations: [
      {
        label: "감정 강조 클로즈업 버전",
        prompt: `a samurai standing in a bamboo forest, shot size: close-up on the face, angle: eye level, composition: centered, telephoto 85mm compression, eyes in sharp focus, background bokeh`,
      },
      {
        label: "버드아이 뷰 버전",
        prompt: `a samurai walking through a bamboo forest, shot size: extreme long shot, angle: bird's eye view, composition: leading lines of bamboo rows, wide-angle 24mm, tiny figure for scale, atmospheric mist`,
      },
    ],
  },
  {
    id: "image-gen-09",
    title: "아트 미디엄·사조·질감으로 화풍 잡기",
    category: "image-gen",
    difficulty: "중급",
    tags: ["화풍", "미디엄", "아트사조", "질감"],
    prompt: `[주제],
medium: [매체 예: oil painting / watercolor / ink sketch / 3D render / papercut],
art style: [사조/장르 예: art nouveau / bauhaus / ukiyo-e / impressionism / vaporwave],
texture: [질감 예: visible brush strokes / grainy / smooth cel-shading],
color: [색감 예: muted earth tones / vivid complementary colors],
[디테일 수준 예: intricate details, highly detailed]`,
    principle: "매체(medium)·사조(style)·질감(texture)을 분리해 원하는 화풍을 조합",
    why: "'예쁜 그림'은 모호하지만 watercolor + art nouveau + muted tones는 명확한 좌표입니다. 세 축을 조합하면 특정 작가 이름에 기대지 않고도 일관된 화풍을 재현할 수 있습니다.",
    tip: "특정 작가 이름 대신 그 작가의 특징(매체·색·질감)을 풀어 쓰면 저작권 논란을 피하면서 비슷한 톤을 얻을 수 있습니다.",
    example: `a whale drifting over a sleeping city at night,
medium: watercolor,
art style: art nouveau,
texture: visible brush strokes, soft paper grain,
color: muted indigo and warm amber,
intricate details, highly detailed`,
    exampleNote: "수채라는 매체, 아르누보라는 사조, 붓자국이라는 질감이 맞물려 특정 작가 이름 없이도 몽환적인 포스터풍 화풍이 안정적으로 나옵니다.",
    variations: [
      {
        label: "우키요에 판화 버전",
        prompt: `a whale drifting over a sleeping city at night, medium: woodblock print, art style: ukiyo-e, texture: grainy washi paper, flat color planes, color: indigo, cream and vermilion, bold outlines, highly detailed`,
      },
      {
        label: "페이퍼컷 공예 버전",
        prompt: `a whale drifting over a sleeping city at night, medium: layered papercut, art style: minimal contemporary craft, texture: crisp paper edges, subtle shadows between layers, color: pastel blue gradient palette, clean details`,
      },
    ],
  },
  {
    id: "image-gen-10",
    title: "색상 팔레트·무드보드 지정",
    category: "image-gen",
    difficulty: "중급",
    tags: ["색상", "팔레트", "무드보드", "톤"],
    prompt: `[주제와 장면],
color palette: [팔레트 예: teal and orange, muted pastel, monochrome blue],
[구체 색 예: dominant deep navy #1a2b4c with warm gold accents],
mood: [무드 예: calm and minimal / energetic and bold],
[대비/채도 예: low saturation, soft contrast],
consistent color grading throughout`,
    principle: "색은 브랜드/무드의 핵심 — 지배색·강조색·채도를 명시",
    why: "색을 지정하지 않으면 이미지마다 톤이 제각각이 됩니다. 지배색+강조색+채도를 정해 두면 시리즈 전체의 색감이 통일되어 브랜드 이미지로 쓸 수 있습니다.",
    tip: "정확한 색이 필요하면 HEX 코드를 함께 적으세요(모델이 항상 정확히 맞추진 않지만 방향을 크게 좁혀 줍니다).",
    example: `a quiet seaside cafe terrace in the early morning,
color palette: muted pastel,
dominant soft sage green #a8c3a0 with warm cream accents,
mood: calm and minimal,
low saturation, soft contrast,
consistent color grading throughout`,
    exampleNote: "지배색을 HEX까지 지정해 두었기 때문에 시리즈로 여러 장을 뽑아도 카페 브랜드 특유의 차분한 세이지 톤이 유지됩니다.",
    variations: [
      {
        label: "틸앤오렌지 영화 톤 버전",
        prompt: `a quiet seaside cafe terrace at sunset, color palette: teal and orange, deep teal shadows with warm orange highlights, mood: cinematic and inviting, medium saturation, film-like contrast, consistent color grading throughout`,
      },
      {
        label: "모노크롬 블루 버전",
        prompt: `a quiet seaside cafe terrace on a rainy day, color palette: monochrome blue, dominant slate blue #3b5b74 with pale grey accents, mood: melancholic and serene, low saturation, soft contrast, consistent color grading throughout`,
      },
    ],
  },
  {
    id: "image-gen-11",
    title: "인물 포트레이트 정밀 묘사",
    category: "image-gen",
    difficulty: "중급",
    tags: ["인물", "포트레이트", "묘사", "디테일"],
    prompt: `portrait of [인물 예: a 30-year-old East Asian woman],
[표정/시선 예: gentle smile, looking at camera],
[헤어/의상 예: short black hair, beige wool coat],
[피부/질감 예: natural skin texture, subtle freckles],
[배경 예: blurred urban background, bokeh],
[조명 예: soft window light from the left],
85mm portrait lens, shallow depth of field, photorealistic`,
    principle: "인물은 인상(표정·시선)→외형(헤어·의상)→환경(배경·조명) 순으로 구체화",
    why: "포트레이트의 설득력은 표정과 시선, 피부 질감에서 나옵니다. 순서대로 구체화하면 마네킹처럼 굳은 얼굴 대신 살아 있는 인상을 얻을 수 있습니다.",
    tip: "'natural skin texture'를 빼면 얼굴이 플라스틱처럼 매끈해집니다. 사실적 인물엔 거의 필수 키워드입니다.",
    example: `portrait of a 65-year-old fisherman with a weathered face,
faint proud smile, looking slightly off camera,
short grey beard, navy knit sweater and yellow raincoat,
natural skin texture, deep wrinkles, sea spray on skin,
blurred harbor background, bokeh,
soft overcast light from the left,
85mm portrait lens, shallow depth of field, photorealistic`,
    exampleNote: "표정에서 외형, 배경 순으로 구체화한 덕분에 마네킹처럼 굳은 얼굴 대신 바닷바람이 느껴지는 살아 있는 인물 사진이 나옵니다.",
    variations: [
      {
        label: "스튜디오 흑백 버전",
        prompt: `black and white portrait of a 65-year-old fisherman with a weathered face, calm direct gaze at camera, short grey beard, plain dark shirt, natural skin texture, deep wrinkles, solid dark grey studio background, dramatic side lighting, 85mm portrait lens, sharp focus`,
      },
      {
        label: "무대 뒤 댄서 버전",
        prompt: `portrait of a 22-year-old ballet dancer backstage, focused expression with eyes closed, hair in a tight bun, white practice leotard, natural skin texture, light sheen of sweat, blurred stage lights background, bokeh, warm tungsten rim light, 85mm portrait lens, shallow depth of field, photorealistic`,
      },
    ],
  },
  {
    id: "image-gen-12",
    title: "제품 광고컷·목업 사진",
    category: "image-gen",
    difficulty: "중급",
    tags: ["제품", "광고", "목업", "커머스"],
    prompt: `product photography of [제품 예: a matte black skincare bottle],
[배치 예: on a wet stone surface with water droplets],
[배경 예: soft gradient beige studio background],
[조명 예: soft diffused studio lighting, gentle reflection],
[스타일 예: clean, premium, minimal],
centered composition, sharp focus on product,
high-end commercial photography, 8k`,
    principle: "제품컷은 '제품+표면/소품+배경+스튜디오 조명'을 나눠 지정",
    why: "커머스 이미지의 완성도는 배경과 조명의 통제에서 나옵니다. product photography, studio lighting을 명시하면 어수선한 생활 배경 대신 광고에 바로 쓸 깔끔한 컷이 나옵니다.",
    tip: "여백을 두고 싶으면 'negative space for text on the [위치]'를 추가하세요. 배너 문구 넣을 자리를 확보할 수 있습니다.",
    example: `product photography of an amber glass perfume bottle,
on a polished black marble slab with scattered dried flowers,
soft gradient charcoal studio background,
soft diffused studio lighting, gentle golden reflection,
clean, premium, luxurious,
centered composition, sharp focus on product,
high-end commercial photography, 8k`,
    exampleNote: "표면 소품과 배경, 스튜디오 조명을 분리해 지정했기 때문에 생활 잡동사니 없이 광고 배너에 바로 쓸 수 있는 럭셔리 향수 컷이 나옵니다.",
    variations: [
      {
        label: "텍스트 여백 배너 버전",
        prompt: `product photography of an amber glass perfume bottle, on a polished black marble slab, soft gradient charcoal studio background, soft diffused studio lighting, product on the right third, wide negative space for text on the left, clean, premium, high-end commercial photography, 8k --ar 16:9`,
      },
      {
        label: "라이프스타일 연출 버전",
        prompt: `lifestyle product photography of an amber glass perfume bottle, on a sunlit vanity table beside a linen curtain, soft morning window light, warm natural tones, shallow depth of field, candid premium mood, sharp focus on product, 8k`,
      },
    ],
  },
  {
    id: "image-gen-13",
    title: "풍경·환경 컨셉아트",
    category: "image-gen",
    difficulty: "중급",
    tags: ["풍경", "환경", "컨셉아트", "배경"],
    prompt: `[환경 예: a misty ancient forest with giant glowing mushrooms],
environment concept art,
[시간/날씨 예: early morning fog, soft light rays through trees],
[스케일 감 예: tiny traveler for scale in the foreground],
[분위기 예: mysterious, awe-inspiring],
[디테일 예: lush detailed foliage, atmospheric perspective],
wide establishing shot, [비율] --ar 16:9`,
    principle: "환경 아트는 규모감(scale)·대기(atmosphere)·시선 유도를 함께 설계",
    why: "풍경은 넓어서 초점이 흐려지기 쉽습니다. 전경의 작은 인물로 스케일을 주고 안개/광선으로 대기감을 넣으면 깊이와 웅장함이 살아납니다.",
    tip: "'atmospheric perspective'(대기원근)를 넣으면 먼 곳이 흐려져 자연스러운 깊이가 생깁니다.",
    example: `a vast desert canyon with a ruined stone aqueduct,
environment concept art,
late afternoon haze, warm light rays across the cliffs,
tiny caravan of travelers for scale in the foreground,
lonely, awe-inspiring,
detailed eroded rock strata, atmospheric perspective,
wide establishing shot, widescreen --ar 16:9`,
    exampleNote: "전경의 작은 카라반이 협곡의 압도적인 규모를 실감 나게 만들고 대기원근이 깊이를 더해 게임 배경풍의 웅장한 컨셉아트가 나옵니다.",
    variations: [
      {
        label: "수직 강조 세로(9:16) 버전",
        prompt: `a vast desert canyon with a ruined stone aqueduct, environment concept art, late afternoon haze, god rays, tiny climber on the cliff wall for scale, towering vertical composition, detailed eroded rock strata, atmospheric perspective --ar 9:16`,
      },
      {
        label: "폭풍우 야경 버전",
        prompt: `a vast desert canyon under a lightning storm at night, environment concept art, rain haze, cold moonlight with electric blue lightning flashes, tiny caravan sheltering under the aqueduct for scale, ominous, awe-inspiring, wet reflective rock, atmospheric perspective, wide establishing shot --ar 16:9`,
      },
    ],
  },
  {
    id: "image-gen-14",
    title: "애니메·일러스트 스타일 지정",
    category: "image-gen",
    difficulty: "중급",
    tags: ["애니메", "일러스트", "만화", "셀셰이딩"],
    prompt: `[캐릭터/장면 예: a girl with silver hair standing in a flower field],
anime style, [세부 톤 예: soft cel-shading, clean lineart],
[분위기 예: warm nostalgic atmosphere],
[색감 예: pastel color palette],
[디테일 예: detailed eyes, dynamic hair],
[배경 예: soft painterly background],
high quality illustration`,
    principle: "애니/일러스트는 라인·셰이딩·색감·눈 디테일을 구체 어휘로 지정",
    why: "'애니풍'만으로는 편차가 큽니다. cel-shading, clean lineart, detailed eyes처럼 이 장르 특유의 요소를 명시해야 원하는 화풍으로 수렴합니다.",
    tip: "특정 스튜디오/작가 이름 대신 그 특징(부드러운 셀셰이딩, 파스텔 톤 등)을 풀어 쓰면 결과가 더 안정적이고 안전합니다.",
    example: `a boy and a white cat waiting at a rural train platform in summer,
anime style, soft cel-shading, clean lineart,
warm nostalgic atmosphere,
pastel color palette,
detailed eyes, gentle wind in hair,
soft painterly background with towering cumulus clouds,
high quality illustration`,
    exampleNote: "셀셰이딩과 라인아트, 파스텔 톤을 명시해 두어 여름 시골 감성의 극장판 애니메이션 한 장면 같은 일러스트로 수렴합니다.",
    variations: [
      {
        label: "다크 판타지 버전",
        prompt: `a hooded swordswoman standing in a burning castle hall, anime style, sharp cel-shading, bold lineart, dark dramatic atmosphere, crimson and charcoal palette, detailed glowing eyes, dynamic flowing cloak, painterly ember-lit background, high quality illustration`,
      },
      {
        label: "치비 스티커 버전",
        prompt: `a chibi boy hugging a white cat, anime sticker style, thick clean outlines, flat cel-shading, cheerful atmosphere, bright pastel palette, big sparkling eyes, simple white background, die-cut sticker look, high quality illustration`,
      },
    ],
  },
  {
    id: "image-gen-15",
    title: "스타일 레퍼런스 이미지 활용(--sref, --iw, image prompt)",
    category: "image-gen",
    difficulty: "중급",
    tags: ["스타일참조", "--sref", "--iw", "레퍼런스"],
    prompt: `[텍스트 프롬프트: 그리고 싶은 내용]
--sref [스타일 참조 이미지 URL]
--sw [스타일 강도 0~1000, 예: 100]

또는 이미지 프롬프트 방식:
[참조 이미지 URL] [텍스트 프롬프트] --iw [이미지 영향력 0~3, 예: 1.5]`,
    principle: "원하는 '내용'은 텍스트로, 원하는 '스타일'은 참조 이미지로 분리 입력",
    why: "말로 설명하기 힘든 화풍은 예시 이미지가 가장 정확합니다. --sref는 스타일만, --iw는 이미지 전체의 영향력을 조절해 내용과 양식을 따로 통제할 수 있습니다.",
    tip: "결과가 참조 이미지를 너무 베끼면 --iw나 --sw 값을 낮추고, 참조 느낌이 약하면 값을 높이세요.",
    example: `a rainy night market street in Seoul, food stalls with glowing paper lanterns, people with umbrellas
--sref https://cdn.example.com/refs/watercolor-cityscape.jpg
--sw 100`,
    exampleNote: "내용은 텍스트로, 수채 화풍은 참조 이미지로 분리했기 때문에 밤 시장이라는 장면은 유지하면서 참조 이미지의 색감과 붓 터치만 가져옵니다.",
    variations: [
      {
        label: "이미지 프롬프트(--iw) 버전",
        prompt: `https://cdn.example.com/refs/watercolor-cityscape.jpg a rainy night market street in Seoul, food stalls with glowing paper lanterns --iw 1.5`,
      },
      {
        label: "참조 강도 낮춘 버전",
        prompt: `a rainy night market street in Seoul, food stalls with glowing paper lanterns, people with umbrellas --sref https://cdn.example.com/refs/watercolor-cityscape.jpg --sw 30`,
      },
    ],
  },
  {
    id: "image-gen-16",
    title: "프롬프트 가중치 세밀 조정(word:1.3)",
    category: "image-gen",
    difficulty: "고급",
    tags: ["가중치", "weighting", "StableDiffusion", "미세조정"],
    prompt: `프롬프트:
([꼭 강조할 요소]:1.3), ([중요한 디테일]:1.2),
[보통 요소], [배경 요소],
([약하게 하고 싶은 요소]:0.7), [스타일 키워드]

Negative prompt:
([확실히 뺄 것]:1.4), [일반 네거티브 세트]`,
    principle: "괄호와 숫자로 각 키워드의 영향력을 1.0 기준으로 가감",
    why: "키워드를 나열만 하면 모델이 우선순위를 임의로 정합니다. (요소:1.3)으로 올리고 (요소:0.7)로 낮추면 무엇을 강조할지 직접 통제해 구도 충돌을 줄일 수 있습니다.",
    tip: "1.5를 넘기면 이미지가 과포화되거나 깨지기 쉽습니다. 0.9~1.4 범위에서 0.1씩 움직이며 조정하세요.",
    example: `프롬프트:
(a glowing blue butterfly:1.3), (delicate translucent wings:1.2),
a girl reaching out her hand, dark enchanted forest background,
(fireflies:0.7), fantasy illustration, soft painterly style

Negative prompt:
(extra fingers:1.4), lowres, blurry, bad anatomy, watermark, text`,
    exampleNote: "주인공인 나비에 1.3, 배경의 반딧불이에 0.7을 주어 시선이 나비로 모이고 배경이 과해지지 않는 균형 잡힌 화면이 나옵니다.",
    variations: [
      {
        label: "배경 강조로 반전한 버전",
        prompt: `프롬프트:
(a vast dark enchanted forest:1.3), (volumetric moonlight rays:1.2),
a girl reaching out her hand, a glowing blue butterfly,
(fireflies:0.9), fantasy illustration, soft painterly style

Negative prompt:
(extra fingers:1.4), lowres, blurry, bad anatomy, watermark, text`,
      },
      {
        label: "제품컷 가중치 버전",
        prompt: `프롬프트:
(a matte ceramic espresso cup:1.3), (swirling steam:1.2),
wooden cafe table, soft morning window light,
(background chairs:0.6), commercial photography, sharp focus

Negative prompt:
(text:1.4), (watermark:1.4), lowres, blurry, oversaturated`,
      },
    ],
  },
  {
    id: "image-gen-17",
    title: "캐릭터 일관성 유지(--cref, seed, 캐릭터 시트)",
    category: "image-gen",
    difficulty: "고급",
    tags: ["일관성", "캐릭터", "--cref", "seed"],
    prompt: `[동일 캐릭터의 새 장면 묘사 예: the same girl now sitting in a cafe]
--cref [기준 캐릭터 이미지 URL]
--cw [일관성 강도 0~100, 예: 100 · 100은 얼굴+헤어+의상, 낮추면 얼굴 위주]
--seed [고정 정수로 재현성 확보]

기준 이미지가 없다면 먼저:
character reference sheet of [캐릭터 상세 묘사], multiple angles, front and side view, consistent design, neutral background`,
    principle: "기준 이미지(cref)+일관성 강도(cw)+고정 seed로 같은 캐릭터를 여러 장면에 재현",
    why: "장면마다 새로 생성하면 얼굴이 매번 달라집니다. 기준 캐릭터를 --cref로 고정하고 cw로 얼마나 똑같이 갈지 조절하면 스토리보드나 시리즈에서 동일 인물을 유지할 수 있습니다.",
    tip: "의상까지 똑같이 하려면 --cw 100, 얼굴만 유지하고 옷은 바꾸려면 --cw 30~50을 쓰세요.",
    example: `the same red-haired adventurer girl now cooking at a campfire in a forest clearing
--cref https://cdn.example.com/chars/mira-base.png
--cw 100
--seed 77`,
    exampleNote: "기준 이미지의 얼굴·머리·의상을 --cw 100으로 고정했기 때문에 장면이 숲속 캠프로 바뀌어도 같은 캐릭터임을 한눈에 알아볼 수 있습니다.",
    variations: [
      {
        label: "의상만 바꾸는(--cw 35) 버전",
        prompt: `the same red-haired adventurer girl now wearing a formal victorian ball gown in a candlelit hall --cref https://cdn.example.com/chars/mira-base.png --cw 35 --seed 77`,
      },
      {
        label: "기준 캐릭터 시트 생성 버전",
        prompt: `character reference sheet of a red-haired adventurer girl with green eyes, freckles, brown leather jacket and brass goggles, multiple angles, front and side view, consistent design, neutral background`,
      },
    ],
  },
  {
    id: "image-gen-18",
    title: "3D 렌더·CGI 품질 키워드",
    category: "image-gen",
    difficulty: "고급",
    tags: ["3D", "CGI", "렌더", "제품비주얼"],
    prompt: `[대상 예: a cute robot character] 3D render,
[렌더러/엔진 느낌 예: octane render / unreal engine 5 look],
[재질 예: subsurface scattering skin, glossy plastic, brushed metal],
[조명 예: soft studio HDRI lighting, global illumination],
[디테일 예: ray tracing, ambient occlusion, high detail],
[배경 예: seamless gradient background],
8k, photorealistic render`,
    principle: "3D는 엔진·재질(material)·전역조명 용어로 렌더 품질을 지정",
    why: "octane, subsurface scattering, global illumination 같은 CG 용어는 실제 3D 렌더 이미지와 연결됩니다. 재질과 조명 방식을 지정해야 평면 일러스트가 아닌 입체감 있는 렌더가 나옵니다.",
    tip: "제품/캐릭터 목업엔 'seamless gradient background'와 'soft studio HDRI lighting' 조합이 가장 깔끔합니다.",
    example: `a cute round robot barista 3D render,
octane render,
glossy white plastic shell, brushed copper accents, soft rubber grips with subsurface scattering,
soft studio HDRI lighting, global illumination,
ray tracing, ambient occlusion, high detail,
seamless gradient background,
8k, photorealistic render`,
    exampleNote: "엔진과 재질, 전역조명 용어가 모두 지정되어 있어 평면적인 그림이 아니라 피규어 광고처럼 입체감 있는 로봇 렌더가 나옵니다.",
    variations: [
      {
        label: "클레이 스톱모션 질감 버전",
        prompt: `a cute round robot barista 3D render, blender cycles look, matte clay material with subtle fingerprints, stop-motion aesthetic, soft studio HDRI lighting, global illumination, ambient occlusion, pastel seamless background, high detail render`,
      },
      {
        label: "로우폴리 게임 에셋 버전",
        prompt: `a cute round robot barista, low poly 3D render, flat-shaded geometric facets, simple color blocks, unreal engine 5 look, soft ambient lighting, isometric view, seamless mint gradient background, clean game asset style`,
      },
    ],
  },
  {
    id: "image-gen-19",
    title: "이미지 안에 텍스트·타이포 정확히 넣기",
    category: "image-gen",
    difficulty: "고급",
    tags: ["타이포", "텍스트", "포스터", "간판"],
    prompt: `[장면/디자인 묘사 예: a vintage coffee shop poster],
with the exact text "[정확한 문구, 짧게]" as the main title,
[서체 스타일 예: bold retro serif lettering],
[배치 예: centered at the top],
[보조 문구가 있으면: and smaller text "[부제]" below],
clean legible typography, well-kerned`,
    principle: "넣을 문구를 따옴표로 정확히 고정하고, 서체 스타일·배치를 별도 지정",
    why: "이미지 모델은 글자를 자주 뭉갭니다. 문구를 따옴표로 명확히 주고 짧게 유지하며 서체/위치를 지정하면 오탈자와 깨짐이 크게 줄어듭니다.",
    tip: "긴 문장·여러 줄은 실패율이 높습니다. 한두 단어씩 나누고, 텍스트 정확도가 중요하면 Ideogram이나 DALL·E 계열을 쓰세요.",
    example: `a vintage coffee shop poster,
with the exact text "MORNING BREW" as the main title,
bold retro serif lettering,
centered at the top,
and smaller text "EST. 1998" below,
clean legible typography, well-kerned`,
    exampleNote: "문구를 따옴표로 고정하고 두 단어 이내로 짧게 유지했기 때문에 글자가 뭉개지지 않은 빈티지 포스터가 나올 확률이 높아집니다.",
    variations: [
      {
        label: "네온사인 간판 버전",
        prompt: `a neon sign on a dark brick wall at night, with the exact text "OPEN LATE" in glowing pink neon tube lettering, centered, subtle reflection on the wet pavement below, clean legible typography`,
      },
      {
        label: "한글 카페 로고 버전",
        prompt: `a minimal cafe logo design, with the exact text "커피한잔" as the main title, rounded friendly sans-serif lettering, centered on a cream background, small coffee bean icon above, clean legible typography, well-kerned`,
      },
    ],
  },
  {
    id: "image-gen-20",
    title: "AI에게 이미지 프롬프트를 짓게 하는 메타 프롬프트",
    category: "image-gen",
    difficulty: "고급",
    tags: ["메타프롬프트", "프롬프트생성", "협업", "아이디어"],
    prompt: `당신은 Midjourney/Stable Diffusion 전문 프롬프트 엔지니어입니다.

제가 원하는 이미지: [한국어로 자유롭게 묘사]
용도: [예: 블로그 대표 이미지, 16:9]
분위기: [원하는 느낌]

아래를 해 주세요:
1. 피사체·스타일·구도·조명·분위기·카메라 6요소를 채운 영어 프롬프트 3가지 변형을 제시(각각 톤을 다르게).
2. 각 프롬프트에 어울리는 파라미터(--ar 등) 추천.
3. 함께 쓸 네거티브 프롬프트 예시.
4. 각 변형이 어떤 느낌을 노렸는지 한 줄 설명.`,
    principle: "생성 모델용 프롬프트를 언어 모델(ChatGPT/Claude)에게 대신 설계시키기",
    why: "영어 키워드 조합이 어려울 때, LLM에게 6요소 틀과 용도를 주면 즉시 여러 변형을 만들어 줍니다. 사람은 방향만 정하고 다듬는 데 집중할 수 있습니다.",
    tip: "마음에 드는 변형이 나오면 '이 방향으로 5개 더, 조명만 다르게'처럼 한 축씩 바꿔 달라고 이어가세요.",
    example: `당신은 Midjourney/Stable Diffusion 전문 프롬프트 엔지니어입니다.

제가 원하는 이미지: 새벽 안개 낀 한강 다리 위를 달리는 러너의 뒷모습, 영화의 한 장면 같은 느낌
용도: 러닝 앱 온보딩 화면 배경, 9:16 세로
분위기: 고요하지만 의지가 느껴지는, 차가운 새벽 공기

아래를 해 주세요:
1. 피사체·스타일·구도·조명·분위기·카메라 6요소를 채운 영어 프롬프트 3가지 변형을 제시(각각 톤을 다르게).
2. 각 프롬프트에 어울리는 파라미터(--ar 등) 추천.
3. 함께 쓸 네거티브 프롬프트 예시.
4. 각 변형이 어떤 느낌을 노렸는지 한 줄 설명.`,
    exampleNote: "용도와 세로 비율까지 함께 알려 주었기 때문에 LLM이 --ar 9:16을 포함한 실전용 영어 프롬프트를 톤별로 세 가지 만들어 줍니다.",
    variations: [
      {
        label: "제품 광고컷 의뢰 버전",
        prompt: `당신은 Midjourney/Stable Diffusion 전문 프롬프트 엔지니어입니다.

제가 원하는 이미지: 물방울이 맺힌 유리병에 담긴 콜드브루 커피, 고급스러운 광고 사진
용도: 스마트스토어 상세페이지 대표 이미지, 1:1 정사각
분위기: 시원하고 프리미엄한 느낌

아래를 해 주세요:
1. 피사체·스타일·구도·조명·분위기·카메라 6요소를 채운 영어 프롬프트 3가지 변형을 제시(각각 톤을 다르게).
2. 각 프롬프트에 어울리는 파라미터(--ar 등) 추천.
3. 함께 쓸 네거티브 프롬프트 예시.
4. 각 변형이 어떤 느낌을 노렸는지 한 줄 설명.`,
      },
      {
        label: "마음에 든 방향 확장 버전",
        prompt: `당신은 Midjourney/Stable Diffusion 전문 프롬프트 엔지니어입니다.

아래 기준 프롬프트가 마음에 듭니다. 이 방향을 유지하면서 조명만 서로 다르게 바꾼 변형 5개를 만들어 주세요.

기준 프롬프트: a runner on a foggy Han River bridge at dawn, cinematic photography, wide shot from behind, cool blue morning light, quiet determined mood, 35mm lens --ar 9:16

각 변형에 그 조명이 만드는 분위기를 한 줄로 설명해 주세요.`,
      },
    ],
  },
  {
    id: "image-gen-21",
    title: "결과가 안 나올 때 프롬프트 진단·개선 루프",
    category: "image-gen",
    difficulty: "고급",
    tags: ["개선", "디버깅", "반복", "진단"],
    prompt: `당신은 이미지 프롬프트 개선 코치입니다.

현재 프롬프트: [지금 쓰는 프롬프트 그대로]
사용 모델: [Midjourney / Stable Diffusion / DALL·E]
나온 결과의 문제: [예: 손가락이 이상함, 배경이 너무 복잡함, 분위기가 안 맞음]
원하는 결과: [목표 한 줄]

해 주세요:
1. 문제의 원인을 프롬프트/파라미터/네거티브 관점에서 진단.
2. 무엇을 추가·삭제·가중치 조정할지 구체적으로 제안.
3. 수정된 프롬프트 최종본과 네거티브 프롬프트 제시.
4. 다음에 A/B로 시험해 볼 변수 1가지.`,
    principle: "한 번에 완성 대신, 문제를 진단하고 변수를 하나씩 바꾸는 반복 개선",
    why: "이미지는 첫 시도에 완벽할 수 없습니다. 실패 원인을 언어로 진단하고 한 축씩 수정하면, 무엇이 결과를 바꿨는지 배우며 빠르게 원하는 그림에 수렴합니다.",
    tip: "seed를 고정한 채 키워드 하나만 바꿔 비교하면 그 키워드의 효과를 정확히 관찰할 수 있습니다.",
    example: `당신은 이미지 프롬프트 개선 코치입니다.

현재 프롬프트: portrait of a woman holding a coffee cup, cafe background, photorealistic, 8k
사용 모델: Stable Diffusion
나온 결과의 문제: 손가락이 6개로 나오고, 배경 간판의 글자가 전부 깨져 보임
원하는 결과: 손이 자연스럽고 배경은 부드럽게 흐려진 카페 인물 사진

해 주세요:
1. 문제의 원인을 프롬프트/파라미터/네거티브 관점에서 진단.
2. 무엇을 추가·삭제·가중치 조정할지 구체적으로 제안.
3. 수정된 프롬프트 최종본과 네거티브 프롬프트 제시.
4. 다음에 A/B로 시험해 볼 변수 1가지.`,
    exampleNote: "실패 증상을 손가락 개수와 깨진 글자처럼 구체적으로 적었기 때문에 네거티브 추가와 배경 보케 처리 같은 정확한 처방을 받을 수 있습니다.",
    variations: [
      {
        label: "분위기 불일치 진단 버전",
        prompt: `당신은 이미지 프롬프트 개선 코치입니다.

현재 프롬프트: a cozy bookstore interior, warm light, detailed
사용 모델: Midjourney
나온 결과의 문제: 아늑한 헌책방 대신 차갑고 상업적인 대형 서점처럼 나옴
원하는 결과: 오래된 목재 서가와 노란 스탠드 불빛이 있는 아늑한 헌책방

해 주세요:
1. 분위기가 어긋난 원인을 조명·색감·스타일 키워드 관점에서 진단.
2. 추가·삭제할 키워드와 stylize 값을 구체적으로 제안.
3. 수정된 프롬프트 최종본 제시.
4. 다음에 A/B로 시험해 볼 변수 1가지.`,
      },
      {
        label: "seed 고정 A/B 실험 버전",
        prompt: `당신은 이미지 프롬프트 개선 코치입니다. seed를 고정하고 변수 하나만 바꾸는 A/B 실험을 설계해 주세요.

현재 프롬프트: a cozy bookstore interior, warm light, detailed --seed 88
확인하고 싶은 것: warm light를 golden hour window light로 바꾸면 분위기가 얼마나 달라지는지

해 주세요:
1. seed를 유지한 A안/B안 프롬프트를 각각 제시.
2. 두 결과를 비교할 때 확인할 체크포인트 3가지.
3. 실험 후 다음으로 바꿔 볼 변수 1가지 추천.`,
      },
    ],
  },
  {
    id: "image-gen-22",
    title: "부분 수정(인페인팅)·시리즈 일관성 지시",
    category: "image-gen",
    difficulty: "고급",
    tags: ["인페인팅", "편집", "일관성", "시리즈"],
    prompt: `기존 이미지를 부분만 바꾸려 합니다.

원본 설명: [원본 이미지에 무엇이 있는지]
수정할 영역: [바꿀 부분 예: 배경 하늘만 / 인물의 옷만]
바꿀 내용: [새로 넣을 것 예: 맑은 하늘 -> 노을 지는 하늘]
유지할 것: [건드리면 안 되는 요소 예: 인물, 구도, 조명 방향]

지시:
- 수정 영역만 자연스럽게 교체하고 나머지는 그대로 둘 것.
- 경계가 튀지 않게 조명·색감·그림자를 주변과 일치시킬 것.
- 같은 스타일로 시리즈를 이어갈 경우 아래 고정 스타일을 유지: [스타일·색감·조명 문장]`,
    principle: "전체 재생성 대신 '수정 영역/유지 영역/일치 조건'을 나눠 지시",
    why: "괜찮은 이미지의 일부만 고치고 싶을 때 전체를 새로 뽑으면 애써 얻은 구도가 사라집니다. 바꿀 곳과 지킬 곳, 경계 일치 조건을 나눠 주면 자연스러운 부분 편집과 시리즈 통일이 가능합니다.",
    tip: "인페인팅 도구에선 마스크로 영역을 칠하고, 프롬프트엔 '그 영역에 들어갈 것'만 적으세요. 원본 전체 묘사를 반복하면 오히려 딴 그림이 됩니다.",
    example: `기존 이미지를 부분만 바꾸려 합니다.

원본 설명: 맑은 대낮 하늘 아래 해바라기밭에 서 있는 여성의 전신 사진
수정할 영역: 배경 하늘만
바꿀 내용: 맑은 파란 하늘 -> 보랏빛 노을이 지는 하늘
유지할 것: 인물, 해바라기밭, 구도, 조명 방향

지시:
- 수정 영역만 자연스럽게 교체하고 나머지는 그대로 둘 것.
- 경계가 튀지 않게 조명·색감·그림자를 주변과 일치시킬 것.
- 같은 스타일로 시리즈를 이어갈 경우 아래 고정 스타일을 유지: cinematic photography, warm golden tones, soft backlight`,
    exampleNote: "바꿀 곳과 지킬 곳을 분리해 지시했기 때문에 인물과 구도는 그대로 둔 채 하늘만 노을로 자연스럽게 교체된 결과를 얻습니다.",
    variations: [
      {
        label: "인물 의상만 교체 버전",
        prompt: `기존 이미지를 부분만 바꾸려 합니다.

원본 설명: 해바라기밭에 서 있는 여성의 전신 사진, 흰 원피스 차림
수정할 영역: 인물의 옷만
바꿀 내용: 흰 원피스 -> 데님 재킷과 청바지
유지할 것: 얼굴, 포즈, 배경, 조명 방향

지시:
- 수정 영역만 자연스럽게 교체하고 나머지는 그대로 둘 것.
- 옷의 주름과 그림자가 기존 조명 방향과 일치하게 만들 것.`,
      },
      {
        label: "시리즈 계절 변화 버전",
        prompt: `같은 구도의 이미지를 계절만 바꿔 시리즈로 만들려 합니다.

원본 설명: 여름 해바라기밭에 서 있는 여성의 전신 사진
수정할 영역: 배경의 계절 요소 전체
바꿀 내용: 여름 해바라기밭 -> 눈 덮인 겨울 들판
유지할 것: 인물의 포즈와 위치, 카메라 앵글, 프레이밍

지시:
- 인물은 그대로 두고 배경의 계절만 교체할 것.
- 겨울 광량에 맞게 색온도를 차갑게 조정하되 조명 방향은 유지할 것.
- 시리즈 고정 스타일 유지: cinematic photography, soft backlight, muted tones`,
      },
    ],
  },
];
