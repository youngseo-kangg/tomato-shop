// 서버 전용 mock 위시리스트 스토어 (DB 대체). _lib 폴더라 라우팅 제외(private).
// 유저별 상품 handle 목록을 in-memory로 보관 — 최근 담은 게 앞(unshift).
// 프로세스 재시작 시 초기화된다(데모용). 실서비스면 이 모듈만 DB 호출로 교체.
const WISHLISTS = new Map<string, string[]>();

/** 유저의 위시리스트 handle 목록 (없으면 빈 배열) */
export function getWishlist(userId: string): string[] {
    return WISHLISTS.get(userId) ?? [];
}

/** handle 추가 (이미 있으면 무시). 변경 후 목록 반환 */
export function addToWishlist(userId: string, handle: string): string[] {
    const handles = getWishlist(userId);
    if (!handles.includes(handle)) {
        WISHLISTS.set(userId, [handle, ...handles]);
    }
    return getWishlist(userId);
}

/** handle 제거. 변경 후 목록 반환 */
export function removeFromWishlist(userId: string, handle: string): string[] {
    const handles = getWishlist(userId).filter((h) => h !== handle);
    WISHLISTS.set(userId, handles);
    return handles;
}
