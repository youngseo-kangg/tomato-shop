import type { Locale } from '@shared/i18n';

/** 원본(JSON) 옵션 — 로케일별 이름/값 라벨. value의 id는 로케일 무관(카트 키에 사용) */
export interface RawProductOption {
    name: Record<Locale, string>;
    values: { id: string; label: Record<Locale, string> }[];
}

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
    /** 선택 옵션(색상 등). 없으면 생략 */
    options?: RawProductOption[];
}

/** 해석된 옵션 값 — id(로케일 무관) + label(해석됨) */
export interface ProductOptionValue {
    id: string;
    label: string;
}

/** 해석된 옵션 */
export interface ProductOption {
    name: string;
    values: ProductOptionValue[];
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
    /** 옵션 (없으면 빈 배열) */
    options: ProductOption[];
}
