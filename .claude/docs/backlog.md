# Backlog

> 이 파일은 자동 로드되지 않는다. 작업 계획 시 수동으로 참조.

## 기능 (예정)

- [ ] **카트** — 담기 / 수량 조절 / 합계. 결제는 범위 밖. (client 로컬 상태, `features/cart`)
- [ ] **위시리스트** — 담기/빼기. TanStack mutation 패턴 연습 (`features/wishlist`)

## 완료

- [x] **상품 이미지** — 컬러 박스(placeholder) → 실제 이미지. `next/image`(`fill`+`object-cover`) + `public/products/<handle>.png`. `color`는 로딩 폴백으로 유지
- [x] **상품 설명 보강** — `products.json` description 확장 + `highlights`(특징 불릿, ko/en) 필드 추가, 상세 페이지에 불릿 리스트. 상품 8종으로 개편(쿠션 라지/미디엄/미니세트, 코스터/머그/냄비받침/무드등)

## 툴링

- [x] **Prettier 셋업** — `prettier` + `prettier-plugin-tailwindcss`, `.prettierrc.json`, `format`/`format:check` 스크립트
- [x] **ESLint import 순서** — `eslint-plugin-import` `import/order` 룰을 `eslint.config.mjs`에 추가

## 나중에

- [ ] SEO — 상품 JSON-LD 구조화 데이터
