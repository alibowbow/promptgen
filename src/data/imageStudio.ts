import type { AnatomySegment, ImageVocabTable, ProgressiveStep } from './types';

// Image-prompt learning studio data: prompt anatomy, keyword vocabulary, progressive example.

export const IMAGE_ANATOMY: AnatomySegment[] = [
  {
    key: "subject",
    label: "Subject",
    ko: "주제/피사체",
    description:
      "무엇을 그릴지 정의하는 프롬프트의 핵심으로, 대상의 정체와 행동, 상태를 담습니다. 대부분의 모델이 앞쪽 단어에 가장 큰 가중치를 주므로 주제는 반드시 프롬프트 맨 앞에 배치해야 합니다.",
    example: "a lone lighthouse on a cliff",
  },
  {
    key: "style",
    label: "Style / Medium",
    ko: "스타일/매체",
    description:
      "사진, 유화, 3D 렌더처럼 이미지를 어떤 매체와 화풍으로 표현할지 결정합니다. 주제 바로 뒤에 두면 이후의 모든 키워드가 그 매체의 문법 안에서 해석되어 결과의 일관성이 높아집니다.",
    example: "cinematic photography, shot on 35mm film",
  },
  {
    key: "composition",
    label: "Composition / Viewpoint",
    ko: "구도/시점",
    description:
      "카메라가 피사체를 어디서 어떤 거리로 바라보는지와 화면 안 요소 배치를 지정합니다. 같은 주제라도 로우 앵글과 부감은 전혀 다른 서사를 만들므로 의도한 시점을 명시해야 합니다.",
    example: "low angle shot, rule of thirds",
  },
  {
    key: "lighting",
    label: "Lighting",
    ko: "조명",
    description:
      "빛의 방향과 세기, 시간대를 지정해 입체감과 사실감을 좌우합니다. 조명 키워드 하나가 스타일 키워드 여러 개보다 분위기를 크게 바꾸는 경우가 많아, 투자 대비 효과가 가장 큰 파트입니다.",
    example: "golden hour, soft rim light",
  },
  {
    key: "color",
    label: "Color",
    ko: "색감",
    description:
      "이미지 전체의 팔레트와 색 온도를 통제해 톤을 통일합니다. 색감을 비워 두면 모델이 매번 임의로 선택하므로, 재현성과 시리즈 일관성이 필요할수록 명시적으로 지정해야 합니다.",
    example: "teal and orange color grading",
  },
  {
    key: "mood",
    label: "Mood / Atmosphere",
    ko: "분위기",
    description:
      "이미지가 전달할 감정을 형용사로 지정해 장면의 해석 방향을 정합니다. 조명이나 색감과 결이 맞아야 효과가 증폭되며, 서로 모순되는 감정 단어를 섞으면 결과가 흐려집니다.",
    example: "serene, nostalgic atmosphere",
  },
  {
    key: "detail",
    label: "Detail / Texture",
    ko: "디테일/질감",
    description:
      "표면 재질과 미세 묘사의 밀도를 끌어올리는 보강 키워드입니다. 보통 프롬프트 뒤쪽에 두지만, 특정 질감이 장면의 핵심이라면 주제 가까이로 당겨 가중치를 높입니다.",
    example: "weathered stone, intricate details",
  },
  {
    key: "params",
    label: "Parameters",
    ko: "파라미터",
    description:
      "종횡비, 모델 버전, 스타일 강도처럼 그림 내용이 아닌 생성 설정을 제어합니다. Midjourney의 --ar 같은 플래그는 반드시 프롬프트 맨 끝에 붙여야 하며, 문장 중간에 넣으면 인식되지 않습니다.",
    example: "--ar 16:9 --stylize 200",
  },
];

