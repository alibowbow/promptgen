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
  },
];
