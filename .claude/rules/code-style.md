# 코드 스타일 규칙

> 골격. 합의되면 채워나간다. (`> TODO` = 미정)

## Export

- **Named export만** 사용. `export default`는 지양
  - 예외: Next.js가 요구하는 곳(page/layout/error/loading, route handler 등)은 default 유지
- 배럴 `index.ts`는 **슬라이스 최상단에서만** (`entities/product/index.ts` 등). 하위 폴더 배럴 금지

## 네이밍

**모든 파일 kebab-case, export 심볼은 용도에 맞게** — 예외 없음(1규칙).

| 종류 | 파일 | export |
|------|------|--------|
| 컴포넌트 | `product-card.tsx` | `ProductCard` (Pascal) |
| 함수/유틸 | `format-price.ts` | `formatPrice` (camel) |
| Next 라우트 | `page.tsx` / `layout.tsx` / `error.tsx` / `loading.tsx` | default (프레임워크 요구) |

- 컴포넌트도 PascalCase 파일로 빼지 않는다. 이유: 규칙 단일화(컴포넌트 예외 제거), Next 필수 소문자 파일과의 일관성, macOS 대소문자 rename 함정 회피. 슬라이스의 `ui/` 위치로 이미 컴포넌트 구분됨.
- **type suffix(`.view`/`.button` 등) 미도입.** FSD 위치(`shared/ui/atoms` vs `features/*/ui`)와 이름만으로 성격이 구분됨. 같은 폴더에서 성격이 충돌하는 경우(예: analytics tracker/trigger)가 생기면 **그때 해당 패턴만** 한정 도입.

## Import 순서

- 순서: builtin → external → internal(`@shared`/`@entities`/...) → parent → sibling → index
- **`eslint-plugin-import`의 order 룰로 강제** (auto-fix). create-next-app flat config에 룰 추가
  - `> 셋업 예정` — 패키지 설치 + eslint.config.mjs 룰 추가는 별도 스텝

## Tailwind

- 클래스 병합은 **`cn()`만** 사용 (`twMerge`는 `cn` 내부에서만)

## 포맷

- **Prettier 도입** + `prettier-plugin-tailwindcss`(클래스 자동 정렬)
- 설정: 4-space indent · 120 line-width · single quote · trailing comma (corporate-shop과 동일)
- `> 셋업 예정` — 패키지 설치 + `.prettierrc` + `format` 스크립트는 별도 스텝
