import type { Locale } from '@shared/i18n';

import type { Collection, RawCollection } from '../types/collection';

/** RawCollection(다국어 JSON) → Collection(해석된 모델). 순수 함수 */
export function toCollection(raw: RawCollection, locale: Locale): Collection {
    return {
        handle: raw.handle,
        title: raw.title[locale],
    };
}
