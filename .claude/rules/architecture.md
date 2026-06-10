# 아키텍처 규칙 — FSD + Atomic Design

## FSD 의존성 방향

```
app → widgets → features → entities → shared
```

상위 → 하위만 import. 역방향·동일 레이어 cross-slice import 금지.

| 레이어 | 책임 | 예 |
|--------|------|-----|
| `shared` | 도메인 무관 공용 (UI 프리미티브, util, i18n 인프라) | `cn`, `Button`, `routing` |
| `entities` | passive data: 도메인 정의 + 조회(read) | `product` (types·repository·mapper·ProductCard) |
| `features` | 유저 액션 + 상태변경(write) | `search` (검색 input + useQuery) |
| `widgets` | 여러 슬라이스 조합 UI | `layout` (Header) |
| `app` | 라우팅·프로바이더·에러/로딩 경계 | `[locale]/...` |

## FSD × Atomic — 축을 나눠서 결합

Atomic은 **프레젠테이션 컴포넌트 분류**, FSD는 **도메인 수직 슬라이스**. Atomic은 `shared/ui`에만 가둔다.

| Atomic | 사는 곳 | 규칙 |
|--------|---------|------|
| atoms (Button, Badge) | `shared/ui/atoms/` | 도메인 무관 프리미티브 |
| molecules (SearchInput) | `shared/ui/molecules/` | atom 조합, 여전히 도메인 무관 |
| organisms (ProductCard) | `entities/*/ui`·`features/*/ui` | **도메인을 아는 순간** Atomic 폴더 금지 → FSD 슬라이스로 |
| templates (Header) | `widgets/layout` | |
| pages | `app/[locale]/` | |

**한 줄 규칙**: 도메인을 모르면 `shared/ui`(Atomic 분류), 알면 FSD 슬라이스. organism↑은 Atomic 폴더명 쓰지 말 것(이중 분류 금지).

## read/write 분리

- `entities/*/api/` = read (repository 조회)
- `features/*/api/` = write/액션 (mutation, 외부 호출)

## 데이터 접근 경계

- UI/페이지는 JSON을 직접 import하지 않는다. **반드시 `entities/*/api/*-repository.ts` 경유**
- repository 본문만 교체하면 로컬 JSON → 실제 API 전환 (호출부 불변)
- Raw(JSON) → 도메인 모델 변환은 `entities/*/lib/*-mapper.ts` (순수 함수)

## i18n + ISR (정적성 유지가 전제)

- **페이지 렌더 경로에서 `cookies()`/`headers()` 읽지 말 것** — 한 줄만 읽어도 라우트 전체가 dynamic으로 강등
- locale은 `[locale]` URL 파라미터에서만 얻는다
- 정적화 3종 세트:
  1. `routing.ts`: `defaultLocale:'ko'`, `localePrefix:'as-needed'`, `localeDetection:false`
  2. 모든 layout/page: `setRequestLocale(locale)` 호출 (없으면 next-intl이 헤더 읽어 dynamic됨)
  3. `generateStaticParams`로 locale(및 핸들) prerender
- 유저별 개인화(쿠키 의존)는 **Client Component** 또는 **`<Suspense>` 구멍**으로 격리 → "정적 껍데기 + 동적 구멍"
- 네비게이션은 `@shared/i18n`의 `Link`/`redirect`/`usePathname`/`useRouter` 사용. **`/${locale}/...` 하드코딩 금지** (ko는 prefix 없음)

### proxy(미들웨어) 위치 함정 ⚠️

- 로케일 라우팅은 `proxy.ts`(Next 16의 구 `middleware.ts`)의 `createMiddleware(routing)`가 담당. 이게 안 돌면 **prefix 없는 기본 로케일(ko) 경로가 전부 404** (`/`, `/products`, `/products/[handle]` …). `/en`만 살아있으면 이 증상 의심.
- `app`이 `src/app`에 있으므로 proxy도 **반드시 `src/proxy.ts`** (app과 같은 레벨). **루트 `proxy.ts`는 인식 안 됨.** 확인법: `next build` 출력에 `ƒ Proxy (Middleware)` 줄이 있으면 인식된 것.

## 상태 관리

- **서버 상태 = TanStack Query** (client fetch). Context 비대화 금지
- 클라이언트 로컬 상태만 Context, 그때도 action은 훅으로 분리

## 에러/로딩 경계

- `error.tsx`는 "죽어도 나머지는 살아야 하는" 격리 단위마다
- `error.tsx`와 `loading.tsx`는 세트 (Suspense 경계와 맞물림)
- `app/global-error.tsx`는 앱 전체 1개 (최후 fallback)
