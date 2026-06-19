# 테스트 규칙

## 도구

- **Vitest + React Testing Library + jsdom**
- 실행: `pnpm test` (CI용 1회) / `pnpm test:watch`

## 무엇을 테스트하나 (로직 있는 곳만)

| 대상 | 종류 | 비중 |
|------|------|------|
| `entities/*/lib` mapper, `shared/libs` 순수 함수 | 단위 | 최우선 (ROI 최고) |
| `features/*/lib` 파싱·변환 | 단위 | 많이 |
| `app/api/*/_lib` store (순수 in-memory 로직, React·Next 무관) | 단위 | 많이 |
| 유저 액션 있는 컴포넌트 (`features/*/ui`, `shared/ui` 인터랙티브) | RTL (동작) | 중간 |
| `fetch` 경유 UI (위시리스트 토글·삭제 등) | (예정) RTL + MSW | 중간 |
| 핵심 플로우 (예: 담기) | (예정) E2E 1개 | 최소 |

**하지 말 것**: 스냅샷 테스트, 순수 표시용 컴포넌트 테스트, CSS/레이아웃 검증(jsdom은 실제 렌더 안 함).

## 원칙

- UI는 "보이는가"가 아니라 **"동작하는가"** 검증. 쿼리는 `getByRole`/접근성 쿼리 우선 (ARIA도 같이 챙겨짐)
- 테스트 파일은 **대상 옆에**: `x.ts` ↔ `x.test.ts`
- 프로바이더 필요한 컴포넌트는 `src/test/test-utils.tsx`의 `renderWithProviders`(i18n + QueryClient) 사용

## 셋업 gotcha (이 툴체인 고유)

- Vitest 설정은 반드시 **`vitest.config.mts`** (`.ts`는 `@vitejs/plugin-react` 5와 `ERR_REQUIRE_ESM`)
- `next-intl`은 `test.server.deps.inline`에 포함해야 jsdom에서 `next/navigation` 해석됨
- alias는 `vite-tsconfig-paths`로 tsconfig paths 재사용
