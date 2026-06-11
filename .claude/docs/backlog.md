# Backlog

> 이 파일은 자동 로드되지 않는다. 작업 계획 시 수동으로 참조.

## 기능 (예정)

- [ ] **카트** — 담기 / 수량 조절 / 합계. 결제는 범위 밖. (client 로컬 상태, `features/cart`) ← 진행 중
- [ ] **위시리스트** — 담기/빼기. TanStack mutation 패턴 연습 (`features/wishlist`)
- [ ] **GNB + 카테고리 필터** — 헤더 호버 드롭다운으로 카테고리 메뉴, 클릭 시 해당 카테고리 상품만.
    - **데이터 모델 먼저**: `products.json`에 카테고리 필드 없음 → 상품에 category 추가 필요.
    - **collection은 `entity`** (passive 조회 데이터): `entities/collection`(types·repository·mapper). "필터"는 상태가 아니라 **라우팅** → 정적 `/collections/[handle]` + `generateStaticParams`로 ISR 유지.
    - GNB(호버 드롭다운) UI는 `widgets/layout`, 데이터는 entity에서.
- [ ] **로그인 + 위시리스트 노출** — 로그인 상태에 따라 상세 페이지 위시리스트 버튼 노출/비노출.
    - **ISR 함정**: 세션을 **서버(쿠키)에서 읽으면 dynamic 강등**. 테마처럼 **client-side auth 아일랜드**로 (`features/auth` + `useAuth` + 토큰 client 보관). 상세 페이지는 정적 유지, 버튼만 client island.
    - **NextAuth/Auth.js 가능** — 단 **client-side 세션만**(`<SessionProvider>`+`useSession`). `auth()`/`getServerSession()`을 page/layout 렌더에서 부르면 dynamic 강등(ISR 깨짐). Credentials provider + 하드코딩 유저면 DB 없이 OK. `/api/auth/*`는 동적(`ƒ`)이라 무방.
    - **MSW**는 NextAuth와 별개 도구(네트워크 mock). NextAuth Credentials를 쓰면 앱용으론 불필요, 주로 **테스트에서 외부 호출 mock**용. NextAuth 없이 갈 거면 가짜 `/api/auth/login`을 MSW로.

## 완료

- [x] **상품 이미지** — 컬러 박스(placeholder) → 실제 이미지. `next/image`(`fill`+`object-cover`) + `public/products/<handle>.png`. `color`는 로딩 폴백으로 유지
- [x] **상품 설명 보강** — `products.json` description 확장 + `highlights`(특징 불릿, ko/en) 필드 추가, 상세 페이지에 불릿 리스트. 상품 8종으로 개편(쿠션 라지/미디엄/미니세트, 코스터/머그/냄비받침/무드등)

## 툴링

- [x] **Prettier 셋업** — `prettier` + `prettier-plugin-tailwindcss`, `.prettierrc.json`, `format`/`format:check` 스크립트
- [x] **ESLint import 순서** — `eslint-plugin-import` `import/order` 룰을 `eslint.config.mjs`에 추가

## 나중에

- [ ] SEO — 상품 JSON-LD 구조화 데이터
