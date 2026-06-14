import type { Locale } from '@shared/i18n';

/** 로케일별 필드를 가진 원본(JSON) 레코드 */
export interface RawProduct {
    handle: string;
    price: number;
    currency: string;
    tags: string[];
    color: string;
    image: string;
    /** 소속 컬렉션(카테고리) handle */
    collection: string;
    title: Record<Locale, string>;
    description: Record<Locale, string>;
    highlights: Record<Locale, string[]>;
}

/** UI가 소비하는 도메인 모델 (특정 로케일로 해석 완료된 상태) */
export interface Product {
    handle: string;
    price: number;
    currency: string;
    tags: string[];
    color: string;
    image: string;
    collection: string;
    title: string;
    description: string;
    highlights: string[];
}