export const IMAGE_VOCAB_TABLES: ImageVocabTable[] = [
  {
    key: "lighting",
    title: "조명",
    emoji: "💡",
    intro:
      "같은 피사체라도 빛의 시간대와 방향이 바뀌면 완전히 다른 사진이 되므로, 분위기를 좌우하고 싶을 때 가장 먼저 손대야 할 축입니다.",
    terms: [
      {
        en: "golden hour",
        ko: "골든아워",
        effect: "해 뜨고 진 직후의 낮고 따뜻한 빛이 긴 그림자와 황금빛 톤을 만듦",
        usage: "portrait of an old sailor, golden hour, warm sunlight",
      },
      {
        en: "blue hour",
        ko: "블루아워",
        effect: "일몰 직후 하늘의 짙은 파랑이 차분하고 도시적인 냉색 톤을 입힘",
        usage: "city skyline at blue hour, glowing windows",
      },
      {
        en: "rim light",
        ko: "림 라이트(윤곽광)",
        effect: "피사체 윤곽을 빛 테두리로 감싸 배경과 또렷하게 분리",
        usage: "black cat in a dark room, strong rim light",
      },
      {
        en: "backlight",
        ko: "역광",
        effect: "광원을 피사체 뒤에 두어 실루엣과 빛 번짐 플레어를 만듦",
        usage: "dancer in morning fog, backlight, silhouette",
      },
      {
        en: "volumetric lighting",
        ko: "볼류메트릭 조명",
        effect: "공기 중 먼지나 안개에 빛줄기가 형체로 드러나 공간의 깊이를 강조",
        usage: "ancient library, volumetric lighting through tall windows",
      },
      {
        en: "soft diffused light",
        ko: "부드러운 확산광",
        effect: "그림자 경계를 흐려 피부와 표면을 매끄럽고 온화하게 표현",
        usage: "newborn portrait, soft diffused light from a window",
      },
      {
        en: "hard light",
        ko: "하드 라이트(직사광)",
        effect: "경계가 칼같이 선명한 짙은 그림자로 강한 대비와 긴장감을 만듦",
        usage: "boxer portrait, hard light, deep shadows",
      },
      {
        en: "neon glow",
        ko: "네온 글로우",
        effect: "채도 높은 네온 광원이 피사체에 분홍과 청록의 반사광을 입힘",
        usage: "rainy alley at night, neon glow reflections on wet asphalt",
      },
      {
        en: "candlelight",
        ko: "촛불 조명",
        effect: "일렁이는 주황 점광원이 좁은 범위만 밝혀 친밀하고 고전적인 느낌",
        usage: "medieval scholar reading, candlelight, dark study",
      },
      {
        en: "studio lighting",
        ko: "스튜디오 조명",
        effect: "통제된 다등 세팅이 잡티 없는 균일하고 상업적인 마감을 만듦",
        usage: "product shot of a wristwatch, studio lighting, seamless backdrop",
      },
      {
        en: "overcast",
        ko: "흐린 날 조명",
        effect: "구름이 거대한 확산판 역할을 해 그림자가 옅어지고 색이 차분해짐",
        usage: "quiet fishing village, overcast sky, muted daylight",
      },
      {
        en: "dramatic chiaroscuro",
        ko: "키아로스쿠로(극명암)",
        effect: "렘브란트풍의 극단적 명암 대비로 어둠 속에서 피사체만 떠오름",
        usage: "baroque style portrait, dramatic chiaroscuro",
      },
      {
        en: "god rays",
        ko: "갓 레이(빛내림)",
        effect: "구름이나 나뭇잎 틈으로 뻗는 부챗살 광선이 장엄한 스케일감을 부여",
        usage: "misty forest at dawn, god rays through the canopy",
      },
      {
        en: "moonlight",
        ko: "달빛",
        effect: "차갑고 푸른 저조도 빛이 정적과 신비감을 연출",
        usage: "wolf on a snowy ridge, pale moonlight",
      },
    ],
  },
  {
    key: "camera",
    title: "카메라 & 렌즈",
    emoji: "📷",
    intro:
      "결과물이 어떤 장비로 찍은 듯 보일지 정하는 축으로, 화각과 심도, 셔터 효과까지 사진의 물리적 느낌을 통제하고 싶을 때 사용합니다.",
    terms: [
      {
        en: "85mm portrait lens",
        ko: "85mm 인물 렌즈",
        effect: "얼굴 왜곡 없이 배경을 부드럽게 압축해 인물 사진의 표준 화각을 재현",
        usage: "portrait of a violinist, 85mm portrait lens, f/1.8",
      },
      {
        en: "35mm lens",
        ko: "35mm 렌즈",
        effect: "사람의 시야에 가까운 자연스러운 화각으로 스냅과 다큐 느낌을 냄",
        usage: "candid street scene in Seoul, 35mm lens",
      },
      {
        en: "wide-angle lens",
        ko: "광각 렌즈",
        effect: "화각을 넓혀 공간을 과장되게 펼치고 원근감을 극대화",
        usage: "canyon vista at sunrise, wide-angle lens",
      },
      {
        en: "telephoto lens",
        ko: "망원 렌즈",
        effect: "먼 피사체를 당기고 배경을 압축해 겹겹이 쌓인 레이어감을 만듦",
        usage: "lion in the savanna, telephoto lens, compressed background",
      },
      {
        en: "macro photography",
        ko: "매크로(접사)",
        effect: "수 밀리미터 피사체를 화면 가득 확대해 육안으로 못 보는 디테일을 표현",
        usage: "macro photography of a dewdrop on a spider web",
      },
      {
        en: "fisheye lens",
        ko: "어안 렌즈",
        effect: "180도에 가까운 화각으로 화면 가장자리를 둥글게 왜곡",
        usage: "skateboarder mid-air, fisheye lens",
      },
      {
        en: "shallow depth of field",
        ko: "얕은 심도",
        effect: "초점면 앞뒤를 흐려 피사체만 또렷하게 도드라지게 함",
        usage: "steaming coffee cup on a cafe table, shallow depth of field",
      },
      {
        en: "bokeh",
        ko: "보케",
        effect: "초점 밖 광원이 둥근 빛망울로 뭉개져 몽환적인 배경을 만듦",
        usage: "night portrait, city lights bokeh in the background",
      },
      {
        en: "long exposure",
        ko: "장노출",
        effect: "움직임을 빛의 궤적과 비단결 물살로 뭉개 시간의 흐름을 시각화",
        usage: "waterfall at dusk, long exposure, silky water",
      },
      {
        en: "motion blur",
        ko: "모션 블러",
        effect: "움직이는 피사체에 잔상을 남겨 속도감과 역동성을 강조",
        usage: "cyclist racing through downtown, motion blur",
      },
      {
        en: "tilt-shift",
        ko: "틸트 시프트",
        effect: "화면 위아래를 흐려 실제 풍경을 미니어처 모형처럼 보이게 함",
        usage: "aerial view of a harbor town, tilt-shift miniature effect",
      },
      {
        en: "drone shot",
        ko: "드론 샷",
        effect: "높은 공중 시점이 지형의 패턴과 스케일을 한눈에 담음",
        usage: "drone shot of terraced rice fields at sunrise",
      },
      {
        en: "GoPro POV",
        ko: "고프로 1인칭 시점",
        effect: "초광각 1인칭 시점으로 현장 한가운데 있는 듯한 몰입감을 만듦",
        usage: "GoPro POV of kayaking through whitewater rapids",
      },
      {
        en: "double exposure",
        ko: "이중 노출",
        effect: "두 이미지를 겹쳐 실루엣 안에 다른 장면을 담는 초현실 효과",
        usage: "double exposure of a woman and a pine forest",
      },
    ],
  },
  {
    key: "composition",
    title: "구도 & 시점",
    emoji: "📐",
    intro:
      "피사체를 화면 어디에 어떤 각도로 놓을지 정하는 축으로, 시선의 흐름과 장면의 긴장감을 설계할 때 필수입니다.",
    terms: [
      {
        en: "rule of thirds",
        ko: "삼분할 구도",
        effect: "3x3 격자의 교차점에 피사체를 두어 안정적이면서 지루하지 않은 균형을 만듦",
        usage: "sailboat on the horizon, rule of thirds",
      },
      {
        en: "centered composition",
        ko: "중앙 구도",
        effect: "피사체를 정중앙에 고정해 대칭적이고 정면으로 마주하는 긴장감을 줌",
        usage: "monk facing the camera, centered composition",
      },
      {
        en: "symmetry",
        ko: "대칭 구도",
        effect: "좌우 또는 상하가 거울처럼 맞아 질서정연하고 형식적인 아름다움을 만듦",
        usage: "palace hallway reflected in still water, perfect symmetry",
      },
      {
        en: "leading lines",
        ko: "유도선",
        effect: "길이나 난간, 빛줄기가 시선을 피사체까지 자연스럽게 끌고 감",
        usage: "railway tracks as leading lines toward the sunset",
      },
      {
        en: "low angle",
        ko: "로우 앵글",
        effect: "아래에서 올려다봐 피사체를 웅장하고 위압적으로 보이게 함",
        usage: "skyscraper shot from a low angle, towering above",
      },
      {
        en: "high angle",
        ko: "하이 앵글",
        effect: "위에서 내려다봐 피사체를 작고 취약해 보이게 함",
        usage: "child alone in an empty plaza, high angle shot",
      },
      {
        en: "bird's-eye view",
        ko: "버드아이 뷰(부감)",
        effect: "수직 바로 위에서 내려다봐 장면을 지도나 패턴처럼 평면화",
        usage: "bird's-eye view of a busy street market",
      },
      {
        en: "worm's-eye view",
        ko: "웜즈아이 뷰(앙감)",
        effect: "지면에서 수직으로 올려다봐 극단적인 원근과 하늘 배경을 만듦",
        usage: "worm's-eye view of giant redwood trees",
      },
      {
        en: "close-up",
        ko: "클로즈업",
        effect: "얼굴이나 사물의 일부를 화면 가득 채워 감정과 디테일에 집중시킴",
        usage: "close-up of weathered hands holding soil",
      },
      {
        en: "extreme wide shot",
        ko: "익스트림 와이드 샷",
        effect: "피사체를 광활한 배경 속 점처럼 배치해 스케일과 고립감을 강조",
        usage: "extreme wide shot of a hiker on a glacier",
      },
      {
        en: "over-the-shoulder shot",
        ko: "오버 더 숄더 샷",
        effect: "인물의 어깨 너머로 장면을 보여줘 대화나 관찰의 시점을 부여",
        usage: "over-the-shoulder shot of a chess match",
      },
      {
        en: "dutch angle",
        ko: "더치 앵글(기울인 구도)",
        effect: "수평선을 비스듬히 기울여 불안과 혼란을 시각적으로 암시",
        usage: "detective in a dark hallway, dutch angle",
      },
    ],
  },
  {
    key: "style",
    title: "스타일 & 사조",
    emoji: "🎨",
    intro:
      "이미지가 어떤 매체와 사조의 문법으로 그려질지 정하는 축으로, 한 단어로 결과물 전체의 정체성을 바꾸고 싶을 때 가장 강력합니다.",
    terms: [
      {
        en: "photorealistic",
        ko: "포토리얼리스틱",
        effect: "그림 티를 지우고 실제 사진으로 착각할 만큼 사실적으로 렌더링",
        usage: "photorealistic portrait of a snow leopard",
      },
      {
        en: "cinematic",
        ko: "시네마틱",
        effect: "영화 스틸컷 같은 와이드 프레임과 색 보정, 연출된 조명 느낌을 입힘",
        usage: "cinematic still of a lone astronaut on a red planet",
      },
      {
        en: "oil painting",
        ko: "유화",
        effect: "두터운 붓질과 깊은 색층으로 고전 회화의 무게감을 재현",
        usage: "oil painting of a stormy harbor, thick brushstrokes",
      },
      {
        en: "watercolor",
        ko: "수채화",
        effect: "물 번짐과 투명한 겹칠로 가볍고 서정적인 느낌을 냄",
        usage: "watercolor illustration of a rainy street cafe",
      },
      {
        en: "ukiyo-e",
        ko: "우키요에",
        effect: "일본 목판화 특유의 평면적 색면과 윤곽선, 파도 문양 스타일을 적용",
        usage: "great wave crashing over a ferry, ukiyo-e style",
      },
      {
        en: "art nouveau",
        ko: "아르누보",
        effect: "덩굴처럼 흐르는 곡선 장식과 무하풍 실루엣의 장식미를 입힘",
        usage: "art nouveau poster of a goddess with lilies",
      },
      {
        en: "art deco",
        ko: "아르데코",
        effect: "기하학 패턴과 금색 직선의 1920년대풍 고급스러운 장식을 적용",
        usage: "art deco hotel lobby, gold geometric patterns",
      },
      {
        en: "impressionist",
        ko: "인상주의",
        effect: "짧은 붓 터치로 빛과 순간의 인상을 뭉개듯 포착",
        usage: "impressionist painting of a garden picnic",
      },
      {
        en: "cyberpunk",
        ko: "사이버펑크",
        effect: "네온과 홀로그램, 하이테크 빈민가가 뒤섞인 미래 도시 미학을 입힘",
        usage: "cyberpunk night market, holographic signs",
      },
      {
        en: "steampunk",
        ko: "스팀펑크",
        effect: "황동 기어와 증기기관, 빅토리아풍 의상의 레트로 미래 세계관을 적용",
        usage: "steampunk airship above a victorian city",
      },
      {
        en: "minimalist",
        ko: "미니멀리즘",
        effect: "요소를 극단적으로 덜어내 여백과 단순한 형태만 남김",
        usage: "minimalist poster of a red balloon, vast white background",
      },
      {
        en: "pixel art",
        ko: "픽셀 아트",
        effect: "저해상도 격자 픽셀로 8비트와 16비트 레트로 게임 감성을 재현",
        usage: "pixel art of a cozy tavern interior, 16-bit",
      },
      {
        en: "3D render",
        ko: "3D 렌더",
        effect: "매끈한 표면과 계산된 광원으로 CG 그래픽 특유의 마감을 만듦",
        usage: "cute robot character, 3D render, soft studio light",
      },
      {
        en: "studio ghibli style",
        ko: "지브리 스타일",
        effect: "손그림 셀 애니 특유의 따뜻한 색과 뭉게구름, 무성한 자연 묘사를 입힘",
        usage: "countryside train station in summer, studio ghibli style",
      },
    ],
  },
  {
    key: "texture",
    title: "재질 & 질감",
    emoji: "🪨",
    intro:
      "표면이 빛에 어떻게 반응하고 손에 어떤 감촉일지 정하는 축으로, 만졌을 때의 감각까지 전달하고 싶을 때 추가합니다.",
    terms: [
      {
        en: "matte",
        ko: "무광(매트)",
        effect: "반사를 죽인 보드라운 표면으로 차분하고 현대적인 마감을 만듦",
        usage: "matte black ceramic vase on a linen cloth",
      },
      {
        en: "glossy",
        ko: "유광(글로시)",
        effect: "매끈한 하이라이트 반사로 새것 같은 인공적인 광택을 입힘",
        usage: "glossy red sports car in a showroom",
      },
      {
        en: "metallic",
        ko: "메탈릭",
        effect: "금속 특유의 강한 정반사와 차가운 하이라이트를 만듦",
        usage: "metallic dragon scales glinting in torchlight",
      },
      {
        en: "iridescent",
        ko: "이리데슨트(무지갯빛)",
        effect: "보는 각도에 따라 색이 흐르는 진주나 비눗방울 같은 광택을 냄",
        usage: "iridescent beetle shell, macro detail",
      },
      {
        en: "weathered",
        ko: "풍화된",
        effect: "비바람에 닳은 흠집과 빛바램으로 세월의 이야기를 입힘",
        usage: "weathered wooden fishing boat on the shore",
      },
      {
        en: "rough-hewn",
        ko: "거칠게 깎은",
        effect: "도구 자국이 그대로 남은 투박하고 원시적인 질감을 만듦",
        usage: "rough-hewn stone altar inside a cave",
      },
      {
        en: "velvet",
        ko: "벨벳",
        effect: "빛을 빨아들이는 짧은 보풀이 깊고 고급스러운 색감을 만듦",
        usage: "royal throne draped in crimson velvet",
      },
      {
        en: "glass",
        ko: "유리",
        effect: "투명한 굴절과 반사가 겹쳐 섬세하고 차가운 느낌을 줌",
        usage: "glass figurine of a swan refracting light",
      },
      {
        en: "ceramic",
        ko: "세라믹(도자기)",
        effect: "단단한 유약 표면의 은은한 광택으로 정갈한 공예 느낌을 냄",
        usage: "handmade ceramic teacup with celadon glaze",
      },
      {
        en: "brushed steel",
        ko: "헤어라인 스틸",
        effect: "한 방향의 미세한 결이 산업적이고 정밀한 금속 광을 만듦",
        usage: "brushed steel watch face, product shot",
      },
      {
        en: "mossy",
        ko: "이끼 낀",
        effect: "축축한 초록 이끼가 덮여 오래된 숲의 습한 시간감을 입힘",
        usage: "mossy stone lantern in a forest shrine",
      },
      {
        en: "cracked",
        ko: "갈라진",
        effect: "잘게 갈라진 균열 무늬가 건조함과 세월, 붕괴 직전의 긴장감을 줌",
        usage: "cracked desert earth under a harsh sun",
      },
    ],
  },
  {
    key: "color",
    title: "색감 & 팔레트",
    emoji: "🌈",
    intro:
      "화면 전체의 팔레트와 색 온도를 통일하는 축으로, 브랜드 톤을 맞추거나 시리즈 이미지의 일관성이 필요할 때 지정합니다.",
    terms: [
      {
        en: "pastel palette",
        ko: "파스텔 팔레트",
        effect: "채도를 낮춘 연한 색조가 포근하고 동화적인 인상을 만듦",
        usage: "pastel palette bakery storefront in spring",
      },
      {
        en: "vibrant saturated colors",
        ko: "고채도 비비드",
        effect: "채도를 최대로 끌어올려 축제 같은 에너지와 강한 시선 집중을 만듦",
        usage: "street carnival in Rio, vibrant saturated colors",
      },
      {
        en: "muted tones",
        ko: "뮤트 톤",
        effect: "회색을 섞은 낮은 채도로 세련되고 절제된 분위기를 냄",
        usage: "scandinavian living room, muted tones",
      },
      {
        en: "monochrome",
        ko: "모노크롬(흑백)",
        effect: "색을 제거해 형태와 명암, 질감에만 집중시키는 고전적 표현",
        usage: "monochrome photo of jazz musicians on stage",
      },
      {
        en: "sepia",
        ko: "세피아",
        effect: "바랜 갈색조가 오래된 사진 같은 회고적 시간감을 입힘",
        usage: "sepia photograph of a 1920s train station",
      },
      {
        en: "teal and orange",
        ko: "틸 앤 오렌지",
        effect: "청록 배경과 주황 피부톤의 할리우드식 보색 대비를 만듦",
        usage: "action movie still, teal and orange color grading",
      },
      {
        en: "complementary colors",
        ko: "보색 배색",
        effect: "색상환 반대편 색끼리 부딪혀 강렬한 시각적 긴장감을 만듦",
        usage: "purple and yellow complementary color scheme",
      },
      {
        en: "warm tones",
        ko: "웜 톤",
        effect: "빨강과 주황, 노랑 위주의 배색이 아늑함과 친밀감을 높임",
        usage: "family dinner by the fireplace, warm tones",
      },
      {
        en: "cool tones",
        ko: "쿨 톤",
        effect: "파랑과 청록 위주의 배색이 거리감과 차분함, 기술적인 인상을 줌",
        usage: "research lab at midnight, cool tones",
      },
      {
        en: "neon palette",
        ko: "네온 팔레트",
        effect: "형광 분홍과 시안, 보라의 발광색으로 레트로 퓨처 감성을 냄",
        usage: "arcade interior, neon palette, synthwave",
      },
      {
        en: "earth tones",
        ko: "어스 톤",
        effect: "흙과 모래, 올리브 같은 자연색이 안정적이고 유기적인 느낌을 줌",
        usage: "adobe village at dusk, earth tones",
      },
      {
        en: "duotone",
        ko: "듀오톤",
        effect: "단 두 가지 색으로 재구성해 그래픽 포스터 같은 임팩트를 만듦",
        usage: "duotone portrait in navy and coral",
      },
    ],
  },
  {
    key: "mood",
    title: "분위기 & 감정",
    emoji: "🌫️",
    intro:
      "장면이 전달할 감정을 직접 명시하는 축으로, 조명과 색만으로는 부족한 정서적 방향을 못 박고 싶을 때 사용합니다.",
    terms: [
      {
        en: "serene",
        ko: "고요한",
        effect: "잔잔한 수면과 부드러운 빛을 유도해 심리적 안정감을 줌",
        usage: "serene mountain lake at dawn",
      },
      {
        en: "melancholic",
        ko: "우울한(애수)",
        effect: "낮은 채도와 비, 안개 연출로 쓸쓸한 감정을 이끌어냄",
        usage: "melancholic empty train platform in the rain",
      },
      {
        en: "whimsical",
        ko: "기발한(동화적)",
        effect: "비현실적인 비례와 밝은 색으로 동화 같은 유쾌함을 만듦",
        usage: "whimsical teapot house in a flower meadow",
      },
      {
        en: "ominous",
        ko: "불길한",
        effect: "짙은 그림자와 먹구름으로 나쁜 일이 임박한 듯한 긴장감을 조성",
        usage: "ominous storm clouds gathering over a lighthouse",
      },
      {
        en: "ethereal",
        ko: "영묘한(천상의)",
        effect: "빛 번짐과 반투명한 요소로 현실을 벗어난 신성한 느낌을 냄",
        usage: "ethereal forest spirit glowing softly",
      },
      {
        en: "nostalgic",
        ko: "향수 어린",
        effect: "빛바랜 색과 필름 그레인으로 지난 시절의 그리움을 환기",
        usage: "nostalgic summer evening in a 1990s neighborhood",
      },
      {
        en: "dramatic",
        ko: "극적인",
        effect: "강한 명암과 과장된 동세로 클라이맥스 순간의 긴장감을 만듦",
        usage: "dramatic duel on a cliff edge at sunset",
      },
      {
        en: "cozy",
        ko: "아늑한",
        effect: "따뜻한 실내광과 담요, 김이 오르는 잔으로 포근한 안락함을 연출",
        usage: "cozy reading nook on a snowy night",
      },
      {
        en: "mysterious",
        ko: "신비로운",
        effect: "안개와 실루엣으로 정보를 가려 호기심과 궁금증을 자극",
        usage: "mysterious hooded figure in the mist",
      },
      {
        en: "triumphant",
        ko: "승리감 넘치는",
        effect: "올려다보는 앵글과 터져 나오는 빛으로 성취의 카타르시스를 표현",
        usage: "triumphant climber raising arms at the summit",
      },
      {
        en: "dreamy",
        ko: "몽환적인",
        effect: "소프트 포커스와 파스텔 빛 번짐으로 꿈속 같은 흐릿함을 만듦",
        usage: "dreamy lavender field under morning haze",
      },
      {
        en: "eerie",
        ko: "으스스한",
        effect: "익숙한 장소를 비틀어 미묘하게 어긋난 듯한 불안감을 조성",
        usage: "eerie abandoned amusement park at dusk",
      },
    ],
  },
  {
    key: "quality",
    title: "화질 & 렌더링",
    emoji: "✨",
    intro:
      "선명도와 렌더링 품질을 끌어올리는 부스터 키워드 모음으로, 디테일이 뭉개지거나 흐릿하게 나올 때 프롬프트 뒤쪽에 추가합니다.",
    terms: [
      {
        en: "highly detailed",
        ko: "초고디테일",
        effect: "미세 묘사의 밀도를 높여 확대해도 무너지지 않는 디테일을 유도",
        usage: "highly detailed dragon scale armor",
      },
      {
        en: "8K resolution",
        ko: "8K 해상도",
        effect: "고해상도 이미지 쪽으로 유도해 선명도와 크롭 내성을 높임",
        usage: "sweeping landscape panorama, 8K resolution",
      },
      {
        en: "sharp focus",
        ko: "샤프 포커스",
        effect: "초점이 정확히 맞아 흐릿함 없는 또렷한 결과를 유도",
        usage: "sharp focus on the model's eyes",
      },
      {
        en: "octane render",
        ko: "옥테인 렌더",
        effect: "옥테인 렌더러풍의 매끈한 광선 추적 CG 마감을 입힘",
        usage: "futuristic concept car, octane render",
      },
      {
        en: "unreal engine",
        ko: "언리얼 엔진",
        effect: "게임 시네마틱풍의 사실적인 실시간 렌더링 룩을 만듦",
        usage: "fantasy castle environment, unreal engine 5",
      },
      {
        en: "ray tracing",
        ko: "레이 트레이싱",
        effect: "물리적으로 정확한 반사와 굴절, 그림자 표현을 유도",
        usage: "glass chess set, ray tracing reflections",
      },
      {
        en: "film grain",
        ko: "필름 그레인",
        effect: "미세한 입자 노이즈로 아날로그 필름의 질감과 온기를 입힘",
        usage: "vintage street photo, 35mm film grain",
      },
      {
        en: "HDR",
        ko: "HDR",
        effect: "밝은 곳과 어두운 곳의 계조를 모두 살려 풍부한 명암을 만듦",
        usage: "sunset over the ocean, HDR",
      },
      {
        en: "physically based rendering",
        ko: "물리 기반 렌더링(PBR)",
        effect: "재질이 실제 물리 법칙대로 빛에 반응하는 사실적인 표면을 만듦",
        usage: "sci-fi helmet, physically based rendering",
      },
      {
        en: "award-winning photography",
        ko: "수상작급 사진",
        effect: "전문가 수준의 구도와 조명을 갖춘 이미지 쪽으로 품질을 끌어올림",
        usage: "award-winning wildlife photography, a fox in snowfall",
      },
    ],
  },
  {
    key: "params",
    title: "모델 파라미터",
    emoji: "⚙️",
    intro:
      "그림의 내용이 아니라 생성 방식 자체를 제어하는 스위치로, 화면비와 재현성, 제외 요소를 확정하고 싶을 때 프롬프트 끝에 붙입니다.",
    terms: [
      {
        en: "--ar 16:9",
        ko: "가로 와이드 화면비",
        effect: "시네마틱한 가로형 프레임을 생성(풍경, 썸네일, 배너에 적합)",
        usage: "epic mountain vista --ar 16:9",
      },
      {
        en: "--ar 9:16",
        ko: "세로 화면비",
        effect: "모바일과 릴스용 세로형 프레임을 생성(전신 인물에 적합)",
        usage: "full-body fashion portrait --ar 9:16",
      },
      {
        en: "--v 6",
        ko: "미드저니 버전 지정",
        effect: "모델 버전을 고정해 프롬프트 이해도와 사실성의 세대를 통제",
        usage: "hyperrealistic street scene --v 6",
      },
      {
        en: "--stylize 250",
        ko: "스타일라이즈 강도",
        effect: "값이 클수록 미드저니 고유의 미감이 강해지고 프롬프트 충실도는 낮아짐",
        usage: "fairy tale cottage --stylize 250",
      },
      {
        en: "--chaos 30",
        ko: "케이오스(시안 다양성)",
        effect: "0-100 값으로 4장 시안 사이의 구도와 해석 편차를 키움",
        usage: "abstract sculpture concept --chaos 30",
      },
      {
        en: "--no text",
        ko: "제외 플래그",
        effect: "지정한 요소(글자, 워터마크 등)가 이미지에 나오지 않도록 차단",
        usage: "clean movie poster scene --no text, watermark",
      },
      {
        en: "--seed 1234",
        ko: "시드 고정",
        effect: "난수 시작점을 고정해 같은 프롬프트에서 재현 가능한 결과를 얻음",
        usage: "character design iteration --seed 1234",
      },
      {
        en: "--tile",
        ko: "타일(패턴 반복)",
        effect: "상하좌우가 이어지는 심리스 패턴을 생성(배경, 텍스처 제작용)",
        usage: "watercolor floral pattern --tile",
      },
      {
        en: "--niji 6",
        ko: "니지(애니 특화 모델)",
        effect: "애니메이션과 일러스트에 특화된 니지 모델로 전환",
        usage: "anime girl with a paper umbrella --niji 6",
      },
      {
        en: "(keyword:1.3)",
        ko: "SD 가중치 문법",
        effect: "Stable Diffusion에서 해당 키워드의 영향력을 1.3배로 증폭",
        usage: "portrait, (freckles:1.3), soft window light",
      },
      {
        en: "negative prompt",
        ko: "네거티브 프롬프트",
        effect: "SD에서 원치 않는 요소를 별도 입력창에 나열해 결과에서 제거",
        usage: "negative prompt: blurry, extra fingers, low quality",
      },
      {
        en: "CFG scale 7",
        ko: "CFG 스케일",
        effect: "SD에서 프롬프트 준수 강도를 조절(높을수록 충실하지만 과하면 경직됨)",
        usage: "cinematic portrait, CFG scale 7",
      },
    ],
  },
];

