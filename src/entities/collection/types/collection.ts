import type { Locale } from '@shared/i18n';

/** 로케일별 표시명을 가진 원본(JSON) 컬렉션 */
export interface RawCollection {
    handle: string;
    title: Record<Locale, string>;
}

/** UI가 소비하는 컬렉션(특정 로케일로 해석 완료) */
export interface Collection {
    handle: string;
    title: string;
}
