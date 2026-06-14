import { describe, expect, it } from 'vitest';

import type { RawCollection } from '../types/collection';

import { toCollection } from './collection-mapper';

const raw: RawCollection = {
    handle: 'kitchen',
    title: { ko: '주방', en: 'Kitchen' },
};

describe('toCollection', () => {
    it('요청 로케일의 표시명으로 해석한다', () => {
        expect(toCollection(raw, 'ko').title).toBe('주방');
        expect(toCollection(raw, 'en').title).toBe('Kitchen');
    });

    it('handle은 그대로 통과', () => {
        expect(toCollection(raw, 'en').handle).toBe('kitchen');
    });
});