export const PROGRESSIVE_EXAMPLE: ProgressiveStep[] = [
  {
    title: "주제만",
    addition: "핵심 피사체 한 단어",
    prompt: "a lighthouse",
    note: "무엇을 그릴지는 정해졌지만 시간, 장소, 스타일을 전부 모델이 임의로 결정해 결과가 매번 제각각입니다.",
  },
  {
    title: "+구체적 묘사",
    addition: "피사체의 상태와 주변 환경 묘사",
    prompt: "a weathered white lighthouse standing on a jagged sea cliff, waves crashing against the rocks",
    note: "풍화된 외벽과 절벽, 부서지는 파도가 더해져 장면의 뼈대가 구체적으로 잡히고 우연에 맡기는 부분이 줄어듭니다.",
  },
  {
    title: "+스타일/매체",
    addition: "매체와 화풍 지정",
    prompt: "a weathered white lighthouse standing on a jagged sea cliff, waves crashing against the rocks, cinematic photography, shot on 35mm film",
    note: "사진이라는 매체가 확정되어 일러스트나 3D로 튀지 않고, 필름 특유의 질감이 화면 전체에 입혀집니다.",
  },
  {
    title: "+조명/색감",
    addition: "빛의 시간대와 색 팔레트",
    prompt: "a weathered white lighthouse standing on a jagged sea cliff, waves crashing against the rocks, cinematic photography, shot on 35mm film, golden hour backlight, god rays breaking through storm clouds, teal and orange color grading",
    note: "역광의 골든아워와 틸 앤 오렌지 팔레트로 명암의 방향과 색의 규칙이 통일되어 화면에 극적인 깊이가 생깁니다.",
  },
  {
    title: "+구도/카메라",
    addition: "카메라 위치와 촬영 기법",
    prompt: "a weathered white lighthouse standing on a jagged sea cliff, waves crashing against the rocks, cinematic photography, shot on 35mm film, golden hour backlight, god rays breaking through storm clouds, teal and orange color grading, low angle shot from the shoreline, rule of thirds, long exposure, silky waves",
    note: "로우 앵글이 등대를 웅장하게 세우고 장노출이 파도를 비단결로 바꿔, 정지된 등대와 흐르는 바다의 대비가 완성됩니다.",
  },
  {
    title: "+분위기/파라미터",
    addition: "감정 키워드와 모델 파라미터",
    prompt: "a weathered white lighthouse standing on a jagged sea cliff, waves crashing against the rocks, cinematic photography, shot on 35mm film, golden hour backlight, god rays breaking through storm clouds, teal and orange color grading, low angle shot from the shoreline, rule of thirds, long exposure, silky waves, lonely yet hopeful atmosphere, highly detailed, film grain --ar 16:9 --stylize 200 --no text, watermark",
    note: "고독하지만 희망적인 감정이 장면의 해석을 하나로 모으고, --ar 16:9와 --no 플래그가 출력 형식까지 통제해 바로 쓸 수 있는 완성 프롬프트가 됩니다.",
  },
];
