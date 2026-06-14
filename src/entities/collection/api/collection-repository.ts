import type { Locale } from '@shared/i18n';

import rawCollections from '@/data/collections.json';

import { toCollection } from '../lib/collection-mapper';
import type { Collection, RawCollection } from '../types/collection';

const DATA = rawCollections as RawCollection[];

/** 표시 순서대로 전체 컬렉션(GNB·목록용) */
export async function getAllCollections(locale: Locale): Promise<Collection[]> {
    return DATA.map((raw) => toCollection(raw, locale));
}

export async function getCollectionByHandle(handle: string, locale: Locale): Promise<Collection | null> {
    const raw = DATA.find((c) => c.handle === handle);
    return raw ? toCollection(raw, locale) : null;
}

/** generateStaticParams 용 — 전체 핸들 (로케일 무관) */
export function getAllCollectionHandles(): string[] {
    return DATA.map((c) => c.handle);
}
