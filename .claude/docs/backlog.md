# Backlog

> 이 파일은 자동 로드되지 않는다. 작업 계획 시 수동으로 참조.

## 기능 (예정)

- [ ] **위시리스트** — 담기/빼기. TanStack mutation 패턴 연습 (`features/wishlist`)
- [ ] **ProductCard 바로 담기 / 바로 좋아요** — 상세 진입 없이 카드에서 바로.
    - 담기 = 카트(수량 1). 카드 hover/포커스 시 노출 고려.
    - **좋아요 = 회원만** → auth(`useAuth`) 의존. 비회원이면 로그인 유도. wishlist 필요.
- [ ] **상세 갯수 조정 + 옵션 선택** — `/products/[handle]`.
    - 수량 stepper(담기 시 수량 반영 — cart는 이미 quantity 지원).
    - **옵션 선택**은 데이터 모델 필요: 상품에 options/variants 필드 없음 → 모델부터. 옵션 조합이 담는 단위(라인아이템 key)에 영향.
- [ ] **drawer 공통화** — `CartDrawer`·`MobileNav`가 같은 슬라이드오버 패턴(백드롭·Esc·translate) 중복. `shared/ui`에 공통 `Drawer`(side·open·onClose) 추출 후 둘 다 사용. (refactor)
- [ ] **로그인 + 위시리스트 노출** — 로그인 상태에 따라 상세 페이지 위시리스트 버튼 노출/비노출.
    - **ISR 함정**: 세션을 **서버(쿠키)에서 읽으면 dynamic 강등**. 테마처럼 **client-side auth 아일랜드**로 (`features/auth` + `useAuth` + 토큰 client 보관). 상세 페이지는 정적 유지, 버튼만 client island.
    - **NextAuth/Auth.js 가능** — 단 **client-side 세션만**(`<SessionProvider>`+`useSession`). `auth()`/`getServerSession()`을 page/layout 렌더에서 부르면 dynamic 강등(ISR 깨짐). Credentials provider + 하드코딩 유저면 DB 없이 OK. `/api/auth/*`는 동적(`ƒ`)이라 무방.
    - **MSW**는 NextAuth와 별개 도구(네트워크 mock). NextAuth Credentials를 쓰면 앱용으론 불필요, 주로 **테스트에서 외부 호출 mock**용. NextAuth 없이 갈 거면 가짜 `/api/auth/login`을 MSW로.

## 완료

- [x] **카트** — 담기/수량/합계/드로어/토스트 + localStorage 영속화. reducer·useCart·버튼 테스트. (`features/cart`, model/ui/hooks/types)
- [x] **GNB + 카테고리 필터** — `entities/collection` + 정적 `/collections/[handle]`(ISR) + GNB(데스크탑 호버 드롭다운/모바일 드로어). 상품에 `collection` 필드.
- [x] **상품 이미지** — 컬러 박스(placeholder) → 실제 이미지. `next/image`(`fill`+`object-cover`) + `public/products/<handle>.png`. `color`는 로딩 폴백으로 유지
- [x] **상품 설명 보강** — `products.json` description 확장 + `highlights`(특징 불릿, ko/en) 필드 추가, 상세 페이지에 불릿 리스트. 상품 8종으로 개편(쿠션 라지/미디엄/미니세트, 코스터/머그/냄비받침/무드등)

## 툴링

- [x] **Prettier 셋업** — `prettier` + `prettier-plugin-tailwindcss`, `.prettierrc.json`, `format`/`format:check` 스크립트
- [x] **ESLint import 순서** — `eslint-plugin-import` `import/order` 룰을 `eslint.config.mjs`에 추가

## 나중에

- [ ] SEO — 상품 JSON-LD 구조화 데이터
