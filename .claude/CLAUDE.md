# CLAUDE.md — tomato-shop

이 파일은 모든 세션에 자동 로드된다. **항상 적용되는 핵심**만 둔다.
세부 규칙은 `.claude/rules/`(자동 로드), 백로그는 `.claude/docs/backlog.md`(수동) 참조.

## 프로젝트 개요

- **이름**: tomato-shop — 토마토 굿즈 데모 커머스 (토마토 반지갑·오브제·방석·스트레스볼)
- **목적**: 좋은 스토어프론트 패턴을 가볍고 깔끔하게 정리한 사이드 프로젝트
- **스택**: Next.js 16 (Turbopack) · React 19.2 · TypeScript strict · Tailwind v4 · next-intl 4 · TanStack Query 5 · pnpm
- **데이터**: 로컬 JSON (`src/data/*.json`) — Shopify/외부 API 없음. repository 함수로 추상화해 나중에 교체 가능
- **로케일**: `ko`(기본, `/`) · `en`(`/en`). ISR 유지가 전제
- **범위**: 카탈로그 + (예정) 카트까지. **결제 없음**
- **테스트**: Vitest + RTL

## 핵심 결정 (locked)

- **아키텍처 = FSD + Atomic** (축이 다름). 상세는 `rules/architecture.md`
- **i18n + ISR**: `localeDetection:false` + 페이지마다 `setRequestLocale` + `generateStaticParams`. 페이지 렌더에서 쿠키/헤더 읽기 금지
- **데이터 접근은 repository 경유** — UI/페이지는 데이터 소스를 모른다

## 디렉토리 구조

```
src/
├── shared/      # 도메인 무관 공용
│   ├── ui/      # ★ Atomic 전용: atoms/ · molecules/
│   ├── i18n/    # routing · navigation · request · messages
│   └── libs/    # cn, formatPrice (순수 함수)
├── entities/    # 도메인 데이터(passive): types · api(repository) · lib(mapper) · ui(presentational)
├── features/    # 유저 액션/상태변경: ui · api · (hooks)
├── widgets/     # 여러 슬라이스 조합 (layout 등)
├── data/        # 로컬 JSON 데이터 소스
└── app/         # Next App Router (+ providers, error/loading 경계)
```

## 경로 별칭

| Alias | 경로 |
|-------|------|
| `@/*` | `src/*` |
| `@shared/*` `@entities/*` `@features/*` `@widgets/*` `@app/*` | 각 레이어 |

## 작업 룰 (Claude용)

- **작게 끊어서**: 한 번에 많이 만들지 말고 단계마다 확인받고 진행
- **수정 전 한 단락 설명** 후 편집
- 컨벤션 결정 시 **출처 명시** (공식 문서/이 문서/추론 구분)

## 문서 인덱스

- `.claude/rules/architecture.md` — FSD 레이어·의존성 방향·Atomic 배치·i18n/ISR
- `.claude/rules/code-style.md` — 네이밍·export·import 규칙
- `.claude/rules/testing.md` — 테스트 정책·셋업 gotcha
- `.claude/docs/backlog.md` — TODO/백로그 (자동 로드 X)
