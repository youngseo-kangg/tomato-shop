import { describe, expect, it } from 'vitest';

import { addToWishlist, getWishlist, removeFromWishlist } from './wishlist-store';

// 유저별 고유 id를 써서 모듈 전역 Map의 테스트 간 간섭을 피한다
describe('wishlist-store', () => {
    it('알 수 없는 유저는 빈 목록', () => {
        expect(getWishlist('unknown')).toEqual([]);
    });

    it('추가하면 최근 것이 앞에 온다', () => {
        addToWishlist('u-add', 'a');
        addToWishlist('u-add', 'b');
        expect(getWishlist('u-add')).toEqual(['b', 'a']);
    });

    it('같은 handle을 다시 추가해도 중복되지 않는다', () => {
        addToWishlist('u-dup', 'a');
        const result = addToWishlist('u-dup', 'a');
        expect(result).toEqual(['a']);
    });

    it('제거하면 해당 handle만 빠진다', () => {
        addToWishlist('u-rm', 'a');
        addToWishlist('u-rm', 'b');
        expect(removeFromWishlist('u-rm', 'a')).toEqual(['b']);
    });
});
