# Backlog

> 이 파일은 자동 로드되지 않는다. 작업 계획 시 수동으로 참조.

## 기능 (예정)

- [ ] **위시리스트** — 담기/빼기. TanStack mutation 패턴 연습 (`features/wishlist`). 회원별 데이터 → 세션 쿠키 + `/api/wishlist` route handler(in-memory). 테스트는 MSW.
- [ ] **ProductCard 바로 좋아요 (회원만)** — 카드에서 좋아요(바로 담기는 **완료**). auth(`useAuth`)+wishlist 의존, 비회원이면 로그인 유도.
- [ ] **메인 페이지 큐레이션 + 검색 페이지 분리** — 홈은 "보여주는" 곳, 검색은 전용 페이지로.
    - **홈 큐레이션**: 지금처럼 인라인 검색 그리드 말고 **베스트(잘 팔리는 것)·신상품** 등 섹션 노출. `tags`(best/new)로 이미 구분되니 섹션별 필터(예: `getProductsByTag`)로. **서버 컴포넌트로 정적 렌더**(ISR 유지). 현재 `app/[locale]/home-products.tsx`(인라인 검색)를 큐레이션 섹션으로 교체.
    - **검색 페이지 `/search?q=`**: 홈 검색창에 입력/제출 → `/search?q=검색어`로 이동, 검색은 전용 `/search`에서. 검색창은 `useRouter().push('/search?q='+q)` 또는 `<form>` GET.
    - **`/search` ISR 주의**: `q`를 **page의 `searchParams`로 읽으면 dynamic 강등**. 정적 셸 유지하려면 **client(`useSearchParams`)에서** 읽어 `useProductSearch` 초기값으로. (검색 자체는 동적이라 dynamic이어도 무방 — 취향) `useProductSearch`를 initialQuery 받게 확장 + URL 동기화 고려.
- [ ] **딥링크 담기 (`/?item=<handle>`)** — 메인에 해당 쿼리로 진입 시 **옵션 없으면 자동 담기+토스트**, **있으면 QuickAdd 모달** 노출.
    - QuickAdd의 "옵션 없으면 담기 / 있으면 모달" 분기를 **재사용**(공통 로직 추출 고려).
    - **ISR**: `item`을 **client `useSearchParams`로** 읽기 (page `searchParams` 읽으면 dynamic 강등).
    - **한 번만 발동**(`useEffect`, item 존재 시). 유효하지 않은 handle은 무시. 처리 후 `router.replace`로 param 제거 고려(새로고침 시 중복 담기 방지).
    - 상품 조회: handle로(`getProductByHandle` client fetch 또는 이미 로드된 목록에서).
- [ ] **위시리스트 버튼 노출 (로그인 상태)** — 상세 페이지에서 **회원만** 위시리스트 버튼 노출/비노출. (auth는 완료 — `useAuth`로 client island, 페이지 정적 유지.) wishlist 의존.
- [ ] **마이페이지 (`/account`)** — 주문내역·프로필 등 회원 전용 페이지.
    - **회원 전용** → auth 의존. 비회원이면 로그인 유도(리다이렉트 또는 안내).
    - **결제 범위 밖** → 주문내역은 **mock 주문 데이터** 필요. "카트 → 가짜 주문 생성"(예: `/api/orders`, 세션 유저별 in-memory)으로 흐름만 시연.
    - **ISR 주의**: 주문내역은 유저별 동적. 페이지는 **정적 셸 + client island**(`useAuth` + 주문 조회 `useQuery`)로 하면 ISR 유지. 쿠키/유저데이터를 page 렌더에서 읽지 말 것.

## 완료

- [x] **인증(로그인/세션)** — `/api/auth`(login·me·logout) + httpOnly 세션 쿠키(mock 유저). `features/auth`(useAuth·AuthMenu·LoginForm) + `/login`. 세션은 client 조회 → 페이지 ISR 유지. (mock — 보안 하드닝은 "나중에")
- [x] **상세 옵션·수량 + 카드 바로 담기(QuickAdd)** — 상품 `options` + 카트 라인 키(`handle`+옵션, 같은 상품 다른 옵션=별도 라인). 상세 옵션 셀렉터·`QuantityStepper`, 카드 `QuickAdd`(옵션 없으면 담기/있으면 모달). `ProductCard`는 widget으로 이동(QuickAdd self-contained).
- [x] **drawer 공통화** — 슬라이드오버(백드롭·Esc·슬라이드·헤더)를 `shared/ui/Drawer`(controlled, side·헤더 유연)로 추출. CartDrawer·MobileNav가 사용.
- [x] **카트** — 담기/수량/합계/드로어/토스트 + localStorage 영속화. reducer·useCart·버튼 테스트. (`features/cart`, model/ui/hooks/types)
- [x] **GNB + 카테고리 필터** — `entities/collection` + 정적 `/collections/[handle]`(ISR) + GNB(데스크탑 호버 드롭다운/모바일 드로어). 상품에 `collection` 필드.
- [x] **상품 이미지** — 컬러 박스(placeholder) → 실제 이미지. `next/image`(`fill`+`object-cover`) + `public/products/<handle>.png`. `color`는 로딩 폴백으로 유지
- [x] **상품 설명 보강** — `products.json` description 확장 + `highlights`(특징 불릿, ko/en) 필드 추가, 상세 페이지에 불릿 리스트. 상품 8종으로 개편(쿠션 라지/미디엄/미니세트, 코스터/머그/냄비받침/무드등)

## 툴링

- [x] **Prettier 셋업** — `prettier` + `prettier-plugin-tailwindcss`, `.prettierrc.json`, `format`/`format:check` 스크립트
- [x] **ESLint import 순서** — `eslint-plugin-import` `import/order` 룰을 `eslint.config.mjs`에 추가

## 나중에

- [ ] SEO — 상품 JSON-LD 구조화 데이터
- [ ] **NextAuth(Auth.js) 적용 실험** — 자체 구현한 client-side auth를 NextAuth Credentials provider로 교체/병행해보고 호환성 확인. (자체 구현 먼저 한 뒤 시도하기로 함)
    - **호환 리스크**: 변경된 Next 16 fork — 미들웨어가 `proxy.ts`(next-intl `createMiddleware`와 합성 필요), Auth.js v5 beta의 peer-dep(React 19.2/Next 16), `/api/auth/[...nextauth]` route handler 내부 의존.
    - **원칙**: 세션은 **client-side만**(`useSession`) — `auth()`/`getServerSession()`을 page/layout 렌더에서 부르면 ISR 깨짐. 막히면 자체 구현 유지(폴백).
- [ ] **인증 보안 하드닝 (실서비스화 시)** — 현재 mock auth는 데모용 단순화라 그대로 두지만, 실제로 가려면:
    - 세션 쿠키가 **평문 userId**(`session=u1`)라 위조 가능(`Cookie: session=u1`이면 인증됨) → JWT/HMAC **서명** 필요
    - 쿠키 **`secure` 플래그 없음**(https 전 추가), **CSRF 방어 없음**(SameSite=lax만 — login CSRF는 별도 토큰 필요)
    - 비밀번호 평문 비교·하드코딩 → 실 DB면 해시(bcrypt 등) + 레이트리밋
